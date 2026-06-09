const clamp01 = (x) => Math.min(1, Math.max(0, x));

export function hexToRgb(hex) {
  if (!/^#?[0-9a-fA-F]{6}$/.test(hex)) {
    throw new Error(`Invalid 6-digit hex color: ${JSON.stringify(hex)}`);
  }
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

export function rgbToHex([r, g, b]) {
  const to = (c) =>
    Math.round(clamp01(c) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

const srgbToLinear = (c) =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const linearToSrgb = (c) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;

export function rgbToOklab([r, g, b]) {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return {
    L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  };
}

export function oklabToRgb({ L, a, b }) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  return [
    linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

export function oklabToOklch({ L, a, b }) {
  const C = Math.hypot(a, b);
  let H = (Math.atan2(b, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { L, C, H };
}
export function oklchToOklab({ L, C, H }) {
  const h = (H * Math.PI) / 180;
  return { L, a: C * Math.cos(h), b: C * Math.sin(h) };
}

export const hexToOklch = (hex) => oklabToOklch(rgbToOklab(hexToRgb(hex)));
export const oklchToHex = (lch) => rgbToHex(oklabToRgb(oklchToOklab(lch)));

export function brighten(hex, lMul = 1.07, cMul = 1.06) {
  const { L, C, H } = hexToOklch(hex);
  return oklchToHex({ L: L * lMul, C: C * cMul, H });
}

export function alpha(hex, pct) {
  if (!(pct >= 0 && pct <= 100)) {
    throw new Error(`alpha() pct must be in 0..100, got ${pct}`);
  }
  const byte = Math.round((pct / 100) * 255);
  return hex + byte.toString(16).padStart(2, "0");
}

export function relativeLuminance([r, g, b]) {
  const [R, G, B] = [r, g, b].map(srgbToLinear);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
export function contrastRatio(hexA, hexB) {
  const la = relativeLuminance(hexToRgb(hexA));
  const lb = relativeLuminance(hexToRgb(hexB));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}
