import { expect, test } from '../../fixtures';

test.beforeEach(async ({ channelsPage }) => {
  await channelsPage.goto();
});

test('turning a channel off marks it unavailable in new rules', async ({ channelsPage, rulesPage }) => {
  await expect(channelsPage.status('Email')).toHaveText('Connected');

  await channelsPage.toggleChannel('Email');
  await expect(channelsPage.status('Email')).toHaveText('Off');
  await expect(channelsPage.channelSwitch('Email')).not.toBeChecked();

  await channelsPage.sidebar.goTo('Routing rules');
  const modal = await rulesPage.openNewRule();
  await expect(modal.channel('Email (off)')).toBeDisabled();
  await expect(modal.summary).toContainText('via Teams,');
});

test('template edits render in every preview mode', async ({ channelsPage }) => {
  await channelsPage.subject.fill('{machine} needs attention');
  await channelsPage.body.fill('Check ');
  await channelsPage.insertVariable('{part}');
  await expect(channelsPage.body).toHaveValue('Check {part}');

  await expect(channelsPage.emailSubject).toHaveText('IM-04 needs attention');
  await expect(channelsPage.emailBody).toContainText('Check Heater band');

  await channelsPage.previewAs('Teams/Slack');
  await expect(channelsPage.chatMessage).toContainText('IM-04 needs attention');

  await channelsPage.previewAs('SMS');
  await expect(channelsPage.smsBubble).toHaveText('PlantOps: IM-04 needs attention. Reply ACK to acknowledge.');
});
