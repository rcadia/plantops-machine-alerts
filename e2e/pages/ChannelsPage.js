import { BasePage, toggleSwitch } from './BasePage';

export class ChannelsPage extends BasePage {
  path = '/channels';

  constructor(page) {
    super(page);
    this.subject = page.getByLabel('Subject');
    this.body = page.getByLabel('Body');
    this.emailSubject = page.locator('.email-subject');
    this.emailBody = page.locator('.email-body');
    this.chatMessage = page.locator('.chat-msg');
    this.smsBubble = page.locator('.sms-bubble');
  }

  card(name) {
    return this.page.locator('.channel-card', { hasText: name });
  }

  status(name) {
    return this.card(name).locator('.badge');
  }

  channelSwitch(name) {
    return this.card(name).getByRole('switch');
  }

  async toggleChannel(name) {
    await toggleSwitch(this.card(name));
  }

  async insertVariable(token) {
    await this.page.getByRole('button', { name: token }).click();
  }

  async previewAs(mode) {
    await this.page.getByRole('tab', { name: mode }).click();
  }
}
