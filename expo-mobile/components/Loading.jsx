import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function Loading({ color = '#2E7D32' }) {
  return <View style={styles.container}><ActivityIndicator color={color} size="large" /></View>;
}

const styles = StyleSheet.create({ container: { alignItems: 'center', justifyContent: 'center', padding: 20 } });
