import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { getT } from '../../src/translations';

export default function AdminDashboard({ goTo, language = 'English' }) {
  const t = getT(language);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AGROVISSION {language === 'Français' ? 'Administration' : 'Admin Control'}</Text>
        <Text style={styles.adminBadge}>Super Admin</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>
            {language === 'Français' ? 'Bienvenue, Ivan Miyoupo' : 'Welcome, Ivan Miyoupo'}
          </Text>
          <Text style={styles.welcomeText}>
            {language === 'Français' 
              ? 'Le système AGROVISSION fonctionne parfaitement.' 
              : 'AGROVISSION System is operating perfectly.'}
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>1,204</Text>
            <Text style={styles.statLabel}>{language === 'Français' ? 'Agriculteurs Actifs' : 'Active Farmers'}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8,492</Text>
            <Text style={styles.statLabel}>{language === 'Français' ? 'Diagnostics IA' : 'AI Diagnoses'}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>10</Text>
            <Text style={styles.statLabel}>{language === 'Français' ? 'Régions Actives' : 'Active Regions'}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>99%</Text>
            <Text style={styles.statLabel}>{language === 'Français' ? 'Disponibilité du Serveur' : 'Server Uptime'}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{language === 'Français' ? 'Contrôle Système' : 'System Control'}</Text>

        <Pressable style={styles.actionButton}>
          <Text style={styles.actionIcon}>📢</Text>
          <Text style={styles.actionText}>{language === 'Français' ? 'Envoyer une Notification aux Agriculteurs' : 'Push Notification to Farmers'}</Text>
        </Pressable>

        <Pressable style={styles.actionButton}>
          <Text style={styles.actionIcon}>👥</Text>
          <Text style={styles.actionText}>{language === 'Français' ? 'Gérer les Utilisateurs' : 'Manage Users & Access'}</Text>
        </Pressable>

        <Pressable style={styles.actionButton}>
          <Text style={styles.actionIcon}>🧠</Text>
          <Text style={styles.actionText}>{language === 'Français' ? 'Mettre à jour les Modèles TensorFlow' : 'Update TensorFlow Models'}</Text>
        </Pressable>

        <Pressable style={[styles.actionButton, styles.logoutButton]} onPress={() => goTo('welcome')}>
          <Text style={styles.actionIcon}>🚪</Text>
          <Text style={[styles.actionText, { color: '#DC2626' }]}>{language === 'Français' ? 'Déconnexion' : 'Logout'}</Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#0F4C81', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#ffffff' },
  adminBadge: { backgroundColor: '#EAB308', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, fontSize: 12, fontWeight: 'bold', color: '#ffffff' },
  
  content: { padding: 16 },
  welcomeCard: { backgroundColor: '#ffffff', padding: 20, borderRadius: 16, marginBottom: 20, elevation: 2 },
  welcomeTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 4 },
  welcomeText: { fontSize: 14, color: '#64748B' },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  statCard: { width: '48%', backgroundColor: '#ffffff', padding: 16, borderRadius: 16, marginBottom: 16, alignItems: 'center', elevation: 2 },
  statValue: { fontSize: 24, fontWeight: '900', color: '#2E7D32', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#64748B', fontWeight: '600', textAlign: 'center' },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 12 },
  
  actionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', padding: 16, borderRadius: 14, marginBottom: 12, elevation: 1 },
  actionIcon: { fontSize: 20, marginRight: 12 },
  actionText: { fontSize: 14, fontWeight: 'bold', color: '#1E293B' },
  
  logoutButton: { marginTop: 12, borderWidth: 1, borderColor: '#FCA5A5', backgroundColor: '#FEF2F2' },
});
