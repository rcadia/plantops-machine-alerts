import L from '../locators/dashboard.json' with { type: 'json' };
import { BasePage } from './BasePage';
import { sel } from './selector';

export class DashboardPage extends BasePage {
  path = '/dashboard';

  constructor(page) {
    super(page);
    this.machineCards = page.locator(L.machineCards);
  }

  kpi(label) {
    return this.page.locator(sel(L.kpi, { label }));
  }

  kpiValue(label) {
    return this.kpi(label).locator(L.lblKpiValue);
  }

  machine(machine) {
    return this.page.locator(sel(L.machineCard, { machine }));
  }

  machineStatus(machine) {
    return this.machine(machine).locator(L.lblMachineStatus);
  }

  machineCapacity(machine) {
    return this.machine(machine).locator(L.lblMachineCapacity);
  }

  partLife(machine, part) {
    return this.machine(machine).locator(sel(L.lblPartLife, { part }));
  }
}
