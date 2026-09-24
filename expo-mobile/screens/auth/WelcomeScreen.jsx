import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { getT } from '../../src/translations';

const { width } = Dimensions.get('window');

const APP_SERVICES = [
  {
    key: 'diagnosis',
    icon: '🔬',
    route: 'diagnosis',
    badgeEn: 'AI PLANT VISION & PATHOLOGY',
    badgeFr: 'VISION & PATHOLOGIE IA',
    titleEn: 'Plant Disease Diagnosis',
    titleFr: 'Diagnostic Maladies des Plantes',
    descEn: 'Scan sick crop leaves with AI vision. Get instant diagnosis of fungal, bacterial, and pest attacks plus certified organic & chemical treatments.',
    descFr: 'Scannez les feuilles avec la vision IA. Détection instantanée des maladies et remèdes certifiés bio & chimiques.',
    ctaEn: '📸 Inspect Leaf Now',
    ctaFr: '📸 Scanner une Feuille',
    image: require('../../assets/crops/cocoa.jpg'),
    accentColor: '#16A34A',
    badgeBg: '#DCFCE7'
  },
  {
    key: 'cropAdvice',
    icon: '🌾',
    route: 'cropAdvice',
    badgeEn: 'MAJOR CAMEROON CROPS',
    badgeFr: 'GRANDES CULTURES DU CAMEROUN',
    titleEn: 'Major Cameroon Crop Advisory',
    titleFr: 'Conseils Grandes Cultures Cameroun',
    descEn: 'Personalized crop calendars and NPK fertilization adapted to Cameroon agro-ecological zones (Centre, Littoral, West, North, East) for maximum harvest yield.',
    descFr: 'Sélection des meilleures cultures et calendriers d\'engrais adaptés aux 10 régions du Cameroun.',
    ctaEn: '🌱 Build Crop Plan',
    ctaFr: '🌱 Créer mon Plan',
    image: require('../../assets/crops/plantain.jpg'),
    accentColor: '#D97706',
    badgeBg: '#FEF3C7'
  },
  {
    key: 'aiChat',
    icon: '🤖',
    route: 'aiChat',
    badgeEn: 'AGRONOMIST CONSULTANT 24/7',
    badgeFr: 'AGRONOME IA EN DIRECT 24/7',
    titleEn: 'AI Agronomist Chat',
    titleFr: 'Agronome IA en Direct',
    descEn: '24/7 localized farming advisory in French & English. Ask about armyworm control, cassava mosaic, soil pH, cocoa black pod, and organic remedies.',
    descFr: 'Conseils agronomiques 24/7 en français et anglais. Posez vos questions sur les ravageurs, maladies et sols.',
    ctaEn: '💬 Talk with Agronomist',
    ctaFr: '💬 Échanger avec l\'Agronome',
    image: require('../../assets/crops/coffee.jpg'),
    accentColor: '#059669',
    badgeBg: '#D1FAE5'
  },
  {
    key: 'survey',
    icon: '📋',
    route: 'survey',
    badgeEn: 'DIGITAL FIELD SCOUTING',
    badgeFr: 'SUIVI NUMÉRIQUE DE PARCELLE',
    titleEn: 'Field Health Survey',
    titleFr: 'Enquête & Suivi de Parcelle',
    descEn: 'Record plot moisture, growth stages, and pest infestations directly from your field to log farm progress and monitor harvest cycles.',
    descFr: 'Enregistrez l\'humidité, le stade végétatif et les attaques parasitaires pour suivre la santé de votre parcelle.',
    ctaEn: '📋 Start Field Survey',
    ctaFr: '📋 Démarrer l\'Enquête',
    image: require('../../assets/crops/cassava.jpg'),
    accentColor: '#15803D',
    badgeBg: '#DCFCE7'
  }
];

