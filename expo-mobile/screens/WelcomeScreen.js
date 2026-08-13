import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ goTo }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agro-Vission</Text>
      <Text style={styles.subtitle}>Smart Crop Disease Detection for smallholder farmers in Cameroon.</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your farm companion</Text>
        <Text style={styles.cardText}>Capture leaf images, receive disease diagnosis, and get crop recommendations with AI assistance.</Text>
      </View>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1500607688834-83ed1d04f0f6?auto=format&fit=crop&w=500&q=60' }}
        style={styles.image}
      />
      <Pressable style={styles.primaryButton} onPress={() => goTo('register')}>
        <Text style={styles.primaryButtonText}>Register</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={() => goTo('login')}>
        <Text style={styles.secondaryButtonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  subtitle: {
    fontSize: 16,
    color: '#2E7D32',
    marginVertical: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  cardText: {
    marginTop: 8,
    color: '#424242',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#2E7D32',
    borderWidth: 1,
    padding: 16,
    borderRadius: 14,
  },
  secondaryButtonText: {
    color: '#2E7D32',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
