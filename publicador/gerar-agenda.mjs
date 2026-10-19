/**
 * Gera publicador/agenda.json distribuindo os posts em horários consecutivos
 * (horário de Brasília, UTC-3), usando os horários diários de HORARIOS.
 *
 * Uso:
 *   node publicador/gerar-agenda.mjs AAAA-MM-DD [HH:MM] [primeiro-post] [--primeiro-agora]
 *
 *   AAAA-MM-DD        dia do primeiro horário
 *   HH:MM             primeiro horário (um dos HORARIOS); padrão: o primeiro do dia
 *   primeiro-post     número do primeiro post da fila; padrão 1
 *   --primeiro-agora  o primeiro post sai na próxima execução do workflow e os
 *                     demais começam no horário informado
 *
 * Exemplo: node publicador/gerar-agenda.mjs 2026-10-19 19:25 41 --primeiro-agora
 *
 * Posts anteriores ao informado não entram na agenda. Editar agenda.json à mão também funciona.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { posts } from '../gerador/posts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HORARIOS = ['08:15', '13:30', '19:25'];

const args = process.argv.slice(2);
const primeiroAgora = args.includes('--primeiro-agora');
const [inicio, horarioInicial = HORARIOS[0], aPartir = '1'] = args.filter((a) => !a.startsWith('--'));
if (!/^\d{4}-\d{2}-\d{2}$/.test(inicio || '') || !HORARIOS.includes(horarioInicial)) {
  console.error(`Uso: node publicador/gerar-agenda.mjs AAAA-MM-DD [${HORARIOS.join('|')}] [primeiro-post] [--primeiro-agora]`);
  process.exit(1);
}

const fila = posts.filter((p) => p.n >= Number(aPartir)).sort((a, b) => a.n - b.n);
const base = new Date(`${inicio}T00:00:00Z`);
let indice = HORARIOS.indexOf(horarioInicial);

const agenda = fila.map((p, i) => {
  // Meia-noite do dia de início já passou: o workflow publica na primeira execução.
  if (primeiroAgora && i === 0) return { n: p.n, quando: `${inicio}T00:00:00-03:00` };
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() + Math.floor(indice / HORARIOS.length));
  const hora = HORARIOS[indice % HORARIOS.length];
  indice++;
  return { n: p.n, quando: `${d.toISOString().slice(0, 10)}T${hora}:00-03:00` };
});

fs.writeFileSync(path.join(__dirname, 'agenda.json'), JSON.stringify(agenda, null, 2) + '\n', 'utf8');
console.log(`agenda.json: ${agenda.length} posts (${fila[0].n} a ${fila.at(-1).n}), de ${agenda[0].quando} a ${agenda.at(-1).quando}`);
