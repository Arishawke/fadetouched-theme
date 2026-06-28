export const label = "Fish";

const bare = (hex) => hex.replace("#", "");

export default function render(ctx) {
  const { accent, sem, syn } = ctx;
  const bg = (hex) => `--background=${bare(hex)}`;

  const lines = [
    `# name: 'Fadetouched'`,
    `# url: 'https://github.com/Arishawke/fadetouched-theme'`,
    ``,
    `# preferred_background: ${bare(sem.bg)}`,
    `fish_color_normal ${bare(sem.text)}`,
    `fish_color_command ${bare(syn.function)}`,
    `fish_color_keyword ${bare(syn.keyword)}`,
    `fish_color_quote ${bare(syn.string)}`,
    `fish_color_redirection ${bare(syn.operator)}`,
    `fish_color_end ${bare(accent.orange)}`,
    `fish_color_error ${bare(sem.error)}`,
    `fish_color_param ${bare(syn.parameter)}`,
    `fish_color_option ${bare(accent.teal)}`,
    `fish_color_comment ${bare(syn.comment)}`,
    `fish_color_selection ${bg(sem["surface-hover"])}`,
    `fish_color_search_match ${bg(sem["surface-active"])}`,
    `fish_color_operator ${bare(syn.operator)}`,
    `fish_color_escape ${bare(syn.escape)}`,
    `fish_color_autosuggestion ${bare(sem["text-faint"])}`,
    `fish_color_cancel ${bare(sem.error)}`,
    `fish_color_cwd ${bare(accent.blue)}`,
    `fish_color_user ${bare(accent.teal)}`,
    `fish_color_host ${bare(accent.blue)}`,
    `fish_color_host_remote ${bare(accent.green)}`,
    `fish_color_status ${bare(sem.error)}`,
    `fish_color_gray ${bare(sem["text-faint"])}`,
    `fish_pager_color_progress ${bare(sem["text-faint"])}`,
    `fish_pager_color_prefix ${bare(accent.pink)}`,
    `fish_pager_color_completion ${bare(sem.text)}`,
    `fish_pager_color_description ${bare(sem["text-faint"])}`,
    ``,
  ];

  return [{ path: `ports/fish/Fadetouched.theme`, content: lines.join("\n") }];
}
