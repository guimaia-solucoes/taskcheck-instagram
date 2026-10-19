/**
 * Gerador de artes de anúncio — Taskcheck
 *
 * Produz a mesma peça em três proporções, uma para cada grupo de posições
 * do Gerenciador de Anúncios da Meta:
 *
 *   1080x1920 (9:16)  Stories e Reels
 *   1080x1350 (4:5)   Feed do Instagram e do Facebook
 *   1080x1080 (1:1)   demais posições
 *
 * Só o formato 9:16 tem área segura (topo 250 px e rodapé 340 px), porque
 * é o único em que o Instagram sobrepõe o perfil e o botão de call to action.
 *
 * Uso:
 *   node story.mjs               gera os três formatos
 *   node story.mjs 9x16          gera apenas o formato informado
 *   node story.mjs --guias       gera também as versões com as guias de área segura
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, '..');
const SAIDA = path.join(RAIZ, 'saida-stories');
const TMP = path.join(__dirname, 'tmp');
const MOCKUPS = path.join(RAIZ, 'mockups');
const LOGO = path.resolve(RAIZ, '..', 'Site', 'assets', 'img', 'logo.svg');

// ─────────────────────────── formatos ───────────────────────────

const FORMATOS = {
  '9x16': {
    rotulo: 'Stories e Reels',
    w: 1080, h: 1920, safeTopo: 250, safeRodape: 340,
    padX: 84, padTopo: 14, padBase: 0,
    pill: 22, h1: 61, chip: 24, chipPad: '16px 18px', riscos: 6,
    fecho: 38, marca: 27, logo: 40,
    note: { largura: 920, direita: -92 }, cel: { largura: 300, sobrep: 62, base: -6 },
  },
  '4x5': {
    rotulo: 'Feed do Instagram e Facebook',
    w: 1080, h: 1350, safeTopo: 0, safeRodape: 0,
    padX: 72, padTopo: 72, padBase: 64,
    pill: 21, h1: 53, chip: 22, chipPad: '14px 16px', riscos: 6,
    fecho: 33, marca: 24, logo: 36,
    note: { largura: 900, direita: -80 }, cel: { largura: 330, sobrep: 62, base: 0 },
  },
  '1x1': {
    rotulo: 'Demais posições',
    w: 1080, h: 1080, safeTopo: 0, safeRodape: 0,
    padX: 64, padTopo: 58, padBase: 54,
    pill: 20, h1: 44, chip: 20, chipPad: '12px 14px', riscos: 6,
    fecho: 29, marca: 22, logo: 33,
    note: { largura: 700, direita: 40 }, cel: { largura: 268, sobrep: 20, base: 0 },
  },
};

// ─────────────────────────── assets ───────────────────────────

const uriPng = (arquivo) =>
  `data:image/png;base64,${fs.readFileSync(path.join(MOCKUPS, arquivo)).toString('base64')}`;

const logoBranca = `data:image/svg+xml;base64,${Buffer.from(
  fs.readFileSync(LOGO, 'utf8').replaceAll('#0f918f', '#ffffff'), 'utf8').toString('base64')}`;

const CROSS = `<svg viewBox="0 0 24 24" fill="none"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/></svg>`;
const CHECK = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ─────────────────────────── conteúdo ───────────────────────────

const arte = {
  arquivo: 'anuncio-whatsapp-vs-taskcheck',
  etiqueta: 'Gestão de equipes em campo',
  // <b> destaca em teal, <r> destaca em vermelho
  titulo: 'Se você gerencia <b>+3 técnicos</b>, precisa parar de depender do <r>WhatsApp</r>.',
  // os primeiros da lista são os que sobrevivem nos formatos menores
  riscos: [
    'Informação desatualizada',
    'Demora no retorno',
    'Grupos infinitos',
    'Documento que ninguém acha',
    'Foto que some na conversa',
    'Autorização sem registro',
  ],
  fecho: 'Conexão do campo e a gestão em <b>tempo real</b>, padronizada e segura.',
};

const destaca = (s) => esc(s)
  .replace(/&lt;b&gt;/g, '<b>').replace(/&lt;\/b&gt;/g, '</b>')
  .replace(/&lt;r&gt;/g, '<i>').replace(/&lt;\/r&gt;/g, '</i>');

// ─────────────────────────── CSS ───────────────────────────

// Bordas transparentes medidas nos PNGs (script scratchpad/medir.mjs):
//   notebook-dashboard.png  aparelho de 5,02% a 93,64% da largura
//   celular-os.png          aparelho de 21,48% a 79,33% da largura
const BORDA_NOTE = 0.0502;
const BORDA_CEL = 0.7933;

// Alinha o celular para que ele se sobreponha à base do notebook.
// 'direita' é o valor de CSS right: negativo faz o notebook sangrar para fora.
function celEsquerda(f) {
  const larguraUtil = f.w - f.padX * 2;
  const noteEsq = larguraUtil - f.note.largura - f.note.direita;
  const baseNotebook = noteEsq + BORDA_NOTE * f.note.largura;
  return Math.round(baseNotebook + f.cel.sobrep - BORDA_CEL * f.cel.largura);
}

const css = (f) => `
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${f.w}px;height:${f.h}px;overflow:hidden}
body{font-family:"Inter","Segoe UI",Arial,sans-serif;-webkit-font-smoothing:antialiased}

.canvas{position:relative;width:${f.w}px;height:${f.h}px;overflow:hidden;background:#080d1a;color:#fff}

.mesh{position:absolute;inset:0;z-index:0}
.mesh i{position:absolute;display:block;border-radius:50%;filter:blur(120px)}
.mesh i.a{width:900px;height:900px;right:-320px;top:-220px;background:#0f918f;opacity:.34}
.mesh i.b{width:760px;height:760px;left:-300px;top:${Math.round(f.h * 0.43)}px;background:#123f4d;opacity:.60}
.mesh i.c{width:640px;height:640px;right:-200px;bottom:-180px;background:#0f918f;opacity:.22}
.grid{position:absolute;inset:0;z-index:0;opacity:.14;
  background-image:linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px);
  background-size:96px 96px;
  mask-image:radial-gradient(circle at 74% 16%,#000 0%,transparent 70%)}

/* área útil: no 9:16 fica entre as zonas seguras */
.palco{position:absolute;z-index:2;left:0;right:0;top:${f.safeTopo}px;bottom:${f.safeRodape}px;
  padding:${f.padTopo}px ${f.padX}px ${f.padBase}px;display:flex;flex-direction:column}

