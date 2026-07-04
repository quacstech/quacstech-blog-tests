---
description: Generate a visual regression test with screenshot assertion for a page
argument-hint: [page-name, e.g. homepage | inventory | cart]
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(npx playwright test:*), Bash(npx tsc:*)
---

Generate a visual regression test for the **$ARGUMENTS** page of saucedemo.com.

## Process

1. Read `CLAUDE.md`, `playwright.config.ts`, and existing page objects/fixtures to reuse navigation and login flows — do not reimplement them.
2. Create (or extend) `tests/specs/visual/$ARGUMENTS.visual.spec.ts`:
   - Navigate to the $ARGUMENTS page via existing POM methods, logging in through the existing auth fixture if the page requires it.
   - Wait for the page to be fully ready using web-first assertions on key elements — never `waitForTimeout`.
   - Assert with `await expect(page).toHaveScreenshot('$ARGUMENTS.png', { ... })`:
     - Set `fullPage: true` unless the page has infinite/lazy content.
     - `mask` any dynamic elements (timestamps, cart badges with variable counts, animations) to prevent flaky diffs.
     - Set a sensible `maxDiffPixelRatio` (e.g. 0.01) rather than demanding pixel-perfect equality.
     - Disable animations via `animations: 'disabled'`.
   - Tag the test `@visual` so it can be included/excluded via `--grep`.
3. Check `playwright.config.ts` for a `snapshotPathTemplate` / `expect.toHaveScreenshot` config block; if missing, propose the addition and explain that baselines are platform-specific (a macOS baseline will fail on the Linux CI runner — baselines for CI should be generated with `--update-snapshots` on the CI platform or via Docker).
4. Verify: run `npx tsc --noEmit`, then run the test once with `--update-snapshots` to generate the baseline, then run it again without the flag to confirm it passes against the baseline.
5. Summarize: files created, baseline location, masked elements and why, and any config changes needed for CI.
