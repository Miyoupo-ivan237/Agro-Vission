const OLLAMA_BASE_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const VISION_MODEL = process.env.OLLAMA_VISION_MODEL || 'llava:latest';
const VISION_TIMEOUT_MS = Number(process.env.OLLAMA_VISION_TIMEOUT_MS || 180000);
const VISION_KEEP_ALIVE = process.env.OLLAMA_KEEP_ALIVE || '30m';
const VISION_NUM_THREADS = Number(process.env.OLLAMA_NUM_THREADS || 4);

function stripCodeFence(text) {
  return String(text || '').replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
}

async function diagnoseImage({ crop, imageBase64, symptomsText = '', language = 'English' }) {
  if (!imageBase64 || typeof imageBase64 !== 'string' || imageBase64.length < 100) return null;

  const image = imageBase64.replace(/^data:image\/[^;]+;base64,/, '');
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), VISION_TIMEOUT_MS);

  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: VISION_MODEL,
        stream: false,
        format: 'json',
        images: [image],
        keep_alive: VISION_KEEP_ALIVE,
        options: {
          num_ctx: 2048,
          num_threads: VISION_NUM_THREADS,
          num_predict: 350,
          temperature: 0.2
        },
        prompt: `Analyze the attached image as an expert plant pathologist. The selected crop is "${crop || 'unknown'}".
${symptomsText ? `Additional symptoms reported by farmer: ${symptomsText}` : ''}
Return only valid JSON with exactly these keys:
{"isPlant":true,"imageCrop":"","name":"disease or healthy plant","scientificName":"","severity":"Low|Moderate|High|Critical","confidence":0.0,"symptoms":[],"organicTreatment":[],"chemicalTreatment":[],"prevention":[],"explanation":""}
Use ${language} for all text values. Set isPlant to false for people, animals, buildings, screenshots, soil-only images, or any non-plant subject. Set isPlant to false when the image is too blurred, dark, distant, or obstructed to assess a plant. Set imageCrop to the crop you can actually see, or an empty string if no plant is visible. Do not guess a disease for a non-plant or unusable image.`
      }),
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`Ollama vision request failed (${response.status})`);
    const payload = await response.json();
    const parsed = JSON.parse(stripCodeFence(payload.response));
    return {
      ...parsed,
      isPlant: parsed.isPlant === true,
      imageCrop: String(parsed.imageCrop || ''),
      crop: crop || 'General',
      confidence: Math.max(0, Math.min(1, Number(parsed.confidence) || 0.85)),
      symptoms: Array.isArray(parsed.symptoms) ? parsed.symptoms : [],
      organicTreatment: Array.isArray(parsed.organicTreatment) ? parsed.organicTreatment : [],
      chemicalTreatment: Array.isArray(parsed.chemicalTreatment) ? parsed.chemicalTreatment : [],
      prevention: Array.isArray(parsed.prevention) ? parsed.prevention : [],
      language,
      source: `Ollama vision (${VISION_MODEL})`,
      diagnosedAt: new Date().toISOString()
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

module.exports = { diagnoseImage };
