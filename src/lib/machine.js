export const isDown = (m) => m.status === 'down';
export const isOver = (m) => m.utilization >= m.threshold;

export function machineStatus(m) {
  if (isDown(m)) return { label: 'Down', badge: 'danger' };
  if (isOver(m)) return { label: 'Over threshold', badge: 'warning' };
  if (m.parts.some((p) => p.lifePct < 15)) return { label: 'Service due', badge: 'warning' };
  return { label: 'Running', badge: 'success' };
}

export function partLifeColors(lifePct) {
  if (lifePct < 10) return { bar: 'var(--diq-danger)', ink: 'var(--diq-danger-ink)' };
  if (lifePct < 25) return { bar: 'var(--diq-warning)', ink: 'var(--diq-warning-ink)' };
  return { bar: 'var(--diq-success)', ink: 'var(--diq-body)' };
}
