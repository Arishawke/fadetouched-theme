export const label = "Firefox";

export default function render(ctx) {
  const { meta, sem } = ctx;

  const manifest = {
    manifest_version: 2,
    name: meta.name,
    version: "2.0.0",
    description: meta.description,
    author: "Arishawke",
    browser_specific_settings: {
      gecko: { id: "{b91c3ce8-5abe-4038-9e00-90d8aa964fb1}" },
    },
    theme: {
      colors: {
        frame: sem["bg-dim"],
        frame_inactive: sem["bg-sunken"],
        toolbar: sem.bg,
        toolbar_text: sem.text,
        bookmark_text: sem.text,
        tab_background_text: sem["text-subtle"],
        tab_text: sem.text,
        tab_selected: sem.bg,
        tab_line: sem.link,
        tab_loading: sem.link,
        toolbar_field: sem.surface,
        toolbar_field_text: sem.text,
        toolbar_field_border: sem.border,
        toolbar_field_focus: sem["surface-hover"],
        toolbar_field_border_focus: sem.link,
        toolbar_field_highlight: sem["surface-active"],
        toolbar_field_highlight_text: sem.text,
        icons: sem["text-subtle"],
        icons_attention: sem.cursor,
        button_background_hover: sem["surface-hover"],
        button_background_active: sem["surface-active"],
        popup: sem.popover,
        popup_text: sem.text,
        popup_border: sem.border,
        popup_highlight: sem["surface-active"],
        popup_highlight_text: sem.text,
        sidebar: sem["bg-dim"],
        sidebar_text: sem.text,
        sidebar_border: sem.border,
        sidebar_highlight: sem["surface-active"],
        sidebar_highlight_text: sem.text,
        ntp_background: sem.bg,
        ntp_card_background: sem.surface,
        ntp_text: sem.text,
      },
      properties: {
        color_scheme: "dark",
      },
    },
  };

  return [
    {
      path: "ports/firefox/manifest.json",
      content: JSON.stringify(manifest, null, 2) + "\n",
    },
  ];
}
