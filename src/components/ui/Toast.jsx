import { cx } from './cx';

export function Toast({ open = false, icon, className, children, ...rest }) {
  return (
    <div className={cx('toast', open && 'is-open', className)} role="status" {...rest}>
      {icon}
      {children}
    </div>
  );
}
