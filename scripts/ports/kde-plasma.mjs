import { hexToRgb } from "../lib/color.mjs";

export const label = "KDE Plasma";

const PACKAGE_ID = "com.arishawke.fadetouched";
const rgb = (hex) => hexToRgb(hex).map((channel) => Math.round(channel * 255)).join(",");
const rgba = (hex, alpha = 255) => `${rgb(hex)},${alpha}`;
const positions = ["topleft", "top", "topright", "left", "center", "right", "bottomleft", "bottom", "bottomright"];

function frame(prefix, x, y, { fill, border, fillOpacity = 1, borderOpacity = 1, margin = 6, centerBare = false }) {
  const size = 24;
  const id = (position) => {
    if (!prefix) return position;
    if (centerBare && position === "center") return prefix;
    return `${prefix}-${position}`;
  };
  const cells = {
    topleft: [0, 0, margin, margin],
    top: [margin, 0, size, margin],
    topright: [margin + size, 0, margin, margin],
    left: [0, margin, margin, size],
    center: [margin, margin, size, size],
    right: [margin + size, margin, margin, size],
    bottomleft: [0, margin + size, margin, margin],
    bottom: [margin, margin + size, size, margin],
    bottomright: [margin + size, margin + size, margin, margin],
  };
  return positions.map((position) => {
    const [dx, dy, width, height] = cells[position];
    const outer = position === "center" ? "" : ` stroke="${border}" stroke-width="1" stroke-opacity="${borderOpacity}"`;
    return `<rect id="${id(position)}" x="${x + dx}" y="${y + dy}" width="${width}" height="${height}" fill="${fill}" fill-opacity="${fillOpacity}"${outer}/>`;
  }).join("");
}

function frameSvg(frames, height = 52) {
  const body = frames.map((spec, index) => frame(spec.prefix, 8 + index * 48, 8, spec)).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${Math.max(56, frames.length * 48 + 16)}" height="${height}" viewBox="0 0 ${Math.max(56, frames.length * 48 + 16)} ${height}">${body}</svg>\n`;
}

