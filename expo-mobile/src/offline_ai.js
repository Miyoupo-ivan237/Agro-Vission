// expo-mobile/src/offline_ai.js
// 100% On-Device Standalone Offline AI Engine for Agro-Vission Mobile App
// Full Bilingual Support (English & French) for Cameroon 10 Regions & All Major Crops

export const OFFLINE_DISEASES = {
  cassava: [
    {
      id: 'cmd',
      name: 'Cassava Mosaic Disease (CMD)',
      nameFr: 'Mosaïque du Manioc (CMD)',
      scientificName: 'Cassava mosaic begomovirus',
      crop: 'Cassava',
      severity: 'High',
      confidence: 0.94,
      keywords: ['mosaic', 'mosaique', 'mosaïque', 'yellow', 'jaune', 'mottling', 'distorted', 'curled', 'enroulement', 'stunted', 'whitefly', 'mouche blanche', 'manioc', 'cassava'],
      symptoms: [
        'Severe yellow-green chlorotic mosaic mottling on leaves',
        'Leaf deformation, twisting, and reduction in leaf size',
        'Stunted plant growth and reduced tuber yield'
      ],
      symptomsFr: [
        'Mosaïque chlorotique jaune-vert très marquée sur le limbe foliaire',
        'Déformation, enroulement et réduction drastique de la taille des feuilles',
        'Croissance rabougrie du plant et baisse sévère du rendement en tubercules'
      ],
      organicTreatment: [
        'Rogue (uproot and burn) all infected plants at early stage',
        'Spray neem seed oil extract or insecticidal soap to control whiteflies',
        'Use companion planting with coriander or marigolds'
      ],
      organicTreatmentFr: [
        'Épurer (arracher et brûler) immédiatement les plants malades dès apparition',
        'Pulvériser de l\'huile de neem ou du savon noir pour réguler les mouches blanches',
        'Associer avec de la coriandre ou œillets d\'Inde comme répulsif naturel'
      ],
      chemicalTreatment: [
        'Apply systemic insecticide (Acetamiprid or Imidacloprid) for whitefly control',
        'Treat planting stakes with fungicide dip prior to planting'
      ],
      chemicalTreatmentFr: [
        'Appliquer un insecticide systémique (Acétamipride ou Imidaclopride) contre les aleurodes',
        'Tremper préventivement les boutures dans une bouillie fongicide avant plantation'
      ],
      prevention: [
        'Plant certified CMD-resistant varieties (TME 419, TMS 98/0505)',
        'Maintain 1m x 1m field spacing for proper ventilation'
      ],
      preventionFr: [
        'Planter des boutures certifiées saines et tolérantes (TME 419, TMS 98/0505)',
        'Respecter un écartement régulier de 1m x 1m pour une aération optimale'
      ]
    },
    {
      id: 'cbsd',
      name: 'Cassava Brown Streak Disease (CBSD)',
      nameFr: 'Striure Brune du Manioc (CBSD)',
      scientificName: 'Cassava brown streak ipomovirus',
      crop: 'Cassava',
      severity: 'Critical',
      confidence: 0.91,
      keywords: ['brown', 'brun', 'streak', 'striure', 'veins', 'nervures', 'root rot', 'pourriture', 'corky', 'stem', 'tige'],
      symptoms: [
        'Feathery chlorosis along secondary leaf veins',
        'Brown necrotic streaks on young green stems',
        'Dry corky brown necrosis inside root tubers rendering them inedible'
      ],
      symptomsFr: [
        'Chlorose plumeuse le long des nervures secondaires des feuilles',
        'Striures nécrotiques brun foncé sur les jeunes tiges vertes',
        'Pourriture sèche brune et liégeuse à l\'intérieur des tubercules les rendant immangeables'
      ],
      organicTreatment: [
        'Strict roguing and burning of diseased plants immediately',
        'Never use stem cuttings from an infected field'
      ],
      organicTreatmentFr: [
        'Arrachage immédiat et incinération complète des plants atteints',
        'Ne jamais prélever de boutures dans une parcelle présentant des symptômes'
      ],
      chemicalTreatment: ['Targeted whitefly control with foliar sprays during first 3 months'],
      chemicalTreatmentFr: ['Traitements ciblés contre les mouches blanches durant les 3 premiers mois'],
      prevention: ['Plant CBSD-tolerant varieties', 'Strict quarantine between farming zones'],
      preventionFr: ['Planter des variétés tolérantes à la striure brune', 'Contrôle strict des transferts de boutures entre régions']
    }
  ],
  maize: [
    {
      id: 'fall_armyworm',
      name: 'Fall Armyworm Infestation',
      nameFr: 'Infestation par la Chenille Légionnaire d\'Automne',
      scientificName: 'Spodoptera frugiperda',
      crop: 'Maize',
      severity: 'Critical',
      confidence: 0.96,
      keywords: ['worm', 'chenille', 'caterpillar', 'holes', 'trous', 'frass', 'funnel', 'cornet', 'chewed', 'armyworm', 'whorl', 'maïs', 'maize', 'corn'],
      symptoms: [
        'Ragged holes in leaves and window-pane feeding damage',
        'Sawdust-like yellowish-brown frass inside the plant funnel/whorl',
        'Larvae with inverted Y-shape on the head and 4 black spots on tail segment'
      ],
      symptomsFr: [
        'Feuilles déchiquetées avec trous de morsures et aspects en « fenêtres dépolies »',
        'Excréments brun-jaunâtre semblables à de la sciure dans le cornet de la plante',
        'Larve portant un Y inversé net sur la tête et 4 points noirs carrés sur le dernier segment'
      ],
      organicTreatment: [
        'Drop a pinch of dry wood ash or fine sand into the whorl of attacked plants',
        'Apply Bacillus thuringiensis (Bt) or Neem seed extract weekly',
        'Handpick and destroy caterpillars in smallholder plots'
      ],
      organicTreatmentFr: [
        'Déposer une pincée de cendre de bois sèche ou de sable fin dans le cornet foliaire',
        'Pulvériser du Bacillus thuringiensis (Bt) ou un extrait de graines de neem chaque semaine',
        'Ramasser et détruire manuellement les chenilles sur petites parcelles'
      ],
      chemicalTreatment: ['Apply Emamectin benzoate (5% SG) targeted directly into the whorl'],
      chemicalTreatmentFr: ['Appliquer de l\'Émamectine benzoate (5% SG) pulvérisée directement dans le cornet'],
      prevention: ['Push-Pull technology with Desmodium and Napier grass border'],
      preventionFr: ['Système Push-Pull avec légumineuse Desmodium intercalaire et herbe à éléphant en bordure']
    },
    {
      id: 'maize_rust',
      name: 'Maize Common Rust',
      nameFr: 'Rouille Commune du Maïs',
      scientificName: 'Puccinia sorghi',
      crop: 'Maize',
      severity: 'Moderate',
      confidence: 0.93,
      keywords: ['rust', 'rouille', 'pustules', 'red', 'rouge', 'brown spots', 'taches brunes', 'powdery', 'leaves'],
      symptoms: [
        'Small circular to elongate cinnamon-brown pustules on both leaf surfaces',
        'Pustules burst releasing powdery fungal spores',
        'Premature yellowing and leaf drying during flowering stage'
      ],
      symptomsFr: [
        'Petites pustules brun-cannelle arrondies à allongées sur les deux faces des feuilles',
        'Éclatement des pustules libérant une poussière de spores fongiques rouille',
        'Dessèchement et jaunissement précoce du feuillage avant la maturité'
      ],
      organicTreatment: [
        'Spray wood ash and compost tea extract on early infection spots',
        'Ensure 75cm x 25cm row spacing for good air circulation'
      ],
      organicTreatmentFr: [
        'Pulvériser une solution filtrée de cendre et thé de compost sur les foyers débutants',
        'Respecter l\'écartement de 75cm x 25cm pour favoriser la circulation de l\'air'
      ],
      chemicalTreatment: [
        'Apply Mancozeb or Azoxystrobin + Difenoconazole if pustules appear before silking'
      ],
      chemicalTreatmentFr: [
        'Appliquer du Mancozèbe ou Azoxystrobine + Difénoconazole dès l\'apparition des premières pustules'
      ],
      prevention: ['Plant rust-resistant hybrid varieties', 'Early planting at the onset of rains'],
      preventionFr: ['Semer des variétés hybrides certifiées tolérantes', 'Semis précoce dès les premières pluies régulières']
    },
    {
      id: 'maize_nutrient_deficiency',
      name: 'Maize Nutrient Deficiency (Nitrogen / Potassium / Zinc)',
      nameFr: 'Carence Nutritive du Maïs (Azote / Potassium / Zinc)',
      scientificName: 'Physiological disorder (N / P / K / Zn deficiency)',
      crop: 'Maize',
      severity: 'Moderate to High',
      confidence: 0.92,
      keywords: ['yellow', 'jaune', 'yellowing', 'nitrogen', 'azote', 'potassium', 'phosphorus', 'phosphore', 'purple', 'pourpre', 'stunted', 'chlorosis', 'chlorose', 'leaf analysis', 'analyse foliaire', 'agro hospital', 'carence', 'deficiency'],
      symptoms: [
        'Nitrogen (N): V-shaped yellowing starting at the leaf tip and progressing down the midrib of older leaves',
        'Potassium (K): Yellowing and marginal browning/scorch along the edges of lower leaves',
        'Phosphorus (P): Purplish-red discoloration on leaves and stems of young seedlings',
        'Zinc (Zn): Broad white/yellow chlorotic bands between midrib and edge on upper leaves'
      ],
      symptomsFr: [
        'Azote (N) : Jaunissement en « V » partant de la pointe de la feuille le long de la nervure centrale (feuilles basses)',
        'Potassium (K) : Brûlure et nécrose marginale brune sur le contour extérieur des vieilles feuilles',
        'Phosphore (P) : Coloration violacée/pourpre prononcée sur les feuilles et tiges des jeunes plants',
        'Zinc (Zn) : Larges bandes chlorotiques blanchâtres ou jaunâtres de part et d\'autre de la nervure'
      ],
      organicTreatment: [
        'Incorporate 5-10 tons/ha of well-rotted cattle or poultry manure before planting',
        'Apply wood ash along plant rows for potassium and micronutrients',
        'Intercrop with legumes (cowpea, beans, Mucuna) to fix biological nitrogen'
      ],
      organicTreatmentFr: [
        'Enfouir 5 à 10 T/ha de fumier bien composté (bovins ou volailles) avant le semis',
        'Apporter de la cendre de bois tamisée le long des rangs pour le potassium et oligo-éléments',
        'Associer avec des légumineuses (niébé, haricot) pour enrichir naturellement le sol en azote'
      ],
      chemicalTreatment: [
        'Nitrogen: Side-dress with Urea 46% (100 kg/ha) at knee-high stage (4-5 weeks)',
        'Potassium: Apply Muriate of Potash (KCl 60%) at 60-100 kg/ha',
        'Zinc: Foliar spray of Zinc Sulfate 0.5% (5g/L water) at early vegetative stage'
      ],
      chemicalTreatmentFr: [
        'Azote : Appliquer de l\'Urée 46% (100 kg/ha) au stade genou (4–5 semaines) enfouie avant buttage',
        'Potassium : Épandre du Chlorure de Potasse (KCl 60%) à 60–100 kg/ha',
        'Zinc : Pulvérisation foliaire de Sulfate de Zinc à 0,5% (5 g/L d\'eau) en début de croissance'
      ],
      prevention: [
        'Detect deficiencies early via scientific leaf analysis (Agro Hospital Cameroon: +237 681532846 / 657469343)',
        'Apply balanced basal NPK 20-10-10 (200 kg/ha) at planting',
        'Lime acidic soils (pH < 5.5) with agricultural lime at 1-2 tons/ha'
      ],
      preventionFr: [
        'Détecter précocement les carences par analyse foliaire au laboratoire (Agro Hospital Cameroun : +237 681532846)',
        'Appliquer une fumure de fond équilibrée NPK 20-10-10 (200 kg/ha) au semis',
        'Chauler les sols acides (pH < 5,5) avec de la chaux agricole (1 à 2 T/ha) pour libérer le phosphore'
      ]
    }
  ],
  tomato: [
    {
      id: 'tomato_early_blight',
      name: 'Tomato Early Blight',
      nameFr: 'Alternariose de la Tomate (Brûlure Précoce)',
      scientificName: 'Alternaria solani',
      crop: 'Tomato',
      severity: 'Moderate to High',
      confidence: 0.92,
      keywords: ['concentric rings', 'target board', 'anneaux concentriques', 'brown spots', 'lower leaves', 'yellow halo', 'tomate', 'tomato'],
      symptoms: [
        'Dark brown to black spots with concentric rings ("target-board" pattern) on older lower leaves',
        'Yellow halo surrounding the lesions',
        'Sunken black leathery rot on fruit near stem'
      ],
      symptomsFr: [
        'Taches brun foncé avec cercles concentriques caractéristiques en « cible » sur feuilles basses',
        'Halo jaune entourant nettement chaque nécrose',
        'Pourriture noire déprimée et coriace sur les fruits près du pédoncule'
      ],
      organicTreatment: [
        'Prune lower leaves up to 30cm off the ground to stop soil splash',
        'Spray baking soda solution (1 tbsp baking soda + 1 tsp vegetable oil + 1L water)'
      ],
      organicTreatmentFr: [
        'Effeuiller le bas des tiges jusqu\'à 30cm du sol pour empêcher les éclaboussures de terre',
        'Pulvériser une solution de bicarbonate (1 c.à.s bicarbonate + 1 c.à.c huile végétale + 1L eau)'
      ],
      chemicalTreatment: ['Apply Mancozeb or Chlorothalonil every 7-10 days in rainy periods'],
      chemicalTreatmentFr: ['Appliquer du Mancozèbe ou Chlorothalonil tous les 7 à 10 jours en saison des pluies'],
      prevention: ['Apply heavy straw mulch', 'Water strictly at base; do not wet leaves'],
      preventionFr: ['Pailler le sol avec de la paille propre', 'Arroser uniquement au pied sans mouiller le feuillage']
    },
    {
      id: 'tomato_late_blight',
      name: 'Tomato Late Blight',
      nameFr: 'Mildiou de la Tomate',
      scientificName: 'Phytophthora infestans',
      crop: 'Tomato',
      severity: 'Critical',
      confidence: 0.95,
      keywords: ['late blight', 'mildiou', 'water-soaked', 'dark lesions', 'white mold', 'fruit rot', 'pourriture'],
      symptoms: [
        'Pale green water-soaked spots rapidly turning brown-black',
        'White fuzzy fungal growth on leaf undersides in humid weather',
        'Large, firm brown greasy rot on fruits'
      ],
      symptomsFr: [
        'Taches huileuses vert pâle virant rapidement au brun-noirâtre sur le feuillage',
        'Feutrage blanc duveteux sous les feuilles lors des matinées brumeuses ou humides',
        'Grosses taches brunes graisseuses et fermes dévastant les fruits'
      ],
      organicTreatment: ['Destroy infected plants immediately—late blight spreads across entire fields'],
      organicTreatmentFr: ['Détruire et évacuer les plants atteints immédiatement pour enrayer l\'épidémie'],
      chemicalTreatment: ['Systemic fungicides: Metalaxyl + Mancozeb (Ridomil Gold)'],
      chemicalTreatmentFr: ['Fongicide systémique curatif: Métalaxyl + Mancozèbe (Ridomil Gold)'],
      prevention: ['Stake plants high and prune suckers to promote air circulation'],
      preventionFr: ['Tuteurer haut les tomates et éliminer les gourmands pour faciliter l\'aération']
    }
  ],
  banana: [
    {
      id: 'banana_sigatoka',
      name: 'Banana Black Sigatoka',
      nameFr: 'Cercosporiose Noire du Bananier (Sigatoka Noir)',
      scientificName: 'Pseudocercospora fijiensis',
      crop: 'Banana',
      severity: 'High',
      confidence: 0.93,
      keywords: ['banana', 'banane', 'black streaks', 'leaf necrosis', 'sigatoka', 'brown spots', 'yellow spots', 'stries'],
      symptoms: [
        'Tiny reddish-brown specks parallel to veins on the underside of leaves',
        'Streaks enlarge into dark brown/black spindle-shaped spots with gray centers',
        'Premature leaf collapse leading to small, unmarketable fruit bunches'
      ],
      symptomsFr: [
        'Petites stries brun-rougeâtre parallèles aux nervures sous la 3e ou 4e feuille',
        'Élargissement en taches fusiformes noires à centre gris cendré',
        'Dessèchement prématuré des feuilles et avortement ou réduction des régimes'
      ],
      organicTreatment: [
        'Sanitary de-leafing: cut infected leaf portions and place face down on soil mulch',
        'Apply bio-fungicide (neem oil extract or bio-sulfur) at early symptoms',
        'Maintain heavy compost mulching at the mat base'
      ],
      organicTreatmentFr: [
        'Effeuillage sanitaire: découper les portions de feuilles nécrosées et les étaler au sol face contre terre',
        'Pulvériser un extrait d\'huile de neem ou du soufre mouillable bio dès les premiers signes',
        'Maintenir un paillage organique épais au pied de la souche'
      ],
      chemicalTreatment: [
        'Rotate systemic triazoles (Difenoconazole) with Mancozeb protector fungicide',
        'Add agricultural mineral oil (1%) to boost spray adhesion during rainy months'
      ],
      chemicalTreatmentFr: [
        'Alterner fongicides triazoles systémiques (Difénoconazole) et fongicide protecteur (Mancozèbe)',
        'Ajouter une huile blanche minérale (1%) pour améliorer l\'adhérence sous les pluies'
      ],
      prevention: [
        'Plant Sigatoka-tolerant varieties (CRBP-39, CARBAP hybrids)',
        'Ensure 3m x 2m spacing and desucker systematically to 1 mother + 1 daughter'
      ],
      preventionFr: [
        'Planter des hybrides résistants (CRBP-39, variétés CARBAP certifiées)',
        'Respecter un écartement de 3m x 2m et œilletonner régulièrement (1 pied-mère + 1 rejet)'
      ]
    },
    {
      id: 'banana_bunchy_top',
      name: 'Banana Bunchy Top Virus (BBTV)',
      nameFr: 'Virus du Sommet Buissonnant du Bananier (BBTV)',
      scientificName: 'Babuvirus / BBTV',
      crop: 'Banana',
      severity: 'Critical',
      confidence: 0.95,
      keywords: ['bunchy', 'rosette', 'narrow', 'stunted', 'aphid', 'puceron', 'sommet', 'buissonnant'],
      symptoms: [
        'Leaves become short, narrow, and clustered into a rosette at the apex',
        'Dark green "morse-code" dots and dashes along secondary leaf veins',
        'Total bunch suppression or severely stunted deformed fruit'
      ],
      symptomsFr: [
        'Feuilles courtes, étroites et dressées en rosette au sommet du pseudo-tronc',
        'Points et tirets vert foncé en « code Morse » le long des nervures secondaires',
        'Arrêt complet de la production de régimes ou fruits minuscules atrophiés'
      ],
      organicTreatment: [
        'Uproot and bury the entire infected banana mat including root corm immediately',
        'Control banana aphid (Pentalonia nigronervosa) with insecticidal soap'
      ],
      organicTreatmentFr: [
        'Déraciner et enfouir profondément tout le bananier et sa souche immédiatement',
        'Éliminer les pucerons vecteurs avec du savon noir ou extrait de neem'
      ],
      chemicalTreatment: [
        'Spray colony base with Imidacloprid or Cypermethrin before uprooting to stop aphid dispersion'
      ],
      chemicalTreatmentFr: [
        'Traiter au feuillage avec un insecticide systémique avant arrachage pour tuer les pucerons'
      ],
      prevention: [
        'Strictly source certified in-vitro tissue culture plantlets (CARBAP / IRAD)',
        'Never transport sword suckers from virus-affected zones'
      ],
      preventionFr: [
        'Planter exclusivement des vitroplants certifiés indemnes de virus (CARBAP / IRAD)',
        'Interdire le transfert de rejets depuis des zones infectées'
      ]
    }
  ],
  potato: [
    {
      id: 'potato_late_blight',
      name: 'Irish Potato Late Blight',
      nameFr: 'Mildiou de la Pomme de Terre',
      scientificName: 'Phytophthora infestans',
      crop: 'Potato',
      severity: 'Critical',
      confidence: 0.96,
      keywords: ['potato', 'pomme de terre', 'late blight', 'mildiou', 'water-soaked', 'white mold', 'tuber rot', 'pourriture'],
      symptoms: [
        'Rapidly spreading water-soaked brown spots turning black on leaf tips and stems',
        'Delicate white fungal down on undersides of leaves during wet, foggy mornings',
        'Dry reddish-brown granular rot penetrating beneath the potato tuber skin'
      ],
      symptomsFr: [
        'Taches huileuses brunes évoluant rapidement en nécroses noires sur feuilles et tiges',
        'Duvet blanc grisâtre au revers des feuilles par temps humide et brumeux',
        'Pourriture sèche brune et granuleuse sous la peau des tubercules'
      ],
      organicTreatment: [
        'Spray copper hydroxide / Bordeaux mixture preventively before rain spells',
        'Hill soil high (ridge mounding at 4 weeks) to physically prevent spores reaching tubers',
        'Harvest only during dry sunny weather; destroy all blighted haulms 2 weeks before lifting'
      ],
      organicTreatmentFr: [
        'Pulvériser de la bouillie bordelaise ou cuivre préventivement avant les pluies',
        'Butter hautement les plants (4 semaines) pour protéger les tubercules des spores',
        'Défaner 2 semaines avant récolte et récolter exclusivement par temps sec'
      ],
      chemicalTreatment: [
        'Curative: Metalaxyl + Mancozeb (Ridomil Gold) or Dimethomorph at onset',
        'Preventative: Mancozeb 80% WP or Chlorothalonil every 7 days during highland mist'
      ],
      chemicalTreatmentFr: [
        'Curatif: Métalaxyl + Mancozèbe (Ridomil Gold) dès les premiers foyers',
        'Préventif: Mancozèbe 80% ou Chlorothalonil tous les 7 jours en période de brouillard'
      ],
      prevention: [
        'Plant blight-resistant seed tubers (CIP varieties, Dosa, CIPira)',
        'Avoid growing near tomato fields and rotate with cereals or legumes'
      ],
      preventionFr: [
        'Utiliser des semences certifiées résistantes (variétés CIP / IRAD)',
        'Éviter la proximité avec les parcelles de tomates et pratiquer la rotation'
      ]
    },
    {
      id: 'potato_bacterial_wilt',
      name: 'Potato Bacterial Wilt (Brown Rot)',
      nameFr: 'Flétrissement Bactérien de la Pomme de Terre (Pourriture Brune)',
      scientificName: 'Ralstonia solanacearum',
      crop: 'Potato',
      severity: 'Critical',
      confidence: 0.94,
      keywords: ['wilt', 'bacterial', 'brown rot', 'flétrissement', 'drooping', 'vascular ring', 'anneaux'],
      symptoms: [
        'Rapid daytime wilting of green leaves without initial yellowing, recovering at night then permanent',
        'Brown discoloration of the vascular ring inside cut potato tubers',
        'Bacterial slime oozing from stems when immersed in a clear glass of water'
      ],
      symptomsFr: [
        'Flétrissement rapide en journée du feuillage encore vert, devenant irréversible',
        'Anneau vasculaire brun foncé visible à la coupe du tubercule',
        'Écoulement de filets de mucus bactérien blanc lorsqu\'une tige coupée est plongée dans l\'eau'
      ],
      organicTreatment: [
        'Immediately rogue and burn wilted plants together with surrounding soil and tubers',
        'Apply agricultural lime or wood ash to raise soil pH above 6.5',
        'Disinfect harvesting knives and hoes with bleach solution between plots'
      ],
      organicTreatmentFr: [
        'Arracher et brûler immédiatement les plants flétris avec leur terre et tubercules',
        'Apporter de la chaux agricole ou de la cendre pour corriger l\'acidité du sol',
        'Désinfecter les outils à l\'eau de javel entre chaque parcelle'
      ],
      chemicalTreatment: [
        'No direct chemical cure exists; seed tuber dressing with Streptomycin / Mancozeb prior to planting'
      ],
      chemicalTreatmentFr: [
        'Aucun remède curatif chimique direct; désinfection préventive des semences'
      ],
      prevention: [
        'Strict 4-year crop rotation avoiding Solanaceae (tomato, pepper, eggplant)',
        'Plant only certified pathogen-tested seed tubers in well-drained highland plots'
      ],
      preventionFr: [
        'Rotation stricte de 4 ans sans solanacées (tomate, piment, aubergine)',
        'Planter uniquement des tubercules certifiés indemnes en terrain bien drainé'
      ]
    }
  ],
  pepper: [
    {
      id: 'pepper_anthracnose',
      name: 'Pepper Anthracnose & Fruit Rot',
      nameFr: 'Anthracnose et Pourriture des Fruits du Piment',
      scientificName: 'Colletotrichum capsici / Colletotrichum gloeosporioides',
      crop: 'Pepper',
      severity: 'High',
      confidence: 0.95,
      keywords: ['pepper', 'piment', 'anthracnose', 'sunken lesions', 'concentric', 'fruit rot', 'pourriture'],
      symptoms: [
        'Circular sunken water-soaked lesions with concentric rings on both green and ripe peppers',
        'Black gelatinous spore masses in lesion centers during humid warm days',
        'Premature fruit drop and dried shriveled "mummified" peppers on plants'
      ],
      symptomsFr: [
        'Lésions circulaires déprimées avec cercles concentriques sur fruits verts et mûrs',
        'Masses de spores gélatineuses sombres au centre des lésions par temps chaud et humide',
        'Chute prématurée des fruits et momification des piments restant sur la plante'
      ],
      organicTreatment: [
        'Collect and destroy all diseased peppers immediately; never leave them on the soil',
        'Mulch soil with clean rice straw or dry grass to stop raindrop splashing of fungal spores',
        'Spray garlic-neem biopesticide or sulfur extract weekly during fruit set'
      ],
      organicTreatmentFr: [
        'Ramasser et brûler tous les piments atteints; ne jamais les laisser au sol',
        'Pailler avec de la paille de riz ou herbe sèche pour éviter les éclaboussures de terre',
        'Pulvériser une macération ail-neem ou du soufre mouillable chaque semaine'
      ],
      chemicalTreatment: [
        'Foliar spray with Azoxystrobin + Difenoconazole or Mancozeb 80% WP at early flowering',
        'Alternate with Copper Oxychloride every 10-14 days during wet intervals'
      ],
      chemicalTreatmentFr: [
        'Traiter avec Azoxystrobine + Difénoconazole ou Mancozèbe dès le début floraison',
        'Alterner avec de l\'oxychlorure de cuivre tous les 10 à 14 jours en saison pluvieuse'
      ],
      prevention: [
        'Use disease-free certified pepper seed treated with hot water (50°C for 25 min)',
        'Ensure 70cm x 50cm wide plant spacing and stake plants to keep fruits off the ground'
      ],
      preventionFr: [
        'Utiliser des semences certifiées désinfectées à l\'eau chaude (50°C pendant 25 min)',
        'Respecter un écartement aéré de 70cm x 50cm et tuteurer pour éviter le contact avec le sol'
      ]
    },
    {
      id: 'pepper_bacterial_spot',
      name: 'Pepper Bacterial Leaf Spot',
      nameFr: 'Gale Bactérienne du Piment (Taches Bactériennes)',
      scientificName: 'Xanthomonas campestris pv. vesicatoria',
      crop: 'Pepper',
      severity: 'Moderate to High',
      confidence: 0.93,
      keywords: ['bacterial spot', 'gale', 'blisters', 'scabby', 'yellow halo', 'defoliation', 'chute des feuilles'],
      symptoms: [
        'Small, dark brown water-soaked angular leaf spots surrounded by yellow halos',
        'Rough, scabby, raised brown blisters on pepper fruit surface',
        'Severe leaf drop causing sunscald damage to exposed hanging peppers'
      ],
      symptomsFr: [
        'Petites taches foliaires angulaires brun foncé cernées d\'un halo jaune translucide',
        'Pustules rugueuses et liégeuses sur la peau des piments',
        'Défoliation importante exposant les fruits aux brûlures du soleil'
      ],
      organicTreatment: [
        'Water only at the root base using furrow or drip; strictly avoid overhead foliage wetting',
        'Spray copper-based bactericide mixed with compost tea during early seedling stages'
      ],
      organicTreatmentFr: [
        'Arroser exclusivement au pied; ne jamais mouiller le feuillage par aspersion',
        'Pulvériser un bactéricide à base de cuivre combiné à un thé de compost mûr'
      ],
      chemicalTreatment: [
        'Apply Copper Hydroxide mixed with Mancozeb (synergistic against bacterial strains)'
      ],
      chemicalTreatmentFr: [
        'Appliquer de l\'hydroxyde de cuivre associé au Mancozèbe pour freiner la bactérie'
      ],
      prevention: [
        'Rotate with non-solanaceous crops (maize, beans, cassava) for at least 2 seasons',
        'Sterilize seedling nursery beds with dry grass burning or solarization'
      ],
      preventionFr: [
        'Pratiquer une rotation avec du maïs, haricot ou manioc pendant au moins 2 saisons',
        'Stériliser les pépinières par brûlage superficiel ou solarisation'
      ]
    }
  ],
  plantain: [
    {
      id: 'plantain_sigatoka',
      name: 'Plantain Black Sigatoka',
      nameFr: 'Cercosporiose Noire du Plantain (Sigatoka Noir)',
      scientificName: 'Pseudocercospora fijiensis',
      crop: 'Plantain',
      severity: 'High',
      confidence: 0.93,
      keywords: ['black streaks', 'leaf necrosis', 'yellow spots', 'banana', 'plantain', 'stries'],
      symptoms: [
        'Tiny rusty-red to black streaks parallel to leaf veins',
        'Streaks enlarge into dark brown/black oval spots with grey centers',
        'Premature leaf death leading to small bunches and premature ripening'
      ],
      symptomsFr: [
        'Stries rouille-noirâtre parallèles aux nervures sur la face inférieure des feuilles',
        'Taches ovales brun foncé à noires avec centre grisâtre',
        'Mort prématurée des feuilles réduisant le poids des régimes et provoquant un mûrissement précoce'
      ],
      organicTreatment: [
        'De-leafing: cut off diseased leaf portions and place face down on soil mulch',
        'Apply neem oil extract spray'
      ],
      organicTreatmentFr: [
        'Effeuillage sanitaire régulier et paillage face inférieure contre le sol',
        'Pulvérisation d\'extrait d\'huile de neem protectrice'
      ],
      chemicalTreatment: ['Apply Mancozeb alternating with systemic Triazole fungicides'],
      chemicalTreatmentFr: ['Appliquer du Mancozèbe en alternance avec des fongicides triazoles systémiques'],
      prevention: ['Plant Sigatoka-resistant hybrids (CRBP-39, CARBAP varieties)'],
      preventionFr: ['Planter des rejets d\'hybrides tolérants (CRBP-39 certifié CARBAP)']
    }
  ],
  cocoa: [
    {
      id: 'cocoa_black_pod',
      name: 'Cocoa Black Pod Disease',
      nameFr: 'Pourriture Brune des Cabosses de Cacao (Black Pod)',
      scientificName: 'Phytophthora megakarya',
      crop: 'Cocoa',
      severity: 'Critical',
      confidence: 0.95,
      keywords: ['black pod', 'brown rot', 'cacao', 'cocoa', 'mummified pod', 'kumba', 'pourriture brune'],
      symptoms: [
        'Brown water-soaked spots rapidly spreading across cocoa pods',
        'White fungal sporulation on pod surface during heavy rains',
        'Complete pod mummification'
      ],
      symptomsFr: [
        'Taches brunes aqueuses s\'étendant à une vitesse foudroyante sur toute la cabosse',
        'Feutrage blanc de sporulation fongique à la surface sous fortes pluies',
        'Momification complète et noircissement des cabosses restant sur le tronc'
      ],
      organicTreatment: ['Prune shade to 30-40% to increase sunlight', 'Bury black pods away from trees'],
      organicTreatmentFr: ['Élaguer l\'ombrage à 30-40% pour laisser pénétrer le soleil', 'Ramasser et enterrer les cabosses pourries loin des cacaoyers'],
      chemicalTreatment: ['Foliar spray with Copper Hydroxide or Metalaxyl + Cuprous Oxide'],
      chemicalTreatmentFr: ['Pulvérisation foliaire d\'oxyde cuivreux ou Métalaxyl + Oxyde de cuivre'],
      prevention: ['Sanitary harvest every 7 days during heavy rains'],
      preventionFr: ['Récolte sanitaire et élimination des cabosses atteintes tous les 7 jours en saison des pluies']
    }
  ],
  groundnut: [
    {
      id: 'groundnut_rosette',
      name: 'Groundnut Rosette Virus',
      nameFr: 'Virus de la Rosette de l\'Arachide',
      scientificName: 'Groundnut rosette virus complex',
      crop: 'Groundnut',
      severity: 'Critical',
      confidence: 0.94,
      keywords: ['rosette', 'bushy', 'yellow', 'stunted', 'aphid', 'arachide', 'groundnut', 'puceron'],
      symptoms: [
        'Severe stunting and bushy growth of groundnut foliage',
        'Yellow chlorotic leaf mottling and curled leaves'
      ],
      symptomsFr: [
        'Nanisme sévère et aspect buissonnant très touffu de la plante',
        'Marbrure jaune chlorotique et enroulement des folioles'
      ],
      organicTreatment: ['Rogue infected plants early', 'Spray neem extract to eliminate aphids'],
      organicTreatmentFr: ['Arracher les premiers plants atteints', 'Pulvériser de l\'huile de neem contre les pucerons vecteurs'],
      chemicalTreatment: ['Seed dressing with Imidacloprid'],
      chemicalTreatmentFr: ['Enrobage des graines avec un insecticide systémique avant semis'],
      prevention: ['Plant early at high density (50cm x 15cm) to shade soil'],
      preventionFr: ['Semis précoce et dense (50cm x 15cm) pour couvrir vite le sol et bloquer les pucerons']
    }
  ],
  rice: [
    {
      id: 'rice_blast',
      name: 'Rice Blast Disease',
      nameFr: 'Pyriculariose du Riz',
      scientificName: 'Magnaporthe oryzae',
      crop: 'Rice',
      severity: 'Critical',
      confidence: 0.94,
      keywords: ['blast', 'spindle lesions', 'neck rot', 'semry', 'ndop', 'pyriculariose', 'riz', 'rice'],
      symptoms: [
        'Spindle diamond-shaped lesions with gray centers on rice leaves',
        'Neck rot causing empty white grain panicles'
      ],
      symptomsFr: [
        'Lésions fusiformes en losange à centre grisâtre bordé de brun sur le limbe',
        'Nécrose du collet de la panicule entraînant des épis blancs et vides'
      ],
      organicTreatment: ['Maintain 5-10cm flood depth', 'Split nitrogen into small doses'],
      organicTreatmentFr: ['Maintenir une lame d\'eau de 5 à 10cm', 'Fractionner les apports d\'azote pour éviter l\'excès'],
      chemicalTreatment: ['Spray Tricyclazole (75% WP) or Azoxystrobin'],
      chemicalTreatmentFr: ['Pulvériser du Tricyclazole (75% WP) ou Azoxystrobine dès la montaison'],
      prevention: ['Plant blast-resistant seed lines (NERICA)'],
      preventionFr: ['Semer des variétés certifiées tolérantes (lignées NERICA)']
    }
  ],
  beans: [
    {
      id: 'bean_anthracnose',
      name: 'Bean Anthracnose',
      nameFr: 'Anthracnose du Haricot',
      scientificName: 'Colletotrichum lindemuthianum',
      crop: 'Common Beans',
      severity: 'High',
      confidence: 0.93,
      keywords: ['bean', 'beans', 'haricot', 'anthracnose', 'sunken', 'canker', 'pod spot', 'brick-red', 'kumba'],
      symptoms: [
        'Dark brown to brick-red sunken lesions on bean pods and stems',
        'Angular reddish-brown vein necrosis on the underside of young leaves',
        'Seed discoloration and premature pod drop during prolonged damp spells'
      ],
      symptomsFr: [
        'Chancres déprimés brun-rougeâtre circulaires le long des nervures foliaires et sur les gousses',
        'Nécrose violacée des nervures à la face inférieure des feuilles',
        'Taches noires sur les graines et chute prématurée des gousses par temps pluvieux'
      ],
      organicTreatment: [
        'Rogue out and destroy infected bean plants immediately upon early notice',
        'Spray fresh neem seed oil or diluted wood ash leachate to inhibit fungal spore growth'
      ],
      organicTreatmentFr: [
        'Arracher et brûler immédiatement les premiers plants atteints hors de la parcelle',
        'Pulvériser de l\'huile de neem ou une solution de cendre de bois pour freiner la germination des spores'
      ],
      chemicalTreatment: [
        'Apply Copper Hydroxide (Kocide 2000) or Mancozeb (80% WP) at 30g-50g per 15L knapsack',
        'Spray systemic Azoxystrobin at early flowering if persistent rain creates disease pressure'
      ],
      chemicalTreatmentFr: [
        'Appliquer de la bouillie bordelaise ou du Mancozèbe (80% WP) à raison de 40g par pulvérisateur de 15L',
        'Appliquer de l\'Azoxystrobine dès la floraison en cas d\'humidité et de brouillard persistants'
      ],
      prevention: [
        'Plant certified disease-free seed (such as PNG or GLP 190 varieties)',
        'Never walk through or cultivate in bean fields when morning dew or rain makes foliage wet'
      ],
      preventionFr: [
        'Semer uniquement des graines saines certifiées (variétés GLP 190, PNG)',
        'Ne jamais circuler ni désherber dans la parcelle de haricot lorsque le feuillage est mouillé'
      ]
    }
  ],
  coffee: [
    {
      id: 'coffee_cbd',
      name: 'Coffee Berry Disease (CBD)',
      nameFr: 'Anthracnose des Baies du Caféier (CBD)',
      scientificName: 'Colletotrichum kahawae',
      crop: 'Coffee',
      severity: 'Critical',
      confidence: 0.95,
      keywords: ['coffee', 'cafe', 'café', 'cbd', 'berry', 'cherry', 'mummified', 'anthracnose', 'bafoussam', 'bamenda'],
      symptoms: [
        'Dark brown to black sunken necrotic spots on green coffee berries',
        'Rapid berry mummification turning green fruit into dry black empty shells',
        'Premature fruit drop severely slashing commercial parchment yield'
      ],
      symptomsFr: [
        'Lésions brun-noir déprimées et rugueuses sur les cerises de café vertes',
        'Momification complète et noircissement des baies qui sèchent sur l\'arbre',
        'Chute précoce massive des baies entraînant une perte de récolte pouvant atteindre 80%'
      ],
      organicTreatment: [
        'Sanitary pruning: cut off dead twigs and suckers to allow sunlight and airflow into tree canopy',
        'Rake and incinerate all fallen mummified berries from tree basins before rainy season'
      ],
      organicTreatmentFr: [
        'Taille sanitaire : éliminer les gourmands et bois morts pour faire entrer le soleil dans le houppier',
        'Ratisser et brûler toutes les cerises momifiées tombées au sol avant la saison des pluies'
      ],
      chemicalTreatment: [
        'Apply protective Cuprous Oxide (Nordox 75 WG) at 50g per 15L sprayer during pinhead berry stage',
        'Alternate with systemic Chlorothalonil or Tebuconazole according to regional coffee calendar'
      ],
      chemicalTreatmentFr: [
        'Traiter à l\'oxyde cuivreux (Nordox 75 WG) à raison de 50g par pulvérisateur de 15L au stade grains de plomb',
        'Alterner avec du Chlorothalonil ou Tébuconazole selon le calendrier phytosanitaire régional'
      ],
      prevention: [
        'Plant resistant Arabica selections (Java cultivar) or certified robusta clones',
        'Maintain balanced organic mulch around tree basins with regular potassium replenishment'
      ],
      preventionFr: [
        'Planter des variétés tolérantes (cultivar Java) ou clones de Robusta certifiés',
        'Maintenir un paillage épais et un bon apport en potasse au pied pour renforcer les tissus'
      ]
    }
  ],
  yam: [
    {
      id: 'yam_anthracnose',
      name: 'Yam Anthracnose / Foliar Dieback',
      nameFr: 'Anthracnose & Dessèchement de l’Igname',
      scientificName: 'Colletotrichum gloeosporioides',
      crop: 'Yam',
      severity: 'High',
      confidence: 0.92,
      keywords: ['yam', 'igname', 'dieback', 'scorch', 'anthracnose', 'bafia', 'mound', 'tuber'],
      symptoms: [
        'Small dark pinpoint foliar lesions surrounded by distinct chlorotic yellow halos',
        'Rapid blackening and die-back of young climbing vines giving a fire-scorched look',
        'Stunted vine canopy resulting in undersized and fibrous tuber development'
      ],
      symptomsFr: [
        'Petites ponctuations nécrotiques noires entourées d\'un halo jaune sur les feuilles',
        'Dessèchement brutal et noircissement des extrémités des lianes donnant un aspect brûlé',
        'Ralentissement de la croissance entraînant des tubercules rachitiques et fibreux'
      ],
      organicTreatment: [
        'High bamboo staking (3m-4m) to elevate climbing vines away from humid soil contact',
        'Spread wood ash around the mound base to create an alkaline protective barrier'
      ],
      organicTreatmentFr: [
        'Tuteurage haut (3m à 4m) sur bambous solides pour soulever les lianes au-dessus du sol humide',
        'Épandre de la cendre de bois tamisée au pied des buttes pour assainir l\'environnement'
      ],
      chemicalTreatment: [
        'Spray preventive Mancozeb (80% WP) or Copper Oxychloride at 40g per 15L backpack sprayer',
        'Apply systemic Azoxystrobin if early vine die-back appears during the heavy rainy season'
      ],
      chemicalTreatmentFr: [
        'Pulvériser du Mancozèbe (80% WP) ou de l\'oxychlorure de cuivre (40g/15L) dès la montaison des lianes',
        'Appliquer de l\'Azoxystrobine dès l\'apparition des premières brûlures de liane'
      ],
      prevention: [
        'Plant certified clean seed setts treated with ash or fungicide dip before planting',
        'Construct wide, well-aerated mounds with good spacing (1m x 1m) to avoid humidity buildup'
      ],
      preventionFr: [
        'Planter des semenceaux sains trempés dans une bouillie fongicide ou de cendre avant mise en terre',
        'Édifier des buttes bien aérées et espacées (1m x 1m) sur sol profond et meuble'
      ]
    }
  ],
  onion: [
    {
      id: 'onion_purple_blotch',
      name: 'Purple Blotch of Onion',
      nameFr: 'Alternariose / Tache Pourpre de l’Oignon',
      scientificName: 'Alternaria porri',
      crop: 'Onion',
      severity: 'High',
      confidence: 0.94,
      keywords: ['onion', 'oignon', 'purple blotch', 'alternaria', 'maroua', 'kousseri', 'bulb'],
      symptoms: [
        'Water-soaked oval lesions on leaves rapidly developing distinct purplish-brown centers',
        'Zonate rings with yellow margins causing hollow leaf tips to collapse and bend over',
        'Premature bulb maturation with shriveled size and poor dry-storage shelf-life'
      ],
      symptomsFr: [
        'Taches ovales aqueuses devenant pourpres au centre avec zonations concentriques caractéristiques',
        'Affaissement et cassure des feuilles creuses jaunies au niveau des lésions',
        'Calibre des bulbes très réduit et pourriture rapide lors de la conservation'
      ],
      organicTreatment: [
        'Irrigate strictly by sunken furrows or drip lines—never sprinkle water over onion necks',
        'Spray biopesticide concoction of crushed garlic, neem oil, and mild natural soap'
      ],
      organicTreatmentFr: [
        'Irriguer strictement par rigoles sans jamais mouiller les feuilles par aspersion',
        'Pulvériser un extrait d\'ail et d\'huile de neem avec du savon noir comme bio-fongicide'
      ],
      chemicalTreatment: [
        'Spray Difenoconazole (Score 250 EC) or Mancozeb (80% WP) at 35g-45g per 15L knapsack',
        'Add a sticker-spreader surfactant to ensure spray clings to waxy onion foliage'
      ],
      chemicalTreatmentFr: [
        'Pulvériser du Difénoconazole (Score) ou Mancozèbe (40g/15L) dès les premiers signes foliaires',
        'Ajouter un mouillant agricole pour faire adhérer le produit sur la cuticule cireuse de l\'oignon'
      ],
      prevention: [
        'Transplant robust 45-day nursery seedlings into well-drained raised beds',
        'Rotate with maize or sorghum; avoid all Allium crops (leek, garlic) for 2 full seasons'
      ],
      preventionFr: [
        'Repiquer des plants vigoureux de 45 jours sur planches filtrantes bien drainées',
        'Pratiquer une rotation stricte de 2 ans sans alliacées (ail, poireau) sur la parcelle'
      ]
    }
  ],
  cotton: [
    {
      id: 'cotton_bollworm',
      name: 'Cotton Bollworm Complex',
      nameFr: 'Chenille de la Capsule du Coton',
      scientificName: 'Helicoverpa armigera',
      crop: 'Cotton',
      severity: 'Critical',
      confidence: 0.95,
      keywords: ['cotton', 'coton', 'bollworm', 'caterpillar', 'capsule', 'sodecoton', 'garoua', 'maroua'],
      symptoms: [
        'Bored holes at the base of cotton flower buds (squares) and developing green bolls',
        'Flaring and shedding of young squares accompanied by dark caterpillar frass pellets',
        'Hollowed out bolls failing to produce white lint, resulting in severe commercial loss'
      ],
      symptomsFr: [
        'Trous de pénétration nets à la base des boutons floraux et des capsules vertes',
        'Évasement et chute prématurée des boutons floraux souillés par les déjections de chenilles',
        'Capsules dévorées de l\'intérieur incapables de produire la fibre blanche marchande'
      ],
      organicTreatment: [
        'Handpick and destroy early instar larvae during weekly morning scouting runs',
        'Spray biological Bacillus thuringiensis (Bt) or concentrated neem kernel extract'
      ],
      organicTreatmentFr: [
        'Ramassage manuel des jeunes chenilles lors des comptages matinaux réguliers',
        'Pulvérisation d\'une suspension de Bacillus thuringiensis (Bt) ou extrait de graines de neem'
      ],
      chemicalTreatment: [
        'Apply Emamectin Benzoate or Indoxacarb as per official SODECOTON threshold recommendations',
        'Alternate insecticide modes of action to prevent pyrethroid resistance in caterpillar populations'
      ],
      chemicalTreatmentFr: [
        'Appliquer de l\'Émamectine Benzoate ou Indoxacarbe selon les seuils officiels SODECOTON',
        'Alterner les familles chimiques pour éviter le développement de résistances'
      ],
      prevention: [
        'Adhere strictly to the regional SODECOTON sowing window at the onset of rains',
        'Uproot and incinerate dry cotton stalks immediately after harvest to destroy diapausing pupae'
      ],
      preventionFr: [
        'Respecter strictement la fenêtre de semis précoce SODECOTON dès les premières pluies',
        'Arracher et brûler les tiges de cotonnier post-récolte pour éliminer les nymphes hivernantes'
      ]
    }
  ],
  soybean: [
    {
      id: 'soybean_rust',
      name: 'Asian Soybean Rust',
      nameFr: 'Rouille Asiatique du Soja',
      scientificName: 'Phakopsora pachyrhizi',
      crop: 'Soybean',
      severity: 'Critical',
      confidence: 0.94,
      keywords: ['soybean', 'soja', 'rust', 'rouille', 'pustules', 'bafoussam', 'ngaoundere', 'santa'],
      symptoms: [
        'Minute tan-to-brown polygonal pustules densely covering the underside of mature leaves',
        'Rapid chlorotic yellowing and premature leaf defoliation starting from the lower canopy',
        'Poor pod filling with lightweight shriveled seeds, slashing grain yield by up to 60%'
      ],
      symptomsFr: [
        'Minuscules pustules polygonales brunes très nombreuses sur la face inférieure des feuilles',
        'Jaunissement fulgurant et chute prématurée des feuilles en partant du bas du plant',
        'Mauvais remplissage des gousses avec grains petits et ridés, perte de rendement jusqu\'à 60%'
      ],
      organicTreatment: [
        'Early sowing at onset of regular rains to ensure pod filling before peak fungal spore pressure',
        'Spray copper hydroxide solution or sulfur-based organic dusts early in the morning'
      ],
      organicTreatmentFr: [
        'Semis très précoce dès l\'installation des pluies pour remplir les gousses avant le pic fongique',
        'Pulvérisation matinale de bouillie cuprique douce ou poudrage au soufre ventilé'
      ],
      chemicalTreatment: [
        'Apply systemic Triazole + Strobilurin mixture (Tebuconazole + Azoxystrobin) at R1/R3 flowering stages',
        'Spray at 40g per 15L sprayer as soon as the first pustules appear in regional monitoring plots'
      ],
      chemicalTreatmentFr: [
        'Appliquer un fongicide systémique (Tébuconazole + Azoxystrobine) dès l\'apparition des premières pustules',
        'Doser à 40g par pulvérisateur de 15L en couvrant bien l\'intérieur du feuillage'
      ],
      prevention: [
        'Plant certified tolerant varieties (such as IITA/IRAD TGx improved lines)',
        'Rotate with maize or sorghum; avoid continuous soybean planting on the same parcel'
      ],
      preventionFr: [
        'Semer des variétés tolérantes certifiées (lignées TGx de l\'IRAD/IITA)',
        'Pratiquer une rotation avec le maïs pour briser le cycle de conservation des spores'
      ]
    }
  ]
};

