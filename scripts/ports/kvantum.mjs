import { renderColorScheme } from "./kde-plasma.mjs";

export const label = "Kvantum";

const positions = ["topleft", "top", "topright", "left", "center", "right", "bottomleft", "bottom", "bottomright"];

function frame(prefix, x, y, { fill, border, fillOpacity = 1, borderOpacity = 1 }) {
  const margin = 5;
  const size = 22;
  const cells = {
    topleft: [0, 0, margin, margin],
    top: [margin, 0, size, margin],
    topright: [margin + size, 0, margin, margin],
    left: [0, margin, margin, size],
    center: [margin, margin, size, size],
    right: [margin + size, margin, margin, size],
    bottomleft: [0, margin + size, margin, margin],
    bottom: [margin, margin + size, size, margin],
    bottomright: [margin + size, margin + size, margin, margin],
  };
  return positions.map((position) => {
    const [dx, dy, width, height] = cells[position];
    const id = position === "center" ? prefix : `${prefix}-${position}`;
    const radius = position === "center" ? " rx=\"6\"" : "";
    return `<rect id="${id}" x="${x + dx}" y="${y + dy}" width="${width}" height="${height}"${radius} fill="${fill}" fill-opacity="${fillOpacity}" stroke="${border}" stroke-width="1" stroke-opacity="${borderOpacity}"/>`;
  }).join("");
}

function section(name, values) {
  return [`[${name}]`, ...Object.entries(values).map(([key, value]) => `${key}=${value}`), ""];
}

