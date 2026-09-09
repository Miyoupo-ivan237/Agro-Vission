// ai/index.js
const { diagnoseCrop, getSupportedDiseases } = require('./diagnosis/diagnosis_engine');
const { getCropRecommendation, CROPS_RECOMMENDATION_DATA } = require('./recommendation/recommendation_engine');
const { chatAgronomist, checkOllamaStatus } = require('./agronomist/ollama_agronomist');

module.exports = {
  diagnoseCrop,
  getSupportedDiseases,
  getCropRecommendation,
  CROPS_RECOMMENDATION_DATA,
  chatAgronomist,
  checkOllamaStatus
};
