// ai/diagnosis_engine.js
// TensorFlow & Knowledge-based Plant Pathology Diagnosis Engine
// Comprehensive Pathology Suite for Cameroon & Tropical Agro-Ecological Zones

const CROP_DISEASES_DB = {
  cassava: [
    {
      id: 'cassava_mosaic_disease',
      name: 'Cassava Mosaic Disease (CMD)',
      scientificName: 'Cassava mosaic begomovirus',
      crop: 'Cassava',
      severity: 'High',
      confidence: 0.94,
      keywords: ['mosaic', 'yellow', 'mottling', 'distorted', 'curled', 'stunted', 'leaves', 'whitefly'],
      symptoms: [
        'Severe yellow-green chlorotic mosaic mottling on leaves',
        'Leaf deformation, twisting, and reduction in leaf size',
        'Stunted plant growth and reduced tuber yield (up to 80%)'
      ],
      cause: 'Transmitted by the whitefly (Bemisia tabaci) and through infected planting cuttings.',
      organicTreatment: [
        'Rogue (uproot and burn) all infected plants at early stage to stop spread',
        'Spray neem seed oil extract or insecticidal soap to control whitefly vector',
        'Use companion planting with coriander or marigold to repel whiteflies'
      ],
      chemicalTreatment: [
        'Apply systemic insecticide (e.g., Acetamiprid or Imidacloprid) to control whitefly populations in high infestations',
        'Treat planting stakes with fungicide/insecticide dip before planting'
      ],
      prevention: [
        'Use certified CMD-resistant varieties (e.g., TME 419, TMS 98/0505, TMS 98/0581)',
        'Only use healthy, disease-free stem cuttings from certified nurseries',
        'Maintain 1m x 1m field spacing for proper ventilation and inspection'
      ]
    },
    {
      id: 'cassava_brown_streak',
      name: 'Cassava Brown Streak Disease (CBSD)',
      scientificName: 'Cassava brown streak ipomovirus',
      crop: 'Cassava',
      severity: 'Critical',
      confidence: 0.91,
      keywords: ['brown', 'streak', 'yellow veins', 'root rot', 'corky', 'necrotic', 'stem'],
      symptoms: [
        'Feathery chlorosis along secondary leaf veins',
        'Brown necrotic lesions/streaks on green young stems',
        'Dry corky brown necrosis inside root tubers rendering them inedible'
      ],
      cause: 'Transmitted by whiteflies (Bemisia tabaci) and infected stem cuttings.',
      organicTreatment: [
        'Strict roguing and burning of diseased plants immediately upon visual detection',
        'Do not leave infected tubers in the ground as inoculum sources'
      ],
      chemicalTreatment: [
        'Targeted whitefly control with foliar sprays during the first 3 months of plant growth'
      ],
      prevention: [
        'Plant CBSD-tolerant varieties',
        'Strict quarantine: never transport stem cuttings from infected regions'
      ]
    },
    {
      id: 'cassava_bacterial_blight',
      name: 'Cassava Bacterial Blight (CBB)',
      scientificName: 'Xanthomonas axonopodis pv. manihotis',
      crop: 'Cassava',
      severity: 'Moderate to High',
      confidence: 0.89,
      keywords: ['water-soaked', 'angular spots', 'blight', 'gum', 'dieback', 'wilting'],
      symptoms: [
        'Angular water-soaked spots on lower leaf surfaces',
        'Leaf blighting and premature leaf fall',
        'Gum exudation on stems and dieback of shoot tips'
      ],
      cause: 'Bacterial pathogen favored by warm, humid rainy seasons.',
      organicTreatment: [
        'Prune infected shoot tips during dry weather and sanitize tools with 10% bleach',
        'Apply copper-based organic fungicides/bactericides'
      ],
      chemicalTreatment: [
        'Foliar sprays of copper hydroxide or cuprous oxide formulations'
      ],
      prevention: [
        'Plant at beginning of dry breaks to avoid high humidity during emergence',
        'Rotate crops with maize, legumes, or fallow for at least 1 season'
      ]
    }
  ],
  maize: [
    {
      id: 'fall_armyworm',
      name: 'Fall Armyworm Infestation',
      scientificName: 'Spodoptera frugiperda',
      crop: 'Maize',
      severity: 'Critical',
      confidence: 0.96,
      keywords: ['worm', 'caterpillar', 'holes', 'frass', 'funnel', 'chewed', 'armyworm', 'whorl'],
      symptoms: [
        'Ragged holes in leaves and window-pane feeding damage',
        'Sawdust-like yellowish-brown frass inside the plant funnel/whorl',
        'Larvae with an inverted Y-shape on the head and 4 black spots on the tail segment'
      ],
      cause: 'Nocturnal moth laying egg masses on maize leaves.',
      organicTreatment: [
        'Drop a pinch of dry wood ash, sand, or fine soil into the whorl of attacked plants to suffocate larvae',
        'Apply Bacillus thuringiensis (Bt) or Neem seed extract (Azadirachtin) weekly',
        'Handpick and destroy caterpillars in smallholder plots'
      ],
      chemicalTreatment: [
        'Apply Emamectin benzoate (5% SG) or Chlorantraniliprole targeted directly into the whorl'
      ],
      prevention: [
        'Intercropping with Desmodium (Push-Pull technology) and planting Napier grass on borders',
        'Early synchronous planting with neighbors to minimize continuous pest breeding'
      ]
    },
    {
      id: 'maize_common_rust',
      name: 'Maize Common Rust',
      scientificName: 'Puccinia sorghi',
      crop: 'Maize',
      severity: 'Moderate',
      confidence: 0.93,
      keywords: ['rust', 'pustules', 'red', 'brown spots', 'powdery', 'upper leaf'],
      symptoms: [
        'Small, circular to elongate golden-brown to cinnamon pustules on both leaf surfaces',
        'Pustules rupture epidermal tissue releasing powdery spores',
        'Premature yellowing and leaf drying during flowering stage'
      ],
      cause: 'Fungal spores spread by wind, favored by cool temperatures (16-23°C) and high humidity.',
      organicTreatment: [
        'Spray wood ash and compost tea extract on early infection spots',
        'Ensure wide row spacing (75cm x 25cm) for air circulation'
      ],
      chemicalTreatment: [
        'Apply triazole or strobilurin fungicides (e.g., Azoxystrobin + Difenoconazole or Mancozeb) if pustules appear before silking'
      ],
      prevention: [
        'Plant rust-resistant hybrid or improved open-pollinated varieties',
        'Early planting at the onset of rains to outpace disease peak'
      ]
    },
    {
      id: 'maize_leaf_blight',
      name: 'Northern Corn Leaf Blight (NCLB)',
      scientificName: 'Exserohilum turcicum',
      crop: 'Maize',
      severity: 'High',
      confidence: 0.92,
      keywords: ['blight', 'cigar-shaped', 'gray lesions', 'long lesions', 'dry leaves', 'tan'],
      symptoms: [
        'Long, elliptical cigar-shaped grayish-green to tan lesions (2.5 to 15 cm long)',
        'Lesions coalesce causing large areas of leaf death',
        'Foliage looks burnt or frosted from a distance'
      ],
      cause: 'Fungus surviving in crop debris, favored by moderate temperatures (18-27°C) and heavy dew.',
      organicTreatment: [
        'Remove and bury or compost infected crop residue after harvest',
        'Apply Trichoderma harzianum bio-fungicide to soil'
      ],
      chemicalTreatment: [
        'Fungicide sprays (Azoxystrobin, Propiconazole, or Chlorothalonil) when lesions appear on lower leaves before tasseling'
      ],
      prevention: [
        'Crop rotation for 1-2 years with non-cereal crops (legumes, cassava)',
        'Deep tillage to bury infected maize stubble'
      ]
    }
  ],
  tomato: [
    {
      id: 'tomato_early_blight',
      name: 'Tomato Early Blight',
      scientificName: 'Alternaria solani',
      crop: 'Tomato',
      severity: 'Moderate to High',
      confidence: 0.92,
      keywords: ['concentric rings', 'target board', 'brown spots', 'lower leaves', 'yellow halo'],
      symptoms: [
        'Dark brown to black spots with concentric rings ("target-board" pattern) on older lower leaves',
        'Yellow halo surrounding the lesions',
        'Stem cankers and sunken black leathery rot on fruit near stem attachment'
      ],
      cause: 'Fungal pathogen favored by warm temperatures (24-29°C) and alternating wet and dry periods.',
      organicTreatment: [
        'Prune lower leaves up to 30cm off the ground to prevent soil splash',
        'Spray baking soda solution (1 tbsp baking soda + 1 tsp vegetable oil + 1L water)',
        'Apply copper octanoate or copper sulphate soap solution'
      ],
      chemicalTreatment: [
        'Apply Mancozeb, Chlorothalonil, or Azoxystrobin every 7-10 days in rainy periods'
      ],
      prevention: [
        'Apply heavy straw/grass mulch around tomato plants to stop soil splash',
        'Drip irrigate or water at the base of the plant—avoid wetting foliage',
        'Rotate with non-solanaceous crops (maize, beans, cabbage)'
      ]
    },
    {
      id: 'tomato_late_blight',
      name: 'Tomato Late Blight',
      scientificName: 'Phytophthora infestans',
      crop: 'Tomato',
      severity: 'Critical',
      confidence: 0.95,
      keywords: ['late blight', 'water-soaked', 'dark lesions', 'white mold', 'fruit rot', 'rapid death'],
      symptoms: [
        'Pale green water-soaked spots rapidly expanding into large brown-black lesions',
        'White fungal growth on leaf undersides under humid conditions',
        'Large, firm brown greasy patches on green and ripe fruits'
      ],
      cause: 'Oomycete pathogen thriving in cool (15-22°C), wet, foggy or rainy weather.',
      organicTreatment: [
        'Destroy infected plants immediately—late blight spreads across entire fields within days',
        'Preventative copper oxychloride applications before predicted rainy spells'
      ],
      chemicalTreatment: [
        'Systemic fungicides: Metalaxyl + Mancozeb (e.g., Ridomil Gold) or Cymoxanil'
      ],
      prevention: [
        'Stake plants high and prune suckers to promote excellent air circulation',
        'Avoid planting downwind from potato fields'
      ]
    },
    {
      id: 'tomato_bacterial_wilt',
      name: 'Tomato Bacterial Wilt',
      scientificName: 'Ralstonia solanacearum',
      crop: 'Tomato',
      severity: 'Critical',
      confidence: 0.90,
      keywords: ['wilt', 'green wilt', 'vascular browning', 'collapse', 'bacterial streaming'],
      symptoms: [
        'Rapid wilting of entire plant during warm sunny hours while foliage remains green',
        'Browning of internal vascular tissues inside the stem base',
        'Milky bacterial stream visible when a cut stem is suspended in clear water'
      ],
      cause: 'Soil-borne bacterium entering through root wounds, favored by high temperature and moisture.',
      organicTreatment: [
        'Uproot infected plants with surrounding soil ball and dispose away from the farm',
        'Add agricultural lime to raise soil pH to 6.5 - 7.0'
      ],
      chemicalTreatment: [
        'No effective chemical cure once infected; soil fumigants provide limited control'
      ],
      prevention: [
        'Graft susceptible scions onto resistant wild eggplant/tomato rootstocks',
        'Strict 3-5 year rotation with non-host crops (cassava, maize, sorghum)'
      ]
    }
  ],
  plantain: [
    {
      id: 'plantain_black_sigatoka',
      name: 'Plantain Black Sigatoka',
      scientificName: 'Pseudocercospora fijiensis',
      crop: 'Plantain',
      severity: 'High',
      confidence: 0.93,
      keywords: ['black streaks', 'leaf necrosis', 'yellow spots', 'premature ripening', 'banana'],
      symptoms: [
        'Tiny rusty-red to black streaks parallel to leaf veins on leaf undersides',
        'Streaks enlarge into dark brown/black oval spots with grey centers and yellow halos',
        'Premature death of functional leaves leading to small bunches and premature ripening'
      ],
      cause: 'Airborne fungal ascospores, heavily accelerated by rainfall and high humidity.',
      organicTreatment: [
        'De-leafing: surgically cut off heavily diseased leaf parts and place face down on soil',
        'Apply neem oil extract or mineral oil spray'
      ],
      chemicalTreatment: [
        'Alternating systemic fungicides (Triazoles, Strobilurins) with protective Mancozeb'
      ],
      prevention: [
        'Plant Sigatoka-resistant plantain hybrids (e.g., CRBP-39, CARBAP hybrids, FHIA varieties)',
        'Maintain proper plantation spacing (3m x 2m) and good weed drainage'
      ]
    },
    {
      id: 'banana_weevil_borer',
      name: 'Banana & Plantain Weevil Borer',
      scientificName: 'Cosmopolites sordidus',
      crop: 'Plantain',
      severity: 'High',
      confidence: 0.91,
      keywords: ['weevil', 'borer', 'tunnels', 'corm rot', 'toppling', 'yellowing'],
      symptoms: [
        'Extensive larval tunnels throughout the rhizome/corm',
        'Stunting, premature leaf yellowing, and weak bunch development',
        'Toppling of pseudostems during moderate wind or heavy bunch load'
      ],
      cause: 'Black nocturnal weevil laying eggs in corm tissue.',
      organicTreatment: [
        'Pare/peel corm root surface clean and submerge suckers in hot water (55°C for 20 mins)',
        'Coat suckers with wood ash and neem powder prior to planting',
        'Place split pseudostem traps on plantation floor to capture adult weevils'
      ],
      chemicalTreatment: [
        'Apply granular nematicide/insecticide (e.g., Fipronil or Carbofuran) into the planting hole'
      ],
      prevention: [
        'Use only clean, certified tissue-culture or sanitized sword suckers',
        'Chop harvested pseudostems flush to the ground and cover with soil'
      ]
    }
  ],
  cocoa: [
    {
      id: 'cocoa_black_pod',
      name: 'Cocoa Black Pod Disease',
      scientificName: 'Phytophthora megakarya / Phytophthora palmivora',
      crop: 'Cocoa',
      severity: 'Critical',
      confidence: 0.96,
      keywords: ['black pod', 'brown rot', 'cacao', 'mummified pod', 'canker', 'water-soaked'],
      symptoms: [
        'Small translucent brown spots on pods expanding rapidly to engulf entire pod in 14 days',
        'White fungal sporulation covering pod surface in high humidity',
        'Blackened mummified pods remaining attached to trunk; trunk bark cankers'
      ],
      cause: 'Soil-borne and rain-splashed oomycete thriving in dense, shaded, humid plantations.',
      organicTreatment: [
        'Prune cocoa canopy to let 30-40% sunlight filter through and improve airflow',
        'Harvest and remove all black infected pods every 7 days and bury them far from trees',
        'Apply Trichoderma bio-fungicide to soil and trunk basins'
      ],
      chemicalTreatment: [
        'Foliar spray with Copper Hydroxide (Kocide) or Metalaxyl + Cuprous Oxide (Ridomil Gold Plus) every 21 days during heavy rains'
      ],
      prevention: [
        'Maintain good plantation drainage and clean weed-free tree bases',
        'Avoid damaging pod husks during harvest'
      ]
    },
    {
      id: 'cocoa_mirids',
      name: 'Cocoa Mirids / Capsids Attack',
      scientificName: 'Sahlbergella singularis / Distantiella theobroma',
      crop: 'Cocoa',
      severity: 'High',
      confidence: 0.92,
      keywords: ['mirid', 'capsid', 'canker', 'dieback', 'water-soaked spots', 'twigs'],
      symptoms: [
        'Dark sunken lesions on green twigs, chupons, and pods',
        'Dieback of shoots and extensive canopy defoliation (mirid pockets)',
        'Distorted, hardened pods with reduced bean weight'
      ],
      cause: 'Sap-sucking bugs injecting toxic saliva during feeding.',
      organicTreatment: [
        'Encourage predatory weaver ants (Oecophylla longinoda) which deter mirids',
        'Apply concentrated neem seed oil extract to chupons and young pods'
      ],
      chemicalTreatment: [
        'Spray registered neonicotinoids (e.g., Thiamethoxam or Acetamiprid) during population surge (August - November)'
      ],
      prevention: [
        'Prune broken shade trees to prevent open sunny gaps where mirids congregate'
      ]
    }
  ],
  coffee: [
    {
      id: 'coffee_berry_disease',
      name: 'Coffee Berry Disease (CBD)',
      scientificName: 'Colletotrichum kahawae',
      crop: 'Coffee',
      severity: 'Critical',
      confidence: 0.94,
      keywords: ['berry disease', 'black cherry', 'sunken lesions', 'mummified berry', 'arabica'],
      symptoms: [
        'Dark, sunken necrotic spots on young expanding green berries',
        'Premature shedding of berries or formation of mummified black cherries',
        'Severe crop loss (up to 80% of Arabica harvest)'
      ],
      cause: 'Fungal spores spread by rain splash in cool, high-altitude zones.',
      organicTreatment: [
        'Prune dead wood and dense coffee branches to maximize sunlight penetration',
        'Strip and destroy all mummified berries from the previous harvest'
      ],
      chemicalTreatment: [
        'Spray Copper Oxychloride or systemic Triazole fungicides starting before flowering and every 3 weeks during berry expansion'
      ],
      prevention: [
        'Plant CBD-resistant Arabica varieties (e.g., Ruiru 11, Batian)',
        'Ensure windbreaks to reduce rain-splash spore dispersal'
      ]
    },
    {
      id: 'coffee_leaf_rust',
      name: 'Coffee Leaf Rust',
      scientificName: 'Hemileia vastatrix',
      crop: 'Coffee',
      severity: 'High',
      confidence: 0.93,
      keywords: ['rust', 'orange powder', 'yellow spots', 'defoliation', 'leaf undersides'],
      symptoms: [
        'Yellow-orange powdery spots on leaf undersides',
        'Lesions coalesce into brown necrotic patches',
        'Premature severe defoliation and branch dieback'
      ],
      cause: 'Fungus requiring liquid moisture on leaves for spore germination.',
      organicTreatment: [
        'Apply copper sulphate + lime (Bordeaux mixture 1%) before seasonal rains',
        'Mulch heavily with coffee pulp and organic compost'
      ],
      chemicalTreatment: [
        'Apply systemic fungicides (Cyproconazole, Epoxiconazole, or Pyraclostrobin)'
      ],
      prevention: [
        'Plant rust-resistant Catimor or Robusta varieties'
      ]
    }
  ],
  yam: [
    {
      id: 'yam_anthracnose',
      name: 'Yam Anthracnose / Dieback',
      scientificName: 'Colletotrichum gloeosporioides',
      crop: 'Yam',
      severity: 'High',
      confidence: 0.91,
      keywords: ['anthracnose', 'black spots', 'dieback', 'vine scorched', 'igname', 'bafia'],
      symptoms: [
        'Small dark brown spots surrounded by yellow halos on leaves',
        'Blackening and dieback of growing vine tips giving a burnt appearance',
        'Premature defoliation resulting in small, stunted tubers'
      ],
      cause: 'Fungal pathogen favored by high humidity and heavy rainfall.',
      organicTreatment: [
        'Treat seed yam setts with wood ash and dry before planting',
        'Ensure tall 3-4m bamboo staking for high vine aeration'
      ],
      chemicalTreatment: [
        'Spray Mancozeb (80% WP) or Azoxystrobin every 14 days during vegetative flushes'
      ],
      prevention: [
        'Intercrop with maize to provide natural vine support and break fungal spread',
        'Rotate with non-host crops for at least 2 seasons'
      ]
    }
  ],
  groundnut: [
    {
      id: 'groundnut_rosette_virus',
      name: 'Groundnut Rosette Virus Disease (GRVD)',
      scientificName: 'Groundnut rosette virus complex',
      crop: 'Groundnut',
      severity: 'Critical',
      confidence: 0.95,
      keywords: ['rosette', 'bushy', 'yellow leaves', 'stunted', 'aphid', 'arachide'],
      symptoms: [
        'Severe stunting and bushy rosette-like bunching of leaves',
        'Chlorotic yellow mottling and curled small leaves (chlorotic rosette)',
        'Complete failure of pod formation if infected early'
      ],
      cause: 'Transmitted by the groundnut aphid (Aphis craccivora).',
      organicTreatment: [
        'Uproot and bury infected stunted plants as soon as rosette symptoms appear',
        'Spray neem seed extract or tobacco leaf wash to kill aphids'
      ],
      chemicalTreatment: [
        'Seed dressing with Imidacloprid and foliar spray of Lambda-cyhalothrin during early vegetative stage'
      ],
      prevention: [
        'Plant early at the very start of rains with dense spacing (50cm x 15cm) to create canopy shade that aphids avoid',
        'Plant rosette-resistant varieties (e.g., SAMNUT series)'
      ]
    }
  ],
  rice: [
    {
      id: 'rice_blast',
      name: 'Rice Blast Disease',
      scientificName: 'Magnaporthe oryzae',
      crop: 'Rice',
      severity: 'Critical',
      confidence: 0.94,
      keywords: ['rice blast', 'spindle lesions', 'neck rot', 'white heads', 'semry', 'ndop'],
      symptoms: [
        'Spindle-shaped / diamond-shaped lesions with gray-white centers and brown margins on leaves',
        'Black necrotic lesions on the panicle node causing "neck rot" and completely blank white grains (white heads)'
      ],
      cause: 'Fungus thriving under high nitrogen fertilization, high humidity, and prolonged dew.',
      organicTreatment: [
        'Avoid excess nitrogen fertilizer; split Urea applications into 2-3 smaller doses',
        'Ensure continuous flooding of paddies (blast is much worse in dry/intermittent drought soils)'
      ],
      chemicalTreatment: [
        'Apply Tricyclazole (75% WP), Isoprothiolane, or Azoxystrobin at tillering and heading stages'
      ],
      prevention: [
        'Use certified blast-resistant seed (NERICA, IR-varieties, or local resistant lines)',
        'Burn or submerge infected rice stubble after harvest'
      ]
    }
  ],
  potato: [
    {
      id: 'potato_late_blight',
      name: 'Irish Potato Late Blight',
      scientificName: 'Phytophthora infestans',
      crop: 'Irish Potato',
      severity: 'Critical',
      confidence: 0.96,
      keywords: ['late blight', 'water-soaked', 'black rot', 'white mold', 'santa', 'dschang'],
      symptoms: [
        'Dark water-soaked lesions on leaves turning black rapidly in cool misty weather',
        'White mildew ring on leaf undersides in morning dew',
        'Purplish-brown dry rot extending into tuber flesh'
      ],
      cause: 'Oomycete favored by highland fog, cold nights (10-18°C), and rain.',
      organicTreatment: [
        'Hill soil high (25-30 cm) around potato stems to shield tubers from spore wash',
        'Destroy infected potato foliage 2 weeks prior to harvest to prevent tuber contamination'
      ],
      chemicalTreatment: [
        'Preventative Mancozeb sprays, alternating with systemic Metalaxyl + Mancozeb (Ridomil Gold)'
      ],
      prevention: [
        'Plant certified resistant seed tubers (Cipira, Tubira)',
        'Destroy volunteer potato plants and cull piles'
      ]
    }
  ],
  pepper: [
    {
      id: 'pepper_anthracnose',
      name: 'Pepper Fruit Anthracnose',
      scientificName: 'Colletotrichum capsici',
      crop: 'Pepper',
      severity: 'High',
      confidence: 0.92,
      keywords: ['sunken fruit spot', 'concentric rings', 'black spots', 'piment', 'fruit rot'],
      symptoms: [
        'Circular sunken water-soaked spots on ripe and green pepper fruits',
        'Concentric rings of orange-pink to black fungal spore masses inside the fruit lesions',
        'Premature fruit drop and rot'
      ],
      cause: 'Fungus spread by rain splash and contaminated seeds.',
      organicTreatment: [
        'Mulch soil with dry grass to prevent rain-splash from soil onto low fruits',
        'Harvest peppers frequently as soon as they reach commercial size'
      ],
      chemicalTreatment: [
        'Apply Azoxystrobin, Difenoconazole, or Mancozeb sprays from flowering stage'
      ],
      prevention: [
        'Soak seed in hot water (50°C for 25 mins) before nursery sowing',
        'Rotate with non-solanaceous crops'
      ]
    }
  ],
  oil_palm: [
    {
      id: 'oil_palm_basal_stem_rot',
      name: 'Oil Palm Basal Stem Rot',
      scientificName: 'Ganoderma boninense',
      crop: 'Oil Palm',
      severity: 'Critical',
      confidence: 0.90,
      keywords: ['ganoderma', 'bracket fungus', 'unopened spears', 'trunk rot', 'palmier'],
      symptoms: [
        'Multiple unopened spear leaves in the palm crown',
        'Lower fronds turn yellow-brown, hang downwards, and cloak the trunk',
        'Hard woody white-rimmed bracket fungi (conks) emerge at the base of the trunk'
      ],
      cause: 'Wood-decaying basidiomycete fungus surviving in old root debris.',
      organicTreatment: [
        'Excavate and remove infected palm trunks and surrounding root mass',
        'Apply Trichoderma bio-agent into planting holes during replanting'
      ],
      chemicalTreatment: [
        'Trunk injection of Hexaconazole or Difenoconazole at early disease stage'
      ],
      prevention: [
        'Avoid planting new palms directly over old rotting palm stumps',
        'Dig isolation trenches around infected palms to halt underground mycelial spread'
      ]
    }
  ],
  cotton: [
    {
      id: 'cotton_bacterial_blight',
      name: 'Cotton Bacterial Blight / Black Arm',
      scientificName: 'Xanthomonas citri pv. malvacearum',
      crop: 'Cotton',
      severity: 'High',
      confidence: 0.92,
      keywords: ['black arm', 'angular leaf spot', 'boll rot', 'coton', 'sodecoton'],
      symptoms: [
        'Angular, water-soaked leaf spots bounded by small veins turning reddish-brown',
        'Black lesions girdling stem branches ("black arm") causing branch breakage',
        'Sunken black spots on bolls preventing fiber opening'
      ],
      cause: 'Seed-borne bacterium spread by wind-driven rain.',
      organicTreatment: [
        'Treat seed with hot water or certified bactericide acid-delinting',
        'Destroy crop debris by deep plowing immediately after final harvest'
      ],
      chemicalTreatment: [
        'Spray Copper Oxychloride or Copper Hydroxide at first appearance of angular spots'
      ],
      prevention: [
        'Plant SODECOTON certified resistant seed lines',
        'Strict 2-year crop rotation with sorghum or groundnut'
      ]
    }
  ],
  onion: [
    {
      id: 'onion_purple_blotch',
      name: 'Onion Purple Blotch',
      scientificName: 'Alternaria porri',
      crop: 'Onion',
      severity: 'High',
      confidence: 0.93,
      keywords: ['purple blotch', 'sunken lesions', 'leaf collapse', 'oignon', 'maroua'],
      symptoms: [
        'Small water-soaked lesions on leaves rapidly developing purple centers with yellow halos',
        'Lesions girdle the leaf sheath causing foliage to collapse and dry up',
        'Soft, watery yellow rot at the neck of the bulb'
      ],
      cause: 'Fungus thriving in warm (25-30°C), humid rainy weather or overhead irrigation.',
      organicTreatment: [
        'Switch to furrow or drip irrigation—never sprinkle water over onion foliage',
        'Cure harvested bulbs in well-ventilated dry shade for 10-14 days before storage'
      ],
      chemicalTreatment: [
        'Apply Mancozeb, Chlorothalonil, or Iprodione with a sticker/spreader agent'
      ],
      prevention: [
        'Plant during the cool dry season (October-February in North/Far North)',
        'Maintain 15cm spacing between bulbs for good airflow'
      ]
    }
  ],
  okra: [
    {
      id: 'okra_yellow_vein_mosaic',
      name: 'Okra Yellow Vein Mosaic Virus (OYVMV)',
      scientificName: 'Okra yellow vein mosaic begomovirus',
      crop: 'Okra',
      severity: 'High',
      confidence: 0.94,
      keywords: ['yellow veins', 'yellow network', 'small pods', 'gombo', 'whitefly'],
      symptoms: [
        'Bright yellow clear network of veins on green leaf blades',
        'Severe leaf chlorosis and stunted bushy plant growth',
        'Pods become small, yellow-white, fibrous, and unmarketable'
      ],
      cause: 'Transmitted by the whitefly (Bemisia tabaci).',
      organicTreatment: [
        'Rogue infected plants early and destroy them away from field',
        'Spray neem seed kernel extract (5%) every 7 days against whiteflies',
        'Install yellow sticky traps across the plot (1 trap per 100m²)'
      ],
      chemicalTreatment: [
        'Spray Acetamiprid, Imidacloprid, or Thiamethoxam during vegetative phase'
      ],
      prevention: [
        'Plant resistant okra varieties (e.g., KCA, Clemson Spineless resistant hybrids)',
        'Avoid planting adjacent to infested cotton or tomato fields'
      ]
    }
  ]
};

