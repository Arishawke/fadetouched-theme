export const label = "Foot";

export default function render(ctx) {
  const { meta, sem, ansi } = ctx;
  const bare = (hex) => hex.replace("#", "");
  const kv = (key, value) => `${key}=${bare(value)}`;

  const out = [
    `# ${meta.name}. Generated from ${meta.source}. Do not edit by hand.`,
    `# Include from foot.ini or copy this [colors] section into it.`,
    `[colors]`,
    kv("background", sem.bg),
    kv("foreground", sem.text),
    kv("cursor", sem.cursor),
    kv("selection-background", sem["border-strong"]),
    kv("selection-foreground", sem.text),
    kv("regular0", ansi.black),
    kv("regular1", ansi.red),
    kv("regular2", ansi.green),
    kv("regular3", ansi.yellow),
    kv("regular4", ansi.blue),
    kv("regular5", ansi.magenta),
    kv("regular6", ansi.cyan),
    kv("regular7", ansi.white),
    kv("bright0", ansi.brightBlack),
    kv("bright1", ansi.brightRed),
    kv("bright2", ansi.brightGreen),
    kv("bright3", ansi.brightYellow),
    kv("bright4", ansi.brightBlue),
    kv("bright5", ansi.brightMagenta),
    kv("bright6", ansi.brightCyan),
    kv("bright7", ansi.brightWhite),
    ``,
  ].join("\n");

  return [{ path: `ports/foot/${meta.slug}.ini`, content: out }];
}
