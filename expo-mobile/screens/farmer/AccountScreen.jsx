import React from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView, Image
} from 'react-native';

export default function AccountScreen({ goTo, userEmail, setUserEmail, language = 'English' }) {
  const isFr = language === 'Français' || language === 'Francais';

  const handleSignOut = () => {
    if (setUserEmail) setUserEmail(null);
    goTo('welcome');
  };

  return (
    <View style={styles.container}>
      {/* ── Top Bar ─────────────────────────────────────────────────── */}
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => goTo('home')}>
          <Text style={styles.backBtnText}>←</Text>
        </Pressable>
        <View style={styles.topBarCenter}>
          <Text style={styles.topBarTitle}>
            {isFr ? 'Mon Compte Agriculteur' : 'My Farmer Account'}
          </Text>
          <Text style={styles.topBarSub}>
            {isFr ? 'Espace Personnel & Outils de Suivi' : 'Personal Hub & Farm Monitoring'}
          </Text>
        </View>
        <Pressable style={styles.homeBtn} onPress={() => goTo('home')}>
          <Text style={styles.homeBtnText}>🏠</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Farmer Profile Card ────────────────────────────────────── */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarEmoji}>👨‍🌾</Text>
            <View style={styles.avatarStatusDot} />
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.profileHeaderRow}>
              <Text style={styles.profileName} numberOfLines={1}>
                {userEmail ? userEmail.split('@')[0] : (isFr ? 'Planteur Agro-Vission' : 'Agro-Vission Farmer')}
              </Text>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>✓ {isFr ? 'ACTIF' : 'ACTIVE'}</Text>
              </View>
            </View>
            <Text style={styles.profileEmail} numberOfLines={1}>
              {userEmail || 'farmer@agrovission.cm'}
            </Text>
            <View style={styles.profileTagsRow}>
              <View style={styles.profileTag}>
                <Text style={styles.profileTagText}>📍 Cameroun (10 Régions)</Text>
              </View>
              <View style={styles.profileTag}>
                <Text style={styles.profileTagText}>🌱 Agriculteur Certifié</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Section Header ─────────────────────────────────────────── */}
        <View style={styles.sectionHeaderWrap}>
          <Text style={styles.sectionEyebrow}>
            {isFr ? 'MODULES DE GESTION AGRICOLE' : 'FARM MANAGEMENT MODULES'}
          </Text>
          <Text style={styles.sectionHeading}>
            {isFr ? 'Vos Outils de Suivi & Données' : 'Your Farm Monitoring Tools'}
          </Text>
          <Text style={styles.sectionSub}>
            {isFr
              ? 'Accédez à vos enquêtes terrain, vos rappels de traitement et votre historique de diagnostic :'
              : 'Access your field surveys, treatment reminders, and diagnosis history:'}
          </Text>
        </View>

        {/* ── Module 1: Field Survey (Enquête Parcelle) ──────────────── */}
        <Pressable style={styles.moduleCard} onPress={() => goTo('survey')}>
          <View style={[styles.moduleIconCircle, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
            <Text style={styles.moduleIconText}>📋</Text>
          </View>
          <View style={styles.moduleTextCol}>
            <View style={styles.moduleTitleRow}>
              <Text style={styles.moduleTitle}>
                {isFr ? 'Enquête Parcelle' : 'Field Survey'}
              </Text>
              <View style={[styles.moduleBadge, { backgroundColor: '#D1FAE5' }]}>
                <Text style={[styles.moduleBadgeText, { color: '#047857' }]}>
                  {isFr ? 'Terrain' : 'Field'}
                </Text>
              </View>
            </View>
            <Text style={styles.moduleDesc}>
              {isFr
                ? 'Enregistrer l\'humidité du sol, les stades phénologiques et les infestations de ravageurs sur vos parcelles.'
                : 'Log soil moisture, crop phenological stages, and pest infestations across your farm plots.'}
            </Text>
            <View style={styles.moduleFooterRow}>
              <Text style={[styles.moduleActionLabel, { color: '#059669' }]}>
                {isFr ? 'Ouvrir l\'enquête →' : 'Open survey →'}
              </Text>
            </View>
          </View>
        </Pressable>

        {/* ── Module 2: Alert Reminders (Rappels & Alertes) ──────────── */}
        <Pressable style={styles.moduleCard} onPress={() => goTo('notifications')}>
          <View style={[styles.moduleIconCircle, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
            <Text style={styles.moduleIconText}>🔔</Text>
          </View>
          <View style={styles.moduleTextCol}>
            <View style={styles.moduleTitleRow}>
              <Text style={styles.moduleTitle}>
                {isFr ? 'Alertes & Rappels' : 'Alerts & Reminders'}
              </Text>
              <View style={[styles.moduleBadge, { backgroundColor: '#DBEAFE' }]}>
                <Text style={[styles.moduleBadgeText, { color: '#1E40AF' }]}>
                  {isFr ? 'Rappels 2 Sem.' : '2-Week Alerts'}
                </Text>
              </View>
            </View>
            <Text style={styles.moduleDesc}>
              {isFr
                ? 'Suivre les rappels de contrôle de traitement à 2 semaines et recevoir les alertes phytosanitaires régionales.'
                : 'Track 2-week post-treatment follow-up reminders and receive regional phytosanitary alerts.'}
            </Text>
            <View style={styles.moduleFooterRow}>
              <Text style={[styles.moduleActionLabel, { color: '#2563EB' }]}>
                {isFr ? 'Consulter les alertes →' : 'Check alerts →'}
              </Text>
            </View>
          </View>
        </Pressable>

        {/* ── Module 3: History (Mon Historique) ─────────────────────── */}
        <Pressable style={styles.moduleCard} onPress={() => goTo('history')}>
          <View style={[styles.moduleIconCircle, { backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }]}>
            <Text style={styles.moduleIconText}>📜</Text>
          </View>
          <View style={styles.moduleTextCol}>
            <View style={styles.moduleTitleRow}>
              <Text style={styles.moduleTitle}>
                {isFr ? 'Mon Historique' : 'My History'}
              </Text>
              <View style={[styles.moduleBadge, { backgroundColor: '#FEF3C7' }]}>
                <Text style={[styles.moduleBadgeText, { color: '#B45309' }]}>
                  {isFr ? 'Archives' : 'Records'}
                </Text>
              </View>
            </View>
            <Text style={styles.moduleDesc}>
              {isFr
                ? 'Retrouver tous vos diagnostics foliaires passés, protocoles de traitement et recommandations agronomiques.'
                : 'Browse all your past leaf disease scans, treatment protocols, and agronomic recommendations.'}
            </Text>
            <View style={styles.moduleFooterRow}>
              <Text style={[styles.moduleActionLabel, { color: '#D97706' }]}>
                {isFr ? 'Voir l\'historique →' : 'View history →'}
              </Text>
            </View>
          </View>
        </Pressable>

        {/* ── Quick Tools Grid ────────────────────────────────────────── */}
        <View style={styles.quickGridHeader}>
          <Text style={styles.quickGridTitle}>
            ⚡ {isFr ? 'Actions Rapides' : 'Quick Actions'}
          </Text>
        </View>

        <View style={styles.quickGridRow}>
          <Pressable style={styles.quickGridBtn} onPress={() => goTo('diagnosis')}>
            <Text style={styles.quickGridBtnIcon}>📸</Text>
            <Text style={styles.quickGridBtnLabel}>
              {isFr ? 'Diagnostiquer' : 'Diagnose'}
            </Text>
          </Pressable>

          <Pressable style={styles.quickGridBtn} onPress={() => goTo('cropAdvice')}>
            <Text style={styles.quickGridBtnIcon}>🌾</Text>
            <Text style={styles.quickGridBtnLabel}>
              {isFr ? 'Recommandations' : 'Advice'}
            </Text>
          </Pressable>

          <Pressable style={styles.quickGridBtn} onPress={() => goTo('aiChat')}>
            <Text style={styles.quickGridBtnIcon}>💬</Text>
            <Text style={styles.quickGridBtnLabel}>
              {isFr ? 'Agronome IA' : 'AI Chat'}
            </Text>
          </Pressable>
        </View>

        {/* ── Sign Out Button ─────────────────────────────────────────── */}
        <Pressable style={styles.signOutBtn} onPress={handleSignOut}>
          <Text style={styles.signOutBtnText}>
            🚪 {isFr ? 'Se Déconnecter de la Session' : 'Sign Out of Account'}
          </Text>
        </Pressable>

        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>
            Agro-Vission Cameroon • {isFr ? 'Système Agricole Intelligent' : 'Smart Agricultural Ecosystem'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#334155',
  },
  topBarCenter: {
    flex: 1,
    marginLeft: 12,
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  topBarSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  homeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeBtnText: {
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 40,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  avatarWrap: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#ECFDF5',
    borderWidth: 2,
    borderColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginRight: 14,
  },
  avatarEmoji: {
    fontSize: 30,
  },
  avatarStatusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileInfo: {
    flex: 1,
  },
  profileHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
    marginRight: 6,
  },
  activeBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  activeBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  profileEmail: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 6,
  },
  profileTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  profileTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  profileTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#475569',
  },
  sectionHeaderWrap: {
    marginBottom: 16,
  },
  sectionEyebrow: {
    fontSize: 11,
    fontWeight: '800',
    color: '#15803D',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  moduleCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  moduleIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  moduleIconText: {
    fontSize: 22,
  },
  moduleTextCol: {
    flex: 1,
  },
  moduleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  moduleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  moduleBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  moduleDesc: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 8,
  },
  moduleFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleActionLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  quickGridHeader: {
    marginTop: 10,
    marginBottom: 10,
  },
  quickGridTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#334155',
  },
  quickGridRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  quickGridBtn: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  quickGridBtnIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  quickGridBtnLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  signOutBtn: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  signOutBtnText: {
    color: '#991B1B',
    fontWeight: '800',
    fontSize: 14,
  },
  footerNote: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerNoteText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
});
