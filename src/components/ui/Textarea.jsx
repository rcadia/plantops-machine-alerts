import { Field } from './Field';

export function Textarea({ label, error, rows = 3, wrapClassName, wrapStyle, ...rest }) {
  return (
    <Field label={label} error={error} wrapClassName={wrapClassName} wrapStyle={wrapStyle}>
      <textarea rows={rows} {...rest} />
    </Field>
  );
}
