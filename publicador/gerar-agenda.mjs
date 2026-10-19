/**
 * Gera publicador/agenda.json a partir do calendário de posts.js.
 *
 * Uso:
 *   node publicador/gerar-agenda.mjs 2026-10-19
 *
 * O dia 1 do calendário cai na data informada. Horários em Brasília (UTC-3):
 * manhã 09h00 e tarde 18h30. Editar agenda.json à mão também funciona.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { posts } from '../gerador/posts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HORARIO = { manha: '09:00', tarde: '18:30' };

const inicio = process.argv[2];
if (!/^\d{4}-\d{2}-\d{2}$/.test(inicio || '')) {
  console.error('Informe a data do dia 1 no formato AAAA-MM-DD.');
  process.exit(1);
}

const base = new Date(`${inicio}T00:00:00Z`);
const agenda = posts.map((p) => {
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() + p.dia - 1);
  const data = d.toISOString().slice(0, 10);
  return { n: p.n, quando: `${data}T${HORARIO[p.slot]}:00-03:00` };
});

fs.writeFileSync(path.join(__dirname, 'agenda.json'), JSON.stringify(agenda, null, 2) + '\n', 'utf8');
console.log(`agenda.json: ${agenda.length} posts, de ${agenda[0].quando} a ${agenda.at(-1).quando}`);
