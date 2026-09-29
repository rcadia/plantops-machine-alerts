export function CapacityBar({ utilization, threshold, down }) {
  const over = utilization >= threshold;
  const fill = down ? 'var(--diq-line)' : over ? 'var(--diq-grad-sunset)' : 'var(--diq-grad-violet)';
  return (
    <div className="capacity-bar" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={utilization} aria-label={`Capacity ${utilization}%, threshold ${threshold}%`}>
      <div className="capacity-fill" style={{ width: `${utilization}%`, background: fill }} />
      <div className="capacity-threshold" style={{ left: `calc(${threshold}% - 1px)` }} />
    </div>
  );
}
