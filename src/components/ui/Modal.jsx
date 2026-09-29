import { useEffect } from 'react';
import { cx } from './cx';

export function Modal({ open = false, onClose, title, footer, className, children, ...rest }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div className={cx('modal-overlay', open && 'is-open')} onClick={handleBackdrop} aria-hidden={!open} {...rest}>
      <div className={cx('modal', className)} role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : undefined}>
        {title ? (
          <h3 className="diq-h2" style={{ marginBottom: 14 }}>
            {title}
          </h3>
        ) : null}
        {children}
        {footer ? <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>{footer}</div> : null}
      </div>
    </div>
  );
}
