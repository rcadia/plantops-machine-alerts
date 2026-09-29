import { SEVERITY } from '../lib/severity';
import { Badge, Switch } from './ui';

export function RuleRow({ rule: r, onToggle }) {
  return (
    <div className={'rules-grid' + (r.enabled ? '' : ' is-off')}>
      <div className="stack" style={{ gap: 3 }}>
        <span className="rule-trigger">{r.trigger}</span>
        <span className="rule-scope">{r.scope}</span>
      </div>
      <span className="rule-dept">{r.dept}</span>
      <span>{r.people}</span>
      <span className="rule-channels">{r.channels}</span>
      <div>
        <Badge variant={SEVERITY[r.sev].badge}>{r.sev}</Badge>
      </div>
      <Switch checked={r.enabled} onChange={onToggle} aria-label={`${r.enabled ? 'Disable' : 'Enable'} rule: ${r.trigger}`} />
    </div>
  );
}
