import { isDown, machineStatus } from '../lib/machine';
import { CapacityBar } from './CapacityBar';
import { PartLifeRow } from './PartLifeRow';
import { Badge } from './ui';

export function MachineCard({ machine: m }) {
  const status = machineStatus(m);
  const stats = [
    ['OUTPUT/HR', m.outputPerHr],
    ['TEMP', `${m.tempC}°C`],
    ['UPTIME', `${m.uptime.toFixed(1)}%`],
  ];
  return (
    <div className="panel machine-card">
      <div className="machine-head">
        <div className="stack" style={{ gap: 2, minWidth: 0 }}>
          <span className="machine-name">{m.name}</span>
          <span className="machine-id">{m.id} · {m.line}</span>
        </div>
        <Badge variant={status.badge}>{status.label}</Badge>
      </div>
      <div className="stack" style={{ gap: 6 }}>
        <div className="capacity-row">
          <span>Capacity</span>
          <span className="capacity-nums">
            {m.utilization}% <span style={{ color: 'var(--diq-muted)' }}>/ {m.threshold}%</span>
          </span>
        </div>
        <CapacityBar utilization={m.utilization} threshold={m.threshold} down={isDown(m)} />
      </div>
      <div className="machine-stats">
        {stats.map(([label, value]) => (
          <div key={label} className="stat">
            <span className="stat-label">{label}</span>
            <span className="stat-value">{value}</span>
          </div>
        ))}
      </div>
      <div className="stack" style={{ gap: 8 }}>
        {m.parts.map((p) => (
          <PartLifeRow key={p.name} part={p} />
        ))}
      </div>
    </div>
  );
}
