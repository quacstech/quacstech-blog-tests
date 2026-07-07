import type { Response } from '@playwright/test';
import { test, expect } from '../fixtures';
import { HomePage } from '../pages/HomePage';
import { PostPage } from '../pages/PostPage';

test.describe('Feature: Smoke test — critical path for the quacs.tech blog', () => {
  test('Scenario: Homepage loads successfully', async ({ page }) => {
    const home = new HomePage(page);
    let response: Response | null = null;

    await test.step('When a visitor navigates to the homepage', async () => {
      response = await home.goto();
    });

    await test.step('Then the page responds successfully', () => {
      expect(response?.ok()).toBeTruthy();
    });

    await test.step('And the site title is visible', async () => {
      await expect(home.nav.siteTitle).toBeVisible();
    });

    await test.step('And the primary navigation is visible', async () => {
      await expect(home.nav.topNavLinks.first()).toBeVisible();
    });
  });

  test('Scenario: Visitor can open a blog post from the homepage', async ({ page }) => {
    const home = new HomePage(page);
    const post = new PostPage(page);
    let homeUrl = '';

    await test.step('Given the visitor is on the homepage', async () => {
      await home.goto();
      homeUrl = page.url();
    });

    await test.step('When they open the first listed post', async () => {
      await home.openFirstPost();
    });

    await test.step('Then the post page loads successfully', async () => {
      await expect(page).not.toHaveURL(homeUrl);
    });

    await test.step('And the post title is visible', async () => {
      await expect(post.title).toBeVisible();
    });

    await test.step('And the post content is visible', async () => {
      await expect(post.content).toBeVisible();
    });
  });

  test("Scenario: Primary navigation reaches the blog's key sections", async ({ page }) => {
    const home = new HomePage(page);

    await test.step('Given the visitor is on the homepage', async () => {
      await home.goto();
    });

    await test.step('Then the primary navigation includes a link to the posts index', async () => {
      await expect(home.nav.topNavLinks.filter({ hasText: 'articles' })).toBeVisible();
    });

    await test.step('And the primary navigation includes a link to the AI digest page', async () => {
      await expect(home.nav.topNavLinks.filter({ hasText: 'ai digest' })).toBeVisible();
    });
  });

  test('Scenario: Site renders fully without a broken page', async ({ page }) => {
    const home = new HomePage(page);
    let response: Response | null = null;

    await test.step('When a visitor navigates to the homepage', async () => {
      response = await home.goto();
    });

    await test.step('Then no server error or blank page is shown', () => {
      expect(response?.ok()).toBeTruthy();
    });

    await test.step('And the footer is visible, confirming the full page rendered', async () => {
      await expect(home.nav.footer).toBeVisible();
    });
  });

  test('Scenario: All menu links are clickable', async ({ page }) => {
    const home = new HomePage(page);

    await test.step('Given the visitor is on the homepage', async () => {
      await home.goto();
    });

    await test.step('Then each link in the top menu bar is visible', async () => {
      const count = await home.nav.topNavLinks.count();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        await expect(home.nav.topNavLinks.nth(i)).toBeVisible();
      }
    });

    await test.step('And each link in the top menu bar is enabled and clickable', async () => {
      const count = await home.nav.topNavLinks.count();
      for (let i = 0; i < count; i++) {
        const link = home.nav.topNavLinks.nth(i);
        await expect(link).toBeEnabled();
        await expect(link).toHaveAttribute('href', /.+/);
      }
    });

    await test.step('And each link in the left-side menu is visible', async () => {
      const count = await home.nav.sidebarNavLinks.count();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        await expect(home.nav.sidebarNavLinks.nth(i)).toBeVisible();
      }
    });

    await test.step('And each link in the left-side menu is enabled and clickable', async () => {
      const count = await home.nav.sidebarNavLinks.count();
      for (let i = 0; i < count; i++) {
        const link = home.nav.sidebarNavLinks.nth(i);
        await expect(link).toBeEnabled();
        await expect(link).toHaveAttribute('href', /.+/);
      }
    });
  });
});
