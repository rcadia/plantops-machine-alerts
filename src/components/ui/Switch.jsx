import { cx } from './cx';

export function Switch({ label, spaceBetween = false, className, style, ...rest }) {
  const labelStyle = spaceBetween ? { justifyContent: 'space-between', width: '100%', ...style } : style;
  return (
    <label className={cx('switch', className)} style={labelStyle}>
      {label ? <span>{label}</span> : null}
      <span style={{ position: 'relative', display: 'inline-flex' }}>
        <input type="checkbox" role="switch" {...rest} />
        <span className="track" />
      </span>
    </label>
  );
}
