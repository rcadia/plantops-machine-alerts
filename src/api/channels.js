// Sample data. In production: GET/PATCH /channels · GET/PUT /templates/:event
export const CHANNELS = { Email: true, 'Microsoft Teams': true, Slack: true, SMS: true, Webhook: false };

export const CHANNEL_TARGETS = {
  Email: 'smtp.plant2.example · 42 recipients',
  'Microsoft Teams': '4 channels connected',
  Slack: '#maintenance, #production',
  SMS: 'Twilio · on-call only',
  Webhook: 'Not configured',
};

export const TEMPLATE_EVENTS = ['Part life below 10%', 'Consumable below 15%', 'Capacity above threshold', 'Machine stopped', 'Daily status digest'];

export const DEFAULT_TEMPLATE = {
  subject: '[{dept}] {part} on {machine} at {life}% life',
  body: '{part} on {machine} (Line {line}) has {life}% life remaining. Replace within {eta} to avoid unplanned downtime.',
};

export const shortChannel = (c) => (c === 'Microsoft Teams' ? 'Teams' : c);
