/**
 * Gera publicador/agenda.json com UM post por dia (horário de Brasília, UTC-3).
 *
 * Para não parecer automação, o horário muda a cada dia: alterna entre as janelas de
 * JANELAS e soma uma variação de até ±VARIACAO minutos. A variação é calculada a partir do
 * número do post, então gerar a agenda de novo dá sempre os mesmos horários.
 *
 * Uso:
 *   node publicador/gerar-agenda.mjs AAAA-MM-DD [primeiro-post]
 *
 *   AAAA-MM-DD        dia do primeiro post
 *   primeiro-post     número do primeiro post da fila; padrão: o primeiro ainda não publicado
 *
 * Exemplo: node publicador/gerar-agenda.mjs 2026-11-10 73
 *
 * Posts anteriores ao informado não entram na agenda. Editar agenda.json à mão também funciona.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { posts } from '../gerador/posts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JANELAS = ['08:40', '12:20', '18:50'];
const VARIACAO = 35;

const arqPublicados = path.join(__dirname, 'publicados.json');
const publicados = fs.existsSync(arqPublicados) ? JSON.parse(fs.readFileSync(arqPublicados, 'utf8')) : {};
const primeiroPendente = posts.map((p) => p.n).filter((n) => !publicados[n]).sort((a, b) => a - b)[0];

const [inicio, aPartir = String(primeiroPendente)] = process.argv.slice(2);
if (!/^\d{4}-\d{2}-\d{2}$/.test(inicio || '')) {
  console.error('Uso: node publicador/gerar-agenda.mjs AAAA-MM-DD [primeiro-post]');
  process.exit(1);
}

// Variação em minutos, entre -VARIACAO e +VARIACAO, sempre igual para o mesmo post.
function variacao(n) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return Math.round((x - Math.floor(x)) * 2 * VARIACAO) - VARIACAO;
}

const fila = posts.filter((p) => p.n >= Number(aPartir)).sort((a, b) => a.n - b.n);
const base = new Date(`${inicio}T00:00:00-03:00`).getTime();

const agenda = fila.map((p, dia) => {
  const [h, m] = JANELAS[dia % JANELAS.length].split(':').map(Number);
  const minutos = h * 60 + m + variacao(p.n);
  // Desloca para UTC-3 para formatar a hora local de Brasília.
  const local = new Date(base + (dia * 1440 + minutos) * 60000 - 3 * 3600000).toISOString();
  return { n: p.n, quando: `${local.slice(0, 16)}:00-03:00` };
});

fs.writeFileSync(path.join(__dirname, 'agenda.json'), JSON.stringify(agenda, null, 2) + '\n', 'utf8');
console.log(`agenda.json: ${agenda.length} posts (${fila[0].n} a ${fila.at(-1).n}), de ${agenda[0].quando} a ${agenda.at(-1).quando}`);
