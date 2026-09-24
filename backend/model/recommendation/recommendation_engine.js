// ai/recommendation_engine.js
// Cameroon 10-Region Agro-Ecological Crop & Fertilizer Recommendation Engine
// Full Coverage for All 20 Major Cameroonian Crops

const CROPS_RECOMMENDATION_DATA = {
  maize: {
    id: 'maize',
    name: 'Maize (Corn / Maïs)',
    suitableSoils: ['loamy', 'sandy loam', 'volcanic', 'well-drained', 'sandy'],
    idealSeasons: ['rainy season', 'early rainy', 'second rainy season', 'onset of rains'],
    regions: ['West', 'North-West', 'Centre', 'South-West', 'Littoral', 'Adamawa', 'North'],
    zone: 'Western Highlands & High Guinea Savanna',
    maturityDays: '90 - 120 days',
    expectedYield: '4.5 - 7.0 Tons / Hectare',
    spacing: '75 cm between rows x 25 cm between plants (approx 53,000 plants/ha)',
    waterRequirement: '500 - 800 mm during growing cycle',
    fertilizerSchedule: [
      { timing: 'Basal (At planting)', fertilizer: 'NPK 20-10-10 or 15-15-15', rate: '200 kg/ha (approx 1 matchbox per 2 holes)' },
      { timing: 'Top dressing (4-5 weeks after planting)', fertilizer: 'Urea (46% N)', rate: '100 kg/ha placed 5cm away from stem before hilling' }
    ],
    companionCrops: ['Beans', 'Cowpea', 'Groundnut', 'Soybean', 'Pumpkin'],
    keyRisks: ['Fall Armyworm', 'Maize Stem Borer', 'Northern Leaf Blight', 'Drought at tasseling'],
    actionPlan: 'Plow land early, sow 2 seeds per hole at 3-5 cm depth after 2 steady rains, thin to 1 plant after 2 weeks, apply basal NPK.'
  },
  cassava: {
    id: 'cassava',
    name: 'Cassava (Manioc)',
    suitableSoils: ['sandy loam', 'loamy', 'lateritic', 'light clay', 'sandy', 'acidic'],
    idealSeasons: ['onset of rains', 'early rainy season', 'rainy season'],
    regions: ['Centre', 'South', 'Littoral', 'East', 'South-West', 'West'],
    zone: 'Bimodal Humid Forest Zone (Bafia, Obala, Sangmelima, Bertoua)',
    maturityDays: '9 - 14 months',
    expectedYield: '20 - 35 Tons / Hectare',
    spacing: '100 cm x 100 cm (10,000 stakes/ha)',
    waterRequirement: 'Drought tolerant once established (1000 - 1500 mm ideal)',
    fertilizerSchedule: [
      { timing: 'Basal (4-6 weeks after sprouting)', fertilizer: 'NPK 12-12-17 or 15-15-15', rate: '250 kg/ha' },
      { timing: '12-16 weeks (Tuber bulking)', fertilizer: 'Muriate of Potash (KCl) or Wood Ash', rate: '100 kg/ha to boost root swelling' }
    ],
    companionCrops: ['Maize', 'Groundnut', 'Melon (Egusi)', 'Cowpea'],
    keyRisks: ['Cassava Mosaic Disease (CMD)', 'Cassava Brown Streak (CBSD)', 'Root Rot in waterlogged soil'],
    actionPlan: 'Plant healthy 20-25cm stem cuttings slanted at 45 degrees into ridges/mounds. Weed thoroughly in first 3 months.'
  },
  plantain: {
    id: 'plantain',
    name: 'Plantain (Banane Plantain)',
    suitableSoils: ['deep rich loamy', 'volcanic', 'clay loam rich in organic matter'],
    idealSeasons: ['early rainy season', 'year-round with mulch and moisture'],
    regions: ['Littoral (Moungo, Njombe, Penja)', 'South-West', 'Centre', 'South', 'East'],
    zone: 'Monomodal & Bimodal Forest Zone',
    maturityDays: '10 - 14 months for first harvest, then ratoon cycle',
    expectedYield: '15 - 25 Tons / Hectare / Year',
    spacing: '3 m x 2 m (approx 1,600 plants/ha)',
    waterRequirement: 'High water requirement (1500 - 2500 mm evenly distributed)',
    fertilizerSchedule: [
      { timing: 'Planting hole prep', fertilizer: 'Decomposed farmyard manure + 200g NPK 15-15-15', rate: '10 kg compost per hole (60x60x60cm)' },
      { timing: 'Every 3 months', fertilizer: 'High Potassium NPK (e.g. 14-7-28 or 12-6-32)', rate: '250g per stool ring-applied at canopy drip line' }
    ],
    companionCrops: ['Cocoa', 'Coffee', 'Cocoyam', 'Ginger', 'Pineapple'],
    keyRisks: ['Black Sigatoka disease', 'Banana Weevil Borer', 'Nematodes', 'Wind lodging'],
    actionPlan: 'Dig 60x60x60cm holes, sterilize suckers with hot water/ash dip, plant deep, mulch continuously with crop residues.'
  },
  cocoa: {
    id: 'cocoa',
    name: 'Cocoa (Cacao)',
    suitableSoils: ['deep fertile clay-loam', 'rich organic loam', 'volcanic'],
    idealSeasons: ['onset of rains', 'early rainy season'],
    regions: ['Centre', 'South', 'South-West (Kumba)', 'East', 'Littoral'],
    zone: 'Dense Equatorial Rain Forest',
    maturityDays: 'Perennial (3 - 4 years to first pod)',
    expectedYield: '1.2 - 2.5 Tons dry beans / Hectare',
    spacing: '3 m x 3 m (approx 1,111 trees/ha)',
    waterRequirement: '1500 - 2000 mm annual rainfall',
    fertilizerSchedule: [
      { timing: 'Establishment (Year 1-2)', fertilizer: 'NPK 15-15-15 or cured poultry manure', rate: '150g per tree per year in split doses' },
      { timing: 'Mature Bearing Trees (Twice a year)', fertilizer: 'High-K NPK 0-23-19 or 12-11-18 + Boron', rate: '300-400g per tree' }
    ],
    companionCrops: ['Plantain (temporary shade)', 'Fruit trees (Avocado, Mango)', 'Inga'],
    keyRisks: ['Black Pod Disease (Phytophthora megakarya)', 'Mirids/Capsids', 'Swollen Shoot Virus'],
    actionPlan: 'Prune chupons and dead wood, maintain 30-40% canopy shade, spray copper fungicide every 21 days during heavy rains.'
  },
  coffee: {
    id: 'coffee',
    name: 'Coffee (Arabica & Robusta / Café)',
    suitableSoils: ['rich volcanic mountainous loam', 'deep friable loam'],
    idealSeasons: ['early rainy season', 'onset of rains'],
    regions: ['West (Bafoussam, Dschang)', 'North-West (Bamenda)', 'Littoral (Moungo)', 'East'],
    zone: 'Highlands >1200m (Arabica) & Lowland Humid (Robusta)',
    maturityDays: 'Perennial (3 years to first harvest)',
    expectedYield: '1.5 - 3.0 Tons green beans / Hectare',
    spacing: 'Arabica: 2.5m x 2.0m; Robusta: 3.0m x 3.0m',
    waterRequirement: '1200 - 1800 mm with distinct dry spell for flower induction',
    fertilizerSchedule: [
      { timing: 'Onset of rains', fertilizer: 'NPK 20-10-10 or 17-17-17', rate: '200g per tree ring-applied' },
      { timing: 'Cherry swelling', fertilizer: 'Calcium Ammonium Nitrate (CAN) + Potassium Sulfate', rate: '150g per tree' }
    ],
    companionCrops: ['Banana / Plantain', 'Macadamia', 'Beans'],
    keyRisks: ['Coffee Berry Disease (CBD)', 'Coffee Leaf Rust', 'Coffee Berry Borer'],
    actionPlan: 'Mulch tree basins with pulp, prune old suckers, set up Brocap alcohol traps for berry borer, harvest cherries at bright red peak.'
  },
  yam: {
    id: 'yam',
    name: 'Yam (Igname / Bafia Yam)',
    suitableSoils: ['deep loose sandy loam', 'fertile friable loam', 'alluvial soil'],
    idealSeasons: ['early dry season mounds (Nov-Dec)', 'onset of rainy season'],
    regions: ['Centre (Bafia, Mbam)', 'West', 'North-West', 'Adamawa'],
    zone: 'Savanna-Forest Transition Zone',
    maturityDays: '7 - 10 months',
    expectedYield: '15 - 28 Tons / Hectare',
    spacing: '100 cm x 100 cm on 60-80 cm high mounds or ridges',
    waterRequirement: '1000 - 1500 mm well-distributed',
    fertilizerSchedule: [
      { timing: 'Mound prep', fertilizer: 'Decomposed farm manure + Wood Ash', rate: '5-10 Tons manure/ha incorporated into mounds' },
      { timing: '8 weeks after emergence', fertilizer: 'NPK 15-15-15 or 12-12-17', rate: '200 kg/ha placed in ring around mound' }
    ],
    companionCrops: ['Maize', 'Melon (Egusi)', 'Cowpeas'],
    keyRisks: ['Yam Anthracnose / Dieback', 'Yam Mosaic Virus', 'Tuber Beetles / Nematodes'],
    actionPlan: 'Erect strong 3-4m bamboo stakes for vine climbing. Treat seed setts with ash/fungicide before planting. Mulch mound tops.'
  },
  tomato: {
    id: 'tomato',
    name: 'Tomato (Tomate / Foumbot Hub)',
    suitableSoils: ['rich loamy', 'volcanic', 'well-drained sandy loam', 'friable soil'],
    idealSeasons: ['dry season with irrigation', 'minor rainy season', 'dry season'],
    regions: ['West (Foumbot, Bafoussam)', 'North-West', 'Centre', 'Littoral', 'South-West'],
    zone: 'Highland Volcanic Plains (Noun Valley)',
    maturityDays: '75 - 90 days after transplanting',
    expectedYield: '25 - 45 Tons / Hectare',
    spacing: '60 cm x 50 cm with sturdy bamboo staking',
    waterRequirement: 'Regular, consistent base watering (avoid overhead sprinkling)',
    fertilizerSchedule: [
      { timing: 'Pre-transplant (soil prep)', fertilizer: 'Well-cured manure + Single Super Phosphate (SSP)', rate: '10-15 Tons manure + 150 kg SSP/ha' },
      { timing: '2 weeks after transplant', fertilizer: 'NPK 20-10-10', rate: '150 kg/ha' },
      { timing: 'Flowering & Fruiting (every 2 weeks)', fertilizer: 'Calcium Nitrate + Potassium Nitrate (KNO3)', rate: '100 kg/ha to prevent blossom end rot' }
    ],
    companionCrops: ['Basil', 'Marigold', 'Garlic', 'Chives', 'Carrot'],
    keyRisks: ['Late Blight (Phytophthora)', 'Bacterial Wilt', 'Tuta absoluta leafminer', 'Blossom End Rot'],
    actionPlan: 'Raise healthy seedlings in nursery for 21-25 days. Stake immediately after transplanting. Mulch heavily to suppress fungal splash.'
  },
  irish_potato: {
    id: 'irish_potato',
    name: 'Irish Potato (Pomme de Terre)',
    suitableSoils: ['rich volcanic mountain loam', 'deep friable sandy loam'],
    idealSeasons: ['early rainy season (March-June)', 'second season (August-Nov)'],
    regions: ['West (Santa, Dschang, Bamboutos)', 'North-West (Bamenda, Kumbo)'],
    zone: 'High Altitude Cool Highlands (>1500m)',
    maturityDays: '90 - 110 days',
    expectedYield: '18 - 30 Tons / Hectare',
    spacing: '75 cm between ridges x 30 cm between tubers',
    waterRequirement: '600 - 850 mm with cool temperature (15-20°C)',
    fertilizerSchedule: [
      { timing: 'Basal (In furrow at planting)', fertilizer: 'NPK 11-22-22 or 20-10-10 + Organic Compost', rate: '300 kg/ha NPK + 10 T/ha compost' },
      { timing: 'Hilling / Earthing-up (4 weeks)', fertilizer: 'CAN (Calcium Ammonium Nitrate)', rate: '100 kg/ha' }
    ],
    companionCrops: ['Maize', 'Beans', 'Cabbage'],
    keyRisks: ['Late Blight (Phytophthora infestans)', 'Bacterial Wilt / Brown Rot', 'Tuber Moths'],
    actionPlan: 'Plant certified well-sprouted seed tubers. Hill soil high at 4 weeks to shield tubers. Spray preventative Mancozeb/Metalaxyl.'
  },
  groundnut: {
    id: 'groundnut',
    name: 'Groundnut (Arachide / Peanut)',
    suitableSoils: ['sandy', 'sandy loam', 'light friable savanna soil'],
    idealSeasons: ['rainy season', 'early rainy season'],
    regions: ['North', 'Far North', 'Adamawa', 'Centre', 'West'],
    zone: 'Sudano-Sahelian & Guinea Savanna',
    maturityDays: '90 - 110 days',
    expectedYield: '1.8 - 3.2 Tons / Hectare (in-shell)',
    spacing: '50 cm between rows x 15 cm between plants',
    waterRequirement: '500 - 650 mm (drought tolerant during mid-growth)',
    fertilizerSchedule: [
      { timing: 'Basal (At planting)', fertilizer: 'Single Super Phosphate (SSP) or NPK 6-20-10', rate: '150 kg/ha (requires high Phosphorus & Calcium for pegging)' },
      { timing: 'Pegging stage (30-40 days)', fertilizer: 'Gypsum (Calcium Sulfate)', rate: '200 kg/ha broadcast over foliage to ensure full pods' }
    ],
    companionCrops: ['Maize', 'Sorghum', 'Millet', 'Cassava'],
    keyRisks: ['Rosette virus (Aphids)', 'Early/Late Leaf Spot', 'Aflatoxin fungus in storage'],
    actionPlan: 'Plant in well-tilled, loose soil so pegs easily penetrate. Avoid excess nitrogen which causes leaf overgrowth without pod development.'
  },
  rice: {
    id: 'rice',
    name: 'Rice (Riz / SEMRY & Ndop)',
    suitableSoils: ['clayey heavy floodplain soil', 'hydromorphic alluvial clay', 'vertisols'],
    idealSeasons: ['rainy season floodplains', 'irrigated dry season (SEMRY polders)'],
    regions: ['Far North (SEMRY Yagoua)', 'North-West (Ndop Plains)', 'West (Tonga)'],
    zone: 'Logone River Valley & Ndop Floodplains',
    maturityDays: '110 - 140 days',
    expectedYield: '4.0 - 7.5 Tons paddy / Hectare',
    spacing: '20 cm x 20 cm (transplanted 2-3 seedlings per hill)',
    waterRequirement: '1200 - 1800 mm or controlled 5-10 cm flood layer',
    fertilizerSchedule: [
      { timing: 'Basal (Land puddling)', fertilizer: 'NPK 15-15-15 or 20-10-10', rate: '200 kg/ha' },
      { timing: 'Tillering stage (21 days after transplant)', fertilizer: 'Urea (46% N)', rate: '100 kg/ha' },
      { timing: 'Panicle initiation (45 days)', fertilizer: 'Urea + Muriate of Potash', rate: '50 kg Urea + 50 kg KCl/ha' }
    ],
    companionCrops: ['Fish farming in paddy', 'Sesbania green manure'],
    keyRisks: ['Rice Blast (Pyricularia)', 'Bacterial Leaf Blight', 'Stem Borers', 'Quelea birds'],
    actionPlan: 'Level paddy meticulously, transplant 21-day seedlings, maintain 5cm water level, split nitrogen into 2-3 applications.'
  },
  sorghum: {
    id: 'sorghum',
    name: 'Sorghum (Sorgho / Mil / Muskuwaari)',
    suitableSoils: ['vertisols (Karal clay)', 'sandy loam', 'semi-arid alluvial soils'],
    idealSeasons: ['rainy season (June-Oct)', 'Muskuwaari off-season flood retreat (Sept-Feb)'],
    regions: ['Far North (Maroua, Kousseri, Yagoua)', 'North (Garoua, Guider)'],
    zone: 'Sahelian & Sudano-Sahelian Semi-Arid Zone',
    maturityDays: '90 - 130 days',
    expectedYield: '2.5 - 4.5 Tons / Hectare',
    spacing: '80 cm between rows x 30 cm between hills (thin to 2 plants/hill)',
    waterRequirement: '400 - 650 mm (highly drought resilient with deep taproot)',
    fertilizerSchedule: [
      { timing: 'Basal (At planting / transplanting on Karal)', fertilizer: 'NPK 15-15-15 or composted cattle manure', rate: '150 kg NPK + 3 T/ha manure' },
      { timing: 'Stem elongation (30 days)', fertilizer: 'Urea', rate: '75 kg/ha' }
    ],
    companionCrops: ['Cowpea (Niébé)', 'Groundnut', 'Sesame'],
    keyRisks: ['Striga parasitic weed', 'Stem Borers', 'Grain Mold', 'Quelea quelea birds'],
    actionPlan: 'On Karal clay, transplant 30-day seedlings into deep dibble holes right as floodwaters recede. Trap Striga with cowpeas.'
  },
  cotton: {
    id: 'cotton',
    name: 'Cotton (Coton / SODECOTON White Gold)',
    suitableSoils: ['well-drained fertile savanna loam', 'sandy clay loam'],
    idealSeasons: ['onset of rains (late May - June)'],
    regions: ['North (Garoua, Mayo-Louti)', 'Far North (Maroua, Mayo-Kani, Mayo-Tsanaga)'],
    zone: 'Sudanian Savanna (SODECOTON Basin)',
    maturityDays: '150 - 180 days',
    expectedYield: '1.5 - 2.8 Tons seed cotton / Hectare',
    spacing: '80 cm between rows x 20 cm between plants (approx 62,500 plants/ha)',
    waterRequirement: '600 - 900 mm during vegetative/flowering phase, dry weather at boll opening',
    fertilizerSchedule: [
      { timing: 'Basal (15 days after emergence)', fertilizer: 'NPK-SB (14-18-18 + Sulfur + Boron)', rate: '200 kg/ha banded along rows' },
      { timing: 'Flowering (40-45 days)', fertilizer: 'Urea (46% N)', rate: '50-75 kg/ha' }
    ],
    companionCrops: ['Rotate with Maize or Sorghum/Groundnut (do not intercrop directly)'],
    keyRisks: ['Cotton Bollworms (Helicoverpa)', 'Aphids / Whiteflies', 'Bacterial Blight / Black Arm'],
    actionPlan: 'Follow SODECOTON threshold pest scouting (scout weekly). Harvest cleanly in dry morning weather without leaf debris.'
  },
  onion: {
    id: 'onion',
    name: 'Onion (Oignon / Maroua Violet)',
    suitableSoils: ['friable sandy-clay alluvial loam', 'rich fertile loamy soil'],
    idealSeasons: ['cool dry season (October - February)', 'off-season with furrow irrigation'],
    regions: ['Far North (Maroua, Diamaré)', 'North (Garoua)'],
    zone: 'Sudano-Sahelian River Valleys',
    maturityDays: '100 - 120 days after transplanting',
    expectedYield: '20 - 35 Tons / Hectare',
    spacing: '15 cm between plants x 15 cm between rows on flat sunken beds (polders)',
    waterRequirement: '350 - 550 mm regular furrow irrigation; stop watering 2 weeks prior to harvest',
    fertilizerSchedule: [
      { timing: 'Basal (Bed preparation)', fertilizer: 'Well-cured sheep/cow manure + NPK 15-15-15', rate: '15 T manure + 200 kg NPK/ha' },
      { timing: '3 weeks after transplant', fertilizer: 'Urea (46% N)', rate: '100 kg/ha' },
      { timing: 'Bulb swelling (6 weeks)', fertilizer: 'Potassium Nitrate or Sulfate of Potash', rate: '100 kg/ha' }
    ],
    companionCrops: ['Carrot', 'Lettuce', 'Cabbage'],
    keyRisks: ['Purple Blotch (Alternaria)', 'Thrips', 'Basal Bulb Rot'],
    actionPlan: 'Transplant 45-day nursery seedlings. Avoid overhead watering to prevent purple blotch. Cure bulbs in shade for 12 days before bagging.'
  },
  oil_palm: {
    id: 'oil_palm',
    name: 'Oil Palm (Palmier à Huile)',
    suitableSoils: ['deep acidic alluvial loam', 'coastal volcanic loam', 'clay-loam'],
    idealSeasons: ['early rainy season planting'],
    regions: ['Littoral (Moungo, Sanaga-Maritime)', 'South-West (Ndian, Fako)', 'South', 'Centre'],
    zone: 'Coastal Lowland & Equatorial Rain Forest',
    maturityDays: 'Perennial (3 years to first fruit bunch, productive for 25+ years)',
    expectedYield: '12 - 22 Tons Fresh Fruit Bunches (FFB) / Hectare / Year',
    spacing: '9 m triangular spacing (approx 143 palms/ha)',
    waterRequirement: '2000 - 3000 mm evenly distributed throughout the year',
    fertilizerSchedule: [
      { timing: 'Year 1-3 (Immature)', fertilizer: 'NPK 12-12-17 + 2MgO (Magnesium)', rate: '1.5 kg per palm per year in 3 split doses' },
      { timing: 'Mature Palms (Annually)', fertilizer: 'Potassium Chloride (MOP) + Urea + Boron', rate: '3 - 4 kg per palm around weeded circle' }
    ],
    companionCrops: ['Pueraria phaseoloides / Mucuna (legume cover crop to prevent erosion)'],
    keyRisks: ['Ganoderma Basal Stem Rot', 'Vascular Wilt (Fusarium)', 'Oryctes Rhinoceros Beetles'],
    actionPlan: 'Plant certified Tenera pre-germinated clonal seedlings. Establish legume cover crop immediately. Maintain 2m weed-free circle around trunk.'
  },
  pepper: {
    id: 'pepper',
    name: 'Pepper & Chili (Piment / Poivre)',
    suitableSoils: ['rich well-drained volcanic loam', 'fertile sandy loam'],
    idealSeasons: ['year-round with base irrigation', 'onset of rainy season'],
    regions: ['West (Foumbot)', 'Littoral (Penja)', 'Centre', 'South-West'],
    zone: 'Warm Humid Lowlands & Highland Valleys',
    maturityDays: '90 - 150 days (continuous multi-harvest)',
    expectedYield: '10 - 18 Tons fresh peppers / Hectare',
    spacing: '70 cm between rows x 50 cm between plants',
    waterRequirement: '600 - 900 mm regular moisture (sensitive to waterlogging)',
    fertilizerSchedule: [
      { timing: 'Basal (At transplanting)', fertilizer: 'Cured poultry compost + NPK 20-10-10', rate: '10 T compost + 200 kg NPK/ha' },
      { timing: 'Flowering & Fruiting (Monthly)', fertilizer: 'NPK 15-15-15 + Potassium Nitrate (KNO3)', rate: '100 kg/ha after major harvests' }
    ],
    companionCrops: ['Onion', 'Garlic', 'Basil'],
    keyRisks: ['Fruit Anthracnose', 'Pepper Veinal Mottle Virus (Aphids)', 'Mites'],
    actionPlan: 'Transplant sturdy 30-day seedlings into well-drained raised beds. Mulch with straw. Harvest every 5-7 days as fruits turn bright red/yellow.'
  },
  sweet_potato: {
    id: 'sweet_potato',
    name: 'Sweet Potato (Patate Douce)',
    suitableSoils: ['sandy loam', 'loose light friable soil', 'lateritic loam'],
    idealSeasons: ['early rainy season', 'mid-season for second crop'],
    regions: ['West', 'North-West', 'Centre', 'Far North'],
    zone: 'Highlands, Forest-Savanna, & Lowland Plains',
    maturityDays: '90 - 120 days',
    expectedYield: '12 - 25 Tons / Hectare',
    spacing: '80 cm between ridges x 30 cm between vine cuttings',
    waterRequirement: '500 - 750 mm',
    fertilizerSchedule: [
      { timing: 'Ridge construction', fertilizer: 'Organic compost + Wood Ash (Potassium source)', rate: '5 T compost + 150 kg Wood ash/ha' },
      { timing: '4 weeks after planting', fertilizer: 'NPK 12-12-17 or 15-15-15 (avoid excess Nitrogen)', rate: '150 kg/ha' }
    ],
    companionCrops: ['Maize', 'Beans', 'Cassava border'],
    keyRisks: ['Sweet Potato Weevil (Cylas formicarius)', 'Feathery Mottle Virus'],
    actionPlan: 'Plant 30cm terminal vine cuttings half-buried at 45° in high ridges. Hill soil at 6 weeks to bury swelling tubers away from weevils.'
  },
  pineapple: {
    id: 'pineapple',
    name: 'Pineapple (Ananas / Penja & Awae Sugar)',
    suitableSoils: ['acidic well-drained volcanic soil (pH 4.5 - 5.5)', 'sandy loam'],
    idealSeasons: ['year-round planting with moisture/mulch'],
    regions: ['Littoral (Njombe-Penja, Mbanga)', 'Centre (Awae)', 'South-West'],
    zone: 'Coastal Humid Volcanic Belt',
    maturityDays: '12 - 16 months',
    expectedYield: '45 - 70 Tons / Hectare',
    spacing: 'Double rows: 90cm between beds, 40cm between rows, 30cm between plants (approx 50,000 plants/ha)',
    waterRequirement: '1000 - 1500 mm (extremely drought resistant CAM plant)',
    fertilizerSchedule: [
      { timing: 'Planting prep', fertilizer: 'Basal Single Super Phosphate (SSP) + Compost', rate: '150 kg SSP/ha' },
      { timing: 'Monthly foliar nutrition', fertilizer: 'High Potassium (K2O) + Urea + Magnesium Sulfate', rate: 'Spray 5% solution into leaf axils' }
    ],
    companionCrops: ['Plantain borders', 'Ginger interrow in year 1'],
    keyRisks: ['Phytophthora Heart Rot', 'Mealybug Wilt Virus', 'Nematodes'],
    actionPlan: 'Use healthy 350g sucker slips. Grade slips by size before planting for uniform ripening. Ensure excellent bed drainage to prevent root rot.'
  },
  beans_cowpeas: {
    id: 'beans_cowpeas',
    name: 'Beans & Cowpeas (Haricot / Niébé / Koki)',
    suitableSoils: ['fertile loam with balanced pH (6.0 - 7.0)', 'well-drained savanna soil'],
    idealSeasons: ['early rainy season', 'second rainy season (Sept-Nov in West)'],
    regions: ['West (Bafoussam, Foumbot)', 'North-West (Bamenda)', 'Far North (Maroua - Niébé)'],
    zone: 'Western Highlands & Sudano-Sahelian Savanna',
    maturityDays: '65 - 85 days',
    expectedYield: '1.2 - 2.5 Tons dry grain / Hectare',
    spacing: '40 cm between rows x 20 cm between plants (2 seeds/hole)',
    waterRequirement: '350 - 500 mm',
    fertilizerSchedule: [
      { timing: 'Basal (At planting)', fertilizer: 'Single Super Phosphate (SSP) or NPK 6-20-10 (Fixes own nitrogen)', rate: '100-150 kg/ha' }
    ],
    companionCrops: ['Maize (classic Push-Pull intercrop)', 'Cassava', 'Sorghum'],
    keyRisks: ['Bean Anthracnose', 'Cowpea Aphids / Flower Thrips', 'Pod Borers (Maruca)'],
    actionPlan: 'Intercrop with maize to reduce weed growth and fix nitrogen. Spray neem extract at flowering to stop pod borers.'
  },
  okra: {
    id: 'okra',
    name: 'Okra (Gombo)',
    suitableSoils: ['warm well-drained loamy soil', 'fertile sandy loam'],
    idealSeasons: ['rainy season', 'dry season with base furrow watering'],
    regions: ['Littoral', 'Centre', 'North', 'Far North'],
    zone: 'Warm Humid & Savanna Lowlands',
    maturityDays: '60 - 80 days',
    expectedYield: '8 - 15 Tons fresh pods / Hectare',
    spacing: '60 cm between rows x 30 cm between plants',
    waterRequirement: '500 - 750 mm',
    fertilizerSchedule: [
      { timing: 'Basal (At planting)', fertilizer: 'Decomposed cattle/poultry manure + NPK 15-15-15', rate: '5 T manure + 150 kg NPK/ha' },
      { timing: 'First flowering (4 weeks)', fertilizer: 'Urea + Muriate of Potash', rate: '75 kg Urea + 50 kg KCl/ha' }
    ],
    companionCrops: ['Eggplant', 'Pepper', 'Sweet Potato'],
    keyRisks: ['Yellow Vein Mosaic Virus (Whiteflies)', 'Powdery Mildew', 'Root-Knot Nematodes'],
    actionPlan: 'Soak seeds in warm water for 12 hours before planting for rapid sprouting. Harvest young tender pods every 2 days to encourage continuous fruiting.'
  }
};

