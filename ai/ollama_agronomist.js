// ai/ollama_agronomist.js
// Ollama Local LLM & Cameroon Agricultural Expert AI System

const OLLAMA_BASE_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const PREFERRED_MODELS = [
  process.env.OLLAMA_MODEL || 'agrovission-agronomist',
  'agrovission-agronomist:latest',
  'llama3.2:latest',
  'llama3.2',
  'llama3:latest',
  'llama3',
  'mistral:latest',
  'mistral'
];

const AGRONOMIST_SYSTEM_PROMPT = `You are "PlantVillage Agro-Vission AI", an expert Agronomist, Soil Scientist, and Plant Pathologist specialized in Cameroon and Sub-Saharan African agriculture.
You possess deep agro-ecological expertise across all 10 regions of Cameroon:
- Far North & North (Sudano-Sahelian): Sorghum, Muskuwaari, Millet, Onion (Maroua violet), Cotton (SODECOTON), Groundnut, SEMRY Rice, Cowpea.
- Adamawa (High Guinea Savanna): Maize, Yam, Groundnut, Cassava, Soya, Pasture/Livestock forage.
- West & North-West (Highlands): Irish Potato (Santa/Dschang), Tomato (Foumbot hub), Arabica Coffee, Maize, Beans, Cabbage, Ndop Rice, Pepper.
- Littoral & South-West (Monomodal Humid Forest): Plantain (Moungo basin: Njombe/Penja/Mbanga), Dessert Banana, Cocoa, Oil Palm, Pineapple (Penja/Mbanga), Robusta Coffee, Pepper.
- Centre, South & East (Bimodal Humid Forest): Cassava (Bafia/Obala/Sangmelima), Cocoa, Robusta Coffee, Yam, Maize, Groundnuts, Okra.

When responding to farmers or agricultural technicians:
1. Provide a direct, actionable answer with exact crop varieties, spacing, and quantities.
2. Provide step-by-step organic, cultural, and chemical treatment/management options.
3. Recommend regional fertilizer schedules (NPK formulas, Urea, SSP, MOP, Lime/Wood ash, and well-cured animal manure).
4. Give preventative agronomic advice (mulching, ridge construction, disease scouting, push-pull intercropping).
Keep your tone encouraging, practical, scientific, and direct. Support both English and French farming inquiries.`;

