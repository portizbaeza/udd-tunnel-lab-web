// Build script for the B.I.C.H.O. anatomy figure (UDD Tunnel Lab).
// Depends on the local anatomy skill kit (not shipped to the site). Run with:
//   node assets/anatomy-build/build.mjs
// Writes:
//   assets/anatomy-build/preview.html   — standalone page to open/screenshot for review
//   assets/anatomy-build/fragment.html  — just the <figure> markup to paste into index.html

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "/home/lucasriquelme007/.claude/skills/anatomy/kit/iso-kit.mjs";
import * as G from "/home/lucasriquelme007/.claude/skills/anatomy/kit/lathe.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));

const WIDTH = 820;
const HEIGHT = 440;

// ---- Module lengths (s, along the machine axis) and radii ------------------
const HEAD_S0 = 0, HEAD_S1 = 9, HEAD_R = 36;
const NECK_S1 = 13, NECK_R = 24;
const DIR_S0 = NECK_S1, DIR_S1 = 35, DIR_R = 24.5, DIR_SEAM = 24;
const BAG_S0 = DIR_S1, BAG_S1 = BAG_S0 + 64, BAG_R = 25;
const PROP_S0 = BAG_S1, PROP_S1 = PROP_S0 + 30, PROP_R = 24;
const CASE_S0 = PROP_S1, CASE_LEG = 19, CASE_R0 = 23.5, CASE_R1 = 21.5, CASE_R2 = 19.5;
const CASE_S1 = CASE_S0 + CASE_LEG, CASE_S2 = CASE_S1 + CASE_LEG, CASE_S3 = CASE_S2 + CASE_LEG;

const F = G.frameAlong([0, 0, 0], [1, 0, 0]);

const P = k.fitProjection(
  [
    G.pointOf(F, HEAD_S0, HEAD_R, 0), G.pointOf(F, HEAD_S0, -HEAD_R, Math.PI),
    G.pointOf(F, HEAD_S0, HEAD_R, Math.PI / 2), G.pointOf(F, HEAD_S0, HEAD_R, -Math.PI / 2),
    G.pointOf(F, CASE_S3 + 14, CASE_R2, 0), G.pointOf(F, CASE_S3 + 14, -CASE_R2, Math.PI),
    [0, 0, HEAD_R + 6], [0, 0, -(HEAD_R + 6)],
  ],
  WIDTH, HEIGHT,
  { pad: 30, azimuth: 52, elevation: 24 },
);

const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const seg = (a, b) => k.segment(a, b, P);

const GOLD = `--anatomy-face:#5c4c22;--anatomy-top:#7a6530;--anatomy-shade-0:#3a3015;--anatomy-shade-1:#473a1a;--anatomy-shade-2:#54451f;--anatomy-shade-3:#605024;--anatomy-lit-top:#8f7638;--anatomy-lit-shade:#6b582a;`;
const GRAPHITE = `--anatomy-face:#1c1c1e;--anatomy-top:#242426;--anatomy-shade-0:#101011;--anatomy-shade-1:#141415;--anatomy-shade-2:#18181a;--anatomy-shade-3:#1e1e20;--anatomy-lit-top:#2c2c2f;--anatomy-lit-shade:#202022;`;
const CHROME = `--anatomy-face:#34343a;--anatomy-top:#45454d;--anatomy-shade-0:#222226;--anatomy-shade-1:#28282d;--anatomy-shade-2:#2e2e34;--anatomy-shade-3:#38383f;--anatomy-lit-top:#5a5a63;--anatomy-lit-shade:#45454e;`;

const ORANGE = "#E89A3C";
const BLUE = "#5E8FD6";

function hotspot(name, hint, href, inner, style = "", hitFill = "") {
  const hit = hitFill ? `<path d="${hitFill}" fill="transparent" style="pointer-events:all"/>` : "";
  return `<a href="${href}" class="anatomy-hotspot" data-part="${name}" data-hint="${hint}" aria-label="${name} — ${hint}"><title>${name} — ${hint}</title>${hit}<g style="${style}">${inner}</g></a>`;
}

