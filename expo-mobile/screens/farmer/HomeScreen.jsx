import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, Pressable, StyleSheet, ScrollView, Image,
  ImageBackground, Dimensions, TextInput, ActivityIndicator
} from 'react-native';
import { sendAgronomistChat } from '../../src/api';
import { offlineChatAgronomist } from '../../src/offline_ai';

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

  // Agronomist Chat Console State
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatReply, setChatReply] = useState(null);

  // My Account Card Expansion State
  const [accountVisible, setAccountVisible] = useState(true);
  const scrollViewRef = useRef();

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

        <View style={styles.headerRightBtns}>
          <Pressable
            style={[styles.accountToggleBtn, accountVisible && styles.accountToggleBtnActive]}
            onPress={() => setAccountVisible(prev => !prev)}
          >
            <Text style={[styles.accountToggleBtnText, accountVisible && styles.accountToggleBtnTextActive]}>
              👤 {isFr ? 'Mon Compte' : 'My Account'}
            </Text>
          </Pressable>
          <Pressable style={styles.welcomeBtn} onPress={handleSignOut}>
            <Text style={styles.welcomeBtnText}>🚪</Text>
          </Pressable>
        </View>
      </View>

      {/* ── Farm Status Metrics Bar ──────────────────────────────────── */}
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

      {/* ── Hero Action: AI Diagnosis Banner (Inspect & Diagnose) ────── */}
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

      {/* ── Cameroon Crop Spotlight Banner (Tailored Recommendation) ─── */}
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

      {/* ── Section: My Account Hub (Field Survey, Alert & History) ──── */}
      {accountVisible && (
        <View style={styles.accountHubCard}>
          {/* Account Profile Header */}
          <View style={styles.accountProfileRow}>
            <View style={styles.accountAvatar}>
              <Text style={styles.accountAvatarText}>👨‍🌾</Text>
            </View>
            <View style={styles.accountMetaCol}>
              <View style={styles.accountTitleRow}>
                <Text style={styles.accountCardTitle}>
                  {isFr ? 'Mon Compte Agriculteur' : 'My Farmer Account'}
                </Text>
                <View style={styles.verifiedChip}>
                  <Text style={styles.verifiedChipText}>✓ {isFr ? 'ACTIF' : 'ACTIVE'}</Text>
                </View>
              </View>
              <Text style={styles.accountEmailText} numberOfLines={1}>
                {userEmail || (isFr ? 'Planteur du Cameroun' : 'Cameroon Farmer')}
              </Text>
            </View>
          </View>

          <View style={styles.accountDivider} />

          {/* Module 1: Field Survey */}
          <Pressable style={styles.accountActionCard} onPress={() => goTo('survey')}>
            <View style={[styles.accountActionIconWrap, { backgroundColor: '#ECFDF5' }]}>
              <Text style={styles.accountActionIcon}>📋</Text>
            </View>
            <View style={styles.accountActionInfo}>
              <Text style={styles.accountActionTitle}>
                {isFr ? 'Enquête Parcelle' : 'Field Survey'}
              </Text>
              <Text style={styles.accountActionDesc}>
                {isFr
                  ? 'Suivre l\'humidité du sol, les stades végétatifs et les ravageurs'
                  : 'Log soil moisture, vegetative growth stages, and pest infestations'}
              </Text>
            </View>
            <Text style={[styles.accountActionArrow, { color: '#059669' }]}>→</Text>
          </Pressable>

          {/* Module 2: Alerts & Notifications */}
          <Pressable style={styles.accountActionCard} onPress={() => goTo('notifications')}>
            <View style={[styles.accountActionIconWrap, { backgroundColor: '#E0F2FE' }]}>
              <Text style={styles.accountActionIcon}>🔔</Text>
            </View>
            <View style={styles.accountActionInfo}>
              <Text style={styles.accountActionTitle}>
                {isFr ? 'Alertes & Rappels' : 'Alerts & Reminders'}
              </Text>
              <Text style={styles.accountActionDesc}>
                {isFr
                  ? 'Rappels de diagnostic à 2 semaines et alertes sanitaires régionales'
                  : '2-week treatment follow-up reminders and regional outbreak alerts'}
              </Text>
            </View>
            <Text style={[styles.accountActionArrow, { color: '#0284C7' }]}>→</Text>
          </Pressable>

          {/* Module 3: History */}
          <Pressable style={styles.accountActionCard} onPress={() => goTo('history')}>
            <View style={[styles.accountActionIconWrap, { backgroundColor: '#FEF3C7' }]}>
              <Text style={styles.accountActionIcon}>📜</Text>
            </View>
            <View style={styles.accountActionInfo}>
              <Text style={styles.accountActionTitle}>
                {isFr ? 'Mon Historique' : 'My History'}
              </Text>
              <Text style={styles.accountActionDesc}>
                {isFr
                  ? 'Consulter vos diagnostics de plantes, recommandations et échanges IA'
                  : 'Review all saved crop diagnoses, recommendations, and AI answers'}
              </Text>
            </View>
            <Text style={[styles.accountActionArrow, { color: '#D97706' }]}>→</Text>
          </Pressable>

          {/* Sign Out Action inside My Account */}
          <Pressable style={styles.accountSignOutBtn} onPress={handleSignOut}>
            <Text style={styles.accountSignOutText}>
              🚪 {isFr ? 'Se Déconnecter de la Session' : 'Sign Out of Account'}
            </Text>
          </Pressable>
        </View>
      )}

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
    backgroundColor: '#F8FAFC',
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
  headerRightBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accountToggleBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  accountToggleBtnActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  accountToggleBtnText: {
    color: '#334155',
    fontWeight: '700',
    fontSize: 12,
  },
  accountToggleBtnTextActive: {
    color: '#047857',
  },
  welcomeBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 1,
  },
  welcomeBtnText: {
    fontSize: 14,
  },

  /* Metrics Bar */
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

  /* Hero Card */
  heroCard: {
    minHeight: 240,
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
    backgroundColor: '#16A34A',
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

  /* Recommendation Spotlight */
  recommendationBanner: {
    minHeight: 190,
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

  /* ── Interactive Agronomist Chat Console ───────────────────── */
  agronomistCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  agronomistHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  agronomistBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  agronomistBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4F46E5',
    letterSpacing: 0.5,
  },
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
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
    color: '#0F172A',
    marginBottom: 4,
  },
  agronomistSub: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
    marginBottom: 12,
  },
  chipsScroll: {
    marginBottom: 12,
  },
  promptChip: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
  },
  promptChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  chatTextInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    paddingVertical: 8,
  },
  chatSendBtn: {
    backgroundColor: '#059669',
    width: 38,
    height: 38,
    borderRadius: 10,
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
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
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
    color: '#15803D',
  },
  chatAnswerSource: {
    fontSize: 10,
    color: '#047857',
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
    color: '#14532D',
    lineHeight: 19,
    marginBottom: 10,
  },
  openChatFullBtn: {
    backgroundColor: '#166534',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  openChatFullBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  /* ── My Account Hub Card ───────────────────────────────────── */
  accountHubCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  accountProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accountAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DCFCE7',
    borderWidth: 1.5,
    borderColor: '#86EFAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountAvatarText: {
    fontSize: 24,
  },
  accountMetaCol: {
    flex: 1,
  },
  accountTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accountCardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  verifiedChip: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  verifiedChipText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#15803D',
  },
  accountEmailText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  accountDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
  accountActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  accountActionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  accountActionIcon: {
    fontSize: 20,
  },
  accountActionInfo: {
    flex: 1,
  },
  accountActionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  accountActionDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  accountActionArrow: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  accountSignOutBtn: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  accountSignOutText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },

  /* ── Admin Card ────────────────────────────────────────────── */
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
