import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ goTo, userEmail }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>{userEmail ? `Signed in as ${userEmail}` : 'Sign in to continue'}</Text>
      </View>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1500607688834-83ed1d04f0f6?auto=format&fit=crop&w=700&q=80' }}
        style={styles.image}
      />
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Field diagnosis</Text>
        <Text style={styles.cardText}>Take a photo of a plant and get a quick disease diagnosis. The app will explain the next steps.</Text>
      </View>
      <Pressable style={styles.primaryButton} onPress={() => goTo('diagnosis')}>
        <Text style={styles.primaryButtonText}>Start diagnosis</Text>
      </Pressable>
      <View style={styles.row}>
        <Pressable style={styles.smallCard} onPress={() => goTo('cropAdvice')}>
          <Text style={styles.smallCardTitle}>Crop advice</Text>
          <Text style={styles.smallCardText}>View regional farming tips</Text>
        </Pressable>
        <View style={[styles.smallCard, styles.smallCardDisabled]}>
          <Text style={styles.smallCardTitle}>AI assistant</Text>
          <Text style={styles.smallCardText}>Coming soon</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  subtitle: {
    marginTop: 8,
    color: '#2E7D32',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  cardText: {
    color: '#424242',
  },
  primaryButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  smallCardDisabled: {
    opacity: 0.55,
    backgroundColor: '#F1F8E9',
  },
  smallCardTitle: {
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  smallCardText: {
    color: '#424242',
  },
});
