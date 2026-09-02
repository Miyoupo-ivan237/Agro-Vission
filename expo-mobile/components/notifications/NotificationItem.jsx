import React from 'react';
import { Text, View } from 'react-native';

export default function NotificationItem({ notification }) {
  if (!notification) return null;
  return <View><Text>{notification.title}</Text><Text>{notification.message}</Text></View>;
}
