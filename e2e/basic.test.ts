import { expect, test } from '@playwright/test';

test.describe('Happy paths', () => {
  test('should go to recipes page from home', async ({ page }) => {
    await page.goto('/');

    const button = page.locator('text=Wszystkie przepisy');
    expect(button).toBeDefined();

    await button.click();

    await expect(page).toHaveURL(/recipes/);
  });
});
