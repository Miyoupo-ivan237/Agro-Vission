import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';

const adviceItems = [
  {
    crop: 'Cassava',
    note: 'Watch for cassava mosaic disease and brown streak. Use disease-resistant planting material and remove infected plants early.',
  },
  {
    crop: 'Maize',
    note: 'For leaf rust and blight, plant in well-spaced rows, rotate crops, and apply organic mulch to keep soil healthy.',
  },
  {
    crop: 'Tomato',
    note: 'Protect tomatoes from blight by avoiding overhead watering and planting in bright, breezy locations.',
  },
  {
    crop: 'Plantain',
    note: 'Inspect for weevils and root rot. Keep the base dry and use compost to improve drainage.',
  },
];

export default function CropAdviceScreen({ goTo }) {
  const [farmInfo, setFarmInfo] = useState({ location: '', season: '', soilCondition: '' });
  const [recommendation, setRecommendation] = useState(null);

  const handleRecommend = () => {
    if (!farmInfo.location || !farmInfo.season || !farmInfo.soilCondition) {
      Alert.alert('Complete farm information', 'Please fill in all farm details before receiving a recommendation.');
      return;
    }

    let crop = 'Maize';
    let advice = 'Plant maize with balanced fertilizer, rotate with legumes, and use raised beds if the soil is wet.';
    if (farmInfo.soilCondition.toLowerCase().includes('sandy')) {
      crop = 'Cassava';
      advice = 'Cassava tolerates sandy soils well. Use organic mulch and plant in ridges for moisture retention.';
    } else if (farmInfo.soilCondition.toLowerCase().includes('clay')) {
      crop = 'Plantain';
      advice = 'Plantain grows well in heavier soils if drainage is managed and compost is added.';
    } else if (farmInfo.season.toLowerCase().includes('dry')) {
      crop = 'Tomato';
      advice = 'Tomato works in dry season with drip watering and shade during midday heat.';
    }

    setRecommendation({ crop, advice });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crop Recommendation</Text>
      <Text style={styles.subtitle}>Tell us about your farm so we can recommend the best crop.</Text>
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={farmInfo.location}
          onChangeText={(text) => setFarmInfo({ ...farmInfo, location: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Season (rainy/dry)"
          value={farmInfo.season}
          onChangeText={(text) => setFarmInfo({ ...farmInfo, season: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Soil condition"
          value={farmInfo.soilCondition}
          onChangeText={(text) => setFarmInfo({ ...farmInfo, soilCondition: text })}
        />
      </View>
      <Pressable style={styles.primaryButton} onPress={handleRecommend}>
        <Text style={styles.primaryButtonText}>Get Recommendation</Text>
      </Pressable>

      {recommendation ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Suggested crop</Text>
          <Text style={styles.cardText}>{recommendation.crop}</Text>
          <Text style={styles.cardText}>{recommendation.advice}</Text>
        </View>
      ) : null}

      <Text style={styles.sectionTitle}>Sample Advice</Text>
      {adviceItems.map((item) => (
        <View key={item.crop} style={styles.card}>
          <Text style={styles.cardTitle}>{item.crop}</Text>
          <Text style={styles.cardText}>{item.note}</Text>
        </View>
      ))}

      <Pressable style={styles.primaryButton} onPress={() => goTo('home')}>
        <Text style={styles.primaryButtonText}>Back to dashboard</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  subtitle: {
    color: '#2E7D32',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  cardText: {
    color: '#424242',
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 14,
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
