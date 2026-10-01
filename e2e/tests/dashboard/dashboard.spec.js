import { expect, test } from '../../fixtures';

test.beforeEach(async ({ dashboardPage }) => {
  await dashboardPage.goto();
});

test('KPI tiles summarise the fleet', async ({ dashboardPage }) => {
  await expect(dashboardPage.kpi('MACHINES ONLINE')).toContainText('1 down · PK-02');
  await expect(dashboardPage.kpiValue('AVG CAPACITY')).toHaveText('79%');
  await expect(dashboardPage.kpiValue('OVER THRESHOLD')).toHaveText('2');
  await expect(dashboardPage.kpi('OVER THRESHOLD')).toContainText('IM-04, PR-07');
  await expect(dashboardPage.kpiValue('PARTS TO REPLACE')).toHaveText('5');
});

test('machine cards show status, capacity and part life', async ({ dashboardPage }) => {
  await expect(dashboardPage.machineStatus('IM-04')).toHaveText('Over threshold');
  await expect(dashboardPage.machineCapacity('IM-04')).toHaveText('94% / 85%');
  await expect(dashboardPage.machineStatus('CNC-01')).toHaveText('Service due');
  await expect(dashboardPage.machineStatus('LC-02')).toHaveText('Running');
  await expect(dashboardPage.partLife('IM-04', 'Heater band')).toHaveText('8%');
});
