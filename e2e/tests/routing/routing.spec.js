import { expect, test } from '../../fixtures';

const RULE = 'Consumable below 15%';

test.beforeEach(async ({ rulesPage }) => {
  await rulesPage.goto();
});

test('admin can disable and re-enable a rule', async ({ rulesPage }) => {
  await rulesPage.toggleRule(RULE);
  await expect(rulesPage.row(RULE)).toHaveClass(/is-off/);
  await expect(rulesPage.ruleSwitch(RULE)).toHaveAccessibleName(`Enable rule: ${RULE}`);
  await expect(rulesPage.ruleSwitch(RULE)).not.toBeChecked();

  await rulesPage.toggleRule(RULE);
  await expect(rulesPage.row(RULE)).not.toHaveClass(/is-off/);
  await expect(rulesPage.ruleSwitch(RULE)).toHaveAccessibleName(`Disable rule: ${RULE}`);
  await expect(rulesPage.ruleSwitch(RULE)).toBeChecked();
});

test('a rule cannot be saved without recipients', async ({ rulesPage }) => {
  const modal = await rulesPage.openNewRule();

  await modal.removeRecipient('Maintenance team (6)');
  await expect(modal.summary).toContainText('(0 recipients)');

  await modal.save();
  await expect(modal.error).toHaveText('Add at least one recipient.');
  await expect(modal.dialog).toBeVisible();

  await modal.cancel();
  await expect(modal.dialog).toBeHidden();
  await expect(rulesPage.rows).toHaveCount(6);
});