/**
 * Regional Agro-Ecological Profiling for Cameroon
 */
const CAMEROON_REGIONS_PROFILE = {
  'far north': {
    primaryCrops: ['sorghum', 'onion', 'groundnut', 'cotton', 'rice', 'beans_cowpeas'],
    climate: 'Sahelian Semi-Arid (400-700mm rain, short wet season June-Sept)',
    soilRecommendation: 'Karal Vertisols (clay) and alluvial floodplains; high organic manure required.'
  },
  'extrême nord': {
    primaryCrops: ['sorghum', 'onion', 'groundnut', 'cotton', 'rice', 'beans_cowpeas'],
    climate: 'Sahelian Semi-Arid (400-700mm rain, short wet season June-Sept)',
    soilRecommendation: 'Karal Vertisols (clay) and alluvial floodplains; high organic manure required.'
  },
  'north': {
    primaryCrops: ['cotton', 'groundnut', 'sorghum', 'maize', 'onion'],
    climate: 'Sudanian Savanna (700-1000mm rain, unimodal season May-Oct)',
    soilRecommendation: 'Savanna sandy-clay loam; apply Single Super Phosphate and NPK-SB.'
  },
  'nord': {
    primaryCrops: ['cotton', 'groundnut', 'sorghum', 'maize', 'onion'],
    climate: 'Sudanian Savanna (700-1000mm rain, unimodal season May-Oct)',
    soilRecommendation: 'Savanna sandy-clay loam; apply Single Super Phosphate and NPK-SB.'
  },
  'adamawa': {
    primaryCrops: ['maize', 'yam', 'groundnut', 'cassava'],
    climate: 'High Guinea Savanna (>1000m altitude, 1200-1600mm rain)',
    soilRecommendation: 'Fertile savanna loam; great for cereals, tubers, and high-protein grain legumes.'
  },
  'adamaoua': {
    primaryCrops: ['maize', 'yam', 'groundnut', 'cassava'],
    climate: 'High Guinea Savanna (>1000m altitude, 1200-1600mm rain)',
    soilRecommendation: 'Fertile savanna loam; great for cereals, tubers, and high-protein grain legumes.'
  },
  'west': {
    primaryCrops: ['tomato', 'irish_potato', 'maize', 'coffee', 'beans_cowpeas', 'pepper'],
    climate: 'Western Highlands (Noun Valley / Hauts-Plateaux, 1600-2200mm rain, fertile volcanic soils)',
    soilRecommendation: 'Volcanic and rich loam; stake vegetables high and mulch against fungal splash.'
  },
  'ouest': {
    primaryCrops: ['tomato', 'irish_potato', 'maize', 'coffee', 'beans_cowpeas', 'pepper'],
    climate: 'Western Highlands (Noun Valley / Hauts-Plateaux, 1600-2200mm rain, fertile volcanic soils)',
    soilRecommendation: 'Volcanic and rich loam; stake vegetables high and mulch against fungal splash.'
  },
  'north-west': {
    primaryCrops: ['irish_potato', 'maize', 'coffee', 'rice', 'beans_cowpeas'],
    climate: 'Cool Highlands (>1400m altitude, Ndop floodplains, 1800-2400mm rain)',
    soilRecommendation: 'Rich volcanic mountain soil and hydromorphic valley clays.'
  },
  'nord-ouest': {
    primaryCrops: ['irish_potato', 'maize', 'coffee', 'rice', 'beans_cowpeas'],
    climate: 'Cool Highlands (>1400m altitude, Ndop floodplains, 1800-2400mm rain)',
    soilRecommendation: 'Rich volcanic mountain soil and hydromorphic valley clays.'
  },
  'littoral': {
    primaryCrops: ['plantain', 'oil_palm', 'pineapple', 'cocoa', 'cassava', 'pepper'],
    climate: 'Monomodal Coastal Humid Rain Forest (Moungo Basin, 2500-4000mm rain)',
    soilRecommendation: 'Volcanic and alluvial soils; high humidity requires excellent field drainage.'
  },
  'south-west': {
    primaryCrops: ['cocoa', 'plantain', 'oil_palm', 'coffee', 'pineapple'],
    climate: 'Monomodal Humid Forest & Mount Cameroon Volcanic Belt (2000-5000mm rain)',
    soilRecommendation: 'Rich volcanic loam; ideal for premium cocoa, plantains, and export palms.'
  },
  'sud-ouest': {
    primaryCrops: ['cocoa', 'plantain', 'oil_palm', 'coffee', 'pineapple'],
    climate: 'Monomodal Humid Forest & Mount Cameroon Volcanic Belt (2000-5000mm rain)',
    soilRecommendation: 'Rich volcanic loam; ideal for premium cocoa, plantains, and export palms.'
  },
  'centre': {
    primaryCrops: ['cassava', 'cocoa', 'yam', 'maize', 'groundnut', 'plantain', 'okra'],
    climate: 'Bimodal Humid Rain Forest (Two rainy seasons: March-June and August-Nov)',
    soilRecommendation: 'Lateritic red soils and river basin loams; apply lime/wood ash to correct acidity.'
  },
  'south': {
    primaryCrops: ['cassava', 'cocoa', 'plantain', 'oil_palm', 'sweet_potato'],
    climate: 'Dense Bimodal Rain Forest (1600-2000mm rain, high relative humidity)',
    soilRecommendation: 'Acidic ferralitic soils rich in organic cover; apply agricultural lime and potash.'
  },
  'sud': {
    primaryCrops: ['cassava', 'cocoa', 'plantain', 'oil_palm', 'sweet_potato'],
    climate: 'Dense Bimodal Rain Forest (1600-2000mm rain, high relative humidity)',
    soilRecommendation: 'Acidic ferralitic soils rich in organic cover; apply agricultural lime and potash.'
  },
  'east': {
    primaryCrops: ['cassava', 'cocoa', 'plantain', 'maize', 'coffee'],
    climate: 'Guineo-Congolian Rainforest & Savanna Transition Zone (1400-1800mm rain)',
    soilRecommendation: 'Deep organic loam with high biomass; construct high mounds for root tubers.'
  },
  'est': {
    primaryCrops: ['cassava', 'cocoa', 'plantain', 'maize', 'coffee'],
    climate: 'Guineo-Congolian Rainforest & Savanna Transition Zone (1400-1800mm rain)',
    soilRecommendation: 'Deep organic loam with high biomass; construct high mounds for root tubers.'
  }
};

