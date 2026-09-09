import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView,
  ImageBackground, Alert, ActivityIndicator, Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { diagnosePlant } from '../../src/api';
import { getT } from '../../src/translations';

const CROPS = [
  { id: 'cassava', label: 'Cassava',  fr: 'Manioc',            icon: '🌱' },
  { id: 'maize',   label: 'Maize',    fr: 'Maïs',              icon: '🌽' },
  { id: 'tomato',  label: 'Tomato',   fr: 'Tomate',            icon: '🍅' },
  { id: 'banana',  label: 'Banana',   fr: 'Banane',            icon: '🍌' },
  { id: 'cocoa',   label: 'Cocoa',    fr: 'Cacao',             icon: '🍫' },
  { id: 'potato',  label: 'Potato',   fr: 'Pomme de Terre',    icon: '🥔' },
  { id: 'pepper',  label: 'Pepper',   fr: 'Piment',            icon: '🌶️' },
];

const SEVERITY_CONFIG = {
  Critical:         { color: '#DC2626', bg: '#FEE2E2', icon: '🔴' },
  High:             { color: '#EA580C', bg: '#FFEDD5', icon: '🟠' },
  'Moderate to High':{ color: '#D97706', bg: '#FEF3C7', icon: '🟡' },
  Moderate:         { color: '#65A30D', bg: '#ECFCCB', icon: '🟢' },
  Low:              { color: '#0284C7', bg: '#E0F2FE', icon: '🔵' },
};

function getSeverityStyle(severity) {
  return SEVERITY_CONFIG[severity] || SEVERITY_CONFIG['Moderate'];
}

