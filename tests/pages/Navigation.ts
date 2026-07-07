import type { Locator, Page } from '@playwright/test';

export class Navigation {
  readonly siteTitle: Locator;
  readonly topNavLinks: Locator;
  readonly sidebarNavLinks: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.siteTitle = page.locator('.site-title');
    this.topNavLinks = page.getByRole('navigation').getByRole('link');
    this.sidebarNavLinks = page.getByRole('complementary').getByRole('link');
    this.footer = page.getByRole('contentinfo');
  }
}
