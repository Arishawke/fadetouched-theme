export const label = "Windows Terminal";

export default function render(ctx) {
  const { meta, sem, ansi } = ctx;

  const scheme = {
    name: meta.name,
    background: sem.bg,
    foreground: sem.text,
    cursorColor: sem.cursor,
    selectionBackground: sem["border-strong"],
    black: ansi.black,
    red: ansi.red,
    green: ansi.green,
    yellow: ansi.yellow,
    blue: ansi.blue,
    purple: ansi.magenta,
    cyan: ansi.cyan,
    white: ansi.white,
    brightBlack: ansi.brightBlack,
    brightRed: ansi.brightRed,
    brightGreen: ansi.brightGreen,
    brightYellow: ansi.brightYellow,
    brightBlue: ansi.brightBlue,
    brightPurple: ansi.brightMagenta,
    brightCyan: ansi.brightCyan,
    brightWhite: ansi.brightWhite,
  };

  const fragment = {
    $schema: "https://aka.ms/terminal-profiles-schema",
    schemes: [scheme],
  };

  return [
    {
      path: `ports/windows-terminal/${meta.slug}.json`,
      content: JSON.stringify(fragment, null, 2) + "\n",
    },
  ];
}
