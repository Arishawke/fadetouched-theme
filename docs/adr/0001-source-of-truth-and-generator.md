# 1. palette.json is the source of truth; ports are generated

Date: 2026-06-07

## Status

Accepted.

## Context

Fadetouched ships to many apps (editors, terminals, web). Each app has its own
theme format. Keeping a dozen hand-written theme files in sync by hand is how
multi-app themes drift and rot.

## Decision

`palette.json` holds the only authored colors (12 neutrals + 12 accents) and the
**role maps** (semantic + syntax). Every port is a pure function of that file,
written as a module under `scripts/ports/` and emitted by `npm run build`. Ports
map **roles**, never raw hex, so a palette change reaches every app for free. CI
regenerates and fails on any drift between the committed ports and `palette.json`.

The neutral ramp is authored in OKLCH so it is evenly spaced in *perceptual*
lightness, which keeps blur, acrylic, and transparency clean. The hex in
`palette.json` is the OKLCH export; ports read that hex directly rather than
re-deriving from OKLCH, so colors are bit-exact.

## Consequences

- One edit (`palette.json`) updates all ports; consistency is enforced, not
  hoped for.
- Adding an app is a one-time role mapping, reviewable in isolation.
- Terminal "bright" ANSI colors are the **one** computed value: each accent
  lifted in OKLCH by `L × 1.07`, `C × 1.06`. This reproduces the original
  hand-tuned brights to within ≤ 2/255 per channel (sub-perceptual). We keep the
  documented formula rather than pinning the original hex, so brights stay
  consistent if an accent changes. See [CHANGELOG](../../CHANGELOG.md).
- Zero runtime dependencies (Node built-ins only), so there is no supply chain to
  scan and the build is reproducible.
