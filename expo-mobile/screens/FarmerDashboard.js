import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Animated } from 'react-native';
import { getT } from '../src/translations';
import { CAMEROON_20_CROPS } from '../src/cameroon_crops';

export default function FarmerDashboard({ goTo, language = 'English' }) {
  const t = getT(language);
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeCropIndex, setActiveCropIndex] = useState(0);
  const fadeAnim = useState(new Animated.Value(1))[0];
  const cropFadeAnim = useState(new Animated.Value(1))[0];

  const banners = [
    {
      title: t.heroDiagTitle,
      subtitle: t.heroDiagSub,
      image: 'https://images.unsplash.com/photo-1592982537447-6f23349c814b?auto=format&fit=crop&w=800&q=80',
      action: () => goTo('diagnosis'),
      actionText: t.cameraScan,
      badge: t.diagnosis
    },
    {
      title: t.heroRecTitle,
      subtitle: t.heroRecSub,
      image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=800&q=80',
      action: () => goTo('cropAdvice'),
      actionText: t.recommend,
      badge: t.recommend
    }
  ];

  // Rotate Hero Banners
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true })
      ]).start();
      setTimeout(() => setActiveBanner((prev) => (prev === 0 ? 1 : 0)), 400);
    }, 4500);
    return () => clearInterval(interval);
  }, [fadeAnim]);

  // Rotate 20 Cameroon Crops
  useEffect(() => {
    const cropInterval = setInterval(() => {
      Animated.sequence([
        Animated.timing(cropFadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(cropFadeAnim, { toValue: 1, duration: 300, useNativeDriver: true })
      ]).start();
      setTimeout(() => setActiveCropIndex((prev) => (prev + 1) % CAMEROON_20_CROPS.length), 300);
    }, 5000);
    return () => clearInterval(cropInterval);
  }, [cropFadeAnim]);

  const currentBanner = banners[activeBanner];
  const currentCrop = CAMEROON_20_CROPS[activeCropIndex];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Text style={styles.headerTitle}>{t.dashboard}</Text>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </View>
        <View style={styles.brandRow}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.brandLeafLogo}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.brandText}>{t.appName} Cameroon</Text>
            <Text style={styles.offlineText}>✓ {t.offlineStatus}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Quick Actions */}
        <View style={styles.actionGrid}>
          <Pressable style={styles.actionCard} onPress={() => goTo('diagnosis')}>
            <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
              <Text style={styles.icon}>📸</Text>
            </View>
            <Text style={styles.actionText}>{t.diagnosis}</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={() => goTo('cropAdvice')}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFF3E0' }]}>
              <Text style={styles.icon}>🌱</Text>
            </View>
            <Text style={styles.actionText}>{t.recommend}</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={() => goTo('aiChat')}>
            <View style={[styles.iconCircle, { backgroundColor: '#F3E5F5' }]}>
              <Text style={styles.icon}>💬</Text>
            </View>
            <Text style={styles.actionText}>{t.chatAi}</Text>
          </Pressable>
        </View>

        {/* Dynamic Rotating Hero Banner */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Pressable style={styles.heroCard} onPress={currentBanner.action}>
            <Image source={{ uri: currentBanner.image }} style={styles.heroImage} />
            <View style={styles.heroOverlay}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>{currentBanner.badge}</Text>
              </View>
              <Text style={styles.heroMainTitle}>{currentBanner.title}</Text>
              <Text style={styles.heroSubTitle}>{currentBanner.subtitle}</Text>
              <View style={styles.heroBtn}>
                <Text style={styles.heroBtnText}>{currentBanner.actionText} →</Text>
              </View>
            </View>
          </Pressable>
        </Animated.View>

        <View style={styles.paginationDots}>
          <View style={[styles.dot, activeBanner === 0 ? styles.dotActive : null]} />
          <View style={[styles.dot, activeBanner === 1 ? styles.dotActive : null]} />
        </View>

        {/* 20 Cameroon Crops Carousel Spotlight */}
        <Text style={styles.sectionTitle}>{t.cameroon20Crops}</Text>
        <Animated.View style={[styles.cropSpotlight, { opacity: cropFadeAnim }]}>
          <Image source={{ uri: currentCrop.image }} style={styles.cropSpotlightImage} />
          <View style={styles.cropSpotlightContent}>
            <Text style={styles.cropName}>{language === 'Français' ? currentCrop.frenchName : currentCrop.name}</Text>
            <Text style={styles.cropRegion}>📍 {currentCrop.region}</Text>
            
            <View style={styles.cropInfoRow}>
              <Text style={styles.cropInfoTag}>⏱️ {currentCrop.cycle}</Text>
              <Text style={styles.cropInfoTag}>🌍 {currentCrop.zone}</Text>
            </View>
            
            <Text style={styles.cropDesc} numberOfLines={2}>
              {currentCrop.importance}
            </Text>
          </View>
        </Animated.View>
        
        <View style={{ height: 40 }} />
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIconActive}>📊</Text>
          <Text style={styles.navTextActive}>{t.dashboard}</Text>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => goTo('survey')}>
          <Text style={styles.navIcon}>📝</Text>
          <Text style={styles.navText}>{t.survey}</Text>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => goTo('welcome')}>
          <Text style={styles.navIcon}>🌍</Text>
          <Text style={styles.navText}>Lang</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#2E7D32', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#ffffff' },
  settingsIcon: { fontSize: 20 },
  brandRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', padding: 10, borderRadius: 12 },
  brandLeafLogo: { width: 34, height: 34, borderRadius: 8, marginRight: 10, backgroundColor: '#ffffff' },
  brandText: { fontSize: 16, fontWeight: 'bold', color: '#ffffff' },
  offlineText: { fontSize: 11, color: '#A5D6A7', fontWeight: 'bold', marginTop: 2 },
  
  content: { padding: 16 },
  
  actionGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  actionCard: { flex: 1, alignItems: 'center', backgroundColor: '#ffffff', padding: 12, borderRadius: 16, marginHorizontal: 4, elevation: 2 },
  iconCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  icon: { fontSize: 24 },
  actionText: { fontSize: 12, fontWeight: '600', color: '#1E293B', textAlign: 'center' },

  heroCard: { backgroundColor: '#ffffff', borderRadius: 20, overflow: 'hidden', elevation: 4, marginBottom: 12 },
  heroImage: { width: '100%', height: 220 },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', padding: 20, justifyContent: 'flex-end' },
  heroBadge: { backgroundColor: '#EAB308', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginBottom: 8 },
  heroBadgeText: { color: '#ffffff', fontSize: 11, fontWeight: 'bold' },
  heroMainTitle: { color: '#ffffff', fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  heroSubTitle: { color: '#E2E8F0', fontSize: 13, marginBottom: 12, width: '90%' },
  heroBtn: { backgroundColor: '#2563EB', alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  heroBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 13 },
  
  paginationDots: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#CBD5E1', marginHorizontal: 4 },
  dotActive: { backgroundColor: '#2563EB', width: 16 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 12 },
  cropSpotlight: { backgroundColor: '#ffffff', borderRadius: 20, overflow: 'hidden', elevation: 3 },
  cropSpotlightImage: { width: '100%', height: 160 },
  cropSpotlightContent: { padding: 16 },
  cropName: { fontSize: 20, fontWeight: 'bold', color: '#0F4C81', marginBottom: 4 },
  cropRegion: { fontSize: 13, color: '#64748B', marginBottom: 10, fontWeight: '600' },
  cropInfoRow: { flexDirection: 'row', marginBottom: 10, flexWrap: 'wrap' },
  cropInfoTag: { backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, fontSize: 11, color: '#475569', marginRight: 8, marginBottom: 4, fontWeight: '500' },
  cropDesc: { fontSize: 13, color: '#475569', lineHeight: 20 },

  bottomNav: { flexDirection: 'row', backgroundColor: '#ffffff', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#E2E8F0', justifyContent: 'space-around' },
  navItem: { alignItems: 'center' },
  navIconActive: { fontSize: 22, color: '#2E7D32' },
  navTextActive: { fontSize: 11, color: '#2E7D32', fontWeight: 'bold', marginTop: 4 },
  navIcon: { fontSize: 22, color: '#94A3B8' },
  navText: { fontSize: 11, color: '#94A3B8', fontWeight: '600', marginTop: 4 },
});
