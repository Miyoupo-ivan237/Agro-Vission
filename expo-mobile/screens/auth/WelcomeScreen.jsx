import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  Platform
} from 'react-native';
import { getT } from '../../src/translations';

const { width } = Dimensions.get('window');

// 4 core app services from the user's application
const APP_SERVICES = [
  {
    key: 'diagnosis',
    icon: '🔬',
    route: 'diagnosis',
    nameEn: 'Plant Disease Diagnosis',
    nameFr: 'Diagnostic Maladies des Plantes',
    taglineEn: 'AI Leaf Scanner & Certified Remedies',
    taglineFr: 'Scanner de Feuilles & Remèdes Certifiés',
    image: require('../../assets/crops/cocoa.jpg'),
    badge: 'AI VISION',
    color: '#16A34A',
  },
  {
    key: 'cropAdvice',
    icon: '🌾',
    route: 'cropAdvice',
    nameEn: 'Cameroon Crop Advisory',
    nameFr: 'Conseils Grandes Cultures',
    taglineEn: 'NPK Schedules & Agro-Zones',
    taglineFr: 'Calendriers NPK & Éco-Zones',
    image: require('../../assets/crops/plantain.jpg'),
    badge: 'AGRO-ZONES',
    color: '#D97706',
  },
  {
    key: 'aiChat',
    icon: '🤖',
    route: 'aiChat',
    nameEn: 'AI Agronomist Consultant',
    nameFr: 'Agronome IA en Direct',
    taglineEn: '24/7 Offline Agronomic Advisory',
    taglineFr: 'Conseils Agronomiques 24/7 Hors-Ligne',
    image: require('../../assets/crops/coffee.jpg'),
    badge: 'OFFLINE CHAT',
    color: '#059669',
  },
  {
    key: 'survey',
    icon: '📋',
    route: 'survey',
    nameEn: 'Field Health Survey',
    nameFr: 'Enquête & Suivi de Parcelle',
    taglineEn: 'Digital Plot Scouting & Soil Log',
    taglineFr: 'Suivi Numérique & Humidité du Sol',
    image: require('../../assets/crops/cassava.jpg'),
    badge: 'SCOUTING',
    color: '#15803D',
  },
];

