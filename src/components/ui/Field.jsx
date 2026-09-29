import { cx } from './cx';

// Shared label/error wrapper used by Input, Textarea and Select.
export function Field({ label, error, wrapClassName, wrapStyle, children }) {
  return (
    <label className={cx('field', error && 'is-error', wrapClassName)} style={{ width: '100%', minWidth: 0, ...wrapStyle }}>
      {label ? <span>{label}</span> : null}
      {children}
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}
