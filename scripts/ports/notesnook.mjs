import { alpha, hexToRgb, rgbToHex } from "../lib/color.mjs";

export const label = "Notesnook";

const tint = (base, overlay, amount) => {
  const baseRgb = hexToRgb(base);
  const overlayRgb = hexToRgb(overlay);
  return rgbToHex(baseRgb.map((channel, index) => channel + (overlayRgb[index] - channel) * amount));
};

export default function render(ctx) {
  const { meta, n, sem } = ctx;
  const backdrop = alpha(n.n0, 80);
  const common = {
    accent: sem.accent,
    accentForeground: sem.bg,
    paragraph: sem.text,
    background: sem.bg,
    border: sem.border,
    heading: sem.text,
    icon: sem["text-muted"],
    separator: sem.border,
    placeholder: sem["text-muted"],
    hover: sem["surface-hover"],
    backdrop,
  };
  const variant = (overrides) => ({ ...common, ...overrides });

  const theme = {
    name: meta.name,
    id: meta.slug,
    version: 1,
    compatibilityVersion: 1,
    license: "MIT",
    authors: [{ name: "Arishawke", url: "https://github.com/Arishawke" }],
    homepage: "https://fadetouched.arishawke.com/",
    description: `${meta.name} for Notesnook`,
    colorScheme: meta.appearance,
    scopes: {
      base: {
        primary: variant({}),
        secondary: variant({
          paragraph: sem["text-muted"],
          background: sem["bg-dim"],
          icon: sem["text-subtle"],
        }),
        disabled: variant({
          accent: n.n8,
          paragraph: n.n8,
          border: n.n4,
          heading: n.n8,
          icon: n.n8,
          separator: n.n4,
          placeholder: n.n8,
          hover: sem.surface,
        }),
        selected: variant({
          background: sem["surface-active"],
          border: sem.accent,
          icon: sem.accent,
        }),
        error: variant({
          accent: sem.error,
          paragraph: sem.error,
          background: tint(sem.bg, sem.error, 0.1),
          border: sem.error,
          heading: sem.error,
          icon: sem.error,
        }),
        success: variant({
          accent: sem.success,
          paragraph: sem.success,
          background: tint(sem.bg, sem.success, 0.12),
          border: sem.success,
          heading: sem.success,
          icon: sem.success,
        }),
      },
    },
    $schema:
      "https://raw.githubusercontent.com/streetwriters/notesnook-themes/main/schemas/v1.schema.json",
  };

  return [
    {
      path: `ports/notesnook/${meta.slug}.json`,
      content: JSON.stringify(theme, null, 2) + "\n",
    },
  ];
}
