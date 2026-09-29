import { MACHINES } from '../api/machines';
import { PageHeader } from '../app/PageHeader';
import { MachineCard } from '../components/MachineCard';
import { isDown, isOver } from '../lib/machine';

export default function Dashboard() {
  const running = MACHINES.filter((m) => !isDown(m));
  const down = MACHINES.filter(isDown);
  const over = MACHINES.filter(isOver);
  const avg = running.length ? Math.round(running.reduce((sum, m) => sum + m.utilization, 0) / running.length) : 0;
  const lowParts = MACHINES.reduce((n, m) => n + m.parts.filter((p) => p.lifePct < 25).length, 0);

  const kpis = [
    { label: 'MACHINES ONLINE', value: `${running.length}/${MACHINES.length}`, note: down.length ? `${down.length} down · ${down.map((m) => m.id).join(', ')}` : 'All running', color: 'var(--diq-ink)' },
    { label: 'AVG CAPACITY', value: `${avg}%`, note: 'Across running machines', color: 'var(--diq-ink)' },
    { label: 'OVER THRESHOLD', value: String(over.length), note: over.map((m) => m.id).join(', ') || 'None', color: 'var(--diq-warning-ink)' },
    { label: 'PARTS TO REPLACE', value: String(lowParts), note: 'Below 25% life', color: 'var(--diq-danger-ink)' },
  ];

  return (
    <>
      <PageHeader
        eyebrow="MACHINE DASHBOARD · LIVE"
        title="Capacity & thresholds"
        subtitle="Current utilization against each machine’s alert threshold, plus remaining life on parts and consumables."
      />
      <section className="kpi-grid">
        {kpis.map((k) => (
          <div key={k.label} className="panel kpi">
            <span className="mono-label">{k.label}</span>
            <span className="kpi-value" style={{ color: k.color }}>{k.value}</span>
            <span className="kpi-note">{k.note}</span>
          </div>
        ))}
      </section>
      <section className="stack" style={{ gap: 12 }}>
        <div className="section-head">
          <h2 className="section-title">Capacity vs. threshold</h2>
          <div className="legend">
            <span><span className="legend-bar" />Utilization</span>
            <span><span className="legend-tick" />Alert threshold</span>
          </div>
        </div>
        <div className="machine-grid">
          {MACHINES.map((m) => (
            <MachineCard key={m.id} machine={m} />
          ))}
        </div>
      </section>
    </>
  );
}
