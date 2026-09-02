import React from 'react';
import { Text, View } from 'react-native';

export default function CropRecommendationCard({ recommendation }) {
  if (!recommendation) return null;
  return <View><Text>{recommendation.primaryCrop}</Text></View>;
}
