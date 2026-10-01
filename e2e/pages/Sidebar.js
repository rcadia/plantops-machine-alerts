export class Sidebar {
  constructor(page) {
    this.page = page;
    this.nav = page.getByRole('navigation');
    this.alertsBadge = this.link(/Alerts/).locator('.count-pill');
  }

  link(name) {
    return this.nav.getByRole('link', { name });
  }

  async goTo(name) {
    await this.link(name).click();
  }

  async switchRole(role) {
    await this.page.locator('.sidebar-footer').getByRole('tab', { name: role }).click();
  }
}
