import { hexToRgb } from "../lib/color.mjs";

export const label = "Mintty";

export default function render(ctx) {
  const { meta, sem, ansi } = ctx;
  const dec = (hex) => hexToRgb(hex).map((c) => Math.round(c * 255)).join(",");
  const kv = (key, value) => `${key}=${dec(value)}`;

  const out = [
    `# ${meta.name}. Generated from ${meta.source}. Do not edit by hand.`,
    kv("BackgroundColour", sem.bg),
    kv("ForegroundColour", sem.text),
    kv("CursorColour", sem.cursor),
    kv("Black", ansi.black),
    kv("Red", ansi.red),
    kv("Green", ansi.green),
    kv("Yellow", ansi.yellow),
    kv("Blue", ansi.blue),
    kv("Magenta", ansi.magenta),
    kv("Cyan", ansi.cyan),
    kv("White", ansi.white),
    kv("BoldBlack", ansi.brightBlack),
    kv("BoldRed", ansi.brightRed),
    kv("BoldGreen", ansi.brightGreen),
    kv("BoldYellow", ansi.brightYellow),
    kv("BoldBlue", ansi.brightBlue),
    kv("BoldMagenta", ansi.brightMagenta),
    kv("BoldCyan", ansi.brightCyan),
    kv("BoldWhite", ansi.brightWhite),
    ``,
  ].join("\n");

  return [{ path: `ports/mintty/${meta.slug}.minttyrc`, content: out }];
}
