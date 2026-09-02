import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({ card: { backgroundColor: '#fff', borderColor: '#E2E8F0', borderRadius: 8, borderWidth: 1, padding: 16 } });
