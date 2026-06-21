export const label = "Starship";

export default function render(ctx) {
  const { meta, n, accent } = ctx;
  const slug = meta.slug;

  const palette = [...Object.entries(n), ...Object.entries(accent)]
    .map(([k, hex]) => `${k} = '${hex}'`)
    .join("\n");

  const out = `# ${meta.name}. Generated from ${meta.source}. Do not edit by hand.

"$schema" = 'https://starship.rs/config-schema.json'

format = """
[](green)\\
$os\\
$username\\
[](fg:green bg:blue)\\
$directory\\
[](fg:blue bg:teal)\\
$git_branch\\
$git_status\\
[](fg:teal bg:purple)\\
$nodejs\\
$bun\\
$python\\
$rust\\
$golang\\
$java\\
$kotlin\\
[](fg:purple bg:n4)\\
$docker_context\\
$conda\\
[](fg:n4 bg:n3)\\
$time\\
[ ](fg:n3)\\
$line_break$character"""

palette = '${slug}'

[palettes.${slug}]
${palette}

[os]
disabled = false
style = "bg:green fg:n0"

[os.symbols]
Windows = "󰍲"

[username]
show_always = true
style_user = "bg:green fg:n0"
style_root = "bg:green fg:n0"
format = '[ $user ]($style)'

[directory]
style = "bg:blue fg:n0"
format = "[ $path ]($style)"
truncation_length = 3
truncation_symbol = "…/"

[git_branch]
symbol = ""
style = "bg:teal fg:n0"
format = '[ $symbol $branch ]($style)'

[git_status]
style = "bg:teal fg:n0"
format = '[$all_status$ahead_behind ]($style)'

[nodejs]
style = "bg:purple fg:n0"
format = '[ $symbol ($version) ]($style)'

[bun]
style = "bg:purple fg:n0"
format = '[ $symbol ($version) ]($style)'

[python]
style = "bg:purple fg:n0"
format = '[ $symbol ($version) ]($style)'

[rust]
style = "bg:purple fg:n0"
format = '[ $symbol ($version) ]($style)'

[golang]
style = "bg:purple fg:n0"
format = '[ $symbol ($version) ]($style)'

[java]
style = "bg:purple fg:n0"
format = '[ $symbol ($version) ]($style)'

[kotlin]
style = "bg:purple fg:n0"
format = '[ $symbol ($version) ]($style)'

[docker_context]
style = "bg:n4 fg:n11"
format = '[ $symbol $context ]($style)'

[conda]
style = "bg:n4 fg:n11"
format = '[ $symbol $environment ]($style)'

[time]
disabled = false
time_format = "%R"
style = "bg:n3 fg:n10"
format = '[ $time ]($style)'

[line_break]
disabled = false

[character]
success_symbol = '[❯](bold green)'
error_symbol = '[❯](bold red)'
`;

  return [{ path: `ports/starship/${slug}.toml`, content: out }];
}
