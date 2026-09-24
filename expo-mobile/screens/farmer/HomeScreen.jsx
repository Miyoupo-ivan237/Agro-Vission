import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Platform
} from 'react-native';
import { sendAgronomistChat } from '../../src/api';
import { offlineChatAgronomist } from '../../src/offline_ai';

const { width } = Dimensions.get('window');

// 24 Cameroon Crops Preserved Exactly from User Application
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

// Dynamic Soil Profile Data with tailored moisture, air temp, soil temp, humidity, and insights for each timeframe
export const SOIL_DATA = {
  profile: {
    nameEn: 'Soil profile',
    nameFr: 'Profil du sol',
    periods: {
      W: {
        moisture: '52%',
        airTemp: '24°C',
        soilTemp: '18°C',
        humidity: '67%',
        points: [
          { label: 'Mon', h: '25%' },
          { label: 'Tue', h: '42%' },
          { label: 'Wed', h: '68%' },
          { label: 'Thu', h: '36%' },
          { label: 'Fri', h: '72%', active: true },
          { label: 'Sat', h: '48%' },
          { label: 'Sun', h: '28%' },
        ]
      },
      M: {
        moisture: '54%',
        airTemp: '24°C',
        soilTemp: '18°C',
        humidity: '66%',
        points: [
          { label: 'W1', h: '40%' },
          { label: 'W2', h: '62%' },
          { label: 'W3', h: '54%', active: true },
          { label: 'W4', h: '46%' },
        ]
      },
      '3M': {
        moisture: '50%',
        airTemp: '25°C',
        soilTemp: '19°C',
        humidity: '65%',
        points: [
          { label: 'Jul', h: '44%' },
          { label: 'Aug', h: '50%', active: true },
          { label: 'Sep', h: '56%' },
        ]
      },
      '6M': {
        moisture: '51%',
        airTemp: '24°C',
        soilTemp: '18°C',
        humidity: '68%',
        points: [
          { label: 'Apr', h: '60%' },
          { label: 'May', h: '58%' },
          { label: 'Jun', h: '42%' },
          { label: 'Jul', h: '45%' },
          { label: 'Aug', h: '50%' },
          { label: 'Sep', h: '51%', active: true },
        ]
      }
    },
    statusEn: 'Optimal moisture level. No irrigation required today.',
    statusFr: 'Taux d’humidité optimal. Aucune irrigation requise aujourd’hui.',
    subEn: 'Last update: 30 min ago',
    subFr: 'Dernière mise à jour: il y a 30 min'
  },
  black: {
    nameEn: 'Black soil',
    nameFr: 'Terre noire',
    periods: {
      W: {
        moisture: '68%',
        airTemp: '27°C',
        soilTemp: '21°C',
        humidity: '73%',
        points: [
          { label: 'Mon', h: '52%' },
          { label: 'Tue', h: '64%' },
          { label: 'Wed', h: '78%' },
          { label: 'Thu', h: '60%' },
          { label: 'Fri', h: '85%', active: true },
          { label: 'Sat', h: '70%' },
          { label: 'Sun', h: '58%' },
        ]
      },
      M: {
        moisture: '70%',
        airTemp: '27°C',
        soilTemp: '21°C',
        humidity: '74%',
        points: [
          { label: 'W1', h: '62%' },
          { label: 'W2', h: '76%' },
          { label: 'W3', h: '70%', active: true },
          { label: 'W4', h: '65%' },
        ]
      },
      '3M': {
        moisture: '67%',
        airTemp: '26°C',
        soilTemp: '20°C',
        humidity: '72%',
        points: [
          { label: 'Jul', h: '60%' },
          { label: 'Aug', h: '67%', active: true },
          { label: 'Sep', h: '72%' },
        ]
      },
      '6M': {
        moisture: '66%',
        airTemp: '27°C',
        soilTemp: '21°C',
        humidity: '73%',
        points: [
          { label: 'Apr', h: '72%' },
          { label: 'May', h: '70%' },
          { label: 'Jun', h: '58%' },
          { label: 'Jul', h: '60%' },
          { label: 'Aug', h: '67%' },
          { label: 'Sep', h: '66%', active: true },
        ]
      }
    },
    statusEn: 'High organic retention. High moisture reserves, avoid over-irrigation.',
    statusFr: 'Forte rétention d’humus. Bonnes réserves hydriques, pas d’arrosage requis.',
    subEn: 'Last update: 15 min ago',
    subFr: 'Dernière mise à jour: il y a 15 min'
  },
  loamy: {
    nameEn: 'Loamy',
    nameFr: 'Limoneux',
    periods: {
      W: {
        moisture: '55%',
        airTemp: '25°C',
        soilTemp: '19°C',
        humidity: '65%',
        points: [
          { label: 'Mon', h: '32%' },
          { label: 'Tue', h: '48%' },
          { label: 'Wed', h: '65%' },
          { label: 'Thu', h: '42%' },
          { label: 'Fri', h: '75%', active: true },
          { label: 'Sat', h: '52%' },
          { label: 'Sun', h: '35%' },
        ]
      },
      M: {
        moisture: '56%',
        airTemp: '25°C',
        soilTemp: '19°C',
        humidity: '65%',
        points: [
          { label: 'W1', h: '45%' },
          { label: 'W2', h: '64%' },
          { label: 'W3', h: '56%', active: true },
          { label: 'W4', h: '50%' },
        ]
      },
      '3M': {
        moisture: '53%',
        airTemp: '25°C',
        soilTemp: '19°C',
        humidity: '64%',
        points: [
          { label: 'Jul', h: '48%' },
          { label: 'Aug', h: '53%', active: true },
          { label: 'Sep', h: '59%' },
        ]
      },
      '6M': {
        moisture: '54%',
        airTemp: '25°C',
        soilTemp: '19°C',
        humidity: '65%',
        points: [
          { label: 'Apr', h: '64%' },
          { label: 'May', h: '60%' },
          { label: 'Jun', h: '45%' },
          { label: 'Jul', h: '48%' },
          { label: 'Aug', h: '53%' },
          { label: 'Sep', h: '54%', active: true },
        ]
      }
    },
    statusEn: 'Ideal root aeration and percolation. Optimal for maize and vegetables.',
    statusFr: 'Aération racinaire et percolation idéales. Optimal pour le maïs et maraîchage.',
    subEn: 'Last update: 22 min ago',
    subFr: 'Dernière mise à jour: il y a 22 min'
  },
  clay: {
    nameEn: 'Clay',
    nameFr: 'Argileux',
    periods: {
      W: {
        moisture: '76%',
        airTemp: '22°C',
        soilTemp: '16°C',
        humidity: '82%',
        points: [
          { label: 'Mon', h: '60%' },
          { label: 'Tue', h: '72%' },
          { label: 'Wed', h: '86%' },
          { label: 'Thu', h: '68%' },
          { label: 'Fri', h: '92%', active: true },
          { label: 'Sat', h: '78%' },
          { label: 'Sun', h: '65%' },
        ]
      },
      M: {
        moisture: '78%',
        airTemp: '22°C',
        soilTemp: '16°C',
        humidity: '83%',
        points: [
          { label: 'W1', h: '70%' },
          { label: 'W2', h: '84%' },
          { label: 'W3', h: '78%', active: true },
          { label: 'W4', h: '74%' },
        ]
      },
      '3M': {
        moisture: '75%',
        airTemp: '22°C',
        soilTemp: '16°C',
        humidity: '81%',
        points: [
          { label: 'Jul', h: '70%' },
          { label: 'Aug', h: '75%', active: true },
          { label: 'Sep', h: '80%' },
        ]
      },
      '6M': {
        moisture: '74%',
        airTemp: '22°C',
        soilTemp: '16°C',
        humidity: '82%',
        points: [
          { label: 'Apr', h: '80%' },
          { label: 'May', h: '78%' },
          { label: 'Jun', h: '68%' },
          { label: 'Jul', h: '70%' },
          { label: 'Aug', h: '75%' },
          { label: 'Sep', h: '74%', active: true },
        ]
      }
    },
    statusEn: 'Dense structure, high water retention. Ensure good ridge drainage.',
    statusFr: 'Structure dense, forte rétention d’eau. Assurer le drainage des billons.',
    subEn: 'Last update: 10 min ago',
    subFr: 'Dernière mise à jour: il y a 10 min'
  },
  volcanic: {
    nameEn: 'Volcanic',
    nameFr: 'Volcanique',
    periods: {
      W: {
        moisture: '46%',
        airTemp: '21°C',
        soilTemp: '17°C',
        humidity: '58%',
        points: [
          { label: 'Mon', h: '20%' },
          { label: 'Tue', h: '38%' },
          { label: 'Wed', h: '58%' },
          { label: 'Thu', h: '30%' },
          { label: 'Fri', h: '68%', active: true },
          { label: 'Sat', h: '42%' },
          { label: 'Sun', h: '24%' },
        ]
      },
      M: {
        moisture: '48%',
        airTemp: '21°C',
        soilTemp: '17°C',
        humidity: '59%',
        points: [
          { label: 'W1', h: '36%' },
          { label: 'W2', h: '56%' },
          { label: 'W3', h: '48%', active: true },
          { label: 'W4', h: '40%' },
        ]
      },
      '3M': {
        moisture: '44%',
        airTemp: '21°C',
        soilTemp: '17°C',
        humidity: '57%',
        points: [
          { label: 'Jul', h: '38%' },
          { label: 'Aug', h: '44%', active: true },
          { label: 'Sep', h: '50%' },
        ]
      },
      '6M': {
        moisture: '45%',
        airTemp: '21°C',
        soilTemp: '17°C',
        humidity: '58%',
        points: [
          { label: 'Apr', h: '54%' },
          { label: 'May', h: '50%' },
          { label: 'Jun', h: '36%' },
          { label: 'Jul', h: '38%' },
          { label: 'Aug', h: '44%' },
          { label: 'Sep', h: '45%', active: true },
        ]
      }
    },
    statusEn: 'Fast mineral drainage, crisp highland air. Great for potatoes and coffee.',
    statusFr: 'Drainage minéral rapide, air frais des plateaux. Idéal pour pommes de terre et café.',
    subEn: 'Last update: 18 min ago',
    subFr: 'Dernière mise à jour: il y a 18 min'
  }
};

