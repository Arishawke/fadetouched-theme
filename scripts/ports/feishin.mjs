import { alpha } from "../lib/color.mjs";

export const label = "Feishin";

export default function render(ctx) {
  const { meta, sem } = ctx;
  const imp = (v) => `${v} !important`;

  const colors = [
    ["background", sem.bg],
    ["background-alternate", sem["bg-dim"]],
    ["foreground", sem.text],
    ["foreground-muted", sem["text-subtle"]],
    ["surface", sem.surface],
    ["surface-foreground", sem["text-muted"]],
    ["primary", sem.accent],
    ["state-error", sem.error],
    ["state-info", sem.info],
    ["state-success", sem.success],
    ["state-warning", sem.warning],
  ];

  const app = [
    ["scrollbar-handle-background", alpha(sem.border, 30)],
    ["scrollbar-handle-hover-background", alpha(sem["border-strong"], 50)],
    ["scrollbar-handle-active-background", alpha(sem["border-strong"], 70)],
  ];

  const lines = [
    `/* ${meta.name} for Feishin. Generated from ${meta.source}. Do not edit by hand. */`,
    `/* Settings -> Advanced -> Custom CSS: enable, Edit, paste, Save. Select a dark base theme (e.g. Default Dark) first. */`,
    `:root {`,
    ...colors.map(([k, v]) => `  --theme-colors-${k}: ${imp(v)};`),
    ...app.map(([k, v]) => `  --theme-${k}: ${imp(v)};`),
    `}`,
    ``,
  ];

  return [{ path: `ports/feishin/${meta.slug}.css`, content: lines.join("\n") }];
}
