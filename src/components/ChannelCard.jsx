import { Badge, Switch } from './ui';

export function ChannelCard({ name, target, on, onToggle }) {
  return (
    <div className="panel channel-card">
      <div className="channel-head">
        <span className="channel-name">{name}</span>
        <Switch checked={on} onChange={onToggle} aria-label={`${on ? 'Disable' : 'Enable'} ${name}`} />
      </div>
      <span className="channel-target">{target}</span>
      <div style={{ display: 'flex' }}>
        <Badge variant={on ? 'success' : 'default'}>{on ? 'Connected' : 'Off'}</Badge>
      </div>
    </div>
  );
}
