---
description: Code review of a test file — report only, never modifies code
argument-hint: [path, e.g. tests/specs/smoke.spec.ts]
allowed-tools: Read, Glob, Grep
---

Perform a code review of: **$ARGUMENTS**

**REPORT ONLY. Do not modify, fix, or rewrite any code. Do not offer to apply fixes.** Your tools are intentionally restricted to read-only for this command.

## Process

1. Read `$ARGUMENTS`. Also read `CLAUDE.md` and any files it references (page objects, fixtures) as needed to judge the code in context.
2. Review against these criteria:
   - **Framework conventions**: follows the project's layering (Config → POM → Fixture → Test)? No selectors or navigation logic leaking into specs?
   - **Playwright best practices**: web-first assertions, no hard waits / `waitForTimeout`, user-facing locators (`getByRole`, `getByTestId`) over CSS/XPath, proper use of fixtures.
   - **Test design**: independent tests, clear naming, one behavior per test, meaningful assertions (not just "element visible"), negative cases covered where relevant.
   - **Reliability**: flakiness risks (race conditions, order dependence, shared state, brittle locators).
   - **Security/config hygiene**: no hardcoded credentials or URLs, env access via the fixture.
   - **TypeScript quality**: typing, no `any` without justification, dead code.

## Output format

Produce a review report:

1. **Summary** — 2–3 sentences, overall assessment.
2. **Findings** — each with severity (🔴 Critical / 🟡 Major / 🔵 Minor / 💡 Suggestion), file:line reference, what the issue is, why it matters, and a recommended direction (described, not implemented).
3. **What's done well** — brief, genuine positives.
4. **Verdict** — approve / approve with comments / needs changes.

If there are no significant findings, say so — do not manufacture issues.
