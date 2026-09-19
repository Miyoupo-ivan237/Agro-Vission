// expo-mobile/screens/notifications/NotificationCenterScreen.jsx
// 100% Local — reads from in-memory notificationService, no server/push tokens

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import {
  subscribeToNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadCount,
} from '../../services/notificationService';
import { getT } from '../../src/translations';

const NOTIFICATION_ICONS = {
  diagnosis_ready:     '🔬',
  recommendation_ready:'🌾',
  agronomist_ready:    '💬',
  usage_milestone:     '🎉',
  general:             'ℹ️',
  system:              '⚙️',
};

const NOTIFICATION_COLORS = {
  diagnosis_ready:     { bg: '#E0F2FE', color: '#0284C7', border: '#0284C7' },
  recommendation_ready:{ bg: '#DCFCE7', color: '#16A34A', border: '#16A34A' },
  agronomist_ready:    { bg: '#FEE2E2', color: '#DC2626', border: '#DC2626' },
  usage_milestone:     { bg: '#FEF3C7', color: '#D97706', border: '#D97706' },
  general:             { bg: '#F3F4F6', color: '#6B7280', border: '#9CA3AF' },
  system:              { bg: '#F5F3FF', color: '#7C3AED', border: '#7C3AED' },
};

function formatDate(date, isFr = false) {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return isFr ? "à l'instant" : 'just now';
  if (diffMins < 60) return isFr ? `il y a ${diffMins} min` : `${diffMins}m ago`;
  if (diffHours < 24) return isFr ? `il y a ${diffHours} h` : `${diffHours}h ago`;
  if (diffDays < 7) return isFr ? `il y a ${diffDays} j` : `${diffDays}d ago`;
  return d.toLocaleDateString(isFr ? 'fr-FR' : 'en-US');
}

function NotificationCard({ notification, onMarkAsRead, isFr = false }) {
  const config = NOTIFICATION_COLORS[notification.type] || NOTIFICATION_COLORS.general;
  const icon = NOTIFICATION_ICONS[notification.type] || NOTIFICATION_ICONS.general;

  return (
    <Pressable
      style={[styles.notificationCard, { backgroundColor: config.bg, borderLeftColor: config.color }]}
      onPress={() => { if (!notification.isRead) onMarkAsRead(notification.id); }}
    >
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationIcon}>{icon}</Text>
          <View style={styles.notificationTitleArea}>
            <Text style={[styles.notificationTitle, { color: config.color }]}>{notification.title}</Text>
            <Text style={styles.notificationTime}>{formatDate(notification.createdAt, isFr)}</Text>
          </View>
          {!notification.isRead && (
            <View style={[styles.unreadDot, { backgroundColor: config.color }]} />
          )}
        </View>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
        {notification.priority === 'high' && (
          <Text style={styles.priorityBadge}>
            {isFr ? '🔔 Priorité Haute' : '🔔 High Priority'}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

export default function NotificationCenterScreen({ goTo, language = 'English' }) {
  const t = getT(language);
  const isFr = language === 'Français';

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to the local in-memory store — no server needed
    const unsubscribe = subscribeToNotifications((notifs) => {
      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => !n.isRead).length);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleMarkAsRead = (id) => {
    markNotificationAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => goTo('home')}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>
            {isFr ? 'Notifications' : 'Notifications'}
          </Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Body */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.loadingText}>
            {isFr ? 'Chargement...' : 'Loading...'}
          </Text>
        </View>
      ) : notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📬</Text>
          <Text style={styles.emptyTitle}>
            {isFr ? 'Aucune Notification' : 'No Notifications'}
          </Text>
          <Text style={styles.emptySubtitle}>
            {isFr
              ? 'Vous êtes à jour ! Continuez à utiliser l\'application pour des mises à jour.'
              : 'You\'re all caught up! Keep using the app for updates.'}
          </Text>
        </View>
      ) : (
        <>
          {unreadCount > 0 && (
            <Pressable style={styles.markAllButton} onPress={handleMarkAllAsRead}>
              <Text style={styles.markAllButtonText}>
                {isFr ? 'Marquer tout comme lu' : 'Mark all as read'}
              </Text>
            </Pressable>
          )}
          <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
            {notifications.map((n) => (
              <NotificationCard
                key={n.id}
                notification={n}
                onMarkAsRead={handleMarkAsRead}
                isFr={isFr}
              />
            ))}
            <View style={styles.spacer} />
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:            { flex: 1, backgroundColor: '#F8FAFC' },
  header:               { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#1B5E20', paddingTop: 40 },
  backButton:           { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', marginRight: 12 },
  backIcon:             { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  headerInfo:           { flex: 1, flexDirection: 'row', alignItems: 'center' },
  headerTitle:          { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  badge:                { marginLeft: 12, backgroundColor: '#DC2626', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText:            { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
  loadingContainer:     { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText:          { marginTop: 12, color: '#64748B', fontSize: 14 },
  emptyContainer:       { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  emptyIcon:            { fontSize: 64, marginBottom: 16 },
  emptyTitle:           { fontSize: 20, fontWeight: 'bold', color: '#0F172A', marginBottom: 8 },
  emptySubtitle:        { fontSize: 14, color: '#64748B', textAlign: 'center' },
  markAllButton:        { margin: 12, marginBottom: 4, paddingVertical: 10, backgroundColor: '#2E7D32', borderRadius: 8, alignItems: 'center' },
  markAllButtonText:    { color: '#ffffff', fontWeight: '600', fontSize: 14 },
  notificationsList:    { flex: 1, paddingHorizontal: 12, paddingTop: 8 },
  notificationCard:     { marginVertical: 6, padding: 14, borderRadius: 12, borderLeftWidth: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  notificationContent:  { flex: 1 },
  notificationHeader:   { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  notificationIcon:     { fontSize: 20, marginRight: 10, marginTop: 2 },
  notificationTitleArea:{ flex: 1 },
  notificationTitle:    { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  notificationTime:     { fontSize: 11, color: '#94A3B8' },
  unreadDot:            { width: 10, height: 10, borderRadius: 5, marginLeft: 8, marginTop: 4 },
  notificationMessage:  { fontSize: 13, color: '#475569', lineHeight: 18, marginLeft: 30 },
  priorityBadge:        { fontSize: 11, color: '#DC2626', fontWeight: '600', marginTop: 8, marginLeft: 30 },
  spacer:               { height: 40 },
});
