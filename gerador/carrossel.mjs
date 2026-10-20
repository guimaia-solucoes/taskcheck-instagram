/**
 * Gerador de carrosséis do Instagram — Taskcheck
 *
 * Usa os mesmos templates do build.mjs e acrescenta, em cada slide, o contador
 * de página e a dica "Arraste" (exceto no último slide).
 *
 * Saída: saida-carrosseis/<n>-<nome>/01.png, 02.png...  +  legenda.txt
 *
 * Uso:
 *   node carrossel.mjs          gera todos os carrosséis
 *   node carrossel.mjs 2        gera só o carrossel 2
 *   node carrossel.mjs --html   gera apenas os HTMLs (sem screenshot)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { html, acharChrome, capturar } from './build.mjs';
import { HASHTAGS } from './posts.js';
import { carrosseis } from './carrosseis.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, '..');
const SAIDA = path.join(RAIZ, 'saida-carrosseis');
const TMP = path.join(__dirname, 'tmp');

const args = process.argv.slice(2);
const soHtml = args.includes('--html');
const filtro = args.filter((a) => /^\d+$/.test(a)).map(Number);
const lista = filtro.length ? carrosseis.filter((c) => filtro.includes(c.id)) : carrosseis;

fs.mkdirSync(TMP, { recursive: true });
const chrome = soHtml ? null : acharChrome();

for (const c of lista) {
  const pasta = path.join(SAIDA, `${c.id}-${c.nome}`);
  fs.rmSync(pasta, { recursive: true, force: true });
  fs.mkdirSync(pasta, { recursive: true });

  const total = c.slides.length;
  c.slides.forEach((s, i) => {
    const num = String(i + 1).padStart(2, '0');
    const slide = { ...s, pagina: `${i + 1}/${total}`, arraste: i < total - 1 };
    const fHtml = path.join(TMP, `carrossel-${c.id}-${num}.html`);
    fs.writeFileSync(fHtml, html(slide), 'utf8');
    if (!soHtml) {
      const fPng = path.join(pasta, `${num}.png`);
      capturar(chrome, fHtml, fPng);
      if (!fs.existsSync(fPng)) throw new Error(`Falha ao capturar o slide ${num} do carrossel ${c.id}`);
    }
    process.stdout.write(`\rCarrossel ${c.id} — slide ${i + 1}/${total}          `);
  });

  fs.writeFileSync(path.join(pasta, 'legenda.txt'), `${c.legenda}\n\n${HASHTAGS[c.tags]}\n`, 'utf8');
  process.stdout.write('\n');
}

console.log(`Pronto: ${lista.length} carrossel(is) em ${SAIDA}`);
