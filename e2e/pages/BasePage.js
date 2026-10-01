import L from '../locators/common.json' with { type: 'json' };
import { Sidebar } from './Sidebar';

export class BasePage {
  path = '/';

  constructor(page) {
    this.page = page;
    this.sidebar = new Sidebar(page);
    this.heading = page.locator(L.lblHeading);
  }

  async goto() {
    await this.page.goto(this.path);
  }
}

export const toggleSwitch = (scope) => scope.locator(L.tglSwitch).click();
