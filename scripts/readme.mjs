const NEUTRAL_ROLES = {
  n0: "Deepest well / shadows",
  n1: "Sidebars, secondary panes",
  n2: "**Background** (base)",
  n3: "Cards, inputs, status bar",
  n4: "Hover / active rows",
  n5: "Borders, dividers",
  n6: "Strong borders, focus",
  n7: "Comments, line numbers",
  n8: "Doc comments",
  n9: "Labels, subtle text",
  n10: "Secondary text",
  n11: "Primary text",
};

const ACCENT_ROLES = {
  red: "Errors, deletions, builtins",
  rust: "Parameters",
  orange: "Numbers, constants",
  yellow: "Types, classes, warnings",
  green: "Strings, success, additions",
  teal: "Tags, info",
  cyan: "Operators, hints",
  blue: "Functions, links, properties",
  indigo: "Decorators, active line",
  purple: "Keywords",
  magenta: "Escape / regex",
  pink: "Cursor, modified",
};

const table = (values, roles, dir = "") => {
  const head = "| | Token | Hex | Role |\n|---|---|---|---|";
  const rows = Object.entries(values).map(
    ([k, hex]) =>
      `| <img src="assets/circles/${dir}${k}.png" width="20"/> | \`${k}\` | \`${hex}\` | ${roles[k]} |`,
  );
  return [head, ...rows].join("\n");
};

const replaceBlock = (text, name, body) => {
  const re = new RegExp(
    `(<!-- AUTOGEN:${name}:start -->)[\\s\\S]*?(<!-- AUTOGEN:${name}:end -->)`,
  );
  if (!re.test(text)) throw new Error(`README missing AUTOGEN markers for "${name}"`);
  return text.replace(re, `$1\n${body}\n$2`);
};

export function injectReadmeTables(dark, text) {
  let out = replaceBlock(text, "neutrals", table(dark.n, NEUTRAL_ROLES));
  out = replaceBlock(out, "accents", table(dark.accent, ACCENT_ROLES));
  return out;
}
