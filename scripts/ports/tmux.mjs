export const label = "tmux";

export default function render(ctx) {
  const { meta, sem, n, accent } = ctx;
  const style = ({ bg, fg, extra }) => [bg && `bg=${bg}`, fg && `fg=${fg}`, extra].filter(Boolean).join(",");

  const out = [
    `# ${meta.name}. Generated from ${meta.source}. Do not edit by hand.`,
    `# Source from ~/.tmux.conf: source-file /path/to/${meta.slug}.tmux`,
    ``,
    `set -g status on`,
    `set -g status-style "${style({ bg: sem.bg, fg: sem.text })}"`,
    `set -g status-left-style "${style({ bg: sem.bg, fg: sem.accent, extra: "bold" })}"`,
    `set -g status-right-style "${style({ bg: sem.bg, fg: sem["text-muted"] })}"`,
    `set -g window-status-style "${style({ bg: sem.bg, fg: sem["text-muted"] })}"`,
    `set -g window-status-current-style "${style({ bg: sem.surface, fg: sem.text, extra: "bold" })}"`,
    `set -g window-status-activity-style "${style({ bg: sem.bg, fg: sem.warning, extra: "bold" })}"`,
    `set -g window-status-bell-style "${style({ bg: sem.bg, fg: sem.error, extra: "bold" })}"`,
    `set -g message-style "${style({ bg: sem.accent, fg: sem.bg })}"`,
    `set -g message-command-style "${style({ bg: sem.surface, fg: accent.yellow })}"`,
    `set -g pane-border-style "fg=${sem.border}"`,
    `set -g pane-active-border-style "fg=${sem.accent}"`,
    `set -g mode-style "${style({ bg: n.n4, fg: sem.text })}"`,
    `set -g clock-mode-colour "${accent.green}"`,
    ``,
  ].join("\n");

  return [{ path: `ports/tmux/${meta.slug}.tmux`, content: out }];
}
