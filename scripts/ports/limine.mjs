export const label = "Limine";

const bare = (hex) => hex.replace("#", "");
const palette = (names, ansi) => names.map((n) => bare(ansi[n])).join(";");

export default function render(ctx) {
  const { meta, sem, ansi } = ctx;

  const normal = palette(
    ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"],
    ansi,
  );
  const bright = palette(
    [
      "brightBlack", "brightRed", "brightGreen", "brightYellow",
      "brightBlue", "brightMagenta", "brightCyan", "brightWhite",
    ],
    ansi,
  );

  const out = [
    `# ${meta.name}. Generated from palette.json. Do not edit by hand.`,
    `# Global color keys: merge these into your limine.conf.`,
    `term_palette: ${normal}`,
    `term_palette_bright: ${bright}`,
    `term_background: 00${bare(sem.bg)}`,
    `term_foreground: ${bare(sem.text)}`,
    ``,
  ].join("\n");

  return [{ path: "ports/limine/fadetouched.conf", content: out }];
}
