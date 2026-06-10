# Fadetouched cursor

A dark cursor set based on Bibata Modern: body `#11201e`, light `#dee1df`
outline, and a custom green "veilfire" ring spinner for the busy and progress
cursors. Prebuilt packs live in [`dist/`](dist/).

This directory is **GPL-3.0** (it derives from Bibata). See [`LICENSE`](LICENSE)
and [`ATTRIBUTION.md`](ATTRIBUTION.md). The rest of the Fadetouched repo is MIT.

## Install

### Windows
In [`dist/Fadetouched-Modern-Windows/`](dist/Fadetouched-Modern-Windows), right
click `install.inf` and choose **Install**. Then open **Settings → Bluetooth &
devices → Mouse → Additional mouse settings → Pointers**, set **Scheme** to
**Fadetouched-Modern Cursors**, and **Apply**. Run `uninstall.bat` to remove it.

### Linux (KDE Plasma and other XCursor desktops)
```sh
mkdir -p ~/.local/share/icons
tar -xzf dist/Fadetouched-Modern-XCursor.tar.gz -C ~/.local/share/icons
```
Then pick **Fadetouched-Modern** in **System Settings → Colors & Themes →
Cursors** (KDE), or your desktop's cursor setting.

## Build

The pack is generated, not hand-edited. Source is the vendored Bibata SVGs in
`src/`, the recolor map in `build/colors.mjs`, and the spinner generator in
`build/spinner.mjs`.

One-time tools (kept out of `package.json` so the theme build stays
dependency-free):
```sh
uv tool install clickgen                          # provides ctgen
PUPPETEER_SKIP_DOWNLOAD=true npm i --no-save cbmp@1.1.1
```
`cbmp` renders SVG to PNG; `ctgen` packages the XCursor and Windows sets. System
Python without a working pip can install `ctgen` through `uv` as shown.

Then:
```sh
npm run pack:cursor
```
Outputs the Windows folder and the XCursor tarball into `dist/`. If `cbmp` is not
in the repo's `node_modules`, point to it with `CBMP=/path/to/cbmp npm run
pack:cursor`. A contact sheet is written when ImageMagick's `montage` is present.
