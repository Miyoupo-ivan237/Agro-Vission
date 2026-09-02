import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ title, subtitle }) {
  return <View style={styles.container}><Text style={styles.title}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>;
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 16 },
  title: { color: '#0F172A', fontSize: 24, fontWeight: '700' },
  subtitle: { color: '#64748B', marginTop: 4 }
});
