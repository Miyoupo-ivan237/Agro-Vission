function parseBoolean(value) {
  return value === true || value === 'true' || value === 1 || value === '1';
}

function parseInteger(value, fallback = 0) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

module.exports = { parseBoolean, parseInteger };
