import { hexToRgb } from "../lib/color.mjs";

export const label = "KDE Plasma";

const rgb = (hex) => hexToRgb(hex).map((c) => Math.round(c * 255)).join(",");

export default function render(ctx) {
  const { meta, sem } = ctx;

  const fg = {
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

  const fgSelection = {
    ...fg,
    ForegroundNormal: sem.bg,
    ForegroundInactive: sem.bg,
    ForegroundActive: sem.bg,
    ForegroundLink: sem.bg,
    ForegroundVisited: sem.bg,
  };

  const set = (bgNormal, bgAlt, roles) => [
    `BackgroundNormal=${rgb(bgNormal)}`,
    `BackgroundAlternate=${rgb(bgAlt)}`,
    ...Object.entries(roles).map(([k, v]) => `${k}=${rgb(v)}`),
  ];

  const section = (header, lines) => [`[${header}]`, ...lines, ``];

  const out = [
    `# ${meta.name}. Generated from palette.json. Do not edit by hand.`,
    ``,
    ...section("General", [
      `ColorScheme=${meta.name}`,
      `Name=${meta.name}`,
      `shadeSortColumn=true`,
    ]),
    ...section("KDE", [`contrast=4`]),
    ...section("Colors:Window", set(sem.bg, sem.surface, fg)),
    ...section("Colors:View", set(sem["bg-dim"], sem.bg, fg)),
    ...section("Colors:Button", set(sem.surface, sem["surface-hover"], fg)),
    ...section("Colors:Selection", set(sem.accent, sem["border-strong"], fgSelection)),
    ...section("Colors:Tooltip", set(sem.surface, sem.bg, fg)),
    ...section("Colors:Complementary", set(sem.bg, sem["bg-dim"], fg)),
    ...section("Colors:Header", set(sem["bg-dim"], sem.bg, fg)),
    ...section("Colors:Header][Inactive", set(sem["bg-dim"], sem.bg, {
      ...fg,
      ForegroundNormal: sem["text-subtle"],
    })),
    ...section("WM", [
      `activeBackground=${rgb(sem["bg-dim"])}`,
      `activeForeground=${rgb(sem.text)}`,
      `activeBlend=${rgb(sem.text)}`,
      `inactiveBackground=${rgb(sem["bg-sunken"])}`,
      `inactiveForeground=${rgb(sem["text-subtle"])}`,
      `inactiveBlend=${rgb(sem["text-subtle"])}`,
    ]),
    ...section("ColorEffects:Disabled", [
      `Color=56,56,56`,
      `ColorAmount=0`,
      `ColorEffect=0`,
      `ContrastAmount=0.65`,
      `ContrastEffect=1`,
      `IntensityAmount=0.1`,
      `IntensityEffect=2`,
    ]),
    ...section("ColorEffects:Inactive", [
      `ChangeSelectionColor=true`,
      `Color=112,111,110`,
      `ColorAmount=0.025`,
      `ColorEffect=2`,
      `ContrastAmount=0.1`,
      `ContrastEffect=2`,
      `Enable=false`,
      `IntensityAmount=0`,
      `IntensityEffect=0`,
    ]),
  ].join("\n");

  return [{ path: "ports/kde-plasma/Fadetouched.colors", content: out }];
}
