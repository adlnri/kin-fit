/* Kin Fit watches: a Bluetooth heart-rate strap or watch (Web Bluetooth, Chrome and Edge), and Strava or
   Whoop links through the "watch" Edge Function (supabase/functions/watch). The tokens never reach the page:
   it only receives the activities, recoveries and nights. Nothing here needs Kin Fit Plus. */
(() => {
  'use strict';

  const CLOUD = window.NA_CLOUD || {};
  const fail = (code) => { const e = new Error(code); e.code = code; return e; };

  /* ---------- Heart rate over Bluetooth ---------- */

  const hr = { dev: null, bpm: 0, at: 0, name: '', tries: 0, rec: null, fns: [] };
  const emit = () => hr.fns.forEach((f) => { try { f(); } catch (e) { /* listener errors stay local */ } });

  // Heart Rate Measurement (0x2A37): flag bit 0 says whether the value is on 8 or 16 bits.
  function onValue(ev) {
    const v = ev.target.value; const b = v.getUint8(0) & 1 ? v.getUint16(1, true) : v.getUint8(1);
    if (b < 25 || b > 240) return;
    hr.bpm = b; hr.at = Date.now();
    if (hr.rec && hr.at - hr.rec.last >= 1000) { hr.rec.s.push(b); hr.rec.last = hr.at; }
    emit();
  }
  async function attach(dev) {
    const server = await dev.gatt.connect();
    const ch = await (await server.getPrimaryService('heart_rate')).getCharacteristic('heart_rate_measurement');
    ch.addEventListener('characteristicvaluechanged', onValue);
    await ch.startNotifications(); hr.tries = 0;
  }
  async function connect() {
    if (!navigator.bluetooth) throw fail('unsupported');
    let dev;
    try { dev = await navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] }); } catch (e) { throw fail(e && e.name === 'NotFoundError' ? 'cancelled' : 'bluetooth'); }
    hr.dev = dev; hr.name = dev.name || '';
    // A strap that drops out (out of reach, sweat) is called back a few times.
    dev.addEventListener('gattserverdisconnected', () => {
      hr.bpm = 0; emit();
      if (hr.dev === dev && hr.tries < 3) { hr.tries += 1; setTimeout(() => { if (hr.dev === dev) attach(dev).then(emit).catch(() => {}); }, 1500 * hr.tries); }
    });
    try { await attach(dev); } catch (e) { hr.dev = null; throw fail('bluetooth'); }
    emit();
  }
  function disconnect() { const d = hr.dev; hr.dev = null; hr.bpm = 0; if (d && d.gatt.connected) d.gatt.disconnect(); emit(); }
  const live = () => (hr.dev && Date.now() - hr.at < 10000 ? hr.bpm : 0);

  // Recording during a guided session: one beat value per second.
  function startRec() { hr.rec = { s: [], last: 0, t0: Date.now() }; }
  function stopRec() {
    const r = hr.rec; hr.rec = null;
    if (!r || r.s.length < 60) return null;
    const avg = Math.round(r.s.reduce((t, x) => t + x, 0) / r.s.length);
    return { avg, max: Math.max(...r.s), min: Math.round((Date.now() - r.t0) / 60000) };
  }

  /* ---------- Zones and energy ---------- */

  // Tanaka's maximum heart rate, closer than 220 − age for adults.
  const fcMax = (age) => Math.round(208 - 0.7 * (+age || 30));
  const ZONES = ['Repos', 'Récupération', 'Endurance', 'Tempo', 'Seuil', 'Maximum'];
  function zone(bpm, age) {
    const f = bpm / fcMax(age);
    const z = f >= 0.9 ? 5 : f >= 0.8 ? 4 : f >= 0.7 ? 3 : f >= 0.6 ? 2 : f >= 0.5 ? 1 : 0;
    return { z, name: ZONES[z], pct: Math.round(f * 100) };
  }
  // Keytel et al. (2005): energy from the average heart rate, weight, age and sex.
  function kcalFromHr(avg, minutes, p) {
    const w = +p.poids || 70; const a = +p.age || 30;
    const perMin = p.sexe === 'femme' ? (-20.4022 + 0.4472 * avg - 0.1263 * w + 0.074 * a) / 4.184 : (-55.0969 + 0.6309 * avg + 0.1988 * w + 0.2017 * a) / 4.184;
    return Math.max(0, Math.round(perMin * minutes));
  }

  /* ---------- Strava and Whoop ---------- */

  const STATE_KEY = 'kinfit.watch.state';
  const here = () => location.href.split('#')[0].split('?')[0];
  const store = { get: () => { try { return localStorage.getItem(STATE_KEY) || ''; } catch (e) { return ''; } }, set: (v) => { try { if (v) localStorage.setItem(STATE_KEY, v); else localStorage.removeItem(STATE_KEY); } catch (e) { /* private window */ } } };

  let ids = null;
  async function clientIds() {
    if (ids) return ids;
    if (!CLOUD.fnUrl) return { strava: '', whoop: '' };
    try { const r = await fetch(`${CLOUD.fnUrl}watch`, { headers: { apikey: CLOUD.anonKey } }); ids = r.ok ? await r.json() : { strava: '', whoop: '' }; } catch (e) { return { strava: '', whoop: '' }; }
    return ids;
  }
  async function call(body) {
    const t = CLOUD.token ? await CLOUD.token() : null; if (!t) throw fail('signed_out');
    let r;
    try { r = await fetch(`${CLOUD.fnUrl}watch`, { method: 'POST', headers: { authorization: `Bearer ${t}`, apikey: CLOUD.anonKey, 'content-type': 'application/json' }, body: JSON.stringify(body) }); } catch (e) { throw fail('network'); }
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw fail((j.error && j.error.message) || (r.status === 404 ? 'not_deployed' : 'server'));
    return j;
  }

  // Opens the Strava or Whoop sign-in page; it comes back to the app with ?code=…&state=…
  async function link(p) {
    const id = (await clientIds())[p]; if (!id) throw fail('not_configured');
    const rnd = Array.from(crypto.getRandomValues(new Uint8Array(12)), (b) => b.toString(36).padStart(2, '0')).join('').slice(0, 16);
    const state = `${p}.${rnd}`; store.set(state);
    const q = p === 'strava'
      ? new URLSearchParams({ client_id: id, redirect_uri: here(), response_type: 'code', approval_prompt: 'auto', scope: 'read,activity:read_all', state })
      : new URLSearchParams({ client_id: id, redirect_uri: here(), response_type: 'code', scope: 'read:recovery read:workout read:sleep offline', state });
    location.href = `${p === 'strava' ? 'https://www.strava.com/oauth/authorize' : 'https://api.prod.whoop.com/oauth/oauth2/auth'}?${q}`;
  }
  // The answer of a sign-in started by link(), when the page has just come back from it.
  function returning() {
    const q = new URLSearchParams(location.search); const s = q.get('state') || '';
    const m = /^(strava|whoop)\.[a-z0-9]{8,32}$/.exec(s); if (!m) return null;
    return { provider: m[1], code: q.get('code') || '', error: q.get('error') || '', scope: q.get('scope'), ok: s === store.get() };
  }
  async function finish(x) {
    store.set('');
    if (!x.ok) throw fail('state');
    if (x.error || !x.code) throw fail('denied');
    if (x.provider === 'strava' && x.scope != null && !/activity:read/.test(x.scope)) throw fail('scope');
    return call({ action: 'connect', provider: x.provider, code: x.code, redirect: here() });
  }

  window.NA_WATCH = {
    bt: !!navigator.bluetooth, connect, disconnect, startRec, stopRec,
    get live() { return live(); }, get linked() { return !!hr.dev; }, get name() { return hr.name; }, get recording() { return !!hr.rec; },
    onChange: (f) => hr.fns.push(f), fcMax, zone, kcalFromHr,
    enabled: !!CLOUD.enabled, clientIds, link, returning, finish,
    status: () => call({ action: 'status' }), sync: (p, days) => call({ action: 'sync', provider: p, days }), unlink: (p) => call({ action: 'disconnect', provider: p }),
  };
})();
