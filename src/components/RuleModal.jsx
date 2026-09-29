import { useState } from 'react';
import { MACHINES } from '../api/machines';
import { ESCALATION_OPTIONS, RULE_DEPARTMENTS, SUSTAIN_OPTIONS, TRIGGERS } from '../api/rules';
import { shortChannel } from '../api/channels';
import { Button, Checkbox, Chip, Input, Modal, Segmented, Select, Switch } from './ui';

const SCOPE_OPTIONS = ['All machines', 'Line A', 'Line B', 'Line C', ...MACHINES.map((m) => `${m.id} · ${m.name}`)];

const blankForm = () => ({
  name: '',
  trigger: 'Part life below',
  value: '10',
  sustain: 'Immediately',
  scope: 'All machines',
  dept: 'Maintenance',
  draft: '',
  people: ['Maintenance team (6)'],
  chans: { Email: true, 'Microsoft Teams': true },
  sev: 'Warning',
  escalate: true,
  escAfter: 'After 15 min',
});

// "%"-based units collapse to a bare "%" suffix (e.g. "10%"); others keep the unit ("240°C").
const unitSuffix = (unit) => (unit.startsWith('%') ? '%' : unit);

function buildSummary(f, t, picked) {
  const cond = t.unit ? `${f.trigger.toLowerCase()} ${f.value || '—'}${unitSuffix(t.unit)}` : f.trigger.toLowerCase();
  const scope = f.scope === 'All machines' ? 'any machine' : f.scope;
  const sustain = t.unit && f.sustain !== 'Immediately' ? ` for ${f.sustain.replace('For ', '')}` : '';
  const n = f.people.length;
  const via = picked.map(shortChannel).join(', ') || 'no channel';
  const esc = f.escalate ? `, escalating ${f.escAfter.toLowerCase()}` : '';
  return `When ${cond} on ${scope}${sustain}, send a ${f.sev.toLowerCase()} alert to ${f.dept} (${n} recipient${n === 1 ? '' : 's'}) via ${via}${esc}.`;
}

/** `channels` is the enabled/disabled map from the Channels page. */
export function RuleModal({ open, onClose, onSave, channels }) {
  const [f, setForm] = useState(blankForm);
  const [error, setError] = useState('');

  // Start from a blank form each time the modal opens (kept mounted so it can animate).
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setForm(blankForm());
      setError('');
    }
  }

  const set = (patch) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setError('');
  };
  const bind = (key) => (e) => set({ [key]: e.target.value });

  const t = TRIGGERS.find((x) => x.v === f.trigger) ?? TRIGGERS[0];
  const channelNames = Object.keys(channels);
  // Only count channels that are both picked and currently enabled.
  const picked = channelNames.filter((c) => f.chans[c] && channels[c]);

  const onTrigger = (e) => {
    const next = TRIGGERS.find((x) => x.v === e.target.value);
    set({ trigger: e.target.value, value: next?.def != null ? String(next.def) : '' });
  };

  const onRecipientKey = (e) => {
    if (e.key === 'Enter' && f.draft.trim()) {
      e.preventDefault();
      set({ people: [...f.people, f.draft.trim()], draft: '' });
    }
  };

  const save = () => {
    if (!f.people.length) return setError('Add at least one recipient.');
    if (!picked.length) return setError('Pick at least one channel.');
    if (t.unit && !f.value) return setError('Set a threshold value.');
    onSave({
      trigger: f.name.trim() || (t.unit ? `${f.trigger} ${f.value}${unitSuffix(t.unit)}` : f.trigger),
      scope: f.scope + (t.unit && f.sustain !== 'Immediately' ? ` · ${f.sustain.toLowerCase()}` : ''),
      dept: f.dept,
      people: f.people.join(', '),
      channels: picked.map(shortChannel).join(' · '),
      sev: f.sev,
    });
  };

  return (
    <Modal open={open} onClose={onClose} className="rule-modal" title="New routing rule">
      <div className="stack" style={{ gap: 18 }}>
        <p style={{ margin: '-6px 0 0', fontSize: 13.5, color: 'var(--diq-body)' }}>Choose the event, who hears about it, and how.</p>
        <Input label="Rule name" placeholder="e.g. Heater band wear – Line B" value={f.name} onChange={bind('name')} />

        <div className="stack" style={{ gap: 10, paddingTop: 4 }}>
          <span className="mono-label">01 · WHEN</span>
          <div className="form-grid">
            <Select label="Event" options={TRIGGERS.map((x) => x.v)} value={f.trigger} onChange={onTrigger} />
            <Select label="Apply to" options={SCOPE_OPTIONS} value={f.scope} onChange={bind('scope')} />
          </div>
          {t.unit && (
            <div className="form-grid">
              <Input label={`Threshold (${t.unit})`} type="number" value={f.value} onChange={bind('value')} />
              <Select label="Sustained for" options={SUSTAIN_OPTIONS} value={f.sustain} onChange={bind('sustain')} />
            </div>
          )}
        </div>

        <div className="form-section">
          <span className="mono-label">02 · NOTIFY</span>
          <Select label="Department" options={RULE_DEPARTMENTS} value={f.dept} onChange={bind('dept')} />
          <Input label="Recipients" placeholder="Add a person or group, press Enter" value={f.draft} onChange={bind('draft')} onKeyDown={onRecipientKey} />
          {f.people.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {f.people.map((p, i) => (
                <Chip key={`${p}-${i}`} active onRemove={() => set({ people: f.people.filter((_, j) => j !== i) })}>
                  {p}
                </Chip>
              ))}
            </div>
          )}
        </div>

        <div className="form-section">
          <span className="mono-label">03 · DELIVER VIA</span>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            {channelNames.map((c) => (
              <Checkbox
                key={c}
                label={shortChannel(c) + (channels[c] ? '' : ' (off)')}
                checked={!!f.chans[c] && channels[c]}
                disabled={!channels[c]}
                onChange={() => set({ chans: { ...f.chans, [c]: !f.chans[c] } })}
              />
            ))}
          </div>
          <div className="form-row" style={{ marginTop: 4 }}>
            <span style={{ fontSize: 13, color: 'var(--diq-ink)', fontWeight: 500 }}>Severity</span>
            <Segmented items={['Info', 'Warning', 'Critical']} value={f.sev} onChange={(sev) => set({ sev })} />
          </div>
          <div className="form-row">
            <Switch label="Escalate if not acknowledged" checked={f.escalate} onChange={(e) => set({ escalate: e.target.checked })} />
            {f.escalate && (
              <Select options={ESCALATION_OPTIONS} value={f.escAfter} onChange={bind('escAfter')} style={{ width: 180 }} aria-label="Escalate after" />
            )}
          </div>
        </div>

        <div className="summary-box">
          <span className="mono-label">SUMMARY</span>
          <span className="summary-text">{buildSummary(f, t, picked)}</span>
        </div>
        {error && <span className="form-error" role="alert">{error}</span>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={save}>Save rule</Button>
        </div>
      </div>
    </Modal>
  );
}
