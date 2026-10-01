import { BasePage, toggleSwitch } from './BasePage';
import { RuleModal } from './RuleModal';

export class RulesPage extends BasePage {
  path = '/rules';

  constructor(page) {
    super(page);
    this.rows = page.locator('.rules-grid:not(.is-head)');
    this.modal = new RuleModal(page);
  }

  row(trigger) {
    return this.rows.filter({ hasText: trigger });
  }

  ruleSwitch(trigger) {
    return this.row(trigger).getByRole('switch');
  }

  async toggleRule(trigger) {
    await toggleSwitch(this.row(trigger));
  }

  async openNewRule() {
    await this.page.getByRole('button', { name: '+ Add rule' }).click();
    return this.modal;
  }
}
