import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image, FlatList, ScrollView } from 'react-native';

const forecast = [
  { day: 'Mon', temp: '27°', rain: '5.0mm' },
  { day: 'Tue', temp: '28°', rain: '6.4mm' },
  { day: 'Wed', temp: '26°', rain: '9.6mm' },
  { day: 'Thu', temp: '28°', rain: '3.7mm' },
  { day: 'Fri', temp: '24°', rain: '15.9mm' },
];

const plantImages = [
  { id: '1', name: 'Cassava', uri: 'https://images.unsplash.com/photo-1493119508027-2b584f234d6c?auto=format&fit=crop&w=800&q=80' },
  { id: '2', name: 'Maize', uri: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80' },
  { id: '3', name: 'Tomato', uri: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80' },
  { id: '4', name: 'Plantain', uri: 'https://images.unsplash.com/photo-1496950866446-325a4e5a7f0c?auto=format&fit=crop&w=800&q=80' },
  { id: '5', name: 'Groundnut', uri: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80' },
];

export default function FarmerDashboard({ goTo, userEmail }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % plantImages.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.brand}>PlantVillage</Text>
          <Text style={styles.brandSubtitle}>Cameroon Farm AI</Text>
        </View>
        <View style={styles.actionButtons}>
          <Pressable style={styles.topButton} onPress={() => goTo('history')}>
            <Text style={styles.topButtonText}>My Account</Text>
          </Pressable>
          <Pressable style={styles.topButtonSecondary} onPress={() => {}}>
            <Text style={styles.topButtonSecondaryText}>My Farms</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weatherRow}>
        {forecast.map((item) => (
          <View key={item.day} style={styles.weatherCard}>
            <Text style={styles.weatherIcon}>☔</Text>
            <Text style={styles.weatherDay}>{item.day}</Text>
            <Text style={styles.weatherTemp}>{item.temp}</Text>
            <Text style={styles.weatherRain}>{item.rain}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.mainCard}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1483389127118-126b5d2dba8a?auto=format&fit=crop&w=900&q=80' }}
          style={styles.mainImage}
        />
        <View style={styles.mainContent}>
          <Text style={styles.mainTitle}>Cameroon Farming Support</Text>
          <Text style={styles.mainText}>Upload a plant image and get crop diagnosis, recommendation and survey support tailored for Cameroon farms.</Text>
        </View>
      </View>

      <View style={styles.bottomPrompt}>
        <Text style={styles.promptText}>Chat with PlantVillage AI for farming guidance, plant disease help, or crop planning.</Text>
      </View>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navButton} onPress={() => goTo('home')}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </Pressable>
        <Pressable style={styles.navButton} onPress={() => {}}>
          <Text style={styles.navIcon}>📝</Text>
          <Text style={styles.navLabel}>Surveys</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FDFF',
    paddingTop: 24,
    paddingHorizontal: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  brand: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F4C81',
  },
  brandSubtitle: {
    color: '#3B6B8B',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  topButton: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 8,
    elevation: 2,
  },
  topButtonText: {
    color: '#0F4C81',
    fontWeight: '600',
  },
  topButtonSecondary: {
    backgroundColor: '#eef7ff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 14,
    elevation: 1,
  },
  topButtonSecondaryText: {
    color: '#0F4C81',
    fontWeight: '600',
  },
  weatherRow: {
    marginBottom: 18,
  },
  weatherCard: {
    width: 90,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    marginRight: 12,
    alignItems: 'center',
    elevation: 2,
  },
  weatherIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  weatherDay: {
    fontWeight: 'bold',
    color: '#0F4C81',
    marginBottom: 4,
  },
  weatherTemp: {
    fontWeight: '700',
    color: '#2C7A7B',
  },
  weatherRain: {
    color: '#4A5568',
    marginTop: 4,
  },
  mainCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
  },
  mainImage: {
    width: '100%',
    height: 200,
  },
  mainContent: {
    padding: 18,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F4C81',
    marginBottom: 8,
  },
  mainText: {
    color: '#475569',
    lineHeight: 20,
  },
  bottomPrompt: {
    backgroundColor: '#e0f2fe',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  promptText: {
    color: '#0f172a',
    lineHeight: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 12,
    elevation: 3,
  },
  navButton: {
    alignItems: 'center',
    width: '48%',
  },
  navIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  navLabel: {
    color: '#0F4C81',
    fontWeight: '600',
  },
});