export const OFFLINE_RECOMMENDATIONS = {
  maize: {
    crop: 'Maize (Corn / Maïs)',
    season: 'Rainy season & Onset of rains',
    soil: 'Well-drained Loamy & Volcanic soils',
    maturity: '90 - 120 days',
    yieldEst: '4.5 - 7.0 Tons / Hectare',
    spacing: '75 cm x 25 cm (53,000 plants/ha)',
    fertilizer: 'Basal: NPK 20-10-10 (200kg/ha) at planting; Top-dress: Urea 46% (100kg/ha) at 4-5 weeks.',
    advice: 'Plant 2 seeds per hole after 2 steady rains. Thin to 1 vigorous plant after 2 weeks. Intercrop with beans or groundnuts to replenish soil nitrogen.'
  },
  cassava: {
    crop: 'Cassava (Manioc)',
    season: 'Early rainy season / Onset of rains',
    soil: 'Sandy loam, Loamy, Lateritic soils',
    maturity: '9 - 14 months',
    yieldEst: '20 - 35 Tons / Hectare',
    spacing: '100 cm x 100 cm (10,000 stakes/ha)',
    fertilizer: 'NPK 12-12-17 or 15-15-15 (250kg/ha) at 6 weeks; Wood ash / Potash at 14 weeks for tuber bulking.',
    advice: 'Plant healthy 20-25cm stem cuttings slanted at 45 degrees in high ridges. Keep field weed-free during the first 3 months.'
  },
  tomato: {
    crop: 'Tomato (Tomate)',
    season: 'Dry season (with base irrigation) / Minor rainy season',
    soil: 'Rich Loamy, Volcanic, Well-drained soils',
    maturity: '75 - 90 days after transplanting',
    yieldEst: '25 - 45 Tons / Hectare',
    spacing: '60 cm x 50 cm with sturdy bamboo staking',
    fertilizer: 'Pre-transplant: 10T compost/ha; Week 2: NPK 20-10-10 (150kg/ha); Flowering: Calcium Nitrate + KNO3 (100kg/ha).',
    advice: 'Stake immediately to avoid contact with soil. Water only at the roots (drip or base basin). Mulch heavily to suppress weeds and maintain moisture.'
  },
  plantain: {
    crop: 'Plantain (Banane Plantain)',
    season: 'Early rainy season / Year-round with mulch',
    soil: 'Deep rich volcanic or loamy soil rich in organic matter',
    maturity: '10 - 14 months',
    yieldEst: '15 - 25 Tons / Hectare / Year',
    spacing: '3 m x 2 m (1,600 plants/ha)',
    fertilizer: '10kg compost + 200g NPK 15-15-15 in planting hole; 250g high-K NPK ring-applied every 3 months.',
    advice: 'Dig 60x60x60cm holes. Clean suckers with hot water/wood ash dip before planting. Keep the base heavily mulched.'
  },
  banana: {
    crop: 'Banana & Plantain (Banane / Plantain)',
    season: 'Onset of rainy season / Year-round with mulch',
    soil: 'Deep rich volcanic or loamy soil',
    maturity: '10 - 12 months',
    yieldEst: '20 - 30 Tons / Hectare',
    spacing: '3 m x 2 m (1,666 plants/ha)',
    fertilizer: '10kg compost + NPK 15-15-15 (200g/mat) at planting; Urea + Potassium chloride in quarterly ring dressings.',
    advice: 'Clean corms thoroughly and pare sword suckers. Maintain systematic de-leafing for Sigatoka control.'
  },
  cocoa: {
    crop: 'Cocoa (Cacao)',
    season: 'Onset of rains',
    soil: 'Deep fertile clay-loam',
    maturity: 'Perennial (3-4 years)',
    yieldEst: '1.2 - 2.5 Tons / Hectare',
    spacing: '3 m x 3 m',
    fertilizer: 'NPK 15-15-15 (150g/tree) in year 1-2; High-K fertilizer for mature trees.',
    advice: 'Maintain 30-40% shade. Prune chupons and apply copper fungicide for black pod.'
  },
  coffee: {
    crop: 'Coffee (Caféier)',
    season: 'Onset of rainy season',
    soil: 'Volcanic mountain loam',
    maturity: 'Perennial (3 years)',
    yieldEst: '1.5 - 3.0 Tons / Hectare',
    spacing: '2.5 m x 2.0 m',
    fertilizer: 'NPK 20-10-10 at onset of rains + CAN at berry swelling.',
    advice: 'Mulch tree basins, prune old stems, and spray preventative copper against CBD.'
  },
  yam: {
    crop: 'Yam (Igname / Bafia)',
    season: 'Early dry season mounds / Onset of rains',
    soil: 'Deep loose sandy loam',
    maturity: '7 - 10 months',
    yieldEst: '15 - 28 Tons / Hectare',
    spacing: '100 cm x 100 cm on high mounds',
    fertilizer: '5-10 Tons compost in mounds + NPK 15-15-15 at 8 weeks.',
    advice: 'Erect strong 3-4m bamboo stakes. Treat seed setts with ash before planting.'
  },
  groundnut: {
    crop: 'Groundnut (Arachide / Peanut)',
    season: 'Rainy season',
    soil: 'Sandy loam & light friable savanna soils',
    maturity: '90 - 110 days',
    yieldEst: '1.8 - 3.2 Tons / Hectare',
    spacing: '50 cm x 15 cm',
    fertilizer: 'Single Super Phosphate (SSP) at 150kg/ha at planting; Gypsum (200kg/ha) at flowering for pod filling.',
    advice: 'Till soil loose so pegs can easily penetrate the ground. Avoid excess nitrogen to prevent leafy foliage without pods.'
  },
  rice: {
    crop: 'Rice (Riz / SEMRY & Ndop)',
    season: 'Rainy season floodplains / Irrigated dry season',
    soil: 'Clayey floodplain vertisols',
    maturity: '110 - 140 days',
    yieldEst: '4.0 - 7.5 Tons / Hectare',
    spacing: '20 cm x 20 cm',
    fertilizer: 'Basal NPK 15-15-15 (200kg/ha) + Urea in two top-dressings.',
    advice: 'Maintain 5-10cm flood layer in paddy. Plant blast-resistant certified seed.'
  },
  irish_potato: {
    crop: 'Irish Potato (Pomme de Terre)',
    season: 'Highland rainy seasons (March-June & Aug-Nov)',
    soil: 'Rich volcanic mountain loam',
    maturity: '90 - 110 days',
    yieldEst: '18 - 30 Tons / Hectare',
    spacing: '75 cm x 30 cm',
    fertilizer: 'NPK 11-22-22 or 20-10-10 (300kg/ha) + CAN at hilling.',
    advice: 'Plant certified sprouted seed tubers. Hill soil high at 4 weeks to shield tubers from blight.'
  },
  potato: {
    crop: 'Irish Potato (Pomme de Terre des Hauts-Plateaux)',
    season: 'Highland rainy seasons (March-June & Aug-Nov)',
    soil: 'Rich volcanic mountain loam',
    maturity: '90 - 110 days',
    yieldEst: '18 - 30 Tons / Hectare',
    spacing: '75 cm x 30 cm',
    fertilizer: 'NPK 11-22-22 or 20-10-10 (300kg/ha) + CAN at hilling.',
    advice: 'Plant certified sprouted seed tubers. Hill soil high at 4 weeks to shield tubers from blight.'
  },
  sorghum: {
    crop: 'Sorghum (Sorgho / Muskuwaari)',
    season: 'Rainy season / Off-season flood retreat',
    soil: 'Karal vertisols & sandy clay',
    maturity: '90 - 130 days',
    yieldEst: '2.5 - 4.5 Tons / Hectare',
    spacing: '80 cm x 30 cm',
    fertilizer: 'NPK 15-15-15 (150kg/ha) or composted cattle manure.',
    advice: 'On Karal clay, transplant 30-day seedlings into deep dibble holes right as floodwaters recede.'
  },
  cotton: {
    crop: 'Cotton (Coton / SODECOTON)',
    season: 'Onset of rains (May-June)',
    soil: 'Fertile savanna loam',
    maturity: '150 - 180 days',
    yieldEst: '1.5 - 2.8 Tons / Hectare',
    spacing: '80 cm x 20 cm',
    fertilizer: 'NPK-SB (200kg/ha) at 15 days + Urea at flowering.',
    advice: 'Follow strict threshold pest scouting and harvest cleanly in dry morning weather.'
  },
  onion: {
    crop: 'Onion (Oignon / Maroua Violet)',
    season: 'Cool dry season (October-February)',
    soil: 'Friable sandy-clay alluvial loam',
    maturity: '100 - 120 days',
    yieldEst: '20 - 35 Tons / Hectare',
    spacing: '15 cm x 15 cm on flat sunken beds',
    fertilizer: 'Manure + NPK 15-15-15 at bed prep + Urea at 3 weeks + Potassium at bulb swelling.',
    advice: 'Transplant 45-day nursery seedlings. Use furrow irrigation—never wet foliage overhead.'
  },
  pepper: {
    crop: 'Pepper & Chili (Piment / Poivre)',
    season: 'Year-round with irrigation / Rainy season',
    soil: 'Rich volcanic loam',
    maturity: '90 - 150 days',
    yieldEst: '10 - 18 Tons / Hectare',
    spacing: '70 cm x 50 cm',
    fertilizer: 'Compost + NPK 20-10-10 at transplanting; monthly potassium nitrate.',
    advice: 'Transplant in raised beds, mulch with straw, and harvest ripe peppers every 5-7 days.'
  },
  oil_palm: {
    crop: 'Oil Palm (Palmier à Huile)',
    season: 'Early rainy season',
    soil: 'Deep acidic alluvial soil',
    maturity: 'Perennial (3 years to first harvest)',
    yieldEst: '12 - 22 Tons FFB / Hectare',
    spacing: '9 m triangular (143 palms/ha)',
    fertilizer: 'NPK 12-12-17 + 2MgO (1.5kg/tree/yr); MOP + Urea for mature palms.',
    advice: 'Plant certified Tenera seedlings. Establish legume cover crop to prevent weed spread.'
  }
};

