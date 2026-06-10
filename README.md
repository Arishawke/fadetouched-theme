<div align="center">

# Fadetouched

### A dark teal-green, earthy color theme.

`#11201e` base · 12-step neutral ramp · 12 muted, pigment-like accents · full syntax + terminal map

<img src="assets/fadetouched-preview.svg" width="720" alt="Fadetouched dark theme preview" />

</div>

---

## About

Fadetouched is a dark green theme inspired by design systems like Catppuccin, Rosé Pine, and Tokyo Night, made so one palette can be applied across any and all apps, websites, and terminals. The name is a callback to Dragon Age, a game series close to my heart!

## Palette

### Fadetouched neutrals

<!-- AUTOGEN:neutrals:start -->
| | Token | Hex | Role |
|---|---|---|---|
| <img src="assets/circles/n0.png" width="20"/> | `n0` | `#03100f` | Deepest well / shadows |
| <img src="assets/circles/n1.png" width="20"/> | `n1` | `#091816` | Sidebars, secondary panes |
| <img src="assets/circles/n2.png" width="20"/> | `n2` | `#11201e` | **Background** (base) |
| <img src="assets/circles/n3.png" width="20"/> | `n3` | `#1f2d29` | Cards, inputs, status bar |
| <img src="assets/circles/n4.png" width="20"/> | `n4` | `#2e3a36` | Hover / active rows |
| <img src="assets/circles/n5.png" width="20"/> | `n5` | `#3e4945` | Borders, dividers |
| <img src="assets/circles/n6.png" width="20"/> | `n6` | `#505a56` | Strong borders, focus |
| <img src="assets/circles/n7.png" width="20"/> | `n7` | `#666f6b` | Comments, line numbers |
| <img src="assets/circles/n8.png" width="20"/> | `n8` | `#7e8580` | Doc comments |
| <img src="assets/circles/n9.png" width="20"/> | `n9` | `#979d98` | Labels, subtle text |
| <img src="assets/circles/n10.png" width="20"/> | `n10` | `#b3b7b4` | Secondary text |
| <img src="assets/circles/n11.png" width="20"/> | `n11` | `#dee1df` | Primary text |
<!-- AUTOGEN:neutrals:end -->

### Fadetouched accents

<!-- AUTOGEN:accents:start -->
| | Token | Hex | Role |
|---|---|---|---|
| <img src="assets/circles/red.png" width="20"/> | `red` | `#c87a75` | Errors, deletions, builtins |
| <img src="assets/circles/rust.png" width="20"/> | `rust` | `#bc836c` | Parameters |
| <img src="assets/circles/orange.png" width="20"/> | `orange` | `#d7a176` | Numbers, constants |
| <img src="assets/circles/yellow.png" width="20"/> | `yellow` | `#d7be86` | Types, classes, warnings |
| <img src="assets/circles/green.png" width="20"/> | `green` | `#96bb93` | Strings, success, additions |
| <img src="assets/circles/teal.png" width="20"/> | `teal` | `#81b8a8` | Tags, info |
| <img src="assets/circles/cyan.png" width="20"/> | `cyan` | `#99c9c9` | Operators, hints |
| <img src="assets/circles/blue.png" width="20"/> | `blue` | `#7daacf` | Functions, links, properties |
| <img src="assets/circles/indigo.png" width="20"/> | `indigo` | `#7d89bb` | Decorators, active line |
| <img src="assets/circles/purple.png" width="20"/> | `purple` | `#af90c3` | Keywords |
| <img src="assets/circles/magenta.png" width="20"/> | `magenta` | `#c593af` | Escape / regex |
| <img src="assets/circles/pink.png" width="20"/> | `pink` | `#dbb5c1` | Cursor, modified |
<!-- AUTOGEN:accents:end -->

## Window materials

Fadetouched is also built for translucent shells: the Zed port ships a
**Fadetouched Blur** variant for `background.appearance: blurred` (needs OS window
blur; reliable on macOS, partial on Linux/Windows). Opaque is the safe default
everywhere.

<img src="assets/fadetouched-themed-windows.png" width="900" alt="Fadetouched under opaque, transparent, blur, acrylic, and mica window materials" />

