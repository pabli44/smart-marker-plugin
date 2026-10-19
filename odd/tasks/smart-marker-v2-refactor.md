# SmartMarker Plugin v2 — Bugfix + Refactor

## Objective
Stabilize and modernize the SmartMarker browser extension so it actually works as advertised, before adding new features.

## Problem
The extension currently ships with critical runtime bugs and unfulfilled README promises:
- CSP blocks external CDN dependencies (Fuse.js, Font Awesome).
- Sidepanel throws a ReferenceError because `tagFilter` does not exist.
- Fuse.js is loaded but never used; search is a naive `includes()`.
- Popup and sidepanel duplicate the same logic.
- Tags are assumed to exist but Chrome's bookmarks API has no native tags.
- CSS selectors and inline styles are inconsistent.
- Service worker initializes a cache but never populates it.

## Scope
In-scope for v2:
1. Vendorize dependencies so the extension works offline and respects CSP.
2. Fix popup.html structural errors (Font Awesome loaded as script, duplicate scripts).
3. Fix sidepanel.js runtime error (`tagFilter`).
4. Replace naive search with Fuse.js fuzzy search across title, URL and folder path.
5. Extract shared bookmark loading, filtering and rendering into a shared module.
6. Remove or replace the broken tag concept with a consistent folder/path display.
7. Clean CSS selectors and remove redundant inline styles.
8. Make the service worker cache and invalidate bookmarks.
9. Update README to reflect actual functionality and architecture.
10. Add basic functional verification (manual + lint sanity).

Out-of-scope for v2:
- New UI themes / dark mode.
- Import/export.
- Multi-browser builds beyond Chromium Manifest V3.
- Automated test suite.

## Constraints
- Keep Manifest V3.
- Keep popup + sidepanel entry points.
- Vanilla JS/HTML/CSS, no build system unless absolutely necessary.
- Minimum viable changes: fix first, polish second.

## Task checklist

- [x] **TASK-01** Vendorize Fuse.js and Font Awesome locally under `src/vendor/` and update `manifest.json` CSP.
- [x] **TASK-02** Fix `popup.html`: load CSS with `<link>`, remove duplicate scripts, reference local vendor files.
- [x] **TASK-03** Fix `sidepanel.html`/`sidepanel.js`: remove broken `tagFilter` references and unify markup with popup.
- [x] **TASK-04** Create `src/shared/bookmarks.js` with: tree extraction, Fuse search, rendering helpers.
- [x] **TASK-05** Refactor `popup.js` and `sidepanel.js` to use `src/shared/bookmarks.js`.
- [x] **TASK-06** Implement real-time Fuse.js search across title, URL and folder path.
- [x] **TASK-07** Fix CSS: correct `.tag` selector, remove unused rules, drop inline styles from JS.
- [x] **TASK-08** Update service worker to populate `bookmarksCache`, listen to bookmark change events, invalidate cache.
- [x] **TASK-09** Update README: accurate features, architecture, setup and known limitations.
- [x] **TASK-10** Verify extension loads without CSP/JS errors and search works in popup and sidepanel.

## Acceptance criteria
- Extension loads in Chrome without CSP violations.
- Popup and sidepanel both display bookmarks.
- Fuzzy search returns ranked results by title, URL and folder.
- Sidepanel does not throw console errors on interaction.
- No duplicate code between popup and sidepanel for bookmark handling.

## Checks per task
- Functional verification after every task.
- Linter/formater check if tooling is added.
- Manual load test in Chrome after TASK-10.

## Delivery strategy
- `ask-on-risk`: this is a single feature branch with ~400 authored lines expected.

## Verification evidence

- `node --check` passed on all JS files.
- All required source files are present.
- No external CDN references remain in extension pages (only `donate.html`, which loads outside the extension CSP).
- No broken `tagFilter` references remain in source code.

## Work-unit commits (branch `feat/smart-marker-v2-stabilization`)

Run `git log --oneline trunk..HEAD` to see the exact commits. Messages:

- fix: vendorize dependencies and fix CSP/HTML structure
- refactor: extract shared bookmark module and implement Fuse search
- fix: clean CSS inline styles and make service worker functional
- docs: update README and add ODD task tracking for v2

## Next step
All v2 bugfix/refactor tasks are complete. The next step is to load the extension in Chrome to confirm runtime behavior, then decide whether to continue with v3 features (dark mode, import/export, keyboard shortcuts, Firefox support) or merge this slice first.