export default function render(ctx) {
  const { meta, sem, accent } = ctx;
  const stateStyle = {
    normal: { fill: sem.surface, border: sem.border, fillOpacity: 0.74, borderOpacity: 0.82 },
    focused: { fill: sem["surface-hover"], border: sem.accent, fillOpacity: 0.88 },
    pressed: { fill: sem["surface-active"], border: accent.teal, fillOpacity: 0.96 },
    toggled: { fill: sem.accent, border: accent.teal, fillOpacity: 0.94 },
    disabled: { fill: sem["bg-dim"], border: sem.border, fillOpacity: 0.42, borderOpacity: 0.42 },
  };
  const frameElements = [
    "button", "tbutton", "lineedit", "tab", "tabframe", "tabBarFrame", "common", "group", "itemview", "menu", "menuitem", "menubaritem", "titlebar", "dock", "toolbar", "slider", "progress", "progress-pattern", "scrollbarslider", "scrollbargroove", "tooltip", "window", "window-translucent", "dialog", "dialog-translucent", "focus",
  ];
  const states = ["normal", "focused", "pressed", "toggled", "disabled"];
  const frames = [];
  let frameIndex = 0;
  for (const element of frameElements) {
    for (const state of states) {
      const column = frameIndex % 10;
      const row = Math.floor(frameIndex / 10);
      const style = { ...stateStyle[state] };
      if (element.includes("translucent")) style.fillOpacity *= 0.72;
      if (["window", "dialog", "menu", "tooltip"].some((name) => element.startsWith(name))) style.fillOpacity = Math.min(style.fillOpacity, state === "disabled" ? 0.42 : 0.9);
      if (element === "focus") {
        style.fill = "#000000";
        style.fillOpacity = 0;
        style.border = sem.accent;
      }
      frames.push(frame(`${element}-${state}`, 8 + column * 42, 8 + row * 42, style));
      frameIndex += 1;
    }
  }
  const indicatorY = 568;
  const arrows = ["up", "right", "down", "left"].flatMap((direction, directionIndex) => states.map((state, stateIndex) => {
    const x = 12 + directionIndex * 70 + stateIndex * 13;
    const color = state === "disabled" ? sem["text-faint"] : state === "focused" || state === "toggled" ? sem.accent : sem.text;
    const paths = {
      up: `M${x} ${indicatorY + 9}l5-6 5 6`,
      right: `M${x + 1} ${indicatorY + 2}l6 5-6 5`,
      down: `M${x} ${indicatorY + 3}l5 6 5-6`,
      left: `M${x + 9} ${indicatorY + 2}l-6 5 6 5`,
    };
    return `<path id="arrow-${direction}-${state}" d="${paths[direction]}" fill="none" stroke="${color}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`;
  }));
  const checks = states.flatMap((state, index) => {
    const x = 12 + index * 24;
    const border = state === "focused" || state === "toggled" ? sem.accent : sem["border-strong"];
    const opacity = state === "disabled" ? 0.42 : 1;
    return [
      `<g id="checkbox-${state}" opacity="${opacity}"><rect x="${x}" y="590" width="16" height="16" rx="5" fill="${sem["bg-sunken"]}" stroke="${border}"/><path d="M${x + 3} 598l3 3 7-8" fill="none" stroke="${sem.text}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></g>`,
      `<g id="checkbox-checked-${state}" opacity="${opacity}"><rect x="${x}" y="612" width="16" height="16" rx="5" fill="${sem.accent}" stroke="${accent.teal}"/><path d="M${x + 3} 620l3 3 7-8" fill="none" stroke="${sem.bg}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></g>`,
      `<g id="radio-${state}" opacity="${opacity}"><circle cx="${x + 8}" cy="642" r="8" fill="${sem["bg-sunken"]}" stroke="${border}"/><circle cx="${x + 8}" cy="642" r="3.5" fill="${state === "normal" ? sem["text-faint"] : sem.accent}"/></g>`,
      `<g id="radio-checked-${state}" opacity="${opacity}"><circle cx="${x + 8}" cy="664" r="8" fill="${sem["bg-sunken"]}" stroke="${sem.accent}"/><circle cx="${x + 8}" cy="664" r="4" fill="${sem.accent}"/></g>`,
    ];
  });
  const indicators = ["slidercursor", "splitter-grip", "grip", "resize-grip", "sizegrip", "mdi"].flatMap((name, nameIndex) => states.map((state, stateIndex) => {
    const x = 150 + nameIndex * 45 + stateIndex * 8;
    const color = state === "disabled" ? sem["text-faint"] : state === "focused" || state === "toggled" ? sem.accent : sem["border-strong"];
    return `<circle id="${name}-${state}" cx="${x}" cy="610" r="${name === "slidercursor" ? 6 : 3}" fill="${color}"/>`;
  }));
  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="440" height="680" viewBox="0 0 440 680">${frames.join("")}${arrows.join("")}${checks.join("")}${indicators.join("")}</svg>\n`;
  const panel = (element, overrides = {}) => ({
    frame: true,
    "frame.element": element,
    "frame.top": 5,
    "frame.bottom": 5,
    "frame.left": 5,
    "frame.right": 5,
    interior: true,
    "interior.element": element,
    "text.normal.color": sem.text,
    "text.focus.color": sem.text,
    "text.press.color": sem.text,
    "text.toggle.color": sem.bg,
    "text.disabled.color": sem["text-faint"],
    "text.margin": 2,
    ...overrides,
  });
  const config = [
    ...section("%General", {
      author: "Arishawke",
      comment: "Atmospheric Fadetouched glass",
      respect_DE: true,
      composite: true,
      translucent_windows: true,
      blurring: true,
      popup_blurring: true,
      menu_shadow_depth: 7,
      tooltip_shadow_depth: 6,
      menu_blur_radius: 6,
      tooltip_blur_radius: 6,
      reduce_window_opacity: 4,
      reduce_menu_opacity: 3,
      contrast: 1.15,
      intensity: 1.08,
      saturation: 1.05,
      animate_states: true,
      left_tabs: true,
      attach_active_tab: true,
      joined_inactive_tabs: true,
      group_toolbar_buttons: true,
      combo_as_lineedit: true,
      combo_menu: true,
      inline_spin_indicators: true,
      spread_progressbar: true,
      progressbar_thickness: 7,
      spread_menuitems: true,
      transient_scrollbar: true,
      transient_groove: true,
      scroll_arrows: false,
      scroll_width: 12,
      scroll_min_extent: 42,
      slider_width: 6,
      slider_handle_width: 17,
      slider_handle_length: 17,
      splitter_width: 7,
      check_size: 16,
      layout_spacing: 5,
      layout_margin: 6,
      tooltip_delay: -1,
    }),
    ...section("GeneralColors", {
      "window.color": sem["bg-dim"],
      "base.color": sem.bg,
      "alt.base.color": sem.surface,
      "button.color": sem.surface,
      "light.color": sem["surface-hover"],
      "mid.light.color": sem["border-strong"],
      "dark.color": sem["bg-sunken"],
      "mid.color": sem.border,
      "highlight.color": sem.accent,
      "inactive.highlight.color": sem["border-strong"],
      "tooltip.base.color": sem.popover,
      "text.color": sem.text,
      "window.text.color": sem.text,
      "button.text.color": sem.text,
      "disabled.text.color": sem["text-faint"],
      "tooltip.text.color": sem.text,
      "highlight.text.color": sem.bg,
      "link.color": sem.link,
      "link.visited.color": sem["link-visited"],
      "progress.indicator.text.color": sem.bg,
    }),
    ...section("Hacks", { respect_darkness: true, blur_translucent: true, transparent_dolphin_view: false, tint_on_mouseover: 0, no_selection_tint: true }),
    ...section("PanelButtonCommand", panel("button")),
    ...section("PanelButtonTool", { inherits: "PanelButtonCommand" }),
    ...section("ToolbarButton", panel("tbutton")),
    ...section("ToolbarComboBox", panel("tbutton", { "indicator.element": "arrow" })),
    ...section("ToolbarLineEdit", panel("lineedit")),
    ...section("Dock", panel("dock", { frame: false, interior: false })),
    ...section("DockTitle", panel("dock", { frame: false, "text.bold": true })),
    ...section("IndicatorSpinBox", panel("button", { "indicator.element": "arrow", "indicator.size": 10 })),
    ...section("RadioButton", { inherits: "PanelButtonCommand", "interior.element": "radio", "text.shadow": false }),
    ...section("CheckBox", { inherits: "PanelButtonCommand", "interior.element": "checkbox", "text.shadow": false }),
    ...section("Focus", panel("focus", { interior: false, "frame.expansion": 4 })),
    ...section("GenericFrame", panel("common", { interior: false })),
    ...section("LineEdit", panel("lineedit", { "indicator.element": "arrow", "text.margin.left": 5, "text.margin.right": 5 })),
    ...section("DropDownButton", { inherits: "PanelButtonCommand", "indicator.element": "arrow", "indicator.size": 10 }),
    ...section("ToolboxTab", { inherits: "PanelButtonCommand", "text.shadow": false }),
    ...section("Tab", panel("tab", { "text.margin.left": 7, "text.margin.right": 7, "focusFrame": true })),
    ...section("TabFrame", panel("tabframe")),
    ...section("TabBarFrame", panel("tabBarFrame", { interior: false })),
    ...section("TreeExpander", { "indicator.element": "arrow", "indicator.size": 10 }),
    ...section("HeaderSection", panel("button", { "indicator.element": "arrow", "indicator.size": 10 })),
    ...section("SizeGrip", { "indicator.element": "sizegrip", "indicator.size": 14 }),
    ...section("Toolbar", panel("toolbar", { "indicator.element": "grip", "indicator.size": 5 })),
    ...section("Scrollbar", { "indicator.element": "arrow", "indicator.size": 9 }),
    ...section("ScrollbarGroove", panel("scrollbargroove")),
    ...section("ScrollbarSlider", panel("scrollbarslider", { interior: false })),
    ...section("ScrollbarTransientSlider", panel("scrollbarslider", { interior: false })),
    ...section("Slider", panel("slider")),
    ...section("SliderCursor", { "interior.element": "slidercursor" }),
    ...section("Progressbar", panel("progress", { "text.focus.color": sem.bg, "text.bold": true })),
    ...section("ProgressbarContents", panel("progress-pattern", { frame: true })),
    ...section("ItemView", panel("itemview", { "text.press.color": sem.bg, "text.toggle.color": sem.bg, "text.margin": 0 })),
    ...section("Splitter", { "indicator.element": "splitter-grip", "indicator.size": 18 }),
    ...section("Menu", panel("menu")),
    ...section("MenuItem", panel("menuitem", { "text.focus.color": sem.bg, "text.margin.left": 5, "text.margin.right": 5 })),
    ...section("MenuBar", panel("menubaritem")),
    ...section("MenuBarItem", panel("menubaritem", { "text.shadow": false })),
    ...section("TitleBar", panel("titlebar", { "indicator.element": "mdi", "text.bold": true })),
    ...section("ComboBox", panel("lineedit", { "indicator.element": "arrow", "indicator.size": 10, "text.margin.left": 6, "text.margin.right": 6 })),
    ...section("GroupBox", panel("group", { interior: false, "text.bold": true, "text.shadow": false })),
    ...section("ToolTip", panel("tooltip", { "text.shadow": false })),
    ...section("Window", panel("window", { frame: false })),
    ...section("WindowTranslucent", panel("window-translucent", { frame: false })),
    ...section("Dialog", panel("dialog", { frame: false })),
    ...section("DialogTranslucent", panel("dialog-translucent", { frame: false })),
  ].join("\n");
  return [
    { path: `ports/kvantum/${meta.name}/${meta.name}.kvconfig`, content: config },
    { path: `ports/kvantum/${meta.name}/${meta.name}.svg`, content: svg },
    { path: `ports/kvantum/${meta.name}/${meta.name}.colors`, content: renderColorScheme(ctx) },
  ];
}
