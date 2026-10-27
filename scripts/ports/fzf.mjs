export const label = "fzf";

export default function render(ctx) {
  const { meta, sem, accent } = ctx;
  const colors = {
    fg: sem.text,
    bg: sem.bg,
    "preview-fg": sem.text,
    "preview-bg": sem["bg-dim"],
    hl: accent.teal,
    "fg+": sem.text,
    "bg+": sem["surface-hover"],
    gutter: sem.bg,
    "hl+": accent.cyan,
    info: sem["text-subtle"],
    border: sem.border,
    prompt: sem.accent,
    pointer: sem.cursor,
    marker: accent.yellow,
    spinner: accent.teal,
    header: sem["text-muted"],
  };
  const values = Object.entries(colors).map(([key, value]) => `${key}:${value}`).join(",");

  return [{ path: `ports/fzf/${meta.slug}.fzfrc`, content: `--color=dark,${values}\n` }];
}
