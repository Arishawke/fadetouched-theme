import { readFileSync } from "node:fs";
import { join } from "node:path";
import { alpha, brighten, hexToHsl } from "../lib/color.mjs";
import { ROOT } from "../lib/palette.mjs";

export const label = "Obsidian";

const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));

const rgbTriplet = (hex) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(", ");

export default function render(ctx) {
  const { meta, n, accent, sem, syn } = ctx;
  const { h, s, l } = hexToHsl(sem.accent);

  const baseRamp = [
    ["00", n.n0], ["05", n.n1], ["10", n.n2], ["20", n.n3],
    ["25", n.n4], ["30", n.n5], ["35", n.n6], ["40", n.n7],
    ["50", n.n8], ["60", n.n9], ["70", n.n10], ["100", n.n11],
  ];

  const named = [
    ["red", accent.red], ["orange", accent.orange], ["yellow", accent.yellow],
    ["green", accent.green], ["cyan", accent.cyan], ["blue", accent.blue],
    ["purple", accent.purple], ["pink", accent.pink],
  ];

  const vars = [
    ...baseRamp.map(([k, v]) => [`--color-base-${k}`, v]),
    ...named.flatMap(([k, v]) => [
      [`--color-${k}`, v],
      [`--color-${k}-rgb`, rgbTriplet(v)],
    ]),
    ["--accent-h", String(h)],
    ["--accent-s", `${s}%`],
    ["--accent-l", `${l}%`],

    ["--background-primary", sem.bg],
    ["--background-primary-alt", sem["bg-dim"]],
    ["--background-secondary", sem["bg-dim"]],
    ["--background-secondary-alt", sem["bg-sunken"]],
    ["--background-modifier-border", sem.border],
    ["--background-modifier-border-hover", sem["border-strong"]],
    ["--background-modifier-border-focus", sem.accent],
    ["--background-modifier-hover", sem["surface-hover"]],
    ["--background-modifier-active-hover", sem["surface-active"]],
    ["--background-modifier-form-field", sem.surface],
    ["--background-modifier-error", alpha(sem.error, 20)],
    ["--background-modifier-error-hover", alpha(sem.error, 30)],
    ["--background-modifier-success", alpha(sem.success, 20)],

    ["--text-normal", sem.text],
    ["--text-muted", sem["text-muted"]],
    ["--text-faint", sem["text-faint"]],
    ["--text-accent", sem.accent],
    ["--text-accent-hover", brighten(sem.accent)],
    ["--text-on-accent", sem.bg],
    ["--text-selection", alpha(sem.accent, 20)],
    ["--text-highlight-bg", alpha(accent.yellow, 25)],

    ["--interactive-normal", sem.surface],
    ["--interactive-hover", sem["surface-hover"]],

    ["--link-color", sem.link],
    ["--link-color-hover", sem["link-hover"]],
    ["--link-external-color", sem.link],
    ["--link-external-color-hover", sem["link-hover"]],
    ["--link-unresolved-color", sem.error],

    ["--code-background", sem["bg-dim"]],
    ["--code-normal", sem.text],
    ["--code-comment", syn.comment],
    ["--code-keyword", syn.keyword],
    ["--code-function", syn.function],
    ["--code-string", syn.string],
    ["--code-property", syn.property],
    ["--code-value", syn.number],
    ["--code-operator", syn.operator],
    ["--code-tag", syn.tag],
    ["--code-punctuation", syn.punctuation],
    ["--code-important", syn.type],

    ["--hr-color", sem.border],
    ["--tag-color", sem.accent],
    ["--tag-background", alpha(sem.accent, 15)],
    ["--blockquote-border-color", sem.border],

    ["--graph-line", sem.border],
    ["--graph-node", sem.text],
    ["--graph-text", sem["text-muted"]],
    ["--graph-node-unresolved", sem.error],
    ["--graph-node-focused", sem.accent],
    ["--graph-node-tag", accent.teal],
    ["--graph-node-attachment", accent.purple],

    ["--scrollbar-thumb-bg", alpha(sem.text, 10)],
    ["--scrollbar-active-thumb-bg", alpha(sem.text, 20)],
  ];

  const css = [
    `/* ${meta.name} for Obsidian. Generated from ${meta.source}. Do not edit by hand. */`,
    `.theme-dark {`,
    ...vars.map(([k, v]) => `  ${k}: ${v};`),
    `}`,
    ``,
  ].join("\n");

  const manifest = {
    name: meta.name,
    version: pkg.version,
    minAppVersion: "1.0.0",
    author: pkg.author,
    authorUrl: pkg.repository.url.replace(/^git\+/, "").replace(/\.git$/, ""),
  };

  return [
    { path: "ports/obsidian/theme.css", content: css },
    {
      path: "ports/obsidian/manifest.json",
      content: JSON.stringify(manifest, null, 2) + "\n",
    },
  ];
}
