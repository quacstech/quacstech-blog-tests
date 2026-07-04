# Hugo Blog Playwright Tests
## Purpose
Regression + visual test suite for quacs.tech Hugo blog.
Four concerns: smoke, content, AI digest (dynamic), visual.
## Stack
Playwright + TypeScript, dotenv, Docker, GitHub Actions
## Structure
tests/
specs/
smoke.spec.ts - critical path, runs on every deploy
content.spec.ts - navigation, links, images, static pages
ai-digest.spec.ts - dynamic page, structure not exact values
visual.spec.ts - screenshot comparison tests
snapshots/ - baseline screenshots, committed to git
pages/ - Page Object Models
fixtures/ - shared fixtures
## Dynamic content rules (ai-digest.spec.ts)
- NEVER assert exact text on autonomously updated pages
- Always assert structure, visibility, presence
- Date assertions: check recency (within 7 days), not exact value
- Image assertions: src not empty, image visible
- List assertions: count > 0, never exact count
## Visual test rules
- Run in Docker only — ensures consistent rendering across environments
- Threshold: maxDiffPixels 100, threshold 0.2
- Update snapshots intentionally: npx playwright test --update-snapshots
- Commit updated snapshots to git immediately after update
## Environment
BASE_URL from process.env — no credentials needed (public site)
## Commands
npx playwright test
npx playwright test --project=chromium
npx playwright test --update-snapshots
docker compose run --rm playwright npx playwright test