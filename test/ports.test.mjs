import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { buildContext, makeResolver, ROOT } from "../scripts/lib/palette.mjs";
import { contrastRatio } from "../scripts/lib/color.mjs";

import * as zed from "../scripts/ports/zed.mjs";
import * as web from "../scripts/ports/web.mjs";
import * as vscode from "../scripts/ports/vscode.mjs";
import * as base16 from "../scripts/ports/base16.mjs";
import * as windowsTerminal from "../scripts/ports/windows-terminal.mjs";
import * as iterm from "../scripts/ports/iterm.mjs";
import * as alacritty from "../scripts/ports/alacritty.mjs";
import * as kitty from "../scripts/ports/kitty.mjs";
import * as helix from "../scripts/ports/helix.mjs";
import * as neovim from "../scripts/ports/neovim.mjs";
import * as firefox from "../scripts/ports/firefox.mjs";
import * as konsole from "../scripts/ports/konsole.mjs";
import * as termux from "../scripts/ports/termux.mjs";
import * as limine from "../scripts/ports/limine.mjs";
import * as kdePlasma from "../scripts/ports/kde-plasma.mjs";
import * as kvantum from "../scripts/ports/kvantum.mjs";
import * as notepadpp from "../scripts/ports/notepad-plus-plus.mjs";
import * as zsh from "../scripts/ports/zsh.mjs";
import * as ao3 from "../scripts/ports/ao3.mjs";
import * as ghostty from "../scripts/ports/ghostty.mjs";
import * as wezterm from "../scripts/ports/wezterm.mjs";
import * as trilium from "../scripts/ports/trilium.mjs";
import * as qbittorrent from "../scripts/ports/qbittorrent.mjs";
import * as startpage from "../scripts/ports/startpage.mjs";
import * as codex from "../scripts/ports/codex.mjs";
import * as opencode from "../scripts/ports/opencode.mjs";
import * as obsidian from "../scripts/ports/obsidian.mjs";
import * as feishin from "../scripts/ports/feishin.mjs";
import * as fish from "../scripts/ports/fish.mjs";
import * as nushell from "../scripts/ports/nushell.mjs";
import * as powershell from "../scripts/ports/powershell.mjs";
import * as tmux from "../scripts/ports/tmux.mjs";
import * as foot from "../scripts/ports/foot.mjs";
import * as mintty from "../scripts/ports/mintty.mjs";
import * as sharex from "../scripts/ports/sharex.mjs";
import * as zellij from "../scripts/ports/zellij.mjs";
import * as obs from "../scripts/ports/obs.mjs";
import * as pi from "../scripts/ports/pi.mjs";
import * as geminiCli from "../scripts/ports/gemini-cli.mjs";
import * as notesnook from "../scripts/ports/notesnook.mjs";
import * as btop from "../scripts/ports/btop.mjs";
import * as sublimeText from "../scripts/ports/sublime-text.mjs";
import * as yazi from "../scripts/ports/yazi.mjs";
import * as bash from "../scripts/ports/bash.mjs";
import * as bat from "../scripts/ports/bat.mjs";
import * as rio from "../scripts/ports/rio.mjs";
import * as cava from "../scripts/ports/cava.mjs";
import * as fzf from "../scripts/ports/fzf.mjs";
import * as eza from "../scripts/ports/eza.mjs";
import * as warp from "../scripts/ports/warp.mjs";

const PORTS = [zed, web, vscode, base16, windowsTerminal, iterm, alacritty, kitty, helix, neovim, firefox, konsole, termux, limine, kdePlasma, kvantum, notepadpp, zsh, ao3, ghostty, wezterm, trilium, qbittorrent, startpage, codex, opencode, obsidian, feishin, fish, nushell, powershell, tmux, foot, mintty, sharex, zellij, obs, pi, geminiCli, notesnook, btop, sublimeText, yazi, bash, bat, rio, cava, fzf, eza, warp];
const ctx = buildContext();

async function loadPort(name) {
  try {
    return await import(`../scripts/ports/${name}.mjs`);
  } catch (error) {
    assert.fail(`missing port module ${name}: ${error.message}`);
  }
}

test("role resolution follows the two-tier references", () => {
  assert.equal(ctx.sem.bg, ctx.meta.base, "bg resolves to the base hex");
  assert.equal(ctx.sem.bg, "#11201e");
  assert.equal(ctx.syn.keyword, ctx.accent.purple, "keyword -> purple");
  assert.equal(ctx.syn.comment, ctx.n.n7, "comment -> text-faint -> n7");
  assert.equal(ctx.syn.punctuation, ctx.n.n9, "punctuation -> text-subtle -> n9");
});

