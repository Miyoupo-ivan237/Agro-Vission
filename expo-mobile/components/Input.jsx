import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function Input(props) {
  return <TextInput {...props} style={[styles.input, props.style]} placeholderTextColor="#64748B" />;
}

const styles = StyleSheet.create({
  input: { backgroundColor: '#fff', borderColor: '#CBD5E1', borderRadius: 8, borderWidth: 1, color: '#0F172A', padding: 12 }
});