.pill{display:inline-flex;align-items:center;gap:12px;align-self:flex-start;
  padding:12px 26px 12px 20px;border-radius:999px;background:rgba(43,191,165,.16);color:#8fe3d1;
  font-size:${f.pill}px;font-weight:800;letter-spacing:.09em;text-transform:uppercase}
.pill::before{content:"";width:11px;height:11px;border-radius:50%;background:#2bbfa5}

h1{font-size:${f.h1}px;line-height:1.08;letter-spacing:-.032em;font-weight:800;margin-top:26px}
h1 b{color:#5fd3bd}
h1 i{font-style:normal;color:#ff7a7d}

.riscos{display:grid;grid-template-columns:1fr 1fr;gap:13px 15px;margin-top:30px}
.risco{display:flex;align-items:center;gap:13px;background:rgba(229,72,77,.13);
  border:2px solid rgba(229,72,77,.28);border-radius:18px;padding:${f.chipPad};
  font-size:${f.chip}px;line-height:1.2;font-weight:700;color:#f5b4b6;white-space:nowrap}
.risco .ic{flex:0 0 auto;width:29px;height:29px;border-radius:9px;background:#e5484d;color:#fff;
  display:flex;align-items:center;justify-content:center}
.risco .ic svg{width:19px;height:19px}

.palco-mock{position:relative;flex:1;min-height:0;margin-top:24px}
.palco-mock .note{position:absolute;right:${f.note.direita}px;top:0;width:${f.note.largura}px;
  filter:drop-shadow(0 40px 70px rgba(0,0,0,.55))}
.palco-mock .cel{position:absolute;left:${celEsquerda(f)}px;bottom:${f.cel.base}px;width:${f.cel.largura}px;
  filter:drop-shadow(0 30px 60px rgba(0,0,0,.65))}
.palco-mock img{display:block;width:100%}

.fecho{display:flex;gap:18px;align-items:flex-start;margin-top:16px}
.fecho .ic{flex:0 0 auto;width:${Math.round(f.fecho * 1.2)}px;height:${Math.round(f.fecho * 1.2)}px;
  border-radius:14px;background:#2bbfa5;color:#052427;
  display:flex;align-items:center;justify-content:center;margin-top:2px}
.fecho .ic svg{width:${Math.round(f.fecho * 0.74)}px;height:${Math.round(f.fecho * 0.74)}px}
.fecho p{font-size:${f.fecho}px;line-height:1.26;font-weight:700;letter-spacing:-.02em}
.fecho b{color:#5fd3bd}

.marca{display:flex;align-items:center;gap:18px;margin-top:24px;padding-top:22px;
  border-top:2px solid rgba(255,255,255,.16)}
.marca img{height:${f.logo}px}
.marca .sep{width:8px;height:8px;border-radius:50%;background:#5b6479}
.marca span{font-size:${f.marca}px;font-weight:700;color:#98a0b2}

.guia{position:absolute;left:0;right:0;z-index:9;background:rgba(255,0,0,.18);
  border-top:2px dashed rgba(255,80,80,.9);border-bottom:2px dashed rgba(255,80,80,.9);
  color:#fff;font-size:24px;font-weight:800;display:flex;align-items:center;justify-content:center;
  letter-spacing:.08em;text-transform:uppercase}
.guia.topo{top:0;height:${f.safeTopo}px}
.guia.rodape{bottom:0;height:${f.safeRodape}px}
`;

// ─────────────────────────── página ───────────────────────────

function html(a, f, guias) {
  const riscos = a.riscos.slice(0, f.riscos);
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>${css(f)}</style></head>
<body><div class="canvas">
  <div class="mesh"><i class="a"></i><i class="b"></i><i class="c"></i></div>
  <div class="grid"></div>

  <div class="palco">
    <span class="pill">${esc(a.etiqueta)}</span>
    <h1>${destaca(a.titulo)}</h1>

    <div class="riscos">${riscos.map((r) => `
      <div class="risco"><span class="ic">${CROSS}</span><span>${esc(r)}</span></div>`).join('')}
    </div>

    <div class="palco-mock">
      <div class="note"><img src="${uriPng('notebook-dashboard.png')}" alt=""></div>
      <div class="cel"><img src="${uriPng('celular-os.png')}" alt=""></div>
    </div>

    <div class="fecho">
      <span class="ic">${CHECK}</span>
      <p>${destaca(a.fecho)}</p>
    </div>

    <div class="marca">
      <img src="${logoBranca}" alt="Taskcheck">
      <span class="sep"></span><span>taskcheck.app</span>
    </div>
  </div>

  ${guias && f.safeTopo ? `<div class="guia topo">área segura · topo ${f.safeTopo} px</div>
  <div class="guia rodape">área segura · rodapé ${f.safeRodape} px</div>` : ''}
</div></body></html>`;
}

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
    `--screenshot=${arquivoPng}`,
    `file:///${arquivoHtml.replace(/\\/g, '/')}`,
  ], { stdio: 'pipe', timeout: 90000 });
}

// ─────────────────────────── execução ───────────────────────────

fs.mkdirSync(SAIDA, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });
const chrome = acharChrome();

const args = process.argv.slice(2);
const comGuias = args.includes('--guias');
const pedidos = args.filter((a) => FORMATOS[a]);
const chaves = pedidos.length ? pedidos : Object.keys(FORMATOS);

for (const chave of chaves) {
  const f = FORMATOS[chave];
  const versoes = comGuias && f.safeTopo ? [['', false], ['-guias', true]] : [['', false]];
  for (const [sufixo, guias] of versoes) {
    const base = `${arte.arquivo}-${f.w}x${f.h}${sufixo}`;
    const fHtml = path.join(TMP, `${base}.html`);
    const fPng = path.join(SAIDA, `${base}.png`);
    fs.writeFileSync(fHtml, html(arte, f, guias), 'utf8');
    capturar(chrome, f, fHtml, fPng);
    console.log(`${f.w}x${f.h}${sufixo ? ' (guias)' : ''} — ${f.rotulo} — ${path.basename(fPng)}`);
  }
}
