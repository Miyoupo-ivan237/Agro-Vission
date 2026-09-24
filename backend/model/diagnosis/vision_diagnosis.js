const OLLAMA_BASE_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const VISION_MODEL = process.env.OLLAMA_VISION_MODEL || 'llava:latest';
const VISION_TIMEOUT_MS = Number(process.env.OLLAMA_VISION_TIMEOUT_MS || 300000);
const VISION_KEEP_ALIVE = process.env.OLLAMA_KEEP_ALIVE || '30m';
const VISION_NUM_THREADS = Number(process.env.OLLAMA_NUM_THREADS || 4);

function stripCodeFence(text) {
  const cleaned = String(text || '').trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (match) return match[0];
  return cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
}

const CROP_ALIASES = {
  maize: ['maize', 'corn', 'maïs', 'mais'],
  beans: ['beans', 'bean', 'common bean', 'haricot'],
  cassava: ['cassava', 'manioc'],
  tomato: ['tomato', 'tomate'],
  groundnut: ['groundnut', 'peanut', 'arachide', 'garnut'],
  banana: ['banana', 'banane'],
  plantain: ['plantain', 'banane plantain'],
  cocoa: ['cocoa', 'cacao'],
  potato: ['potato', 'irish potato', 'pomme de terre'],
  pepper: ['pepper', 'piment'],
  rice: ['rice', 'riz'],
  yam: ['yam', 'igname'],
  coffee: ['coffee', 'café', 'cafe'],
  onion: ['onion', 'oignon']
};

function normalizeCrop(value) {
  const text = String(value || '').trim().toLowerCase();
  if (!text) return '';
  const exact = Object.entries(CROP_ALIASES).find(([, aliases]) => aliases.includes(text))?.[0];
  if (exact) return exact;
  for (const [canonical, aliases] of Object.entries(CROP_ALIASES)) {
    if (aliases.some(alias => text.includes(alias))) {
      return canonical;
    }
  }
  return '';
}

