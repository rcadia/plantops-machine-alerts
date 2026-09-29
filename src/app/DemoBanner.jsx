import { useState } from 'react';
import { Badge, Button, Modal } from '../components/ui';

// Concept-mockup only — remove in production.
export function DemoBanner() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const close = () => setAboutOpen(false);
  return (
    <>
      <div className="demo-banner">
        <Badge variant="info">DEMO</Badge>
        <span className="demo-banner-text">This is a concept mockup of proposed features. All machines, alerts and people are static data.</span>
        <Button variant="ghost" size="sm" onClick={() => setAboutOpen(true)}>
          About this demo
        </Button>
      </div>
      <Modal open={aboutOpen} onClose={close} title="About this demo">
        <div className="stack" style={{ gap: 16 }}>
          <span className="mono-label">FEATURE BRIEF</span>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--diq-body)', textWrap: 'pretty' }}>
            Create new features for the existing manufacturing system that will send machine information and status to users and admin. Message can be
            configured to send via email and any messaging tools. Alerts and notifications should be sent to specific departments if there are parts or
            consumables to be replaced. A dashboard should be created to show the machine's capacity and threshold.
          </p>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--diq-muted)' }}>UI concept only — no live data, integrations or messages are sent.</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={close}>Got it</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
