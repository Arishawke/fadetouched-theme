export const label = "Termux";

export default function render(ctx) {
  const { meta, sem, ansi } = ctx;
  const kv = (k, v) => `${k}=${v}`;

  const out = [
    `# ${meta.name}. Generated from ${meta.source}. Do not edit by hand.`,
    kv("background", sem.bg),
    kv("foreground", sem.text),
    kv("cursor", sem.cursor),
    ``,
    `# black`,
    kv("color0", ansi.black),
    kv("color8", ansi.brightBlack),
    `# red`,
    kv("color1", ansi.red),
    kv("color9", ansi.brightRed),
    `# green`,
    kv("color2", ansi.green),
    kv("color10", ansi.brightGreen),
    `# yellow`,
    kv("color3", ansi.yellow),
    kv("color11", ansi.brightYellow),
    `# blue`,
    kv("color4", ansi.blue),
    kv("color12", ansi.brightBlue),
    `# magenta`,
    kv("color5", ansi.magenta),
    kv("color13", ansi.brightMagenta),
    `# cyan`,
    kv("color6", ansi.cyan),
    kv("color14", ansi.brightCyan),
    `# white`,
    kv("color7", ansi.white),
    kv("color15", ansi.brightWhite),
    ``,
  ].join("\n");

  const file = meta.slug === "fadetouched" ? "colors.properties" : `${meta.slug}.properties`;
  return [{ path: `ports/termux/${file}`, content: out }];
}
