#!/usr/bin/env node
import { buildContext } from "./lib/palette.mjs";
import { contrastRatio } from "./lib/color.mjs";

const AA_TEXT = 4.5;
const AA_LARGE = 3.0;

function checkPalette(ctx) {
  const bg = ctx.sem.bg;
  const checks = [
    ["text", ctx.sem.text, AA_TEXT],
    ["text-muted", ctx.sem["text-muted"], AA_TEXT],
    ["text-subtle", ctx.sem["text-subtle"], AA_TEXT],
    ["text-faint (comments)", ctx.sem["text-faint"], AA_LARGE],
    ...Object.entries(ctx.accent).map(([name, hex]) => [name, hex, AA_LARGE]),
  ];

  let failed = 0;
  console.log(`${ctx.meta.name}: contrast against --bg ${bg}\n`);
  console.log(`  ${"token".padEnd(22)} ${"hex".padEnd(9)} ratio   min   result`);
  for (const [label, hex, min] of checks) {
    const ratio = contrastRatio(hex, bg);
    const pass = ratio >= min;
    if (!pass) failed += 1;
    const r = ratio.toFixed(2).padStart(5);
    console.log(
      `  ${label.padEnd(22)} ${hex.padEnd(9)} ${r}  ${min.toFixed(1)}   ${pass ? "PASS" : "FAIL"}`,
    );
  }
  console.log("");
  return failed;
}

let failed = 0;
failed += checkPalette(buildContext());

if (failed > 0) {
  console.error(`${failed} contrast check(s) failed.`);
  process.exit(1);
}
console.log("All contrast checks passed.");
