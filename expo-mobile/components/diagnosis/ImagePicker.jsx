import React from 'react';
import { Pressable, Text } from 'react-native';

export default function ImagePicker({ onPress, label = 'Choose image' }) {
  return <Pressable onPress={onPress}><Text>{label}</Text></Pressable>;
}