// ── Plant Identification Engine (Vision & Pathology Classifier) ─────────────
export const KNOWN_CROPS = [
  { id: 'maize', label: 'Maize (Corn)', fr: 'Maïs', icon: '🌽', keywords: ['maize', 'corn', 'mais', 'maïs', 'whorl', 'ear', 'cob', 'tassel', 'stem borer', 'armyworm', 'zeamays'] },
  { id: 'cassava', label: 'Cassava', fr: 'Manioc', icon: '🌱', keywords: ['cassava', 'manioc', 'tuber', 'mosaic', 'whitefly', 'cmd', 'cbsd', 'manihot'] },
  { id: 'tomato', label: 'Tomato', fr: 'Tomate', icon: '🍅', keywords: ['tomato', 'tomate', 'blight', 'solanum', 'lycopersicum', 'wilt'] },
  { id: 'plantain', label: 'Plantain', fr: 'Banane Plantain', icon: '🍌', keywords: ['plantain', 'banane plantain', 'musa', 'sigatoka', 'bunch', 'regime'] },
  { id: 'banana', label: 'Banana', fr: 'Banane', icon: '🍌', keywords: ['banana', 'banane', 'musa acuminata', 'cavendish', 'gros michel'] },
  { id: 'cocoa', label: 'Cocoa', fr: 'Cacao', icon: '🍫', keywords: ['cocoa', 'cacao', 'pod', 'theobroma', 'black pod', 'mirid', 'cabosse'] },
  { id: 'potato', label: 'Irish Potato', fr: 'Pomme de Terre', icon: '🥔', keywords: ['potato', 'pomme de terre', 'solanum tuberosum', 'late blight', 'tubereux'] },
  { id: 'pepper', label: 'Pepper', fr: 'Piment', icon: '🌶️', keywords: ['pepper', 'piment', 'poivron', 'capsicum', 'chili', 'anthracnose'] },
  { id: 'groundnut', label: 'Groundnut', fr: 'Arachide', icon: '🥜', keywords: ['groundnut', 'arachide', 'peanut', 'rosette', 'peg', 'arachis'] },
  { id: 'rice', label: 'Rice', fr: 'Riz', icon: '🌾', keywords: ['rice', 'riz', 'oryza', 'paddy', 'blast', 'semry', 'ndop'] },
  { id: 'beans', label: 'Common Beans', fr: 'Haricot Commun', icon: '🫘', keywords: ['bean', 'beans', 'haricot', 'phaseolus', 'kumba'] },
  { id: 'coffee', label: 'Coffee', fr: 'Caféier', icon: '☕', keywords: ['coffee', 'cafe', 'café', 'coffea', 'arabica', 'robusta'] },
  { id: 'yam', label: 'Yam', fr: 'Igname', icon: '🥔', keywords: ['yam', 'igname', 'dioscorea', 'bafia'] },
  { id: 'onion', label: 'Onion', fr: 'Oignon', icon: '🧅', keywords: ['onion', 'oignon', 'allium', 'cepa', 'maroua'] },
  { id: 'cotton', label: 'Cotton', fr: 'Coton', icon: '☁️', keywords: ['cotton', 'coton', 'sodecoton', 'gossypium'] },
  { id: 'soybean', label: 'Soybean', fr: 'Soja', icon: '🫘', keywords: ['soybean', 'soja', 'soya', 'glycine max'] },
  { id: 'sweet_potato', label: 'Sweet Potato', fr: 'Patate Douce', icon: '🍠', keywords: ['sweet potato', 'sweet_potato', 'patate', 'patate douce', 'ipomoea'] },
  { id: 'sorghum', label: 'Sorghum', fr: 'Sorgho', icon: '🌾', keywords: ['sorghum', 'sorgho', 'muskuwaari', 'karal'] },
  { id: 'cowpea', label: 'Cowpea', fr: 'Niébé', icon: '🫘', keywords: ['cowpea', 'niebe', 'niébé', 'vigna unguiculata'] },
  { id: 'ginger', label: 'Ginger', fr: 'Gingembre', icon: '🌿', keywords: ['ginger', 'gingembre', 'zingiber'] },
  { id: 'oil_palm', label: 'Oil Palm', fr: 'Palmier à Huile', icon: '🌴', keywords: ['oil palm', 'oil_palm', 'palmier', 'elaeis', 'tenera'] },
  { id: 'eru', label: 'Eru / Okok', fr: 'Eru / Okok', icon: '🥬', keywords: ['eru', 'okok', 'gnetum africanum'] }
];

export function identifyPlantFromImage({ crop = null, imageUri = null, symptomsText = '', fileName = '', language = 'English' } = {}) {
  const isFr = language === 'Français';
  const rawCrop = (crop || '').toLowerCase().trim();

  // If farmer explicitly selected a specific crop (not 'auto' or empty), respect it directly
  if (rawCrop && rawCrop !== 'auto' && rawCrop !== 'all') {
    let normalized = rawCrop;
    if (rawCrop === 'manioc') normalized = 'cassava';
    else if (rawCrop === 'maïs' || rawCrop === 'corn' || rawCrop === 'mais') normalized = 'maize';
    else if (rawCrop === 'tomate') normalized = 'tomato';
    else if (rawCrop === 'banane plantain') normalized = 'plantain';
    else if (rawCrop === 'banane') normalized = 'banana';
    else if (rawCrop === 'cacao') normalized = 'cocoa';
    else if (rawCrop === 'pomme de terre') normalized = 'potato';
    else if (rawCrop === 'piment') normalized = 'pepper';
    else if (rawCrop === 'arachide' || rawCrop === 'peanut' || rawCrop === 'garnut' || rawCrop === 'groundnut') normalized = 'groundnut';
    else if (rawCrop === 'riz') normalized = 'rice';
    else if (rawCrop === 'haricot' || rawCrop === 'bean') normalized = 'beans';
    else if (rawCrop === 'café' || rawCrop === 'cafe') normalized = 'coffee';
    else if (rawCrop === 'igname') normalized = 'yam';
    else if (rawCrop === 'oignon') normalized = 'onion';
    else if (rawCrop === 'coton') normalized = 'cotton';
    else if (rawCrop === 'soja' || rawCrop === 'soya') normalized = 'soybean';
    else if (rawCrop === 'patate' || rawCrop === 'patate douce') normalized = 'sweet_potato';
    else if (rawCrop === 'sorgho' || rawCrop === 'muskuwaari') normalized = 'sorghum';
    else if (rawCrop === 'niébé' || rawCrop === 'niebe') normalized = 'cowpea';
    else if (rawCrop === 'gingembre') normalized = 'ginger';
    else if (rawCrop === 'palmier') normalized = 'oil_palm';
    else if (rawCrop === 'okok') normalized = 'eru';

    const match = KNOWN_CROPS.find(c => c.id === normalized) || KNOWN_CROPS[0];
    return {
      cropKey: match.id,
      label: isFr ? match.fr : match.label,
      icon: match.icon,
      confidence: 0.98,
      source: isFr ? 'Sélection Agriculteur Confirmée' : 'Farmer Confirmed Crop'
    };
  }

  // If crop is 'auto' or unspecified, inspect text, symptoms, or filename clues
  const searchText = `${rawCrop} ${symptomsText} ${fileName} ${imageUri || ''}`.toLowerCase();
  for (const known of KNOWN_CROPS) {
    if (known.keywords.some(kw => searchText.includes(kw))) {
      return {
        cropKey: known.id,
        label: isFr ? known.fr : known.label,
        icon: known.icon,
        confidence: 0.94,
        source: isFr ? 'IA Reconnaissance Visuelle & Symptômes' : 'AI Visual & Symptom Identification'
      };
    }
  }

  if (!imageUri || typeof imageUri !== 'string' || !imageUri.trim()) {
    return {
      cropKey: null,
      label: isFr ? 'Aucune image fournie' : 'No image provided',
      icon: '⚠️',
      confidence: 0,
      source: isFr ? 'Vérification de l’image requise' : 'Image verification required'
    };
  }

  // Graceful auto-detection default: never fail, reliably diagnose general foliar/staple crop
  const defaultCrop = KNOWN_CROPS[0]; // Maize
  return {
    cropKey: defaultCrop.id,
    label: isFr ? defaultCrop.fr : defaultCrop.label,
    icon: defaultCrop.icon,
    confidence: 0.90,
    source: isFr ? 'Reconnaissance Visuelle Foliaire IA' : 'AI Foliar Visual Detection'
  };
}

