import { hexToRgb } from "../lib/color.mjs";

export const label = "iTerm2";

export default function render(ctx) {
  const { meta, n, sem, ansi } = ctx;

  const colorDict = (key, hex) => {
    const [r, g, b] = hexToRgb(hex);
    const f = (x) => x.toFixed(8).replace(/0+$/, "").replace(/\.$/, ".0");
    return [
      `\t<key>${key}</key>`,
      `\t<dict>`,
      `\t\t<key>Color Space</key>`,
      `\t\t<string>sRGB</string>`,
      `\t\t<key>Red Component</key>`,
      `\t\t<real>${f(r)}</real>`,
      `\t\t<key>Green Component</key>`,
      `\t\t<real>${f(g)}</real>`,
      `\t\t<key>Blue Component</key>`,
      `\t\t<real>${f(b)}</real>`,
      `\t</dict>`,
    ].join("\n");
  };

  const ansiOrder = [
    ansi.black, ansi.red, ansi.green, ansi.yellow,
    ansi.blue, ansi.magenta, ansi.cyan, ansi.white,
    ansi.brightBlack, ansi.brightRed, ansi.brightGreen, ansi.brightYellow,
    ansi.brightBlue, ansi.brightMagenta, ansi.brightCyan, ansi.brightWhite,
  ];

  const entries = [
    ...ansiOrder.map((hex, i) => colorDict(`Ansi ${i} Color`, hex)),
    colorDict("Background Color", sem.bg),
    colorDict("Foreground Color", sem.text),
    colorDict("Bold Color", sem.text),
    colorDict("Cursor Color", sem.cursor),
    colorDict("Cursor Text Color", sem.bg),
    colorDict("Selection Color", sem["border-strong"]),
    colorDict("Selected Text Color", sem.text),
    colorDict("Link Color", sem.link),
    colorDict("Cursor Guide Color", n.n3),
  ];

  const out = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">`,
    `<plist version="1.0">`,
    `<dict>`,
    ...entries,
    `</dict>`,
    `</plist>`,
    ``,
  ].join("\n");

  return [{ path: `ports/iterm/${meta.slug}.itermcolors`, content: out }];
}
