export const label = "WezTerm";

const arr = (hexes) => `[${hexes.map((h) => `"${h}"`).join(", ")}]`;

export default function render(ctx) {
  const { meta, sem, ansi } = ctx;

  const normal = [
    ansi.black, ansi.red, ansi.green, ansi.yellow,
    ansi.blue, ansi.magenta, ansi.cyan, ansi.white,
  ];
  const bright = [
    ansi.brightBlack, ansi.brightRed, ansi.brightGreen, ansi.brightYellow,
    ansi.brightBlue, ansi.brightMagenta, ansi.brightCyan, ansi.brightWhite,
  ];

  const out = [
    `# ${meta.name}. Generated from ${meta.source}. Do not edit by hand.`,
    `[colors]`,
    `foreground = "${sem.text}"`,
    `background = "${sem.bg}"`,
    `cursor_bg = "${sem.cursor}"`,
    `cursor_fg = "${sem.bg}"`,
    `cursor_border = "${sem.cursor}"`,
    `selection_bg = "${sem["border-strong"]}"`,
    `selection_fg = "${sem.text}"`,
    `ansi = ${arr(normal)}`,
    `brights = ${arr(bright)}`,
    ``,
    `[metadata]`,
    `name = "${meta.name}"`,
    ``,
  ].join("\n");

  return [{ path: `ports/wezterm/${meta.slug}.toml`, content: out }];
}
