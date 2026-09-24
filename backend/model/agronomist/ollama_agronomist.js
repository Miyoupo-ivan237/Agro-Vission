// ai/ollama_agronomist.js
// Ollama Local LLM & Cameroon Agricultural Expert AI System

const OLLAMA_BASE_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const OLLAMA_NUM_CTX = Number(process.env.OLLAMA_NUM_CTX || 2048);
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

const AGRONOMIST_SYSTEM_PROMPT = `You are Agro-Vission AI, a professional agronomist and plant pathologist specialized in Cameroon and tropical Sub-Saharan African agriculture.

SCOPE: You ONLY answer questions about agriculture and farming. This includes: crop selection and calendars; planting, nursery and seed preparation; soil testing, fertility, compost and fertilizer programs; irrigation and water management; weeds, pests, diseases and plant diagnosis; pruning, harvesting, post-harvest handling, storage and processing; livestock and poultry; agroforestry; climate and weather risks for farming; farm economics, markets and farm budgets; food safety; and sustainable or organic farming practices.

OUT OF SCOPE: If a question is about technology, politics, entertainment, sports, history, mathematics, coding, personal finance, medicine, or ANY topic that is not directly related to agriculture or farming — you MUST politely refuse and redirect. Example refusal: "I am Agro-Vission AI and I only answer agriculture-related questions. Please ask about crops, soil, pests, plant diseases, or farming practices."

Never answer out-of-scope questions even if asked politely or indirectly. Always redirect the user to ask an agronomy question.

For agriculture questions: understand natural wording, spelling mistakes, local names, and both French and English. Never reject a valid farming question because it is broad or does not contain a keyword. If a question lacks important details, answer what can be answered safely, state the assumptions, and ask one useful follow-up question.

Structure answers clearly: direct answer first, then practical steps, prevention or risks, and Cameroon-specific advice when relevant. Adapt recommendations to the crop, growth stage, region, season, soil, farm size and available resources. Use safe integrated pest management. Do not invent a diagnosis, pesticide dose, variety or certainty.

For English questions answer only in clear English. For French questions answer only in clear French.`;

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
  },

  // ── COCOA FARM REHABILITATION (FAO/ILRI Good Agronomic Practices) ─────────────────────────────
  {
    triggers: ['rehabilitat', 'old cocoa', 'unproductive', 'replant cocoa', 'cocoa yield decline', 'cocoa farm recovery', 'rejuvenat'],
    response: `🍫 **Cocoa Farm Rehabilitation — FAO Good Agronomic Practices (West & Central Africa):**

Cocoa cultivation covers ~5.9 million ha worldwide; Cameroon, Côte d'Ivoire, Ghana and Nigeria account for 73% of production. Many farms are ageing and unproductive. Rehabilitation restores yields without full replanting.

## THREE REHABILITATION STRATEGIES

**1. REHABILITATION BY REPLANTING (Full Replacement):**
- Used when >50% of trees are unproductive, dead, or diseased.
- Clear old trees, leave stumps to protect soil; plant improved certified clones (in Cameroon: SNK 16, SNK 13, ICS 1) at 3m × 3m (1,111 trees/ha).
- Provide temporary shade with plantain or Gliricidia to protect young seedlings.
- Target: First harvest by year 3-4; full production by year 5-6.

**2. REHABILITATION BY GRAFTING (Top-Working):**
- Used when rootstock is healthy but variety is low-yielding.
- Graft high-yielding certified budwood onto existing stumps/branches.
- Cut main branch; apply paste bud or patch bud of selected clone.
- Wrap with polythene tape; remove after 3 weeks when graft takes.
- Advantage: Productive within 18-24 months (faster than replanting).

**3. REHABILITATION BY CHUPON SELECTION (Side-Shooting):**
- Allow 2-3 vigorous suckers (chupons) to grow from the base of old trees.
- Remove weakest chupons; keep 1 strong upright shoot per tree.
- This shoot replaces the old unproductive canopy within 2-3 years.
- Lowest cost method; suitable for partially productive farms.

## PRE-PLANTING GOOD AGRONOMIC PRACTICES
- **Land preparation:** Remove only diseased/dead trees; leave forest shade trees (Terminalia, Albizia) for canopy.
- **Soil conservation:** Maintain organic leaf litter — do NOT burn old material.
- **Shade management:** 30-40% shade at establishment; reduce to 20-25% as trees mature.

## POST-PLANTING MANAGEMENT
- **Fertilizer:** Young cocoa (1-3 yrs): NPK 12-12-17 at 125g/tree twice yearly (rains onset and end).
- **Weeding:** Keep 1m circle weed-free; use cutlass (do not hoe — damages surface roots).
- **Pruning:** Remove chupons from trunk; maintain 3-5 main branches (jorquette) for harvest access.
- **Black Pod:** Copper fungicide every 21 days during heavy rains. Harvest and bury all mummified pods.
- **Capsid/Mirids:** Spray at first flush (August-October). Systemic insecticide where damage exceeds 30%.`
  },

  // ── NUTRIENT DEFICIENCY DIAGNOSIS (Agro Hospital / Leaf Analysis) ──────────
  {
    triggers: ['yellow leaf', 'yellowing', 'leaf curl', 'nutrient deficiency', 'deficience', 'feuille jaune', 'pale leaf', 'purple leaf', 'stunted', 'weak growth', 'leaf analysis', 'foliar test', 'plant tissue', 'analyse foliaire', 'leaf test', 'magnesium', 'potassium deficiency', 'nitrogen deficiency', 'phosphorus deficiency', 'calcium deficiency', 'micronutrient', 'manganese', 'zinc deficiency', 'iron deficiency', 'boron'],
    response: `🔬 **Crop Nutrient Deficiency Diagnosis — Visual Field Guide (Cameroon):**

Many farmers in Cameroon lose yields because deficiencies are identified too late. The following visual guide helps you detect problems BEFORE they cause major losses.

## MACRONUTRIENT DEFICIENCIES

**🟡 NITROGEN (N) Deficiency:**
- *Symptoms:* Uniform yellowing starting from oldest (lower) leaves upward. Entire leaf turns pale yellow-green. Slow, stunted growth. Thin stems.
- *Crops most affected:* Maize, cassava, tomato, cabbage, rice.
- *Correction:* Top-dress Urea (46% N) at 50-100 kg/ha. For organic: incorporate chicken manure or green manure.
- *Confirm:* If yellowing starts at leaf tip and midrib stays green → likely N. If only new leaves yellow → likely S or Fe.

**🟠 PHOSPHORUS (P) Deficiency:**
- *Symptoms:* Leaves turn dark green, then purplish-red on undersides (anthocyanin). Delayed maturity, small fruits. Poor root development.
- *Crops most affected:* Maize, groundnut, tomato, potato on acidic soils.
- *Correction:* Apply Triple Superphosphate (TSP 46% P₂O₅) at 100 kg/ha at planting. Lime acidic soils to unlock phosphorus.

**🟤 POTASSIUM (K) Deficiency:**
- *Symptoms:* Leaf edges and tips turn brown and curl (scorching). Starts on older lower leaves. Weak stems; lodging. Poor fruit filling.
- *Crops most affected:* Plantain/banana (very K-hungry), potato, tomato, cocoa, oil palm.
- *Correction:* Apply Muriate of Potash (MOP 60% K₂O) at 100 kg/ha or Sulfate of Potash (SOP). For plantain: 200-300g KCl per plant every 3 months.

**⚪ CALCIUM (Ca) Deficiency:**
- *Symptoms:* Young leaf tips and edges die (brown lesions). Blossom end rot in tomato and pepper (black sunken base of fruit). Tip burn in cabbage.
- *Correction:* Apply Calcium Nitrate (CAN) at 150 kg/ha at flowering. Agricultural lime corrects both Ca and pH simultaneously.

**🔵 MAGNESIUM (Mg) Deficiency:**
- *Symptoms:* Interveinal chlorosis on older leaves — leaf turns yellow between green veins (herringbone pattern). Very common in cocoa on acidic soils.
- *Crops most affected:* Cocoa, coffee, citrus, tomato, potato.
- *Correction:* Foliar spray with 2% Magnesium Sulfate (Epsom salt) every 2 weeks. Soil: Kieserite (MgSO₄) at 100 kg/ha.

## MICRONUTRIENT DEFICIENCIES

**🟢 IRON (Fe) Deficiency:**
- *Symptoms:* Young (new) leaves turn pale yellow/white while veins remain green. Most common in alkaline soils (pH >7).
- *Correction:* Foliar spray with Ferrous Sulfate (FeSO₄) 0.5%. Acidify soil with elemental sulfur.

**🔶 ZINC (Zn) Deficiency:**
- *Symptoms:* Small leaves (little leaf), short internodes (rosette), white/yellow bands at leaf base. New growth stunted.
- *Crops most affected:* Maize, rice, citrus.
- *Correction:* Foliar spray with Zinc Sulfate 0.5% (3 applications at 7-day intervals). Soil: ZnSO₄ at 10 kg/ha.

**🟣 BORON (B) Deficiency:**
- *Symptoms:* Growing points die (hollow stem). Blossom drop in tomato and pepper. Cracked/corky fruits.
- *Correction:* Foliar spray with Borax 0.2% (2g/litre). Apply at flower initiation.

**🟫 MANGANESE (Mn) Deficiency:**
- *Symptoms:* Interveinal chlorosis on young leaves (similar to Mg but on new leaves, not old). Common on waterlogged soils.
- *Correction:* Foliar spray with Manganese Sulfate 0.2%.

## QUICK DIAGNOSIS CHECKLIST
| Pattern | First Affected | Most Likely Cause |
|---|---|---|
| Uniform pale yellow | Old (lower) leaves | Nitrogen |
| Purple undersides | Old leaves | Phosphorus |
| Leaf edge scorch | Old leaves | Potassium |
| Yellow between green veins | Old leaves | Magnesium |
| Yellow between green veins | New leaves | Iron or Manganese |
| Small leaves + rosette | New growth | Zinc |
| Blossom drop, hollow stem | Growing tip | Boron |
| Brown leaf tip + watery base | Young leaves | Calcium |

## PROFESSIONAL LEAF ANALYSIS
For precise diagnosis beyond visual assessment, professional plant tissue laboratory testing (leaf analysis) is available in Cameroon through services like **Agro Hospital** (Yaoundé & Bamenda):
- Contact: (+237) 681532846 / 657469343 / 653416123
- Services: Nitrogen, Phosphorus, Potassium, Ca, Mg, micronutrient analysis; fungal/viral/bacterial crop disease testing; farm phytosanitary audits.
- Results in a few working days with practical crop nutrition recommendations.`
  },

  // ── TRADITIONAL CAMEROON VEGETABLES (Nutrition Connect / FAO) ─────────────
  {
    triggers: ['eru', 'okok', 'koko', 'ndole', 'bitter leaf', 'bitterleaf', 'huckleberry', 'njama njama', 'waterleaf', 'vernonia', 'gnetum', 'african nightshade', 'traditional vegetable', 'légume traditionnel', 'légume feuille', 'leafy vegetable', 'feuille comestible', 'solanum', 'morelle', 'wild vegetable'],
    response: `🥬 **Traditional Vegetables of Cameroon — Cultivation & Nutrition Guide:**

Cameroon is rich in indigenous leafy vegetables that are nutritionally superior to many introduced crops. These vegetables provide essential amino acids, iron, calcium, magnesium, vitamins A, C, E, B1 and B2, and dietary fibre critical for food and nutrition security.

## 🌿 ERU / OKOK / KOKO (*Gnetum africanum*)

**Importance:** Staple in the Southwest Region (Bayangi people) and widely traded across Cameroon. One of the highest-value wild-harvested vegetables.

**Nutritional value:** Rich in protein (13-18% dry weight), essential amino acids, iron, calcium, and dietary fibre. Leaves used fresh or dried.

**Cultivation (Domestication):**
- *Habitat:* Climbing vine — naturally found in humid lowland rainforest (South-West, Littoral, South, East regions).
- *Propagation:* Seed germination (slow — 4-6 months) or stem cuttings (faster). Soak seeds in water 24h before sowing.
- *Staking:* Requires a live support tree or wooden poles (2-3m) to climb. Gliricidia sepium is an ideal live stake — grows fast and adds N to soil.
- *Shade:* Requires 40-60% shade — grows well under cocoa, plantain, or oil palm canopy.
- *Soil:* Deep, well-drained, organic-rich loam. Apply heavy compost (5-10 kg/plant pit).
- *Spacing:* 3m × 3m in agroforestry plots.
- *Harvest:* Harvest leaf tips every 4-6 weeks — never strip more than 30% of foliage to allow recovery.
- *Sustainability:* Avoid over-harvesting from the wild — domestication in agroforestry systems is strongly recommended by FAO.

**Cooking:** Shred finely; cook with palm oil, waterleaf (Talinum fruticosum), crayfish, cow skin, smoked fish. Served with water fufu or garri.

---

## 🌱 NDOLÉ / BITTER LEAF (*Vernonia amygdalina*)

**Importance:** Namesake of Cameroon's national dish. Highly prized for flavour and medicinal properties (anti-malarial, anti-diabetic, digestive aid, antibacterial).

**Nutritional value:** High in iron, calcium, zinc, B-vitamins, antioxidants. Protein: 4-6% fresh weight.

**Cultivation:**
- *Propagation:* Stem cuttings (30-40cm long) planted directly. Easy — roots in 2-3 weeks. Or sow seeds in nursery.
- *Spacing:* 1m × 1m for intensive production; 2m × 2m for larger shrubs.
- *Soil:* Adapts to most soil types; prefers well-drained, fertile loam. Full sun.
- *Fertiliser:* Light NPK 15-15-15 (100 kg/ha) at establishment; wood ash side-dressing every 2 months.
- *Harvest:* Begin harvesting leaves 3-4 months after planting. Cut back to 30cm stub for regrowth.
- *Yield:* 8-15 T/ha fresh leaves per year with 3-4 harvests.
- *Pest/Disease:* Generally robust. Aphids — treat with neem oil. Root rot — ensure drainage.

**Cooking:** Wash and squeeze leaves repeatedly (or boil briefly, then rinse) to remove bitterness. Cook with groundnut paste, crayfish, stockfish, prawns. Served at celebrations with plantain, yam, or rice.

---

## 🌑 HUCKLEBERRY / NJAMA NJAMA (*Solanum scabrum* / African Nightshade)

**Importance:** Among the most nutritious leafy vegetables in Cameroon. Highly popular in the Western Highlands (Bamenda, Bafoussam) and served with fufu and Khati Khati (grilled chicken).

**Nutritional value:** Excellent source of iron, calcium, vitamin A (beta-carotene), vitamin C, and folate.

**Cultivation:**
- *Propagation:* Direct seed sowing in nursery (seedlings in 3 weeks); transplant at 4-5 weeks.
- *Spacing:* 50cm × 40cm on raised beds.
- *Soil:* Well-drained fertile loam; grows in full sun or partial shade.
- *Fertiliser:* Compost (3-5 T/ha) + NPK 15-15-15 (100 kg/ha) at transplant.
- *Water:* Moderate — keep soil moist but not waterlogged.
- *Harvest:* Begin leaf harvest 5-6 weeks after transplanting. Harvest tops every 2 weeks to encourage bushy growth.
- *Yield:* 10-18 T/ha fresh leaves.
- *Pests:* Flea beetles (small holes in leaves) — spray neem oil. Spider mites in dry season — mist with water.

**Cooking:** Smothered with onions, palm oil, crayfish, and habanero pepper. Served with fufu corn or fufu cocoyam.

---

## 🌊 WATERLEAF (*Talinum fruticosum* / *T. triangulare*)

**Importance:** Used in combination with Eru and as a base green in soups across southern Cameroon.

**Cultivation:** Very easy. Stem cuttings root in 2-3 days in moist soil. Space 30cm × 30cm on raised beds. Harvest every 3 weeks. Grows year-round in humid areas.

---

## NUTRITION & FOOD SECURITY NOTE
These traditional vegetables are **more nutritious than many introduced vegetables** and are adapted to Cameroon's climate without expensive inputs. Integrating them into home gardens, school gardens, and agroforestry systems improves household nutrition, especially for women and children, while generating market income.

FAO and nutrition programmes actively promote domestication and cultivation of Eru, Bitter Leaf, and African Nightshade to reduce pressure on wild forest resources and improve food sovereignty.`
  },

  // ── COCOA GOOD AGRONOMIC PRACTICES — DETAILED (FAO/ILRI) ─────────────────
  {
    triggers: ['cocoa nursery', 'cocoa seedling', 'cocoa spacing', 'cocoa shade', 'cocoa clone', 'cocoa pruning', 'jorquette', 'chupon', 'cocoa fertilizer', 'theobroma', 'cocoa establishment', 'cocoa planting'],
    response: `🍫 **Cocoa Good Agronomic Practices — Pre & Post Planting (Cameroon/West Africa, based on FAO/ILRI research):**

## PRE-PLANTING: NURSERY MANAGEMENT

**Site selection:**
- Level, sheltered area near water source with 50% shade.
- Use polythene bags (30cm × 18cm) filled with topsoil + 20% composted organic matter.

**Seed/Seedling preparation:**
- Use certified high-yielding, disease-tolerant clones (in Cameroon: SNK 16, SNK 13, PA 150).
- Extract seeds from fully ripe, healthy pods immediately before sowing. Do not dry.
- Place 1 seed/bag at 2-3cm depth. Germination: 10-14 days.
- Water daily. Harden seedlings (reduce shade) for 2 weeks before transplanting.

**Transplanting:** 6-8 weeks old (20-25cm tall, 2-3 pairs of leaves).

## PLANTING DESIGN & SHADE

**Spacing:**
- Standard: 3m × 3m (1,111 plants/ha) — most productive.
- With shade trees: Plant shade at 9m × 9m (123 trees/ha) before or at same time as cocoa.

**Shade management:**
- *Establishment (year 1-3):* 40-50% shade using plantain intercrop or Gliricidia sepium.
- *Production (year 3+):* Reduce to 20-30% by selective shade tree removal.
- *Benefit:* Shade reduces Black Pod pressure, regulates microclimate, protects against wind.

## FERTILIZATION PROGRAM

| Tree Age | Fertilizer | Rate per Tree | Timing |
|---|---|---|---|
| 1-2 years | NPK 12-12-17 | 125g | Twice yearly (start/end of rains) |
| 3-5 years | NPK 12-12-17 | 250g | Twice yearly |
| Bearing (6+ yrs) | NPK 12-12-17 + MgSO₄ | 300g + 100g | Twice yearly |

- Apply in a ring 30-50cm from the trunk; do not place directly on roots.
- On acidic soils (pH <5.5): Lime at 1-2 T/ha every 3 years to prevent Mg and P fixation.

## PRUNING FOR PRODUCTIVITY

**Formative pruning (year 1-3):**
- Allow ONE vertical stem to grow until the first jorquette forms naturally at 1.2-1.5m.
- Select 3-5 strong branches from the jorquette; remove others.
- Remove all vertical suckers (chupons) from trunk — they divert energy from pod production.

**Maintenance pruning (annual):**
- Remove crossing, diseased, and dead branches.
- Thin inner canopy for 20-30% light penetration — sunlight on pods stimulates flowering.
- Best pruning time: end of main dry season (before heavy rains).

## DISEASE & PEST MANAGEMENT

**Black Pod (Phytophthora megakarya — most severe in Cameroon):**
- Remove and bury all diseased pods weekly during rainy season.
- Copper-based fungicide (Ridomil Gold Plus or Nordox 75WG) every 21 days from start of rains until harvest.
- Maintain good drainage in plantation — avoid waterlogging.

**Cocoa Swollen Shoot Virus (CSSV):**
- No cure. Rogue infected trees including 3-meter buffer zone around each infected tree.
- Plant resistant/tolerant clones in replanting.

**Mirids/Capsids (Sahlbergella singularis):**
- Most damaging pest in Cameroon. Causes brown lesions on pods and bark.
- Spray Thiamethoxam or Imidaclopride at first pod flush (August-October).
- Monitor by counting capsids on 10 trees per hectare weekly during peak season.`
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
  const isFrench = ['français', 'francais', 'french', 'fr'].includes(String(language).toLowerCase());

  if (!message || !message.trim()) {
    return {
      success: false,
      reply: isFrench
        ? 'Veuillez poser une question d\'agronomie ou d\'agriculture.' 
        : 'Please ask an agronomy or farming question.'
    };
  }

  const lowerMsg = message.toLowerCase();
  const agricultureTerms = [
    'agriculture', 'agricultural', 'agronomy', 'agronomist', 'farmer', 'farming',
    'farm', 'crop', 'soil', 'seed', 'planting', 'harvest', 'yield', 'irrigation',
    'fertilizer', 'fertiliser', 'manure', 'compost', 'npk', 'urea', 'pest',
    'insecticide', 'fungicide', 'weed', 'livestock', 'cattle', 'goat', 'poultry',
    'rice', 'maize', 'corn', 'cassava', 'manioc', 'cocoa', 'cacao', 'tomato',
    'plantain', 'banana', 'potato', 'yam', 'coffee', 'groundnut', 'peanut',
    'cowpea', 'sorghum', 'millet', 'cotton', 'onion', 'okra', 'pepper',
    'engrais', 'récolte', 'recolte', 'ravageur', 'semence', 'maladie',
    'plante', 'culture', 'sol', 'champ', 'ferme', 'cultiver', 'semis',
    'disease', 'seedling', 'nursery', 'transplant', 'pruning', 'mulch',
    'intercrop', 'rotation', 'agroforestry', 'herbicide', 'greenhouse',
    'sowing', 'rootstock', 'beans', 'legume', 'tuber', 'cob', 'tassel',
    // Traditional vegetables
    'eru', 'okok', 'koko', 'ndole', 'ndolé', 'bitter leaf', 'bitterleaf',
    'huckleberry', 'njama', 'waterleaf', 'vernonia', 'gnetum', 'african nightshade',
    'traditional vegetable', 'légume traditionnel', 'feuille comestible', 'wild vegetable',
    // Nutrient deficiency & Diagnosis
    'yellowing', 'yellow leaf', 'feuille jaune', 'nutrient deficiency', 'carence',
    'deficiency', 'magnesium', 'nitrogen deficiency', 'potassium deficiency',
    'leaf analysis', 'foliar test', 'pale leaf', 'purple leaf', 'interveinal',
    'boron', 'zinc deficiency', 'iron deficiency', 'calcium deficiency',
    'analyse foliaire', 'blossom end rot', 'stunted growth', 'agro hospital',
    'tissue test', 'plant tissue', 'phytosanitary', 'chlorosis', 'necrosis',
    // Cocoa rehabilitation
    'rehabilitat', 'rehabilit', 'réhabilit', 'old cocoa', 'unproductive',
    'cocoa recovery', 'replant cocoa', 'rejuvenat', 'chupon', 'jorquette',
    'top-working', 'grafting cocoa', 'greffe cacao',
    // Livestock & poultry
    'chicken', 'poulet', 'broiler', 'layer', 'hen', 'egg', 'oeuf', 'coop',
    'poulailler', 'volaille', 'duck', 'canard', 'guinea fowl', 'pintade',
    'pig', 'swine', 'porc', 'cochon', 'sheep', 'mouton', 'cow', 'vache', 'bull',
    'beef', 'dairy', 'bovin', 'boeuf', 'zebu', 'betail', 'bétail', 'élevage',
    'vaccination', 'deworming', 'vermifuge', 'veterinary', 'vétérinaire',
    // Fruit trees
    'mango', 'mangue', 'avocado', 'avocat', 'citrus', 'orange', 'lemon', 'citron',
    'pawpaw', 'papaya', 'papaye', 'guava', 'goyave', 'pineapple', 'ananas',
    'passion fruit', 'fruit tree', 'arbre fruitier',
    // Sustainable & agroforestry
    'sustainable', 'organic', 'biologique', 'durable', 'agroecology', 'agroécologie',
    'green manure', 'engrais vert', 'cover crop', 'mucuna', 'tephrosia',
    'leucaena', 'gliricidia', 'calliandra', 'moringa', 'silvopastoral',
    // Post-harvest & market
    'post-harvest', 'stockage', 'conservation', 'drying', 'séchage', 'processing',
    'transformation', 'market', 'marché', 'profit', 'revenu', 'income',
    'value chain', 'chaîne de valeur', 'gari', 'storage'
  ];
  const regionalTerms = [
    'littoral', 'douala', 'moungo', 'njombe', 'njombé', 'penja', 'mbanga',
    'edéa', 'edea', 'centre', 'yaounde', 'yaoundé', 'bafia', 'ouest',
    'west', 'bafoussam', 'foumbot', 'nord-ouest', 'north-west', 'bamenda',
    'sud-ouest', 'south-west', 'buea', 'kumba', 'sud', 'south', 'est', 'east',
    'adamawa', 'ngaoundéré', 'ngaoundere', 'nord', 'north', 'maroua', 'garoua'
  ];
  const hasAgricultureTerm = agricultureTerms.some(term => lowerMsg.includes(term));
  const hasRegionalAgricultureQuestion = regionalTerms.some(term => lowerMsg.includes(term))
    && /\b(plant|crop|culture|cultiv|grow|farm|soil|season|harvest|planted|produced|what|which|best|plante|culture|cultiver|sol|saison|récolte|produit|quelle|quels)\b/i.test(lowerMsg);
  if (!hasAgricultureTerm && !hasRegionalAgricultureQuestion) {
    return {
      success: true,
      reply: isFrench
        ? 'Je suis Agro-Vission AI et je réponds uniquement aux questions d’agriculture, de cultures, de sols, de ravageurs et de maladies des plantes au Cameroun.'
        : 'I am Agro-Vission AI and I answer only agriculture questions about crops, soil, irrigation, pests, plant diseases, farm planning, and Cameroon farming. Please ask an agriculture-related question.',
      source: 'Agro-Vission Agriculture Scope Guard',
      isOfflineFallback: true,
      modelUsed: 'Agriculture Scope Guard'
    };
  }

  // Deterministic regional, crop, and specialist guidance: select the most specific match
  let bestKnowledgeItem = null;
  let highestMatchScore = 0;
  for (const item of OFFLINE_KNOWLEDGE) {
    let score = 0;
    for (const trigger of item.triggers) {
      if (lowerMsg.includes(trigger)) {
        score += trigger.length;
      }
    }
    if (score > highestMatchScore) {
      highestMatchScore = score;
      bestKnowledgeItem = item;
    }
  }

  if (bestKnowledgeItem && highestMatchScore > 0) {
    return {
      success: true,
      reply: isFrench
        ? `Voici des conseils agricoles vérifiés pour le Cameroun concernant votre question :\n\n${bestKnowledgeItem.response}`
        : bestKnowledgeItem.response,
      source: 'Agro-Vission On-Device AI Agronomist (Offline)',
      isOfflineFallback: true,
      modelUsed: 'Offline Knowledge Engine'
    };
  }

  // Known crop and disease questions use the verified local knowledge base immediately.
  // This keeps farmer answers available even when Ollama is still loading a model.
  const activeModel = await resolveActiveOllamaModel();
  if (activeModel) {
    const contextSummary = Object.entries(farmerContext)
      .filter(([, value]) => value !== undefined && value !== null && String(value).trim())
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');

    // Updated system prompt with language support
    const SYSTEM_PROMPT = isFrench 
      ? `Vous êtes « Agro-Vission AI », un agronome professionnel et phytopathologiste spécialisé dans l'agriculture camerounaise et tropicale.

DOMAINE : Vous répondez UNIQUEMENT aux questions d'agriculture et d'agronomie. Cela comprend : choix des cultures et calendriers; semis, pépinière et semences; analyse et fertilité du sol, compost et engrais; irrigation et maîtrise de l'eau; mauvaises herbes, ravageurs, maladies et diagnostic des plantes; récolte, conservation, stockage et transformation; élevage et aviculture; agroforesterie; risques climatiques; économie agricole, marchés; sécurité alimentaire; et agriculture durable ou biologique.

HORS DOMAINE : Si une question porte sur la technologie, la politique, le divertissement, le sport, l'histoire, les mathématiques, la programmation, les finances personnelles, la médecine ou TOUT sujet non lié directement à l'agriculture — vous DEVEZ refuser poliment. Exemple : « Je suis Agro-Vission AI et je réponds uniquement aux questions d'agriculture. Posez-moi une question sur les cultures, le sol, les ravageurs ou les maladies des plantes. » Ne répondez jamais à une question hors domaine même si elle est formulée poliment.

Comprenez les formulations naturelles, les fautes, les noms locaux et le français ou l'anglais. Si des détails manquent, répondez d'abord avec les informations sûres, indiquez vos hypothèses et posez une seule question de suivi utile.
Commencez par la réponse directe, puis donnez les étapes pratiques, la prévention ou les risques, et les conseils adaptés au Cameroun lorsque cela est pertinent.
Répondez uniquement en français clair et correct. Ne changez pas de langue à cause d'un nom de culture ou d'un mot cité.`
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
            num_predict: 600,
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

  // 2. Intelligent Offline Fallback Engine: select the most specific match
  let fallbackItem = null;
  let highestFallbackScore = 0;
  for (const item of OFFLINE_KNOWLEDGE) {
    let score = 0;
    for (const t of item.triggers) {
      if (lowerMsg.includes(t)) {
        score += t.length;
      }
    }
    if (score > highestFallbackScore) {
      highestFallbackScore = score;
      fallbackItem = item;
    }
  }

  if (fallbackItem && highestFallbackScore > 0) {
    return {
      success: true,
      reply: isFrench
        ? `Voici des conseils agricoles vérifiés pour le Cameroun concernant votre question :\n\n${fallbackItem.response}`
        : fallbackItem.response,
      source: 'Agro-Vission On-Device AI Agronomist (Offline)',
      isOfflineFallback: true,
      modelUsed: 'Offline Knowledge Engine'
    };
  }

  // Generic expert fallback response
  const asksAboutAgriculture = /\b(what is agriculture|define agriculture|qu'est-ce que l'agriculture|c'est quoi l'agriculture)\b/i.test(message);
  const agricultureDefinition = isFrench
    ? "L’agriculture est la culture des plantes et l’élevage des animaux pour produire des aliments, des fibres et d’autres produits utiles. Au Cameroun, elle comprend notamment les céréales, tubercules, légumineuses, cultures maraîchères, cacao, café et élevage.\n"
    : "Agriculture is the cultivation of plants and the raising of animals to produce food, fibre, and other useful products. In Cameroon, it includes cereals, root crops, legumes, vegetables, cocoa, coffee, and livestock.\n";
  return {
    success: true,
    reply: isFrench
      ? `🌾 **Conseils de l'Agronome IA Agro-Vission :**
Concernant **"${message.trim()}"** :
${asksAboutAgriculture ? agricultureDefinition : ''}
1. **Préparation du sol :** Travaillez le sol et incorporez du compost ou du fumier bien décomposé.
2. **Choix de la culture :** Tenez compte de la région, de la saison, du drainage et du marché local.
3. **Protection :** Inspectez régulièrement les feuilles et les tiges pour détecter ravageurs et maladies.
4. **Fertilisation :** Utilisez une analyse du sol quand elle est disponible et suivez les doses indiquées sur l'étiquette.

Précisez la culture, la région du Cameroun, la saison et le type de sol pour une recommandation plus précise.`
      : `🌾 **Agro-Vission AI Agronomist Guidance:**
Regarding **"${message.trim()}"**:
${asksAboutAgriculture ? agricultureDefinition : ''}
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