// Comprehensive offline agronomic knowledge base covering Cameroon crops
const OFFLINE_KNOWLEDGE = [
  {
    triggers: ['cassava', 'manioc', 'tuber', 'mosaic', 'cbsd', 'cbb'],
    response: `🌿 **Cassava Agronomy & Disease Shield (Cameroon Best Practices):**
- **Varieties:** Plant certified CMD-resistant stem cuttings (TME 419, TMS 98/0505, TMS 92/0326).
- **Planting:** 20-25 cm stakes with 4-6 nodes, slanted at 45° in well-drained ridges (1m x 1m spacing, 10,000 plants/ha).
- **Fertilizer Program:** NPK 12-12-17 or 15-15-15 at 250 kg/ha at 6 weeks; wood ash/potash at 14 weeks for tuber swelling.
- **Disease Control:**
  - *Mosaic Disease (CMD):* Rogue and burn yellow mottled plants immediately. Spray neem oil for whiteflies.
  - *Bacterial Blight:* Prune infected tips; apply copper hydroxide spray.`
  },
  {
    triggers: ['maize', 'corn', 'armyworm', 'rust', 'blight', 'urea'],
    response: `🌽 **Maize High-Yield & Pest Control (Foumbot, West & Northern Savanna):**
- **Planting:** 75 cm between rows x 25 cm between plants, 2 seeds/hole, thin to 1 plant after 2 weeks.
- **Fertilizer Program:**
  - *Basal (At Planting):* NPK 20-10-10 or 15-15-15 at 200 kg/ha (1 matchbox per 2 holes).
  - *Top-Dressing (Knee-high, 4-5 weeks):* Urea (46% N) at 100 kg/ha placed 5 cm from stems before hilling.
- **Fall Armyworm Management:** Drop wood ash or fine sand into the funnel whorl. Spray Emamectin Benzoate 5% SG if >10% of plants show window-pane damage.`
  },
  {
    triggers: ['tomato', 'blight', 'wilt', 'foumbot', 'staking', 'watering'],
    response: `🍅 **Tomato Management & Disease Shield (Noun Valley / Foumbot Standards):**
- **Staking & Pruning:** Stake firmly with bamboo and prune suckers up to 30 cm from soil for maximum ventilation.
- **Watering:** Base basin or drip irrigation only—never wet the foliage overhead.
- **Blight Shield:**
  - *Early Blight (target rings):* Apply Mancozeb or copper oxychloride weekly in rainy weather.
  - *Late Blight (brown greasy rot):* Spray systemic Metalaxyl + Mancozeb (Ridomil Gold) at first sign.
- **Nutrients:** Apply Calcium Nitrate at flowering to prevent Blossom End Rot.`
  },
  {
    triggers: ['plantain', 'banana', 'sigatoka', 'weevil', 'moungo', 'njombe'],
    response: `🍌 **Plantain & Banana Plantation Guide (Moungo Basin & South-West):**
- **Sucker Selection & Cleansing:** Choose vigorous sword suckers. Pare roots and dip in hot water (55°C for 20 mins) or coat with wood ash against weevils and nematodes.
- **Spacing & Planting:** 3m x 2m (1,600 plants/ha) in 60x60x60 cm holes mixed with 10 kg composted manure.
- **Sigatoka Management:** Surgically de-leaf black-streaked sections and face them down on mulch. Apply high-potassium NPK every 3 months.`
  },
  {
    triggers: ['cocoa', 'cacao', 'black pod', 'mirid', 'kumba'],
    response: `🍫 **Cocoa High-Production & Black Pod Management (Centre, South, South-West):**
- **Shade & Pruning:** Maintain 30-40% canopy shade. Remove chupons and dead branches to aerate trees.
- **Black Pod (Phytophthora) Control:** Apply copper-based fungicide (Ridomil Gold Plus or Nordox) every 21 days during the heavy rainy season. Remove and bury blackened pods.
- **Mirid/Capsid Control:** Spray approved systemic insecticide (e.g., Thiamethoxam) at peak population flush (August - October).`
  },
  {
    triggers: ['coffee', 'café', 'arabica', 'robusta', 'dschang'],
    response: `☕ **Coffee Plantation & Quality Guide (Western Highlands & Moungo):**
- **Arabica (Highlands >1200m) & Robusta (Lowlands):** Maintain 2.5m x 2.5m spacing with mulch.
- **Coffee Berry Disease (CBD):** Apply preventative copper sprays before flowering and throughout cherry swelling.
- **Berry Borer:** Hang brocap traps with alcohol bait; harvest ripe cherries cleanly every 7-10 days.`
  },
  {
    triggers: ['yam', 'igname', 'bafia', 'mound'],
    response: `🥔 **Yam Cultivation & Staking (Bafia, Mbam, West & North-West):**
- **Mound Construction:** Construct large mounds (60-80 cm high) rich in loose organic topsoil.
- **Staking:** Provide strong 3-4m wooden stakes for vine support to maximize solar interception.
- **Anthracnose Control:** Treat seed setts with ash/fungicide before planting; spray Mancozeb during active vine development.`
  },
  {
    triggers: ['potato', 'pomme de terre', 'santa', 'bamboutos'],
    response: `🥔 **Irish Potato Production (Santa, Dschang, Bamboutos Highlands):**
- **Seed Tubers:** Plant certified sprouted seed tubers (varieties: Cipira, Tubira) at 75cm x 30cm spacing.
- **Hilling:** Hill soil around stems at 4 weeks to protect developing tubers from sunlight and blight spores.
- **Late Blight Shield:** Apply Mancozeb preventatively and Metalaxyl during persistent foggy/rainy weather.`
  },
  {
    triggers: ['groundnut', 'arachide', 'peanut', 'maroua', 'garoua'],
    response: `🥜 **Groundnut Production & Rosette Shield (North, Far North, Centre):**
- **Tillage:** Till soil loose and friable for easy peg penetration into the ground.
- **Fertilizer:** Apply Single Super Phosphate (SSP) at 150 kg/ha at planting; avoid excessive nitrogen.
- **Rosette Virus:** Plant early at close spacing (50cm x 15cm) to create dense canopy coverage that repels aphid vectors.`
  },
  {
    triggers: ['rice', 'riz', 'semry', 'ndop', 'yagoua'],
    response: `🌾 **Rice Cultivation Guide (SEMRY Yagoua & Ndop Plains):**
- **Water Management:** Maintain 5-10 cm water level in paddies from tillering to flowering.
- **Fertilization:** Basal NPK 15-15-15 at 200 kg/ha + Urea split into two top-dressings (tillering and panicle initiation).
- **Rice Blast Shield:** Use certified blast-resistant seed (NERICA / IR varieties) and avoid excess nitrogen.`
  },
  {
    triggers: ['soil', 'compost', 'npk', 'manure', 'laterite', 'clay', 'sandy', 'lime'],
    response: `🌱 **Cameroon Soil Fertility & Improvement Advisory:**
- **Acidic Lateritic Red Soils (Centre, South, Littoral):** Apply Agricultural Lime or wood ash (1-2 Tons/ha) 3 weeks before planting to correct pH (ideal: 6.2 - 6.8) and unlock Phosphorus.
- **Volcanic Highland Soils (West, North-West, South-West):** Naturally fertile but benefit from balanced NPK 20-10-10 and heavy organic mulching.
- **Sandy Savanna Soils (North, Far North):** Low water retention. Incorporate compost and cow manure generously.`
  }
];

