import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, Pressable, StyleSheet, ScrollView, Image,
  ImageBackground, Dimensions, TextInput, ActivityIndicator
} from 'react-native';
import { sendAgronomistChat } from '../../src/api';
import { offlineChatAgronomist } from '../../src/offline_ai';

const { width } = Dimensions.get('window');


export const CAMEROON_CROPS_SHOWCASE = [
  {
    id: 'cocoa',
    name: 'Cocoa (Cacao)',
    nameFr: 'Cacao (Theobroma)',
    icon: '🍫',
    zone: 'South-West, Centre & East (Kumba, Mbalmayo, Bertoua)',
    zoneFr: 'Sud-Ouest, Centre & Est (Kumba, Mbalmayo, Bertoua)',
    season: 'Perennial • Harvest: Sept - Feb',
    seasonFr: 'Pérenne • Récolte : Sept - Fév',
    tip: 'Prune chupons and maintain 30-40% canopy shade. Sanitary pod removal every 7 days prevents Black Pod disease.',
    tipFr: 'Émoussez les gourmands et maintenez 30-40% d’ombrage. La récolte sanitaire tous les 7 jours stoppe la pourriture brune.',
    image: 'https://images.unsplash.com/photo-1606913084603-3e7702b01627?auto=format&fit=crop&w=800&q=80',
    localImage: require('../../assets/crops/cocoa.jpg'),
    color: '#78350F'
  },
  {
    id: 'maize',
    name: 'Maize (Corn / Maïs)',
    nameFr: 'Maïs (Zea mays)',
    icon: '🌽',
    zone: 'Adamawa, West, Centre & North (Bafia, Foumbot, Ngaoundéré)',
    zoneFr: 'Adamaoua, Ouest, Centre & Nord (Bafia, Foumbot, Ngaoundéré)',
    season: '90 - 120 Days • 2 cycles/yr (Bimodal)',
    seasonFr: '90 - 120 Jours • 2 cycles/an (Zone Bimodale)',
    tip: 'Basal NPK 20-10-10 at sowing and Urea top-dressing at 4-5 weeks. Scout whorls early for Fall Armyworm.',
    tipFr: 'NPK 20-10-10 au semis et Urée à 4-5 semaines. Inspectez les cornets pour neutraliser la chenille légionnaire.',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    color: '#0284C7'
  },
  {
    id: 'cassava',
    name: 'Cassava (Manioc)',
    nameFr: 'Manioc (Manihot esculenta)',
    icon: '🌱',
    zone: 'Centre, South & East (Bafia, Obala, Sangmélima, Bertoua)',
    zoneFr: 'Centre, Sud & Est (Bafia, Obala, Sangmélima, Bertoua)',
    season: '9 - 14 Months • High starch & gari',
    seasonFr: '9 - 14 Mois • Fécule & Bâton de manioc',
    tip: 'Plant CMD-tolerant stakes (TME 419, TMS 98/0505) on 40-50cm ridges at 1m x 1m spacing.',
    tipFr: 'Plantez des boutures certifiées (TME 419) sur billons de 40-50 cm avec un écartement régulier de 1m x 1m.',
    image: 'https://images.unsplash.com/photo-1592982537447-6f23349c814b?auto=format&fit=crop&w=800&q=80',
    localImage: require('../../assets/crops/cassava.jpg'),
    color: '#D97706'
  },
  {
    id: 'tomato',
    name: 'Tomato (Tomate de Foumbot)',
    nameFr: 'Tomate (Solanum lycopersicum)',
    icon: '🍅',
    zone: 'West, North-West & Centre (Noun Valley, Santa, Obala)',
    zoneFr: 'Ouest, Nord-Ouest & Centre (Vallée du Noun, Santa, Obala)',
    season: '75 - 90 Days • Staking required',
    seasonFr: '75 - 90 Jours • Tuteurage obligatoire',
    tip: 'Stake firmly with bamboo. Water at root base only; apply Calcium Nitrate at flowering to prevent blossom end rot.',
    tipFr: 'Tuteurez au bambou. Arrosez uniquement au pied; apportez du nitrate de calcium pour éviter le cul noir.',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80',
    color: '#EF4444'
  },
  {
    id: 'plantain',
    name: 'Plantain (Banane Plantain)',
    nameFr: 'Banane Plantain (Musa paradisiaca)',
    icon: '🍌',
    zone: 'Littoral, South-West & Centre (Moungo, Fako, Nyong-et-So\'o)',
    zoneFr: 'Littoral, Sud-Ouest & Centre (Moungo, Fako, Nyong-et-So\'o)',
    season: '10 - 14 Months • Deep mulch',
    seasonFr: '10 - 14 Mois • Paillage épais',
    tip: 'Pare suckers and disinfect in hot water before planting. De-leaf Black Sigatoka streaks promptly.',
    tipFr: 'Parez et désinfectez les rejets à l’eau chaude. Effeuillez régulièrement les stries de cercosporiose.',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80',
    localImage: require('../../assets/crops/plantain.jpg'),
    color: '#059669'
  },
  {
    id: 'banana',
    name: 'Banana (Banane Douce)',
    nameFr: 'Banane Douce (Musa acuminata)',
    icon: '🍌',
    zone: 'Littoral & South-West (Penja, Njombe, Tiko - Bassin Bananier)',
    zoneFr: 'Littoral & Sud-Ouest (Penja, Njombe, Tiko - Bassin Bananier)',
    season: '9 - 12 Months • Export & local markets',
    seasonFr: '9 - 12 Mois • Exportation et marchés locaux',
    tip: 'Remove male floral bud after fruit set to accelerate bunch filling. Sleeve bunches with blue polyethylene bags.',
    tipFr: 'Coupez le bourgeon mâle après la formation des mains pour faire grossir les fruits. Gaignez les régimes sous film bleu.',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80',
    color: '#EAB308'
  },
  {
    id: 'groundnut',
    name: 'Groundnut (Arachide / Peanut)',
    nameFr: 'Arachide (Arachis hypogaea)',
    icon: '🥜',
    zone: 'North, Far-North & Centre (Garoua, Maroua, Mbam)',
    zoneFr: 'Nord, Extrême-Nord & Centre (Garoua, Maroua, Mbam)',
    season: '90 - 110 Days • Nitrogen-fixing',
    seasonFr: '90 - 110 Jours • Fixateur d\'azote',
    tip: 'Sow at 50cm x 15cm for fast canopy closure to repel rosette aphids. Apply Gypsum at flowering.',
    tipFr: 'Semez à 50cm x 15cm pour couvrir vite le sol et bloquer les pucerons. Épandez du gypse à la floraison.',
    image: 'https://images.unsplash.com/photo-1567892328127-d0354148cf37?auto=format&fit=crop&w=800&q=80',
    localImage: require('../../assets/crops/groundnut.jpg'),
    color: '#CA8A04'
  },
  {
    id: 'potato',
    name: 'Irish Potato (Pomme de Terre)',
    nameFr: 'Pomme de Terre (Solanum tuberosum)',
    icon: '🥔',
    zone: 'North-West & West (Santa, Kumbo, Dschang, Bamboutos)',
    zoneFr: 'Nord-Ouest & Ouest (Santa, Kumbo, Dschang, Bamboutos)',
    season: '90 - 110 Days • High altitude',
    seasonFr: '90 - 110 Jours • Haute altitude',
    tip: 'Hill soil generously at 4 weeks to shield tubers from Late Blight spores. Plant sprouted certified tubers.',
    tipFr: 'Buttez généreusement à 4 semaines pour protéger les tubercules du mildiou. Plantez des semences germées.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    color: '#854D0E'
  },
  {
    id: 'pepper',
    name: 'Pepper & Chili (Piment du Cameroun)',
    nameFr: 'Piment & Poivron (Capsicum)',
    icon: '🌶️',
    zone: 'Littoral, West & South-West (Penja, Foumbot, Buea)',
    zoneFr: 'Littoral, Ouest & Sud-Ouest (Penja, Foumbot, Buea)',
    season: '90 - 150 Days • Year-round harvest',
    seasonFr: '90 - 150 Jours • Récolte continue',
    tip: 'Mulch with clean straw to prevent soil splashing onto hanging fruit. Spray organic neem for anthracnose.',
    tipFr: 'Paillez avec de la paille sèche pour éviter les éclaboussures de sol. Pulvérisez du neem contre l\'anthracnose.',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
    color: '#DC2626'
  },
  {
    id: 'rice',
    name: 'Rice (Riz / SEMRY & Ndop)',
    nameFr: 'Riz Irrigué & Pluvial (Oryza)',
    icon: '🌾',
    zone: 'Far-North & North-West (SEMRY Yagoua, Ndop Plains)',
    zoneFr: 'Extrême-Nord & Nord-Ouest (SEMRY Yagoua, Plaines de Ndop)',
    season: '110 - 140 Days • Irrigated / Lowland',
    seasonFr: '110 - 140 Jours • Bas-fond & Irrigué',
    tip: 'Maintain 5-10cm flood depth. Split Urea into 2-3 small top-dressings to avoid vegetative blast susceptibility.',
    tipFr: 'Maintenez 5 à 10 cm d’eau. Fractionnez l’Urée en 2-3 passages pour éviter les attaques de pyriculariose.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    color: '#65A30D'
  },
  {
    id: 'yam',
    name: 'Yam (Igname Blanche de Bafia)',
    nameFr: 'Igname (Dioscorea)',
    icon: '🍠',
    zone: 'Centre & Adamawa (Mbam, Bafia, Bokito, Tibati)',
    zoneFr: 'Centre & Adamaoua (Mbam, Bafia, Bokito, Tibati)',
    season: '7 - 10 Months • Deep loose mounds',
    seasonFr: '7 - 10 Mois • Gros buttes aérées',
    tip: 'Plant setts on high, well-aerated mounds. Erect strong 3-4m bamboo stakes for maximum leaf sun exposure.',
    tipFr: 'Plantez sur hautes buttes meubles. Tuteurez au bambou de 3-4m pour capter un maximum de lumière.',
    image: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&w=800&q=80',
    localImage: require('../../assets/crops/yam.jpg'),
    color: '#92400E'
  },
  {
    id: 'coffee',
    name: 'Coffee (Café Arabica & Robusta)',
    nameFr: 'Caféier (Coffea canephora & arabica)',
    icon: '☕',
    zone: 'West, North-West & East (Bafoussam, Santa, Bertoua)',
    zoneFr: 'Ouest, Nord-Ouest & Est (Bafoussam, Santa, Bertoua)',
    season: 'Perennial • Harvest: Nov - Feb',
    seasonFr: 'Pérenne • Récolte : Nov - Fév',
    tip: 'Mulch tree basins, prune old suckers, and spray preventative copper fungicide against Coffee Berry Disease.',
    tipFr: 'Paillez les cuvettes, taillez les vieux gourmands et appliquez du cuivre préventif contre l’anthracnose des baies.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    localImage: require('../../assets/crops/coffee.jpg'),
    color: '#451A03'
  },
  {
    id: 'onion',
    name: 'Onion (Oignon Violet de Maroua)',
    nameFr: 'Oignon de Maroua (Allium cepa)',
    icon: '🧅',
    zone: 'Far-North & North (Maroua, Kousseri, Garoua)',
    zoneFr: 'Extrême-Nord & Nord (Maroua, Kousseri, Garoua)',
    season: '100 - 120 Days • Dry cool season',
    seasonFr: '100 - 120 Jours • Saison fraîche sèche',
    tip: 'Transplant 45-day nursery seedlings. Use furrow or base irrigation—never wet bulb necks overhead.',
    tipFr: 'Repiquez des plants de 45 jours. Irriguez par rigoles à la base sans jamais mouiller le collet par aspersion.',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    color: '#7C3AED'
  },
  {
    id: 'beans',
    name: 'Common Beans (Haricot de Kumba / Ouest)',
    nameFr: 'Haricot Commun (Phaseolus vulgaris)',
    icon: '🫘',
    zone: 'West, North-West & South-West (Dschang, Kumbo, Kumba)',
    zoneFr: 'Ouest, Nord-Ouest & Sud-Ouest (Dschang, Kumbo, Kumba)',
    season: '65 - 80 Days • Intercropped with maize',
    seasonFr: '65 - 80 Jours • Idéal en association maïs',
    tip: 'Intercrop with maize to replenish soil nitrogen. Pick pods during dry weather to prevent mould contamination.',
    tipFr: 'Associez au maïs pour fixer l’azote. Récoltez par temps sec pour éviter les moisissures des gousses.',
    image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&w=800&q=80',
    localImage: require('../../assets/crops/beans.jpg'),
    color: '#B91C1C'
  },
  {
    id: 'oil_palm',
    name: 'Oil Palm (Palmier à Huile)',
    nameFr: 'Palmier à Huile (Elaeis guineensis)',
    icon: '🌴',
    zone: 'Littoral, South-West & South (Moungo, Ndian, Ocean)',
    zoneFr: 'Littoral, Sud-Ouest & Sud (Moungo, Ndian, Océan)',
    season: 'Perennial • First harvest at 3 years',
    seasonFr: 'Pérenne • 1ère récolte à 3 ans',
    tip: 'Plant certified Tenera pre-germinated nuts. Establish Pueraria legume cover crops to suppress weeds.',
    tipFr: 'Plantez des plants Tenera certifiés. Semez une légumineuse couvre-sol (Pueraria) pour étouffer les adventices.',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80',
    localImage: require('../../assets/crops/oil_palm.jpg'),
    color: '#15803D'
  },
  {
    id: 'pineapple',
    name: 'Pineapple (Ananas de Penja & Mbanga)',
    nameFr: 'Ananas (Ananas comosus)',
    icon: '🍍',
    zone: 'Littoral (Moungo Basin, Njombe, Penja)',
    zoneFr: 'Littoral (Bassin du Moungo, Njombe, Penja)',
    season: '12 - 16 Months • High commercial value',
    seasonFr: '12 - 16 Mois • Forte valeur ajoutée',
    tip: 'Plant suckers graded by uniform weight on ridges. Apply potassium sulfate regularly for sweet fragrant fruit.',
    tipFr: 'Plantez des rejets calibrés sur billons. Apportez du sulfate de potassium pour un fruit très sucré et aromatique.',
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80',
    color: '#F59E0B'
  },
  {
    id: 'avocado',
    name: 'Avocado (Avocatier des Hauts-Plateaux)',
    nameFr: 'Avocatier (Persea americana)',
    icon: '🥑',
    zone: 'West & North-West (Bafoussam, Santa, Dschang)',
    zoneFr: 'Ouest & Nord-Ouest (Bafoussam, Santa, Dschang)',
    season: 'Perennial • Grafted varieties',
    seasonFr: 'Pérenne • Variétés greffées hâtives',
    tip: 'Plant grafted cultivars (Hass, Pollock) on well-drained volcanic slopes. Keep tree basins heavily mulched.',
    tipFr: 'Plantez des plants greffés sur pentes volcaniques drainées. Maintenez un paillage épais au pied.',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80',
    color: '#166534'
  },
  {
    id: 'mango',
    name: 'Mango (Manguier du Grand Nord)',
    nameFr: 'Manguier (Mangifera indica)',
    icon: '🥭',
    zone: 'North & Far-North (Benue, Garoua, Diamaré)',
    zoneFr: 'Nord & Extrême-Nord (Bénoué, Garoua, Diamaré)',
    season: 'Perennial • Harvest: March - June',
    seasonFr: 'Pérenne • Récolte : Mars - Juin',
    tip: 'Prune dead wood after harvest. Hang fruit fly bait traps (Methyl Eugenol) before fruit turns color.',
    tipFr: 'Élaguez le bois mort après récolte. Installez des pièges à phéromones contre la mouche des fruits dès nouaison.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    color: '#EA580C'
  },
  {
    id: 'eru',
    name: 'Eru / Okok (Gnetum africanum)',
    nameFr: 'Eru / Okok (Liane forestière)',
    icon: '🥬',
    zone: 'Centre, South & South-West (Lekié, Sangmélima, Manyu)',
    zoneFr: 'Centre, Sud & Sud-Ouest (Lekié, Sangmélima, Manyu)',
    season: 'Perennial vine • Shade-loving',
    seasonFr: 'Liane pérenne • Sous-bois ombragé',
    tip: 'Domesticate using leafy stem cuttings under nurse trees. Harvest mature dark-green leaves systematically.',
    tipFr: 'Multipliez par boutures de tige sous ombrage forestier. Récoltez régulièrement les feuilles vert foncé.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    localImage: require('../../assets/crops/eru.jpg'),
    color: '#065F46'
  },
  {
    id: 'sorghum',
    name: 'Sorghum (Sorgho / Muskuwaari)',
    nameFr: 'Sorgho de décrue (Muskuwaari)',
    icon: '🌾',
    zone: 'Far-North & North (Diamaré, Mayo-Danay, Garoua)',
    zoneFr: 'Extrême-Nord & Nord (Diamaré, Mayo-Danay, Garoua)',
    season: '90 - 130 Days • Extreme drought tolerance',
    seasonFr: '90 - 130 Jours • Forte tolérance sécheresse',
    tip: 'Transplant 30-day seedlings into deep dibble holes on vertisols as floodwaters recede in October.',
    tipFr: 'Repiquez des plants de 30 jours dans des trous profonds sur karal dès le retrait des eaux en octobre.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    localImage: require('../../assets/crops/sorghum.jpg'),
    color: '#854D0E'
  },
  {
    id: 'cotton',
    name: 'Cotton (Coton SODECOTON)',
    nameFr: 'Coton (Gossypium hirsutum)',
    icon: '☁️',
    zone: 'North & Far-North (Garoua, Kaele, Maroua)',
    zoneFr: 'Nord & Extrême-Nord (Garoua, Kaélé, Maroua)',
    season: '150 - 180 Days • White Gold of the North',
    seasonFr: '150 - 180 Jours • L\'Or blanc du Grand Nord',
    tip: 'Follow SODECOTON threshold pest scouting schedule. Harvest seed cotton cleanly on dry sunny mornings.',
    tipFr: 'Suivez le calendrier de comptage des ravageurs SODECOTON. Récoltez proprement par matinée ensoleillée.',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
    localImage: require('../../assets/crops/cotton.jpg'),
    color: '#475569'
  },
  {
    id: 'cowpea',
    name: 'Cowpea (Niébé du Grand Nord)',
    nameFr: 'Niébé (Vigna unguiculata)',
    icon: '🫘',
    zone: 'Far-North & North (Maroua, Yagoua, Mokolo)',
    zoneFr: 'Extrême-Nord & Nord (Maroua, Yagoua, Mokolo)',
    season: '60 - 75 Days • Fast protein legume',
    seasonFr: '60 - 75 Jours • Légumineuse précoce',
    tip: 'Spray organic neem at flower bud emergence to suppress Maruca pod borer larvae.',
    tipFr: 'Traitez au neem dès la formation des boutons floraux pour bloquer la chenille foreuse des gousses.',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
    localImage: require('../../assets/crops/cowpea.jpg'),
    color: '#0D9488'
  },
  {
    id: 'sweet_potato',
    name: 'Sweet Potato (Patate Douce Orange)',
    nameFr: 'Patate Douce (Ipomoea batatas)',
    icon: '🍠',
    zone: 'West, Adamawa & Centre (Dschang, Tibati, Yaoundé)',
    zoneFr: 'Ouest, Adamaoua & Centre (Dschang, Tibati, Yaoundé)',
    season: '90 - 120 Days • High Vitamin A',
    seasonFr: '90 - 120 Jours • Riche en vitamine A',
    tip: 'Plant vine cuttings on mounds or ridges. Harvest promptly at maturity to avoid sweet potato weevil damage.',
    tipFr: 'Plantez des boutures terminales sur billons. Récoltez à maturité pour éviter les charançons.',
    image: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?auto=format&fit=crop&w=800&q=80',
    localImage: require('../../assets/crops/sweet_potato.jpg'),
    color: '#C2410C'
  },
  {
    id: 'ginger',
    name: 'Ginger & Garlic (Gingembre du Cameroun)',
    nameFr: 'Gingembre & Ail (Zingiber)',
    icon: '🌿',
    zone: 'Centre & Littoral (Mbalmayo, Njombe, Penja)',
    zoneFr: 'Centre & Littoral (Mbalmayo, Njombe, Penja)',
    season: '8 - 10 Months • Heavy organic mulch',
    seasonFr: '8 - 10 Mois • Fort paillage organique',
    tip: 'Plant sprouted rhizome setts in loose compost-rich soil. Keep shaded and mulched through the dry spells.',
    tipFr: 'Plantez des éclats de rhizomes germés dans un sol meuble riche en humus. Maintenez un paillage continu.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    localImage: require('../../assets/crops/ginger.jpg'),
    color: '#A16207'
  },
  {
    id: 'soybean',
    name: 'Soybean (Soja Camerounais)',
    nameFr: 'Soja (Glycine max)',
    icon: '🫘',
    zone: 'West, North-West & Adamawa (Bafoussam, Santa, Ngaoundéré)',
    zoneFr: 'Ouest, Nord-Ouest & Adamaoua (Bafoussam, Santa, Ngaoundéré)',
    season: '95 - 115 Days • Premium protein & oil',
    seasonFr: '95 - 115 Jours • Haute teneur protéique',
    tip: 'Inoculate with Rhizobium if planting on new land. Rotate with maize to eliminate pest cycles and fertilize soil.',
    tipFr: 'Inoculez les graines avec du Rhizobium sur sol neuf. Alternez avec le maïs pour briser le cycle des maladies.',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
    localImage: require('../../assets/crops/soybean.jpg'),
    color: '#4D7C0F'
  }
];

