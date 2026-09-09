import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { getT } from '../../src/translations';

export default function WelcomeScreen({ goTo, setLanguage, currentLanguage }) {
  const [lang, setLang] = useState(currentLanguage || 'English');
  const t = getT(lang);

  const handleLanguageSelect = (selected) => {
    setLang(selected);
    if (setLanguage) setLanguage(selected);
  };

  const handleContinue = () => {
    goTo('home');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.overlay}>
        
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.appName}>AGRO-VISSION</Text>
          <Text style={styles.tagline}>{t.tagline || 'AI-Powered Agricultural Intelligence for Cameroon'}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🌱 {t.offlineStatus || '100% On-Device & Offline AI Ready'}</Text>
          </View>
        </View>

        <View style={styles.statusStrip}>
          <View>
            <Text style={styles.statusEyebrow}>FARM INTELLIGENCE</Text>
            <Text style={styles.statusTitle}>Your field, understood.</Text>
          </View>
          <View style={styles.statusPulse}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>READY</Text>
          </View>
        </View>

        {/* Direct Feature Access Grid */}
        <View style={styles.featureGrid}>
          <Pressable style={styles.featureItem} onPress={() => goTo('diagnosis')}>
            <Text style={styles.featureIcon}>🔬</Text>
            <Text style={styles.featureLabel}>{lang === 'Français' ? 'Diagnostic IA' : 'AI Diagnosis'}</Text>
          </Pressable>
          
          <Pressable style={styles.featureItem} onPress={() => goTo('cropAdvice')}>
            <Text style={styles.featureIcon}>🌾</Text>
            <Text style={styles.featureLabel}>{lang === 'Français' ? 'Conseils Cultures' : 'Crop Advice'}</Text>
          </Pressable>
          
          <Pressable style={styles.featureItem} onPress={() => goTo('aiChat')}>
            <Text style={styles.featureIcon}>🤖</Text>
            <Text style={styles.featureLabel}>{lang === 'Français' ? 'Agronome IA' : 'AI Chat'}</Text>
          </Pressable>
          
          <Pressable style={styles.featureItem} onPress={() => goTo('survey')}>
            <Text style={styles.featureIcon}>📋</Text>
            <Text style={styles.featureLabel}>{lang === 'Français' ? 'Enquête Champ' : 'Field Survey'}</Text>
          </Pressable>
        </View>

        <View style={styles.bottomCard}>
          <Text style={styles.cardTitle}>{t.selectLanguage || 'Select Language / Langue'}</Text>
          
          <View style={styles.languageContainer}>
            <Pressable
              style={[styles.langButton, lang === 'English' && styles.langButtonActive]}
              onPress={() => handleLanguageSelect('English')}
            >
              <Text style={styles.langEmoji}>🇬🇧</Text>
              <Text style={[styles.langText, lang === 'English' && styles.langTextActive]}>English</Text>
            </Pressable>
            
            <Pressable
              style={[styles.langButton, lang === 'Français' && styles.langButtonActive]}
              onPress={() => handleLanguageSelect('Français')}
            >
              <Text style={styles.langEmoji}>🇫🇷</Text>
              <Text style={[styles.langText, lang === 'Français' && styles.langTextActive]}>Français</Text>
            </Pressable>
          </View>

          <Pressable style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueText}>🚀 {t.getStarted || 'Enter Farmer Dashboard'}</Text>
          </Pressable>

          <Pressable style={styles.loginLink} onPress={() => goTo('login')}>
            <Text style={styles.loginLinkText}>🔑 {lang === 'Français' ? 'Connexion Agriculteur / Admin' : 'Farmer / Admin Login'}</Text>
          </Pressable>
        </View>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A3D2A',
  },
  content: {
    flexGrow: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#0A3D2A',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 24,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  appName: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#E0F2F1',
    textAlign: 'center',
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  badgeText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statusStrip: {
    marginTop: 18,
    marginBottom: 8,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#0F5138',
    borderWidth: 1,
    borderColor: '#2A8158',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusEyebrow: {
    color: '#8ED1A9',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  statusTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  statusPulse: {
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#A7F3D0',
    marginBottom: 5,
  },
  statusText: {
    color: '#A7F3D0',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  bottomCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 22,
    elevation: 8,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 20,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  langButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 8,
    backgroundColor: '#F8FAFC',
  },
  langButtonActive: {
    borderColor: '#2E7D32',
    backgroundColor: '#E8F5E9',
  },
  langEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  langText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64748B',
  },
  langTextActive: {
    color: '#2E7D32',
  },
  continueButton: {
    backgroundColor: '#1B5E20',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  continueText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#F7FBF8',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D5EBDD',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  featureLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  loginLinkText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
  },
});
