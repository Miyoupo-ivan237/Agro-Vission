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

const CAMEROON_10_REGIONS = [
  {
    id: 'centre',
    name: '📍 Centre (Yaoundé, Mbalmayo, Bafia)',
    zone: 'Zone: Humid Forest with Bimodal Rainfall',
    suitable: 'Cassava, Cocoa, Maize, Yam, Plantain'
  },
  {
    id: 'littoral',
    name: '📍 Littoral (Douala, Moungo/Njombe, Edéa)',
    zone: 'Zone: Monomodal Coastal Rain Forest & Volcanic Belt',
    suitable: 'Plantain, Sweet Banana, Pineapple, Oil Palm, Pepper'
  },
  {
    id: 'west',
    name: '📍 West (Bafoussam, Foumbot, Dschang)',
    zone: 'Zone: Western Volcanic Highlands & Valleys',
    suitable: 'Tomato, Maize, Arabica Coffee, Irish Potato, Beans'
  },
  {
    id: 'northwest',
    name: '📍 North-West (Bamenda, Ndop, Santa)',
    zone: 'Zone: High Altitude Western Highlands',
    suitable: 'Irish Potato, Highland Maize, Arabica Coffee, Rice'
  },
  {
    id: 'southwest',
    name: '📍 South-West (Buea, Kumba, Limbe)',
    zone: 'Zone: Coastal Volcanic Foothills (Mount Cameroon)',
    suitable: 'Cocoa, Plantain, Banana, Oil Palm, Cassava'
  },
  {
    id: 'south',
    name: '📍 South (Ebolowa, Kribi, Sangmélima)',
    zone: 'Zone: Dense Equatorial Rain Forest',
    suitable: 'Cassava, Cocoa, Oil Palm, Rubber, Plantain'
  },
  {
    id: 'east',
    name: '📍 East (Bertoua, Batouri, Yokadouma)',
    zone: 'Zone: Forest-Savanna Transition & Dense Forest',
    suitable: 'Cassava, Cocoa, Robusta Coffee, Maize, Groundnut'
  },
  {
    id: 'adamawa',
    name: '📍 Adamawa (Ngaoundéré, Tibati, Meiganga)',
    zone: 'Zone: High Guinea Savanna (Plateau)',
    suitable: 'Maize, Groundnut, Yam, Sweet Potato, Sorghum'
  },
  {
    id: 'north',
    name: '📍 North (Garoua, Guider, Poli)',
    zone: 'Zone: Sudano-Sahelian Savanna Basin',
    suitable: 'Cotton, Groundnut, Sorghum, Onion, Maize'
  },
  {
    id: 'farnorth',
    name: '📍 Far North (Maroua, Kousseri, Yagoua)',
    zone: 'Zone: Sahelian Semi-Arid Plains & SEMRY Rice Valley',
    suitable: 'Sorghum/Mil, Onion, Irrigated Rice, Cotton, Cowpea'
  }
];

const SOIL_TYPES_DETAILED = [
  {
    id: 'loamy',
    name: 'Loamy / Rich Soil',
    // Farmer-friendly label + colour swatch
    emoji: '🟤',
    color: '#6B3D11',
    swatchBg: '#8B5E3C',
    label: 'Dark & Soft Soil',
    look: '👁 Looks: Dark brown or black, soft and crumbly',
    feel: '✋ Feels: Easy to dig, stays together when squeezed',
    desc: 'Soft, dark, fertile with balanced sand & clay. Holds moisture well without waterlogging.'
  },
  {
    id: 'volcanic',
    name: 'Volcanic Soil (Terre Volcanique / Noire des Hauts-Plateaux)',
    emoji: '⚫',
    color: '#1C1C1C',
    swatchBg: '#2D2D2D',
    label: 'Black / Ash-Dark Soil',
    look: '👁 Looks: Very dark or black, almost like ash or charcoal',
    feel: '✋ Feels: Light and powdery, very easy to break apart',
    desc: 'Deep, mineral-packed, friable soil from Mount Cameroon & Western Highlands. Ideal for tomatoes, potatoes, bananas.'
  },
  {
    id: 'sandy',
    name: 'Sandy Soil / Sandy Loam (Terre Sablonneuse)',
    emoji: '🟡',
    color: '#B8860B',
    swatchBg: '#D4A843',
    label: 'Sandy / Light Soil',
    look: '👁 Looks: Light yellow or pale brown, you can see fine grains',
    feel: '✋ Feels: Gritty, slips through your fingers, dries fast',
    desc: 'Light, fast-draining, easy to plow. Ideal for groundnuts, sweet potatoes, and root pegging.'
  },
  {
    id: 'clay_laterite',
    name: 'Clay / Red Laterite Soil (Terre Argileuse / Latéritique)',
    emoji: '🟠',
    color: '#8B2500',
    swatchBg: '#C0392B',
    label: 'Red / Orange Clay Soil',
    look: '👁 Looks: Red, orange or brick-coloured, sometimes cracked',
    feel: '✋ Feels: Sticky when wet, hard as rock when dry',
    desc: 'Heavy, rich in iron/aluminium oxides. Holds nutrients well; requires high ridges for cassava and yams.'
  }
];

const SEASONS = ['Onset of Major Rains', 'Mid / Heavy Rainy Season', 'Dry Season (Irrigated Farming)'];

