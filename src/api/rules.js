// Sample data. In production: GET/POST/PATCH /rules
export const RULES = [
  { id: 1, trigger: 'Machine stopped or faulted', scope: 'All machines', dept: 'Maintenance', people: 'On-call tech, J. Okafor (lead)', channels: 'Email · Teams · SMS', sev: 'Critical', enabled: true },
  { id: 2, trigger: 'Part life below 10%', scope: 'Wear parts', dept: 'Maintenance', people: 'Maintenance team (6)', channels: 'Email · Teams', sev: 'Critical', enabled: true },
  { id: 3, trigger: 'Consumable below 15%', scope: 'Film, gas, coolant, oil', dept: 'Procurement', people: 'A. Chen, Stores desk', channels: 'Email', sev: 'Warning', enabled: true },
  { id: 4, trigger: 'Capacity above threshold > 30 min', scope: 'Per-machine threshold', dept: 'Production', people: 'Shift supervisors', channels: 'Teams', sev: 'Warning', enabled: true },
  { id: 5, trigger: 'Temperature outside range', scope: 'IM, PR series', dept: 'Quality', people: 'QA engineers (3)', channels: 'Email · Slack', sev: 'Warning', enabled: true },
  { id: 6, trigger: 'Daily machine status digest', scope: '06:00, all lines', dept: 'Admin', people: 'Plant admins, managers', channels: 'Email', sev: 'Info', enabled: true },
];

// Events a rule can fire on. Threshold events carry a unit and a default value.
export const TRIGGERS = [
  { v: 'Part life below', unit: '% life', def: 10 },
  { v: 'Consumable below', unit: '% remaining', def: 15 },
  { v: 'Capacity above threshold', unit: '% capacity', def: 85 },
  { v: 'Temperature above', unit: '°C', def: 240 },
  { v: 'Machine stopped or faulted' },
  { v: 'Daily machine status digest' },
];

export const RULE_DEPARTMENTS = ['Maintenance', 'Production', 'Procurement', 'Quality', 'Safety', 'Admin'];
export const SUSTAIN_OPTIONS = ['Immediately', 'For 5 min', 'For 15 min', 'For 30 min', 'For 1 hr'];
export const ESCALATION_OPTIONS = ['After 15 min', 'After 30 min', 'After 1 hr'];
