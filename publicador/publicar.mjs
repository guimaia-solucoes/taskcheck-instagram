/**
 * Publica no Instagram o próximo post vencido da agenda, via Instagram Graph API.
 *
 * Feito para rodar periodicamente (GitHub Actions a cada 30 min). A cada execução
 * publica no máximo um post: o mais antigo cujo horário já passou e que ainda não
 * está em publicados.json. Se uma execução falhar, a seguinte tenta de novo.
 *
 * Variáveis de ambiente:
 *   IG_USER_ID        ID da conta profissional do Instagram
 *   META_TOKEN        token de acesso (System User ou Página) com instagram_content_publish
 *   IMAGEM_BASE_URL   URL pública da pasta publicador/jpg (sem barra no final)
 *   GRAPH_VERSION     opcional, padrão v23.0
 *
 * Uso:
 *   node publicador/publicar.mjs                 publica o próximo post vencido
 *   node publicador/publicar.mjs --dry-run       mostra o que seria publicado
 *   node publicador/publicar.mjs --agora=2026-10-20T09:05:00-03:00 --dry-run
 *   node publicador/publicar.mjs --verificar     confere token e conta, sem publicar
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { posts, HASHTAGS } from '../gerador/posts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AGENDA = path.join(__dirname, 'agenda.json');
const PUBLICADOS = path.join(__dirname, 'publicados.json');
const JPG = path.join(__dirname, 'jpg');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const verificar = args.includes('--verificar');
const agoraArg = args.find((a) => a.startsWith('--agora='));
const agora = agoraArg ? new Date(agoraArg.slice(8)) : new Date();

const { IG_USER_ID, META_TOKEN, IMAGEM_BASE_URL } = process.env;
const GRAPH = `https://graph.facebook.com/${process.env.GRAPH_VERSION || 'v23.0'}`;

// ─────────────────────────── Graph API ───────────────────────────

async function graph(metodo, rota, params = {}) {
  const corpo = new URLSearchParams({ ...params, access_token: META_TOKEN });
  const url = metodo === 'GET' ? `${GRAPH}/${rota}?${corpo}` : `${GRAPH}/${rota}`;
  const resp = await fetch(url, metodo === 'GET' ? {} : { method: metodo, body: corpo });
  const json = await resp.json();
  if (!resp.ok || json.error) {
    const e = json.error || {};
    throw new Error(`Graph API ${rota}: ${e.message || resp.status} (code ${e.code}, subcode ${e.error_subcode})`);
  }
  return json;
}

const espera = (ms) => new Promise((r) => setTimeout(r, ms));

async function publicar(imageUrl, caption) {
  const { id: container } = await graph('POST', `${IG_USER_ID}/media`, { image_url: imageUrl, caption });

  // O Instagram processa a imagem de forma assíncrona; aguarda ficar pronta.
  for (let i = 0; i < 20; i++) {
    const { status_code } = await graph('GET', container, { fields: 'status_code' });
    if (status_code === 'FINISHED') break;
    if (status_code === 'ERROR' || status_code === 'EXPIRED') throw new Error(`Container ${container}: ${status_code}`);
    await espera(3000);
  }

  const { id: mediaId } = await graph('POST', `${IG_USER_ID}/media_publish`, { creation_id: container });
  // Já publicado: falha ao ler o link não pode impedir o registro (evita post duplicado).
  const permalink = await graph('GET', mediaId, { fields: 'permalink' }).then((r) => r.permalink, () => null);
  return { mediaId, permalink };
}

// ─────────────────────────── legenda ───────────────────────────

function legendaDe(p) {
  const texto = `${p.legenda.trim()}\n\n${HASHTAGS[p.tags]}`;
  const hashtags = texto.match(/#[\p{L}\p{N}_]+/gu) || [];
  if (texto.length > 2200) throw new Error(`Post ${p.n}: legenda com ${texto.length} caracteres (máx. 2200)`);
  if (hashtags.length > 30) throw new Error(`Post ${p.n}: ${hashtags.length} hashtags (máx. 30)`);
  return texto;
}

// ─────────────────────────── principal ───────────────────────────

function exigirAmbiente() {
  const faltando = ['IG_USER_ID', 'META_TOKEN', 'IMAGEM_BASE_URL'].filter((k) => !process.env[k]);
  if (faltando.length) {
    console.error(`Variáveis de ambiente ausentes: ${faltando.join(', ')}`);
    process.exit(1);
  }
}

async function main() {
  if (verificar) {
    exigirAmbiente();
    const conta = await graph('GET', IG_USER_ID, { fields: 'username,media_count' });
    const limite = await graph('GET', `${IG_USER_ID}/content_publishing_limit`, { fields: 'quota_usage,config' });
    console.log(`Conta @${conta.username} (${conta.media_count} posts). Uso nas últimas 24h:`, limite.data?.[0]);
    return;
  }

  const agenda = JSON.parse(fs.readFileSync(AGENDA, 'utf8'));
  const publicados = fs.existsSync(PUBLICADOS) ? JSON.parse(fs.readFileSync(PUBLICADOS, 'utf8')) : {};

  const vencidos = agenda
    .filter((a) => !publicados[a.n] && new Date(a.quando) <= agora)
    .sort((a, b) => new Date(a.quando) - new Date(b.quando));

  if (!vencidos.length) {
    const proximo = agenda.find((a) => !publicados[a.n]);
    console.log(proximo ? `Nada a publicar. Próximo: post ${proximo.n} em ${proximo.quando}` : 'Agenda concluída.');
    return;
  }
  if (vencidos.length > 1) console.log(`Atenção: ${vencidos.length} posts atrasados; publicando um por execução.`);

  const item = vencidos[0];
  const p = posts.find((x) => x.n === item.n);
  const arquivo = `${String(p.n).padStart(2, '0')}.jpg`;
  if (!fs.existsSync(path.join(JPG, arquivo))) throw new Error(`Imagem ausente: publicador/jpg/${arquivo}`);
  const caption = legendaDe(p);

  if (dryRun) {
    console.log(`[dry-run] Post ${p.n} (${item.quando}) — ${arquivo}, legenda com ${caption.length} caracteres:\n`);
    console.log(caption);
    return;
  }

  exigirAmbiente();
  const imageUrl = `${IMAGEM_BASE_URL}/${arquivo}`;
  console.log(`Publicando post ${p.n} (${item.quando}) — ${imageUrl}`);
  const { mediaId, permalink } = await publicar(imageUrl, caption);

  publicados[p.n] = { agendado: item.quando, publicado: new Date().toISOString(), mediaId, permalink };
  fs.writeFileSync(PUBLICADOS, JSON.stringify(publicados, null, 2) + '\n', 'utf8');
  console.log(`Publicado: ${permalink}`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
