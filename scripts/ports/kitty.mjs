export const label = "Kitty";

export default function render(ctx) {
  const { meta, sem, ansi } = ctx;
  const pair = (k, v) => `${k} ${v}`;

  const out = [
    `# ${meta.name}. Generated from ${meta.source}. Do not edit by hand.`,
    ``,
    pair("background", sem.bg),
    pair("foreground", sem.text),
    pair("cursor", sem.cursor),
    pair("cursor_text_color", sem.bg),
    pair("selection_background", sem["border-strong"]),
    pair("selection_foreground", sem.text),
    pair("url_color", sem.link),
    ``,
    `# black`,
    pair("color0", ansi.black),
    pair("color8", ansi.brightBlack),
    `# red`,
    pair("color1", ansi.red),
    pair("color9", ansi.brightRed),
    `# green`,
    pair("color2", ansi.green),
    pair("color10", ansi.brightGreen),
    `# yellow`,
    pair("color3", ansi.yellow),
    pair("color11", ansi.brightYellow),
    `# blue`,
    pair("color4", ansi.blue),
    pair("color12", ansi.brightBlue),
    `# magenta`,
    pair("color5", ansi.magenta),
    pair("color13", ansi.brightMagenta),
    `# cyan`,
    pair("color6", ansi.cyan),
    pair("color14", ansi.brightCyan),
    `# white`,
    pair("color7", ansi.white),
    pair("color15", ansi.brightWhite),
    ``,
  ].join("\n");

  return [{ path: `ports/kitty/${meta.slug}.conf`, content: out }];
}
