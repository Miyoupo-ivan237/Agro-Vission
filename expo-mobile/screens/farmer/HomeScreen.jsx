import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';

const CROP_SPOTLIGHTS = [
  { crop: 'Cassava', zone: 'Centre & South', image: 'https://images.unsplash.com/photo-1592982537447-6f23349c814b?auto=format&fit=crop&w=1200&q=80' },
  { crop: 'Maize', zone: 'Adamawa & West', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1200&q=80' },
  { crop: 'Tomato', zone: 'Foumbot & Highlands', image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1200&q=80' },
  { crop: 'Plantain', zone: 'Littoral & South-West', image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80' }
];

export default function HomeScreen({ goTo, userEmail }) {
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const spotlight = CROP_SPOTLIGHTS[spotlightIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setSpotlightIndex((current) => (current + 1) % CROP_SPOTLIGHTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Top Banner */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <View>
            <Text style={styles.title}>Agro-Vission AI</Text>
            <Text style={styles.subtitle}>{userEmail ? `Signed in as ${userEmail}` : 'Farmer & Extension Portal'}</Text>
          </View>
        </View>
        <Pressable style={styles.welcomeBtn} onPress={() => goTo('welcome')}>
          <Text style={styles.welcomeBtnText}>↩️ Home</Text>
        </Pressable>
      </View>

      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1499529112087-3cb3b73d8b8?auto=format&fit=crop&w=1200&q=80' }}
        style={styles.heroCard}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroShade}>
          <View style={styles.badgeRow}>
            <Text style={styles.heroBadge}>🔬 AI DIAGNOSIS</Text>
            <Text style={styles.offlineTag}>⚡ OFFLINE READY</Text>
          </View>
          <Text style={styles.heroTitle}>See what your crop is telling you.</Text>
          <Text style={styles.heroSub}>
            Photograph a leaf, fruit, or stem. The pathology engine compares symptoms and returns a treatment plan for your farm.
          </Text>
          <Pressable style={styles.primaryButton} onPress={() => goTo('diagnosis')}>
            <Text style={styles.primaryButtonText}>📸 Inspect a Crop</Text>
          </Pressable>
        </View>
      </ImageBackground>

      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=1200&q=80' }}
        style={styles.recommendationBanner}
        imageStyle={styles.recommendationImage}
      >
        <View style={styles.recommendationShade}>
          <Text style={styles.spotlightEyebrow}>CROP SPOTLIGHT • {spotlight.zone}</Text>
          <Text style={styles.spotlightTitle}>{spotlight.crop} planning for your season</Text>
          <Text style={styles.spotlightText}>Match your region, soil, farm size, and rainfall to a practical planting plan.</Text>
          <Pressable style={styles.lightButton} onPress={() => goTo('cropAdvice')}>
            <Text style={styles.lightButtonText}>🌾 Build Recommendation</Text>
          </Pressable>
        </View>
      </ImageBackground>

      {/* 2x2 Feature Grid */}
      <View style={styles.grid}>
        {/* Feature 2: Crop Advice */}
        <Pressable style={styles.gridCard} onPress={() => goTo('cropAdvice')}>
          <Text style={styles.cardIcon}>🌾</Text>
          <Text style={styles.gridTitle}>Crop Advice</Text>
          <Text style={styles.gridText}>Agro-ecological planting & fertilizer schedules for Cameroon</Text>
        </Pressable>

        {/* Feature 3: AI Agronomist Chat */}
        <Pressable style={styles.gridCard} onPress={() => goTo('aiChat')}>
          <Text style={styles.cardIcon}>🤖</Text>
          <Text style={styles.gridTitle}>AI Agronomist</Text>
          <Text style={styles.gridText}>Ask questions to your local Ollama LLM agronomist in English or French</Text>
        </Pressable>

        {/* Feature 4: Field Survey */}
        <Pressable style={styles.gridCard} onPress={() => goTo('survey')}>
          <Text style={styles.cardIcon}>📋</Text>
          <Text style={styles.gridTitle}>Field Survey</Text>
          <Text style={styles.gridText}>Log field moisture, crop growth stages, and pest infestations</Text>
        </Pressable>

        {/* Feature 5: Notifications */}
        <Pressable style={styles.gridCard} onPress={() => goTo('notifications')}>
          <Text style={styles.cardIcon}>🔔</Text>
          <Text style={styles.gridTitle}>Notifications</Text>
          <Text style={styles.gridText}>View diagnosis results and system milestone alerts</Text>
        </Pressable>
      </View>

      {/* Admin Quick Action */}
      <Pressable style={styles.adminCard} onPress={() => goTo('admin')}>
        <Text style={styles.adminTitle}>🔑 Admin & Analytics Dashboard</Text>
        <Text style={styles.adminText}>Manage farmer accounts, database logs, and model statuses</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  welcomeBtn: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  welcomeBtnText: {
    color: '#1B5E20',
    fontWeight: 'bold',
    fontSize: 12,
  },
  heroCard: {
    minHeight: 270,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 4,
    overflow: 'hidden',
  },
  heroImage: {
    borderRadius: 20,
  },
  heroShade: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: 'rgba(4, 43, 28, 0.62)',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  heroBadge: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1B5E20',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  offlineTag: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#D97706',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  heroSub: {
    fontSize: 13,
    color: '#E2F4E8',
    lineHeight: 18,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#1B5E20',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  recommendationBanner: {
    minHeight: 220,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  recommendationImage: {
    borderRadius: 20,
  },
  recommendationShade: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: 'rgba(16, 55, 42, 0.56)',
  },
  spotlightEyebrow: {
    color: '#D7F5B8',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 6,
  },
  spotlightTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    lineHeight: 26,
    fontWeight: '900',
    marginBottom: 6,
  },
  spotlightText: {
    color: '#F1F8E9',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  lightButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#D7F5B8',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 12,
  },
  lightButtonText: {
    color: '#17452D',
    fontSize: 13,
    fontWeight: '900',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 4,
  },
  gridText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  adminCard: {
    backgroundColor: '#1E293B',
    borderRadius: 18,
    padding: 18,
    marginTop: 10,
  },
  adminTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#38BDF8',
    marginBottom: 4,
  },
  adminText: {
    fontSize: 12,
    color: '#94A3B8',
  },
});
