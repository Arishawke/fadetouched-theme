import { brighten } from "../lib/color.mjs";

export const label = "Zellij";

const NONE = "0";

export default function render(ctx) {
  const { meta, sem, n, accent } = ctx;

  const rgb = (hex) => {
    const h = hex.replace("#", "");
    return `${parseInt(h.slice(0, 2), 16)} ${parseInt(h.slice(2, 4), 16)} ${parseInt(h.slice(4, 6), 16)}`;
  };
  const val = (v) => (v === NONE ? NONE : rgb(v));

  const dark = (hex) => brighten(hex, 0.4, 1.1);

  const emph = [accent.orange, accent.teal, accent.green, accent.purple];
  const emphOnAccent = [n.n0, dark(accent.red), dark(accent.purple), dark(accent.blue)];
  const emphHighlight = [accent.purple, accent.orange, accent.orange, accent.orange];

  const comp = (name, base, background, emphasis) =>
    [
      `        ${name} {`,
      `            base ${val(base)}`,
      `            background ${val(background)}`,
      ...emphasis.map((e, i) => `            emphasis_${i} ${val(e)}`),
      `        }`,
    ].join("\n");

  const players = [
    accent.purple, accent.blue, accent.orange, accent.yellow, accent.teal,
    accent.magenta, accent.red, accent.cyan, accent.indigo, accent.pink,
  ];

  const out = [
    `// ${meta.name}. Generated from ${meta.source}. Do not edit by hand.`,
    `// Copy to CONFIG_DIR/themes/, then set: theme "${meta.slug}"`,
    `themes {`,
    `    ${meta.slug} {`,
    comp("text_unselected", sem.text, sem.bg, emph),
    comp("text_selected", sem.text, sem.surface, emph),
    comp("ribbon_selected", sem.bg, sem.accent, emphOnAccent),
    comp("ribbon_unselected", sem["text-muted"], sem.surface, emph),
    comp("table_title", sem.accent, NONE, emph),
    comp("table_cell_selected", sem.text, sem.surface, emph),
    comp("table_cell_unselected", sem.text, sem.bg, emph),
    comp("list_selected", sem.text, sem.surface, emph),
    comp("list_unselected", sem.text, sem.bg, emph),
    comp("frame_selected", sem.accent, NONE, emph),
    comp("frame_unselected", n.n7, NONE, emph),
    comp("frame_highlight", accent.orange, NONE, emphHighlight),
    comp("exit_code_success", sem.success, NONE, emph),
    comp("exit_code_error", sem.error, NONE, emph),
    [
      `        multiplayer_user_colors {`,
      ...players.map((hex, i) => `            player_${i + 1} ${rgb(hex)}`),
      `        }`,
    ].join("\n"),
    `    }`,
    `}`,
    ``,
  ].join("\n");

  return [{ path: `ports/zellij/${meta.slug}.kdl`, content: out }];
}
