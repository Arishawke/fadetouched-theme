import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { colors, FRAMES } from "./colors.mjs";

const TAU = Math.PI * 2;
const lerp = (a, b, t) => a + (b - a) * t;
const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgbStr = (c) => `rgb(${c[0]},${c[1]},${c[2]})`;
const mix = (a, b, t) => a.map((v, i) => Math.round(lerp(v, b[i], t)));

const TIP = hexRgb(colors.arcTip);
const HEAD = hexRgb(colors.arcHead);

function comet(cx, cy, r, headDeg, span, dots, dotR) {
  let out = "";
  for (let i = 0; i < dots; i++) {
    const t = i / (dots - 1);
    const ang = ((headDeg - t * span) * Math.PI) / 180;
    const x = cx + r * Math.cos(ang);
    const y = cy + r * Math.sin(ang);
    const col = rgbStr(mix(TIP, HEAD, Math.min(1, t * 1.6)));
    const op = (1 - t) ** 1.15;
    out += `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${dotR}" fill="${col}" fill-opacity="${op.toFixed(3)}"/>`;
  }
  return out;
}

function ring(cx, cy, r, stroke, headDeg, glowOp, glowR, dotR) {
  const headAng = (headDeg * Math.PI) / 180;
  const hx = cx + r * Math.cos(headAng);
  const hy = cy + r * Math.sin(headAng);
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colors.track}" stroke-width="${stroke}"/>` +
    `<circle cx="${hx.toFixed(2)}" cy="${hy.toFixed(2)}" r="${glowR}" fill="rgb(${colors.bloom})" fill-opacity="${glowOp.toFixed(3)}" filter="url(#bloom)"/>` +
    comet(cx, cy, r, headDeg, 165, 30, dotR);
}

const defs = `<defs><filter id="bloom" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="5"/></filter></defs>`;

function glowOpacity(i) {
  return 0.45 + 0.5 * (0.5 - 0.5 * Math.cos((i / FRAMES) * TAU));
}

export function waitFrame(i) {
  const head = -90 + (i / FRAMES) * 360;
  const body = ring(128, 128, 72, 12, head, glowOpacity(i), 26, 7);
  return `<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">${defs}${body}</svg>`;
}

function arrowInner() {
  const raw = readFileSync(fileURLToPath(new URL("../src/svg/modern/left_ptr.svg", import.meta.url)), "utf8");
  return raw.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
}

export function progressFrame(i) {
  const head = -90 + (i / FRAMES) * 360;
  const r = ring(196, 176, 28, 7, head, glowOpacity(i), 12, 3.4);
  return `<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">${defs}${arrowInner()}${r}</svg>`;
}
