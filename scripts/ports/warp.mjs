export const label = "Warp";

export default function render(ctx) {
  const { meta, sem, ansi } = ctx;
  const palette = (colors) => Object.entries(colors)
    .map(([name, value]) => `    ${name}: '${value}'`)
    .join("\n");
  const normal = {
    black: ansi.black,
    red: ansi.red,
    green: ansi.green,
    yellow: ansi.yellow,
    blue: ansi.blue,
    magenta: ansi.magenta,
    cyan: ansi.cyan,
    white: ansi.white,
  };
  const bright = {
    black: ansi.brightBlack,
    red: ansi.brightRed,
    green: ansi.brightGreen,
    yellow: ansi.brightYellow,
    blue: ansi.brightBlue,
    magenta: ansi.brightMagenta,
    cyan: ansi.brightCyan,
    white: ansi.brightWhite,
  };
  const content = `name: ${meta.name}
accent: '${sem.accent}'
cursor: '${sem.cursor}'
background: '${sem.bg}'
foreground: '${sem.text}'
details: darker
terminal_colors:
  normal:
${palette(normal)}
  bright:
${palette(bright)}
`;

  return [{ path: `ports/warp/${meta.slug}.yaml`, content }];
}
