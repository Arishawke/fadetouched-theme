export const label = "Pi";

export default function render(ctx) {
  const { meta, n, accent } = ctx;

  const theme = {
    $schema:
      "https://raw.githubusercontent.com/earendil-works/pi/main/packages/coding-agent/src/modes/interactive/theme/theme-schema.json",
    name: meta.slug,
    vars: { ...n, ...accent },
    colors: {
      accent: "green",
      border: "n5",
      borderAccent: "teal",
      borderMuted: "n4",
      success: "green",
      error: "red",
      warning: "yellow",
      muted: "n10",
      dim: "n8",
      text: "n11",
      thinkingText: "n8",
      selectedBg: "n4",
      userMessageBg: "",
      userMessageText: "n9",
      customMessageBg: "",
      customMessageText: "n10",
      customMessageLabel: "teal",
      toolPendingBg: "",
      toolSuccessBg: "",
      toolErrorBg: "",
      toolTitle: "teal",
      toolOutput: "n8",
      mdHeading: "green",
      mdLink: "blue",
      mdLinkUrl: "n8",
      mdCode: "n11",
      mdCodeBlock: "n11",
      mdCodeBlockBorder: "n5",
      mdQuote: "n9",
      mdQuoteBorder: "n6",
      mdHr: "n5",
      mdListBullet: "teal",
      toolDiffAdded: "green",
      toolDiffRemoved: "red",
      toolDiffContext: "n8",
      syntaxComment: "n7",
      syntaxKeyword: "purple",
      syntaxFunction: "blue",
      syntaxVariable: "n11",
      syntaxString: "green",
      syntaxNumber: "orange",
      syntaxType: "yellow",
      syntaxOperator: "cyan",
      syntaxPunctuation: "n9",
      thinkingOff: "n5",
      thinkingMinimal: "n7",
      thinkingLow: "blue",
      thinkingMedium: "cyan",
      thinkingHigh: "purple",
      thinkingXhigh: "magenta",
      bashMode: "orange",
    },
    export: {
      pageBg: n.n2,
      cardBg: n.n3,
      infoBg: n.n4,
    },
  };

  return [
    {
      path: `ports/pi/${meta.slug}.json`,
      content: JSON.stringify(theme, null, 2) + "\n",
    },
  ];
}
