export const label = "Codex";

export default function render(ctx) {
  const { meta, accent, sem } = ctx;

  const theme = {
    codeThemeId: "codex",
    theme: {
      accent: sem.accent,
      contrast: 60,
      fonts: { code: null, ui: null },
      ink: sem.text,
      opaqueWindows: true,
      semanticColors: {
        diffAdded: sem.success,
        diffRemoved: sem.error,
        skill: accent.purple,
      },
      surface: sem.bg,
    },
    variant: meta.appearance,
  };

  return [
    {
      path: `ports/codex/${meta.slug}.json`,
      content: JSON.stringify(theme, null, 2) + "\n",
    },
    {
      path: `ports/codex/${meta.slug}.codex-theme`,
      content: `codex-theme-v1:${JSON.stringify(theme)}\n`,
    },
  ];
}
