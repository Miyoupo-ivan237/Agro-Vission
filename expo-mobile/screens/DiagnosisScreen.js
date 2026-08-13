import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function DiagnosisScreen({ goTo }) {
  const [image, setImage] = useState(null);
  const [farmInfo, setFarmInfo] = useState({ location: '', season: '', soilCondition: '' });
  const [result, setResult] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please allow access to your photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please allow camera access.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAnalyze = () => {
    if (!image) {
      Alert.alert('Add an image', 'Upload or take a photo of the plant first.');
      return;
    }
    if (!farmInfo.location || !farmInfo.season || !farmInfo.soilCondition) {
      Alert.alert('Complete farm info', 'Please fill in location, season and soil condition.');
      return;
    }

    setResult({
      disease: 'Tomato Blight',
      confidence: '78%',
      advice:
        'Use cleaner water, space plants further apart, and apply neem leaf spray. Rotate crops next season and keep soil moist but well drained.',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>DIAGNOSIS AI</Text>
      <Text style={styles.subtitle}>Upload or take a picture for crop diagnosis.</Text>
      <View style={styles.buttonRow}>
        <Pressable style={styles.smallButton} onPress={pickImage}>
          <Text style={styles.smallButtonText}>Upload Photo</Text>
        </Pressable>
        <Pressable style={styles.smallButton} onPress={takePhoto}>
          <Text style={styles.smallButtonText}>Use Camera</Text>
        </Pressable>
      </View>
      {image ? <Image source={{ uri: image }} style={styles.image} /> : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Farm Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={farmInfo.location}
          onChangeText={(text) => setFarmInfo({ ...farmInfo, location: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Season"
          value={farmInfo.season}
          onChangeText={(text) => setFarmInfo({ ...farmInfo, season: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Soil condition"
          value={farmInfo.soilCondition}
          onChangeText={(text) => setFarmInfo({ ...farmInfo, soilCondition: text })}
        />
      </View>

      <Pressable style={styles.primaryButton} onPress={handleAnalyze}>
        <Text style={styles.primaryButtonText}>Get Diagnosis</Text>
      </Pressable>

      {result ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Diagnosis Result</Text>
          <Text style={styles.resultText}>Disease: {result.disease}</Text>
          <Text style={styles.resultText}>Confidence: {result.confidence}</Text>
          <Text style={styles.resultText}>Advice: {result.advice}</Text>
        </View>
      ) : null}

      <Pressable style={styles.secondaryButton} onPress={() => goTo('home')}>
        <Text style={styles.secondaryButtonText}>Back to dashboard</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  subtitle: {
    color: '#2E7D32',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 18,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#1B5E20',
  },
  cardText: {
    color: '#424242',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  resultTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1B5E20',
  },
  resultText: {
    color: '#424242',
    marginBottom: 4,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#2E7D32',
    borderWidth: 1,
    padding: 16,
    borderRadius: 14,
  },
  secondaryButtonText: {
    color: '#2E7D32',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
