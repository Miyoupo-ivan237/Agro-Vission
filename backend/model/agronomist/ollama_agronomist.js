// ai/ollama_agronomist.js
// Ollama Local LLM & Cameroon Agricultural Expert AI System

const OLLAMA_BASE_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const OLLAMA_NUM_CTX = Number(process.env.OLLAMA_NUM_CTX || 1024);
const OLLAMA_TIMEOUT_MS = Number(process.env.OLLAMA_TIMEOUT_MS || 180000);
const OLLAMA_KEEP_ALIVE = process.env.OLLAMA_KEEP_ALIVE || '30m';
const OLLAMA_NUM_THREADS = Number(process.env.OLLAMA_NUM_THREADS || 4);
const PREFERRED_MODELS = [
  process.env.OLLAMA_MODEL || 'qwen2.5:3b',
  'qwen2.5:3b',
  'qwen2.5:latest',
  'qwen2.5',
  'qwen2.5:1.5b',
  'qwen2.5:7b',
  'agrovission-agronomist:latest',
  'agrovission-agronomist',
  'llama3.2:latest',
  'llama3.2',
  'mistral:latest',
  'mistral'
];

const AGRONOMIST_SYSTEM_PROMPT = `You are "Agro-Vission AI", an expert Agronomist Handbook, Soil Scientist, and Plant Pathologist specialized in Cameroon and Sub-Saharan African agriculture.
You answer all farming questions intelligently (staples, vegetables, groundnuts/garnut, cocoa, coffee, tubers, soils, fertilizers, pest control, plant diseases, irrigation, harvesting).
For every question:
1. Provide practical, encyclopedic advice with recommended Cameroon varieties (IRAD, hybrid seeds), plant spacing, and planting timing.
2. Detail fertilizer programs (NPK formulas, Urea, SSP, compost) and pest management (organic remedies like neem oil, and safe chemical options like Mancozeb, Emamectin Benzoate).
3. For diseases and pests (rosette virus, aphids, armyworms, blights, mosaic), give symptoms, causes, and step-by-step solutions.
4. Tailor advice to Cameroon's agro-ecological zones (Far North, Adamawa, Western Highlands, Littoral, Centre, South). Respond directly, clearly, and authoritatively.`;

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
    triggers: ['groundnut', 'garnut', 'arachide', 'peanut', 'maroua', 'garoua'],
    response: `🥜 **Groundnut / Garnut Production & Disease Shield (Cameroon Best Practices):**
- **Soil & Bed Prep:** Till soil deeply (20-25cm) until light and friable so gynophores (pegs) can easily penetrate the earth for pod development.
- **Spacing & Planting:** 50cm x 15cm (1 seed per hole at 3-5cm depth) at the onset of regular rains.
- **Fertilizer Program:** Apply Single Super Phosphate (SSP) at 150 kg/ha at planting for strong roots and nodules; apply Gypsum (200 kg/ha) at flowering to guarantee full pods and avoid empty shells. Avoid excess nitrogen.
- **Rosette Virus & Aphid Shield:** Plant early and at high density so canopy rapidly shades the soil, repelling aphid vectors. Spray neem seed extract or registered systemic insecticide at first aphid sightings.
- **Leaf Spot (Cercospora):** Spray Copper Oxychloride or Mancozeb if dark circular leaf spots appear during wet intervals.`
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
  },
  {
    triggers: ['center', 'centre', 'yaounde', 'yaoundé', 'bafia', 'mbalmayo', 'obala', 'monatele', 'monatélé', 'lekie', 'lékié', 'nyong', 'mfoumou'],
    response: `🌿 **Best Crops & Agronomic Guide for the CENTRE REGION of Cameroon:**

📍 **Agro-Ecological Zone:** Bimodal Humid Forest Zone (1500 - 2000 mm rainfall).
🗓️ **Dual Growing Seasons:** Season 1 (March – June) & Season 2 (August – November).

🌾 **Top Crops Really Produced in the Centre Region:**
1. **Cassava (Manioc):** The #1 staple and commercial tuber crop (Bafia, Obala, Bokito are national cassava hubs).
   - *Yield:* 25 - 35 Tons/Hectare.
   - *Varieties:* Plant CMD-resistant stem cuttings (TME 419, TMS 98/0505).
   - *Spacing:* 1m x 1m on 40-50cm ridges.
2. **Cocoa (Cacao):** Major historical cash crop (Mbalmayo, Monatélé, Ayos, Nyong-et-Mfoumou).
   - *Best Practice:* Nurse with plantain shade during establishment; apply copper fungicide every 21 days against Black Pod during heavy rains.
3. **Yam (Igname / Bafia White Yam):** Highly prized in Mbam & Inoubou.
   - *Practice:* Large mounds (60-80cm high) with 3-4m sturdy wooden stakes for maximum leaf sun exposure.
4. **Maize (Maïs):** Advantage of two full harvests per year thanks to bimodal rains.
   - *Fertilizer:* Basal NPK 20-10-10 (200 kg/ha) + Top-dress Urea (100 kg/ha) at 4 weeks.
5. **Plantain (Banane Plantain):** Grown in moist valleys and intercropped with young cocoa.
6. **Groundnuts & Okra:** Ideal for intercropping with maize and cassava on well-drained sandy-loam ridges.
7. **Oil Palm (Palmier à Huile):** High oil yield in river basins and humid southern border zones.

🌱 **Centre Region Soil & Fertility Management:**
- The Centre features acidic red lateritic / ferralitic soils (pH 4.8 - 5.8) prone to phosphorus fixation.
- **Key Advisory:** Apply Agricultural Lime or Wood Ash (1 - 2 Tons/ha) 3 weeks before planting to neutralize acidity and unlock phosphorus, and incorporate decomposed compost.`
  },
  {
    triggers: ['littoral', 'douala', 'moungo', 'njombe', 'njombé', 'penja', 'mbanga', 'edea', 'edéa', 'sanaga-maritime'],
    response: `🍌 **Best Crops & Agronomic Guide for the LITTORAL REGION of Cameroon:**

📍 **Agro-Ecological Zone:** Monomodal Coastal Rain Forest & Volcanic Belt (Moungo Basin, 2500 - 4000 mm rainfall).
🌾 **Top Crops Produced in Littoral:**
1. **Plantain & Dessert Banana:** Cameroon's primary production basin (Moungo: Penja, Njombe, Mbanga). Rich volcanic soils produce 20-30 Tons/ha. Manage Black Sigatoka with de-leafing and high-Potassium fertilizer.
2. **Penja Pepper (Poivre de Penja - PGI):** World-renowned white and black pepper on volcanic foothills. Requires sturdy live stakes and mulch.
3. **Pineapple (Ananas):** High brix sugar content (Penja & Mbanga). Plant double rows on raised beds (50,000 plants/ha).
4. **Oil Palm (Palmier à Huile):** Ideal climate across Sanaga-Maritime and Moungo.
5. **Cocoa & Cassava:** Grown extensively throughout rural coastal zones.`
  },
  {
    triggers: ['west region', 'ouest', 'bafoussam', 'foumbot', 'dschang', 'bamboutos', 'noun', 'mifi', 'menoua'],
    response: `🍅 **Best Crops & Agronomic Guide for the WEST REGION (Région de l'Ouest):**

📍 **Agro-Ecological Zone:** Western Volcanic Highlands & Valleys (>1400m altitude, 1600 - 2200 mm rainfall).
🌾 **Top Crops Produced in West Region:**
1. **Tomato (Tomate):** The Noun Valley (Foumbot) is Cameroon's tomato capital (25-45 Tons/ha). Bamboo staking and furrow irrigation are mandatory to prevent blight.
2. **Irish Potato (Pomme de Terre):** Santa, Dschang, and Bamboutos Highlands produce 18-30 T/ha. Certified sprouted seed (Cipira, Tubira) with hilling at 4 weeks.
3. **Arabica Coffee (Café Arabica):** High-altitude slopes around Dschang and Bafoussam. Prune suckers and spray copper before flowering.
4. **Maize & French Beans:** Highly productive bimodal cereal-legume rotation in volcanic loam.
5. **Cabbage, Carrots & Bell Peppers:** Thriving market gardening across high-plateau valleys.`
  },
  {
    triggers: ['north-west', 'nord-ouest', 'bamenda', 'ndop', 'santa', 'kumbo', 'wum', 'donga-mantung', 'bui'],
    response: `🥔 **Best Crops & Agronomic Guide for the NORTH-WEST REGION:**

📍 **Agro-Ecological Zone:** High Altitude Western Highlands (>1500m altitude, 1800 - 2400 mm rainfall).
🌾 **Top Crops Produced in North-West:**
1. **Irish Potato (Pomme de Terre):** Santa and Kumbo highlands. Excellent cool-weather yields (18-28 T/ha).
2. **Padi Rice (Riz irrigué):** Ndop Floodplains produce premium upland and lowland rice. Level paddies and split Urea into 2-3 dressings.
3. **Highland Maize & Climbing Beans:** Traditional high-yield intercrop replenishing soil nitrogen naturally.
4. **Arabica Coffee:** Cultivated on volcanic ridges with shade trees.
5. **Sweet Potato & Yam:** Grown on terraces and deep ridges across mid-altitude valleys.`
  },
  {
    triggers: ['south-west', 'sud-ouest', 'buea', 'kumba', 'limbe', 'limbée', 'fako', 'meme', 'ndian', 'manyu'],
    response: `🍫 **Best Crops & Agronomic Guide for the SOUTH-WEST REGION:**

📍 **Agro-Ecological Zone:** Coastal Volcanic Belt & Mount Cameroon Foothills (2000 - 4500 mm rainfall).
🌾 **Top Crops Produced in South-West:**
1. **Cocoa (Cacao):** Kumba is Cameroon's largest cocoa trading hub ("Kumba Cocoa"). Volcanic soils yield superior bean quality. Maintain 3m x 3m spacing and treat Black Pod every 21 days during heavy rains.
2. **Plantain & Banana:** Vast plantations across Fako and Meme. Hot-water dip suckers at 55°C to kill nematodes.
3. **Oil Palm (Palmier à Huile):** CDC and smallholder estates thrive in Ndian and Fako.
4. **Cameroon Pepper & Cassava:** Thriving commercial food crops across the coastal belt.`
  },
  {
    triggers: ['south region', 'région du sud', 'ebolowa', 'sangmelima', 'sangmélima', 'kribi', 'mvomeka', 'dja'],
    response: `🌱 **Best Crops & Agronomic Guide for the SOUTH REGION (Région du Sud):**

📍 **Agro-Ecological Zone:** Dense Equatorial Rain Forest (1600 - 2200 mm rainfall, high humidity).
🌾 **Top Crops Produced in South Region:**
1. **Cassava (Manioc):** Sangmélima is a premier processing hub. Plant CMD-resistant varieties (TME 419) on 60cm ridges.
2. **Cocoa (Cacao):** Shaded equatorial cocoa agroforestry with native forest canopy.
3. **Plantain & Cocoyam (Macabo):** High moisture and rich organic forest litter favor vigorous vegetative growth.
4. **Oil Palm & Rubber (Hévéa):** Major industrial and smallholder plantations along coastal-forest plains.`
  },
  {
    triggers: ['east region', 'région de l\'est', 'bertoua', 'batouri', 'yokadouma', 'abong-mbang', 'lom-et-djerem'],
    response: `🌿 **Best Crops & Agronomic Guide for the EAST REGION (Région de l'Est):**

📍 **Agro-Ecological Zone:** Guineo-Congolian Forest & Savanna Transition (1400 - 1800 mm rainfall).
🌾 **Top Crops Produced in East Region:**
1. **Cassava & Plantain:** Primary staples thriving in deep organic forest soils. Construct high mounds.
2. **Cocoa & Robusta Coffee:** Extensive agroforestry plantations across Bertoua, Batouri, and Abong-Mbang.
3. **Maize & Groundnut:** Savanna transition zones in the north of the East region provide ideal conditions for two cereal-legume harvests per year.`
  },
  {
    triggers: ['adamawa', 'adamaoua', 'ngaoundere', 'ngaoundéré', 'tibati', 'meiganga', 'banyo', 'vina', 'mbere'],
    response: `🌽 **Best Crops & Agronomic Guide for the ADAMAWA REGION (Région de l'Adamaoua):**

📍 **Agro-Ecological Zone:** High Guinea Savanna Plateau (>1000m altitude, 1200 - 1600 mm rainfall).
🌾 **Top Crops Produced in Adamawa:**
1. **Maize (Maïs):** Major commercial grain belt. High-yielding hybrid varieties with basal NPK 20-10-10.
2. **Yam (Igname) & Sweet Potato:** Thrives on loose savanna mounds.
3. **Groundnut (Arachide) & Soybean (Soja):** Excellent legume rotation that fixes atmospheric nitrogen.
4. **Sorghum (Sorgho de saison):** Drought-resilient cereal for savanna plateaus.`
  },
  {
    triggers: ['north region', 'région du nord', 'garoua', 'guider', 'poli', 'mayo-louti', 'benoue', 'bénoué'],
    response: `🌱 **Best Crops & Agronomic Guide for the NORTH REGION (Région du Nord):**

📍 **Agro-Ecological Zone:** Sudanian Savanna Basin (700 - 1000 mm rainfall, single rainy season May - October).
🌾 **Top Crops Produced in North Region:**
1. **Cotton (Coton - SODECOTON White Gold):** Primary economic cash crop of the Benue basin. NPK-SB (14-18-18 + Boron) and weekly pest scouting.
2. **Groundnut (Arachide):** Highly adapted to sandy-clay savanna soils. Single Super Phosphate (SSP) at planting.
3. **Sorghum / Mil (Sorgho):** Core food security cereal with deep drought-resistant root systems.
4. **Maize & Cowpea (Niébé):** Intercropping provides cereal grain plus protein-rich legumes.`
  },
  {
    triggers: ['far north', 'extrême nord', 'extreme nord', 'maroua', 'kousseri', 'yagoua', 'diamare', 'diamaré', 'mayo-danay', 'logone', 'semry'],
    response: `🌾 **Best Crops & Agronomic Guide for the FAR NORTH REGION (Extrême-Nord):**

📍 **Agro-Ecological Zone:** Sudano-Sahelian Semi-Arid Plains & River Valleys (350 - 650 mm rainfall).
🌾 **Top Crops Produced in Far North:**
1. **Sorghum & Muskuwaari:** Rainy-season mil and flood-retreat transplanted Muskuwaari sorghum on heavy Karal vertisols.
2. **Onion (Oignon Violet de Maroua):** World-famous violet onions grown in river valleys with furrow irrigation (25-35 T/ha).
3. **Irrigated Rice (Riz SEMRY):** SEMRY Yagoua & Maga polders along the Logone river provide controlled flood basins.
4. **Cotton & Cowpeas (Niébé):** Essential cash and drought-resilient protein crops.`
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
  return null;
}

