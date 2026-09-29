import { cx } from './cx';

export function Checkbox({ label, className, children, ...rest }) {
  return (
    <label className={cx('check', className)} style={rest.disabled ? { cursor: 'not-allowed', color: 'var(--diq-muted)' } : undefined}>
      <input type="checkbox" {...rest} />
      <span className="box" />
      {label ?? children}
    </label>
  );
}
