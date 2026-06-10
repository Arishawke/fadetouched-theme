# 2. ports/cursor is a GPL-3.0 island in an MIT repo

Date: 2026-06-09

## Status

Accepted.

## Context

Fadetouched ships under MIT (see `LICENSE`). The cursor port derives from Bibata
Modern, which is GPL-3.0. A derivative of GPL-3.0 work must itself be GPL-3.0; it
cannot be relicensed as MIT. We still want the rest of the repo to stay MIT.

## Decision

`ports/cursor/` is licensed GPL-3.0, with its own `LICENSE` (the full GPL-3.0
text) and `ATTRIBUTION.md` crediting Abdulkaiz Khatri / Bibata. Everything
outside that directory remains MIT. The split is documented in the root README
under License.

The cursor's authored source (the veilfire spinner generator and the recolor
map) lives alongside the vendored Bibata sources inside `ports/cursor/`, so the
GPL boundary is a single directory. The pure-JS theme generator and all other
ports do not import anything from `ports/cursor/`, so no GPL code reaches the MIT
side.

## Consequences

- The cursor pack and its sources carry GPL-3.0 obligations: redistribution must
  keep the license and attribution, and offer corresponding source. Vendoring the
  Bibata sources plus the build scripts in `ports/cursor/` satisfies the source
  requirement.
- The boundary is directory-level and one-directional, so the MIT guarantee for
  the rest of the project is unaffected.
- Build tools (clickgen, cbmp) are MIT and used, not redistributed, so they add
  no further obligations.
