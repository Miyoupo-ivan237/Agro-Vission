import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { getDiagnosisHistory, getRecommendationHistory } from '../../src/api';

export default function HistoryScreen({ goTo }) {
  const [tab, setTab] = useState('diagnoses');
  const [diagnoses, setDiagnoses] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      const diagList = await getDiagnosisHistory();
      const recList = await getRecommendationHistory();
      setDiagnoses(diagList || []);
      setRecommendations(recList || []);
    }
    loadHistory();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📜 Account & History</Text>
      <Text style={styles.subtitle}>View your offline & synchronized agricultural records.</Text>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <Pressable
          style={[styles.tab, tab === 'diagnoses' && styles.tabActive]}
          onPress={() => setTab('diagnoses')}
        >
          <Text style={[styles.tabText, tab === 'diagnoses' && styles.tabTextActive]}>
            🌿 Diagnoses ({diagnoses.length})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, tab === 'recommendations' && styles.tabActive]}
          onPress={() => setTab('recommendations')}
        >
          <Text style={[styles.tabText, tab === 'recommendations' && styles.tabTextActive]}>
            🌱 Advice ({recommendations.length})
          </Text>
        </Pressable>
      </View>

      {tab === 'diagnoses' ? (
        <View style={styles.listSection}>
          {diagnoses.length === 0 ? (
            <Text style={styles.emptyText}>No diagnoses recorded yet.</Text>
          ) : (
            diagnoses.map((d, index) => (
              <View key={d.id || index} style={styles.itemCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.itemTitle}>{d.diseaseName || d.name}</Text>
                  <Text style={styles.cropBadge}>{d.crop}</Text>
                </View>
                <Text style={styles.symptomsText}>Symptoms: {d.symptoms}</Text>
                {d.treatment ? (
                  <Text style={styles.treatmentText}>Treatment: {d.treatment}</Text>
                ) : null}
                <Text style={styles.timestamp}>
                  {new Date(d.createdAt || d.diagnosedAt || Date.now()).toLocaleDateString()} • {d.source || 'Offline AI'}
                </Text>
              </View>
            ))
          )}
        </View>
      ) : (
        <View style={styles.listSection}>
          {recommendations.length === 0 ? (
            <Text style={styles.emptyText}>No crop recommendations recorded yet.</Text>
          ) : (
            recommendations.map((r, index) => (
              <View key={r.id || index} style={styles.itemCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.itemTitle}>Crop: {r.primaryCrop}</Text>
                  <Text style={styles.cropBadge}>{r.season || 'Season'}</Text>
                </View>
                <Text style={styles.symptomsText}>Location / Soil: {r.location} • {r.soilCondition}</Text>
                {r.actionPlan ? (
                  <Text style={styles.treatmentText}>Plan: {r.actionPlan}</Text>
                ) : null}
                <Text style={styles.timestamp}>
                  {new Date(r.createdAt || r.generatedAt || Date.now()).toLocaleDateString()} • {r.source || 'Offline Agro-Engine'}
                </Text>
              </View>
            ))
          )}
        </View>
      )}

      <Pressable style={styles.primaryButton} onPress={() => goTo('profile')}>
        <Text style={styles.primaryButtonText}>👨‍🌾 Edit Farmer Profile</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => goTo('home')}>
        <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#F1F8E9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 4,
  },
  subtitle: {
    color: '#2E7D32',
    marginBottom: 16,
    fontSize: 14,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  tabText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 13,
  },
  tabTextActive: {
    color: '#ffffff',
  },
  listSection: {
    marginBottom: 20,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D32',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    flex: 1,
  },
  cropBadge: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
    fontWeight: '600',
    fontSize: 11,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  symptomsText: {
    color: '#424242',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  treatmentText: {
    color: '#2E7D32',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  timestamp: {
    color: '#757575',
    fontSize: 11,
    marginTop: 4,
  },
  emptyText: {
    color: '#757575',
    textAlign: 'center',
    marginVertical: 20,
  },
  primaryButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#2E7D32',
    borderWidth: 1,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
});
