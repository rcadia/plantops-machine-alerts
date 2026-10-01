import L from '../locators/alerts.json' with { type: 'json' };
import { BasePage } from './BasePage';
import { sel } from './selector';

export class AlertsPage extends BasePage {
  path = '/alerts';

  constructor(page) {
    super(page);
    this.rows = page.locator(L.rows);
  }

  row(title) {
    return this.page.locator(sel(L.row, { title }));
  }

  filter(department) {
    return this.page.locator(sel(L.btnFilter, { department }));
  }

  async filterBy(department) {
    await this.filter(department).click();
  }

  acknowledgeButton(title) {
    return this.row(title).locator(L.btnAcknowledge);
  }

  async acknowledge(title) {
    await this.acknowledgeButton(title).click();
  }

  acknowledgedBy(title, who) {
    return this.row(title).locator(sel(L.lblAcknowledgedBy, { who }));
  }
}
