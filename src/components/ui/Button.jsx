import { cx } from './cx';

export function Button({ variant = 'primary', size = 'md', disabled = false, loading = false, icon = null, iconRight = false, className, children, ...rest }) {
  return (
    <button
      className={cx('btn', `btn--${variant}`, size === 'sm' && 'btn--sm', size === 'lg' && 'btn--lg', className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <span className="spinner spinner--sm" style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,.4)' }} />}
      {!loading && icon && !iconRight ? icon : null}
      {children}
      {!loading && icon && iconRight ? icon : null}
    </button>
  );
}
