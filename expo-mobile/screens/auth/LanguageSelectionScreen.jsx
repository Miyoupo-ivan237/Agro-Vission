import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

export default function LanguageSelectionScreen({ language, setLanguage, goTo }) {
  return (
    <View style={styles.container}>
      <View style={styles.brandingHeader}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.brandTitle}>AGRO-VISSION</Text>
        <Text style={styles.brandSub}>Cameroon Agricultural Intelligence</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Choose Your Language</Text>
        <Text style={styles.description}>Sélectionnez votre langue de préférence pour continuer.</Text>

        <Pressable
          style={[styles.button, language === 'English' && styles.buttonSelected]}
          onPress={() => setLanguage('English')}
        >
          <Text style={styles.flag}>🇬🇧</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.buttonText, language === 'English' && styles.buttonTextSelected]}>English</Text>
            <Text style={styles.buttonSub}>English agricultural terms & guidance</Text>
          </View>
          {language === 'English' && <Text style={styles.check}>✓</Text>}
        </Pressable>

        <Pressable
          style={[styles.button, (language === 'Français' || language === 'Francais') && styles.buttonSelected]}
          onPress={() => setLanguage('Français')}
        >
          <Text style={styles.flag}>🇫🇷</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.buttonText, (language === 'Français' || language === 'Francais') && styles.buttonTextSelected]}>Français</Text>
            <Text style={styles.buttonSub}>Termes agricoles et protocoles en français</Text>
          </View>
          {(language === 'Français' || language === 'Francais') && <Text style={styles.check}>✓</Text>}
        </Pressable>

        <Pressable style={styles.primaryButton} onPress={() => goTo('welcome')}>
          <Text style={styles.primaryButtonText}>
            {language === 'Français' ? 'Continuer →' : 'Continue →'}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>Offline AI • 10 Agro-Ecological Zones Cameroon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
  },
  brandingHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#DCFCE7',
    marginBottom: 10,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 1,
  },
  brandSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
    color: '#0F172A',
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    marginBottom: 20,
    color: '#64748B',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
    gap: 12,
  },
  buttonSelected: {
    backgroundColor: '#F0FDF4',
    borderColor: '#16A34A',
  },
  flag: {
    fontSize: 24,
  },
  buttonText: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '700',
  },
  buttonTextSelected: {
    color: '#15803D',
  },
  buttonSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  check: {
    fontSize: 18,
    color: '#16A34A',
    fontWeight: '900',
  },
  primaryButton: {
    marginTop: 10,
    backgroundColor: '#16A34A',
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 15,
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 11,
    color: '#94A3B8',
  },
});
