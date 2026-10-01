import L from '../locators/ruleModal.json' with { type: 'json' };
import { sel } from './selector';

export class RuleModal {
  constructor(page) {
    this.dialog = page.locator(L.dlgNewRule);
    this.name = this.dialog.locator(L.txtRuleName);
    this.department = this.dialog.locator(L.ddlDepartment);
    this.recipients = this.dialog.locator(L.txtRecipients);
    this.summary = this.dialog.locator(L.lblSummary);
    this.error = this.dialog.locator(L.lblError);
  }

  async addRecipient(name) {
    await this.recipients.fill(name);
    await this.recipients.press('Enter');
  }

  async removeRecipient(recipient) {
    await this.dialog.locator(sel(L.btnRemoveRecipient, { recipient })).click();
  }

  async setSeverity(severity) {
    await this.dialog.locator(sel(L.tabSeverity, { severity })).click();
  }

  channel(channel) {
    return this.dialog.locator(sel(L.chkChannel, { channel }));
  }

  async save() {
    await this.dialog.locator(L.btnSave).click();
  }

  async cancel() {
    await this.dialog.locator(L.btnCancel).click();
  }
}
