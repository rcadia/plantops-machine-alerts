import { expect, test } from '@playwright/test';

const nav = (page) => page.getByRole('navigation');

test('dashboard shows KPIs and every machine', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Capacity & thresholds');
  await expect(page.getByText('5/6')).toBeVisible();
  await expect(page.locator('.machine-card')).toHaveCount(6);

  const packaging = page.locator('.machine-card', { hasText: 'Packaging unit' });
  await expect(packaging.getByText('Down')).toBeVisible();
});

test('acknowledging an alert updates the row and the open count', async ({ page }) => {
  await page.goto('/alerts');
  const badge = nav(page).getByRole('link', { name: /Alerts/ }).locator('.count-pill');
  await expect(badge).toHaveText('7');

  const row = page.locator('.alert-row', { hasText: 'Packaging unit stopped' });
  await row.getByRole('button', { name: 'Acknowledge' }).click();

  await expect(row.getByText('Acknowledged · R. Bendal')).toBeVisible();
  await expect(row.getByRole('button', { name: 'Acknowledge' })).toHaveCount(0);
  await expect(badge).toHaveText('6');
});

test('department filter narrows the alert list', async ({ page }) => {
  await page.goto('/alerts');
  await expect(page.locator('.alert-row')).toHaveCount(7);

  await page.getByRole('button', { name: 'Production' }).click();

  const rows = page.locator('.alert-row');
  await expect(rows).toHaveCount(2);
  for (const row of await rows.all()) {
    await expect(row).toContainText('→ Production');
  }
});

test('admin can add a routing rule', async ({ page }) => {
  await page.goto('/rules');
  const rows = page.locator('.rules-grid:not(.is-head)');
  await expect(rows).toHaveCount(6);

  await page.getByRole('button', { name: '+ Add rule' }).click();
  const modal = page.getByRole('dialog', { name: 'New routing rule' });
  await expect(modal).toBeVisible();

  await modal.getByLabel('Rule name').fill('Heater band wear – Line B');
  await modal.getByLabel('Department').selectOption('Quality');
  await modal.getByLabel('Recipients').fill('QA lead');
  await modal.getByLabel('Recipients').press('Enter');
  await modal.getByRole('tab', { name: 'Critical' }).click();
  await expect(modal.getByText(/send a critical alert to Quality \(2 recipients\)/)).toBeVisible();

  await modal.getByRole('button', { name: 'Save rule' }).click();

  await expect(modal).toBeHidden();
  await expect(rows).toHaveCount(7);
  await expect(rows.last()).toContainText('Heater band wear – Line B');
  await expect(rows.last()).toContainText('Maintenance team (6), QA lead');
});

test('user role only sees dashboard and their own alerts', async ({ page }) => {
  await page.goto('/rules');
  await page.locator('.sidebar-footer').getByRole('tab', { name: 'User' }).click();

  // Admin pages disappear and the user is sent back to the dashboard.
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(nav(page).getByRole('link', { name: 'Routing rules' })).toHaveCount(0);
  await expect(nav(page).getByRole('link', { name: 'Channels' })).toHaveCount(0);

  await nav(page).getByRole('link', { name: /Alerts/ }).click();
  await expect(page.locator('.alert-row')).toHaveCount(3);
  await expect(page.getByRole('button', { name: 'Production' })).toHaveCount(0);
});
