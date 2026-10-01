import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  path = '/dashboard';

  constructor(page) {
    super(page);
    this.machineCards = page.locator('.machine-card');
  }

  kpi(label) {
    return this.page.locator('.kpi', { hasText: label });
  }

  kpiValue(label) {
    return this.kpi(label).locator('.kpi-value');
  }

  machine(text) {
    return this.machineCards.filter({ hasText: text });
  }

  machineStatus(text) {
    return this.machine(text).locator('.badge');
  }

  machineCapacity(text) {
    return this.machine(text).locator('.capacity-nums');
  }

  partLife(machine, part) {
    return this.machine(machine).locator('.part-row', { hasText: part }).locator('.part-pct');
  }
}