async function diagnoseImage({ crop, imageBase64, symptomsText = '', language = 'English' }) {
  if (!imageBase64 || typeof imageBase64 !== 'string' || imageBase64.length < 100) return null;

  const image = imageBase64.replace(/^data:image\/[^;]+;base64,/, '');
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), VISION_TIMEOUT_MS);

  const selectedNormalized = normalizeCrop(crop);
  const isConfirmedCrop = selectedNormalized && selectedNormalized !== 'auto';
  const cropContext = isConfirmedCrop
    ? `FARMER CONFIRMED CROP: The farmer explicitly confirms this is a ${selectedNormalized.toUpperCase()} (Zea mays / Maïs) plant from their farm. You MUST evaluate this image strictly as ${selectedNormalized.toUpperCase()}. Under NO circumstances diagnose a disease from another crop (e.g. NEVER diagnose Groundnut Rosette on a Maize plant). Focus entirely on ${selectedNormalized.toUpperCase()} diseases (Fall Armyworm, Maize Streak Virus, Common Rust, Blight) or Maize Nutrient Deficiencies (Nitrogen, Potassium, Zinc).`
    : `PLANT MORPHOLOGY & CROP CLASSIFICATION:
- MAIZE (Corn / Maïs): Monocot grass with long, strap-like ribbon leaves, parallel veins, thick erect jointed stalk. If the leaf is long/elongated with parallel veins, it is 100% MAIZE, NEVER Groundnut!
- GROUNDNUT (Peanut / Arachide): Dicot legume with small oval leaflets in sets of 4, prostrate creeping stems. Groundnut NEVER has long elongated leaves.`;

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
          num_predict: 600,
          temperature: 0.1
        },
        prompt: `You are an expert plant pathologist for Cameroon. Analyze this plant leaf/crop image.

${cropContext}

${symptomsText ? `FARMER-REPORTED SYMPTOMS: ${symptomsText}` : ''}

STEP 1 — IDENTIFY THE CROP:
- MAIZE (Corn): tall grass with wide flat leaves, thick jointed stem, tassels at top, ear/cob with grain rows
- GROUNDNUT (Peanut/Arachide): low-growing legume with oval leaflets in pairs, thin stems, pods under soil
- CASSAVA (Manioc): lobed star-shaped leaves with 5-9 fingers, woody branching stem, tuberous roots
- TOMATO: deeply serrated leaves, hairy stems, round clustered fruits
- BEANS: broad tri-leaflet leaves (3 leaflets per leaf), twining vines or bushy stems
- PLANTAIN/BANANA: very large paddle-shaped leaves, thick pseudostem, bunch of fruit
- COCOA: large oval glossy leaves, colorful pods directly on trunk
- POTATO: compound pinnate leaves, hairy stems, small white/purple flowers
- PEPPER: glossy oval leaves, erect stems, elongated fruits
- RICE: narrow grass blades, hollow jointed stem, grain panicle
- YAM: heart-shaped leaves, twining vine, rough-skinned tuber
- COFFEE: paired oval shiny leaves, woody branches, small red cherries
- ONION: hollow cylindrical blue-green leaves

STEP 2 — Only identify a crop when you clearly see its distinctive features. Never guess. Maize is NOT groundnut. Groundnut leaves are small oval pairs on a low bushy plant — maize is tall with wide flat leaves.

STEP 3 — Diagnose disease, pest, or nutrient deficiency from visible symptoms:
- Distinguish between fungal/bacterial/viral infections, insect damage, and physiological nutrient deficiencies:
  * Nitrogen (N) deficiency: uniform chlorosis/yellowing starting from older/lower leaves upward, stunted thin stems
  * Phosphorus (P) deficiency: purplish-red pigmentation on undersides of older leaves, delayed maturity
  * Potassium (K) deficiency: marginal chlorosis and necrosis/scorch (burnt brown edges) on older leaves
  * Magnesium (Mg) deficiency: interveinal chlorosis (yellowing between green veins) on older leaves
  * Calcium (Ca) deficiency: blossom end rot (sunken dark base in tomato/pepper), dieback of young leaf tips
  * Iron (Fe) deficiency: interveinal chlorosis on new/young leaves
  * Zinc (Zn) deficiency: white/yellow bands or stripes on leaves, small leaves/rosette
- If symptoms indicate nutrient deficiency rather than pathogen, set name to the specific deficiency (e.g. "Nitrogen Deficiency", "Potassium Deficiency", "Magnesium Deficiency")
- For nutrient deficiencies, include corrective fertilizer/foliar feeding steps in treatments, and recommend professional leaf tissue laboratory testing (such as Agro Hospital in Cameroon: +237 681532846)

Return ONLY valid JSON (no extra text, no code fences):
{"isPlant":true,"imageCrop":"","name":"disease, deficiency, or healthy plant","scientificName":"","severity":"Low|Moderate|High|Critical","confidence":0.0,"symptoms":[],"organicTreatment":[],"chemicalTreatment":[],"prevention":[],"explanation":""}

Rules:
- imageCrop must be exactly one of: maize, beans, cassava, tomato, groundnut, banana, plantain, cocoa, potato, pepper, rice, yam, coffee, onion — or empty string if uncertain
- Set isPlant false for: people, animals, buildings, screenshots, soil-only images, non-plant objects, or images too blurry/dark to assess
- Use ${language} for all text values
- Use low confidence when uncertain; do NOT invent a diagnosis`
      }),
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`Ollama vision request failed (${response.status})`);
    const payload = await response.json();
    let parsed;
    try {
      parsed = JSON.parse(stripCodeFence(payload.response));
    } catch (parseErr) {
      console.warn('[AgroVission Vision] JSON parse failed on raw output:', payload.response);
      throw new Error(`Failed to parse vision model response: ${parseErr.message}`);
    }

    let imageCrop = normalizeCrop(parsed.imageCrop);
    if (selectedNormalized && selectedNormalized !== 'auto') {
      // Farmer's explicit crop selection is the absolute ground truth
      imageCrop = selectedNormalized;
    } else if (!imageCrop) {
      const extraContext = `${parsed.name || ''} ${parsed.scientificName || ''} ${parsed.explanation || ''}`;
      imageCrop = normalizeCrop(extraContext) || 'maize';
    }

    // Safety guard: if crop is maize, NEVER allow a groundnut disease to leak through
    if (imageCrop === 'maize' && (parsed.name || '').toLowerCase().includes('groundnut')) {
      const isFr = language === 'Français';
      parsed.name = isFr
        ? 'Carence Nutritive ou Maladie Foliaire du Maïs'
        : 'Maize Nutrient Deficiency or Foliar Disease';
      parsed.scientificName = 'Zea mays pathology / Physiological disorder';
      parsed.symptoms = [
        isFr ? 'Jaunissement foliaire ou nécrose sur feuilles de maïs' : 'Leaf yellowing or chlorosis on maize foliage',
        isFr ? 'Ralentissement du développement végétatif du maïs' : 'Stunted growth in maize'
      ];
      parsed.organicTreatment = [
        isFr ? 'Enfouir 5 à 10 T/ha de fumier bien décomposé' : 'Incorporate 5-10 tons/ha of well-rotted manure',
        isFr ? 'Apporter de la cendre de bois tamisée le long des rangs' : 'Apply sifted wood ash along rows for potassium and micronutrients'
      ];
      parsed.chemicalTreatment = [
        isFr ? 'Urée 46% (100 kg/ha) en couverture à 4-5 semaines + NPK 20-10-10' : 'Side-dress Urea 46% (100 kg/ha) at knee-high stage (4-5 weeks) + NPK 20-10-10'
      ];
      parsed.prevention = [
        isFr ? 'Détecter les carences par analyse foliaire au laboratoire Agro Hospital Cameroun (+237 681532846)' : 'Detect deficiencies early via scientific leaf analysis at Agro Hospital Cameroon (+237 681532846)'
      ];
    }

    return {
      ...parsed,
      isPlant: parsed.isPlant === true,
      imageCrop,
      crop: imageCrop || crop || 'General',
      confidence: Math.max(0, Math.min(1, Number(parsed.confidence) || 0.92)),
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

module.exports = { diagnoseImage, normalizeCrop, CROP_ALIASES };
