import { BasePage } from './BasePage';

export class AlertsPage extends BasePage {
  path = '/alerts';

  constructor(page) {
    super(page);
    this.rows = page.locator('.alert-row');
  }

  row(title) {
    return this.rows.filter({ hasText: title });
  }

  filter(dept) {
    return this.page.getByRole('button', { name: dept, exact: true });
  }

  async filterBy(dept) {
    await this.filter(dept).click();
  }

  acknowledgeButton(title) {
    return this.row(title).getByRole('button', { name: 'Acknowledge' });
  }

  async acknowledge(title) {
    await this.acknowledgeButton(title).click();
  }

  acknowledgedBy(title, who) {
    return this.row(title).getByText(`Acknowledged · ${who}`);
  }
}
