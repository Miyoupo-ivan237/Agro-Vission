// services/notificationService.js
// 100% Local In-Memory Notification Store — no server, no push tokens
// Notifications are created by app actions (diagnosis, recommendation, survey, etc.)

import { showLocalNotification } from './localNotificationService';

let _listeners = [];
let _notifications = [
  {
    id: '1',
    type: 'system',
    title: '🌿 Offline AI Ready',
    message: 'AGROVISSION plant disease diagnosis and agronomy chat work 100% on your phone — no internet needed.',
    isRead: false,
    priority: 'normal',
    createdAt: new Date().toISOString(),
  },
];
let _nextId = 2;

// ── Internal: notify all listeners when store changes ────────────────────────
function _notify() {
  _listeners.forEach(fn => {
    try { fn([..._notifications]); } catch (_) {}
  });
}

// ── Subscribe to store updates ────────────────────────────────────────────────
export function subscribeToNotifications(fn) {
  _listeners.push(fn);
  fn([..._notifications]); // deliver current state immediately
  return () => {
    _listeners = _listeners.filter(l => l !== fn);
  };
}

// ── Add a new notification (also fires a system tray notification) ────────────
export async function addNotification({ type = 'general', title, message, priority = 'normal', fireSystemAlert = true } = {}) {
  const notif = {
    id: String(_nextId++),
    type,
    title,
    message,
    isRead: false,
    priority,
    createdAt: new Date().toISOString(),
  };
  _notifications = [notif, ..._notifications];
  _notify();

  if (fireSystemAlert) {
    await showLocalNotification({ title, body: message, data: { id: notif.id, type } });
  }

  return notif;
}

// ── Get all notifications ─────────────────────────────────────────────────────
export function getNotifications() {
  return [..._notifications];
}

// ── Get unread count ─────────────────────────────────────────────────────────
export function getUnreadCount() {
  return _notifications.filter(n => !n.isRead).length;
}

// ── Mark one as read ─────────────────────────────────────────────────────────
export function markNotificationAsRead(id) {
  _notifications = _notifications.map(n =>
    n.id === String(id) ? { ...n, isRead: true } : n
  );
  _notify();
}

// ── Mark all as read ─────────────────────────────────────────────────────────
export function markAllNotificationsAsRead() {
  _notifications = _notifications.map(n => ({ ...n, isRead: true }));
  _notify();
}

// ── Pre-built notification helpers (call these from screens after actions) ────

export async function notifyDiagnosisDone(cropName, diseaseName, language = 'English') {
  const isFr = language === 'Français';
  return addNotification({
    type: 'diagnosis_ready',
    title: isFr ? `🔬 Diagnostic: ${cropName}` : `🔬 Diagnosis: ${cropName}`,
    message: isFr
      ? `Maladie détectée : ${diseaseName}. Consultez vos résultats.`
      : `Disease identified: ${diseaseName}. View your results.`,
    priority: 'high',
  });
}

export async function notifyRecommendationDone(cropName, language = 'English') {
  const isFr = language === 'Français';
  return addNotification({
    type: 'recommendation_ready',
    title: isFr ? `🌾 Conseil: ${cropName}` : `🌾 Recommendation: ${cropName}`,
    message: isFr
      ? `Vos conseils agronomiques pour ${cropName} sont prêts.`
      : `Your agronomy advice for ${cropName} is ready.`,
  });
}

export async function notifySurveySubmitted(language = 'English') {
  const isFr = language === 'Français';
  return addNotification({
    type: 'general',
    title: isFr ? '📋 Enquête soumise' : '📋 Survey Submitted',
    message: isFr
      ? 'Merci pour votre enquête. Vos données aident les agriculteurs locaux.'
      : 'Thank you for your survey. Your data helps local farmers.',
  });
}
