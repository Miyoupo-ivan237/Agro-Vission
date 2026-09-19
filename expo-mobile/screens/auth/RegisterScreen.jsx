// screens/auth/RegisterScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet, ScrollView,
  ActivityIndicator, Image, KeyboardAvoidingView, Platform
} from 'react-native';
import { registerUser, validateEmail, validatePassword, validatePhone } from '../../services/authService';

const CAMEROON_REGIONS = [
  'Centre', 'Littoral', 'Ouest (West)', 'Nord-Ouest (North-West)',
  'Sud-Ouest (South-West)', 'Adamaoua', 'Nord (North)',
  'Extrême-Nord (Far-North)', 'Est (East)', 'Sud (South)'
];

export default function RegisterScreen({ goTo, setUserEmail, language = 'English' }) {
  const isFr = language === 'Français';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Centre');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [topError, setTopError] = useState('');

  const validate = () => {
    const newErrors = {};
    const missingFields = [];
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const cleanLocation = location.trim();
    const cleanPass = password.trim();

    // 1. Name validation
    if (!cleanName) {
      missingFields.push(isFr ? 'Nom Complet' : 'Full Name');
      newErrors.name = isFr ? 'Le nom complet est obligatoire' : 'Full name is required';
    } else if (cleanName.length < 2) {
      newErrors.name = isFr ? 'Le nom doit comporter au moins 2 caractères' : 'Name must be at least 2 characters';
    }

    // 2. Email validation
    if (!cleanEmail) {
      missingFields.push(isFr ? 'Adresse Email' : 'Email Address');
      newErrors.email = isFr ? 'L\'adresse email est obligatoire' : 'Email address is required';
    } else if (!validateEmail(cleanEmail)) {
      newErrors.email = isFr
        ? 'Format d\'email invalide (ex. nom@domaine.cm)'
        : 'Please enter a valid email format (e.g. name@domain.cm)';
    }

    // 3. Phone validation
    if (!cleanPhone) {
      missingFields.push(isFr ? 'Numéro de Téléphone' : 'Phone Number');
      newErrors.phone = isFr ? 'Le numéro de téléphone est obligatoire' : 'Phone number is required';
    } else if (!validatePhone(cleanPhone)) {
      newErrors.phone = isFr
        ? 'Numéro invalide (minimum 8 à 9 chiffres, ex. +237 677...)'
        : 'Invalid phone number (minimum 8-9 digits, e.g. +237 6XX...)';
    }

    // 4. Location validation
    if (!cleanLocation) {
      missingFields.push(isFr ? 'Région / Localisation' : 'Farm Region');
      newErrors.location = isFr ? 'La région / localisation est obligatoire' : 'Farm region is required';
    }

    // 5. Password validation (Alphanumeric: letters + numbers, min 6 chars)
    if (!cleanPass) {
      missingFields.push(isFr ? 'Mot de Passe' : 'Password');
      newErrors.password = isFr ? 'Le mot de passe est obligatoire' : 'Password is required';
    } else if (!validatePassword(cleanPass)) {
      newErrors.password = isFr
        ? 'Le mot de passe doit contenir au moins 6 caractères avec des lettres ET des chiffres'
        : 'Password must be at least 6 characters and contain both letters and numbers';
    }

    // 6. Confirm password
    if (!confirmPassword) {
      missingFields.push(isFr ? 'Confirmation du Mot de Passe' : 'Confirm Password');
      newErrors.confirmPassword = isFr ? 'Veuillez confirmer votre mot de passe' : 'Please confirm your password';
    } else if (confirmPassword !== cleanPass) {
      newErrors.confirmPassword = isFr ? 'Les mots de passe ne correspondent pas' : 'Passwords do not match';
    }

    setErrors(newErrors);

    if (missingFields.length > 0) {
      setTopError(
        isFr
          ? `⚠️ Champ(s) obligatoire(s) manquant(s) : Veuillez renseigner [${missingFields.join(', ')}].`
          : `⚠️ Missing required field(s): Please fill in [${missingFields.join(', ')}].`
      );
      return false;
    } else if (Object.keys(newErrors).length > 0) {
      setTopError(
        isFr
          ? '⚠️ Veuillez corriger les informations erronées indiquées ci-dessous.'
          : '⚠️ Please fix the invalid fields highlighted below.'
      );
      return false;
    }

    setTopError('');
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const user = await registerUser({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password.trim(),
        location: location.trim(),
        role: 'farmer'
      });

      if (setUserEmail) setUserEmail(user.email);
      goTo('home');
    } catch (error) {
      setTopError(error.message || (isFr ? 'Erreur d\'inscription' : 'Registration failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <View style={styles.logoSection}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.leafLogo}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>AGROVISSION</Text>
          <Text style={styles.brandSubtitle}>
            {isFr ? 'Création de Compte Agriculteur' : 'Farmer Registration'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>{isFr ? 'Rejoindre Agro-Vission' : 'Create Farmer Account'}</Text>
          <Text style={styles.subtitle}>
            {isFr
              ? 'Renseignez vos informations pour bénéficier du diagnostic IA et des conseils personnalisés.'
              : 'Enter your farm details to access AI crop disease diagnosis and personalized agronomist advice.'}
          </Text>

          {/* Top Error Alert Banner */}
          {topError ? (
            <View style={styles.topErrorBox}>
              <Text style={styles.topErrorIcon}>⚠️</Text>
              <Text style={styles.topErrorText}>{topError}</Text>
            </View>
          ) : null}

          {/* 1. Full Name */}
          <Text style={styles.label}>{isFr ? 'Nom Complet *' : 'Full Name *'}</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="e.g. Jean-Paul Kamga"
            placeholderTextColor="#94A3B8"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors(prev => ({ ...prev, name: null }));
              if (topError) setTopError('');
            }}
          />
          {errors.name ? <Text style={styles.errorText}>⚠️ {errors.name}</Text> : null}

          {/* 2. Email */}
          <Text style={styles.label}>{isFr ? 'Adresse Email *' : 'Email Address *'}</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="kamga@farm.cm"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors(prev => ({ ...prev, email: null }));
              if (topError) setTopError('');
            }}
          />
          {errors.email ? <Text style={styles.errorText}>⚠️ {errors.email}</Text> : null}

          {/* 3. Phone */}
          <Text style={styles.label}>{isFr ? 'Numéro de Téléphone *' : 'Phone Number *'}</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="+237 677 123 456"
            placeholderTextColor="#94A3B8"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
              if (topError) setTopError('');
            }}
          />
          {errors.phone ? <Text style={styles.errorText}>⚠️ {errors.phone}</Text> : null}

          {/* 4. Farm Region Selector */}
          <Text style={styles.label}>{isFr ? 'Région Agricole *' : 'Farm Region *'}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.regionList}>
            {CAMEROON_REGIONS.map((reg) => (
              <Pressable
                key={reg}
                style={[styles.regionPill, location === reg && styles.regionPillActive]}
                onPress={() => {
                  setLocation(reg);
                  if (errors.location) setErrors(prev => ({ ...prev, location: null }));
                  if (topError) setTopError('');
                }}
              >
                <Text style={[styles.regionPillText, location === reg && styles.regionPillTextActive]}>
                  {reg}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          {errors.location ? <Text style={styles.errorText}>⚠️ {errors.location}</Text> : null}

          {/* 5. Password */}
          <Text style={styles.label}>
            {isFr ? 'Mot de Passe (Lettres + Chiffres, min 6) *' : 'Password (Letters + Numbers, min 6) *'}
          </Text>
          <View style={styles.passwordInputRow}>
            <TextInput
              style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
              placeholder="e.g. kamga2026"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors(prev => ({ ...prev, password: null }));
                if (topError) setTopError('');
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

          {/* 6. Confirm Password */}
          <Text style={styles.label}>{isFr ? 'Confirmer le Mot de Passe *' : 'Confirm Password *'}</Text>
          <View style={styles.passwordInputRow}>
            <TextInput
              style={[styles.input, styles.passwordInput, errors.confirmPassword && styles.inputError]}
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: null }));
                if (topError) setTopError('');
              }}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(value => !value)}
              accessibilityRole="button"
              accessibilityLabel={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'}
            >
              <Text style={styles.eyeText}>{showConfirmPassword ? '🙈' : '👁'}</Text>
            </Pressable>
          </View>
          {errors.confirmPassword ? <Text style={styles.errorText}>⚠️ {errors.confirmPassword}</Text> : null}

          {/* Submit Button */}
          <Pressable
            style={[styles.primaryButton, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.primaryButtonText}>
                {isFr ? 'Créer Mon Compte Agriculteur' : 'Register Farmer Account'}
              </Text>
            )}
          </Pressable>

          {/* Link to Login */}
          <Pressable style={styles.textButton} onPress={() => goTo('login')}>
            <Text style={styles.textButtonText}>
              {isFr ? 'Vous avez déjà un compte ? Se connecter' : 'Already have an account? Sign in'}
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
  content: {
    padding: 20,
    paddingTop: 36,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  leafLogo: {
    width: 60,
    height: 60,
    marginBottom: 6,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1B5E20',
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
    marginBottom: 16,
  },
  topErrorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
  },
  topErrorIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  topErrorText: {
    color: '#B91C1C',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
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
    marginTop: 3,
    marginLeft: 2,
  },
  regionList: {
    flexDirection: 'row',
    marginBottom: 4,
    marginTop: 4,
  },
  regionPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  regionPillActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
  },
  regionPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  regionPillTextActive: {
    color: '#15803D',
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  textButton: {
    marginTop: 14,
    alignItems: 'center',
  },
  textButtonText: {
    color: '#2E7D32',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
