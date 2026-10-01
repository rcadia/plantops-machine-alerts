import { expect, test } from '../fixtures';

test('dashboard shows KPIs and every machine', async ({ page, dashboardPage }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(dashboardPage.heading).toHaveText('Capacity & thresholds');
  await expect(dashboardPage.kpiValue('MACHINES ONLINE')).toHaveText('5/6');
  await expect(dashboardPage.machineCards).toHaveCount(6);
  await expect(dashboardPage.machineStatus('Packaging unit')).toHaveText('Down');
});

test('acknowledging an alert updates the row and the open count', async ({ alertsPage }) => {
  await alertsPage.goto();
  await expect(alertsPage.sidebar.alertsBadge).toHaveText('7');

  await alertsPage.acknowledge('Packaging unit stopped');

  await expect(alertsPage.acknowledgedBy('Packaging unit stopped', 'R. Bendal')).toBeVisible();
  await expect(alertsPage.acknowledgeButton('Packaging unit stopped')).toHaveCount(0);
  await expect(alertsPage.sidebar.alertsBadge).toHaveText('6');
});

test('department filter narrows the alert list', async ({ alertsPage }) => {
  await alertsPage.goto();
  await expect(alertsPage.rows).toHaveCount(7);

  await alertsPage.filterBy('Production');

  await expect(alertsPage.rows).toHaveCount(2);
  for (const row of await alertsPage.rows.all()) {
    await expect(row).toContainText('→ Production');
  }
});

test('admin can add a routing rule', async ({ rulesPage }) => {
  await rulesPage.goto();
  await expect(rulesPage.rows).toHaveCount(6);

  const modal = await rulesPage.openNewRule();
  await expect(modal.dialog).toBeVisible();

  await modal.name.fill('Heater band wear – Line B');
  await modal.department.selectOption('Quality');
  await modal.addRecipient('QA lead');
  await modal.setSeverity('Critical');
  await expect(modal.summary).toContainText(/send a critical alert to Quality \(2 recipients\)/);

  await modal.save();

  await expect(modal.dialog).toBeHidden();
  await expect(rulesPage.rows).toHaveCount(7);
  await expect(rulesPage.rows.last()).toContainText('Heater band wear – Line B');
  await expect(rulesPage.rows.last()).toContainText('Maintenance team (6), QA lead');
});

test('user role only sees dashboard and their own alerts', async ({ page, rulesPage, alertsPage }) => {
  await rulesPage.goto();
  await rulesPage.sidebar.switchRole('User');

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(rulesPage.sidebar.link('Routing rules')).toHaveCount(0);
  await expect(rulesPage.sidebar.link('Channels')).toHaveCount(0);

  await rulesPage.sidebar.goTo('Alerts');
  await expect(alertsPage.rows).toHaveCount(3);
  await expect(alertsPage.filter('Production')).toHaveCount(0);
});