export default function WelcomeScreen({ goTo, setLanguage, currentLanguage, userEmail }) {
  const [lang, setLang] = useState(currentLanguage || 'English');
  const [activeSlide, setActiveSlide] = useState(0);
  const isFrench = lang === 'Français' || lang === 'Francais';
  const t = getT(lang);

  // Auto-rotate the floating service showcase (Image 1 style)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % APP_SERVICES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleLanguageToggle = () => {
    const nextLang = isFrench ? 'English' : 'Français';
    setLang(nextLang);
    if (setLanguage) setLanguage(nextLang);
  };

  const handleToolNavigation = (targetRoute) => {
    if (!userEmail) {
      goTo('register');
    } else {
      goTo(targetRoute);
    }
  };

  const currentService = APP_SERVICES[activeSlide];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {/* ────────────────────────────────────────────────────────────────
          IMAGE 1 DESIGN: HERO & TOP NAVIGATION WITH WHEAT AMBIANCE
      ──────────────────────────────────────────────────────────────── */}
      <View style={styles.heroWrapper}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
          }}
          style={styles.heroBackground}
          imageStyle={styles.heroBgImage}
        >
          {/* Subtle natural dark-green gradient overlay */}
          <View style={styles.heroOverlay}>
            {/* Top Navigation Bar (Logo, Nav Links, Contact Us / Sign In) */}
            <View style={styles.navBar}>
              <View style={styles.navBrand}>
                <View style={styles.logoBadge}>
                  <Text style={styles.logoBadgeIcon}>🌾</Text>
                </View>
                <Text style={styles.brandTitle}>Agro</Text>
              </View>

              {/* Quick links & Language switch */}
              <View style={styles.navRight}>
                <Pressable
                  style={styles.langPill}
                  onPress={handleLanguageToggle}
                >
                  <Text style={styles.langPillText}>
                    {isFrench ? '🇫🇷 FR' : '🇬🇧 EN'}
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.contactBtn}
                  onPress={() => (userEmail ? goTo('home') : goTo('login'))}
                >
                  <Text style={styles.contactBtnText}>
                    {userEmail
                      ? (isFrench ? 'Tableau ↗' : 'Dashboard ↗')
                      : (isFrench ? 'Connexion ↗' : 'Sign In ↗')}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Hero Main Content */}
            <View style={styles.heroBody}>
              {/* Pill badge: • Provide Future-Proof Solutions */}
              <View style={styles.heroPillBadge}>
                <View style={styles.heroPillDot} />
                <Text style={styles.heroPillBadgeText}>
                  {isFrench
                    ? 'Solutions Agricoles d’Avenir • Cameroun'
                    : 'Provide Future-Proof Solutions'}
                </Text>
              </View>

              {/* Headline: Agricultural (bold modern) Solutions. (italic serif style) */}
              <Text style={styles.heroTitleMain}>Agricultural</Text>
              <Text style={styles.heroTitleSerif}>Solutions.</Text>

              {/* Subtitle */}
              <Text style={styles.heroSubtitle}>
                {isFrench
                  ? 'L’agriculture commence par des informations plus intelligentes. Optimisez l’efficacité, la résilience et la durabilité de vos parcelles grâce à l’intelligence artificielle.'
                  : 'Farming starts with smarter insights. Unlock efficiency, resilience, and long-term sustainability climate-aware solutions.'}
              </Text>

              {/* Action Buttons Row */}
              <View style={styles.heroCtaRow}>
                {/* Primary Button: Lime / Cream Pill Button */}
                <Pressable
                  style={styles.primaryPillBtn}
                  onPress={() => (userEmail ? goTo('home') : goTo('register'))}
                >
                  <Text style={styles.primaryPillBtnText}>
                    {userEmail
                      ? (isFrench ? 'Ouvrir Mon Tableau ↗' : 'Go to Dashboard ↗')
                      : (isFrench ? 'Créer un Compte ↗' : 'Start Investing ↗')}
                  </Text>
                </Pressable>

                {/* Secondary Button: Dark Translucent Glass Pill */}
                <Pressable
                  style={styles.secondaryPillBtn}
                  onPress={() => handleToolNavigation('diagnosis')}
                >
                  <Text style={styles.secondaryPillBtnText}>
                    {isFrench ? 'Diagnostiquer ↗' : 'Meet the Farmers ↗'}
                  </Text>
                </Pressable>
              </View>

              {/* Floating Frosted Glass Card (Harvester / Service Preview) */}
              <View style={styles.floatingPreviewCard}>
                <ImageBackground
                  source={currentService.image}
                  style={styles.floatingCardBg}
                  imageStyle={{ borderRadius: 16 }}
                >
                  <View style={styles.floatingCardOverlay}>
                    <View style={styles.floatingCardHeader}>
                      <Text style={styles.floatingCardTitle}>
                        {isFrench ? currentService.nameFr : currentService.nameEn} ↗
                      </Text>
                    </View>

                    {/* Pagination Indicators (Image 1 style) */}
                    <View style={styles.carouselIndicators}>
                      {APP_SERVICES.map((_, idx) => (
                        <Pressable
                          key={idx}
                          onPress={() => setActiveSlide(idx)}
                          style={[
                            styles.indicatorBar,
                            idx === activeSlide && styles.indicatorBarActive,
                          ]}
                        />
                      ))}
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* ────────────────────────────────────────────────────────────────
          IMAGE 1 LOWER SECTION: TRUSTED PARTNERS & ABOUT US EMBEDDED CROPS
      ──────────────────────────────────────────────────────────────── */}
      <View style={styles.trustedSection}>
        <Text style={styles.trustedTitle}>
          {isFrench
            ? 'Reconnu par les producteurs & leaders agricoles du Cameroun'
            : 'Trusted by growers & supply-chain leaders'}
        </Text>

        {/* Minimalist Logo Partner Row */}
        <View style={styles.partnersRow}>
          <View style={styles.partnerBadge}>
            <Text style={styles.partnerText}>⬡ logoipsum</Text>
          </View>
          <View style={styles.partnerBadge}>
            <Text style={styles.partnerText}>◈ logoipsum</Text>
          </View>
          <View style={styles.partnerBadge}>
            <Text style={styles.partnerText}>❖ logoipsum</Text>
          </View>
          <View style={styles.partnerBadge}>
            <Text style={styles.partnerText}>◇ logoipsum</Text>
          </View>
        </View>

        {/* • About Us Pill */}
        <View style={styles.aboutUsPillRow}>
          <View style={styles.aboutPill}>
            <View style={styles.aboutPillDot} />
            <Text style={styles.aboutPillText}>
              {isFrench ? 'À Propos' : 'About Us'}
            </Text>
          </View>
        </View>

        {/* Statement with Embedded Crop Pills (Exact match to Image 1) */}
        <View style={styles.missionCard}>
          <Text style={styles.missionText}>
            {isFrench ? 'Les défis que rencontrent ' : 'The challenges farmers '}
            {/* Embedded Crop Pill 1 */}
            <View style={styles.inlineCropPill}>
              <Image
                source={require('../../assets/crops/plantain.jpg')}
                style={styles.inlineCropImg}
              />
            </View>
            {isFrench
              ? ' les agriculteurs et communautés rurales peuvent être surmontés grâce à '
              : ' and rural communities face can be overcome through smart '}
            {/* Embedded Crop Pill 2 */}
            <View style={styles.inlineCropPill}>
              <Image
                source={require('../../assets/crops/cocoa.jpg')}
                style={styles.inlineCropImg}
              />
            </View>
            {isFrench
              ? ' l’innovation agricole durable.'
              : ' agricultural innovation.'}
          </Text>

          {/* 4 Feature Pill Tags */}
          <View style={styles.featurePillsWrap}>
            <View style={styles.tagPill}>
              <Text style={styles.tagPillText}>
                {isFrench ? 'Agriculture Intelligente' : 'Smart Farming'}
              </Text>
            </View>
            <View style={styles.tagPill}>
              <Text style={styles.tagPillText}>
                {isFrench ? 'Croissance Durable' : 'Sustainable Growth'}
              </Text>
            </View>
            <View style={styles.tagPill}>
              <Text style={styles.tagPillText}>
                {isFrench ? 'Innovation Agri' : 'Agri Innovation'}
              </Text>
            </View>
            <View style={styles.tagPill}>
              <Text style={styles.tagPillText}>
                {isFrench ? 'Récolte d’Avenir' : 'Future Harvest'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* ────────────────────────────────────────────────────────────────
          IMAGE 2 DESIGN: ORGANIC & SUSTAINABLE FARMING SHOWCASE
      ──────────────────────────────────────────────────────────────── */}
      <View style={styles.organicSection}>
        {/* Organic Hero Banner with Rich Green Atmosphere */}
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
          }}
          style={styles.organicHeroBanner}
          imageStyle={{ borderRadius: 24 }}
        >
          <View style={styles.organicHeroOverlay}>
            <View style={styles.leafIconBadge}>
              <Text style={styles.leafIcon}>🍃</Text>
            </View>
            <Text style={styles.organicHeroTitle}>
              {isFrench
                ? 'Intéressé par l’agriculture biologique ?'
                : 'Interested in going organic?'}
            </Text>
            <Text style={styles.organicHeroSub}>
              {isFrench
                ? 'Rejoignez nos sessions hebdomadaires pour apprendre la transition vers le bio, la conformité et les fertilisants naturels au Cameroun.'
                : 'Join our free weekly Organic Office Hours to learn everything about transitioning to organic staying in compliance & more. All questions & experience levels welcome!'}
            </Text>

            <Pressable
              style={styles.learnMoreBtn}
              onPress={() => handleToolNavigation('cropAdvice')}
            >
              <Text style={styles.learnMoreBtnText}>
                {isFrench ? 'En savoir plus →' : 'Learn More →'}
              </Text>
            </Pressable>
          </View>
        </ImageBackground>

        {/* Overlaid White Rounded Card: "Why Organic?" (Image 2 style) */}
        <View style={styles.whyOrganicCard}>
          <View style={styles.whyOrganicHeader}>
            <Text style={styles.whyOrganicIcon}>🌱</Text>
            <Text style={styles.whyOrganicTitle}>
              {isFrench ? 'Pourquoi le Bio ?' : 'Why Organic?'}
            </Text>
          </View>

          <Text style={styles.whyOrganicDesc}>
            {isFrench
              ? 'L’agriculture biologique crée des emplois, séquestre le carbone, protège les cours d’eau et réduit l’exposition aux pesticides toxiques. Découvrez ses bénéfices économiques, sociaux et environnementaux.'
              : 'Organic creates jobs, sequesters carbon, keeps water clean, and reduces our exposure to toxic pesticides. Learn about the economic, social, and environmental benefits of organic.'}
          </Text>

          {/* Action Links */}
          <View style={styles.whyOrganicBtnsRow}>
            <Pressable
              style={styles.organicPillActionBtn}
              onPress={() => handleToolNavigation('cropAdvice')}
            >
              <Text style={styles.organicPillActionBtnText}>
                {isFrench ? 'La Science du Bio →' : 'The Science Behind Organic →'}
              </Text>
            </Pressable>

            <Pressable
              style={styles.organicSecondaryLink}
              onPress={() => handleToolNavigation('survey')}
            >
              <Text style={styles.organicSecondaryLinkText}>
                {isFrench ? 'Qu’est-ce que le Bio ? →' : 'What is Organic →'}
              </Text>
            </Pressable>
          </View>

          {/* 3 Pillar Cards (Healthy Soil, Clean Water, Communities) */}
          <View style={styles.organicPillarsGrid}>
            <View style={styles.pillarCard}>
              <View style={[styles.pillarIconBox, { backgroundColor: '#DCFCE7' }]}>
                <Text style={styles.pillarIcon}>🌱</Text>
              </View>
              <Text style={styles.pillarTitle}>
                {isFrench ? 'Sol Sain' : 'Healthy Soil'}
              </Text>
              <Text style={styles.pillarSub}>
                {isFrench
                  ? 'Crée un sol fertile pour les générations futures.'
                  : 'Builds fertile soil for future generations.'}
              </Text>
            </View>

            <View style={styles.pillarCard}>
              <View style={[styles.pillarIconBox, { backgroundColor: '#E0F2FE' }]}>
                <Text style={styles.pillarIcon}>💧</Text>
              </View>
              <Text style={styles.pillarTitle}>
                {isFrench ? 'Eau Propre' : 'Clean Water'}
              </Text>
              <Text style={styles.pillarSub}>
                {isFrench
                  ? 'Protège les rivières, lacs et nappes phréatiques.'
                  : 'Protects our rivers, lakes & drinking water.'}
              </Text>
            </View>

            <View style={styles.pillarCard}>
              <View style={[styles.pillarIconBox, { backgroundColor: '#FEF3C7' }]}>
                <Text style={styles.pillarIcon}>👥</Text>
              </View>
              <Text style={styles.pillarTitle}>
                {isFrench ? 'Communautés' : 'Communities'}
              </Text>
              <Text style={styles.pillarSub}>
                {isFrench
                  ? 'Soutient les agriculteurs et l’économie locale.'
                  : 'Supports farmers and local economies.'}
              </Text>
            </View>
          </View>

          {/* Farmer Hands with Soil Photo Strip (Image 2 right preview) */}
          <View style={styles.soilPhotoWrapper}>
            <Image
              source={require('../../assets/crops/cassava.jpg')}
              style={styles.soilPhoto}
            />
            <View style={styles.soilPhotoCaption}>
              <Text style={styles.soilPhotoCaptionTitle}>
                {isFrench ? 'Terre Vivante & Fertile' : 'Rich Living Soil'}
              </Text>
              <Text style={styles.soilPhotoCaptionSub}>
                {isFrench
                  ? 'Pratiques agro-écologiques adaptées aux 10 régions du Cameroun.'
                  : 'Agro-ecological practices adapted to Cameroon farmland.'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* ────────────────────────────────────────────────────────────────
          DIRECT APPLICATION SHORTCUTS & ACCOUNT ACCESS
      ──────────────────────────────────────────────────────────────── */}
      <View style={styles.portalActionSection}>
        <View style={styles.portalCard}>
          <Text style={styles.portalCardEyebrow}>
            ⚡ {isFrench ? 'COMMENCEZ VOTRE GESTION AGRICOLE' : 'START YOUR FARM MANAGEMENT'}
          </Text>
          <Text style={styles.portalCardTitle}>
            {userEmail
              ? (isFrench ? `Bienvenue, ${userEmail}` : `Welcome back, ${userEmail}`)
              : (isFrench ? 'Rejoignez Agro-Vission dès aujourd’hui' : 'Join Agro-Vission Today')}
          </Text>
          <Text style={styles.portalCardSub}>
            {isFrench
              ? 'Accédez au diagnostic instantané par caméra, aux calendriers de culture par région et à l’agronome IA 100% hors-ligne.'
              : 'Access instant plant pathology scanning, regional Cameroon calendars, and our 100% offline Qwen AI agronomist.'}
          </Text>

          {/* Primary Buttons */}
          <View style={styles.portalButtonsRow}>
            {userEmail ? (
              <Pressable
                style={styles.portalPrimaryBtn}
                onPress={() => goTo('home')}
              >
                <Text style={styles.portalPrimaryBtnText}>
                  🌾 {isFrench ? 'Accéder à Mon Tableau de Bord' : 'Go to My Dashboard'}
                </Text>
              </Pressable>
            ) : (
              <>
                <Pressable
                  style={styles.portalPrimaryBtn}
                  onPress={() => goTo('register')}
                >
                  <Text style={styles.portalPrimaryBtnText}>
                    🚀 {isFrench ? 'Créer un Compte Agriculteur' : 'Create Farmer Account First'}
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.portalSecondaryBtn}
                  onPress={() => goTo('login')}
                >
                  <Text style={styles.portalSecondaryBtnText}>
                    🔑 {isFrench ? 'Déjà Inscrit ? Se Connecter' : 'Already Registered? Log In'}
                  </Text>
                </Pressable>
              </>
            )}
          </View>

          {/* 4 Direct Tool Chips */}
          <View style={styles.toolChipsGrid}>
            {APP_SERVICES.map((srv) => (
              <Pressable
                key={srv.key}
                style={styles.toolChip}
                onPress={() => handleToolNavigation(srv.route)}
              >
                <Text style={styles.toolChipIcon}>{srv.icon}</Text>
                <Text style={styles.toolChipLabel} numberOfLines={1}>
                  {isFrench ? srv.nameFr.split(' ')[0] : srv.nameEn.split(' ')[0]}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerBrand}>AGRO-VISSION • CAMEROON 2026</Text>
        <Text style={styles.footerNote}>
          {isFrench
            ? 'Dédié aux agriculteurs et à l’agriculture durable africaine'
            : 'Dedicated to African Smallholders & Sustainable Agriculture'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 40,
  },

  /* ── Hero & Image 1 Design ── */
  heroWrapper: {
    width: '100%',
    minHeight: 580,
    backgroundColor: '#1E3926',
  },
  heroBackground: {
    width: '100%',
    minHeight: 580,
  },
  heroBgImage: {
    opacity: 0.9,
    resizeMode: 'cover',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(19, 42, 24, 0.65)',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 36,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },

  /* Nav Bar */
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  navBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  logoBadgeIcon: {
    fontSize: 20,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  langPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  langPillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  contactBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
  },
  contactBtnText: {
    color: '#13351C',
    fontSize: 13,
    fontWeight: '700',
  },

  /* Hero Body */
  heroBody: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroPillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    gap: 6,
  },
  heroPillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#86EFAC',
  },
  heroPillBadgeText: {
    color: '#E2FCE7',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  heroTitleMain: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
    lineHeight: 46,
  },
  heroTitleSerif: {
    fontSize: 44,
    fontWeight: '400',
    fontStyle: 'italic',
    color: '#E8F5E9',
    letterSpacing: -0.5,
    marginBottom: 12,
    lineHeight: 48,
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255, 255, 255, 0.88)',
    marginBottom: 20,
    maxWidth: 480,
  },
  heroCtaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 22,
    flexWrap: 'wrap',
  },
  primaryPillBtn: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryPillBtnText: {
    color: '#064E3B',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryPillBtn: {
    backgroundColor: 'rgba(10, 40, 18, 0.55)',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 26,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },
  secondaryPillBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  /* Floating Frosted Glass Card */
  floatingPreviewCard: {
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 6,
  },
  floatingCardBg: {
    width: '100%',
    height: '100%',
  },
  floatingCardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 30, 15, 0.5)',
    padding: 12,
    justifyContent: 'space-between',
  },
  floatingCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  floatingCardTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  carouselIndicators: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  indicatorBar: {
    width: 8,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  indicatorBarActive: {
    width: 24,
    backgroundColor: '#FFFFFF',
  },

  /* ── Lower Image 1: Trusted & Mission ── */
  trustedSection: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: '#F8FAFC',
  },
  trustedTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#064E3B',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  partnersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 28,
    flexWrap: 'wrap',
  },
  partnerBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  partnerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: -0.2,
  },
  aboutUsPillRow: {
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  aboutPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#064E3B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 6,
  },
  aboutPillDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#86EFAC',
  },
  aboutPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  missionCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  missionText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 30,
    marginBottom: 18,
  },
  inlineCropPill: {
    width: 38,
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 4,
    marginBottom: -4,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  inlineCropImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featurePillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tagPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },

  /* ── Image 2: Organic Section ── */
  organicSection: {
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  organicHeroBanner: {
    width: '100%',
    minHeight: 240,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
  },
  organicHeroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 38, 22, 0.78)',
    padding: 22,
    justifyContent: 'center',
    borderRadius: 24,
  },
  leafIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  leafIcon: {
    fontSize: 18,
  },
  organicHeroTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 30,
  },
  organicHeroSub: {
    fontSize: 13,
    color: '#E2FCE7',
    lineHeight: 18,
    marginBottom: 16,
  },
  learnMoreBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#4ADE80',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  learnMoreBtnText: {
    color: '#064E3B',
    fontSize: 13,
    fontWeight: '800',
  },

  /* "Why Organic?" White Overlay Card */
  whyOrganicCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  whyOrganicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  whyOrganicIcon: {
    fontSize: 24,
  },
  whyOrganicTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#064E3B',
  },
  whyOrganicDesc: {
    fontSize: 13,
    lineHeight: 20,
    color: '#475569',
    marginBottom: 16,
  },
  whyOrganicBtnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  organicPillActionBtn: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  organicPillActionBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  organicSecondaryLink: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  organicSecondaryLinkText: {
    color: '#15803D',
    fontSize: 12,
    fontWeight: '700',
  },
  organicPillarsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  pillarCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  pillarIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  pillarIcon: {
    fontSize: 14,
  },
  pillarTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  pillarSub: {
    fontSize: 10.5,
    lineHeight: 14,
    color: '#64748B',
  },
  soilPhotoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 10,
    gap: 12,
  },
  soilPhoto: {
    width: 70,
    height: 60,
    borderRadius: 12,
  },
  soilPhotoCaption: {
    flex: 1,
  },
  soilPhotoCaptionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  soilPhotoCaptionSub: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },

  /* ── Direct Portal Actions ── */
  portalActionSection: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  portalCard: {
    backgroundColor: '#0F291E',
    borderRadius: 24,
    padding: 22,
  },
  portalCardEyebrow: {
    color: '#86EFAC',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  portalCardTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  portalCardSub: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 18,
  },
  portalButtonsRow: {
    gap: 10,
    marginBottom: 20,
  },
  portalPrimaryBtn: {
    backgroundColor: '#22C55E',
    paddingVertical: 13,
    borderRadius: 16,
    alignItems: 'center',
  },
  portalPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  portalSecondaryBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  portalSecondaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  toolChipsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  toolChip: {
    alignItems: 'center',
    flex: 1,
  },
  toolChipIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  toolChipLabel: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '600',
  },

  /* ── Footer ── */
  footer: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginHorizontal: 20,
  },
  footerBrand: {
    fontSize: 12,
    fontWeight: '800',
    color: '#064E3B',
    letterSpacing: 1,
    marginBottom: 4,
  },
  footerNote: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
