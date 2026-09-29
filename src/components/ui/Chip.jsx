import { cx } from './cx';

export function Chip({ active = false, onRemove, onClick, className, children, ...rest }) {
  const content = (
    <>
      {children}
      {onRemove ? (
        <span className="chip-x" role="button" aria-label="Remove" onClick={onRemove}>
          ×
        </span>
      ) : null}
    </>
  );
  // Clickable chips render as buttons so they're keyboard-accessible.
  if (onClick) {
    return (
      <button type="button" className={cx('chip', active && 'chip--active', className)} style={{ cursor: 'pointer' }} aria-pressed={active} onClick={onClick} {...rest}>
        {content}
      </button>
    );
  }
  return (
    <span className={cx('chip', active && 'chip--active', className)} {...rest}>
      {content}
    </span>
  );
}
