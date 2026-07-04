---
description: Generate Gherkin scenarios for a feature area, wait for approval
argument-hint: [feature-area, e.g. smoke | login | checkout]
allowed-tools: Read, Glob, Grep, Write
---

Generate Gherkin scenarios for the feature area: **$ARGUMENTS** of saucedemo.com.

## Process

1. Read `CLAUDE.md` and any existing `.feature` files under `tests/features/` to match existing style and avoid duplicating scenarios.
2. Draft Gherkin scenarios in a proper `Feature:` block:
   - Use declarative, business-readable language (what the user does, not how the UI works — no selectors, no waits).
   - Cover the happy path first, then key negative and edge cases relevant to **$ARGUMENTS**.
   - Use `Scenario Outline` with `Examples` tables where multiple data variants apply (e.g. different user types: standard_user, locked_out_user, problem_user).
   - Tag scenarios appropriately (e.g. `@smoke`, `@regression`).
3. Present the drafted scenarios in the chat for review.

## Approval gate — IMPORTANT

**STOP after presenting the scenarios. Do NOT write any files yet.**

Ask: "Do you approve these scenarios, or would you like changes?"

Only after explicit approval, write the approved scenarios to `tests/features/$ARGUMENTS.feature`. If changes are requested, revise and present again — repeat until approved.