// ---- 1. Cabezal hidroescudo -------------------------------------------------
function cabezal() {
  const out = [];
  out.push(S(G.disc(HEAD_S0 - 1.5, HEAD_S0, HEAD_R + 1.5, F, P), { tone: "lo" })); // flange lip
  const main = G.lathe([[HEAD_S0, 0], [HEAD_S0, HEAD_R], [HEAD_S1 - 2, HEAD_R], [HEAD_S1, NECK_R + 2], [HEAD_S1 + 2, NECK_R]], F, P, { steps: 56 });
  out.push(S(main, { tone: "hi" }));
  // water-jet nozzles: small triangular marks between the arms
  const jets = [45, 135, 225, 315].map((a) => (a * Math.PI) / 180);
  out.push(D(jets.map((a) => at(G.pointOf(F, HEAD_S0 - 0.3, 11, a))), { size: 0.7, tone: "hi" }));
  out.push(D(jets.map((a) => at(G.pointOf(F, HEAD_S0 - 0.3, 27, a))), { size: 0.6, tone: "mid" }));
  return hotspot("Cabezal hidroescudo", "chorros de agua + 8 picos de erosión en cruz", "album.html#sala-01", out.join(""), GRAPHITE, main.fill);
}

const toothOverlay = () => {
  const inner = [0, 90, 180, 270].map((a) => seg(G.pointOf(F, HEAD_S0 - 0.4, 8, (a * Math.PI) / 180), G.pointOf(F, HEAD_S0 - 0.4, 19, (a * Math.PI) / 180)));
  const outer = [0, 90, 180, 270].map((a) => seg(G.pointOf(F, HEAD_S0 - 0.4, 23, (a * Math.PI) / 180), G.pointOf(F, HEAD_S0 - 0.4, HEAD_R - 2, (a * Math.PI) / 180)));
  return [...inner, ...outer].map((d) => `<path class="iso-line" d="${d}" style="stroke:${ORANGE};stroke-width:3.2;stroke-linecap:round"/>`).join("");
};

// ---- 2. Direccionador -------------------------------------------------------
function direccionador() {
  const out = [];
  const main = G.lathe([[DIR_S0, NECK_R], [DIR_S0 + 1, DIR_R], [DIR_SEAM - 1.2, DIR_R], [DIR_SEAM, DIR_R - 2.2], [DIR_SEAM + 1.2, DIR_R], [DIR_S1 - 1, DIR_R], [DIR_S1, BAG_R]], F, P, { steps: 48 });
  out.push(S(main, { tone: "hi" }));
  out.push(L(G.arcOf(F, DIR_SEAM, DIR_R - 2.1, P), { tone: "lit" }));
  return hotspot("Direccionador", "2 anillos en cuña, articula ±10°", "album.html#sala-03", out.join(""), CHROME, main.fill);
}

// ---- 3. Bolsa toroidal -------------------------------------------------------
function bolsa() {
  const out = [];
  out.push(S(G.ringBand(BAG_S0 - 1.4, BAG_S0, BAG_R - 0.5, BAG_R + 2.5, F, P), { tone: "lit" })); // collar
  const main = G.lathe([[BAG_S0, BAG_R], [BAG_S0 + 10, BAG_R + 1.2], [BAG_S1 - 10, BAG_R + 1.2], [BAG_S1, BAG_R]], F, P, { steps: 48, smooth: true });
  out.push(S(main, { tone: "mid" }));
  out.push(L(G.ribsOf(F, BAG_S0 + 4, BAG_S1 - 4, BAG_R + 0.6, 16, P, { phase: 0.15 }), { tone: "faint" }));
  return hotspot("Bolsa toroidal", "Ø 500 × 1500 mm, rueda sobre las paredes del túnel", "album.html#sala-02", out.join(""), GOLD, main.fill);
}

// ---- 4. Propulsor -------------------------------------------------------
function propulsor() {
  const out = [];
  const main = G.lathe([[PROP_S0, BAG_R], [PROP_S0 + 1.5, PROP_R], [PROP_S1 - 1.5, PROP_R], [PROP_S1, PROP_R - 2]], F, P, { steps: 48 });
  out.push(S(main, { tone: "hi" }));
  const blue = G.ribsOf(F, PROP_S0 + 3, PROP_S1 - 3, PROP_R + 0.4, 5, P, { phase: 0 });
  const orange = G.ribsOf(F, PROP_S0 + 3, PROP_S1 - 3, PROP_R + 0.4, 5, P, { phase: Math.PI / 5 });
  out.push(`<path class="iso-line" d="${blue}" style="stroke:${BLUE};stroke-width:2.4"/>`);
  out.push(`<path class="iso-line" d="${orange}" style="stroke:${ORANGE};stroke-width:2.4"/>`);
  out.push(L(G.arcOf(F, PROP_S0 + 1, PROP_R, P), { tone: "faint" }));
  out.push(L(G.arcOf(F, PROP_S1 - 1, PROP_R, P), { tone: "faint" }));
  return hotspot("Propulsor", "10 orugas, 5 motores", "album.html#sala-02", out.join(""), CHROME, main.fill);
}

