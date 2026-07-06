---
description: Generate a visual regression test with screenshot assertion for a page
argument-hint: [page-name, e.g. homepage | post | archive]
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(npx tsc:*)
---

Generate a visual regression test for the **$ARGUMENTS** page of the quacs.tech Hugo blog.

## Process

1. Read `CLAUDE.md`, `playwright.config.ts`, and existing page objects/fixtures to reuse navigation — do not reimplement it. This is a public site with no login/auth flow.
2. Add a test to `tests/specs/visual.spec.ts` (create it if it doesn't exist yet — this file is the single home for all visual tests, matched by the `visual` project in `playwright.config.ts`):
   - Navigate to the $ARGUMENTS page via an existing POM method from `tests/pages/` (add one if missing).
   - Wait for the page to be fully ready using web-first assertions on key elements — never `waitForTimeout`.
   - Assert with `await expect(page).toHaveScreenshot('$ARGUMENTS.png', { ... })`:
     - Set `fullPage: true` unless the page has infinite/lazy content.
     - `mask` any dynamic elements (timestamps, ai-digest content, animations) to prevent flaky diffs.
     - Disable animations via `animations: 'disabled'`.
     - Do not override `maxDiffPixels`/`threshold` per-call — rely on the project-wide values in `playwright.config.ts` (100 / 0.2 per CLAUDE.md) unless this page has a documented reason to differ.
   - Tag the test `@visual`.
3. Remind the user of CLAUDE.md's rule: visual tests run in Docker only, for consistent rendering across environments. Baselines must be generated/updated via `npm run test:visual` (`docker compose run --rm playwright ...`) — never with a locally-installed browser — and committed to `tests/specs/snapshots/` immediately after updating.
4. Verify: run `npx tsc --noEmit` only. Do NOT run the visual test locally to generate baselines — a macOS-generated baseline will fail on the Linux/Docker runner. Tell the user to run `npm run test:visual` (with `--update-snapshots` first to create the baseline, then without to confirm it passes) inside Docker.
5. Summarize: test added, baseline expected at `tests/specs/snapshots/`, masked elements and why, and the Docker command needed to generate the baseline.
