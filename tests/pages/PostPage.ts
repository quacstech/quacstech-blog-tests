import type { Locator, Page } from '@playwright/test';

export class PostPage {
  readonly title: Locator;
  readonly content: Locator;

  constructor(page: Page) {
    this.title = page.getByRole('heading', { level: 1 });
    this.content = page.locator('.article-body');
  }
}