/**
 * Chat with Agronomist AI using Ollama or Offline Agronomy Fallback
 */
async function chatAgronomist({ message, history = [], farmerContext = {}, language = 'English' }) {
  if (!message || !message.trim()) {
    return {
      success: false,
      reply: language === 'Français' || language === 'French' 
        ? 'Veuillez poser une question d\'agronomie ou d\'agriculture.' 
        : 'Please ask an agronomy or farming question.'
    };
  }

  // Known crop and disease questions use the verified local knowledge base immediately.
  // This keeps farmer answers available even when Ollama is still loading a model.
  const lowerMsg = message.toLowerCase();
  const agricultureTerms = [
    'agriculture', 'agricultural', 'agronomy', 'agronomist', 'farmer', 'farming',
    'farm', 'crop', 'soil', 'seed', 'planting', 'harvest', 'yield', 'irrigation',
    'fertilizer', 'fertiliser', 'manure', 'compost', 'npk', 'urea', 'pest',
    'insecticide', 'fungicide', 'weed', 'livestock', 'cattle', 'goat', 'poultry',
    'chicken', 'pig', 'rice', 'maize', 'corn', 'cassava', 'manioc', 'cocoa',
    'cacao', 'tomato', 'plantain', 'banana', 'potato', 'yam', 'coffee',
    'groundnut', 'garnut', 'peanut', 'arachide', 'cowpea', 'sorghum', 'millet',
    'cotton', 'onion', 'okra', 'gombo', 'pepper', 'pineapple', 'oil palm',
    'haricot', 'bean', 'soya', 'soja', 'ndole', 'ndolé', 'macabo', 'taro',
    'safou', 'avocat', 'mangue', 'papaye', 'fruit', 'légume', 'legume',
    'engrais', 'récolte', 'recolte', 'ravageur', 'culture agricole', 'semence',
    'maladie des plantes', 'maladie', 'pépinière', 'sarclage', 'buttage'
  ];
  const agricultureContext = ['plant', 'plants', 'leaf', 'leaves', 'root', 'tuber', 'fruit', 'garden', 'orchard', 'water', 'rain', 'disease', 'fungus', 'blight', 'mosaic', 'worm', 'aphid', 'cultiv', 'sol', 'plante', 'champ', 'semis', 'maladie', 'terre', 'eau', 'pluie', 'feuille', 'tige', 'arbre', 'graine', 'herbe', 'parasite'];
  const plantSymptoms = ['yellow', 'brown', 'spot', 'spots', 'curl', 'wilting', 'wilt', 'rot', 'lesion', 'mosaic', 'blight', 'stunt', 'pustule', 'hole', 'holes', 'pourriture', 'jaune', 'tache', 'brûlure', 'enroulement'];
  const hasAgricultureTerm = agricultureTerms.some(term => lowerMsg.includes(term));
  const contextMatches = agricultureContext.filter(term => lowerMsg.includes(term)).length;
  const hasPlantSymptom = (lowerMsg.includes('plant') || lowerMsg.includes('plante') || lowerMsg.includes('leaf') || lowerMsg.includes('feuille')) && plantSymptoms.some(term => lowerMsg.includes(term));
  const isAgricultureQuestion = hasAgricultureTerm || (contextMatches >= 1 && (agricultureContext.some(term => ['farm', 'crop', 'soil', 'planting', 'harvest', 'garden', 'orchard', 'irrigat', 'fertili', 'pest', 'disease', 'cultiv', 'champ', 'semis', 'maladie', 'feuille', 'plante'].includes(term) && lowerMsg.includes(term)) || hasPlantSymptom));
  if (!isAgricultureQuestion) {
    return {
      success: true,
      reply: language === 'Français' || language === 'French'
        ? 'Je suis Agro-Vission AI et je réponds uniquement aux questions d’agriculture, de cultures, de sols, de ravageurs et de maladies des plantes au Cameroun.'
        : 'I am Agro-Vission AI and I answer only agriculture questions about crops, soil, irrigation, pests, plant diseases, farm planning, and Cameroon farming. Please ask an agriculture-related question.',
      source: 'Agro-Vission Agriculture Scope Guard',
      isOfflineFallback: true,
      modelUsed: 'Agriculture Scope Guard'
    };
  }

  const activeModel = await resolveActiveOllamaModel();
  if (activeModel) {
    const isFrench = language === 'Français' || language === 'French';
    const contextSummary = Object.entries(farmerContext)
      .filter(([, value]) => value !== undefined && value !== null && String(value).trim())
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');

    // Updated system prompt with language support
    const SYSTEM_PROMPT = isFrench 
      ? `Vous êtes "Agro-Vission AI", un manuel et une encyclopédie agronomique vivante, spécialisé dans l'agriculture camerounaise et tropicale.
Vous répondez avec une grande intelligence et clarté à toutes les questions agricoles (grandes cultures, cultures maraîchères, tubercules, arachides/garnut, arboriculture fruitière, sols, engrais, phytopathologie, élevage et stockage).
Pour chaque demande d'agriculteur:
1. Fournir une réponse complète, structurée et encyclopédique avec les variétés recommandées (INERA, IRAD, hybrides adaptés au Cameroun), densités et espacements.
2. Détailler les protocoles de fertilisation (NPK, Urée, SSP, fientes, compost) et traitements bio et phytosanitaires.
3. Pour les maladies et ravageurs (chenilles, pucerons, viroses de la rosette, cercosporiose, mildiou), donner les symptômes, la cause et la solution étape par étape.
4. Donnez des conseils agronomiques adaptés aux 10 régions du Cameroun. Répondez toujours en français impeccable.`
      : AGRONOMIST_SYSTEM_PROMPT;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), OLLAMA_TIMEOUT_MS);

      const formattedMessages = [
        { role: 'system', content: `${SYSTEM_PROMPT}\n\nFarmer context (use it to personalize advice, but ask when essential details are missing): ${contextSummary || 'No farmer profile context supplied.'}` },
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
          model: activeModel,
          messages: formattedMessages,
          stream: false,
          keep_alive: OLLAMA_KEEP_ALIVE,
          options: {
            num_ctx: OLLAMA_NUM_CTX,
            num_threads: OLLAMA_NUM_THREADS,
            num_predict: 140,
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
            source: `Ollama Local LLM (${activeModel})`,
            isOfflineFallback: false,
            modelUsed: activeModel
          };
        }
      }
    } catch (err) {
      // Fall through to offline knowledge engine
    }
  }

  // 2. Intelligent Offline Fallback Engine
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
