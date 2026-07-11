# Changelog

All notable changes to Fadetouched are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Zed: define the `.background`/`.border` pair for every tinted-button color
  (`info`, `error`, `warning`, `success`) so tinted buttons and badges (e.g. the
  selected settings-source tab, destructive/confirm buttons) render as readable
  on-theme pills instead of falling back to Zed's bright defaults, which left the
  near-white label hard to read.
- VS Code: fill accent-driven UI elements that previously fell back to VS Code's
  default blue (activity-bar active border, panel-title border, search-option
  toggles, remote indicator, focus borders, selected-tab border, picker group,
  links, autocomplete match, overview-ruler marks) so they use the theme's accent,
  and map bracket-pair colorization to the palette. Color the explorer "modified"
  git decoration warm yellow to match VS Code's own convention (the gutter bar
  stays blue, also per VS Code).
- Notepad++: color the diff "changed" line style (styleID 7), which previously
  rendered as plain default text.
- AO3: flatten the profile/dashboard sidebar and Sort & Filter expander rows,
  make the fandom-index jump-to-top arrow visible, and theme the text-input focus
  ring to the accent.
- OpenCode: replace unsupported eight-digit alpha colors with opaque diff blends,
  improve diff text and line-number contrast, and map interactive elements to the
  authored surface role.

### Changed
- README: add the project website near the title and group verified ports into
  Editors, Terminals, Shell, Apps, Desktop, and Web categories to match the site.
- Zed: git `modified` now uses the conventional warm yellow (added=green,
  modified=yellow, deleted=red), matching other Zed themes (One Dark, Gruvbox,
  Ayu), instead of blue. Applies to both the status color and the git gutter.
- Deepened the base to `#11201e` and muted every accent ~20% in OKLCH for a
  darker, earthier feel. Regenerates every port.
- Swatch images and the README palette tables are now generated from
  `palette.json` (previously hand-maintained), so colors live in one place.

### Added
- Zellij port (`ports/zellij/fadetouched.kdl`): a component-based KDL theme
  following Zellij's advanced theme format (text, ribbons/tabs, table, list,
  frames, exit codes, and ten multiplayer colors), emitted as RGB triplets with
  `0` for terminal-default backgrounds. The active tab fills with the accent
  green; focused pane frames use the accent, unfocused a neutral border. Copy to
  `~/.config/zellij/themes/` and set `theme "fadetouched"`. Verified in a live
  Zellij 0.44.3 session.
- ShareX port (`ports/sharex/fadetouched.json`): a verified dark application
  theme imported via **Application Settings → Theme → Import → From File**.
  Maps ShareX's theme JSON fields to the shared palette, with stronger menu
  selection colors for visible hover and checked states.
- OpenCode port: a generated, verified terminal UI theme at
  `ports/opencode/fadetouched.json`, following OpenCode's public
  `https://opencode.ai/theme.json` schema. Install by copying it to
  `~/.config/opencode/themes/` and selecting `fadetouched` with `/theme`. Verified
  in OpenCode 1.17.18 on Windows.
- tmux, Foot, and Mintty ports: lightweight, unverified config snippets generated
  from `palette.json`. tmux styles the status/message/pane UI, Foot emits a
  `[colors]` include with bare hex colors, and Mintty emits a theme file with
  decimal RGB color keys.
- fish, Nushell, and PowerShell ports: shell syntax-highlighting themes generated
  from `palette.json`. fish ships a `.theme` for `fish_config`, Nushell a
  `$env.config.color_config` snippet, and PowerShell a `Set-PSReadLineOption`
  snippet for `$PROFILE`.
- Feishin port (`ports/feishin/fadetouched.css`): a dark custom-CSS theme for the
  Feishin music player, remapping its `--theme-colors-*` and scrollbar variables.
  Paste into Settings → Advanced → Custom CSS over a dark base theme.
- Obsidian port (`ports/obsidian/`): a dark theme generated from `palette.json`.
  Remaps Obsidian's foundation tokens (base ramp, named colors, accent HSL) plus
  code/syntax and a few targeted vars, scoped to `.theme-dark`. Install by copying
  the folder into `<vault>/.obsidian/themes/Fadetouched/`.
