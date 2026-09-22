import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Image, ImageBackground, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CROP_SPOTLIGHTS = [
  {
    crop: 'Cassava (Manioc)',
    cropFr: 'Manioc (Cassava)',
    zone: 'Centre & South (Bafia, Obala, Sangmélima)',
    zoneFr: 'Centre & Sud (Bafia, Obala, Sangmélima)',
    tip: 'Plant CMD-resistant cuttings (TME 419) on 40-50cm ridges to maximize tuber yield.',
    tipFr: 'Plantez des boutures résistantes à la CMD (TME 419) sur billons de 40-50 cm pour maximiser le rendement.',
    image: 'https://images.unsplash.com/photo-1592982537447-6f23349c814b?auto=format&fit=crop&w=1200&q=80',
    color: '#D97706'
  },
  {
    crop: 'Maize (Maïs)',
    cropFr: 'Maïs (Corn)',
    zone: 'Adamawa, West & North (Foumbot, Ngaoundéré)',
    zoneFr: 'Adamaoua, Ouest & Nord (Foumbot, Ngaoundéré)',
    tip: 'Top-dress with Urea at 4-5 weeks before hilling. Scout whorls for Fall Armyworm.',
    tipFr: 'Apportez l\'Urée à 4-5 semaines avant le buttage. Surveillez les cornets contre la chenille légionnaire.',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1200&q=80',
    color: '#0284C7'
  },
  {
    crop: 'Tomato (Tomate)',
    cropFr: 'Tomate de Foumbot',
    zone: 'West & Highlands (Noun Valley, Foumbot)',
    zoneFr: 'Ouest & Hauts-Plateaux (Vallée du Noun, Foumbot)',
    tip: 'Stake firmly with bamboo. Prune suckers 30cm from soil and apply Calcium Nitrate at flowering.',
    tipFr: 'Tuteurez solidement au bambou. Égourmandez à 30 cm du sol et appliquez du Nitrate de Calcium à la floraison.',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1200&q=80',
    color: '#EF4444'
  },
  {
    crop: 'Plantain (Banane Plantain)',
    cropFr: 'Banane Plantain du Moungo',
    zone: 'Littoral & South-West (Moungo Basin, Penja)',
    zoneFr: 'Littoral & Sud-Ouest (Bassin du Moungo, Penja)',
    tip: 'Surgically de-leaf Black Sigatoka streaks; apply high-potassium NPK every 3 months.',
    tipFr: 'Effeuillez préventivement les stries de cercosporiose noire ; apportez un NPK riche en potassium tous les 3 mois.',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80',
    color: '#059669'
  }
];

