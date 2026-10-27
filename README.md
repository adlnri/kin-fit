# Kin Fit

**金 Kin Fit** — programme sportif et nutrition personnalisés, défis entre amis et médailles à gagner.
Application web installable (PWA), en français, anglais et espagnol.

> Sans réglage, l'app est gratuite et hors connexion : programmes, repas, parcours, exercices avec vidéo explicative et recettes sont calculés dans le navigateur.
> L'IA est réservée à l'abonnement **Kin Fit Plus** (2,99 €/mois ou 24,99 €/an, sans essai) : coach, compteur de calories en photo, programmes et menus par l'IA. L'abonné paie, jamais l'éditeur pour les autres.
> Gratuit aussi : **IA sur l'appareil** (modèle open source Qwen 2.5, environ 1 Go téléchargé une fois, WebGPU), pour le coach seulement, rien ne quitte l'appareil.
>
> Les données du profil restent sur l'appareil (localStorage). Aucune clé n'est jamais stockée dans le code.

## Fonctionnalités

- **Inscription** : profil, niveau, matériel, restrictions, sport(s), régime (végétarien, pescétarien, végan), pratiques (halal, casher, sans porc), 8 allergènes, type de petit-déjeuner, budget, repas plaisir.
- **Programme sportif** : séances de musculation (5 à 7 exercices selon la durée choisie : 30, 45, 60, 75 ou 90 min), cardio adapté au sport, charges et séries réglées par le niveau, technique, erreur à éviter, vidéo.
- **Nutrition** : petit-déjeuner, déjeuner, dîner, collation et cheat meals filtrés selon le régime et les allergies, portions selon les besoins, alternatives petit budget et locales selon la région.
- **Parcours** : circuits poids du corps, cardio et haltères, à la durée voulue ; effort, repos et nombre de tours suivent le niveau, versions sans impact si un genou est signalé.
- **Liste de courses** de la semaine, par rayon, avec cases à cocher, copie et partage.
- **Défis** du jour, de la semaine, du sport, et entre amis (même appareil ou lien `#defi=`).
- **Trophées** : 21 médailles, rangs Bronze à Platine, doublons à offrir.
- **Langues et pays** : écran d'accueil, traduction FR / EN / ES, adaptation régionale.

## Lancer en local

Aucune installation : ce sont des fichiers statiques.

```bash
python -m http.server 4180
```

