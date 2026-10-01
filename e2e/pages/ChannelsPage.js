import L from '../locators/channels.json' with { type: 'json' };
import { BasePage, toggleSwitch } from './BasePage';
import { sel } from './selector';

export class ChannelsPage extends BasePage {
  path = '/channels';

  constructor(page) {
    super(page);
    this.subject = page.locator(L.txtSubject);
    this.body = page.locator(L.txtBody);
    this.emailSubject = page.locator(L.lblEmailSubject);
    this.emailBody = page.locator(L.lblEmailBody);
    this.chatMessage = page.locator(L.lblChatMessage);
    this.smsBubble = page.locator(L.lblSmsBubble);
  }

  card(channel) {
    return this.page.locator(sel(L.card, { channel }));
  }

  status(channel) {
    return this.card(channel).locator(L.lblStatus);
  }

  channelSwitch(channel) {
    return this.card(channel).locator(L.tglChannel);
  }

  async toggleChannel(channel) {
    await toggleSwitch(this.card(channel));
  }

  async insertVariable(token) {
    await this.page.locator(sel(L.btnVariable, { token })).click();
  }

  async previewAs(mode) {
    await this.page.locator(sel(L.tabPreview, { mode })).click();
  }
}
