import { cx } from './cx';
import { Field } from './Field';

export function Select({ label, error, options = [], className, wrapClassName, wrapStyle, children, ...rest }) {
  const select = (
    <select className={cx('select', className)} {...rest}>
      {children ??
        options.map((o) => {
          const value = typeof o === 'string' ? o : o.value;
          const text = typeof o === 'string' ? o : o.label;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
    </select>
  );
  if (!label && !error) return select;
  return (
    <Field label={label} error={error} wrapClassName={wrapClassName} wrapStyle={wrapStyle}>
      {select}
    </Field>
  );
}
