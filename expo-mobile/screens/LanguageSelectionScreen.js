import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function LanguageSelectionScreen({ language, setLanguage, goTo }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your language</Text>
      <Text style={styles.description}>Select English or French for the best experience.</Text>
      <Pressable style={[styles.button, language === 'English' && styles.buttonSelected]} onPress={() => setLanguage('English')}>
        <Text style={styles.buttonText}>English</Text>
      </Pressable>
      <Pressable style={[styles.button, language === 'French' && styles.buttonSelected]} onPress={() => setLanguage('French')}>
        <Text style={styles.buttonText}>Français</Text>
      </Pressable>
      <Pressable style={styles.primaryButton} onPress={() => goTo('welcome')}>
        <Text style={styles.primaryButtonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1B5E20',
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    color: '#2E7D32',
  },
  button: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2E7D32',
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  buttonSelected: {
    backgroundColor: '#C8E6C9',
  },
  buttonText: {
    color: '#2E7D32',
    textAlign: 'center',
    fontWeight: '600',
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
