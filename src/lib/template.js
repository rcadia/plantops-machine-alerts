export const TEMPLATE_VARS = ['{machine}', '{part}', '{life}', '{line}', '{dept}', '{eta}'];

export const SAMPLE_VALUES = { machine: 'IM-04', part: 'Heater band', life: '8', line: 'B', dept: 'Maintenance', eta: '6 hrs' };

// Replace {var} tokens with values; unknown tokens are left untouched.
export const fillTemplate = (text, values = SAMPLE_VALUES) =>
  text.replace(/\{(\w+)\}/g, (match, key) => (key in values ? values[key] : match));