- Calibre port (`ports/calibre/Fadetouched.calibre-palette`): a dark palette for
  the calibre e-book manager's Qt interface, imported via **Look & feel → Adjust
  colors → Import**. Maps the 16 QPalette roles (including calibre 6+'s `Accent`)
  plus disabled variants; an accent-green selection keeps highlighted rows clearly
  visible. Dark mode only, with the light slot left to calibre's default palette.
  Validated against calibre 9.9's own palette importer.
- Startpage port (`ports/startpage/fadetouched.css`): a dark Stylus userstyle for
  the startpage.com search engine, overriding its `--sx-*` theme variables plus
  result, header, knowledge-panel, and pagination styling. Modeled on the
  Catppuccin userstyle.
- Ghostty port (`ports/ghostty/fadetouched`): a theme file mapping the 16-color
  ANSI palette plus background, foreground, cursor, and selection.
- WezTerm port (`ports/wezterm/fadetouched.toml`): a `[colors]` color scheme with
  `ansi`/`brights` arrays, background, foreground, cursor, and selection.
- Trilium port (`ports/trilium/fadetouched.css`): a dark theme for the TriliumNext
  Next theme, recoloring panes, tree, launcher, tabs, inputs, menus, dialogs, and
  scrollbars. Load as a CSS code note with `#appTheme` and `#appThemeBase=next-dark`.
- qBittorrent port (`ports/qbittorrent/`): theme sources (`config.json` palette,
  log, and transfer-list colors plus a minimal `stylesheet.qss`) packaged into a
  `.qbtheme` with Qt's `rcc` via the included `resources.qrc`.
- Starship port (`ports/starship/fadetouched.toml`): a two-line powerline prompt
  built from the shared neutral ramp and accents. Needs a Nerd Font for the
  powerline separators and language icons.
- Zed: completed the theme to full parity with Zed's reference theme. defined
  every remaining style key (status `.background`/`.border` tints, `version_control.*`
  git colors, disabled/selected borders, ghost-element and icon states, inactive
  title bar, active search match, terminal bright/dim foreground, and more), all
  derived from the palette so no UI element falls back to a Zed default color.
- Cursor port (`ports/cursor/`): a dark cursor set based on Bibata Modern with a
  custom green "veilfire" ring spinner replacing the busy and progress
  animations, and off-brand accents remapped to the palette. Ships prebuilt
  Windows and Linux (XCursor) packs in `dist/` and a reproducible build
  (`npm run pack:cursor`). Licensed GPL-3.0 (derives from Bibata); the rest of
  the repo stays MIT.
- Konsole companion profile (`ports/konsole/Fadetouched.profile`): sets the
  custom cursor color (which the `.colorscheme` cannot) and links the Fadetouched
  scheme. Minimal by design, it leaves font and behavior to Konsole's defaults so
  it layers onto an existing setup.
- Archive of Our Own port (`ports/ao3/fadetouched.css`): a dark, reading-first
  AO3 site skin using custom properties and AO3's allowed CSS subset. No external
  images, so it stays eligible for public sharing.
- Notepad++ port (`ports/notepad-plus-plus/Fadetouched.xml`): full GlobalStyles
  (editor chrome) plus LexerStyles for ~20 common languages. Other languages fall
  back to the default text style.
- zsh port (`ports/zsh/fadetouched.zsh`): a zsh-syntax-highlighting theme mapping
  the syntax roles onto the command line. Needs zsh 5.7+ and a truecolor terminal.
- KDE Plasma port (`ports/kde-plasma/Fadetouched.colors`): a full color scheme
  for Plasma 6, mapping the neutral ramp and accents onto every color set
  (Window, View, Button, Selection, Tooltip, Complementary, Header, WM) plus the
  inactive/disabled color effects.
- Konsole, Termux, and Limine ports. Konsole emits a `.colorscheme` (decimal
  `R,G,B`), Termux a `colors.properties` (restricted to the keys its parser
  accepts), and Limine the global terminal-palette keys for `limine.conf`.
- Firefox port (`ports/firefox/manifest.json`): a WebExtension theme mapping the
  neutral ramp and UI accent onto the browser chrome, with `npm run pack:firefox`
  to build an installable `.xpi`.
- Zed "Fadetouched Blur" theme: a translucent variant using
  `background.appearance: blurred` with see-through editor and panels. Shipped
  alongside the base theme in the same Zed extension.
- Window-materials showcase (`assets/materials.svg`): the palette under opaque,
  transparent, blur, acrylic, and mica surfaces.

## [1.0.0] - 2026-06-07

First release: base `#142624`, Signature Earthy v2 accents.

### Added
- `palette.json` as the single source of truth (12 neutrals + 12 accents +
  semantic and syntax role maps), authored in OKLCH.
- Generator (`scripts/generate.mjs`) that emits every port from the palette.
- Accessibility gate (`scripts/contrast.mjs`): body text ≥ 4.5:1, comments and
  accents ≥ 3:1 against the base.
- Ports: Zed, VS Code, Web/CSS, base16, Windows Terminal, iTerm2, Alacritty,
  Kitty, Helix, Neovim.
- Zed extension manifest (`extension.toml` + `themes/`) and a VS Code extension
  manifest (`ports/vscode/package.json`).
- Test suite (`node --test`) covering the color math and port invariants.

### Notes
- Terminal "bright" ANSI colors are derived from each accent in OKLCH
  (`L × 1.07`, `C × 1.06`). This reproduces the original hand-tuned values to
  within ≤ 2/255 per channel (sub-perceptual).