export default function WelcomeScreen({ goTo, setLanguage, currentLanguage, userEmail }) {
  const [lang, setLang] = useState(currentLanguage || 'English');
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const isFrench = lang === 'Français';
  const t = getT(lang);

  // Auto-interchange service showcases every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveServiceIndex((prev) => (prev + 1) % APP_SERVICES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleLanguageSelect = (selected) => {
    setLang(selected);
    if (setLanguage) setLanguage(selected);
  };

  const handleToolNavigation = (targetRoute) => {
    if (!userEmail) {
      goTo('register');
    } else {
      goTo(targetRoute);
    }
  };

  const activeService = APP_SERVICES[activeServiceIndex];
  const imageSource = activeService.image;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Top Header & Branding */}
      <View style={styles.topHeader}>
        <View style={styles.brandingRow}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <View style={styles.brandingText}>
            <View style={styles.titleRow}>
              <Text style={styles.appName}>AGRO-VISSION</Text>
              <View style={styles.countryBadge}>
                <Text style={styles.countryBadgeText}>🇨🇲 CAMEROON</Text>
              </View>
            </View>
            <Text style={styles.tagline}>
              {isFrench
                ? 'Intelligence Agricole & Diagnostic IA pour le Cameroun'
                : 'Agricultural Intelligence & AI Pathology for Cameroon'}
            </Text>
          </View>
        </View>

        {/* Live Status Pill with Attractive Leaf Green Accent */}
        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>
            {isFrench ? '⚡ IA Hors-Ligne & Modèle Qwen Actif' : '⚡ Offline AI & Qwen Model Active'}
          </Text>
        </View>

        {/* Hero Stats Row */}
        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNum}>14+</Text>
            <Text style={styles.heroStatLabel}>{isFrench ? 'Cultures' : 'Crops'}</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNum}>40+</Text>
            <Text style={styles.heroStatLabel}>{isFrench ? 'Maladies' : 'Diseases'}</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNum}>10</Text>
            <Text style={styles.heroStatLabel}>{isFrench ? 'Régions' : 'Regions'}</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNum}>100%</Text>
            <Text style={styles.heroStatLabel}>{isFrench ? 'Hors-ligne' : 'Offline'}</Text>
          </View>
        </View>
      </View>

      {/* Main Single Unified Showcase Container */}
      <View style={styles.unifiedContainer}>
        {/* Section Heading */}
        <View style={styles.showcaseHeader}>
          <Text style={styles.showcaseEyebrow}>
            🇨🇲 {isFrench ? 'GRANDES CULTURES DU CAMEROUN & SERVICES' : 'MAJOR CAMEROON CROPS & FARM SERVICES'}
          </Text>
          <Text style={styles.showcaseMainTitle}>
            {isFrench ? 'Tout pour protéger et développer vos récoltes au Cameroun' : 'Protect & Boost Your Farm Yields in Cameroon'}
          </Text>
        </View>

        {/* Interactive Service Tab Selectors */}
        <View style={styles.tabsRow}>
          {APP_SERVICES.map((srv, idx) => {
            const isActive = idx === activeServiceIndex;
            return (
              <Pressable
                key={srv.key}
                style={[
                  styles.tabButton,
                  isActive && [styles.tabButtonActive, { backgroundColor: srv.accentColor, borderColor: srv.accentColor }]
                ]}
                onPress={() => setActiveServiceIndex(idx)}
              >
                <Text style={styles.tabIcon}>{srv.icon}</Text>
                <Text style={[styles.tabText, isActive && styles.tabTextActive]} numberOfLines={1}>
                  {idx === 0 ? (isFrench ? 'Diagnostic' : 'Diagnosis') :
                   idx === 1 ? (isFrench ? 'Cultures' : 'Crops') :
                   idx === 2 ? (isFrench ? 'Agronome' : 'Agronomist') :
                   (isFrench ? 'Enquête' : 'Survey')}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Dynamic Interchanging Service Card with Agriculture Image */}
        <View style={styles.serviceCardWrapper}>
          <ImageBackground
            source={imageSource}
            style={styles.serviceImageBanner}
            imageStyle={styles.bannerImg}
          >
            <View style={styles.bannerOverlay}>
              <View style={[styles.serviceTag, { backgroundColor: activeService.badgeBg }]}>
                <Text style={[styles.serviceTagText, { color: activeService.accentColor }]}>
                  {isFrench ? activeService.badgeFr : activeService.badgeEn}
                </Text>
              </View>

              <Text style={styles.serviceTitle}>
                {isFrench ? activeService.titleFr : activeService.titleEn}
              </Text>
              <Text style={styles.serviceDesc}>
                {isFrench ? activeService.descFr : activeService.descEn}
              </Text>

              <Pressable
                style={[styles.serviceActionBtn, { backgroundColor: activeService.accentColor }]}
                onPress={() => handleToolNavigation(activeService.route)}
              >
                <Text style={styles.serviceActionBtnText}>
                  {isFrench ? activeService.ctaFr : activeService.ctaEn}
                </Text>
              </Pressable>
            </View>
          </ImageBackground>

          {/* Progress Indicators */}
          <View style={styles.progressDotsRow}>
            {APP_SERVICES.map((_, dotIdx) => (
              <Pressable
                key={dotIdx}
                onPress={() => setActiveServiceIndex(dotIdx)}
                style={[
                  styles.progressDot,
                  dotIdx === activeServiceIndex && [styles.progressDotActive, { backgroundColor: activeService.accentColor }]
                ]}
              />
            ))}
          </View>
        </View>

        {/* Feature Highlights */}
        <View style={styles.featureStrip}>
          {[
            { icon: '🔬', label: isFrench ? 'Diagnostic IA' : 'AI Diagnosis' },
            { icon: '📡', label: isFrench ? '100% Hors-ligne' : '100% Offline' },
            { icon: '🌍', label: isFrench ? '2 Langues' : 'Bilingual' },
            { icon: '⚡', label: isFrench ? 'Instantané' : 'Instant' },
          ].map((f, i) => (
            <View key={i} style={styles.featureChip}>
              <Text style={styles.featureChipIcon}>{f.icon}</Text>
              <Text style={styles.featureChipLabel}>{f.label}</Text>
            </View>
          ))}
        </View>

        {/* How It Works Quick Explainer */}
        <View style={styles.explainerCard}>
          <Text style={styles.explainerEyebrow}>
            💡 {isFrench ? 'COMMENT ÇA MARCHE (3 ÉTAPES SIMPLES)' : 'HOW IT WORKS (3 SIMPLE STEPS)'}
          </Text>
          <View style={styles.stepItem}>
            <View style={styles.stepNumCircle}>
              <Text style={styles.stepNumText}>1</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepHeading}>
                {isFrench ? 'Créez votre compte agricole' : 'Create your farmer account'}
              </Text>
              <Text style={styles.stepBody}>
                {isFrench
                  ? 'Renseignez votre région et culture pour des prédictions sur-mesure.'
                  : 'Register your region and crop to personalize AI guidance.'}
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumCircle}>
              <Text style={styles.stepNumText}>2</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepHeading}>
                {isFrench ? 'Diagnostiquez & Obtenez des conseils' : 'Diagnose & Get tailored advice'}
              </Text>
              <Text style={styles.stepBody}>
                {isFrench
                  ? 'Prenez une photo d\'une feuille ou demandez un plan de fertilisation.'
                  : 'Snap leaf photos or request optimal crop and fertilizer schedules.'}
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumCircle}>
              <Text style={styles.stepNumText}>3</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepHeading}>
                {isFrench ? 'Appliquez les solutions et suivez la récolte' : 'Apply remedies & track harvest'}
              </Text>
              <Text style={styles.stepBody}>
                {isFrench
                  ? 'Traitements bio et chimiques certifiés pour booster vos rendements.'
                  : 'Follow certified organic and chemical steps to protect yield.'}
              </Text>
            </View>
          </View>
        </View>

        {/* Account Creation & Login Gateway */}
        <View style={styles.authGatewayCard}>
          <View style={styles.authNoticeRow}>
            <Text style={styles.authNoticeIcon}>🌱</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.authNoticeTitle}>
                {isFrench ? 'Nouveau sur Agro-Vission ?' : 'First Time on Agro-Vission?'}
              </Text>
              <Text style={styles.authNoticeSub}>
                {isFrench
                  ? 'Créez d\'abord votre compte agriculteur. La prochaine fois, connectez-vous directement !'
                  : 'Create your farmer account first. Once registered, you can log in directly next time!'}
              </Text>
            </View>
          </View>

          {/* 1. Primary: Create Account First */}
          <Pressable style={styles.registerButton} onPress={() => goTo('register')}>
            <Text style={styles.registerButtonText}>
              🚀 {isFrench ? 'Créer un Compte Agriculteur' : 'Create Farmer Account First'}
            </Text>
          </Pressable>

          {/* 2. Secondary: Already Registered? Login */}
          <Pressable style={styles.loginButton} onPress={() => goTo('login')}>
            <Text style={styles.loginButtonText}>
              🔑 {isFrench ? 'Déjà inscrit ? Se Connecter' : 'Already Have an Account? Log In'}
            </Text>
          </Pressable>
        </View>

        {/* 4 Quick Access Service Shortcuts (Direct access after account creation) */}
        <View style={styles.quickAccessSection}>
          <Text style={styles.quickAccessTitle}>
            ⚡ {isFrench ? 'ACCÈS DIRECT AUX OUTILS' : 'DIRECT ACCESS TO TOOLS'}
          </Text>
          <View style={styles.quickAccessGrid}>
            <Pressable style={styles.quickItem} onPress={() => handleToolNavigation('diagnosis')}>
              <Text style={styles.quickItemIcon}>🔬</Text>
              <Text style={styles.quickItemText}>{isFrench ? 'Diagnostic' : 'Diagnosis'}</Text>
            </Pressable>
            <Pressable style={styles.quickItem} onPress={() => handleToolNavigation('cropAdvice')}>
              <Text style={styles.quickItemIcon}>🌾</Text>
              <Text style={styles.quickItemText}>{isFrench ? 'Cultures' : 'Crop Plan'}</Text>
            </Pressable>
            <Pressable style={styles.quickItem} onPress={() => handleToolNavigation('aiChat')}>
              <Text style={styles.quickItemIcon}>🤖</Text>
              <Text style={styles.quickItemText}>{isFrench ? 'Agronome IA' : 'AI Chat'}</Text>
            </Pressable>
            <Pressable style={styles.quickItem} onPress={() => handleToolNavigation('survey')}>
              <Text style={styles.quickItemIcon}>📋</Text>
              <Text style={styles.quickItemText}>{isFrench ? 'Enquête' : 'Survey'}</Text>
            </Pressable>
          </View>
        </View>

        {/* Language Selection Bar */}
        <View style={styles.languageSection}>
          <Text style={styles.languageLabel}>
            🌐 {t.selectLanguage || (isFrench ? 'Choisir la langue' : 'Select Language')}
          </Text>
          <View style={styles.languageButtonsRow}>
            <Pressable
              style={[styles.langBtn, lang === 'English' && styles.langBtnActive]}
              onPress={() => handleLanguageSelect('English')}
            >
              <Text style={styles.langEmoji}>🇬🇧</Text>
              <Text style={[styles.langText, lang === 'English' && styles.langTextActive]}>English</Text>
            </Pressable>

            <Pressable
              style={[styles.langBtn, lang === 'Français' && styles.langBtnActive]}
              onPress={() => handleLanguageSelect('Français')}
            >
              <Text style={styles.langEmoji}>🇫🇷</Text>
              <Text style={[styles.langText, lang === 'Français' && styles.langTextActive]}>Français</Text>
            </Pressable>
          </View>
        </View>

        {/* Quick Portal Entry (Direct to Dashboard for existing logged-in farmers) */}
        <Pressable style={styles.dashboardLink} onPress={() => handleToolNavigation('home')}>
          <Text style={styles.dashboardLinkText}>
            🌿 {isFrench ? 'Ouvrir le Tableau de Bord Agriculteur →' : 'Enter Farmer Dashboard →'}
          </Text>
        </Pressable>
      </View>

      {/* Footer Info */}
      <View style={styles.footerInfo}>
        <Text style={styles.footerText}>Agro-Vission Cameroon © 2026 • Dedicated to African Smallholder Farmers</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 45,
    paddingBottom: 35,
  },
  topHeader: {
    marginBottom: 16,
  },
  brandingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  logoImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#DCFCE7',
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  brandingText: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 1.2,
  },
  countryBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  countryBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
  },
  tagline: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
    lineHeight: 16,
    marginTop: 2,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
    gap: 8,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#16A34A',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#15803D',
  },
  // Single Unified Container
  unifiedContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
    marginBottom: 16,
  },
  showcaseHeader: {
    marginBottom: 14,
  },
  showcaseEyebrow: {
    fontSize: 11,
    fontWeight: '900',
    color: '#16A34A',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  showcaseMainTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  // Tabs
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginBottom: 14,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 3,
  },
  tabButtonActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  tabIcon: {
    fontSize: 13,
  },
  tabText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#475569',
    flexShrink: 0,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  // Service Card Banner
  serviceCardWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#DCFCE7',
  },
  serviceImageBanner: {
    minHeight: 260,
    justifyContent: 'flex-end',
  },
  bannerImg: {
    borderRadius: 18,
  },
  bannerOverlay: {
    padding: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.76)',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  serviceTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 8,
  },
  serviceTagText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  serviceDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: '#E2E8F0',
    marginBottom: 14,
  },
  serviceActionBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceActionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  progressDotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#F8FAFC',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
  },
  progressDotActive: {
    width: 24,
  },
  // How It Works Explainer Card
  explainerCard: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  explainerEyebrow: {
    fontSize: 11,
    fontWeight: '900',
    color: '#16A34A',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10,
  },
  stepNumCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  stepHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  stepBody: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  // Auth Gateway Card
  authGatewayCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  authNoticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  authNoticeIcon: {
    fontSize: 24,
  },
  authNoticeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#15803D',
  },
  authNoticeSub: {
    fontSize: 11,
    color: '#166534',
    lineHeight: 15,
    marginTop: 1,
  },
  registerButton: {
    backgroundColor: '#16A34A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#16A34A',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#15803D',
    fontSize: 13,
    fontWeight: '800',
  },
  // Quick Access Section
  quickAccessSection: {
    marginBottom: 16,
    paddingTop: 4,
  },
  quickAccessTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#475569',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  quickItem: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickItemIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  quickItemText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'center',
  },
  // Language Selection
  languageSection: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 14,
  },
  languageLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  languageButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  langBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    gap: 6,
  },
  langBtnActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#16A34A',
  },
  langEmoji: {
    fontSize: 15,
  },
  langText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  langTextActive: {
    color: '#15803D',
  },
  dashboardLink: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  dashboardLinkText: {
    color: '#15803D',
    fontSize: 13,
    fontWeight: '800',
  },
  footerInfo: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  footerText: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'center',
  },
  // Hero Stats Banner
  heroStats: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  heroStat: {
    alignItems: 'center',
    flex: 1,
  },
  heroStatNum: {
    fontSize: 22,
    fontWeight: '900',
    color: '#4ADE80',
    letterSpacing: -0.5,
  },
  heroStatLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  heroStatDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  // Feature Highlights Strip
  featureStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    gap: 4,
  },
  featureChipIcon: {
    fontSize: 13,
  },
  featureChipLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
});
