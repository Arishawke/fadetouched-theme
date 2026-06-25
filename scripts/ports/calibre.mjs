export const label = "Calibre";

export default function render(ctx) {
  const { meta, sem } = ctx;

  const palette = {
    Window: sem.bg,
    WindowText: sem.text,
    "WindowText-disabled": sem["text-faint"],
    Base: sem["bg-dim"],
    Text: sem.text,
    "Text-disabled": sem["text-faint"],
    AlternateBase: sem.surface,
    Button: sem.surface,
    ButtonText: sem.text,
    "ButtonText-disabled": sem["text-faint"],
    BrightText: sem.text,
    "BrightText-disabled": sem["text-faint"],
    ToolTipBase: sem.popover,
    ToolTipText: sem.text,
    "ToolTipText-disabled": sem["text-faint"],
    PlaceholderText: sem["text-subtle"],
    "PlaceholderText-disabled": sem["text-faint"],
    Highlight: sem.accent,
    HighlightedText: sem.bg,
    "HighlightedText-disabled": sem["bg-dim"],
    Accent: sem.accent,
    Link: sem.link,
    LinkVisited: sem["link-visited"],
  };

  const data = {
    dark: { palette, use_custom: true },
    light: { palette: {}, use_custom: false },
  };

  const content = JSON.stringify(data, null, 2) + "\n";
  return [{ path: `ports/calibre/${meta.name}.calibre-palette`, content }];
}
