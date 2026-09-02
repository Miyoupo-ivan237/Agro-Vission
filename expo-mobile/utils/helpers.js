export function formatDate(value) {
  return new Date(value).toLocaleDateString();
}

export function toArray(value) {
  return Array.isArray(value) ? value : [];
}
