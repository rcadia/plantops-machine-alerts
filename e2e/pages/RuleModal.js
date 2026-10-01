export class RuleModal {
  constructor(page) {
    this.dialog = page.getByRole('dialog', { name: 'New routing rule' });
    this.name = this.dialog.getByLabel('Rule name');
    this.department = this.dialog.getByLabel('Department');
    this.recipients = this.dialog.getByLabel('Recipients');
    this.summary = this.dialog.locator('.summary-text');
    this.error = this.dialog.getByRole('alert');
  }

  async addRecipient(name) {
    await this.recipients.fill(name);
    await this.recipients.press('Enter');
  }

  async removeRecipient(name) {
    await this.dialog.locator('.chip', { hasText: name }).getByRole('button', { name: 'Remove' }).click();
  }

  async setSeverity(sev) {
    await this.dialog.getByRole('tab', { name: sev }).click();
  }

  channel(label) {
    return this.dialog.getByLabel(label);
  }

  async save() {
    await this.dialog.getByRole('button', { name: 'Save rule' }).click();
  }

  async cancel() {
    await this.dialog.getByRole('button', { name: 'Cancel' }).click();
  }
}
