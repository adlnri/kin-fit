/* Copies the files the app ships into dist/ (Netlify publishes that folder). */
import { cpSync, mkdirSync, rmSync } from 'node:fs';

const FILES = ['index.html', 'manifest.webmanifest', 'sw.js', '_headers', 'styles.css',
  'engine.js', 'circuits.js', 'exercises.js', 'i18n-data.js', 'i18n.js', 'meals.js', 'recipes.js', 'stickers.js', 'ai.js', 'ai-core.mjs', 'config.js', 'cloud.js', 'app.js', 'confidentialite.html', 'cgv.html', 'fonts', 'icons', 'images'];

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
FILES.forEach((f) => cpSync(f, `dist/${f}`, { recursive: true }));
console.log(`dist/ : ${FILES.length} entrées copiées`);
