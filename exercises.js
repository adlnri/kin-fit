/* Kin Fit exercise sheets: how-to steps, easier and harder versions, muscles worked (drawn on a front and
   back silhouette) and how to pick the load. Authored content in French, English and Spanish, picked by
   the app language, so the live translator does not need to touch it. */
(() => {
  'use strict';

  const NA = window.NA;
  const L = () => (window.NA_I18N && ['en', 'es'].includes(window.NA_I18N.lang) ? window.NA_I18N.lang : 'fr');

  const X = {
    squat: { zones: ['quadris', 'fessiers', 'abdos'],
      fr: { steps: ['Pieds largeur d’épaules, pointes légèrement ouvertes, poitrine haute.', 'Inspire, gaine le ventre, puis descends en poussant les hanches en arrière jusqu’à ce que les cuisses soient parallèles au sol.', 'Pousse dans tout le pied pour remonter en expirant, genoux dans l’axe des orteils.'], easy: 'Squat sur une chaise : descends jusqu’à toucher l’assise, puis remonte.', hard: 'Pause de 2 secondes en bas, ou charge plus lourde.' },
      en: { steps: ['Feet shoulder-width apart, toes slightly out, chest tall.', 'Breathe in, brace your core, then sit your hips back until your thighs are parallel to the floor.', 'Drive through the whole foot to stand up as you breathe out, knees tracking over your toes.'], easy: 'Box squat: lower until you touch a chair, then stand up.', hard: 'Pause 2 seconds at the bottom, or go heavier.' },
      es: { steps: ['Pies a la anchura de los hombros, puntas algo abiertas, pecho alto.', 'Inspira, aprieta el abdomen y baja llevando la cadera atrás hasta que los muslos queden paralelos al suelo.', 'Empuja con todo el pie para subir mientras espiras, rodillas en línea con los dedos.'], easy: 'Sentadilla a una silla: baja hasta tocar el asiento y sube.', hard: 'Pausa de 2 segundos abajo, o más peso.' } },
    fente: { zones: ['quadris', 'fessiers'],
      fr: { steps: ['Pied arrière posé sur un banc, pied avant à un grand pas devant.', 'Descends à la verticale jusqu’à frôler le sol avec le genou arrière, buste légèrement penché.', 'Remonte en poussant dans le talon avant. Fais toutes les répétitions d’un côté, puis change.'], easy: 'Fente classique, les deux pieds au sol.', hard: 'Ajoute un temps de 3 secondes à la descente, ou des haltères plus lourds.' },
      en: { steps: ['Rear foot on a bench, front foot one big step ahead.', 'Lower straight down until your back knee nearly touches the floor, torso slightly forward.', 'Push through the front heel to rise. Do all reps on one side, then switch.'], easy: 'Regular lunge with both feet on the floor.', hard: 'Take 3 seconds on the way down, or use heavier dumbbells.' },
      es: { steps: ['Pie trasero sobre un banco, pie delantero a un paso largo.', 'Baja en vertical hasta casi rozar el suelo con la rodilla trasera, tronco algo inclinado.', 'Sube empujando con el talón delantero. Haz todas las repeticiones de un lado y cambia.'], easy: 'Zancada normal, con los dos pies en el suelo.', hard: 'Baja en 3 segundos o usa mancuernas más pesadas.' } },
    rdl: { zones: ['ischios', 'fessiers', 'lombaires'],
      fr: { steps: ['Debout, genoux à peine fléchis, la charge contre les cuisses.', 'Pousse les hanches loin derrière, dos plat, jusqu’à sentir l’étirement derrière les cuisses.', 'Reviens debout en serrant les fessiers, sans cambrer en haut.'], easy: 'Mouvement à vide, mains sur les hanches, pour apprendre la charnière de hanche.', hard: 'Version sur une jambe, ou descente en 3 secondes.' },
      en: { steps: ['Stand tall, knees soft, the weight against your thighs.', 'Push your hips far back with a flat back until you feel a stretch behind your thighs.', 'Stand back up by squeezing your glutes, without leaning back at the top.'], easy: 'No weight, hands on hips, to learn the hip hinge.', hard: 'Single-leg version, or a 3-second lowering.' },
      es: { steps: ['De pie, rodillas apenas flexionadas, la carga pegada a los muslos.', 'Lleva la cadera muy atrás con la espalda recta hasta notar el estiramiento detrás de los muslos.', 'Vuelve arriba apretando los glúteos, sin arquear al final.'], easy: 'Sin peso, manos en la cadera, para aprender la bisagra de cadera.', hard: 'Versión a una pierna o bajada en 3 segundos.' } },
    hip: { zones: ['fessiers', 'ischios'],
      fr: { steps: ['Haut du dos sur un banc, pieds à plat, la charge sur les hanches.', 'Menton rentré, pousse le bassin vers le haut jusqu’à aligner épaules, hanches et genoux.', 'Serre les fessiers une seconde en haut, puis redescends en contrôle.'], easy: 'Pont fessier au sol, sans charge.', hard: 'Une jambe à la fois, ou pause de 3 secondes en haut.' },
      en: { steps: ['Upper back on a bench, feet flat, the weight on your hips.', 'Chin tucked, drive your hips up until shoulders, hips and knees line up.', 'Squeeze your glutes for one second at the top, then lower under control.'], easy: 'Glute bridge on the floor, no weight.', hard: 'One leg at a time, or a 3-second pause at the top.' },
      es: { steps: ['Parte alta de la espalda en un banco, pies apoyados, la carga sobre la cadera.', 'Barbilla recogida, sube la cadera hasta alinear hombros, cadera y rodillas.', 'Aprieta los glúteos un segundo arriba y baja con control.'], easy: 'Puente de glúteo en el suelo, sin peso.', hard: 'Una pierna cada vez, o pausa de 3 segundos arriba.' } },
    mollet: { zones: ['mollets'],
      fr: { steps: ['Avant du pied sur une marche, talon dans le vide, une main contre un mur.', 'Monte le plus haut possible sur la pointe et marque une pause.', 'Redescends lentement jusqu’à sentir l’étirement sous le talon.'], easy: 'Les deux pieds en même temps, sans charge.', hard: 'Une jambe avec un haltère, 3 secondes en haut.' },
      en: { steps: ['Ball of the foot on a step, heel hanging, one hand on a wall.', 'Rise as high as you can on your toes and pause.', 'Lower slowly until you feel the stretch under the heel.'], easy: 'Both feet together, no weight.', hard: 'One leg holding a dumbbell, 3 seconds at the top.' },
      es: { steps: ['Parte delantera del pie en un escalón, talón al aire, una mano en la pared.', 'Sube todo lo posible sobre la punta y haz una pausa.', 'Baja despacio hasta notar el estiramiento bajo el talón.'], easy: 'Los dos pies a la vez, sin peso.', hard: 'Una pierna con una mancuerna, 3 segundos arriba.' } },
    planche: { zones: ['abdos', 'epaules'],
      fr: { steps: ['Avant-bras au sol, coudes sous les épaules, jambes tendues.', 'Serre les fessiers et rentre légèrement le bassin pour que le dos soit plat.', 'Respire lentement et tiens la position sans laisser les hanches tomber.'], easy: 'Planche sur les genoux.', hard: 'Lève un pied ou un bras en alternance.' },
      en: { steps: ['Forearms on the floor, elbows under shoulders, legs straight.', 'Squeeze your glutes and tuck your pelvis slightly so your back is flat.', 'Breathe slowly and hold without letting your hips drop.'], easy: 'Plank on your knees.', hard: 'Lift one foot or one arm, alternating.' },
      es: { steps: ['Antebrazos en el suelo, codos bajo los hombros, piernas estiradas.', 'Aprieta los glúteos y mete un poco la pelvis para que la espalda quede recta.', 'Respira despacio y aguanta sin dejar caer la cadera.'], easy: 'Plancha sobre las rodillas.', hard: 'Levanta un pie o un brazo, alternando.' } },
    bench: { zones: ['pecs', 'bras', 'epaules'],
      fr: { steps: ['Allongé, omoplates serrées, pieds bien ancrés au sol.', 'Descends la charge en contrôle vers le milieu de la poitrine, coudes à 45° du buste.', 'Pousse fort en expirant jusqu’à tendre les bras, sans décoller les fesses.'], easy: 'Pompes mains surélevées sur un banc.', hard: 'Descente en 3 secondes et pause d’une seconde sur la poitrine.' },
      en: { steps: ['Lie down, shoulder blades pinched, feet firmly planted.', 'Lower the weight under control to mid-chest, elbows at 45° from your body.', 'Press hard as you breathe out until your arms are straight, hips on the bench.'], easy: 'Push-ups with hands raised on a bench.', hard: 'Take 3 seconds down and pause one second on the chest.' },
      es: { steps: ['Tumbado, escápulas juntas, pies bien apoyados.', 'Baja la carga con control hacia el centro del pecho, codos a 45° del cuerpo.', 'Empuja fuerte espirando hasta estirar los brazos, sin despegar la cadera.'], easy: 'Flexiones con las manos elevadas en un banco.', hard: 'Bajada en 3 segundos y pausa de un segundo en el pecho.' } },
    row: { zones: ['dos', 'bras', 'trapezes'],
      fr: { steps: ['Buste penché, dos plat, la charge bras tendus sous les épaules.', 'Tire le coude vers la hanche en serrant l’omoplate.', 'Marque une seconde en haut, puis redescends lentement.'], easy: 'Rowing avec élastique, assis.', hard: 'Pause de 2 secondes en haut, ou charge plus lourde.' },
      en: { steps: ['Lean forward with a flat back, the weight hanging under your shoulders.', 'Pull your elbow toward your hip and squeeze the shoulder blade.', 'Hold one second at the top, then lower slowly.'], easy: 'Seated row with a resistance band.', hard: 'Pause 2 seconds at the top, or go heavier.' },
      es: { steps: ['Tronco inclinado, espalda recta, la carga con los brazos estirados bajo los hombros.', 'Tira del codo hacia la cadera juntando la escápula.', 'Aguanta un segundo arriba y baja despacio.'], easy: 'Remo sentado con goma elástica.', hard: 'Pausa de 2 segundos arriba o más peso.' } },
    ohp: { zones: ['epaules', 'bras'],
      fr: { steps: ['Debout ou assis, charges à hauteur d’épaules, ventre gainé.', 'Pousse à la verticale en expirant, bras près des oreilles en haut.', 'Redescends en contrôle jusqu’aux épaules, sans cambrer le dos.'], easy: 'Assis avec dossier, charges plus légères.', hard: 'Un bras à la fois, debout, pour travailler le gainage.' },
      en: { steps: ['Standing or seated, weights at shoulder height, core braced.', 'Press straight up as you breathe out, arms close to your ears at the top.', 'Lower under control to your shoulders without arching your back.'], easy: 'Seated with back support, lighter weights.', hard: 'One arm at a time, standing, to work your core.' },
      es: { steps: ['De pie o sentado, cargas a la altura de los hombros, abdomen firme.', 'Empuja en vertical espirando, brazos cerca de las orejas arriba.', 'Baja con control hasta los hombros sin arquear la espalda.'], easy: 'Sentado con respaldo, cargas más ligeras.', hard: 'Un brazo cada vez, de pie, para trabajar el core.' } },
    pull: { zones: ['dos', 'bras'],
      fr: { steps: ['Bras tendus au-dessus de la tête, poitrine sortie.', 'Tire les coudes vers les hanches jusqu’à ce que la barre ou l’élastique passe sous le menton.', 'Remonte lentement jusqu’à presque tendre les bras.'], easy: 'Élastique plus léger, ou amplitude réduite.', hard: 'Pause d’une seconde en bas et remontée en 3 secondes.' },
      en: { steps: ['Arms straight overhead, chest up.', 'Pull your elbows toward your hips until the bar or band passes under your chin.', 'Let the arms rise slowly until almost straight.'], easy: 'Lighter band, or shorter range.', hard: 'Pause one second at the bottom and take 3 seconds up.' },
      es: { steps: ['Brazos estirados por encima de la cabeza, pecho fuera.', 'Tira de los codos hacia la cadera hasta que la barra o la goma pase bajo la barbilla.', 'Sube despacio hasta casi estirar los brazos.'], easy: 'Goma más ligera o menos recorrido.', hard: 'Pausa de un segundo abajo y subida en 3 segundos.' } },
    face: { zones: ['epaules', 'trapezes'],
      fr: { steps: ['Corde ou élastique à hauteur de visage, bras tendus devant toi.', 'Tire vers le visage en écartant les mains, coudes hauts.', 'Termine pouces vers l’arrière, serre une seconde, puis reviens doucement.'], easy: 'Élastique très léger, mouvement lent.', hard: 'Pause de 2 secondes en position finale.' },
      en: { steps: ['Rope or band at face height, arms straight in front of you.', 'Pull toward your face, spreading your hands, elbows high.', 'Finish with thumbs pointing back, squeeze one second, then return slowly.'], easy: 'Very light band, slow movement.', hard: 'Pause 2 seconds in the end position.' },
      es: { steps: ['Cuerda o goma a la altura de la cara, brazos estirados al frente.', 'Tira hacia la cara separando las manos, codos altos.', 'Termina con los pulgares hacia atrás, aprieta un segundo y vuelve despacio.'], easy: 'Goma muy ligera, movimiento lento.', hard: 'Pausa de 2 segundos en la posición final.' } },
    pallof: { zones: ['obliques', 'abdos'],
      fr: { steps: ['De profil par rapport au point d’attache, poignée contre la poitrine.', 'Tends les bras devant toi sans laisser le buste tourner.', 'Tiens deux secondes, ramène, puis fais l’autre côté.'], easy: 'Élastique plus léger, pieds plus écartés.', hard: 'Un genou au sol, ou tiens 5 secondes bras tendus.' },
      en: { steps: ['Stand side-on to the anchor, handle against your chest.', 'Press your arms straight out without letting your torso turn.', 'Hold two seconds, bring it back, then do the other side.'], easy: 'Lighter band, wider stance.', hard: 'Half-kneeling, or hold 5 seconds arms extended.' },
      es: { steps: ['De lado al punto de anclaje, el agarre contra el pecho.', 'Estira los brazos al frente sin dejar que el tronco gire.', 'Aguanta dos segundos, vuelve y haz el otro lado.'], easy: 'Goma más ligera, pies más separados.', hard: 'Con una rodilla en el suelo, o aguanta 5 segundos.' } },
    deadlift: { zones: ['ischios', 'fessiers', 'lombaires', 'dos'],
      fr: { steps: ['Barre contre les tibias, pieds largeur de hanches, dos plat.', 'Pousse le sol avec les jambes en gardant la barre collée aux jambes.', 'Verrouille les hanches debout, puis redescends en reculant les hanches.'], easy: 'Soulevé de terre avec kettlebell ou haltère entre les pieds.', hard: 'Descente en 3 secondes, ou charge plus lourde avec moins de répétitions.' },
      en: { steps: ['Bar against your shins, feet hip-width apart, flat back.', 'Push the floor away with your legs, keeping the bar close to your legs.', 'Lock your hips standing tall, then lower by pushing the hips back.'], easy: 'Deadlift with a kettlebell or dumbbell between your feet.', hard: '3-second lowering, or heavier with fewer reps.' },
      es: { steps: ['Barra pegada a las espinillas, pies a la anchura de la cadera, espalda recta.', 'Empuja el suelo con las piernas manteniendo la barra pegada.', 'Bloquea la cadera arriba y baja llevando la cadera atrás.'], easy: 'Peso muerto con kettlebell o mancuerna entre los pies.', hard: 'Bajada en 3 segundos o más peso con menos repeticiones.' } },
    thruster: { zones: ['quadris', 'epaules', 'fessiers'],
      fr: { steps: ['Charges à hauteur d’épaules, pieds largeur d’épaules.', 'Fais un squat complet en gardant les coudes hauts.', 'Remonte vite et utilise l’élan pour pousser les charges au-dessus de la tête.'], easy: 'Squat puis développé séparés, sans élan.', hard: 'Enchaîne sans pause, ou charges plus lourdes.' },
      en: { steps: ['Weights at shoulder height, feet shoulder-width apart.', 'Do a full squat keeping your elbows high.', 'Rise fast and use the momentum to press the weights overhead.'], easy: 'Squat then press as two separate moves.', hard: 'Chain the reps without pausing, or go heavier.' },
      es: { steps: ['Cargas a la altura de los hombros, pies a la anchura de los hombros.', 'Haz una sentadilla completa con los codos altos.', 'Sube rápido y usa el impulso para empujar las cargas por encima de la cabeza.'], easy: 'Sentadilla y press por separado, sin impulso.', hard: 'Encadena sin pausa o usa más peso.' } },
    traction: { zones: ['dos', 'bras'],
      fr: { steps: ['Suspendu, mains un peu plus larges que les épaules, épaules basses.', 'Tire la poitrine vers la barre en serrant les omoplates.', 'Redescends en 3 secondes jusqu’à bras tendus.'], easy: 'Tractions avec élastique sous les pieds, ou rowing inversé sous une table.', hard: 'Ajoute un lest de 5 kg, ou pause d’une seconde en haut.' },
      en: { steps: ['Hang with hands slightly wider than shoulders, shoulders down.', 'Pull your chest toward the bar, squeezing your shoulder blades.', 'Lower in 3 seconds to straight arms.'], easy: 'Band-assisted pull-ups, or inverted rows under a table.', hard: 'Add 5 kg, or pause one second at the top.' },
      es: { steps: ['Colgado, manos algo más abiertas que los hombros, hombros abajo.', 'Tira del pecho hacia la barra juntando las escápulas.', 'Baja en 3 segundos hasta estirar los brazos.'], easy: 'Dominadas con goma bajo los pies o remo invertido bajo una mesa.', hard: 'Añade 5 kg o pausa de un segundo arriba.' } },
    farmer: { zones: ['trapezes', 'abdos', 'bras'],
      fr: { steps: ['Une charge dans chaque main, bras le long du corps, épaules basses.', 'Marche à petits pas rapides, regard loin devant, buste droit.', 'Pose les charges en pliant les jambes, dos plat.'], easy: 'Charges plus légères, distance plus courte.', hard: 'Une seule charge d’un côté, pour travailler l’anti-inclinaison.' },
      en: { steps: ['A weight in each hand, arms by your sides, shoulders down.', 'Walk with short quick steps, eyes ahead, torso upright.', 'Set the weights down by bending your legs, back flat.'], easy: 'Lighter weights, shorter distance.', hard: 'A single weight on one side to fight leaning.' },
      es: { steps: ['Una carga en cada mano, brazos junto al cuerpo, hombros abajo.', 'Camina con pasos cortos y rápidos, mirada al frente, tronco recto.', 'Deja las cargas flexionando las piernas, espalda recta.'], easy: 'Cargas más ligeras, menos distancia.', hard: 'Una sola carga de un lado para evitar inclinarte.' } },
    chop: { zones: ['obliques', 'abdos'],
      fr: { steps: ['De profil, bras tendus vers le point d’attache en hauteur.', 'Tourne depuis les hanches et descends en diagonale vers le genou opposé.', 'Reviens lentement en contrôlant la rotation, puis change de côté.'], easy: 'Rotation russe pieds au sol, sans charge.', hard: 'Charge plus lourde, ou retour en 3 secondes.' },
      en: { steps: ['Side-on, arms straight toward the high anchor.', 'Rotate from your hips and pull diagonally down toward the opposite knee.', 'Return slowly, controlling the rotation, then switch sides.'], easy: 'Russian twist with feet down, no weight.', hard: 'Heavier load, or a 3-second return.' },
      es: { steps: ['De lado, brazos estirados hacia el anclaje alto.', 'Gira desde la cadera y baja en diagonal hacia la rodilla contraria.', 'Vuelve despacio controlando el giro y cambia de lado.'], easy: 'Giro ruso con los pies en el suelo, sin peso.', hard: 'Más peso o vuelta en 3 segundos.' } },
    deadbug: { zones: ['abdos'],
      fr: { steps: ['Allongé sur le dos, bras tendus vers le plafond, genoux à 90°.', 'Allonge un bras et la jambe opposée en expirant, le bas du dos collé au sol.', 'Reviens au centre, puis change de côté.'], easy: 'Bouge seulement les jambes, bras fixes.', hard: 'Jambes tendues, 3 secondes par répétition.' },
      en: { steps: ['On your back, arms straight to the ceiling, knees at 90°.', 'Extend one arm and the opposite leg as you breathe out, lower back pressed down.', 'Return to the middle, then switch sides.'], easy: 'Move only the legs, arms still.', hard: 'Straight legs, 3 seconds per rep.' },
      es: { steps: ['Tumbado boca arriba, brazos estirados al techo, rodillas a 90°.', 'Estira un brazo y la pierna contraria espirando, la zona lumbar pegada al suelo.', 'Vuelve al centro y cambia de lado.'], easy: 'Mueve solo las piernas, brazos quietos.', hard: 'Piernas estiradas, 3 segundos por repetición.' } },
  };

  const ZONE_NAMES = {
    fr: { pecs: 'Pectoraux', epaules: 'Épaules', bras: 'Bras', abdos: 'Abdominaux', obliques: 'Obliques', quadris: 'Quadriceps', mollets: 'Mollets', dos: 'Dos', trapezes: 'Trapèzes', lombaires: 'Lombaires', fessiers: 'Fessiers', ischios: 'Ischio-jambiers', front: 'Face', back: 'Dos' },
    en: { pecs: 'Chest', epaules: 'Shoulders', bras: 'Arms', abdos: 'Abs', obliques: 'Obliques', quadris: 'Quads', mollets: 'Calves', dos: 'Back', trapezes: 'Traps', lombaires: 'Lower back', fessiers: 'Glutes', ischios: 'Hamstrings', front: 'Front', back: 'Back' },
    es: { pecs: 'Pectorales', epaules: 'Hombros', bras: 'Brazos', abdos: 'Abdominales', obliques: 'Oblicuos', quadris: 'Cuádriceps', mollets: 'Gemelos', dos: 'Espalda', trapezes: 'Trapecios', lombaires: 'Lumbares', fessiers: 'Glúteos', ischios: 'Isquiotibiales', front: 'Frente', back: 'Espalda' },
  };

  const TIPS = {
    fr: { kg: (load) => `Charge de départ conseillée : ${load}. Le bon poids, c’est celui avec lequel les 2 dernières répétitions sont difficiles mais restent propres. Quand toutes tes séries passent facilement deux séances de suite, ajoute 2,5 kg (1 kg par main avec des haltères).`,
      txt: (load) => `Au poids du corps, ta version : ${load}. Pour progresser, ralentis la descente, ajoute une pause ou passe à la version plus dure.`,
      band: (load) => `Élastique : ${load}. Choisis la résistance avec laquelle les 2 dernières répétitions sont dures mais propres.` },
    en: { kg: (load) => `Suggested starting load: ${load}. The right weight is the one where the last 2 reps are hard but still clean. When all your sets feel easy two sessions in a row, add 2.5 kg (1 kg per hand with dumbbells).`,
      txt: (load) => `Bodyweight, your version: ${load}. To progress, slow down the lowering, add a pause or move to the harder version.`,
      band: (load) => `Band: ${load}. Pick the resistance where the last 2 reps are hard but clean.` },
    es: { kg: (load) => `Carga inicial aconsejada: ${load}. El peso correcto es aquel con el que las 2 últimas repeticiones cuestan pero siguen siendo limpias. Cuando todas tus series salgan fáciles dos sesiones seguidas, añade 2,5 kg (1 kg por mano con mancuernas).`,
      txt: (load) => `Con el peso corporal, tu versión: ${load}. Para progresar, baja más despacio, añade una pausa o pasa a la versión más difícil.`,
      band: (load) => `Goma: ${load}. Elige la resistencia con la que las 2 últimas repeticiones cuestan pero salen limpias.` },
  };

  // Front and back silhouettes; each zone is a set of simple shapes lit in gold when worked.
  const SHAPES = {
    epaules: [['circle', 30, 44, 8], ['circle', 70, 44, 8], ['circle', 130, 44, 8], ['circle', 170, 44, 8]],
    pecs: [['rect', 37, 42, 26, 15, 6]],
    bras: [['rect', 18, 52, 9, 32, 4], ['rect', 73, 52, 9, 32, 4], ['rect', 118, 52, 9, 32, 4], ['rect', 173, 52, 9, 32, 4]],
    abdos: [['rect', 41, 60, 18, 26, 4]],
    obliques: [['rect', 35, 62, 5, 22, 2], ['rect', 60, 62, 5, 22, 2]],
    quadris: [['rect', 36, 92, 12, 40, 5], ['rect', 52, 92, 12, 40, 5]],
    mollets: [['rect', 37, 138, 10, 32, 4], ['rect', 53, 138, 10, 32, 4], ['rect', 137, 138, 10, 32, 4], ['rect', 153, 138, 10, 32, 4]],
    trapezes: [['rect', 138, 34, 24, 10, 4]],
    dos: [['rect', 136, 46, 28, 26, 6]],
    lombaires: [['rect', 142, 74, 16, 11, 3]],
    fessiers: [['rect', 136, 87, 28, 17, 7]],
    ischios: [['rect', 136, 106, 12, 28, 5], ['rect', 152, 106, 12, 28, 5]],
  };
  const shape = ([k, x, y, a, b, r]) => (k === 'circle' ? `<circle cx="${x}" cy="${y}" r="${a}"/>` : `<rect x="${x}" y="${y}" width="${a}" height="${b}" rx="${r}"/>`);

  function bodyMap(zones) {
    const on = new Set(zones || []); const Z = ZONE_NAMES[L()];
    const base = (cx) => `<circle cx="${cx}" cy="20" r="11"/><rect x="${cx - 6}" y="30" width="12" height="8" rx="3"/><rect x="${cx - 18}" y="36" width="36" height="54" rx="12"/><rect x="${cx - 15}" y="86" width="30" height="12" rx="6"/>`;
    const parts = Object.entries(SHAPES).map(([z, list]) => `<g class="bm-zone${on.has(z) ? ' is-on' : ''}">${list.map(shape).join('')}</g>`).join('');
    const names = [...on].map((z) => Z[z]).filter(Boolean).join(', ');
    return `<figure class="bodymap" data-no-i18n><svg viewBox="0 0 200 184" role="img" aria-label="${names}">
      <g class="bm-base">${base(50)}${base(150)}</g>${parts}
      <text x="50" y="182" text-anchor="middle">${Z.front}</text><text x="150" y="182" text-anchor="middle">${Z.back}</text></svg>
      ${names ? `<figcaption>${names}</figcaption>` : ''}</figure>`;
  }

  // The sheet content for an exercise, with the variant and load that fit this profile.
  function detail(id, p) {
    const ex = NA.E[id]; const x = X[id] || { zones: [] }; const t = x[L()] || x.fr || { steps: [], easy: '', hard: '' };
    const v = NA.variant(ex, p); const load = NA.loadText(v, p);
    const kind = v.kg != null ? 'kg' : /lastique|band|goma/i.test(load) ? 'band' : 'txt';
    return { id, name: v.n, muscles: ex.m, zones: x.zones, steps: t.steps, easy: t.easy, hard: t.hard, tech: ex.tech, err: ex.err, load, tip: TIPS[L()][kind](load), rest: NA.restOf(ex, p) };
  }

  window.NA_EXO = { detail, bodyMap, has: (id) => !!X[id] };
})();
