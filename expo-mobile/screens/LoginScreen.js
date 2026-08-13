import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { loginUser } from '../src/api';

export default function LoginScreen({ goTo, userEmail, setUserEmail }) {
  const [email, setEmail] = useState(userEmail || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEmail(userEmail || '');
  }, [userEmail]);

  const handleLogin = async () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      setLoading(true);
      const user = await loginUser({ email, password });
      if (setUserEmail) setUserEmail(user.email || email);
      goTo('home');
    } catch (error) {
      Alert.alert('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      <Pressable style={styles.primaryButton} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryButtonText}>Login</Text>}
      </Pressable>
      <Pressable style={styles.textButton} onPress={() => goTo('register')}>
        <Text style={styles.textButtonText}>Need to create an account?</Text>
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