export default function HomeScreen({ goTo, userEmail, setUserEmail, language = 'English' }) {
  const isFr = language === 'Français' || language === 'Francais';
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const spotlight = CROP_SPOTLIGHTS[spotlightIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setSpotlightIndex((current) => (current + 1) % CROP_SPOTLIGHTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSignOut = () => {
    if (setUserEmail) setUserEmail(null);
    goTo('welcome');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <View style={styles.headerTextWrap}>
            <View style={styles.headerTitleRow}>
              <Text style={styles.title}>Agro-Vission</Text>
              <View style={styles.portalTag}>
                <Text style={styles.portalTagText}>{isFr ? 'AGRICULTEUR' : 'FARMER'}</Text>
              </View>
            </View>
            <Text style={styles.subtitle} numberOfLines={1}>
              {userEmail ? `👤 ${userEmail}` : (isFr ? '🌾 Tableau Agricole Cameroun' : '🌾 Cameroon Agricultural Dashboard')}
            </Text>
          </View>
        </View>

        <Pressable style={styles.welcomeBtn} onPress={handleSignOut}>
          <Text style={styles.welcomeBtnText}>🚪 {isFr ? 'Déconnexion' : 'Sign Out'}</Text>
        </Pressable>
      </View>

      {/* Farm Status Metrics Bar */}
      <View style={styles.metricsBar}>
        <View style={styles.metricItem}>
          <Text style={styles.metricIcon}>📍</Text>
          <View>
            <Text style={styles.metricLabel}>{isFr ? 'RÉGION' : 'REGION'}</Text>
            <Text style={styles.metricValue}>10 Zones CMR</Text>
          </View>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricIcon}>🧠</Text>
          <View>
            <Text style={styles.metricLabel}>{isFr ? 'MODÈLE IA' : 'AI MODEL'}</Text>
            <Text style={styles.metricValue}>Qwen 3B & Vision</Text>
          </View>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricIcon}>⚡</Text>
          <View>
            <Text style={styles.metricLabel}>MODE</Text>
            <Text style={styles.metricValue}>{isFr ? 'Hors-Ligne' : 'Offline Ready'}</Text>
          </View>
        </View>
      </View>

      {/* Hero Action: AI Diagnosis Banner with User Verified Agriculture Image */}
      <ImageBackground
        source={require('../../assets/plant-diagnosis-tablet.jpg')}
        style={styles.heroCard}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroShade}>
          <View style={styles.badgeRow}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>🔬 {isFr ? 'PATHOLOGIE VÉGÉTALE IA' : 'AI PLANT PATHOLOGY'}</Text>
            </View>
            <View style={styles.offlineTag}>
              <Text style={styles.offlineTagText}>⚡ {isFr ? 'SCAN IMMÉDIAT' : 'INSTANT SCAN'}</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>
            {isFr ? 'Identifier les Maladies sur les Feuilles' : 'Identify Plant Diseases from Leaf Photos'}
          </Text>
          <Text style={styles.heroSub}>
            {isFr
              ? 'Prenez une photo nette de la feuille malade. L\'IA détecte les attaques et fournit des protocoles de traitement biologiques et chimiques.'
              : 'Take a clear photo of any sick leaf. Our vision AI detects pests, blights, and mosaics, then provides certified organic and chemical treatment plans.'}
          </Text>

          <Pressable style={styles.primaryButton} onPress={() => goTo('diagnosis')}>
            <Text style={styles.primaryButtonText}>
              📸 {isFr ? 'Diagnostiquer une Plante' : 'Inspect & Diagnose a Crop'}
            </Text>
          </Pressable>
        </View>
      </ImageBackground>

      {/* Cameroon Crop Spotlight Banner */}
      <ImageBackground
        source={{ uri: spotlight.image }}
        style={styles.recommendationBanner}
        imageStyle={styles.recommendationImage}
      >
        <View style={styles.recommendationShade}>
          <View style={styles.spotlightHeader}>
            <Text style={styles.spotlightEyebrow}>
              {isFr ? 'ZOOM RÉGIONAL' : 'REGIONAL SPOTLIGHT'} • {isFr ? spotlight.zoneFr : spotlight.zone}
            </Text>
            {/* Dots */}
            <View style={styles.spotlightDots}>
              {CROP_SPOTLIGHTS.map((_, i) => (
                <View
                  key={i}
                  style={[styles.spotDot, i === spotlightIndex && styles.spotDotActive]}
                />
              ))}
            </View>
          </View>

          <Text style={styles.spotlightTitle}>{isFr ? spotlight.cropFr : spotlight.crop}</Text>
          <Text style={styles.spotlightText}>{isFr ? spotlight.tipFr : spotlight.tip}</Text>

          <Pressable style={styles.lightButton} onPress={() => goTo('cropAdvice')}>
            <Text style={styles.lightButtonText}>
              {isFr ? '🌾 Créer une Recommandation Adaptée →' : '🌾 Build Tailored Recommendation →'}
            </Text>
          </Pressable>
        </View>
      </ImageBackground>

      {/* Services Grid Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {isFr ? 'Outils & Services Agricoles' : 'Agricultural Tools & Services'}
        </Text>
        <Text style={styles.sectionSub}>
          {isFr
            ? 'Sélectionnez un outil pour vos travaux quotidiens aux champs'
            : 'Select a tool to assist your daily field operations'}
        </Text>
      </View>

      {/* 2x2 Feature Grid */}
      <View style={styles.grid}>
        {/* Feature 1: Crop Advice */}
        <Pressable style={styles.gridCard} onPress={() => goTo('cropAdvice')}>
          <View style={[styles.cardIconBox, { backgroundColor: '#FEF3C7' }]}>
            <Text style={styles.cardIcon}>🌾</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.gridTitle}>
              {isFr ? 'Conseils de Culture' : 'Crop Advice'}
            </Text>
            <Text style={styles.gridText}>
              {isFr
                ? 'Calendriers agro-écologiques et fertilisation pour les 10 régions du Cameroun'
                : 'Agro-ecological planting & fertilizer schedules for Cameroon'}
            </Text>
          </View>
          <Text style={[styles.cardArrow, { color: '#D97706' }]}>
            {isFr ? 'Ouvrir →' : 'Open →'}
          </Text>
        </Pressable>

        {/* Feature 2: AI Agronomist Chat */}
        <Pressable style={styles.gridCard} onPress={() => goTo('aiChat')}>
          <View style={[styles.cardIconBox, { backgroundColor: '#EEF2FF' }]}>
            <Text style={styles.cardIcon}>🤖</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.gridTitle}>
              {isFr ? 'Agronome IA' : 'AI Agronomist'}
            </Text>
            <Text style={styles.gridText}>
              {isFr
                ? 'Posez vos questions à l\'expert Qwen IA en français ou en anglais'
                : 'Ask questions to your local Qwen AI agronomist in English or French'}
            </Text>
          </View>
          <Text style={[styles.cardArrow, { color: '#4F46E5' }]}>
            {isFr ? 'Discuter →' : 'Chat →'}
          </Text>
        </Pressable>

        {/* Feature 3: Field Survey */}
        <Pressable style={styles.gridCard} onPress={() => goTo('survey')}>
          <View style={[styles.cardIconBox, { backgroundColor: '#ECFDF5' }]}>
            <Text style={styles.cardIcon}>📋</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.gridTitle}>
              {isFr ? 'Enquête Parcelle' : 'Field Survey'}
            </Text>
            <Text style={styles.gridText}>
              {isFr
                ? 'Suivez l\'humidité du sol, les stades végétatifs et les attaques de ravageurs'
                : 'Log field moisture, crop growth stages, and pest infestations'}
            </Text>
          </View>
          <Text style={[styles.cardArrow, { color: '#059669' }]}>
            {isFr ? 'Noter →' : 'Log →'}
          </Text>
        </Pressable>

        {/* Feature 4: Notifications */}
        <Pressable style={styles.gridCard} onPress={() => goTo('notifications')}>
          <View style={[styles.cardIconBox, { backgroundColor: '#E0F2FE' }]}>
            <Text style={styles.cardIcon}>🔔</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.gridTitle}>{isFr ? 'Alertes & Historique' : 'Alerts & History'}</Text>
            <Text style={styles.gridText}>
              {isFr ? 'Rapports de diagnostic passés et alertes régionales' : 'View past diagnosis reports and regional farm alerts'}
            </Text>
          </View>
          <Text style={[styles.cardArrow, { color: '#0284C7' }]}>
            {isFr ? 'Voir →' : 'View →'}
          </Text>
        </Pressable>
        <Pressable style={styles.gridCard} onPress={() => goTo('history')}>
          <Text style={styles.cardIcon}>📜</Text>
          <Text style={styles.gridTitle}>{isFr ? 'Mon Historique' : 'My History'}</Text>
          <Text style={styles.gridText}>
            {isFr ? 'Consultez vos questions, réponses et anciens diagnostics.' : 'Review your questions, answers, and previous diagnoses.'}
          </Text>
        </Pressable>
      </View>

      {/* Admin Quick Action (Only visible to verified Administrator, NEVER ordinary farmers) */}
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
    backgroundColor: '#F8FAFC', // Crisp modern neutral (not all-green)
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 45,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  logo: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  portalTag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  portalTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1D4ED8',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  welcomeBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  welcomeBtnText: {
    color: '#334155',
    fontWeight: '700',
    fontSize: 12,
  },
  // Metrics Bar
  metricsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricIcon: {
    fontSize: 18,
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  metricValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E293B',
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#F1F5F9',
  },
  // Hero Card
  heroCard: {
    minHeight: 250,
    borderRadius: 20,
    marginBottom: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  heroImage: {
    borderRadius: 20,
  },
  heroShade: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.74)',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  heroBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
  },
  offlineTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  offlineTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706',
  },
  heroTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  heroSub: {
    fontSize: 12,
    color: '#E2E8F0',
    lineHeight: 17,
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: '#16A34A', // Attractive agricultural vibrant green button
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  // Recommendation Spotlight
  recommendationBanner: {
    minHeight: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  recommendationImage: {
    borderRadius: 20,
  },
  recommendationShade: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.70)',
  },
  spotlightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  spotlightEyebrow: {
    color: '#FDE68A',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  spotlightDots: {
    flexDirection: 'row',
    gap: 4,
  },
  spotDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  spotDotActive: {
    width: 14,
    backgroundColor: '#F59E0B',
  },
  spotlightTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 4,
  },
  spotlightText: {
    color: '#F1F5F9',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
  },
  lightButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },
  lightButtonText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '900',
  },
  // Grid
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  sectionSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'space-between',
    minHeight: 155,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 20,
  },
  cardContent: {
    flex: 1,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 3,
  },
  gridText: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  cardArrow: {
    fontSize: 11,
    fontWeight: '800',
    marginTop: 6,
  },
  // Admin Card
  adminCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    shadowColor: '#0F172A',
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
    color: '#38BDF8',
    marginBottom: 2,
  },
  adminText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  adminArrow: {
    fontSize: 18,
    color: '#38BDF8',
    fontWeight: 'bold',
  },
});
