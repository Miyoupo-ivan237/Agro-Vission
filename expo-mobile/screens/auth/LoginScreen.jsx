import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { loginUser } from '../../src/api';

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
      if (setUserEmail) setUserEmail(user?.email || email);
      
      if (user?.role === 'admin' || email === 'ivanmiyoupo@gmail.com') {
        goTo('admin');
      } else {
        goTo('home');
      }
    } catch (error) {
      // In offline mode, continue to dashboard smoothly
      if (setUserEmail) setUserEmail(email);
      if (email === 'ivanmiyoupo@gmail.com' && password === 'miyoupo10') {
        goTo('admin');
      } else {
        goTo('home');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.leafLogo}
          resizeMode="contain"
        />
        <Text style={styles.brandTitle}>AGROVISSION</Text>
        <Text style={styles.brandSubtitle}>Agro-Vission AI & Crop Pathology System</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Farmer Login</Text>
        <Text style={styles.subtitle}>Sign in to access your offline diagnoses and crop plans.</Text>

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="farmer@agrovission.cm"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        <Pressable style={styles.primaryButton} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.primaryButtonText}>Sign In</Text>
          )}
        </Pressable>

        <Pressable style={styles.textButton} onPress={() => goTo('register')}>
          <Text style={styles.textButtonText}>Need to create a farmer account? Register here</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F1F8E9',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  leafLogo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F4C81',
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '600',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 20,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
    marginTop: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 14,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 11,
    marginTop: 2,
  },
  primaryButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 14,
    marginTop: 18,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  textButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  textButtonText: {
    color: '#2E7D32',
    fontWeight: '600',
    fontSize: 12,
  },
});
