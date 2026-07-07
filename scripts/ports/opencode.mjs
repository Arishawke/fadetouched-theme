import { alpha } from "../lib/color.mjs";

export const label = "Opencode";

const tone = (name) => ({ dark: name, light: name });

export default function render(ctx) {
  const { meta, n, accent, sem, syn } = ctx;

  const defs = {
    ftAccent: sem.accent,
    ftPink: sem.cursor,
    ftRed: sem.error,
    ftOrange: accent.orange,
    ftYellow: sem.warning,
    ftGreen: sem.success,
    ftTeal: sem.info,
    ftCyan: accent.cyan,
    ftBlue: accent.blue,
    ftPurple: accent.purple,
    ftText: sem.text,
    ftTextMuted: sem["text-muted"],
    ftTextSubtle: sem["text-subtle"],
    ftBase: sem.bg,
    ftPanel: sem["bg-dim"],
    ftElement: n.n0,
    ftSurface: sem.surface,
    ftBorder: sem.border,
    ftBorderActive: sem["border-strong"],
    ftBorderSubtle: n.n4,
    ftDiffAddedBg: alpha(sem.success, 50),
    ftDiffRemovedBg: alpha(sem.error, 50),
    ftDiffAddedLineBg: alpha(sem.success, 25),
    ftDiffRemovedLineBg: alpha(sem.error, 25),
  };

  const theme = {
    primary: tone("ftAccent"),
    secondary: tone("ftAccent"),
    accent: tone("ftPink"),
    error: tone("ftRed"),
    warning: tone("ftYellow"),
    success: tone("ftGreen"),
    info: tone("ftTeal"),
    text: tone("ftText"),
    textMuted: tone("ftTextMuted"),
    background: tone("ftBase"),
    backgroundPanel: tone("ftPanel"),
    backgroundElement: tone("ftElement"),
    border: tone("ftBorder"),
    borderActive: tone("ftBorderActive"),
    borderSubtle: tone("ftBorderSubtle"),
    diffAdded: tone("ftGreen"),
    diffRemoved: tone("ftRed"),
    diffContext: tone("ftTextSubtle"),
    diffHunkHeader: tone("ftOrange"),
    diffHighlightAdded: tone("ftGreen"),
    diffHighlightRemoved: tone("ftRed"),
    diffAddedBg: tone("ftDiffAddedBg"),
    diffRemovedBg: tone("ftDiffRemovedBg"),
    diffContextBg: tone("ftPanel"),
    diffLineNumber: tone("ftBorderActive"),
    diffAddedLineNumberBg: tone("ftDiffAddedLineBg"),
    diffRemovedLineNumberBg: tone("ftDiffRemovedLineBg"),
    markdownText: tone("ftText"),
    markdownHeading: tone("ftAccent"),
    markdownLink: tone("ftBlue"),
    markdownLinkText: tone("ftCyan"),
    markdownCode: tone("ftGreen"),
    markdownBlockQuote: tone("ftYellow"),
    markdownEmph: tone("ftYellow"),
    markdownStrong: tone("ftOrange"),
    markdownHorizontalRule: tone("ftTextSubtle"),
    markdownListItem: tone("ftBlue"),
    markdownListEnumeration: tone("ftCyan"),
    markdownImage: tone("ftBlue"),
    markdownImageText: tone("ftCyan"),
    markdownCodeBlock: tone("ftText"),
    syntaxComment: { dark: syn.comment, light: syn.comment },
    syntaxKeyword: { dark: syn.keyword, light: syn.keyword },
    syntaxFunction: { dark: syn.function, light: syn.function },
    syntaxVariable: tone("ftText"),
    syntaxString: { dark: syn.string, light: syn.string },
    syntaxNumber: { dark: syn.number, light: syn.number },
    syntaxType: { dark: syn.type, light: syn.type },
    syntaxOperator: { dark: syn.operator, light: syn.operator },
    syntaxPunctuation: { dark: syn.punctuation, light: syn.punctuation },
  };

  const out = {
    $schema: "https://opencode.ai/theme.json",
    defs,
    theme,
  };

  return [{ path: `ports/opencode/${meta.slug}.json`, content: JSON.stringify(out, null, 2) + "\n" }];
}
