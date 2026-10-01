export const sel = (template, values = {}) =>
  template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? values[key] : match));
