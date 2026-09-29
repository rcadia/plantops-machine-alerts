import { Field } from './Field';

export function Input({ label, error, wrapClassName, wrapStyle, ...rest }) {
  return (
    <Field label={label} error={error} wrapClassName={wrapClassName} wrapStyle={wrapStyle}>
      <input {...rest} />
    </Field>
  );
}