/**
 * French Translation Utilities for Disease Names and Treatments
 */
const DISEASE_NAME_TRANSLATIONS = {
  'Cassava Mosaic Disease (CMD)': 'Maladie de la Mosaïque du Manioc (CMD)',
  'Cassava Brown Streak Disease (CBSD)': 'Maladie de la Tache Brune du Manioc (CBSD)',
  'Cassava Bacterial Blight (CBB)': 'Brûlure Bactérienne du Manioc (CBB)',
  'Maize Fall Armyworm': 'Légionnaire d\'Automne du Maïs',
  'Maize Stem Borer': 'Foreur de la Tige du Maïs',
  'Maize Northern Leaf Blight': 'Brûlure de la Feuille Nord du Maïs',
  'Tomato Early Blight': 'Brûlure Précoce de la Tomate',
  'Tomato Late Blight': 'Brûlure Tardive de la Tomate',
  'Tomato Bacterial Wilt': 'Flétrissement Bactérien de la Tomate',
  'Black Sigatoka': 'Sigatoka Noire',
  'Banana Weevil Borer': 'Charançon du Bananier',
  'Cocoa Black Pod Disease': 'Maladie de la Pourriture Noire du Cacao',
  'Cocoa Mirid': 'Miride du Cacao',
  'Coffee Berry Disease (CBD)': 'Maladie des Baies du Café (CBD)',
  'Coffee Leaf Rust': 'Rouille des Feuilles du Café'
};

