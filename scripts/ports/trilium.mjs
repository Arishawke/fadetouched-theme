export const label = "Trilium";

export default function render(ctx) {
  const { meta, sem } = ctx;
  const alpha = (hex, aa) => hex + aa;
  const imp = (v) => `${v} !important`;

  const block = [
    ["--theme-style", "dark"],
    ["--mermaid-theme", "dark"],

    ["--main-background-color", imp(sem.bg)],
    ["--main-text-color", imp(sem.text)],
    ["--main-border-color", imp(sem.border)],
    ["--second-border-color", imp(sem["border-strong"])],
    ["--bs-border-color", imp(sem.border)],
    ["--gutter-color", sem.surface],
    ["--accented-background-color", imp(sem["surface-hover"])],
    ["--more-accented-background-color", sem["surface-hover"]],

    ["--button-background-color", "transparent"],
    ["--button-border-color", sem.border],
    ["--button-text-color", "currentColor"],
    ["--button-disabled-text-color", sem["text-faint"]],
    ["--primary-button-background-color", alpha(sem.accent, "4d")],
    ["--primary-button-text-color", sem.text],
    ["--primary-button-border-color", "transparent"],

    ["--muted-text-color", sem["text-muted"]],

    ["--input-text-color", sem.text],
    ["--input-background-color", sem.surface],
    ["--input-hover-background", imp(sem["surface-hover"])],
    ["--input-focus-background", imp(sem["surface-hover"])],
    ["--input-focus-outline-color", sem.accent],

    ["--hover-item-text-color", sem.text],
    ["--hover-item-background-color", sem["surface-hover"]],
    ["--hover-item-border-color", sem.border],
    ["--active-item-text-color", sem.text],
    ["--active-item-background-color", alpha(sem.accent, "33")],
    ["--active-item-border-color", "transparent"],

    ["--menu-text-color", sem.text],
    ["--menu-background-color", sem.popover],
    ["--tooltip-background-color", sem.popover],
    ["--modal-background-color", sem.surface],
    ["--modal-backdrop-color", alpha(sem["bg-sunken"], "cc")],
    ["--dropdown-border-color", sem["border-strong"]],

    ["--left-pane-background-color", imp(sem["bg-dim"])],
    ["--left-pane-text-color", imp(sem["text-muted"])],
    ["--left-pane-item-action-button-background", imp(sem["surface-active"])],
    ["--left-pane-item-action-button-color", imp(sem.text)],
    ["--right-pane-li-hover-background", sem["surface-hover"]],

    ["--launcher-pane-background-color", imp(sem["bg-sunken"])],
    ["--launcher-pane-text-color", imp(sem["text-subtle"])],

    ["--new-tab-button-color", sem["text-subtle"]],
    ["--new-tab-button-hover-background", sem["surface-hover"]],
    ["--new-tab-button-hover-color", sem.text],
    ["--tab-close-button-hover-background", sem.error],
    ["--tab-close-button-hover-color", sem.text],
    ["--active-tab-background-color", sem.surface],
    ["--active-tab-hover-background-color", sem.surface],
    ["--active-tab-text-color", sem.text],
    ["--inactive-tab-background-color", "transparent"],
    ["--inactive-tab-hover-background-color", sem.surface],
    ["--inactive-tab-text-color", sem["text-subtle"]],

    ["--scrollbar-thumb-color", sem.border],
    ["--scrollbar-thumb-hover-color", sem["border-strong"]],
    ["--scrollbar-background-color", sem["bg-dim"]],

    ["--link-color", sem.link],
  ];

  const tail = [
    `::-webkit-scrollbar-thumb { background-color: ${sem.border} !important; border-color: ${sem.surface} !important; }`,
    `::selection { background-color: ${alpha(sem.link, "55")}; }`,
    `a { color: var(--link-color); }`,
    `span.fancytree-title { color: var(--main-text-color) !important; }`,
  ];

  const lines = [
    `/* ${meta.name}. Generated from ${meta.source}. Do not edit by hand. */`,
    `/* TriliumNext Next theme. Note attributes: #appTheme=${meta.name} #appThemeBase=next-dark */`,
    `body {`,
    ...block.map(([k, v]) => `  ${k}: ${v};`),
    `}`,
    ``,
    ...tail,
    ``,
  ];

  return [{ path: `ports/trilium/${meta.slug}.css`, content: lines.join("\n") }];
}