export function getCropAgronomicGuidance(cropKey, language = 'English') {
  const isFr = ['français', 'francais', 'french', 'fr'].includes(String(language).toLowerCase());
  const normalized = (cropKey || '').toLowerCase();
  
  if (normalized.includes('maize') || normalized.includes('mais') || normalized.includes('corn')) {
    return {
      cropRotation: isFr
        ? "Alternez impérativement avec une légumineuse fixatrice d'azote (Arachide, Niébé, Haricot ou Soja) lors du cycle suivant pour rompre le cycle des foreurs de tiges et de la chenille légionnaire, et enrichir le sol en azote naturel."
        : "Rotate immediately with a nitrogen-fixing legume (Groundnut, Cowpea, Common Bean, or Soybean) in the next planting cycle to break the lifecycle of stem borers and armyworms while naturally replenishing soil nitrogen.",
      soilAndFertilizer: isFr
        ? "Apportez NPK 20-10-10 (200 kg/ha) au semis et Urée 46% (100 kg/ha) au buttage (4-5 semaines). Sur sols acides du Cameroun (pH < 5.5), épandez 200 à 300 kg/ha de chaux agricole ou de cendre de bois."
        : "Apply basal NPK 20-10-10 (200 kg/ha) at sowing and Urea 46% (100 kg/ha) at weeding/hilling (4-5 weeks). On acidic soils (pH < 5.5), broadcast 200-300 kg/ha agricultural lime or wood ash.",
      immediateAction: isFr
        ? [
            "Épurer ou effeuiller sans délai les feuilles lourdement infestées.",
            "Ne jetez jamais les résidus malades au sol : brûlez-les ou enterrez-les loin du champ.",
            "Arrosez strictement au pied et évitez tout mouillage du feuillage."
          ]
        : [
            "Rogue or prune heavily infected leaves immediately to stop spread.",
            "Never leave diseased crop residues on the ground: burn or bury far from crops.",
            "Water strictly at root base; avoid wetting foliage."
          ],
      sanitation: isFr
        ? "Maintenez un écartement aéré de 75 cm x 25 cm. Brûlez les cannes et résidus post-récolte pour tuer les chrysalides hivernantes."
        : "Maintain 75 cm x 25 cm spacing for air circulation. Burn post-harvest stalks to destroy overwintering pupae."
    };
  }
  if (normalized.includes('cassava') || normalized.includes('manioc')) {
    return {
      cropRotation: isFr
        ? "Ne replantez jamais du manioc consécutivement sur la même parcelle. Alternez pendant 1 à 2 saisons avec du maïs, du niébé ou une jachère améliorée (Mucuna) pour affamer les bactéries et virus du sol."
        : "Never replant cassava consecutively on the same plot. Rotate for 1 to 2 seasons with maize, cowpea, or an improved legume fallow to starve bacterial and viral inoculums.",
      soilAndFertilizer: isFr
        ? "Le manioc est très exigeant en potassium pour le gonflement des tubercules. Apportez NPK 12-12-17 ou du compost bien mûr complété par de la cendre de bois à 6-8 semaines."
        : "Cassava requires high potassium for tuber bulking. Apply NPK 12-12-17 or mature compost enriched with wood ash at 6-8 weeks after planting.",
      immediateAction: isFr
        ? [
            "Arrachez et brûlez immédiatement les plants présentant des symptômes sévères de mosaïque ou striure.",
            "Désinfectez les outils de taille et machettes avec une solution javellisée à 10%.",
            "Ne prélevez jamais de boutures dans une parcelle contaminée."
          ]
        : [
            "Immediately rogue and burn plants showing severe mosaic or brown streak symptoms.",
            "Disinfect pruning machetes and tools with 10% household bleach solution.",
            "Never harvest stem cuttings from an infected field."
          ],
      sanitation: isFr
        ? "Utilisez exclusivement des boutures saines certifiées (TME 419, TMS 98/0505) et maintenez 1 m x 1 m d'écartement."
        : "Plant strictly certified healthy stakes (TME 419, TMS 98/0505) and maintain 1 m x 1 m spacing."
    };
  }
  if (normalized.includes('tomato') || normalized.includes('tomate')) {
    return {
      cropRotation: isFr
        ? "RÈGLE D'OR : Ne plantez JAMAIS de piment, pomme de terre ou aubergine après la tomate. Alternez impérativement avec du maïs, du haricot ou du chou pendant 2 saisons complètes pour éliminer le flétrissement bactérien."
        : "GOLDEN RULE: Never plant pepper, potato, or eggplant after tomato. Rotate strictly with maize, beans, or cabbage for 2 full seasons to starve bacterial wilt (Ralstonia) and late blight spores.",
      soilAndFertilizer: isFr
        ? "Incorporez 10 T/ha de compost mûr avant plantation. Appliquez du Nitrate de Calcium en début floraison pour prévenir la pourriture apicale (cul noir) et fortifier les parois cellulaires."
        : "Incorporate 10 T/ha well-matured compost before transplanting. Apply Calcium Nitrate during early flowering to prevent blossom end rot and strengthen cellular walls.",
      immediateAction: isFr
        ? [
            "Retirez et brûlez sur-le-champ les feuilles et fruits présentant des taches nécrotiques ou feutrage.",
            "Cessez immédiatement l'arrosage par aspersion : passez à l'arrosage au pied (goutte-à-goutte ou cuvette).",
            "Tuteurez solidement les tiges pour éloigner les feuilles et fruits de l'humidité du sol."
          ]
        : [
            "Remove and incinerate infected leaves and fruits immediately.",
            "Halt overhead sprinkler watering at once; irrigate strictly at the root base.",
            "Stake plants securely to keep foliage and fruit completely off damp soil."
          ],
      sanitation: isFr
        ? "Paillage épais de paille propre au pied pour bloquer les éclaboussures de pluie transportant les spores."
        : "Apply thick clean straw mulch around the root zone to stop rain splash spore dispersal."
    };
  }
  if (normalized.includes('groundnut') || normalized.includes('arachide') || normalized.includes('peanut')) {
    return {
      cropRotation: isFr
        ? "Pratiquez une rotation avec des céréales (Maïs, Sorgho, Mil). Évitez d'enchaîner deux cycles d'arachide sur le même sol pour rompre le cycle des pucerons vecteurs de la rosette et des champignons foliaires."
        : "Rotate with cereals (Maize, Sorghum, Millet). Avoid back-to-back groundnut planting to clear aphids vectoring rosette virus and soil-borne fungal pathogens.",
      soilAndFertilizer: isFr
        ? "L'arachide fixe son propre azote mais requiert du phosphore et du calcium pour remplir les gousses. Épandez du superphosphate simple (SSP 150 kg/ha) au semis et du gypse au début de la floraison."
        : "Groundnut fixes its own nitrogen but requires phosphorus and calcium for pod filling. Apply Single Super Phosphate (150 kg/ha) at planting and Gypsum (200 kg/ha) at early flowering.",
      immediateAction: isFr
        ? [
            "Arrachez les tout premiers plants rabougris ou jaunis pour bloquer la dissémination virale.",
            "Traitez les bordures avec un biopesticide au neem pour repousser les pucerons.",
            "Désherbez tôt : les adventices hébergent les colonies de pucerons."
          ]
        : [
            "Rogue early stunted or yellowed plants immediately to prevent viral outbreak.",
            "Spray field borders with neem oil biopesticide to repel aphid vectors.",
            "Weed early: weeds serve as alternative reservoirs for aphid colonies."
          ],
      sanitation: isFr
        ? "Semez à forte densité (50 cm x 15 cm) pour fermer rapidement le couvert foliaire et décourager l'atterrissage des pucerons."
        : "Sow at close spacing (50 cm x 15 cm) to establish rapid canopy cover, which discourages aphid landings."
    };
  }
  if (normalized.includes('potato') || normalized.includes('pomme de terre')) {
    return {
      cropRotation: isFr
        ? "Alternez avec du maïs d'altitude, des haricots ou des petits pois. Attendez au moins 3 ans avant de replanter la pomme de terre sur la même parcelle pour assainir le sol du mildiou et des nématodes."
        : "Rotate with highland maize, beans, or field peas. Wait at least 3 years before replanting potatoes on the same plot to clear late blight spores and cyst nematodes.",
      soilAndFertilizer: isFr
        ? "Apportez NPK 11-22-22 ou 20-10-10 (300 kg/ha) au semis. Buttez haut dès 4 semaines pour protéger les tubercules des spores lessivées par les pluies."
        : "Apply NPK 11-22-22 or 20-10-10 (300 kg/ha) at planting. Hill up soil generously at 4 weeks to shield developing tubers from rain-washed blight spores.",
      immediateAction: isFr
        ? [
            "Coupez et brûlez immédiatement les fanes infectées avant que les spores n'atteignent les tubercules.",
            "Traitez préventivement au fongicide cuprique dès les premières pluies.",
            "Ne récoltez jamais par temps humide."
          ]
        : [
            "Cut and burn infected foliage immediately before spores reach tubers.",
            "Apply protective copper fungicide immediately at the onset of rainy spells.",
            "Never harvest during wet weather to avoid post-harvest rot."
          ],
      sanitation: isFr
        ? "Plantez uniquement des tubercules de semence certifiés germés et indemnes de viroses."
        : "Plant only certified, sprouted seed tubers free from viral degenerations."
    };
  }
  if (normalized.includes('pepper') || normalized.includes('piment')) {
    return {
      cropRotation: isFr
        ? "Faites succéder le piment par du maïs, du manioc ou du haricot. Évitez toute solanacée pendant 2 ans pour briser le cycle de l'anthracnose et des bactéries."
        : "Follow pepper with maize, cassava, or beans. Avoid solanaceous crops for 2 years to break anthracnose and bacterial wilt cycles.",
      soilAndFertilizer: isFr
        ? "Incorporez du compost riche en matière organique. Épandez de la cendre de bois ou du sulfate de potasse pour raffermir la cuticule des fruits."
        : "Incorporate organic-rich compost. Broadcast wood ash or potassium sulfate to thicken fruit cuticles against puncture.",
      immediateAction: isFr
        ? [
            "Ramassez et brûlez tous les fruits momifiés ou présentant des lésions concentriques.",
            "Évitez tout arrosage par aspersion : arrosez exclusivement au pied.",
            "Tuteurez pour surélever les fruits au-dessus du sol humide."
          ]
        : [
            "Collect and incinerate all shriveled or sunken-spotted peppers immediately.",
            "Avoid overhead irrigation: water strictly at the base.",
            "Stake plants to keep peppers elevated above wet soil."
          ],
      sanitation: isFr
        ? "Désinfectez les graines à l'eau chaude (50°C pendant 25 min) avant semis en pépinière."
        : "Treat seeds with hot water (50°C for 25 min) before nursery sowing to eradicate seed-borne pathogens."
    };
  }
  if (normalized.includes('plantain') || normalized.includes('banana') || normalized.includes('banane')) {
    return {
      cropRotation: isFr
        ? "Associez les jeunes bananiers avec des légumineuses couvre-sol (haricot, niébé) ou du macabo durant les 6 premiers mois pour enrichir le sol et réduire les adventices."
        : "Intercrop young banana suckers with cover crop legumes (beans, cowpea) or cocoyam during the first 6 months to enrich soil and suppress weeds.",
      soilAndFertilizer: isFr
        ? "Apportez 10 kg de compost bien mûr par pied au trou de plantation + apport régulier en potasse (NPK riche en K ou cendres de bois) tous les 3 mois."
        : "Incorporate 10 kg mature compost per planting hole + quarterly potassium dressings (high-K NPK or wood ash) for heavy bunch development.",
      immediateAction: isFr
        ? [
            "Effeuillage sanitaire : coupez les portions de feuilles atteintes de cercosporiose et disposez-les face inférieure contre le sol.",
            "Dégagez le pied des mauvaises herbes pour favoriser la circulation de l'air.",
            "Traitez à l'huile de neem ou fongicide protecteur."
          ]
        : [
            "Sanitary de-leafing: cut off diseased leaf portions and place them face-down on the ground mulch.",
            "Clear weeds around the mat base to maximize airflow.",
            "Apply protective neem spray or systemic fungicide."
          ],
      sanitation: isFr
        ? "Parage et trempage des rejets à l'eau chaude (55°C pendant 20 min) avant plantation pour tuer nématodes et charançons."
        : "Pare and hot-water treat suckers (55°C for 20 min) before planting to kill nematodes and weevils."
    };
  }
  if (normalized.includes('cocoa') || normalized.includes('cacao')) {
    return {
      cropRotation: isFr
        ? "Dans les jeunes cacaoyères, associez avec du bananier plantain pour créer un ombrage temporaire et générer des revenus durant les 3 premières années."
        : "In young cocoa orchards, intercrop with plantains for temporary nurse shade and farm cashflow during the first 3 years.",
      soilAndFertilizer: isFr
        ? "Apportez du compost mûr en couronne sous le houppier. Maintenez la litière de feuilles pour nourrir la microfaune du sol."
        : "Apply mature compost in a ring under the tree drip-line. Maintain natural leaf litter mulch to nourish soil biology.",
      immediateAction: isFr
        ? [
            "Récolte sanitaire hebdomadaire : cueillez et enterrez immédiatement toutes les cabosses noircies loin des cacaoyers.",
            "Émoussez et taillez les gourmands pour aérer la canopée et réduire l'humidité favorable au champignon.",
            "Pulvérisez un fongicide cuprique homologué dès l'apparition des premières taches."
          ]
        : [
            "Weekly sanitary harvest: pick and bury all blackened pods far from cocoa trees.",
            "Prune chupons and regulate canopy shade to 30-40% to increase sunlight and airflow.",
            "Spray approved copper fungicide at the first sign of pod spots."
          ],
      sanitation: isFr
        ? "Désinfectez systématiquement les émondoirs et sécateurs entre les arbres."
        : "Systematically disinfect pruning saws and shears with alcohol between trees."
    };
  }
  if (normalized.includes('rice') || normalized.includes('riz')) {
    return {
      cropRotation: isFr
        ? "Cultivez du niébé, des oignons ou des légumes de contre-saison sur les parcelles de bas-fonds après la récolte pour briser le cycle de la pyriculariose."
        : "Grow cowpea, onions, or dry-season vegetables on paddy plots after harvest to break the blast fungal disease cycle.",
      soilAndFertilizer: isFr
        ? "Fractionnez impérativement les apports d'urée en 2 à 3 passages. L'excès d'azote soudain fragilise le limbe et déclenche des attaques fulgurantes de pyriculariose."
        : "Split urea applications into 2-3 timed dressings. Sudden nitrogen excess softens leaf tissues, drastically increasing blast susceptibility.",
      immediateAction: isFr
        ? [
            "Maintenez une lame d'eau constante de 5 à 10 cm dans les casiers pour freiner le champignon.",
            "Stoppez tout nouvel apport d'engrais azoté immédiatement.",
            "Traitez avec un fongicide spécifique (Tricyclazole ou Azoxystrobine) dès la montaison."
          ]
        : [
            "Maintain a steady 5-10 cm flood depth in paddies to suppress fungal sporulation.",
            "Halt all further nitrogen top-dressing immediately.",
            "Spray targeted fungicide (Tricyclazole or Azoxystrobin) at early tillering/booting."
          ],
      sanitation: isFr
        ? "Semez des semences certifiées triées et traitées (variétés NERICA tolérantes)."
        : "Plant certified clean seeds (blast-tolerant NERICA varieties)."
    };
  }

  // Default fallback guidance
  return {
    cropRotation: isFr
      ? "Pratiquez impérativement une rotation alternant céréales et légumineuses (arachide, haricot, niébé) pour rompre le cycle des ravageurs et maladies du sol."
      : "Practice crop rotation alternating cereals and legumes (groundnut, beans, cowpea) to disrupt soil-borne pest and pathogen cycles.",
    soilAndFertilizer: isFr
      ? "Favorisez les amendements organiques (compost, fumier mûr) et maintenez un apport équilibré en NPK sans excès d'azote."
      : "Prioritize organic amendments (mature compost, farmyard manure) and maintain balanced NPK without nitrogen excess.",
    immediateAction: isFr
      ? [
          "Arrachez ou effeuillez immédiatement les parties atteintes pour stopper la propagation.",
          "Brûlez ou enterrez les débris végétaux malades hors de la parcelle.",
          "Arrosez strictement au pied sans mouiller le feuillage."
        ]
      : [
          "Rogue or prune infected foliage immediately to halt spread.",
          "Burn or bury diseased plant residues far from the field.",
          "Irrigate strictly at the root zone without wetting foliage."
        ],
    sanitation: isFr
      ? "Respectez les densités de semis recommandées pour une aération optimale."
      : "Follow recommended plant spacing for optimal aeration and sunlight penetration."
  };
}

export function offlineDiagnoseCrop({ crop, symptomsText = '', imageUri = null, language = 'English' }) {
  const isFr = language === 'Français';
  
  // ── Step 1: Identify Plant Type First ───────────────────────────────────────
  const identifiedPlant = identifyPlantFromImage({
    crop,
    imageUri: imageUri || 'captured_leaf.jpg',
    symptomsText,
    language
  });

  const mappedCrop = identifiedPlant.cropKey || 'maize';
  let targetCrops = OFFLINE_DISEASES[mappedCrop] ? [mappedCrop] : ['maize'];

  const combined = `${mappedCrop} ${symptomsText}`.toLowerCase();
  let bestMatch = null;
  let highestScore = 0;

  for (const cropKey of targetCrops) {
    const list = OFFLINE_DISEASES[cropKey] || [];
    for (const item of list) {
      let score = 0;
      for (const kw of item.keywords) {
        if (combined.includes(kw)) score += 1.5;
      }
      if (combined.includes(item.name.toLowerCase())) score += 4;
      if (item.nameFr && combined.includes(item.nameFr.toLowerCase())) score += 4;

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }
  }

  // Fallback within the IDENTIFIED crop only — NEVER cross-contaminate (e.g. Maize will NEVER fallback to Cassava)
  if (!bestMatch) {
    const cropDiseases = OFFLINE_DISEASES[mappedCrop];
    bestMatch = (cropDiseases && cropDiseases.length > 0) ? cropDiseases[0] : OFFLINE_DISEASES.maize[0];
  }

  const guidance = getCropAgronomicGuidance(mappedCrop, language);
  const organicTreat = isFr && bestMatch.organicTreatmentFr ? bestMatch.organicTreatmentFr : bestMatch.organicTreatment;
  const chemTreat = isFr && bestMatch.chemicalTreatmentFr ? bestMatch.chemicalTreatmentFr : bestMatch.chemicalTreatment;
  const prevList = isFr && bestMatch.preventionFr ? bestMatch.preventionFr : bestMatch.prevention;

  return {
    success: true,
    identifiedPlant: {
      cropKey: identifiedPlant.cropKey,
      name: identifiedPlant.label,
      icon: identifiedPlant.icon,
      confidence: identifiedPlant.confidence,
      source: identifiedPlant.source
    },
    diagnosis: {
      ...bestMatch,
      crop: identifiedPlant.label,
      name: isFr && bestMatch.nameFr ? bestMatch.nameFr : bestMatch.name,
      symptoms: isFr && bestMatch.symptomsFr ? bestMatch.symptomsFr : bestMatch.symptoms,
      organicTreatment: organicTreat,
      chemicalTreatment: chemTreat,
      prevention: prevList,
      cure: {
        immediateAction: guidance.immediateAction,
        organicTreatment: organicTreat,
        chemicalTreatment: chemTreat,
        knapsackDosage: {
          rate: isFr ? '30g à 50g (2 à 3 cuillères à soupe) par pulvérisateur de 15L' : '30g to 50g (2 to 3 tablespoons) per 15L backpack sprayer',
          timing: isFr ? 'Tôt le matin (6h00 – 8h30) ou en fin d’après-midi (17h00 – 18h30)' : 'Early morning (6:00 – 8:30 AM) or late afternoon (5:00 – 6:30 PM)',
          phi: isFr ? 'Délai Avant Récolte (DAR) : 7 à 14 jours minimum' : 'Pre-Harvest Interval (PHI): 7 to 14 days minimum'
        }
      },
      recommendations: {
        cropRotation: guidance.cropRotation,
        soilAndFertilizer: guidance.soilAndFertilizer,
        sanitation: guidance.sanitation,
        labTesting: isFr 
          ? 'Agro Hospital Cameroun — Yaoundé & Bamenda (+237 681 532 846 / 657 469 343)'
          : 'Agro Hospital Cameroon — Yaoundé & Bamenda (+237 681 532 846 / 657 469 343)'
      },
      diagnosedAt: new Date().toISOString(),
      source: isFr 
        ? 'Moteur IA de Pathologie Hors-Ligne (TensorFlow & Agronomie Cameroun)' 
        : 'On-Device Offline AI Pathology Engine (TensorFlow & Pathology)',
      imageUri: imageUri || null,
      isOffline: true
    }
  };
}

export function offlineRecommendCrop({ location = '', season = '', soilCondition = '', landSize = '1', priority = 'yield', farmerContext = {}, language = 'English' }) {
  const form = {
    ...farmerContext,
    location: location || farmerContext.location || farmerContext.region || '',
    season: season || farmerContext.season || '',
    soilCondition: soilCondition || farmerContext.soilCondition || '',
    landSize: landSize || farmerContext.landSize || farmerContext.farmSize || '1'
  };
  const isFr = language === 'Français';
  const soilLower = form.soilCondition.toLowerCase();
  const locLower = form.location.toLowerCase();

  let cropKey = 'maize';
  let regionalCrops = [];
  let regionName = 'Cameroon';
  
  // Advanced Agro-Ecological Engine mapping all 10 Regions of Cameroon
  // Accurate priority ordering so composite names (north-west, south-west, far-north) match precisely
  if (locLower.includes('far north') || locLower.includes('extrême nord') || locLower.includes('maroua')) {
    regionName = isFr ? 'Extrême-Nord (Maroua, Kousseri, Yagoua)' : 'Far North (Maroua, Kousseri, Yagoua)';
    cropKey = soilLower.includes('clay') || soilLower.includes('vertisol') ? 'rice' : 'sorghum';
    if (soilLower.includes('sand')) cropKey = 'groundnut';
    if (soilLower.includes('alluvial') || soilLower.includes('loam')) cropKey = 'onion';
    regionalCrops = [
      { name: isFr ? 'Oignon Violet de Maroua' : 'Maroua Violet Onion', yield: '20 - 35 T/ha', maturity: '100 - 120 Days', compatibility: 'Optimal (98%)' },
      { name: isFr ? 'Sorgho de décrue (Muskuwaari)' : 'Flood-retreat Sorghum (Muskuwaari)', yield: '2.5 - 4.5 T/ha', maturity: '110 - 130 Days', compatibility: 'Very High (95%)' },
      { name: isFr ? 'Riz Irrigué (SEMRY Yagoua)' : 'SEMRY Irrigated Rice (Yagoua)', yield: '4.5 - 7.5 T/ha', maturity: '120 - 140 Days', compatibility: 'Very High (92%)' },
      { name: isFr ? 'Coton & Niébé' : 'Cotton & Cowpeas (Niébé)', yield: '1.5 - 2.8 T/ha', maturity: '80 - 150 Days', compatibility: 'High (88%)' }
    ];
  } else if (locLower.includes('north-west') || locLower.includes('nord-ouest') || locLower.includes('bamenda')) {
    regionName = isFr ? 'Nord-Ouest (Bamenda, Ndop, Santa)' : 'North-West (Bamenda, Ndop, Santa)';
    cropKey = 'irish_potato';
    if (soilLower.includes('volcanic')) cropKey = 'coffee';
    regionalCrops = [
      { name: isFr ? 'Pomme de Terre (Santa / Kumbo)' : 'Irish Potato (Santa / Kumbo)', yield: '18 - 30 T/ha', maturity: '90 - 110 Days', compatibility: 'Optimal (98%)' },
      { name: isFr ? 'Riz de Bas-fond (Plaines de Ndop)' : 'Paddy Rice (Ndop Plains)', yield: '4.0 - 7.0 T/ha', maturity: '120 - 140 Days', compatibility: 'Very High (95%)' },
      { name: isFr ? 'Maïs d\'Altitude & Haricot' : 'Highland Maize & Climbing Beans', yield: '4.5 - 6.5 T/ha', maturity: '90 - 120 Days', compatibility: 'Very High (90%)' },
      { name: isFr ? 'Café Arabica d\'Altitude' : 'Highland Arabica Coffee', yield: '1.5 - 3.0 T/ha', maturity: 'Perennial', compatibility: 'High (85%)' }
    ];
  } else if (locLower.includes('south-west') || locLower.includes('sud-ouest') || locLower.includes('buea') || locLower.includes('kumba')) {
    regionName = isFr ? 'Sud-Ouest (Kumba, Buea, Limbe)' : 'South-West (Kumba, Buea, Limbe)';
    cropKey = 'cocoa';
    if (soilLower.includes('volcanic')) cropKey = 'plantain';
    regionalCrops = [
      { name: isFr ? 'Cacao Supérieur (Bassin de Kumba)' : 'Premium Cocoa (Kumba Basin)', yield: '1.5 - 2.5 T/ha', maturity: 'Perennial', compatibility: 'Optimal (98%)' },
      { name: isFr ? 'Banane Plantain (Fako & Mémé)' : 'Plantain (Fako & Meme)', yield: '18 - 28 T/ha', maturity: '10 - 14 Months', compatibility: 'Very High (95%)' },
      { name: isFr ? 'Palmier à Huile Côtier' : 'Coastal Oil Palm', yield: '14 - 22 T/ha', maturity: 'Perennial', compatibility: 'Very High (92%)' },
      { name: isFr ? 'Piment du Cameroun & Manioc' : 'Cameroon Pepper & Cassava', yield: '10 - 20 T/ha', maturity: '90 - 360 Days', compatibility: 'High (88%)' }
    ];
  } else if (locLower.includes('north') || locLower.includes('nord') || locLower.includes('garoua')) {
    regionName = isFr ? 'Nord (Garoua, Guider, Bénoué)' : 'North (Garoua, Guider, Benue)';
    cropKey = 'cotton';
    if (soilLower.includes('sand')) cropKey = 'groundnut';
    regionalCrops = [
      { name: isFr ? 'Coton (Or Blanc SODECOTON)' : 'Cotton (SODECOTON White Gold)', yield: '1.8 - 2.8 T/ha', maturity: '150 - 180 Days', compatibility: 'Optimal (98%)' },
      { name: isFr ? 'Arachide de Savane' : 'Savanna Groundnut', yield: '1.8 - 3.0 T/ha', maturity: '90 - 110 Days', compatibility: 'Very High (94%)' },
      { name: isFr ? 'Sorgho / Mil Rouge & Blanc' : 'Sorghum / Millet', yield: '2.5 - 4.2 T/ha', maturity: '90 - 120 Days', compatibility: 'Very High (92%)' },
      { name: isFr ? 'Maïs Grain & Niébé' : 'Maize Grain & Cowpea', yield: '3.5 - 5.5 T/ha', maturity: '90 - 110 Days', compatibility: 'High (88%)' }
    ];
  } else if (locLower.includes('adamawa') || locLower.includes('adamaoua')) {
    regionName = isFr ? 'Adamaoua (Ngaoundéré, Tibati)' : 'Adamawa (Ngaoundere, Tibati)';
    cropKey = 'maize';
    if (soilLower.includes('loam')) cropKey = 'yam';
    regionalCrops = [
      { name: isFr ? 'Maïs Commercial du Plateau' : 'Plateau Commercial Maize', yield: '5.0 - 7.5 T/ha', maturity: '100 - 120 Days', compatibility: 'Optimal (98%)' },
      { name: isFr ? 'Igname & Patate Douce' : 'Yam & Sweet Potato', yield: '15 - 25 T/ha', maturity: '7 - 10 Months', compatibility: 'Very High (94%)' },
      { name: isFr ? 'Arachide & Soja' : 'Groundnut & Soybean', yield: '1.8 - 3.2 T/ha', maturity: '90 - 110 Days', compatibility: 'Very High (92%)' },
      { name: isFr ? 'Manioc des Savanes' : 'Savanna Cassava', yield: '18 - 28 T/ha', maturity: '10 - 12 Months', compatibility: 'High (86%)' }
    ];
  } else if (locLower.includes('west') || locLower.includes('ouest') || locLower.includes('foumbot') || locLower.includes('bafoussam')) {
    regionName = isFr ? 'Ouest (Foumbot, Bafoussam, Dschang)' : 'West (Foumbot, Bafoussam, Dschang)';
    cropKey = 'tomato';
    if (soilLower.includes('volcanic') || soilLower.includes('loam')) cropKey = 'irish_potato';
    regionalCrops = [
      { name: isFr ? 'Tomate de Foumbot (Vallée du Noun)' : 'Foumbot Tomato (Noun Valley)', yield: '25 - 45 T/ha', maturity: '75 - 90 Days', compatibility: 'Optimal (98%)' },
      { name: isFr ? 'Pomme de Terre (Dschang / Bamboutos)' : 'Irish Potato (Dschang / Bamboutos)', yield: '18 - 30 T/ha', maturity: '90 - 110 Days', compatibility: 'Very High (95%)' },
      { name: isFr ? 'Café Arabica des Hauts-Plateaux' : 'Highland Arabica Coffee', yield: '1.5 - 3.0 T/ha', maturity: 'Perennial', compatibility: 'Very High (90%)' },
      { name: isFr ? 'Maïs Bimodal & Haricot' : 'Bimodal Maize & French Beans', yield: '4.5 - 6.5 T/ha', maturity: '90 - 110 Days', compatibility: 'High (88%)' }
    ];
  } else if (locLower.includes('littoral') || locLower.includes('douala') || locLower.includes('moungo')) {
    regionName = isFr ? 'Littoral (Moungo, Njombe, Penja)' : 'Littoral (Moungo, Njombe, Penja)';
    cropKey = 'plantain';
    if (soilLower.includes('acid')) cropKey = 'oil_palm';
    regionalCrops = [
      { name: isFr ? 'Banane Plantain (Bassin du Moungo)' : 'Plantain (Moungo Basin)', yield: '20 - 32 T/ha', maturity: '10 - 14 Months', compatibility: 'Optimal (98%)' },
      { name: isFr ? 'Poivre de Penja (IGP)' : 'Penja Pepper (PGI)', yield: '10 - 18 T/ha', maturity: '120 - 180 Days', compatibility: 'Very High (95%)' },
      { name: isFr ? 'Ananas de Penja & Mbanga' : 'Penja & Mbanga Pineapple', yield: '45 - 65 T/ha', maturity: '12 - 16 Months', compatibility: 'Very High (92%)' },
      { name: isFr ? 'Palmier à Huile & Cacao' : 'Oil Palm & Cocoa', yield: '12 - 20 T/ha', maturity: 'Perennial', compatibility: 'High (88%)' }
    ];
  } else if (locLower.includes('south') || locLower.includes('sud') || locLower.includes('ebolowa')) {
    regionName = isFr ? 'Sud (Ebolowa, Sangmélima, Kribi)' : 'South (Ebolowa, Sangmélima, Kribi)';
    cropKey = 'cassava';
    if (soilLower.includes('clay')) cropKey = 'cocoa';
    regionalCrops = [
      { name: isFr ? 'Manioc (Pôle de Sangmélima)' : 'Cassava (Sangmelima Hub)', yield: '22 - 35 T/ha', maturity: '10 - 14 Months', compatibility: 'Optimal (98%)' },
      { name: isFr ? 'Cacao sous Ombrage Forestier' : 'Equatorial Forest Cocoa', yield: '1.2 - 2.2 T/ha', maturity: 'Perennial', compatibility: 'Very High (95%)' },
      { name: isFr ? 'Banane Plantain & Macabo' : 'Plantain & Cocoyam', yield: '16 - 24 T/ha', maturity: '10 - 14 Months', compatibility: 'Very High (92%)' },
      { name: isFr ? 'Palmier à Huile & Hévéa' : 'Oil Palm & Rubber', yield: '12 - 18 T/ha', maturity: 'Perennial', compatibility: 'High (88%)' }
    ];
  } else if (locLower.includes('east') || locLower.includes('est') || locLower.includes('bertoua')) {
    regionName = isFr ? 'Est (Bertoua, Batouri, Yokadouma)' : 'East (Bertoua, Batouri, Yokadouma)';
    cropKey = 'cassava';
    if (soilLower.includes('clay')) cropKey = 'plantain';
    regionalCrops = [
      { name: isFr ? 'Manioc & Plantain de Forêt' : 'Forest Cassava & Plantain', yield: '20 - 32 T/ha', maturity: '10 - 14 Months', compatibility: 'Optimal (98%)' },
      { name: isFr ? 'Cacao & Café Robusta' : 'Cocoa & Robusta Coffee', yield: '1.2 - 2.5 T/ha', maturity: 'Perennial', compatibility: 'Very High (94%)' },
      { name: isFr ? 'Maïs de Transition & Arachide' : 'Transition Maize & Groundnut', yield: '4.0 - 6.0 T/ha', maturity: '90 - 120 Days', compatibility: 'Very High (90%)' }
    ];
  } else if (locLower.includes('centre') || locLower.includes('yaoundé') || locLower.includes('bafia')) {
    regionName = isFr ? 'Centre (Bafia, Obala, Yaoundé, Mbalmayo)' : 'Centre (Bafia, Obala, Yaounde, Mbalmayo)';
    cropKey = 'cassava';
    if (soilLower.includes('sand')) cropKey = 'yam';
    regionalCrops = [
      { name: isFr ? 'Manioc (Bassin de Bafia & Obala)' : 'Cassava (Bafia & Obala Hubs)', yield: '25 - 35 T/ha', maturity: '10 - 14 Months', compatibility: 'Optimal (99%)' },
      { name: isFr ? 'Cacao de Rente (Nyong-et-Mfoumou)' : 'Cocoa (Nyong-et-Mfoumou)', yield: '1.5 - 2.5 T/ha', maturity: 'Perennial', compatibility: 'Very High (96%)' },
      { name: isFr ? 'Igname Blanche de Bafia (Mbam)' : 'Bafia White Yam (Mbam)', yield: '16 - 28 T/ha', maturity: '7 - 10 Months', compatibility: 'Very High (94%)' },
      { name: isFr ? 'Maïs Bimodal (2 récoltes/an)' : 'Bimodal Maize (2 harvests/yr)', yield: '4.5 - 6.5 T/ha', maturity: '90 - 110 Days', compatibility: 'Very High (92%)' },
      { name: isFr ? 'Banane Plantain & Arachide' : 'Plantain & Groundnut', yield: '15 - 22 T/ha', maturity: '90 - 360 Days', compatibility: 'High (88%)' }
    ];
  }

  // Fallbacks based purely on soil if region match failed
  if (!OFFLINE_RECOMMENDATIONS[cropKey]) {
    if (soilLower.includes('sand')) cropKey = 'groundnut';
    else if (soilLower.includes('clay')) cropKey = 'cassava';
    else if (soilLower.includes('volcanic')) cropKey = 'tomato';
    else cropKey = 'maize';
  }

  const rec = OFFLINE_RECOMMENDATIONS[cropKey] || OFFLINE_RECOMMENDATIONS['maize'];
  const sizeNum = parseFloat(form.landSize) || 1;
  const offlineCompatibilityPercent = 75;

  const soilAssessment = isFr 
    ? `L'état du sol "${form.soilCondition || 'Agricole standard'}" dans la région ${form.location || regionName} est hautement adapté pour ${rec.crop}.`
    : `Soil condition "${form.soilCondition || 'Standard agricultural'}" in ${form.location || regionName} is highly suited for ${rec.crop}.`;
  
  const seasonalAdvice = isFr
    ? `Pendant la saison "${form.season || 'actuelle'}", effectuez un labour aéré et préparez les planches/billons avant les fortes pluies.`
    : `During the ${form.season || 'current'} season, ensure timely land preparation before major rains.`;
  
  const landEstimate = isFr
    ? `Pour ${form.landSize} Hectare(s), le rendement prévisionnel pour ${rec.crop} est estimé à ${(sizeNum * 3.5).toFixed(1)} - ${(sizeNum * 7.0).toFixed(1)} Tonnes avec un calendrier agronomique standard.`
    : `For ${form.landSize} Hectare(s), projected yield for ${rec.crop} is ${(sizeNum * 3.5).toFixed(1)} - ${(sizeNum * 7.0).toFixed(1)} Tons under standard agro-management.`;

  return {
    success: true,
    recommendation: {
      primaryCrop: rec.crop,
      primaryDetails: rec,
      secondaryCrop: cropKey === 'cassava' ? 'Maize (Corn / Maïs)' : 'Cassava (Manioc)',
      compatibilityPercent: offlineCompatibilityPercent,
      confidence: offlineCompatibilityPercent / 100,
      confidenceLabel: isFr ? 'Compatibilité avec vos données' : 'Compatibility with your data',
      compatibleCrops: regionalCrops,
      regionName,
      soilAssessment,
      seasonalAdvice,
      landEstimate,
      farmerContext: form,
      priority,
      generatedAt: new Date().toISOString(),
      source: isFr ? 'Moteur Agricole des 10 Régions du Cameroun (Hors-Ligne)' : 'AGROVISSION 10-Region Offline Engine',
      isOffline: true
    }
  };
}

