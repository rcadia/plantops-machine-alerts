import { useState } from 'react';
import { cx } from './cx';

export function Segmented({ items = [], value, defaultValue, onChange, className, ...rest }) {
  const norm = items.map((it) => (typeof it === 'string' ? { id: it, label: it } : it));
  const [internal, setInternal] = useState(defaultValue ?? norm[0]?.id);
  const active = value !== undefined ? value : internal;
  const select = (id) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };
  return (
    <div className={cx('segmented', className)} role="tablist" {...rest}>
      {norm.map((it) => (
        <button key={it.id} type="button" role="tab" aria-selected={active === it.id ? 'true' : 'false'} onClick={() => select(it.id)}>
          {it.label}
        </button>
      ))}
    </div>
  );
}