/**
 * Generate comprehensive recommendation based on farm parameters
 */
function getCropRecommendation({ location = '', season = '', soilCondition = '', landSize = '1', priority = 'yield', farmerContext = {}, language = 'English' }) {
  const isFrench = language === 'Français' || language === 'French';
  const effectiveLocation = location || farmerContext.location || farmerContext.region || '';
  const effectiveSeason = season || farmerContext.season || '';
  const effectiveSoil = soilCondition || farmerContext.soilCondition || '';
  const locLower = effectiveLocation.toLowerCase();
  const seasonLower = effectiveSeason.toLowerCase();
  const soilLower = effectiveSoil.toLowerCase();

  // Find regional match if available
  let matchedRegionKey = null;
  for (const reg of Object.keys(CAMEROON_REGIONS_PROFILE)) {
    if (locLower.includes(reg)) {
      matchedRegionKey = reg;
      break;
    }
  }

  // Score candidate crops
  const scores = {};
  for (const [key, crop] of Object.entries(CROPS_RECOMMENDATION_DATA)) {
    let score = 40; // base score

    // Region compatibility bonus
    if (matchedRegionKey && CAMEROON_REGIONS_PROFILE[matchedRegionKey]) {
      const regData = CAMEROON_REGIONS_PROFILE[matchedRegionKey];
      if (regData.primaryCrops.includes(key)) {
        score += 35;
      }
    } else {
      for (const r of crop.regions) {
        if (locLower.includes(r.toLowerCase())) {
          score += 25;
          break;
        }
      }
    }

    // Soil compatibility
    for (const soil of crop.suitableSoils) {
      if (soilLower.includes(soil) || soil.includes(soilLower)) {
        score += 25;
        break;
      }
    }

    // Season compatibility
    for (const s of crop.idealSeasons) {
      if (seasonLower.includes(s) || s.includes(seasonLower)) {
        score += 20;
        break;
      }
    }

    scores[key] = score;
  }

  // Pick top recommendations
  const sortedCrops = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
  const primaryCropKey = sortedCrops[0] || 'maize';
  const secondaryCropKey = sortedCrops[1] || 'cassava';

  const primary = CROPS_RECOMMENDATION_DATA[primaryCropKey];
  const secondary = CROPS_RECOMMENDATION_DATA[secondaryCropKey];
  const regionProfile = matchedRegionKey ? CAMEROON_REGIONS_PROFILE[matchedRegionKey] : null;
  const primaryScore = scores[primaryCropKey] || 0;
  const maximumScore = 120;
  const compatibilityPercent = Math.max(0, Math.min(100, Math.round((primaryScore / maximumScore) * 100)));

  const sizeNum = parseFloat(landSize) || 1;

  const soilAssessmentText = isFrench 
    ? `La condition du sol "${effectiveSoil || 'Agricole standard'}" à ${effectiveLocation || 'Cameroun'} est optimale pour ${primary.name}. ${regionProfile ? regionProfile.soilRecommendation : 'Assurez-vous d\'avoir une matière organique adéquate et un engrais équilibré.'}`
    : `Soil condition "${effectiveSoil || 'Standard agricultural'}" in ${effectiveLocation || 'Cameroon'} is optimal for ${primary.name}. ${regionProfile ? regionProfile.soilRecommendation : 'Ensure adequate organic matter and balanced fertilizer.'}`;

  const seasonalAdviceText = isFrench
    ? `Durant la saison ${effectiveSeason || 'actuelle'}, assurez-vous une préparation des terres rapide et la formation de billons avant les pluies principales.`
    : `During the ${effectiveSeason || 'current'} season, ensure timely land preparation and ridge formation before the main rains.`;

  const landEstimateText = isFrench
    ? `Pour ${landSize} Hectare(s), le rendement projeté est de ${(sizeNum * 3.5).toFixed(1)} - ${(sizeNum * 7.0).toFixed(1)} Tonnes selon la gestion recommandée.`
    : `For ${landSize} Hectare(s), projected yield is ${(sizeNum * 3.5).toFixed(1)} - ${(sizeNum * 7.0).toFixed(1)} Tons under recommended management.`;

  return {
    success: true,
    recommendation: {
      primaryCrop: primary.name,
      primaryDetails: primary,
      secondaryCrop: secondary.name,
      secondaryDetails: secondary,
      compatibilityPercent,
      confidence: compatibilityPercent / 100,
      confidenceLabel: isFrench ? 'Compatibilité avec vos données' : 'Compatibility with your data',
      agroEcologicalZone: primary.zone || (regionProfile ? regionProfile.climate : (isFrench ? 'Zone Agro-Écologique Tropicale du Cameroun' : 'Tropical Cameroonian Agro-Ecological Zone')),
      soilAssessment: soilAssessmentText,
      seasonalAdvice: seasonalAdviceText,
      landEstimate: landEstimateText,
      farmerContext,
      language: language,
      generatedAt: new Date().toISOString(),
      source: isFrench ? 'Moteur Agro-Écologique Cameroun 10-Régions Agro-Vission' : 'Agro-Vission Cameroon 10-Region Agro-Ecological Engine'
    }
  };
}

module.exports = {
  getCropRecommendation,
  CROPS_RECOMMENDATION_DATA,
  CAMEROON_REGIONS_PROFILE
};
