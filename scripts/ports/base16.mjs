import { hexToOklch, oklchToHex } from "../lib/color.mjs";

export const label = "base16";

const lift = (hex, L) => {
  const { C, H } = hexToOklch(hex);
  return oklchToHex({ L, C, H });
};

export default function render(ctx) {
  const { meta, n, accent } = ctx;
  const h = (hex) => `"${hex.replace("#", "")}"`;

  const palette = {
    base00: n.n2,
    base01: n.n3,
    base02: n.n5,
    base03: n.n7,
    base04: n.n9,
    base05: n.n11,
    base06: lift(n.n11, 0.95),
    base07: lift(n.n11, 0.98),
    base08: accent.red,
    base09: accent.orange,
    base0A: accent.yellow,
    base0B: accent.green,
    base0C: accent.cyan,
    base0D: accent.blue,
    base0E: accent.purple,
    base0F: accent.rust,
  };

  const lines = Object.entries(palette).map(([k, v]) => `  ${k}: ${h(v)}`);
  const out = [
    `system: "base16"`,
    `name: "${meta.name}"`,
    `author: "Arishawke"`,
    `slug: "${meta.slug}"`,
    `variant: "${meta.appearance}"`,
    `description: "${meta.description}"`,
    `palette:`,
    ...lines,
    ``,
  ].join("\n");

  return [{ path: `ports/base16/${meta.slug}.yaml`, content: out }];
}
