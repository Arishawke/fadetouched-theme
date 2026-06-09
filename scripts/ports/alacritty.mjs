export const label = "Alacritty";

export default function render(ctx) {
  const { meta, sem, ansi } = ctx;
  const q = (hex) => `"${hex}"`;

  const out = [
    `# ${meta.name}. Generated from ${meta.source}. Do not edit by hand.`,
    ``,
    `[colors.primary]`,
    `background = ${q(sem.bg)}`,
    `foreground = ${q(sem.text)}`,
    ``,
    `[colors.cursor]`,
    `text = ${q(sem.bg)}`,
    `cursor = ${q(sem.cursor)}`,
    ``,
    `[colors.selection]`,
    `text = "CellForeground"`,
    `background = ${q(sem["border-strong"])}`,
    ``,
    `[colors.normal]`,
    `black = ${q(ansi.black)}`,
    `red = ${q(ansi.red)}`,
    `green = ${q(ansi.green)}`,
    `yellow = ${q(ansi.yellow)}`,
    `blue = ${q(ansi.blue)}`,
    `magenta = ${q(ansi.magenta)}`,
    `cyan = ${q(ansi.cyan)}`,
    `white = ${q(ansi.white)}`,
    ``,
    `[colors.bright]`,
    `black = ${q(ansi.brightBlack)}`,
    `red = ${q(ansi.brightRed)}`,
    `green = ${q(ansi.brightGreen)}`,
    `yellow = ${q(ansi.brightYellow)}`,
    `blue = ${q(ansi.brightBlue)}`,
    `magenta = ${q(ansi.brightMagenta)}`,
    `cyan = ${q(ansi.brightCyan)}`,
    `white = ${q(ansi.brightWhite)}`,
    ``,
  ].join("\n");

  return [{ path: `ports/alacritty/${meta.slug}.toml`, content: out }];
}