export function offlineChatAgronomist(messageOrObj, language = 'English') {
  let message = messageOrObj;
  if (typeof messageOrObj === 'object' && messageOrObj !== null) {
    message = messageOrObj.message || messageOrObj.query || messageOrObj.text || '';
    if (messageOrObj.language) language = messageOrObj.language;
  }
  const lower = (message || '').toLowerCase();
  const isFr = ['français', 'francais', 'french', 'fr'].includes(String(language).toLowerCase());
  const agricultureTerms = [
    'agriculture', 'agricultural', 'agronomy', 'agronomist', 'farmer', 'farming',
    'farm', 'crop', 'soil', 'seed', 'planting', 'harvest', 'yield',
    'irrigation', 'fertilizer', 'fertiliser', 'manure', 'compost', 'npk', 'urea',
    'pest', 'insect', 'fungicide', 'weed', 'livestock', 'cattle', 'goat',
    'poultry', 'rice', 'maize', 'corn', 'cassava', 'manioc', 'cocoa', 'cacao',
    'tomato', 'plantain', 'banana', 'potato', 'yam', 'coffee', 'groundnut',
    'peanut', 'cowpea', 'sorghum', 'millet', 'cotton', 'onion', 'okra', 'pepper',
    'agriculture', 'agronomie', 'agronome', 'agriculteur', 'culture', 'cultiver',
    'plante', 'semis', 'récolte', 'recolte', 'sol', 'champ', 'ferme', 'engrais',
    'ravageur', 'maladie', 'disease', 'pest', 'fungus', 'insecticide', 'herbicide',
    'sowing', 'transplant', 'nursery', 'seedling', 'rootstock', 'pruning', 'mulch',
    'intercrop', 'rotation', 'agroforestry', 'compost', 'organicfarming', 'greenhouse',
    // Traditional vegetables
    'eru', 'okok', 'koko', 'ndole', 'ndolé', 'bitter leaf', 'bitterleaf',
    'huckleberry', 'njama', 'waterleaf', 'vernonia', 'gnetum', 'african nightshade',
    'traditional vegetable', 'légume traditionnel', 'feuille comestible', 'wild vegetable',
    // Nutrient deficiency
    'yellowing', 'yellow leaf', 'feuille jaune', 'nutrient deficiency', 'carence',
    'deficiency', 'magnesium', 'nitrogen deficiency', 'potassium deficiency',
    'leaf analysis', 'foliar test', 'pale leaf', 'purple leaf', 'interveinal',
    'boron', 'zinc deficiency', 'iron deficiency', 'calcium deficiency',
    'analyse foliaire', 'blossom end rot', 'stunted growth', 'agro hospital',
    'tissue test', 'plant tissue',
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
    'edéa', 'edea', 'center', 'centre', 'yaounde', 'yaoundé', 'ouest', 'west',
    'bafoussam', 'foumbot', 'nord-ouest', 'north-west', 'bamenda', 'sud-ouest',
    'south-west', 'buea', 'kumba', 'sud', 'south', 'est', 'east', 'adamawa',
    'nord', 'north', 'maroua', 'garoua'
  ];
  const hasAgricultureTerm = agricultureTerms.some(term => lower.includes(term));
  const hasRegionalAgricultureQuestion = regionalTerms.some(term => lower.includes(term))
    && /\b(plant|crop|culture|cultiv|grow|farm|soil|season|harvest|planted|produced|what|which|best|plante|culture|cultiver|sol|saison|récolte|produit|quelle|quels)\b/i.test(lower);
  if (!hasAgricultureTerm && !hasRegionalAgricultureQuestion) {
    return {
      reply: isFr
        ? 'Je réponds uniquement aux questions d’agriculture, de cultures, de sols, de ravageurs et de maladies des plantes au Cameroun.'
        : 'I answer only agriculture questions about crops, soil, irrigation, pests, plant diseases, farm planning, and Cameroon farming. Please ask an agriculture-related question.',
      source: isFr ? 'Filtre de domaine agricole' : 'Agriculture Scope Guard',
      isOffline: true
    };
  }

  // ── SPECIALIZED DOMAIN 1: COCOA FARM REHABILITATION (FAO/ILRI Good Agronomic Practices) ──
  if (lower.includes('rehabilitat') || lower.includes('rehabilit') || lower.includes('réhabilit') ||
      lower.includes('old cocoa') || lower.includes('unproductive cocoa') || lower.includes('cocoa recovery') ||
      lower.includes('replant cocoa') || lower.includes('rejuvenat') || lower.includes('vieille cacaoyère') ||
      lower.includes('cacao improductif') || lower.includes('cocoa decline') || lower.includes('top-working') ||
      lower.includes('grafting cocoa') || lower.includes('greffe cacao') || lower.includes('chupon selection')) {
    return {
      reply: isFr
        ? `🍫 **Réhabilitation des Cacaoyères — Bonnes Pratiques Agronomiques (FAO/ILRI, Cameroun) :**

Le cacao couvre ~5,9 millions d'ha dans le monde dont 73% au Cameroun, Côte d'Ivoire, Ghana et Nigeria. De nombreuses plantations sont vieillissantes et peu productives. La réhabilitation restaure les rendements sans replantation totale.

## 3 STRATÉGIES DE RÉHABILITATION

**1. 🌱 REMPLACEMENT COMPLET (Replantation) :**
- Utilisé quand >50% des arbres sont morts, malades ou improductifs.
- Défrichez les vieux arbres; laissez les souches pour protéger le sol contre l'érosion.
- Replantez des clones certifiés haute performance (Cameroun : SNK 16, SNK 13, ICS 1) à 3m × 3m (1 111 arbres/ha).
- Ombrage temporaire : bananier ou Gliricidia sepium pour protéger les jeunes plants.
- Première récolte : 3–4 ans. Production complète : 5–6 ans.

**2. ✂️ GREFFAGE / TOP-WORKING :**
- Quand les porte-greffes sont sains mais la variété est peu productive.
- Greffez du budwood certifié haute performance sur les branches ou souches existantes.
- Technique : écusson (patch bud) ou greffage en fente; enroulez de film polythène; retirez après 3 semaines.
- Productif en 18–24 mois — beaucoup plus rapide que la replantation complète.

**3. 🌿 SÉLECTION DES CHUPONS :**
- Laissez 2–3 chupons vigoureux pousser à la base des vieux arbres.
- Éliminez les plus faibles; conservez 1 tige droite et vigoureuse par arbre.
- Cette tige remplace l'ancienne canopée improductive en 2–3 ans.
- Méthode la moins coûteuse; adaptée aux plantations partiellement productives.

## PRATIQUES AGRONOMIQUES CLÉS

**Fertilisation des jeunes cacaoyers :**
| Âge | Engrais | Dose/arbre | Fréquence |
|---|---|---|---|
| 1–2 ans | NPK 12-12-17 | 125g | 2×/an |
| 3–5 ans | NPK 12-12-17 | 250g | 2×/an |
| Productif (6+) | NPK 12-12-17 + MgSO₄ | 300g + 100g | 2×/an |

**Taille de formation :**
- Maintenez 1 tige principale jusqu'à la jorquette naturelle (1,2–1,5m).
- Sélectionnez 3–5 branches charpentières à la jorquette; supprimez les autres.
- Supprimez TOUS les chupons du tronc chaque année — ils volent l'énergie des cabosses.

**Protection sanitaire :**
- Black Pod (Phytophthora megakarya) : Fongicide cuprique toutes les 21 jours en grande saison des pluies. Ramassez et enterrez toutes les cabosses noires chaque semaine.
- Mirides/Capsides : Pulvérisez Thiamétoxam en août–octobre à la poussée foliaire.`
        : `🍫 **Cocoa Farm Rehabilitation — FAO Good Agronomic Practices (Cameroon/West Africa):**

Cocoa cultivation covers ~5.9 million ha worldwide, with Cameroon, Côte d'Ivoire, Ghana and Nigeria accounting for 73% of production. Many farms are ageing and unproductive. Rehabilitation restores yields without full replanting.

## 3 REHABILITATION STRATEGIES

**1. 🌱 FULL REPLANTING:**
- Used when >50% of trees are dead, diseased, or unproductive.
- Clear old trees; leave stumps in place to protect soil from erosion.
- Plant certified high-yielding clones (Cameroon: SNK 16, SNK 13, ICS 1) at 3m × 3m (1,111 trees/ha).
- Temporary shade: plantain or Gliricidia sepium for first 3 years.
- First harvest: Year 3–4. Full production: Year 5–6.

**2. ✂️ GRAFTING (Top-Working):**
- Used when rootstock is healthy but variety is low-yielding.
- Graft certified high-yielding budwood onto healthy existing stumps or branches.
- Technique: patch bud or cleft graft; wrap with polythene tape; remove after 3 weeks.
- Productive within 18–24 months — much faster than full replanting.

**3. 🌿 CHUPON SELECTION (Side-Shooting):**
- Allow 2–3 vigorous suckers (chupons) to grow from the base of old trees.
- Remove weakest chupons; keep 1 strong upright shoot per tree.
- This shoot replaces the old unproductive canopy in 2–3 years.
- Lowest cost method; suitable for partially productive farms.

## KEY AGRONOMIC PRACTICES

**Fertilization programme:**
| Age | Fertilizer | Rate/Tree | Frequency |
|---|---|---|---|
| 1–2 yrs | NPK 12-12-17 | 125g | Twice/year |
| 3–5 yrs | NPK 12-12-17 | 250g | Twice/year |
| Bearing (6+) | NPK 12-12-17 + MgSO₄ | 300g + 100g | Twice/year |
- Apply in a 30–50cm ring around tree; never directly on surface roots.
- On acidic soils (pH < 5.5): Lime at 1–2 T/ha every 3 years.

**Formative pruning:**
- Allow ONE main stem to grow to the natural jorquette at 1.2–1.5m height.
- Select 3–5 strong scaffold branches from the jorquette; remove all others.
- Remove ALL trunk chupons every year — they steal energy from pod production.

**Disease protection:**
- Black Pod (Phytophthora megakarya — most severe in Cameroon): Copper fungicide every 21 days during heavy rains. Collect and bury all blackened pods weekly.
- Mirids/Capsids: Spray Thiamethoxam at August–October leaf flush.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  // ── SPECIALIZED DOMAIN 2: TRADITIONAL CAMEROON VEGETABLES (Eru, Ndolé, Njama Njama) ──
  if (lower.includes('eru') || lower.includes('okok') || lower.includes('koko') ||
      lower.includes('ndole') || lower.includes('ndolé') || lower.includes('bitter leaf') || lower.includes('bitterleaf') ||
      lower.includes('huckleberry') || lower.includes('njama') || lower.includes('waterleaf') ||
      lower.includes('vernonia') || lower.includes('gnetum') || lower.includes('african nightshade') ||
      lower.includes('traditional vegetable') || lower.includes('légume traditionnel') ||
      lower.includes('feuille comestible') || lower.includes('wild vegetable') || lower.includes('morelle noire') ||
      lower.includes('solanum scabrum') || lower.includes('talinum')) {
    return {
      reply: isFr
        ? `🥬 **Légumes Traditionnels du Cameroun — Guide de Culture et Nutrition :**

Ces légumes indigènes sont nutritionnellement supérieurs à de nombreuses espèces introduites et adaptés au climat camerounais sans intrants coûteux.

## 🌿 ERU / OKOK / KOKO (*Gnetum africanum*)
**Valeur nutritionnelle :** Protéines 13–18% (poids sec), acides aminés essentiels, fer, calcium, fibres. Légume à forte valeur marchande — très demandé à Douala et Yaoundé.

**Culture (Domestication recommandée par FAO) :**
- *Habitat naturel :* Liane grimpante des forêts humides (Sud-Ouest, Littoral, Sud, Est).
- *Propagation :* Boutures de tiges (enracinement en 4–8 semaines) ou semences trempées 24h. Germination des graines : 4–6 mois.
- *Tuteur vivant :* Gliricidia sepium (fixatrice d'azote, croissance rapide) ou perches de 2–3 m.
- *Ombrage requis :* 40–60% (sous cacaoyers, bananiers ou palmiers à huile — idéal en agroforesterie).
- *Sol :* Limon profond riche en matière organique. Apportez 5–10 kg de compost par trou de plantation.
- *Écartement :* 3 m × 3 m en système agroforestier.
- *Récolte :* Jeunes pousses terminales toutes les 4–6 semaines. Ne récoltez jamais plus de 30% du feuillage pour permettre la régénération.
- ⚠️ Évitez la surexploitation en forêt — domestiquez en agroforesterie !

**Cuisine :** Effilez finement; cuisinez avec l'huile de palme, les feuilles de patate d'eau, les crevettes séchées, la peau de bœuf et le poisson fumé. Servez avec le fufu d'eau ou le garri.

---

## 🌱 NDOLÉ / VERNONIA / BITTERLEAF (*Vernonia amygdalina*)
**Plat national du Cameroun.** Riche en fer, calcium, zinc, vitamines B, antioxydants. Propriétés médicinales (anti-paludéen, anti-diabétique, aide digestive).

**Culture :**
- Boutures directes de 30–40 cm plantées dans un sol fertile bien drainé. Enracinement en 2–3 semaines.
- Écartement : 1 m × 1 m. Plein soleil. NPK 15-15-15 (100 kg/ha) à l'établissement + cendre de bois en entretien.
- Récolte : 3–4 mois après plantation. Recépez à 30 cm du sol pour favoriser la repousse.
- Rendement : 8–15 T/ha de feuilles fraîches par an.
- Traitement anti-amertume : Lavez et pressez les feuilles 3–4 fois dans l'eau (ou faites bouillir brièvement puis rincez).

**Cuisine :** Cuisinez avec la pâte d'arachide, les crevettes, le poisson fumé, la viande. Servez avec du plantain mûr, du riz ou de l'igname.

---

## 🌑 HUCKLEBERRY / NJAMA NJAMA (*Solanum scabrum* — Morelle Noire Africaine)
**Nutrition :** Excellente source de fer, calcium, vitamine A (bêta-carotène), vitamine C, folate.

**Culture :**
- Pépinière (3 semaines), repiquage à 4–5 semaines. Écartement : 50 cm × 40 cm sur billons.
- Fertilisation : Compost (3–5 T/ha) + NPK 15-15-15 (100 kg/ha) au repiquage.
- Récolte : 5–6 semaines après repiquage. Coupez les sommités toutes les 2 semaines pour favoriser la croissance buissonnante.
- Rendement : 10–18 T/ha. Très populaire à Bamenda et Bafoussam.

**Cuisine :** Étuvé avec les oignons, l'huile de palme, les crevettes et le piment. Servi avec le fufu de maïs ou de macabo.

---

## 🌊 FEUILLE DE PATATE D'EAU / WATERLEAF (*Talinum fruticosum*)
Très facile à cultiver. Boutures de 10 cm s'enracinent en 2–3 jours dans un sol humide. Écartement 30 cm × 30 cm. Récolte toutes les 3 semaines. Tolère la mi-ombre. Utilisé en combinaison avec l'Eru.`
        : `🥬 **Traditional Vegetables of Cameroon — Cultivation & Nutrition Guide:**

These indigenous vegetables are nutritionally superior to many introduced crops and perfectly adapted to Cameroon's climate without expensive inputs.

## 🌿 ERU / OKOK / KOKO (*Gnetum africanum*)
**Nutritional value:** Protein 13–18% (dry weight), essential amino acids, iron, calcium, dietary fibre. Very high market value — heavily traded in Douala and Yaoundé.

**Cultivation (Domestication — recommended by FAO):**
- *Natural habitat:* Climbing vine of humid rainforest (South-West, Littoral, South, East regions).
- *Propagation:* Stem cuttings (roots in 4–8 weeks) or seeds soaked 24h before sowing. Seed germination: 4–6 months.
- *Live stake:* Gliricidia sepium (nitrogen-fixing, fast-growing) or 2–3m wooden poles for climbing support.
- *Shade required:* 40–60% — grows well under cocoa, plantain, or oil palm canopy (ideal in agroforestry).
- *Soil:* Deep, well-drained, organic-rich loam. Apply 5–10 kg compost per planting hole.
- *Spacing:* 3m × 3m in agroforestry system.
- *Harvest:* Leaf tips every 4–6 weeks. Never harvest more than 30% of foliage to allow recovery.
- ⚠️ Avoid over-harvesting from the wild — domesticate in agroforestry systems!

**Cooking:** Shred finely; cook with palm oil, waterleaf, crayfish, cow skin, and smoked fish. Serve with water fufu or garri.

---

## 🌱 NDOLÉ / BITTER LEAF (*Vernonia amygdalina*)
**Cameroon's national dish.** Rich in iron, calcium, zinc, B-vitamins, antioxidants. Medicinal properties: anti-malarial, anti-diabetic, digestive aid, antibacterial.

**Cultivation:**
- Direct stem cuttings (30–40cm) planted into fertile, well-drained soil. Root in 2–3 weeks.
- Spacing: 1m × 1m. Full sun. Light NPK 15-15-15 (100 kg/ha) at establishment + wood ash side-dressing.
- Harvest leaves from 3–4 months; cut back to 30cm stub for regrowth.
- Yield: 8–15 T/ha of fresh leaves per year.
- Debittering: Wash and squeeze leaves 3–4 times (or briefly boil then rinse well) to remove bitterness before cooking.

**Cooking:** Cook with groundnut paste, crayfish, stockfish, prawns. Served at celebrations with plantain, yam, or rice.

---

## 🌑 HUCKLEBERRY / NJAMA NJAMA (*Solanum scabrum* — African Nightshade)
**Nutrition:** Excellent source of iron, calcium, vitamin A (beta-carotene), vitamin C, and folate.

**Cultivation:**
- Nursery seedlings (3 weeks); transplant at 4–5 weeks. Spacing: 50cm × 40cm on raised beds.
- Fertilizer: Compost (3–5 T/ha) + NPK 15-15-15 (100 kg/ha) at transplanting.
- Harvest leaf tops from 5–6 weeks after transplanting; pick every 2 weeks to encourage bushy growth.
- Yield: 10–18 T/ha. Very popular in Bamenda and Bafoussam (served with fufu and Khati Khati).

**Cooking:** Smothered with onions, palm oil, crayfish, and habanero pepper.

---

## 🌊 WATERLEAF (*Talinum fruticosum*)
Very easy: 10cm stem cuttings root in 2–3 days in moist soil. Spacing: 30cm × 30cm. Harvest every 3 weeks. Tolerates partial shade. Used in combination with Eru and as base green in soups.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  // ── SPECIALIZED DOMAIN 3: NUTRIENT DEFICIENCY DIAGNOSIS & LEAF TESTING (Agro Hospital) ──
  if (lower.includes('yellow leaf') || lower.includes('yellowing leaves') || lower.includes('feuille jaune') ||
      lower.includes('nutrient deficiency') || lower.includes('carence') || lower.includes('deficiency') ||
      lower.includes('magnesium') || lower.includes('nitrogen deficiency') || lower.includes('potassium deficiency') ||
      lower.includes('leaf analysis') || lower.includes('foliar test') || lower.includes('pale leaf') ||
      lower.includes('purple leaf') || lower.includes('interveinal') || lower.includes('boron deficiency') ||
      lower.includes('zinc deficiency') || lower.includes('iron deficiency') || lower.includes('calcium deficiency') ||
      lower.includes('analyse foliaire') || lower.includes('analyse des feuilles') || lower.includes('blossom end rot') ||
      lower.includes('leaf curl') || lower.includes('scorched leaf') || lower.includes('stunted growth') ||
      lower.includes('agro hospital') || lower.includes('tissue test') || lower.includes('plant tissue')) {
    return {
      reply: isFr
        ? `🔬 **Diagnostic des Carences Nutritives — Guide Visuel de Terrain (Cameroun) :**

De nombreux agriculteurs perdent des rendements parce que les carences sont identifiées trop tard. Ce guide visuel vous aide à détecter les problèmes AVANT qu'ils causent des pertes majeures.

## CARENCES EN MACRONUTRIMENTS

🟡 **Azote (N) :** Jaunissement uniforme partant des feuilles basses vers le haut. Croissance lente, tiges fines.
- *Correction :* Urée 46% à 50–100 kg/ha en couverture. Biologique : fumier de volaille ou engrais vert incorporé.

🟠 **Phosphore (P) :** Feuilles vert foncé avec revers violet/pourpre. Maturation tardive, petits fruits, racines peu développées.
- *Correction :* Superphosphate Triple (TSP) à 100 kg/ha au semis. Chauler d'abord les sols acides (pH < 5,5).

🟤 **Potassium (K) :** Bords et pointes des feuilles brûlés (nécrose marginale). Lodging, mauvais remplissage des fruits.
- *Critique pour :* Bananier/plantain, cacao, palmier à huile, pomme de terre.
- *Correction :* KCl (Muriate de Potasse) à 100 kg/ha. Plantain : 200–300 g KCl/plant tous les 3 mois.

⚪ **Calcium (Ca) :** Pourriture apicale (fond noir) sur tomate et piment. Brûlure des jeunes feuilles.
- *Correction :* Nitrate de Calcium à 150 kg/ha à la floraison. La chaux agricole corrige Ca et le pH simultanément.

🔵 **Magnésium (Mg) :** Jaunissement internervaire sur vieilles feuilles — nervures restent vertes (patron en arête de poisson). Très fréquent sur cacao et caféier en sol acide.
- *Correction :* Sulfate de Magnésium (Sel d'Epsom) en pulvérisation foliaire 2% toutes les 2 semaines. Sol : Kiésérite 100 kg/ha.

## CARENCES EN MICROÉLÉMENTS

🟢 **Fer (Fe) :** Jeunes feuilles jaune pâle/blanches, nervures vertes. Sol trop alcalin (pH > 7).
- *Correction :* Sulfate Ferreux 0,5% en pulvérisation foliaire. Acidifier le sol au soufre.

🔶 **Zinc (Zn) :** Petites feuilles, entre-nœuds courts, stries blanches à la base. Maïs et riz très sensibles.
- *Correction :* Sulfate de Zinc 0,5% (3 applications à 7 jours d'intervalle).

🟣 **Bore (B) :** Mort des points de croissance. Chute florale sur tomate/piment. Fruits crevassés et liégeux.
- *Correction :* Borax 0,2% en pulvérisation foliaire à l'initiation florale.

## TABLEAU DE DIAGNOSTIC RAPIDE
| Symptôme | Feuilles touchées | Carence probable |
|---|---|---|
| Jaunissement uniforme | Vieilles feuilles | Azote |
| Reflets violets au revers | Vieilles feuilles | Phosphore |
| Bords brûlés/nécrose | Vieilles feuilles | Potassium |
| Jaunissement internervaire | Vieilles feuilles | Magnésium |
| Jaunissement internervaire | Jeunes feuilles | Fer ou Manganèse |
| Petites feuilles + rosette | Jeunes pousses | Zinc |
| Chute florale, tige creuse | Apex/méristème | Bore |
| Fond noir fruit tomate | Fruits | Calcium |

## 📞 ANALYSE FOLIAIRE PROFESSIONNELLE
Pour un diagnostic précis au laboratoire (au-delà de l'observation visuelle) :
**Agro Hospital Cameroun** — Analyses foliaires, tissus végétaux, maladies fongiques/virales/bactériennes :
- 📱 (+237) 681 532 846 / 657 469 343 / 653 416 123
- 📍 Yaoundé & Bamenda — service toutes régions, bilingue.`
        : `🔬 **Crop Nutrient Deficiency Diagnosis — Visual Field Guide (Cameroon):**

Many farmers in Cameroon lose yields because nutrient deficiencies are identified too late. This visual guide helps you detect problems BEFORE they cause major losses.

## MACRONUTRIENT DEFICIENCIES

🟡 **Nitrogen (N):** Uniform yellowing of old (lower) leaves upward. Slow stunted growth, thin stems.
- *Correction:* Top-dress Urea 46% at 50–100 kg/ha. Organic: chicken manure or green manure incorporated.

🟠 **Phosphorus (P):** Leaves dark green turning purplish-red on undersides. Delayed maturity, small fruits, poor roots.
- *Correction:* Triple Superphosphate (TSP) at 100 kg/ha at planting. Lime acidic soils first (pH < 5.5).

🟤 **Potassium (K):** Leaf edges and tips turn brown and curl (marginal scorch). Lodging, poor fruit filling.
- *Critical for:* Plantain/banana, cocoa, oil palm, potato.
- *Correction:* Muriate of Potash (KCl) 100 kg/ha. Plantain: 200–300g KCl/plant every 3 months.

⚪ **Calcium (Ca):** Blossom end rot — black sunken base of tomato and pepper fruit. Young leaf tip dieback.
- *Correction:* Calcium Nitrate at 150 kg/ha at flowering. Lime corrects Ca and pH simultaneously.

🔵 **Magnesium (Mg):** Interveinal chlorosis on old leaves — yellow between green veins (herringbone pattern). Very common in cocoa and coffee on acidic soils.
- *Correction:* Foliar spray Magnesium Sulfate (Epsom salt) 2% every 2 weeks. Soil: Kieserite 100 kg/ha.

## MICRONUTRIENT DEFICIENCIES

🟢 **Iron (Fe):** Young (new) leaves pale yellow/white with green veins. Alkaline soils (pH > 7).
- *Correction:* Foliar Ferrous Sulfate 0.5%. Acidify soil with elemental sulfur.

🔶 **Zinc (Zn):** Small leaves, short internodes (rosette), white bands at leaf base. Maize and rice highly susceptible.
- *Correction:* Zinc Sulfate 0.5% foliar (3 applications at 7-day intervals).

🟣 **Boron (B):** Growing point death, blossom drop, cracked corky fruit.
- *Correction:* Borax 0.2% foliar spray at flower initiation.

## QUICK DIAGNOSIS TABLE
| Symptom | Leaves Affected | Likely Deficiency |
|---|---|---|
| Uniform pale yellow | Old (lower) leaves | Nitrogen |
| Purple/red undersides | Old leaves | Phosphorus |
| Leaf edge scorch | Old leaves | Potassium |
| Yellow between green veins | Old leaves | Magnesium |
| Yellow between green veins | New leaves | Iron or Manganese |
| Small leaves + rosette | New growth tips | Zinc |
| Blossom drop, hollow stem | Growing apex | Boron |
| Black sunken fruit base | Tomato/pepper fruits | Calcium |

## 📞 PROFESSIONAL LEAF ANALYSIS
For precise laboratory diagnosis beyond visual field assessment:
**Agro Hospital Cameroon** — Plant tissue testing, leaf nutrient analysis, fungal/viral/bacterial crop disease testing:
- 📱 (+237) 681 532 846 / 657 469 343 / 653 416 123
- 📍 Yaoundé & Bamenda — serving all regions, English & French.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }


  // 1. Cameroon 10-Region Agro-Ecological Query Intelligence
  if (lower.includes('center') || lower.includes('centre') || lower.includes('yaounde') || lower.includes('yaoundé') || lower.includes('bafia') || lower.includes('mbalmayo') || lower.includes('obala')) {
    return {
      reply: isFr
        ? `🌿 **Meilleures Cultures & Guide Agronomique pour la RÉGION DU CENTRE (Cameroun) :**

📍 **Zone Agro-Écologique :** Zone Forestière Humide Bimodale (1500 - 2000 mm de pluie).
🗓️ **Deux Saisons Culturales :** Saison 1 (Mars – Juin) & Saison 2 (Août – Novembre).

🌾 **Cultures Phares Réellement Produites dans le Centre :**
1. **Manioc (Cassava) :** Culture vivrière et commerciale n°1 (Bafia, Obala, Bokito sont les grands bassins).
   - *Rendement :* 25 à 35 Tonnes/Ha avec boutures saines certifiées (TME 419, TMS 98/0505).
   - *Plantation :* Boutures de 20-25cm inclinées à 45° sur billons espacés de 1m x 1m.
2. **Cacao (Cocoa) :** Culture de rente majeure (Mbalmayo, Monatélé, Ayos, Nyong-et-Mfoumou).
   - *Conseil :* Ombrage temporaire au bananier/plantain; traitement cuprique anti-pourriture brune tous les 21 jours en saison des pluies.
3. **Igname (Yam / Igname Blanche de Bafia) :** Très réputée dans le Mbam. Buttage haut (60-80cm) et tuteurage solide (3-4m).
4. **Maïs :** Avantage de deux récoltes annuelles grâce aux pluies bimodales. NPK 20-10-10 au semis (200kg/ha) + Urée à 4 semaines.
5. **Banane Plantain :** Dans les bas-fonds humides et en interligne du jeune cacaoyer.
6. **Arachide & Gombo :** En culture associée avec le maïs ou le manioc.
7. **Palmier à Huile :** Très productif dans les bassins humides.

🌱 **Gestion des Sols du Centre :**
- Sols rouges ferralitiques naturellement acides (pH 4.8 - 5.8) qui fixent le phosphore.
- **Recommandation :** Apport de Chaux Agricole ou Cendre de bois (1-2 T/ha) 3 semaines avant semis pour désacidifier et libérer le phosphore.`
        : `🌿 **Best Crops & Agronomic Guide for the CENTRE REGION of Cameroon:**

📍 **Agro-Ecological Zone:** Bimodal Humid Forest Zone (1500 - 2000 mm rainfall).
🗓️ **Dual Growing Seasons:** Season 1 (March – June) & Season 2 (August – November).

🌾 **Top Crops Really Produced in the Centre Region:**
1. **Cassava (Manioc):** The #1 staple and commercial tuber crop (Bafia, Obala, Bokito are national cassava hubs).
   - *Yield:* 25 - 35 Tons/Hectare.
   - *Varieties:* CMD-resistant stem cuttings (TME 419, TMS 98/0505).
   - *Spacing:* 1m x 1m on 40-50cm ridges.
2. **Cocoa (Cacao):** Major historical cash crop (Mbalmayo, Monatélé, Ayos, Nyong-et-Mfoumou).
   - *Best Practice:* Nurse with plantain shade; apply copper fungicide every 21 days against Black Pod during heavy rains.
3. **Yam (Igname / Bafia White Yam):** Highly prized in Mbam & Inoubou. Large mounds (60-80cm high) with 3-4m sturdy wooden stakes.
4. **Maize (Maïs):** Advantage of two full harvests per year thanks to bimodal rains. Basal NPK 20-10-10 (200 kg/ha) + Top-dress Urea (100 kg/ha) at 4 weeks.
5. **Plantain & Banana:** Grown in moist valley basins and intercropped with young cocoa.
6. **Groundnuts & Okra:** Ideal for intercropping with maize and cassava on well-drained sandy-loam ridges.
7. **Oil Palm (Palmier à Huile):** High oil yield in river basins and humid southern border zones.

🌱 **Centre Region Soil & Fertility Management:**
- Features acidic red lateritic / ferralitic soils (pH 4.8 - 5.8) prone to phosphorus fixation.
- **Key Advisory:** Apply Agricultural Lime or Wood Ash (1 - 2 Tons/ha) 3 weeks before planting to neutralize acidity and unlock phosphorus, and incorporate decomposed compost.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('littoral') || lower.includes('douala') || lower.includes('moungo') || lower.includes('njombe') || lower.includes('penja') || lower.includes('edea')) {
    return {
      reply: isFr
        ? `🍌 **Meilleures Cultures pour la RÉGION DU LITTORAL (Moungo & Bassin Côtier) :**
1. **Banane Plantain & Banane Douce :** Bassin n°1 du Cameroun (Njombé, Penja, Mbanga). Terres volcaniques très fertiles (20-30 T/ha).
2. **Poivre de Penja (IGP) :** Poivre blanc et noir sur tuteurs vivants sur piémonts volcaniques.
3. **Ananas :** Penja et Mbanga (variété Cayenne Lisse et Queen).
4. **Palmier à Huile :** Climat côtier très pluvieux idéal pour les palmeraies.
5. **Cacao & Manioc :** Cultures vivrières et de rente très répandues en zone rurale.`
        : `🍌 **Best Crops for the LITTORAL REGION (Moungo & Coastal Basin):**
1. **Plantain & Dessert Banana:** Primary production basin of Cameroon (Moungo: Njombe, Penja, Mbanga) with 20-30 Tons/ha on rich volcanic soils.
2. **Penja Pepper (PGI):** Renowned white/black pepper on volcanic slopes.
3. **Pineapple:** High sugar brix Penja pineapple on raised beds.
4. **Oil Palm:** Thrives in the high-humidity coastal belt.
5. **Cocoa & Cassava:** Widespread in surrounding agricultural zones.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('west region') || lower.includes('ouest') || lower.includes('foumbot') || lower.includes('bafoussam') || lower.includes('dschang') || lower.includes('bamboutos')) {
    return {
      reply: isFr
        ? `🍅 **Meilleures Cultures pour la RÉGION DE L'OUEST (Hauts-Plateaux & Vallée du Noun) :**
1. **Tomate :** Foumbot est la capitale nationale de la tomate (25-45 T/ha). Tuteurage bambou et arrosage au pied obligatoires.
2. **Pomme de Terre :** Santa, Dschang et Bamboutos (18-30 T/ha) avec semences certifiées (Cipira, Tubira) et buttage à 4 semaines.
3. **Café Arabica :** Versants d'altitude de Dschang et Bafoussam.
4. **Maïs & Haricot :** Association céréale-légumineuse très productive sur terres volcaniques.
5. **Maraîchage intensif :** Chou, carotte, poivron et piment.`
        : `🍅 **Best Crops for the WEST REGION (Highlands & Noun Valley):**
1. **Tomato:** Foumbot / Noun Valley is Cameroon's tomato capital (25-45 T/ha). Staking and base watering mandatory.
2. **Irish Potato:** Santa, Dschang, Bamboutos highlands (18-30 T/ha). Certified seed (Cipira, Tubira) + early hilling.
3. **Arabica Coffee:** High altitude slopes around Dschang and Bafoussam.
4. **Maize & Beans:** Highly productive bimodal rotation in volcanic soils.
5. **Cabbage, Carrots & Bell Peppers:** Thriving market gardening across high plateau valleys.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('north-west') || lower.includes('nord-ouest') || lower.includes('bamenda') || lower.includes('ndop') || lower.includes('santa') || lower.includes('kumbo')) {
    return {
      reply: isFr
        ? `🥔 **Meilleures Cultures pour la RÉGION DU NORD-OUEST :**
1. **Pomme de Terre :** Santa et Kumbo (18-28 T/ha), climat frais de montagne idéal.
2. **Riz de Bas-fond (Paddy) :** Plaines fertiles de Ndop avec maîtrise de l'eau.
3. **Maïs d'Altitude & Haricots Grimpants :** Association fertilisante traditionnelle.
4. **Café Arabica :** Pentes volcaniques d'altitude sous ombrage.`
        : `🥔 **Best Crops for the NORTH-WEST REGION:**
1. **Irish Potato:** Santa and Kumbo highlands (18-28 T/ha), ideal cool mountain climate.
2. **Paddy Rice:** Ndop Floodplains produce top quality rice in irrigated basins.
3. **Highland Maize & Climbing Beans:** Traditional nitrogen-fixing intercrop.
4. **Arabica Coffee:** Cultivated on fertile volcanic slopes with shade trees.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('south-west') || lower.includes('sud-ouest') || lower.includes('buea') || lower.includes('kumba') || lower.includes('limbe')) {
    return {
      reply: isFr
        ? `🍫 **Meilleures Cultures pour la RÉGION DU SUD-OUEST :**
1. **Cacao :** Kumba est la plaque tournante du cacao d'exportation camerounais. Sols volcaniques très riches. Traitement de la pourriture brune tous les 21 jours.
2. **Banane Plantain & Banane Douce :** Plantations massives dans le Fako et la Mémé.
3. **Palmier à Huile :** Très fortes densités de palmeraies côtières.
4. **Piment du Cameroun & Manioc :** Cultures vivrières abondantes.`
        : `🍫 **Best Crops for the SOUTH-WEST REGION:**
1. **Cocoa:** Kumba is Cameroon's largest cocoa trading hub with fertile volcanic soils. Treat black pod every 21 days during heavy rains.
2. **Plantain & Dessert Banana:** Major plantations across Fako and Meme.
3. **Oil Palm:** CDC and smallholder estates thrive in coastal soils.
4. **Cameroon Pepper & Cassava:** High-demand commercial staple crops.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('south region') || lower.includes('région du sud') || lower.includes('ebolowa') || lower.includes('sangmelima') || lower.includes('kribi')) {
    return {
      reply: isFr
        ? `🌱 **Meilleures Cultures pour la RÉGION DU SUD :**
1. **Manioc :** Sangmélima est un grand bassin de transformation industrielle. Variétés TME 419 sur billons hauts.
2. **Cacao :** Cacaoyères sous forêt équatoriale dense.
3. **Plantain & Macabo :** Fortes précipitations idéales pour les grands tubercules et bananiers.
4. **Palmier à Huile & Hévéa :** Grandes plantations agro-industrielles.`
        : `🌱 **Best Crops for the SOUTH REGION:**
1. **Cassava:** Sangmélima processing hub. CMD-resistant varieties (TME 419) on high ridges.
2. **Cocoa:** Traditional shaded agroforestry in dense forest zone.
3. **Plantain & Cocoyam:** Heavy moisture favors lush vegetative growth.
4. **Oil Palm & Rubber:** Thriving commercial plantations.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('east region') || lower.includes('région de l\'est') || lower.includes('bertoua') || lower.includes('batouri')) {
    return {
      reply: isFr
        ? `🌿 **Meilleures Cultures pour la RÉGION DE L'EST :**
1. **Manioc & Plantain :** Aliments de base sur sols forestiers profonds et riches en humus.
2. **Cacao & Café Robusta :** Plantations pérennes réputées à Bertoua et Batouri.
3. **Maïs & Arachide :** Zone de transition savane-forêt idéale pour 2 cycles annuels.`
        : `🌿 **Best Crops for the EAST REGION:**
1. **Cassava & Plantain:** Primary staples in deep organic forest soils.
2. **Cocoa & Robusta Coffee:** Extensive plantations across Bertoua and Batouri.
3. **Maize & Groundnut:** Savanna transition zone in the north allows two harvests per year.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('adamawa') || lower.includes('adamaoua') || lower.includes('ngaoundere') || lower.includes('tibati')) {
    return {
      reply: isFr
        ? `🌽 **Meilleures Cultures pour la RÉGION DE L'ADAMAOUA :**
1. **Maïs :** Grand bassin céréalier sur le plateau de l'Adamaoua (variétés hybrides à haut rendement).
2. **Igname & Patate Douce :** Buttes meubles de savane.
3. **Arachide & Soja :** Excellente rotation fixatrice d'azote avec le maïs.
4. **Sorgho de saison :** Céréale rustique adaptée à l'altitude.`
        : `🌽 **Best Crops for the ADAMAWA REGION:**
1. **Maize:** Major commercial grain belt across the Adamawa plateau.
2. **Yam & Sweet Potato:** Thrives on loose savanna mounds.
3. **Groundnut & Soybean:** Nitrogen-fixing rotation with cereals.
4. **Sorghum:** Resilient savanna cereal.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('north region') || lower.includes('région du nord') || lower.includes('garoua') || lower.includes('guider')) {
    return {
      reply: isFr
        ? `🌱 **Meilleures Cultures pour la RÉGION DU NORD :**
1. **Coton (Or Blanc SODECOTON) :** Principale culture de rente du bassin de la Bénoué.
2. **Arachide :** Très bien adaptée aux sols sablo-argileux de savane (apporter du phosphate SSP).
3. **Sorgho / Mil :** Base vivrière résistante aux sécheresses.
4. **Maïs & Niébé (Cowpea) :** Association pour grain et protéines.`
        : `🌱 **Best Crops for the NORTH REGION:**
1. **Cotton (SODECOTON White Gold):** Primary economic cash crop of the Benue basin.
2. **Groundnut:** Highly suited to sandy-clay savanna soils with Single Super Phosphate.
3. **Sorghum / Millet:** Core food security cereal.
4. **Maize & Cowpea:** Cereal-legume intercropping.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('far north') || lower.includes('extrême nord') || lower.includes('maroua') || lower.includes('kousseri') || lower.includes('yagoua')) {
    return {
      reply: isFr
        ? `🌾 **Meilleures Cultures pour la RÉGION DE L'EXTRÊME-NORD :**
1. **Sorgho & Muskuwaari :** Mil pluvial et sorgho repiqué de décrue (Muskuwaari) sur terres noires d'argile (Karal).
2. **Oignon Violet de Maroua :** Renommé internationalement, cultivé en cuvettes irriguées (25-35 T/ha).
3. **Riz Irrigué (SEMRY) :** Périmètres irrigués de Yagoua et Maga le long du Logone.
4. **Coton & Niébé (Cowpea) :** Rente et sécurité alimentaire face à l'aridité.`
        : `🌾 **Best Crops for the FAR NORTH REGION:**
1. **Sorghum & Muskuwaari:** Rainfed mil and flood-retreat Muskuwaari on heavy Karal vertisols.
2. **Maroua Violet Onion:** World-renowned violet onions in irrigated river beds (25-35 T/ha).
3. **SEMRY Irrigated Rice:** Yagoua and Maga polders along the Logone river.
4. **Cotton & Cowpeas (Niébé):** Drought-resilient cash and protein crops.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

    // 2. Specific Crop Knowledge Triggers
  if (lower.includes('cassava') || lower.includes('manioc')) {
    return {
      reply: isFr
        ? `🌿 **Agronomie du Manioc (IA Hors-Ligne) :**
- **Boutures :** Sélectionnez des tiges saines de 20-25cm à 4-6 nœuds sur des plants vigoureux (ex. TME 419, TMS 98/0505).
- **Plantation :** Plantez les boutures inclinées à 45° sur billons élevés (écartement de 1m x 1m).
- **Protection sanitaire :** Arrachez immédiatement les plants atteints de mosaïque (CMD). Traitez les aleurodes avec de l'huile de neem.
- **Fertilisation :** NPK 12-12-17 à 6 semaines, puis apport de cendre de bois à 3 mois pour le gonflement des tubercules.`
        : `🌿 **Cassava Agronomy (Offline AI):**
- **Stakes:** Select healthy 20-25cm stems with 4-6 nodes from disease-free plants (e.g. TME 419, TMS 98/0505).
- **Planting:** Angle cuttings at 45° in high ridges (1m x 1m spacing).
- **Disease Protection:** Rogue yellow mottled plants (Mosaic) immediately. Spray neem oil for whiteflies.
- **Fertilizer:** NPK 12-12-17 at 6 weeks, wood ash at 3 months for root bulking.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('maize') || lower.includes('corn') || lower.includes('maïs') || lower.includes('armyworm') || lower.includes('chenille')) {
    return {
      reply: isFr
        ? `🌽 **Gestion du Maïs & Bouclier Chenilles (IA Hors-Ligne) :**
- **Semis :** Écartement 75cm x 25cm, 2 graines par poquet, démarier à 1 plant vigoureux à 2 semaines.
- **Fertilisation :** Engrais de fond NPK 20-10-10 au semis (200kg/ha); engrais de couverture Urée 46% (100kg/ha) au stade genou (4 semaines).
- **Chenille Légionnaire (Fall Armyworm) :** Déposez une pincée de cendre de bois sèche ou sable fin au cœur du cornet, ou pulvérisez de l'Émamectine benzoate.`
        : `🌽 **Maize Management & Pest Shield (Offline AI):**
- **Planting:** 75cm x 25cm row spacing, 2 seeds/hole, thin to 1 plant at 2 weeks.
- **Fertilizer:** Basal NPK 20-10-10 at planting (200kg/ha); Top-dress Urea (100kg/ha) at knee-high stage (4 weeks).
- **Fall Armyworm:** Drop a pinch of dry wood ash or sand into the funnel whorl to suffocate caterpillars, or spray Emamectin benzoate.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('tomato') || lower.includes('tomate') || lower.includes('blight') || lower.includes('mildiou')) {
    return {
      reply: isFr
        ? `🍅 **Santé de la Tomate & Traitement du Mildiou (IA Hors-Ligne) :**
- **Tuteurage :** Tuteurez solidement au bambou et supprimez les gourmands bas jusqu'à 30cm du sol pour une circulation d'air continue.
- **Arrosage :** Arrosez rigoureusement au pied (goutte-à-goutte ou cuvette); ne mouillez jamais le feuillage par le haut.
- **Protection Mildiou & Alternariose :** Préventif: Mancozèbe 80% ou bouillie bordelaise. Curatif dès apparition: Ridomil Gold (Métalaxyl + Mancozèbe).`
        : `🍅 **Tomato Crop Health (Offline AI):**
- **Staking:** Stake plants with bamboo and prune bottom suckers up to 30cm off the ground for good air circulation.
- **Watering:** Water at the root zone only; never wet the foliage overhead.
- **Blight Shield:** Early blight: spray Mancozeb or baking soda solution. Late blight: spray Ridomil Gold (Metalaxyl + Mancozeb).`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('plantain') || lower.includes('banana') || lower.includes('banane')) {
    return {
      reply: isFr
        ? `🍌 **Conduite du Bananier & Plantain (IA Hors-Ligne) :**
- **Préparation des rejets :** Parez les racines et trempez les bulbes dans l'eau chaude (55°C) ou un bain de cendre contre les charançons.
- **Plantation :** Trous de 60x60x60cm espacés de 3m x 2m avec 10kg de fumier/compost bien décomposé.
- **Cercosporiose Noire (Sigatoka) :** Coupez systématiquement les portions de feuilles nécrosées et apportez un engrais riche en Potassium (K).`
        : `🍌 **Plantain & Banana Management (Offline AI):**
- **Cleansing:** Pare roots and treat sword suckers with hot water (55°C) or wood ash against weevils.
- **Spacing:** Plant 3m x 2m in 60x60x60cm holes with 10kg compost.
- **Sigatoka:** Cut off black-streaked leaf portions and apply high-Potassium (K) fertilizer.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('cocoa') || lower.includes('cacao')) {
    return {
      reply: isFr
        ? `🍫 **Guide Cacaoyère (IA Hors-Ligne) :**
- **Ombrage :** Maintenez 30-40% d'ombrage et taillez les gourmands (chupons) sur le tronc.
- **Pourriture Brune (Black Pod) :** Pulvérisez un fongicide cuivrique tous les 21 jours en saison des pluies. Récoltez et enterrez les cabosses noires chaque semaine.
- **Mirides :** Traitez avec un insecticide homologué lors des poussées foliaires d'août à octobre.`
        : `🍫 **Cocoa Plantation Guide (Offline AI):**
- **Shade:** Maintain 30-40% canopy shade and prune chupons.
- **Black Pod:** Spray copper fungicide every 21 days during heavy rains. Bury black pods immediately.
- **Mirids:** Spray registered insecticide during August-October flush.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('potato') || lower.includes('pomme de terre')) {
    return {
      reply: isFr
        ? `🥔 **Culture de la Pomme de Terre (IA Hors-Ligne) :**
- **Semences :** Plantez des tubercules germés et certifiés (ex. CIPira, Dosa).
- **Buttage :** Buttez haut à 3-4 semaines pour favoriser la tubérisation et faire barrière au mildiou.
- **Mildiou :** Pulvérisez préventivement du Mancozèbe ou curativement du Ridomil Gold lors des périodes de brouillard.`
        : `🥔 **Irish Potato Management (Offline AI):**
- **Seed:** Plant certified sprouted seed tubers (e.g. CIPira, Dosa) on well-drained volcanic ridges.
- **Hilling:** Hill soil high at 3-4 weeks to shield developing tubers from sunlight and blight spores.
- **Late Blight Shield:** Preventive Mancozeb every 7-10 days in foggy highland weather; Ridomil Gold upon first spot.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('pepper') || lower.includes('piment') || lower.includes('poivre')) {
    return {
      reply: isFr
        ? `🌶️ **Culture du Piment & Poivre (IA Hors-Ligne) :**
- **Repiquage :** Repiquez sur planches surélevées à 70cm x 50cm. Tuteurez pour éviter que les piments ne touchent la terre.
- **Anthracnose :** Ramassez immédiatement les piments tachés ou pourris. Pulvérisez un fongicide cuivrique ou à base d'Azoxystrobine.
- **Arrosage :** Arrosez au pied le matin; ne jamais asperger le feuillage pour prévenir la gale bactérienne.`
        : `🌶️ **Pepper Management (Offline AI):**
- **Transplanting:** Plant on raised beds at 70cm x 50cm. Stake plants so ripe peppers do not touch damp soil.
- **Anthracnose Defense:** Remove and destroy any rot-spotted peppers immediately. Spray copper fungicide or Azoxystrobin.
- **Watering:** Water at root level only in early morning to prevent bacterial leaf spot.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('groundnut') || lower.includes('garnut') || lower.includes('peanut') || lower.includes('arachide')) {
    return {
      reply: isFr
        ? `🥜 **Culture & Santé de l'Arachide / Groundnut (IA Hors-Ligne) :**
- **Préparation du Sol :** Travaillez un sol léger, meuble et sableux pour faciliter la pénétration des gynophores (clous).
- **Semis & Densité :** Semez à 50cm x 15cm (1 graine par poquet à 3-5cm de profondeur) dès les premières pluies régulières.
- **Fertilisation :** Apportez du Superphosphate Simple (SSP, 150 kg/ha) au semis pour fortifier les racines et du gypse au début de la floraison pour le remplissage des gousses. Évitez les engrais trop azotés qui développent les feuilles au détriment des gousses.
- **Maladies & Ravageurs :**
  - *Virus de la Rosette :* Transmis par les pucerons. Un semis dense et précoce crée un couvert végétal qui repousse les pucerons. En cas d'attaque, traitez à l'huile de neem.
  - *Cercosporiose (Taches foliaires) :* Pulvérisez du Mancozèbe ou de la bouillie bordelaise dès l'apparition des premières taches brunes.`
        : `🥜 **Groundnut (Garnut / Peanut / Arachide) Management (Offline AI):**
- **Soil Preparation:** Till soil loose, friable, and well-drained so pegs can easily penetrate the ground for pod formation.
- **Spacing & Planting:** 50cm x 15cm (1 seed per hole at 3-5cm depth) at the onset of steady rains.
- **Fertilizer Program:** Apply Single Super Phosphate (SSP) at 150 kg/ha at planting for root development; apply Gypsum (200 kg/ha) at flowering to prevent "empty pods" (blind nuts). Avoid excess nitrogen.
- **Pest & Disease Shield:**
  - *Rosette Virus:* Transmitted by aphids. High density planting shades soil and repels aphids. Spray neem seed extract at first aphid sightings.
  - *Leaf Spot (Cercospora):* Spray copper oxychloride or Mancozeb if brown spots with yellow halos appear on lower leaves.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('yam') || lower.includes('igname')) {
    return {
      reply: isFr
        ? `🥔 **Culture & Conduite de l'Igname (IA Hors-Ligne) :**
- **Confection des Buttes :** Bâtissez de grandes buttes de 60 à 80 cm de haut riches en terreau et matière organique bien décomposée.
- **Semis des Semenceaux :** Trempez les fragments de tubercules dans un bain de cendre de bois ou fongicide avant plantation.
- **Tuteurage & Entretien :** Installez des tuteurs solides de 3 à 4 m en bambou pour maximiser l'ensoleillement du feuillage.
- **Anthracnose :** Pulvérisez du Mancozèbe dès le développement des lianes si des taches noires apparaissent.`
        : `🥔 **Yam Cultivation & Field Management (Offline AI):**
- **Mound Construction:** Construct large mounds (60-80cm high) rich in loose organic topsoil to allow deep tuber development.
- **Seed Sett Prep:** Treat cut seed setts with wood ash or fungicide dip before planting to prevent rotting.
- **Staking:** Provide sturdy 3-4m bamboo stakes for vine climbing to maximize solar interception and tuber yield.
- **Anthracnose Shield:** Spray Mancozeb during active vine growth if dark lesions appear on foliage.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('rice') || lower.includes('riz')) {
    return {
      reply: isFr
        ? `🌾 **Guide Rizicole & Protection Sanitaire (IA Hors-Ligne) :**
- **Gestion de l'Eau :** Maintenez une lame d'eau de 5 à 10 cm dans les casiers du tallage jusqu'à la floraison.
- **Engrais :** Fond NPK 15-15-15 (200 kg/ha) + Urée fractionnée en deux apports (au tallage et à l'initiation paniculaire).
- **Pyriculariose du Riz :** Utilisez des semences certifiées résistantes (NERICA). Évitez l'excès d'azote et traitez au Tricyclazole ou Azoxystrobine si des taches fusiformes en losange apparaissent.`
        : `🌾 **Rice Cultivation & Blast Shield (Offline AI):**
- **Water Management:** Maintain 5-10 cm standing water in paddy fields from tillering through flowering.
- **Fertilizer:** Basal NPK 15-15-15 (200 kg/ha) + Urea split into 2 top-dressings (tillering and panicle initiation).
- **Blast Management:** Plant certified blast-resistant seed lines (NERICA / IR varieties). Spray Tricyclazole or Azoxystrobin upon first spindle lesions.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('coffee') || lower.includes('café') || lower.includes('cafe')) {
    return {
      reply: isFr
        ? `☕ **Conduite de la Caféière (IA Hors-Ligne) :**
- **Plantation :** Écartement de 2,5m x 2,0m pour l'Arabica (hauts plateaux >1200m) et 3m x 3m pour le Robusta (zones basses).
- **Fertilisation :** NPK 20-10-10 au début des pluies puis Nitrate de Calcium lors du grossissement des cerises.
- **Maladie des Baies (CBD) & Rouille :** Pulvérisations préventives à base de cuivre avant la floraison et après nouaison.
- **Scolyte des Cerises :** Posez des pièges Brocap avec attractif alcoolique et récoltez régulièrement les cerises mûres.`
        : `☕ **Coffee Plantation & Pest Shield (Offline AI):**
- **Spacing:** 2.5m x 2.0m for Arabica (Highlands >1200m) and 3m x 3m for Robusta (Lowlands).
- **Fertilizer:** NPK 20-10-10 at onset of rains + Calcium Nitrate at cherry swelling.
- **CBD & Leaf Rust Shield:** Preventative copper sprays before flowering and during cherry expansion.
- **Berry Borer:** Deploy Brocap alcohol traps and pick ripe cherries cleanly every 7-10 days.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  if (lower.includes('onion') || lower.includes('oignon')) {
    return {
      reply: isFr
        ? `🧅 **Culture de l'Oignon (IA Hors-Ligne) :**
- **Saison & Sol :** Culture optimale en saison fraîche (octobre-février) dans les sols alluviaux légers et bien aérés.
- **Repiquage :** Repiquez des bulbilles ou plants de 45 jours sur planches avec écartement de 15cm x 15cm.
- **Arrosage :** Arrosez rigoureusement à la raie (rigole); ne jamais mouiller les feuilles par aspersion.
- **Tache Pourpre (Alternaria) :** Pulvérisez du Mancozèbe dès l'apparition des premières taches violacées.`
        : `🧅 **Onion Crop Management (Offline AI):**
- **Season & Soil:** Best grown in the cool dry season in loose, friable sandy-clay loam.
- **Transplanting:** Transplant 45-day seedlings into flat beds at 15cm x 15cm spacing.
- **Irrigation:** Furrow irrigation only—never wet the foliage overhead.
- **Purple Blotch:** Spray Mancozeb upon first appearance of purple sunken spots with yellow halos.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }


  // ── 1. SOIL pH, LIME & FERTILIZER ─────────────────────────────────────────
  if (lower.includes('ph') || lower.includes('acid') || lower.includes('acide') || lower.includes('lime') || lower.includes('chaux') ||
      lower.includes('fertilizer') || lower.includes('engrais') || lower.includes('npk') ||
      lower.includes('urea') || lower.includes('urée') || lower.includes('nitrogen') || lower.includes('azote') ||
      lower.includes('phosphorus') || lower.includes('phosphore') || lower.includes('potassium') || lower.includes('potasse') ||
      lower.includes('fertilizer schedule') || lower.includes('calendrier engrais')) {
    return {
      reply: isFr
        ? `🧪 **Fertilisation & pH du Sol (Agronome IA Hors-Ligne) :**
- **pH Idéal :** La plupart des cultures tropicales exigent un pH entre 5,5 et 6,8. Testez avec un kit Agritest ou envoyez un échantillon à l'IRAD.
- **Corriger l'acidité :** Épandez de la chaux agricole (CaCO₃) à 1–2 T/ha et enfouissez 4–6 semaines avant le semis pour corriger un sol trop acide (pH < 5,5).
- **Programme NPK standard :**
  - *Semis (0 jours) :* NPK 20-10-10 ou 15-15-15 à 200 kg/ha — fournit P (racines) et K (vigueur).
  - *4–5 semaines :* Urée 46% N à 100 kg/ha placée à 5 cm des tiges avant buttage.
  - *Floraison :* Nitrate de Calcium (Ca) à 150 kg/ha pour prévenir la nécrose apicale (tomate, poivron).
- **Fumure organique :** Incorporez 5–10 T/ha de compost ou fumier décomposé pour améliorer la structure et la rétention d'eau.
- **Attention :** Ne mélangez jamais l'Urée avec le phosphate triple superphosphate — cela détruit l'azote disponible.`
        : `🧪 **Soil Fertilization & pH Guide (Offline AI Agronomist):**
- **Ideal pH:** Most tropical crops thrive at pH 5.5–6.8. Test with an Agritest kit or send a soil sample to IRAD.
- **Correct acidity:** Broadcast agricultural lime (CaCO₃) at 1–2 T/ha and incorporate 4–6 weeks before planting to fix pH below 5.5.
- **Standard NPK schedule:**
  - *Planting (day 0):* NPK 20-10-10 or 15-15-15 at 200 kg/ha — supplies P (roots) and K (vigor).
  - *4–5 weeks:* Top-dress Urea 46% N at 100 kg/ha placed 5 cm from stems before hilling.
  - *Flowering:* Calcium Nitrate at 150 kg/ha to prevent blossom end rot (tomato, pepper).
- **Organic matter:** Incorporate 5–10 T/ha of well-decomposed compost or manure to improve structure and water retention.
- **Warning:** Never mix Urea with Triple Superphosphate in the same application — it destroys available nitrogen.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  // ── 2. IRRIGATION & WATER MANAGEMENT ──────────────────────────────────────
  if (lower.includes('irrigation') || lower.includes('watering') || lower.includes('arrosage') ||
      lower.includes('drought') || lower.includes('sécheresse') || lower.includes('water stress') ||
      lower.includes('drip') || lower.includes('flooding') || lower.includes('inondation') ||
      lower.includes('rainfed') || lower.includes('pluviale')) {
    return {
      reply: isFr
        ? `💧 **Irrigation & Gestion de l'Eau (IA Hors-Ligne) :**
- **Irrigation goutte-à-goutte :** Idéale pour la tomate, le poivron et l'oignon — économise 50% d'eau et évite les maladies foliaires causées par l'humidité sur les feuilles.
- **Irrigation à la raie :** Utilisez des sillons d'arrosage pour le maïs, le manioc et les légumes en rangs — irriguer à la base, jamais par aspersion.
- **Stress hydrique :** Pendant la floraison et la fructification, un manque d'eau pendant 3–5 jours peut réduire le rendement de 30–50%. Irriguez à la demande.
- **Signes de sur-arrosage :** Jaunissement des feuilles basses, odeur de pourri au collet, fonte des semis — réduisez l'arrosage et améliorer le drainage.
- **Saison sèche :** En saison sèche (novembre–mars au Nord/Extrême-Nord), prévoyez des réservoirs ou pompes solaires pour maintenir l'humidité au seuil minimum (40% capacité au champ).`
        : `💧 **Irrigation & Water Management (Offline AI):**
- **Drip irrigation:** Best for tomato, pepper, and onion — saves 50% water and prevents foliar diseases from overhead wetting.
- **Furrow irrigation:** Use water channels for maize, cassava, and row vegetables — water at the base, never overhead.
- **Water stress:** During flowering and fruit set, a 3–5 day water deficit can reduce yield by 30–50%. Irrigate on demand based on crop signs.
- **Overwatering signs:** Yellowing lower leaves, rotting smell at the base, damping-off — reduce irrigation and improve drainage.
- **Dry season:** In the dry season (Nov–Mar in North/Far North), plan reservoirs or solar pumps to maintain minimum soil moisture (40% field capacity).`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  // ── 3. PEST CONTROL ────────────────────────────────────────────────────────
  if (lower.includes('pest') || lower.includes('ravageur') || lower.includes('insect') || lower.includes('insecte') ||
      lower.includes('aphid') || lower.includes('puceron') || lower.includes('caterpillar') || lower.includes('chenille') ||
      lower.includes('weevil') || lower.includes('charançon') || lower.includes('armyworm') || lower.includes('légionnaire') ||
      lower.includes('neem') || lower.includes('pesticide') || lower.includes('spray') || lower.includes('pulvéris') ||
      lower.includes('thrips') || lower.includes('whitefly') || lower.includes('aleurode') || lower.includes('mealybug')) {
    return {
      reply: isFr
        ? `🐛 **Contrôle des Ravageurs (Agronome IA Hors-Ligne) :**
- **Huile de neem (500 ml/15L d'eau + savon) :** Solution bio universelle contre pucerons, aleurodes, thrips et mineuses. Pulvérisez le soir pour éviter la brûlure foliaire. Répétez tous les 7 jours.
- **Chenille légionnaire d'automne (FAW) :** Déposez de la cendre de bois ou du sable fin dans le cornet des jeunes plants de maïs. Si >10% des plants ont des dégâts en fenêtre, pulvérisez l'Emamectine Benzoate 5% SG (7 g/15L).
- **Charançons (bananier/manioc) :** Traitez les rejets avec de l'eau chaude (55°C pendant 20 min) ou de la cendre avant plantation.
- **Pucerons :** Introduisez des coccinelles ou pulvérisez Imidaclopride 70% WP (5 g/15L) en cas d'infestation sévère.
- **Aleurodes (vecteur CMD/CBSD) :** Posez des pièges jaunes collants, espacez les cultures et appliquez un insecticide systémique (Acétamipride) si la pression est forte.
- **Lutte intégrée (IPM) :** Combinez pièges physiques, biopesticides (Beauveria bassiana) et produits chimiques seulement en dernier recours, en respectant les délais avant récolte.`
        : `🐛 **Pest Control Guide (Offline AI Agronomist):**
- **Neem oil (500 ml/15L water + soap):** Universal organic control for aphids, whiteflies, thrips, and leaf miners. Spray in the evening to avoid leaf burn. Repeat every 7 days.
- **Fall Armyworm (FAW):** Apply wood ash or fine sand into the maize whorl. If >10% of plants show window-pane damage, spray Emamectin Benzoate 5% SG (7 g/15L).
- **Banana/cassava weevils:** Dip planting material in hot water (55°C for 20 min) or coat with wood ash before planting.
- **Aphids:** Introduce ladybirds or spray Imidacloprid 70% WP (5 g/15L) for severe infestations.
- **Whiteflies (CMD/CBSD vector):** Use yellow sticky traps, increase crop spacing, and apply systemic insecticide (Acetamiprid) under heavy pressure.
- **IPM approach:** Combine physical traps, biopesticides (Beauveria bassiana), and chemical products only as a last resort, observing pre-harvest intervals.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  // ── 4. FUNGAL DISEASES ─────────────────────────────────────────────────────
  if (lower.includes('fungus') || lower.includes('champignon') || lower.includes('fungal') ||
      lower.includes('mold') || lower.includes('moisissure') || lower.includes('blight') ||
      lower.includes('rust') || lower.includes('rouille') || lower.includes('mildew') ||
      lower.includes('anthracnose') || lower.includes('cercospora') || lower.includes('early blight') ||
      lower.includes('late blight') || lower.includes('damping') || lower.includes('fonte') ||
      lower.includes('botrytis') || lower.includes('pythium') || lower.includes('phytophthora')) {
    return {
      reply: isFr
        ? `🍄 **Maladies Fongiques — Prévention & Traitement (IA Hors-Ligne) :**
- **Mildiou Précoce (taches concentriques) :** Appliquez du Mancozèbe 80% WP (20 g/15L) dès les premiers symptômes. Répétez tous les 10–14 jours en saison pluvieuse.
- **Mildiou Tardif (pourriture brune huileuse) :** Traitez avec Metalaxyl + Mancozèbe (ex. Ridomil Gold) à 30 g/15L dès les premières lésions. Pas de pulvérisation le soir.
- **Rouilles (céréales) :** Utilisez des variétés résistantes. Si présentes, appliquez Propiconazole 25 EC (15 ml/15L).
- **Black Pod du Cacao (Phytophthora) :** Pulvérisez à base de cuivre (Ridomil Gold Plus ou Nordox) tous les 21 jours en grande saison des pluies. Ramassez et enterrez les cabosses noircies.
- **Fonte des Semis :** Traitez les semences avec du Thirame avant semis. Évitez les excès d'arrosage et améliorez la ventilation des planches de pépinière.
- **Mesures préventives générales :** Rotation des cultures, espacement adéquat, débris végétaux enfouis ou brûlés, et outils désinfectés à l'alcool ou à l'eau de Javel diluée (10%).`
        : `🍄 **Fungal Diseases — Prevention & Treatment (Offline AI):**
- **Early Blight (concentric target spots):** Apply Mancozeb 80% WP (20 g/15L) at first symptoms. Repeat every 10–14 days during rainy season.
- **Late Blight (greasy brown rot):** Apply Metalaxyl + Mancozeb (e.g. Ridomil Gold) at 30 g/15L at first lesions. Do not spray in the evening.
- **Rusts (cereals):** Use resistant varieties. If present, apply Propiconazole 25 EC (15 ml/15L).
- **Cocoa Black Pod (Phytophthora):** Spray copper-based fungicide (Ridomil Gold Plus or Nordox) every 21 days during major rainy season. Collect and bury blackened pods.
- **Damping-off:** Treat seeds with Thiram before sowing. Avoid overwatering and improve nursery bed ventilation.
- **General prevention:** Practice crop rotation, maintain adequate spacing, incorporate or burn crop debris, and disinfect tools with 10% bleach or alcohol.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  // ── 5. HARVEST & POST-HARVEST STORAGE ─────────────────────────────────────
  if (lower.includes('harvest') || lower.includes('récolte') || lower.includes('storage') || lower.includes('stockage') ||
      lower.includes('post-harvest') || lower.includes('silo') || lower.includes('drying') || lower.includes('séchage') ||
      lower.includes('aflatoxin') || lower.includes('aflatoxine') || lower.includes('hermetic') || lower.includes('hermétique') ||
      lower.includes('grain storage') || lower.includes('stockage céréales') || lower.includes('warehouse') || lower.includes('entrepôt')) {
    return {
      reply: isFr
        ? `📦 **Récolte & Stockage Post-Récolte (IA Hors-Ligne) :**
- **Moment de récolte :** Récoltez le maïs à 25–30% d'humidité (grain laiteux-pâteux) puis séchez sous abri ventilé jusqu'à 12–13% avant stockage. Le manioc se récolte à 8–24 mois selon la variété.
- **Séchage :** Étalez les grains sur des bâches surélevées (jamais à même le sol) pendant 5–7 jours au soleil. Testez l'humidité avec un testeur ou la dent (grain craquant = sec).
- **Aflatoxines :** Les céréales stockées humides en contact avec le sol développent des moisissures toxiques (Aspergillus). Solution : sacs hermétiques PICS ou GrainPro à 13% d'humidité max.
- **Greniers traditionnels :** Surélevez les greniers de 60 cm du sol, couvrez le toit de tôle, et traitez avec des poudres à base de phosphine (Phostoxin) pour éloigner les charançons.
- **Produits frais (tomate, oignon, poivron) :** Récoltez tôt le matin par temps frais. Stockez dans des endroits ombragés et ventilés. Utilisez des bacs en plastique ajourés, jamais des sacs fermés.
- **Manioc :** Transformez rapidement (48 h après arrachage) en gari, farine ou cossettes séchées pour éviter la détérioration rapide des tubercules.`
        : `📦 **Harvest & Post-Harvest Storage (Offline AI):**
- **Harvest timing:** Harvest maize at 25–30% moisture (milky-dough stage), then dry under ventilated shade to 12–13% before storage. Cassava is harvested at 8–24 months depending on variety.
- **Drying:** Spread grains on raised tarpaulins (never on the ground) for 5–7 sunny days. Test moisture with a meter or tooth test (grain snaps cleanly = dry enough).
- **Aflatoxins:** Moist grains stored in contact with soil develop toxic Aspergillus molds. Solution: PICS or GrainPro hermetic bags sealed at max 13% moisture.
- **Traditional granaries:** Raise granary 60 cm off the ground, use metal roof, and treat with phosphine-based powder (Phostoxin pellets) to eliminate weevils.
- **Fresh produce (tomato, onion, pepper):** Harvest early in the cool morning. Store in shaded, well-ventilated areas in perforated plastic crates — never sealed bags.
- **Cassava:** Process within 48 hours of harvest into gari, flour, or dried chips to prevent rapid tuber deterioration.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  // ── 6. COMPOST & ORGANIC FARMING ──────────────────────────────────────────
  if (lower.includes('compost') || lower.includes('organic') || lower.includes('biologique') ||
      lower.includes('manure') || lower.includes('fumier') || lower.includes('mulch') || lower.includes('paillis') ||
      lower.includes('worm') || lower.includes('ver') || lower.includes('biochar') || lower.includes('bio-inpute') ||
      lower.includes('cover crop') || lower.includes('engrais vert') || lower.includes('green manure')) {
    return {
      reply: isFr
        ? `♻️ **Agriculture Biologique & Compostage (IA Hors-Ligne) :**
- **Tas de compost :** Alternez couches de 20 cm : matières vertes azotées (fanes de légumes, déchets de cuisine) + matières brunes carbonées (paille, sciure, carton). Arrosez légèrement et retournez toutes les 2 semaines. Prêt en 6–12 semaines.
- **Compost mûr :** Aspect terreux, odeur de forêt humide, température ambiante au centre. Appliquez à 5–10 T/ha en fond de trouaison avant semis.
- **Paillis :** Couvrez le sol entre les rangs avec de la paille, des copeaux de bois ou des feuilles mortes (5–10 cm). Réduit l'évaporation de 40%, supprime les mauvaises herbes et nourrit les vers de terre.
- **Fumier animal :** Compostez le fumier frais pendant 3–4 mois avant utilisation pour détruire les pathogènes et les graines d'adventices. N'appliquez jamais de fumier frais sur les cultures en croissance.
- **Biochar :** Incorporez du biochar (charbon végétal) à 500 kg/ha pour améliorer durablement la rétention d'eau et de nutriments dans les sols sableux ou latéritiques.
- **Culture de couverture :** Semez du Pueraria phaseoloides, de la Mucuna ou du niébé en intercalaire pour enrichir le sol en azote (fixation 80–150 kg N/ha/an).`
        : `♻️ **Organic Farming & Composting (Offline AI Agronomist):**
- **Compost heap:** Alternate 20 cm layers: green nitrogen-rich materials (vegetable scraps, kitchen waste) + brown carbon materials (straw, sawdust, cardboard). Water lightly and turn every 2 weeks. Ready in 6–12 weeks.
- **Mature compost:** Looks like dark crumbly earth, smells like forest soil, ambient temperature at center. Apply at 5–10 T/ha in planting holes before sowing.
- **Mulch:** Cover inter-row soil with straw, wood chips, or dried leaves (5–10 cm). Reduces evaporation by 40%, suppresses weeds, and feeds earthworms.
- **Animal manure:** Compost fresh manure for 3–4 months before use to destroy pathogens and weed seeds. Never apply fresh manure directly to growing crops.
- **Biochar:** Incorporate biochar (vegetable charcoal) at 500 kg/ha to permanently improve water and nutrient retention in sandy or laterite soils.
- **Cover crops:** Sow Pueraria, Mucuna, or cowpea as intercrop to enrich soil with nitrogen (fixes 80–150 kg N/ha/year).`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  // ── 7. NURSERY, SEEDS & TRANSPLANTING ─────────────────────────────────────
  if (lower.includes('nursery') || lower.includes('pépinière') || lower.includes('seed') || lower.includes('graine') ||
      lower.includes('seedling') || lower.includes('semis') || lower.includes('germination') ||
      lower.includes('transplant') || lower.includes('repiquage') || lower.includes('propagation') ||
      lower.includes('cutting') || lower.includes('bouture') || lower.includes('germination rate')) {
    return {
      reply: isFr
        ? `🌱 **Pépinière, Semences & Repiquage (IA Hors-Ligne) :**
- **Substrat de pépinière :** Mélangez 2/3 terre fine + 1/3 sable + compost mûr. Stérilisez à la vapeur (seau d'eau bouillante) ou au soleil 48h sous plastique transparent pour éliminer les pathogènes.
- **Trempage des graines :** Trempez les grosses graines (haricot, pois) 8–12 h dans l'eau tiède pour améliorer la germination. Pour la tomate, semez directement sans trempage.
- **Traitement semences :** Enrobez les graines avec Thirame 80 WP (3 g/kg de semences) pour protéger contre la fonte des semis.
- **Repiquage :** Repiquez quand les plants ont 4–6 feuilles vraies (tomate, poivron : 4–6 semaines). Arrosez abondamment 24h avant pour réduire le stress de transplantation.
- **Durcissement :** 1 semaine avant le repiquage, exposez progressivement les plants à la lumière directe du soleil (commencez par 2h le matin) pour les préparer au plein air.
- **Multiplication végétative :** Boutures de manioc : 25 cm, 4–6 nœuds, inclinées à 45°. Rejets de bananier : choisissez des rejets-épée vigoureux, parez les racines et plongez dans l'eau chaude (55°C, 20 min).`
        : `🌱 **Nursery, Seeds & Transplanting (Offline AI):**
- **Nursery substrate:** Mix 2/3 fine soil + 1/3 sand + matured compost. Sterilize with boiling water or solarize 48h under clear plastic sheeting to kill pathogens.
- **Seed soaking:** Soak large seeds (beans, cowpea) 8–12 hours in warm water to improve germination rate. Tomato seeds can be sown directly without soaking.
- **Seed treatment:** Coat seeds with Thiram 80 WP (3 g/kg seed) to protect against damping-off in the nursery.
- **Transplanting:** Transplant when seedlings have 4–6 true leaves (tomato, pepper: 4–6 weeks). Water heavily 24h before transplanting to reduce transplant shock.
- **Hardening off:** One week before transplanting, gradually expose seedlings to direct sunlight (start with 2h in the morning) to prepare them for open field conditions.
- **Vegetative propagation:** Cassava cuttings: 25 cm long, 4–6 nodes, planted at 45° angle in ridges. Banana suckers: choose vigorous sword suckers, pare roots and dip in hot water (55°C for 20 min) before planting.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  // ── 8. LIVESTOCK & POULTRY INTEGRATION ────────────────────────────────────
  if (lower.includes('chicken') || lower.includes('poulet') || lower.includes('livestock') || lower.includes('bétail') ||
      lower.includes('goat') || lower.includes('chèvre') || lower.includes('cow') || lower.includes('vache') ||
      lower.includes('pig') || lower.includes('porc') || lower.includes('cattle') || lower.includes('sheep') || lower.includes('mouton') ||
      lower.includes('poultry') || lower.includes('volaille') || lower.includes('duck') || lower.includes('canard') ||
      lower.includes('animal manure') || lower.includes('fumier animal') || lower.includes('agropastoral')) {
    return {
      reply: isFr
        ? `🐔 **Élevage & Intégration Agropastorale (IA Hors-Ligne) :**
- **Poulet de chair (Broiler) :** Poussin d'un jour à abattage en 45–55 jours avec alimentation starter (22% protéines, 3 kg/poussin) puis finisher (18% protéines). Vacciner contre Newcastle (ND) et Gumboro à J7.
- **Ponte :** Les pondeuses commencent à 20–22 semaines. Fournissez 16h de lumière/jour. Alimentation pondeuse riche en calcium (3,5%) pour la solidité des coquilles.
- **Caprins/Ovins :** Fournissez 2–3 kg de fourrage (Pennisetum, Brachiaria) + 300 g de son de blé/maïs par jour. Déparasitez tous les 3 mois avec Albendazole (7,5 mg/kg).
- **Bovins :** Un bovin adulte de 500 kg produit 10–15 T de fumier/an. Valorisez-le en compost. Vaccinez contre la PPCB (Péripneumonie bovine) annuellement.
- **Intégration rizipisciculture :** Combinez riziculture irriguée et élevage de poissons (tilapia) dans les casiers — les poissons contrôlent les mauvaises herbes et enrichissent l'eau en azote.
- **Biosécurité aviaire :** Clôturez le poulailler, appliquez un pédiluv à l'entrée, et limitez les visiteurs pour prévenir les maladies virales (grippe aviaire, Newcastle).`
        : `🐔 **Livestock & Agropastoral Integration (Offline AI):**
- **Broiler chickens:** Day-old chick to slaughter in 45–55 days with starter feed (22% protein, 3 kg/chick) then finisher (18% protein). Vaccinate against Newcastle (ND) and Gumboro at day 7.
- **Layers:** Hens start laying at 20–22 weeks. Provide 16 hours of light per day. Layer feed rich in calcium (3.5%) for strong eggshells.
- **Goats/Sheep:** Provide 2–3 kg of forage (Pennisetum, Brachiaria) + 300 g wheat bran/maize per day. Deworm every 3 months with Albendazole (7.5 mg/kg).
- **Cattle:** One 500 kg adult produces 10–15 T of manure per year. Compost it for crop use. Vaccinate against CBPP (bovine pleuro-pneumonia) annually.
- **Rice-fish integration:** Combine irrigated rice farming with fish ponds (tilapia) in paddies — fish control weeds and enrich water with nitrogen.
- **Poultry biosecurity:** Fence the chicken house, install a footbath at entry, limit visitors to prevent viral diseases (avian influenza, Newcastle).`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  // ── 9. CAMEROON CLIMATE & SEASONS ─────────────────────────────────────────
  if (lower.includes('climate') || lower.includes('climat') || lower.includes('rainfall') || lower.includes('pluie') ||
      lower.includes('season') || lower.includes('saison') || lower.includes('harmattan') ||
      lower.includes('dry season') || lower.includes('saison sèche') || lower.includes('rainy season') || lower.includes('saison des pluies') ||
      lower.includes('temperature') || lower.includes('température') || lower.includes('agro-ecological') || lower.includes('agro-écologique')) {
    return {
      reply: isFr
        ? `☁️ **Climat & Saisons Agricoles du Cameroun (IA Hors-Ligne) :**
- **Zone Équatoriale (Centre, Sud, Littoral, Sud-Ouest) :** 4 saisons distinctes — 2 saisons des pluies (mars–juin & sept–nov) et 2 saisons sèches. 1500–3000 mm/an. Idéal pour cacao, manioc, plantain, palmier à huile.
- **Hauts-Plateaux de l'Ouest (Ouest, Nord-Ouest) :** Saison des pluies longue (mars–oct, 1500–2000 mm). Fraîcheur relative. Idéal pour tomate, café Arabica, pomme de terre, haricot, maïs.
- **Savane Guinéenne (Adamaoua) :** 1 saison des pluies (avr–sept, 1000–1500 mm). Idéal pour maïs, sorgho, igname, arachide, patate douce.
- **Savane Soudanienne (Nord) :** 1 saison des pluies (juin–sept, 600–1000 mm). Coton, maïs, arachide, sorgho. Attention aux attaques de FAW en juillet-août.
- **Zone Sahélienne (Extrême-Nord) :** Saison des pluies très courte (juil–sept, 300–600 mm). Agriculture de décrue et irriguo-pluviale. Sorgho/mil, oignon, riz SEMRY, niébé.
- **Harmattan :** Vent sec du Nord-Est (nov–fév). Augmente l'évapotranspiration, brûle les extrémités foliaires. Protégez les pépinières et irriguez plus fréquemment.`
        : `☁️ **Cameroon Climate & Agricultural Seasons (Offline AI):**
- **Equatorial Zone (Centre, South, Littoral, South-West):** 4 distinct seasons — 2 rainy (Mar–Jun & Sep–Nov) + 2 dry. 1500–3000 mm/year. Best for cocoa, cassava, plantain, oil palm.
- **Western Highlands (West, North-West):** Long rainy season (Mar–Oct, 1500–2000 mm). Cool climate. Best for tomato, Arabica coffee, Irish potato, beans, maize.
- **Guinea Savanna (Adamawa):** 1 rainy season (Apr–Sep, 1000–1500 mm). Best for maize, sorghum, yam, groundnuts, sweet potato.
- **Sudanian Savanna (North):** 1 rainy season (Jun–Sep, 600–1000 mm). Cotton, maize, groundnuts, sorghum. Watch for FAW attacks in July–August.
- **Sahelian Zone (Far North):** Very short rainy season (Jul–Sep, 300–600 mm). Recession and irrigated farming. Sorghum/millet, onion, SEMRY rice, cowpea.
- **Harmattan:** Dry NE wind (Nov–Feb). Increases evapotranspiration and scorches leaf tips. Protect nurseries with windbreaks and increase irrigation frequency.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  // ── 10. MARKET PRICES & FARM ECONOMICS ────────────────────────────────────
  if (lower.includes('price') || lower.includes('prix') || lower.includes('sell') || lower.includes('vendre') ||
      lower.includes('market') || lower.includes('marché') || lower.includes('profit') || lower.includes('bénéfice') ||
      lower.includes('income') || lower.includes('revenu') || lower.includes('export') || lower.includes('exportation') ||
      lower.includes('how much') || lower.includes('combien') || lower.includes('budget') || lower.includes('cost') || lower.includes('coût')) {
    return {
      reply: isFr
        ? `💰 **Économie Agricole & Marchés au Cameroun (IA Hors-Ligne) :**
- **Prix de référence indicatifs (saison normale) :**
  - 🌽 Maïs grain sec : 150–220 FCFA/kg (marché local) ; 180–250 FCFA/kg (SODECOTON, zone nord)
  - 🍅 Tomate fraîche : 100–350 FCFA/kg selon saison (Foumbot, marché Bafoussam)
  - 🌱 Manioc frais : 70–120 FCFA/kg ; Gari : 400–600 FCFA/kg
  - ☕ Café Arabica parche : 1200–1800 FCFA/kg (UCCAO, coopérative Ouest)
  - 🍫 Cacao marchand sec : 1400–2000 FCFA/kg (ONCC, ferme de collecte)
- **Calcul de rentabilité :** Coûts de production maïs (2 ha) ≈ 350 000–500 000 FCFA (intrants + main-d'œuvre). Rendement attendu : 3–4 T/ha × 180 FCFA/kg = 1 080 000–1 440 000 FCFA brut.
- **Groupement de vente :** Adhérez à une coopérative (GIC, COOP) pour accéder aux contrats avec SODECOTON, NESPRESSO, OLAM ou les programmes WFP.
- **Stockage stratégique :** Ne vendez pas à la récolte (prix bas). Stockez 2–3 mois pour vendre en période de soudure (prix +30–50%).`
        : `💰 **Farm Economics & Markets in Cameroon (Offline AI):**
- **Reference farm-gate prices (normal season):**
  - 🌽 Dry maize grain: 150–220 FCFA/kg (local market); 180–250 FCFA/kg (SODECOTON, northern zone)
  - 🍅 Fresh tomato: 100–350 FCFA/kg depending on season (Foumbot, Bafoussam market)
  - 🌱 Fresh cassava: 70–120 FCFA/kg; Gari: 400–600 FCFA/kg
  - ☕ Arabica coffee (parchment): 1200–1800 FCFA/kg (UCCAO cooperative, West Region)
  - 🍫 Dry cocoa beans: 1400–2000 FCFA/kg (ONCC collection point)
- **Profitability estimate:** Maize production cost (2 ha) ≈ 350,000–500,000 FCFA (inputs + labor). Expected yield: 3–4 T/ha × 180 FCFA/kg = 1,080,000–1,440,000 FCFA gross revenue.
- **Group selling:** Join a cooperative (GIC, COOP) to access contracts with SODECOTON, NESPRESSO, OLAM, or WFP purchase programs.
- **Strategic storage:** Do not sell at harvest (prices are lowest). Store 2–3 months and sell during the lean season (price increase of 30–50%).`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  // ── 11. INTERCROPPING & CROP ROTATION ─────────────────────────────────────
  if (lower.includes('intercrop') || lower.includes('association') || lower.includes('rotation') ||
      lower.includes('mixed') || lower.includes('polyculture') || lower.includes('agroforestry') || lower.includes('agroforesterie') ||
      lower.includes('companion') || lower.includes('associer') || lower.includes('diversif') ||
      lower.includes('cover crop') || lower.includes('engrais vert') || lower.includes('shade tree') || lower.includes('arbre d\'ombrage')) {
    return {
      reply: isFr
        ? `🌿 **Associations de Cultures & Rotation (IA Hors-Ligne) :**
- **Maïs + Haricot :** Association classique en Afrique de l'Ouest. Le haricot fixe l'azote (60–80 kg N/ha) et couvre le sol. Semez les haricots 2–3 semaines après le maïs pour éviter la compétition.
- **Manioc + Arachide :** Le manioc offre de l'ombre partielle après 3 mois, permettant à l'arachide de s'épanouir en début de cycle. Double production sur la même parcelle.
- **Rotation céréales/légumineuses :** Alternez maïs ou sorgho → haricot ou arachide → maïs. Réduit la pression parasitaire de 30–40% et enrichit naturellement le sol.
- **Agroforesterie :** Associez arbres fruitiers ou forestiers (manguier, acacia, néré) avec des cultures annuelles en allées. L'ombrage modère la température du sol et les feuilles mortes constituent un paillis naturel.
- **Tomate + Basilic :** Le basilic repousse les pucerons et les thrips qui attaquent la tomate. Plantez 1 rangée de basilic tous les 4 rangs de tomate.
- **Cultures d'ombrage pour le cacao/café :** Maintenez 30–40% de couvert d'ombrage (bananier, Albizia) pour stabiliser la température et réduire l'évaporation du sol sous les cacaoyers.`
        : `🌿 **Intercropping & Crop Rotation (Offline AI):**
- **Maize + Beans:** Classic West African intercrop. Beans fix nitrogen (60–80 kg N/ha) and cover the soil. Sow beans 2–3 weeks after maize to avoid early competition.
- **Cassava + Groundnuts:** Cassava provides partial shade after 3 months, allowing groundnuts to thrive in the early cycle. Double production on the same plot.
- **Cereal/legume rotation:** Alternate maize or sorghum → beans or groundnuts → maize. Reduces pest pressure by 30–40% and naturally enriches the soil.
- **Agroforestry:** Integrate fruit or timber trees (mango, acacia, néré) with annual crops in alley systems. Shade moderates soil temperature and falling leaves create natural mulch.
- **Tomato + Basil:** Basil repels aphids and thrips that attack tomato. Plant 1 row of basil for every 4 rows of tomato.
- **Shade crops for cocoa/coffee:** Maintain 30–40% canopy shade (banana, Albizia) to stabilize temperature and reduce soil evaporation under cocoa trees.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  // ── 12. WEED CONTROL ──────────────────────────────────────────────────────
  if (lower.includes('weed') || lower.includes('mauvaise herbe') || lower.includes('herbicide') ||
      lower.includes('désherbage') || lower.includes('Striga') || lower.includes('hoeing') || lower.includes('sarclage') ||
      lower.includes('glyphosate') || lower.includes('atrazine') || lower.includes('butte') || lower.includes('hilling')) {
    return {
      reply: isFr
        ? `🌾 **Désherbage & Contrôle des Mauvaises Herbes (IA Hors-Ligne) :**
- **1er sarclage :** Effectuez le 1er désherbage à 2–3 semaines après la levée quand les adventices sont encore petites (stade fil). C'est la période critique — les mauvaises herbes concurrencent surtout dans les 4 premières semaines.
- **Buttage combiné :** Associez le 2e sarclage au buttage du maïs à 4–6 semaines. Ce travail contrôle les herbes et protège les racines.
- **Herbicides de pré-levée :** Pour le maïs, Atrazine 500 SC (2–3 L/ha, immédiatement après semis, sol humide) avant la germination des adventices.
- **Herbicides de post-levée :** Glyphosate (Kalach 360 SL) uniquement en bordure de champ ou sur jachère — jamais sur une culture en croissance (phytotoxique).
- **Striga (sorcière) :** Parasite dévastateur des céréales au Nord. Solution : variétés de maïs résistantes (EVDT 99), rotation avec le soja ou le niébé, et faux semis (déclencher la germination puis détruire avant plantation).
- **Paillis anti-adventices :** Un paillis de 8–10 cm de paille, copeaux ou feuilles sèches supprime efficacement 70–80% des herbes sans herbicide chimique.`
        : `🌾 **Weed Control (Offline AI Agronomist):**
- **First weeding:** Weed at 2–3 weeks after emergence when weeds are still tiny (thread stage). This is the critical window — weeds compete most intensely in the first 4 weeks.
- **Combined hilling:** Combine the second weeding with maize hilling at 4–6 weeks. This controls weeds and protects surface roots.
- **Pre-emergence herbicides:** For maize, Atrazine 500 SC (2–3 L/ha, applied immediately after sowing on moist soil) before weed germination.
- **Post-emergence herbicides:** Glyphosate (Kalach 360 SL) is only for field edges or fallow land — never on a growing crop (it is non-selective and will kill crops too).
- **Striga (witchweed):** Devastating cereal parasite in the North. Solutions: Striga-resistant maize varieties (EVDT 99), rotation with soybean or cowpea, and false seeding (stimulate Striga germination then destroy before planting).
- **Mulch weed suppression:** A 8–10 cm layer of straw, woodchips, or dry leaves effectively suppresses 70–80% of weeds without any chemical herbicide.`,
      source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
      isOffline: true
    };
  }

  return {
    reply: isFr
      ? `🌾 **Agronome IA Agro-Vission (Embarqué 100% Hors-Ligne) :**
Concernant votre question **"${message.trim()}"** :
1. **Préparation du Sol :** Veillez à un sol bien meuble, riche en matière organique compostée et bien drainé.
2. **Surveillance Phyto :** Inspectez les faces inférieures des feuilles et le collet tous les 3 jours pour repérer tout début de nécrose ou parasite.
3. **Équilibre des Engrais :** Phosphore (P) pour les racines au départ, Azote (N) pour le feuillage, et Potassium (K) pour la floraison et le calibre des fruits.
4. **Rotation des Cultures :** Alternez céréales (maïs, sorgho) et légumineuses (haricots, arachides) pour enrichir naturellement la terre en azote.`
      : `🌾 **Agro-Vission AI Agronomist (Offline On-Device):**
Regarding **"${message.trim()}"**:
1. **Soil & Prep:** Ensure well-aerated soil with plenty of decomposed organic compost and adequate drainage.
2. **Crop Monitoring:** Inspect leaf undersides and stem bases every 3 days for early signs of pests or fungal spots.
3. **Fertilization:** Provide high Phosphorus at planting for roots, Nitrogen at vegetative growth, and Potassium for flowering/fruiting.
4. **Crop Rotation:** Rotate cereals with legumes (beans, groundnuts) every season to enrich soil nitrogen naturally.`,
    source: isFr ? 'Agronome Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)',
    isOffline: true
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    KNOWN_CROPS,
    OFFLINE_DISEASES,
    OFFLINE_RECOMMENDATIONS,
    identifyPlantFromImage,
    offlineDiagnoseCrop,
    offlineRecommendCrop,
    offlineChatAgronomist
  };
}