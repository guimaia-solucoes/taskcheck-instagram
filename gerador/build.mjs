/**
 * Gerador de artes de feed do Instagram — Taskcheck
 *
 * Renderiza cada post como uma página HTML 1080x1350 e captura um PNG
 * usando o Chrome em modo headless.
 *
 * Uso:
 *   node build.mjs            gera todos os 60 posts
 *   node build.mjs 1 2 3      gera apenas os posts informados
 *   node build.mjs --html     gera apenas os HTMLs (sem screenshot)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { posts, HASHTAGS } from './posts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, '..');
const SAIDA = path.join(RAIZ, 'saida');
const TMP = path.join(__dirname, 'tmp');
const PRINTS = path.resolve(RAIZ, '..', 'Site', 'assets', 'img', 'app');
const LOGO = path.resolve(RAIZ, '..', 'Site', 'assets', 'img', 'logo.svg');

export const W = 1080;
export const H = 1350;

// ─────────────────────────── assets ───────────────────────────

const cacheImg = new Map();
function print(nome) {
  if (!nome) return null;
  if (cacheImg.has(nome)) return cacheImg.get(nome);
  const arquivo = path.join(PRINTS, `${nome}.jpeg`);
  const uri = `data:image/jpeg;base64,${fs.readFileSync(arquivo).toString('base64')}`;
  cacheImg.set(nome, uri);
  return uri;
}

const logoSvg = fs.readFileSync(LOGO, 'utf8');
const logoUri = (branco) => {
  const svg = branco ? logoSvg.replaceAll('#0f918f', '#ffffff') : logoSvg;
  return `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`;
};

const CHECK = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CROSS = `<svg viewBox="0 0 24 24" fill="none"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/></svg>`;
const ARROW = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h13M12.5 5.5L19 12l-6.5 6.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nl = (s = '') => esc(s).replace(/\n/g, '<br>');
export const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 46);

// ─────────────────────────── CSS ───────────────────────────

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{font-family:"Inter","Segoe UI",Arial,sans-serif;-webkit-font-smoothing:antialiased;font-feature-settings:"ss01","cv11"}

.canvas{position:relative;width:${W}px;height:${H}px;overflow:hidden;display:flex;flex-direction:column;
  padding:84px 84px 74px;background:#ffffff;color:#080d1a}
.canvas.dark{background:#080d1a;color:#ffffff}

/* fundo decorativo */
.mesh{position:absolute;inset:0;z-index:0;overflow:hidden}
.mesh i{position:absolute;display:block;border-radius:50%;filter:blur(80px);opacity:.55}
.mesh i.a{width:760px;height:760px;right:-260px;top:-300px;background:#c9e9e7}
.mesh i.b{width:620px;height:620px;left:-280px;bottom:-260px;background:#e9f6f5}
.dark .mesh i{opacity:.30;filter:blur(110px)}
.dark .mesh i.a{background:#0f918f}
.dark .mesh i.b{background:#123f4d;opacity:.55}
.grid-lines{position:absolute;inset:0;z-index:0;opacity:.5;
  background-image:linear-gradient(#eaeef6 1px,transparent 1px),linear-gradient(90deg,#eaeef6 1px,transparent 1px);
  background-size:90px 90px;mask-image:radial-gradient(circle at 70% 20%,#000 0%,transparent 72%)}
.dark .grid-lines{opacity:.16;background-image:linear-gradient(rgba(255,255,255,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.35) 1px,transparent 1px)}

.content{position:relative;z-index:2;flex:1;display:flex;flex-direction:column;min-height:0}

/* etiqueta superior */
.pill{display:inline-flex;align-items:center;gap:12px;align-self:flex-start;
  padding:13px 26px 13px 20px;border-radius:999px;background:#e9f6f5;color:#0a6566;
  font-size:23px;font-weight:800;letter-spacing:.09em;text-transform:uppercase}
.pill::before{content:"";width:12px;height:12px;border-radius:50%;background:#2bbfa5}
.dark .pill{background:rgba(43,191,165,.14);color:#8fe3d1}

h1{font-size:78px;line-height:1.02;letter-spacing:-.032em;font-weight:800;margin-top:34px}
h1 em{font-style:normal;color:#0f918f}
.dark h1 em{color:#5fd3bd}
.sub{font-size:33px;line-height:1.42;font-weight:500;color:#38415a;margin-top:26px;max-width:830px}
.dark .sub{color:#aeb5c5}

/* lista de benefícios */
.bullets{list-style:none;display:flex;flex-direction:column;gap:22px;margin-top:auto}
.bullets li{display:flex;gap:20px;align-items:flex-start;font-size:29px;line-height:1.32;font-weight:600;color:#1a2338}
.dark .bullets li{color:#eaeef6}
.bullets.centro{margin:auto 0}
.bullets .ic{flex:0 0 auto;width:44px;height:44px;border-radius:13px;background:#0f918f;color:#fff;
  display:flex;align-items:center;justify-content:center;margin-top:-2px}
.bullets .ic svg{width:26px;height:26px}
.dark .bullets .ic{background:#2bbfa5;color:#052427}

/* rodapé de marca */
.brand{position:relative;z-index:3;display:flex;align-items:center;gap:20px;padding-top:34px;margin-top:34px;
  border-top:2px solid #e6eaf3}
.dark .brand{border-color:rgba(255,255,255,.14)}
.bleed .brand{border-top:0;background-image:linear-gradient(90deg,#e6eaf3 0 56%,transparent 56%);background-size:100% 2px;background-repeat:no-repeat;background-position:left top}
.bleed.dark .brand{background-image:linear-gradient(90deg,rgba(255,255,255,.14) 0 56%,transparent 56%)}
.brand img{height:38px}
.brand .sep{width:8px;height:8px;border-radius:50%;background:#aeb5c5}
.brand span{font-size:25px;font-weight:700;color:#5b6479;letter-spacing:-.01em}
.dark .brand span{color:#828b9f}
.brand .cta{margin-left:auto;font-size:23px;font-weight:800;color:#0f918f;letter-spacing:.02em}
.dark .brand .cta{color:#5fd3bd}

/* celular */
.phone{position:relative;border-radius:44px;background:#0b1220;padding:11px;
  box-shadow:0 40px 90px rgba(9,16,34,.30),0 8px 24px rgba(9,16,34,.14)}
.phone img{display:block;width:100%;border-radius:34px}
.phone::after{content:"";position:absolute;top:22px;left:50%;transform:translateX(-50%);
  width:34%;height:22px;border-radius:14px;background:#0b1220}

/* linha texto + celular */
.row{display:flex;gap:48px;align-items:flex-end;flex:1;min-height:0;margin-top:44px}
.row .col{flex:1;display:flex;flex-direction:column;justify-content:center;min-width:0}
.row .col .bullets{margin-top:0}
.row .phone{flex:0 0 330px;width:330px;margin-bottom:-118px}

/* comparativo */
.vs{display:flex;flex-direction:column;gap:24px;margin-top:auto}
.panel{border-radius:30px;padding:34px 38px}
.panel h3{display:flex;align-items:center;gap:14px;font-size:25px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
.panel ul{list-style:none;margin-top:22px;display:flex;flex-direction:column;gap:15px}
.panel li{display:flex;gap:16px;align-items:flex-start;font-size:27px;line-height:1.3;font-weight:600}
.panel li .ic{flex:0 0 auto;width:32px;height:32px;margin-top:0}
.panel li .ic svg{width:32px;height:32px}
.panel.antes{background:#fdecec;color:#7a2a2c}
.panel.antes h3{color:#c0393d}
.panel.antes li{color:#8a3b3e}
.dark .panel.antes{background:rgba(229,72,77,.12);color:#f6b7b9}
.dark .panel.antes h3,.dark .panel.antes li{color:#f2a6a8}
.panel.depois{background:#0f918f;color:#fff}
.panel.depois h3{color:#8fe3d1}
.seta{align-self:center;width:56px;height:56px;border-radius:50%;background:#080d1a;color:#fff;
  display:flex;align-items:center;justify-content:center;transform:rotate(90deg);margin:-8px 0}
.seta svg{width:30px;height:30px}
.dark .seta{background:#fff;color:#080d1a}

/* pergunta */
.quote-mark{font-size:150px;line-height:.6;font-weight:900;color:#c9e9e7;margin-top:24px}
.dark .quote-mark{color:#0f918f}
.pergunta{font-size:76px;line-height:1.06;letter-spacing:-.03em;font-weight:800;margin-top:24px}
.contexto{font-size:31px;font-weight:600;color:#5b6479;margin-top:26px}
.dark .contexto{color:#aeb5c5}
.extras{display:flex;flex-direction:column;gap:16px;margin:auto 0}
.extra{align-self:flex-start;max-width:78%;background:#f5f7fc;border:2px solid #e6eaf3;
  border-radius:26px 26px 26px 8px;padding:20px 28px;font-size:28px;font-weight:600;color:#5b6479}
.extra:nth-child(even){align-self:flex-end;border-radius:26px 26px 8px 26px;background:#e9f6f5;
  border-color:#c9e9e7;color:#0a6566}
.dark .extra{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.12);color:#aeb5c5}
.resposta{margin-top:38px;background:#0f918f;color:#fff;border-radius:30px;padding:40px 44px;
  font-size:32px;line-height:1.38;font-weight:600}
.resposta b{font-weight:900;color:#8fe3d1}

/* número */
.numero{display:flex;align-items:baseline;gap:22px;margin-top:auto;white-space:nowrap}
.numero .n{line-height:.86;font-weight:900;letter-spacing:-.05em;color:#0f918f}
.dark .numero .n{color:#5fd3bd}
.numero .u{font-size:56px;font-weight:800;color:#828b9f;letter-spacing:-.02em}
.lead{font-size:38px;line-height:1.3;font-weight:700;letter-spacing:-.02em;margin-top:34px;max-width:840px;color:#1a2338}
.dark .lead{color:#fff}
.num-tit{font-size:52px;line-height:1.16;font-weight:800;letter-spacing:-.02em;margin-top:26px}

/* chips */
.chips{display:grid;grid-template-columns:1fr 1fr;gap:18px 20px;margin:auto 0 0}
.chip{display:flex;align-items:center;gap:16px;background:#f5f7fc;border:2px solid #e6eaf3;
  border-radius:20px;padding:22px 24px;font-size:27px;font-weight:700;color:#1a2338}
.dark .chip{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12);color:#fff}
.chip .ic{flex:0 0 auto;width:34px;height:34px;border-radius:10px;background:#2bbfa5;color:#053b35;
  display:flex;align-items:center;justify-content:center}
.chip .ic svg{width:22px;height:22px}
.rodape-nota{margin-top:34px;font-size:29px;font-weight:700;color:#0f918f}
.dark .rodape-nota{color:#5fd3bd}

/* jornada */
.timeline{margin:auto 0;display:flex;flex-direction:column;gap:0;position:relative}
.step{display:flex;gap:26px;align-items:flex-start;padding-bottom:26px;position:relative}
.step:last-child{padding-bottom:0}
.step .marker{flex:0 0 auto;width:52px;display:flex;flex-direction:column;align-items:center;align-self:stretch}
.step .dot{width:52px;height:52px;border-radius:50%;background:#0f918f;color:#fff;display:flex;
  align-items:center;justify-content:center;font-size:24px;font-weight:900;flex:0 0 auto}
.step .line{flex:1;width:4px;background:#c9e9e7;margin:8px 0 -26px}
.dark .step .line{background:rgba(43,191,165,.35)}
.step:last-child .line{display:none}
.step .txt strong{display:block;font-size:32px;font-weight:800;letter-spacing:-.01em;line-height:1.2}
.step .txt span{display:block;font-size:26px;font-weight:500;color:#5b6479;margin-top:6px}
.dark .step .txt span{color:#aeb5c5}

/* checklist mock */
.mock{margin:auto 0;background:#fff;border:2px solid #e6eaf3;border-radius:32px;padding:14px 34px;
  box-shadow:0 30px 70px rgba(9,16,34,.10)}
.mock .lin{display:flex;align-items:center;gap:20px;padding:26px 0;border-bottom:2px solid #f0f3f9}
.mock .lin:last-child{border-bottom:0}
.mock .lin.dep{padding-left:44px}
.mock .lin .q{flex:1;font-size:27px;font-weight:700;color:#1a2338;line-height:1.25}
.mock .lin.dep .q{color:#38415a;font-weight:600}
.mock .tagv{font-size:23px;font-weight:800;padding:11px 18px;border-radius:12px;white-space:nowrap}
.tagv.sim{background:#fff5e6;color:#b45f06}
.tagv.dep{background:#e9f6f5;color:#0a6566}
.tagv.foto{background:#f2ecff;color:#6b3fd4}
.tagv.ok{background:#e7f8ef;color:#0a7c47}
.mock .lin.dep::before{content:"";position:absolute;margin-left:-30px;width:16px;height:16px;
  border-left:3px solid #c9e9e7;border-bottom:3px solid #c9e9e7;border-radius:0 0 0 6px}

/* mito */
.mito-bloco{margin:auto 0 0;display:flex;flex-direction:column;gap:26px}
.mito-card{border-radius:30px;padding:34px 38px}
.mito-card .lab{font-size:24px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
.mito-card p{font-size:35px;line-height:1.26;font-weight:700;margin-top:16px}
.mito-card.m{background:#fdecec}
.mito-card.m .lab{color:#c0393d}
.mito-card.m p{color:#7a2a2c}
.mito-card.v{background:#0f918f;color:#fff}
.mito-card.v .lab{color:#8fe3d1}

/* dica */
.dica-n{font-size:150px;line-height:.8;font-weight:900;letter-spacing:-.05em;color:#c9e9e7;margin-top:18px}
.dark .dica-n{color:#0f918f}
.passos{list-style:none;margin:auto 0;display:flex;flex-direction:column;gap:20px;counter-reset:p}
.passos li{counter-increment:p;display:flex;gap:20px;align-items:flex-start;font-size:29px;line-height:1.3;
  font-weight:600;color:#1a2338}
.dark .passos li{color:#eaeef6}
.passos li::before{content:counter(p);flex:0 0 auto;width:46px;height:46px;border-radius:14px;
  background:#080d1a;color:#fff;display:flex;align-items:center;justify-content:center;
  font-size:24px;font-weight:900;margin-top:-2px}
.dark .passos li::before{background:#2bbfa5;color:#052427}

/* depoimento */
.dep-quote{font-size:64px;line-height:1.16;letter-spacing:-.03em;font-weight:800;margin-top:30px}
.dep-bloco{margin:auto 0;display:flex;flex-direction:column}
.dep-nota{margin-top:44px;font-size:23px;font-weight:600;color:#828b9f}
.dep-autor{margin-top:52px;display:flex;align-items:center;gap:22px}
.dep-autor .av{width:76px;height:76px;border-radius:50%;background:#0f918f;color:#fff;display:flex;
  align-items:center;justify-content:center}
.dep-autor .av svg{width:40px;height:40px}
.dep-autor b{display:block;font-size:30px;font-weight:800}
.dep-autor span{display:block;font-size:26px;font-weight:600;color:#5b6479;margin-top:4px}
.dark .dep-autor span{color:#aeb5c5}

/* print com destaques */
.print-wrap{flex:1;display:flex;flex-direction:row-reverse;gap:36px;align-items:flex-end;margin-top:40px;min-height:0}
.print-wrap .phone{flex:0 0 372px;width:372px;margin-bottom:-96px}
.callouts{flex:1;display:flex;flex-direction:column;gap:20px;justify-content:flex-end;padding-bottom:60px}
.callout{display:flex;align-items:center;gap:16px;background:#fff;border:2px solid #e6eaf3;border-radius:20px;
  padding:22px 26px;font-size:27px;font-weight:700;color:#1a2338;box-shadow:0 18px 44px rgba(9,16,34,.10)}
.dark .callout{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.14);color:#fff;box-shadow:none}
.callout .ic{flex:0 0 auto;width:34px;height:34px;border-radius:10px;background:#0f918f;color:#fff;
  display:flex;align-items:center;justify-content:center}
.callout .ic svg{width:22px;height:22px}

/* frase de impacto */
.frase{justify-content:center}
.frase h1{font-size:88px;line-height:1.04;margin-top:36px}
.frase .sub{font-size:35px;margin-top:32px}
.frase .marca{margin-top:38px;display:flex;align-items:center;gap:18px}
.marca-dagua{position:absolute;right:-90px;bottom:60px;width:520px;height:520px;z-index:1;color:#0f918f;opacity:.13}
.marca-dagua svg{width:100%;height:100%}
.dark .marca-dagua{opacity:.10;color:#5fd3bd}
.frase .marca .barra{width:96px;height:8px;border-radius:4px;background:#2bbfa5}

/* segmento */
.seg-badge{margin-top:auto;display:inline-flex;align-self:flex-start;align-items:center;gap:16px;
  background:#080d1a;color:#fff;border-radius:999px;padding:20px 34px;font-size:26px;font-weight:800}
.dark .seg-badge{background:#2bbfa5;color:#052427}

/* cta */
.cta-box{margin-top:44px;background:#0f918f;border-radius:32px;padding:44px 46px;color:#fff;
  display:flex;align-items:center;gap:30px}
.cta-box .cta-txt{display:flex;flex-direction:column;gap:8px}
.cta-box .tel{font-size:46px;font-weight:900;letter-spacing:-.02em}
.cta-box .lab{font-size:24px;font-weight:700;color:#8fe3d1;letter-spacing:.06em;text-transform:uppercase}
.cta-box .wa{margin-left:auto;width:76px;height:76px;border-radius:50%;background:#fff;color:#0f918f;
  display:flex;align-items:center;justify-content:center}
.cta-box .wa svg{width:38px;height:38px}

/* carrossel: contador de página e dica de arrastar */
.pagina{position:absolute;top:84px;right:84px;z-index:4;padding:13px 22px;border-radius:999px;
  border:2px solid #e6eaf3;background:#fff;font-size:23px;font-weight:800;color:#5b6479;letter-spacing:.04em}
.dark .pagina{border-color:rgba(255,255,255,.18);background:transparent;color:#aeb5c5}
.brand .arraste{margin-left:auto;display:flex;align-items:center;gap:12px;font-size:24px;font-weight:800;color:#0f918f}
.dark .brand .arraste{color:#5fd3bd}
.brand .arraste svg{width:30px;height:30px}
/* com celular sangrando no rodapé, a dica fica ao lado do logo para não passar por baixo do aparelho */
.bleed .brand .arraste{margin-left:40px}
`;

// ─────────────────────────── helpers de markup ───────────────────────────

const pill = (t) => (t ? `<span class="pill">${esc(t)}</span>` : '');
const bullets = (itens = [], cls = '') => `<ul class="bullets ${cls}">${itens
  .map((i) => `<li><span class="ic">${CHECK}</span><span>${esc(i)}</span></li>`).join('')}</ul>`;
const phone = (nome) => `<div class="phone"><img src="${print(nome)}" alt=""></div>`;

function brand(dark, arraste, bleed, cta = 'taskcheck.app') {
  // Com celular sangrando no rodapé não cabe site + dica de arrastar: fica só a dica.
  const site = arraste && bleed ? '' : `<span class="sep"></span><span>${esc(cta)}</span>`;
  return `<footer class="brand">
    <img src="${logoUri(dark)}" alt="Taskcheck">
    ${site}
    ${arraste ? `<span class="arraste">Arraste ${ARROW}</span>` : ''}
  </footer>`;
}

// ─────────────────────────── templates ───────────────────────────

const T = {
  feature(p) {
    const corpo = p.print
      ? `<div class="row"><div class="col">${bullets(p.itens)}</div>${phone(p.print)}</div>`
      : bullets(p.itens);
    return `${pill(p.tag)}<h1>${nl(p.titulo)}</h1><p class="sub">${nl(p.sub)}</p>${corpo}`;
  },

  vs(p) {
    return `${pill(p.tag)}<h1>${nl(p.titulo)}</h1>${p.sub ? `<p class="sub">${nl(p.sub)}</p>` : ''}
    <div class="vs">
      <div class="panel antes">
        <h3>${esc(p.antesTitulo)}</h3>
        <ul>${p.antes.map((i) => `<li><span class="ic">${CROSS}</span><span>${esc(i)}</span></li>`).join('')}</ul>
      </div>
      <div class="seta">${ARROW}</div>
      <div class="panel depois">
        <h3>${esc(p.depoisTitulo)}</h3>
        <ul>${p.depois.map((i) => `<li><span class="ic">${CHECK}</span><span>${esc(i)}</span></li>`).join('')}</ul>
      </div>
    </div>`;
  },

  frase(p) {
    return `<div class="frase" style="display:flex;flex-direction:column;flex:1">
      ${pill(p.tag)}<h1>${nl(p.titulo)}</h1><p class="sub">${nl(p.sub)}</p>
      <div class="marca"><span class="barra"></span></div>
    </div>`;
  },

  pergunta(p) {
    return `${pill(p.tag)}
    <div class="quote-mark">&ldquo;</div>
    <div class="pergunta">${nl(p.pergunta)}</div>
    <p class="contexto">${nl(p.contexto)}</p>
    ${p.extras ? `<div class="extras">${p.extras.map((e) => `<div class="extra">${esc(e)}</div>`).join('')}</div>` : ''}
    <div class="resposta">${nl(p.resposta)}</div>`;
  },

  numero(p) {
    return `${pill(p.tag)}${p.lead ? `<p class="lead">${nl(p.lead)}</p>` : ''}
    <div class="numero"><span class="n" style="font-size:${p.numero.length <= 3 ? 210 : p.numero.length <= 6 ? 168 : 142}px">${esc(p.numero)}</span><span class="u">${esc(p.unidade || '')}</span></div>
    <div class="num-tit">${nl(p.titulo)}</div>
    <p class="sub" style="margin-top:24px">${nl(p.sub)}</p>`;
  },

  lista(p) {
    return `${pill(p.tag)}<h1>${nl(p.titulo)}</h1>
    <div class="chips">${p.chips.map((c) => `<div class="chip"><span class="ic">${CHECK}</span><span>${esc(c)}</span></div>`).join('')}</div>
    <div class="rodape-nota">${esc(p.rodape)}</div>`;
  },

  jornada(p) {
    return `${pill(p.tag)}<h1>${nl(p.titulo)}</h1>
    <div class="timeline">${p.etapas.map((e, i) => `
      <div class="step">
        <div class="marker"><div class="dot">${i + 1}</div><div class="line"></div></div>
        <div class="txt"><strong>${esc(e.t)}</strong><span>${esc(e.d)}</span></div>
      </div>`).join('')}</div>`;
  },

  checklist(p) {
    return `${pill(p.tag)}<h1>${nl(p.titulo)}</h1><p class="sub">${nl(p.sub)}</p>
    <div class="mock">${p.linhas.map((l) => `
      <div class="lin ${l.tipo === 'dep' || l.tipo === 'foto' ? 'dep' : ''}">
        <span class="q">${esc(l.t)}</span><span class="tagv ${l.tipo}">${esc(l.v)}</span>
      </div>`).join('')}</div>`;
  },

  mito(p) {
    return `${pill('Mito x Verdade')}<h1>${nl(p.titulo)}</h1>
    <div class="mito-bloco">
      <div class="mito-card m"><span class="lab">Mito</span><p>${nl(p.mito)}</p></div>
      <div class="mito-card v"><span class="lab">Verdade</span><p>${nl(p.verdade)}</p></div>
      ${bullets(p.itens)}
    </div>`;
  },

  dica(p) {
    return `${pill('Dica de gestão em campo')}
    <div class="dica-n">#${esc(p.numeroDica)}</div>
    <h1 style="margin-top:18px;font-size:66px">${nl(p.titulo)}</h1>
    <p class="sub">${nl(p.sub)}</p>
    <ol class="passos">${p.itens.map((i) => `<li><span>${esc(i)}</span></li>`).join('')}</ol>`;
  },

  depoimento(p) {
    return `${pill('Na prática')}
    <div class="dep-bloco">
    <div class="quote-mark">&ldquo;</div>
    <div class="dep-quote">${nl(p.quote)}</div>
    <div class="dep-autor">
      <span class="av"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2.2"/><path d="M4.5 20c1.6-3.6 4.3-5.4 7.5-5.4S18 16.4 19.5 20" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></span>
      <span><b>${esc(p.autor)}</b><span>${esc(p.contexto)}</span></span>
    </div>
    <div class="dep-nota">Depoimento ilustrativo.</div></div>`;
  },

  print(p) {
    return `${pill(p.tag)}<h1 style="font-size:70px">${nl(p.titulo)}</h1><p class="sub" style="font-size:31px">${nl(p.sub)}</p>
    <div class="print-wrap">
      ${phone(p.print)}
      <div class="callouts">${p.callouts.map((c) => `<div class="callout"><span class="ic">${CHECK}</span><span>${esc(c)}</span></div>`).join('')}</div>
    </div>`;
  },

  segmento(p) {
    return `${pill(p.tag)}<h1 style="font-size:92px">${nl(p.titulo)}</h1><p class="sub">${nl(p.sub)}</p>
    ${bullets(p.itens, 'centro')}
    <div class="seg-badge">${CHECK.replace('viewBox', 'style="width:26px;height:26px" viewBox')} Feito para quem coloca equipe na rua</div>`;
  },

  cta(p) {
    return `${pill(p.tag)}<h1>${nl(p.titulo)}</h1><p class="sub">${nl(p.sub)}</p>
    ${bullets(p.itens)}
    <div class="cta-box">
      <span class="cta-txt"><span class="lab">Fale no WhatsApp</span><span class="tel">${esc(p.contato)}</span></span>
      <span class="wa"><svg viewBox="0 0 24 24" fill="none"><path d="M4 20l1.3-3.9A8 8 0 1 1 8.1 18.8L4 20z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg></span>
    </div>`;
  },
};

// ─────────────────────────── página ───────────────────────────

export function html(p) {
  const dark = !!p.dark || p.tpl === 'frase' || p.tpl === 'depoimento';
  const corpo = T[p.tpl](p);
  const bleed = !!p.print && (p.tpl === 'feature' || p.tpl === 'print');
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>${CSS}</style></head>
<body><div class="canvas${dark ? ' dark' : ''}${bleed ? ' bleed' : ''}">
  <div class="mesh"><i class="a"></i><i class="b"></i></div>
  <div class="grid-lines"></div>
  ${p.tpl === 'frase' || p.tpl === 'numero' ? `<div class="marca-dagua">${CHECK}</div>` : ''}
  ${p.pagina ? `<div class="pagina">${esc(p.pagina)}</div>` : ''}
  <div class="content">${corpo}</div>
  ${brand(dark, p.arraste, bleed)}
</div></body></html>`;
}

// ─────────────────────────── chrome ───────────────────────────

export function acharChrome() {
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

export function capturar(chrome, arquivoHtml, arquivoPng) {
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-sandbox',
    '--force-device-scale-factor=1',
    '--disable-lcd-text',
    '--font-render-hinting=none',
    `--window-size=${W},${H}`,
    '--virtual-time-budget=8000',
    `--screenshot=${arquivoPng}`,
    `file:///${arquivoHtml.replace(/\\/g, '/')}`,
  ], { stdio: 'pipe', timeout: 90000 });
}

// ─────────────────────────── execução ───────────────────────────

// Só executa quando chamado direto (o gerador de carrosséis importa este módulo).
if (import.meta.url === pathToFileURL(process.argv[1]).href) {

  const args = process.argv.slice(2);
  const soHtml = args.includes('--html');
  const filtro = args.filter((a) => /^\d+$/.test(a)).map(Number);
  const lista = filtro.length ? posts.filter((p) => filtro.includes(p.n)) : posts;

  fs.mkdirSync(SAIDA, { recursive: true });
  fs.mkdirSync(TMP, { recursive: true });
  const chrome = soHtml ? null : acharChrome();

  let ok = 0;
  for (const p of lista) {
    const base = `${String(p.n).padStart(2, '0')}-${slug(p.titulo || p.pergunta || p.quote || p.mito)}`;
    const fHtml = path.join(TMP, `${base}.html`);
    const fPng = path.join(SAIDA, `${base}.png`);
    fs.writeFileSync(fHtml, html(p), 'utf8');
    if (!soHtml) {
      capturar(chrome, fHtml, fPng);
      if (!fs.existsSync(fPng)) throw new Error(`Falha ao capturar o post ${p.n}`);
    }
    ok++;
    process.stdout.write(`\r${ok}/${lista.length} — ${base}                              `);
  }
  process.stdout.write('\n');

  // ─────────────── legendas e calendário ───────────────

  if (!filtro.length) {
    const legendas = ['# Legendas dos posts — Taskcheck', '',
      'Copie a legenda junto com o bloco de hashtags do post correspondente.', ''];
    for (const p of posts) {
      legendas.push(`---`, ``, `## Post ${String(p.n).padStart(2, '0')} — Dia ${p.dia} (${p.slot === 'manha' ? 'manhã' : 'tarde'}) · ${p.tema}`, '',
        `**Arte:** \`${String(p.n).padStart(2, '0')}-${slug(p.titulo || p.pergunta || p.quote || p.mito)}.png\``, '',
        p.legenda, '', HASHTAGS[p.tags], '');
    }
    fs.writeFileSync(path.join(RAIZ, 'LEGENDAS.md'), legendas.join('\n'), 'utf8');

    const cal = ['# Calendário de publicação', '',
      'Ordem sugerida dos posts. As datas e horários reais da publicação automática estão em `publicador/agenda.json`.', '',
      '| Dia | Horário | Post | Tema | Formato | Arte |', '|---|---|---|---|---|---|'];
    for (const p of posts) {
      cal.push(`| ${p.dia} | ${p.slot === 'manha' ? '09h00' : '18h30'} | ${String(p.n).padStart(2, '0')} | ${p.tema} | ${p.tpl} | \`${String(p.n).padStart(2, '0')}-${slug(p.titulo || p.pergunta || p.quote || p.mito)}.png\` |`);
    }
    fs.writeFileSync(path.join(RAIZ, 'CALENDARIO.md'), cal.join('\n'), 'utf8');
  }

  console.log(`Pronto: ${ok} arte(s) em ${SAIDA}`);
}
