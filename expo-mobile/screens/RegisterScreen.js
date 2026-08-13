import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { registerUser } from '../src/api';

export default function RegisterScreen({ goTo, setUserEmail }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRegister = async () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!phone) newErrors.phone = 'Phone is required';
    if (!password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      setLoading(true);
      const user = await registerUser({ name, email, phone, password });
      setUserEmail(user.email || email);
      Alert.alert('Registration successful', 'You can now log in with your email and password.');
      goTo('login');
    } catch (error) {
      Alert.alert('Registration failed', error.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      <TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      <Pressable style={styles.primaryButton} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryButtonText}>Register</Text>}
      </Pressable>
      <Pressable style={styles.textButton} onPress={() => goTo('login')}>
        <Text style={styles.textButtonText}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1B5E20',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  primaryButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 14,
    marginTop: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textButton: {
    marginTop: 16,
  },
  textButtonText: {
    color: '#2E7D32',
    textAlign: 'center',
    fontWeight: '600',
  },
});