export default function DiagnosisScreen({ goTo, language = 'English' }) {
  const t = getT(language);
  const isFr = language === 'Français';

  const [selectedCrop, setSelectedCrop] = useState('cassava');
  const [loading, setLoading]           = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [result, setResult]             = useState(null);

  const activeCrop = CROPS.find(c => c.id === selectedCrop);
  const activeCropLabel = activeCrop?.[isFr ? 'fr' : 'label'];

  // ── Permissions helper ──────────────────────────────────────────────────────
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        isFr ? 'Permission refusée' : 'Permission Denied',
        isFr
          ? "L'accès à la caméra est requis pour scanner les plantes."
          : 'Camera access is required to scan plants.'
      );
      return false;
    }
    return true;
  };

  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        isFr ? 'Permission refusée' : 'Permission Denied',
        isFr
          ? "L'accès à la galerie est requis."
          : 'Gallery access is required.'
      );
      return false;
    }
    return true;
  };

  // ── Run diagnosis after image selected ─────────────────────────────────────
  const runDiagnosis = async (imageUri) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await diagnosePlant({
        crop: selectedCrop,
        symptomsText: `Image scan of ${selectedCrop} plant`,
        imageUri,
        farmerContext: { crop: selectedCrop },
        language
      });
      setResult(res.diagnosis || res);
    } catch (error) {
      Alert.alert(isFr ? 'Erreur' : 'Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Open camera ────────────────────────────────────────────────────────────
  const handleCamera = async () => {
    const ok = await requestCameraPermission();
    if (!ok) return;

    const picked = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.75,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!picked.canceled && picked.assets?.length > 0) {
      const uri = picked.assets[0].uri;
      setCapturedImage(uri);
      await runDiagnosis(uri);
    }
  };

  // ── Open gallery ───────────────────────────────────────────────────────────
  const handleGallery = async () => {
    const ok = await requestGalleryPermission();
    if (!ok) return;

    const picked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.75,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!picked.canceled && picked.assets?.length > 0) {
      const uri = picked.assets[0].uri;
      setCapturedImage(uri);
      await runDiagnosis(uri);
    }
  };

  // ── Reset ──────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setCapturedImage(null);
    setResult(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1592982537447-6f23349c814b?auto=format&fit=crop&w=1000&q=80' }}
          style={styles.heroBackground}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.topNav}>
              <Pressable style={styles.iconButton} onPress={() => goTo('home')}>
                <Text style={styles.iconButtonText}>←</Text>
              </Pressable>
              <View style={styles.iconButton}>
                <Text style={styles.iconButtonText}>👤</Text>
              </View>
            </View>
            <View style={styles.heroContent}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>📸 {isFr ? 'DIAGNOSTIC IA DES PLANTES' : 'AI PLANT DIAGNOSIS'}</Text>
              </View>
              <Text style={styles.heroTitle}>
                {isFr ? 'Diagnostic IA des Maladies' : 'AI Plant Disease Diagnosis'}
              </Text>
              <Text style={styles.heroSubtitle}>
                {isFr
                  ? 'Prenez une photo et obtenez un diagnostic complet avec solutions'
                  : 'Take a photo and get a full diagnosis with treatment solutions'}
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* ── Feature Bar ────────────────────────────────────────────────── */}
        <View style={styles.featureCard}>
          <FeatureItem icon="✨" label={isFr ? 'Guide IA' : 'AI Guide'} color="#0F9D58" />
          <FeatureItem icon="🖼️" label={isFr ? 'Galerie' : 'Gallery'} color="#4285F4" onPress={handleGallery} />
          <FeatureItem icon="📷" label={isFr ? 'Caméra' : 'Camera'} color="#F4B400" onPress={handleCamera} />
          <FeatureItem icon="🗣️" label={isFr ? 'Parler' : 'Speak'} color="#5C6BC0" />
          <FeatureItem icon="💬" label={isFr ? 'Chat IA' : 'Chat AI'} color="#AB47BC" onPress={() => goTo('aiChat')} />
        </View>

        <View style={styles.contentPadding}>

          {/* ── Crop Selector ─────────────────────────────────────────────── */}
          <Text style={styles.sectionTitle}>{t.selectCrop || (isFr ? 'Sélectionner la culture' : 'Select Crop')}</Text>
          <Text style={styles.sectionSubtitle}>
            {isFr ? 'Choisissez votre culture pour un diagnostic précis' : 'Choose your crop for accurate diagnosis'}
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cropList}>
            {CROPS.map((c) => (
              <Pressable
                key={c.id}
                style={[styles.cropPill, selectedCrop === c.id && styles.cropPillActive]}
                onPress={() => { setSelectedCrop(c.id); handleReset(); }}
              >
                <Text style={styles.cropIcon}>{c.icon}</Text>
                <Text style={[styles.cropText, selectedCrop === c.id && styles.cropTextActive]}>
                  {isFr ? c.fr : c.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* ── Image Preview ──────────────────────────────────────────────── */}
          {capturedImage ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: capturedImage }} style={styles.previewImage} resizeMode="cover" />
              <View style={styles.previewOverlay}>
                <View style={styles.previewBadge}>
                  <Text style={styles.previewBadgeText}>
                    {activeCrop?.icon} {activeCropLabel}
                  </Text>
                </View>
                <Pressable style={styles.retakeButton} onPress={handleReset}>
                  <Text style={styles.retakeText}>✕ {isFr ? 'Retirer' : 'Remove'}</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            /* ── Upload Zone (no image yet) ──────────────────────────────── */
            <View style={styles.uploadZone}>
              <Text style={styles.uploadIcon}>🌿</Text>
              <Text style={styles.uploadTitle}>
                {isFr ? 'Aucune image sélectionnée' : 'No image selected'}
              </Text>
              <Text style={styles.uploadHint}>
                {isFr
                  ? 'Utilisez les boutons ci-dessous pour capturer ou choisir une photo'
                  : 'Use the buttons below to capture or pick a photo'}
              </Text>
            </View>
          )}

          {/* ── Action Buttons ─────────────────────────────────────────────── */}
          <Pressable
            style={[styles.primaryButton, loading && styles.buttonDisabled]}
            onPress={handleCamera}
            disabled={loading}
          >
            {loading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator color="#ffffff" size="small" />
                <Text style={[styles.primaryButtonText, { marginLeft: 10 }]}>
                  {isFr ? 'Analyse en cours...' : 'Analysing image...'}
                </Text>
              </View>
            ) : (
              <Text style={styles.primaryButtonText}>
                📷 {isFr ? `Scanner la Feuille (${activeCropLabel})` : `Scan & Diagnose ${activeCropLabel}`}
              </Text>
            )}
          </Pressable>

          <Pressable
            style={[styles.secondaryButton, loading && styles.buttonDisabled]}
            onPress={handleGallery}
            disabled={loading}
          >
            <Text style={styles.secondaryButtonText}>
              🖼️ {isFr ? 'Choisir depuis la Galerie' : 'Upload from Gallery'}
            </Text>
          </Pressable>

          {/* ── Results Card ───────────────────────────────────────────────── */}
          {result && <DiagnosisResultCard result={result} isFr={isFr} />}

        </View>
      </ScrollView>
    </View>
  );
}

