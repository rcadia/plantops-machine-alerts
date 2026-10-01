import L from '../locators/sidebar.json' with { type: 'json' };
import { sel } from './selector';

export class Sidebar {
  constructor(page) {
    this.page = page;
    this.nav = page.locator(L.nav);
    this.alertsBadge = this.nav.locator(L.lblAlertsCount);
  }

  link(name) {
    return this.nav.locator(sel(L.lnkNav, { page: name }));
  }

  async goTo(name) {
    await this.link(name).click();
  }

  async switchRole(role) {
    await this.page.locator(sel(L.tabRole, { role })).click();
  }
}
