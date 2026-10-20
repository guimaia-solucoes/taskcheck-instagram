/**
 * Banner do canal do YouTube — Taskcheck
 *
 * Gera um PNG 2560x1440 (tamanho recomendado pelo YouTube).
 * Tudo o que é essencial fica na área segura central de 1546x423 px,
 * a única visível em todos os dispositivos. A faixa de 2560x423 aparece
 * no computador; a imagem inteira só aparece na TV.
 *
 * Uso:
 *   node banner-youtube.mjs          gera o PNG
 *   node banner-youtube.mjs --guias  gera também uma versão com as áreas marcadas
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, '..');
const SAIDA = path.join(RAIZ, 'saida-youtube');
const TMP = path.join(__dirname, 'tmp');
const PRINTS = path.resolve(RAIZ, '..', 'Site', 'assets', 'img', 'app');
const LOGO = path.resolve(RAIZ, '..', 'Site', 'assets', 'img', 'logo.svg');

const W = 2560;
const H = 1440;
// área segura (todos os dispositivos) e faixa do computador
const SEG = { x: (W - 1546) / 2, y: (H - 423) / 2, w: 1546, h: 423 };

const print = (nome) => `data:image/jpeg;base64,${fs.readFileSync(path.join(PRINTS, `${nome}.jpeg`)).toString('base64')}`;
const logoBranco = `data:image/svg+xml;base64,${Buffer.from(fs.readFileSync(LOGO, 'utf8').replaceAll('#0f918f', '#ffffff')).toString('base64')}`;

const CHECK = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const recursos = [
  'Ordem de Serviço digital',
  'Técnicos no mapa em tempo real',
  'Checklists, fotos e assinatura',
  'Funciona mesmo sem internet',
];

const avisos = [
  ['JS', 'João iniciou o percurso', 'agora mesmo', 'a'],
  ['OS', 'OS #1248 — Check-in realizado', 'há 1 min · localização registrada', 'b'],
  ['MO', 'Cliente assinou a OS', 'Empresa ABC · 11:20', 'c'],
];

function html(guias) {
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{font-family:"Inter","Segoe UI",Arial,sans-serif;-webkit-font-smoothing:antialiased;background:#080d1a;color:#fff}
.c{position:relative;width:${W}px;height:${H}px;overflow:hidden}

/* fundo */
.mesh i{position:absolute;display:block;border-radius:50%;filter:blur(160px)}
.mesh .a{width:1300px;height:1100px;right:-200px;top:60px;background:#0f918f;opacity:.42}
.mesh .b{width:1200px;height:1000px;left:-300px;top:300px;background:#123f4d;opacity:.75}
.mesh .d{width:700px;height:500px;left:900px;top:420px;background:#2bbfa5;opacity:.12}
.grid{position:absolute;inset:0;opacity:.10;
  background-image:linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px);
  background-size:96px 96px;mask-image:radial-gradient(ellipse at 50% 50%,#000 0%,transparent 70%)}

/* área segura */
.seg{position:absolute;left:${SEG.x}px;top:${SEG.y}px;width:${SEG.w}px;height:${SEG.h}px;
  display:flex;align-items:center;justify-content:space-between;gap:60px;z-index:3}
.esq{display:flex;flex-direction:column;justify-content:center}
.pill{align-self:flex-start;display:inline-flex;align-items:center;gap:14px;padding:9px 20px 9px 16px;border-radius:999px;
  background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.16);
  font-size:18px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#8fe3d1}
.pill .dot{width:11px;height:11px;border-radius:50%;background:#5fd3bd;box-shadow:0 0 0 6px rgba(95,211,189,.2)}
h1{margin-top:20px;font-size:68px;line-height:1.02;letter-spacing:-.04em;font-weight:850}
h1 .g{background:linear-gradient(100deg,#5fd3bd 0%,#2bbfa5 50%,#8fe3d1 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{margin-top:16px;font-size:29px;line-height:1.35;color:#b8c3d9;font-weight:450}
.marca{margin-top:24px;display:flex;align-items:center;gap:26px}
.marca img{height:42px;width:auto}
.marca .sep{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.35)}
.marca span{font-size:28px;font-weight:650;color:#dfe6f2;letter-spacing:-.01em}

.dir{flex:0 0 520px;display:flex;flex-direction:column;gap:12px}
.rec{display:flex;align-items:center;gap:18px;padding:13px 22px;border-radius:18px;
  background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.12);font-size:25px;white-space:nowrap;font-weight:650;color:#eef2f8}
.rec .ck{width:40px;height:40px;border-radius:12px;flex:none;display:grid;place-items:center;
  background:linear-gradient(135deg,#0f918f,#0a6566);color:#fff}
.rec .ck svg{width:24px;height:24px}

/* telas do app (fora da área segura: aparecem no computador e na TV) */
.phone{position:absolute;border-radius:58px;background:#0b1220;padding:14px;z-index:2;
  box-shadow:0 60px 120px rgba(0,0,0,.55),0 0 0 2px rgba(255,255,255,.08)}
.phone img{display:block;width:100%;border-radius:45px}
.phone::after{content:"";position:absolute;top:28px;left:50%;transform:translateX(-50%);width:34%;height:28px;border-radius:16px;background:#0b1220}
.p1{width:340px;left:2190px;top:330px;transform:rotate(6deg)}
.p2{width:300px;left:2085px;top:690px;transform:rotate(-5deg);z-index:1;opacity:.92}

/* avisos ao vivo à esquerda */
.avisos{position:absolute;left:90px;top:${SEG.y + 24}px;width:390px;display:flex;flex-direction:column;gap:18px;z-index:2}
.av{display:flex;align-items:center;gap:16px;padding:18px 20px;border-radius:22px;
  background:rgba(255,255,255,.95);color:#080d1a;box-shadow:0 30px 60px rgba(0,0,0,.35)}
.av:nth-child(2){margin-left:50px}
.av .ic{width:52px;height:52px;border-radius:50%;flex:none;display:grid;place-items:center;font-size:18px;font-weight:800;color:#fff}
.av .ic.a{background:linear-gradient(135deg,#ff9a62,#f2622a)}
.av .ic.b{background:linear-gradient(135deg,#2ba8a4,#0c7b79)}
.av .ic.c{background:linear-gradient(135deg,#a084ff,#6d3ee0)}
.av b{display:block;font-size:21px;font-weight:750;line-height:1.25}
.av small{display:block;font-size:17px;color:#5b6479;margin-top:3px}
.vivo{display:inline-flex;align-items:center;gap:10px;font-size:18px;font-weight:800;letter-spacing:.12em;color:#8fe3d1;text-transform:uppercase}
.vivo i{width:12px;height:12px;border-radius:50%;background:#12b76a;box-shadow:0 0 0 6px rgba(18,183,106,.25)}

${guias ? `.g1,.g2{position:absolute;z-index:9;pointer-events:none}
.g1{left:0;right:0;top:${SEG.y}px;height:${SEG.h}px;border-top:4px dashed #ffd400;border-bottom:4px dashed #ffd400}
.g2{left:${SEG.x}px;top:${SEG.y}px;width:${SEG.w}px;height:${SEG.h}px;border:4px solid #ff3b3b}` : ''}
</style></head><body>
<div class="c">
  <div class="mesh"><i class="a"></i><i class="b"></i><i class="d"></i></div>
  <div class="grid"></div>

  <div class="avisos">
    <span class="vivo"><i></i>Ao vivo</span>
    ${avisos.map(([ini, t, s, cor]) => `<div class="av"><span class="ic ${cor}">${ini}</span><span><b>${t}</b><small>${s}</small></span></div>`).join('')}
  </div>

  <div class="phone p2"><img src="${print('app-atividades-da-os')}"></div>
  <div class="phone p1"><img src="${print('app-mapa-oss')}"></div>

  <div class="seg">
    <div class="esq">
      <span class="pill"><span class="dot"></span>Gestão de serviços em campo</span>
      <h1>Sua operação em campo<br><span class="g">sob controle. Em tempo real.</span></h1>
      <p class="sub">Ordens de Serviço, agenda, mapa e financeiro em um só lugar.</p>
      <div class="marca"><img src="${logoBranco}" alt="TaskCheck"><i class="sep"></i><span>taskcheck.app</span></div>
    </div>
    <div class="dir">
      ${recursos.map((r) => `<div class="rec"><span class="ck">${CHECK}</span>${r}</div>`).join('')}
    </div>
  </div>
  ${guias ? '<div class="g1"></div><div class="g2"></div>' : ''}
</div>
</body></html>`;
}

function acharChrome() {
  const op = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  ];
  const c = op.find((p) => fs.existsSync(p));
  if (!c) throw new Error('Chrome/Edge não encontrado');
  return c;
}

function capturar(chrome, arquivoHtml, arquivoPng) {
  execFileSync(chrome, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-sandbox',
    '--force-device-scale-factor=1', '--disable-lcd-text', '--font-render-hinting=none',
    `--window-size=${W},${H}`, '--virtual-time-budget=8000',
    `--screenshot=${arquivoPng}`, `file:///${arquivoHtml.replace(/\\/g, '/')}`,
  ], { stdio: 'pipe', timeout: 90000 });
}

fs.mkdirSync(SAIDA, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });
const chrome = acharChrome();
const versoes = [['banner-youtube-2560x1440', false]];
if (process.argv.includes('--guias')) versoes.push(['banner-youtube-guias', true]);
for (const [nome, guias] of versoes) {
  const fHtml = path.join(TMP, `${nome}.html`);
  const fPng = path.join(SAIDA, `${nome}.png`);
  fs.writeFileSync(fHtml, html(guias));
  capturar(chrome, fHtml, fPng);
  console.log(`${nome}.png  ${(fs.statSync(fPng).size / 1024 / 1024).toFixed(2)} MB`);
}
