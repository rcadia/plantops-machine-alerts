import { SEVERITY } from '../lib/severity';
import { Badge, Button } from './ui';

export function AlertRow({ alert: a, acked, ackedBy, onAck }) {
  const sev = SEVERITY[a.sev];
  return (
    <div className={'alert-row' + (acked ? ' is-acked' : '')}>
      <span className="sev-dot" style={{ background: sev.color }} aria-hidden />
      <div className="stack" style={{ gap: 6, minWidth: 0 }}>
        <div className="alert-title-row">
          <span className="alert-title">{a.title}</span>
          <Badge variant={sev.badge}>{a.sev}</Badge>
        </div>
        <span className="alert-body">{a.body}</span>
        <div className="alert-meta">
          <span>{a.machine}</span>
          <span>→ {a.dept}</span>
          <span>via {a.via}</span>
          <span>{a.time}</span>
        </div>
      </div>
      <div className="alert-actions">
        {acked ? (
          <span className="acked-by">Acknowledged · {ackedBy}</span>
        ) : (
          <>
            <Button variant="secondary" size="sm">Reassign</Button>
            <Button size="sm" onClick={onAck}>Acknowledge</Button>
          </>
        )}
      </div>
    </div>
  );
}
