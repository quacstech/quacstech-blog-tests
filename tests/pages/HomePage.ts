import type { Locator, Page, Response } from '@playwright/test';
import { Navigation } from './Navigation';

export class HomePage {
  readonly page: Page;
  readonly nav: Navigation;
  readonly firstPost: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = new Navigation(page);
    this.firstPost = page.locator('.article-list a.article-item').first();
  }

  async goto(): Promise<Response | null> {
    return this.page.goto('/');
  }

  async openFirstPost(): Promise<void> {
    await this.firstPost.click();
  }
}
