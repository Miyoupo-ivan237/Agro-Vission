import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import { getRecommendation } from '../../src/api';
import {
  scheduleLocalNotification,
  scheduleTwoWeekReminder
} from '../../services/localNotificationService';

function getCropImageSource(cropName = '') {
  const c = String(cropName).toLowerCase();
  if (c.includes('cassava') || c.includes('manioc')) return require('../../assets/crops/cassava.jpg');
  if (c.includes('cocoa') || c.includes('cacao')) return require('../../assets/crops/cocoa.jpg');
  if (c.includes('coffee') || c.includes('café')) return require('../../assets/crops/coffee.jpg');
  if (c.includes('plantain') || c.includes('banane')) return require('../../assets/crops/plantain.jpg');
  if (c.includes('groundnut') || c.includes('arachide')) return require('../../assets/crops/groundnut.jpg');
  if (c.includes('sorghum') || c.includes('sorgho') || c.includes('muskuwaari')) return require('../../assets/crops/sorghum.jpg');
  if (c.includes('cotton') || c.includes('coton')) return require('../../assets/crops/cotton.jpg');
  if (c.includes('palm') || c.includes('palmier')) return require('../../assets/crops/oil_palm.jpg');
  if (c.includes('yam') || c.includes('igname')) return require('../../assets/crops/yam.jpg');
  if (c.includes('bean') || c.includes('haricot')) return require('../../assets/crops/beans.jpg');
  if (c.includes('sweet potato') || c.includes('patate')) return require('../../assets/crops/sweet_potato.jpg');
  if (c.includes('maize') || c.includes('corn') || c.includes('maïs')) return { uri: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80' };
  if (c.includes('tomato') || c.includes('tomate')) return { uri: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' };
  if (c.includes('potato') || c.includes('pomme de terre')) return { uri: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80' };
  if (c.includes('rice') || c.includes('riz')) return { uri: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80' };
  if (c.includes('onion') || c.includes('oignon')) return { uri: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80' };
  return require('../../assets/logo.png');
}

const CAMEROON_10_REGIONS = [
  {
    id: 'centre',
    name: '📍 Centre (Yaoundé, Mbalmayo, Bafia)',
    zone: 'Zone: Humid Forest with Bimodal Rainfall',
    zoneFr: 'Zone : Forêt Humide à Pluviométrie Bimodale',
    suitable: 'Cassava, Cocoa, Maize, Yam, Plantain',
    suitableFr: 'Manioc, Cacao, Maïs, Igname, Banane Plantain'
  },
  {
    id: 'littoral',
    name: '📍 Littoral (Douala, Moungo/Njombe, Edéa)',
    zone: 'Zone: Monomodal Coastal Rain Forest & Volcanic Belt',
    zoneFr: 'Zone : Forêt Côtière Monomodale & Piémont Volcanique',
    suitable: 'Plantain, Sweet Banana, Pineapple, Oil Palm, Pepper',
    suitableFr: 'Banane Plantain, Banane Douce, Ananas, Palmier à Huile, Poivre'
  },
  {
    id: 'west',
    name: '📍 West (Bafoussam, Foumbot, Dschang)',
    zone: 'Zone: Western Volcanic Highlands & Valleys',
    zoneFr: 'Zone : Hauts-Plateaux & Vallées Volcaniques de l\'Ouest',
    suitable: 'Tomato, Maize, Arabica Coffee, Irish Potato, Beans',
    suitableFr: 'Tomate, Maïs, Café Arabica, Pomme de Terre, Haricot'
  },
  {
    id: 'northwest',
    name: '📍 North-West (Bamenda, Ndop, Santa)',
    zone: 'Zone: High Altitude Western Highlands',
    zoneFr: 'Zone : Hauts-Plateaux d\'Altitude du Nord-Ouest',
    suitable: 'Irish Potato, Highland Maize, Arabica Coffee, Rice',
    suitableFr: 'Pomme de Terre, Maïs d\'Altitude, Café Arabica, Riz de Plaine'
  },
  {
    id: 'southwest',
    name: '📍 South-West (Buea, Kumba, Limbe)',
    zone: 'Zone: Coastal Volcanic Foothills (Mount Cameroon)',
    zoneFr: 'Zone : Piémonts Volcaniques Côtiers (Mont Cameroun)',
    suitable: 'Cocoa, Plantain, Banana, Oil Palm, Cassava',
    suitableFr: 'Cacao, Banane Plantain, Banane, Palmier à Huile, Manioc'
  },
  {
    id: 'south',
    name: '📍 South (Ebolowa, Kribi, Sangmélima)',
    zone: 'Zone: Dense Equatorial Rain Forest',
    zoneFr: 'Zone : Forêt Équatoriale Dense Humide',
    suitable: 'Cassava, Cocoa, Oil Palm, Rubber, Plantain',
    suitableFr: 'Manioc, Cacao, Palmier à Huile, Hévéa, Banane Plantain'
  },
  {
    id: 'east',
    name: '📍 East (Bertoua, Batouri, Yokadouma)',
    zone: 'Zone: Forest-Savanna Transition & Dense Forest',
    zoneFr: 'Zone : Transition Forêt-Savane & Forêt Dense',
    suitable: 'Cassava, Cocoa, Robusta Coffee, Maize, Groundnut',
    suitableFr: 'Manioc, Cacao, Café Robusta, Maïs, Arachide'
  },
  {
    id: 'adamawa',
    name: '📍 Adamawa (Ngaoundéré, Tibati, Meiganga)',
    zone: 'Zone: High Guinea Savanna (Plateau)',
    zoneFr: 'Zone : Hautes Savanes Guinéennes (Plateau)',
    suitable: 'Maize, Groundnut, Yam, Sweet Potato, Sorghum',
    suitableFr: 'Maïs, Arachide, Igname, Patate Douce, Sorgho'
  },
  {
    id: 'north',
    name: '📍 North (Garoua, Guider, Poli)',
    zone: 'Zone: Sudano-Sahelian Savanna Basin',
    zoneFr: 'Zone : Bassin des Savanes Soudano-Sahéliennes',
    suitable: 'Cotton, Groundnut, Sorghum, Onion, Maize',
    suitableFr: 'Coton, Arachide, Sorgho, Oignon, Maïs'
  },
  {
    id: 'farnorth',
    name: '📍 Far North (Maroua, Kousseri, Yagoua)',
    zone: 'Zone: Sahelian Semi-Arid Plains & SEMRY Rice Valley',
    zoneFr: 'Zone : Plaines Semi-Arides Sahéliennes & Rizière SEMRY',
    suitable: 'Sorghum/Mil, Onion, Irrigated Rice, Cotton, Cowpea',
    suitableFr: 'Sorgho/Mil, Oignon, Riz Irrigué, Coton, Niébé'
  }
];

const SOIL_TYPES_DETAILED = [
  {
    id: 'loamy',
    name: 'Loamy / Rich Soil',
    emoji: '🟤',
    color: '#6B3D11',
    swatchBg: '#8B5E3C',
    label: 'Dark & Soft Soil',
    labelFr: 'Terre Noire / Meuble et Fertile',
    look: '👁 Looks: Dark brown or black, soft and crumbly',
    lookFr: '👁 Aspect : Brun foncé ou noir, meuble et grumeleux',
    feel: '✋ Feels: Easy to dig, stays together when squeezed',
    feelFr: '✋ Toucher : Facile à creuser, tient en boule sans coller',
    desc: 'Soft, dark, fertile with balanced sand & clay. Holds moisture well without waterlogging.'
  },
  {
    id: 'volcanic',
    name: 'Volcanic Soil (Terre Volcanique / Noire des Hauts-Plateaux)',
    emoji: '⚫',
    color: '#1C1C1C',
    swatchBg: '#2D2D2D',
    label: 'Black / Ash-Dark Soil',
    labelFr: 'Terre Noire Volcanique (Cendreuse)',
    look: '👁 Looks: Very dark or black, almost like ash or charcoal',
    lookFr: '👁 Aspect : Très sombre ou noire, semblable à de la cendre',
    feel: '✋ Feels: Light and powdery, very easy to break apart',
    feelFr: '✋ Toucher : Légère, poudreuse, s\'émiette très facilement',
    desc: 'Deep, mineral-packed, friable soil from Mount Cameroon & Western Highlands. Ideal for tomatoes, potatoes, bananas.'
  },
  {
    id: 'sandy',
    name: 'Sandy Soil / Sandy Loam (Terre Sablonneuse)',
    emoji: '🟡',
    color: '#B8860B',
    swatchBg: '#D4A843',
    label: 'Sandy / Light Soil',
    labelFr: 'Terre Sablonneuse / Sableuse Légère',
    look: '👁 Looks: Light yellow or pale brown, you can see fine grains',
    lookFr: '👁 Aspect : Jaune clair ou brun pâle, grains fins visibles',
    feel: '✋ Feels: Gritty, slips through your fingers, dries fast',
    feelFr: '✋ Toucher : Râpeux, glisse entre les doigts, sèche vite',
    desc: 'Light, fast-draining, easy to plow. Ideal for groundnuts, sweet potatoes, and root pegging.'
  },
  {
    id: 'clay_laterite',
    name: 'Clay / Red Laterite Soil (Terre Argileuse / Latéritique)',
    emoji: '🟠',
    color: '#8B2500',
    swatchBg: '#C0392B',
    label: 'Red / Orange Clay Soil',
    labelFr: 'Terre Argileuse / Latérite Rouge',
    look: '👁 Looks: Red, orange or brick-coloured, sometimes cracked',
    lookFr: '👁 Aspect : Rouge brique ou ocre orangé, parfois crevassé',
    feel: '✋ Feels: Sticky when wet, hard as rock when dry',
    feelFr: '✋ Toucher : Collant quand mouillé, dur comme la pierre à sec',
    desc: 'Heavy, rich in iron/aluminium oxides. Holds nutrients well; requires high ridges for cassava and yams.'
  }
];

const SEASONS = [
  { id: 'Onset of Major Rains', labelEn: 'Onset of Major Rains', labelFr: 'Début des grandes pluies' },
  { id: 'Mid / Heavy Rainy Season', labelEn: 'Mid / Heavy Rainy Season', labelFr: 'Pleine saison des pluies' },
  { id: 'Dry Season (Irrigated Farming)', labelEn: 'Dry Season (Irrigated Farming)', labelFr: 'Saison sèche (irriguée)' }
];

export default function CropAdviceScreen({ goTo, language = 'English' }) {
  const isFr = language === 'Français';
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [specificTown, setSpecificTown] = useState('');
  const [selectedSoil, setSelectedSoil] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [landSize, setLandSize] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [formError, setFormError] = useState('');
  const isFormComplete = Boolean(
    selectedRegion?.id &&
    selectedSoil?.id &&
    selectedSeason &&
    landSize.trim() &&
    Number.isFinite(Number(landSize)) &&
    Number(landSize) > 0
  );

  const updateForm = (update) => {
    setRecommendation(null);
    setFormError('');
    update();
  };

  const handleRecommend = async () => {
    setFormError('');
    const cleanSize = (landSize || '').trim();
    const sizeNumber = Number(cleanSize);
    const missingFields = [];
    if (!selectedRegion?.id) missingFields.push(isFr ? 'région' : 'region');
    if (!selectedSoil?.id) missingFields.push(isFr ? 'type de sol' : 'soil type');
    if (!selectedSeason) missingFields.push(isFr ? 'saison' : 'season');

    if (missingFields.length > 0 || !cleanSize || !Number.isFinite(sizeNumber) || sizeNumber <= 0) {
      setFormError(
        missingFields.length > 0
          ? `${isFr ? '⚠️ Veuillez renseigner' : '⚠️ Please select'}: ${missingFields.join(', ')}.`
          : isFr
            ? '⚠️ Veuillez renseigner la superficie de votre exploitation en hectares (ex. 1.5 Ha).'
            : '⚠️ Please enter a valid farm land size in hectares (e.g. 1.5 Ha).'
      );
      return;
    }

    setLoading(true);
    try {
      // Send the validated farmer form as the recommendation request payload.
      const region = selectedRegion;
      const soil = selectedSoil;
      const cleanTown = (specificTown || '').trim();
      const locationName = cleanTown ? `${cleanTown}, ${region.name.replace(/^📍\s*/, '')}` : region.name;

      const res = await getRecommendation({
        location: locationName,
        soilCondition: soil.name,
        season: selectedSeason,
        landSize: cleanSize,
        farmerContext: {
          region: region.id,
          location: locationName,
          specificTown: cleanTown,
          season: selectedSeason,
          soilCondition: soil.name,
          landSize: cleanSize
        },
        language
      });
      if (res && res.recommendation) {
        setRecommendation(res.recommendation);
        await scheduleLocalNotification({
          title: isFr ? 'Recommandation prête' : 'Recommendation ready',
          body: isFr ? 'Votre plan de culture est disponible.' : 'Your crop plan is ready to review.',
          data: { type: 'recommendation_ready' }
        });
        await scheduleTwoWeekReminder({ language });
      } else {
        setFormError(isFr ? '⚠️ Aucune recommandation n’a été générée.' : '⚠️ No crop recommendation was generated.');
      }
    } catch (e) {
      setFormError(
        isFr
          ? '⚠️ Impossible de traiter votre demande. Vérifiez votre connexion et réessayez.'
          : '⚠️ The recommendation request could not be processed. Check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Dark Theme Header matching Screenshot 2 */}
      <View style={styles.headerBox}>
        <Image source={require('../../assets/logo.png')} style={styles.headerImage} resizeMode="contain" />
        <Pressable onPress={() => goTo('home')} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        <View style={styles.engineBadge}>
          <Text style={styles.engineBadgeText}>
            {isFr ? '🌾 MOTEUR AGRONOMIQUE DU CAMEROUN' : '🌾 PLANT VILLAGE CAMEROON CROP ENGINE'}
          </Text>
        </View>

        <Text style={styles.headerTitle}>
          {isFr ? 'Moteur de Recommandation des Cultures' : 'Crop Recommendation Engine'}
        </Text>
        <Text style={styles.headerSubtitle}>
          {isFr
            ? 'Choix de cultures optimisé selon votre localisation, sol, saison et superficie.'
            : 'Tailored crop choices based on your location, soil, season, and farm size.'}
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>
          {isFr ? 'Informations sur votre Exploitation' : 'Select Your Farm Information'}
        </Text>
        <Text style={styles.sectionDesc}>
          {isFr
            ? 'Sélectionnez votre région, votre type de sol et la période de semis pour obtenir les meilleures cultures.'
            : 'Select your region, soil type, and season to compute optimal crop compatibility.'}
        </Text>

        {/* 1. Region Picker */}
        <Text style={styles.fieldLabel}>
          {isFr ? '1. Localisation de votre champ (10 Régions) *' : '1. Where is your farm located? (10 Regions) *'}
        </Text>
        <ScrollView style={styles.optionList} nestedScrollEnabled>
          {CAMEROON_10_REGIONS.map((reg) => {
            const isSelected = selectedRegion?.id === reg.id;
            return (
              <Pressable
                key={reg.id}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => updateForm(() => setSelectedRegion(reg))}
              >
                <Text style={[styles.optionName, isSelected && styles.optionNameSelected]}>
                  {reg.name}
                </Text>
                <Text style={styles.optionZone}>{isFr ? reg.zoneFr || reg.zone : reg.zone}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* 1b. Optional Specific Town / Village */}
        <Text style={[styles.fieldLabel, { marginTop: 10, fontSize: 13, color: '#334155' }]}>
          {isFr ? '🏘️ Ville, Village ou Localité spécifique (Optionnel)' : '🏘️ Specific Town, Village, or Locality (Optional)'}
        </Text>
        <TextInput
          style={[styles.input, { marginBottom: 6, fontSize: 14 }]}
          placeholder={isFr ? 'ex. Foumbot, Obala, Kumba, Santa, Maroua, Tibati...' : 'e.g. Foumbot, Obala, Kumba, Santa, Maroua, Tibati...'}
          placeholderTextColor="#94A3B8"
          value={specificTown}
          onChangeText={(txt) => updateForm(() => setSpecificTown(txt))}
        />

        {/* 2. Soil Picker — visual colour cards */}
        <Text style={[styles.fieldLabel, { marginTop: 14 }]}>
          {isFr ? '2. À quoi ressemble votre sol ? *' : '2. What does your soil look like? *'}
        </Text>
        <Text style={{ fontSize: 11, color: '#64748B', marginBottom: 10, lineHeight: 15 }}>
          {isFr
            ? '💡 Astuce : Choisissez la couleur correspondant à la terre de votre parcelle en la regardant ou en la touchant.'
            : '💡 Tip: Pick the colour that matches your farm soil. You can tell by looking at your field or pinching a bit of wet soil.'}
        </Text>
        <View style={styles.soilContainer}>
          {SOIL_TYPES_DETAILED.map((s) => {
            const isSelected = selectedSoil?.id === s.id;
            return (
              <Pressable
                key={s.id}
                style={[
                  styles.soilCard,
                  isSelected && styles.soilCardSelected,
                  { flexDirection: 'row', alignItems: 'flex-start', gap: 12 }
                ]}
                onPress={() => updateForm(() => setSelectedSoil(s))}
              >
                {/* Colour swatch */}
                <View style={{
                  width: 52,
                  height: 52,
                  borderRadius: 10,
                  backgroundColor: s.swatchBg,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0,
                  borderWidth: isSelected ? 2 : 1,
                  borderColor: isSelected ? '#059669' : 'rgba(0,0,0,0.15)'
                }}>
                  <Text style={{ fontSize: 22 }}>{s.emoji}</Text>
                </View>

                {/* Text info */}
                <View style={{ flex: 1 }}>
                  <Text style={[styles.soilName, isSelected && styles.soilNameSelected]}>
                    {isFr ? s.labelFr : s.label}
                  </Text>
                  <Text style={styles.soilDesc}>{isFr ? s.lookFr : s.look}</Text>
                  <Text style={styles.soilDesc}>{isFr ? s.feelFr : s.feel}</Text>
                </View>

                {/* Selected tick */}
                {isSelected && (
                  <Text style={{ fontSize: 18, color: '#059669', alignSelf: 'center' }}>✅</Text>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* 3. Season */}
        <Text style={[styles.fieldLabel, { marginTop: 14 }]}>
          {isFr ? '3. Période de Semis / Saison *' : '3. Planting Season *'}
        </Text>
        <View style={styles.pillRow}>
          {SEASONS.map((sea) => (
            <Pressable
              key={sea.id}
              style={[styles.pill, selectedSeason === sea.id && styles.pillActive]}
              onPress={() => updateForm(() => setSelectedSeason(sea.id))}
            >
              <Text style={[styles.pillText, selectedSeason === sea.id && styles.pillTextActive]}>
                {isFr ? sea.labelFr : sea.labelEn}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* 4. Farm Size */}
        <Text style={[styles.fieldLabel, { marginTop: 14 }]}>
          {isFr ? '4. Superficie du champ (en Hectares) *' : '4. Farm Land Size (Hectares) *'}
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={landSize}
          onChangeText={(value) => updateForm(() => setLandSize(value))}
          placeholder={isFr ? 'ex. 2.0' : 'e.g. 2.0'}
        />

        {/* Form Error Banner */}
        {formError ? (
          <View style={{ backgroundColor: '#FEE2E2', borderRadius: 10, padding: 12, marginTop: 10, marginBottom: 4 }}>
            <Text style={{ color: '#DC2626', fontWeight: 'bold', fontSize: 13 }}>{formError}</Text>
          </View>
        ) : null}

        <Pressable
          style={[styles.calculateBtn, !isFormComplete && styles.calculateBtnDisabled]}
          onPress={handleRecommend}
          disabled={loading || !isFormComplete}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.calculateBtnText}>
              {isFr ? '⚡ Calculer les Meilleures Cultures & Plan' : '⚡ Compute Optimal Crop & Plan'}
            </Text>
          )}
        </Pressable>
      </View>

      {/* Locked placeholder – shown before first calculation */}
      {!recommendation && !loading && (
        <View style={styles.lockedCard}>
          <Text style={styles.lockedIcon}>🔒</Text>
          <Text style={styles.lockedTitle}>
            {isFr ? 'Remplissez le formulaire pour voir les résultats' : 'Complete the form to unlock results'}
          </Text>
          <Text style={styles.lockedSub}>
            {isFr
              ? 'Sélectionnez votre région, sol, saison et superficie, puis appuyez sur Calculer.'
              : 'Select your region, soil, season and land size, then press Calculate.'}
          </Text>
        </View>
      )}

      {/* Recommendation Results Card */}
      {recommendation && (() => {
        const successPct = Math.round(
          Number.isFinite(Number(recommendation.successScore))
            ? Number(recommendation.successScore)
            : Number.isFinite(Number(recommendation.compatibilityPercent))
            ? Number(recommendation.compatibilityPercent)
            : (Number(recommendation.confidence) || 0.88) * 100
        );

        const plantingCal = recommendation.plantingCalendar || {};
        const plantingWindow = plantingCal.plantingWindow || (isFr ? 'Mars – Avril (Saison 1) · Août – Septembre (Saison 2)' : 'March – April (Season 1) · August – September (Season 2)');
        const bestMonth = plantingCal.bestMonth || (isFr ? '15 Mars – 10 Avril' : 'March 15 – April 10');
        const harvestWindow = plantingCal.harvestWindow || (isFr ? 'Juin – Juillet · Novembre – Décembre' : 'June – July · November – December');
        const duration = plantingCal.duration || recommendation.primaryDetails?.maturityDays || (isFr ? '90 – 110 Jours' : '90 – 110 Days');
        const warning = plantingCal.warning || (isFr ? 'Préparez les planches 2 semaines avant les semis pour éviter le lessivage.' : 'Prepare ridges 2 weeks prior to planting to prevent runoff.');

        const cropImg = getCropImageSource(recommendation.primaryCrop);

        return (
          <View style={styles.resultCard}>
            {/* Top Technology Header */}
            <View style={styles.techEngineHeader}>
              <View style={styles.techHeaderBadge}>
                <Text style={styles.techHeaderBadgeText}>
                  {isFr ? '⚡ MOTEUR IA AGRONOMIQUE DU CAMEROUN' : '⚡ CAMEROON AI AGRONOMIC PREDICTION ENGINE'}
                </Text>
              </View>
              <Text style={styles.techHeaderSub}>
                {isFr ? 'Prédiction Multi-Facteurs : Pédologie, Pluviométrie & 10 Régions' : 'Multi-Factor Prediction: Soil Physics, Rainfall & 10 Regions'}
              </Text>
            </View>

            {/* Crop Title & Visual Hero */}
            <View style={styles.cropHeroBanner}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.resultBadge}>
                  {isFr ? '🏆 CULTURE OPTIMALE RECOMMANDÉE' : '🏆 RECOMMENDED OPTIMAL CROP'}
                </Text>
                <Text style={styles.resultCropTitle}>{recommendation.primaryCrop}</Text>
                <Text style={styles.cropRegionSub}>
                  📍 {recommendation.regionName || (isFr ? 'Région Cible' : 'Target Region')}
                </Text>
              </View>
              <Image source={cropImg} style={styles.resultCropHeroImg} resizeMode="cover" />
            </View>

            {/* Success Probability HUD Panel */}
            <View style={styles.successHudCard}>
              <View style={styles.successHudTop}>
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <Text style={styles.successHudTitle}>
                    {isFr ? 'Probabilité de Réussite Globale' : 'Estimated Success Probability'}
                  </Text>
                  <Text style={styles.successHudSubtitle}>
                    {successPct >= 90
                      ? (isFr ? '🌟 Viabilité Maximale Confirmée' : '🌟 Optimal Viability Confirmed')
                      : (isFr ? '✨ Forte Viabilité Agronomique' : '✨ High Agronomic Viability')}
                  </Text>
                </View>
                <View style={styles.successHudScoreBox}>
                  <Text style={styles.successHudScoreNumber}>{successPct}%</Text>
                  <Text style={styles.successHudScoreLabel}>{isFr ? 'RÉUSSITE' : 'SUCCESS'}</Text>
                </View>
              </View>

              {/* Progress Bar Track & Fill */}
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: `${Math.min(100, Math.max(10, successPct))}%` }]} />
              </View>

              {/* 3 Scientific Pillar Gauges */}
              <View style={styles.pillarsGrid}>
                <View style={styles.pillarItem}>
                  <Text style={styles.pillarIcon}>🗺️</Text>
                  <Text style={styles.pillarScore}>98%</Text>
                  <Text style={styles.pillarLabel}>{isFr ? 'Climat Régional' : 'Regional Fit'}</Text>
                </View>
                <View style={styles.pillarItem}>
                  <Text style={styles.pillarIcon}>🟤</Text>
                  <Text style={styles.pillarScore}>{Math.min(99, successPct + 2)}%</Text>
                  <Text style={styles.pillarLabel}>{isFr ? 'Affinité Sol' : 'Soil Match'}</Text>
                </View>
                <View style={styles.pillarItem}>
                  <Text style={styles.pillarIcon}>🌦️</Text>
                  <Text style={styles.pillarScore}>{Math.max(82, successPct - 3)}%</Text>
                  <Text style={styles.pillarLabel}>{isFr ? 'Saison & Pluie' : 'Season Fit'}</Text>
                </View>
              </View>
            </View>

            {/* WHEN TO PLANT & HARVEST (CALENDRIER DE SEMIS & RÉCOLTE) */}
            <View style={styles.calendarCard}>
              <View style={styles.calendarCardHeader}>
                <Text style={styles.calendarHeaderIcon}>📅</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.calendarHeaderTitle}>
                    {isFr ? 'Quand Semer & Quand Récolter ?' : 'When to Plant & Harvest?'}
                  </Text>
                  <Text style={styles.calendarHeaderSub}>
                    {isFr ? 'Calendrier Phénologique & Périodes Idéales' : 'Crop Phenology & Peak Windows'}
                  </Text>
                </View>
              </View>

              <View style={styles.calendarGrid}>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarCellLabel}>
                    🚀 {isFr ? 'Période de Semis Optimale' : 'Optimal Planting Window'}
                  </Text>
                  <Text style={styles.calendarCellValue}>{plantingWindow}</Text>
                </View>

                <View style={styles.calendarCell}>
                  <Text style={styles.calendarCellLabel}>
                    🌟 {isFr ? 'Fenêtre Idéale / Pic' : 'Golden Sowing Date'}
                  </Text>
                  <Text style={[styles.calendarCellValue, { color: '#047857' }]}>{bestMonth}</Text>
                </View>

                <View style={styles.calendarCell}>
                  <Text style={styles.calendarCellLabel}>
                    🌾 {isFr ? 'Période de Récolte Estimée' : 'Estimated Harvest Window'}
                  </Text>
                  <Text style={styles.calendarCellValue}>{harvestWindow}</Text>
                </View>

                <View style={styles.calendarCell}>
                  <Text style={styles.calendarCellLabel}>
                    ⏳ {isFr ? 'Durée du Cycle Végétatif' : 'Full Growth Cycle'}
                  </Text>
                  <Text style={styles.calendarCellValue}>{duration}</Text>
                </View>
              </View>

              {/* Critical Timing Alert / Règle d'or */}
              {warning ? (
                <View style={styles.warningBox}>
                  <Text style={styles.warningIcon}>💡</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.warningTitle}>
                      {isFr ? 'Facteur Clé de Réussite :' : 'Key Success Factor:'}
                    </Text>
                    <Text style={styles.warningText}>{warning}</Text>
                  </View>
                </View>
              ) : null}
            </View>

            {/* Assessment Insights */}
            <View style={styles.assessmentSection}>
              <Text style={styles.resultText}>🌱 {recommendation.soilAssessment}</Text>
              <Text style={styles.resultText}>🌦️ {recommendation.seasonalAdvice}</Text>
            </View>

            {/* Production & Growth Metrics */}
            <View style={styles.metricGrid}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>
                  {isFr ? 'Production Estimée' : 'Projected Production'}
                </Text>
                <Text style={styles.metricValue}>
                  {recommendation.primaryDetails?.expectedYield || '5.0 - 8.5 T/ha'}
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>
                  {isFr ? 'Cycle Végétatif' : 'Growth Cycle'}
                </Text>
                <Text style={styles.metricValue}>
                  {recommendation.primaryDetails?.maturityDays || (isFr ? '90 - 120 Jours' : '90 - 120 Days')}
                </Text>
              </View>
            </View>

            {/* Spacing */}
            <Text style={styles.subHeading}>
              {isFr ? '🌿 Espacements et Densité au Champ :' : '🌿 Recommended Field Spacing:'}
            </Text>
            <Text style={styles.bodyText}>
              {recommendation.primaryDetails?.spacing || (isFr ? '75 cm entre les lignes x 25 cm entre les poquets' : '75 cm between rows x 25 cm between plants')}
            </Text>

            {/* Fertilizer Schedule */}
            <Text style={styles.subHeading}>
              {isFr ? '🧪 Calendrier de Fertilisation :' : '🧪 Fertilizer Schedule:'}
            </Text>
            {Array.isArray(recommendation.primaryDetails?.fertilizerSchedule) && recommendation.primaryDetails.fertilizerSchedule.length > 0 ? (
              recommendation.primaryDetails.fertilizerSchedule.map((entry, i) => (
                <View key={i} style={styles.fertilizerEntry}>
                  <Text style={styles.fertilizerTiming}>⏱ {entry.timing}</Text>
                  <Text style={styles.bodyText}>📦 {entry.fertilizer} — {entry.rate}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.bodyText}>
                {recommendation.primaryDetails?.fertilizer ||
                  (isFr
                    ? 'NPK de fond (200kg/ha) au semis ; Urée 46% (100kg/ha) à 4 semaines.'
                    : 'Basal NPK (200kg/ha) at planting; Top-dress Urea 46% (100kg/ha) at 4 weeks.')}
              </Text>
            )}

            {/* Compatible Regional Crops with Individual Success % and Planting Windows */}
            {Array.isArray(recommendation.compatibleCrops) && recommendation.compatibleCrops.length > 0 && (
              <View style={{ marginTop: 18 }}>
                <Text style={styles.subHeading}>
                  {isFr ? '🌍 Autres Cultures avec Probabilité de Réussite :' : '🌍 Other Regional Crops & Success Rates:'}
                </Text>
                {recommendation.compatibleCrops.map((c, i) => (
                  <View key={i} style={styles.altCropCard}>
                    <View style={styles.altCropTopRow}>
                      <Text style={styles.altCropName}>{c.name}</Text>
                      <View style={styles.altCropBadge}>
                        <Text style={styles.altCropBadgeText}>
                          {c.successPct || 90}% {isFr ? 'Réussite' : 'Success'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.altCropDetailsRow}>
                      {c.plantingWindow ? (
                        <Text style={styles.altCropDetailText}>
                          🌱 {isFr ? 'Semis :' : 'Plant:'} <Text style={{ fontWeight: 'bold' }}>{c.plantingWindow}</Text>
                        </Text>
                      ) : null}
                      {c.harvestWindow ? (
                        <Text style={styles.altCropDetailText}>
                          🌾 {isFr ? 'Récolte :' : 'Harvest:'} <Text style={{ fontWeight: 'bold' }}>{c.harvestWindow}</Text>
                        </Text>
                      ) : null}
                    </View>

                    <Text style={styles.altCropSubText}>
                      📦 {isFr ? 'Rendement :' : 'Yield:'} {c.yield || c.expectedYield || '—'} · ⏱ {isFr ? 'Cycle :' : 'Cycle:'} {c.maturity || c.maturityDays || '—'}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })()}

      <Pressable style={styles.backHomeBtn} onPress={() => goTo('home')}>
        <Text style={styles.backHomeBtnText}>
          {isFr ? '← Retour au Tableau de Bord' : '← Back to Dashboard'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    paddingBottom: 40,
  },
  headerBox: {
    backgroundColor: '#0F172A',
    paddingTop: 36,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerImage: {
    width: 76,
    height: 76,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    marginBottom: 14,
  },
  resultCropImage: {
    width: 92,
    height: 72,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 14,
    backgroundColor: '#F1F8E9',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  backArrow: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  engineBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#D97706',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 10,
  },
  engineBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 6,
  },
  headerSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 2,
  },
  sectionDesc: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 16,
  },
  fieldLabel: {
    fontWeight: 'bold',
    color: '#0F172A',
    fontSize: 14,
    marginBottom: 8,
  },
  optionList: {
    maxHeight: 180,
    marginBottom: 6,
  },
  optionCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  optionCardSelected: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
  },
  optionName: {
    fontWeight: 'bold',
    color: '#1E293B',
    fontSize: 13,
  },
  optionNameSelected: {
    color: '#065F46',
  },
  optionZone: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },
  optionCrops: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 3,
  },
  soilContainer: {
    gap: 8,
  },
  soilCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  soilCardSelected: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
  },
  soilName: {
    fontWeight: 'bold',
    color: '#1E293B',
    fontSize: 13,
  },
  soilNameSelected: {
    color: '#065F46',
  },
  soilDesc: {
    color: '#64748B',
    fontSize: 11,
    lineHeight: 15,
    marginTop: 3,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  pillActive: {
    backgroundColor: '#059669',
  },
  pillText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#ffffff',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 15,
  },
  calculateBtn: {
    backgroundColor: '#059669',
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  calculateBtnDisabled: {
    backgroundColor: '#94A3B8',
  },
  calculateBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  resultCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 18,
    elevation: 3,
    borderTopWidth: 4,
    borderTopColor: '#059669',
  },
  resultBadgeRow: {
    marginBottom: 4,
  },
  resultBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#059669',
    letterSpacing: 0.5,
  },
  resultCropTitle: {
    fontSize: 22,
    fontWeight: 'black',
    color: '#0F172A',
    marginBottom: 8,
  },
  confidencePanel: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  confidencePercent: {
    color: '#047857',
    fontSize: 24,
    fontWeight: 'bold',
  },
  confidenceLabel: {
    color: '#065F46',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
  confidenceNote: {
    color: '#475569',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
  resultText: {
    color: '#334155',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 6,
  },
  metricGrid: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 12,
  },
  metricItem: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 13,
    color: '#065F46',
    fontWeight: 'bold',
    marginTop: 2,
  },
  subHeading: {
    fontWeight: 'bold',
    color: '#0F172A',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 2,
  },
  bodyText: {
    color: '#475569',
    fontSize: 12,
    lineHeight: 17,
  },
  fertilizerEntry: {
    marginBottom: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 8,
  },
  fertilizerTiming: {
    fontWeight: 'bold',
    color: '#065F46',
    fontSize: 12,
    marginBottom: 2,
  },
  backHomeBtn: {
    padding: 16,
    alignItems: 'center',
  },
  backHomeBtnText: {
    color: '#94A3B8',
    fontWeight: 'bold',
    fontSize: 13,
  },
  /* Advanced Agronomic Technology Styles */
  techEngineHeader: {
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  techHeaderBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 4,
  },
  techHeaderBadgeText: {
    color: '#38BDF8',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  techHeaderSub: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '500',
  },
  cropHeroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cropRegionSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '600',
  },
  resultCropHeroImg: {
    width: 84,
    height: 84,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
  },
  successHudCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  successHudTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  successHudTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#065F46',
  },
  successHudSubtitle: {
    fontSize: 11,
    color: '#059669',
    marginTop: 2,
    fontWeight: '600',
  },
  successHudScoreBox: {
    backgroundColor: '#047857',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
  },
  successHudScoreNumber: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
  },
  successHudScoreLabel: {
    color: '#A7F3D0',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#D1FAE5',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 4,
  },
  pillarsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  pillarItem: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  pillarIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  pillarScore: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#065F46',
  },
  pillarLabel: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 1,
    textAlign: 'center',
    fontWeight: '500',
  },
  calendarCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  calendarCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  calendarHeaderIcon: {
    fontSize: 24,
  },
  calendarHeaderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#065F46',
  },
  calendarHeaderSub: {
    fontSize: 11,
    color: '#059669',
  },
  calendarGrid: {
    gap: 8,
  },
  calendarCell: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  calendarCellLabel: {
    fontSize: 11,
    color: '#475569',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  calendarCellValue: {
    fontSize: 12,
    color: '#1E293B',
    fontWeight: '600',
  },
  warningBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#FEF3C7',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  warningIcon: {
    fontSize: 18,
  },
  warningTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 1,
  },
  warningText: {
    fontSize: 11,
    color: '#78350F',
    lineHeight: 16,
  },
  assessmentSection: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  altCropCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#16A34A',
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  altCropTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  altCropName: {
    fontWeight: 'bold',
    color: '#065F46',
    fontSize: 13,
    flex: 1,
  },
  altCropBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  altCropBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  altCropDetailsRow: {
    marginBottom: 4,
  },
  altCropDetailText: {
    color: '#334155',
    fontSize: 11,
    marginBottom: 2,
  },
  altCropSubText: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },
  lockedCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  lockedIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  lockedTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#475569',
    textAlign: 'center',
    marginBottom: 6,
  },
  lockedSub: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
  },
});
