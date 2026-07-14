import { hexToRgb, rgbToHex } from "../lib/color.mjs";

export const label = "OBS Studio";

const mix = (background, foreground, amount) => {
  const bg = hexToRgb(background);
  const fg = hexToRgb(foreground);
  return rgbToHex(bg.map((channel, index) => channel * (1 - amount) + fg[index] * amount));
};

const ramp = (background, accent, thirdIsFill = false) => [
  accent,
  accent,
  thirdIsFill ? mix(background, accent, 0.36) : accent,
  mix(background, accent, 0.36),
  mix(background, accent, 0.27),
  mix(background, accent, 0.18),
];

export default function render(ctx) {
  const { meta, n, accent, sem } = ctx;
  const primary = mix(sem.bg, sem.accent, 0.36);
  const primaryHover = mix(sem.bg, sem.accent, 0.43);
  const primaryDark = mix(sem.bg, sem.accent, 0.27);
  const primaryDeep = mix(sem.bg, sem.accent, 0.18);

  const families = {
    blue: ramp(sem.bg, sem.accent, true),
    red: ramp(sem.bg, accent.red),
    pink: ramp(sem.bg, accent.pink),
    teal: ramp(sem.bg, accent.teal),
    purple: ramp(sem.bg, accent.purple),
    green: ramp(sem.bg, accent.green),
    yellow: ramp(sem.bg, accent.yellow),
  };

  const vars = [
    ...Object.entries(families).flatMap(([name, colors]) =>
      colors.map((color, index) => [`--${name}${index + 1}`, color]),
    ),
    ["--grey1", n.n7],
    ["--grey2", n.n6],
    ["--grey3", n.n5],
    ["--grey4", n.n4],
    ["--grey5", n.n3],
    ["--grey6", n.n2],
    ["--grey7", n.n1],
    ["--grey8", n.n0],
    ["--white1", n.n11],
    ["--white2", n.n10],
    ["--white3", n.n9],
    ["--white4", n.n8],
    ["--white5", n.n7],
    ["--black1", n.n0],
    ["--black2", n.n1],
    ["--black3", n.n2],
    ["--black4", n.n4],
    ["--black5", n.n6],
    ["--ft_accent", sem.accent],
    ["--bg_window", sem["bg-dim"]],
    ["--bg_base", sem.bg],
    ["--bg_preview", sem["bg-sunken"]],
    ["--primary", primary],
    ["--primary_light", primaryHover],
    ["--primary_lighter", sem.accent],
    ["--primary_dark", primaryDark],
    ["--primary_darker", primaryDeep],
    ["--warning", sem.warning],
    ["--danger", sem.error],
    ["--text", sem.text],
    ["--text_light", sem.text],
    ["--text_muted", sem["text-muted"]],
    ["--text_disabled", sem["text-faint"]],
    ["--text_inactive", sem["text-subtle"]],
    ["--highlight_color", sem.accent],
    ["--scrollbar_bg", sem["bg-dim"]],
    ["--scrollbar_handle", sem.surface],
    ["--scrollbar_hover", sem["surface-hover"]],
    ["--scrollbar_down", sem["surface-active"]],
    ["--scrollbar_border", sem.border],
    ["--border_color", sem.border],
    ["--input_bg", sem.surface],
    ["--input_bg_hover", sem["surface-hover"]],
    ["--input_bg_focus", sem["bg-dim"]],
    ["--list_item_bg_selected", primary],
    ["--list_item_bg_hover", primaryHover],
    ["--input_border", sem["border-strong"]],
    ["--input_border_hover", n.n7],
    ["--input_border_focus", sem.accent],
    ["--button_bg", sem.surface],
    ["--button_bg_hover", sem["surface-hover"]],
    ["--button_bg_down", sem["bg-dim"]],
    ["--button_bg_disabled", sem.bg],
    ["--button_border", sem.surface],
    ["--button_border_hover", sem["border-strong"]],
    ["--button_border_focus", sem.accent],
    ["--tab_bg", sem["bg-dim"]],
    ["--tab_bg_hover", sem["surface-hover"]],
    ["--tab_bg_down", primary],
    ["--tab_bg_disabled", sem["bg-dim"]],
    ["--tab_border", sem.border],
    ["--tab_border_hover", sem["border-strong"]],
    ["--tab_border_focus", sem.accent],
    ["--tab_border_selected", sem.accent],
    ["--separator_hover", sem["text-muted"]],
    ["--palette_window", sem["bg-dim"]],
    ["--palette_windowText", sem.text],
    ["--palette_base", sem.bg],
    ["--palette_alternateBase", sem.surface],
    ["--palette_light", sem["surface-active"]],
    ["--palette_mid", sem["bg-dim"]],
    ["--palette_dark", sem["bg-sunken"]],
    ["--palette_shadow", sem["bg-sunken"]],
    ["--palette_highlight", primary],
    ["--palette_highlightedText", sem.text],
    ["--palette_text", sem.text],
    ["--palette_brightText", sem.text],
    ["--palette_link", sem.link],
    ["--palette_linkVisited", sem["link-visited"]],
    ["--palette_button", sem.surface],
    ["--palette_buttonText", sem.text],
    ["--palette_text_active", sem.text],
    ["--palette_text_disabled", sem["text-faint"]],
    ["--palette_text_inactive", sem["text-subtle"]],
    ["--palette_brightText_disabled", sem["text-faint"]],
  ];

  const content = [
    "@OBSThemeMeta {",
    `    name: '${meta.name}';`,
    "    id: 'com.arishawke.Fadetouched';",
    "    extends: 'com.obsproject.Yami';",
    "    author: 'Arishawke';",
    "    dark: 'true';",
    "}",
    "",
    "@OBSThemeVars {",
    ...vars.map(([name, value]) => `    ${name}: ${value};`),
    "}",
    "",
    ".text-bright {",
    "    color: var(--ft_accent);",
    "}",
    "",
    ".btn-monitor.checked:hover {",
    "    background: var(--green4);",
    "}",
    "",
    "VolumeMeter {",
    "    qproperty-backgroundNominalColor: var(--green5);",
    "    qproperty-backgroundWarningColor: var(--yellow5);",
    "    qproperty-backgroundErrorColor: var(--red5);",
    "    qproperty-foregroundNominalColor: var(--green2);",
    "    qproperty-foregroundWarningColor: var(--yellow2);",
    "    qproperty-foregroundErrorColor: var(--red2);",
    "    qproperty-magnitudeColor: var(--black1);",
    "    qproperty-majorTickColor: var(--text);",
    "    qproperty-minorTickColor: var(--grey1);",
    "}",
    "",
  ].join("\n");

  return [{ path: `ports/obs/${meta.name}.ovt`, content }];
}
