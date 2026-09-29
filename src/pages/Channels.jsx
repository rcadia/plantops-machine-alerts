import { useRef, useState } from 'react';
import { CHANNEL_TARGETS, TEMPLATE_EVENTS } from '../api/channels';
import { useAppState } from '../app/AppState';
import { PageHeader } from '../app/PageHeader';
import { ChannelCard } from '../components/ChannelCard';
import { MessagePreview } from '../components/MessagePreview';
import { Checkbox, Input, Segmented, Select, Textarea } from '../components/ui';
import { TEMPLATE_VARS } from '../lib/template';

const PREVIEW_MODES = [
  { id: 'email', label: 'Email' },
  { id: 'chat', label: 'Teams/Slack' },
  { id: 'sms', label: 'SMS' },
];
const AUDIENCES = ['Machine operators', 'Owning department', 'Plant admins'];

export default function Channels() {
  const { channels, toggleChannel, template, setTemplate } = useAppState();
  const [event, setEvent] = useState(TEMPLATE_EVENTS[0]);
  const [preview, setPreview] = useState('email');
  const [sendTo, setSendTo] = useState(() => Object.fromEntries(AUDIENCES.map((a) => [a, true])));
  const bodyRef = useRef(null);

  // Clicking a variable token inserts it at the caret in the body.
  const insertVar = (token) => {
    const el = bodyRef.current;
    const start = el?.selectionStart ?? template.body.length;
    const end = el?.selectionEnd ?? template.body.length;
    setTemplate({ body: template.body.slice(0, start) + token + template.body.slice(end) });
    requestAnimationFrame(() => {
      if (!el) return;
      el.focus();
      el.setSelectionRange(start + token.length, start + token.length);
    });
  };

  return (
    <>
      <PageHeader eyebrow="DELIVERY CHANNELS" title="Channels & message templates" subtitle="Connect email and messaging tools, then configure what each message says." />
      <section className="channel-grid">
        {Object.keys(channels).map((name) => (
          <ChannelCard key={name} name={name} target={CHANNEL_TARGETS[name]} on={channels[name]} onToggle={() => toggleChannel(name)} />
        ))}
      </section>
      <section className="template-grid">
        <div className="panel template-card">
          <h2 className="card-title">Message template</h2>
          <Select label="Event" options={TEMPLATE_EVENTS} value={event} onChange={(e) => setEvent(e.target.value)} />
          <Input label="Subject" value={template.subject} onChange={(e) => setTemplate({ subject: e.target.value })} />
          <Textarea ref={bodyRef} label="Body" rows={5} value={template.body} onChange={(e) => setTemplate({ body: e.target.value })} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {TEMPLATE_VARS.map((v) => (
              <button key={v} type="button" className="var-token" onClick={() => insertVar(v)} title={`Insert ${v}`}>
                {v}
              </button>
            ))}
          </div>
          <div className="stack" style={{ gap: 8 }}>
            <span className="mono-label">SEND TO</span>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {AUDIENCES.map((a) => (
                <Checkbox key={a} label={a} checked={sendTo[a]} onChange={() => setSendTo((s) => ({ ...s, [a]: !s[a] }))} />
              ))}
            </div>
          </div>
        </div>
        <div className="stack" style={{ gap: 12 }}>
          <div className="section-head">
            <h2 className="card-title">Preview</h2>
            <Segmented items={PREVIEW_MODES} value={preview} onChange={setPreview} />
          </div>
          <MessagePreview mode={preview} subject={template.subject} body={template.body} />
        </div>
      </section>
    </>
  );
}