// ---- 5. Casing y soporte -------------------------------------------------------
function casing() {
  const out = [];
  const main = G.lathe([[CASE_S0, PROP_R - 1], [CASE_S0 + 1, CASE_R0], [CASE_S1 - 0.6, CASE_R0], [CASE_S1, CASE_R1], [CASE_S2 - 0.6, CASE_R1], [CASE_S2, CASE_R2], [CASE_S3, CASE_R2]], F, P, { steps: 48 });
  out.push(S(main, { tone: "hi" }));
  [CASE_S1, CASE_S2].forEach((s) => out.push(L(G.arcOf(F, s, CASE_R1 + 0.4, P), { tone: "lo" })));
  out.push(L(G.ribsOf(F, CASE_S0 + 1.5, CASE_S1 - 1, CASE_R0 + 0.3, 20, P, { twist: 3.4 }), { tone: "faint" }));
  out.push(L(G.ribsOf(F, CASE_S1 + 0.3, CASE_S2 - 1, CASE_R1 + 0.3, 18, P, { twist: 3.4 }), { tone: "faint" }));
  out.push(L(G.ribsOf(F, CASE_S2 + 0.3, CASE_S3 - 0.5, CASE_R2 + 0.3, 16, P, { twist: 3.4 }), { tone: "faint" }));
  out.push(S(G.disc(CASE_S3, CASE_S3 + 0.6, CASE_R2, F, P), { tone: "lo" }));
  // umbilical cord stub
  const cordPts = [
    G.pointOf(F, CASE_S3 + 0.4, 6, Math.PI / 2 + 0.2),
    G.pointOf(F, CASE_S3 + 7, 13, Math.PI / 2 + 0.35),
    G.pointOf(F, CASE_S3 + 15, 17, Math.PI / 2 + 0.5),
  ];
  out.push(L(k.pathOf(cordPts.map(at)), { tone: "faint", dashed: true }));
  out.push(D([at(cordPts[cordPts.length - 1])], { size: 1, tone: "faint" }));
  return hotspot("Casing y soporte", "telescópico, hasta 6× su largo", "album.html#sala-05", out.join(""), CHROME, main.fill);
}

const joints = [HEAD_S1 + 2, DIR_S1, BAG_S1, PROP_S1]
  .map((s, i) => L(G.arcOf(F, s, [NECK_R, BAG_R, PROP_R, PROP_R - 2][i] + 0.5, P), { tone: "faint" }))
  .join("");

const body = [
  casing(),
  propulsor(),
  bolsa(),
  direccionador(),
  cabezal(),
  toothOverlay(),
  joints,
];

const label = "B.I.C.H.O, una tuneladora de escudo hidráulico mostrada en cinco módulos: el cabezal hidroescudo erosiona el frente con chorros de agua; el direccionador articula hasta 10° para corregir el rumbo; la bolsa toroidal rueda sobre las paredes del túnel; el propulsor, con diez orugas y cinco motores, mueve la bolsa; y el casing telescópico sostiene la retaguardia. Toca cualquier pieza para abrir su sala en el Álbum mecánico.";

const svg = k.figureSvg({ width: WIDTH, height: HEIGHT, label, body });

const plate = k.plateHtml({
  fig: "Fig 1",
  title: "Anatomía de B.I.C.H.O",
  hint: "Toca una pieza para explorarla",
  readout: "5 módulos · Ø 500 mm",
  body: `<div class="iso-stage">${svg}</div>`,
});

writeFileSync(join(HERE, "fragment.html"), plate);
writeFileSync(join(HERE, "preview.html"), k.pageHtml({ title: "B.I.C.H.O. anatomy", theme: "dark", body: `<div class="iso bicho-figure" data-theme="dark">${plate}</div>` }));
console.log("wrote fragment.html and preview.html");