export default function HomeScreen({ goTo, userEmail, setUserEmail, language = 'English' }) {
  const isFr = language === 'Français' || language === 'Francais';

  // Sensor & Soil profile state (Image 4 design)
  const [selectedSoilType, setSelectedSoilType] = useState('profile');
  const [analyticsPeriod, setAnalyticsPeriod] = useState('W'); // W, M, 3M, 6M

  // Active soil data based on user selection
  const currentSoil = SOIL_DATA[selectedSoilType] || SOIL_DATA.profile;
  const currentPeriodData = currentSoil.periods[analyticsPeriod] || currentSoil.periods.W;

  // Agronomist Chat Console State
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatReply, setChatReply] = useState(null);

  // Crops catalog rotation state
  const [rotatingCropIndex, setRotatingCropIndex] = useState(0);
  const [cropAutoRotate, setCropAutoRotate] = useState(true);
  const scrollViewRef = useRef();

  useEffect(() => {
    if (!cropAutoRotate) return;
    const cropTimer = setInterval(() => {
      setRotatingCropIndex((current) => (current + 1) % CAMEROON_CROPS_SHOWCASE.length);
    }, 4000);
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
  ] : [
    { label: '🌽 Maize Armyworm', query: 'How to control fall armyworm on maize in Cameroon?' },
    { label: '🌱 Cassava Mosaic', query: 'How to prevent cassava mosaic disease?' },
    { label: '🧪 NPK 20-10-10 Rates', query: 'What is the dosage of NPK 20-10-10 per hectare for maize?' },
    { label: '🍫 Cocoa Care', query: 'What are the steps to rehabilitate an unproductive cocoa farm?' },
  ];

  const activeCrop = CAMEROON_CROPS_SHOWCASE[rotatingCropIndex] || CAMEROON_CROPS_SHOWCASE[0];

  // Farmer display name
  const farmerName = userEmail
    ? userEmail.split('@')[0].replace(/[._]/g, ' ')
    : (isFr ? 'Planteur Agricole' : 'Watson');

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >

      {/* ────────────────────────────────────────────────────────────────
          IMAGE 4 DESIGN: REGION INDICATOR & MINIMALIST SOIL PILLS
      ──────────────────────────────────────────────────────────────── */}
      <View style={styles.topHeader}>
        <View style={styles.headerProfileRow}>
          {/* Farmer Profile Avatar */}
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.avatarImg}
            />
            <View style={styles.onlineBadge} />
          </View>

          {/* Farmer Greeting & Region */}
          <View style={styles.headerGreetingCol}>
            <Text style={styles.greetingEyebrow}>
              {isFr ? 'Bonjour,' : 'Good Morning,'}
            </Text>
            <Text style={styles.farmerNameText} numberOfLines={1}>
              {farmerName}
            </Text>
          </View>

          {/* Top Actions: Notifications Bell & Account */}
          <View style={styles.headerActionsRow}>
            <Pressable
              style={styles.headerIconBtn}
              onPress={() => goTo('notifications')}
            >
              <Text style={styles.headerIcon}>🔔</Text>
              <View style={styles.notificationDot} />
            </Pressable>

            <Pressable
              style={styles.headerIconBtn}
              onPress={() => goTo('account')}
            >
              <Text style={styles.headerIcon}>👤</Text>
            </Pressable>

            <Pressable
              style={[styles.headerIconBtn, { backgroundColor: '#FEE2E2' }]}
              onPress={handleSignOut}
            >
              <Text style={styles.headerIcon}>🚪</Text>
            </Pressable>
          </View>
        </View>

        {/* Region Sub-Header (Image 4 exact: Region Lower Saxony) */}
        <View style={styles.regionHeaderBar}>
          <Text style={styles.regionSubLabel}>{isFr ? 'Région :' : 'Region'}</Text>
          <Text style={styles.regionMainLabel}>Lower Saxony • Cameroon</Text>
        </View>

        {/* Soil Filter Pills (Image 4 exact pill style - no emojis, active solid green) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.soilPillsScroll}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 2 }}
        >
          {[
            { key: 'profile', labelEn: 'Soil profile', labelFr: 'Profil du sol' },
            { key: 'black', labelEn: 'Black soil', labelFr: 'Terre noire' },
            { key: 'loamy', labelEn: 'Loamy', labelFr: 'Limoneux' },
            { key: 'clay', labelEn: 'Clay', labelFr: 'Argileux' },
            { key: 'volcanic', labelEn: 'Volcanic', labelFr: 'Volcanique' },
          ].map((item) => {
            const isSelected = selectedSoilType === item.key;
            return (
              <Pressable
                key={item.key}
                style={[
                  styles.soilPill,
                  isSelected && styles.soilPillActive,
                ]}
                onPress={() => setSelectedSoilType(item.key)}
              >
                <Text
                  style={[
                    styles.soilPillText,
                    isSelected && styles.soilPillTextActive,
                  ]}
                >
                  {isFr ? item.labelFr : item.labelEn}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* ────────────────────────────────────────────────────────────────
          IMAGE 4 DESIGN: 2x2 FIELD SENSOR METRIC CARDS
      ──────────────────────────────────────────────────────────────── */}
      <View style={styles.metricsGrid}>
        {/* Metric 1: Soil Moisture */}
        <View style={styles.metricCard}>
          <View style={styles.metricCardTop}>
            <Text style={styles.metricCardIcon}>🌱</Text>
            <Text style={styles.metricCardValue}>{currentPeriodData.moisture}</Text>
          </View>
          <Text style={styles.metricCardLabel}>
            {isFr ? 'Humidité du sol' : 'Soil Moisture'}
          </Text>
        </View>

        {/* Metric 2: Air Temp */}
        <View style={styles.metricCard}>
          <View style={styles.metricCardTop}>
            <Text style={styles.metricCardIcon}>🌡️</Text>
            <Text style={styles.metricCardValue}>{currentPeriodData.airTemp}</Text>
          </View>
          <Text style={styles.metricCardLabel}>
            {isFr ? 'Température air' : 'Air temp'}
          </Text>
        </View>

        {/* Metric 3: Soil Temp */}
        <View style={styles.metricCard}>
          <View style={styles.metricCardTop}>
            <Text style={styles.metricCardIcon}>🍂</Text>
            <Text style={styles.metricCardValue}>{currentPeriodData.soilTemp}</Text>
          </View>
          <Text style={styles.metricCardLabel}>
            {isFr ? 'Température sol' : 'Soil temp'}
          </Text>
        </View>

        {/* Metric 4: Humidity */}
        <View style={styles.metricCard}>
          <View style={styles.metricCardTop}>
            <Text style={styles.metricCardIcon}>💧</Text>
            <Text style={styles.metricCardValue}>{currentPeriodData.humidity}</Text>
          </View>
          <Text style={styles.metricCardLabel}>
            {isFr ? 'Humidité' : 'Humidity'}
          </Text>
        </View>
      </View>

      {/* ────────────────────────────────────────────────────────────────
          IMAGE 4 DESIGN: SOIL MOISTURE ANALYTICS & CURVED LINE CHART
      ──────────────────────────────────────────────────────────────── */}
      <View style={styles.analyticsCard}>
        <View style={styles.analyticsHeader}>
          <Text style={styles.analyticsTitle}>
            {isFr ? 'Humidité du sol' : 'Soil moisture'}
          </Text>

          {/* Timeframe Toggles: [W] [M] [3M] [6M] */}
          <View style={styles.timeframeTogglesRow}>
            {['W', 'M', '3M', '6M'].map((period) => {
              const isActive = analyticsPeriod === period;
              return (
                <Pressable
                  key={period}
                  style={[
                    styles.timeframeBtn,
                    isActive && styles.timeframeBtnActive,
                  ]}
                  onPress={() => setAnalyticsPeriod(period)}
                >
                  <Text
                    style={[
                      styles.timeframeBtnText,
                      isActive && styles.timeframeBtnTextActive,
                    ]}
                  >
                    {period}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Styled Curve Line Chart with 0%-100% axis */}
        <View style={styles.chartContainer}>
          {/* Axis Labels (0%, 25%, 50%, 75%, 100%) */}
          <View style={styles.chartYAxis}>
            <Text style={styles.axisLabel}>100%</Text>
            <Text style={styles.axisLabel}>75%</Text>
            <Text style={styles.axisLabel}>50%</Text>
            <Text style={styles.axisLabel}>25%</Text>
            <Text style={styles.axisLabel}>0%</Text>
          </View>

          {/* Graph Visual Area */}
          <View style={styles.chartPlotArea}>
            {/* Gridlines */}
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />

            {/* Wavy Graph Representation */}
            <View style={styles.wavePlotContainer}>
              <View style={styles.waveBarsRow}>
                {(currentPeriodData.points || []).map((pt, i) => (
                  <View key={i} style={styles.waveColumn}>
                    {pt.active && (
                      <View style={styles.activeDotBubble}>
                        <Text style={styles.activeDotBubbleText}>{currentPeriodData.moisture}</Text>
                      </View>
                    )}
                    <View
                      style={[
                        styles.waveNode,
                        pt.active && styles.waveNodeActive,
                        { bottom: pt.h },
                      ]}
                    />
                    <View style={[styles.waveStem, { height: pt.h }]} />
                    <Text
                      style={[
                        styles.dayLabel,
                        pt.active && styles.dayLabelActive,
                      ]}
                    >
                      {pt.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* ────────────────────────────────────────────────────────────────
          IMAGE 4 DESIGN: SMART INSIGHTS CARD
      ──────────────────────────────────────────────────────────────── */}
      <View style={styles.smartInsightsCard}>
        <View style={styles.insightsIconWrap}>
          <Text style={styles.insightsIcon}>🌱</Text>
        </View>
        <View style={styles.insightsContent}>
          <Text style={styles.insightsTitle}>
            {isFr ? 'Analyses Intelligentes' : 'Smart Insights'}
          </Text>
          <Text style={styles.soilStatusTag}>🌱 SOIL STATUS</Text>
          <Text style={styles.insightsMainText}>
            {isFr ? currentSoil.statusFr : currentSoil.statusEn}
          </Text>
          <Text style={styles.insightsMetaText}>
            {isFr ? currentSoil.subFr : currentSoil.subEn}
          </Text>
        </View>
      </View>



      {/* ────────────────────────────────────────────────────────────────
          IMAGE 3 DESIGN: PROMO / SPOTLIGHT BANNER
      ──────────────────────────────────────────────────────────────── */}
      <View style={styles.promoBannerCard}>
        <View style={styles.promoBannerLeft}>
          <View style={styles.promoBadge}>
            <Text style={styles.promoBadgeText}>
              {isFr ? '50% D’ÉCONOMIES' : '50% SAVINGS'}
            </Text>
          </View>
          <Text style={styles.promoTitle}>
            {isFr ? 'Bio-Compostage & Engrais Vert' : 'Bio-Compost & Soil Nutrition'}
          </Text>
          <Text style={styles.promoSub}>
            {isFr
              ? 'Réduisez vos coûts d’engrais minéraux grâce aux méthodes agro-écologiques certifiées.'
              : 'Cut mineral fertilizer costs with certified agro-ecological formulas.'}
          </Text>
          <Pressable
            style={styles.promoActionBtn}
            onPress={() => goTo('cropAdvice')}
          >
            <Text style={styles.promoActionBtnText}>
              {isFr ? 'Consulter le Guide →' : 'Get Guide →'}
            </Text>
          </Pressable>
        </View>

        <Image
          source={require('../../assets/crops/plantain.jpg')}
          style={styles.promoBannerImg}
        />
      </View>

      {/* ────────────────────────────────────────────────────────────────
          IMAGE 3 DESIGN: POPULAR GOODS & 24 CAMEROON CROPS SHOWCASE
      ──────────────────────────────────────────────────────────────── */}
      <View style={styles.popularSection}>
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>
              {isFr ? 'Cultures du Cameroun' : 'Popular Crops'}
            </Text>
            <Text style={styles.sectionSubtitle}>
              {isFr
                ? `${CAMEROON_CROPS_SHOWCASE.length} cultures adaptées aux 10 régions`
                : `${CAMEROON_CROPS_SHOWCASE.length} crops tailored to Cameroon agro-zones`}
            </Text>
          </View>

          {/* Previous / Next Controls */}
          <View style={styles.cropControls}>
            <Pressable
              style={styles.cropArrowBtn}
              onPress={() => {
                setCropAutoRotate(false);
                setRotatingCropIndex(
                  (prev) => (prev - 1 + CAMEROON_CROPS_SHOWCASE.length) % CAMEROON_CROPS_SHOWCASE.length
                );
              }}
            >
              <Text style={styles.cropArrowBtnText}>‹</Text>
            </Pressable>
            <Pressable
              style={styles.cropArrowBtn}
              onPress={() => {
                setCropAutoRotate(false);
                setRotatingCropIndex(
                  (prev) => (prev + 1) % CAMEROON_CROPS_SHOWCASE.length
                );
              }}
            >
              <Text style={styles.cropArrowBtnText}>›</Text>
            </Pressable>
          </View>
        </View>

        {/* Horizontal Crop Selection Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cropChipsScroll}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 2 }}
        >
          {CAMEROON_CROPS_SHOWCASE.map((crop, idx) => {
            const isSelected = idx === rotatingCropIndex;
            return (
              <Pressable
                key={crop.id}
                style={[
                  styles.cropPillItem,
                  isSelected && styles.cropPillItemActive,
                ]}
                onPress={() => {
                  setRotatingCropIndex(idx);
                  setCropAutoRotate(false);
                }}
              >
                <Text style={styles.cropPillIcon}>{crop.icon}</Text>
                <Text
                  style={[
                    styles.cropPillLabel,
                    isSelected && styles.cropPillLabelActive,
                  ]}
                >
                  {isFr ? crop.nameFr.split(' ')[0] : crop.name.split(' ')[0]}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Featured Crop Display Card (Image 3 Card style) */}
        <View style={styles.featuredCropCard}>
          <ImageBackground
            source={activeCrop.localImage || { uri: activeCrop.image }}
            style={styles.cropCardImgBanner}
            imageStyle={{ borderRadius: 18 }}
          >
            <View style={styles.cropCardImgOverlay}>
              <View style={styles.cropZoneBadge}>
                <Text style={styles.cropZoneBadgeText}>
                  📍 {isFr ? activeCrop.zoneFr : activeCrop.zone}
                </Text>
              </View>
              <Text style={styles.cropCardImgTitle}>
                {isFr ? activeCrop.nameFr : activeCrop.name}
              </Text>
              <Text style={styles.cropCardImgSeason}>
                🗓️ {isFr ? activeCrop.seasonFr : activeCrop.season}
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.cropCardBody}>
            <View style={styles.tipBox}>
              <Text style={styles.tipBoxLabel}>
                💡 {isFr ? 'Conseil Pratique :' : 'Agronomic Guidance:'}
              </Text>
              <Text style={styles.tipBoxContent}>
                {isFr ? activeCrop.tipFr : activeCrop.tip}
              </Text>
            </View>

            {/* Direct Action Buttons */}
            <View style={styles.cropActionBtnsRow}>
              <Pressable
                style={styles.cropActionPrimary}
                onPress={() => goTo('diagnosis')}
              >
                <Text style={styles.cropActionPrimaryText}>
                  🔬 {isFr ? 'Diagnostiquer la Feuille' : 'Diagnose Leaf'}
                </Text>
              </Pressable>

              <Pressable
                style={styles.cropActionSecondary}
                onPress={() => goTo('cropAdvice')}
              >
                <Text style={styles.cropActionSecondaryText}>
                  🌱 {isFr ? 'Plan de Culture' : 'Crop Advisory'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {/* ────────────────────────────────────────────────────────────────
          AI AGRONOMIST INSTANT CONSOLE (CHAT ASSISTANT)
      ──────────────────────────────────────────────────────────────── */}
      <View style={styles.chatConsoleCard}>
        <View style={styles.chatConsoleHeader}>
          <View style={styles.chatConsoleBadge}>
            <Text style={styles.chatConsoleBadgeText}>
              🤖 {isFr ? 'AGRONOME IA EN DIRECT' : 'LIVE AI AGRONOMIST'}
            </Text>
          </View>
          <View style={styles.offlineStatusPill}>
            <View style={styles.statusDotGreen} />
            <Text style={styles.offlineStatusText}>
              {isFr ? '100% Hors-Ligne' : '100% Offline Ready'}
            </Text>
          </View>
        </View>

        <Text style={styles.chatConsoleTitle}>
          {isFr ? 'Une question sur vos cultures ou votre sol ?' : 'Have a Question About Your Crops or Soil?'}
        </Text>

        {/* Suggestion Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 2 }}
        >
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

        {/* Input Bar */}
        <View style={styles.chatInputBar}>
          <TextInput
            style={styles.chatInput}
            value={chatInput}
            onChangeText={setChatInput}
            placeholder={isFr ? 'Posez votre question agronomique...' : 'Type your farming question...'}
            placeholderTextColor="#94A3B8"
            returnKeyType="send"
            onSubmitEditing={() => handleAskAgronomist(chatInput)}
          />
          <Pressable
            style={[
              styles.chatSendButton,
              (!chatInput.trim() || chatLoading) && styles.chatSendButtonDisabled,
            ]}
            onPress={() => handleAskAgronomist(chatInput)}
            disabled={!chatInput.trim() || chatLoading}
          >
            {chatLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.chatSendButtonText}>➤</Text>
            )}
          </Pressable>
        </View>

        {/* Chat Answer Box */}
        {chatReply && (
          <View style={styles.chatReplyBox}>
            <View style={styles.chatReplyHeader}>
              <Text style={styles.chatReplyTag}>
                🌾 {isFr ? 'Recommandation Certifiée' : 'Agronomic Guidance'}
              </Text>
              <Text style={styles.chatReplySource}>{chatReply.source}</Text>
            </View>
            <Text style={styles.chatReplyQuery}>« {chatReply.question} »</Text>
            <Text style={styles.chatReplyBody}>{chatReply.reply}</Text>

            <Pressable
              style={styles.openFullChatLink}
              onPress={() => goTo('aiChat')}
            >
              <Text style={styles.openFullChatLinkText}>
                💬 {isFr ? 'Continuer dans le Chat Complet →' : 'Continue in Full AI Chat Screen →'}
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* ────────────────────────────────────────────────────────────────
          ADMIN PORTAL ACCESS (ADMINISTRATOR ONLY)
      ──────────────────────────────────────────────────────────────── */}
      {userEmail === 'ivanmiyoupo@gmail.com' && (
        <Pressable style={styles.adminCard} onPress={() => goTo('admin')}>
          <View style={styles.adminCardContent}>
            <Text style={styles.adminCardIcon}>🔑</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.adminCardTitle}>
                {isFr ? 'Portail Administrateur Agro-Vission' : 'Admin & Analytics Portal'}
              </Text>
              <Text style={styles.adminCardSub}>
                {isFr
                  ? 'Gestion des utilisateurs, diagnostics et santé des modèles'
                  : 'Manage farmers, diagnosis reports, and system telemetry'}
              </Text>
            </View>
          </View>
          <Text style={styles.adminCardArrow}>→</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6F4', // Elegant earthy pale sage tone
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 44 : 28,
    paddingBottom: 40,
  },

  /* ── Header ── */
  topHeader: {
    marginBottom: 16,
  },
  headerProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  avatarImg: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#86EFAC',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  headerGreetingCol: {
    flex: 1,
  },
  greetingEyebrow: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  farmerNameText: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0F291E',
    letterSpacing: -0.3,
  },
  headerActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerIcon: {
    fontSize: 16,
  },
  notificationDot: {
    position: 'absolute',
    top: 7,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EF4444',
  },

  /* Region Bar (Image 4 exact) */
  regionHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  regionSubLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  regionMainLabel: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '700',
  },

  /* Soil pills (Image 4 exact) */
  soilPillsScroll: {
    marginBottom: 14,
  },
  soilPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  soilPillActive: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  soilPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  soilPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  /* ── 2x2 Sensor Metric Cards (Image 4) ── */
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  metricCard: {
    width: (width - 42) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  metricCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  metricCardIcon: {
    fontSize: 18,
  },
  metricCardValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
  },
  metricCardLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },

  /* ── Soil Moisture Analytics & Chart (Image 4) ── */
  analyticsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  analyticsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  analyticsTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F291E',
  },
  timeframeTogglesRow: {
    flexDirection: 'row',
    gap: 4,
  },
  timeframeBtn: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  timeframeBtnActive: {
    backgroundColor: '#16A34A',
  },
  timeframeBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  timeframeBtnTextActive: {
    color: '#FFFFFF',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 140,
    alignItems: 'flex-end',
  },
  chartYAxis: {
    width: 36,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 6,
    paddingBottom: 20,
  },
  axisLabel: {
    fontSize: 9.5,
    color: '#94A3B8',
    fontWeight: '600',
  },
  chartPlotArea: {
    flex: 1,
    height: '100%',
    position: 'relative',
    justifyContent: 'space-between',
  },
  gridLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  wavePlotContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  waveBarsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
    paddingBottom: 4,
  },
  waveColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  activeDotBubble: {
    position: 'absolute',
    bottom: '68%',
    backgroundColor: '#16A34A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    zIndex: 10,
  },
  activeDotBubbleText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  waveNode: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#86EFAC',
    borderWidth: 1.5,
    borderColor: '#16A34A',
    zIndex: 5,
  },
  waveNodeActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#16A34A',
    borderColor: '#DCFCE7',
    borderWidth: 2,
  },
  waveStem: {
    width: 2,
    backgroundColor: 'rgba(22, 163, 74, 0.25)',
    borderRadius: 1,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 6,
  },
  dayLabelActive: {
    color: '#16A34A',
    fontWeight: '800',
  },

  /* ── Smart Insights Card (Image 4) ── */
  smartInsightsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  insightsIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightsIcon: {
    fontSize: 20,
  },
  insightsContent: {
    flex: 1,
  },
  insightsTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  soilStatusTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16A34A',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  insightsMainText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F291E',
    marginBottom: 3,
  },
  insightsMetaText: {
    fontSize: 11,
    color: '#94A3B8',
  },

  /* ── Our Services Grid (Image 3) ── */
  servicesSection: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F291E',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16A34A',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  serviceGridItem: {
    width: (width - 42) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  serviceIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceIconText: {
    fontSize: 18,
  },
  serviceItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F291E',
    marginBottom: 2,
  },
  serviceItemSub: {
    fontSize: 11,
    color: '#64748B',
  },

  /* ── Promo Banner (Image 3) ── */
  promoBannerCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  promoBannerLeft: {
    flex: 1,
    paddingRight: 10,
  },
  promoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 6,
  },
  promoBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  promoTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#78350F',
    marginBottom: 4,
  },
  promoSub: {
    fontSize: 11.5,
    color: '#92400E',
    lineHeight: 16,
    marginBottom: 10,
  },
  promoActionBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#78350F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  promoActionBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  promoBannerImg: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },

  /* ── Cameroon Crops Showcase ── */
  popularSection: {
    marginBottom: 22,
  },
  cropControls: {
    flexDirection: 'row',
    gap: 6,
  },
  cropArrowBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cropArrowBtnText: {
    fontSize: 16,
    color: '#0F291E',
    fontWeight: '800',
  },
  cropChipsScroll: {
    marginBottom: 12,
  },
  cropPillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cropPillItemActive: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },
  cropPillIcon: {
    fontSize: 14,
  },
  cropPillLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  cropPillLabelActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  featuredCropCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cropCardImgBanner: {
    width: '100%',
    height: 140,
  },
  cropCardImgOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 30, 15, 0.45)',
    padding: 14,
    justifyContent: 'flex-end',
  },
  cropZoneBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 4,
  },
  cropZoneBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  cropCardImgTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  cropCardImgSeason: {
    fontSize: 12,
    color: '#E2FCE7',
    fontWeight: '600',
  },
  cropCardBody: {
    padding: 16,
  },
  tipBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  tipBoxLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#064E3B',
    marginBottom: 3,
  },
  tipBoxContent: {
    fontSize: 12.5,
    color: '#475569',
    lineHeight: 18,
  },
  cropActionBtnsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  cropActionPrimary: {
    flex: 1,
    backgroundColor: '#16A34A',
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },
  cropActionPrimaryText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '800',
  },
  cropActionSecondary: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cropActionSecondaryText: {
    color: '#0F291E',
    fontSize: 12.5,
    fontWeight: '700',
  },

  /* ── AI Chat Console ── */
  chatConsoleCard: {
    backgroundColor: '#0F291E',
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
  },
  chatConsoleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chatConsoleBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  chatConsoleBadgeText: {
    color: '#86EFAC',
    fontSize: 11,
    fontWeight: '800',
  },
  offlineStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDotGreen: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ADE80',
  },
  offlineStatusText: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '600',
  },
  chatConsoleTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  chipsScroll: {
    marginBottom: 14,
  },
  promptChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  promptChipText: {
    color: '#E2FCE7',
    fontSize: 11.5,
    fontWeight: '600',
  },
  chatInputBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: 'center',
  },
  chatInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    paddingVertical: 8,
  },
  chatSendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatSendButtonDisabled: {
    backgroundColor: '#CBD5E1',
  },
  chatSendButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  chatReplyBox: {
    backgroundColor: '#1E3E2F',
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  chatReplyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  chatReplyTag: {
    color: '#86EFAC',
    fontSize: 11,
    fontWeight: '700',
  },
  chatReplySource: {
    color: '#94A3B8',
    fontSize: 10,
  },
  chatReplyQuery: {
    color: '#E2E8F0',
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  chatReplyBody: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  openFullChatLink: {
    alignSelf: 'flex-start',
  },
  openFullChatLinkText: {
    color: '#86EFAC',
    fontSize: 11.5,
    fontWeight: '700',
  },

  /* ── Admin Card ── */
  adminCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  adminCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  adminCardIcon: {
    fontSize: 22,
  },
  adminCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F291E',
  },
  adminCardSub: {
    fontSize: 11,
    color: '#64748B',
  },
  adminCardArrow: {
    fontSize: 18,
    color: '#16A34A',
    fontWeight: '800',
    marginLeft: 8,
  },
});
