function requireFields(payload, fields) {
  return fields.filter((field) => !payload?.[field]);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

module.exports = { requireFields, isEmail };
