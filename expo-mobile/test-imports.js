// Quick test to check for import errors
console.log('Testing imports...');

try {
  console.log('Loading translations...');
  const { getT } = require('./src/translations');
  console.log('✓ Translations loaded');
} catch (e) {
  console.error('✗ Translations error:', e.message);
  console.error(e.stack);
}

try {
  console.log('Loading api...');
  const api = require('./src/api');
  console.log('✓ API loaded');
  console.log('  Available functions:', Object.keys(api).slice(0, 10).join(', '));
} catch (e) {
  console.error('✗ API error:', e.message);
  console.error(e.stack);
}

try {
  console.log('Loading offline AI...');
  const { offlineDiagnoseCrop } = require('./src/offline_ai');
  console.log('✓ Offline AI loaded');
} catch (e) {
  console.error('✗ Offline AI error:', e.message);
  console.error(e.stack);
}

console.log('\nAll critical imports tested.');