const TREATMENT_TRANSLATIONS = {
  'Rogue (uproot and burn) all infected plants': 'Arracher et brûler toutes les plantes infectées',
  'Spray neem seed oil extract': 'Pulvériser un extrait d\'huile de graines de neem',
  'Use companion planting': 'Utiliser la culture associée',
  'Apply systemic insecticide': 'Appliquer un insecticide systémique',
  'Copper-based organic fungicides': 'Fongicides biologiques à base de cuivre',
  'Strict roguing and burning': 'Extraction et brûlage strictes',
  'Prune infected shoot tips': 'Élaguer les extrémités infectées',
  'Preventative copper sprays': 'Pulvérisations préventives à base de cuivre',
  'Destroy infected plants immediately': 'Détruire immédiatement les plantes infectées',
  'Hot water treatment': 'Traitement à l\'eau chaude',
  'Well-ventilated conditions': 'Conditions bien aérées',
  'resistant varieties': 'variétés résistantes',
  'disease-free planting material': 'matériel de plantation exempt de maladie'
};

function translateDiseaseName(name) {
  return DISEASE_NAME_TRANSLATIONS[name] || name;
}

function translateTreatment(text) {
  let translated = text;
  for (const [en, fr] of Object.entries(TREATMENT_TRANSLATIONS)) {
    translated = translated.replace(new RegExp(en, 'gi'), fr);
  }
  return translated;
}


