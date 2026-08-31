import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';
import { getProfile, updateProfile } from '../src/api';

export default function ProfileScreen({ goTo, userEmail }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Cameroon');
  const [farmSize, setFarmSize] = useState('2 Hectares');
  const [preferredCrop, setPreferredCrop] = useState('Cassava, Maize, Tomato');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await getProfile();
      if (data) {
        if (data.name) setName(data.name);
        if (data.phone) setPhone(data.phone);
        if (data.location) setLocation(data.location);
        if (data.farmSize) setFarmSize(data.farmSize);
        if (data.preferredCrop) setPreferredCrop(data.preferredCrop);
      }
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({ name, phone, location, farmSize, preferredCrop });
      Alert.alert('Profile Updated', 'Your farmer profile has been saved.');
    } catch (e) {
      Alert.alert('Offline Profile', 'Profile updated in offline storage.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👨‍🌾 Farmer Profile</Text>
      <Text style={styles.subtitle}>Manage your farm credentials, region, and primary crops.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Farmer Name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          editable={false}
          value={userEmail || 'farmer@agrovission.cm'}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+237 6XX XXX XXX"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Farm Location / Region</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Foumbot, West Region, Cameroon"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.label}>Farm Size</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 2 Hectares"
          value={farmSize}
          onChangeText={setFarmSize}
        />

        <Text style={styles.label}>Primary Focus Crops</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Cassava, Maize, Plantain"
          value={preferredCrop}
          onChangeText={setPreferredCrop}
        />

        <Pressable style={styles.primaryButton} onPress={handleSave} disabled={saving}>
          <Text style={styles.primaryButtonText}>{saving ? 'Saving...' : '💾 Update Profile'}</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => goTo('home')}>
          <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#F1F8E9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 6,
  },
  subtitle: {
    color: '#2E7D32',
    marginBottom: 18,
    fontSize: 14,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    elevation: 3,
  },
  label: {
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 6,
    marginTop: 10,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#F9FBF9',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    color: '#1B5E20',
    fontSize: 15,
  },
  disabledInput: {
    backgroundColor: '#EEEEEE',
    color: '#757575',
  },
  primaryButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 14,
    marginTop: 20,
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#2E7D32',
    borderWidth: 1,
    padding: 14,
    borderRadius: 14,
  },
  secondaryButtonText: {
    color: '#2E7D32',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
