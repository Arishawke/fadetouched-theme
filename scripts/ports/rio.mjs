export const label = "Rio";

export default function render(ctx) {
  const { meta, sem, ansi, accent } = ctx;
  const colors = {
    background: sem.bg,
    foreground: sem.text,
    cursor: sem.cursor,
    "vi-cursor": accent.teal,
    tabs: sem["text-muted"],
    "tabs-active": sem.text,
    bar: sem["bg-dim"],
    split: sem.border,
    "split-active": sem.accent,
    "search-match-background": accent.blue,
    "search-match-foreground": sem.bg,
    "search-focused-match-background": accent.yellow,
    "search-focused-match-foreground": sem.bg,
    "hint-foreground": sem.bg,
    "hint-background": accent.yellow,
    "selection-foreground": sem.text,
    "selection-background": sem["border-strong"],
    black: ansi.black,
    red: ansi.red,
    green: ansi.green,
    yellow: ansi.yellow,
    blue: ansi.blue,
    magenta: ansi.magenta,
    cyan: ansi.cyan,
    white: ansi.white,
    "dim-black": ctx.n.n3,
    "dim-red": ansi.red,
    "dim-green": ansi.green,
    "dim-yellow": ansi.yellow,
    "dim-blue": ansi.blue,
    "dim-magenta": ansi.magenta,
    "dim-cyan": ansi.cyan,
    "dim-white": ctx.n.n8,
    "dim-foreground": sem["text-muted"],
    "light-black": ansi.brightBlack,
    "light-red": ansi.brightRed,
    "light-green": ansi.brightGreen,
    "light-yellow": ansi.brightYellow,
    "light-blue": ansi.brightBlue,
    "light-magenta": ansi.brightMagenta,
    "light-cyan": ansi.brightCyan,
    "light-white": ansi.brightWhite,
    "light-foreground": sem.text,
  };
  const lines = [
    `# ${meta.name}. Generated from ${meta.source}. Do not edit by hand.`,
    `[colors]`,
    ...Object.entries(colors).map(([key, value]) => `${key} = '${value}'`),
    ``,
  ];

  return [{ path: `ports/rio/${meta.slug}.toml`, content: lines.join("\n") }];
}
