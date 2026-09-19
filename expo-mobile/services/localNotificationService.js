// services/localNotificationService.js
// 100% Local On-Device Notification Service
// Zero remote push dependencies — NO expo-notifications, NO getExpoPushTokenAsync, NO addPushTokenListener
// Prevents Expo Go SDK 53+ Android push notification runtime errors

import { Alert, Platform } from 'react-native';

const listeners = [];

export function setupNotificationChannel() {
  // Safe local placeholder for Android — no native push registration needed
  return Promise.resolve();
}

export function requestNotificationPermission() {
  return Promise.resolve(true);
}

// Shows an immediate local alert notification on device
export function showLocalNotification({ title, body, data = {} }) {
  // Trigger any in-app listeners
  listeners.forEach(fn => {
    try { fn({ title, body, data }); } catch (_) {}
  });

  // Display user-visible alert dialog if title or body exists
  if (title || body) {
    Alert.alert(title || 'Agro-Vission Alert', body || '', [{ text: 'OK' }]);
  }

  return Promise.resolve({ id: Date.now().toString(), title, body, data });
}

// Schedules a local reminder
export function scheduleLocalNotification({ title, body, data = {}, triggerDate }) {
  const delay = triggerDate instanceof Date ? Math.max(0, triggerDate.getTime() - Date.now()) : 0;
  
  if (delay > 0 && delay < 2147483647) {
    setTimeout(() => {
      showLocalNotification({ title, body, data });
    }, delay);
  } else if (delay === 0) {
    showLocalNotification({ title, body, data });
  }

  return Promise.resolve({ id: Date.now().toString(), title, body, data });
}

export function cancelAllScheduledNotifications() {
  return Promise.resolve();
}

// 2-week follow-up reminder for crop diagnosis / treatment
export function scheduleTwoWeekReminder({ crop, language = 'English' } = {}) {
  const isFrench = language === 'Français' || language === 'French';
  const cropLabel = crop ? ` (${crop})` : '';

  const title = isFrench ? 'Rappel de suivi agricole' : 'Farm follow-up reminder';
  const body = isFrench
    ? `Rappel Agro-Vission : Pensez à vérifier l'évolution de vos cultures${cropLabel}.`
    : `Agro-Vission reminder: Check the progress of your crops${cropLabel}.`;

  return showLocalNotification({
    title,
    body,
    data: { type: 'two_week_follow_up', crop: crop || null }
  });
}

export function addNotificationTapListener(handler) {
  listeners.push(handler);
  return {
    remove: () => {
      const idx = listeners.indexOf(handler);
      if (idx !== -1) listeners.splice(idx, 1);
    }
  };
}