// ── DiagnosisResultCard ────────────────────────────────────────────────────────
function DiagnosisResultCard({ result, isFr }) {
  const sev = getSeverityStyle(result.severity);

  return (
    <View style={styles.resultCard}>

      {/* Header */}
      <View style={[styles.resultHeader, { backgroundColor: sev.bg }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.resultCrop}>{result.crop || ''}</Text>
          <Text style={[styles.resultTitle, { color: sev.color }]}>{result.name}</Text>
          {result.scientificName ? (
            <Text style={styles.resultScientific}>🔬 {result.scientificName}</Text>
          ) : null}
        </View>
        <View style={styles.rightBadges}>
          <View style={[styles.confidenceBadge, { backgroundColor: sev.color }]}>
            <Text style={styles.confidenceText}>{Math.round((result.confidence || 0.85) * 100)}%</Text>
            <Text style={styles.confidenceLabel}>{isFr ? 'match' : 'match'}</Text>
          </View>
          <View style={[styles.severityBadge, { backgroundColor: sev.color }]}>
            <Text style={styles.severityText}>{sev.icon} {result.severity || 'Moderate'}</Text>
          </View>
        </View>
      </View>

      {/* Symptoms */}
      {(result.symptoms || []).length > 0 && (
        <Section icon="🔍" title={isFr ? 'Symptômes observés' : 'Observed Symptoms'}>
          {(result.symptoms || []).map((s, i) => (
            <BulletRow key={i} text={s} color="#475569" bullet="•" />
          ))}
        </Section>
      )}

      {/* Cause */}
      {result.cause && (
        <Section icon="⚠️" title={isFr ? 'Cause' : 'Cause'} accent="#D97706">
          <Text style={styles.causeText}>{result.cause}</Text>
        </Section>
      )}

      {/* Organic Treatment */}
      {(result.organicTreatment || []).length > 0 && (
        <Section icon="🌿" title={isFr ? 'Traitement Organique' : 'Organic Treatment'} accent="#15803D">
          {(result.organicTreatment || []).map((s, i) => (
            <BulletRow key={i} text={s} color="#15803D" bullet={`${i + 1}.`} />
          ))}
        </Section>
      )}

      {/* Chemical Treatment */}
      {(result.chemicalTreatment || []).length > 0 && (
        <Section icon="🧪" title={isFr ? 'Traitement Chimique' : 'Chemical Treatment'} accent="#1D4ED8">
          {(result.chemicalTreatment || []).map((s, i) => (
            <BulletRow key={i} text={s} color="#1D4ED8" bullet={`${i + 1}.`} />
          ))}
        </Section>
      )}

      {/* Prevention */}
      {(result.prevention || []).length > 0 && (
        <Section icon="🛡️" title={isFr ? 'Prévention' : 'Prevention Tips'} accent="#6D28D9">
          {(result.prevention || []).map((s, i) => (
            <BulletRow key={i} text={s} color="#6D28D9" bullet="✓" />
          ))}
        </Section>
      )}

      {/* Source badge */}
      <View style={styles.sourceBadge}>
        <Text style={styles.sourceText}>
          🤖 {result.source || (isFr ? 'Moteur IA hors-ligne' : 'Offline AI Engine')}
        </Text>
      </View>

    </View>
  );
}

// ── Small reusable components ──────────────────────────────────────────────────
function Section({ icon, title, accent = '#1E293B', children }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionLabelRow}>
        <Text style={styles.sectionIcon}>{icon}</Text>
        <Text style={[styles.sectionLabel, { color: accent }]}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function BulletRow({ text, color, bullet }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={[styles.bulletMark, { color }]}>{bullet}</Text>
      <Text style={[styles.bulletText, { color: '#374151' }]}>{text}</Text>
    </View>
  );
}

