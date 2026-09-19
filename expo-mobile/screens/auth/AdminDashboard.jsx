// screens/auth/AdminDashboard.jsx
// Full Admin Dashboard — live stats, broadcast alerts, farmer list, recent diagnoses
// 100% local — no push tokens, no remote API dependency

import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  TextInput, Alert, ActivityIndicator, RefreshControl,
} from 'react-native';
import {
  getAllUsers,
  getCurrentUser,
  logout,
  blockUser,
  unblockUser,
  deleteUser,
  fetchRemoteUsers
} from '../../services/authService';
import {
  subscribeToNotifications,
  addNotification,
  markAllNotificationsAsRead,
} from '../../services/notificationService';

function fmtDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('fr-CM', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch (_) {
    return iso.slice(0, 10);
  }
}

function fmtTime(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString('fr-CM', { hour: '2-digit', minute: '2-digit' });
  } catch (_) {
    return '';
  }
}

function countRegions(users) {
  const regions = new Set();
  users.forEach(u => {
    if (u.location) {
      const parts = u.location.split(',');
      if (parts.length > 1) regions.add(parts[1].trim());
    }
  });
  return regions.size || 1;
}

export default function AdminDashboard({ goTo, language = 'English' }) {
  const isFr = language === 'Francais' || language === 'Français';

  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [broadcastText, setBroadcastText] = useState('');
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentAdmin, setCurrentAdmin] = useState(null);

  const loadData = useCallback(async () => {
    try {
      const updated = await fetchRemoteUsers();
      setUsers(updated);
    } catch (_) {
      setUsers(getAllUsers());
    }
    setCurrentAdmin(getCurrentUser());
  }, []);

  useEffect(() => {
    loadData();
    const unsub = subscribeToNotifications(notifs => setNotifications(notifs));
    return unsub;
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  async function handleToggleBlock(user) {
    const isCurrentlyBlocked = !!user.isBlocked;
    const actionName = isCurrentlyBlocked
      ? (isFr ? 'Débloquer' : 'Unblock')
      : (isFr ? 'Bloquer' : 'Block');

    Alert.alert(
      `${actionName} ${user.name}?`,
      isFr
        ? (isCurrentlyBlocked
            ? `Voulez-vous réactiver l'accès pour ${user.name} ?`
            : `Voulez-vous bloquer l'accès pour ${user.name} ?`)
        : (isCurrentlyBlocked
            ? `Allow ${user.name} to connect and use the app again?`
            : `Block ${user.name} from accessing the application?`),
      [
        { text: isFr ? 'Annuler' : 'Cancel', style: 'cancel' },
        {
          text: actionName,
          style: isCurrentlyBlocked ? 'default' : 'destructive',
          onPress: async () => {
            try {
              if (isCurrentlyBlocked) {
                await unblockUser(user.id);
              } else {
                await blockUser(user.id);
              }
              await loadData();
              Alert.alert(
                isFr ? 'Statut mis à jour' : 'Status Updated',
                isFr
                  ? `L'utilisateur ${user.name} a été ${isCurrentlyBlocked ? 'débloqué' : 'bloqué'}.`
                  : `User ${user.name} has been ${isCurrentlyBlocked ? 'unblocked' : 'blocked'}.`
              );
            } catch (err) {
              Alert.alert(isFr ? 'Erreur' : 'Error', err.message);
            }
          }
        }
      ]
    );
  }

  async function handleDeleteUser(user) {
    Alert.alert(
      isFr ? `Supprimer ${user.name} ?` : `Delete ${user.name}?`,
      isFr
        ? `Êtes-vous sûr de vouloir supprimer définitivement le compte de ${user.name} ? Cette action est irréversible.`
        : `Are you sure you want to permanently delete the account of ${user.name}? This cannot be undone.`,
      [
        { text: isFr ? 'Annuler' : 'Cancel', style: 'cancel' },
        {
          text: isFr ? 'Supprimer' : 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUser(user.id);
              await loadData();
              Alert.alert(
                isFr ? 'Compte supprimé' : 'Account Deleted',
                isFr
                  ? `Le compte de ${user.name} a été supprimé.`
                  : `Account of ${user.name} has been deleted.`
              );
            } catch (err) {
              Alert.alert(isFr ? 'Erreur' : 'Error', err.message);
            }
          }
        }
      ]
    );
  }

  const farmers = users.filter(u => u.role === 'farmer');
  const admins = users.filter(u => u.role === 'admin');
  const diagnosisNotifs = notifications.filter(n =>
    n.type === 'diagnosis_ready' || n.type === 'recommendation_ready'
  );
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const activeRegions = countRegions(farmers);
  const adminName = currentAdmin?.name || 'Ivan Miyoupo';

  async function handleBroadcast() {
    const msg = broadcastText.trim();
    if (!msg) {
      Alert.alert(
        isFr ? 'Message vide' : 'Empty Message',
        isFr ? 'Veuillez saisir un message avant d\'envoyer.' : 'Please enter a message before sending.'
      );
      return;
    }
    setSending(true);
    try {
      await addNotification({
        type: 'admin_broadcast',
        title: isFr ? 'Message Admin' : 'Admin Broadcast',
        message: msg,
        priority: 'high',
        fireSystemAlert: true,
      });
      setBroadcastText('');
      Alert.alert(
        isFr ? 'Envoye' : 'Sent',
        isFr
          ? 'Votre message a ete diffuse a tous les utilisateurs.'
          : 'Your message has been broadcast to all users.'
      );
    } catch (err) {
      Alert.alert(isFr ? 'Erreur' : 'Error', String(err.message));
    } finally {
      setSending(false);
    }
  }

  function handleLogout() {
    Alert.alert(
      isFr ? 'Deconnexion' : 'Logout',
      isFr ? 'Voulez-vous vraiment vous deconnecter ?' : 'Are you sure you want to log out?',
      [
        { text: isFr ? 'Annuler' : 'Cancel', style: 'cancel' },
        {
          text: isFr ? 'Deconnexion' : 'Logout',
          style: 'destructive',
          onPress: () => { logout(); goTo('welcome'); },
        },
      ]
    );
  }

  const TABS = [
    { key: 'overview', icon: '📊', en: 'Overview',      fr: 'Vue'          },
    { key: 'farmers',  icon: '👥', en: 'Farmers',       fr: 'Agriculteurs' },
    { key: 'alerts',   icon: '📢', en: 'Alerts',        fr: 'Alertes'      },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>
            {isFr ? 'Administration' : 'Admin Panel'}
          </Text>
          <Text style={styles.headerSub}>AGROVISSION</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>Super Admin</Text>
          </View>
          {unreadCount > 0 && (
            <View style={styles.notifBadge}>
              <Text style={styles.notifBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {TABS.map(tab => (
          <Pressable
            key={tab.key}
            style={[styles.tabItem, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {isFr ? tab.fr : tab.en}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2E7D32']} />
        }
      >
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeEmoji}>👨‍💼</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.welcomeTitle}>
                  {isFr ? 'Bienvenue, ' : 'Welcome, '}{adminName}
                </Text>
                <Text style={styles.welcomeSub}>
                  {new Date().toLocaleDateString('fr-FR', {
                    weekday: 'long', day: 'numeric', month: 'long',
                  })}
                </Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>
              {isFr ? 'Statistiques Systeme' : 'System Statistics'}
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statCardIcon}>🌾</Text>
                <Text style={[styles.statValue, { color: '#2E7D32' }]}>{farmers.length}</Text>
                <Text style={styles.statLabel}>{isFr ? 'Agriculteurs' : 'Farmers'}</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statCardIcon}>🔬</Text>
                <Text style={[styles.statValue, { color: '#0F4C81' }]}>{diagnosisNotifs.length}</Text>
                <Text style={styles.statLabel}>{isFr ? 'Diagnostics IA' : 'AI Diagnoses'}</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statCardIcon}>🗺️</Text>
                <Text style={[styles.statValue, { color: '#B45309' }]}>{activeRegions}</Text>
                <Text style={styles.statLabel}>{isFr ? 'Regions' : 'Regions'}</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statCardIcon}>🔔</Text>
                <Text style={[styles.statValue, { color: '#7C3AED' }]}>{notifications.length}</Text>
                <Text style={styles.statLabel}>Notifications</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>
              {isFr ? 'Statut Systeme IA' : 'AI System Status'}
            </Text>
            <View style={styles.statusCard}>
              <View style={styles.statusRow}>
                <Text style={styles.statusDot}>🟢</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.statusLabel}>{isFr ? 'Moteur IA Hors Ligne' : 'Offline AI Engine'}</Text>
                  <Text style={[styles.statusDetail, { color: '#16A34A' }]}>
                    {isFr ? '9 cultures, 40+ maladies' : '9 crops, 40+ diseases'}
                  </Text>
                </View>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.statusDot}>🟢</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.statusLabel}>{isFr ? 'Base locale' : 'Local Database'}</Text>
                  <Text style={[styles.statusDetail, { color: '#16A34A' }]}>
                    {users.length} {isFr ? 'utilisateurs' : 'users'}
                  </Text>
                </View>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.statusDot}>🟢</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.statusLabel}>Notifications</Text>
                  <Text style={[styles.statusDetail, { color: '#16A34A' }]}>
                    {unreadCount} {isFr ? 'non lu(s)' : 'unread'}
                  </Text>
                </View>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.statusDot}>🟡</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.statusLabel}>{isFr ? 'Serveur Backend' : 'Backend Server'}</Text>
                  <Text style={[styles.statusDetail, { color: '#D97706' }]}>
                    {isFr ? 'Hors ligne — 192.168.42.199:5000' : 'Offline — 192.168.42.199:5000'}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>
              {isFr ? 'Derniers Diagnostics' : 'Recent Diagnoses'}
            </Text>
            {diagnosisNotifs.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>
                  {isFr ? 'Aucun diagnostic encore.' : 'No diagnoses yet.'}
                </Text>
              </View>
            ) : (
              diagnosisNotifs.slice(0, 6).map(n => (
                <View key={n.id} style={styles.logRow}>
                  <Text style={styles.logIcon}>
                    {n.type === 'diagnosis_ready' ? '🔬' : '🌾'}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.logTitle}>{n.title}</Text>
                    <Text style={styles.logMsg} numberOfLines={2}>{n.message}</Text>
                  </View>
                  <Text style={styles.logTime}>{fmtTime(n.createdAt)}</Text>
                </View>
              ))
            )}

            <Text style={styles.sectionTitle}>
              {isFr ? 'Actions Rapides' : 'Quick Actions'}
            </Text>
            <Pressable style={styles.actionBtn} onPress={() => setActiveTab('alerts')}>
              <Text style={styles.actionIcon}>📢</Text>
              <Text style={styles.actionLabel}>
                {isFr ? 'Envoyer une alerte' : 'Send alert to farmers'}
              </Text>
              <Text style={styles.actionArrow}>›</Text>
            </Pressable>
            <Pressable style={styles.actionBtn} onPress={() => setActiveTab('farmers')}>
              <Text style={styles.actionIcon}>👥</Text>
              <Text style={styles.actionLabel}>
                {isFr ? 'Voir les agriculteurs' : 'View registered farmers'}
              </Text>
              <Text style={styles.actionArrow}>›</Text>
            </Pressable>
            <Pressable style={styles.actionBtn} onPress={() => markAllNotificationsAsRead()}>
              <Text style={styles.actionIcon}>✅</Text>
              <Text style={styles.actionLabel}>
                {isFr ? 'Tout marquer comme lu' : 'Mark all notifications as read'}
              </Text>
              <Text style={styles.actionArrow}>›</Text>
            </Pressable>
            <Pressable style={styles.actionBtn} onPress={() => goTo('diagnosis')}>
              <Text style={styles.actionIcon}>🌿</Text>
              <Text style={styles.actionLabel}>
                {isFr ? 'Tester le diagnostic IA' : 'Test AI diagnosis'}
              </Text>
              <Text style={styles.actionArrow}>›</Text>
            </Pressable>

            <Pressable style={styles.logoutBtn} onPress={handleLogout}>
              <Text style={styles.logoutIcon}>🚪</Text>
              <Text style={styles.logoutLabel}>
                {isFr ? 'Se deconnecter' : 'Logout'}
              </Text>
            </Pressable>
            <View style={{ height: 40 }} />
          </>
        )}

        {/* FARMERS TAB */}
        {activeTab === 'farmers' && (
          <>
            <View style={styles.tabHeader}>
              <Text style={styles.tabHeaderTitle}>
                {isFr ? 'Agriculteurs' : 'Farmers'} ({farmers.length})
              </Text>
              <Text style={styles.tabHeaderSub}>
                + {admins.length} admin(s)
              </Text>
            </View>

            {farmers.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>
                  {isFr ? 'Aucun agriculteur inscrit.' : 'No farmers registered yet.'}
                </Text>
              </View>
            ) : (
              farmers.map(u => (
                <View key={u.id} style={[styles.farmerCard, u.isBlocked && styles.farmerCardBlocked]}>
                  <View style={[styles.farmerAvatar, u.isBlocked && { backgroundColor: '#EF4444' }]}>
                    <Text style={styles.farmerAvatarText}>
                      {(u.name || '?')[0].toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                      <Text style={styles.farmerName}>{u.name}</Text>
                      <View style={[styles.userStatusBadge, u.isBlocked ? styles.userStatusBlocked : styles.userStatusActive]}>
                        <Text style={[styles.userStatusText, u.isBlocked ? styles.userStatusTextBlocked : styles.userStatusTextActive]}>
                          {u.isBlocked ? (isFr ? '🚫 BLOQUÉ' : '🚫 BLOCKED') : (isFr ? '✅ ACTIF' : '✅ ACTIVE')}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.farmerDetail}>{u.email}</Text>
                    {!!u.phone && <Text style={styles.farmerDetail}>{u.phone}</Text>}
                    {!!u.location && <Text style={styles.farmerDetail}>{u.location}</Text>}
                    <Text style={styles.farmerDate}>
                      {isFr ? 'Inscrit le' : 'Joined'} {fmtDate(u.registeredAt || u.createdAt)}
                    </Text>

                    {/* Admin Action Buttons: Block/Unblock & Delete */}
                    <View style={styles.userActionsRow}>
                      <Pressable
                        style={[styles.userActionBtn, u.isBlocked ? styles.unblockBtn : styles.blockBtn]}
                        onPress={() => handleToggleBlock(u)}
                      >
                        <Text style={[styles.userActionBtnText, u.isBlocked ? styles.unblockBtnText : styles.blockBtnText]}>
                          {u.isBlocked ? (isFr ? '🔓 Débloquer' : '🔓 Unblock') : (isFr ? '🚫 Bloquer' : '🚫 Block')}
                        </Text>
                      </Pressable>

                      <Pressable
                        style={[styles.userActionBtn, styles.deleteBtn]}
                        onPress={() => handleDeleteUser(u)}
                      >
                        <Text style={[styles.userActionBtnText, styles.deleteBtnText]}>
                          🗑️ {isFr ? 'Supprimer' : 'Delete'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))
            )}

            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
              {isFr ? 'Administrateurs' : 'Administrators'}
            </Text>
            {admins.map(u => (
              <View
                key={u.id}
                style={[styles.farmerCard, { borderLeftWidth: 4, borderLeftColor: '#EAB308' }]}
              >
                <View style={[styles.farmerAvatar, { backgroundColor: '#EAB308' }]}>
                  <Text style={styles.farmerAvatarText}>
                    {(u.name || '?')[0].toUpperCase()}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.farmerName}>{u.name}</Text>
                  <Text style={styles.farmerDetail}>{u.email}</Text>
                  {!!u.phone && <Text style={styles.farmerDetail}>{u.phone}</Text>}
                  {!!u.location && <Text style={styles.farmerDetail}>{u.location}</Text>}
                </View>
                <View style={[styles.farmerBadge, { backgroundColor: '#FEF9C3' }]}>
                  <Text style={[styles.farmerBadgeText, { color: '#92400E' }]}>Admin</Text>
                </View>
              </View>
            ))}
            <View style={{ height: 40 }} />
          </>
        )}

        {/* ALERTS TAB */}
        {activeTab === 'alerts' && (
          <>
            <View style={styles.broadcastCard}>
              <Text style={styles.broadcastTitle}>
                {isFr ? 'Envoyer une Alerte' : 'Broadcast Alert to Farmers'}
              </Text>
              <Text style={styles.broadcastSub}>
                {isFr
                  ? 'Le message apparaitra dans le centre de notifications.'
                  : 'Message will appear in the notification center for all users.'}
              </Text>
              <TextInput
                style={styles.broadcastInput}
                multiline
                numberOfLines={4}
                placeholder={
                  isFr
                    ? 'Saisir votre message...'
                    : 'Type your message... (e.g. Drought alert in North Region)'
                }
                placeholderTextColor="#94A3B8"
                value={broadcastText}
                onChangeText={setBroadcastText}
                textAlignVertical="top"
              />
              <Pressable
                style={[
                  styles.sendBtn,
                  (!broadcastText.trim() || sending) && styles.sendBtnDisabled,
                ]}
                onPress={handleBroadcast}
                disabled={!broadcastText.trim() || sending}
              >
                {sending ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.sendBtnText}>
                    {isFr ? 'Envoyer a tous' : 'Send to All'}
                  </Text>
                )}
              </Pressable>
            </View>

            <View style={styles.tabHeader}>
              <Text style={styles.tabHeaderTitle}>
                {isFr ? 'Notifications' : 'All Notifications'} ({notifications.length})
              </Text>
              {unreadCount > 0 && (
                <Pressable onPress={() => markAllNotificationsAsRead()}>
                  <Text style={styles.markAllBtn}>
                    {isFr ? 'Tout marquer lu' : 'Mark all read'}
                  </Text>
                </Pressable>
              )}
            </View>

            {notifications.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>
                  {isFr ? 'Aucune notification.' : 'No notifications yet.'}
                </Text>
              </View>
            ) : (
              notifications.map(n => (
                <View
                  key={n.id}
                  style={[styles.notifRow, !n.isRead && styles.notifRowUnread]}
                >
                  <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: n.isRead ? '#CBD5E1' : '#0F4C81',
                    marginTop: 6,
                  }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.notifTitle}>{n.title}</Text>
                    <Text style={styles.notifMsg}>{n.message}</Text>
                    <Text style={styles.notifDate}>
                      {fmtDate(n.createdAt)} {fmtTime(n.createdAt)}
                    </Text>
                  </View>
                  <View style={{
                    backgroundColor:
                      n.type === 'diagnosis_ready' ? '#ECFDF5'
                        : n.type === 'admin_broadcast' ? '#FFF7ED'
                        : '#F1F5F9',
                    paddingHorizontal: 7,
                    paddingVertical: 2,
                    borderRadius: 8,
                    alignSelf: 'flex-start',
                  }}>
                    <Text style={styles.notifTypeText}>
                      {n.type.replace(/_/g, ' ')}
                    </Text>
                  </View>
                </View>
              ))
            )}
            <View style={{ height: 40 }} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },

  header: {
    backgroundColor: '#0F4C81',
    paddingTop: 52,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle:   { fontSize: 22, fontWeight: '900', color: '#FFFFFF' },
  headerSub:     { fontSize: 12, color: '#93C5FD', fontWeight: '600', marginTop: 2 },
  headerRight:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  adminBadge:    { backgroundColor: '#EAB308', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  adminBadgeText:{ color: '#fff', fontSize: 11, fontWeight: '800' },
  notifBadge:    { backgroundColor: '#DC2626', width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  notifBadgeText:{ color: '#fff', fontSize: 11, fontWeight: '800' },

  tabBar:        { flexDirection: 'row', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', elevation: 2 },
  tabItem:       { flex: 1, alignItems: 'center', paddingVertical: 10 },
  tabActive:     { borderBottomWidth: 3, borderBottomColor: '#2E7D32' },
  tabIcon:       { fontSize: 18 },
  tabLabel:      { fontSize: 11, color: '#64748B', fontWeight: '600', marginTop: 2 },
  tabLabelActive:{ color: '#2E7D32' },

  scroll: { flex: 1, paddingHorizontal: 16 },

  welcomeCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F4C81',
    borderRadius: 16, padding: 18, marginTop: 16, marginBottom: 20, gap: 14,
  },
  welcomeEmoji: { fontSize: 40 },
  welcomeTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  welcomeSub:   { fontSize: 12, color: '#93C5FD', marginTop: 2 },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 10 },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  statCard: {
    width: '48%', backgroundColor: '#FFFFFF', borderRadius: 16,
    padding: 16, alignItems: 'center', marginBottom: 12, elevation: 2,
  },
  statCardIcon: { fontSize: 24, marginBottom: 4 },
  statValue:    { fontSize: 26, fontWeight: '900', marginBottom: 2 },
  statLabel:    { fontSize: 11, color: '#64748B', fontWeight: '600', textAlign: 'center' },

  statusCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 20, elevation: 2 },
  statusRow:  { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  statusDot:  { fontSize: 14, marginRight: 10, marginTop: 1 },
  statusLabel:{ fontSize: 13, fontWeight: '700', color: '#1E293B' },
  statusDetail:{ fontSize: 11, marginTop: 1 },

  logRow: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 12, marginBottom: 8, elevation: 1, gap: 10,
  },
  logIcon:  { fontSize: 22, marginTop: 2 },
  logTitle: { fontSize: 13, fontWeight: '700', color: '#1E293B' },
  logMsg:   { fontSize: 12, color: '#64748B', marginTop: 2 },
  logTime:  { fontSize: 11, color: '#94A3B8', marginTop: 2 },

  actionBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderRadius: 14, padding: 14, marginBottom: 10, elevation: 1, gap: 12,
  },
  actionIcon:  { fontSize: 20 },
  actionLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: '#1E293B' },
  actionArrow: { fontSize: 18, color: '#94A3B8' },

  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#FEF2F2', borderRadius: 14, padding: 14, marginTop: 16,
    borderWidth: 1, borderColor: '#FCA5A5', gap: 10,
  },
  logoutIcon:  { fontSize: 20 },
  logoutLabel: { fontSize: 15, fontWeight: '800', color: '#DC2626' },

  tabHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 16, marginBottom: 10,
  },
  tabHeaderTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  tabHeaderSub:   { fontSize: 12, color: '#64748B' },
  markAllBtn:     { fontSize: 12, color: '#0F4C81', fontWeight: '700' },

  emptyCard: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 24, alignItems: 'center', marginBottom: 12 },
  emptyText: { fontSize: 13, color: '#94A3B8', textAlign: 'center' },

  farmerCard: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#FFFFFF',
    borderRadius: 16, padding: 14, marginBottom: 10, elevation: 2, gap: 12,
  },
  farmerAvatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#2E7D32',
    alignItems: 'center', justifyContent: 'center',
  },
  farmerAvatarText: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
  farmerName:   { fontSize: 14, fontWeight: '800', color: '#1E293B', marginBottom: 2 },
  farmerDetail: { fontSize: 12, color: '#64748B', marginBottom: 1 },
  farmerDate:   { fontSize: 11, color: '#94A3B8', marginTop: 4 },
  farmerBadge:  { backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, alignSelf: 'flex-start' },
  farmerBadgeText: { fontSize: 10, fontWeight: '700', color: '#166534' },

  farmerCardBlocked: {
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
    backgroundColor: '#FFF5F5',
  },
  userStatusBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  userStatusActive: {
    backgroundColor: '#DCFCE7',
  },
  userStatusBlocked: {
    backgroundColor: '#FEE2E2',
  },
  userStatusText: {
    fontSize: 9,
    fontWeight: '800',
  },
  userStatusTextActive: {
    color: '#16A34A',
  },
  userStatusTextBlocked: {
    color: '#DC2626',
  },
  userActionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  userActionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockBtn: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  blockBtnText: {
    color: '#92400E',
    fontSize: 11,
    fontWeight: '800',
  },
  unblockBtn: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  unblockBtnText: {
    color: '#166534',
    fontSize: 11,
    fontWeight: '800',
  },
  deleteBtn: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  deleteBtnText: {
    color: '#991B1B',
    fontSize: 11,
    fontWeight: '800',
  },

  broadcastCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, marginTop: 16, marginBottom: 20,
    elevation: 3, borderTopWidth: 4, borderTopColor: '#0F4C81',
  },
  broadcastTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  broadcastSub:   { fontSize: 12, color: '#64748B', marginBottom: 14 },
  broadcastInput: {
    backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12,
    padding: 12, fontSize: 14, color: '#1E293B', minHeight: 100, marginBottom: 14,
  },
  sendBtn:         { backgroundColor: '#0F4C81', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  sendBtnDisabled: { backgroundColor: '#94A3B8' },
  sendBtnText:     { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },

  notifRow: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 12, marginBottom: 8, elevation: 1, gap: 10,
  },
  notifRowUnread: { borderLeftWidth: 4, borderLeftColor: '#0F4C81', backgroundColor: '#EFF6FF' },
  notifTitle:    { fontSize: 13, fontWeight: '700', color: '#1E293B' },
  notifMsg:      { fontSize: 12, color: '#475569', marginTop: 2 },
  notifDate:     { fontSize: 10, color: '#94A3B8', marginTop: 4 },
  notifTypeText: { fontSize: 9, fontWeight: '700', color: '#475569' },
});
