#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { buildContext, ROOT } from "./lib/palette.mjs";
import { injectReadmeTables } from "./readme.mjs";

import * as swatches from "./swatches.mjs";
import * as zed from "./ports/zed.mjs";
import * as web from "./ports/web.mjs";
import * as vscode from "./ports/vscode.mjs";
import * as base16 from "./ports/base16.mjs";
import * as windowsTerminal from "./ports/windows-terminal.mjs";
import * as iterm from "./ports/iterm.mjs";
import * as alacritty from "./ports/alacritty.mjs";
import * as kitty from "./ports/kitty.mjs";
import * as helix from "./ports/helix.mjs";
import * as neovim from "./ports/neovim.mjs";
import * as firefox from "./ports/firefox.mjs";
import * as konsole from "./ports/konsole.mjs";
import * as termux from "./ports/termux.mjs";
import * as limine from "./ports/limine.mjs";
import * as kdePlasma from "./ports/kde-plasma.mjs";
import * as notepadpp from "./ports/notepad-plus-plus.mjs";
import * as zsh from "./ports/zsh.mjs";
import * as starship from "./ports/starship.mjs";
import * as ao3 from "./ports/ao3.mjs";
import * as ghostty from "./ports/ghostty.mjs";
import * as wezterm from "./ports/wezterm.mjs";
import * as trilium from "./ports/trilium.mjs";
import * as qbittorrent from "./ports/qbittorrent.mjs";
import * as startpage from "./ports/startpage.mjs";
import * as calibre from "./ports/calibre.mjs";
import * as codex from "./ports/codex.mjs";
import * as obsidian from "./ports/obsidian.mjs";
import * as feishin from "./ports/feishin.mjs";
import * as fish from "./ports/fish.mjs";
import * as nushell from "./ports/nushell.mjs";
import * as powershell from "./ports/powershell.mjs";
import * as tmux from "./ports/tmux.mjs";
import * as foot from "./ports/foot.mjs";
import * as mintty from "./ports/mintty.mjs";
import * as preview from "./preview.mjs";

const DARK_PORTS = [
  zed, vscode, base16, windowsTerminal,
  iterm, alacritty, kitty, helix, neovim, firefox,
  konsole, termux, limine, kdePlasma, notepadpp, zsh, starship, ao3,
  ghostty, wezterm, trilium, qbittorrent, startpage, calibre, codex, obsidian, feishin,
  fish, nushell, powershell, tmux, foot, mintty,
  swatches,
];

const dark = buildContext();

let fileCount = 0;
const write = (label, { path, content }) => {
  const abs = join(ROOT, path);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
  fileCount += 1;
  console.log(`  ${label.padEnd(18)} ${path}`);
};

for (const port of DARK_PORTS) {
  for (const output of port.default(dark)) write(port.label, output);
}
for (const output of web.default(dark)) write(web.label, output);
write(preview.label, preview.default(dark));

const readmePath = join(ROOT, "README.md");
writeFileSync(readmePath, injectReadmeTables(dark, readFileSync(readmePath, "utf8")));
fileCount += 1;
console.log(`  ${"README".padEnd(18)} README.md`);

console.log(`\nGenerated ${fileCount} files from palette.json.`);
