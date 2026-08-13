import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';

const historyData = {
  recentQuestions: [
    'How do I prevent cassava mosaic virus?',
    'What fertilizer should I use for maize in rainy season?',
    'How often should I water tomatoes?',
  ],
  recentRecommendations: [
    'Plant resistant cassava varieties and remove infected cuttings.',
    'Rotate maize with legumes every season to reduce disease pressure.',
    'Use drip irrigation for tomato beds to reduce fungal risk.',
  ],
};

export default function HistoryScreen({ goTo }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Account</Text>
      <Text style={styles.subtitle}>History of your questions and recommendations.</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Questions</Text>
        {historyData.recentQuestions.map((question, index) => (
          <View key={index} style={styles.itemCard}>
            <Text style={styles.itemText}>{question}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Recommendations</Text>
        {historyData.recentRecommendations.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 10,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  itemText: {
    color: '#424242',
    lineHeight: 22,
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
