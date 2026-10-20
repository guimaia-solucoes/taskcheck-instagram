/**
 * Imprime quantos segundos faltam para o próximo post da agenda que ainda não foi publicado.
 *   0   = já está vencido (pode publicar agora)
 *   -1  = agenda concluída
 *
 * Usado pelo workflow, que dorme esse tempo e publica no horário exato, sem depender do
 * agendamento do GitHub. Respeita um intervalo mínimo entre publicações para que posts
 * atrasados não saiam todos em sequência.
 *
 * Uso: node publicador/esperar.mjs [--agora=ISO]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INTERVALO_MINIMO = 20 * 60 * 1000;

const agoraArg = process.argv.find((a) => a.startsWith('--agora='));
const agora = agoraArg ? new Date(agoraArg.slice(8)).getTime() : Date.now();

const agenda = JSON.parse(fs.readFileSync(path.join(__dirname, 'agenda.json'), 'utf8'));
const arqPublicados = path.join(__dirname, 'publicados.json');
const publicados = fs.existsSync(arqPublicados) ? JSON.parse(fs.readFileSync(arqPublicados, 'utf8')) : {};

const proximo = agenda
  .filter((a) => !publicados[a.n])
  .map((a) => new Date(a.quando).getTime())
  .sort((a, b) => a - b)[0];

if (proximo === undefined) {
  console.log(-1);
} else {
  const ultima = Math.max(0, ...Object.values(publicados).map((p) => (p.publicado ? new Date(p.publicado).getTime() : 0)));
  const alvo = Math.max(proximo, ultima + INTERVALO_MINIMO);
  console.log(Math.max(0, Math.ceil((alvo - agora) / 1000)));
}
