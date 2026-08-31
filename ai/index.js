// ai/index.js
const { diagnoseCrop, getSupportedDiseases } = require('./diagnosis_engine');
const { getCropRecommendation, CROPS_RECOMMENDATION_DATA } = require('./recommendation_engine');
const { chatAgronomist, checkOllamaStatus } = require('./ollama_agronomist');

module.exports = {
  diagnoseCrop,
  getSupportedDiseases,
  getCropRecommendation,
  CROPS_RECOMMENDATION_DATA,
  chatAgronomist,
  checkOllamaStatus
};
