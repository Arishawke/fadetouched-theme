import { test } from "node:test";
import assert from "node:assert/strict";
import {
  alpha,
  brighten,
  contrastRatio,
  hexToHsl,
  hexToOklch,
  oklchToHex,
} from "../scripts/lib/color.mjs";

test("alpha() maps percentage to the authored byte values", () => {
  // These bytes appear in the hand-authored ports; the generator must reproduce them.
  assert.equal(alpha("#55615c", 25), "#55615c40");
  assert.equal(alpha("#55615c", 30), "#55615c4d");
  assert.equal(alpha("#e5e9e6", 6), "#e5e9e60f");
  assert.equal(alpha("#e5e9e6", 5), "#e5e9e60d");
  assert.equal(alpha("#74bba7", 18), "#74bba72e");
  assert.equal(alpha("#23332f", 72), "#23332fb8");
});

test("alpha() rejects out-of-range percentages", () => {
  assert.throws(() => alpha("#55615c", 150), /0\.\.100/);
  assert.throws(() => alpha("#55615c", -1), /0\.\.100/);
});

test("hexToRgb() rejects malformed hex (fails loud, no NaN)", () => {
  assert.throws(() => hexToOklch("#fff"), /Invalid 6-digit hex/);
});

test("contrastRatio() matches WCAG reference points", () => {
  assert.equal(Math.round(contrastRatio("#000000", "#ffffff")), 21);
  assert.equal(contrastRatio("#142624", "#142624"), 1);
});

test("brighten() raises perceptual lightness, holds hue", () => {
  for (const hex of ["#d3726d", "#8fbe8b", "#71abd9", "#cc8eb2"]) {
    const before = hexToOklch(hex);
    const after = hexToOklch(brighten(hex));
    assert.ok(after.L > before.L, `${hex}: L should increase`);
    assert.ok(Math.abs(after.H - before.H) < 2, `${hex}: hue should hold`);
  }
});

test("OKLCH round-trip is stable for the palette base", () => {
  // n2 is emitted bit-exact; a round-trip must not drift it.
  assert.equal(oklchToHex(hexToOklch("#11201e")), "#11201e");
});

test("hexToHsl() returns integer h/s/l for the accent green", () => {
  const { h, s, l } = hexToHsl("#96bb93");
  assert.equal(h, 115);
  assert.equal(s, 23);
  assert.equal(l, 65);
});

test("hexToHsl() reports zero saturation for a gray", () => {
  const { h, s, l } = hexToHsl("#808080");
  assert.equal(s, 0);
  assert.equal(h, 0);
  assert.equal(l, 50);
});

test("hexToHsl() rejects malformed hex (fails loud)", () => {
  assert.throws(() => hexToHsl("#fff"), /Invalid 6-digit hex/);
});
