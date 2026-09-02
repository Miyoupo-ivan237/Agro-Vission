export function formatDate(value) { return new Date(value).toLocaleDateString(); }
export function formatPercent(value) { return `${Math.round(Number(value || 0) * 100)}%`; }
