import { hexToRgb } from "../lib/color.mjs";

export const label = "ShareX";

const rgb = (hex) => hexToRgb(hex).map((c) => Math.round(c * 255)).join(", ");

export default function render(ctx) {
  const { meta, n, sem } = ctx;

  const theme = {
    Name: meta.name,
    BackgroundColor: rgb(sem.bg),
    LightBackgroundColor: rgb(sem.surface),
    DarkBackgroundColor: rgb(sem["bg-dim"]),
    TextColor: rgb(sem.text),
    BorderColor: rgb(n.n7),
    CheckerColor: rgb(sem.bg),
    CheckerColor2: rgb(sem["bg-dim"]),
    CheckerSize: 15,
    LinkColor: rgb(sem.link),
    MenuHighlightColor: rgb(n.n5),
    MenuHighlightBorderColor: rgb(n.n9),
    MenuBorderColor: rgb(n.n7),
    MenuCheckBackgroundColor: rgb(n.n5),
    MenuFont: "Segoe UI, 9.75pt",
    ContextMenuFont: "Segoe UI, 9.75pt",
    ContextMenuOpacity: 100,
    SeparatorLightColor: rgb(n.n8),
    SeparatorDarkColor: rgb(n.n7),
  };

  return [
    {
      path: "ports/sharex/fadetouched.json",
      content: JSON.stringify(theme, null, 2) + "\n",
    },
  ];
}
