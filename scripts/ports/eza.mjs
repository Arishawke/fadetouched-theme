export const label = "eza";

export default function render(ctx) {
  const { sem, accent } = ctx;
  const content = `filekinds:
  normal:
    foreground: "${sem.text}"
  directory:
    foreground: "${accent.blue}"
    is_bold: true
  symlink:
    foreground: "${accent.teal}"
  pipe:
    foreground: "${accent.magenta}"
  block_device:
    foreground: "${accent.orange}"
  char_device:
    foreground: "${accent.orange}"
  socket:
    foreground: "${accent.purple}"
  special:
    foreground: "${accent.yellow}"
  executable:
    foreground: "${accent.green}"
    is_bold: true
  mount_point:
    foreground: "${accent.indigo}"
perms:
  user_read:
    foreground: "${accent.yellow}"
  user_write:
    foreground: "${accent.red}"
  user_execute_file:
    foreground: "${accent.green}"
  user_execute_other:
    foreground: "${accent.green}"
  group_read:
    foreground: "${accent.yellow}"
  group_write:
    foreground: "${accent.red}"
  group_execute:
    foreground: "${accent.green}"
  other_read:
    foreground: "${accent.yellow}"
  other_write:
    foreground: "${accent.red}"
  other_execute:
    foreground: "${accent.green}"
  special_user_file:
    foreground: "${accent.purple}"
  special_other:
    foreground: "${accent.magenta}"
  attribute:
    foreground: "${sem["text-faint"]}"
size:
  major:
    foreground: "${accent.orange}"
  minor:
    foreground: "${accent.rust}"
  number_byte:
    foreground: "${sem["text-subtle"]}"
  number_kilo:
    foreground: "${accent.green}"
  number_mega:
    foreground: "${accent.yellow}"
  number_giga:
    foreground: "${accent.orange}"
  number_huge:
    foreground: "${accent.red}"
  unit_byte:
    foreground: "${sem["text-faint"]}"
  unit_kilo:
    foreground: "${sem["text-faint"]}"
  unit_mega:
    foreground: "${sem["text-faint"]}"
  unit_giga:
    foreground: "${sem["text-faint"]}"
  unit_huge:
    foreground: "${sem["text-faint"]}"
users:
  user_you:
    foreground: "${accent.green}"
  user_root:
    foreground: "${accent.red}"
  user_other:
    foreground: "${accent.yellow}"
  group_yours:
    foreground: "${accent.blue}"
  group_other:
    foreground: "${accent.purple}"
  group_root:
    foreground: "${accent.red}"
links:
  normal:
    foreground: "${sem["text-subtle"]}"
  multi_link_file:
    foreground: "${accent.indigo}"
git:
  new:
    foreground: "${accent.green}"
  modified:
    foreground: "${accent.yellow}"
  deleted:
    foreground: "${accent.red}"
  renamed:
    foreground: "${accent.teal}"
  ignored:
    foreground: "${sem["text-faint"]}"
  conflicted:
    foreground: "${accent.magenta}"
git_repo:
  branch_main:
    foreground: "${accent.green}"
  branch_other:
    foreground: "${accent.purple}"
  git_clean:
    foreground: "${accent.green}"
  git_dirty:
    foreground: "${accent.yellow}"
punctuation:
  foreground: "${sem["text-faint"]}"
date:
  foreground: "${accent.teal}"
inode:
  foreground: "${accent.purple}"
blocks:
  foreground: "${sem["text-subtle"]}"
header:
  foreground: "${sem["text-muted"]}"
  is_bold: true
octal:
  foreground: "${accent.orange}"
flags:
  foreground: "${accent.yellow}"
control_char:
  foreground: "${accent.red}"
broken_symlink:
  foreground: "${accent.red}"
broken_path_overlay:
  foreground: "${accent.red}"
`;

  return [{ path: "ports/eza/theme.yml", content }];
}
