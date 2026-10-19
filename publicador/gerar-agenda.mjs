/**
 * Gera publicador/agenda.json distribuindo os posts em horários consecutivos
 * (manhã 09h00 e tarde 18h30, horário de Brasília, UTC-3).
 *
 * Uso:
 *   node publicador/gerar-agenda.mjs 2026-10-19              post 1 às 09h00 do dia informado
 *   node publicador/gerar-agenda.mjs 2026-10-19 tarde        post 1 às 18h30 do dia informado
 *   node publicador/gerar-agenda.mjs 2026-10-19 tarde 41     a partir do post 41
 *
 * Posts anteriores ao informado não entram na agenda. Editar agenda.json à mão também funciona.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { posts } from '../gerador/posts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SLOTS = ['manha', 'tarde'];
const HORARIO = { manha: '09:00', tarde: '18:30' };

const [inicio, slotInicial = 'manha', aPartir = '1'] = process.argv.slice(2);
if (!/^\d{4}-\d{2}-\d{2}$/.test(inicio || '') || !SLOTS.includes(slotInicial)) {
  console.error('Uso: node publicador/gerar-agenda.mjs AAAA-MM-DD [manha|tarde] [numero-do-primeiro-post]');
  process.exit(1);
}

const fila = posts.filter((p) => p.n >= Number(aPartir)).sort((a, b) => a.n - b.n);
const base = new Date(`${inicio}T00:00:00Z`);
let indice = SLOTS.indexOf(slotInicial);

const agenda = fila.map((p) => {
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() + Math.floor(indice / 2));
  const slot = SLOTS[indice % 2];
  indice++;
  return { n: p.n, quando: `${d.toISOString().slice(0, 10)}T${HORARIO[slot]}:00-03:00` };
});

fs.writeFileSync(path.join(__dirname, 'agenda.json'), JSON.stringify(agenda, null, 2) + '\n', 'utf8');
console.log(`agenda.json: ${agenda.length} posts (${fila[0].n} a ${fila.at(-1).n}), de ${agenda[0].quando} a ${agenda.at(-1).quando}`);
