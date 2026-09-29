import { partLifeColors } from '../lib/machine';

export function PartLifeRow({ part }) {
  const { bar, ink } = partLifeColors(part.lifePct);
  return (
    <div className="part-row">
      <span className="part-name" title={part.name}>{part.name}</span>
      <div className="part-bar">
        <div style={{ width: `${part.lifePct}%`, background: bar }} />
      </div>
      <span className="part-pct" style={{ color: ink }}>{part.lifePct}%</span>
    </div>
  );
}
