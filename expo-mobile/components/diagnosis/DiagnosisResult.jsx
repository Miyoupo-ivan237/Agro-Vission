import React from 'react';
import { Text, View } from 'react-native';

export default function DiagnosisResult({ diagnosis }) {
  if (!diagnosis) return null;
  return <View><Text>{diagnosis.name || diagnosis.diseaseName}</Text></View>;
}
