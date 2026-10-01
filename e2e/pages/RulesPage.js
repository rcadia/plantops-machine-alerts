import L from '../locators/rules.json' with { type: 'json' };
import { BasePage, toggleSwitch } from './BasePage';
import { RuleModal } from './RuleModal';
import { sel } from './selector';

export class RulesPage extends BasePage {
  path = '/rules';

  constructor(page) {
    super(page);
    this.rows = page.locator(L.rows);
    this.modal = new RuleModal(page);
  }

  row(trigger) {
    return this.page.locator(sel(L.row, { trigger }));
  }

  ruleSwitch(trigger) {
    return this.row(trigger).locator(L.tglRule);
  }

  async toggleRule(trigger) {
    await toggleSwitch(this.row(trigger));
  }

  async openNewRule() {
    await this.page.locator(L.btnAddRule).click();
    return this.modal;
  }
}
