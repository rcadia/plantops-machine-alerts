import { useState } from 'react';
import { useAppState } from '../app/AppState';
import { PageHeader } from '../app/PageHeader';
import { RuleModal } from '../components/RuleModal';
import { RuleRow } from '../components/RuleRow';
import { Button } from '../components/ui';

export default function Rules() {
  const { rules, toggleRule, addRule, channels } = useAppState();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <PageHeader eyebrow="ROUTING RULES" title="Department routing" subtitle="Decide which department hears about which event, and how." />
      <div className="panel rules-table">
        <div className="rules-grid is-head">
          <span>WHEN</span>
          <span>NOTIFY DEPARTMENT</span>
          <span>RECIPIENTS</span>
          <span>CHANNELS</span>
          <span>SEVERITY</span>
          <span>ON</span>
        </div>
        {rules.map((r) => (
          <RuleRow key={r.id} rule={r} onToggle={() => toggleRule(r.id)} />
        ))}
        <div className="rules-footer">
          <Button variant="ghost" size="sm" onClick={() => setModalOpen(true)}>
            + Add rule
          </Button>
        </div>
      </div>
      <p className="footnote">Escalation: unacknowledged critical alerts re-send to the department lead after 15 min, then to plant admin after 30 min.</p>
      <RuleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        channels={channels}
        onSave={(rule) => {
          addRule(rule);
          setModalOpen(false);
        }}
      />
    </>
  );
}
