export const label = "Ghostty";

export default function render(ctx) {
  const { meta, sem, ansi } = ctx;
  const kv = (k, v) => `${k} = ${v}`;

  const order = [
    ansi.black, ansi.red, ansi.green, ansi.yellow,
    ansi.blue, ansi.magenta, ansi.cyan, ansi.white,
    ansi.brightBlack, ansi.brightRed, ansi.brightGreen, ansi.brightYellow,
    ansi.brightBlue, ansi.brightMagenta, ansi.brightCyan, ansi.brightWhite,
  ];

  const out = [
    `# ${meta.name}. Generated from ${meta.source}. Do not edit by hand.`,
    ``,
    kv("background", sem.bg),
    kv("foreground", sem.text),
    kv("cursor-color", sem.cursor),
    kv("cursor-text", sem.bg),
    kv("selection-background", sem["border-strong"]),
    kv("selection-foreground", sem.text),
    ``,
    ...order.map((hex, i) => kv("palette", `${i}=${hex}`)),
    ``,
  ].join("\n");

  return [{ path: `ports/ghostty/${meta.slug}`, content: out }];
}
