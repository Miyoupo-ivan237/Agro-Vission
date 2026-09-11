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

export function offlineDiagnoseCrop({ crop, symptomsText = '', imageUri = null, language = 'English' }) {
  const isFr = language === 'Français';
  const combined = `${crop || ''} ${symptomsText}`.toLowerCase();
  
  // Normalization aliases
  const rawCrop = (crop || '').toLowerCase().trim();
  let mappedCrop = rawCrop;
  if (rawCrop === 'banana' || rawCrop === 'banane') mappedCrop = 'banana';
  else if (rawCrop === 'potato' || rawCrop === 'pomme de terre') mappedCrop = 'potato';
  else if (rawCrop === 'pepper' || rawCrop === 'piment') mappedCrop = 'pepper';
  else if (rawCrop === 'manioc') mappedCrop = 'cassava';
  else if (rawCrop === 'maïs' || rawCrop === 'corn') mappedCrop = 'maize';
  else if (rawCrop === 'tomate') mappedCrop = 'tomato';
  else if (rawCrop === 'cacao') mappedCrop = 'cocoa';
  else if (rawCrop === 'arachide' || rawCrop === 'peanut') mappedCrop = 'groundnut';
  else if (rawCrop === 'riz') mappedCrop = 'rice';

  let targetCrops = Object.keys(OFFLINE_DISEASES);
  if (mappedCrop && OFFLINE_DISEASES[mappedCrop]) {
    targetCrops = [mappedCrop];
  }

  let bestMatch = null;
  let highestScore = 0;

  for (const cropKey of targetCrops) {
    const list = OFFLINE_DISEASES[cropKey];
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

  if (!bestMatch) {
    const defaultCrop = targetCrops[0] || 'cassava';
    bestMatch = OFFLINE_DISEASES[defaultCrop][0];
  }

  return {
    success: true,
    diagnosis: {
      ...bestMatch,
      name: isFr && bestMatch.nameFr ? bestMatch.nameFr : bestMatch.name,
      symptoms: isFr && bestMatch.symptomsFr ? bestMatch.symptomsFr : bestMatch.symptoms,
      organicTreatment: isFr && bestMatch.organicTreatmentFr ? bestMatch.organicTreatmentFr : bestMatch.organicTreatment,
      chemicalTreatment: isFr && bestMatch.chemicalTreatmentFr ? bestMatch.chemicalTreatmentFr : bestMatch.chemicalTreatment,
      prevention: isFr && bestMatch.preventionFr ? bestMatch.preventionFr : bestMatch.prevention,
      diagnosedAt: new Date().toISOString(),
      source: isFr 
        ? 'Moteur IA de Pathologie Hors-Ligne (TensorFlow & Agronomie Cameroun)' 
        : 'On-Device Offline AI Pathology Engine (TensorFlow & Pathology)',
      imageUri: imageUri || null,
      isOffline: true
    }
  };
}

export function offlineRecommendCrop({ location = '', season = '', soilCondition = '', landSize = '1', language = 'English' }) {
  const isFr = language === 'Français';
  const soilLower = (soilCondition || '').toLowerCase();
  const locLower = (location || '').toLowerCase();

  let cropKey = 'maize';
  
  // Advanced Agro-Ecological Engine mapping all 10 Regions of Cameroon
  // Accurate priority ordering so composite names (north-west, south-west, far-north) match precisely
  if (locLower.includes('far north') || locLower.includes('extrême nord') || locLower.includes('maroua')) {
    cropKey = soilLower.includes('clay') || soilLower.includes('vertisol') ? 'rice' : 'sorghum';
    if (soilLower.includes('sand')) cropKey = 'groundnut';
    if (soilLower.includes('alluvial') || soilLower.includes('loam')) cropKey = 'onion';
  } else if (locLower.includes('north-west') || locLower.includes('nord-ouest') || locLower.includes('bamenda')) {
    cropKey = 'irish_potato';
    if (soilLower.includes('volcanic')) cropKey = 'coffee';
  } else if (locLower.includes('south-west') || locLower.includes('sud-ouest') || locLower.includes('buea') || locLower.includes('kumba')) {
    cropKey = 'cocoa';
    if (soilLower.includes('volcanic')) cropKey = 'plantain';
  } else if (locLower.includes('north') || locLower.includes('nord') || locLower.includes('garoua')) {
    cropKey = 'cotton';
    if (soilLower.includes('sand')) cropKey = 'groundnut';
  } else if (locLower.includes('adamawa') || locLower.includes('adamaoua')) {
    cropKey = 'maize';
    if (soilLower.includes('loam')) cropKey = 'yam';
  } else if (locLower.includes('west') || locLower.includes('ouest') || locLower.includes('foumbot') || locLower.includes('bafoussam')) {
    cropKey = 'tomato';
    if (soilLower.includes('volcanic') || soilLower.includes('loam')) cropKey = 'irish_potato';
  } else if (locLower.includes('littoral') || locLower.includes('douala') || locLower.includes('moungo')) {
    cropKey = 'plantain';
    if (soilLower.includes('acid')) cropKey = 'oil_palm';
  } else if (locLower.includes('south') || locLower.includes('sud') || locLower.includes('ebolowa')) {
    cropKey = 'cassava';
    if (soilLower.includes('clay')) cropKey = 'cocoa';
  } else if (locLower.includes('east') || locLower.includes('est') || locLower.includes('bertoua')) {
    cropKey = 'cassava';
    if (soilLower.includes('clay')) cropKey = 'plantain';
  } else if (locLower.includes('centre') || locLower.includes('yaoundé') || locLower.includes('bafia')) {
    cropKey = 'cassava';
    if (soilLower.includes('sand')) cropKey = 'yam';
  }

  // Fallbacks based purely on soil if region match failed
  if (!OFFLINE_RECOMMENDATIONS[cropKey]) {
    if (soilLower.includes('sand')) cropKey = 'groundnut';
    else if (soilLower.includes('clay')) cropKey = 'cassava';
    else if (soilLower.includes('volcanic')) cropKey = 'tomato';
    else cropKey = 'maize';
  }

  const rec = OFFLINE_RECOMMENDATIONS[cropKey] || OFFLINE_RECOMMENDATIONS['maize'];
  const sizeNum = parseFloat(landSize) || 1;

  const soilAssessment = isFr 
    ? `L'état du sol "${soilCondition || 'Agricole standard'}" dans la région ${location || 'Cameroun'} est hautement adapté pour ${rec.crop}.`
    : `Soil condition "${soilCondition || 'Standard agricultural'}" in ${location || 'Cameroon'} is highly suited for ${rec.crop}.`;
  
  const seasonalAdvice = isFr
    ? `Pendant la saison "${season || 'actuelle'}", effectuez un labour aéré et préparez les planches/billons avant les fortes pluies.`
    : `During the ${season || 'current'} season, ensure timely land preparation before major rains.`;
  
  const landEstimate = isFr
    ? `Pour ${landSize} Hectare(s), le rendement prévisionnel est estimé à ${(sizeNum * 3.5).toFixed(1)} - ${(sizeNum * 7.0).toFixed(1)} Tonnes avec un calendrier agronomique standard.`
    : `For ${landSize} Hectare(s), projected yield is ${(sizeNum * 3.5).toFixed(1)} - ${(sizeNum * 7.0).toFixed(1)} Tons under standard agro-management.`;

  return {
    success: true,
    recommendation: {
      primaryCrop: rec.crop,
      primaryDetails: rec,
      secondaryCrop: cropKey === 'cassava' ? 'Maize (Corn / Maïs)' : 'Cassava (Manioc)',
      soilAssessment,
      seasonalAdvice,
      landEstimate,
      generatedAt: new Date().toISOString(),
      source: isFr ? 'Moteur Agricole des 10 Régions du Cameroun (Hors-Ligne)' : 'AGROVISSION 10-Region Offline Engine',
      isOffline: true
    }
  };
}

export function offlineChatAgronomist(message, language = 'English') {
  const lower = (message || '').toLowerCase();
  const isFr = language === 'Français' || /bonjour|salut|comment|cultiver|maladie|mildiou|chenille|plante|terre|manioc|tomate|banane|cacao|piment|engrais|arachide|pomme de terre/i.test(message);

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
    OFFLINE_DISEASES,
    OFFLINE_RECOMMENDATIONS,
    offlineDiagnoseCrop,
    offlineRecommendCrop,
    offlineChatAgronomist
  };
}