export default function CropAdviceScreen({ goTo, language = 'English' }) {
  const isFr = language === 'Français';
  const [selectedRegion, setSelectedRegion] = useState(null);
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
      const res = await getRecommendation({
        location: region.name,
        soilCondition: soil.name,
        season: selectedSeason,
        landSize: cleanSize,
        farmerContext: {
          region: region.id,
          location: region.name,
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
          <Text style={styles.engineBadgeText}>🌾 PLANT VILLAGE CAMEROON CROP ENGINE</Text>
        </View>

        <Text style={styles.headerTitle}>Crop Recommendation Engine</Text>
        <Text style={styles.headerSubtitle}>
          Tailored crop choices based on your location, soil, season, and farm size.
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Select Your Farm Information</Text>
        <Text style={styles.sectionDesc}>
          Select your region, soil type, and season to compute optimal crop compatibility.
        </Text>

        {/* 1. Region Picker */}
        <Text style={styles.fieldLabel}>1. Where is your farm located? (10 Regions) *</Text>
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
                <Text style={styles.optionZone}>{reg.zone}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* 2. Soil Picker — visual colour cards */}
        <Text style={[styles.fieldLabel, { marginTop: 14 }]}>
          2. What does your soil look like? *
        </Text>
        <Text style={{ fontSize: 11, color: '#64748B', marginBottom: 10, lineHeight: 15 }}>
          💡 Tip: Pick the colour that matches your farm soil. You can tell by looking at your field or pinching a bit of wet soil.
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
                    {s.label}
                  </Text>
                  <Text style={styles.soilDesc}>{s.look}</Text>
                  <Text style={styles.soilDesc}>{s.feel}</Text>
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
        <Text style={[styles.fieldLabel, { marginTop: 14 }]}>3. Planting Season</Text>
        <View style={styles.pillRow}>
          {SEASONS.map((sea) => (
            <Pressable
              key={sea}
              style={[styles.pill, selectedSeason === sea && styles.pillActive]}
              onPress={() => updateForm(() => setSelectedSeason(sea))}
            >
              <Text style={[styles.pillText, selectedSeason === sea && styles.pillTextActive]}>
                {sea}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* 4. Farm Size */}
        <Text style={[styles.fieldLabel, { marginTop: 14 }]}>4. Farm Land Size (Hectares)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={landSize}
          onChangeText={(value) => updateForm(() => setLandSize(value))}
          placeholder="e.g. 2.0"
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
            <Text style={styles.calculateBtnText}>⚡ Compute Optimal Crop & Plan</Text>
          )}
        </Pressable>
      </View>

      {/* Recommendation Results Card */}
      {recommendation && (
        <View style={styles.resultCard}>
          <View style={styles.resultBadgeRow}>
            <Text style={styles.resultBadge}>🎯 HIGHEST COMPATIBILITY CROP</Text>
          </View>
          <Text style={styles.resultCropTitle}>{recommendation.primaryCrop}</Text>
          <Image source={require('../../assets/logo.png')} style={styles.resultCropImage} resizeMode="contain" />

          <Text style={styles.resultText}>{recommendation.soilAssessment}</Text>
          <Text style={styles.resultText}>{recommendation.seasonalAdvice}</Text>

          <View style={styles.metricGrid}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Projected Production</Text>
              <Text style={styles.metricValue}>
                {recommendation.primaryDetails?.expectedYield || '5.0 - 8.5 T/ha'}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Growth Cycle</Text>
              <Text style={styles.metricValue}>
                {recommendation.primaryDetails?.maturityDays || '90 - 120 Days'}
              </Text>
            </View>
          </View>

          <Text style={styles.subHeading}>🌿 Recommended Field Spacing:</Text>
          <Text style={styles.bodyText}>
            {recommendation.primaryDetails?.spacing || '75 cm between rows x 25 cm between plants'}
          </Text>

          <Text style={styles.subHeading}>🧪 Fertilizer Schedule:</Text>
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
                'Basal NPK (200kg/ha) at planting; Top-dress Urea 46% (100kg/ha) at 4 weeks.'}
            </Text>
          )}

          {/* Compatible / Regional Crops Section */}
          {Array.isArray(recommendation.compatibleCrops) && recommendation.compatibleCrops.length > 0 && (
            <View style={{ marginTop: 18 }}>
              <Text style={styles.subHeading}>🌍 Other Crops Produced in This Region:</Text>
              {recommendation.compatibleCrops.map((c, i) => (
                <View
                  key={i}
                  style={{
                    backgroundColor: '#F0FDF4',
                    borderRadius: 10,
                    padding: 11,
                    marginBottom: 8,
                    borderLeftWidth: 3,
                    borderLeftColor: '#16A34A'
                  }}
                >
                  <Text style={{ fontWeight: 'bold', color: '#065F46', fontSize: 13 }}>
                    {c.name}
                  </Text>
                  <Text style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>
                    📦 Yield: {c.yield || c.expectedYield || '—'} · ⏱ Cycle: {c.maturity || c.maturityDays || '—'}
                  </Text>
                  {c.compatibility ? (
                    <Text style={{ color: '#059669', fontSize: 11, fontWeight: '600', marginTop: 3 }}>
                      ✅ {c.compatibility}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      <Pressable style={styles.backHomeBtn} onPress={() => goTo('home')}>
        <Text style={styles.backHomeBtnText}>← Back to Dashboard</Text>
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
});
