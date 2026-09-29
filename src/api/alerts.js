// Sample data. In production: GET /alerts?dept= · POST /alerts/:id/ack · POST /alerts/:id/reassign
export const DEPARTMENTS = ['Maintenance', 'Production', 'Procurement', 'Quality'];

export const ALERTS = [
  { id: 1, sev: 'Critical', title: 'Packaging unit stopped', body: 'PK-02 reported E-stop fault. Output halted on Line B.', machine: 'PK-02', dept: 'Maintenance', via: 'Email · Teams · SMS', time: '2 min ago' },
  { id: 2, sev: 'Critical', title: 'Heater band at 8% life', body: 'Replace heater band on IM-04 within 6 hrs. Part #HB-220 in stock (3).', machine: 'IM-04', dept: 'Maintenance', via: 'Email · Teams', time: '9 min ago' },
  { id: 3, sev: 'Warning', title: 'Capacity above threshold', body: 'IM-04 running at 94% for 45 min (threshold 85%). Consider rebalancing to IM-02.', machine: 'IM-04', dept: 'Production', via: 'Teams', time: '14 min ago' },
  { id: 4, sev: 'Warning', title: 'Stretch film low', body: 'PK-02 stretch film at 5%. Reorder 2 rolls, SKU SF-500.', machine: 'PK-02', dept: 'Procurement', via: 'Email', time: '22 min ago' },
  { id: 5, sev: 'Warning', title: 'Coolant concentration low', body: 'CNC-01 coolant at 12%. Top-up required before next shift.', machine: 'CNC-01', dept: 'Maintenance', via: 'Slack', time: '38 min ago' },
  { id: 6, sev: 'Info', title: 'Hydraulic press over threshold', body: 'PR-07 at 88% (threshold 85%). Within tolerance, monitoring.', machine: 'PR-07', dept: 'Production', via: 'Teams', time: '1 hr ago' },
  { id: 7, sev: 'Info', title: 'Contact tips due soon', body: 'WD-05 contact tips at 18%. Scheduled for Friday PM.', machine: 'WD-05', dept: 'Quality', via: 'Email', time: '3 hr ago' },
];
