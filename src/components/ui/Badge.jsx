import { cx } from './cx';

export function Badge({ variant = 'default', icon = null, className, children, ...rest }) {
  return (
    <span className={cx('badge', variant !== 'default' && `badge--${variant}`, className)} {...rest}>
      {icon}
      {children}
    </span>
  );
}