/**
 * Auto-detect the best active Ollama model
 */
async function resolveActiveOllamaModel() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      const availableModels = (data.models || []).map(m => m.name);
      for (const pref of PREFERRED_MODELS) {
        if (availableModels.includes(pref)) {
          return pref;
        }
      }
      if (availableModels.length > 0) {
        return availableModels[0];
      }
    }
  } catch (e) {
    // offline or unreachable
  }
  return PREFERRED_MODELS[0];
}

/**
 * Chat with Agronomist AI using Ollama or Offline Agronomy Fallback
 */
async function chatAgronomist({ message, history = [] }) {
  if (!message || !message.trim()) {
    return {
      success: false,
      reply: 'Please ask an agronomy or farming question.'
    };
  }

  const modelToUse = await resolveActiveOllamaModel();

  // 1. Attempt local Ollama LLM call
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout for local LLM

    const formattedMessages = [
      { role: 'system', content: AGRONOMIST_SYSTEM_PROMPT },
      ...history.map(h => ({
        role: h.sender === 'user' ? 'user' : 'assistant',
        content: h.text || h.content || ''
      })),
      { role: 'user', content: message }
    ];

    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: modelToUse,
        messages: formattedMessages,
        stream: false,
        options: {
          temperature: 0.6,
          top_p: 0.9
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const reply = data?.message?.content || data?.response;
      if (reply) {
        return {
          success: true,
          reply: reply.trim(),
          source: `Ollama Local LLM (${modelToUse})`,
          isOfflineFallback: false,
          modelUsed: modelToUse
        };
      }
    }
  } catch (err) {
    // Ollama not currently running or timed out; seamlessly transition to offline knowledge engine
  }

  // 2. Intelligent Offline Fallback Engine
  const lowerMsg = message.toLowerCase();
  for (const item of OFFLINE_KNOWLEDGE) {
    if (item.triggers.some(t => lowerMsg.includes(t))) {
      return {
        success: true,
        reply: item.response,
        source: 'Agro-Vission On-Device AI Agronomist (Offline)',
        isOfflineFallback: true,
        modelUsed: 'Offline Knowledge Engine'
      };
    }
  }

  // Generic expert fallback response
  return {
    success: true,
    reply: `🌾 **Agro-Vission AI Agronomist Guidance:**
Regarding **"${message.trim()}"**:
1. **Soil & Field Preparation:** Till soil deeply, construct high ridges for root crops, and add decomposed organic manure to boost beneficial soil microbiome.
2. **Crop Protection:** Scout leaf undersides and stem bases every 3 days for early insect eggs, fungal spots, or discoloration.
3. **Fertilizer Program:** Apply Phosphorus (SSP/NPK) at planting for strong roots, Nitrogen (Urea) during vegetative growth, and Potassium (MOP/Wood ash) for fruit and tuber bulking.
4. **Resilience & Intercropping:** Rotate cereals with legumes (beans, groundnuts, cowpeas) every 2 seasons to replenish nitrogen naturally.

*Tip: You can ask specific questions about Cassava, Maize, Tomatoes, Plantains, Cocoa, Coffee, Yam, Irish Potato, Groundnuts, Rice, or Soil fertility in your specific region.*`,
    source: 'Agro-Vission On-Device AI Agronomist (Offline)',
    isOfflineFallback: true,
    modelUsed: 'Offline Knowledge Engine'
  };
}

/**
 * Check Ollama model status
 */
async function checkOllamaStatus() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      const activeModel = await resolveActiveOllamaModel();
      return {
        online: true,
        models: data.models || [],
        selectedModel: activeModel
      };
    }
  } catch (e) {
    // offline
  }
  return {
    online: false,
    models: [],
    selectedModel: PREFERRED_MODELS[0],
    message: 'Local Ollama not active. On-Device Offline AI is handling all requests.'
  };
}

module.exports = {
  chatAgronomist,
  checkOllamaStatus,
  AGRONOMIST_SYSTEM_PROMPT
};
