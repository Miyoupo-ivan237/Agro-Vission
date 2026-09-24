const { diagnoseCrop, getSupportedDiseases } = require('./diagnosis/diagnosis_engine');
const { getCropRecommendation, CROPS_RECOMMENDATION_DATA } = require('./recommendation/recommendation_engine');
const { chatAgronomist, checkOllamaStatus } = require('./agronomist/ollama_agronomist');
const { diagnoseImage, normalizeCrop, CROP_ALIASES } = require('./diagnosis/vision_diagnosis');

module.exports = {
  diagnoseCrop,
  getSupportedDiseases,
  getCropRecommendation,
  CROPS_RECOMMENDATION_DATA,
  chatAgronomist,
  checkOllamaStatus,
  diagnoseImage,
  normalizeCrop,
  CROP_ALIASES
};
