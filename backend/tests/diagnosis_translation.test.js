const assert = require('assert');
const { diagnoseCrop } = require('../model/diagnosis/diagnosis_engine');

const result = diagnoseCrop({
  crop: 'cassava',
  symptomsText: 'yellow mottling distorted leaves whitefly',
  additionalNotes: 'plants stunted',
  farmerContext: { region: 'Centre', season: 'rainy' },
  language: 'Français'
});

assert.strictEqual(result.success, true);
assert.strictEqual(result.diagnosis.name, 'Maladie de la Mosaïque du Manioc (CMD)');
assert.match(result.diagnosis.organicTreatment[0], /Arracher|brûler/);
console.log('diagnosis_translation.test.js: PASS');
