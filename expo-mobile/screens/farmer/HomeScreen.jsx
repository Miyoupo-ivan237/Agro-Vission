import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Image } from 'react-native';

export default function HomeScreen({ goTo, userEmail }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Top Banner */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <View>
            <Text style={styles.title}>Agro-Vission AI</Text>
            <Text style={styles.subtitle}>{userEmail ? `Signed in as ${userEmail}` : 'Farmer & Extension Portal'}</Text>
          </View>
        </View>
        <Pressable style={styles.welcomeBtn} onPress={() => goTo('welcome')}>
          <Text style={styles.welcomeBtnText}>↩️ Home</Text>
        </Pressable>
      </View>

      {/* Main Feature 1: AI Pathology Diagnosis */}
      <View style={styles.heroCard}>
        <View style={styles.badgeRow}>
          <Text style={styles.heroBadge}>🔬 FEATURE #1</Text>
          <Text style={styles.offlineTag}>⚡ Offline AI Ready</Text>
        </View>
        <Text style={styles.heroTitle}>AI Crop Disease Diagnostics</Text>
        <Text style={styles.heroSub}>
          Take or select a photo of cassava, maize, tomato, cocoa, or banana to detect diseases and get treatment plans instantly.
        </Text>
        <Pressable style={styles.primaryButton} onPress={() => goTo('diagnosis')}>
          <Text style={styles.primaryButtonText}>📸 Start AI Diagnosis</Text>
        </Pressable>
      </View>

      {/* 2x2 Feature Grid */}
      <View style={styles.grid}>
        {/* Feature 2: Crop Advice */}
        <Pressable style={styles.gridCard} onPress={() => goTo('cropAdvice')}>
          <Text style={styles.cardIcon}>🌾</Text>
          <Text style={styles.gridTitle}>Crop Advice</Text>
          <Text style={styles.gridText}>Agro-ecological planting & fertilizer schedules for Cameroon</Text>
        </Pressable>

        {/* Feature 3: AI Agronomist Chat */}
        <Pressable style={styles.gridCard} onPress={() => goTo('aiChat')}>
          <Text style={styles.cardIcon}>🤖</Text>
          <Text style={styles.gridTitle}>AI Agronomist</Text>
          <Text style={styles.gridText}>Ask questions to your local Ollama LLM agronomist in English or French</Text>
        </Pressable>

        {/* Feature 4: Field Survey */}
        <Pressable style={styles.gridCard} onPress={() => goTo('survey')}>
          <Text style={styles.cardIcon}>📋</Text>
          <Text style={styles.gridTitle}>Field Survey</Text>
          <Text style={styles.gridText}>Log field moisture, crop growth stages, and pest infestations</Text>
        </Pressable>

        {/* Feature 5: Notifications */}
        <Pressable style={styles.gridCard} onPress={() => goTo('notifications')}>
          <Text style={styles.cardIcon}>🔔</Text>
          <Text style={styles.gridTitle}>Notifications</Text>
          <Text style={styles.gridText}>View diagnosis results and system milestone alerts</Text>
        </Pressable>
      </View>

      {/* Admin Quick Action */}
      <Pressable style={styles.adminCard} onPress={() => goTo('admin')}>
        <Text style={styles.adminTitle}>🔑 Admin & Analytics Dashboard</Text>
        <Text style={styles.adminText}>Manage farmer accounts, database logs, and model statuses</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  welcomeBtn: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  welcomeBtnText: {
    color: '#1B5E20',
    fontWeight: 'bold',
    fontSize: 12,
  },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  heroBadge: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1B5E20',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  offlineTag: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#D97706',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 6,
  },
  heroSub: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#1B5E20',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 4,
  },
  gridText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  adminCard: {
    backgroundColor: '#1E293B',
    borderRadius: 18,
    padding: 18,
    marginTop: 10,
  },
  adminTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#38BDF8',
    marginBottom: 4,
  },
  adminText: {
    fontSize: 12,
    color: '#94A3B8',
  },
});