test("resolver throws on an unknown reference", () => {
  const resolve = makeResolver({ neutrals: { n2: "#142624" }, accents: {}, semantic: {} });
  assert.throws(() => resolve("nope"), /Unknown/);
});

test("resolver throws on a cyclic reference", () => {
  const resolve = makeResolver({ neutrals: {}, accents: {}, semantic: { a: "b", b: "a" } });
  assert.throws(() => resolve("a"), /Cyclic/);
});

test("resolver follows semantic->semantic chains", () => {
  const resolve = makeResolver({
    neutrals: { n2: "#142624" },
    accents: {},
    semantic: { bg: "n2", page: "bg" },
  });
  assert.equal(resolve("page"), "#142624");
});

test("ANSI map: black/white from ramp, cyan from teal, brights brighter", () => {
  assert.equal(ctx.ansi.black, ctx.n.n4);
  assert.equal(ctx.ansi.white, ctx.n.n9);
  assert.equal(ctx.ansi.cyan, ctx.accent.teal, "ANSI cyan maps to teal");
  assert.notEqual(ctx.ansi.brightRed, ctx.ansi.red, "bright differs from base");
});

test("every port renders without unresolved tokens", () => {
  for (const port of PORTS) {
    for (const { path, content, source } of port.default(ctx)) {
      if (source) {
        assert.ok(existsSync(join(ROOT, source)), `${path} source does not exist`);
        continue;
      }
      assert.ok(!/undefined|NaN/.test(content), `${path} contains undefined/NaN`);
      assert.ok(content.length > 0, `${path} is empty`);
    }
  }
});