export default function HomeScreen({ goTo, userEmail, setUserEmail, language = 'English' }) {
  const isFr = language === 'Français' || language === 'Francais';
  // Agronomist Chat Console State
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatReply, setChatReply] = useState(null);

  // 24 Cameroon Crops Rotating Showcase (Agronomic Catalog) State
  const [rotatingCropIndex, setRotatingCropIndex] = useState(0);
  const [cropAutoRotate, setCropAutoRotate] = useState(true);
  const scrollViewRef = useRef();

  useEffect(() => {
    if (!cropAutoRotate) return;
    const cropTimer = setInterval(() => {
      setRotatingCropIndex((current) => (current + 1) % CAMEROON_CROPS_SHOWCASE.length);
    }, 3500);
    return () => clearInterval(cropTimer);
  }, [cropAutoRotate]);

  const handleSignOut = () => {
    if (setUserEmail) setUserEmail(null);
    goTo('welcome');
  };

  const handleAskAgronomist = async (questionToAsk) => {
    const query = (questionToAsk || chatInput).trim();
    if (!query) return;
    setChatLoading(true);
    setChatReply(null);

    try {
      const res = await sendAgronomistChat({ message: query, history: [], language });
      setChatReply({
        question: query,
        reply: res.reply || res.text || res.message,
        source: res.source || (isFr ? 'Agronome IA en Ligne' : 'Online AI Agronomist')
      });
    } catch (e) {
      const offlineRes = offlineChatAgronomist(query, language);
      setChatReply({
        question: query,
        reply: offlineRes.reply,
        source: offlineRes.source || (isFr ? 'Agronome IA Embarqué (Hors-Ligne)' : 'On-Device Agronomist (Offline)')
      });
    } finally {
      setChatLoading(false);
    }
  };

  const PROMPT_CHIPS = isFr ? [
    { label: '🌽 Chenille Maïs', query: 'Comment traiter la chenille légionnaire sur le maïs ?' },
    { label: '🌱 Mosaïque Manioc', query: 'Comment lutter contre la mosaïque du manioc ?' },
    { label: '🧪 Dosage NPK 20-10-10', query: 'Quel est le dosage de NPK 20-10-10 par hectare pour le maïs ?' },
    { label: '🍫 Réhabiliter Cacao', query: 'Quelles sont les 3 étapes pour réhabiliter une vieille cacaoyère ?' },
    { label: '🥬 Cultiver l’Eru', query: 'Comment réussir la culture et la domestication de l’Eru ?' }
  ] : [
    { label: '🌽 Maize Armyworm', query: 'How to control fall armyworm on maize in Cameroon?' },
    { label: '🌱 Cassava Mosaic', query: 'How to prevent cassava mosaic disease?' },
    { label: '🧪 NPK 20-10-10 Rates', query: 'What is the dosage of NPK 20-10-10 per hectare for maize?' },
    { label: '🍫 Cocoa Rehabilitation', query: 'What are the steps to rehabilitate an unproductive cocoa farm?' },
    { label: '🥬 Grow Eru / Okok', query: 'How to cultivate and domesticate Eru in Cameroon?' }
  ];

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Top Header ──────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <View style={styles.headerTextWrap}>
            <View style={styles.headerTitleRow}>
              <Text style={styles.title} numberOfLines={1}>Agro{'\u2011'}Vission</Text>
              <View style={styles.portalTag}>
                <Text style={styles.portalTagText}>{isFr ? 'AGRICULTEUR' : 'FARMER'}</Text>
              </View>
            </View>
            <Text style={styles.subtitle} numberOfLines={1}>
              {userEmail ? `👤 ${userEmail}` : (isFr ? '🌾 Tableau Agricole Cameroun' : '🌾 Cameroon Agricultural Dashboard')}
            </Text>
          </View>
        </View>

        <View style={styles.headerRightBtns}>
          <Pressable
            style={styles.accountHeaderBtn}
            onPress={() => goTo('account')}
          >
            <Text style={styles.accountHeaderBtnText}>
              👤 {isFr ? 'Mon Compte' : 'My Account'}
            </Text>
          </Pressable>
          <Pressable style={styles.welcomeBtn} onPress={handleSignOut}>
            <Text style={styles.welcomeBtnText}>🚪</Text>
          </Pressable>
        </View>
      </View>

      {/* ── Ecological Agro-Banner ── */}
      <View style={styles.agroBanner}>
        <View style={styles.agroBannerLeft}>
          <Text style={styles.agroBannerIcon}>🌿</Text>
          <View style={styles.agroBannerTextWrap}>
            <Text style={styles.agroBannerTitle}>
              {isFr ? 'Saison des Cultures • Cameroun' : 'Active Cropping Season • Cameroon'}
            </Text>
            <Text style={styles.agroBannerSub}>
              {isFr ? 'Surveillance phytosanitaire & conseils agronomiques' : 'Phytosanitary monitoring & agronomic advice'}
            </Text>
          </View>
        </View>
        <View style={styles.agroBannerBadge}>
          <Text style={styles.agroBannerBadgeText}>{isFr ? '🟢 OPTIMAL' : '🟢 OPTIMAL'}</Text>
        </View>
      </View>

      {/* ── Farm Status Metrics Bar ──────────────────────────────────── */}
      <View style={styles.metricsBar}>
        <View style={styles.metricItem}>
          <View style={[styles.metricIconWrap, { backgroundColor: '#DCFCE7' }]}>
            <Text style={styles.metricIcon}>📍</Text>
          </View>
          <View>
            <Text style={styles.metricLabel}>{isFr ? 'RÉGION' : 'REGION'}</Text>
            <Text style={styles.metricValue}>10 Zones CMR</Text>
          </View>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <View style={[styles.metricIconWrap, { backgroundColor: '#FEF3C7' }]}>
            <Text style={styles.metricIcon}>🧠</Text>
          </View>
          <View>
            <Text style={styles.metricLabel}>{isFr ? 'MODÈLE IA' : 'AI MODEL'}</Text>
            <Text style={styles.metricValue}>Qwen 3B & Vision</Text>
          </View>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <View style={[styles.metricIconWrap, { backgroundColor: '#E0E7FF' }]}>
            <Text style={styles.metricIcon}>⚡</Text>
          </View>
          <View>
            <Text style={styles.metricLabel}>MODE</Text>
            <Text style={styles.metricValue}>{isFr ? 'Hors-Ligne' : 'Offline Ready'}</Text>
          </View>
        </View>
      </View>

      {/* ── Section: 24 Cameroon Crops Rotating Showcase (AGRONOMIC CATALOG) ── */}
      <View style={styles.showcaseSection}>
        <View style={styles.showcaseHeaderRow}>
          <View style={styles.showcaseHeaderLeft}>
            <View style={styles.showcaseTag}>
              <Text style={styles.showcaseTagText}>
                🌾 {isFr ? 'CATALOGUE AGRONOMIQUE' : 'AGRONOMIC CATALOG'}
              </Text>
            </View>
            <Text style={styles.showcaseTitle}>
              {isFr ? `${CAMEROON_CROPS_SHOWCASE.length} Grandes Cultures du Cameroun` : `${CAMEROON_CROPS_SHOWCASE.length} Major Cameroon Crops`}
            </Text>
            <Text style={styles.showcaseSub}>
              {isFr
                ? 'Rotation automatique (3,5 s) • Touchez une culture pour explorer'
                : 'Auto-rotating (3.5s) • Tap any crop thumbnail to inspect'}
            </Text>
          </View>

          {/* Controls: Prev / Pause / Next */}
          <View style={styles.showcaseControls}>
            <Pressable
              style={styles.arrowBtn}
              onPress={() => {
                setCropAutoRotate(false);
                setRotatingCropIndex((prev) => (prev - 1 + CAMEROON_CROPS_SHOWCASE.length) % CAMEROON_CROPS_SHOWCASE.length);
              }}
            >
              <Text style={styles.arrowBtnText}>‹</Text>
            </Pressable>
            <Pressable
              style={[styles.pauseBtn, !cropAutoRotate && styles.pauseBtnActive]}
              onPress={() => setCropAutoRotate(prev => !prev)}
            >
              <Text style={styles.pauseBtnText}>{cropAutoRotate ? '❚❚' : '▶'}</Text>
            </Pressable>
            <Pressable
              style={styles.arrowBtn}
              onPress={() => {
                setCropAutoRotate(false);
                setRotatingCropIndex((prev) => (prev + 1) % CAMEROON_CROPS_SHOWCASE.length);
              }}
            >
              <Text style={styles.arrowBtnText}>›</Text>
            </Pressable>
          </View>
        </View>

        {/* Active Crop Hero Card */}
        {(() => {
          const crop = CAMEROON_CROPS_SHOWCASE[rotatingCropIndex] || CAMEROON_CROPS_SHOWCASE[0];
          return (
            <View style={styles.cropRotatingCard}>
              <ImageBackground
                source={crop.localImage || { uri: crop.image }}
                style={styles.cropCardImageBg}
                imageStyle={styles.cropCardImageRadius}
              >
                <View style={styles.cropCardGradient}>
                  <View style={styles.cropTopMetaRow}>
                    <View style={[styles.cropBadgePill, { backgroundColor: crop.color }]}>
                      <Text style={styles.cropBadgePillText}>
                        {crop.icon} #{rotatingCropIndex + 1} / {CAMEROON_CROPS_SHOWCASE.length}
                      </Text>
                    </View>
                    <View style={styles.cropCycleTag}>
                      <Text style={styles.cropCycleTagText}>
                        ⏳ {isFr ? crop.seasonFr : crop.season}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.cropMainName}>
                    {isFr ? crop.nameFr : crop.name}
                  </Text>
                  <Text style={styles.cropRegionName}>
                    📍 {isFr ? crop.zoneFr : crop.zone}
                  </Text>
                </View>
              </ImageBackground>

              <View style={styles.cropCardBody}>
                <View style={styles.cropTipBox}>
                  <Text style={styles.cropTipLabel}>
                    💡 {isFr ? 'Conseil d\'Expert & Pratique :' : 'Agronomic Guidance & Tip:'}
                  </Text>
                  <Text style={styles.cropTipContent}>
                    {isFr ? crop.tipFr : crop.tip}
                  </Text>
                </View>

                {/* Direct Actions: Diagnose Leaf & Build Crop Advisory */}
                <View style={styles.cropActionsRow}>
                  <Pressable
                    style={styles.cropActionDiagnose}
                    onPress={() => goTo('diagnosis')}
                  >
                    <Text style={styles.cropActionDiagnoseText}>
                      📸 {isFr ? 'Diagnostiquer' : 'Diagnose Leaf'}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.cropActionAdvice}
                    onPress={() => goTo('cropAdvice')}
                  >
                    <Text style={styles.cropActionAdviceText}>
                      🌾 {isFr ? 'Fiche & Rotation →' : 'Plan & Advisory →'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })()}

        {/* 24-Crop Horizontal Scrollable Thumbnail Ribbon */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cropsRibbonScroll}
          contentContainerStyle={styles.cropsRibbonContent}
        >
          {CAMEROON_CROPS_SHOWCASE.map((crop, index) => {
            const isSelected = index === rotatingCropIndex;
            return (
              <Pressable
                key={crop.id}
                style={[styles.cropChip, isSelected && styles.cropChipActive]}
                onPress={() => {
                  setRotatingCropIndex(index);
                  setCropAutoRotate(false);
                }}
              >
                <Text style={styles.cropChipIcon}>{crop.icon}</Text>
                <Text style={[styles.cropChipText, isSelected && styles.cropChipTextActive]}>
                  {isFr ? crop.nameFr.split(' ')[0] : crop.name.split(' ')[0]}
                </Text>
                {isSelected && <View style={styles.cropChipDot} />}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* ── Section: AI Agronomist Interactive Chat Bar ──────────────── */}
      <View style={styles.agronomistCard}>
        <View style={styles.agronomistHeaderRow}>
          <View style={styles.agronomistBadge}>
            <Text style={styles.agronomistBadgeText}>🤖 {isFr ? 'AGRONOME IA EN DIRECT' : 'LIVE AI AGRONOMIST'}</Text>
          </View>
          <View style={styles.onlinePill}>
            <Text style={styles.onlineDot}>●</Text>
            <Text style={styles.onlineText}>{isFr ? '24/7 Hors-Ligne' : '24/7 Offline Ready'}</Text>
          </View>
        </View>

        <Text style={styles.agronomistTitle}>
          {isFr ? 'Une Question pour vos Cultures ou Sols ?' : 'Have a Question About Your Crops or Soil?'}
        </Text>
        <Text style={styles.agronomistSub}>
          {isFr
            ? 'Posez votre question directement ci-dessous pour obtenir une recommandation agronomique certifiée :'
            : 'Type your farming question below for instant certified agronomic guidance:'}
        </Text>

        {/* Quick Suggestion Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
          {PROMPT_CHIPS.map((chip, idx) => (
            <Pressable
              key={idx}
              style={styles.promptChip}
              onPress={() => {
                setChatInput(chip.query);
                handleAskAgronomist(chip.query);
              }}
            >
              <Text style={styles.promptChipText}>{chip.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Chat Input Bar */}
        <View style={styles.chatInputContainer}>
          <TextInput
            style={styles.chatTextInput}
            value={chatInput}
            onChangeText={setChatInput}
            placeholder={isFr ? 'ex: Comment soigner la chenille sur le maïs ?' : 'e.g. How to treat fall armyworm on maize?'}
            placeholderTextColor="#94A3B8"
            returnKeyType="send"
            onSubmitEditing={() => handleAskAgronomist(chatInput)}
          />
          <Pressable
            style={[styles.chatSendBtn, (!chatInput.trim() || chatLoading) && styles.chatSendBtnDisabled]}
            onPress={() => handleAskAgronomist(chatInput)}
            disabled={!chatInput.trim() || chatLoading}
          >
            {chatLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.chatSendBtnText}>➤</Text>
            )}
          </Pressable>
        </View>

        {/* Instant Answer Preview Box */}
        {chatReply && (
          <View style={styles.chatAnswerBox}>
            <View style={styles.chatAnswerHeader}>
              <Text style={styles.chatAnswerBadge}>🌾 {isFr ? 'Réponse Agronomique' : 'Agronomic Advice'}</Text>
              <Text style={styles.chatAnswerSource}>{chatReply.source}</Text>
            </View>
            <Text style={styles.chatAnswerQuery}>« {chatReply.question} »</Text>
            <Text style={styles.chatAnswerBody}>{chatReply.reply}</Text>

            <Pressable style={styles.openChatFullBtn} onPress={() => goTo('aiChat')}>
              <Text style={styles.openChatFullBtnText}>
                💬 {isFr ? 'Continuer la discussion dans le Chat Complet →' : 'Continue in Full AI Chat Screen →'}
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* ── Section: My Account Gateway Card ─────────────────────────── */}
      <View style={styles.myAccountGatewayCard}>
        <View style={styles.gatewayHeader}>
          <View style={styles.gatewayAvatar}>
            <Text style={styles.gatewayAvatarIcon}>👨‍🌾</Text>
          </View>
          <View style={styles.gatewayHeaderCol}>
            <View style={styles.gatewayTitleRow}>
              <Text style={styles.gatewayTitle}>
                {isFr ? 'Mon Compte Agriculteur' : 'My Farmer Account'}
              </Text>
              <View style={styles.gatewayActiveBadge}>
                <Text style={styles.gatewayActiveBadgeText}>✓ {isFr ? 'ACTIF' : 'ACTIVE'}</Text>
              </View>
            </View>
            <Text style={styles.gatewaySub} numberOfLines={1}>
              {userEmail || (isFr ? 'Planteur du Cameroun' : 'Cameroon Farmer')}
            </Text>
          </View>
        </View>

        <Text style={styles.gatewayDesc}>
          {isFr
            ? 'Entrez dans votre compte personnel pour accéder à votre suivi d\'enquête parcelle, vos rappels sanitaires et l\'historique complet de vos diagnostics.'
            : 'Enter your personal account portal to manage your field survey tracking, alert reminders, and complete diagnosis history.'}
        </Text>

        {/* 3 Module Preview Chips */}
        <View style={styles.gatewayModulesGrid}>
          <Pressable style={styles.gatewayModuleChip} onPress={() => goTo('account')}>
            <View style={[styles.gatewayModuleIconBg, { backgroundColor: '#DCFCE7' }]}>
              <Text style={styles.gatewayModuleIcon}>📋</Text>
            </View>
            <Text style={styles.gatewayModuleLabel}>{isFr ? 'Enquête Parcelle' : 'Field Survey'}</Text>
          </Pressable>
          <Pressable style={styles.gatewayModuleChip} onPress={() => goTo('account')}>
            <View style={[styles.gatewayModuleIconBg, { backgroundColor: '#FEF3C7' }]}>
              <Text style={styles.gatewayModuleIcon}>🔔</Text>
            </View>
            <Text style={styles.gatewayModuleLabel}>{isFr ? 'Alertes & Rappels' : 'Alert Reminders'}</Text>
          </Pressable>
          <Pressable style={styles.gatewayModuleChip} onPress={() => goTo('account')}>
            <View style={[styles.gatewayModuleIconBg, { backgroundColor: '#DBEAFE' }]}>
              <Text style={styles.gatewayModuleIcon}>📜</Text>
            </View>
            <Text style={styles.gatewayModuleLabel}>{isFr ? 'Historique' : 'History Logs'}</Text>
          </Pressable>
        </View>

        {/* Enter My Account Button */}
        <Pressable
          style={styles.gatewayEnterBtn}
          onPress={() => goTo('account')}
        >
          <Text style={styles.gatewayEnterBtnText}>
            👤 {isFr ? 'Accéder à Mon Compte →' : 'Enter My Account →'}
          </Text>
        </Pressable>
      </View>

      {/* ── Admin Quick Action (Verified Administrator Only) ─────────── */}
      {userEmail === 'ivanmiyoupo@gmail.com' && (
        <Pressable style={styles.adminCard} onPress={() => goTo('admin')}>
          <View style={styles.adminCardLeft}>
            <Text style={styles.adminIcon}>🔑</Text>
            <View>
              <Text style={styles.adminTitle}>
                {isFr ? 'Portail Administrateur & Analytique' : 'Admin & Analytics Portal'}
              </Text>
              <Text style={styles.adminText}>
                {isFr
                  ? 'Comptes agriculteurs, historique des diagnostics et état des modèles IA'
                  : 'Farmer accounts, diagnosis logs, and AI model health'}
              </Text>
            </View>
          </View>
          <Text style={styles.adminArrow}>→</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF4EC', // Organic fertile earth & botanical tint, removes cold flat white
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#86EFAC',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'nowrap',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0A331A', // Deep rich forest evergreen
    letterSpacing: -0.3,
    flexShrink: 0,
  },
  portalTag: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  portalTagText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#047857',
  },
  subtitle: {
    fontSize: 12,
    color: '#3B684B',
    fontWeight: '600',
    marginTop: 2,
  },
  headerRightBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accountHeaderBtn: {
    backgroundColor: '#047857',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#065F46',
    shadowColor: '#047857',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  accountHeaderBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  welcomeBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    elevation: 1,
  },
  welcomeBtnText: {
    fontSize: 14,
  },

  /* Agro Banner */
  agroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E2F0DE',
    borderWidth: 1,
    borderColor: '#A7D9A4',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 14,
  },
  agroBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  agroBannerIcon: {
    fontSize: 18,
  },
  agroBannerTextWrap: {
    flex: 1,
  },
  agroBannerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#144622',
  },
  agroBannerSub: {
    fontSize: 10.5,
    color: '#3D6B48',
    marginTop: 1,
  },
  agroBannerBadge: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
  },
  agroBannerBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#065F46',
  },

  /* Metrics Bar */
  metricsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: '#86EFAC',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricIcon: {
    fontSize: 16,
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#4B6B58',
    letterSpacing: 0.8,
  },
  metricValue: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#0A331A',
  },
  metricDivider: {
    width: 1,
    height: 26,
    backgroundColor: '#D1E7DD',
  },

  /* ── 24 Cameroon Crops Rotating Showcase (Agronomic Catalog) ── */
  showcaseSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    shadowColor: '#047857',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 4,
  },
  showcaseHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  showcaseHeaderLeft: {
    flex: 1,
    paddingRight: 8,
  },
  showcaseTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 4,
  },
  showcaseTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#92400E',
    letterSpacing: 0.5,
  },
  showcaseTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0A331A',
    letterSpacing: -0.3,
  },
  showcaseSub: {
    fontSize: 11,
    color: '#4B6B58',
    marginTop: 2,
    fontWeight: '500',
  },
  showcaseControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  arrowBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowBtnText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#065F46',
    lineHeight: 20,
  },
  pauseBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseBtnActive: {
    backgroundColor: '#059669',
    borderColor: '#047857',
  },
  pauseBtnText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#065F46',
  },

  /* Active Crop Card */
  cropRotatingCard: {
    backgroundColor: '#F7FBF6',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    marginBottom: 14,
  },
  cropCardImageBg: {
    width: '100%',
    height: 186,
    justifyContent: 'flex-end',
  },
  cropCardImageRadius: {
    borderTopLeftRadius: 16.5,
    borderTopRightRadius: 16.5,
  },
  cropCardGradient: {
    backgroundColor: 'rgba(7, 36, 19, 0.82)',
    padding: 14,
  },
  cropTopMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cropBadgePill: {
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  cropBadgePillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  cropCycleTag: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  cropCycleTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  cropMainName: {
    fontSize: 19,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  cropRegionName: {
    fontSize: 11.5,
    color: '#A7F3D0',
    fontWeight: '700',
    marginTop: 2,
  },
  cropCardBody: {
    padding: 14,
    backgroundColor: '#F9FCF8',
  },
  cropTipBox: {
    backgroundColor: '#FEF9C3',
    borderWidth: 1.5,
    borderColor: '#FACC15',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  cropTipLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#854D0E',
    marginBottom: 4,
  },
  cropTipContent: {
    fontSize: 12.5,
    color: '#713F12',
    lineHeight: 18,
    fontWeight: '500',
  },
  cropActionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  cropActionDiagnose: {
    flex: 1,
    backgroundColor: '#059669',
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cropActionDiagnoseText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '800',
  },
  cropActionAdvice: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#86EFAC',
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cropActionAdviceText: {
    color: '#047857',
    fontSize: 12.5,
    fontWeight: '800',
  },

  /* 24 Crops Ribbon */
  cropsRibbonScroll: {
    marginTop: 2,
  },
  cropsRibbonContent: {
    paddingVertical: 4,
    gap: 8,
  },
  cropChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F6EE',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D0DEC9',
    gap: 5,
  },
  cropChipActive: {
    backgroundColor: '#059669',
    borderColor: '#047857',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  cropChipIcon: {
    fontSize: 14,
  },
  cropChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3B5945',
  },
  cropChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  cropChipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FEF08A',
    marginLeft: 2,
  },

  /* ── Interactive Agronomist Chat Console ───────────────────── */
  agronomistCard: {
    backgroundColor: '#F4FAF4',
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#86EFAC',
    shadowColor: '#047857',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  agronomistHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  agronomistBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  agronomistBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#065F46',
    letterSpacing: 0.5,
  },
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
  },
  onlineDot: {
    color: '#10B981',
    fontSize: 10,
  },
  onlineText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#047857',
  },
  agronomistTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0A331A',
    marginBottom: 4,
  },
  agronomistSub: {
    fontSize: 12,
    color: '#3C664E',
    lineHeight: 17,
    marginBottom: 12,
  },
  chipsScroll: {
    marginBottom: 12,
  },
  promptChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
  },
  promptChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#14532D',
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#34D399',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  chatTextInput: {
    flex: 1,
    fontSize: 13,
    color: '#0A331A',
    paddingVertical: 8,
  },
  chatSendBtn: {
    backgroundColor: '#059669',
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  chatSendBtnDisabled: {
    backgroundColor: '#94A3B8',
    opacity: 0.6,
  },
  chatSendBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatAnswerBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#10B981',
    borderRadius: 16,
    padding: 14,
    marginTop: 14,
    shadowColor: '#047857',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  chatAnswerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  chatAnswerBadge: {
    fontSize: 12,
    fontWeight: '800',
    color: '#047857',
  },
  chatAnswerSource: {
    fontSize: 10,
    color: '#065F46',
    fontWeight: '600',
  },
  chatAnswerQuery: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#166534',
    marginBottom: 8,
  },
  chatAnswerBody: {
    fontSize: 13,
    color: '#0A331A',
    lineHeight: 19,
    marginBottom: 10,
  },
  openChatFullBtn: {
    backgroundColor: '#047857',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  openChatFullBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  /* ── My Account Gateway Card ───────────────────────────────── */
  myAccountGatewayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#10B981',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  gatewayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  gatewayAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DCFCE7',
    borderWidth: 2,
    borderColor: '#34D399',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gatewayAvatarIcon: {
    fontSize: 24,
  },
  gatewayHeaderCol: {
    flex: 1,
  },
  gatewayTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gatewayTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0A331A',
  },
  gatewayActiveBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  gatewayActiveBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#047857',
  },
  gatewaySub: {
    fontSize: 12,
    color: '#4B6B58',
    marginTop: 2,
  },
  gatewayDesc: {
    fontSize: 12,
    color: '#2D4B39',
    lineHeight: 18,
    marginBottom: 14,
  },
  gatewayModulesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 14,
  },
  gatewayModuleChip: {
    flex: 1,
    backgroundColor: '#F8FCF8',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  gatewayModuleIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  gatewayModuleIcon: {
    fontSize: 16,
  },
  gatewayModuleLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1B4D2E',
    textAlign: 'center',
  },
  gatewayEnterBtn: {
    backgroundColor: '#047857',
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#047857',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  gatewayEnterBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
  },

  /* ── Admin Card ────────────────────────────────────────────── */
  adminCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#064E3B',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#059669',
    shadowColor: '#047857',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  adminCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  adminIcon: {
    fontSize: 22,
  },
  adminTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#A7F3D0',
    marginBottom: 2,
  },
  adminText: {
    fontSize: 11,
    color: '#D1FAE5',
  },
  adminArrow: {
    fontSize: 18,
    color: '#A7F3D0',
    fontWeight: 'bold',
  },
});
