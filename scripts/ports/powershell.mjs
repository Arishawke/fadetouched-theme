export const label = "PowerShell";

const ansiBg = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `"$([char]0x1b)[48;2;${r};${g};${b}m"`;
};

export default function render(ctx) {
  const { meta, accent, sem, syn } = ctx;
  const q = (hex) => `'${hex}'`;

  const colors = [
    ["Default", q(sem.text)],
    ["Comment", q(syn.comment)],
    ["Keyword", q(syn.keyword)],
    ["String", q(syn.string)],
    ["Number", q(syn.number)],
    ["Command", q(syn.function)],
    ["Parameter", q(syn.parameter)],
    ["Variable", q(accent.teal)],
    ["Member", q(syn.property)],
    ["Type", q(syn.type)],
    ["Operator", q(syn.operator)],
    ["Emphasis", q(accent.yellow)],
    ["Error", q(sem.error)],
    ["Selection", ansiBg(sem["surface-active"])],
    ["InlinePrediction", q(sem["text-faint"])],
  ];

  const lines = [
    `# ${meta.name} for PowerShell (PSReadLine). Generated from ${meta.source}. Do not edit by hand.`,
    `# Dot-source from your $PROFILE:  . /path/to/fadetouched.ps1`,
    `if (Get-Module -ListAvailable -Name PSReadLine) {`,
    `    Set-PSReadLineOption -Colors @{`,
    ...colors.map(([k, v]) => `        ${k.padEnd(16)} = ${v}`),
    `    }`,
    `}`,
    ``,
  ];

  return [{ path: `ports/powershell/${meta.slug}.ps1`, content: lines.join("\n") }];
}
