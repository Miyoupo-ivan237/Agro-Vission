export function isRequired(value) {
  return typeof value === 'string' ? value.trim().length > 0 : value != null;
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}
