# Attribution

The Fadetouched cursor in this directory (`ports/cursor/`) is licensed under
**GPL-3.0** (see `LICENSE`), because it derives from Bibata. The rest of the
Fadetouched repository is MIT; this directory is the one exception.

## Required

**Bibata** by Abdulkaiz Khatri (ful1e5), GPL-3.0.
https://github.com/ful1e5/Bibata_Cursor

The cursor shapes (the arrow and all static cursors) and the XCursor/Windows
build configs in `src/` are derived from Bibata Modern. Vendored from commit
`35ccfe209a808e40d6c2ca60a46cbe4faf68b690`. Changes made here: the wait and
progress animations are replaced with a custom "veilfire" ring spinner, and the
off-brand accent colors are remapped to the Fadetouched palette. Modifications
copyright Arishawke; original work copyright Abdulkaiz Khatri.

## Build tools

- **clickgen** / **ctgen** by ful1e5, MIT. https://github.com/ful1e5/clickgen
- **cbmp** by ful1e5, MIT. https://github.com/ful1e5/cbmp

Used to render and package the cursors. Not redistributed here.

## Courtesy credits

Not required, included with thanks:

- **base16** specification, tinted-theming, MIT (originally by Chris Kempson).
  https://github.com/tinted-theming/home
  Credited for the scheme format used by `ports/base16`.
- **Catppuccin**, Catppuccin Org, MIT. https://github.com/catppuccin/catppuccin
- **zed-catppuccin-blur** by jenslys, MIT.
  https://github.com/jenslys/zed-catppuccin-blur
  A reference for the Zed blur variant (approach only, no files copied).

Fadetouched's palette is its own work, with design inspiration from Catppuccin,
Rose Pine, and Tokyo Night.
