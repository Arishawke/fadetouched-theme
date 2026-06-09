# Fadetouched for VS Code

A dark teal-green, earthy color theme authored in OKLCH. Muted, pigment-like
accents on a deep `#142624` base.

Open the command palette → **Preferences: Color Theme** → **Fadetouched**.

This is the VS Code port of [Fadetouched](https://github.com/Arishawke/fadetouched-theme).
The theme file (`themes/fadetouched-color-theme.json`) is generated from the
project's `palette.json` and is not edited by hand.

## Publishing (maintainer notes)

- Add a 128×128 `icon.png` here and re-add `"icon": "icon.png"` to `package.json`
  before publishing (Marketplace listing image).
- `npx @vscode/vsce package` then `npx @vscode/vsce publish` under the
  `Arishawke` publisher.
