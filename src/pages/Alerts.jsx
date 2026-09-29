import { DEPARTMENTS } from '../api/alerts';
import { USER_DEPT, useAppState } from '../app/AppState';
import { PageHeader } from '../app/PageHeader';
import { AlertRow } from '../components/AlertRow';
import { Chip } from '../components/ui';

export default function Alerts() {
  const { isAdmin, deptFilter, setDeptFilter, visibleAlerts, acked, ackAlert } = useAppState();
  const filters = ['All', ...(isAdmin ? DEPARTMENTS : [USER_DEPT])];
  const rows = visibleAlerts.filter((a) => deptFilter === 'All' || a.dept === deptFilter);

  return (
    <>
      <PageHeader eyebrow="ALERT CENTER · TODAY" title="Alerts & notifications" subtitle="Every alert sent today, who it was routed to, and on which channel." />
      <div className="chip-row">
        {filters.map((d) => (
          <Chip key={d} active={deptFilter === d} onClick={() => setDeptFilter(d)}>
            {d}
          </Chip>
        ))}
      </div>
      <div className="panel list-card">
        {rows.length ? (
          rows.map((a) => <AlertRow key={a.id} alert={a} acked={!!acked[a.id]} ackedBy={isAdmin ? 'R. Bendal' : 'you'} onAck={() => ackAlert(a.id)} />)
        ) : (
          <div className="empty">No alerts for this department.</div>
        )}
      </div>
    </>
  );
}
