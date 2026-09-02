import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, Image } from 'react-native';
import { getT } from '../src/translations';

export default function WelcomeScreen({ goTo, setLanguage, currentLanguage }) {
  const [lang, setLang] = useState(currentLanguage || 'English');
  const t = getT(lang);

  const handleLanguageSelect = (selected) => {
    setLang(selected);
    if (setLanguage) setLanguage(selected);
  };

  const handleContinue = () => {
    goTo('login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.appName}>AGROVISSION</Text>
          <Text style={styles.tagline}>{t.tagline}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🌱 {t.offlineStatus}</Text>
          </View>
        </View>

        <View style={styles.bottomCard}>
          <Text style={styles.cardTitle}>{t.selectLanguage}</Text>
          
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
            <Text style={styles.continueText}>{t.getStarted}</Text>
          </Pressable>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D5C3A',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#0D5C3A',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
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
  bottomCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
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
    backgroundColor: '#0F4C81',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  continueText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
