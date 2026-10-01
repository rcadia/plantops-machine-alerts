import { test as base } from '@playwright/test';
import { AlertsPage } from './pages/AlertsPage';
import { ChannelsPage } from './pages/ChannelsPage';
import { DashboardPage } from './pages/DashboardPage';
import { RulesPage } from './pages/RulesPage';

export const test = base.extend({
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  alertsPage: async ({ page }, use) => use(new AlertsPage(page)),
  rulesPage: async ({ page }, use) => use(new RulesPage(page)),
  channelsPage: async ({ page }, use) => use(new ChannelsPage(page)),
});

export { expect } from '@playwright/test';
