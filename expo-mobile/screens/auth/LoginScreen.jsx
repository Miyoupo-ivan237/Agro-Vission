// screens/auth/LoginScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, Image,
  KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { loginUser, validateEmail, validatePassword } from '../../services/authService';

export default function LoginScreen({ goTo, userEmail, setUserEmail, language = 'English' }) {
  const isFr = language === 'Français';
  const [email, setEmail] = useState(userEmail || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    if (userEmail) setEmail(userEmail);
  }, [userEmail]);

  const validateForm = () => {
    const newErrors = {};
    const cleanEmail = email.trim();
    const cleanPass = password.trim();
    const missingFields = [];

    if (!cleanEmail) {
      missingFields.push(isFr ? 'Adresse Email' : 'Email Address');
      newErrors.email = isFr ? 'L\'adresse email est requise' : 'Email address is required';
    } else if (!validateEmail(cleanEmail)) {
      newErrors.email = isFr
        ? 'Veuillez entrer une adresse email valide (ex. nom@domaine.cm)'
        : 'Please enter a valid email address (e.g. name@domain.com)';
    }

    if (!cleanPass) {
      missingFields.push(isFr ? 'Mot de Passe' : 'Password');
      newErrors.password = isFr ? 'Le mot de passe est requis' : 'Password is required';
    } else if (!validatePassword(cleanPass)) {
      newErrors.password = isFr
        ? 'Le mot de passe doit contenir au moins 6 caractères avec des lettres et des chiffres'
        : 'Password must be at least 6 characters and contain both letters and numbers';
    }

    setErrors(newErrors);

    if (missingFields.length > 0) {
      setGeneralError(
        isFr
          ? `⚠️ Champ(s) obligatoire(s) manquant(s) : Veuillez remplir [${missingFields.join(', ')}].`
          : `⚠️ Missing required field(s): Please fill in [${missingFields.join(', ')}].`
      );
      return false;
    } else if (Object.keys(newErrors).length > 0) {
      setGeneralError(
        isFr
          ? '⚠️ Veuillez corriger les informations erronées ci-dessous.'
          : '⚠️ Please fix the invalid information highlighted below.'
      );
      return false;
    }

    setGeneralError('');
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const user = await loginUser({ email: email.trim(), password: password.trim() });
      if (setUserEmail) setUserEmail(user.email);

      // Strict role-based navigation
      if (user.role === 'admin') {
        goTo('admin');
      } else {
        goTo('home');
      }
    } catch (error) {
      setGeneralError(error.message || (isFr ? 'Échec de connexion' : 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  // Quick fill demo helper
  const handleQuickFill = (roleType) => {
    setErrors({});
    setGeneralError('');
    if (roleType === 'admin') {
      setEmail('ivanmiyoupo@gmail.com');
      setPassword('miyoupo10');
    } else {
      setEmail('farmer@agrovission.cm');
      setPassword('farmer123');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Brand Header */}
        <View style={styles.logoSection}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.leafLogo}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>AGROVISSION</Text>
          <Text style={styles.brandSubtitle}>
            {isFr ? 'Système Intelligent d\'Agronomie & Pathologie' : 'Agro-Vission AI & Crop Pathology System'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>{isFr ? 'Connexion Agriculteur / Admin' : 'Login to Agro-Vission'}</Text>
          <Text style={styles.subtitle}>
            {isFr
              ? 'Accédez à vos diagnostics, recommandations et données agricoles.'
              : 'Sign in to access your offline diagnoses, crop recommendations and farm records.'}
          </Text>

          {/* General Error Banner */}
          {generalError ? (
            <View style={styles.generalErrorBox}>
              <Text style={styles.generalErrorIcon}>⚠️</Text>
              <Text style={styles.generalErrorText}>{generalError}</Text>
            </View>
          ) : null}

          {/* Email input */}
          <Text style={styles.label}>{isFr ? 'Adresse Email *' : 'Email Address *'}</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="farmer@agrovission.cm"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors(prev => ({ ...prev, email: null }));
              if (generalError) setGeneralError('');
            }}
          />
          {errors.email ? <Text style={styles.errorText}>⚠️ {errors.email}</Text> : null}

          {/* Password input */}
          <Text style={styles.label}>{isFr ? 'Mot de Passe (Lettres + Chiffres) *' : 'Password (Letters + Numbers) *'}</Text>
          <View style={styles.passwordInputRow}>
            <TextInput
              style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors(prev => ({ ...prev, password: null }));
                if (generalError) setGeneralError('');
              }}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setShowPassword(value => !value)}
              accessibilityRole="button"
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            >
              <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁'}</Text>
            </Pressable>
          </View>
          {errors.password ? <Text style={styles.errorText}>⚠️ {errors.password}</Text> : null}

          {/* Sign In Button */}
          <Pressable style={[styles.primaryButton, loading && styles.buttonDisabled]} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.primaryButtonText}>🔑 {isFr ? 'Se Connecter' : 'Log In'}</Text>
            )}
          </Pressable>

          {/* Prompt to create account first */}
          <View style={styles.createAccountFirstCard}>
            <Text style={styles.createAccountFirstTitle}>
              🌱 {isFr ? 'Pas encore de compte ?' : 'Don\'t have an account yet?'}
            </Text>
            <Text style={styles.createAccountFirstSub}>
              {isFr
                ? 'Vous devez créer votre compte avant de vous connecter. Une fois créé, vous pourrez vous connecter directement la prochaine fois !'
                : 'You must create an account first before logging in. Once created, you can log in directly next time!'}
            </Text>
            <Pressable style={styles.createAccountFirstBtn} onPress={() => goTo('register')}>
              <Text style={styles.createAccountFirstBtnText}>
                🚀 {isFr ? 'Créer un Compte Agriculteur' : 'Create Farmer Account First'}
              </Text>
            </Pressable>
          </View>

          {/* Quick Demo Credentials */}
          <View style={styles.quickFillSection}>
            <Text style={styles.quickFillTitle}>{isFr ? 'Remplissage rapide (Démo) :' : 'Quick Demo Login:'}</Text>
            <View style={styles.quickFillRow}>
              <Pressable style={styles.quickFillBtn} onPress={() => handleQuickFill('farmer')}>
                <Text style={styles.quickFillBtnText}>🌾 {isFr ? 'Agriculteur' : 'Farmer'}</Text>
              </Pressable>
              <Pressable style={[styles.quickFillBtn, styles.quickFillAdminBtn]} onPress={() => handleQuickFill('admin')}>
                <Text style={styles.quickFillBtnText}>🛡️ {isFr ? 'Super Admin' : 'Admin'}</Text>
              </Pressable>
            </View>
          </View>

          {/* Return to Welcome */}
          <Pressable style={styles.textButton} onPress={() => goTo('welcome')}>
            <Text style={styles.textButtonText}>
              ↩️ {isFr ? 'Retour à l\'accueil' : 'Back to Welcome Screen'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  leafLogo: {
    width: 68,
    height: 68,
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1B5E20',
    letterSpacing: 1,
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 18,
  },
  generalErrorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  generalErrorIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  generalErrorText: {
    color: '#B91C1C',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
  },
  passwordInputRow: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeButton: {
    position: 'absolute',
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  eyeText: {
    fontSize: 18,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    marginLeft: 2,
  },
  primaryButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  quickFillSection: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    alignItems: 'center',
  },
  quickFillTitle: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  quickFillRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickFillBtn: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A5D6A7',
  },
  quickFillAdminBtn: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  quickFillBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  textButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  textButtonText: {
    color: '#16A34A',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  createAccountFirstCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
    borderRadius: 14,
    padding: 14,
    marginTop: 18,
    alignItems: 'center',
  },
  createAccountFirstTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#15803D',
    marginBottom: 4,
  },
  createAccountFirstSub: {
    fontSize: 11,
    color: '#166534',
    textAlign: 'center',
    lineHeight: 15,
    marginBottom: 10,
  },
  createAccountFirstBtn: {
    backgroundColor: '#16A34A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  createAccountFirstBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
