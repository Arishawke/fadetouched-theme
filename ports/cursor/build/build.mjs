import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, existsSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { recolorMap, cbmpColors, FRAMES } from "./colors.mjs";
import { waitFrame, progressFrame } from "./spinner.mjs";

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const OUT = process.env.CURSOR_OUT || "/home/megan/.cache/ft-cursor-build/ports-cursor-out";
const SVG = `${OUT}/svg`;
const BITMAPS = `${OUT}/bitmaps/Fadetouched-Modern`;
const X = `${OUT}/x11`;
const WIN = `${OUT}/win`;
const cbmp = process.env.CBMP || here("../../../node_modules/.bin/cbmp");
const pad = (n) => String(n + 1).padStart(2, "0");

function applyRecolor(s) {
  for (const [from, to] of recolorMap) s = s.replace(new RegExp(from, "gi"), to);
  return s;
}

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: "inherit", env: { ...process.env, PUPPETEER_SKIP_DOWNLOAD: "true" } });
}

function stage() {
  mkdirSync(`${SVG}/wait`, { recursive: true });
  mkdirSync(`${SVG}/left_ptr_watch`, { recursive: true });
  const src = here("../src/svg/modern");
  for (const f of readdirSync(src).filter((f) => f.endsWith(".svg"))) {
    writeFileSync(`${SVG}/${f}`, applyRecolor(readFileSync(`${src}/${f}`, "utf8")));
  }
  for (let i = 0; i < FRAMES; i++) {
    writeFileSync(`${SVG}/wait/wait-${pad(i)}.svg`, waitFrame(i));
    writeFileSync(`${SVG}/left_ptr_watch/left_ptr_watch-${pad(i)}.svg`, progressFrame(i));
  }
}

function fresh(dir) {
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
}

function build() {
  run(cbmp, ["-d", SVG, "-o", BITMAPS, "-bc", cbmpColors.bc, "-oc", cbmpColors.oc, "-wc", cbmpColors.wc]);
  const cfg = here("../src/configs");
  fresh(`${X}/Fadetouched-Modern`);
  run("ctgen", [`${cfg}/x.build.toml`, "-d", BITMAPS, "-n", "Fadetouched-Modern", "-o", X, "-p", "x11"]);
  fresh(`${WIN}/Fadetouched-Modern-Windows`);
  run("ctgen", [`${cfg}/win_rg.build.toml`, "-d", BITMAPS, "-n", "Fadetouched-Modern", "-o", WIN, "-p", "windows"]);
}

function dist() {
  const distRoot = here("../dist");
  const distWin = `${distRoot}/Fadetouched-Modern-Windows`;
  mkdirSync(distWin, { recursive: true });
  const winSrc = `${WIN}/Fadetouched-Modern-Windows`;
  for (const f of readdirSync(winSrc)) copyFileSync(`${winSrc}/${f}`, `${distWin}/${f}`);
  run("tar", ["-czf", `${distRoot}/Fadetouched-Modern-XCursor.tar.gz`, "-C", X, "Fadetouched-Modern"]);
}

function contactSheet() {
  const statics = readdirSync(BITMAPS).filter((f) => f.endsWith(".png") && !/-\d\d\.png$/.test(f));
  const sample = ["wait-18.png", "left_ptr_watch-18.png"].filter((f) => existsSync(`${BITMAPS}/${f}`));
  const files = [...statics, ...sample].map((f) => `${BITMAPS}/${f}`);
  run("montage", [...files, "-tile", "8x", "-geometry", "64x64+4+4", "-background", "#888888", `${OUT}/_contact.png`]);
}

stage();
build();
dist();
try {
  contactSheet();
} catch {
  console.log("contact sheet skipped (montage unavailable)");
}
console.log("cursor build done:", OUT);
