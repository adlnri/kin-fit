(() => {
  'use strict';

  const {
    $, $$, esc, SPORTS, OBJECTIFS, MATERIEL, PDJ, EVITER, DAYS, DAYS_FULL, E, FOOD, GOAL_FOOD, DRINK,
    lvLabel, lvIdx, sportName, sportData, sportsOf, sportList, variant, loadText, setsReps, restrictionNote,
    buildPlan, sessionMeta, activity, dailyKcal, breakfast, DUREES, durOf, restOf, pairOf, FINISHER,
  } = window.NA;
  const M = window.NA_MEALS;
  const CLOUD = window.NA_CLOUD;
  const ALLERG = M.ALLERGENES;

  /* ---------- Icons: one 24px grid, 2px round stroke ---------- */

  const P = {
    camera: 'M4 8h3l2-3h6l2 3h3v11H4zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', play: 'M8 5v14l11-7z', pause: 'M8 5v14M16 5v14', prev: 'M18 6l-8 6 8 6M6 6v12', next: 'M6 6l8 6-8 6M18 6v12', sound: 'M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12',
    dumbbell: 'M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12',
    heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
    bowl: 'M3 11h18a9 9 0 0 1-18 0zM9 11c0-2.5 1.5-4.5 3.5-5.5M15 7.5c.8.9 1.3 2.1 1.3 3.5',
    clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
    watch: 'M9 2h6l1 4.2M8 6.2L9 2M8 17.8L9 22h6l1-4.2M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 9v3l2 1.5',
    drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
    flame: 'M12 21c-3.9 0-7-2.7-7-6.5 0-3.5 3-5.5 4-9 2 1.5 3 3.5 3 5.5 1-1 1.5-2 1.5-3.5 2.5 2 5.5 4.5 5.5 7 0 3.8-3.1 6.5-7 6.5z',
    trophy: 'M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8M9 17h6',
    send: 'M21 3L10 14M21 3l-7 18-4-7-7-4z',
    share: 'M4 13v7h16v-7M12 3v12M7 8l5-5 5 5',
    link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L12 6.3M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
    check: 'M5 12.5l4.5 4.5L19 7',
    plus: 'M12 5v14M5 12h14',
    minus: 'M5 12h14',
    x: 'M6 6l12 12M18 6L6 18',
    star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
    ball: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 7.5l3.8 2.8-1.4 4.4H9.6l-1.4-4.4z',
    glove: 'M7 10V7a3 3 0 0 1 3-3h4a4 4 0 0 1 4 4v5a5 5 0 0 1-5 5h-2a4 4 0 0 1-4-4v-1H6a2 2 0 0 1 0-4zM8 21h8',
    racket: 'M15 3a6 6 0 1 0 0 12a6 6 0 1 0 0-12zM10.8 13.2L4 20M6 16l2 2',
    wave: 'M3 9c2 0 2-2 4.5-2S10 9 12 9s2.5-2 4.5-2S19 9 21 9M3 15c2 0 2-2 4.5-2s2.5 2 4.5 2 2.5-2 4.5-2 2.5 2 4.5 2',
    belt: 'M3 10h18v4H3zM10 10h4v4h-4zM10.5 14l-2.5 7M13.5 14l2.5 7',
    bolt: 'M13 3L5 13h6l-1 8 8-10h-6z',
    leaf: 'M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19l7-7',
    stretch: 'M15 3a2 2 0 1 0 0 4a2 2 0 1 0 0-4zM14 9l-2.5 5 4.5 5.5M11.5 14L6 17l-1 3.5M13.5 10.5l5.5 2M13.5 10.5L8 9.5M3 21h18',
    calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
    chat: 'M4 5h16v11H9l-5 4z',
    album: 'M5 3h11a3 3 0 0 1 3 3v15H8a3 3 0 0 1-3-3zM9 8h6M9 12h6',
    home: 'M4 11l8-7 8 7M6 9.5V20h12V9.5',
    plan: 'M7 4h10v17H7zM10 8h4M10 12h4M10 16h2',
    user: 'M12 4a4 4 0 1 0 0 8a4 4 0 1 0 0-8zM4 21a8 8 0 0 1 16 0',
    inbox: 'M4 13l2-8h12l2 8v6H4zM4 13h5l1 2h4l1-2h5',
  };
  const icon = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${P[n] || P.star}"/></svg>`;
  const SPORT_ICON = { Football: 'ball', Handball: 'ball', Boxe: 'glove', Paddle: 'racket', Natation: 'wave', JJB: 'belt', Judo: 'belt' };

  /* ---------- Game content (authored, illustrative) ---------- */

  const SPORT_DEFI = {
    Football: { t: 'Sprints navette', unit: 'sprints', base: 30, steps: [1, 5], impact: true, why: 'Répéter les sprints, c’est gagner les duels en fin de match.' },
    Boxe: { t: 'Rounds de corde à sauter', unit: 'rounds', base: 10, steps: [1], impact: true, why: 'La corde construit le jeu de jambes et le souffle des derniers rounds.' },
    Paddle: { t: 'Allers-retours en pas chassés', unit: 'allers-retours', base: 60, steps: [5, 10], impact: true, why: 'Les déplacements latéraux font les points longs.' },
    Natation: { t: 'Longueurs de bassin', unit: 'longueurs', base: 40, steps: [2, 10], impact: false, why: 'Le volume régulier installe l’allure.' },
    JJB: { t: 'Relevés techniques', unit: 'relevés', base: 50, steps: [5, 10], impact: false, why: 'Se relever proprement, c’est reprendre le contrôle du combat.' },
    Judo: { t: 'Uchi-komi', unit: 'uchi-komi', base: 150, steps: [10, 25], impact: false, why: 'La répétition rend l’entrée de projection automatique.' },
    Handball: { t: 'Changements de direction', unit: 'appuis', base: 60, steps: [5, 10], impact: true, why: 'Des appuis vifs déséquilibrent ton défenseur.' },
    Autre: { t: 'Minutes de gainage', unit: 'min', base: 8, steps: [1], impact: false, why: 'Un tronc solide sert toutes les disciplines.' },
  };

  const SOCIAL = [
    { cid: 'squats', title: '100 squats dans la semaine', unit: 'squats', target: 100, cat: 'sport', icon: 'dumbbell', steps: [5, 10] },
    { cid: 'pompes', title: '50 pompes dans la semaine', unit: 'pompes', target: 50, cat: 'sport', icon: 'bolt', steps: [5, 10] },
    { cid: 'gainage', title: '5 minutes de gainage cumulées', unit: 'min', target: 5, cat: 'sport', icon: 'star', steps: [1] },
    { cid: 'corde', title: '20 minutes de corde à sauter', unit: 'min', target: 20, cat: 'cardio', icon: 'heart', steps: [1, 5] },
    { cid: 'marche', title: '20 km de marche dans la semaine', unit: 'km', target: 20, cat: 'cardio', icon: 'calendar', steps: [1, 5] },
    { cid: 'eau', title: '2 litres d’eau, 5 jours', unit: 'jours', target: 5, cat: 'eau', icon: 'drop', steps: [1] },
    { cid: 'pdj', title: '5 petits-déjeuners équilibrés', unit: 'matins', target: 5, cat: 'nutrition', icon: 'bowl', steps: [1] },
    { cid: 'soda', title: 'Zéro soda pendant 7 jours', unit: 'jours', target: 7, cat: 'nutrition', icon: 'leaf', steps: [1] },
    { cid: 'legumes', title: 'Des légumes à chaque repas, 3 jours', unit: 'jours', target: 3, cat: 'nutrition', icon: 'leaf', steps: [1] },
  ];

  const RANGS = [
    { id: 'bronze', n: 'Bronze', min: 0 },
    { id: 'argent', n: 'Argent', min: 200 },
    { id: 'or', n: 'Or', min: 500 },
    { id: 'platine', n: 'Platine', min: 1000 },
  ];
  const rangOf = (pts) => { let r = RANGS[0]; RANGS.forEach((x) => { if (pts >= x.min) r = x; }); return r; };
  const nextRang = (pts) => RANGS.find((x) => x.min > pts) || null;

  const STICKERS = [
    { id: 's1', cat: 'sport', icon: 'dumbbell', n: 'Premier pas', hint: 'Termine ta première séance.', cond: (s) => s.seances >= 1 },
    { id: 's2', cat: 'sport', icon: 'dumbbell', n: 'Tiercé', hint: 'Termine 3 séances.', cond: (s) => s.seances >= 3 },
    { id: 's3', rare: true, cat: 'sport', icon: 'trophy', n: 'Dix sur dix', hint: 'Termine 10 séances.', cond: (s) => s.seances >= 10 },
    { id: 's4', cat: 'cardio', icon: 'heart', n: 'Cœur lancé', hint: 'Boucle ton premier cardio.', cond: (s) => s.cardio >= 1 },
    { id: 's5', cat: 'cardio', icon: 'heart', n: 'Cœur solide', hint: 'Boucle 5 cardios.', cond: (s) => s.cardio >= 5 },
    { id: 's6', cat: 'sport', icon: 'calendar', n: 'Semaine pleine', hint: 'Fais toutes les séances d’une semaine.', cond: (s) => s.weeks >= 1 },
    { id: 's7', cat: 'sport', icon: 'bolt', n: 'Mon sport', hint: 'Réussis le défi de ton sport.', cond: (s) => s.sport >= 1 },
    { id: 's8', cat: 'sport', icon: 'leaf', n: 'Souple', hint: 'Fais 10 minutes de mobilité un jour de repos.', cond: (s) => s.mob >= 1 },
    { id: 'n1', cat: 'nutrition', icon: 'bowl', n: 'Bien parti', hint: 'Prends ton premier petit-déjeuner du plan.', cond: (s) => s.pdj >= 1 },
    { id: 'n2', cat: 'nutrition', icon: 'bowl', n: 'Cinq matins', hint: 'Prends 5 petits-déjeuners du plan.', cond: (s) => s.pdj >= 5 },
    { id: 'n3', cat: 'eau', icon: 'drop', n: 'Hydraté', hint: 'Bois tes 8 verres en une journée.', cond: (s) => s.eau >= 1 },
    { id: 'n4', rare: true, cat: 'eau', icon: 'drop', n: 'Source vive', hint: 'Atteins ton objectif d’eau 7 jours.', cond: (s) => s.eau >= 7 },
    { id: 'n5', cat: 'nutrition', icon: 'star', n: 'Semaine gourmande', hint: 'Réussis le défi « Cinq matins bien partis ».', cond: (s) => s.wpdj >= 1 },
    { id: 'n6', cat: 'eau', icon: 'star', n: 'Semaine fraîche', hint: 'Réussis le défi « Quatre jours hydratés ».', cond: (s) => s.weau >= 1 },
    { id: 'r1', cat: 'serie', icon: 'flame', n: 'Série de 3', hint: '3 séances prévues d’affilée sans en manquer.', cond: (s) => s.streakMax >= 3 },
    { id: 'r2', cat: 'serie', icon: 'flame', n: 'Série de 7', hint: '7 séances prévues d’affilée.', cond: (s) => s.streakMax >= 7 },
    { id: 'r3', rare: true, cat: 'serie', icon: 'flame', n: 'Série de 14', hint: '14 séances prévues d’affilée.', cond: (s) => s.streakMax >= 14 },
    { id: 'a1', cat: 'amis', icon: 'send', n: 'Provocateur', hint: 'Lance ton premier défi à quelqu’un.', cond: (s) => s.sent >= 1 },
    { id: 'a2', cat: 'amis', icon: 'check', n: 'Défi relevé', hint: 'Réussis un défi reçu ou lancé.', cond: (s) => s.social >= 1 },
    { id: 'a3', rare: true, cat: 'amis', icon: 'trophy', n: 'Trois relevés', hint: 'Réussis 3 défis entre amis.', cond: (s) => s.social >= 3 },
    { id: 'a4', cat: 'amis', icon: 'share', n: 'Ambassadeur', hint: 'Lance 5 défis.', cond: (s) => s.sent >= 5 },
    { id: 'b1', cat: 'rang', rang: 'bronze', icon: 'trophy', n: 'Bronze', hint: 'Crée tes trophées.', cond: () => true },
    { id: 'b2', cat: 'rang', rang: 'argent', icon: 'trophy', n: 'Argent', hint: '200 points.', cond: (s) => s.points >= 200 },
    { id: 'b3', cat: 'rang', rang: 'or', icon: 'trophy', n: 'Or', hint: '500 points.', cond: (s) => s.points >= 500 },
    { id: 'b4', cat: 'rang', rang: 'platine', icon: 'trophy', n: 'Platine', hint: '1 000 points.', cond: (s) => s.points >= 1000 },
  ];
  const ALBUM = [
    ['Sport', ['sport', 'cardio']],
    ['Nutrition', ['nutrition', 'eau']],
    ['Séries', ['serie']],
    ['Entre amis', ['amis']],
  ];

  /* ---------- State ---------- */

  const KEY = 'nutriapp.v2';
  let state = { current: null, sessions: [], pendingShare: null };
  try {
    const raw = localStorage.getItem(KEY) || localStorage.getItem('relance.v1');
    if (raw) state = JSON.parse(raw);
  } catch (e) { /* storage unavailable: run in memory */ }
  if (!state || !Array.isArray(state.sessions)) state = { current: null, sessions: [], pendingShare: null };

  const iso = (d) => { const x = new Date(d); x.setMinutes(x.getMinutes() - x.getTimezoneOffset()); return x.toISOString().slice(0, 10); };
  const TODAY = new Date(); TODAY.setHours(12, 0, 0, 0);
  const todayIdx = (TODAY.getDay() + 6) % 7;
  const dayDate = (i) => { const d = new Date(TODAY); d.setDate(d.getDate() + (i - todayIdx)); return d; };
  const weekId = iso(dayDate(0));

  const migrate = (s) => {
    s.log = s.log || {}; s.done = s.done || {}; s.points = s.points || 0; s.stickers = s.stickers || [];
    s.inbox = s.inbox || []; s.sent = s.sent || []; s.chat = s.chat || []; s.seed = s.seed || 0;
    s.sportCount = s.sportCount || {}; s.dupes = s.dupes || {}; s.shop = s.shop || {}; s.streakMax = s.streakMax || 0; s.created = s.created || iso(TODAY);
    if (s.profile) { s.profile.regime = s.profile.regime || 'omni'; s.profile.pratiques = s.profile.pratiques || []; if (s.profile.cheat == null) s.profile.cheat = 1; s.profile.budget = s.profile.budget || 'moyen'; s.profile.duree = durOf(s.profile); }
    delete s.checkins;
    return s;
  };
  state.sessions.forEach(migrate);
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* in-memory only */ } cloudPush(); };
  const cur = () => state.sessions.find((s) => s.id === state.current) || null;
  const lg = (sess, d) => { sess.log[d] = sess.log[d] || { ex: [], pdj: false, eau: 0, mob: false, status: '' }; return sess.log[d]; };

  const ui = { view: 'today', day: todayIdx, ob: null, defisTab: 'jour', planTab: 'programme', confirmDelete: false, printing: false, aiBusy: null, circuit: 'hyrox', circuitDur: null };
  const blank = () => ({ prenom: '', sexe: '', age: '', taille: '', poids: '', objectif: '', niveau: 50, seances: 3, duree: 60, materiel: [], restrictions: '', sports: [], autre: '', petitdej: '', eviter: [], regime: 'omni', pratiques: [], cheat: 1, budget: 'moyen', temps: 'libre' });

  /* ---------- Challenges ---------- */

  const doneKey = (it, d) => `j:${it.kind === 'muscu' ? 'seance' : 'cardio'}:${d}`;

  function sportDefi(p, sport = p.sports[0]) {
    let s = SPORT_DEFI[sport] || SPORT_DEFI.Autre;
    if (s.impact && /genou/i.test(p.restrictions || '')) s = SPORT_DEFI.Autre;
    return { ...s, target: Math.max(1, Math.round(s.base * [0.6, 1, 1.4][lvIdx(p.niveau)])) };
  }

  // Today's check-in (time available, how you feel) reshapes only today's session.
  const FORME = { fatigue: 'Fatigué', normal: 'Normal', forme: 'En forme' };
  const todayCheck = (sess) => (sess.today && sess.today.date === iso(TODAY) ? sess.today : null);
  function dayView(sess, dayI) {
    const c = todayCheck(sess);
    if (dayI !== todayIdx || !c) return sess;
    if (!c.min) return { ...sess, rest: true };
    const adj = { fatigue: -15, normal: 0, forme: 10 }[c.forme] || 0;
    return { ...sess, profile: { ...sess.profile, duree: c.min, niveau: Math.max(0, Math.min(100, sess.profile.niveau + adj)) } };
  }

  function dailyList(sess, dayI) {
    const sv = dayView(sess, dayI);
    const p = sess.profile; const d = iso(dayDate(dayI)); const L0 = lg(sess, d); const it = sv.rest ? null : buildPlan(sv).byDay(dayI);
    const out = [];
    if (it && it.kind === 'muscu') out.push({ key: doneKey(it, d), cat: 'sport', icon: 'dumbbell', pts: 30, title: 'Termine ta séance', desc: it.short, progress: Math.min(L0.ex.length, it.ex.length), target: it.ex.length, unit: 'exercices', mode: 'auto', hint: 'Coche chaque exercice dans Aujourd’hui.' });
    else if (it) out.push({ key: doneKey(it, d), cat: 'cardio', icon: 'heart', pts: 30, title: 'Boucle ton cardio', desc: it.type, progress: L0.status === 'faite' ? 1 : 0, target: 1, unit: '', mode: 'tap', act: 'cardio', label: 'Cardio terminé' });
    else out.push({ key: `j:mob:${d}`, cat: 'sport', icon: 'stretch', pts: 15, title: '10 minutes de mobilité', desc: 'Jour de repos actif', progress: L0.mob ? 1 : 0, target: 1, unit: '', mode: 'tap', act: 'mob', label: 'Mobilité faite' });
    out.push({ key: `j:pdj:${d}`, cat: 'nutrition', icon: 'bowl', pts: 10, title: omadOn(sess) ? 'Repas OMAD' : `Petit-déjeuner ${PDJ[p.petitdej]}`, desc: omadOn(sess) ? 'Ton repas unique, dans ta fenêtre' : 'Celui de ton plan, ou son alternative rapide', progress: L0.pdj ? 1 : 0, target: 1, unit: '', mode: 'tap', act: 'pdj', label: 'Je l’ai pris' });
    out.push({ key: `j:eau:${d}`, cat: 'eau', icon: 'drop', pts: 15, title: 'Bois 2 litres d’eau', desc: '8 verres de 25 cl dans la journée', progress: L0.eau, target: 8, unit: 'verres', mode: 'water' });
    return out;
  }

  function weekList(sess) {
    const p = sess.profile; const plan = buildPlan(sess);
    const days = [0, 1, 2, 3, 4, 5, 6].map((i) => iso(dayDate(i)));
    const n = plan.items.length;
    const seances = plan.items.filter((it) => sess.done[doneKey(it, days[it.day])]).length;
    const pdj = days.filter((d) => sess.done[`j:pdj:${d}`]).length;
    const eau = days.filter((d) => sess.done[`j:eau:${d}`]).length;
    // One weekly challenge per chosen sport; the first keeps the original counter key.
    const sports = p.sports.length ? p.sports.slice(0, 4) : [''];
    const sportCards = sports.map((sp, i) => {
      const sd = sportDefi(p, sp || undefined); const ck = i ? `${weekId}:${sp}` : weekId;
      return { key: i ? `s:sport:${weekId}:${sp}` : `s:sport:${weekId}`, cat: 'sport', icon: SPORT_ICON[sp] || 'bolt', pts: 60, title: `${sd.target} ${sd.unit}`, desc: `${sports.length > 1 ? `${sp} · ` : ''}${sd.t} sur la semaine. ${sd.why}`, progress: sess.sportCount[ck] || 0, target: sd.target, unit: sd.unit, mode: 'step', act: i ? `sport:${sp}` : 'sport', steps: sd.steps };
    });
    return {
      semaine: [
        { key: `s:seances:${weekId}`, cat: 'sport', icon: 'calendar', pts: 80, title: `${n} séances sur ${n}`, desc: 'Toutes les séances prévues cette semaine', progress: seances, target: n, unit: 'séances', mode: 'auto', hint: 'Se remplit quand tu termines tes séances.' },
        { key: `s:pdj:${weekId}`, cat: 'nutrition', icon: 'bowl', pts: 40, title: 'Cinq matins bien partis', desc: 'Ton petit-déjeuner du plan 5 jours cette semaine', progress: pdj, target: 5, unit: 'matins', mode: 'auto', hint: 'Valide ton petit-déjeuner chaque matin.' },
        { key: `s:eau:${weekId}`, cat: 'eau', icon: 'drop', pts: 40, title: 'Quatre jours hydratés', desc: 'Objectif 2 litres atteint 4 jours', progress: eau, target: 4, unit: 'jours', mode: 'auto', hint: 'Remplis tes 8 verres dans Aujourd’hui.' },
      ],
      sport: sportCards,
    };
  }

  const socialCard = (x) => ({ key: `x:${x.id}`, cat: x.cat, icon: x.icon, pts: 50, title: x.title, desc: x.self ? 'Défi que tu as lancé' : `Défi de ${x.from}`, progress: x.progress || 0, target: x.target, unit: x.unit, mode: 'social', id: x.id, steps: x.steps, msg: x.msg, from: x.from, self: x.self });

  function streakOf(sess) {
    const plan = buildPlan(sess); let n = 0; const d = new Date(TODAY);
    for (let i = 0; i < 180; i++) {
      const key = iso(d); if (key < sess.created) break;
      const it = plan.byDay((d.getDay() + 6) % 7);
      if (it) { if (sess.done[doneKey(it, key)]) n++; else if (i > 0) break; }
      d.setDate(d.getDate() - 1);
    }
    return n;
  }

  function stats(sess) {
    const keys = Object.keys(sess.done); const c = (pre) => keys.filter((k) => k.startsWith(pre)).length;
    return {
      seances: c('j:seance:') + c('j:cardio:'), cardio: c('j:cardio:'), mob: c('j:mob:'), pdj: c('j:pdj:'), eau: c('j:eau:'),
      weeks: c('s:seances:'), wpdj: c('s:pdj:'), weau: c('s:eau:'), sport: c('s:sport:'), social: c('x:'),
      sent: sess.sent.length, streakMax: sess.streakMax, points: sess.points,
    };
  }

  function settle(sess, quiet) {
    const gained = { pts: 0, defis: [], stickers: [], dupes: [] }; const won = [];
    const w = weekList(sess);
    const list = [...dailyList(sess, todayIdx), ...w.semaine, ...w.sport, ...sess.inbox.filter((x) => x.status === 'accepted').map(socialCard)];
    if (ui.day < todayIdx) list.push(...dailyList(sess, ui.day));
    list.forEach((c) => {
      if (c.progress >= c.target && !sess.done[c.key]) { sess.done[c.key] = iso(TODAY); sess.points += c.pts; gained.pts += c.pts; gained.defis.push(c.title); won.push(c); }
    });
    sess.streakMax = Math.max(sess.streakMax, streakOf(sess));
    const before = [...sess.stickers];
    const st = stats(sess);
    STICKERS.forEach((s) => { if (!sess.stickers.includes(s.id) && s.cond(st)) { sess.stickers.push(s.id); gained.stickers.push(s); } });
    if (!gained.stickers.length) {
      const c = won.find((x) => { const k = stakeFor(x.key, sess); return k && before.includes(k.id); });
      if (c) { const k = stakeFor(c.key, sess); sess.dupes[k.id] = (sess.dupes[k.id] || 0) + 1; gained.dupes.push(k); }
    }
    save();
    if (!quiet && (gained.pts || gained.stickers.length || gained.dupes.length)) celebrate(gained, !(gained.stickers.length || won.some((c) => /^(x|s):/.test(c.key))));
  }

  /* ---------- Sharing ---------- */

  const b64e = (o) => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const b64d = (s) => JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, '+').replace(/_/g, '/')))));

  const cleanPseudo = (x) => { const p = String(x || '').trim(); return /^[A-Za-z0-9_.-]{3,20}$/.test(p) ? p : ''; };
  function readShare() {
    const a = location.hash.match(/^#ami=([^&#]+)$/);
    const m = location.hash.match(/^#defi=([A-Za-z0-9_-]+)$/);
    if (!m && !a) return;
    if (a) { let p = ''; try { p = cleanPseudo(decodeURIComponent(a[1])); } catch (e) { p = ''; } if (p) state.pendingFriend = p; }
    if (m) try {
      const o = b64d(m[1]); const c = SOCIAL.find((x) => x.cid === o.cid);
      if (c) state.pendingShare = { id: String(o.id || Date.now()).replace(/[^\w-]/g, '').slice(0, 40), cid: c.cid, from: String(o.from || 'Un ami').slice(0, 40), msg: String(o.msg || '').slice(0, 120) };
      if (cleanPseudo(o.p)) state.pendingFriend = cleanPseudo(o.p);
    } catch (e) { /* malformed link: ignore it */ }
    history.replaceState(null, '', location.pathname + location.search);
    save();
  }

  const myPseudo = () => (CLOUD.linked && CLOUD.profile.pseudo) || '';
  const appUrl = () => location.href.split('#')[0].split('?')[0];
  const shareLink = (item, sess) => `${appUrl()}#defi=${b64e({ v: 1, id: item.id, cid: item.cid, from: sess.profile.prenom, msg: item.msg || '', p: myPseudo() })}`;
  // The app link; with an account it carries the pseudo so the friend can add you in one tap.
  const inviteLink = () => `${appUrl()}${myPseudo() ? `#ami=${encodeURIComponent(myPseudo())}` : ''}`;

  function addToInbox(sess, entry) {
    if (sess.inbox.some((x) => x.id === entry.id)) return false;
    sess.inbox.unshift(entry); return true;
  }

  /* ---------- Celebration ---------- */

  const ART = () => window.NA_ART || {};
  const pad = (n) => String(n).padStart(2, '0');
  function stickerArt(s, num, owned, big, dupes) {
    if (s.cat === 'rang') return patchArt(s.rang, s.n, owned);
    return `<figure class="stk stk--${s.cat}${owned ? ' is-owned' : ''}${owned && s.rare ? ' is-rare' : ''}${big ? ' stk--big' : ''}">
      ${owned ? `<span class="stk-num">${pad(num)}</span>` : ''}
      ${owned ? `<span class="stk-art">${ART()[s.id] || icon(s.icon)}</span>` : `<span class="stk-art stk-art--empty" aria-hidden="true"><b>${pad(num)}</b></span>`}
      <figcaption>${esc(s.n)}${owned ? '' : `<small>${esc(s.hint)}</small>`}</figcaption>
      ${dupes ? `<span class="stk-dupe" title="Exemplaires">×${dupes + 1}</span>` : ''}
    </figure>`;
  }
  const patchArt = (rang, name, owned) => `<figure class="patch patch--${rang}${owned ? ' is-owned' : ''}">${window.NA_BADGE ? window.NA_BADGE(rang, owned) : ''}<figcaption>${esc(name)}</figcaption></figure>`;

  const STAKE = [['j:seance:', ['s1', 's2', 's3']], ['j:cardio:', ['s4', 's5', 's1']], ['j:mob:', ['s8']], ['j:pdj:', ['n1', 'n2']], ['j:eau:', ['n3', 'n4']], ['s:seances:', ['s6']], ['s:pdj:', ['n5']], ['s:eau:', ['n6']], ['s:sport:', ['s7']], ['x:', ['a2', 'a3']]];
  function stakeFor(key, sess) {
    const row = STAKE.find(([p]) => key.startsWith(p)); if (!row) return null;
    const id = row[1].find((x) => !sess.stickers.includes(x)) || row[1][row[1].length - 1];
    return STICKERS.find((x) => x.id === id) || null;
  }

  function celebrate(g, light) {
    if (light) return stickToast(g);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const old = $('.cele'); if (old) old.remove();
    const tt = $('.toast'); if (tt) tt.remove();
    const s = g.stickers[0]; const d = !s && g.dupes[0];
    const shown = s || d;
    const el = document.createElement('div');
    el.className = 'cele'; el.setAttribute('role', 'status');
    const title = s ? `Nouvelle médaille : ${s.n}` : d ? `Doublon : ${d.n}` : (g.defis.length > 1 ? `${g.defis.length} défis réussis` : `Défi réussi : ${g.defis[0]}`);
    const nb = (x) => String(x).replace(/ ([:;!?])/g, ' $1');
    el.innerHTML = `<div class="cele-card">
      ${shown ? stickerArt(shown, STICKERS.indexOf(shown) + 1, true, true) : `<div class="cele-medal">${icon('trophy')}</div>`}
      <p class="cele-title">${esc(nb(title))}</p>
      ${d ? '<p class="cele-more">Garde-la pour l’offrir : tu peux la donner à un ami depuis tes trophées.</p>' : ''}
      ${g.pts ? `<p class="cele-pts">+${g.pts} points</p>` : ''}
      ${g.stickers.length > 1 ? `<p class="cele-more">et ${g.stickers.length - 1} autre${g.stickers.length > 2 ? 's' : ''} dans tes trophées</p>` : ''}
      <button type="button" class="btn btn--light" data-act="cele-close">Continuer</button>
    </div>`;
    document.body.appendChild(el);
    el.querySelector('button').focus({ preventScroll: true });
    if (!reduce) { const r = el.querySelector('.cele-card').getBoundingClientRect(); const cy = r.top + 110; sparks(innerWidth / 2, cy, 150, 1); setTimeout(() => { sparks(r.left + 20, cy, 60, 0.75); sparks(r.right - 20, cy, 60, 0.75); }, 220); }
    clearTimeout(celebrate.t);
    celebrate.t = setTimeout(() => { el.classList.add('is-out'); setTimeout(() => el.remove(), 300); }, 4800);
  }

  function stickToast(g) {
    const old = $('.stick-toast'); if (old) old.remove();
    const d = g.dupes[0];
    const el = document.createElement('div'); el.className = 'stick-toast'; el.setAttribute('role', 'status');
    el.innerHTML = `${d ? stickerArt(d, STICKERS.indexOf(d) + 1, true) : `<span class="stick-medal">${icon('check')}</span>`}<p><b>${esc(d ? `Doublon : ${d.n}` : g.defis[0] || 'Défi réussi')}</b>${g.pts ? `<span>+${g.pts} points</span>` : ''}${d ? '<span>À offrir depuis tes trophées</span>' : ''}</p>`;
    document.body.appendChild(el);
    const r = el.getBoundingClientRect(); sparks(r.left + 44, r.top + 36, 60, 0.6);
    setTimeout(() => { el.classList.add('is-out'); setTimeout(() => el.remove(), 300); }, 2800);
  }

  /* Gold sparks: white-hot heads cooling to gold then ember, with trails, flicker, gravity and branching */
  function sparks(x, y, n, force) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = document.createElement('canvas'); cv.className = 'sparks'; cv.setAttribute('aria-hidden', 'true');
    const dpr = Math.min(2, window.devicePixelRatio || 1); const W = innerWidth; const H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; document.body.appendChild(cv);
    const ctx = cv.getContext('2d'); ctx.scale(dpr, dpr); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const P = [];
    const add = (px, py, vx, vy, size, gen) => P.push({ x: px, y: py, vx, vy, size, gen, life: 1, decay: (gen ? 0.03 : 0.011) + Math.random() * 0.018, trail: [], ph: Math.random() * 6.28 });
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.7;
      const v = (2.5 + Math.random() * 10) * force;
      add(x + (Math.random() - 0.5) * 10, y + (Math.random() - 0.5) * 10, Math.cos(a) * v, Math.sin(a) * v, 0.8 + Math.random() * 1.8, 0);
    }
    const heat = (l) => (l > 0.82 ? '255,250,236' : l > 0.55 ? '255,221,140' : l > 0.3 ? '222,170,58' : '196,92,28');
    let t = 0;
    const step = () => {
      t++;
      ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, W, H); ctx.globalCompositeOperation = 'lighter';
      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i];
        p.trail.push(p.x, p.y); if (p.trail.length > 14) p.trail.splice(0, 2);
        p.vx *= 0.978; p.vy = p.vy * 0.978 + 0.2; p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (!p.gen && p.life < 0.62 && p.life > 0.6 - p.decay && Math.random() < 0.35) {
          for (let k = 0; k < 3; k++) add(p.x, p.y, p.vx * 0.45 + (Math.random() - 0.5) * 5, p.vy * 0.45 + (Math.random() - 0.5) * 5, p.size * 0.5, 1);
        }
        if (p.life <= 0) { P.splice(i, 1); continue; }
        const fl = 0.7 + 0.3 * Math.sin(t * 0.9 + p.ph); const col = heat(p.life);
        ctx.beginPath(); ctx.moveTo(p.trail[0], p.trail[1]);
        for (let k = 2; k < p.trail.length; k += 2) ctx.lineTo(p.trail[k], p.trail[k + 1]);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(${col},${0.12 * p.life * fl})`; ctx.lineWidth = p.size * 6; ctx.stroke();
        ctx.strokeStyle = `rgba(${col},${0.9 * p.life * fl})`; ctx.lineWidth = p.size; ctx.stroke();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.9, 0, 6.283);
        ctx.fillStyle = `rgba(255,250,236,${p.life * fl})`; ctx.fill();
      }
      if (P.length) requestAnimationFrame(step); else cv.remove();
    };
    requestAnimationFrame(step);
  }

  function toast(msg) {
    if ($('.cele')) return;
    const old = $('.toast'); if (old) old.remove();
    const el = document.createElement('p'); el.className = 'toast'; el.setAttribute('role', 'status'); el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }

  /* ---------- Shared pieces ---------- */

  const vidBtn = (id, label, kit) => `<button type="button" class="btn btn--glass" data-video="${id}"${kit ? ` data-vkit="${kit}"` : ''}>${icon('play')}${label ? esc(label) : 'Vidéo explicative'}</button>`;

  // The exercise of the library closest to a free name (AI sessions), for its in-app video.
  const FOLD = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const EX_WORDS = [[/burpee/, 'burpee'], [/mountain|grimpeur|escalador/, 'climber'], [/jumping jack|star jump/, 'jacks'], [/corde|jump rope|comba|skipping rope/, 'corde'], [/shadow/, 'shadow'],
    [/genoux|high knee|rodillas/, 'genoux'], [/patineur|skater|patinador/, 'patineur'], [/rameur|rowing machine|remo indoor|ergometre/, 'rameur'], [/velo|bike|cycling|bici/, 'velo'], [/course|run(ning)?|footing|jogging|carrera|correr/, 'course'],
    [/traineau|sled|trineo/, 'traineau'], [/wall ball/, 'wallball'], [/swing/, 'swing'], [/thruster/, 'thruster'], [/traction|pull-?up|chin-?up|dominada/, 'traction'], [/dips?|fondos/, 'dips'],
    [/souleve de terre roumain|romanian|rumano/, 'rdl'], [/souleve de terre|deadlift|peso muerto/, 'deadlift'], [/hip thrust/, 'hip'], [/pont|bridge|puente/, 'pont'], [/fente|lunge|zancada/, 'fente_av'],
    [/step-?up/, 'stepup'], [/squat saute|jump squat|sentadilla con salto/, 'jumpsq'], [/sumo/, 'sumo'], [/squat|sentadilla/, 'squat'], [/mollet|calf|gemelo/, 'mollet'], [/planche laterale|side plank|plancha lateral/, 'planche_lat'],
    [/planche|plank|plancha|gainage/, 'planche'], [/developpe couche|bench press|press de banca|pompe|push-?up|flexion/, 'bench'], [/militaire|shoulder press|overhead|press de hombro/, 'ohp'], [/tirage|pulldown|jalon/, 'pull'],
    [/rowing|row\b|remo con/, 'row'], [/face pull/, 'face'], [/pallof/, 'pallof'], [/fermier|farmer|granjero/, 'farmer'], [/curl/, 'curl'], [/triceps/, 'triceps'], [/elevation|lateral raise|elevacion/, 'elev_lat'],
    [/crunch/, 'crunch'], [/releve de jambes|leg raise/, 'releve'], [/superman/, 'superman'], [/dead ?bug/, 'deadbug'], [/rotation|twist|chop|giro/, 'chop'], [/battement|flutter/, 'flutter']];
  function exMatch(name) { const s = FOLD(name); const w = EX_WORDS.find(([re]) => re.test(s)); return w && E[w[1]] ? w[1] : null; }

  function meter(c) {
    const v = Math.min(c.progress, c.target); const pct = Math.round((v / c.target) * 100);
    return `<div class="meter" role="progressbar" aria-label="Progression : ${esc(c.title)}" aria-valuemin="0" aria-valuemax="${c.target}" aria-valuenow="${v}"><i style="--p:${pct / 100}"></i></div>`;
  }

  function defiActions(c, done, readOnly) {
    if (readOnly) return '';
    if (c.mode === 'tap') return `<button type="button" class="btn btn--${done ? 'done' : 'cat'}" data-tap="${c.act}" aria-pressed="${done}">${done ? icon('check') + 'Validé' : esc(c.label)}</button>`;
    if (c.mode === 'water') return glasses(c.progress);
    if ((c.mode === 'step' || c.mode === 'social') && done) return '';
    if (c.mode === 'step' || c.mode === 'social') {
      const attr = c.mode === 'social' ? `data-sstep="${c.id}` : `data-step="${c.act}`;
      return `<div class="stepper"><button type="button" class="round" ${attr}|-${c.steps[0]}" aria-label="Retirer ${c.steps[0]}">${icon('minus')}</button>${c.steps.map((n) => `<button type="button" class="btn btn--cat" ${attr}|${n}">${icon('plus')}${n}</button>`).join('')}</div>`;
    }
    return c.hint ? `<p class="hint">${esc(c.hint)}</p>` : '';
  }

  function stakeRow(c, sess, done) {
    if (done) return '';
    const k = stakeFor(c.key, sess); if (!k) return '';
    const dup = sess.stickers.includes(k.id);
    return `<p class="stake"><span class="stake-thumb stk--${k.cat}">${ART()[k.id] || ''}</span><span>${dup ? 'Doublon à gagner' : 'Compte pour la médaille'} <b>${esc(k.n)}</b></span></p>`;
  }

  function defiCard(c, sess, opts = {}) {
    const done = !!sess.done[c.key];
    const v = Math.min(c.progress, c.target);
    return `<article class="defi defi--${c.cat}${done ? ' is-done' : ''}${opts.big ? ' defi--big' : ''}">
      <div class="defi-badge">${icon(done ? 'check' : c.icon)}</div>
      <div class="defi-body">
        <div class="defi-top"><h3>${esc(c.title)}</h3><span class="pts">${done ? 'Réussi' : `+${c.pts} pts`}</span></div>
        <p class="defi-desc">${esc(c.desc)}</p>
        ${c.msg ? `<p class="defi-msg">« ${esc(c.msg)} »</p>` : ''}
        ${meter(c)}
        <p class="defi-count"><b>${v}</b> / ${c.target}${c.unit ? ` ${esc(c.unit)}` : ''}</p>
        ${opts.extra || ''}
        ${stakeRow(c, sess, done)}
        ${defiActions(c, done, opts.readOnly)}
      </div>
    </article>`;
  }

  function glasses(n) {
    return `<div class="glasses" role="group" aria-label="Verres d’eau bus">${Array.from({ length: 8 }, (_, i) => `<button type="button" class="glass${i < n ? ' is-full' : ''}" data-eau="${i + 1}" aria-pressed="${i < n}" aria-label="${i + 1} verre${i ? 's' : ''}"><svg viewBox="0 0 24 32" aria-hidden="true"><path d="M3 3h18l-2.5 26h-13z"/><path class="fill" d="M4.6 12h14.8l-1.7 17H6.3z"/></svg></button>`).join('')}</div>`;
  }

  function durControl(p) {
    return `<div class="level level--dur"><span class="label" id="dur-l">Durée</span><div class="seg" role="group" aria-labelledby="dur-l">${DUREES.map((n) => `<button type="button" data-dur="${n}" aria-pressed="${durOf(p) === n}">${n} min</button>`).join('')}</div></div>`;
  }

  function levelControl(p) {
    return `<div class="level">
      <label class="label" for="level">Niveau</label>
      <input type="range" id="level" data-level min="0" max="100" step="1" value="${p.niveau}">
      <output id="level-out" for="level">${lvLabel(p.niveau)}</output>
    </div>`;
  }

  function exDetails(id, v, ex, sd, key) {
    return `<details><summary>Pourquoi, technique, vidéo</summary><div class="more">
      <p><b>Pourquoi cet exercice.</b> ${esc(sd[ex.key] || sd[key])}</p>
      <p><b>Explication.</b> ${esc(ex.tech)}</p>
      <p><b>Erreur à éviter.</b> ${esc(ex.err)}</p>
      <div class="actions ex-acts">${vidBtn(id)}</div>
    </div></details>`;
  }

  function exRow(id, i, sess, item, opts) {
    const p = sess.profile; const ex = E[id]; const v = variant(ex, p); const sd = sportData(p, i);
    const checked = opts.log && opts.log.ex.includes(id);
    const pair = pairOf(i, item.ex.length, p);
    const rest = pair && pair.first ? 'enchaîne avec le B' : `repos ${restOf(ex, p)} s`;
    return `<li class="ex${checked ? ' is-checked' : ''}${pair ? ' ex--pair' : ''}">
      ${opts.check ? `<label class="tick"><input type="checkbox" data-ex="${id}"${checked ? ' checked' : ''}${opts.readOnly ? ' disabled' : ''}><span>${icon('check')}</span><b class="sr-only">${esc(v.n)} fait</b></label>` : `<span class="ex-num">${pair ? pair.label : i + 1}</span>`}
      <div class="ex-main">
        <h4>${pair && opts.check ? `<span class="pair-tag">${pair.label}</span> ` : ''}${esc(v.n)}</h4>
        <p class="ex-meta"><span data-sr="${id}" data-i="${i}">${setsReps(ex, p, sess.seed, i).txt}</span> · ${rest} · <span data-w="${id}">${esc(loadText(v, p))}</span></p>
        <p class="ex-muscle">${esc(ex.m)}</p>
        <button type="button" class="exo-btn" data-exo="${id}">${icon('album')}Voir la fiche</button>
        ${exDetails(id, v, ex, sd, item.tpl.key)}
      </div>
    </li>`;
  }

  function sessionCard(item, sess, opts = {}) {
    const p = sess.profile; const meta = sessionMeta(item, p, sess.seed);
    const note = restrictionNote(p, item.tpl.key);
    const L0 = opts.log;
    const n = L0 ? Math.min(L0.ex.length, item.ex.length) : 0;
    return `<article class="card card--sport">
      <header class="card-head"><span class="chip-ico">${icon('dumbbell')}</span><div><h2 class="h2">${esc(item.title)}</h2><p class="muted">${esc(item.tpl.obj)} · ${meta.duree} min · intensité ${meta.rpe}/10 · ≈ ${meta.kcal} kcal</p></div>
        ${opts.check ? `<span class="count-pill">${n}/${item.ex.length}</span>` : `<span class="day-pill">${DAYS[item.day]}</span>`}</header>
      ${note ? `<p class="note">${esc(note)}</p>` : ''}
      ${meta.express ? `<p class="note note--express"><b>Format express ${meta.duree} min.</b> Enchaîne chaque paire d’exercices (A puis B) sans pause et ne te repose qu’après le B. Termine par le finisher : la dépense estimée atteint environ ${meta.pct} % d’une séance classique d’une heure (${meta.ref} kcal).</p>` : ''}
      <ol class="exs">${item.ex.map((id, i) => exRow(id, i, sess, item, opts)).join('')}</ol>
      ${meta.express ? `<div class="finisher"><p class="label">Finisher · 4 min</p><p>8 rounds de 20 s à fond, 10 s de repos : ${esc(/genou/i.test(p.restrictions || '') ? FINISHER.knee : FINISHER.std)}.</p></div>` : ''}
      ${opts.check && !opts.readOnly ? `<div class="card-foot"><button type="button" class="link-btn" data-tap="miss" aria-pressed="${L0.status === 'manquee'}">${L0.status === 'manquee' ? 'Séance marquée manquée, annuler' : 'J’ai manqué cette séance'}</button></div>` : ''}
    </article>`;
  }

  function cardioCard(item, sess, opts = {}) {
    const note = /genou/i.test(sess.profile.restrictions || '') ? 'Genou signalé : remplace les sauts et les sprints par du vélo ou du rameur, même durée.' : '';
    const L0 = opts.log; const done = L0 && L0.status === 'faite';
    return `<article class="card card--cardio">
      <header class="card-head"><span class="chip-ico">${icon('heart')}</span><div><h2 class="h2">${esc(item.type)}</h2><p class="muted">Cardio · ${item.duree} min · ≈ ${item.kcal} kcal</p></div>${opts.check ? '' : `<span class="day-pill">${DAYS[item.day]}</span>`}</header>
      ${note ? `<p class="note">${esc(note)}</p>` : ''}
      <dl class="facts"><div><dt>Format</dt><dd>${esc(item.format)}</dd></div><div><dt>Objectif</dt><dd>${esc(item.obj)}</dd></div></dl>
      <p><b>Conseils techniques :</b> ${esc(item.conseils)}</p>
      ${(item.vids || []).length ? `<div class="actions ex-acts">${item.vids.filter((id) => E[id]).map((id) => vidBtn(id, variant(E[id], sess.profile).n)).join('')}</div>` : ''}
      ${opts.check && !opts.readOnly ? `<div class="card-foot"><button type="button" class="btn btn--${done ? 'done' : 'cat'}" data-tap="cardio" aria-pressed="${done}">${done ? icon('check') + 'Cardio terminé' : 'J’ai terminé mon cardio'}</button>${done && L0.auto ? `<span class="hint">Validé par ${L0.auto === 'whoop' ? 'Whoop' : 'Strava'}</span>` : ''}</div>` : ''}
    </article>`;
  }

  function recoCard(sess, title, opts = {}) {
    const p = sess.profile; const eau = (p.poids * 0.035).toFixed(1).replace('.', ',');
    const L0 = opts.log;
    return `<article class="card card--rest">
      <header class="card-head"><span class="chip-ico">${icon('stretch')}</span><div><h2 class="h2">${title}</h2><p class="muted">Repos actif</p></div></header>
      <p><b>Étirements recommandés :</b> fléchisseurs de hanche, ischio-jambiers, pectoraux, dorsaux, mollets. 30 secondes par zone, deux passages.</p>
      <p><b>Récupération :</b> environ ${eau} litres d’eau par jour, 7 à 9 heures de sommeil, 10 minutes de mobilité les jours sans séance, un jour de repos complet par semaine.</p>
      <p><b>Astuce pro :</b> ${esc(sportData(p, todayIdx).tip)}</p>
      ${L0 && !opts.readOnly ? `<div class="card-foot"><button type="button" class="btn btn--${L0.mob ? 'done' : 'cat'}" data-tap="mob" aria-pressed="${L0.mob}">${L0.mob ? icon('check') + 'Mobilité faite' : 'J’ai fait mes 10 minutes'}</button></div>` : ''}
    </article>`;
  }

  /* ---------- AI versions (written by /api/ai, see ai.js) ---------- */

  const AI = window.NA_AI;
  // AI text is already in the user's language: keep the live translator off it.
  const ai = (v) => `<span data-no-i18n>${esc(v)}</span>`;

  function aiNote(x, what) {
    const d = new Date(x.at).toLocaleDateString(window.NA_I18N.locale, { day: 'numeric', month: 'long' });
    return `<p class="ai-note">${icon('star')}<span><b>${what}</b> · ${d}</span></p>`;
  }

  function aiBusyCard(msg) {
    return `<article class="card ai-busy" role="status"><span class="ai-dots" aria-hidden="true"><i></i><i></i><i></i></span><p>${msg}</p></article>`;
  }

  function aiSessionCard(s) {
    const d = s.data;
    return `<article class="card card--sport">
      <header class="card-head"><span class="chip-ico">${icon('dumbbell')}</span><div><h2 class="h2"><span>Séance ${s.num}</span> · ${ai(d.titre)}</h2><p class="muted">${ai(d.objectif)} · ${d.duree_min} min · ${ai(d.intensite)}</p></div><span class="day-pill">${DAYS[s.day]}</span></header>
      <p>${ai(d.pourquoi)}</p>
      <ol class="exs">${d.exercices.map((x, i) => `<li class="ex"><span class="ex-num">${i + 1}</span>
        <div class="ex-main">
          <h4>${ai(x.nom)}</h4>
          <p class="ex-meta">${x.series} × ${ai(x.repetitions)} · <span>repos ${x.repos_sec} s</span> · ${ai(x.poids)}</p>
          <p class="ex-muscle">${ai(x.muscle)}</p>
          <details><summary>Pourquoi et technique</summary><div class="more">
            <p><b>Pourquoi cet exercice.</b> ${ai(x.pourquoi)}</p>
            <p><b>Explication.</b> ${ai(x.explication)}</p>
            <p><b>Erreur à éviter.</b> ${ai(x.erreur)}</p>
          </div></details>
          ${exMatch(x.nom) ? `<div class="actions ex-acts">${vidBtn(exMatch(x.nom))}<button type="button" class="btn btn--ghost" data-exo="${exMatch(x.nom)}">Voir la fiche</button></div>` : ''}
        </div></li>`).join('')}</ol>
    </article>`;
  }

  function aiCardioCard(c) {
    const d = c.data;
    return `<article class="card card--cardio">
      <header class="card-head"><span class="chip-ico">${icon('heart')}</span><div><h2 class="h2">${ai(d.type)}</h2><p class="muted">Cardio · ${d.duree_min} min</p></div>${c.day != null ? `<span class="day-pill">${DAYS[c.day]}</span>` : ''}</header>
      <dl class="facts"><div><dt>Format</dt><dd>${ai(d.format)}</dd></div><div><dt>Objectif</dt><dd>${ai(d.objectif)}</dd></div></dl>
      <p><b>Conseils techniques :</b> ${ai(d.conseils)}</p>
      <p><b>Pourquoi :</b> ${ai(d.pourquoi)}</p>
      ${exMatch(d.type) ? `<div class="actions ex-acts">${vidBtn(exMatch(d.type))}</div>` : ''}
    </article>`;
  }

  function aiRecoCard(r) {
    return `<article class="card card--rest">
      <header class="card-head"><span class="chip-ico">${icon('stretch')}</span><div><h2 class="h2">Récupération et conseils</h2><p class="muted">Repos actif</p></div></header>
      <p><b>Étirements recommandés :</b> ${ai(r.etirements.join(', '))}</p>
      <ul class="ai-list">${r.conseils.map((x) => `<li>${ai(x)}</li>`).join('')}</ul>
      <p><b>Astuce pro :</b> ${ai(r.astuce)}</p>
    </article>`;
  }

  function aiNutritionCards(x, sess) {
    const d = x.data; const b = d.petit_dejeuner;
    const kc = { p: b.proteines * 4, g: b.glucides * 4, l: b.lipides * 9 }; const sum = kc.p + kc.g + kc.l || 1;
    const pc = (v) => Math.round((v / sum) * 100);
    const dish = (m) => ({ n: m.nom, k: m.kcal, p: m.proteines, g: m.glucides, l: m.lipides, cost: m.cout, ing: m.ingredients.map((i) => ({ n: i.nom, q: i.quantite })), alts: [], why: m.pourquoi, ai: true });
    return `<article class="card card--nutrition">
      <header class="card-head"><span class="chip-ico">${icon('bowl')}</span><div><h2 class="h2"><span>Petit-déjeuner</span> ${ai(b.type)}</h2><p class="muted">${DAYS_FULL[x.day]} · ${x.training ? 'jour d’entraînement' : 'jour de repos'} · valeurs estimées</p></div></header>
      ${aiNote(x, 'Écrit par le coach IA')}
      <dl class="macros">
        <div class="m-k"><dt>Calories</dt><dd>${b.kcal}<small> kcal</small></dd></div>
        <div class="m-p"><dt>Protéines</dt><dd>${b.proteines}<small> g</small></dd></div>
        <div class="m-g"><dt>Glucides</dt><dd>${b.glucides}<small> g</small></dd></div>
        <div class="m-l"><dt>Lipides</dt><dd>${b.lipides}<small> g</small></dd></div>
      </dl>
      <div class="macro-bar" role="img" aria-label="Répartition des calories : protéines ${pc(kc.p)} %, glucides ${pc(kc.g)} %, lipides ${pc(kc.l)} %"><i class="p" style="width:${pc(kc.p)}%"></i><i class="g" style="width:${pc(kc.g)}%"></i><i class="l" style="width:${pc(kc.l)}%"></i></div>
      <ul class="ingr">${b.ingredients.map((i) => `<li>${ai(i.nom)}<b>${i.grammes} g</b></li>`).join('')}</ul>
      <p><b>Explication :</b> ${ai(b.explication)}</p>
      <p><b>Boisson :</b> ${ai(b.boisson)}</p>
      <p><b>Alternative rapide :</b> ${ai(b.alternative_rapide)}</p>
    </article>
    <article class="card card--nutrition">
      <header class="card-head"><span class="chip-ico">${icon('bowl')}</span><div><h2 class="h2">Déjeuner et dîner</h2><p class="muted">${esc(M.summary(sess.profile))}</p></div></header>
      ${dishBlock('Déjeuner', dish(d.dejeuner))}
      ${dishBlock('Dîner', dish(d.diner))}
      <p class="meal-snack"><span class="label">Collation</span> ${ai(d.collation.nom)} · ${d.collation.kcal} kcal</p>
    </article>`;
  }

  // The breakfast as a dish, so it opens in the recipe sheet with today's quantities.
  const bfDish = (sess, b) => ({ id: `bf-${sess.profile.petitdej}`, n: `Petit-déjeuner ${PDJ[sess.profile.petitdej]}`, k: b.tot.k, p: b.tot.p,
    ing: b.items.map((it) => ({ n: FOOD[it.id].n + (it.id === 'dinde' ? b.meat : ''), q: gramsLabel(it) })) });
  // Breakfasts validated on consecutive days, ending today or yesterday.
  function bfStreak(sess) {
    let n = 0; const d = new Date(TODAY); if (!sess.done[`j:pdj:${iso(d)}`]) d.setDate(d.getDate() - 1);
    while (sess.done[`j:pdj:${iso(d)}`] && n < 365) { n += 1; d.setDate(d.getDate() - 1); }
    return n;
  }
  const gramsLabel = (it) => { const f = FOOD[it.id]; if (f.unit) { const n = it.g / f.unit; return `${n} ${f.un}${n > 1 ? 's' : ''} · ${it.g} g`; } return `${it.g} g`; };

  function breakfastCard(sess, dayItem, L0, opts = {}) {
    if (omadOn(sess)) return omadCard(sess, dayItem, L0, opts);
    const p = sess.profile;
    const training = dayItem && (!L0 || L0.status !== 'manquee');
    const b = breakfast(p, training ? 1.08 : 0.95);
    const kc = { p: b.tot.p * 4, g: b.tot.g * 4, l: b.tot.l * 9 }; const sum = kc.p + kc.g + kc.l || 1;
    const pc = (v) => Math.round((v / sum) * 100);
    const quick = b.swaps ? `${b.tpl.alt} Remplace les aliments à éviter par ceux de la liste.` : b.tpl.alt;
    const drink = p.eviter.includes('lactose') && p.objectif === 'masse' ? 'Smoothie protéiné : 250 ml de boisson au soja, une poignée de fruits rouges' : DRINK[p.objectif];
    return `<article class="card card--nutrition">
      <header class="card-head"><span class="chip-ico">${icon('bowl')}</span><div><h2 class="h2">Petit-déjeuner ${PDJ[p.petitdej]}</h2><p class="muted">${training ? 'Version jour d’entraînement' : 'Version jour de repos'} · valeurs estimées</p></div></header>
      ${opts.full ? `<div class="seg" role="group" aria-label="Type de petit-déjeuner">${Object.entries(PDJ).map(([k, l]) => `<button type="button" data-bf="${k}" aria-pressed="${p.petitdej === k}">${l[0].toUpperCase() + l.slice(1)}</button>`).join('')}</div>` : ''}
      <dl class="macros">
        <div class="m-k"><dt>Calories</dt><dd>${b.tot.k}<small> kcal</small></dd></div>
        <div class="m-p"><dt>Protéines</dt><dd>${b.tot.p}<small> g</small></dd></div>
        <div class="m-g"><dt>Glucides</dt><dd>${b.tot.g}<small> g</small></dd></div>
        <div class="m-l"><dt>Lipides</dt><dd>${b.tot.l}<small> g</small></dd></div>
      </dl>
      <div class="macro-bar" role="img" aria-label="Répartition des calories : protéines ${pc(kc.p)} %, glucides ${pc(kc.g)} %, lipides ${pc(kc.l)} %"><i class="p" style="width:${pc(kc.p)}%"></i><i class="g" style="width:${pc(kc.g)}%"></i><i class="l" style="width:${pc(kc.l)}%"></i></div>
      <ul class="ingr">${b.items.map((it) => `<li><span>${esc(FOOD[it.id].n + (it.id === 'dinde' ? b.meat : ''))}</span><b>${gramsLabel(it)}</b></li>`).join('')}</ul>
      ${opts.full ? `<p><b>Explication :</b> ${esc(b.tpl.why)} ${esc([...new Set(sportsOf(p).map((s, i) => sportData(p, i).food))].join(' '))} ${esc(GOAL_FOOD[p.objectif])}</p>` : ''}
      <p><b>Boisson :</b> ${esc(drink)}.</p>
      <p><b>Alternative rapide :</b> ${esc(quick)}</p>
      ${opts.full || !L0 ? '' : ''}${altList(M.breakfastAlts(p, b.items))}
      ${recipeBtn(bfDish(sess, b))}
      ${L0 && !opts.readOnly ? `<div class="card-foot bf-defi"><p><b>Défi du matin</b> · +10 points${bfStreak(sess) > 1 ? ` · ${bfStreak(sess)} matins d’affilée` : ''}</p><button type="button" class="btn btn--${L0.pdj ? 'done' : 'cat'}" data-tap="pdj" aria-pressed="${L0.pdj}">${L0.pdj ? icon('check') + 'Petit-déjeuner pris' : 'Je l’ai pris'}</button></div>` : ''}
    </article>`;
  }

  function altList(alts) {
    if (!alts || !alts.length) return '';
    return `<div class="alts"><p class="label">Alternatives</p><ul>${alts.map((a) => `<li><span>${esc(a.from)}</span><span class="alt-arrow" aria-hidden="true">→</span><span>${esc(a.to)}</span><small>${esc(a.kind)}</small></li>`).join('')}</ul></div>`;
  }

  // Dishes shown on screen, by id and portion, so the recipe sheet can show the same quantities.
  const SHOWN = {};
  const recipeBtn = (d, cls = 'btn btn--glass') => {
    if (!d || d.ai || !window.NA_RECIPES || !window.NA_RECIPES.has(d.id)) return '';
    const key = `${d.id}-${d.k}`; SHOWN[key] = d;
    return `<button type="button" class="${cls}" data-recipe="${key}">${icon('bowl')}${d.id.startsWith('bf-') ? 'Voir la préparation' : 'Voir la recette'}</button>`;
  };

  function openRecipe(key) {
    const d = SHOWN[key]; const r = d && window.NA_RECIPES.get(d.id); if (!r) return;
    const old = $('#recipe'); if (old) old.remove();
    const dlg = document.createElement('dialog'); dlg.id = 'recipe'; dlg.className = 'dlg dlg--full recipe'; dlg.setAttribute('aria-labelledby', 'recipe-title');
    dlg.innerHTML = `<div class="dlg-body">
      <header class="dlg-head"><div><h2 class="h2" id="recipe-title">${esc(d.n)}</h2><p class="muted">≈ ${r.min} min · ${d.k} kcal · Protéines ${d.p} g</p></div><button type="button" class="round" data-act="recipe-close" aria-label="Fermer">${icon('x')}</button></header>
      <section class="exo-part"><h3 class="h3">Ingrédients pour toi</h3><ul class="ingr">${d.ing.map((i) => `<li><span>${esc(i.n)}</span><b>${esc(i.q)}</b></li>`).join('')}</ul></section>
      <section class="exo-part"><h3 class="h3">Préparation</h3><p class="hint">Touche une étape quand elle est faite.</p>
        <ol class="rc-steps" data-no-i18n>${r.steps.map((x, i) => `<li><button type="button" data-rstep="${i}" aria-pressed="false"><span class="rc-n">${i + 1}</span><span>${esc(x)}</span></button></li>`).join('')}</ol></section>
      ${r.prep ? `<p class="note" data-no-i18n>${esc(r.prep)}</p>` : ''}
      ${d.cheat ? `<p class="gold">${esc(M.CHEAT_TIP)}</p>` : ''}
      <p class="hint">Les quantités suivent ta portion du jour ; les étapes parlent de la viande, du poisson ou de la céréale si ton budget ou ta région ont changé un ingrédient.</p>
    </div>`;
    document.body.appendChild(dlg);
    dlg.addEventListener('close', () => dlg.remove());
    dlg.showModal();
  }

  function dishBlock(label, d) {
    if (!d) return `<section class="meal"><p class="label">${label}</p><p class="muted">Aucun plat ne correspond à toutes tes restrictions pour ce repas. Modifie ton profil ou demande au coach.</p></section>`;
    return `<section class="meal${d.cheat ? ' meal--cheat' : ''}">
      <p class="label">${label}${d.cheat ? ' · <span class="gold">Repas plaisir</span>' : ''}</p>
      <h3 class="meal-name">${d.ai ? ai(d.n) : esc(d.n)}</h3>
      <p class="meal-macros"><b>${d.k} kcal</b> · Protéines ${d.p} g · Glucides ${d.g} g · Lipides ${d.l} g</p>
      <p class="meal-cost"><span>Coût :</span> <b>${d.cost}</b>${d.min ? ` · <span>Temps :</span> <b data-no-i18n>${d.min} min</b>` : ''}</p>
      <details><summary>Ingrédients et conseils</summary><div class="more">
        <ul class="ingr">${d.ing.map((i) => (d.ai ? `<li>${ai(i.n)}<b data-no-i18n>${esc(i.q)}</b></li>` : `<li><span>${esc(i.n)}</span><b>${esc(i.q)}</b></li>`)).join('')}</ul>
        ${altList(d.alts)}
        <p>${d.ai ? ai(d.why) : esc(d.why)}</p>${d.cheat ? `<p class="gold">${esc(M.CHEAT_TIP)}</p>` : ''}
      </div></details>
      ${recipeBtn(d)}
    </section>`;
  }

  function weekNo() { const d = dayDate(0); const y = new Date(d.getFullYear(), 0, 1); return Math.floor((d - y) / 6048e5); }
  function mealsFor(sess, dayI) {
    const item = buildPlan(sess).byDay(dayI);
    const base = M.dayMeals(sess.profile, sess.seed, dayI, weekNo(), !!item);
    const sw = ((sess.log[iso(dayDate(dayI))] || {}).swap) || {};
    if (sw.dej) base.dej = M.dayMeals(sess.profile, sess.seed + sw.dej * 17, dayI, weekNo(), !!item).dej || base.dej;
    if (sw.diner) base.diner = M.dayMeals(sess.profile, sess.seed + sw.diner * 29, dayI, weekNo(), !!item).diner || base.diner;
    return base;
  }

  /* ---------- OMAD (one meal a day), adults in good health only ---------- */

  function omadBlocks(p) {
    const r = [];
    if (+p.age < 18) r.push('Le mode OMAD est réservé aux adultes : avant 18 ans, le corps a besoin de repas réguliers pour grandir.');
    if (p.poids / ((p.taille / 100) ** 2) < 18.5) r.push('Ton IMC est sous 18,5 : sauter des repas te ferait perdre du muscle et de l’énergie. Garde tes trois repas.');
    if (p.objectif === 'masse') r.push('Ton objectif est la prise de masse : il est très difficile de manger assez en un seul repas. Garde tes trois repas.');
    return r;
  }
  const omadOn = (sess) => !!(sess && sess.profile.omad && sess.profile.omad.on && !omadBlocks(sess.profile).length);
  function omadFor(sess, dayI) {
    const sw = ((sess.log[iso(dayDate(dayI))] || {}).swap) || {};
    return M.omadMeal(sess.profile, sess.seed + (sw.diner || 0) * 29, dayI, weekNo(), !!buildPlan(sess).byDay(dayI));
  }
  const omadMin = (p) => { const [h, m] = String((p.omad && p.omad.at) || '19:00').split(':').map(Number); return h * 60 + (m || 0); };
  const hhmm = (n) => `${String(Math.floor(n / 60) % 24).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
  const omadWindow = (p) => `${hhmm(omadMin(p))} – ${hhmm(omadMin(p) + 60)}`;
  function omadStatus(p) {
    const now = new Date(); const cur0 = now.getHours() * 60 + now.getMinutes(); const s = omadMin(p);
    if (cur0 >= s && cur0 < s + 60) return 'C’est ta fenêtre repas : prends le temps de manger.';
    const until = (s - cur0 + 1440) % 1440;
    return `Prochain repas dans ${Math.floor(until / 60)} h ${String(until % 60).padStart(2, '0')}.`;
  }

  function omadCard(sess, dayItem, L0, opts = {}) {
    const p = sess.profile; const dayI = ui.view === 'today' ? ui.day : todayIdx; const o = omadFor(sess, dayI);
    return `<article class="card card--nutrition omad">
      <header class="card-head"><span class="chip-ico">${icon('bowl')}</span><div><h2 class="h2">Ton repas unique</h2><p class="muted">Mode OMAD · fenêtre ${omadWindow(p)}</p></div></header>
      ${dayI === todayIdx ? `<p class="omad-status">${omadStatus(p)}</p>` : ''}
      <dl class="macros">
        <div class="m-k"><dt>Calories</dt><dd>${o.tot.k}<small> kcal</small></dd></div>
        <div class="m-p"><dt>Protéines</dt><dd>${o.tot.p}<small> g</small></dd></div>
        <div class="m-g"><dt>Glucides</dt><dd>${o.tot.g}<small> g</small></dd></div>
        <div class="m-l"><dt>Lipides</dt><dd>${o.tot.l}<small> g</small></dd></div>
      </dl>
      ${dishBlock('Plat principal', o.main)}
      ${o.sides.length ? `<h3 class="h3">Pour compléter</h3><ul class="ingr">${o.sides.map((s) => `<li><span>${esc(s.n)}</span><b>${s.k} kcal</b></li>`).join('')}</ul>` : ''}
      <p class="hint">Commence par l’entrée et la protéine, finis par le fruit. Si c’est trop pour un seul repas, mange à ta faim sans te forcer.</p>
      ${dayItem ? '<p class="note">Jour d’entraînement : place ta séance 1 à 3 heures avant ton repas. Si tu as la tête qui tourne ou que tu te sens faible, prends une collation protéinée : ce n’est pas un échec.</p>' : ''}
      <p><b>Pendant le jeûne :</b> eau, thé ou café sans sucre, et une pincée de sel dans l’eau si tu transpires beaucoup.</p>
      <p class="note omad-stop">Arrête le mode OMAD et parles-en à un médecin en cas de vertiges, de malaise, de palpitations, de règles qui s’arrêtent ou de pensées obsédantes autour de la nourriture.</p>
      <div class="actions">${dayI === todayIdx ? '<button type="button" class="link-btn" data-swap="diner">Autre idée</button>' : ''}<button type="button" class="btn btn--ghost" data-act="omad-open">Réglages OMAD</button></div>
      ${L0 && !opts.readOnly ? `<div class="card-foot bf-defi"><p><b>Défi du repas</b> · +10 points</p><button type="button" class="btn btn--${L0.pdj ? 'done' : 'cat'}" data-tap="pdj" aria-pressed="${L0.pdj}">${L0.pdj ? icon('check') + 'Repas pris' : 'Je l’ai pris'}</button></div>` : ''}
    </article>`;
  }

  function omadPromo(sess) {
    if (omadOn(sess)) return '';
    return `<article class="card omad-promo"><header class="card-head"><span class="chip-ico">${icon('clock')}</span><div><h2 class="h2">Mode OMAD</h2><p class="muted">Un seul repas par jour</p></div></header>
      <p>Tout ton besoin du jour dans un repas complet, pris dans une fenêtre d’une heure. Réservé aux adultes en bonne santé, avec des garde-fous.</p>
      <div class="actions"><button type="button" class="btn btn--ghost" data-act="omad-open">Découvrir le mode OMAD</button></div></article>`;
  }

  function openOmad() {
    const sess = cur(); if (!sess) return; const p = sess.profile; const on = omadOn(sess); const blocks = omadBlocks(p);
    const old = $('#omad'); if (old) old.remove();
    const at = (p.omad && p.omad.at) || '19:00';
    const hours = ['12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00'];
    const checks = ['J’ai 18 ans ou plus.', ...(p.sexe === 'femme' ? ['Je ne suis pas enceinte et je n’allaite pas.'] : []),
      'Je n’ai pas de diabète et je ne prends pas de traitement qui agit sur la glycémie.',
      'Je n’ai jamais eu de trouble du comportement alimentaire (anorexie, boulimie, hyperphagie).',
      'Je n’ai pas de maladie chronique (cœur, reins, foie, tension), ou mon médecin est d’accord.',
      'J’arrêterai en cas de vertiges, de malaise ou de fatigue inhabituelle.'];
    const dlg = document.createElement('dialog'); dlg.id = 'omad'; dlg.className = 'dlg dlg--sheet'; dlg.setAttribute('aria-labelledby', 'omad-title');
    dlg.innerHTML = `<form method="dialog" id="omad-form" class="dlg-body" novalidate>
      <header class="dlg-head"><h2 class="h2" id="omad-title">Mode OMAD : un repas par jour</h2><button type="button" class="round" data-act="omad-close" aria-label="Fermer">${icon('x')}</button></header>
      <p class="hint">Le principe : un seul repas complet par jour, dans une fenêtre d’une heure, et un jeûne le reste du temps. Cela peut aider à manger moins sans compter, mais ce n’est pas plus efficace que trois repas équilibrés, et ça ne convient pas à tout le monde.</p>
      ${blocks.length ? `<div class="note omad-stop">${blocks.map((x) => `<p>${x}</p>`).join('')}</div><div class="dlg-actions">${p.omad && p.omad.on ? '<button type="button" class="btn btn--ghost" data-act="omad-off">Désactiver le mode OMAD</button>' : ''}<button type="button" class="btn" data-act="omad-close">Compris</button></div>` : `
      ${on ? '' : `<fieldset><legend>Avant de commencer, vérifie que tout est vrai pour toi</legend><div class="stack omad-checks">${checks.map((c) => `<label class="check"><input type="checkbox" name="ok" value="1"><span>${c}</span></label>`).join('')}</div></fieldset>`}
      <fieldset><legend>Heure de ton repas</legend><div class="choices">${hours.map((h) => radio('at', h, h, at)).join('')}</div><p class="hint">Ta fenêtre repas dure une heure. Les jours d’entraînement, place ta séance avant le repas.</p></fieldset>
      <p class="form-error" id="omad-error" role="alert"></p>
      <div class="dlg-actions"><button type="submit" class="btn btn--big btn--sheen">${on ? 'Enregistrer' : 'Activer le mode OMAD'}</button>${on ? '<button type="button" class="btn btn--ghost" data-act="omad-off">Désactiver</button>' : ''}</div>`}
    </form>`;
    document.body.appendChild(dlg);
    dlg.addEventListener('close', () => dlg.remove());
    dlg.showModal();
  }

  function mealsCard(sess, dayI) {
    if (omadOn(sess)) return '';
    const m = mealsFor(sess, dayI);
    return `<article class="card card--nutrition">
      <header class="card-head"><span class="chip-ico">${icon('bowl')}</span><div><h2 class="h2">Déjeuner et dîner</h2><p class="muted">${esc(M.summary(sess.profile))}</p></div></header>
      ${dishBlock('Déjeuner', m.dej)}
      ${dishBlock('Dîner', m.diner)}
      ${m.snack ? `<p class="meal-snack"><span class="label">Collation</span> ${esc(m.snack.n)}</p>` : ''}
    </article>`;
  }

  function coachNote(sess, dayItem, L0) {
    const p = sess.profile; const prot = Math.round(p.poids * 0.3);
    if (!dayItem) return 'Jour de repos : petit-déjeuner allégé en glucides, priorité au sommeil et à dix minutes de mobilité. Ça compte pour ta médaille « Souple ».';
    if (L0.status === 'manquee') return 'Séance manquée : pas de rattrapage en double. Elle glisse sur ton prochain jour libre et ton petit-déjeuner repasse en version repos. Ta série reprend à la prochaine séance.';
    if (L0.status === 'faite' || L0.ex.length >= (dayItem.ex || []).length) return `Bien joué. Vise environ ${prot} g de protéines dans les deux heures. Si tes dernières répétitions étaient propres, on montera les charges la prochaine fois.`;
    if (L0.ex.length) return `Déjà ${L0.ex.length} exercice${L0.ex.length > 1 ? 's' : ''} sur ${dayItem.ex.length}. Garde le rythme, la médaille n’est pas loin.`;
    return `Au programme : ${dayItem.title}. Ton petit-déjeuner est renforcé pour alimenter l’effort. Coche tes exercices au fur et à mesure.`;
  }

  const foot = () => (AI.ready
    ? '<p class="foot">Les programmes et repas marqués « coach IA » sont écrits par une IA à partir de ton profil ; les autres sont des exemples calculés dans ton navigateur. Charges et valeurs nutritionnelles sont des estimations. En cas de douleur ou de pathologie, demande l’avis d’un professionnel de santé.</p>'
    : '<p class="foot">Prototype : programmes, défis et valeurs sont des exemples calculés dans ton navigateur, aucun modèle d’IA n’est encore connecté. Les valeurs nutritionnelles sont des estimations. En cas de douleur ou de pathologie, demande l’avis d’un professionnel de santé.</p>');

  function friendBanner() {
    const p = state.pendingFriend; if (!p || !CLOUD.enabled) return '';
    if (CLOUD.linked && (p.toLowerCase() === myPseudo().toLowerCase() || (ui.friends || []).some((f) => f.pseudo.toLowerCase() === p.toLowerCase()))) return '';
    return `<aside class="banner defi--amis" aria-label="Invitation reçue par lien">
      <span class="chip-ico">${icon('user')}</span>
      <div><p class="banner-title" data-no-i18n>${esc(p)}</p><p>${CLOUD.linked ? 't’invite à devenir amis sur Kin Fit.' : 't’invite sur Kin Fit. Crée ton compte gratuit pour devenir amis et vous lancer des défis.'}</p></div>
      <div class="actions">${CLOUD.linked ? '<button type="button" class="btn" data-act="invite-accept">Ajouter en ami</button>' : '<button type="button" class="btn" data-view="profil">Créer mon compte</button>'}<button type="button" class="btn btn--ghost" data-act="invite-later">Plus tard</button></div>
    </aside>`;
  }

  function pendingBanner() {
    const x = state.pendingShare; if (!x) return friendBanner();
    const c = SOCIAL.find((s) => s.cid === x.cid); if (!c) return '';
    return `${friendBanner()}<aside class="banner defi--${c.cat}" aria-label="Défi reçu par lien">
      <span class="chip-ico">${icon('inbox')}</span>
      <div><p class="banner-title">${esc(x.from)} te lance un défi : ${esc(c.title)}</p>${x.msg ? `<p>« ${esc(x.msg)} »</p>` : ''}</div>
      <div class="actions"><button type="button" class="btn" data-act="share-accept">Relever le défi</button><button type="button" class="btn btn--ghost" data-act="share-later">Plus tard</button></div>
    </aside>`;
  }

  /* ---------- Views ---------- */

  function scorebar(sess) {
    const r = rangOf(sess.points); const nx = nextRang(sess.points); const streak = streakOf(sess);
    const fresh = sess.inbox.filter((x) => x.status === 'new').length;
    return `<div class="scorebar">
      ${fresh ? `<button type="button" class="score score--inbox" data-goto="amis">${icon('inbox')}<b>${fresh}</b> défi${fresh > 1 ? 's' : ''} reçu${fresh > 1 ? 's' : ''}</button>` : ''}
      <span class="score score--streak" title="Séances prévues réussies d’affilée">${icon('flame')}<b>${streak}</b> ${streak > 1 ? 'séances' : 'séance'} d’affilée</span>
      <span class="score score--pts">${icon('star')}<b>${sess.points}</b> pts${nx ? `<small> · ${nx.min - sess.points} avant ${nx.n}</small>` : ''}</span>
      <button type="button" class="score score--rang" data-view="album" aria-label="Rang ${r.n}, voir les trophées">${window.NA_BADGE ? window.NA_BADGE(r.id, true) : ''}${r.n}</button>
    </div>`;
  }

  function hero(sess, item, daily, date, future) {
    const p = sess.profile; const day = date[0].toUpperCase() + date.slice(1);
    const title = ui.day === todayIdx ? `${new Date().getHours() < 18 ? 'Bonjour' : 'Bonsoir'}, ${esc(p.prenom)}` : esc(day);
    let name; let meta; let ico;
    if (!item) { name = 'Repos et récupération'; meta = '10 minutes de mobilité'; ico = 'stretch'; }
    else if (item.kind === 'muscu') { const m = sessionMeta(item, p, sess.seed); name = item.title; meta = `${m.duree} min · ${item.ex.length} exercices · ≈ ${m.kcal} kcal${m.express ? ' · express' : ''}`; ico = 'dumbbell'; }
    else { name = item.type; meta = `${item.duree} min de cardio · ≈ ${item.kcal} kcal`; ico = 'heart'; }
    const done = daily[0].progress >= daily[0].target;
    const n = daily.filter((c) => c.progress >= c.target).length; const C = 2 * Math.PI * 52;
    const cta = future ? 'Voir la séance' : done ? 'Voir ma séance' : 'Commencer';
    return `<section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <h1 class="hero-title" id="hero-title">${title}</h1>
        <p class="lede">${ui.day === todayIdx ? `${esc(day)} · ` : ''}${esc(sportName(p))}, objectif ${OBJECTIFS[p.objectif].toLowerCase()}${future ? ' · à venir' : ''}</p>
        ${ui.day === todayIdx ? (() => { const c = todayCheck(sess); return `<button type="button" class="checkin-chip" data-act="checkin">${icon('calendar')}<span>${c ? `${c.min ? `${c.min} min` : 'Repos'} · ${FORME[c.forme] || FORME.normal}` : 'Combien de temps aujourd’hui ?'}</span><b>${c ? 'Modifier' : 'Répondre'}</b></button>`; })() : ''}
        <div class="hero-session"><span class="chip-ico">${icon(ico)}</span><div><b>${esc(name)}</b><span>${esc(meta)}</span></div></div>
        <div class="actions"><button type="button" class="btn btn--big btn--sheen" data-act="start">${cta}</button><button type="button" class="btn btn--big btn--ghost btn--glass" data-act="parcours">${icon('bolt')}Faire un parcours</button></div>
      </div>
      <div class="hero-ring" role="img" aria-label="${n} défis du jour réussis sur ${daily.length}">
        <svg viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="ring-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c6ff00"/><stop offset=".45" stop-color="#ff5fa8"/><stop offset="1" stop-color="#ff2e88"/></linearGradient></defs>
          <circle class="ring-track" cx="60" cy="60" r="52"/><circle class="ring-val" cx="60" cy="60" r="52" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - n / daily.length)).toFixed(1)}" style="--c0:${C.toFixed(1)}"/></svg>
        <p><b>${n}<small>/${daily.length}</small></b><span>défis du jour</span></p>
      </div>
    </section>`;
  }

  function viewToday(sess) {
    const sv = dayView(sess, ui.day);
    const plan = buildPlan(sess); const item = sv.rest ? null : buildPlan(sv).byDay(ui.day);
    const d = dayDate(ui.day); const key = iso(d); const L0 = lg(sess, key);
    const future = ui.day > todayIdx;
    const date = d.toLocaleDateString(window.NA_I18N.locale, { weekday: 'long', day: 'numeric', month: 'long' });
    const week = DAYS.map((l, i) => {
      const it = plan.byDay(i); const k = iso(dayDate(i));
      const done = it ? !!sess.done[doneKey(it, k)] : !!sess.done[`j:mob:${k}`];
      const kind = it ? (it.kind === 'muscu' ? 'Muscu' : 'Cardio') : 'Repos';
      return `<button type="button" class="day day--${it ? it.kind : 'repos'}${i === todayIdx ? ' is-today' : ''}${done ? ' is-done' : ''}" data-day="${i}" aria-pressed="${i === ui.day}" aria-label="${DAYS_FULL[i]}, ${kind}${done ? ', réussi' : ''}${i === todayIdx ? ', aujourd’hui' : ''}">
        <span class="day-l">${l}</span><span class="day-n">${dayDate(i).getDate()}</span><span class="day-k">${done ? icon('check') : kind}</span></button>`;
    }).join('');
    const ro = future;
    const main = !item ? recoCard(sv, 'Repos et récupération', { log: L0, readOnly: ro }) : item.kind === 'muscu' ? sessionCard(item, sv, { check: true, log: L0, readOnly: ro }) : cardioCard(item, sv, { check: true, log: L0, readOnly: ro });
    const daily = dailyList(sess, ui.day);
    const water = daily.find((c) => c.mode === 'water');
    return `${pendingBanner()}
      ${hero(sv, item, daily, date, future)}
      <div class="hello hello--today">${scorebar(sess)}</div>
      <div class="week" role="group" aria-label="Semaine">${week}</div>
      <section class="daily" aria-label="Défis du jour">${daily.map((c) => defiCard(c, sess, { readOnly: true })).join('')}</section>
      <div class="today-grid">
        <div class="stack">${main}</div>
        <div class="stack">
          ${watchDayCard(sess, ui.day)}
          ${breakfastCard(sess, item, L0, { readOnly: ro })}
          ${mealsCard(sess, ui.day)}
          <article class="card card--eau"><header class="card-head"><span class="chip-ico">${icon('drop')}</span><div><h2 class="h2">Eau</h2><p class="muted">${water.progress} verre${water.progress > 1 ? 's' : ''} sur 8 · objectif 2 litres</p></div></header>${ro ? '' : glasses(water.progress)}</article>
          <article class="card card--coach"><header class="card-head"><span class="chip-ico">${icon('chat')}</span><div><h2 class="h2">Le mot du coach</h2></div></header>
            <p aria-live="polite">${esc(coachNote(sess, item, L0))}</p>
            <div class="actions"><button type="button" class="btn btn--ghost" data-view="coach">Poser une question</button><button type="button" class="btn btn--ghost" data-act="launch">${icon('send')}Lancer un défi</button></div></article>
        </div>
      </div>${foot()}`;
  }

  function viewDefis(sess) {
    const w = weekList(sess);
    const tabs = [['jour', 'Jour'], ['semaine', 'Semaine'], ['sport', 'Sport'], ['amis', 'Amis'], ['trophees', 'Trophées']];
    const fresh = sess.inbox.filter((x) => x.status === 'new').length;
    let body = '';
    if (ui.defisTab === 'jour') body = `<div class="defis">${dailyList(sess, todayIdx).map((c) => defiCard(c, sess)).join('')}</div>`;
    if (ui.defisTab === 'semaine') body = `<div class="defis">${w.semaine.map((c) => defiCard(c, sess)).join('')}</div>`;
    if (ui.defisTab === 'sport') body = `<div class="defis">${w.sport.map((c) => defiCard(c, sess, { big: true })).join('')}</div><p class="hint">Ajoute tes répétitions après chaque entraînement de ${esc(sportName(sess.profile))}. L’objectif s’adapte à ton niveau${/genou/i.test(sess.profile.restrictions || '') ? ' et à ton genou' : ''}.</p>`;
    if (ui.defisTab === 'amis') body = viewAmis(sess);
    if (ui.defisTab === 'trophees') body = viewAlbum(sess).replace(/^[\s\S]*?<\/header>/, '').replace(/<p class="foot">[\s\S]*$/, '');
    return `${pendingBanner()}
      <header class="hello"><div><h1 class="h1">Défis</h1><p class="lede">Chaque défi réussi rapporte des points et des médailles pour tes trophées.</p></div>${scorebar(sess)}</header>
      <div class="tabs" role="tablist" aria-label="Catégories de défis">${tabs.map(([k, l]) => `<button type="button" role="tab" aria-selected="${ui.defisTab === k}" data-tab="${k}">${l}${k === 'amis' && fresh ? ` <span class="dot-count">${fresh}</span>` : ''}</button>`).join('')}</div>
      <div role="tabpanel">${body}</div>${foot()}`;
  }

  function participants(item) {
    if (item.cloud) {
      const m = (item.members || []).filter((x) => x.status !== 'declined').map((x) => ({ n: x.pseudo, v: Math.min(x.me ? item.progress || 0 : x.progress || 0, item.target), me: x.me, wait: x.status === 'invited' }));
      return m.length > 1 ? `<ul class="duel" aria-label="Qui participe">${m.sort((a, b) => b.v - a.v).map((o) => `<li${o.me ? ' class="is-me"' : ''}><span>${esc(o.n)}${o.me ? ' (toi)' : o.wait ? ' (invité)' : ''}</span><i style="--v:${Math.round((o.v / item.target) * 100)}%"></i><b>${o.v}</b></li>`).join('')}</ul>` : '';
    }
    const out = [];
    state.sessions.forEach((s) => { const x = s.inbox.find((y) => y.id === item.id && y.status === 'accepted'); if (x) out.push({ n: s.profile.prenom, v: Math.min(x.progress || 0, x.target), me: s.id === state.current }); });
    return out.length > 1 ? `<ul class="duel" aria-label="Qui participe">${out.sort((a, b) => b.v - a.v).map((o) => `<li${o.me ? ' class="is-me"' : ''}><span>${esc(o.n)}${o.me ? ' (toi)' : ''}</span><i style="--v:${Math.round((o.v / item.target) * 100)}%"></i><b>${o.v}</b></li>`).join('')}</ul>` : '';
  }

  function viewAmis(sess) {
    const fresh = sess.inbox.filter((x) => x.status === 'new');
    const active = sess.inbox.filter((x) => x.status === 'accepted');
    return `${friendsBlock()}<div class="amis-head"><p>Lance un défi à quelqu’un sur cet appareil ou partage-le par lien. Chacun suit sa progression, et le premier arrivé gagne la médaille.</p>
        <button type="button" class="btn btn--amis" data-act="launch">${icon('send')}Lancer un défi</button></div>
      ${fresh.length ? `<h2 class="h3">Défis reçus</h2><div class="defis">${fresh.map((x) => `<article class="defi defi--${x.cat} is-invite">
        <div class="defi-badge">${icon(x.icon)}</div><div class="defi-body"><div class="defi-top"><h3>${esc(x.title)}</h3><span class="pts">+50 pts</span></div>
        <p class="defi-desc">De la part de ${esc(x.from)}</p>${x.msg ? `<p class="defi-msg">« ${esc(x.msg)} »</p>` : ''}
        <div class="actions"><button type="button" class="btn btn--cat" data-accept="${x.id}">Relever le défi</button><button type="button" class="btn btn--ghost" data-decline="${x.id}">Refuser</button></div></div></article>`).join('')}</div>` : ''}
      <h2 class="h3">En cours</h2>
      ${active.length ? `<div class="defis">${active.map((x) => defiCard(socialCard(x), sess, { extra: participants(x) + (x.cloud ? '' : `<button type="button" class="link-btn" data-copy="${x.id}">${icon('link')}Copier le lien du défi</button>`) })).join('')}</div>` : `<p class="empty">Aucun défi entre amis pour l’instant. Lance le premier !</p>`}
      ${sess.sent.length ? `<h2 class="h3">Envoyés</h2><ul class="sent">${sess.sent.slice(0, 8).map((x) => `<li>${icon('send')}<span><b>${esc(x.title)}</b> à ${esc(x.to)}</span></li>`).join('')}</ul>` : ''}`;
  }

  function viewAlbum(sess) {
    const owned = (id) => sess.stickers.includes(id);
    const total = STICKERS.length; const have = sess.stickers.length;
    const pages = ALBUM.map(([title, cats]) => {
      const list = STICKERS.filter((s) => cats.includes(s.cat));
      return `<section class="album-page"><h2 class="album-title">${title}<span>${list.filter((s) => owned(s.id)).length} / ${list.length}</span></h2>
        <div class="slots">${list.map((s) => { const d = owned(s.id) ? (sess.dupes[s.id] || 0) : 0; return `<div class="slot-wrap">${stickerArt(s, STICKERS.indexOf(s) + 1, owned(s.id), false, d)}${d && state.sessions.length > 1 ? `<button type="button" class="link-btn" data-give="${s.id}">${icon('send')}Donner un doublon</button>` : ''}</div>`; }).join('')}</div></section>`;
    }).join('');
    const r = rangOf(sess.points); const nx = nextRang(sess.points);
    return `<header class="hello"><div><h1 class="h1">Trophées</h1><p class="lede">${have} médaille${have > 1 ? 's' : ''} sur ${total}. Les emplacements vides indiquent comment les obtenir.</p></div>${scorebar(sess)}</header>
      <section class="rangs" aria-label="Rangs">
        <div class="patches">${STICKERS.filter((s) => s.cat === 'rang').map((s) => patchArt(s.rang, s.n, owned(s.id))).join('')}</div>
        <div><p class="h3">Rang ${r.n}</p><p class="muted">${nx ? `Encore ${nx.min - sess.points} points pour l’écusson ${nx.n}.` : 'Tu as tous les écussons. Respect.'}</p>
          ${nx ? `<div class="meter meter--rang" role="progressbar" aria-label="Progression vers ${nx.n}" aria-valuemin="${r.min}" aria-valuemax="${nx.min}" aria-valuenow="${sess.points}"><i style="--p:${((sess.points - r.min) / (nx.min - r.min)).toFixed(3)}"></i></div>` : ''}</div>
      </section>
      ${pages}${foot()}`;
  }

  function profileFacts(p, nutrition) {
    const rows = [['Sexe', p.sexe === 'femme' ? 'Femme' : 'Homme'], ['Âge', `${p.age} ans`], ['Taille', `${p.taille} cm`], ['Poids', `${p.poids} kg`], ['Objectif', OBJECTIFS[p.objectif]], [nutrition ? 'Sport principal' : 'Sports', nutrition ? sportName(p) : sportList(p)]];
    if (nutrition) rows.push(['Niveau d’activité', activity(p).label], ['Régime', M.REGIMES[p.regime || 'omni']], ['Pratiques', (p.pratiques || []).map((x) => M.PRATIQUES[x]).join(', ') || 'aucune'], ['Repas plaisir', `${p.cheat ?? 1} par semaine`], ['Budget', M.BUDGETS[p.budget || 'moyen']], ['Temps de cuisine', M.TEMPS[p.temps || 'libre']], ['Mode OMAD', p.omad && p.omad.on ? `Actif, repas à ${p.omad.at}` : 'Non'], ['Région', M.REGIONS[window.NA_I18N.region]]);
    else rows.push(['Niveau', `<span data-lv>${lvLabel(p.niveau)}</span>`], ['Séances', `${p.seances} par semaine`], ['Durée', `${durOf(p)} min par séance`], ['Matériel', p.materiel.map((m) => MATERIEL[m]).join(', ')]);
    return `<dl class="facts">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${k === 'Niveau' ? v : esc(v)}</dd></div>`).join('')}</dl>`;
  }

  /* ---------- Weekly shopping list ---------- */
  const AISLES = [
    ['Fruits et légumes', /haricots verts|petits pois|edamame|légume|brocoli|courgette|épinard|poivron|concombre|tomate|salade|crudité|champignon|bok choy|chou|carotte|avocat|banane|pomme(?! de terre)|fruit|citron|mangue|herbe|ail|cébette|algue|basilic|igname|plantain/i],
    ['Protéines', /poulet|dinde|bœuf|steak|agneau|saumon|thon|cabillaud|sardine|maquereau|lieu|merlu|crevette|tilapia|capitaine|œuf|tofu|viande|falafel|kebab/i],
    ['Produits laitiers et alternatives', /lait de coco|yaourt|skyr|feta|parmesan|emmental|fromage|mozzarella|cottage|cheddar|lait/i],
    ['Féculents et céréales', /riz|quinoa|pâte|nouille|pain|avoine|flocon|boulgour|orge|couscous|fonio|pommes de terre|patate|lentille|haricot|pois chiche|sarrasin|tortilla|galette|frite|naan|brioché|pita|burger/i],
    ['Épicerie', /./],
  ];
  const aisleOf = (n) => { const low = n.toLowerCase(); if (/^(pommes? de terre|patate|purée de patate|igname|plantain|pain|riz|sushis)/.test(low)) return 'Féculents et céréales'; if (/^lait de coco/.test(low) || /huile|sauce|miel|sirop|beurre de|purée de graines|amande|graine|curry|miso|bouillon|épice|cacahuète|tahini|vinaigr|sésame/.test(low)) return 'Épicerie'; return AISLES.find(([, re]) => re.test(n))[0]; };

  function shoppingList(sess) {
    const p = sess.profile; const plan = buildPlan(sess);
    const items = new Map(); const snacks = new Map();
    const DRY = /^(riz|quinoa|pâtes|nouilles|boulgour|orge|couscous|fonio)/i;
    const add = (name0, grams, pieces) => { const name = name0 === 'Œufs entiers' ? 'Œufs' : name0; const k = name; const v = items.get(k) || { n: name, g: 0, pcs: 0, dry: DRY.test(name) && (/cuit/.test(name) || /^Riz (rond|vinaigré)$/.test(name)) }; v.g += grams || 0; v.pcs += pieces || 0; items.set(k, v); };
    for (let i = 0; i < 7; i++) {
      const it = plan.byDay(i);
      if (omadOn(sess)) {
        const o = omadFor(sess, i);
        if (o.main) o.main.ing.forEach((x) => { const pc = x.q.match(/^(\d+) pièces$/); const g = x.q.match(/^(\d+) g$/); if (pc) add(x.n, 0, +pc[1]); else if (g) add(x.n, +g[1]); });
        o.sides.forEach((s) => snacks.set(s.n, (snacks.get(s.n) || 0) + 1));
        continue;
      }
      const b = breakfast(p, it ? 1.08 : 0.95);
      b.items.forEach((x) => { const f = FOOD[x.id]; add(f.n + (x.id === 'dinde' ? b.meat : ''), x.g); });
      const m = mealsFor(sess, i);
      [m.dej, m.diner].filter(Boolean).forEach((d) => d.ing.forEach((x) => {
        const pc = x.q.match(/^(\d+) pièces$/); const g = x.q.match(/^(\d+) g$/);
        if (pc) add(x.n, 0, +pc[1]); else if (g) add(x.n, +g[1]);
      }));
      if (m.snack) snacks.set(m.snack.n, (snacks.get(m.snack.n) || 0) + 1);
    }
    const groups = new Map(AISLES.map(([a]) => [a, []]));
    items.forEach((v) => groups.get(aisleOf(v.n)).push(v));
    groups.forEach((list) => list.sort((a, b) => a.n.localeCompare(b.n, 'fr')));
    return { groups: [...groups].filter(([, l]) => l.length), snacks: [...snacks] };
  }
  const qtyLabel = (v) => {
    if (/^Œufs/.test(v.n) && v.g) { const n = Math.round(v.g / 55); return `${n} œufs`; }
    if (v.pcs) return `${v.pcs} pièces`;
    if (v.dry) { const d = Math.max(10, Math.round((v.g * 0.38) / 10) * 10); return `${d} g sec`; }
    const g = Math.round(v.g / 10) * 10;
    return g >= 1000 ? `${(g / 1000).toFixed(1).replace('.', ',')} kg` : `${g} g`;
  };

  function viewCourses(sess, tabs) {
    const sl = shoppingList(sess); const checked = new Set(sess.shop[weekId] || []);
    const total = sl.groups.reduce((n, [, l]) => n + l.length, 0);
    const done = sl.groups.reduce((n, [, l]) => n + l.filter((v) => checked.has(v.n)).length, 0);
    return `<header class="hello"><div><h1 class="h1">Liste de courses</h1><p class="lede">Pour 7 jours : petits-déjeuners, déjeuners et dîners du plan, adaptés à ton budget et à ta région. Coche ce que tu as déjà.</p></div>
      <div class="actions"><button type="button" class="btn" data-act="shop-share">${icon('share')}Partager</button><button type="button" class="btn btn--ghost" data-act="shop-copy">${icon('link')}Copier la liste</button><button type="button" class="btn btn--ghost" data-act="print">Imprimer</button></div></header>${tabs}
      <article class="card shop">
        <header class="card-head"><span class="chip-ico">${icon('calendar')}</span><div><h2 class="h2">Semaine du ${dayDate(0).toLocaleDateString(window.NA_I18N.locale, { day: 'numeric', month: 'long' })}</h2><p class="muted"><span>${done} articles cochés sur ${total}</span> · ${esc(M.summary(sess.profile))}</p></div>
          ${done ? '<button type="button" class="link-btn" data-act="shop-reset">Tout décocher</button>' : ''}</header>
        <div class="shop-grid">${sl.groups.map(([aisle, list]) => `<section class="shop-aisle"><h3 class="h3">${aisle}</h3><ul>${list.map((v) => `<li><label class="shop-item${checked.has(v.n) ? ' is-checked' : ''}"><input type="checkbox" data-shop="${esc(v.n)}"${checked.has(v.n) ? ' checked' : ''}><span class="shop-box" aria-hidden="true">${icon('check')}</span><span class="shop-name">${esc(v.n)}</span><b class="shop-qty">${qtyLabel(v)}</b></label></li>`).join('')}</ul></section>`).join('')}
          ${sl.snacks.length ? `<section class="shop-aisle"><h3 class="h3">${omadOn(sess) ? 'Compléments du repas' : 'Collations'}</h3><ul>${sl.snacks.map(([n, k]) => `<li class="shop-snack"><span>${esc(n)}</span><b>× ${k}</b></li>`).join('')}</ul></section>` : ''}</div>
        <p class="hint">Les quantités sont des estimations, arrondies pour faciliter les courses. Riz, pâtes et céréales sont indiqués en poids sec.</p>
      </article>${foot()}`;
  }

  function shoppingText(sess) {
    const T = (x) => window.NA_I18N.t(x); const sl = shoppingList(sess); const checked = new Set(sess.shop[weekId] || []);
    const lines = [`Kin Fit · ${T('Liste de courses')}`];
    sl.groups.forEach(([aisle, list]) => { lines.push('', T(aisle)); list.forEach((v) => lines.push(`${checked.has(v.n) ? '[x]' : '[ ]'} ${T(v.n)} · ${T(qtyLabel(v))}`)); });
    if (sl.snacks.length) { lines.push('', T(omadOn(sess) ? 'Compléments du repas' : 'Collations')); sl.snacks.forEach(([n, k]) => lines.push(`- ${T(n)} × ${k}`)); }
    return lines.join('\n');
  }

  /* ---------- Circuits (parcours) ---------- */

  function viewParcours(sess, tabs) {
    const p = sess.profile; const C = window.NA_CIRCUITS;
    const c = C.build(p, ui.circuit, ui.circuitDur || durOf(p));
    const list = (xs) => `<ul class="ai-list">${xs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
    return `<header class="hello"><div><h1 class="h1">Parcours</h1><p class="lede">Des circuits à enchaîner sans temps mort : choisis ton style et ta durée, le rythme et le nombre de tours suivent ton niveau.</p></div>
      <div class="actions"><button type="button" class="btn btn--ghost" data-act="print">Imprimer</button></div></header>${tabs}
      <div class="parcours-pick">
        <div class="seg" role="group" aria-label="Type de parcours">${Object.entries(C.TYPES).map(([k, t]) => `<button type="button" data-circuit="${k}" aria-pressed="${k === c.type}">${icon(t.icon)}${t.name}</button>`).join('')}</div>
        <div class="seg" role="group" aria-label="Durée du parcours">${DUREES.map((n) => `<button type="button" data-cdur="${n}" aria-pressed="${n === c.duree}">${n} min</button>`).join('')}</div>
      </div>
      <article class="card card--sport parcours">
        <header class="card-head"><span class="chip-ico">${icon(c.icon)}</span><div><h2 class="h2">Parcours ${c.name.toLowerCase()}</h2><p class="muted">${c.sub}</p></div></header>
        ${c.missing ? '<p class="note">Il te faut une paire d’haltères. Pour débuter, des bouteilles d’eau ou un sac chargé font l’affaire.</p>' : ''}
        ${c.knee ? '<p class="note">Genou signalé : les sauts sont remplacés par des versions sans impact.</p>' : ''}
        <dl class="facts">${c.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
        <p>${esc(c.why)}</p>
        <div class="actions c-start"><button type="button" class="btn btn--big btn--sheen" data-act="circuit-start">${icon('play')}Commencer le parcours</button></div>
        <section class="parcours-part"><h3 class="h3">Échauffement · ${c.warm} min</h3>${list(c.warmList)}</section>
        <section class="parcours-part"><h3 class="h3">${c.part}</h3>
          <ol class="exs">${c.stations.map((x, i) => { const d = x.id && window.NA_EXO ? window.NA_EXO.detail(x.id, p, x.v) : null; return `<li class="ex ex--station${x.run ? ' ex--run' : ''}">${d && d.photos ? `<button type="button" class="st-ph" data-exo="${x.id}" aria-label="Fiche : ${esc(x.n)}"><img src="${d.photos[1]}" alt="" loading="lazy" decoding="async"><span>${i + 1}</span></button>` : `<span class="ex-num">${i + 1}</span>`}<div class="ex-main">
            <h4>${esc(x.n)}</h4>
            <p class="ex-meta">${esc(x.meta)}</p>
            <p class="ex-muscle">${esc(x.m)}</p>
            <details><summary>Technique</summary><div class="more">
              <p><b>Explication.</b> ${esc(x.tech)}</p>
              <p><b>Erreur à éviter.</b> ${esc(x.err)}</p>
            </div></details>
            ${x.id ? `<div class="actions ex-acts"><button type="button" class="btn btn--glass" data-video="${x.id}" data-vkit="${['gym', 'dumb', 'band', 'body'].find((k) => E[x.id][k] === x.v) || ''}">${icon('play')}Vidéo explicative</button><button type="button" class="btn btn--ghost" data-exo="${x.id}">Voir la fiche</button></div>` : ''}</div></li>`; }).join('')}</ol></section>
        <section class="parcours-part"><h3 class="h3">Retour au calme · ${c.cool} min</h3>${list(c.coolList)}</section>
        <p class="hint">Bois quelques gorgées entre les tours. Si une position fait mal, passe à l’exercice suivant.</p>
        <div class="actions c-start"><button type="button" class="btn btn--big btn--sheen" data-act="circuit-start">${icon('play')}Commencer le parcours</button></div>
      </article>${foot()}`;
  }

  /* ---------- Sport and Nutrition spaces ---------- */

  const tabBar = (label, attr, cur0, list) => `<div class="tabs" role="tablist" aria-label="${label}">${list.map(([k, l]) => `<button type="button" role="tab" ${attr}="${k}" aria-selected="${cur0 === k}">${l}</button>`).join('')}</div>`;
  const PLAN_TABS = /<div class="tabs" role="tablist" aria-label="Plan">[\s\S]*?<\/div>/;

  function viewSport(sess) {
    const t = ui.sportTab || 'programme';
    const tabs = tabBar('Sport', 'data-stab', t, [['programme', 'Programme'], ['parcours', 'Parcours'], ['exercices', 'Exercices']]);
    if (t === 'parcours') return viewParcours(sess, tabs);
    if (t === 'exercices') return viewLibrary(sess, tabs);
    ui.planTab = 'programme';
    return viewPlan(sess).replace(PLAN_TABS, tabs);
  }

  function viewNutrition(sess) {
    const t = ui.nutTab || 'jour';
    const tabs = tabBar('Nutrition', 'data-ntab', t, [['jour', 'Aujourd’hui'], ['semaine', 'Semaine'], ['courses', 'Courses']]);
    if (t === 'courses') return viewCourses(sess, tabs);
    ui.planTab = 'nutrition';
    const html = viewPlan(sess).replace(PLAN_TABS, tabs);
    if (t === 'semaine') return html;
    // Today: what you ate against what you need, then today's dishes.
    const m = mealsFor(sess, todayIdx);
    return html.replace(/<div class="today-grid">[\s\S]*$/, `<div class="today-grid"><div class="stack">${dayFoodCard(sess)}${breakfastCard(sess, buildPlan(dayView(sess, todayIdx)).byDay(todayIdx), lg(sess, iso(TODAY)), { full: true, readOnly: true })}</div>
      <div class="stack">${omadOn(sess) ? '' : `<article class="card card--nutrition"><header class="card-head"><span class="chip-ico">${icon('bowl')}</span><div><h2 class="h2">Déjeuner et dîner</h2><p class="muted">${esc(M.summary(sess.profile))}</p></div></header>${dishBlock('Déjeuner', m.dej)}${dishBlock('Dîner', m.diner)}${m.snack ? `<p class="meal-snack"><span class="label">Collation</span> ${esc(m.snack.n)}</p>` : ''}</article>`}${omadPromo(sess)}</div></div>${foot()}`);
  }

  function dayFoodCard(sess) {
    const p = sess.profile; const it = buildPlan(dayView(sess, todayIdx)).byDay(todayIdx); const L0 = lg(sess, iso(TODAY)); const eat = L0.eat || {};
    const b = breakfast(p, it ? 1.08 : 0.95); const m = mealsFor(sess, todayIdx);
    const rows = [['pdj', 'Petit-déjeuner', b.tot.k, !!L0.pdj], ['dej', 'Déjeuner', m.dej ? m.dej.k : 0, !!eat.dej], ['diner', 'Dîner', m.diner ? m.diner.k : 0, !!eat.diner], ['snack', 'Collation', Math.round(m.kcal * 0.1), !!eat.snack]];
    if (omadOn(sess)) rows.splice(0, rows.length, ['pdj', 'Repas unique', omadFor(sess, todayIdx).tot.k, !!L0.pdj]);
    (L0.photos || []).forEach((x) => { const r = rows.find((y) => y[0] === x.slot); if (r) { r[2] = x.kcal; r[3] = true; r[4] = x.plat; } else rows.push(['extra', 'Extra', x.kcal, true, x.plat]); });
    const got = rows.reduce((t, r) => t + (r[3] ? r[2] : 0), 0); const C = 2 * Math.PI * 52; const f = Math.min(1, got / (m.kcal || 1));
    return `<article class="card food-day"><header class="card-head"><span class="chip-ico">${icon('flame')}</span><div><h2 class="h2">Ta journée</h2><p class="muted">${it ? 'Jour d’entraînement' : 'Jour de repos'} · besoin estimé ${m.kcal} kcal</p></div></header>
      <div class="food-top"><div class="hero-ring food-ring" role="img" aria-label="${got} kcal sur ${m.kcal}"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="food-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c6ff00"/><stop offset=".45" stop-color="#ff5fa8"/><stop offset="1" stop-color="#ff2e88"/></linearGradient></defs><circle class="ring-track" cx="60" cy="60" r="52"/><circle class="ring-val" cx="60" cy="60" r="52" stroke="url(#food-gold)" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - f)).toFixed(1)}"/></svg><p><b>${got}</b><span>sur ${m.kcal} kcal</span></p></div>
        <ul class="food-rows">${rows.map(([k, n, kc, ok, ph]) => k === 'extra' ? `<li class="is-on"><span><b>${n}</b><small>${icon('camera')} <span data-no-i18n>${esc(ph)}</span> · ${kc} kcal</small></span></li>` : `<li class="${ok ? 'is-on' : ''}"><span><b>${n}</b><small>${ph ? `${icon('camera')} <span data-no-i18n>${esc(ph)}</span> · ` : '≈ '}${kc} kcal</small></span><span class="food-acts">${k === 'dej' || k === 'diner' ? `${recipeBtn(m[k], 'link-btn')}<button type="button" class="link-btn" data-swap="${k}">Autre idée</button>` : ''}<button type="button" class="btn btn--${ok ? 'done' : 'cat'}" data-eat="${k}" aria-pressed="${ok}">${ok ? icon('check') + 'Mangé' : 'J’ai mangé ça'}</button></span></li>`).join('')}</ul></div>
      <div class="meal-photo"><button type="button" class="btn btn--big btn--sheen" data-act="meal-photo">${icon('camera')}Photographier mon repas</button>${CLOUD.plus ? '' : '<span class="tag tag--plus">Plus</span>'}
        <input type="file" id="meal-file" accept="image/*" capture="environment" hidden></div>
    </article>`;
  }

  function viewLibrary(sess, tabs) {
    const p = sess.profile; const z = ui.libZone || 'all'; const X = window.NA_EXO;
    const ids = Object.keys(E).filter((id) => z === 'all' || E[id].key === z);
    const groups = [['all', 'Tout'], ['bas', 'Bas du corps'], ['haut', 'Haut du corps'], ['tronc', 'Tronc et gainage'], ['cardio', 'Cardio'], ['mobilite', 'Mobilité']];
    return `<header class="hello"><div><h1 class="h1">Exercices</h1><p class="lede">Tous les exercices de ton programme, adaptés à ton matériel. Touche-en un pour voir comment le faire et quel poids prendre.</p></div></header>${tabs}
      <div class="seg lib-filter" role="group" aria-label="Zone du corps">${groups.map(([k, l]) => `<button type="button" data-libz="${k}" aria-pressed="${z === k}">${l}</button>`).join('')}</div>
      <div class="lib-grid">${ids.map((id) => { const d = X ? X.detail(id, p) : { name: variant(E[id], p).n, zones: [] }; return `<button type="button" class="card lib-card" data-exo="${id}">${X ? (d.photos ? `<img class="lib-ph" src="${d.photos[1]}" alt="" loading="lazy" decoding="async">` : X.bodyMap(d.zones)) : ''}<b data-no-i18n>${esc(d.name)}</b><small>${esc(E[id].m)}</small></button>`; }).join('')}</div>${foot()}`;
  }

  function viewPlan(sess) {
    const p = sess.profile;
    const tabs = `<div class="tabs" role="tablist" aria-label="Plan"><button type="button" role="tab" data-ptab="programme" aria-selected="${ui.planTab === 'programme'}">Programme sportif</button><button type="button" role="tab" data-ptab="nutrition" aria-selected="${ui.planTab === 'nutrition'}">Nutrition</button><button type="button" role="tab" data-ptab="parcours" aria-selected="${ui.planTab === 'parcours'}">Parcours</button><button type="button" role="tab" data-ptab="courses" aria-selected="${ui.planTab === 'courses'}">Courses</button></div>`;
    if (ui.planTab === 'courses') return viewCourses(sess, tabs);
    if (ui.planTab === 'parcours') return viewParcours(sess, tabs);
    if (ui.planTab === 'nutrition') {
      const item = buildPlan(sess).byDay(todayIdx);
      const nut = sess.ai && sess.ai.nut && sess.ai.nut.date === iso(TODAY) ? sess.ai.nut : null;
      const nutBtns = AI.can('nutrition') ? `<div class="actions"><button type="button" class="btn" data-act="ai-nut"${ui.aiBusy ? ' disabled' : ''}>${icon('star')}${nut ? 'Réécrire avec l’IA' : 'Ma journée avec l’IA'}</button>${nut ? '<button type="button" class="btn btn--ghost" data-act="ai-nut-clear">Version exemple</button>' : ''}</div>` : '';
      const today = ui.aiBusy === 'nut' ? aiBusyCard('Le coach IA prépare tes repas du jour. Compte une vingtaine de secondes.')
        : nut ? aiNutritionCards(nut, sess) : breakfastCard(sess, item, lg(sess, iso(TODAY)), { full: true, readOnly: true });
      return `<header class="hello"><div><h1 class="h1">Nutrition</h1><p class="lede">Besoin estimé : ${dailyKcal(p)} kcal par jour. ${omadOn(sess) ? `Mode OMAD : tout en un repas, fenêtre ${omadWindow(p)}.` : 'Petit-déjeuner 25 %, déjeuner 35 %, dîner 30 %, collation 10 %, ajustés selon que tu t’entraînes ou non.'}</p></div>${nutBtns}</header>${tabs}
        <div class="today-grid"><div class="stack">${today}
          <article class="card card--nutrition"><header class="card-head"><span class="chip-ico">${icon('calendar')}</span><div><h2 class="h2">Repas de la semaine</h2><p class="muted">${esc(M.summary(p))}</p></div></header>
            <div class="week-meals">${DAYS.map((l, i) => { const m = mealsFor(sess, i); const cheat = (m.dej && m.dej.cheat) || (m.diner && m.diner.cheat); return `<details${i === todayIdx ? ' open' : ''}><summary><span class="wm-day">${DAYS_FULL[i]}</span><span class="wm-names">${omadOn(sess) ? esc(omadFor(sess, i).main.n) : `${esc(m.dej ? m.dej.n : '—')} · ${esc(m.diner ? m.diner.n : '—')}`}</span>${cheat ? '<span class="tag">Plaisir</span>' : ''}</summary>${omadOn(sess) ? dishBlock('Repas unique', omadFor(sess, i).main) : dishBlock('Déjeuner', m.dej) + dishBlock('Dîner', m.diner)}</details>`; }).join('')}</div>
          </article></div>
        <div class="stack"><article class="card"><header class="card-head"><span class="chip-ico">${icon('user')}</span><div><h2 class="h2">Profil nutrition</h2></div></header>${profileFacts(p, true)}
          <p><b>À éviter :</b> ${p.eviter.length ? esc(p.eviter.map((a) => ALLERG[a]).join(', ')) : 'rien de signalé'}.</p>
          <div class="actions"><button type="button" class="btn btn--ghost" data-act="edit">Modifier mon profil</button></div></article></div></div>${foot()}`;
    }
    const plan = buildPlan(sess);
    const prog = sess.ai && sess.ai.prog;
    const aiBtns = AI.can('programme') ? `<button type="button" class="btn" data-act="ai-prog"${ui.aiBusy ? ' disabled' : ''}>${icon('star')}${prog ? 'Réécrire avec l’IA' : 'Générer avec l’IA'}</button>${prog ? '<button type="button" class="btn btn--ghost" data-act="ai-prog-clear">Version exemple</button>' : ''}` : '';
    const cards = prog
      ? [...prog.seances.map((x) => ({ day: x.day, html: aiSessionCard(x) })), ...prog.cardio.map((x) => ({ day: x.day ?? 9, html: aiCardioCard(x) }))].sort((a, b) => a.day - b.day).map((x) => x.html).join('') + aiRecoCard(prog.recuperation)
      : plan.items.map((it) => (it.kind === 'muscu' ? sessionCard(it, sess) : cardioCard(it, sess))).join('') + recoCard(sess, 'Récupération et conseils');
    return `<header class="hello"><div><h1 class="h1">Programme sportif</h1><p class="lede">${OBJECTIFS[p.objectif]} · ${esc(sportList(p))} · ${prog ? 'coach IA' : `version ${sess.seed + 1}`}</p></div>
      <div class="actions">${aiBtns || `<button type="button" class="btn btn--glass" data-act="ai-setup">${icon('star')}Activer le coach IA</button>`}${prog ? '' : `<button type="button" class="btn${AI.can('programme') ? ' btn--ghost' : ''}" data-act="regen">Régénérer</button>`}<button type="button" class="btn btn--ghost" data-act="print">Imprimer</button></div></header>${tabs}
      <div class="stack">
        <article class="card"><header class="card-head"><span class="chip-ico">${icon('user')}</span><div><h2 class="h2">Profil résumé</h2></div></header>${profileFacts(p, false)}${prog ? '' : `${levelControl(p)}${durControl(p)}<p class="hint">Niveau et durée recalculent les charges, les séries et le nombre d’exercices de toutes les séances.</p>`}</article>
        ${ui.aiBusy === 'prog' ? aiBusyCard('Le coach IA écrit tes séances, une par une. Compte environ 30 secondes.') : ''}
        ${prog && ui.aiBusy !== 'prog' ? `${aiNote(prog, 'Écrit par le coach IA')}<p class="hint">Charges et durées sont des estimations de départ : ajuste-les dès ta première séance et arrête tout exercice douloureux. L’onglet Aujourd’hui garde le programme d’exemple pour cocher tes exercices.</p>` : ''}
        <div class="plan-grid">${ui.aiBusy === 'prog' ? '' : cards}</div>
      </div>${foot()}`;
  }

  function viewCoach(sess) {
    const msgs = sess.chat.length
      ? sess.chat.map((m) => (m.pending
        ? '<div class="msg msg--wait" aria-busy="true"><b>Coach</b><span class="ai-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="sr-only">Le coach écrit</span><small class="wait-note" aria-live="polite"></small></div>'
        : `<div class="msg${m.me ? ' msg--me' : ''}"><b>${m.me ? 'Toi' : 'Coach'}</b>${m.ai ? ai(m.t) : esc(m.t)}</div>`)).join('')
      : '<p class="empty">Aucun message pour l’instant. Essaie : « Par quoi remplacer le squat ? », « J’ai faim le soir », « Je suis fatigué aujourd’hui ».</p>';
    return `<header class="hello"><div><h1 class="h1">Ton coach</h1><p class="lede">${AI.ready ? 'Pose une question sur ta séance, ton assiette ou tes défis. Le coach IA répond à partir de ton profil.' : 'Pose une question sur ta séance, ton assiette ou tes défis. Les réponses de ce prototype sont écrites à l’avance.'}</p></div>${AI.ready ? '' : `<div class="actions"><button type="button" class="btn btn--sheen" data-act="ai-setup">${icon('star')}Activer le coach IA</button></div>`}</header>
      <article class="card card--coach chat-card">
        <div class="chat" id="chat" role="log" aria-label="Conversation avec le coach">${msgs}</div>
        <form class="chat-form" id="chat-form"><input class="input" id="chat-input" type="text" aria-label="Ton message" placeholder="Écris ta question" autocomplete="off" required><button class="btn" type="submit">${icon('send')}Envoyer</button></form>
      </article>${foot()}`;
  }

  /* ---------- Install as an app (PWA) ---------- */
  let installEvt = null;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvt = e; if (ui.view === 'profil') render(); });
  window.addEventListener('appinstalled', () => { installEvt = null; toast('Kin Fit est installée.'); if (ui.view === 'profil') render(); });
  const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  function installCard() {
    let body;
    if (standalone()) body = '<p>Kin Fit est installée sur cet appareil. Elle fonctionne aussi hors connexion.</p>';
    else if (installEvt) body = `<p>Ajoute Kin Fit à ton écran d’accueil : elle s’ouvre en plein écran et fonctionne hors connexion.</p><div class="actions"><button type="button" class="btn" data-act="install">${icon('share')}Installer l’app</button></div>`;
    else if (isIOS()) body = '<p>Sur iPhone : ouvre Kin Fit dans Safari, touche le bouton Partager, puis « Sur l’écran d’accueil ».</p>';
    else body = '<p>Ouvre Kin Fit dans Chrome, Edge ou Safari, puis choisis « Installer l’application » ou « Ajouter à l’écran d’accueil » dans le menu du navigateur.</p>';
    return `<article class="card"><header class="card-head"><span class="chip-ico">${icon('home')}</span><div><h2 class="h2">Installer l’app</h2></div></header>${body}</article>`;
  }

  /* ---------- Account (Supabase, see cloud.js) ---------- */

  const CLOUD_ERR = {
    pseudo_taken: 'Ce pseudo est déjà pris. Essaie une variante.',
    pseudo_invalid: 'Pseudo de 3 à 20 caractères : lettres, chiffres, point, tiret ou tiret bas.',
    not_found: 'Aucun compte avec ce pseudo. Vérifie l’orthographe.',
    network: 'Pas de connexion. Réessaie quand tu as du réseau.',
    offline: 'Le service de comptes ne répond pas. Réessaie plus tard.',
    rate_limited: 'Trop de liens demandés en peu de temps. Attends quelques minutes (jusqu’à une heure) avant de réessayer.',
    email_send: 'Le serveur n’arrive pas à envoyer l’e-mail de connexion. Vérifie les réglages SMTP dans Supabase (adresse Gmail et mot de passe d’application).',
    signup_disabled: 'Les inscriptions sont fermées dans Supabase (Authentication › Sign In / Providers).',
  };
  // Unknown errors show the server's own message, so the cause can be fixed.
  const cloudErr = (e) => CLOUD_ERR[e && e.code] || `Ça n’a pas marché${e && e.detail ? ` (${e.detail})` : ''}. Réessaie dans un moment.`;

  // What the account keeps: the whole session, minus device-only bits; shared challenges live on the server.
  function cloudState(sess) {
    const s = JSON.parse(JSON.stringify(sess)); delete s.id; delete s.uid; delete s.cloudAt;
    s.inbox = (s.inbox || []).filter((x) => !x.cloud);
    s.prefs = { lang: window.NA_I18N.lang, country: window.NA_I18N.prefs.country || '' };
    return s;
  }

  let pushTimer = null;
  function cloudPush(now) {
    const sess = cur();
    if (!CLOUD.linked || !sess || sess.uid !== CLOUD.user.id) return Promise.resolve();
    clearTimeout(pushTimer);
    const run = () => CLOUD.push(cloudState(sess)).then((at) => {
      if (!at) return; sess.cloudAt = at; ui.syncAt = new Date(at).toLocaleTimeString(window.NA_I18N.locale, { hour: '2-digit', minute: '2-digit' });
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* in-memory only */ }
    }).catch(() => { /* offline: the next save retries */ });
    if (now) return run();
    pushTimer = setTimeout(run, 2500); return Promise.resolve();
  }

  function adopt(sess, remote, at) {
    const keep = { id: sess.id, uid: sess.uid, inbox: (sess.inbox || []).filter((x) => x.cloud) };
    Object.keys(sess).forEach((k) => { delete sess[k]; });
    Object.assign(sess, JSON.parse(JSON.stringify(remote)), keep, { cloudAt: at });
    migrate(sess); delete sess.prefs;
    if (remote.prefs && remote.prefs.country && !window.NA_I18N.prefs.country) window.NA_I18N.set(remote.prefs);
  }

  // Ties the signed-in account to a session on this device; the newest copy wins.
  async function linkAccount() {
    const u = CLOUD.user; const pr = CLOUD.profile;
    if (!u || !pr) { if (ui.view === 'profil' || ui.ob) render(); return; }
    const remote = pr.state && pr.state.profile ? pr.state : null;
    let sess = state.sessions.find((x) => x.uid === u.id);
    if (!sess) {
      const c = cur();
      if (!remote) { if (c) { c.uid = u.id; save(); await cloudPush(true); } render(); return refreshSocial(); }
      const untouched = (x) => !x.points && !Object.keys(x.done || {}).length;
      if (c && !c.uid && untouched(c)) sess = c;
      else { sess = migrate({ id: `s${Date.now()}`, seed: 0, profile: remote.profile }); state.sessions.push(sess); }
      sess.uid = u.id; adopt(sess, remote, pr.updated_at); state.current = sess.id; ui.ob = null;
      toast(`Progression de ${pr.pseudo} récupérée.`);
    } else if (remote && pr.updated_at > (sess.cloudAt || '')) adopt(sess, remote, pr.updated_at);
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* in-memory only */ }
    if (!document.activeElement.matches('input, textarea, select')) render();
    refreshSocial(); finishWatchLink();
  }

  async function refreshSocial() {
    if (!CLOUD.linked) { ui.friends = null; return; }
    try {
      const [fr, ch] = await Promise.all([CLOUD.friends(), CLOUD.challenges()]);
      ui.friends = fr || [];
      const sess = state.sessions.find((x) => x.uid === CLOUD.user.id);
      if (sess) {
        const me = CLOUD.profile.pseudo; const prev = new Map(sess.inbox.filter((x) => x.cloud).map((x) => [x.id, x]));
        const items = (ch || []).map((c) => {
          const old = prev.get(c.id); const mine = Math.max(c.my_progress || 0, old ? old.progress || 0 : 0);
          if (old && (old.progress || 0) > (c.my_progress || 0)) CLOUD.setProgress(c.id, old.progress).catch(() => {});
          const status = old && old.status === 'accepted' ? 'accepted' : c.my_status === 'invited' ? 'new' : 'accepted';
          return { id: c.id, cloud: true, cid: c.cid, title: c.title, unit: c.unit, target: c.target, cat: c.cat, icon: c.icon, steps: c.steps, msg: c.msg, from: c.from_pseudo, self: c.from_pseudo === me, status, progress: mine, members: c.members || [], at: String(c.created_at).slice(0, 10) };
        });
        sess.inbox = [...items, ...sess.inbox.filter((x) => !x.cloud)];
        if (sess === cur()) settle(sess, true); else save();
      }
      if (['defis', 'profil', 'today'].includes(ui.view) && !ui.ob && !document.activeElement.matches('input, textarea, select')) render();
    } catch (e) { /* offline: keep what we have */ }
  }

  const loginForm = () => `<form id="login-form" class="ai-block" novalidate>
      <div class="field"><label for="login-email">Ton e-mail</label><input class="input" id="login-email" type="email" autocomplete="email" inputmode="email" placeholder="prenom@exemple.fr"></div>
      <div class="actions"><button type="submit" class="btn">Recevoir le lien de connexion</button>${CLOUD.google ? '<button type="button" class="btn btn--ghost" data-act="login-google">Continuer avec Google</button>' : ''}</div>
      <p class="hint ai-status" id="login-status" role="status"></p></form>`;

  function accountCard(sess) {
    if (!CLOUD.enabled) return '';
    const u = CLOUD.user; const pr = CLOUD.profile; let body;
    if (!u) body = `<p>Facultatif et gratuit : sauvegarde ta progression, retrouve-la sur tous tes appareils et défie tes amis où qu’ils soient. Pas de mot de passe : tu reçois un lien par e-mail.</p>${loginForm()}`;
    else if (!pr) body = `<form id="pseudo-form" class="ai-block" novalidate><p>Connecté avec ${esc(u.email || 'ton compte')}. Choisis ton pseudo : c’est lui que tes amis chercheront.</p>
        <div class="field"><label for="pseudo">Pseudo</label><input class="input" id="pseudo" type="text" maxlength="20" autocomplete="nickname" autocapitalize="off" spellcheck="false" placeholder="adil_fit"><p class="hint">3 à 20 caractères : lettres, chiffres, point, tiret ou tiret bas.</p></div>
        <label class="consent"><input type="checkbox" id="consent"><span>J’accepte que Kin Fit enregistre mon profil sportif et ma progression, y compris des données de santé (poids, douleurs, allergies), pour me les rendre sur mes appareils. Je peux les exporter ou les supprimer à tout moment. <a href="confidentialite.html" target="_blank" rel="noopener">Politique de confidentialité</a></span></label>
        <div class="actions"><button type="submit" class="btn">Créer mon compte</button><button type="button" class="btn btn--ghost" data-act="logout">Se déconnecter</button></div>
        <p class="hint ai-status" id="pseudo-status" role="status"></p></form>`;
    else body = `<div class="ai-block"><p><b>${esc(pr.pseudo)}</b> · ${esc(u.email || '')}</p>
        <p class="hint">${sess.uid === u.id ? `Progression sauvegardée${ui.syncAt ? ` à ${ui.syncAt}` : ''}.` : 'Ce compte est lié à une autre session de cet appareil.'}</p>
        <div class="actions"><button type="button" class="btn btn--ghost" data-act="sync-now">Synchroniser</button><button type="button" class="btn btn--ghost" data-act="export">Exporter mes données</button><button type="button" class="btn btn--ghost" data-act="logout">Se déconnecter</button></div>
        ${ui.confirmDeleteAccount ? `<div class="note" role="alertdialog" aria-label="Confirmer la suppression du compte"><p>Supprimer définitivement le compte ${esc(pr.pseudo)} ? Sa sauvegarde, ses amis et ses défis partagés seront effacés. Les données de cet appareil restent.</p><div class="actions"><button type="button" class="btn" data-act="account-delete-yes">Supprimer mon compte</button><button type="button" class="btn btn--ghost" data-act="account-delete-no">Garder</button></div></div>`
          : '<div class="actions"><button type="button" class="btn btn--danger" data-act="account-delete">Supprimer mon compte</button></div>'}
        <p class="hint"><a href="confidentialite.html" target="_blank" rel="noopener">Politique de confidentialité</a></p></div>`;
    return `<article class="card ai-card"><header class="card-head"><span class="chip-ico">${icon('user')}</span><div><h2 class="h2">Compte Kin Fit</h2><p class="muted">${u ? (pr ? 'Connecté' : 'Encore une étape') : 'Facultatif'}</p></div></header>${body}</article>`;
  }

  function friendsBlock() {
    if (!CLOUD.enabled) return '';
    const head = (sub) => `<header class="card-head"><span class="chip-ico">${icon('user')}</span><div><h2 class="h2">Tes amis Kin Fit</h2><p class="muted">${sub}</p></div></header>`;
    if (!CLOUD.linked) return `<article class="card friends">${head('Avec un compte gratuit')}<p>Ajoute des amis par leur pseudo, lance-leur des défis et suis leur progression, où qu’ils soient.</p><div class="actions"><button type="button" class="btn btn--amis" data-view="profil">Créer mon compte</button></div></article>`;
    const fr = ui.friends || []; const inc = fr.filter((f) => f.status === 'pending' && f.incoming); const out = fr.filter((f) => f.status === 'pending' && !f.incoming); const ok = fr.filter((f) => f.status === 'accepted');
    const av = (p) => `<span class="avatar">${esc(p.slice(0, 1).toUpperCase())}</span>`;
    return `<article class="card friends">${head(`Ton pseudo : ${esc(CLOUD.profile.pseudo)}`)}
      <form id="friend-form" class="friend-add" novalidate><label class="sr-only" for="friend-pseudo">Pseudo de ton ami</label><input class="input" id="friend-pseudo" type="text" maxlength="20" autocapitalize="off" spellcheck="false" placeholder="Pseudo de ton ami"><button type="submit" class="btn btn--amis">${icon('plus')}Ajouter</button></form>
      <p class="hint ai-status" id="friend-status" role="status"></p>
      <div class="actions"><button type="button" class="btn btn--ghost" data-act="share-app">${icon('share')}Inviter par lien</button></div>
      ${inc.length ? `<ul class="session-list">${inc.map((f) => `<li>${av(f.pseudo)}<span><b>${esc(f.pseudo)}</b><small>veut être ton ami</small></span><span class="actions"><button type="button" class="btn btn--amis" data-faccept="${f.friendship_id}">Accepter</button><button type="button" class="btn btn--ghost" data-fremove="${f.friendship_id}">Refuser</button></span></li>`).join('')}</ul>` : ''}
      ${ok.length ? `<ul class="session-list">${ok.map((f) => `<li>${av(f.pseudo)}<span><b>${esc(f.pseudo)}</b><small>Ami</small></span><button type="button" class="link-btn" data-fremove="${f.friendship_id}">Retirer</button></li>`).join('')}</ul>` : '<p class="empty">Ajoute un ami avec son pseudo : il recevra ta demande.</p>'}
      ${out.length ? `<p class="hint">En attente de réponse : ${out.map((f) => esc(f.pseudo)).join(', ')}</p>` : ''}
    </article>`;
  }

  /* ---------- Coach IA settings (per device) ---------- */

  const AI_ERR = {
    not_plus: 'Cette fonction fait partie de Kin Fit Plus.',
    signed_out: 'Connecte-toi à ton compte Kin Fit pour utiliser Plus.',
    daily_limit: 'Tu as atteint la limite d’IA du jour. Elle revient demain.',
    rate_limited: 'Le coach est très demandé en ce moment. Réessaie dans une minute.',
    too_large: 'La photo est trop lourde. Réessaie avec une autre photo.',
    network: 'Pas de connexion. Vérifie ta connexion Internet.',
    timeout: 'Le coach met trop de temps à répondre. Réessaie.',
    webgpu: 'Ton navigateur ne permet pas encore l’IA sur l’appareil (WebGPU indisponible). Essaie Chrome ou Edge récents.',
    local: 'Le téléchargement du modèle a échoué. Vérifie ta connexion et l’espace libre, puis réessaie.',
  };
  const aiErr = (e) => AI_ERR[e && e.code] || 'Ça n’a pas marché. Réessaie dans un moment.';
  const localProgress = (r) => `Chargement du modèle sur ton appareil : ${Math.round((r.progress || 0) * 100)} %`;

  // Kin Fit Plus: the paid subscription that unlocks the AI (coach, meal photos, AI programmes and menus).
  function plusLink(kind) {
    const base = CLOUD.plusLinks[kind]; if (!base || !CLOUD.user) return '';
    const q = new URLSearchParams({ client_reference_id: CLOUD.user.id }); if (CLOUD.user.email) q.set('prefilled_email', CLOUD.user.email);
    return `${base}${base.includes('?') ? '&' : '?'}${q}`;
  }
  /* ---------- Watches (watch.js) ---------- */

  const W = window.NA_WATCH;
  const PROV = { strava: 'Strava', whoop: 'Whoop' };
  const WATCH_ERR = {
    unsupported: 'Ce navigateur ne gère pas le Bluetooth. Sur Android ou ordinateur, ouvre Kin Fit dans Chrome ou Edge. Sur iPhone, relie plutôt Strava ou Whoop.',
    cancelled: '', bluetooth: 'Connexion au capteur impossible. Vérifie qu’il est allumé, porté et qu’il diffuse la fréquence cardiaque.',
    not_configured: 'Cette liaison arrive bientôt.', not_deployed: 'Cette liaison arrive bientôt.', signed_out: 'Connecte-toi à ton compte Kin Fit pour relier une montre.',
    state: 'La liaison a expiré. Relance-la depuis Profil.', denied: 'Liaison annulée.', scope: 'Coche l’accès à tes activités pour que Kin Fit lise tes séances.',
    code_refused: 'Le service a refusé la liaison. Relance-la depuis Profil.', revoked: 'La liaison a été coupée depuis le service. Relie-la de nouveau si tu veux.',
    rate_limited: 'Le service limite les demandes. Réessaie dans un quart d’heure.', network: 'Pas de connexion. Réessaie dans un moment.',
  };
  const watchErr = (e) => WATCH_ERR[e && e.code] ?? 'Ça n’a pas marché. Réessaie dans un moment.';
  const wdata = (sess) => { sess.watch = sess.watch || { acts: [], rec: {}, links: {}, at: 0 }; return sess.watch; };
  const mine = () => (CLOUD.linked ? state.sessions.find((x) => x.uid === CLOUD.user.id) || null : null);
  const SPORT_FR = {
    run: 'Course à pied', trailrun: 'Trail', running: 'Course à pied', ride: 'Vélo', cycling: 'Vélo', virtualride: 'Vélo d’intérieur', spin: 'Vélo d’intérieur',
    ebikeride: 'Vélo électrique', mountainbikeride: 'VTT', gravelride: 'Vélo gravel', swim: 'Natation', swimming: 'Natation', walk: 'Marche', walking: 'Marche',
    hike: 'Randonnée', hiking: 'Randonnée', rowing: 'Aviron', virtualrow: 'Rameur', weighttraining: 'Musculation', weightlifting: 'Musculation',
    'functional-fitness': 'Renforcement', workout: 'Entraînement', crossfit: 'CrossFit', yoga: 'Yoga', pilates: 'Pilates', elliptical: 'Elliptique',
    stairstepper: 'Stepper', highintensityintervaltraining: 'HIIT', hiit: 'HIIT', soccer: 'Football', basketball: 'Basket', tennis: 'Tennis', boxing: 'Boxe',
  };
  const sportFr = (t) => SPORT_FR[String(t).toLowerCase()] || String(t || 'Activité').replace(/[-_]/g, ' ');
  // Strength, mobility and recovery sessions do not count as the day's cardio.
  const NOT_CARDIO = /weight|strength|crossfit|functional|yoga|pilates|stretch|mobility|meditation|sauna|massage/i;
  const MET = [[/run|trail/i, 9.8], [/ride|cycl|spin|bike/i, 7.5], [/swim/i, 8], [/row/i, 7], [/walk/i, 3.8], [/hike/i, 6], [/weight|strength|crossfit|functional/i, 5], [/yoga|pilates|stretch/i, 2.8]];
  // Energy of an imported activity: the service's figure, else the heart rate, else a MET estimate.
  function actKcal(a, p) {
    if (a.kcal) return a.kcal;
    if (a.hr) return W.kcalFromHr(a.hr, a.min, p);
    const m = (MET.find(([re]) => re.test(a.type)) || [0, 6])[1];
    return Math.round((m * (+p.poids || 70) * a.min) / 60);
  }

  function mergeWatch(sess, res) {
    const w = wdata(sess); const cut = iso(new Date(TODAY.getTime() - 30 * 864e5)); const day = /^\d{4}-\d\d-\d\d$/;
    const byId = new Map(w.acts.map((a) => [a.id, a]));
    (res.acts || []).forEach((a) => { if (a && a.id && day.test(a.day)) byId.set(String(a.id), { id: String(a.id), src: a.src === 'whoop' ? 'whoop' : 'strava', day: a.day, time: String(a.time || '').slice(0, 5), type: String(a.type || '').slice(0, 40), min: Math.max(0, +a.min || 0), km: +a.km || 0, hr: +a.hr || 0, hrMax: +a.hrMax || 0, kcal: +a.kcal || 0, strain: +a.strain || 0 }); });
    w.acts = [...byId.values()].filter((a) => a.day >= cut).sort((a, b) => `${a.day}${a.time}`.localeCompare(`${b.day}${b.time}`)).slice(-150);
    (res.rec || []).forEach((r) => { if (r && day.test(r.day)) w.rec[r.day] = { score: +r.score || 0, rhr: +r.rhr || 0, hrv: +r.hrv || 0, sleep: +r.sleep || 0 }; });
    Object.keys(w.rec).forEach((d) => { if (d < cut) delete w.rec[d]; });
  }

  // An imported outing long enough validates this week's planned cardio, and yoga or stretching a rest day.
  function autoValidate(sess) {
    const w = wdata(sess); let n = 0;
    for (let i = 0; i <= todayIdx; i += 1) {
      const d = iso(dayDate(i)); const acts = w.acts.filter((a) => a.day === d); if (!acts.length) continue;
      const sv = dayView(sess, i); const it = sv.rest ? null : buildPlan(sv).byDay(i); const L = lg(sess, d);
      if (it && it.kind !== 'muscu' && L.status !== 'faite') {
        const a = acts.find((x) => !NOT_CARDIO.test(x.type) && x.min >= Math.max(15, Math.round(it.duree * 0.6)));
        if (a) { L.status = 'faite'; L.auto = a.src; n += 1; }
      } else if (!it && !L.mob && acts.some((x) => /yoga|pilates|stretch|mobility/i.test(x.type) && x.min >= 10)) { L.mob = true; L.auto = acts[0].src; n += 1; }
    }
    return n;
  }

  let watchBusy = false; let watchChecked = false;
  async function syncWatches(force) {
    const sess = mine(); if (!W || !sess || watchBusy) return;
    const w = wdata(sess); const on = Object.keys(w.links).filter((p) => w.links[p]);
    if (!on.length || (!force && Date.now() - (w.at || 0) < 30 * 60000)) return;
    watchBusy = true; let err = null;
    try {
      for (const p of on) {
        try { mergeWatch(sess, await W.sync(p, w.at ? 7 : 30)); } catch (e) { if (e.code === 'revoked' || e.code === 'not_linked') delete w.links[p]; err = err || e; }
      }
      w.at = Date.now();
      const n = autoValidate(sess);
      if (sess === cur()) settle(sess, !n); else save();
      if (!document.activeElement.matches('input, textarea, select')) render();
      if (force) toast(err ? watchErr(err) : n ? 'Séance validée grâce à ta montre.' : 'Montre synchronisée.');
    } finally { watchBusy = false; }
  }
  async function watchRefresh() {
    if (!W || !CLOUD.linked) return;
    if (!watchChecked) {
      watchChecked = true;
      try {
        const s = await W.status(); const sess = mine();
        ui.watchReady = { strava: !!(s.strava && s.strava.ready), whoop: !!(s.whoop && s.whoop.ready) };
        if (sess) { const w = wdata(sess); ['strava', 'whoop'].forEach((p) => { if (s[p] && s[p].linked) w.links[p] = s[p].name || true; else delete w.links[p]; }); save(); }
      } catch (e) { ui.watchReady = e.code === 'not_deployed' ? { strava: false, whoop: false } : null; watchChecked = e.code === 'not_deployed'; }
      if (ui.view === 'profil' && !document.activeElement.matches('input, textarea, select')) render();
    }
    return syncWatches();
  }
  // Coming back from the Strava or Whoop sign-in page.
  const watchBack = W ? W.returning() : null;
  if (watchBack) history.replaceState(null, '', location.pathname + location.hash);
  async function finishWatchLink() {
    if (!watchBack || watchBack.done || !CLOUD.linked) return watchRefresh();
    watchBack.done = true; const p = watchBack.provider;
    try {
      const r = await W.finish(watchBack); const sess = mine();
      if (sess) { wdata(sess).links[p] = r.name || true; wdata(sess).at = 0; save(); }
      toast(`${PROV[p]} relié.`); watchChecked = true; ui.watchReady = { ...(ui.watchReady || {}), [p]: true };
      await syncWatches(true);
    } catch (e) { const m = watchErr(e); if (m) toast(m); }
  }

  const hrLine = (p, live) => { const b = W.live; const z = b ? W.zone(b, p.age) : null; return `${icon('heart')}<b>${b || '--'}</b> bpm${z ? ` · ${z.name}` : live ? ' · en attente du pouls' : ''}`; };
  function watchCard(sess) {
    if (!W) return '';
    const w = wdata(sess); const rd = ui.watchReady || {}; const p = sess.profile;
    const bt = !W.bt ? '<p class="hint">Ce navigateur ne gère pas le Bluetooth. Sur iPhone, relie plutôt Strava ou Whoop ; sur Android ou ordinateur, ouvre Kin Fit dans Chrome.</p>'
      : W.linked ? `<p><b data-no-i18n>${esc(W.name || 'Capteur cardio')}</b></p><p class="watch-live" id="w-bpm">${hrLine(p, true)}</p><div class="actions"><button type="button" class="btn btn--ghost" data-act="hr-off">Déconnecter le capteur</button></div>`
        : `<p>Ceinture cardio, ou montre qui diffuse sa fréquence cardiaque (Garmin, Polar, Coros, Suunto…) : ton pouls et ta zone s’affichent pendant la séance guidée, et ta dépense est calculée sur ton vrai effort.</p><div class="actions"><button type="button" class="btn" data-act="hr-on">${icon('heart')}Connecter un capteur</button></div>`;
    const row = (k) => {
      const on = w.links[k]; const soon = rd[k] === false;
      const sub = on ? `Relié${typeof on === 'string' ? ` · <span data-no-i18n>${esc(on)}</span>` : ''}` : soon ? 'Bientôt disponible' : k === 'strava' ? 'Course, vélo, natation et toutes tes séances' : 'Récupération, sommeil et séances';
      const btn = !CLOUD.linked || soon ? '' : on ? `<button type="button" class="btn btn--ghost" data-wunlink="${k}">Délier</button>` : `<button type="button" class="btn" data-wlink="${k}">Relier</button>`;
      return `<li><span><b>${PROV[k]}</b><small>${sub}</small></span>${btn}</li>`;
    };
    const any = Object.values(w.links).some(Boolean);
    const at = w.at ? new Date(w.at).toLocaleTimeString(window.NA_I18N.locale, { hour: '2-digit', minute: '2-digit' }) : '';
    return `<article class="card watch-card" id="watch-card"><header class="card-head"><span class="chip-ico">${icon('watch')}</span><div><h2 class="h2">Montres et capteurs</h2><p class="muted">Gratuit</p></div></header>
      <p class="label">Fréquence cardiaque en direct</p>${bt}
      ${CLOUD.enabled ? `<p class="label">Applications</p><ul class="food-rows watch-list">${row('strava')}${row('whoop')}</ul>
      ${!CLOUD.linked ? '<p class="hint">Crée ton compte Kin Fit gratuit pour relier Strava ou Whoop.</p>' : any ? `<div class="actions"><button type="button" class="btn btn--ghost" data-act="watch-sync">Synchroniser</button>${at ? `<span class="hint">Synchronisé · ${at}</span>` : ''}</div>` : ''}
      <p class="hint">Kin Fit lit seulement tes activités et, pour Whoop, ta récupération et ton sommeil. Rien n’est publié en ton nom, et tu peux délier à tout moment. Apple Watch : partage tes séances vers Strava pour les retrouver ici.</p>` : ''}
    </article>`;
  }

  const REC = { vert: 'Feu vert : tu peux faire ta séance comme prévu, et même pousser un peu.', jaune: 'Récupération moyenne : fais ta séance, sans chercher de record.', rouge: 'Récupération basse : préfère une séance légère ou de la mobilité aujourd’hui, et couche-toi tôt.' };
  function watchDayCard(sess, dayI) {
    if (!W) return '';
    const d = iso(dayDate(dayI)); const w = sess.watch || { acts: [], rec: {} }; const L0 = sess.log[d] || {}; const p = sess.profile;
    const acts = w.acts.filter((a) => a.day === d); const rec = w.rec[d]; const h = L0.hr;
    if (!acts.length && !rec && !h) return '';
    const kc = acts.reduce((t, a) => t + actKcal(a, p), 0) + (h ? h.kcal : 0);
    const lvl = rec ? (rec.score >= 67 ? 'vert' : rec.score >= 34 ? 'jaune' : 'rouge') : '';
    const recBlock = rec ? `<div class="watch-rec watch-rec--${lvl}"><p class="watch-score"><b>${rec.score} %</b><span>récupération</span></p>
        <dl class="facts">${rec.rhr ? `<div><dt>FC au repos</dt><dd>${rec.rhr} bpm</dd></div>` : ''}${rec.hrv ? `<div><dt>VFC</dt><dd>${rec.hrv} ms</dd></div>` : ''}${rec.sleep ? `<div><dt>Sommeil</dt><dd>${String(rec.sleep).replace('.', ',')} h</dd></div>` : ''}</dl></div>
      ${dayI === todayIdx ? `<p>${REC[lvl]}</p>` : ''}` : '';
    const line = (parts) => parts.filter(Boolean).join(' · ');
    const rows = [
      ...(h ? [`<li><span><b>Séance guidée</b><small>${line([`${h.min} min`, `FC ${h.avg}`, `max ${h.max}`, `≈ ${h.kcal} kcal`])}</small></span><span class="tag">Kin Fit</span></li>`] : []),
      ...acts.map((a) => `<li><span><b>${esc(sportFr(a.type))}</b><small>${line([a.time, `${a.min} min`, a.km ? `${String(a.km).replace('.', ',')} km` : '', a.hr ? `FC ${a.hr}` : '', a.strain ? `effort ${String(a.strain).replace('.', ',')}` : '', `≈ ${actKcal(a, p)} kcal`])}</small></span><span class="tag">${PROV[a.src]}</span></li>`),
    ];
    return `<article class="card watch-day"><header class="card-head"><span class="chip-ico">${icon('watch')}</span><div><h2 class="h2">Ma montre</h2><p class="muted">${kc ? `Dépense sportive · ≈ ${kc} kcal` : 'Récupération'}</p></div></header>
      ${recBlock}${rows.length ? `<ul class="food-rows">${rows.join('')}</ul>` : ''}</article>`;
  }
  // Closes the heart-rate recording of a guided session and keeps its summary for the day.
  function endHr(g) {
    if (!W || !W.recording || !g) return;
    const r = W.stopRec(); if (!r) return;
    const sess = cur(); r.kcal = W.kcalFromHr(r.avg, r.min, sess.profile); lg(sess, iso(TODAY)).hr = r; g.hrSum = r; save();
  }
  if (W) W.onChange(() => {
    const p = cur() && cur().profile; if (!p) return;
    const a = $('#w-bpm'); if (a) a.innerHTML = hrLine(p, true);
    const b = $('#g-hr'); if (b && W.linked) b.innerHTML = hrLine(p, true);
  });

  function plusCard() {
    if (!CLOUD.enabled) return '';
    const perks = ['Coach IA qui répond à tes questions', 'Compteur de calories en photo', 'Programme et menus réécrits par l’IA', 'Nouveautés Plus en avant-première'];
    let body;
    if (CLOUD.plus) {
      const until = CLOUD.plusUntil ? new Date(CLOUD.plusUntil).toLocaleDateString(window.NA_I18N.locale, { day: 'numeric', month: 'long', year: 'numeric' }) : '';
      const portal = CLOUD.plusLinks.portal;
      body = `<p class="plus-on">${icon('check')}<span>Tu es <b>Kin Fit Plus</b>${until ? ` · renouvellement ou fin le ${until}` : ''}.</span></p>
        ${portal ? `<div class="actions"><a class="btn btn--ghost" href="${portal}${CLOUD.user && CLOUD.user.email ? `?prefilled_email=${encodeURIComponent(CLOUD.user.email)}` : ''}" target="_blank" rel="noopener">Gérer ou résilier mon abonnement</a></div>` : ''}`;
    } else if (!CLOUD.linked) {
      body = `<p>Crée d’abord ton compte Kin Fit gratuit ci-dessous : l’abonnement s’y rattache.</p>`;
    } else if (!CLOUD.plusLinks.monthly && !CLOUD.plusLinks.yearly) {
      body = '<p class="hint">L’abonnement arrive très bientôt.</p>';
    } else {
      body = `<div class="plus-offers">
          ${CLOUD.plusLinks.monthly ? `<a class="plus-offer" href="${plusLink('monthly')}" target="_blank" rel="noopener"><b>2,99 €</b><span>par mois</span><small>Sans engagement</small></a>` : ''}
          ${CLOUD.plusLinks.yearly ? `<a class="plus-offer plus-offer--best" href="${plusLink('yearly')}" target="_blank" rel="noopener"><i>−30 %</i><b>24,99 €</b><span>par an</span><small>Soit 2,08 € par mois</small></a>` : ''}
        </div>
        <p class="hint">Paiement sécurisé par Stripe. Résiliable à tout moment, l’accès dure jusqu’à la fin de la période payée. En t’abonnant, tu acceptes les <a href="cgv.html" target="_blank" rel="noopener">conditions générales de vente</a> et tu demandes l’accès immédiat à Plus.</p>
        <div class="actions"><button type="button" class="btn btn--ghost" data-act="plus-refresh">J’ai payé : activer Plus</button></div>`;
    }
    return `<article class="card plus-card" id="plus-card"><header class="card-head"><span class="chip-ico">${icon('star')}</span><div><h2 class="h2">Kin Fit Plus</h2><p class="muted">${CLOUD.plus ? 'Actif' : 'L’IA au service de ton programme'}</p></div></header>
      <ul class="save-perks">${perks.map((x) => `<li>${icon('check')}${x}</li>`).join('')}</ul>${body}</article>`;
  }

  function aiSettingsCard(sess) {
    const c = AI.config; const cur0 = AI.provider;
    const pick = ui.aiPick || (c.provider === 'local' || c.provider === 'none' ? c.provider : cur0 === 'none' ? 'plus' : cur0);
    const opt = (v, title, desc, dis) => `<label class="choice choice--block"><input type="radio" name="aiprov" value="${v}"${pick === v ? ' checked' : ''}${dis ? ' disabled' : ''}><span><b>${title}</b><small>${desc}</small></span></label>`;
    const now = { none: 'sans IA, exemples de l’app', plus: 'Kin Fit Plus', local: 'IA sur ton appareil (coach)', server: 'serveur Kin Fit' }[cur0];
    const local = !AI.webgpu ? `<p class="note">${AI_ERR.webgpu}</p>`
      : `<div class="ai-block"><p>Modèle open source Qwen 2.5 (1,5 milliard de paramètres) qui tourne dans ton navigateur. Il répond aux questions du coach ; programmes et repas restent ceux de l’app.</p>
        ${c.local ? `<p class="hint ai-status">${cur0 === 'local' ? 'Le modèle est téléchargé et actif sur cet appareil.' : 'Le modèle est déjà téléchargé.'}</p>${cur0 === 'local' ? '' : '<div class="actions"><button type="button" class="btn" data-act="local-use">Utiliser l’IA sur l’appareil</button></div>'}`
        : `<div class="actions"><button type="button" class="btn" data-act="local-load">Télécharger le modèle (environ 1 Go)</button></div>`}
        <div class="ai-progress" id="local-progress" hidden><progress max="1" value="0"></progress><p class="hint" id="local-status" role="status"></p></div>
        <p class="hint">Rien ne quitte ton appareil. Wi-Fi conseillé pour le premier téléchargement, ensuite ça marche hors connexion. Les réponses sont plus simples qu’avec Plus et peuvent être lentes sur un téléphone ancien.</p></div>`;
    return `<article class="card ai-card"><header class="card-head"><span class="chip-ico">${icon('star')}</span><div><h2 class="h2">Coach IA</h2><p class="muted">Sur cet appareil : ${now}</p></div></header>
      <fieldset><legend class="sr-only">Source de l’IA</legend><div class="choices choices--stack">
        ${CLOUD.enabled ? opt('plus', 'Kin Fit Plus', CLOUD.plus ? 'Coach, photos de repas, programmes et menus par l’IA. Actif sur ton compte.' : 'Coach, photos de repas, programmes et menus par l’IA, avec l’abonnement Plus.') : ''}
        ${opt('local', 'IA sur ton appareil (gratuit)', 'Le coach répond sans rien envoyer sur Internet. Premier téléchargement d’environ 1 Go.', false)}
        ${opt('none', 'Sans IA', 'Programmes, repas et coach d’exemple, calculés dans ton navigateur. Gratuit et hors connexion.')}
      </div></fieldset>
      ${pick === 'local' ? local : ''}${pick === 'plus' && !CLOUD.plus ? '<p class="hint">Abonne-toi dans la carte Kin Fit Plus ci-dessus.</p>' : ''}
    </article>`;
  }

  function viewProfil(sess) {
    const p = sess.profile;
    return `<header class="hello"><div><h1 class="h1">${esc(p.prenom)}</h1><p class="lede">Ta session est enregistrée dans ce navigateur. Chaque personne a la sienne, et vous pouvez vous lancer des défis.</p></div>${scorebar(sess)}</header>
      <div class="today-grid">
        <article class="card"><header class="card-head"><span class="chip-ico">${icon('user')}</span><div><h2 class="h2">Mon profil</h2></div></header>${profileFacts(p, false)}
          <p><b>Petit-déjeuner :</b> ${PDJ[p.petitdej]}. <b>Alimentation :</b> ${esc(M.summary(p))}. <b>À éviter :</b> ${p.eviter.length ? esc(p.eviter.map((a) => ALLERG[a]).join(', ')) : 'rien de signalé'}. <b>Restrictions :</b> ${p.restrictions.trim() ? esc(p.restrictions) : 'aucune'}.</p>
          <div class="actions"><button type="button" class="btn" data-act="edit">Modifier mon profil</button><button type="button" class="btn btn--ghost" data-act="new">Nouvelle session</button></div></article>
        ${plusCard()}
        ${accountCard(sess)}
        ${watchCard(sess)}
        <article class="card share-card"><header class="card-head"><span class="chip-ico">${icon('share')}</span><div><h2 class="h2">Fais découvrir Kin Fit</h2><p class="muted">Gratuit, sans publicité</p></div></header>
          <p>${CLOUD.linked ? 'Envoie le lien de l’app : ton ami pourra t’ajouter en un geste après avoir créé son compte.' : 'Envoie le lien de l’app à tes proches pour vous lancer des défis.'}</p>
          <div class="actions"><button type="button" class="btn" data-act="share-app">${icon('share')}Partager l’app</button></div></article>
        ${aiSettingsCard(sess)}
        ${installCard()}
        <article class="card"><header class="card-head"><span class="chip-ico">${icon('user')}</span><div><h2 class="h2">Langue et pays</h2></div></header>
          <form id="prefs-form" class="stack" novalidate>${langCountryFields(window.NA_I18N)}<div class="actions"><button type="submit" class="btn btn--ghost">Enregistrer</button></div></form></article>
        <article class="card"><header class="card-head"><span class="chip-ico">${icon('album')}</span><div><h2 class="h2">Sessions sur cet appareil</h2></div></header>
          <ul class="session-list">${state.sessions.map((s) => `<li><span class="avatar">${esc(s.profile.prenom.slice(0, 1).toUpperCase())}</span><span><b>${esc(s.profile.prenom)}</b><small>${esc(sportName(s.profile))} · ${s.points} pts · ${rangOf(s.points).n}</small></span>${s.id === sess.id ? '<span class="tag">Active</span>' : `<button type="button" class="btn btn--ghost" data-switch="${s.id}">Ouvrir</button>`}</li>`).join('')}</ul>
          ${ui.confirmDelete ? `<div class="note" role="alertdialog" aria-label="Confirmer la suppression"><p>Supprimer définitivement la session de ${esc(p.prenom)} ? Son programme, son album et ses messages seront effacés.</p><div class="actions"><button type="button" class="btn" data-act="delete-yes">Supprimer</button><button type="button" class="btn btn--ghost" data-act="delete-no">Garder</button></div></div>` : `<div class="actions"><button type="button" class="btn btn--danger" data-act="delete">Supprimer la session de ${esc(p.prenom)}</button></div>`}
        </article>
      </div>${foot()}`;
  }

  /* ---------- Launch dialog ---------- */

  function openLaunch() {
    const sess = cur(); if (!sess) return;
    const others = state.sessions.filter((s) => s.id !== sess.id);
    const pals = CLOUD.linked ? (ui.friends || []).filter((f) => f.status === 'accepted') : [];
    let dlg = $('#launch'); if (dlg) dlg.remove();
    dlg = document.createElement('dialog'); dlg.id = 'launch'; dlg.className = 'dlg'; dlg.setAttribute('aria-labelledby', 'launch-title');
    dlg.innerHTML = `<form method="dialog" id="launch-form" class="dlg-body">
      <header class="dlg-head"><h2 class="h2" id="launch-title">Lancer un défi</h2><button type="button" class="round" data-act="launch-close" aria-label="Fermer">${icon('x')}</button></header>
      <fieldset><legend>Choisis le défi</legend><div class="pick">${SOCIAL.map((c, i) => `<label class="pick-item defi--${c.cat}"><input type="radio" name="cid" value="${c.cid}"${i === 0 ? ' checked' : ''}><span class="chip-ico">${icon(c.icon)}</span><span>${esc(c.title)}</span></label>`).join('')}</div></fieldset>
      <fieldset><legend>À qui ?</legend>${others.length ? `<div class="choices">${others.map((s) => `<label class="choice"><input type="checkbox" name="to" value="${s.id}"><span>${esc(s.profile.prenom)}</span></label>`).join('')}</div><p class="hint">Les sessions de cet appareil le reçoivent tout de suite. Pour quelqu’un d’autre, partage le lien.</p>` : '<p class="hint">Aucune autre session sur cet appareil : partage le lien avec qui tu veux.</p>'}</fieldset>
      ${pals.length ? `<fieldset><legend>Tes amis Kin Fit</legend><div class="choices">${pals.map((f) => `<label class="choice"><input type="checkbox" name="friend" value="${f.friend_id}" data-pseudo="${esc(f.pseudo)}"><span>${esc(f.pseudo)}</span></label>`).join('')}</div><p class="hint">Ils le reçoivent sur leur téléphone et vous voyez la progression de chacun.</p></fieldset>` : ''}
      <div class="field"><label for="launch-msg">Un mot pour motiver (facultatif)</label><input type="text" id="launch-msg" name="msg" maxlength="120" placeholder="Exemple : Cap ou pas cap ?"></div>
      <p class="error" id="launch-error" role="alert"></p>
      <div class="dlg-actions">${others.length || pals.length ? `<button type="button" class="btn btn--amis" data-act="launch-send">${icon('send')}Envoyer</button>` : ''}<button type="button" class="btn btn--ghost" data-act="launch-share">${icon('share')}Partager le lien</button></div>
    </form>`;
    document.body.appendChild(dlg);
    dlg.addEventListener('close', () => dlg.remove());
    dlg.showModal();
  }

  function openCheckin() {
    const sess = cur(); if (!sess || $('#checkin')) return;
    const c = todayCheck(sess); const it = buildPlan(sess).byDay(todayIdx);
    const min = c ? c.min : (it ? durOf(sess.profile) : 0); const forme = c ? c.forme : 'normal';
    const dlg = document.createElement('dialog'); dlg.id = 'checkin'; dlg.className = 'dlg dlg--sheet'; dlg.setAttribute('aria-labelledby', 'checkin-title');
    dlg.innerHTML = `<form method="dialog" id="checkin-form" class="dlg-body">
      <header class="dlg-head"><h2 class="h2" id="checkin-title">Combien de temps pour ton sport aujourd’hui ?</h2><button type="button" class="round" data-act="checkin-close" aria-label="Fermer">${icon('x')}</button></header>
      <p class="hint">${it ? `Au programme : ${esc(it.title)}. Ta séance s’adapte au temps que tu as, pour une dépense proche d’une séance complète.` : 'Jour de repos prévu : 10 minutes de mobilité suffisent. Tu peux aussi choisir un temps pour faire un parcours.'}</p>
      <fieldset><legend>Temps disponible</legend><div class="choices">${[15, 30, 45, 60, 90].map((n) => radio('min', String(n), `${n} min`, String(min))).join('')}${radio('min', '0', 'Repos aujourd’hui', String(min))}</div></fieldset>
      <fieldset><legend>Comment tu te sens ?</legend><div class="choices">${Object.entries(FORME).map(([k, l]) => radio('forme', k, l, forme)).join('')}</div><p class="hint">Fatigué : charges un peu plus légères. En forme : on pousse un peu plus.</p></fieldset>
      <div class="dlg-actions"><button type="submit" class="btn btn--big btn--sheen">C’est parti</button></div>
    </form>`;
    document.body.appendChild(dlg);
    dlg.addEventListener('close', () => dlg.remove());
    dlg.showModal();
  }

  /* ---------- Exercise sheet ---------- */

  function openExo(id) {
    const sess = cur(); if (!sess || !window.NA_EXO || !E[id]) return;
    const old = $('#exo'); if (old) old.remove();
    const sv = dayView(sess, todayIdx); const p = sv.profile; const ex = E[id]; const sd = sportData(sess.profile);
    const d = window.NA_EXO.detail(id, p);
    const it = sv.rest ? null : buildPlan(sv).byDay(todayIdx); const idx = it && it.ex ? Math.max(0, it.ex.indexOf(id)) : 0;
    const sr = setsReps(ex, p, sess.seed, idx);
    const dlg = document.createElement('dialog'); dlg.id = 'exo'; dlg.className = 'dlg dlg--full exo'; dlg.setAttribute('aria-labelledby', 'exo-title');
    dlg.innerHTML = `<div class="dlg-body">
      <header class="dlg-head"><div><h2 class="h2" id="exo-title" data-no-i18n>${esc(d.name)}</h2><p class="muted">${esc(d.muscles)}</p></div><button type="button" class="round" data-act="exo-close" aria-label="Fermer">${icon('x')}</button></header>
      ${window.NA_EXO.anim(d)}
      <button type="button" class="btn btn--big btn--sheen exo-video" data-video="${id}">${icon('play')}Vidéo explicative</button>
      ${d.photos ? window.NA_EXO.bodyMap(d.zones) : ''}
      <dl class="facts exo-facts"><div><dt>Séries × répétitions</dt><dd>${sr.txt}</dd></div><div><dt>Repos</dt><dd>${d.rest} s</dd></div><div><dt>Charge</dt><dd data-no-i18n>${esc(d.load)}</dd></div></dl>
      <section class="exo-part"><h3 class="h3">Quel poids prendre ?</h3><p data-no-i18n>${esc(d.tip)}</p></section>
      <section class="exo-part"><h3 class="h3">Comment faire</h3><ol class="exo-steps" data-no-i18n>${d.steps.map((x) => `<li>${esc(x)}</li>`).join('')}</ol><p><b>Respiration et posture.</b> ${esc(d.tech)}</p></section>
      <p class="note"><b>Erreur à éviter.</b> ${esc(d.err)}</p>
      <div class="exo-vars"><div><p class="label">Plus facile</p><p data-no-i18n>${esc(d.easy)}</p></div><div><p class="label">Plus dur</p><p data-no-i18n>${esc(d.hard)}</p></div></div>
      <p><b>Pourquoi pour ton sport.</b> ${esc(sd[ex.key] || '')}</p>
    </div>`;
    document.body.appendChild(dlg);
    dlg.addEventListener('close', () => dlg.remove());
    dlg.showModal();
  }

  /* ---------- Meal photo calorie counter (Kin Fit Plus) ---------- */

  // A phone photo shrunk to 1024 px JPEG, as base64 without the data: prefix.
  function shrinkPhoto(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file); const img = new Image();
      img.onload = () => {
        const k = Math.min(1, 1024 / Math.max(img.width, img.height)); const cv = document.createElement('canvas');
        cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
        cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height); URL.revokeObjectURL(url);
        const data = cv.toDataURL('image/jpeg', 0.8); resolve({ data, b64: data.split(',')[1] });
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('image')); };
      img.src = url;
    });
  }

  let mealShot = null;
  async function analyseMeal(file) {
    const sess = cur(); if (!sess || !file) return;
    const old = $('#meal'); if (old) old.remove();
    const dlg = document.createElement('dialog'); dlg.id = 'meal'; dlg.className = 'dlg dlg--full meal-dlg'; dlg.setAttribute('aria-labelledby', 'meal-title');
    dlg.innerHTML = `<div class="dlg-body"><header class="dlg-head"><div><p class="label">Kin Fit Plus</p><h2 class="h2" id="meal-title">Ton repas</h2></div><button type="button" class="round" data-act="meal-close" aria-label="Fermer">${icon('x')}</button></header>
      <div class="meal-body"><p class="hint" role="status">Analyse de la photo…</p></div></div>`;
    document.body.appendChild(dlg); dlg.addEventListener('close', () => { dlg.remove(); mealShot = null; }); dlg.showModal();
    const body = dlg.querySelector('.meal-body');
    try {
      const shot = await shrinkPhoto(file);
      body.innerHTML = `<img class="meal-shot" src="${shot.data}" alt=""><p class="hint" role="status">Analyse de la photo… quelques secondes.</p>`;
      const r = await AI.mealPhoto(shot.b64, NA.OBJECTIFS[sess.profile.objectif]);
      const t = r.total || {}; const kc = Math.round(t.kcal || 0);
      mealShot = { plat: r.plat || 'Repas', kcal: kc, p: Math.round(t.proteines_g || 0), g: Math.round(t.glucides_g || 0), l: Math.round(t.lipides_g || 0) };
      const conf = { faible: 'faible', moyenne: 'moyenne', haute: 'bonne' }[r.confiance] || 'moyenne';
      body.innerHTML = `<img class="meal-shot" src="${shot.data}" alt="">
        <h3 class="h3" data-no-i18n>${esc(mealShot.plat)}</h3>
        <dl class="macros"><div class="m-k"><dt>Calories</dt><dd>${kc}<small> kcal</small></dd></div><div class="m-p"><dt>Protéines</dt><dd>${mealShot.p}<small> g</small></dd></div><div class="m-g"><dt>Glucides</dt><dd>${mealShot.g}<small> g</small></dd></div><div class="m-l"><dt>Lipides</dt><dd>${mealShot.l}<small> g</small></dd></div></dl>
        ${(r.aliments || []).length ? `<ul class="ingr" data-no-i18n>${r.aliments.map((x) => `<li><span>${esc(x.nom)} · ${Math.round(x.quantite_g || 0)} g</span><b>${Math.round(x.kcal || 0)} kcal</b></li>`).join('')}</ul>` : ''}
        ${r.conseil ? `<p class="note" data-no-i18n>${esc(r.conseil)}</p>` : ''}
        <p class="hint">Estimation à partir de la photo, fiabilité ${conf}. Les portions réelles peuvent varier.</p>
        ${kc ? `<p class="label">Ajouter à ma journée comme</p><div class="seg meal-slots">${[['pdj', 'Petit-déjeuner'], ['dej', 'Déjeuner'], ['diner', 'Dîner'], ['snack', 'Collation'], ['extra', 'Extra']].map(([k, l]) => `<button type="button" data-mslot="${k}">${l}</button>`).join('')}</div>` : ''}`;
    } catch (err) {
      body.innerHTML = `<p class="note">${esc(aiErr(err))}</p>${err.code === 'not_plus' ? '<div class="actions"><button type="button" class="btn" data-act="ai-setup">Découvrir Kin Fit Plus</button></div>' : ''}`;
    }
  }

  function fileMeal(slot) {
    const sess = cur(); if (!sess || !mealShot) return;
    const L0e = lg(sess, iso(TODAY)); L0e.photos = (L0e.photos || []).filter((x) => slot === 'extra' || x.slot !== slot);
    L0e.photos.push({ at: new Date().toISOString(), slot, ...mealShot });
    if (slot === 'pdj') L0e.pdj = true; else if (slot !== 'extra') { L0e.eat = L0e.eat || {}; L0e.eat[slot] = true; }
    const d = $('#meal'); if (d) d.close();
    settle(sess); render(); toast('Repas ajouté à ta journée.');
  }

  /* ---------- Explainer video: the photos in motion, captions and a voice, built from the exercise sheet ---------- */

  const VOICE = { fr: 'fr-FR', en: 'en-GB', es: 'es-ES' };
  const VLAB = {
    fr: { step: 'Étape', breath: 'Respiration et posture', err: 'Erreur à éviter', easy: 'Plus facile', hard: 'Plus dur' },
    en: { step: 'Step', breath: 'Breathing and posture', err: 'Mistake to avoid', easy: 'Easier', hard: 'Harder' },
    es: { step: 'Paso', breath: 'Respiración y postura', err: 'Error que evitar', easy: 'Más fácil', hard: 'Más difícil' },
  };
  let vid = null;

  function openVideo(id, kit) {
    const sess = cur(); if (!sess || !window.NA_EXO || !E[id]) return;
    const old = $('#video'); if (old) old.close();
    const p = dayView(sess, todayIdx).profile || sess.profile; const d = window.NA_EXO.detail(id, p, (kit && E[id][kit]) || undefined);
    const lang = ['en', 'es'].includes(window.NA_I18N.lang) ? window.NA_I18N.lang : 'fr'; const T = VLAB[lang];
    const scenes = [{ k: d.name, t: d.muscles }, ...d.steps.map((s, i) => ({ k: `${T.step} ${i + 1}`, t: s })),
      { k: T.breath, t: d.tech }, { k: T.err, t: d.err }, { k: T.easy, t: d.easy }, { k: T.hard, t: d.hard }].filter((s) => s.t);
    const dlg = document.createElement('dialog'); dlg.id = 'video'; dlg.className = 'dlg dlg--full vid'; dlg.setAttribute('aria-labelledby', 'vid-title');
    dlg.innerHTML = `<div class="dlg-body vid-body">
      <header class="dlg-head"><div><p class="label">Vidéo explicative</p><h2 class="h2" id="vid-title" data-no-i18n>${esc(d.name)}</h2></div><button type="button" class="round" data-act="video-close" aria-label="Fermer">${icon('x')}</button></header>
      <div class="vid-stage">${window.NA_EXO.anim(d)}<div class="vid-cap" aria-live="polite" data-no-i18n><b id="vid-k"></b><p id="vid-t"></p></div></div>
      <div class="vid-bar" aria-hidden="true">${scenes.map(() => '<i><b></b></i>').join('')}</div>
      <div class="vid-ctl"><button type="button" class="round" data-act="video-prev" aria-label="Précédent">${icon('prev')}</button><button type="button" class="round vid-play" data-act="video-toggle" aria-label="Pause">${icon('pause')}</button><button type="button" class="round" data-act="video-next" aria-label="Suivant">${icon('next')}</button><button type="button" class="round" data-act="video-sound" aria-pressed="true" aria-label="Voix">${icon('sound')}</button></div>
    </div>`;
    vid = { scenes, i: 0, playing: true, voice: !!window.speechSynthesis, timer: 0, tok: 0, dlg, lang };
    dlg.addEventListener('close', () => { stopVid(); dlg.remove(); vid = null; });
    document.body.appendChild(dlg); dlg.showModal(); playScene(0);
  }

  function stopVid() { if (!vid) return; vid.tok += 1; clearTimeout(vid.timer); if (window.speechSynthesis) window.speechSynthesis.cancel(); }

  function syncVid() {
    if (!vid) return; const b = vid.dlg.querySelector('.vid-play'); const end = !vid.playing && vid.i === vid.scenes.length - 1;
    b.innerHTML = icon(vid.playing ? 'pause' : 'play'); b.setAttribute('aria-label', vid.playing ? 'Pause' : end ? 'Revoir' : 'Lecture');
    vid.dlg.querySelector('[data-act="video-sound"]').setAttribute('aria-pressed', String(vid.voice));
  }

  // One scene: caption, progress, and the voice (or a reading-time timer), then the next scene.
  function playScene(i) {
    if (!vid) return; stopVid(); vid.i = Math.max(0, Math.min(i, vid.scenes.length - 1));
    const s = vid.scenes[vid.i]; const dlg = vid.dlg; const tok = vid.tok;
    dlg.querySelector('#vid-k').textContent = s.k; dlg.querySelector('#vid-t').textContent = s.t;
    const ms = Math.max(3500, s.t.split(/\s+/).length * 400 + 1200);
    dlg.querySelectorAll('.vid-bar i').forEach((el, j) => { el.className = j < vid.i ? 'is-done' : j === vid.i ? 'is-now' : ''; el.firstChild.style.animationDuration = `${ms}ms`; el.firstChild.style.animationPlayState = vid.playing ? 'running' : 'paused'; });
    syncVid(); if (!vid.playing) return;
    const next = () => {
      if (!vid || vid.tok !== tok) return;
      if (vid.i < vid.scenes.length - 1) vid.timer = setTimeout(() => playScene(vid.i + 1), 500); else { vid.playing = false; syncVid(); }
    };
    if (vid.voice && window.SpeechSynthesisUtterance) {
      const u = new SpeechSynthesisUtterance(`${s.k}. ${s.t}`); u.lang = VOICE[vid.lang]; u.rate = 0.95;
      u.onend = next; u.onerror = next; window.speechSynthesis.speak(u);
      vid.timer = setTimeout(next, ms + 8000); // in case the voice never reports its end
    } else vid.timer = setTimeout(next, ms);
  }

  /* ---------- Guided session ---------- */

  // One step per set; express pairs alternate A and B, with the rest only after B.
  function guideSteps(sv, item) {
    const p = sv.profile; const n = item.ex.length; const out = []; const groups = [];
    for (let i = 0; i < n;) { const pr = pairOf(i, n, p); if (pr && pr.first) { groups.push([i, i + 1]); i += 2; } else { groups.push([i]); i += 1; } }
    groups.forEach((g) => {
      const sets = Math.max(...g.map((i) => setsReps(E[item.ex[i]], p, sv.seed, i).s));
      for (let k = 1; k <= sets; k++) {
        g.forEach((i, j) => {
          const ex = E[item.ex[i]]; const sr = setsReps(ex, p, sv.seed, i); if (k > sr.s) return;
          const pr = pairOf(i, n, p);
          out.push({ id: item.ex[i], i, set: k, sets: sr.s, reps: sr.r, rest: j < g.length - 1 ? 0 : restOf(ex, p), last: k === sr.s, label: pr ? pr.label : String(i + 1) });
        });
      }
    });
    return out;
  }

  let guideTimer = null; let wakeLock = null;
  async function keepAwake(on) {
    try { if (on && 'wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen'); else if (!on && wakeLock) { await wakeLock.release(); wakeLock = null; } } catch (e) { /* not supported */ }
  }

  function openGuide() {
    const sess = cur(); if (!sess) return;
    const sv = dayView(sess, todayIdx); const item = sv.rest ? null : buildPlan(sv).byDay(todayIdx); if (!item) return;
    ui.guide = item.kind === 'muscu'
      ? { kind: 'muscu', item, sv, steps: guideSteps(sv, item), k: 0, phase: 'work', left: 0, total: 0, restTotal: 1 }
      : { kind: 'cardio', item, sv, steps: [], k: 0, phase: 'cardio', left: item.duree * 60, total: item.duree * 60, paused: true };
    const old = $('#guide'); if (old) old.remove();
    const dlg = document.createElement('dialog'); dlg.id = 'guide'; dlg.className = 'dlg dlg--full guide'; dlg.setAttribute('aria-label', 'Séance guidée');
    document.body.appendChild(dlg);
    dlg.addEventListener('close', () => { clearInterval(guideTimer); keepAwake(false); endHr(ui.guide); dlg.remove(); const s = cur(); ui.guide = null; if (s) { settle(s); render(); } });
    if (W && W.linked) W.startRec();
    renderGuide(); dlg.showModal(); keepAwake(true);
  }

  function ringSvg(frac, label, sub) {
    const C = 2 * Math.PI * 70;
    return `<div class="g-ring"><svg viewBox="0 0 160 160" aria-hidden="true"><defs><linearGradient id="g-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c6ff00"/><stop offset=".5" stop-color="#ff5fa8"/><stop offset="1" stop-color="#ff2e88"/></linearGradient></defs><circle class="ring-track" cx="80" cy="80" r="70"/><circle class="ring-val" id="g-ring" cx="80" cy="80" r="70" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - frac)).toFixed(1)}"/></svg><p><b id="g-left">${label}</b><span>${sub}</span></p></div>`;
  }
  const mmss = (t) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;

  function renderGuide() {
    const g = ui.guide; const dlg = $('#guide'); if (!g || !dlg) return;
    const sess = cur(); const p = g.sv.profile;
    const head = (pct, title) => `<header class="g-head"><button type="button" class="round" data-act="g-quit" aria-label="Quitter la séance">${icon('x')}</button><div class="g-bar" role="progressbar" aria-label="Progression de la séance" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pct)}"><i style="width:${pct}%"></i></div><p class="g-title">${esc(title)}</p></header>`;
    let body = '';
    if (g.phase === 'done') {
      endHr(g); const h = g.hrSum;
      const kcal = h ? h.kcal : g.kind === 'muscu' ? sessionMeta(g.item, p, sess.seed).kcal : g.item.kcal;
      body = `${head(100, g.item.title)}<div class="g-main g-done">${icon('trophy', 'g-trophy')}<h2 class="g-name">${g.kind === 'circuit' ? 'Parcours terminé !' : 'Séance terminée !'}</h2><p class="lede">${g.kind === 'muscu' ? `${g.steps.length} séries · ` : g.kind === 'circuit' ? `${Math.max(1, Math.round(g.spent / 60))} min · ` : ''}≈ ${kcal} kcal dépensées</p>${h ? `<p class="g-hr">${icon('heart')}<span>FC moyenne ${h.avg} · max ${h.max}</span></p>` : ''}<p class="hint">Bois un grand verre d’eau et prends des protéines dans les deux heures.</p><button type="button" class="btn btn--big btn--sheen" data-act="g-finish">Terminer</button></div>`;
    } else if (g.kind === 'circuit') {
      body = circuitBody(g, p, head);
    } else if (g.kind === 'cardio') {
      const it = g.item;
      body = `${head(((g.total - g.left) / g.total) * 100, it.title)}<div class="g-main"><h2 class="g-name">${esc(it.type)}</h2><p class="g-sub">${esc(it.format)}</p>
        ${ringSvg(g.left / g.total, mmss(g.left), 'restant')}
        <p class="hint">${esc(it.conseils)}</p>
        <div class="actions g-actions"><button type="button" class="btn btn--big ${g.paused ? 'btn--sheen' : 'btn--ghost'}" data-act="g-toggle">${g.paused ? (g.left < g.total ? 'Reprendre' : 'Démarrer') : 'Pause'}</button><button type="button" class="btn btn--big btn--ghost" data-act="g-cardio-done">J’ai terminé</button></div></div>`;
    } else {
      const st = g.steps[g.k]; const d = window.NA_EXO ? window.NA_EXO.detail(st.id, p) : { name: E[st.id].m, zones: [], load: '' };
      const pct = (g.k / g.steps.length) * 100;
      if (g.phase === 'rest') {
        body = `${head(pct, g.item.title)}<div class="g-main"><p class="label">Repos</p>${ringSvg(g.left / g.restTotal, String(g.left), 'secondes')}
          <p class="g-next"><span>Ensuite :</span> <b data-no-i18n>${esc(d.name)}</b> · <span>série ${st.set}/${st.sets}</span></p>
          <div class="actions g-actions"><button type="button" class="btn btn--ghost" data-act="g-plus">+15 s</button><button type="button" class="btn btn--sheen" data-act="g-skip">Passer le repos</button></div></div>`;
      } else {
        body = `${head(pct, g.item.title)}<div class="g-main"><p class="label">Exercice ${esc(st.label)} · série ${st.set}/${st.sets}</p>
          <h2 class="g-name" data-no-i18n>${esc(d.name)}</h2>
          <p class="g-reps"><b>${st.reps}</b><span>répétitions</span></p><p class="g-load" data-no-i18n>${esc(d.load)}</p>
          ${window.NA_EXO ? window.NA_EXO.anim(d, true) : ''}
          <div class="actions g-actions"><button type="button" class="btn btn--ghost" data-video="${st.id}">${icon('play')}Vidéo</button><button type="button" class="btn btn--ghost" data-exo="${st.id}">${icon('album')}Fiche</button><button type="button" class="btn btn--big btn--sheen" data-act="g-set">${icon('check')}Série faite</button></div>
          <p class="hint">${st.rest ? `Puis ${st.rest} s de repos.` : 'Enchaîne directement avec l’exercice suivant.'}</p></div>`;
      }
    }
    // Live heart rate under the header while a strap is connected, or the way to connect one.
    const hrBar = !W || g.phase === 'done' ? '' : W.linked ? `<p class="g-hr" id="g-hr" aria-live="off">${hrLine(p, true)}</p>` : W.bt ? '<p class="g-hr"><button type="button" class="link-btn" data-act="hr-on">Connecter un capteur cardio</button></p>' : '';
    dlg.innerHTML = `<div class="dlg-body g-body">${hrBar ? body.replace('</header>', `</header>${hrBar}`) : body}</div>`;
  }

  function guideTick() {
    const g = ui.guide; if (!g) { clearInterval(guideTimer); return; }
    if (g.kind === 'circuit') { circuitTick(g); return; }
    if (g.phase === 'cardio' && g.paused) return;
    g.left = Math.max(0, g.left - 1);
    const C = 2 * Math.PI * 70; const tot = g.phase === 'rest' ? g.restTotal : g.total;
    const left = $('#g-left'); const ring = $('#g-ring');
    if (left) left.textContent = g.phase === 'rest' ? String(g.left) : mmss(g.left);
    if (ring) ring.setAttribute('stroke-dashoffset', (C * (1 - g.left / tot)).toFixed(1));
    if (g.left === 0) {
      clearInterval(guideTimer); if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      if (g.phase === 'rest') { g.phase = 'work'; renderGuide(); } else finishCardio();
    }
  }
  const startTimer = () => { clearInterval(guideTimer); guideTimer = setInterval(guideTick, 1000); };
  function celebrateGuide() { if (navigator.vibrate) navigator.vibrate(300); sparks(innerWidth / 2, innerHeight / 3, 120, 0.9); }
  /* ---------- Guided Parcours: every segment timed, with beeps, voice and what comes next ---------- */

  const SEG = { warm: 'Échauffement', work: 'Effort', off: 'Récupération', round: 'Repos entre les tours', run: 'Course', station: 'Station', trans: 'Transition', cool: 'Retour au calme' };
  function circuitSegs(c) {
    const out = [{ t: 'warm', sec: c.warm * 60, list: c.warmList }];
    if (c.timing) {
      let b = 0;
      c.stations.forEach((x, i) => {
        if (x.run) { b += 1; out.push({ t: 'run', sec: c.timing.run, x, b }); return; }
        out.push({ t: 'station', sec: c.timing.st, x, b });
        if (i < c.stations.length - 1) out.push({ t: 'trans', sec: c.timing.tr, b });
      });
    } else {
      for (let r = 1; r <= c.rounds; r++) {
        c.stations.forEach((x, i) => {
          out.push({ t: 'work', sec: c.pace.on, x, r });
          if (i < c.stations.length - 1) out.push({ t: 'off', sec: c.pace.off, r });
        });
        if (r < c.rounds) out.push({ t: 'round', sec: c.pace.rest, r });
      }
    }
    out.push({ t: 'cool', sec: c.cool * 60, list: c.coolList });
    return out;
  }

  let actx = null;
  function beep(f, ms) {
    const g = ui.guide; if (!g || !g.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(); const v = actx.createGain(); const t = actx.currentTime;
      o.type = 'sine'; o.frequency.value = f; v.gain.setValueAtTime(0.25, t); v.gain.exponentialRampToValueAtTime(0.0001, t + ms / 1000);
      o.connect(v).connect(actx.destination); o.start(t); o.stop(t + ms / 1000);
    } catch (e) { /* no audio */ }
  }
  function announce() {
    const g = ui.guide; if (!g || !g.sound || !window.speechSynthesis || !window.SpeechSynthesisUtterance) return;
    const s = g.segs[g.k]; const tr = (x) => (window.NA_I18N && window.NA_I18N.t ? window.NA_I18N.t(x) : x);
    const nx = s.x ? null : g.segs.slice(g.k + 1).find((y) => y.x);
    const sec = s.sec >= 120 ? `${Math.round(s.sec / 60)} minutes` : `${s.sec} secondes`;
    const txt = s.x ? `${tr(s.x.n)}, ${sec}` : `${tr(SEG[s.t])}, ${sec}${nx && s.t !== 'warm' ? `. ${tr('Ensuite')} : ${tr(nx.x.n)}` : ''}`;
    const lang = ['en', 'es'].includes(window.NA_I18N.lang) ? window.NA_I18N.lang : 'fr';
    const u = new SpeechSynthesisUtterance(txt); u.lang = VOICE[lang]; u.rate = 1;
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
  }

  function openCircuit() {
    const sess = cur(); if (!sess) return;
    const sv = dayView(sess, todayIdx); const p = sess.profile;
    const c = window.NA_CIRCUITS.build(p, ui.circuit, ui.circuitDur || durOf(p)); const segs = circuitSegs(c);
    ui.guide = { kind: 'circuit', c, sv, segs, k: 0, left: segs[0].sec, total: segs.reduce((t, s) => t + s.sec, 0), spent: 0, phase: 'circuit', paused: true, started: false, sound: true,
      item: { title: `Parcours ${c.name.toLowerCase()}`, kcal: c.kcal } };
    const old = $('#guide'); if (old) old.remove();
    const dlg = document.createElement('dialog'); dlg.id = 'guide'; dlg.className = 'dlg dlg--full guide guide--circuit'; dlg.setAttribute('aria-label', 'Parcours guidé');
    document.body.appendChild(dlg);
    dlg.addEventListener('close', () => { clearInterval(guideTimer); keepAwake(false); if (window.speechSynthesis) window.speechSynthesis.cancel(); endHr(ui.guide); dlg.remove(); const s = cur(); ui.guide = null; if (s) { settle(s); render(); } });
    if (W && W.linked) W.startRec();
    renderGuide(); dlg.showModal(); keepAwake(true);
  }

  function circuitBody(g, p, head) {
    const s = g.segs[g.k]; const c = g.c;
    const before = g.segs.slice(0, g.k).reduce((t, y) => t + y.sec, 0);
    const pct = ((before + s.sec - g.left) / g.total) * 100;
    const nx = g.segs.slice(g.k + 1).find((y) => y.x);
    const where = s.r ? `Tour ${s.r}/${c.rounds}` : s.b ? `Bloc ${s.b}/${c.stations.length / 2}` : '';
    const d = s.x && s.x.id && window.NA_EXO ? window.NA_EXO.detail(s.x.id, p, s.x.v) : null;
    const main = s.x
      ? `<h2 class="g-name">${esc(s.x.n)}</h2><p class="g-load">${esc(s.x.load)}</p>${d && d.photos ? window.NA_EXO.anim(d, true) : ''}`
      : s.list ? `<ul class="c-list">${s.list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`
        : `<h2 class="g-name">Souffle</h2>`;
    const toggle = g.paused ? (g.started ? 'Reprendre' : 'Démarrer') : 'Pause';
    return `${head(pct, g.item.title)}<div class="g-main c-phase c-phase--${s.t}">
      <p class="label c-label">${SEG[s.t]}${where ? ` · ${where}` : ''}</p>
      ${main}
      ${ringSvg(g.left / s.sec, mmss(g.left), g.paused && !g.started ? 'prêt ?' : 'restant')}
      ${nx ? `<p class="g-next"><span>Ensuite :</span> <b>${esc(nx.x.n)}</b></p>` : ''}
      <div class="actions g-actions c-ctl"><button type="button" class="round" data-act="c-prev" aria-label="Étape précédente">${icon('prev')}</button><button type="button" class="btn btn--big ${g.paused ? 'btn--sheen' : 'btn--ghost'}" data-act="c-toggle">${g.paused ? icon('play') : icon('pause')}${toggle}</button><button type="button" class="round" data-act="c-next" aria-label="Étape suivante">${icon('next')}</button><button type="button" class="round" data-act="c-sound" aria-pressed="${g.sound}" aria-label="Sons et voix">${icon('sound')}</button></div>
      ${s.x && s.x.id ? `<button type="button" class="link-btn" data-video="${s.x.id}">${icon('play')}Voir la vidéo</button>` : ''}
    </div>`;
  }

  function circuitGo(k) {
    const g = ui.guide; if (!g) return;
    if (k >= g.segs.length) { finishCircuit(); return; }
    g.k = Math.max(0, k); g.left = g.segs[g.k].sec;
    if (!g.paused) announce();
    renderGuide();
  }
  function circuitTick(g) {
    if (g.paused) return;
    g.left = Math.max(0, g.left - 1); g.spent += 1;
    const s = g.segs[g.k]; const C = 2 * Math.PI * 70;
    const left = $('#g-left'); const ring = $('#g-ring'); const bar = $('#guide .g-bar i');
    if (left) left.textContent = mmss(g.left);
    if (ring) ring.setAttribute('stroke-dashoffset', (C * (1 - g.left / s.sec)).toFixed(1));
    if (bar) { const before = g.segs.slice(0, g.k).reduce((t, y) => t + y.sec, 0); bar.style.width = `${((before + s.sec - g.left) / g.total) * 100}%`; }
    if (g.left > 0 && g.left <= 3) beep(660, 140);
    if (g.left === 0) { beep(1046, 420); if (navigator.vibrate) navigator.vibrate([180, 80, 180]); circuitGo(g.k + 1); }
  }
  function finishCircuit() {
    const g = ui.guide; clearInterval(guideTimer); if (window.speechSynthesis) window.speechSynthesis.cancel();
    const c = g.c; const min = Math.max(1, Math.round(g.spent / 60));
    g.item.kcal = Math.round((c.kcal * g.spent) / (c.duree * 60) / 5) * 5;
    const sess = cur(); const L0 = lg(sess, iso(TODAY));
    L0.circuits = (L0.circuits || []).concat({ type: c.type, min, kcal: g.item.kcal, at: new Date().toISOString() }); save();
    g.phase = 'done'; renderGuide(); celebrateGuide(); beep(1318, 600);
  }

  function finishCardio() { const sess = cur(); const L0 = lg(sess, iso(TODAY)); L0.status = 'faite'; save(); ui.guide.phase = 'done'; clearInterval(guideTimer); renderGuide(); celebrateGuide(); }

  function openGive(id) {
    const sess = cur(); const st = STICKERS.find((x) => x.id === id); if (!sess || !st) return;
    const others = state.sessions.filter((x) => x.id !== sess.id);
    let dlg = $('#give'); if (dlg) dlg.remove();
    dlg = document.createElement('dialog'); dlg.id = 'give'; dlg.className = 'dlg'; dlg.setAttribute('aria-labelledby', 'give-title');
    dlg.innerHTML = `<form method="dialog" id="give-form" class="dlg-body">
      <header class="dlg-head"><h2 class="h2" id="give-title">Donner un doublon</h2><button type="button" class="round" data-act="give-close" aria-label="Fermer">${icon('x')}</button></header>
      <div class="give-stk">${stickerArt(st, STICKERS.indexOf(st) + 1, true)}<p>Tu as ${(sess.dupes[id] || 0) + 1} exemplaires de la médaille <b>${esc(st.n)}</b>. Donne le doublon à quelqu’un de cet appareil : elle rejoint ses trophées s’il ne l’a pas encore.</p></div>
      <fieldset><legend>À qui ?</legend><div class="choices">${others.map((x, i) => `<label class="choice"><input type="radio" name="to" value="${x.id}"${i === 0 ? ' checked' : ''}><span>${esc(x.profile.prenom)}${x.stickers.includes(id) ? '' : ' · ne l’a pas'}</span></label>`).join('')}</div></fieldset>
      <input type="hidden" name="sid" value="${id}">
      <div class="dlg-actions"><button type="button" class="btn btn--amis" data-act="give-send">${icon('send')}Donner</button></div>
    </form>`;
    document.body.appendChild(dlg);
    dlg.addEventListener('close', () => dlg.remove());
    dlg.showModal();
  }

  function createChallenge(sess, toNames) {
    const f = $('#launch-form'); const fd = new FormData(f);
    const c = SOCIAL.find((x) => x.cid === fd.get('cid'));
    const msg = String(fd.get('msg') || '').trim().slice(0, 120);
    const id = `d${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    const base = { id, cid: c.cid, title: c.title, unit: c.unit, target: c.target, cat: c.cat, icon: c.icon, steps: c.steps, msg, progress: 0, at: iso(TODAY) };
    addToInbox(sess, { ...base, from: sess.profile.prenom, self: true, status: 'accepted' });
    sess.sent.unshift({ id, title: c.title, to: toNames, at: iso(TODAY) });
    return base;
  }

  /* ---------- Onboarding ---------- */

  const STEPS = ['Ton profil', 'Ton niveau', 'Ton sport', 'Ton alimentation', 'Tes repas'];
  const radio = (name, val, label, curv) => `<label class="choice"><input type="radio" name="${name}" value="${val}"${curv === val ? ' checked' : ''}><span>${label}</span></label>`;
  const check = (name, val, label, list) => `<label class="choice"><input type="checkbox" name="${name}" value="${val}"${list.includes(val) ? ' checked' : ''}><span>${label}</span></label>`;
  const num = (id, label, unit, v, min, max) => `<div class="field"><label for="${id}">${label}</label><div class="unit"><input type="number" id="${id}" name="${id}" inputmode="numeric" min="${min}" max="${max}" value="${esc(v)}" required><span>${unit}</span></div></div>`;

  function stepFields(o) {
    const p = o.p;
    if (o.step === 0) return `
      <div class="field"><label for="prenom">Prénom</label><input type="text" id="prenom" name="prenom" value="${esc(p.prenom)}" autocomplete="given-name" required></div>
      <fieldset><legend>Sexe</legend><div class="choices">${radio('sexe', 'femme', 'Femme', p.sexe)}${radio('sexe', 'homme', 'Homme', p.sexe)}</div></fieldset>
      <div class="row">${num('age', 'Âge', 'ans', p.age, 14, 90)}${num('taille', 'Taille', 'cm', p.taille, 120, 230)}${num('poids', 'Poids', 'kg', p.poids, 35, 220)}</div>
      <fieldset><legend>Objectif</legend><div class="choices">${Object.entries(OBJECTIFS).map(([k, l]) => radio('objectif', k, l, p.objectif)).join('')}</div></fieldset>`;
    if (o.step === 1) return `
      <div class="field"><label for="niveau">Niveau sportif : <output id="niveau-out">${lvLabel(p.niveau)}</output></label><input type="range" id="niveau" name="niveau" min="0" max="100" value="${p.niveau}"><p class="hint">De débutant à avancé. Tu pourras l’ajuster à tout moment.</p></div>
      <fieldset><legend>Séances par semaine</legend><div class="choices">${[2, 3, 4, 5, 6].map((n) => radio('seances', String(n), String(n), String(p.seances))).join('')}</div></fieldset>
      <fieldset><legend>Durée d’une séance, échauffement compris</legend><div class="choices">${DUREES.map((n) => radio('duree', String(n), `${n} min`, String(durOf(p)))).join('')}</div></fieldset>
      <fieldset><legend>Matériel disponible (plusieurs choix possibles)</legend><div class="choices">${Object.entries(MATERIEL).map(([k, l]) => check('materiel', k, l, p.materiel)).join('')}</div></fieldset>
      <div class="field"><label for="restrictions">Pathologies, douleurs ou restrictions (facultatif)</label><textarea id="restrictions" name="restrictions" placeholder="Exemple : douleur au genou droit">${esc(p.restrictions)}</textarea></div>`;
    if (o.step === 2) return `
      <fieldset><legend>Ton ou tes sports (le premier coché oriente le programme et ton défi sport)</legend><div class="choices choices--sport">${SPORTS.map((s) => `<label class="choice"><input type="checkbox" name="sports" value="${s}"${p.sports.includes(s) ? ' checked' : ''}><span>${icon(SPORT_ICON[s] || 'bolt')}${s === 'JJB' ? 'JJB (Jiu-Jitsu Brésilien)' : s}</span></label>`).join('')}</div></fieldset>
      <div class="field"><label for="autre">Autre sport (facultatif)</label><input type="text" id="autre" name="autre" value="${esc(p.autre)}" placeholder="Exemple : escalade"></div>`;
    if (o.step === 3) return `
      <fieldset><legend>Ton régime</legend><div class="choices">${Object.entries(M.REGIMES).map(([k, l]) => radio('regime', k, l, p.regime || 'omni')).join('')}</div></fieldset>
      <fieldset><legend>Pratiques alimentaires (facultatif)</legend><div class="choices">${Object.entries(M.PRATIQUES).map(([k, l]) => check('pratiques', k, l, p.pratiques || [])).join('')}</div><p class="hint">Halal et casher : les viandes proposées sont indiquées comme certifiées, jamais de porc. Casher : pas de crustacés ni de plat mêlant viande et produit laitier.</p></fieldset>
      <fieldset><legend>Allergies et intolérances (facultatif)</legend><div class="choices">${Object.entries(ALLERG).map(([k, l]) => check('eviter', k, l, p.eviter)).join('')}</div><p class="hint">Aucun plat proposé ne contiendra ces aliments. En cas d’allergie sévère, vérifie toujours les étiquettes.</p></fieldset>`;
    return `
      <fieldset><legend>Type de petit-déjeuner (obligatoire)</legend><div class="choices choices--big">
        <label class="choice"><input type="radio" name="petitdej" value="sale"${p.petitdej === 'sale' ? ' checked' : ''}><span><b>Salé</b><small>Œufs, pain complet, avocat</small></span></label>
        <label class="choice"><input type="radio" name="petitdej" value="sucre"${p.petitdej === 'sucre' ? ' checked' : ''}><span><b>Sucré</b><small>Avoine, yaourt, fruits</small></span></label>
        <label class="choice"><input type="radio" name="petitdej" value="mixte"${p.petitdej === 'mixte' ? ' checked' : ''}><span><b>Sucré-salé</b><small>Œufs, pain, pomme, miel</small></span></label>
      </div><p class="hint">Les ingrédients sont remplacés automatiquement selon ton alimentation.</p></fieldset>
      <fieldset><legend>Ton budget courses</legend><div class="choices">${Object.entries(M.BUDGETS).map(([k, l]) => radio('budget', k, l, p.budget || 'moyen')).join('')}</div><p class="hint">Budget serré : les ingrédients chers sont remplacés par des équivalents économiques, de saison ou surgelés.</p></fieldset>
      <fieldset><legend>Ton temps pour cuisiner</legend><div class="choices">${Object.entries(M.TEMPS).map(([k, l]) => radio('temps', k, l, p.temps || 'libre')).join('')}</div><p class="hint">Rapide : les plats de 20 minutes au plus passent en premier. S’il n’y en a pas assez pour ton régime, on complète avec des plats un peu plus longs.</p></fieldset>
      <fieldset><legend>Repas plaisir par semaine</legend><div class="choices">${[['0', 'Aucun'], ['1', 'Un'], ['2', 'Deux']].map(([k, l]) => radio('cheat', k, l, String(p.cheat ?? 1))).join('')}</div><p class="hint">Un cheat meal planifié aide à tenir sur la durée. Il remplace un dîner le samedi, et un déjeuner le mercredi si tu en choisis deux.</p></fieldset>`;
  }

  function langCountryFields(I) {
    return `<fieldset><legend>Langue</legend><div class="choices">${['fr', 'en', 'es'].map((l) => `<label class="choice"><input type="radio" name="lang" value="${l}"${I.lang === l ? ' checked' : ''}><span data-no-i18n>${I.LANG_NAMES[l]}</span></label>`).join('')}</div></fieldset>
      <div class="field"><label for="country">Pays</label><select id="country" name="country" class="select" data-no-i18n><option value="">—</option>${I.COUNTRIES.map((c) => `<option value="${c.code}"${I.prefs.country === c.code ? ' selected' : ''}>${esc(I.countryName(c))}</option>`).join('')}</select></div>`;
  }

  function viewWelcome() {
    const I = window.NA_I18N;
    return `<div class="ob">
      <div class="ob-side"><p class="wordmark"><span class="seal" aria-hidden="true">金</span>Kin Fit</p><p class="ob-pitch">Ton programme sport et nutrition, des défis à relever, des médailles à gagner.</p></div>
      <form class="ob-form" id="welcome-form" novalidate>
        <h1 class="h1">Bienvenue</h1>
        <p class="lede">Choisis ta langue et ton pays : on adapte la langue, les plats et les alternatives à ta région.</p>
        ${langCountryFields(I)}
        <p class="error" id="welcome-error" role="alert"></p>
        <div class="ob-actions"><span></span><button type="submit" class="btn btn--big btn--sheen">Commencer</button></div>
      </form></div>`;
  }

  function viewOnboarding() {
    const o = ui.ob;
    const preview = STICKERS.slice(0, 3).map((s, i) => stickerArt(s, i + 1, true)).join('');
    return `<div class="ob">
      <div class="ob-side">
        <p class="wordmark"><span class="seal" aria-hidden="true">金</span>Kin Fit</p>
        <p class="ob-pitch">Ton programme sport et nutrition, des défis à relever, des médailles à gagner.</p>
        <div class="ob-stickers" aria-hidden="true">${preview}</div>
      </div>
      <form class="ob-form" id="ob-form" novalidate>
        <ol class="steps" aria-label="Étapes">${STEPS.map((s, i) => `<li${i === o.step ? ' aria-current="step"' : ''}${i < o.step ? ' class="done"' : ''}><span>${i < o.step ? icon('check') : i + 1}</span>${s}</li>`).join('')}</ol>
        <h1 class="h1" id="ob-title" tabindex="-1">${STEPS[o.step]}</h1>
        ${stepFields(o)}
        <p class="error" id="ob-error" role="alert"></p>
        <div class="ob-actions">
          ${o.step > 0 ? '<button type="button" class="btn btn--ghost" data-act="ob-back">Retour</button>' : (state.sessions.length ? '<button type="button" class="btn btn--ghost" data-act="ob-cancel">Annuler</button>' : '<span></span>')}
          <button type="submit" class="btn btn--big btn--sheen">${o.step === STEPS.length - 1 ? 'Créer mon profil' : 'Continuer'}</button>
        </div>
      </form>${!state.sessions.length && !o.editId && CLOUD.enabled ? `<div class="ob-login">${CLOUD.signedIn && !CLOUD.profile ? '<p class="hint">Ce compte n’a pas encore de profil Kin Fit : termine ces étapes, puis choisis ton pseudo dans Profil.</p>' : `<details><summary>J’ai déjà un compte Kin Fit</summary>${loginForm()}</details>`}</div>` : ''}</div>`;
  }

  function collect() {
    const f = $('#ob-form'); const p = ui.ob.p; const fd = new FormData(f);
    if (ui.ob.step === 0) { p.prenom = (fd.get('prenom') || '').trim(); p.sexe = fd.get('sexe') || ''; ['age', 'taille', 'poids'].forEach((k) => { p[k] = fd.get(k) ? +fd.get(k) : ''; }); p.objectif = fd.get('objectif') || ''; }
    if (ui.ob.step === 1) { p.niveau = +fd.get('niveau'); p.seances = +(fd.get('seances') || 0); p.duree = +(fd.get('duree') || 60); p.materiel = fd.getAll('materiel'); p.restrictions = fd.get('restrictions') || ''; }
    if (ui.ob.step === 2) { p.sports = fd.getAll('sports'); p.autre = (fd.get('autre') || '').trim(); }
    if (ui.ob.step === 3) { p.regime = fd.get('regime') || 'omni'; p.pratiques = fd.getAll('pratiques'); p.eviter = fd.getAll('eviter'); }
    if (ui.ob.step === 4) { p.petitdej = fd.get('petitdej') || ''; p.cheat = +(fd.get('cheat') ?? 1); p.budget = fd.get('budget') || 'moyen'; p.temps = fd.get('temps') || 'libre'; }
  }

  function validate() {
    const p = ui.ob.p; const s = ui.ob.step;
    if (s === 0) {
      if (!p.prenom) return 'Indique ton prénom pour créer ta session.';
      if (!p.sexe) return 'Choisis ton sexe : il sert au calcul de tes besoins.';
      if (!(p.age >= 14 && p.age <= 90)) return 'Indique un âge entre 14 et 90 ans.';
      if (!(p.taille >= 120 && p.taille <= 230)) return 'Indique ta taille en centimètres, entre 120 et 230.';
      if (!(p.poids >= 35 && p.poids <= 220)) return 'Indique ton poids en kilos, entre 35 et 220.';
      if (!p.objectif) return 'Choisis un objectif.';
    }
    if (s === 1) {
      if (!p.seances) return 'Choisis ton nombre de séances par semaine.';
      if (!p.materiel.length) return 'Coche au moins un type de matériel. Sans rien, coche « Poids du corps ».';
    }
    if (s === 2 && !p.sports.length && !p.autre) return 'Coche au moins un sport, ou écris le tien dans « Autre sport ».';
    if (s === 4 && !p.petitdej) return 'Choisis un type de petit-déjeuner : salé, sucré ou sucré-salé.';
    return '';
  }

  // After the questionnaire: offer the free account that keeps the profile safe; it can be skipped.
  function viewSave(sess) {
    return `<div class="save-step">
      <p class="label">Dernière étape · facultative</p>
      <h1 class="h1" id="save-title" tabindex="-1">Sauvegarde ton profil, ${esc(sess.profile.prenom)}</h1>
      <ul class="save-perks"><li>${icon('check')}Ton programme et ta progression en sécurité, même si tu changes de téléphone</li><li>${icon('check')}Des défis avec tes amis, où qu’ils soient</li><li>${icon('check')}Gratuit, sans mot de passe : un lien par e-mail suffit</li></ul>
      ${accountCard(sess)}
      <button type="button" class="btn btn--ghost save-later" data-act="save-later">Plus tard</button>
      <p class="hint">Tu pourras créer ton compte à tout moment dans Profil.</p>
    </div>`;
  }

  function finishOnboarding() {
    const o = ui.ob; let sess;
    if (o.editId) { sess = state.sessions.find((x) => x.id === o.editId); sess.profile = o.p; sess.seed += 1; sess.ai = {}; }
    else { sess = migrate({ id: `s${Date.now()}`, seed: 0, profile: o.p }); state.sessions.push(sess); if (CLOUD.enabled && !CLOUD.linked) sess.askSave = true; }
    state.current = sess.id; ui.ob = null; ui.view = 'today'; ui.day = todayIdx;
    save();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    $('#app').classList.add('is-onboarding');
    $('#main').innerHTML = `<div class="loading" role="status"><div class="loading-stk">${stickerArt(STICKERS[0], 1, true, true)}</div><h1 class="h1">On prépare ton programme</h1><p>Programme, petit-déjeuner et premiers défis.</p></div>`;
    setTimeout(() => { settle(sess); ui.printing = true; render(); ui.printing = false; }, reduce ? 300 : 1400);
  }

  /* ---------- Render ---------- */

  function renderRail(sess) {
    $$('[data-view]').forEach((b) => { if (b.closest('.nav')) { if (b.dataset.view === ui.view) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); } });
    $('#session-select').innerHTML = state.sessions.map((s) => `<option value="${s.id}"${sess && s.id === sess.id ? ' selected' : ''}>${esc(s.profile.prenom)} · ${esc(sportName(s.profile))}</option>`).join('');
    const n = sess ? sess.inbox.filter((x) => x.status === 'new').length : 0;
    $$('.nav-badge').forEach((b) => { b.textContent = n; b.hidden = !n; });
  }

  function render() {
    const app = $('#app'); const main = $('#main'); const sess = cur();
    // Scoped styling per screen, and the entrance only when the screen changes (not on every re-render).
    const mark = (key) => {
      document.body.dataset.view = key;
      const entering = ui.lastView !== key; ui.lastView = key;
      main.classList.remove('is-entering');
      if (entering) { void main.offsetWidth; main.classList.add('is-entering'); }
    };
    if (!window.NA_I18N.prefs.country) { app.classList.add('is-onboarding'); main.innerHTML = viewWelcome(); mark('welcome'); return; }
    if (!sess && !ui.ob) ui.ob = { step: 0, p: blank(), editId: null };
    if (ui.ob) { app.classList.add('is-onboarding'); main.innerHTML = viewOnboarding(); mark('onboarding'); return; }
    if (sess && sess.askSave && CLOUD.linked) delete sess.askSave;
    if (sess && sess.askSave && CLOUD.enabled) { app.classList.add('is-onboarding'); main.innerHTML = viewSave(sess); mark('save'); return; }
    app.classList.remove('is-onboarding');
    const views = { today: viewToday, defis: viewDefis, sport: viewSport, nutrition: viewNutrition, coach: viewCoach, profil: viewProfil };
    main.classList.toggle('printing', ui.printing);
    main.innerHTML = (views[ui.view] || viewToday)(sess);
    mark(ui.view);
    if (ui.view === 'today' && sess && !ui.checkinAsked && !todayCheck(sess) && !state.pendingShare && !state.pendingFriend) { ui.checkinAsked = true; setTimeout(openCheckin, 700); }
    renderRail(sess);
    const chat = $('#chat'); if (chat) chat.scrollTop = chat.scrollHeight;
  }

  function updateLevel(v) {
    const sess = cur(); if (!sess) return;
    sess.profile.niveau = v; const p = sess.profile;
    $$('[data-w]').forEach((el) => { el.textContent = loadText(variant(E[el.dataset.w], p), p); });
    $$('[data-sr]').forEach((el) => { el.textContent = setsReps(E[el.dataset.sr], p, sess.seed, +el.dataset.i).txt; });
    $$('[data-lv]').forEach((el) => { el.textContent = lvLabel(v); });
    const out = $('#level-out'); if (out) out.textContent = lvLabel(v);
  }

  function coachContext(sess) {
    const it = buildPlan(sess).byDay(todayIdx); const L0 = lg(sess, iso(TODAY));
    return `${DAYS_FULL[todayIdx]} : ${it ? it.title : 'jour de repos'}${L0.status ? ` (${L0.status})` : ''}. Exercices cochés : ${L0.ex.length}. Petit-déjeuner pris : ${L0.pdj ? 'oui' : 'non'}. Verres d’eau : ${L0.eau} sur 8. Points : ${sess.points}.`;
  }

  function reply(text, sess) {
    const t = text.toLowerCase(); const p = sess.profile;
    if (/défi|defi|médaille|trophée|album|point/.test(t)) return 'Chaque défi réussi rapporte des points. Les médailles se gagnent en terminant des séances, en prenant ton petit-déjeuner, en buvant tes 8 verres et en relevant des défis entre amis. Les emplacements vides de tes trophées indiquent comment les obtenir.';
    if (/faim/.test(t)) return 'La faim du soir vient souvent d’un déjeuner trop léger en protéines. Ajoute 100 à 150 g de skyr ou deux œufs à 16 h et garde un dîner complet : légumes, féculent, protéine.';
    if (/fatigu|crev|épuis|dormi/.test(t)) return 'Journée de fatigue : garde la séance mais retire une série à chaque exercice et reste dans le bas des charges. Si tu as dormi moins de six heures, remplace-la par 30 minutes de marche.';
    if (/mal|douleur|bless/.test(t)) return 'Une douleur n’est pas une courbature : arrête l’exercice concerné, garde ceux qui ne déclenchent rien, et consulte si elle persiste. Note-la dans ton profil pour que j’adapte le programme et tes défis.';
    if (/remplac|alternative|à la place/.test(t)) return `Pour remplacer un exercice, garde le même groupe musculaire et le même nombre de séries. Avec ton matériel (${p.materiel.map((m) => MATERIEL[m].toLowerCase()).join(', ')}), dis-moi lequel te gêne et je te propose l’équivalent.`;
    if (/pourquoi/.test(t)) return `Chaque exercice est choisi pour ton sport (${sportName(p)}) et ton objectif (${OBJECTIFS[p.objectif].toLowerCase()}). Ouvre « Pourquoi, technique, vidéo » sous un exercice : la raison y est écrite.`;
    if (/petit|déj|manger|repas|calorie|eau/.test(t)) return `Ton petit-déjeuner couvre environ un quart de tes ${dailyKcal(p)} kcal du jour. Il monte un peu les jours d’entraînement et redescend les jours de repos. Côté eau, vise 8 verres : c’est un défi du jour.`;
    return 'Bien reçu. Dans ce prototype, je réponds à quelques thèmes : les défis et les trophées, la faim, la fatigue, une douleur, remplacer un exercice, le pourquoi d’un choix, ton petit-déjeuner.';
  }

  /* ---------- Events ---------- */

  function go(view) {
    if (view === 'plan') view = 'sport';
    if (view === 'album') { view = 'defis'; ui.defisTab = 'trophees'; }
    ui.view = view; ui.confirmDelete = false; if (view === 'defis') refreshSocial(); render(); $('#main').focus({ preventScroll: true }); window.scrollTo(0, 0); }
  function startOnboarding(editId) {
    const s = editId ? state.sessions.find((x) => x.id === editId) : null;
    ui.ob = { step: 0, p: s ? JSON.parse(JSON.stringify(s.profile)) : blank(), editId: editId || null };
    render(); window.scrollTo(0, 0);
  }
  const refocus = (sel) => { const b = $(sel); if (b) b.focus({ preventScroll: true }); };

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (e2) { ok = false; } ta.remove(); return ok;
    }
  }

  async function shareApp() {
    const url = inviteLink(); const ps = myPseudo();
    const text = ps ? `Je m’entraîne avec Kin Fit : programme sportif, menus et défis entre amis. Rejoins-moi, mon pseudo est ${ps}.` : 'Je m’entraîne avec Kin Fit : programme sportif, menus et défis entre amis. Rejoins-moi !';
    if (navigator.share) { try { await navigator.share({ title: 'Kin Fit', text, url }); return 'partagé'; } catch (e) { if (e && e.name === 'AbortError') return ''; } }
    return (await copyText(url)) ? 'copié' : '';
  }

  async function shareItem(item, sess) {
    const url = shareLink(item, sess);
    const text = `${sess.profile.prenom} te lance un défi sur Kin Fit : ${item.title}${item.msg ? ` « ${item.msg} »` : ''}`;
    if (navigator.share) { try { await navigator.share({ title: 'Un défi pour toi', text, url }); return 'partagé'; } catch (e) { if (e && e.name === 'AbortError') return ''; } }
    return (await copyText(url)) ? 'copié' : '';
  }

  document.addEventListener('click', async (e) => {
    const t = e.target.closest('button'); if (!t) return;
    const sess = cur();
    if (t.dataset.view) return go(t.dataset.view);
    if (t.dataset.goto) { ui.defisTab = t.dataset.goto; return go('defis'); }
    if (t.dataset.tab) { ui.defisTab = t.dataset.tab; render(); return refocus(`[data-tab="${ui.defisTab}"]`); }
    if (t.dataset.circuit) { ui.circuit = t.dataset.circuit; render(); return refocus(`[data-circuit="${ui.circuit}"]`); }
    if (t.dataset.cdur) { ui.circuitDur = +t.dataset.cdur; render(); return refocus(`[data-cdur="${ui.circuitDur}"]`); }
    if (t.dataset.dur && sess) { sess.profile.duree = +t.dataset.dur; save(); render(); return refocus(`[data-dur="${t.dataset.dur}"]`); }
    if (t.dataset.stab) { ui.sportTab = t.dataset.stab; render(); return refocus(`[data-stab="${ui.sportTab}"]`); }
    if (t.dataset.ntab) { ui.nutTab = t.dataset.ntab; render(); return refocus(`[data-ntab="${ui.nutTab}"]`); }
    if (t.dataset.libz) { ui.libZone = t.dataset.libz; render(); return refocus(`[data-libz="${ui.libZone}"]`); }
    if (t.dataset.eat && sess) {
      const L0e = lg(sess, iso(TODAY)); const k = t.dataset.eat;
      if (k === 'pdj') L0e.pdj = !L0e.pdj; else { L0e.eat = L0e.eat || {}; L0e.eat[k] = !L0e.eat[k]; }
      settle(sess); render(); return refocus(`[data-eat="${k}"]`);
    }
    if (t.dataset.swap && sess) {
      const L0s = lg(sess, iso(TODAY)); L0s.swap = L0s.swap || {}; L0s.swap[t.dataset.swap] = (L0s.swap[t.dataset.swap] || 0) + 1;
      save(); render(); toast('Nouvelle idée de plat.'); return refocus(`[data-swap="${t.dataset.swap}"]`);
    }
    if (t.dataset.ptab) { ui.planTab = t.dataset.ptab; render(); return refocus(`[data-ptab="${ui.planTab}"]`); }
    if (t.dataset.day != null) { ui.day = +t.dataset.day; render(); return refocus(`[data-day="${ui.day}"]`); }
    if (t.dataset.switch) { state.current = t.dataset.switch; save(); ui.day = todayIdx; return go('today'); }
    if (t.id === 'new-session') return startOnboarding(null);
    if (!sess && !t.dataset.act) return;

    const dayI = ui.view === 'today' ? ui.day : todayIdx;
    const L0 = sess ? lg(sess, iso(dayDate(dayI))) : null;
    if (t.dataset.tap && sess) {
      const a = t.dataset.tap;
      if (a === 'pdj') L0.pdj = !L0.pdj;
      if (a === 'mob') L0.mob = !L0.mob;
      if (a === 'cardio') L0.status = L0.status === 'faite' ? '' : 'faite';
      if (a === 'miss') L0.status = L0.status === 'manquee' ? '' : 'manquee';
      settle(sess); render(); refocus(`[data-tap="${a}"]`); return;
    }
    if (t.dataset.eau && sess) {
      const n = +t.dataset.eau; L0.eau = L0.eau === n ? n - 1 : n;
      settle(sess); render(); refocus(`[data-eau="${n}"]`); return;
    }
    if (t.dataset.step && sess) {
      const [act, v] = t.dataset.step.split('|'); const n = +v;
      const ck = act.startsWith('sport:') ? `${weekId}:${act.slice(6)}` : weekId;
      sess.sportCount[ck] = Math.max(0, (sess.sportCount[ck] || 0) + n);
      settle(sess); render(); refocus(`[data-step="${t.dataset.step}"]`); return;
    }
    if (t.dataset.sstep && sess) {
      const [id, v] = t.dataset.sstep.split('|'); const x = sess.inbox.find((y) => y.id === id);
      if (x) { x.progress = Math.max(0, (x.progress || 0) + +v); if (x.cloud) CLOUD.setProgress(x.id, x.progress).catch(() => {}); settle(sess); render(); refocus(`[data-sstep="${t.dataset.sstep}"]`); }
      return;
    }
    if (t.dataset.accept && sess) { const x = sess.inbox.find((y) => y.id === t.dataset.accept); if (x) { x.status = 'accepted'; if (x.cloud) CLOUD.respond(x.id, 'accepted').catch(() => {}); save(); render(); toast('Défi relevé. À toi de jouer !'); } return; }
    if (t.dataset.decline && sess) { const x = sess.inbox.find((y) => y.id === t.dataset.decline); if (x) { x.status = 'declined'; if (x.cloud) CLOUD.respond(x.id, 'declined').catch(() => {}); save(); render(); } return; }
    if (t.dataset.copy && sess) { const x = sess.inbox.find((y) => y.id === t.dataset.copy); if (x) { const r = await shareItem(x, sess); if (r) toast(r === 'copié' ? 'Lien copié. Envoie-le à qui tu veux.' : 'Défi partagé.'); } return; }
    if (t.dataset.give && sess) return openGive(t.dataset.give);
    if (t.dataset.exo) return openExo(t.dataset.exo);
    if (t.dataset.recipe) return openRecipe(t.dataset.recipe);
    if (t.dataset.video) return openVideo(t.dataset.video, t.dataset.vkit);
    if (t.dataset.mslot) return fileMeal(t.dataset.mslot);
    if (t.dataset.rstep) { const on = t.getAttribute('aria-pressed') !== 'true'; t.setAttribute('aria-pressed', String(on)); if (on && navigator.vibrate) navigator.vibrate(15); return; }
    if (t.dataset.wlink) { if (!CLOUD.linked) { toast(WATCH_ERR.signed_out); return; } t.disabled = true; try { await W.link(t.dataset.wlink); } catch (err) { t.disabled = false; toast(watchErr(err)); } return; }
    if (t.dataset.wunlink && sess) {
      const k = t.dataset.wunlink; t.disabled = true;
      try { await W.unlink(k); } catch (err) { if (err.code !== 'not_linked') { t.disabled = false; toast(watchErr(err)); return; } }
      const w = wdata(sess); delete w.links[k]; w.acts = w.acts.filter((x) => x.src !== k); if (k === 'whoop') w.rec = {};
      save(); render(); toast(`${PROV[k]} délié.`); return;
    }
    if (t.dataset.faccept) { try { await CLOUD.acceptFriend(+t.dataset.faccept); toast('Ami ajouté.'); } catch (err) { toast(cloudErr(err)); } return refreshSocial(); }
    if (t.dataset.fremove) { try { await CLOUD.removeFriend(+t.dataset.fremove); } catch (err) { toast(cloudErr(err)); } return refreshSocial(); }
    if (t.dataset.bf && sess) { sess.profile.petitdej = t.dataset.bf; save(); render(); return refocus(`[data-bf="${t.dataset.bf}"]`); }

    const a = t.dataset.act; if (!a) return;
    if (a === 'cele-close') { const c = $('.cele'); if (c) c.remove(); return; }
    if (a === 'launch') return openLaunch();
    if (a === 'install' && installEvt) { installEvt.prompt(); try { await installEvt.userChoice; } catch (err) { /* dismissed */ } installEvt = null; render(); return; }
    if (a === 'shop-reset' && sess) { sess.shop[weekId] = []; save(); render(); return; }
    if (a === 'shop-copy' && sess) { const ok = await copyText(shoppingText(sess)); toast(ok ? 'Liste copiée.' : 'Impossible de copier la liste.'); return; }
    if (a === 'shop-share' && sess) {
      const text = shoppingText(sess);
      if (navigator.share) { try { await navigator.share({ title: window.NA_I18N.t('Liste de courses'), text }); return; } catch (err) { if (err && err.name === 'AbortError') return; } }
      const ok = await copyText(text); toast(ok ? 'Liste copiée.' : 'Impossible de copier la liste.'); return;
    }
    if (a === 'give-close') { const d = $('#give'); if (d) d.close(); return; }
    if (a === 'give-send' && sess) {
      const fd = new FormData($('#give-form')); const id = fd.get('sid'); const to = state.sessions.find((x) => x.id === fd.get('to'));
      if (to && (sess.dupes[id] || 0) > 0) {
        sess.dupes[id] -= 1; to.dupes = to.dupes || {};
        if (to.stickers.includes(id)) to.dupes[id] = (to.dupes[id] || 0) + 1; else to.stickers.push(id);
        save(); $('#give').close(); render(); toast(`Doublon donné à ${to.profile.prenom}.`);
      }
      return;
    }
    if (a === 'launch-close') { const d = $('#launch'); if (d) d.close(); return; }
    if (a === 'launch-send' && sess) {
      const fd = new FormData($('#launch-form')); const ids = fd.getAll('to'); const fids = fd.getAll('friend');
      if (!ids.length && !fids.length) { $('#launch-error').textContent = 'Coche au moins une personne, ou partage le lien.'; return; }
      const names = [];
      if (fids.length) {
        const c = SOCIAL.find((x) => x.cid === fd.get('cid')); const msg = String(fd.get('msg') || '').trim().slice(0, 120);
        const pseudos = [...$$('input[name="friend"]:checked')].map((i) => i.dataset.pseudo);
        t.disabled = true;
        try {
          const id = await CLOUD.createChallenge(c, msg, fids);
          addToInbox(sess, { id, cloud: true, cid: c.cid, title: c.title, unit: c.unit, target: c.target, cat: c.cat, icon: c.icon, steps: c.steps, msg, progress: 0, from: CLOUD.profile.pseudo, self: true, status: 'accepted', members: [], at: iso(TODAY) });
          sess.sent.unshift({ id, title: c.title, to: pseudos.join(', '), at: iso(TODAY) }); names.push(...pseudos);
        } catch (err) { t.disabled = false; $('#launch-error').textContent = 'Le défi n’a pas pu partir. Vérifie ta connexion et réessaie.'; return; }
      }
      if (ids.length) {
        const local = ids.map((id) => state.sessions.find((s) => s.id === id).profile.prenom);
        const base = createChallenge(sess, local.join(', '));
        ids.forEach((id) => { const s = state.sessions.find((x) => x.id === id); addToInbox(s, { ...base, from: sess.profile.prenom, fromSid: sess.id, status: 'new' }); });
        names.push(...local);
      }
      save(); $('#launch').close(); ui.defisTab = 'amis'; settle(sess); go('defis'); toast(`Défi envoyé à ${names.join(', ')}.`); refreshSocial(); return;
    }
    if (a === 'launch-share' && sess) {
      const base = createChallenge(sess, 'lien partagé'); save();
      const r = await shareItem(base, sess);
      const d = $('#launch'); if (d) d.close();
      ui.defisTab = 'amis'; settle(sess); go('defis');
      toast(r === 'copié' ? 'Lien copié. Envoie-le à qui tu veux.' : r ? 'Défi partagé.' : 'Défi créé. Copie son lien depuis « En cours ».');
      return;
    }
    if (a === 'share-accept') {
      const x = state.pendingShare; const c = x && SOCIAL.find((s) => s.cid === x.cid);
      if (sess && c) { addToInbox(sess, { id: x.id, cid: c.cid, title: c.title, unit: c.unit, target: c.target, cat: c.cat, icon: c.icon, steps: c.steps, msg: x.msg, from: x.from, status: 'accepted', progress: 0, at: iso(TODAY) }); }
      state.pendingShare = null; save(); ui.defisTab = 'amis'; go('defis'); toast('Défi relevé. À toi de jouer !'); return;
    }
    if (a === 'share-later') { state.pendingShare = null; save(); render(); return; }
    if (a === 'share-app') { const r = await shareApp(); if (r) toast(r === 'copié' ? 'Lien copié. Envoie-le à qui tu veux.' : 'Merci de faire découvrir Kin Fit !'); return; }
    if (a === 'invite-later') { state.pendingFriend = null; save(); render(); return; }
    if (a === 'invite-accept') {
      const p = state.pendingFriend; if (!p) return;
      try { const f = await CLOUD.requestFriend(p); state.pendingFriend = null; save(); await refreshSocial(); ui.defisTab = 'amis'; go('defis'); toast(`Demande envoyée à ${f.pseudo}.`); }
      catch (err) { if (err && /23505|duplicate/i.test(`${err.cause && err.cause.code} ${err.detail}`)) { state.pendingFriend = null; save(); render(); toast('Vous êtes déjà en lien.'); } else toast(cloudErr(err)); }
      return;
    }
    if (a === 'login-google') { try { await CLOUD.signInGoogle(); } catch (err) { toast(cloudErr(err)); } return; }
    if (a === 'logout') { await CLOUD.signOut().catch(() => {}); ui.friends = null; render(); toast('Déconnecté. Tes données restent sur cet appareil.'); return; }
    if (a === 'sync-now') { await cloudPush(true); await refreshSocial(); render(); toast('Progression synchronisée.'); return; }
    if (a === 'export') {
      try {
        const data = await CLOUD.exportData();
        const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
        const link = document.createElement('a'); link.href = url; link.download = `kin-fit-${CLOUD.profile.pseudo}.json`; document.body.appendChild(link); link.click(); link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      } catch (err) { toast(cloudErr(err)); }
      return;
    }
    if (a === 'account-delete') { ui.confirmDeleteAccount = true; render(); return refocus('[data-act="account-delete-no"]'); }
    if (a === 'account-delete-no') { ui.confirmDeleteAccount = false; render(); return; }
    if (a === 'account-delete-yes') {
      try { await CLOUD.deleteAccount(); state.sessions.forEach((x) => { delete x.uid; x.inbox = (x.inbox || []).filter((y) => !y.cloud); }); ui.confirmDeleteAccount = false; ui.friends = null; save(); render(); toast('Compte supprimé. Les données de cet appareil restent.'); }
      catch (err) { toast(cloudErr(err)); }
      return;
    }
    if (a === 'plus-refresh') { t.disabled = true; try { await CLOUD.pull(); render(); toast(CLOUD.plus ? 'Bienvenue dans Kin Fit Plus !' : 'Paiement pas encore reçu. Réessaie dans une minute.'); } catch (err) { t.disabled = false; toast(cloudErr(err)); } return; }
    if (a === 'local-use') { AI.setConfig({ provider: 'local' }); render(); toast('IA sur l’appareil activée pour le coach.'); return; }
    if (a === 'local-load') {
      const box = $('#local-progress'); const bar = box && box.querySelector('progress'); const st = $('#local-status');
      if (box) box.hidden = false; t.disabled = true;
      try {
        await AI.loadLocal((r) => { if (bar) bar.value = r.progress || 0; if (st) st.textContent = localProgress(r); });
        AI.setConfig({ provider: 'local' }); ui.aiPick = 'local'; render(); toast('IA sur l’appareil prête pour le coach.');
      } catch (err) { t.disabled = false; if (st) st.textContent = aiErr(err); }
      return;
    }
    if (a === 'ai-setup') { go('profil'); const c = $('#plus-card') || $$('.ai-card').find((x) => x.querySelector('input[name="aiprov"]')); if (c) c.scrollIntoView({ block: 'start' }); return; }
    if (a === 'hr-on') {
      try { await W.connect(); if (ui.guide && !W.recording) W.startRec(); toast('Capteur cardio connecté.'); } catch (err) { const m = watchErr(err); if (m) toast(m); }
      if (ui.guide) renderGuide(); else render(); return;
    }
    if (a === 'hr-off') { W.disconnect(); render(); return; }
    if (a === 'watch-sync') { t.disabled = true; await syncWatches(true); t.disabled = false; return; }
    if (a === 'checkin') return openCheckin();
    if (a === 'checkin-close') { const d = $('#checkin'); if (d) d.close(); return; }
    if (a === 'omad-open') { openOmad(); return; }
    if (a === 'omad-close') { const d = $('#omad'); if (d) d.close(); return; }
    if (a === 'omad-off' && sess) { sess.profile.omad = { ...(sess.profile.omad || {}), on: false }; save(); const d = $('#omad'); if (d) d.close(); render(); toast('Mode OMAD désactivé : tes trois repas reviennent.'); return; }
    if (a === 'parcours') { ui.sportTab = 'parcours'; return go('sport'); }
    if (a === 'start' && sess && ui.day === todayIdx) {
      const sv = dayView(sess, todayIdx);
      if (!sv.rest && buildPlan(sv).byDay(todayIdx)) return openGuide();
    }
    if (a === 'save-later') { const s = cur(); if (s) { delete s.askSave; save(); } render(); window.scrollTo(0, 0); return; }
    if (a === 'exo-close') { const d = $('#exo'); if (d) d.close(); return; }
    if (a === 'meal-photo') {
      if (!CLOUD.plus) { toast('Le compteur photo fait partie de Kin Fit Plus.'); go('profil'); const c = $('#plus-card'); if (c) c.scrollIntoView({ block: 'start' }); return; }
      const inp = $('#meal-file'); if (inp) { inp.value = ''; inp.click(); } return;
    }
    if (a === 'meal-close') { const d = $('#meal'); if (d) d.close(); return; }
    if (a === 'video-close') { const d = $('#video'); if (d) d.close(); return; }
    if (a === 'video-prev' && vid) return playScene(vid.i - 1);
    if (a === 'video-next' && vid) return playScene(vid.i + 1);
    if (a === 'video-toggle' && vid) { const end = !vid.playing && vid.i === vid.scenes.length - 1; vid.playing = !vid.playing; if (vid.playing) playScene(end ? 0 : vid.i); else { stopVid(); playScene(vid.i); } return; }
    if (a === 'video-sound' && vid) { vid.voice = !vid.voice && !!window.speechSynthesis; playScene(vid.i); return; }
    if (a === 'recipe-close') { const d = $('#recipe'); if (d) d.close(); return; }
    if (a === 'g-quit' || a === 'g-finish') { const d = $('#guide'); if (d) d.close(); return; }
    if (a === 'g-set' && ui.guide) {
      const g = ui.guide; const st = g.steps[g.k]; const L0g = lg(sess, iso(TODAY));
      if (st.last && !L0g.ex.includes(st.id)) { L0g.ex.push(st.id); save(); }
      g.k += 1;
      if (g.k >= g.steps.length) { g.phase = 'done'; renderGuide(); celebrateGuide(); return; }
      if (st.rest) { g.phase = 'rest'; g.left = st.rest; g.restTotal = st.rest; startTimer(); } else g.phase = 'work';
      renderGuide(); return;
    }
    if (a === 'g-skip' && ui.guide) { clearInterval(guideTimer); ui.guide.phase = 'work'; renderGuide(); return; }
    if (a === 'g-plus' && ui.guide) { ui.guide.left += 15; ui.guide.restTotal += 15; return; }
    if (a === 'g-toggle' && ui.guide) { ui.guide.paused = !ui.guide.paused; if (!ui.guide.paused) startTimer(); renderGuide(); return; }
    if (a === 'g-cardio-done' && ui.guide) { finishCardio(); return; }
    if (a === 'circuit-start') { openCircuit(); return; }
    if (a === 'c-toggle' && ui.guide) {
      const g = ui.guide; g.paused = !g.paused;
      if (!g.paused) { if (!g.started) { g.started = true; beep(880, 160); } announce(); startTimer(); } else if (window.speechSynthesis) window.speechSynthesis.cancel();
      renderGuide(); return;
    }
    if (a === 'c-next' && ui.guide) { circuitGo(ui.guide.k + 1); return; }
    if (a === 'c-prev' && ui.guide) { const g = ui.guide; circuitGo(g.left < g.segs[g.k].sec - 3 ? g.k : g.k - 1); return; }
    if (a === 'c-sound' && ui.guide) { ui.guide.sound = !ui.guide.sound; if (!ui.guide.sound && window.speechSynthesis) window.speechSynthesis.cancel(); renderGuide(); return; }
    if (a === 'start') {
      const r = t.getBoundingClientRect(); sparks(r.left + r.width / 2, r.top + r.height / 2, 40, 0.5);
      const card = $('.today-grid .stack > .card'); if (!card) return;
      card.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      const first = card.querySelector('input:not(:checked):not(:disabled), .card-foot .btn'); if (first) setTimeout(() => first.focus({ preventScroll: true }), 450);
      return;
    }
    if (a === 'ai-prog' && sess && !ui.aiBusy) {
      ui.aiBusy = 'prog'; render();
      try { const prog = await AI.programme(sess); sess.ai = { ...sess.ai, prog }; save(); toast('Programme écrit par le coach IA.'); }
      catch (err) { toast('Le coach IA n’a pas pu répondre. Ton programme actuel reste affiché, réessaie plus tard.'); }
      ui.aiBusy = null; render(); return;
    }
    if (a === 'ai-nut' && sess && !ui.aiBusy) {
      ui.aiBusy = 'nut'; render();
      try { const nut = await AI.nutrition(sess, todayIdx, !!buildPlan(sess).byDay(todayIdx)); sess.ai = { ...sess.ai, nut: { ...nut, date: iso(TODAY) } }; save(); toast('Repas du jour écrits par le coach IA.'); }
      catch (err) { toast('Le coach IA n’a pas pu répondre. Tes repas actuels restent affichés, réessaie plus tard.'); }
      ui.aiBusy = null; render(); return;
    }
    if (a === 'ai-prog-clear' && sess && sess.ai) { delete sess.ai.prog; save(); render(); return; }
    if (a === 'ai-nut-clear' && sess && sess.ai) { delete sess.ai.nut; save(); render(); return; }
    if (a === 'regen' && sess) { sess.seed += 1; save(); ui.printing = true; render(); ui.printing = false; }
    if (a === 'print') window.print();
    if (a === 'edit' && sess) startOnboarding(sess.id);
    if (a === 'new') startOnboarding(null);
    if (a === 'delete') { ui.confirmDelete = true; render(); refocus('[data-act="delete-no"]'); }
    if (a === 'delete-no') { ui.confirmDelete = false; render(); }
    if (a === 'delete-yes' && sess) {
      ui.confirmDelete = false;
      state.sessions.forEach((s) => { s.inbox = s.inbox.filter((x) => x.fromSid !== sess.id || x.status !== 'new'); });
      state.sessions = state.sessions.filter((s) => s.id !== sess.id); state.current = state.sessions[0] ? state.sessions[0].id : null; save(); ui.view = 'today'; render();
    }
    if (a === 'ob-back') { collect(); ui.ob.step -= 1; render(); refocus('#ob-title'); }
    if (a === 'ob-cancel') { ui.ob = null; render(); }
  });

  document.addEventListener('change', (e) => {
    const sess = cur();
    if (e.target.matches('[data-ex]') && sess) {
      const L0 = lg(sess, iso(dayDate(ui.day))); const id = e.target.dataset.ex;
      L0.ex = e.target.checked ? [...new Set([...L0.ex, id])] : L0.ex.filter((x) => x !== id);
      if (L0.status === 'manquee' && e.target.checked) L0.status = '';
      settle(sess); render(); refocus(`[data-ex="${id}"]`);
    }
    if (e.target.matches('[data-shop]') && sess) {
      const n = e.target.dataset.shop; const set = new Set(sess.shop[weekId] || []);
      if (e.target.checked) set.add(n); else set.delete(n);
      sess.shop[weekId] = [...set]; save(); render(); refocus(`[data-shop="${CSS.escape(n)}"]`); return;
    }
    if (e.target.id === 'meal-file' && e.target.files && e.target.files[0]) { analyseMeal(e.target.files[0]); return; }
    if (e.target.matches('[data-level]')) save();
    if (e.target.name === 'aiprov') {
      const v = e.target.value; ui.aiPick = v;
      if (v === 'none' || v === 'server' || v === 'plus') { AI.setConfig({ provider: v }); if (v === 'none') toast('Coach IA désactivé : l’app utilise ses exemples.'); }
      else if (v === 'local' && AI.config.local) AI.setConfig({ provider: 'local' });
      render(); return refocus(`input[name="aiprov"][value="${v}"]`);
    }
    if (e.target.name === 'lang' && e.target.closest('#welcome-form')) { window.NA_I18N.set({ lang: e.target.value }); render(); return; }
    if (e.target.id === 'session-select') { state.current = e.target.value; save(); ui.day = todayIdx; go('today'); }
  });

  document.addEventListener('input', (e) => {
    if (e.target.matches('[data-level]')) updateLevel(+e.target.value);
    if (e.target.id === 'niveau') $('#niveau-out').textContent = lvLabel(+e.target.value);
  });

  document.addEventListener('submit', (e) => {
    if (e.target.id === 'launch-form' || e.target.id === 'give-form') { e.preventDefault(); return; }
    if (e.target.id === 'omad-form') {
      e.preventDefault(); const sess = cur(); if (!sess) return;
      const fd = new FormData(e.target); const boxes = e.target.querySelectorAll('input[name="ok"]');
      if (boxes.length && [...boxes].some((b) => !b.checked)) { $('#omad-error').textContent = 'Coche toutes les cases. Sinon, le mode OMAD n’est pas fait pour toi en ce moment : garde tes trois repas.'; return; }
      const was = omadOn(sess);
      sess.profile.omad = { on: true, at: fd.get('at') || '19:00', since: (sess.profile.omad && sess.profile.omad.since && was) ? sess.profile.omad.since : iso(TODAY) };
      save(); $('#omad').close(); render(); toast(was ? 'Heure du repas enregistrée.' : 'Mode OMAD activé. Ton repas unique remplace tes trois repas.');
      return;
    }
    if (e.target.id === 'checkin-form') {
      e.preventDefault(); const sess = cur(); if (!sess) return;
      const fd = new FormData(e.target); const min = +(fd.get('min') || 0);
      sess.today = { date: iso(TODAY), min, forme: fd.get('forme') || 'normal' };
      $('#checkin').close(); ui.day = todayIdx; settle(sess, true); render();
      toast(min ? `Séance de ${min} min prête.` : 'Repos noté : profite pour récupérer.');
      return;
    }
    if (e.target.id === 'login-form') {
      e.preventDefault(); const email = $('#login-email').value.trim(); const st = $('#login-status'); const btn = e.target.querySelector('[type="submit"]');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { st.textContent = 'Entre une adresse e-mail valide.'; return; }
      btn.disabled = true; st.textContent = 'Envoi du lien…';
      CLOUD.signInEmail(email).then(() => { st.textContent = `Lien envoyé à ${email}. Ouvre-le sur cet appareil pour te connecter (pense à regarder les indésirables).`; })
        .catch((err) => { btn.disabled = false; st.textContent = cloudErr(err); });
      return;
    }
    if (e.target.id === 'pseudo-form') {
      e.preventDefault(); const pseudo = $('#pseudo').value.trim(); const st = $('#pseudo-status'); const sess = cur();
      if (!/^[A-Za-z0-9_.-]{3,20}$/.test(pseudo)) { st.textContent = 'Pseudo de 3 à 20 caractères : lettres, chiffres, point, tiret ou tiret bas.'; return; }
      if (!$('#consent').checked) { st.textContent = 'Coche la case de consentement pour créer ton compte.'; return; }
      st.textContent = 'Création du compte…';
      CLOUD.createProfile(pseudo, sess ? cloudState(sess) : {})
        .then((pr) => { if (sess) { sess.uid = CLOUD.user.id; sess.cloudAt = pr.updated_at; } save(); render(); toast(`Compte ${pseudo} créé. Ta progression est sauvegardée.`); refreshSocial(); })
        .catch((err) => { st.textContent = cloudErr(err); });
      return;
    }
    if (e.target.id === 'friend-form') {
      e.preventDefault(); const p = $('#friend-pseudo').value.trim(); const st = $('#friend-status');
      if (!p) { st.textContent = 'Entre le pseudo de ton ami.'; return; }
      st.textContent = 'Recherche…';
      CLOUD.requestFriend(p).then((f) => { st.textContent = `Demande envoyée à ${f.pseudo}.`; refreshSocial(); }).catch((err) => { st.textContent = cloudErr(err); });
      return;
    }
    if (e.target.id === 'welcome-form' || e.target.id === 'prefs-form') {
      e.preventDefault(); const fd = new FormData(e.target); const country = fd.get('country');
      if (!country) { const er = $('#welcome-error'); if (er) er.textContent = 'Choisis ton pays pour continuer.'; return; }
      window.NA_I18N.set({ lang: fd.get('lang') || window.NA_I18N.lang, country }); render(); window.scrollTo(0, 0); return;
    }
    e.preventDefault();
    if (e.target.id === 'ob-form') {
      collect(); const err = validate();
      if (err) { $('#ob-error').textContent = err; return; }
      if (ui.ob.step < STEPS.length - 1) { ui.ob.step += 1; render(); refocus('#ob-title'); window.scrollTo(0, 0); } else finishOnboarding();
    }
    if (e.target.id === 'chat-form') {
      const sess = cur(); const input = $('#chat-input'); const text = input.value.trim(); if (!text || !sess) return;
      sess.chat.push({ me: true, t: text });
      if (!AI.ready) { sess.chat.push({ me: false, t: reply(text, sess) }); save(); render(); refocus('#chat-input'); return; }
      const wait = { me: false, t: '', pending: true }; sess.chat.push(wait); render(); refocus('#chat-input');
      AI.coach(sess, coachContext(sess), (r) => { const n = $('.wait-note'); if (n) n.textContent = localProgress(r); })
        .then((t) => { wait.t = t; wait.ai = true; })
        .catch(() => { wait.t = reply(text, sess); })
        .finally(() => { delete wait.pending; save(); if (ui.view === 'coach' && cur() === sess) { render(); refocus('#chat-input'); } });
    }
  });

  window.addEventListener('hashchange', () => { readShare(); render(); });

  state.sessions.forEach((x) => { x.chat = (x.chat || []).filter((m) => !m.pending); });
  readShare();
  if (state.pendingShare && cur()) ui.view = 'defis';
  if (cur()) settle(cur(), true);
  render();
  if (CLOUD.enabled) {
    CLOUD.onChange(() => linkAccount());
    CLOUD.start().then((ok) => {
      if (!ok) return; linkAccount();
      if (/[?&]plus=ok/.test(location.search)) { history.replaceState(null, '', location.pathname); CLOUD.pull().then(() => { render(); toast(CLOUD.plus ? 'Bienvenue dans Kin Fit Plus !' : 'Paiement reçu : Plus s’active dans une minute.'); }).catch(() => {}); }
    });
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && CLOUD.linked) CLOUD.pull().then(() => linkAccount()).then(() => syncWatches()).catch(() => {}); });
  }
  AI.ping.then((ok) => { if (ok && !ui.ob && !document.activeElement.matches('input, textarea, select')) render(); });
})();