test("all hashed hex colors are well-formed (6 or 8 digits)", () => {
  for (const port of PORTS) {
    for (const { path, content } of port.default(ctx)) {
      if (content === undefined) continue;
      for (const m of content.matchAll(/#[0-9a-fA-F]+\b/g)) {
        const len = m[0].length - 1;
        assert.ok(len === 6 || len === 8, `${path}: bad hex ${m[0]}`);
      }
    }
  }
});

test("JSON ports parse", () => {
  const jsonPorts = [zed, vscode, windowsTerminal, firefox, codex, opencode, sharex, pi, geminiCli, notesnook, sublimeText];
  for (const port of jsonPorts) {
    for (const { path, content } of port.default(ctx).filter((o) => o.path.endsWith(".json"))) {
      assert.doesNotThrow(() => JSON.parse(content), `${path} is not valid JSON`);
    }
  }
});

test("base16 strips the leading # from hex", () => {
  const [{ content }] = base16.default(ctx);
  assert.ok(/base00: "11201e"/.test(content));
  assert.ok(!content.includes('"#'), "base16 hex must not carry a #");
});

test("konsole emits a colorscheme plus a cursor profile", () => {
  const outputs = konsole.default(ctx);
  const scheme = outputs.find((o) => o.path.endsWith(".colorscheme"));
  const profile = outputs.find((o) => o.path.endsWith(".profile"));
  assert.ok(scheme && profile, "both files emitted");
  assert.ok(profile.content.includes("ColorScheme=Fadetouched"), "profile links the scheme");
  assert.ok(profile.content.includes("UseCustomCursorColor=true"), "custom cursor enabled");
  assert.ok(/CustomCursorColor=\d+,\d+,\d+/.test(profile.content), "cursor color is decimal RGB");
});

test("KDE Plasma emits a coordinated Plasma 6 suite", () => {
  const outputs = kdePlasma.default(ctx);
  const paths = new Set(outputs.map((output) => output.path));
  assert.ok(paths.has("ports/kde-plasma/Fadetouched.colors"));
  assert.ok(paths.has("ports/kde-plasma/desktoptheme/Fadetouched/widgets/panel-background.svg"));
  assert.ok(paths.has("ports/kde-plasma/look-and-feel/com.arishawke.fadetouched/contents/defaults"));
  assert.ok(paths.has("ports/kde-plasma/aurorae/Fadetouched/decoration.svg"));
  assert.ok(paths.has("ports/kde-plasma/wallpapers/Fadetouched/contents/images/2560x1440.png"));

  const defaults = outputs.find((output) => output.path.endsWith("contents/defaults")).content;
  assert.ok(defaults.includes("widgetStyle=kvantum"));
  assert.ok(defaults.includes("name=Fadetouched"));
  assert.ok(defaults.includes("theme=__aurorae__svg__Fadetouched"));
  assert.ok(defaults.includes("cursorTheme=Fadetouched-Modern"));

  const metadata = JSON.parse(outputs.find((output) => output.path.endsWith("look-and-feel/com.arishawke.fadetouched/manifest.json")).content);
  assert.equal(metadata.KPackageStructure, "Plasma/LookAndFeel");
  assert.equal(metadata.KPlugin.Id, "com.arishawke.fadetouched");

  const plasmarc = outputs.find((output) => output.path.endsWith("desktoptheme/Fadetouched/plasmarc")).content;
  assert.ok(plasmarc.includes("defaultWallpaperTheme=Fadetouched"));
  assert.ok(plasmarc.includes("defaultFileSuffix=.png"));
});

test("Kvantum emits complete state frames for every configured SVG element", () => {
  const outputs = kvantum.default(ctx);
  const config = outputs.find((output) => output.path.endsWith(".kvconfig")).content;
  const svg = outputs.find((output) => output.path.endsWith(".svg")).content;
  const colors = outputs.find((output) => output.path.endsWith(".colors")).content;
  const elements = new Set([...config.matchAll(/(?:frame|interior)\.element=([^\n]+)/g)].map((match) => match[1].trim()));

  assert.equal(outputs.length, 3);
  assert.ok(config.includes("popup_blurring=true"));
  assert.ok(config.includes("translucent_windows=true"));
  assert.ok(config.includes("[DialogTranslucent]"));
  assert.ok(colors.includes("[Colors:Selection]"));
  for (const element of elements) {
    assert.ok(svg.includes(`id="${element}-normal"`), `${element} has a normal SVG state`);
    assert.ok(svg.includes(`id="${element}-focused"`), `${element} has a focused SVG state`);
    assert.ok(svg.includes(`id="${element}-disabled"`), `${element} has a disabled SVG state`);
  }
});

test("zed port and the Zed-extension theme copy are identical", () => {
  const outputs = zed.default(ctx);
  const portCopy = outputs.find((o) => o.path === "ports/zed/fadetouched.json");
  const themeCopy = outputs.find((o) => o.path === "themes/fadetouched.json");
  assert.equal(portCopy.content, themeCopy.content);
});

test("web port ships a single dark :root block", () => {
  const [{ content }] = web.default(ctx);
  assert.ok(/^:root \{/m.test(content), "dark :root default present");
  assert.ok(content.includes("--ft-n2:#11201e"), "carries the base neutral");
  assert.ok(!content.includes("prefers-color-scheme"), "no light media query");
  assert.ok(!/data-theme/.test(content), "no data-theme override");
});

test("fish theme sets fish_color_* lines with bare hex", () => {
  const [{ path, content }] = fish.default(ctx);
  assert.equal(path, "ports/fish/Fadetouched.theme");
  assert.ok(content.includes("# name: 'Fadetouched'"), "has theme name header");
  assert.ok(
    content.includes(`fish_color_normal ${ctx.sem.text.replace("#", "")}`),
    "normal maps to text as bare hex",
  );
  assert.ok(/^fish_color_command [0-9a-f]{6}$/m.test(content), "command is bare 6-digit hex");
  assert.ok(content.includes("fish_color_selection --background="), "selection uses --background=");
});

test("nushell sets $env.config.color_config with shape keys", () => {
  const [{ path, content }] = nushell.default(ctx);
  assert.equal(path, "ports/nushell/fadetouched.nu");
  assert.ok(content.includes("$env.config.color_config = {"), "assigns color_config");
  assert.ok(content.includes(`background: "${ctx.sem.bg}"`), "background mapped to palette bg");
  assert.ok(content.includes("shape_keyword:"), "has a shape_ key");
});

test("powershell sets PSReadLine colors", () => {
  const [{ path, content }] = powershell.default(ctx);
  assert.equal(path, "ports/powershell/fadetouched.ps1");
  assert.ok(content.includes("Set-PSReadLineOption -Colors @{"), "calls Set-PSReadLineOption");
  assert.ok(new RegExp(`String\\s+= '${ctx.syn.string}'`).test(content), "String token mapped");
  assert.ok(content.includes("[char]0x1b)[48;2;"), "Selection uses ANSI bg escape");
});

test("feishin remaps theme color vars under :root with !important", () => {
  const [{ path, content }] = feishin.default(ctx);
  assert.equal(path, "ports/feishin/fadetouched.css");
  assert.ok(/^:root \{/m.test(content), "scopes :root");
  assert.ok(
    content.includes(`--theme-colors-background: ${ctx.sem.bg} !important;`),
    "background mapped to palette bg",
  );
  assert.ok(content.includes("--theme-colors-primary:"), "primary var present");
  assert.ok(
    content.includes("--theme-scrollbar-handle-background:"),
    "scrollbar var present",
  );
  const decls = content.split("\n").filter((l) => l.trim().startsWith("--theme-"));
  assert.ok(decls.length >= 14, "has the full declaration set");
  assert.ok(decls.every((l) => l.includes("!important")), "every declaration is !important");
});

test("tmux emits a sourceable status theme snippet", async () => {
  const tmux = await loadPort("tmux");
  const [{ path, content }] = tmux.default(ctx);
  assert.equal(path, "ports/tmux/fadetouched.tmux");
  assert.ok(content.includes(`set -g status-style "bg=${ctx.sem.bg},fg=${ctx.sem.text}"`));
  assert.ok(content.includes(`set -g message-style "bg=${ctx.sem.accent},fg=${ctx.sem.bg}"`));
  assert.ok(content.includes(`set -g pane-active-border-style "fg=${ctx.sem.accent}"`));
});

test("foot emits an INI color include", async () => {
  const foot = await loadPort("foot");
  const [{ path, content }] = foot.default(ctx);
  assert.equal(path, "ports/foot/fadetouched.ini");
  assert.ok(/^\[colors\]$/m.test(content), "has colors section");
  assert.ok(content.includes(`background=${ctx.sem.bg.replace("#", "")}`), "background is bare hex");
  assert.ok(content.includes(`foreground=${ctx.sem.text.replace("#", "")}`), "foreground is bare hex");
  assert.ok(content.includes(`regular0=${ctx.ansi.black.replace("#", "")}`), "regular ANSI colors present");
  assert.ok(content.includes(`bright7=${ctx.ansi.brightWhite.replace("#", "")}`), "bright ANSI colors present");
});

test("mintty emits color keys with decimal RGB values", async () => {
  const mintty = await loadPort("mintty");
  const [{ path, content }] = mintty.default(ctx);
  assert.equal(path, "ports/mintty/fadetouched.minttyrc");
  assert.ok(content.includes("BackgroundColour=17,32,30"), "background is decimal RGB");
  assert.ok(content.includes("ForegroundColour=222,225,223"), "foreground is decimal RGB");
  assert.ok(/^Black=\d+,\d+,\d+$/m.test(content), "normal ANSI color keys present");
  assert.ok(/^BoldWhite=\d+,\d+,\d+$/m.test(content), "bright ANSI color keys present");
});

test("sharex emits a theme JSON with decimal RGB strings", async () => {
  const sharex = await loadPort("sharex");
  const [{ path, content }] = sharex.default(ctx);
  assert.equal(path, "ports/sharex/fadetouched.json");

  const payload = JSON.parse(content);
  assert.equal(payload.Name, "Fadetouched");
  assert.equal(payload.BackgroundColor, "17, 32, 30");
  assert.equal(payload.LightBackgroundColor, "31, 45, 41");
  assert.equal(payload.DarkBackgroundColor, "9, 24, 22");
  assert.equal(payload.TextColor, "222, 225, 223");
  assert.equal(payload.BorderColor, "102, 111, 107");
  assert.equal(payload.LinkColor, "125, 170, 207");
  assert.equal(payload.MenuHighlightColor, "62, 73, 69");
  assert.equal(payload.MenuHighlightBorderColor, "151, 157, 152");
  assert.equal(payload.CheckerSize, 15);
  assert.equal(payload.MenuFont, "Segoe UI, 9.75pt");
  assert.equal(payload.ContextMenuOpacity, 100);
});

test("zellij emits a component KDL theme with RGB triplets", async () => {
  const zellij = await loadPort("zellij");
  const [{ path, content }] = zellij.default(ctx);
  assert.equal(path, "ports/zellij/fadetouched.kdl");
  assert.ok(/^themes \{/m.test(content), "wrapped in a themes block");
  assert.ok(content.includes("    fadetouched {"), "theme node named fadetouched");
  assert.ok(content.includes('theme "fadetouched"'), "header shows activation line");

  const triplet = (hex) => {
    const h = hex.replace("#", "");
    return `${parseInt(h.slice(0, 2), 16)} ${parseInt(h.slice(2, 4), 16)} ${parseInt(h.slice(4, 6), 16)}`;
  };
  assert.ok(content.includes(`base ${triplet(ctx.sem.text)}`), "text_unselected base is text");
  assert.ok(content.includes(`background ${triplet(ctx.sem.accent)}`), "ribbon_selected fills with the accent");
  assert.ok(/background 0$/m.test(content), "frames use 0 for terminal-default background");
  assert.ok(/player_10 \d+ \d+ \d+/.test(content), "ten multiplayer colors assigned");
  assert.ok(!/#[0-9a-fA-F]/.test(content), "no hash-hex; colors are RGB triplets");
});

test("OBS emits a readable Yami variant with a complete palette remap", () => {
  const [{ path, content }] = obs.default(ctx);
  assert.equal(path, "ports/obs/Fadetouched.ovt");
  assert.ok(content.includes("extends: 'com.obsproject.Yami';"));
  assert.ok(content.includes("id: 'com.arishawke.Fadetouched';"));
  assert.ok(!content.includes("/*"), "generated OBS config stays comment-free");

  const vars = Object.fromEntries(
    [...content.matchAll(/^\s+(--[a-zA-Z0-9_]+): (#[0-9a-fA-F]{6});$/gm)].map((m) => [m[1], m[2]]),
  );
  for (const name of ["blue", "red", "pink", "teal", "purple", "green", "yellow"]) {
    for (let shade = 1; shade <= 6; shade += 1) {
      assert.ok(vars[`--${name}${shade}`], `${name}${shade} is remapped`);
    }
  }

  assert.equal(vars["--bg_window"], ctx.sem["bg-dim"]);
  assert.equal(vars["--bg_base"], ctx.sem.bg);
  assert.equal(vars["--bg_preview"], ctx.sem["bg-sunken"]);
  assert.equal(vars["--primary_lighter"], ctx.sem.accent);
  assert.equal(vars["--palette_link"], ctx.sem.link);
  assert.equal(vars["--palette_linkVisited"], ctx.sem["link-visited"]);

  for (const background of [
    "--bg_window", "--bg_base", "--input_bg", "--input_bg_hover",
    "--primary", "--primary_light", "--button_bg", "--button_bg_hover",
    "--button_bg_down", "--tab_bg", "--tab_bg_hover", "--tab_bg_down",
  ]) {
    assert.ok(
      contrastRatio(vars["--text"], vars[background]) >= 4.5,
      `text passes AA on ${background}`,
    );
  }
  assert.ok(contrastRatio(vars["--primary_lighter"], vars["--primary_light"]) >= 3);
  assert.ok(contrastRatio(vars["--green2"], vars["--green5"]) >= 3);
  assert.ok(contrastRatio(vars["--yellow2"], vars["--yellow5"]) >= 3);
  assert.ok(contrastRatio(vars["--red2"], vars["--red5"]) >= 3);
});

test("codex emits theme string and palette-matched semantic colors", () => {
  const outputs = codex.default(ctx);
  const json = outputs.find((o) => o.path === "ports/codex/fadetouched.json");
  const themeString = outputs.find((o) => o.path === "ports/codex/fadetouched.codex-theme");
  assert.ok(json && themeString, "both files emitted");

  const payload = JSON.parse(json.content);
  assert.equal(payload.codeThemeId, "codex");
  assert.equal(payload.variant, "dark");
  assert.equal(payload.theme.accent, ctx.sem.accent);
  assert.equal(payload.theme.surface, ctx.sem.bg);
  assert.equal(payload.theme.ink, ctx.sem.text);
  assert.equal(payload.theme.semanticColors.diffAdded, ctx.sem.success);
  assert.equal(payload.theme.semanticColors.diffRemoved, ctx.sem.error);
  assert.equal(payload.theme.semanticColors.skill, ctx.accent.purple);
  assert.equal(themeString.content, `codex-theme-v1:${JSON.stringify(payload)}\n`);
});

test("opencode emits a schema-safe terminal UI theme", () => {
  const [{ path, content }] = opencode.default(ctx);
  assert.equal(path, "ports/opencode/fadetouched.json");

  const payload = JSON.parse(content);
  assert.equal(payload.$schema, "https://opencode.ai/theme.json");
  assert.deepEqual(Object.keys(payload).sort(), ["$schema", "defs", "theme"]);

  assert.equal(payload.defs.ftAccent, ctx.sem.accent);
  assert.equal(payload.defs.ftBase, ctx.sem.bg);
  assert.equal(payload.defs.ftElement, ctx.sem.surface);
  assert.equal(payload.defs.ftText, ctx.sem.text);
  for (const [name, value] of Object.entries(payload.defs)) {
    assert.match(value, /^#[0-9a-f]{6}$/i, `${name} must satisfy OpenCode's hex schema`);
  }

  assert.equal(payload.theme.primary.dark, "ftAccent");
  assert.equal(payload.theme.primary.light, "ftAccent");
  assert.equal(payload.theme.background.dark, "ftBase");
  assert.equal(payload.theme.background.light, "ftBase");
  assert.equal(payload.theme.text.dark, "ftText");
  assert.equal(payload.theme.text.light, "ftText");
  assert.equal(payload.theme.diffAddedBg.dark, "ftDiffAddedBg");
  assert.equal(payload.theme.diffRemovedBg.dark, "ftDiffRemovedBg");
  assert.equal(payload.defs.ftDiffAddedBg, "#1e302a");
  assert.equal(payload.defs.ftDiffRemovedBg, "#232927");
  assert.ok(contrastRatio(payload.defs.ftGreen, payload.defs.ftDiffAddedBg) >= 4.5);
  assert.ok(contrastRatio(payload.defs.ftRed, payload.defs.ftDiffRemovedBg) >= 4.5);
  assert.ok(contrastRatio(payload.defs.ftTextSubtle, payload.defs.ftDiffAddedLineBg) >= 4.5);
  assert.ok(contrastRatio(payload.defs.ftTextSubtle, payload.defs.ftDiffRemovedLineBg) >= 4.5);

  const allowedThemeKeys = new Set([
    "primary", "secondary", "accent", "error", "warning", "success", "info",
    "text", "textMuted", "background", "backgroundPanel", "backgroundElement",
    "border", "borderActive", "borderSubtle", "diffAdded", "diffRemoved",
    "diffContext", "diffHunkHeader", "diffHighlightAdded", "diffHighlightRemoved",
    "diffAddedBg", "diffRemovedBg", "diffContextBg", "diffLineNumber",
    "diffAddedLineNumberBg", "diffRemovedLineNumberBg", "markdownText",
    "markdownHeading", "markdownLink", "markdownLinkText", "markdownCode",
    "markdownBlockQuote", "markdownEmph", "markdownStrong", "markdownHorizontalRule",
    "markdownListItem", "markdownListEnumeration", "markdownImage", "markdownImageText",
    "markdownCodeBlock", "syntaxComment", "syntaxKeyword", "syntaxFunction",
    "syntaxVariable", "syntaxString", "syntaxNumber", "syntaxType", "syntaxOperator",
    "syntaxPunctuation",
  ]);
  assert.deepEqual(Object.keys(payload.theme).sort(), [...allowedThemeKeys].sort());
  for (const [key, value] of Object.entries(payload.theme)) {
    assert.equal(typeof value.dark, "string", `${key}.dark is a string`);
    assert.equal(typeof value.light, "string", `${key}.light is a string`);
  }
  assert.equal(payload.theme.syntaxVariable.dark, "ftText");
  assert.equal(payload.theme.syntaxVariable.light, "ftText");
});

test("obsidian emits theme.css + a valid manifest, dark-scoped", () => {
  const outputs = obsidian.default(ctx);
  const css = outputs.find((o) => o.path === "ports/obsidian/theme.css");
  const manifest = outputs.find((o) => o.path === "ports/obsidian/manifest.json");
  assert.ok(css && manifest, "both files emitted");

  // dark-only: a single .theme-dark block, no light scope
  assert.ok(/^\.theme-dark \{/m.test(css.content), "scopes .theme-dark");
  assert.ok(!css.content.includes(".theme-light"), "no light-mode rules");

  // foundations present and bound to the palette
  assert.ok(css.content.includes("--color-base-00:"), "base ramp present");
  assert.ok(css.content.includes("--accent-h:"), "accent hue present");
  assert.ok(
    css.content.includes(`--background-primary: ${ctx.sem.bg}`),
    "primary bg = palette bg",
  );

  // manifest valid and complete
  const m = JSON.parse(manifest.content);
  assert.equal(m.name, "Fadetouched");
  for (const key of ["version", "minAppVersion", "author", "authorUrl"]) {
    assert.ok(m[key], `manifest has ${key}`);
  }
});

test("pi emits the complete active 51-token theme", () => {
  const [{ path, content }] = pi.default(ctx);
  const theme = JSON.parse(content);
  const required = [
    "accent", "border", "borderAccent", "borderMuted", "success", "error", "warning",
    "muted", "dim", "text", "thinkingText", "selectedBg", "userMessageBg",
    "userMessageText", "customMessageBg", "customMessageText", "customMessageLabel",
    "toolPendingBg", "toolSuccessBg", "toolErrorBg", "toolTitle", "toolOutput",
    "mdHeading", "mdLink", "mdLinkUrl", "mdCode", "mdCodeBlock", "mdCodeBlockBorder",
    "mdQuote", "mdQuoteBorder", "mdHr", "mdListBullet", "toolDiffAdded",
    "toolDiffRemoved", "toolDiffContext", "syntaxComment", "syntaxKeyword",
    "syntaxFunction", "syntaxVariable", "syntaxString", "syntaxNumber", "syntaxType",
    "syntaxOperator", "syntaxPunctuation", "thinkingOff", "thinkingMinimal", "thinkingLow",
    "thinkingMedium", "thinkingHigh", "thinkingXhigh", "bashMode",
  ];

  assert.equal(path, "ports/pi/fadetouched.json");
  assert.deepEqual(Object.keys(theme.colors).sort(), required.sort());
  assert.equal(theme.vars.n2, ctx.sem.bg);
  assert.equal(theme.colors.syntaxKeyword, "purple");
  assert.equal(theme.colors.userMessageBg, "");
  assert.equal(theme.export.pageBg, ctx.sem.bg);
});

test("gemini CLI emits the modern standalone theme shape", () => {
  const [{ path, content }] = geminiCli.default(ctx);
  const theme = JSON.parse(content);

  assert.equal(path, "ports/gemini-cli/fadetouched.json");
  assert.equal(theme.name, "Fadetouched");
  assert.equal(theme.type, "custom");
  assert.equal(theme.background.primary, ctx.sem.bg);
  assert.equal(theme.text.response, ctx.sem.text);
  assert.equal(theme.status.error, ctx.sem.error);
  assert.deepEqual(theme.ui.gradient, [ctx.accent.green, ctx.accent.teal, ctx.accent.blue]);
  assert.ok(contrastRatio(theme.text.primary, theme.background.primary) >= 4.5);
  assert.ok(!Object.hasOwn(theme, "Background"), "legacy flat keys are not emitted");
});

test("notesnook emits every required v1 base variant and color", () => {
  const [{ path, content }] = notesnook.default(ctx);
  const theme = JSON.parse(content);
  const variants = ["primary", "secondary", "disabled", "selected", "error", "success"];
  const colors = [
    "accent", "accentForeground", "paragraph", "background", "border", "heading", "icon",
    "separator", "placeholder", "hover", "backdrop",
  ];

  assert.equal(path, "ports/notesnook/fadetouched.json");
  assert.equal(theme.compatibilityVersion, 1);
  assert.equal(theme.colorScheme, "dark");
  assert.deepEqual(Object.keys(theme.scopes.base).sort(), variants.sort());
  for (const variant of variants) {
    const values = theme.scopes.base[variant];
    assert.deepEqual(Object.keys(values).sort(), colors.sort(), `${variant} has all color roles`);
    assert.ok(Object.values(values).every((value) => /^#[0-9a-f]{6}(?:[0-9a-f]{2})?$/i.test(value)));
  }
  for (const variant of ["primary", "secondary", "selected", "error", "success"]) {
    const values = theme.scopes.base[variant];
    assert.ok(contrastRatio(values.paragraph, values.background) >= 4.5, `${variant} text is AA`);
    assert.ok(contrastRatio(values.placeholder, values.background) >= 4.5, `${variant} placeholder is AA`);
  }
});

test("btop emits all 48 current theme roles", () => {
  const [{ path, content }] = btop.default(ctx);
  const entries = [...content.matchAll(/^theme\[([a-z_]+)\]="(#[0-9a-f]{6})"$/gim)];
  const colors = Object.fromEntries(entries.map((match) => [match[1], match[2]]));

  assert.equal(path, "ports/btop/fadetouched.theme");
  assert.equal(entries.length, 48);
  assert.ok(content.includes(`theme[main_bg]="${ctx.sem.bg}"`));
  assert.ok(content.includes("theme[proc_pause_bg]="));
  assert.ok(content.includes("theme[followed_fg]="));
  for (const [fg, bg] of [
    ["main_fg", "main_bg"],
    ["selected_fg", "selected_bg"],
    ["proc_banner_fg", "proc_pause_bg"],
    ["proc_banner_fg", "proc_follow_bg"],
    ["followed_fg", "followed_bg"],
  ]) {
    assert.ok(contrastRatio(colors[fg], colors[bg]) >= 4.5, `${fg} is readable on ${bg}`);
  }
});

test("sublime text emits editor globals and broad syntax coverage", () => {
  const [{ path, content }] = sublimeText.default(ctx);
  const scheme = JSON.parse(content);
  const scopes = scheme.rules.map((rule) => rule.scope).join(", ");

  assert.equal(path, "ports/sublime-text/Fadetouched.sublime-color-scheme");
  assert.equal(scheme.globals.background, "var(bg)");
  assert.equal(scheme.globals.line_diff_modified, "var(warning)");
  for (const scope of ["comment", "string", "constant.numeric", "keyword", "entity.name", "variable", "invalid"]) {
    assert.ok(scopes.includes(scope), `covers ${scope}`);
  }
});

test("yazi emits a stable flavor and matching TextMate theme", () => {
  const outputs = yazi.default(ctx);
  const flavor = outputs.find((output) => output.path.endsWith("flavor.toml"));
  const tmTheme = outputs.find((output) => output.path.endsWith("tmtheme.xml"));

  assert.ok(flavor && tmTheme, "both Yazi files emitted");
  for (const section of ["app", "mgr", "tabs", "mode", "status", "which", "help", "filetype"]) {
    assert.ok(flavor.content.includes(`[${section}]`), `contains [${section}]`);
  }
  assert.ok(!/^#/m.test(flavor.content), "generated TOML is comment-free");
  assert.ok(tmTheme.content.startsWith("<?xml version="));
  assert.ok(tmTheme.content.includes("<plist version=\"1.0\">"));
  assert.ok(tmTheme.content.includes(`<string>${ctx.sem.bg}</string>`));
  assert.ok(tmTheme.content.includes(`<string>${ctx.syn.keyword}</string>`));
  assert.ok(contrastRatio(ctx.sem.bg, ctx.accent.red) >= 4.5, "error progress label is readable");
  assert.ok(
    flavor.content.includes(`is = "orphan", fg = "${ctx.sem.bg}", bg = "${ctx.accent.red}"`),
    "orphan files define readable foreground and background colors",
  );
});

test("bash emits a truecolor GNU dircolors database", () => {
  const [{ path, content }] = bash.default(ctx);
  assert.equal(path, "ports/bash/fadetouched.dircolors");
  for (const terminal of ["alacritty", "foot*", "rio", "wezterm", "xterm*"]) {
    assert.ok(content.includes(`TERM ${terminal}`), `supports ${terminal}`);
  }
  assert.ok(content.includes("DIR 01;38;2;125;170;207"));
  assert.ok(content.includes("EXEC 01;38;2;150;187;147"));
  assert.ok(content.includes(".tar 38;2;200;122;117"));
});

test("bat reuses the Yazi TextMate syntax theme", () => {
  const [{ path, content }] = bat.default(ctx);
  const yaziTheme = yazi.default(ctx).find((output) => output.path.endsWith("/tmtheme.xml"));
  assert.equal(path, "ports/bat/Fadetouched.tmTheme");
  assert.equal(content, yaziTheme.content);
});

test("Rio emits its documented terminal and interface color keys", () => {
  const [{ path, content }] = rio.default(ctx);
  assert.equal(path, "ports/rio/fadetouched.toml");
  for (const key of ["background", "selection-background", "split-active", "black", "light-white"]) {
    assert.ok(content.includes(`${key} = `), `contains ${key}`);
  }
  assert.ok(contrastRatio(ctx.sem.bg, ctx.accent.blue) >= 4.5, "search match is readable");
  assert.ok(contrastRatio(ctx.sem.bg, ctx.accent.yellow) >= 4.5, "focused search match is readable");
});

test("Cava emits a six-color standalone gradient theme", () => {
  const [{ path, content }] = cava.default(ctx);
  assert.equal(path, "ports/cava/fadetouched");
  assert.ok(content.startsWith("# Fadetouched"));
  assert.ok(content.includes("[color]"));
  assert.ok(content.includes(`background = '${ctx.sem.bg}'`));
  assert.equal([...content.matchAll(/^gradient_color_\d+ =/gm)].length, 6);
});

test("fzf emits a portable defaults file with readable selections", () => {
  const [{ path, content }] = fzf.default(ctx);
  const colors = Object.fromEntries(
    content.trim().replace("--color=dark,", "").split(",").map((entry) => entry.split(":")),
  );

  assert.equal(path, "ports/fzf/fadetouched.fzfrc");
  assert.equal(colors.bg, ctx.sem.bg);
  assert.equal(colors.fg, ctx.sem.text);
  assert.equal(colors["bg+"], ctx.sem["surface-hover"]);
  assert.equal(colors.pointer, ctx.sem.cursor);
  assert.ok(contrastRatio(colors["fg+"], colors["bg+"]) >= 4.5);
});

test("eza emits a native theme for files and metadata", () => {
  const [{ path, content }] = eza.default(ctx);

  assert.equal(path, "ports/eza/theme.yml");
  for (const section of ["filekinds", "perms", "size", "users", "git", "git_repo"]) {
    assert.ok(content.includes(`${section}:`), `contains ${section}`);
  }
  assert.ok(content.includes(`foreground: "${ctx.accent.blue}"`), "directories use blue");
  assert.ok(content.includes(`foreground: "${ctx.accent.green}"`), "executables and additions use green");
  assert.ok(!/^#/m.test(content), "generated YAML is comment-free");
});

test("Warp emits its documented UI and ANSI color structure", () => {
  const [{ path, content }] = warp.default(ctx);

  assert.equal(path, "ports/warp/fadetouched.yaml");
  assert.ok(content.includes(`accent: '${ctx.sem.accent}'`));
  assert.ok(content.includes(`background: '${ctx.sem.bg}'`));
  assert.ok(content.includes("terminal_colors:\n  normal:"));
  assert.equal([...content.matchAll(/^    (?:black|red|green|yellow|blue|magenta|cyan|white):/gm)].length, 16);
  assert.ok(contrastRatio(ctx.sem.text, ctx.sem.bg) >= 4.5);
  assert.ok(!/^#/m.test(content), "generated YAML is comment-free");
});
