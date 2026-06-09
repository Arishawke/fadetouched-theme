import { circlePng } from "./lib/png.mjs";

export const label = "Swatches";

export default function render(ctx) {
  const all = { ...ctx.n, ...ctx.accent };
  return Object.entries(all).map(([token, hex]) => ({
    path: `assets/circles/${token}.png`,
    content: circlePng(hex, 36),
  }));
}
