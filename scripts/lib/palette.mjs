import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { basename, dirname, join } from "node:path";
import { brighten } from "./color.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const PALETTE_PATH = join(root, "palette.json");
export const ROOT = root;

export function loadPalette(path = PALETTE_PATH) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function makeResolver(palette) {
  const primitives = { ...palette.neutrals, ...palette.accents };
  const seen = new Set();
  return function resolve(ref) {
    if (primitives[ref] !== undefined) return primitives[ref];
    if (palette.semantic[ref] !== undefined) {
      if (seen.has(ref)) throw new Error(`Cyclic token reference at "${ref}"`);
      seen.add(ref);
      const hex = resolve(palette.semantic[ref]);
      seen.delete(ref);
      return hex;
    }
    throw new Error(`Unknown token reference: "${ref}"`);
  };
}

const mapValues = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]));

export function buildContext(palettePath = PALETTE_PATH) {
  const palette = loadPalette(palettePath);
  const resolve = makeResolver(palette);

  const n = { ...palette.neutrals };
  const accent = { ...palette.accents };

  const sem = mapValues(palette.semantic, (_v, key) => resolve(key));
  const syn = mapValues(palette.syntax, (v) => resolve(v));

  const isLight = palette.appearance === "light";
  const bright = (hex) => (isLight ? brighten(hex, 0.9, 1.05) : brighten(hex));

  const ansi = {
    black: isLight ? n.n10 : n.n4,
    red: accent.red,
    green: accent.green,
    yellow: accent.yellow,
    blue: accent.blue,
    magenta: accent.magenta,
    cyan: accent.teal,
    white: isLight ? n.n3 : n.n9,
    brightBlack: isLight ? n.n8 : n.n5,
    brightRed: bright(accent.red),
    brightGreen: bright(accent.green),
    brightYellow: bright(accent.yellow),
    brightBlue: bright(accent.blue),
    brightMagenta: bright(accent.magenta),
    brightCyan: bright(accent.teal),
    brightWhite: isLight ? n.n1 : n.n10,
  };

  return {
    meta: {
      name: palette.name,
      appearance: palette.appearance,
      base: palette.base,
      description: palette.description,
      slug: palette.name.toLowerCase(),
      source: basename(palettePath),
    },
    raw: palette,
    n,
    accent,
    sem,
    syn,
    ansi,
  };
}