Each material shown over a mock desktop: opaque, transparent, blur, acrylic, and mica.

## Ports

These ports work but are still in testing, so expect the occasional rough edge, and please report anything that looks off. More ports are in progress and will be added here as they're verified.

### Zed
```sh
mkdir -p ~/.config/zed/themes
cp ports/zed/fadetouched.json ~/.config/zed/themes/
```
Then open the command palette → **theme selector** → **Fadetouched**. The file
also ships **Fadetouched Blur**, a translucent variant for Zed's blurred-window
background (needs OS window blur; reliable on macOS, partial on Linux/Windows).

### Windows Terminal
Copy the scheme from [`ports/windows-terminal/fadetouched.json`](ports/windows-terminal/fadetouched.json) into the `"schemes"` array in your `settings.json`, then set `"colorScheme": "Fadetouched"` on a profile.

### Firefox
Install from [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/fadetouched-theme/).
Browser chrome only: it colors the toolbar, tabs, and menus, not web pages. (To
build the add-on locally, run `npm run pack:firefox`; source is in
[`ports/firefox/`](ports/firefox/).)

### KDE Plasma
```sh
cp ports/kde-plasma/Fadetouched.colors ~/.local/share/color-schemes/
```
Then pick **Fadetouched** in **System Settings → Colors & Themes → Colors**. To
drive the system accent from the theme's green, set **Accent color → From current
color scheme** on that same page.

### Konsole
```sh
cp ports/konsole/Fadetouched.colorscheme ~/.local/share/konsole/
```
Then pick **Fadetouched** in **Settings → Edit Current Profile → Appearance**.

For the matching cursor color, also copy the companion profile and switch to it:
```sh
cp ports/konsole/Fadetouched.profile ~/.local/share/konsole/
```
Then choose the **Fadetouched** profile in **Settings → Manage Profiles**. The
profile only sets the colors and cursor; it falls back to Konsole's defaults for
anything it leaves out (font included), so re-pick your font on it if needed.
Konsole has no custom selection color: it derives the selection highlight from
the scheme automatically.

### Notepad++
Copy [`ports/notepad-plus-plus/Fadetouched.xml`](ports/notepad-plus-plus/Fadetouched.xml)
to `%AppData%\Notepad++\themes\`, restart Notepad++, then pick **Fadetouched** in
**Settings → Style Configurator**. Covers the editor UI and ~20 common languages;
other languages use the default text color.

### AO3 (Archive of Our Own)
A dark site skin for the fanfiction archive. On AO3, go to your dashboard →
**Skins → Create Site Skin**, paste the CSS from
[`ports/ao3/fadetouched.css`](ports/ao3/fadetouched.css) into the CSS field, and
create it. Then click **Use** on the skin (or set it as your default under
**Preferences**). Site skins apply only while you're logged in; re-paste the CSS
after any update.

### Cursor
A dark cursor set based on Bibata Modern, with a custom green "veilfire" ring
spinner for the busy and progress cursors. Prebuilt Windows and Linux (XCursor)
packs and install steps are in [`ports/cursor/`](ports/cursor/). This is the one
GPL-3.0 part of the project (it derives from Bibata); see License below.

### In testing
Generated from the same palette and usable, but not yet verified or documented
with install steps, so expect rough edges and please report anything off:
[`alacritty`](ports/alacritty/), [`base16`](ports/base16/),
[`helix`](ports/helix/), [`iterm`](ports/iterm/), [`kitty`](ports/kitty/),
[`limine`](ports/limine/), [`neovim`](ports/neovim/), [`termux`](ports/termux/),
[`vscode`](ports/vscode/), [`web`](ports/web/), [`zsh`](ports/zsh/).

## License

[MIT](LICENSE). © Arishawke.

Exception: [`ports/cursor/`](ports/cursor/) is **GPL-3.0**, because it derives
from [Bibata](https://github.com/ful1e5/Bibata_Cursor). It carries its own
[`LICENSE`](ports/cursor/LICENSE) and
[`ATTRIBUTION.md`](ports/cursor/ATTRIBUTION.md). Everything else is MIT.