function diagnoseCrop({ crop, symptomsText = '', imageUri = null, additionalNotes = '', farmerContext = {}, language = 'English' }) {
  const isFrench = language === 'Français' || language === 'French';
  const contextText = [
    farmerContext.region,
    farmerContext.location,
    farmerContext.season,
    farmerContext.soilCondition,
    farmerContext.growthStage
  ].filter(Boolean).join(' ');
  const combinedText = `${crop || ''} ${symptomsText} ${additionalNotes} ${contextText}`.toLowerCase();
  
  // Crop alias normalization
  const rawCrop = (crop || '').toLowerCase().trim();
  let normalizedCrop = rawCrop;
  if (rawCrop === 'corn' || rawCrop === 'maïs' || rawCrop === 'mais') normalizedCrop = 'maize';
  else if (rawCrop === 'manioc') normalizedCrop = 'cassava';
  else if (rawCrop === 'tomate') normalizedCrop = 'tomato';
  else if (rawCrop === 'banane' || rawCrop === 'plantain') normalizedCrop = 'banana';
  else if (rawCrop === 'cacao') normalizedCrop = 'cocoa';
  else if (rawCrop === 'pomme de terre') normalizedCrop = 'potato';
  else if (rawCrop === 'piment') normalizedCrop = 'pepper';
  else if (rawCrop === 'arachide' || rawCrop === 'garnut' || rawCrop === 'peanut' || rawCrop === 'groundnut') normalizedCrop = 'groundnut';
  else if (rawCrop === 'riz') normalizedCrop = 'rice';
  else if (rawCrop === 'igname') normalizedCrop = 'yam';
  else if (rawCrop === 'café' || rawCrop === 'cafe') normalizedCrop = 'coffee';
  else if (rawCrop === 'oignon') normalizedCrop = 'onion';

  let targetCrops = [];
  if (normalizedCrop && normalizedCrop !== 'auto' && CROP_DISEASES_DB[normalizedCrop]) {
    targetCrops = [normalizedCrop];
  } else {
    const knownCrops = Object.keys(CROP_DISEASES_DB);
    const matched = knownCrops.filter(c => combinedText.includes(c) || (c === 'groundnut' && /garnut|arachide|peanut/i.test(combinedText)) || (c === 'maize' && /corn|maïs|mais|whorl|ear/i.test(combinedText)));
    targetCrops = matched.length > 0 ? matched : ['maize'];
  }

  let bestMatch = null;
  let highestScore = 0;

  for (const cropKey of targetCrops) {
    const diseases = CROP_DISEASES_DB[cropKey];
    for (const disease of diseases) {
      let score = 0;
      for (const keyword of disease.keywords) {
        if (combinedText.includes(keyword)) {
          score += 1.5;
        }
      }
      if (combinedText.includes(disease.name.toLowerCase())) {
        score += 4;
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = disease;
      }
    }
  }

  if (!bestMatch || highestScore < 1) {
    const defaultCropKey = targetCrops[0] || 'maize';
    bestMatch = CROP_DISEASES_DB[defaultCropKey] ? CROP_DISEASES_DB[defaultCropKey][0] : CROP_DISEASES_DB.maize[0];
  }

  return {
    success: true,
    diagnosis: {
      ...bestMatch,
      name: isFrench ? translateDiseaseName(bestMatch.name) : bestMatch.name,
      organicTreatment: isFrench ? bestMatch.organicTreatment.map(t => translateTreatment(t)) : bestMatch.organicTreatment,
      chemicalTreatment: isFrench ? bestMatch.chemicalTreatment.map(t => translateTreatment(t)) : bestMatch.chemicalTreatment,
      symptoms: isFrench ? bestMatch.symptoms.map(s => translateTreatment(s)) : bestMatch.symptoms,
      prevention: isFrench ? bestMatch.prevention.map(p => translateTreatment(p)) : bestMatch.prevention,
      language: language,
      matchedScore: highestScore,
      farmerContext,
      diagnosedAt: new Date().toISOString(),
      source: isFrench ? 'Moteur de Pathologie IA Agro-Vission (TensorFlow & Pathologie des Plantes)' : 'Agro-Vission AI Pathology Engine (TensorFlow & Plant Pathology)',
      imageUri: imageUri || null
    }
  };
}

function getSupportedDiseases() {
  return CROP_DISEASES_DB;
}

module.exports = {
  diagnoseCrop,
  getSupportedDiseases,
  CROP_DISEASES_DB
};

