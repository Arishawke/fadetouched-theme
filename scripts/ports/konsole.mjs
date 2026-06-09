import { hexToRgb } from "../lib/color.mjs";

export const label = "Konsole";

const rgb = (hex) => hexToRgb(hex).map((c) => Math.round(c * 255)).join(",");

export default function render(ctx) {
  const { meta, sem, ansi } = ctx;
  const section = (name, hex) => [`[${name}]`, `Color=${rgb(hex)}`, ``];

  const slots = [
    ["black", "brightBlack"],
    ["red", "brightRed"],
    ["green", "brightGreen"],
    ["yellow", "brightYellow"],
    ["blue", "brightBlue"],
    ["magenta", "brightMagenta"],
    ["cyan", "brightCyan"],
    ["white", "brightWhite"],
  ];

  const out = [
    `# ${meta.name}. Generated from ${meta.source}. Do not edit by hand.`,
    ``,
    ...section("Background", sem.bg),
    ...section("Foreground", sem.text),
    ...slots.flatMap(([base, bright], i) => [
      ...section(`Color${i}`, ansi[base]),
      ...section(`Color${i}Intense`, ansi[bright]),
    ]),
    `[General]`,
    `Description=${meta.name}`,
    `Opacity=1`,
    `ColorRandomization=false`,
    ``,
  ].join("\n");

  const profile = [
    `# ${meta.name}. Generated from ${meta.source}. Do not edit by hand.`,
    ``,
    `[Appearance]`,
    `ColorScheme=${meta.name}`,
    ``,
    `[Cursor Options]`,
    `CustomCursorColor=${rgb(sem.cursor)}`,
    `UseCustomCursorColor=true`,
    ``,
    `[General]`,
    `Name=${meta.name}`,
    `Parent=FALLBACK/`,
    ``,
  ].join("\n");

  return [
    { path: `ports/konsole/${meta.name}.colorscheme`, content: out },
    { path: `ports/konsole/${meta.name}.profile`, content: profile },
  ];
}
