/**
 * Gerador de anúncios — Taskcheck
 *
 * Três modelos de criativo, cada um em três proporções:
 *
 *   A  pergunta + grade de recursos + tela do app  (foco em segmento)
 *   B  manchete + plataforma completa               (institucional)
 *   C  caixa de alerta + celular                    (dor da operação)
 *
 *   1080x1920 (9:16)  Stories e Reels
 *   1080x1350 (4:5)   Feed do Instagram e do Facebook
 *   1080x1080 (1:1)   demais posições
 *
 * Uso:
 *   node anuncios.mjs              gera tudo
 *   node anuncios.mjs a            gera só o modelo A, nos três formatos
 *   node anuncios.mjs b 9x16       gera o modelo B só em 9:16
 *   node anuncios.mjs --guias      inclui as versões com guias de área segura
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, '..');
const SAIDA = path.join(RAIZ, 'saida-anuncios');
const TMP = path.join(__dirname, 'tmp');
const MOCKUPS = path.join(RAIZ, 'mockups');
const PRINTS = path.resolve(RAIZ, '..', 'Site', 'assets', 'img', 'app');
const LOGO = path.resolve(RAIZ, '..', 'Site', 'assets', 'img', 'logo.svg');

// ─────────────────────────── assets ───────────────────────────

const cache = new Map();
function midia(arquivo, base) {
  const chave = `${base}/${arquivo}`;
  if (cache.has(chave)) return cache.get(chave);
  const caminho = path.join(base, arquivo);
  const mime = arquivo.endsWith('.png') ? 'image/png' : 'image/jpeg';
  const uri = `data:${mime};base64,${fs.readFileSync(caminho).toString('base64')}`;
  cache.set(chave, uri);
  return uri;
}
const mock = (a) => midia(a, MOCKUPS);
const print = (a) => midia(`${a}.jpeg`, PRINTS);

const logoSvg = fs.readFileSync(LOGO, 'utf8');
const logoUri = (branca = true) => `data:image/svg+xml;base64,${Buffer.from(
  branca ? logoSvg.replaceAll('#0f918f', '#ffffff') : logoSvg, 'utf8').toString('base64')}`;

// Bordas transparentes medidas nos PNGs dos mockups.
const BORDA_NOTE = 0.0502;      // início do notebook na horizontal
const BORDA_NOTE_BASE = 0.9642; // base do notebook na vertical
const BORDA_CEL = 0.7933;       // fim do celular na horizontal
const BORDA_CEL_BASE = 0.9631;  // base do celular na vertical

// A foto do técnico é paisagem; ao preencher uma caixa mais alta ela é
// recortada na horizontal. Este cálculo posiciona o recorte para que o
// rosto caia na fração desejada da largura da arte, deixando o texto livre.
const FOTO_ASPECTO = 1400 / 933;  // proporção do arquivo
const FOTO_ROSTO_X = 0.48;        // onde está o rosto dentro do arquivo

function posFoto(caixaLargura, caixaAltura, alvo) {
  const visivel = Math.min(1, (caixaLargura / caixaAltura) / FOTO_ASPECTO);
  if (visivel >= 1) return 50;
  const inicio = FOTO_ROSTO_X - alvo * visivel;
  const pos = inicio / (1 - visivel);
  return Math.round(Math.min(1, Math.max(0, pos)) * 1000) / 10;
}

// ─────────────────────────── ícones ───────────────────────────

const ic = {
  rota: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.6" stroke="currentColor" stroke-width="1.9"/></svg>`,
  relogio: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="8" stroke="currentColor" stroke-width="1.9"/><path d="M12 9v4.3l2.8 1.7M9.5 2.5h5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  caixa: `<svg viewBox="0 0 24 24" fill="none"><path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M3.5 7.5 12 12m0 9v-9m8.5-4.5L12 12" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>`,
  lista: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2.5" stroke="currentColor" stroke-width="1.9"/><path d="M8 8.5l1.6 1.6L13 6.8M8 15.5l1.6 1.6L13 13.8M16 9.5h1M16 16.5h1" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  conversa: `<svg viewBox="0 0 24 24" fill="none"><path d="M20 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>`,
  planilha: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2.2" stroke="currentColor" stroke-width="1.9"/><path d="M3 9.5h18M9 9.5V20M15 9.5V20" stroke="currentColor" stroke-width="1.9"/></svg>`,
  telefone: `<svg viewBox="0 0 24 24" fill="none"><path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>`,
  repete: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 9a7 7 0 0 1 12-4.5M20 15a7 7 0 0 1-12 4.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M16 3v4h-4M8 21v-4h4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  pessoa: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.6" stroke="currentColor" stroke-width="1.9"/><path d="M4.5 20c1.6-3.6 4.3-5.4 7.5-5.4s5.9 1.8 7.5 5.4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  alerta: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3.8 21 19.5H3L12 3.8z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M12 9.5v4.2M12 16.6v.1" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  agenda: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2.4" stroke="currentColor" stroke-width="1.9"/><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M7.5 14h3M13.5 17.5h3" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  olho: `<svg viewBox="0 0 24 24" fill="none"><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><circle cx="12" cy="12" r="2.7" stroke="currentColor" stroke-width="1.9"/><path d="M4 20 20 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  seta: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h13M12.5 5.5 19 12l-6.5 6.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};
const X_PEQ = `<svg viewBox="0 0 24 24" fill="none"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"/></svg>`;

// ─────────────────────────── formatos ───────────────────────────

const FORMATOS = {
  '9x16': { rotulo: 'Stories e Reels', w: 1080, h: 1920, safeTopo: 250, safeRodape: 340, padX: 84, e: 1 },
  '4x5': { rotulo: 'Feed', w: 1080, h: 1350, safeTopo: 0, safeRodape: 0, padX: 72, e: 0.88 },
  '1x1': { rotulo: 'Demais posições', w: 1080, h: 1080, safeTopo: 0, safeRodape: 0, padX: 64, e: 0.78 },
};

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// <b> vira destaque na cor de acento do modelo
const marca = (s) => esc(s).replace(/&lt;b&gt;/g, '<b>').replace(/&lt;\/b&gt;/g, '</b>');

// ─────────────────────────── base de estilo ───────────────────────────

const baseCss = (f) => `
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${f.w}px;height:${f.h}px;overflow:hidden}
body{font-family:"Inter","Segoe UI",Arial,sans-serif;-webkit-font-smoothing:antialiased}
.canvas{position:relative;width:${f.w}px;height:${f.h}px;overflow:hidden;color:#fff}
.palco{position:absolute;z-index:3;left:0;right:0;top:${f.safeTopo}px;bottom:${f.safeRodape}px;
  padding:0 ${f.padX}px;display:flex;flex-direction:column}
.guia{position:absolute;left:0;right:0;z-index:9;background:rgba(255,0,0,.18);
  border-top:2px dashed rgba(255,80,80,.9);border-bottom:2px dashed rgba(255,80,80,.9);
  color:#fff;font-size:24px;font-weight:800;display:flex;align-items:center;justify-content:center;
  letter-spacing:.08em;text-transform:uppercase}
.guia.topo{top:0;height:${f.safeTopo}px}
.guia.rodape{bottom:0;height:${f.safeRodape}px}
`;

const guias = (f, ligado) => (ligado && f.safeTopo
  ? `<div class="guia topo">área segura · topo ${f.safeTopo} px</div>
     <div class="guia rodape">área segura · rodapé ${f.safeRodape} px</div>` : '');

const pagina = (f, css, corpo, comGuias) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>${baseCss(f)}${css}</style></head>
<body><div class="canvas">${corpo}${guias(f, comGuias)}</div></body></html>`;

// ═══════════════════════════ MODELO A ═══════════════════════════
// Pergunta de abertura, grade de recursos e tela do app com recorte em chevron.

const A = {
  chave: 'a-climatizacao',
  titulo: 'Você sabe quanto a sua empresa de <b>Climatização e Refrigeração</b> perdeu esse mês por <b>não ter controle da operação</b>?',
  cards: [
    { i: 'rota', t: '<b>Monitore a rota</b> dos técnicos' },
    { i: 'relogio', t: 'Acompanhe a OS<br><b>em tempo real</b>' },
    { i: 'caixa', t: 'Controle o <b>estoque</b> que está com o técnico' },
    { i: 'lista', t: '<b>Checklist PMOC</b> preenchido no app' },
  ],
  print: 'app-listagem-oss',
  fecho: 'Do chamado ao fechamento da OS. Tudo conectado.',

  css: (f) => {
    const p = (n) => Math.round(n * f.e);
    return `
.canvas{background:radial-gradient(120% 90% at 50% 0%,#12a7a2 0%,#0b6f70 42%,#064448 78%,#052f35 100%)}
.arcos{position:absolute;inset:0;z-index:1;overflow:hidden}
.arcos i{position:absolute;left:50%;top:${p(-260)}px;transform:translateX(-50%);
  border:2px solid rgba(255,255,255,.13);border-radius:50%}
.arcos i:nth-child(1){width:${p(1180)}px;height:${p(1180)}px}
.arcos i:nth-child(2){width:${p(1520)}px;height:${p(1520)}px;top:${p(-420)}px}
.arcos i:nth-child(3){width:${p(1880)}px;height:${p(1880)}px;top:${p(-600)}px}
.palco{padding-top:${p(24)}px;padding-bottom:${p(10)}px}

.logo{align-self:center;height:${p(78)}px;margin-bottom:${p(30)}px}
h1{text-align:center;font-size:${p(50)}px;line-height:1.24;font-weight:500;letter-spacing:-.02em}
h1 b{font-weight:800}

.cards{display:grid;grid-template-columns:1fr 1fr;gap:${p(18)}px;margin-top:${p(34)}px}
.card{display:flex;align-items:center;gap:${p(16)}px;background:rgba(255,255,255,.12);
  border:2px solid rgba(255,255,255,.16);border-radius:${p(22)}px;padding:${p(20)}px ${p(20)}px;
  font-size:${p(25)}px;line-height:1.25;font-weight:500}
.card b{font-weight:800}
.card .ico{flex:0 0 auto;width:${p(46)}px;height:${p(46)}px;color:#5fd3bd}
.card .ico svg{width:100%;height:100%}

.midia{position:relative;flex:1;min-height:0;margin-top:${p(28)}px;
  clip-path:polygon(0 ${p(72)}px,50% 0,100% ${p(72)}px,100% 100%,0 100%);
  background:linear-gradient(180deg,#04343a 0%,#021d22 70%,#01161a 100%);overflow:hidden}
.midia .cel{position:absolute;left:50%;transform:translateX(-50%);top:${p(88)}px;bottom:${p(-46)}px;
  filter:drop-shadow(0 ${p(24)}px ${p(48)}px rgba(0,0,0,.5))}
.midia .cel img{display:block;height:100%;width:auto}
.midia .veu{position:absolute;left:0;right:0;bottom:0;height:${p(190)}px;
  background:linear-gradient(180deg,rgba(4,38,43,0) 0%,rgba(4,38,43,.96) 68%)}
.midia .fecho{position:absolute;left:${p(30)}px;right:${p(30)}px;bottom:${p(28)}px;text-align:center;
  font-size:${p(28)}px;line-height:1.3;font-weight:800;letter-spacing:-.01em}
.rodape{text-align:center;margin-top:${p(18)}px;
  font-size:${p(24)}px;font-weight:700;color:rgba(255,255,255,.78)}
`;
  },

  corpo: (f) => {
    const p = (n) => Math.round(n * f.e);
    return `
  <div class="arcos"><i></i><i></i><i></i></div>
  <div class="palco">
    <img class="logo" src="${logoUri()}" alt="Taskcheck">
    <h1>${marca(A.titulo)}</h1>
    <div class="cards">${A.cards.map((c) => `
      <div class="card"><span class="ico">${ic[c.i]}</span><span>${marca(c.t).replace(/&lt;br&gt;/g, '<br>')}</span></div>`).join('')}
    </div>
    <div class="midia">
      <div class="cel"><img src="${mock('celular-os.png')}" alt=""></div>
      <div class="veu"></div>
      <div class="fecho">${esc(A.fecho)}</div>
    </div>
    <div class="rodape">taskcheck.app</div>
  </div>`.replace('${p}', p(0));
  },
};

// ═══════════════════════════ MODELO B ═══════════════════════════
// Manchete institucional em caixa alta e a plataforma inteira em mockup.

const B = {
  chave: 'b-plataforma',
  linha1: 'Toda a sua operação em campo.',
  linha2: 'Uma só plataforma.',
  sub: 'Do escritório ao campo, mantenha todo o fluxo da Ordem de Serviço conectado.',
  selo: 'Feito para empresas com <b>equipes técnicas externas</b>.',

  css: (f) => {
    const p = (n) => Math.round(n * f.e);
    const larguraUtil = f.w - f.padX * 2;
    // o notebook acompanha a largura útil de cada formato; no 9:16 ele sangra para fora
    const fator = f.h === 1920 ? 1.075 : f.h === 1350 ? 1.0 : 0.94;
    const noteW = Math.round(larguraUtil * fator);
    const celW = Math.round(noteW * 0.30);
    const noteEsq = larguraUtil - noteW;
    const celEsq = Math.round(noteEsq + noteW * 0.9364 - BORDA_CEL * celW + celW * 0.34);
    const noteH = noteW / 1.791;
    const celH = celW / 0.768;
    // a base do celular fica logo abaixo da base do notebook
    const celTopo = Math.round(noteH * BORDA_NOTE_BASE + p(26) - celH * BORDA_CEL_BASE);
    return `
.canvas{background:linear-gradient(160deg,#0d8f8d 0%,#0a6c72 46%,#064a52 100%)}
.trama{position:absolute;inset:0;z-index:1;opacity:.16;
  background-image:repeating-linear-gradient(115deg,rgba(255,255,255,.6) 0 2px,transparent 2px 84px)}
.brilho{position:absolute;z-index:1;width:${p(1000)}px;height:${p(1000)}px;right:${p(-320)}px;top:${p(-260)}px;
  border-radius:50%;background:#2bbfa5;opacity:.22;filter:blur(140px)}
.palco{padding-top:${p(30)}px;padding-bottom:${p(10)}px}

.h-cima{font-size:${p(48)}px;line-height:1.1;font-weight:600;letter-spacing:.01em;text-transform:uppercase;
  text-align:center;color:rgba(255,255,255,.94)}
.h-baixo{font-size:${p(66)}px;line-height:1.04;font-weight:900;letter-spacing:-.01em;text-transform:uppercase;
  text-align:center;margin-top:${p(6)}px}
.sub{text-align:center;font-size:${p(28)}px;line-height:1.4;font-weight:500;margin-top:${p(20)}px;
  color:rgba(255,255,255,.86)}

.mock{position:relative;flex:1;min-height:0;margin-top:${p(30)}px;display:flex;flex-direction:column}
.mock .grupo{position:relative;height:${Math.round(noteH)}px;margin:auto 0}
.mock .note{position:absolute;left:${noteEsq}px;top:0;width:${noteW}px;
  filter:drop-shadow(0 ${p(40)}px ${p(70)}px rgba(0,0,0,.45))}
.mock .cel{position:absolute;left:${celEsq}px;top:${celTopo}px;width:${celW}px;
  filter:drop-shadow(0 ${p(28)}px ${p(56)}px rgba(0,0,0,.55))}
.mock img{display:block;width:100%}

.rodape{display:flex;align-items:center;gap:${p(20)}px;margin-top:${p(18)}px;padding-top:${p(22)}px;
  border-top:2px solid rgba(255,255,255,.22)}
.rodape .selo{font-size:${p(25)}px;line-height:1.3;font-weight:500;color:rgba(255,255,255,.9)}
.rodape .selo b{font-weight:800}
.rodape .marca{margin-left:auto;display:flex;align-items:center;gap:${p(14)}px;text-align:right}
.rodape .marca img{height:${p(42)}px}
.rodape .marca span{font-size:${p(24)}px;font-weight:700;color:rgba(255,255,255,.8)}
`;
  },

  corpo: () => `
  <div class="trama"></div><div class="brilho"></div>
  <div class="palco">
    <div class="h-cima">${esc(B.linha1)}</div>
    <div class="h-baixo">${esc(B.linha2)}</div>
    <div class="sub">${esc(B.sub)}</div>
    <div class="mock"><div class="grupo">
      <div class="note"><img src="${mock('notebook-dashboard.png')}" alt=""></div>
      <div class="cel"><img src="${mock('celular-os.png')}" alt=""></div>
    </div></div>
    <div class="rodape">
      <span class="selo">${marca(B.selo)}</span>
      <span class="marca"><img src="${logoUri()}" alt="Taskcheck"><span>taskcheck.app</span></span>
    </div>
  </div>`,
};

// ═══════════════════════════ MODELO C ═══════════════════════════
// Alto contraste: bloco de cor em diagonal, foto do técnico em duotone
// (quando existir), caixa de alerta e celular em destaque.
//
// FOTO: coloque um arquivo em mockups/tecnico.jpg (ou .png) e ele entra
// automaticamente no bloco diagonal, tratado no duotone da marca.
// Sem o arquivo, o bloco fica só com a cor sólida.

const FOTO_TECNICO = ['tecnico.jpg', 'tecnico.jpeg', 'tecnico.png']
  .find((n) => fs.existsSync(path.join(MOCKUPS, n))) || null;

const C = {
  chave: 'c-caos-operacao',
  etiqueta: 'Gestão de equipes em campo',
  titulo: 'Quando sua equipe passa de <b>5 técnicos</b>, o improviso vira <b>prejuízo</b>.',
  alertaTitulo: 'O que acontece na operação hoje',
  dores: [
    { i: 'conversa', t: 'Informações perdidas' },
    { i: 'agenda', t: 'Agenda desorganizada' },
    { i: 'olho', t: 'Falta de visibilidade' },
    { i: 'repete', t: 'Retrabalho administrativo' },
    { i: 'relogio', t: 'Demora em responder o cliente' },
    { i: 'lista', t: 'OSs incompletas' },
  ],
  tagline: 'O Taskcheck conecta <b>campo</b> e <b>gestão</b> em tempo real.',
  botao: 'Ver o Taskcheck em ação',

  css: (f) => {
    const p = (n) => Math.round(n * f.e);
    const larguraUtil = f.w - f.padX * 2;
    const colTexto = Math.round(larguraUtil * (f.h === 1080 ? 0.62 : 0.74));
    const corte = f.h === 1080 ? ['46%', '18%'] : ['30%', '2%'];
    return `
.canvas{background:#04070f}

/* bloco de cor em diagonal ocupando o lado direito */
.diagonal{position:absolute;inset:0;z-index:1;
  clip-path:polygon(${corte[0]} 0,100% 0,100% 100%,${corte[1]} 100%);
  background:linear-gradient(158deg,#25dccd 0%,#12a7a2 42%,#0a6f75 100%)}
.foto{position:absolute;inset:0}
.foto img{width:100%;height:100%;object-fit:cover;object-position:${posFoto(f.w, f.h, 0.80)}% 50%;
  filter:grayscale(1) contrast(1.2) brightness(.92)}
.foto .duo{position:absolute;inset:0;background:linear-gradient(155deg,#19cabf,#075457);
  mix-blend-mode:color}
.foto .luz{position:absolute;inset:0;
  background:linear-gradient(155deg,rgba(43,191,165,.40),rgba(4,7,15,.18));mix-blend-mode:overlay}

/* escurece a esquerda para o texto ficar legível sobre qualquer imagem */
.veu{position:absolute;inset:0;z-index:2;
  background:linear-gradient(96deg,#04070f 0%,#04070f 26%,rgba(4,7,15,.93) 43%,rgba(4,7,15,.34) 62%,rgba(4,7,15,.12) 100%)}
.base{position:absolute;left:0;right:0;bottom:0;height:${p(380)}px;z-index:2;
  background:linear-gradient(180deg,rgba(4,7,15,0),rgba(4,7,15,.72))}

.palco{padding-top:${p(16)}px;padding-bottom:${p(10)}px}
.col{width:${colTexto}px}

.topo{display:flex;align-items:center;gap:${p(14)}px}
.topo img{height:${p(42)}px}
.topo span{font-size:${p(22)}px;font-weight:800;color:#5fd3bd;letter-spacing:.10em;text-transform:uppercase}

h1{font-size:${p(66)}px;line-height:1.05;font-weight:900;letter-spacing:-.035em;margin-top:${p(26)}px}
h1 b{color:#3ddcc4;position:relative;white-space:nowrap}
h1 b::after{content:"";position:absolute;left:0;right:0;bottom:${p(-6)}px;height:${p(7)}px;
  border-radius:${p(4)}px;background:#3ddcc4;opacity:.75}

.alerta{margin-top:${p(32)}px;border-radius:${p(24)}px;overflow:hidden;
  border:${p(3)}px solid #2bbfa5;background:rgba(4,7,15,.88)}
.alerta .cab{display:flex;align-items:center;gap:${p(13)}px;background:#2bbfa5;color:#04302c;
  padding:${p(15)}px ${p(22)}px;font-size:${p(25)}px;font-weight:900;letter-spacing:-.01em}
.alerta .cab .ico{width:${p(30)}px;height:${p(30)}px}
.alerta .cab .ico svg{width:100%;height:100%}
.alerta ul{list-style:none;padding:${p(2)}px ${p(22)}px ${p(8)}px}
.alerta li{display:flex;align-items:center;gap:${p(15)}px;padding:${p(11)}px 0;
  border-top:2px solid rgba(255,255,255,.12);font-size:${p(27)}px;line-height:1.2;font-weight:700;color:#fff}
.alerta li:first-child{border-top:0}
.alerta .quad{position:relative;flex:0 0 auto;width:${p(48)}px;height:${p(48)}px;border-radius:${p(14)}px;
  background:#101a2c;color:#fff;display:flex;align-items:center;justify-content:center}
.alerta .quad svg{width:${p(26)}px;height:${p(26)}px}
.alerta .quad .x{position:absolute;right:${p(-8)}px;bottom:${p(-8)}px;width:${p(26)}px;height:${p(26)}px;
  border-radius:50%;background:#ff3b3f;color:#fff;display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 0 ${p(3)}px #04070f}
.alerta .quad .x svg{width:${p(14)}px;height:${p(14)}px}

.selo{display:flex;align-items:center;gap:${p(16)}px;margin-top:${p(26)}px}
.selo .marca{flex:0 0 auto;background:#fff;border-radius:${p(14)}px;padding:${p(12)}px ${p(16)}px}
.selo .marca img{height:${p(30)}px;display:block}
.selo p{font-size:${p(29)}px;line-height:1.26;font-weight:800}
.selo b{color:#3ddcc4}

.botao{align-self:flex-start;display:flex;align-items:center;gap:${p(16)}px;margin-top:${p(24)}px;
  background:#2bbfa5;color:#04302c;border-radius:${p(16)}px;padding:${p(22)}px ${p(34)}px;
  font-size:${p(30)}px;font-weight:900;box-shadow:0 ${p(14)}px ${p(30)}px rgba(43,191,165,.35)}
.botao .s{width:${p(28)}px;height:${p(28)}px}
.botao .s svg{width:100%;height:100%}

.cel{position:absolute;z-index:4;right:${p(f.h === 1080 ? -46 : -74)}px;
  bottom:${f.h === 1920 ? f.safeRodape - p(56) : p(f.h === 1350 ? 34 : 40)}px;
  width:${p(f.h === 1080 ? 430 : 470)}px;
  filter:drop-shadow(0 ${p(34)}px ${p(64)}px rgba(0,0,0,.72))}
.cel img{display:block;width:100%}

.rodape{margin-top:auto;font-size:${p(24)}px;font-weight:800;color:rgba(255,255,255,.66)}
`;
  },

  corpo: () => `
  <div class="diagonal">${FOTO_TECNICO ? `<div class="foto">
      <img src="${mock(FOTO_TECNICO)}" alt="">
      <div class="duo"></div><div class="luz"></div>
    </div>` : ''}</div>
  <div class="veu"></div><div class="base"></div>
  <div class="cel"><img src="${mock('celular-os.png')}" alt=""></div>
  <div class="palco">
    <div class="topo"><img src="${logoUri()}" alt="Taskcheck"><span>${esc(C.etiqueta)}</span></div>
    <div class="col">
      <h1>${marca(C.titulo)}</h1>
      <div class="alerta">
        <div class="cab"><span class="ico">${ic.alerta}</span>${esc(C.alertaTitulo)}</div>
        <ul>${C.dores.map((d) => `
          <li><span class="quad">${ic[d.i]}<span class="x">${X_PEQ}</span></span><span>${esc(d.t)}</span></li>`).join('')}
        </ul>
      </div>
      <div class="selo">
        <span class="marca"><img src="${logoUri(false)}" alt="Taskcheck"></span>
        <p>${marca(C.tagline)}</p>
      </div>
      <div class="botao">${esc(C.botao)}<span class="s">${ic.seta}</span></div>
    </div>
    <div class="rodape">taskcheck.app</div>
  </div>`,
};

// ═══════════════════════════ MODELO C2 ═══════════════════════════
// Mesma mensagem do modelo C, em versão clara: faixa de foto no topo,
// cartão de alerta branco e fundo claro na base.

const C2 = {
  chave: 'c2-caos-claro',
  etiqueta: 'Gestão de equipes em campo',
  titulo: 'Quando sua equipe passa de <b>5 técnicos</b>, o improviso vira <b>prejuízo</b>.',
  alertaTitulo: 'O que acontece na operação hoje',
  dores: [
    { i: 'conversa', t: 'informação perdida no meio da conversa' },
    { i: 'repete', t: 'técnico indo 2x no mesmo serviço' },
    { i: 'pessoa', t: 'cliente cobrando sem resposta' },
  ],
  tagline: 'O Taskcheck centraliza <b>campo</b> e <b>gestão</b> em tempo real.',
  botao: 'Acessar o Taskcheck agora',

  css: (f) => {
    const p = (n) => Math.round(n * f.e);
    const larguraUtil = f.w - f.padX * 2;
    const colTexto = Math.round(larguraUtil * (f.h === 1080 ? 0.60 : 0.72));
    const fracaoFoto = f.h === 1920 ? 0.58 : f.h === 1350 ? 0.52 : 0.48;
    const alturaFoto = `${Math.round(fracaoFoto * 100)}%`;
    return `
.canvas{background:linear-gradient(180deg,#dcefed 0%,#eef7f6 40%,#ffffff 100%)}

/* faixa de foto no topo, tratada em duotone da marca */
.foto{position:absolute;left:0;right:0;top:0;height:${alturaFoto};z-index:1;overflow:hidden}
.foto img{width:100%;height:100%;object-fit:cover;object-position:${posFoto(f.w, f.h * fracaoFoto, 0.74)}% 40%;
  filter:grayscale(1) contrast(1.15) brightness(.92)}
.foto .duo{position:absolute;inset:0;background:linear-gradient(150deg,#17b8b0,#06393f);
  mix-blend-mode:color}
.foto .luz{position:absolute;inset:0;
  background:linear-gradient(150deg,rgba(43,191,165,.30),rgba(4,30,34,.30));mix-blend-mode:overlay}
/* escurece a esquerda e funde a base com o fundo claro */
.foto .veu{position:absolute;inset:0;
  background:linear-gradient(100deg,rgba(3,26,30,.94) 0%,rgba(3,26,30,.86) 38%,rgba(3,26,30,.38) 66%,rgba(3,26,30,.42) 100%)}
.foto .fim{position:absolute;left:0;right:0;bottom:0;height:${p(200)}px;
  background:linear-gradient(180deg,rgba(222,240,238,0),#e6f3f1 88%)}
.sem-foto{position:absolute;left:0;right:0;top:0;height:${alturaFoto};z-index:1;
  background:linear-gradient(150deg,#0f918f,#052f35)}

.palco{padding-top:${p(16)}px;padding-bottom:${p(10)}px}
.col{width:${colTexto}px;flex:1;display:flex;flex-direction:column;min-height:0}

.topo{display:flex;align-items:center;gap:${p(14)}px}
.topo img{height:${p(42)}px}
.topo span{font-size:${p(22)}px;font-weight:800;color:#8fe3d1;letter-spacing:.10em;text-transform:uppercase}

h1{font-size:${p(62)}px;line-height:1.12;font-weight:900;letter-spacing:-.03em;margin-top:${p(24)}px;color:#fff}
h1 b{color:#04302c;background:#2bbfa5;border-radius:${p(8)}px;padding:0 ${p(9)}px;margin-right:${p(-3)}px;
  box-decoration-break:clone;-webkit-box-decoration-break:clone}

.alerta{margin-top:${p(34)}px;border-radius:${p(24)}px;background:#fff;
  box-shadow:0 ${p(24)}px ${p(50)}px rgba(6,45,50,.20);overflow:hidden}
.alerta .cab{display:flex;align-items:center;gap:${p(13)}px;padding:${p(18)}px ${p(22)}px ${p(6)}px;
  font-size:${p(25)}px;font-weight:900;color:#0a4245;letter-spacing:-.01em}
.alerta .cab .ico{width:${p(30)}px;height:${p(30)}px;color:#0f918f}
.alerta .cab .ico svg{width:100%;height:100%}
.alerta ul{list-style:none;padding:0 ${p(22)}px ${p(12)}px}
.alerta li{display:flex;align-items:center;gap:${p(16)}px;padding:${p(15)}px 0;
  border-top:2px solid #e6eef0;font-size:${p(27)}px;line-height:1.22;font-weight:700;color:#123033}
.alerta li:first-child{border-top:0}
.alerta .quad{position:relative;flex:0 0 auto;width:${p(52)}px;height:${p(52)}px;border-radius:${p(15)}px;
  background:#e9f6f5;color:#0a6566;display:flex;align-items:center;justify-content:center}
.alerta .quad svg{width:${p(28)}px;height:${p(28)}px}
.alerta .quad .x{position:absolute;right:${p(-8)}px;bottom:${p(-8)}px;width:${p(26)}px;height:${p(26)}px;
  border-radius:50%;background:#ff3b3f;color:#fff;display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 0 ${p(3)}px #fff}
.alerta .quad .x svg{width:${p(14)}px;height:${p(14)}px}

.selo{margin-top:${f.h === 1920 ? 'auto' : p(30) + 'px'};padding-top:${p(28)}px;font-size:${p(29)}px;line-height:1.26;font-weight:800;color:#0a2b2e}
.selo b{color:#0f918f}

.botao{align-self:flex-start;display:flex;align-items:center;gap:${p(16)}px;margin-top:${p(20)}px;
  background:#0f918f;color:#fff;border-radius:${p(16)}px;padding:${p(22)}px ${p(34)}px;
  font-size:${p(30)}px;font-weight:900;box-shadow:0 ${p(14)}px ${p(30)}px rgba(15,145,143,.34)}
.botao .s{width:${p(28)}px;height:${p(28)}px}
.botao .s svg{width:100%;height:100%}

.cel{position:absolute;z-index:4;right:${p(-66)}px;
  bottom:${f.safeRodape ? f.safeRodape - p(48) : p(-56)}px;
  width:${p(f.h === 1080 ? 340 : 500)}px;
  filter:drop-shadow(0 ${p(30)}px ${p(56)}px rgba(6,45,50,.42))}
.cel img{display:block;width:100%}

.rodape{margin-top:auto;font-size:${p(24)}px;font-weight:800;color:#5b7a7c}
`;
  },

  corpo: () => `
  ${FOTO_TECNICO ? `<div class="foto">
    <img src="${mock(FOTO_TECNICO)}" alt="">
    <div class="duo"></div><div class="luz"></div><div class="veu"></div><div class="fim"></div>
  </div>` : '<div class="sem-foto"></div>'}
  <div class="cel"><img src="${mock('celular-os.png')}" alt=""></div>
  <div class="palco">
    <div class="topo"><img src="${logoUri()}" alt="Taskcheck"><span>${esc(C2.etiqueta)}</span></div>
    <div class="col">
      <h1>${marca(C2.titulo)}</h1>
      <div class="alerta">
        <div class="cab"><span class="ico">${ic.alerta}</span>${esc(C2.alertaTitulo)}</div>
        <ul>${C2.dores.map((d) => `
          <li><span class="quad">${ic[d.i]}<span class="x">${X_PEQ}</span></span><span>${esc(d.t)}</span></li>`).join('')}
        </ul>
      </div>
      <div class="selo">${marca(C2.tagline)}</div>
      <div class="botao">${esc(C2.botao)}<span class="s">${ic.seta}</span></div>
    </div>
    <div class="rodape">taskcheck.app</div>
  </div>`,
};

// ═══════════════════════════ MODELO D ═══════════════════════════
// Fundo claro, painel escuro no topo à esquerda com a manchete, foto do
// técnico ao fundo, cartão branco de alerta, ícones tachados ligando ao
// celular e botão de ação na base.

const D = {
  chave: 'd-whatsapp-planilhas',
  titulo: 'Se você gerencia <b>+5 técnicos</b>, <c>precisa parar</c> de depender do <b>WhatsApp e planilhas</b>.',
  alertaTitulo: 'Quando sua equipe passa de +5 técnicos, o caos começa:',
  dores: [
    { i: 'conversa', t: 'Ordens perdidas<br>no WhatsApp' },
    { i: 'repete', t: 'Técnico indo 2x<br>no mesmo local' },
    { i: 'pessoa', t: 'Cliente cobrando<br>sem resposta' },
  ],
  tachados: ['conversa', 'planilha', 'telefone'],
  tagline: 'O <b>Taskcheck</b> centraliza <b>campo</b> e <b>gestão</b> em tempo real.',
  botao: 'Acessar o Taskcheck agora',

  css: (f) => {
    const p = (n) => Math.round(n * f.e);
    const painelL = f.h === 1920 ? 0.66 : f.h === 1350 ? 0.64 : 0.60;
    const painelA = f.h === 1920 ? 0.56 : f.h === 1350 ? 0.50 : 0.46;
    const fotoA = f.h === 1920 ? 0.60 : f.h === 1350 ? 0.54 : 0.50;
    const cardL = f.h === 1920 ? 0.50 : f.h === 1350 ? 0.52 : 0.54;
    const colTexto = Math.round(f.w * painelL) - f.padX - p(46);
    const fotoEsq = Math.round(f.w * (painelL - 0.10));
    return `
.canvas{background:linear-gradient(180deg,#e8f7f6 0%,#dcf1f0 46%,#cfeceb 100%)}

/* foto do técnico ao fundo, na metade de cima */
.foto{position:absolute;left:${fotoEsq}px;right:0;top:0;height:${Math.round(fotoA * 100)}%;z-index:1;
  overflow:hidden;
  -webkit-mask-image:linear-gradient(90deg,transparent 0,#000 20%);
  mask-image:linear-gradient(90deg,transparent 0,#000 20%)}
.foto img{width:100%;height:100%;object-fit:cover;
  object-position:${posFoto(f.w - fotoEsq, f.h * fotoA, 0.62)}% 32%}
.foto .duo{position:absolute;inset:0;background:linear-gradient(150deg,#1cc4b8,#0a4a52);
  mix-blend-mode:color;opacity:.86}
.foto .fim{position:absolute;left:0;right:0;bottom:0;height:${p(230)}px;
  background:linear-gradient(180deg,rgba(232,247,246,0),#e2f3f2 92%)}
.sem-foto{position:absolute;left:${fotoEsq}px;right:0;top:0;height:${Math.round(fotoA * 100)}%;z-index:1;
  background:linear-gradient(150deg,#12a7a2,#075457)}

/* painel escuro que segura a manchete */
.painel{position:absolute;left:0;top:0;width:${Math.round(painelL * 100)}%;height:${Math.round(painelA * 100)}%;
  z-index:2;background:linear-gradient(158deg,#0d4a52 0%,#083840 58%,#05262c 100%);
  border-bottom-right-radius:${p(130)}px;box-shadow:0 ${p(30)}px ${p(60)}px rgba(5,38,44,.30)}

.palco{padding-top:${p(18)}px;padding-bottom:${p(10)}px}

.crachá{display:inline-flex;align-items:center;background:#eafaf8;border-radius:${p(22)}px;
  padding:${p(14)}px ${p(24)}px;align-self:flex-start}
.crachá img{height:${p(40)}px;display:block}

h1{width:${colTexto}px;font-size:${p(60)}px;line-height:1.16;font-weight:800;letter-spacing:-.03em;
  margin-top:${p(26)}px;color:#fff}
h1 b{color:#5fd3bd}
h1 c{color:#fff;background:rgba(43,191,165,.26);border-radius:${p(8)}px;padding:0 ${p(10)}px;
  margin-right:${p(-3)}px;box-decoration-break:clone;-webkit-box-decoration-break:clone}

/* cartão branco de alerta */
.alerta{width:${Math.round(f.w * cardL)}px;margin-top:${p(36)}px;background:#fff;border-radius:${p(26)}px;
  padding:${p(26)}px ${p(26)}px ${p(10)}px;box-shadow:0 ${p(26)}px ${p(52)}px rgba(6,58,64,.16)}
.alerta .cab{display:flex;gap:${p(16)}px;align-items:flex-start;
  font-size:${p(28)}px;line-height:1.25;font-weight:700;color:#123033}
.alerta .cab .ico{flex:0 0 auto;width:${p(40)}px;height:${p(40)}px;color:#0f918f;margin-top:${p(2)}px}
.alerta .cab .ico svg{width:100%;height:100%}
.alerta ul{list-style:none;margin-top:${p(16)}px}
.alerta li{display:flex;align-items:center;gap:${p(18)}px;padding:${p(16)}px 0;
  border-top:2px dashed #d5e6e6;font-size:${p(28)}px;line-height:1.24;font-weight:600;color:#123033}
.alerta li:first-child{border-top:0}
.alerta .quad{position:relative;flex:0 0 auto;width:${p(60)}px;height:${p(60)}px;border-radius:${p(16)}px;
  background:#e3f4f2;color:#0a5f61;display:flex;align-items:center;justify-content:center}
.alerta .quad svg{width:${p(32)}px;height:${p(32)}px}
.alerta .quad .x{position:absolute;right:${p(-9)}px;bottom:${p(-9)}px;width:${p(28)}px;height:${p(28)}px;
  border-radius:50%;background:#e5484d;color:#fff;display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 0 ${p(3)}px #fff}
.alerta .quad .x svg{width:${p(15)}px;height:${p(15)}px}

.tagline{margin-top:${p(30)}px;width:${Math.round(f.w * cardL) - p(44)}px;
  font-size:${p(32)}px;line-height:1.3;font-weight:700;color:#0b2f33}
.tagline b{color:#0f918f}

.botao{align-self:flex-start;display:flex;align-items:center;gap:${p(18)}px;margin-top:${p(22)}px;
  background:linear-gradient(120deg,#0f918f,#0a6c72);color:#fff;border-radius:${p(18)}px;
  padding:${p(24)}px ${p(36)}px;font-size:${p(32)}px;font-weight:800;
  box-shadow:0 ${p(16)}px ${p(32)}px rgba(10,108,114,.34)}
.botao .s{width:${p(30)}px;height:${p(30)}px}
.botao .s svg{width:100%;height:100%}

/* ícones tachados ligando ao celular */
.tachados{position:absolute;z-index:5;left:${Math.round(f.w * cardL) + f.padX - p(30)}px;
  bottom:${p(f.h === 1920 ? 470 : f.h === 1350 ? 226 : 196)}px;
  display:flex;flex-direction:column;gap:${p(34)}px}
.tachados .b{position:relative;width:${p(78)}px;height:${p(78)}px;border-radius:${p(22)}px;background:#fff;
  color:#0a5f61;display:flex;align-items:center;justify-content:center;
  box-shadow:0 ${p(14)}px ${p(28)}px rgba(6,58,64,.20)}
.tachados .b svg{width:${p(40)}px;height:${p(40)}px}
.tachados .b .x{position:absolute;right:${p(-10)}px;bottom:${p(-10)}px;width:${p(32)}px;height:${p(32)}px;
  border-radius:50%;background:#e5484d;color:#fff;display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 0 ${p(3)}px #eaf6f5}
.tachados .b .x svg{width:${p(17)}px;height:${p(17)}px}
.tachados .b::after{content:"";position:absolute;left:100%;top:50%;width:${p(70)}px;height:0;
  border-top:${p(3)}px dashed #8fc4c4}

/* celular */
.cel{position:absolute;z-index:4;right:${p(f.h === 1080 ? -52 : -96)}px;
  bottom:${f.h === 1920 ? f.safeRodape - p(150) : p(f.h === 1350 ? -70 : 18)}px;
  width:${p(f.h === 1080 ? 440 : 520)}px;
  filter:drop-shadow(0 ${p(34)}px ${p(64)}px rgba(6,58,64,.45))}
.cel img{display:block;width:100%}

.rodape{margin-top:auto;font-size:${p(25)}px;font-weight:800;color:#4d7274}
`;
  },

  corpo: () => `
  ${FOTO_TECNICO ? `<div class="foto">
    <img src="${mock(FOTO_TECNICO)}" alt="">
    <div class="duo"></div><div class="fim"></div>
  </div>` : '<div class="sem-foto"></div>'}
  <div class="painel"></div>
  <div class="cel"><img src="${mock('celular-os.png')}" alt=""></div>
  <div class="tachados">${D.tachados.map((n) => `
    <span class="b">${ic[n]}<span class="x">${X_PEQ}</span></span>`).join('')}
  </div>
  <div class="palco">
    <span class="crachá"><img src="${logoUri(false)}" alt="Taskcheck"></span>
    <h1>${marca(D.titulo).replace(/&lt;c&gt;/g, '<c>').replace(/&lt;\/c&gt;/g, '</c>')}</h1>
    <div class="alerta">
      <div class="cab"><span class="ico">${ic.alerta}</span><span>${esc(D.alertaTitulo)}</span></div>
      <ul>${D.dores.map((d) => `
        <li><span class="quad">${ic[d.i]}<span class="x">${X_PEQ}</span></span>
        <span>${esc(d.t).replace(/&lt;br&gt;/g, '<br>')}</span></li>`).join('')}
      </ul>
    </div>
    <div class="tagline">${marca(D.tagline)}</div>
    <div class="botao">${esc(D.botao)}<span class="s">${ic.seta}</span></div>
    <div class="rodape">taskcheck.app</div>
  </div>`,
};

const MODELOS = { a: A, b: B, c: C, c2: C2, d: D };

// ─────────────────────────── chrome ───────────────────────────

function acharChrome() {
  const candidatos = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  ];
  const achado = candidatos.find((c) => fs.existsSync(c));
  if (!achado) throw new Error('Chrome ou Edge não encontrado nos caminhos padrão.');
  return achado;
}

function capturar(chrome, f, arquivoHtml, arquivoPng) {
  execFileSync(chrome, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-sandbox',
    '--force-device-scale-factor=1', '--disable-lcd-text', '--font-render-hinting=none',
    `--window-size=${f.w},${f.h}`, '--virtual-time-budget=9000',
    `--screenshot=${arquivoPng}`, `file:///${arquivoHtml.replace(/\\/g, '/')}`,
  ], { stdio: 'pipe', timeout: 90000 });
}

// ─────────────────────────── execução ───────────────────────────

fs.mkdirSync(SAIDA, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });
const chrome = acharChrome();

const args = process.argv.slice(2);
const comGuias = args.includes('--guias');
const modelosPedidos = args.filter((a) => MODELOS[a]);
const formatosPedidos = args.filter((a) => FORMATOS[a]);
const modelos = modelosPedidos.length ? modelosPedidos : Object.keys(MODELOS);
const formatos = formatosPedidos.length ? formatosPedidos : Object.keys(FORMATOS);

for (const chaveModelo of modelos) {
  const m = MODELOS[chaveModelo];
  for (const chaveFormato of formatos) {
    const f = FORMATOS[chaveFormato];
    const versoes = comGuias && f.safeTopo ? [['', false], ['-guias', true]] : [['', false]];
    for (const [sufixo, g] of versoes) {
      const base = `${m.chave}-${f.w}x${f.h}${sufixo}`;
      const fHtml = path.join(TMP, `${base}.html`);
      const fPng = path.join(SAIDA, `${base}.png`);
      fs.writeFileSync(fHtml, pagina(f, m.css(f), m.corpo(f), g), 'utf8');
      capturar(chrome, f, fHtml, fPng);
      console.log(`${base}.png  (${f.rotulo})`);
    }
  }
}
