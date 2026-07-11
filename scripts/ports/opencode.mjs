import { hexToRgb, rgbToHex } from "../lib/color.mjs";

export const label = "OpenCode";

const tone = (name) => ({ dark: name, light: name });
const DIFF_TINT = 0.1;
const tint = (base, overlay, amount) => {
  const baseRgb = hexToRgb(base);
  const overlayRgb = hexToRgb(overlay);
  return rgbToHex(baseRgb.map((channel, index) => channel + (overlayRgb[index] - channel) * amount));
};

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
    ftElement: sem.surface,
    ftBorder: sem.border,
    ftBorderActive: sem["border-strong"],
    ftBorderSubtle: n.n4,
    ftDiffAddedBg: tint(sem.bg, sem.success, DIFF_TINT),
    ftDiffRemovedBg: tint(sem.bg, sem.error, DIFF_TINT),
    ftDiffAddedLineBg: tint(sem["bg-dim"], sem.success, DIFF_TINT),
    ftDiffRemovedLineBg: tint(sem["bg-dim"], sem.error, DIFF_TINT),
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
    diffLineNumber: tone("ftTextSubtle"),
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
