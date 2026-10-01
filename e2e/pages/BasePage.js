import { Sidebar } from './Sidebar';

export class BasePage {
  path = '/';

  constructor(page) {
    this.page = page;
    this.sidebar = new Sidebar(page);
    this.heading = page.getByRole('heading', { level: 1 });
  }

  async goto() {
    await this.page.goto(this.path);
  }
}

export const toggleSwitch = (scope) => scope.locator('label.switch').click();
