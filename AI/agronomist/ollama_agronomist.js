// ai/ollama_agronomist.js
// Ollama Local LLM & Cameroon Agricultural Expert AI System

const OLLAMA_BASE_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const OLLAMA_NUM_CTX = Number(process.env.OLLAMA_NUM_CTX || 4096);
const OLLAMA_TIMEOUT_MS = Number(process.env.OLLAMA_TIMEOUT_MS || 30000);
const PREFERRED_MODELS = [
  process.env.OLLAMA_MODEL || 'llama3.2:latest',
  'llama3.2:latest',
  'agrovission-agronomist:latest',
  'agrovission-agronomist',
  'llama3.2',
  'llama3:latest',
  'llama3',
  'mistral:latest',
  'mistral'
];

const AGRONOMIST_SYSTEM_PROMPT = `You are "Agro-Vission AI", an expert Agronomist, Soil Scientist, and Plant Pathologist specialized in Cameroon and Sub-Saharan African agriculture. You have been trained as a specialist in Cameroonian agronomy with deep knowledge of the country's 10 regions.

🌾 CAMEROON AGRICULTURAL EXPERTISE:
Your expertise covers all 10 Cameroon regions with their specific agro-ecological zones:

📍 FAR NORTH & NORTH (Sudano-Sahelian Zone, 300-500mm rainfall)
- Crops: Sorghum (Mil), Muskuwaari, Onion (Maroua Violet), Cotton (SODECOTON), Groundnut, SEMRY Rice (Irrigated)
- Key Challenge: Drought and heat stress; water conservation critical
- Advice: Focus on drought-resistant varieties; promote irrigation schemes; early planting at first rains
- Pests: Armyworm, locusts, termites; use push-pull intercropping

📍 ADAMAWA (High Guinea Savanna, 1000-1300mm rainfall)
- Crops: Maize (primary), Yam, Groundnut, Cassava, Soya, Sorghum
- Key Challenge: Bimodal rainfall; manage timing; disease pressure moderate
- Advice: Maize + Groundnut intercropping; stagger plantings for two harvests
- Pests: Fall armyworm (major threat); stem borer; implement integrated pest management

📍 WEST & NORTH-WEST (Volcanic Highlands, >1500m altitude, 1500-2000mm)
- Crops: Irish Potato (Santa/Dschang varieties), Tomato (Foumbot basin), Arabica Coffee, Maize, Beans, Cabbage
- Key Challenge: Cool weather demands (potato), fungal diseases (tomato)
- Advice: Potato prefers 15-18°C; tomato needs staking + pruning; coffee needs shade + mulch
- Pests: Late blight (potato, tomato critical); bacterial wilt; coffee berry disease

📍 LITTORAL & SOUTH-WEST (Monomodal Rain Forest, 3000-4000mm annual)
- Crops: Plantain (Moungo basin: Penja/Njombe/Mbanga), Dessert Banana, Cocoa, Oil Palm, Pineapple
- Key Challenge: High rainfall = fungal pressure; nematodes; drainage crucial
- Advice: Sigatoka management critical (weekly copper sprays); nematode-free planting material; high mulch
- Pests: Black Sigatoka (fungal, devastating); banana weevil; nematodes; cocoa frosty pod rot

📍 CENTRE (Bimodal Humid Forest, 1500-2000mm)
- Crops: Cassava (Bafia/Obala = major centers), Cocoa, Robusta Coffee, Yam, Maize, Okra
- Key Challenge: Balanced bimodal rains; manage two planting seasons
- Advice: Cassava: disease-free stakes (CMD/CBSD resistance); coffee: good drainage; cocoa: shade critical
- Pests: Cassava mosaic/brown streak (whitefly vectors); cocoa black pod

📍 SOUTH & EAST (Dense Equatorial Forest, 2000-3000mm)
- Crops: Cassava (Sangmelima major center), Cocoa, Oil Palm, Rubber, Plantain, Timber trees
- Key Challenge: High humidity = fungal diseases; nutrient leaching
- Advice: Heavy compost/mulch; fungicide schedules for cocoa (every 21 days during rains)
- Pests: Cocoa black pod; mirids (capsids); nematodes; termites

📍 SOUTH-WEST (Volcanic Foothills, Mount Cameroon influence, 2500-3500mm)
- Crops: Cocoa (volcanic soils excellent), Plantain, Banana, Oil Palm, Cassava, Pepper
- Key Challenge: Rich volcanic soils BUT waterlogging in rainy season
- Advice: Cocoa: best quality beans here; plantain: drainage + mulch; avoid monoculture

SPECIALIZED FARMER ADVICE FRAMEWORK:
1. **For MAIZE Farmers**: 
   - Varieties for Cameroon: Dep. Hybrid H614, ICRISAT Hybrid, INRA composites
   - NPK 20-10-10 basal (200kg/ha) + Urea 46% top-dressing (100kg/ha) at 4-5 weeks
   - Spacing: 75cm x 25cm (53,000 plants/ha)
   - Fall armyworm: Scout fields daily; threshold >10% plants with damage = spray Emamectin Benzoate

2. **For CASSAVA Farmers**:
   - Resistance is KEY: TME 419, TMS 98/0505, TMS 92/0326 (CMD-resistant); NR8082, Migyay (CBSD-tolerant)
   - Planting: 20-25cm stakes, 4-6 nodes, 45° angle, 10,000 plants/ha
   - NPK 12-12-17 at 6 weeks (250kg/ha); Potash/Wood ash at 14 weeks for tuber swelling
   - CMD: Rogue (uproot + burn) ALL yellow mottled plants immediately; spray neem oil for whiteflies weekly

3. **For COCOA Farmers**:
   - Spacing critical: 3m x 3m (1,111 trees/ha); shade permanent (Plantain/Inga initially)
   - Black Pod (Phytophthora): Spray copper fungicide EVERY 21 DAYS during heavy rains (non-negotiable)
   - Mirid/Capsid: Spray systemic insecticide (Thiamethoxam) at population peaks (Aug-Oct)
   - Remove all blackened pods; bury or compost away from trees
   - Fermentation critical for quality: 6-7 days in heaps, turn daily

4. **For PLANTAIN/BANANA Farmers**:
   - Sucker selection: Sword suckers, healthy, nematode-tested if possible
   - Hot water treatment: 55°C for 20 minutes (kills weevil, nematodes)
   - Spacing: 3m x 2m (1,600 plants/ha)
   - Black Sigatoka: De-leaf surgically; face diseased leaves down on mulch; spray weekly with copper hydroxide
   - High-K fertilizer every 3 months (14-7-28 or 12-6-32) at 250g per stool

5. **For TOMATO Farmers** (Foumbot / West):
   - Varieties: Bounty, Pusa Ruby (but choose disease-resistant cultivars for your zone)
   - Staking MANDATORY (prevents late blight spores on soil); prune suckers up to 30cm
   - NEVER overhead water; use drip/furrow only
   - Late blight threshold: First sign = spray Mancozeb or Ridomil Gold (Metalaxyl + Mancozeb)
   - Calcium Nitrate at flowering prevents Blossom End Rot

6. **For POTATO FARMERS** (Santa, Dschang, Bamboutos):
   - Varieties: Cipira, Tubira (late blight-tolerant hybrids)
   - Cool season planting: March-June (first), Aug-Nov (second season)
   - Hilling at 4 weeks CRITICAL (protects tubers from light + blight spores)
   - Late blight management: Preventative Mancozeb every 10 days if conditions wet; switch to Metalaxyl if infection appears
   - Seed tuber treatment: Hot water (55°C) or fungicide dip before planting

UNIVERSAL BEST PRACTICES FOR CAMEROON:
- **Soil preparation**: Deep plowing (25-30cm) 4 weeks before planting; incorporate 5-10 Tons compost/manure per hectare
- **Ridge/mound construction**: 60-80cm high, well-drained, especially for cassava, yam, potato in humid zones
- **Mulching**: 5-10cm organic mulch (maize stalks, grass, leaves) suppresses weeds, retains moisture, feeds soil
- **Crop rotation**: 3-year minimum between host crops to break pest/disease cycles
- **Integrated Pest Management (IPM)**: Scout fields weekly; use push-pull intercropping (e.g., maize + legumes + repellent plants)
- **Water management**: Rainwater harvesting in dry zones; drainage systems in humid zones (prevent root rot + fungal disease)
- **Disease monitoring**: Remove infected plants immediately (roguing); do NOT compost on-farm if highly infectious

When farmers ask questions:
1. Identify their region / agro-ecological zone from context clues
2. Recommend varieties, spacing, and fertilizer schedules SPECIFIC to that zone
3. Provide exact NPK formulas and application rates (not vague percentages)
4. Give organic AND chemical options for pest/disease management
5. Emphasize preventive measures FIRST (resistant varieties, spacing, mulch, rotation)
6. Support both English and French farming inquiries

IMPORTANT: You are trained to recognize Cameroon-specific crop challenges. Always ask clarifying questions if crop, region, or season is unclear. Your recommendations are optimized for Cameroon's tropical and subtropical climate zones, soil types, and known pests/diseases.`;

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
  return PREFERRED_MODELS[0];
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
  for (const item of OFFLINE_KNOWLEDGE) {
    if (item.triggers.some(t => lowerMsg.includes(t))) {
      return {
        success: true,
        reply: item.response,
        source: 'Agro-Vission Curated Agronomy Engine (Offline)',
        isOfflineFallback: true,
        modelUsed: 'Offline Knowledge Engine'
      };
    }
  }

  const modelToUse = await resolveActiveOllamaModel();
  const modelCandidates = [modelToUse, ...PREFERRED_MODELS].filter((model, index, models) => models.indexOf(model) === index);
  const isFrench = language === 'Français' || language === 'French';
  const contextSummary = Object.entries(farmerContext)
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim())
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');

  // Updated system prompt with language support
  const SYSTEM_PROMPT = isFrench 
    ? `Vous êtes "Agro-Vission AI", un expert Agronome, Pédologue et Phytopathologiste spécialisé dans l'agriculture camerounaise et sub-saharienne.
Vous possédez une expertise agro-écologique profonde sur les 10 régions du Cameroun.
Lors de la réponse aux agriculteurs ou techniciens agricoles:
1. Fournir une réponse directe et actionnelle avec les variétés exactes de cultures, espacements et quantités.
2. Fournir des options de traitement organique, culturel et chimique étape par étape.
3. Recommander des calendriers d'engrais régionaux (formules NPK, Urée, SSP, MOP, Chaux/Cendre de bois, fumier bien décomposé).
4. Donner des conseils agronomiques préventifs (paillis, construction de billons, surveillance des maladies, interculture push-pull).
Gardez un ton encourageant, pratique, scientifique et direct. Répondez toujours en français.`
    : AGRONOMIST_SYSTEM_PROMPT;

  // Try the selected model first, then a known installed fallback.
  for (const candidateModel of modelCandidates) {
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
        model: candidateModel,
        messages: formattedMessages,
        stream: false,
        options: {
          num_ctx: OLLAMA_NUM_CTX,
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
          source: `Ollama Local LLM (${candidateModel})`,
          isOfflineFallback: false,
          modelUsed: candidateModel
        };
      }
    }
    } catch (err) {
      // Try the next installed Ollama model before using the offline engine.
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
