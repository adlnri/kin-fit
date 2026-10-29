/* Kin Fit circuits: Hyrox-style runs and stations, bodyweight, cardio and dumbbell "parcours" sized to a
   chosen duration and level. Authored sample content; stations reuse the engine's exercises where they exist. */
(() => {
  'use strict';

  const NA = window.NA;

  // Cardio moves that are not strength exercises. `low` replaces a jump when a knee is reported.
  const MOVES = {
    jacks: { n: 'Jumping jacks', m: 'Cardio, mollets, épaules', low: 'Step jacks sans saut', tech: 'Ouvre bras et jambes en même temps, atterris sur l’avant du pied, garde un rythme régulier.', err: 'Atterrir talons tendus et genoux verrouillés.' },
    genoux: { n: 'Montées de genoux', m: 'Cardio, fléchisseurs de hanche', low: 'Montées de genoux marchées', tech: 'Buste droit, genoux à hauteur de hanche, bras qui suivent le rythme des jambes.', err: 'Se pencher en arrière pour monter les genoux.' },
    burpee: { n: 'Burpees', m: 'Corps entier', low: 'Burpees sans saut, en reculant les pieds un par un', tech: 'Mains au sol, saute ou recule les pieds en planche, reviens accroupi puis relève-toi en expirant.', err: 'Laisser le bassin s’effondrer en position de planche.' },
    climber: { n: 'Mountain climbers', m: 'Gainage, cardio', low: 'Mountain climbers lents', tech: 'Épaules au-dessus des mains, ramène un genou vers la poitrine puis l’autre, hanches basses.', err: 'Lever les fesses haut pour aller plus vite.' },
    patineur: { n: 'Sauts du patineur', m: 'Fessiers, équilibre, cardio', low: 'Pas chassés latéraux', tech: 'Saute d’un pied sur l’autre en latéral, réception amortie, le pied libre croise derrière.', err: 'Réception jambe tendue sans amorti.' },
    corde: { n: 'Corde à sauter (ou sans corde)', m: 'Mollets, coordination, cardio', low: 'Marche rapide sur place', tech: 'Petits sauts sur l’avant du pied, coudes près du corps, la rotation vient des poignets.', err: 'Sauter trop haut et se fatiguer en deux minutes.' },
    shadow: { n: 'Shadow boxing', m: 'Épaules, gainage, cardio', low: 'Shadow boxing pieds ancrés', tech: 'Garde haute, enchaîne direct, crochet et uppercut en tournant les hanches, reste léger sur les appuis.', err: 'Baisser la garde entre deux coups.' },
    sprint: { n: 'Sprint sur place', m: 'Cardio, mollets', low: 'Marche rapide sur place en pompant les bras', tech: 'Sur l’avant des pieds, bras à 90° qui pompent fort, fréquence maximale.', err: 'Courir sur les talons.' },
  };

  // Stations per circuit: engine exercises (id) or cardio moves (move).
  const TYPES = {
    hyrox: { name: 'Hyrox', icon: 'bolt', kit: 'auto', met: 8.5, hyrox: true,
      why: 'Comme une course Hyrox : une course avant chaque station, puis un exercice de force ou de puissance. Cardio, poids du corps et charges s’enchaînent, et le cœur ne redescend jamais vraiment.' },
    corps: { name: 'Poids du corps', icon: 'stretch', kit: 'corps', met: 7, stations: [{ id: 'squat' }, { id: 'bench' }, { id: 'fente_av' }, { id: 'row' }, { id: 'pont' }, { id: 'dips' }, { id: 'planche' }, { move: 'climber' }],
      why: 'Un parcours sans matériel qui alterne jambes, poussée, tirage et gainage : chaque groupe récupère pendant que le suivant travaille.' },
    cardio: { name: 'Cardio', icon: 'heart', kit: 'corps', met: 8, stations: [{ move: 'jacks' }, { move: 'genoux' }, { move: 'burpee' }, { move: 'climber' }, { move: 'patineur' }, { move: 'corde' }, { move: 'shadow' }, { move: 'sprint' }],
      why: 'Des efforts courts et intenses qui font monter le cœur, puis une récupération incomplète : idéal pour l’endurance et la dépense calorique.' },
    halteres: { name: 'Haltères', icon: 'dumbbell', kit: 'halteres', met: 7.5, stations: [{ id: 'squat' }, { id: 'bench' }, { id: 'row' }, { id: 'fente' }, { id: 'ohp' }, { id: 'rdl' }, { id: 'thruster' }, { id: 'farmer' }],
      why: 'Une paire d’haltères suffit : mouvements polyarticulaires enchaînés pour la force et le cardio en même temps.' },
  };

  TYPES.mobilite = { name: 'Mobilité', icon: 'stretch', kit: 'corps', met: 2.5, chrono: true, stations: [{ id: 'chat' }, { id: 'worlds' }, { id: 'psoas' }, { id: 'ischio' }, { id: 'pont' }, { id: 'superman' }, { id: 'enfant' }, { id: 'deadbug' }],
    why: 'Des positions tenues et des mouvements lents pour délier hanches, dos et épaules : parfait les jours de repos ou après une séance.' };

  // Hyrox stations by equipment, most important first: the list is cut to the number of blocks.
  const HYROX = {
    salle: ['traineau', 'traction', 'burpee_saut', 'dips', 'rameur', 'wallball', 'farmer', 'fente_av'],
    halteres: ['thruster', 'traction', 'burpee_saut', 'dips', 'swing', 'fente_av', 'farmer', 'climber'],
    corps: ['burpee_saut', 'traction', 'jumpsq', 'dips', 'climber', 'fente_av', 'bench', 'planche'],
  };
  const SPEED = [9, 10.5, 12]; // km/h on the runs, by level
  // "Pour le temps": what to do at each station, by level (débutant, intermédiaire, avancé). Numbers are reps.
  const TARGET = {
    traineau: ['25 m', '40 m', '50 m'], rameur: ['500 m', '750 m', '1 000 m'], farmer: ['100 m', '150 m', '200 m'], planche: ['30 s', '45 s', '60 s'],
    burpee_saut: [10, 15, 20], traction: [5, 8, 12], dips: [8, 12, 15], wallball: [20, 30, 40], fente_av: [16, 20, 24], thruster: [12, 15, 20], swing: [15, 20, 25],
    climber: [30, 40, 50], jumpsq: [12, 15, 20], bench: [10, 15, 20], squat: [12, 15, 20], row: [10, 12, 15], pont: [15, 20, 25], fente: [10, 12, 14], ohp: [10, 12, 15], rdl: [10, 12, 15],
    jacks: [30, 40, 50], genoux: [30, 40, 50], burpee: [8, 10, 12], patineur: [20, 24, 30], corde: [50, 75, 100], shadow: ['30 s', '45 s', '60 s'], sprint: ['20 s', '30 s', '30 s'],
  };
  function target(id, lv) {
    const t = TARGET[id]; const ex = NA.E[id];
    const v = t ? t[lv] : ex && typeof ex.r === 'number' ? ex.r + (lv - 1) * 2 : ex ? ex.r : 10;
    return typeof v === 'number' ? `${v} répétitions` : v;
  }
  const RUN = { course: [600, 800, 1000], rameur: [500, 750, 1000] };
  const dist = (m) => (m >= 1000 ? `${String(m / 1000).replace('.', ',')} km` : `${m} m`);
  const STATION = [60, 75, 90]; // seconds per station, by level

  const WARM = ['Rotations des épaules et des hanches, 1 min', 'Marche puis trot sur place, 2 min', 'Squats et fentes lents à vide, 1 min', 'Montées de genoux légères, 1 min'];
  const COOL = ['Marche lente et respiration nasale, 2 min', 'Étirement des quadriceps et ischio-jambiers, 1 min', 'Étirement des pectoraux et du dos, 1 min', 'Respiration ventrale allongé, 1 min'];
  const PACE = [{ on: 30, off: 30, rest: 90 }, { on: 40, off: 20, rest: 75 }, { on: 45, off: 15, rest: 60 }]; // débutant, intermédiaire, avancé

  function station(st, kit, p) {
    const knee = /genou/i.test(p.restrictions || '');
    if (st.move) {
      const mv = MOVES[st.move]; const name = knee ? mv.low : mv.n;
      const ex = NA.E[st.move];
      return { id: ex ? st.move : null, v: ex ? { n: name, txt: ex.body.txt } : null, n: name, m: mv.m, load: knee ? 'Sans impact' : 'Rythme soutenu', tech: mv.tech, err: mv.err };
    }
    const ex = NA.E[st.id];
    const v = kit === 'auto' ? NA.variant(ex, p) : kit === 'halteres' ? (ex.dumb || ex.body) : (ex.body || ex.band || ex.dumb);
    if (knee && ex.low) return { id: st.id, v, n: ex.low, m: ex.m, load: 'Sans impact', tech: ex.tech, err: ex.err };
    return { id: st.id, v, n: v.n, m: ex.m, load: NA.loadText(v, p), tech: ex.tech, err: ex.err };
  }

  // Hyrox: n blocks of one run then one station, in a single pass.
  function hyrox(p, T, D, warm, cool, ft) {
    const m = p.materiel || []; const lv = NA.lvIdx(p.niveau);
    const kit = m.includes('salle') ? 'salle' : m.includes('halteres') ? 'halteres' : 'corps';
    const knee = /genou/i.test(p.restrictions || '');
    const n = D <= 30 ? 4 : D <= 45 ? 6 : 8; const st = STATION[lv]; const tr = 30;
    const per = ((D - warm - cool) * 60) / n;
    const run = Math.max(1, Math.round((per - st - tr) / 30) / 2);
    const meters = Math.round((run * SPEED[lv] * 1000) / 60 / 50) * 50;
    const runId = knee && kit === 'salle' ? 'rameur' : 'course';
    const leg = station({ id: runId }, 'auto', p);
    const mins = String(run).replace('.', ',');
    const runTxt = `${mins} min de ${runId === 'rameur' ? 'rameur' : knee ? 'marche rapide' : 'course'}`;
    const legDist = dist((RUN[runId] || RUN.course)[lv] - (knee && runId === 'course' ? 200 : 0));
    const seq = [];
    HYROX[kit].slice(0, n).forEach((id) => {
      seq.push({ ...leg, run: true, meta: ft ? `${legDist} de ${runId === 'rameur' ? 'rameur' : knee ? 'marche rapide' : 'course'}` : knee ? runTxt : `${runTxt} · environ ${meters} m` });
      const s = station({ id }, 'auto', p); seq.push({ ...s, meta: ft ? `${target(id, lv)} · ${s.load}` : `${st} s de station · ${s.load}` });
    });
    if (ft) {
      return { rounds: 1, stations: seq, missing: false, timing: null,
        sub: `${n} blocs course et station · le plus vite possible · ≈ ${NA.burnOf(T.met, p, D)} kcal`,
        part: `Les blocs · ${n} courses et ${n} stations`,
        facts: [['Format', 'Pour le temps'], ['Course', legDist], ['Blocs', String(n)], ['Objectif', 'Le plus vite possible']] };
    }
    return { rounds: 1, stations: seq, missing: false, timing: { run: Math.round(run * 60), st, tr },
      sub: `${D} min · ${n} blocs course et station · ≈ ${NA.burnOf(T.met, p, D)} kcal`,
      part: `Les blocs · ${n} courses et ${n} stations`,
      facts: [['Course', knee ? `${mins} min` : `${mins} min · ${meters} m`], ['Station', `${st} s`], ['Transition', `${tr} s`], ['Blocs', String(n)]] };
  }

  function build(p, type, dur, mode) {
    const T = TYPES[type] || TYPES.hyrox; const D = NA.DUREES.includes(+dur) ? +dur : NA.durOf(p);
    const ft = mode === 'temps' && !T.chrono; const lv = NA.lvIdx(p.niveau);
    const pace = PACE[NA.lvIdx(p.niveau)];
    const warm = D >= 60 ? 8 : 5; const cool = D >= 60 ? 7 : 5;
    const base = { type: TYPES[type] ? type : 'hyrox', name: T.name, icon: T.icon, why: T.why, duree: D, pace, warm, cool, kcal: NA.burnOf(T.met, p, D),
      warmList: WARM, coolList: COOL, knee: /genou/i.test(p.restrictions || ''), mode: ft ? 'temps' : 'chrono' };
    if (T.hyrox) return { ...base, ...hyrox(p, T, D, warm, cool, ft) };
    const n = D <= 30 ? 6 : 8;
    const lap = n * (pace.on + pace.off);
    const rounds = Math.max(2, Math.round(((D - warm - cool) * 60 + pace.rest) / (lap + pace.rest)));
    const stations = T.stations.slice(0, n).map((st) => { const s = station(st, T.kit, p); return { ...s, meta: ft ? `${target(st.id || st.move, lv)} · ${s.load}` : `${pace.on} s d’effort · ${pace.off} s de repos · ${s.load}` }; });
    const missing = T.kit === 'halteres' && !p.materiel.some((m) => m === 'halteres' || m === 'salle');
    if (ft) {
      return { ...base, rounds, stations, missing,
        sub: `${rounds} tours · ${stations.length} exercices · le plus vite possible · ≈ ${base.kcal} kcal`,
        part: `Le circuit · ${rounds} tours`,
        facts: [['Format', 'Pour le temps'], ['Tours', String(rounds)], ['Exercices', String(stations.length)], ['Objectif', 'Le plus vite possible']] };
    }
    return { ...base, rounds, stations, missing,
      sub: `${D} min · ${rounds} tours · ${stations.length} exercices · ≈ ${base.kcal} kcal`,
      part: `Le circuit · ${rounds} tours`,
      facts: [['Effort', `${pace.on} s`], ['Repos entre exercices', `${pace.off} s`], ['Repos entre les tours', `${pace.rest} s`], ['Tours', String(rounds)]] };
  }

  window.NA_CIRCUITS = { TYPES, build };
})();
