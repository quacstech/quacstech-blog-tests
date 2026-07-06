---
description: Generate a Playwright TypeScript spec from approved scenarios
argument-hint: [spec-name, e.g. smoke | content | ai-digest]
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(npx playwright test:*), Bash(npx tsc:*)
---

Generate a Playwright TypeScript spec implementing the scenarios for **$ARGUMENTS**.

## Process

1. Use the scenarios approved earlier in this conversation via `/generate-scenarios $ARGUMENTS`. If none exist in context, stop and say so — do not invent scenarios. Suggest running `/generate-scenarios $ARGUMENTS` first.
2. Read `CLAUDE.md`, `playwright.config.ts`, and existing code under `tests/` (page objects, fixtures, specs) to follow the established framework conventions — including the dynamic-content rules for `ai-digest` (assert structure/recency/presence, never exact values) if `$ARGUMENTS` is `ai-digest`.
3. Implement each scenario as a test in `tests/specs/$ARGUMENTS.spec.ts`:
   - Use existing Page Objects and fixtures — do NOT put selectors or raw `page.goto()` calls directly in specs. If a needed Page Object method is missing, add it to the appropriate POM class in `tests/pages/`.
   - Map scenario structure to test structure: `Feature` → `test.describe`, `Scenario` → `test`, keep the scenario text as the test title, and reflect Given/When/Then as `test.step()` blocks.
   - `BASE_URL` comes from the env fixture (`requireEnv` in `tests/fixtures/index.ts`) — never hardcode it. This is a public site: no credentials or login flow.
   - Use web-first assertions (`await expect(locator).toHaveText(...)`) — no manual waits, no `waitForTimeout`.
   - One assertion focus per test; keep tests independent (no shared state between tests).
4. Verify: run `npx tsc --noEmit`, then `npx playwright test tests/specs/$ARGUMENTS.spec.ts`. Fix failures caused by the generated code. If a failure looks like a genuine application bug or missing env variable, report it instead of hacking around it.
5. Summarize: list scenarios implemented, files created/modified, and test results.
