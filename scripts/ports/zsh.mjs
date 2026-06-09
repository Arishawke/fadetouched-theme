export const label = "zsh";

export default function render(ctx) {
  const { meta, sem, syn } = ctx;

  const styles = [
    ["comment", `fg=${syn.comment}`],
    ["unknown-token", `fg=${sem.error},bold`],
    ["reserved-word", `fg=${syn.keyword}`],
    ["precommand", `fg=${syn.keyword}`],
    ["command", `fg=${syn.function}`],
    ["function", `fg=${syn.function}`],
    ["hashed-command", `fg=${syn.function}`],
    ["arg0", `fg=${syn.function}`],
    ["builtin", `fg=${syn.builtin}`],
    ["alias", `fg=${sem.info}`],
    ["suffix-alias", `fg=${sem.info}`],
    ["global-alias", `fg=${sem.info}`],
    ["autodirectory", `fg=${sem.info}`],
    ["single-quoted-argument", `fg=${syn.string}`],
    ["double-quoted-argument", `fg=${syn.string}`],
    ["dollar-quoted-argument", `fg=${syn.string}`],
    ["back-quoted-argument", `fg=${syn.string}`],
    ["rc-quote", `fg=${syn.string}`],
    ["dollar-double-quoted-argument", `fg=${syn.escape}`],
    ["back-double-quoted-argument", `fg=${syn.escape}`],
    ["back-dollar-quoted-argument", `fg=${syn.escape}`],
    ["single-quoted-argument-unclosed", `fg=${sem.error}`],
    ["double-quoted-argument-unclosed", `fg=${sem.error}`],
    ["dollar-quoted-argument-unclosed", `fg=${sem.error}`],
    ["back-quoted-argument-unclosed", `fg=${sem.error}`],
    ["single-hyphen-option", `fg=${syn.parameter}`],
    ["double-hyphen-option", `fg=${syn.parameter}`],
    ["redirection", `fg=${syn.operator}`],
    ["commandseparator", `fg=${syn.operator}`],
    ["command-substitution-delimiter", `fg=${syn.operator}`],
    ["process-substitution-delimiter", `fg=${syn.operator}`],
    ["back-quoted-argument-delimiter", `fg=${syn.operator}`],
    ["globbing", `fg=${syn.number}`],
    ["history-expansion", `fg=${syn.escape}`],
    ["path", `fg=${sem["text-muted"]},underline`],
    ["path_prefix", `fg=${sem["text-muted"]},underline`],
  ];

  const out = [
    `# ${meta.name} for zsh-syntax-highlighting. Generated from palette.json. Do not edit by hand.`,
    `# Source from .zshrc AFTER zsh-syntax-highlighting.zsh.`,
    `# Needs zsh >= 5.7 and a truecolor terminal (otherwise: zmodload zsh/nearcolor).`,
    ``,
    `typeset -gA ZSH_HIGHLIGHT_STYLES`,
    ``,
    ...styles.map(([k, v]) => `ZSH_HIGHLIGHT_STYLES[${k}]='${v}'`),
    ``,
  ].join("\n");

  return [{ path: "ports/zsh/fadetouched.zsh", content: out }];
}
