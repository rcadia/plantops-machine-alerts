import { expect, test } from '../../fixtures';

test.beforeEach(async ({ alertsPage }) => {
  await alertsPage.goto();
});

test('switching department filters back to All restores every alert', async ({ alertsPage }) => {
  await alertsPage.filterBy('Procurement');
  await expect(alertsPage.filter('Procurement')).toHaveAttribute('aria-pressed', 'true');
  await expect(alertsPage.rows).toHaveCount(1);
  await expect(alertsPage.rows.first()).toContainText('Stretch film low');

  await alertsPage.filterBy('All');
  await expect(alertsPage.filter('Procurement')).toHaveAttribute('aria-pressed', 'false');
  await expect(alertsPage.rows).toHaveCount(7);
});

test('acknowledged alerts stay acknowledged after navigating away', async ({ page, alertsPage }) => {
  await alertsPage.acknowledge('Stretch film low');
  await expect(alertsPage.row('Stretch film low')).toHaveClass(/is-acked/);

  await alertsPage.sidebar.goTo('Dashboard');
  await expect(page).toHaveURL(/\/dashboard$/);
  await alertsPage.sidebar.goTo('Alerts');

  await expect(alertsPage.acknowledgedBy('Stretch film low', 'R. Bendal')).toBeVisible();
  await expect(alertsPage.sidebar.alertsBadge).toHaveText('6');
});
