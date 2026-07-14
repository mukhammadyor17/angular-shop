# Sprint 1 — Development Notes

**Author:** mukhammadyor17 | **Date:** 2026-05-16

---

## [feat] Created `BaseTitle` and `BaseCard` base components

- Added two reusable base components: `base-title` and `base-card` under `src/app/components/base/`
- `BaseTitle` includes its own styles for typography control
- `BaseCard` is a wrapper component — a good candidate for using `ng-content` to pass dynamic content inside

## [style] Updated font-family and main color

- Adjusted global design tokens in `src/styles/tokens.scss`
- Changed font-family and primary colors to align with the new design direction

## [change] Built out `PageHeader` and `PageFooter` content

- Implemented real content for both layout shell components (previously likely empty or placeholder)
- Registered new routes in `app.routes.ts` — new pages are now accessible