function simpleSvg(body, width = 64, height = 64) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>\n`;
}

function plasmaMetadata(meta) {
  return `${JSON.stringify({
    KPlugin: {
      Authors: [{ Name: "Arishawke" }],
      Category: "",
      Description: "Atmospheric glass surfaces in the Fadetouched palette",
      EnabledByDefault: false,
      Id: meta.name,
      License: "MIT",
      Name: meta.name,
      Version: "1.1.0",
      Website: "https://github.com/Arishawke/fadetouched-theme",
    },
    "X-Plasma-API": "5.0",
  }, null, 2)}\n`;
}

export function renderColorScheme(ctx) {
  const { meta, sem, n } = ctx;
  const foreground = {
    ForegroundNormal: sem.text,
    ForegroundInactive: sem["text-subtle"],
    ForegroundActive: sem.accent,
    ForegroundLink: sem.link,
    ForegroundVisited: sem["link-visited"],
    ForegroundNegative: sem.error,
    ForegroundNeutral: sem.warning,
    ForegroundPositive: sem.success,
    DecorationFocus: sem.accent,
    DecorationHover: sem.accent,
  };
  const selection = {
    ...foreground,
    ForegroundNormal: sem.bg,
    ForegroundInactive: sem.bg,
    ForegroundActive: sem.bg,
    ForegroundLink: sem.bg,
    ForegroundVisited: sem.bg,
  };
  const set = (background, alternate, roles) => [
    `BackgroundNormal=${rgb(background)}`,
    `BackgroundAlternate=${rgb(alternate)}`,
    ...Object.entries(roles).map(([key, value]) => `${key}=${rgb(value)}`),
  ];
  const section = (header, lines) => [`[${header}]`, ...lines, ""];
  return [
    ...section("General", [`ColorScheme=${meta.name}`, `Name=${meta.name}`, "shadeSortColumn=true"]),
    ...section("KDE", ["contrast=4"]),
    ...section("Colors:Window", set(sem.bg, sem.surface, foreground)),
    ...section("Colors:View", set(sem["bg-dim"], sem.bg, foreground)),
    ...section("Colors:Button", set(sem.surface, sem["surface-hover"], foreground)),
    ...section("Colors:Selection", set(sem.accent, sem["border-strong"], selection)),
    ...section("Colors:Tooltip", set(sem.surface, sem.bg, foreground)),
    ...section("Colors:Complementary", set(sem.bg, sem["bg-dim"], foreground)),
    ...section("Colors:Header", set(sem["bg-dim"], sem.bg, foreground)),
    ...section("Colors:Header][Inactive", set(sem["bg-dim"], sem.bg, { ...foreground, ForegroundNormal: sem["text-subtle"] })),
    ...section("WM", [
      `activeBackground=${rgb(sem["bg-dim"])}`,
      `activeForeground=${rgb(sem.text)}`,
      `activeBlend=${rgb(sem.text)}`,
      `inactiveBackground=${rgb(sem["bg-sunken"])}`,
      `inactiveForeground=${rgb(sem["text-subtle"])}`,
      `inactiveBlend=${rgb(sem["text-subtle"])}`,
    ]),
    ...section("ColorEffects:Disabled", [`Color=${rgb(n.n6)}`, "ColorAmount=0", "ColorEffect=0", "ContrastAmount=0.65", "ContrastEffect=1", "IntensityAmount=0.1", "IntensityEffect=2"]),
    ...section("ColorEffects:Inactive", ["ChangeSelectionColor=true", `Color=${rgb(n.n7)}`, "ColorAmount=0.025", "ColorEffect=2", "ContrastAmount=0.1", "ContrastEffect=2", "Enable=false", "IntensityAmount=0", "IntensityEffect=0"]),
  ].join("\n");
}

function renderAurorae(ctx) {
  const { meta, sem, accent } = ctx;
  const active = { prefix: "decoration", fill: sem["bg-dim"], border: sem.accent, fillOpacity: 0.88, borderOpacity: 0.78 };
  const inactive = { prefix: "decoration-inactive", fill: sem["bg-sunken"], border: sem.border, fillOpacity: 0.82, borderOpacity: 0.7 };
  const opaque = { prefix: "decoration-opaque", fill: sem["bg-dim"], border: sem.accent };
  const opaqueInactive = { prefix: "decoration-opaque-inactive", fill: sem["bg-sunken"], border: sem.border };
  const maximized = { prefix: "decoration-maximized", fill: sem["bg-dim"], border: sem.accent, fillOpacity: 0.95 };
  const mask = `<rect id="mask" x="8" y="8" width="36" height="36" fill="#ffffff"/>`;
  const decoration = frameSvg([active, inactive, opaque, opaqueInactive, maximized]).replace("</svg>", `${mask}</svg>`);
  const states = [
    ["active", sem.text, 0.9],
    ["inactive", sem["text-subtle"], 0.72],
    ["hover", sem.bg, 1],
    ["hover-inactive", sem.bg, 0.9],
    ["pressed", sem.bg, 1],
    ["pressed-inactive", sem.bg, 0.9],
    ["deactivated", sem["text-faint"], 0.45],
    ["deactivated-inactive", sem["text-faint"], 0.35],
  ];
  const button = (icon) => simpleSvg(states.map(([state, color, opacity], index) => {
    const x = 4 + index * 28;
    const background = state.startsWith("hover") ? accent.green : state.startsWith("pressed") ? accent.teal : sem.surface;
    return `<g id="${state}" transform="translate(${x} 4)"><rect width="24" height="24" rx="8" fill="${background}" fill-opacity="${state === "active" || state === "inactive" ? 0.28 : 0.95}" stroke="${state.includes("inactive") ? sem.border : sem["border-strong"]}" stroke-opacity="${opacity}"/><path d="${icon}" fill="none" stroke="${color}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}"/></g>`;
  }).join(""), 232, 32);
  const icons = {
    close: "M7 7l10 10M17 7L7 17",
    minimize: "M7 16h10",
    maximize: "M7 7h10v10H7z",
    restore: "M9 7h8v8M7 9h8v8H7z",
    alldesktops: "M7 12a5 5 0 1 0 10 0 5 5 0 1 0-10 0",
    keepabove: "M7 14l5-5 5 5",
    keepbelow: "M7 10l5 5 5-5",
    shade: "M7 9h10M9 13h6",
    help: "M9 9a3 3 0 1 1 4 3v2M12 17h.01",
    appmenu: "M7 8h10M7 12h10M7 16h10",
  };
  const metadata = [
    "[Desktop Entry]",
    `Name=${meta.name}`,
    "Comment=Atmospheric Fadetouched window decoration",
    `X-KDE-PluginInfo-Name=${meta.name}`,
    "X-KDE-PluginInfo-Author=Arishawke",
    "X-KDE-PluginInfo-Version=1.1.0",
    "X-KDE-PluginInfo-License=MIT",
    "X-KDE-PluginInfo-Website=https://github.com/Arishawke/fadetouched-theme",
    "",
  ].join("\n");
  const config = [
    "[General]",
    "TitleAlignment=Left",
    "TitleVerticalAlignment=Center",
    "Animation=180",
    `ActiveTextColor=${rgba(sem.text)}`,
    `InactiveTextColor=${rgba(sem["text-subtle"], 210)}`,
    "UseTextShadow=true",
    `ActiveTextShadowColor=${rgba(sem["bg-sunken"], 210)}`,
    `InactiveTextShadowColor=${rgba(sem["bg-sunken"], 160)}`,
    "TextShadowOffsetX=0",
    "TextShadowOffsetY=1",
    "LeftButtons=M",
    "RightButtons=IAX",
    "Shadow=true",
    "",
    "[Layout]",
    "BorderLeft=5",
    "BorderRight=5",
    "BorderBottom=5",
    "BorderTop=0",
    "TitleEdgeTop=6",
    "TitleEdgeBottom=6",
    "TitleEdgeLeft=8",
    "TitleEdgeRight=8",
    "TitleBorderLeft=8",
    "TitleBorderRight=8",
    "TitleHeight=30",
    "ButtonWidth=24",
    "ButtonHeight=24",
    "ButtonSpacing=4",
    "ButtonMarginTop=3",
    "PaddingTop=10",
    "PaddingBottom=12",
    "PaddingRight=12",
    "PaddingLeft=12",
    "",
  ].join("\n");
  return [
    { path: `ports/kde-plasma/aurorae/${meta.name}/metadata.desktop`, content: metadata },
    { path: `ports/kde-plasma/aurorae/${meta.name}/${meta.name}rc`, content: config },
    { path: `ports/kde-plasma/aurorae/${meta.name}/decoration.svg`, content: decoration },
    ...Object.entries(icons).map(([name, icon]) => ({ path: `ports/kde-plasma/aurorae/${meta.name}/${name}.svg`, content: button(icon) })),
  ];
}

export default function render(ctx) {
  const { meta, sem, accent } = ctx;
  const glass = { fill: sem["bg-dim"], border: sem["border-strong"], fillOpacity: 0.86, borderOpacity: 0.72 };
  const opaque = { fill: sem["bg-dim"], border: sem["border-strong"] };
  const shadow = { fill: sem["bg-sunken"], border: sem["bg-sunken"], fillOpacity: 0.28, borderOpacity: 0.22 };
  const masks = { fill: "#ffffff", border: "#ffffff" };
  const background = frameSvg([{ prefix: "", ...glass }, { prefix: "shadow", ...shadow }, { prefix: "mask", ...masks }]);
  const opaqueBackground = frameSvg([{ prefix: "", ...opaque }, { prefix: "shadow", ...shadow }, { prefix: "mask", ...masks }]);
  const translucentBackground = frameSvg([{ prefix: "", ...glass, fillOpacity: 0.74 }, { prefix: "shadow", ...shadow }, { prefix: "mask", ...masks }]);
  const button = frameSvg([
    { prefix: "normal", fill: sem.surface, border: sem.border, fillOpacity: 0.72 },
    { prefix: "hover", fill: sem["surface-hover"], border: sem.accent, fillOpacity: 0.88 },
    { prefix: "pressed", fill: sem["surface-active"], border: accent.teal, fillOpacity: 0.96 },
    { prefix: "focus", fill: sem.surface, border: sem.accent, fillOpacity: 0.4 },
    { prefix: "toolbutton-hover", fill: sem["surface-hover"], border: sem.accent, fillOpacity: 0.72 },
    { prefix: "toolbutton-pressed", fill: sem["surface-active"], border: accent.teal, fillOpacity: 0.9 },
    { prefix: "toolbutton-focus", fill: sem.surface, border: sem.accent, fillOpacity: 0.3 },
  ]);
  const tasks = frameSvg(["normal", "focus", "hover", "attention", "minimized"].map((prefix) => ({
    prefix,
    fill: prefix === "attention" ? accent.orange : prefix === "focus" ? sem["surface-active"] : prefix === "hover" ? sem["surface-hover"] : sem.surface,
    border: prefix === "attention" ? accent.yellow : prefix === "focus" ? sem.accent : sem.border,
    fillOpacity: prefix === "normal" || prefix === "minimized" ? 0.2 : 0.72,
    borderOpacity: prefix === "minimized" ? 0.42 : 0.9,
  })));
  const heading = frameSvg([
    { prefix: "header", fill: sem.surface, border: sem["border-strong"], fillOpacity: 0.68 },
    { prefix: "footer", fill: sem.surface, border: sem["border-strong"], fillOpacity: 0.68 },
  ]);
  const containment = frameSvg(["north", "east", "south", "west"].flatMap((direction) => ["", "maxslider", "minslider", "offsetslider"].map((kind) => ({
    prefix: `${direction}${kind ? `-${kind}` : ""}`,
    fill: sem.surface,
    border: kind === "offsetslider" ? accent.teal : sem.accent,
    fillOpacity: 0.88,
  }))), 76);
  const arrows = simpleSvg([
    `<path id="up-arrow" d="M8 13l6-6 6 6" fill="none" stroke="${sem.text}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    `<path id="right-arrow" d="M25 7l6 6-6 6" fill="none" stroke="${sem.text}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    `<path id="down-arrow" d="M40 7l6 6 6-6" fill="none" stroke="${sem.text}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    `<path id="left-arrow" d="M59 7l-6 6 6 6" fill="none" stroke="${sem.text}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
  ].join(""), 68, 26);
  const centerIndicators = `<rect id="horizontal-centerindicator" x="8" y="56" width="20" height="3" rx="1.5" fill="${sem.accent}"/><rect id="vertical-centerindicator" x="32" y="48" width="3" height="20" rx="1.5" fill="${sem.accent}"/>`;
  const styleRoot = `ports/kde-plasma/desktoptheme/${meta.name}`;
  const globalMetadata = `${JSON.stringify({
    KPackageStructure: "Plasma/LookAndFeel",
    KPlugin: {
      Authors: [{ Name: "Arishawke" }],
      Category: "",
      Description: "The complete Fadetouched desktop appearance",
      Id: PACKAGE_ID,
      License: "MIT",
      Name: meta.name,
      Version: "1.1.0",
      Website: "https://github.com/Arishawke/fadetouched-theme",
    },
    Keywords: "Desktop;Workspace;Appearance;Dark;Glass;",
    "X-Plasma-APIVersion": "2",
  }, null, 2)}\n`;
  const defaults = [
    "[kdeglobals][KDE]",
    "widgetStyle=kvantum",
    "",
    "[kdeglobals][General]",
    `ColorScheme=${meta.name}`,
    "",
    "[kdeglobals][Icons]",
    "Theme=breeze-dark",
    "",
    "[plasmarc][Theme]",
    `name=${meta.name}`,
    "",
    "[Wallpaper]",
    `Image=${meta.name}`,
    "",
    "[kcminputrc][Mouse]",
    "cursorTheme=Fadetouched-Modern",
    "",
    "[kwinrc][org.kde.kdecoration2]",
    "library=org.kde.kwin.aurorae.v2",
    `theme=__aurorae__svg__${meta.name}`,
    "",
  ].join("\n");
  const wallpaperMetadata = `${JSON.stringify({
    KPlugin: { Id: meta.name, License: "MIT", Name: `${meta.name} Aurora` },
    "X-KDE-PlasmaImageWallpaper-AccentColor": sem.accent,
  }, null, 2)}\n`;
  const install = `#!/usr/bin/env sh\nset -eu\n\nROOT=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)\nDATA_HOME=\${XDG_DATA_HOME:-"$HOME/.local/share"}\nCONFIG_HOME=\${XDG_CONFIG_HOME:-"$HOME/.config"}\n\ninstall -d "$DATA_HOME/color-schemes" "$DATA_HOME/plasma/desktoptheme/${meta.name}" "$DATA_HOME/plasma/look-and-feel/${PACKAGE_ID}" "$DATA_HOME/aurorae/themes/${meta.name}" "$DATA_HOME/wallpapers/${meta.name}" "$CONFIG_HOME/Kvantum/${meta.name}" "$DATA_HOME/icons"\ninstall -m 0644 "$ROOT/ports/kde-plasma/${meta.name}.colors" "$DATA_HOME/color-schemes/${meta.name}.colors"\ncp -R "$ROOT/ports/kde-plasma/desktoptheme/${meta.name}/." "$DATA_HOME/plasma/desktoptheme/${meta.name}/"\ncp -R "$ROOT/ports/kde-plasma/look-and-feel/${PACKAGE_ID}/." "$DATA_HOME/plasma/look-and-feel/${PACKAGE_ID}/"\ncp -R "$ROOT/ports/kde-plasma/aurorae/${meta.name}/." "$DATA_HOME/aurorae/themes/${meta.name}/"\ncp -R "$ROOT/ports/kde-plasma/wallpapers/${meta.name}/." "$DATA_HOME/wallpapers/${meta.name}/"\ncp -R "$ROOT/ports/kvantum/${meta.name}/." "$CONFIG_HOME/Kvantum/${meta.name}/"\ntar -xzf "$ROOT/ports/cursor/dist/Fadetouched-Modern-XCursor.tar.gz" -C "$DATA_HOME/icons"\n\nprintf '%s\\n' "Installed ${meta.name}. Select it in System Settings, then choose ${meta.name} in Kvantum Manager."\n`;
  const readme = `# Fadetouched for KDE Plasma 6\n\nThis suite includes the ${meta.name} color scheme, atmospheric Plasma Style, Plasma 6 Global Theme, Aurorae window decoration, wallpaper package, Kvantum theme, and the existing Fadetouched cursor. It deliberately keeps Breeze Dark icons until a branded icon theme is ready.\n\n## Install\n\nKvantum with Qt 6 support must be installed first. From the repository root, run:\n\n\`\`\`sh\nsh ports/kde-plasma/install.sh\n\`\`\`\n\nOpen System Settings, choose **Colors & Themes > Global Theme > Fadetouched**, and apply it. Open Kvantum Manager separately, select **Fadetouched**, and enable KWin's Blur effect for the intended glass treatment. Restart open Qt applications after changing the Kvantum theme.\n\nThe installer writes only to \`XDG_DATA_HOME\` and \`XDG_CONFIG_HOME\` user directories. Plasma 6.6 uses Aurorae v2 by default; if that renderer regresses on the target system, the same SVG package can be tested with the legacy \`org.kde.kwin.aurorae\` engine.\n`;
  const colorScheme = renderColorScheme(ctx);
  return [
    { path: `ports/kde-plasma/${meta.name}.colors`, content: colorScheme },
    { path: `${styleRoot}/metadata.json`, content: plasmaMetadata(meta) },
    { path: `${styleRoot}/plasmarc`, content: `[Settings]\nFallbackTheme=default\n\n[Wallpaper]\ndefaultWallpaperTheme=${meta.name}\ndefaultFileSuffix=.png\ndefaultWidth=2560\ndefaultHeight=1440\n\n[ContrastEffect]\nenabled=true\ncontrast=0.28\nintensity=1.35\nsaturation=1.1\n\n[BlurBehindEffect]\nenabled=true\n` },
    { path: `${styleRoot}/colors`, content: colorScheme },
    { path: `${styleRoot}/dialogs/background.svg`, content: background },
    { path: `${styleRoot}/widgets/background.svg`, content: background },
    { path: `${styleRoot}/widgets/panel-background.svg`, content: background },
    { path: `${styleRoot}/widgets/tooltip.svg`, content: background },
    { path: `${styleRoot}/widgets/button.svg`, content: button },
    { path: `${styleRoot}/widgets/tasks.svg`, content: tasks },
    { path: `${styleRoot}/widgets/plasmoidheading.svg`, content: heading },
    { path: `${styleRoot}/widgets/containment-controls.svg`, content: containment.replace("</svg>", `${centerIndicators}</svg>`) },
    { path: `${styleRoot}/widgets/arrows.svg`, content: arrows },
    { path: `${styleRoot}/opaque/dialogs/background.svg`, content: opaqueBackground },
    { path: `${styleRoot}/opaque/widgets/panel-background.svg`, content: opaqueBackground },
    { path: `${styleRoot}/opaque/widgets/tooltip.svg`, content: opaqueBackground },
    { path: `${styleRoot}/translucent/dialogs/background.svg`, content: translucentBackground },
    { path: `${styleRoot}/translucent/widgets/panel-background.svg`, content: translucentBackground },
    { path: `${styleRoot}/translucent/widgets/tooltip.svg`, content: translucentBackground },
    { path: `ports/kde-plasma/look-and-feel/${PACKAGE_ID}/manifest.json`, content: globalMetadata },
    { path: `ports/kde-plasma/look-and-feel/${PACKAGE_ID}/contents/defaults`, content: defaults },
    { path: `ports/kde-plasma/wallpapers/${meta.name}/metadata.json`, content: wallpaperMetadata },
    { path: `ports/kde-plasma/wallpapers/${meta.name}/contents/images/2560x1440.png`, source: "assets/wallpapers/Fadetouched Aurora 1440p.png" },
    { path: "ports/kde-plasma/install.sh", content: install },
    { path: "ports/kde-plasma/README.md", content: readme },
    ...renderAurorae(ctx),
  ];
}
