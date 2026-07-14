import { hexToRgb, rgbToHex } from "../lib/color.mjs";

export const label = "Gemini CLI";

const tint = (base, overlay, amount) => {
  const baseRgb = hexToRgb(base);
  const overlayRgb = hexToRgb(overlay);
  return rgbToHex(baseRgb.map((channel, index) => channel + (overlayRgb[index] - channel) * amount));
};

export default function render(ctx) {
  const { meta, accent, sem, syn } = ctx;

  const theme = {
    name: meta.name,
    type: "custom",
    background: {
      primary: sem.bg,
      diff: {
        added: tint(sem.bg, sem.success, 0.12),
        removed: tint(sem.bg, sem.error, 0.12),
      },
    },
    text: {
      primary: sem.text,
      secondary: sem["text-muted"],
      link: sem.link,
      accent: sem.accent,
      response: sem.text,
    },
    border: {
      default: sem.border,
      focused: sem.accent,
    },
    status: {
      success: sem.success,
      warning: sem.warning,
      error: sem.error,
    },
    ui: {
      comment: syn.comment,
      symbol: syn.operator,
      gradient: [accent.green, accent.teal, accent.blue],
    },
  };

  return [
    {
      path: `ports/gemini-cli/${meta.slug}.json`,
      content: JSON.stringify(theme, null, 2) + "\n",
    },
  ];
}
