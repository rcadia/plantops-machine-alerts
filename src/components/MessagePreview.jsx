import { fillTemplate } from '../lib/template';
import { Button } from './ui';

export function MessagePreview({ mode, subject, body }) {
  const subjectOut = fillTemplate(subject);
  const bodyOut = fillTemplate(body);

  if (mode === 'chat') {
    return (
      <div className="panel chat-card">
        <span style={{ font: '500 11px var(--diq-font-mono)', color: 'var(--diq-muted)' }}># maintenance-line-b</span>
        <div style={{ display: 'grid', gridTemplateColumns: '36px minmax(0,1fr)', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--diq-grad-violet)' }} />
          <div className="stack" style={{ gap: 8 }}>
            <span style={{ fontSize: 13 }}>
              <strong style={{ color: 'var(--diq-ink)' }}>PlantOps Bot</strong>{' '}
              <span style={{ color: 'var(--diq-muted)', fontSize: 11.5 }}>09:42</span>
            </span>
            <div className="chat-msg">
              <strong style={{ color: 'var(--diq-ink)' }}>{subjectOut}</strong>
              <span className="pre-wrap">{bodyOut}</span>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <Button size="sm">Acknowledge</Button>
                <Button variant="secondary" size="sm">Snooze</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'sms') {
    return (
      <div className="panel" style={{ padding: 18, display: 'flex', justifyContent: 'flex-start' }}>
        <div className="sms-bubble">PlantOps: {subjectOut}. Reply ACK to acknowledge.</div>
      </div>
    );
  }

  return (
    <div className="panel" style={{ overflow: 'hidden' }}>
      <div className="email-head">
        <span><span style={{ color: 'var(--diq-muted)' }}>From</span> PlantOps Alerts &lt;alerts@plant2.example&gt;</span>
        <span><span style={{ color: 'var(--diq-muted)' }}>To</span> maintenance@plant2.example</span>
        <span className="email-subject">{subjectOut}</span>
      </div>
      <div className="email-body">
        <div className="sunset-rule" />
        <p className="pre-wrap">{bodyOut}</p>
        <div className="facts">
          <span>Machine: IM-04</span>
          <span>Line: B</span>
          <span>Part: Heater band</span>
          <span>Life left: 8%</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button size="sm">Acknowledge</Button>
          <Button variant="secondary" size="sm">Open work order</Button>
        </div>
      </div>
    </div>
  );
}
