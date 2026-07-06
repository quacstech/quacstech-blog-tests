---
description: Draft acceptance scenarios for a spec area, wait for approval
argument-hint: [spec-area, e.g. smoke | content | ai-digest | visual]
allowed-tools: Read, Glob, Grep
---

Draft Gherkin-style scenarios for the spec area: **$ARGUMENTS** of the quacs.tech Hugo blog.

## Process

1. Read `CLAUDE.md` for this project's four spec areas (smoke, content, ai-digest, visual) and their specific rules, and read `tests/specs/$ARGUMENTS.spec.ts` if it already exists to avoid duplicating coverage.
2. Draft scenarios in a proper `Feature:` block:
   - Use declarative, business-readable language (what a visitor does or sees on the blog — no selectors, no waits).
   - Cover the happy path first, then key edge cases relevant to **$ARGUMENTS** — e.g. for `ai-digest`, scenarios must check structure/recency/presence per CLAUDE.md's dynamic content rules, never exact text or counts.
   - Tag scenarios appropriately (e.g. `@smoke`, `@regression`, `@visual`).
3. Present the drafted scenarios in the chat for review.

## Approval gate — IMPORTANT

**STOP after presenting the scenarios. Do NOT write any files.**

Ask: "Do you approve these scenarios, or would you like changes?"

This project has no `tests/features/` directory — once approved, the scenarios stay in this conversation. Run `/generate-tests $ARGUMENTS` next, in the same conversation, to implement them as `tests/specs/$ARGUMENTS.spec.ts`.
