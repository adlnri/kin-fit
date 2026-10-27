/* Kin Fit AI layer. Sources, chosen per device in Profil › Coach IA:
   - plus: Gemini through the Kin Fit Edge Function, for Kin Fit Plus members (the key stays on the server);
   - local: a small open model run in the browser with WebLLM (WebGPU), coach replies only, free;
   - server: the optional Kin Fit function /api/ai (Claude), only when the site is deployed with it.
   With no source, or when a call fails, every call rejects and the app keeps its authored examples. */
(() => {
  'use strict';

  const NA = window.NA; const M = window.NA_MEALS; const I = window.NA_I18N;
  const URL_AI = window.KINFIT_AI_URL || 'api/ai';
  const PKEY = 'nutriapp.ai';
  const GEMINI = { plan: 'gemini-3.8-flash', chat: 'gemini-2.5-flash-lite' };
  const CLOUD = window.NA_CLOUD || {};
  const LOCAL = { model: 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC', lib: 'https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.85/+esm' };

  const read = () => { try { return JSON.parse(localStorage.getItem(PKEY)) || {}; } catch (e) { return {}; } };
  let cfg = read();
  // Personal Gemini keys are no longer used: forget any key left on this device.
  if (cfg.key || cfg.provider === 'gemini') { delete cfg.key; if (cfg.provider === 'gemini') delete cfg.provider; try { localStorage.setItem(PKEY, JSON.stringify(cfg)); } catch (e) { /* ignore */ } }
  const state = { plus: false, server: false, engine: null, loading: null, listeners: [], webgpu: !!navigator.gpu };
  // Same ?v= as this script, so the service worker never serves a stale copy of the prompts.
  const VER = document.currentScript ? new URL(document.currentScript.src).search : '';
  let core = null;
  const getCore = () => (core = core || import(`./ai-core.mjs${VER}`));

  function provider() {
    if (cfg.provider === 'local' && state.webgpu && cfg.local) return 'local';
    if (cfg.provider !== 'none' && state.plus && CLOUD.plus) return 'plus';
    if ((cfg.provider === 'server' || !cfg.provider) && state.server) return 'server';
    return 'none';
  }
  const can = (task) => { const p = provider(); return p === 'none' ? false : p === 'local' ? task === 'coach' : true; };

  function setConfig(next) {
    cfg = { ...cfg, ...next };
    try { localStorage.setItem(PKEY, JSON.stringify(cfg)); } catch (e) { /* this visit only */ }
  }

  const fail = (code) => { const e = new Error(code); e.code = code; return e; };

  async function withTimeout(ms, run) {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), ms);
    try { return await run(ctl.signal); } catch (e) { throw e.name === 'AbortError' ? fail('timeout') : e.code ? e : fail('network'); } finally { clearTimeout(t); }
  }

  /* ---------- Kin Fit server (Claude) ---------- */

  function viaServer(task, body, timeout) {
    return withTimeout(timeout, async (signal) => {
      const res = await fetch(URL_AI, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ task, ...body }), signal });
      const out = await res.json().catch(() => null);
      if (!res.ok || !out || !out.ok) throw fail((out && out.error) || `http_${res.status}`);
      return out.data;
    });
  }

  /* ---------- Gemini for Kin Fit Plus, through the Edge Function ---------- */

  // One Gemini request sent through the Kin Fit server, which checks the subscription and the daily quota.
  async function plusSend(model, request, timeout) {
    const tok = await CLOUD.token(); if (!tok) throw fail('signed_out');
    return withTimeout(timeout, (signal) => fetch(`${CLOUD.fnUrl}gemini`, {
      method: 'POST', signal,
      headers: { 'content-type': 'application/json', authorization: `Bearer ${tok}`, apikey: CLOUD.anonKey },
      body: JSON.stringify({ model, request }),
    }));
  }

  async function plusRead(res, chat) {
    const out = await res.json().catch(() => null);
    if (!res.ok) {
      const msg = (out && out.error && out.error.message) || '';
      if (res.status === 401) throw fail('signed_out');
      if (res.status === 402) throw fail('not_plus');
      if (res.status === 429) throw fail(msg === 'daily_limit' ? 'daily_limit' : 'rate_limited');
      if (res.status === 413) throw fail('too_large');
      throw fail(`http_${res.status}`);
    }
    const cand = out && out.candidates && out.candidates[0];
    if (!cand) throw fail(out && out.promptFeedback && out.promptFeedback.blockReason ? 'refusal' : 'empty');
    if (cand.finishReason === 'MAX_TOKENS') throw fail('truncated');
    if (/SAFETY|PROHIBITED|BLOCKLIST|SPII|RECITATION/.test(cand.finishReason || '')) throw fail('refusal');
    const text = ((cand.content && cand.content.parts) || []).filter((p) => !p.thought && p.text).map((p) => p.text).join('').trim();
    if (!text) throw fail('empty');
    if (chat) return { texte: text };
    try { return JSON.parse(text.replace(/^```(?:json)?\s*|\s*```$/g, '')); } catch (e) { throw fail('bad_output'); }
  }

  async function viaPlus(task, body, timeout) {
    const { build, messagesFor } = await getCore();
    const job = build(task, body); if (!job) throw fail('bad_task');
    // Gemini wants alternating user/model turns: merge consecutive turns of the same role.
    const contents = [];
    messagesFor(job, body).forEach((m) => {
      const role = m.role === 'assistant' ? 'model' : 'user'; const last = contents[contents.length - 1];
      if (last && last.role === role) last.parts[0].text += `\n\n${m.content}`; else contents.push({ role, parts: [{ text: m.content }] });
    });
    const model = job.kind === 'chat' ? GEMINI.chat : GEMINI.plan;
    // Room for the model's own reasoning, which counts toward the output budget.
    const gen = { maxOutputTokens: job.max + 8000 };
    if (job.schema) { gen.responseMimeType = 'application/json'; gen.responseJsonSchema = job.schema; }
    const res = await plusSend(model, { systemInstruction: { parts: [{ text: job.system }] }, contents, generationConfig: gen }, timeout);
    return plusRead(res, job.chat);
  }

  // Meal photo: foods, portions and nutrition estimated from a JPEG (base64), in the reader's language.
  const MEAL = {
    type: 'object', required: ['plat', 'aliments', 'total', 'confiance', 'conseil'],
    properties: {
      plat: { type: 'string' },
      aliments: { type: 'array', items: { type: 'object', required: ['nom', 'quantite_g', 'kcal'], properties: { nom: { type: 'string' }, quantite_g: { type: 'number' }, kcal: { type: 'number' } } } },
      total: { type: 'object', required: ['kcal', 'proteines_g', 'glucides_g', 'lipides_g'], properties: { kcal: { type: 'number' }, proteines_g: { type: 'number' }, glucides_g: { type: 'number' }, lipides_g: { type: 'number' } } },
      confiance: { type: 'string', enum: ['faible', 'moyenne', 'haute'] },
      conseil: { type: 'string' },
    },
  };
  const LANGS = { fr: 'français', en: 'English', es: 'español' };
  async function mealPhoto(base64, objectif) {
    const system = `Tu es nutritionniste. Sur la photo d’un repas, identifie le plat et chaque aliment visible, estime sa quantité en grammes et ses calories, puis le total du repas (kcal, protéines, glucides, lipides en grammes). Sois réaliste sur les portions, compte les sauces et l’huile probables. Si ce n’est pas de la nourriture, renvoie des aliments vides, un total à 0 et une confiance faible. Le conseil tient en une phrase utile pour l’objectif « ${objectif || 'maintien'} ». Réponds en ${LANGS[I.lang] || 'français'}.`;
    const res = await plusSend(GEMINI.chat, {
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: 'user', parts: [{ inlineData: { mimeType: 'image/jpeg', data: base64 } }, { text: 'Analyse ce repas.' }] }],
      generationConfig: { maxOutputTokens: 2048, responseMimeType: 'application/json', responseJsonSchema: MEAL },
    }, 60000);
    return plusRead(res, false);
  }

  /* ---------- On-device model (WebLLM) ---------- */

  function loadLocal(onProgress) {
    if (state.engine) return Promise.resolve(state.engine);
    if (!state.webgpu) return Promise.reject(fail('webgpu'));
    if (onProgress) state.listeners.push(onProgress);
    if (!state.loading) {
      state.loading = import(LOCAL.lib)
        .then((webllm) => webllm.CreateMLCEngine(LOCAL.model, { initProgressCallback: (r) => state.listeners.forEach((f) => f(r)) }))
        .then((engine) => { state.engine = engine; state.listeners = []; setConfig({ local: true }); return engine; })
        .catch((e) => { state.loading = null; state.listeners = []; throw e.code ? e : fail('local'); });
    }
    return state.loading;
  }

  async function viaLocal(task, body, onProgress) {
    if (task !== 'coach') throw fail('unsupported');
    const { build } = await getCore();
    const job = build(task, body);
    const engine = await loadLocal(onProgress);
    const hist = (body.messages || []).slice(-8).map((m) => ({ role: m.me ? 'user' : 'assistant', content: String(m.t).slice(0, 800) }));
    while (hist.length && hist[0].role === 'assistant') hist.shift();
    const r = await engine.chat.completions.create({ messages: [{ role: 'system', content: `${job.system}\n\n${job.text}` }, ...hist], max_tokens: 350, temperature: 0.6 });
    const text = (r.choices[0].message.content || '').trim();
    if (!text) throw fail('empty');
    return { texte: text };
  }

  /* ---------- Tasks ---------- */

  function call(task, payload, { timeout = 120000, onProgress } = {}) {
    const body = { lang: I.lang, ...payload };
    const p = provider();
    if (p === 'plus') return viaPlus(task, body, timeout);
    if (p === 'local') return viaLocal(task, body, onProgress);
    if (p === 'server') return viaServer(task, body, timeout);
    return Promise.reject(fail('off'));
  }

  // Answers from onboarding, as readable labels. No name or contact detail is sent.
  function profil(sess) {
    const p = sess.profile; const c = I.country;
    return {
      sexe: p.sexe, age: +p.age, taille_cm: +p.taille, poids_kg: +p.poids,
      objectif: NA.OBJECTIFS[p.objectif], niveau: NA.lvLabel(p.niveau), seances_par_semaine: +p.seances, duree_seance_min: NA.durOf(p),
      materiel: p.materiel.map((m) => NA.MATERIEL[m]), restrictions: (p.restrictions || '').trim() || 'aucune',
      sports: NA.sportList(p), petit_dejeuner: NA.PDJ[p.petitdej],
      regime: M.REGIMES[p.regime] || M.REGIMES.omni, pratiques: (p.pratiques || []).map((x) => M.PRATIQUES[x]),
      allergies_et_aliments_a_eviter: p.eviter.map((a) => M.ALLERGENES[a]),
      budget: M.BUDGETS[p.budget] || M.BUDGETS.moyen, pays: c ? c.name.fr : '', region: M.REGIONS[I.region] || '',
      niveau_activite: NA.activity(p).label, besoin_kcal_jour: NA.dailyKcal(p), repas_plaisir_par_semaine: +(p.cheat ?? 1),
    };
  }

  /* Programme: the engine keeps the weekly split (days and zones); the AI writes each session. */
  async function programme(sess) {
    const plan = NA.buildPlan(sess); const pf = profil(sess); const variation = sess.seed + 1;
    const muscu = plan.items.filter((it) => it.kind === 'muscu'); const cardio = plan.items.filter((it) => it.kind === 'cardio');
    const zones = muscu.map((it) => it.tpl.zone);
    const [seances, comp] = await Promise.all([
      Promise.all(muscu.map((it, i) => call('seance', { profil: pf, variation, seance: { num: i + 1, total: muscu.length, duree: NA.durOf(sess.profile), zone: it.tpl.zone, autres: zones.filter((_, j) => j !== i).join(', ') || 'aucune' } })
        .then((data) => ({ day: it.day, num: i + 1, zone: it.tpl.zone, data })))),
      call('complements', { profil: pf, variation, cardio: Math.max(1, cardio.length) }),
    ]);
    if (seances.some((s) => !Array.isArray(s.data.exercices) || s.data.exercices.length < 5)) throw fail('incomplete');
    if (!comp || !Array.isArray(comp.cardio) || !comp.recuperation) throw fail('incomplete');
    const days = cardio.map((it) => it.day);
    return {
      at: new Date().toISOString(), lang: I.lang, seed: sess.seed, by: provider(), seances,
      cardio: comp.cardio.map((data, i) => ({ day: days[i] ?? null, data })), recuperation: comp.recuperation,
    };
  }

  async function nutrition(sess, dayI, training) {
    const data = await call('nutrition', { profil: profil(sess), variation: sess.seed + 1 + dayI, jour: NA.DAYS_FULL[dayI], entrainement: !!training });
    if (!data || !data.petit_dejeuner || !data.dejeuner || !data.diner || !data.collation) throw fail('incomplete');
    return { at: new Date().toISOString(), lang: I.lang, by: provider(), day: dayI, training: !!training, data };
  }

  async function coach(sess, contexte, onProgress) {
    const data = await call('coach', { profil: profil(sess), contexte, messages: sess.chat.filter((m) => !m.pending).slice(-12) }, { timeout: 60000, onProgress });
    return data.texte;
  }

  const probe = (url, flag) => fetch(url, { method: 'GET' }).then((r) => (r.ok ? r.json() : null)).then((d) => { state[flag] = !!(d && d.ready); }).catch(() => {});
  const ping = Promise.all([probe(URL_AI, 'server'), CLOUD.fnUrl ? probe(`${CLOUD.fnUrl}gemini`, 'plus') : null]).then(() => provider() !== 'none');

  window.NA_AI = {
    get ready() { return provider() !== 'none'; }, get provider() { return provider(); }, get config() { return { ...cfg }; },
    get serverReady() { return state.server; }, get plusReady() { return state.plus; }, get plusReady() { return state.plus; }, get webgpu() { return state.webgpu; }, get localLoaded() { return !!state.engine; },
    can, setConfig, loadLocal, ping, mealPhoto, programme, nutrition, coach, profil, GEMINI, LOCAL,
  };
})();
