// services/notificationService.js
// 100% local in-memory notification store — no server, no push tokens required.
// Provides subscribeToNotifications for real-time updates in AdminDashboard & NotificationCenterScreen.

let _notifications = [
  {
    id: 'sys-1',
    title: '🌿 Offline AI Enabled',
    message: 'Agro-Vission plant diagnosis and agronomist chat work fully offline on your device.',
    type: 'system',
    category: 'system',
    isRead: false,
    createdAt: new Date().toISOString()
  }
];

let _listeners = [];

// ── Internal helpers ──────────────────────────────────────────────────────────

function _notify() {
  const snapshot = [..._notifications];
  _listeners.forEach(fn => {
    try { fn(snapshot); } catch (_) {}
  });
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Subscribe to notification changes. Returns an unsubscribe function. */
export function subscribeToNotifications(listener) {
  if (typeof listener !== 'function') return () => {};
  _listeners.push(listener);
  // Immediately call with current state
  try { listener([..._notifications]); } catch (_) {}
  return () => {
    _listeners = _listeners.filter(l => l !== listener);
  };
}

/** Add a new notification to the store. */
export function addNotification({ title, message, type = 'general', category = 'general' } = {}) {
  const notif = {
    id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: title || 'Notification',
    message: message || '',
    type,
    category,
    isRead: false,
    createdAt: new Date().toISOString()
  };
  _notifications = [notif, ..._notifications];
  _notify();
  return notif;
}

/** Get all notifications (snapshot). */
export function getNotifications() {
  return [..._notifications];
}

/** Get unread count. */
export function getUnreadCount() {
  return _notifications.filter(n => !n.isRead).length;
}

/** Mark a single notification as read. */
export function markNotificationAsRead(id) {
  _notifications = _notifications.map(n =>
    n.id === id ? { ...n, isRead: true } : n
  );
  _notify();
  return true;
}

/** Mark all notifications as read. */
export function markAllNotificationsAsRead() {
  _notifications = _notifications.map(n => ({ ...n, isRead: true }));
  _notify();
  return true;
}

/** Get count of unread notifications (alias). */
export function getUnreadNotificationCount() {
  return { unreadCount: getUnreadCount() };
}
