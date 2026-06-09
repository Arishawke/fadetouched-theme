import { alpha } from "../lib/color.mjs";

export const label = "Web (CSS)";

function vars(ctx) {
  const { raw, sem } = ctx;

  const line = (name, value) => `  --ft-${name}:${value};`;
  const ref = (name, target) => line(name, `var(--ft-${target})`);

  const neutrals = Object.entries(raw.neutrals).map(([k, v]) => line(k, v));
  const accents = Object.entries(raw.accents).map(([k, v]) => line(k, v));
  const semantic = Object.entries(raw.semantic).map(([k, v]) => ref(k, v));
  const syntax = Object.entries(raw.syntax).map(([k, v]) => ref(`syn-${k}`, v));

  const alphas = [
    line("selection", alpha(sem["border-strong"], 25)),
    line("line-highlight", alpha(sem.text, 6)),
    line("match", alpha(sem.info, 30)),
    line("glass", alpha(sem.surface, 72)),
    line("glass-edge", alpha(sem.text, 16)),
  ];

  return [...neutrals, ``, ...accents, ``, ...semantic, ``, ...alphas, ``, ...syntax];
}

export default function render(ctx) {
  const { meta } = ctx;
  const dark = vars(ctx);
  const out = [
    `/* ${meta.name}. Generated from ${meta.source}. Do not edit by hand. */`,
    `:root {`,
    ...dark,
    `}`,
    ``,
  ].join("\n");
  return [{ path: "ports/web/fadetouched.css", content: out }];
}