Puis ouvrir <http://127.0.0.1:4180/>.

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Page unique, coquille de l'app, enregistrement du service worker |
| `styles.css` | Styles (noir et or, médailles, mobile) |
| `engine.js` | Données et génération du programme sportif et du petit-déjeuner de base |
| `circuits.js` | Parcours poids du corps, cardio et haltères |
| `meals.js` | Plats, cheat meals, régimes, allergènes, budget, alternatives régionales |
| `stickers.js` | Dessins des médailles et écussons de rang (SVG) |
| `i18n-data.js` | Traductions anglais / espagnol des textes de l'app |
| `i18n.js` | Langue, pays, région et traduction en direct |
| `ai.js` | Coach IA : Kin Fit Plus (Gemini via la fonction Supabase), IA sur l'appareil (WebLLM), serveur facultatif ; compteur photo ; repli sur les exemples |
| `ai-core.mjs` | Prompts coach et nutrition, schémas des réponses, partagés par toutes les sources d'IA |
| `app.js` | Interface : écrans, défis, trophées, partage, liste de courses, installation |
| `netlify/functions/ai.mjs` | Option serveur `/api/ai` (Claude), inactive sans clé |
| `netlify.toml`, `package.json`, `scripts/build.mjs` | Déploiement Netlify (copie de l'app dans `dist/`) |
| `manifest.webmanifest`, `sw.js`, `icons/` | Application installable et hors ligne |
| `images/`, `scripts/silk.py` | Fond « soie d’or » de l’accueil, généré par script (aucune photo ni banque d’images) |
| `images/exo/` | Photos début / fin de mouvement des exercices, tirées de [Free Exercise DB](https://github.com/yuhonas/free-exercise-db) (licence Unlicense, domaine public), redimensionnées en 480 px |
| `fonts/` | Polices auto-hébergées (Manrope, Sora, Dela Gothic One — licence SIL OFL) |
| `PRODUCT.md`, `DESIGN.md`, `.impeccable/` | Documentation produit et design |

## Publier

- **GitHub Pages** (gratuit) : Settings → Pages → Deploy from branch → `main` / racine. Toute l'app marche ; Kin Fit Plus passe par les fonctions Supabase (voir plus bas).
- **Netlify** (facultatif) : import du dépôt GitHub ; Netlify lit `netlify.toml` (build `npm run build`, dossier `dist`).

### Kin Fit Plus : mise en route (à faire une fois par l'éditeur)

L'abonnement finance l'IA : la clé Gemini **payante** de l'éditeur reste un secret Supabase, appelée seulement pour les abonnés, avec une limite par jour. Les conditions de Google interdisent l'offre gratuite de l'API pour une app ouverte aux utilisateurs de l'Union européenne.

1. **Base** : Supabase › SQL Editor › exécuter `supabase/plus.sql` (statut d'abonnement, compteur d'usage, colonnes protégées).
2. **Gemini** : sur Google AI Studio, créer une clé dans un projet Google Cloud **avec facturation activée**, puis dans Google Cloud › APIs › Generative Language API › Quotas, fixer un plafond de requêtes par jour (plafond de dépense).
3. **Stripe** : créer le compte (statut d'entreprise et IBAN requis), un produit « Kin Fit Plus » avec deux prix récurrents (2,99 € par mois, 24,99 € par an), puis un **Payment Link** pour chacun. Dans chaque lien : après paiement, rediriger vers `https://<ton-site>/?plus=ok` ; activer la case d'acceptation des conditions (Settings › Public details › Terms of service = l'adresse de `cgv.html`). Activer le **portail client** (Settings › Billing › Customer portal) et copier son lien de connexion.
4. **Fonctions** (Supabase CLI, ou éditeur de fonctions du tableau de bord) :
   - `supabase functions deploy gemini --no-verify-jwt`
   - `supabase functions deploy stripe-webhook --no-verify-jwt`
   - secrets : `supabase secrets set GEMINI_API_KEY=… STRIPE_SECRET_KEY=… STRIPE_WEBHOOK_SECRET=…` (facultatif : `KINFIT_DAILY_LIMIT=60`). Ces clés ne vont **jamais** dans le code.
5. **Webhook Stripe** : Developers › Webhooks › ajouter `https://<projet>.supabase.co/functions/v1/stripe-webhook` avec les événements `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid` ; copier son secret de signature dans `STRIPE_WEBHOOK_SECRET`.
6. **App** : coller les deux Payment Links et le lien du portail dans `config.js` (`plus: { monthly, yearly, portal }`), puis publier.
7. **Légal** : compléter dans `cgv.html` le statut, le SIRET, l'adresse et le médiateur de la consommation.

Tester d'abord en **mode test** Stripe (carte 4242 4242 4242 4242), puis passer en mode réel.

- **IA sur l'appareil** : bibliothèque WebLLM 0.2.85 chargée depuis jsDelivr, modèle `Qwen2.5-1.5B-Instruct-q4f16_1-MLC`. Navigateur compatible WebGPU nécessaire (Chrome, Edge, Safari récents). Coach seulement : un si petit modèle n'écrit pas de programmes fiables.

### Option serveur (Claude, payante, désactivée par défaut)

`netlify/functions/ai.mjs` peut appeler Claude d'Anthropic avec une clé de l'éditeur. **Rien ne se passe tant que la variable `ANTHROPIC_API_KEY` n'est pas définie dans Netlify**, et aucune clé n'existe aujourd'hui. Si un jour elle est activée, l'usage est facturé au propriétaire de la clé (voir console.anthropic.com, avec une limite de dépense). Variables facultatives : `KINFIT_MODEL_PLAN`, `KINFIT_MODEL_CHAT`, `KINFIT_EFFORT`, `KINFIT_RATE_LIMIT`, `ALLOWED_ORIGINS`.

Les prompts coach et nutrition sont dans `ai-core.mjs`, partagés par Kin Fit Plus (Gemini), l'IA sur l'appareil et le serveur.

## Mettre à jour

Le numéro de version `?v=…` des fichiers apparaît dans `index.html` **et** dans `sw.js` (`CACHE` et `V`).
Il faut l'augmenter aux deux endroits à chaque modification, sinon les téléphones gardent l'ancienne version en cache.

## Comptes et amis (Supabase, facultatif)

Sans configuration, l'app marche sans compte. Pour activer les comptes, la sauvegarde et les défis entre amis :

1. Créer un projet sur <https://supabase.com> (région **Central EU (Frankfurt)**).
2. **SQL Editor › New query** : coller le contenu de `supabase/schema.sql`, puis **Run**.
3. **Authentication › URL Configuration** : *Site URL* = `https://adlnri.github.io/kin-fit/` et ajouter la même adresse dans *Redirect URLs*.
4. **Project Settings › API** : copier *Project URL* et la clé *anon public* dans `config.js` (`url`, `key`), puis augmenter le `?v=` dans `index.html` et `sw.js`.
5. Facultatif, Google : **Authentication › Providers › Google** (identifiants créés dans Google Cloud Console), puis `google: true` dans `config.js`.

Ne jamais mettre la clé `service_role` / `secret` ni le mot de passe de la base dans le code. La sécurité repose sur les règles d'accès (Row Level Security) de `schema.sql` : chacun ne lit que ses données, ses amitiés et les défis auxquels il participe.

Avant d'ouvrir au public : compléter les champs `[...]` de `confidentialite.html` (éditeur, e-mail de contact) et configurer un envoi d'e-mails dédié (Authentication › SMTP), l'envoi par défaut de Supabase étant limité à quelques e-mails par heure.
