export const label = "btop";

export default function render(ctx) {
  const { meta, n, accent, sem } = ctx;
  const theme = {
    main_bg: sem.bg,
    main_fg: sem.text,
    title: sem.text,
    hi_fg: sem.accent,
    selected_bg: sem["surface-active"],
    selected_fg: sem.text,
    inactive_fg: sem["text-faint"],
    graph_text: sem["text-muted"],
    meter_bg: sem.surface,
    proc_misc: accent.purple,
    cpu_box: accent.teal,
    mem_box: accent.green,
    net_box: accent.blue,
    proc_box: accent.purple,
    div_line: sem.border,
    temp_start: accent.blue,
    temp_mid: accent.yellow,
    temp_end: accent.red,
    cpu_start: n.n6,
    cpu_mid: accent.teal,
    cpu_end: accent.green,
    free_start: n.n5,
    free_mid: accent.teal,
    free_end: accent.green,
    cached_start: n.n5,
    cached_mid: accent.blue,
    cached_end: accent.cyan,
    available_start: n.n5,
    available_mid: accent.teal,
    available_end: accent.green,
    used_start: n.n5,
    used_mid: accent.yellow,
    used_end: accent.red,
    download_start: n.n5,
    download_mid: accent.blue,
    download_end: accent.cyan,
    upload_start: n.n5,
    upload_mid: accent.purple,
    upload_end: accent.pink,
    process_start: n.n7,
    process_mid: accent.blue,
    process_end: accent.purple,
    proc_pause_bg: sem["surface-active"],
    proc_follow_bg: sem.surface,
    proc_banner_bg: sem.surface,
    proc_banner_fg: sem.text,
    followed_bg: sem["surface-active"],
    followed_fg: sem.text,
  };

  const content = Object.entries(theme)
    .map(([key, value]) => `theme[${key}]="${value}"`)
    .join("\n");

  return [{ path: `ports/btop/${meta.slug}.theme`, content: content + "\n" }];
}
