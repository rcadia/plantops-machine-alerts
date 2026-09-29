// Sample data. In production: GET /machines (poll or subscribe for live status).
export const MACHINES = [
  { id: 'IM-04', name: 'Injection molder', line: 'Line B', utilization: 94, threshold: 85, outputPerHr: '1,180', tempC: 231, uptime: 97.2, status: 'running',
    parts: [{ name: 'Heater band', lifePct: 8, type: 'wear', sku: 'HB-220' }, { name: 'Nozzle tip', lifePct: 41, type: 'wear', sku: 'NT-12' }] },
  { id: 'CNC-01', name: 'CNC mill', line: 'Line A', utilization: 78, threshold: 90, outputPerHr: '64', tempC: 38, uptime: 99.1, status: 'running',
    parts: [{ name: 'Coolant', lifePct: 12, type: 'consumable', sku: 'CL-5' }, { name: 'End mill T4', lifePct: 55, type: 'wear', sku: 'EM-T4' }] },
  { id: 'LC-02', name: 'Laser cutter', line: 'Line A', utilization: 71, threshold: 88, outputPerHr: '212', tempC: 29, uptime: 98.4, status: 'running',
    parts: [{ name: 'Lens', lifePct: 63, type: 'wear', sku: 'LN-2' }, { name: 'Assist gas N₂', lifePct: 47, type: 'consumable', sku: 'N2-50' }] },
  { id: 'PR-07', name: 'Hydraulic press', line: 'Line C', utilization: 88, threshold: 85, outputPerHr: '420', tempC: 54, uptime: 95.8, status: 'running',
    parts: [{ name: 'Hydraulic oil', lifePct: 22, type: 'consumable', sku: 'HO-46' }, { name: 'Seal kit', lifePct: 30, type: 'wear', sku: 'SK-7' }] },
  { id: 'WD-05', name: 'Robot welder', line: 'Line C', utilization: 66, threshold: 90, outputPerHr: '140', tempC: 41, uptime: 99.6, status: 'running',
    parts: [{ name: 'Contact tips', lifePct: 18, type: 'wear', sku: 'CT-1' }, { name: 'Wire spool', lifePct: 72, type: 'consumable', sku: 'WS-15' }] },
  { id: 'PK-02', name: 'Packaging unit', line: 'Line B', utilization: 0, threshold: 85, outputPerHr: '—', tempC: 22, uptime: 88.0, status: 'down',
    parts: [{ name: 'Stretch film', lifePct: 5, type: 'consumable', sku: 'SF-500' }, { name: 'Cutter blade', lifePct: 60, type: 'wear', sku: 'CB-3' }] },
];
