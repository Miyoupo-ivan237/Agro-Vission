import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

export async function registerForPushNotifications() {
  if (!Device.isDevice) return null;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('ai-results', {
      name: 'AI results',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default'
    });
  }

  const existing = await Notifications.getPermissionsAsync();
  let status = existing.status;
  if (status !== 'granted') {
    status = (await Notifications.requestPermissionsAsync()).status;
  }
  if (status !== 'granted') return null;

  const projectId = process.env.EXPO_PUBLIC_EAS_PROJECT_ID;
  const token = await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined);
  return token.data;
}

export function subscribeToNotificationActions(onResponse) {
  return Notifications.addNotificationResponseReceivedListener((response) => {
    onResponse(response.notification.request.content.data || {});
  });
}