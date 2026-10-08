import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('overview renders without errors, theme persists, layout fits', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./');
  await expect(
    page.getByRole('heading', { name: 'Good patterns. Working examples.' }),
  ).toBeVisible();
  await expect(page.locator('.feature-card')).toHaveCount(6);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('angular-lab:dark')))
    .toBe('true');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: 'Switch to light theme' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('search, filters, favorites and error recovery work', async ({ page }) => {
  await page.goto('./#/data');
  await expect(page.locator('tbody tr')).toHaveCount(8);
  const signalFavorite = page.getByRole('button', {
    name: 'Save Signal state',
    exact: true,
  });
  await signalFavorite.click();
  await expect(signalFavorite).toHaveAttribute('aria-pressed', 'true');
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('angular-lab:favorites')))
    .toContain('"signals"');
  await page.reload();
  await expect(signalFavorite).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Saved only' }).click();
  await expect(page.locator('tbody tr')).toHaveCount(1);
  await page.getByRole('button', { name: 'Saved only' }).click();
  await page.getByRole('textbox', { name: 'Search features' }).fill('signal');
  await expect(page.locator('tbody tr')).toHaveCount(4);
  await page.getByRole('combobox', { name: 'Filter by category' }).selectOption('Reactivity');
  await expect(page.locator('tbody tr')).toHaveCount(2);
  await page.getByRole('button', { name: 'Simulate error' }).click();
  await expect(page.getByRole('alert')).toContainText('Could not load');
  await page.getByRole('button', { name: 'Retry request' }).click();
  await expect(page.getByRole('link', { name: 'Signal state' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Search features' }).fill('does-not-exist');
  await expect(page.getByText('No matching features.')).toBeVisible();
});

test('library form validates, previews and resets', async ({ page }) => {
  await page.goto('./#/forms');
  await page.getByRole('button', { name: 'Preview request' }).click();
  await expect(page.getByText('Your name is required.')).toBeVisible();
  await page.getByRole('textbox', { name: 'Your name' }).fill('Alex Morgan');
  await page.getByRole('textbox', { name: 'Email address' }).fill('alex@example.com');
  await page
    .getByRole('textbox', { name: 'A little about your project' })
    .fill('Build a reusable Angular application.');
  await page.getByRole('button', { name: 'Preview request' }).click();
  await expect(page.getByLabel('Request preview')).toContainText('alex@example.com');
  await page.getByRole('button', { name: 'Reset form' }).click();
  await expect(page.getByRole('textbox', { name: 'Your name' })).toHaveValue('');
  await page.getByRole('textbox', { name: 'Display name' }).fill('Viktor Kabanov');
  await page.getByRole('button', { name: 'Preview preferences' }).click();
  await expect(page.getByLabel('Preferences preview')).toContainText('Viktor Kabanov');
});

test('DI scopes are isolated and deferred code loads on interaction', async ({ page }) => {
  const chunks: string[] = [];
  page.on('request', (request) => {
    if (request.url().endsWith('.js')) chunks.push(request.url());
  });
  await page.goto('./#/architecture');
  await expect(page.locator('app-scoped-counter').first().locator('.metric-value')).toHaveText('0');
  await page.getByRole('button', { name: 'Increment Widget A' }).click();
  await expect(page.locator('app-scoped-counter').first().locator('.metric-value')).toHaveText('1');
  await expect(page.locator('app-scoped-counter').last().locator('.metric-value')).toHaveText('0');
  const before = chunks.length;
  await expect(page.locator('app-deferred-insights')).toHaveCount(0);
  await page.getByRole('button', { name: 'Load interactive insights' }).click();
  await expect(page.getByRole('heading', { name: 'Only pay for what you open.' })).toBeVisible();
  expect(chunks.length).toBeGreaterThan(before);
  await page.getByRole('slider').fill('200');
  await expect(page.getByText('Total 280 KB')).toBeVisible();
});

test('all pages pass an automated accessibility check', async ({ page }) => {
  for (const route of ['overview', 'data', 'forms', 'architecture']) {
    await page.goto('./#/' + route);
    await expect(page.locator('h1')).toBeVisible();
    if (route === 'data') await expect(page.locator('tbody tr')).toHaveCount(8);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(result.violations, route).toEqual([]);
  }
});

test('unknown routes have a working way home', async ({ page }) => {
  await page.goto('./#/missing');
  await page.getByRole('link', { name: 'Back to overview' }).click();
  await expect(
    page.getByRole('heading', { name: 'Good patterns. Working examples.' }),
  ).toBeVisible();
});