function FeatureItem({ icon, label, color, onPress }) {
  return (
    <Pressable style={styles.featureItem} onPress={onPress}>
      <View style={[styles.featureIconCircle, { backgroundColor: color }]}>
        <Text style={styles.featureIconText}>{icon}</Text>
      </View>
      <Text style={styles.featureLabel}>{label}</Text>
    </Pressable>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  /* Hero */
  heroBackground: { width: '100%', height: 260, resizeMode: 'cover' },
  heroOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', padding: 16, justifyContent: 'space-between' },
  topNav: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  iconButton: { width: 44, height: 44, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  iconButtonText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  heroContent: { marginBottom: 24 },
  badge: { backgroundColor: '#16A34A', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 16, marginBottom: 10 },
  badgeText: { color: '#ffffff', fontSize: 10, fontWeight: 'bold', letterSpacing: 0.5 },
  heroTitle: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 6 },
  heroSubtitle: { fontSize: 13, color: '#D1FAE5', lineHeight: 18, width: '90%' },

  /* Feature bar */
  featureCard: {
    backgroundColor: '#ffffff', marginHorizontal: 16, borderRadius: 20, padding: 16,
    flexDirection: 'row', justifyContent: 'space-between', marginTop: -28,
    elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.12, shadowRadius: 6,
  },
  featureItem: { alignItems: 'center', flex: 1 },
  featureIconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  featureIconText: { fontSize: 20 },
  featureLabel: { fontSize: 9, fontWeight: 'bold', color: '#374151', textAlign: 'center' },

  /* Content */
  contentPadding: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 4 },
  sectionSubtitle: { fontSize: 13, color: '#64748B', marginBottom: 16 },

  /* Crop pills */
  cropList: { flexDirection: 'row', marginBottom: 20 },
  cropPill: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9',
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24, marginRight: 10,
    borderWidth: 1.5, borderColor: '#E2E8F0',
  },
  cropPillActive: { backgroundColor: '#16A34A', borderColor: '#15803D' },
  cropIcon: { fontSize: 15, marginRight: 6 },
  cropText: { fontSize: 13, fontWeight: 'bold', color: '#475569' },
  cropTextActive: { color: '#ffffff' },

  /* Upload zone */
  uploadZone: {
    borderWidth: 2, borderColor: '#CBD5E1', borderStyle: 'dashed', borderRadius: 16,
    backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 32, marginBottom: 20,
  },
  uploadIcon: { fontSize: 40, marginBottom: 10 },
  uploadTitle: { fontSize: 16, fontWeight: 'bold', color: '#475569', marginBottom: 6 },
  uploadHint: { fontSize: 12, color: '#94A3B8', textAlign: 'center', paddingHorizontal: 24 },

  /* Image preview */
  previewContainer: {
    borderRadius: 16, overflow: 'hidden', marginBottom: 20,
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
  },
  previewImage: { width: '100%', height: 220 },
  previewOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)', paddingHorizontal: 14, paddingVertical: 10,
  },
  previewBadge: { backgroundColor: '#16A34A', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
  previewBadgeText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  retakeButton: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
  retakeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

  /* Action buttons */
  loadingRow: { flexDirection: 'row', alignItems: 'center' },
  primaryButton: {
    backgroundColor: '#16A34A', padding: 18, borderRadius: 14,
    alignItems: 'center', marginBottom: 14, elevation: 3,
  },
  primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: {
    backgroundColor: '#ffffff', padding: 16, borderRadius: 14,
    alignItems: 'center', borderWidth: 2, borderColor: '#16A34A', marginBottom: 4,
  },
  secondaryButtonText: { color: '#16A34A', fontSize: 16, fontWeight: 'bold' },
  buttonDisabled: { opacity: 0.6 },

  /* Result card */
  resultCard: {
    backgroundColor: '#ffffff', borderRadius: 20, marginTop: 24,
    overflow: 'hidden',
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 6,
  },
  resultHeader: { padding: 18, flexDirection: 'row', alignItems: 'flex-start' },
  resultCrop: { fontSize: 11, fontWeight: 'bold', color: '#6B7280', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4, flexWrap: 'wrap' },
  resultScientific: { fontSize: 12, color: '#6B7280', fontStyle: 'italic' },
  rightBadges: { alignItems: 'flex-end', gap: 6 },
  confidenceBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, alignItems: 'center', minWidth: 54 },
  confidenceText: { color: '#ffffff', fontSize: 15, fontWeight: 'bold', lineHeight: 18 },
  confidenceLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 9 },
  severityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  severityText: { color: '#ffffff', fontSize: 11, fontWeight: 'bold' },

  /* Sections inside result */
  section: { paddingHorizontal: 18, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  sectionLabelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  sectionIcon: { fontSize: 16, marginRight: 6 },
  sectionLabel: { fontSize: 14, fontWeight: 'bold' },
  causeText: { fontSize: 13, color: '#374151', lineHeight: 19 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
  bulletMark: { fontSize: 13, fontWeight: 'bold', minWidth: 22, marginTop: 1 },
  bulletText: { fontSize: 13, flex: 1, lineHeight: 19 },

  /* Source */
  sourceBadge: { backgroundColor: '#F0FDF4', padding: 12, alignItems: 'center' },
  sourceText: { fontSize: 11, color: '#15803D', fontWeight: '600' },
});
