// services/localNotificationService.js
// Stores diagnosis and recommendation notifications in the local in-memory store
// so they appear in the Admin Dashboard and Notification Center without any push token.

import { addNotification } from './notificationService';

export async function scheduleLocalNotification({ title, body, data = {} }) {
  try {
    addNotification({
      title: title || 'Agro-Vission',
      message: body || '',
      type: data.type || 'general',
      category: data.type || 'general'
    });
  } catch (_) {}
  return true;
}

export async function scheduleTwoWeekReminder({ crop = '', language = 'English' } = {}) {
  try {
    const isFr = language === 'Français';
    addNotification({
      title: isFr ? '🌿 Rappel de Traitement' : '🌿 Treatment Follow-up Reminder',
      message: isFr
        ? `Vérifiez l'état de votre ${crop || 'culture'} — 14 jours après le diagnostic.`
        : `Check your ${crop || 'crop'} — 14 days after diagnosis follow-up.`,
      type: 'general',
      category: 'reminder'
    });
  } catch (_) {}
  return true;
}
