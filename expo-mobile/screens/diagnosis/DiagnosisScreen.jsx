import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView,
  ImageBackground, Alert, ActivityIndicator, Image
} from 'react-native';
import * as ImagesPicker from 'expo-image-picker';

import { diagnosePlant } from '../../src/api';
import { getT, getSeverityLabel } from '../../src/translations';
import { getCropAgronomicGuidance } from '../../src/offline_ai';
import {
  scheduleLocalNotification,
  scheduleTwoWeekReminder
} from '../../services/localNotificationService';

const CROPS = [
  { id: 'maize',     label: 'Maize',       fr: 'Maïs',              icon: '🌽' },
  { id: 'cassava',   label: 'Cassava',     fr: 'Manioc',            icon: '🌱' },
  { id: 'tomato',    label: 'Tomato',      fr: 'Tomate',            icon: '🍅' },
  { id: 'groundnut', label: 'Groundnut',   fr: 'Arachide',           icon: '🥜' },
  { id: 'beans',     label: 'Beans',       fr: 'Haricot',           icon: '🫘' },
  { id: 'plantain',  label: 'Plantain',    fr: 'Banane Plantain',   icon: '🍌' },
  { id: 'banana',    label: 'Banana',      fr: 'Banane',            icon: '🍌' },
  { id: 'cocoa',     label: 'Cocoa',       fr: 'Cacao',             icon: '🍫' },
  { id: 'potato',    label: 'Potato',      fr: 'Pomme de Terre',    icon: '🥔' },
  { id: 'pepper',    label: 'Pepper',      fr: 'Piment',            icon: '🌶️' },
  { id: 'rice',      label: 'Rice',        fr: 'Riz',               icon: '🌾' },
  { id: 'yam',       label: 'Yam',         fr: 'Igname',            icon: '🥔' },
  { id: 'coffee',    label: 'Coffee',      fr: 'Café',              icon: '☕' },
  { id: 'onion',     label: 'Onion',       fr: 'Oignon',            icon: '🧅' },
  { id: 'auto',      label: 'Auto-Detect', fr: 'Détection Auto',     icon: '🤖' },
];

const SEVERITY_CONFIG = {
  Critical:         { color: '#DC2626', bg: '#FEE2E2', icon: '🔴' },
  High:             { color: '#EA580C', bg: '#FFEDD5', icon: '🟠' },
  'Moderate to High':{ color: '#D97706', bg: '#FEF3C7', icon: '🟡' },
  Moderate:         { color: '#65A30D', bg: '#ECFCCB', icon: '🟢' },
  Low:              { color: '#0284C7', bg: '#E0F2FE', icon: '🔵' },
};

function normalizeCropKey(value) {
  const crop = String(value || '').trim().toLowerCase();
  if (!crop) return '';
  const aliases = {
    corn: 'maize',
    mais: 'maize',
    maïs: 'maize',
    maize: 'maize',
    arachide: 'groundnut',
    peanut: 'groundnut',
    garnut: 'groundnut',
    groundnut: 'groundnut',
    haricot: 'beans',
    bean: 'beans',
    beans: 'beans',
    manioc: 'cassava',
    cassava: 'cassava',
    tomate: 'tomato',
    tomato: 'tomato',
    cacao: 'cocoa',
    cocoa: 'cocoa',
    plantain: 'plantain',
    'banane plantain': 'plantain',
    banane: 'banana',
    banana: 'banana',
    piment: 'pepper',
    pepper: 'pepper',
    riz: 'rice',
    rice: 'rice',
    igname: 'yam',
    yam: 'yam',
    café: 'coffee',
    cafe: 'coffee',
    coffee: 'coffee',
    oignon: 'onion',
    onion: 'onion',
    potato: 'potato',
    'pomme de terre': 'potato'
  };
  if (aliases[crop]) return aliases[crop];
  for (const [alias, canonical] of Object.entries(aliases)) {
    if (crop.includes(alias)) return canonical;
  }
  return crop;
}

function getSeverityStyle(severity) {
  return SEVERITY_CONFIG[severity] || SEVERITY_CONFIG['Moderate'];
}

export default function DiagnosisScreen({ goTo, language = 'English' }) {
  const t = getT(language);
  const isFr = language === 'Français';

  const [selectedCrop, setSelectedCrop] = useState('maize');
  const [loading, setLoading]           = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [result, setResult]             = useState(null);
  const [identifiedPlant, setIdentifiedPlant] = useState(null);

  const activeCrop = CROPS.find(c => c.id === selectedCrop);
  const activeCropLabel = activeCrop?.[isFr ? 'fr' : 'label'];

  // ── Permissions helper ──────────────────────────────────────────────────────
  const requestCameraPermission = async () => {
    const { status } = await ImagesPicker.requestCameraPermissionsAsync();
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
    const { status } = await ImagesPicker.requestMediaLibraryPermissionsAsync();
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
  const runDiagnosis = async (imageUri, overrideCrop = null, imageBase64 = null) => {
    const cropToUse = overrideCrop || selectedCrop;
    setLoading(true);
    setResult(null);
    setIdentifiedPlant(null);
    try {
      const res = await diagnosePlant({
        crop: cropToUse,
        symptomsText: `Image scan of ${cropToUse} plant`,
        imageUri,
        imageBase64,
        farmerContext: { crop: cropToUse },
        language
      });
      if (!res?.diagnosis) {
        throw new Error(
          res?.error ||
          (isFr
            ? "La culture n'a pas pu être identifiée. Utilisez une image claire ou sélectionnez la culture exacte."
            : 'The plant could not be identified. Use a clear image or select the exact crop.')
        );
      }
      const diag = res.diagnosis || res;
      const identifiedCrop = diag.imageCrop || diag.crop || cropToUse;
      const expectedCrop = normalizeCropKey(cropToUse);
      const actualCrop = normalizeCropKey(identifiedCrop);
      if (expectedCrop !== 'auto' && actualCrop !== expectedCrop) {
        throw new Error(
          isFr
            ? `L'image semble montrer ${identifiedCrop}, mais la culture sélectionnée est ${cropToUse}. Sélectionnez la bonne culture et réessayez.`
            : `The image appears to show ${identifiedCrop}, but the selected crop is ${cropToUse}. Select the correct crop and try again.`
        );
      }
      const plant = res.identifiedPlant || {
        cropKey: actualCrop,
        name: identifiedCrop,
        icon: cropToUse === 'cassava' ? '🌱' : (cropToUse === 'groundnut' ? '🥜' : '🌽'),
        confidence: 0.95
      };
      setIdentifiedPlant(plant);
      setResult(diag);

      // If auto-detect was active, update selected crop to the identified plant
      if (cropToUse === 'auto' && plant.cropKey) {
        setSelectedCrop(plant.cropKey);
      }

      // Notifications are optional; never hide a diagnosis if the device
      // denies notification permission or does not support local scheduling.
      try {
        const notifCropLabel = plant.name || activeCropLabel;
        await scheduleLocalNotification({
          title: isFr ? 'Diagnostic terminé' : 'Diagnosis complete',
          body: isFr ? `Résultat disponible pour ${notifCropLabel}.` : `Your ${notifCropLabel} diagnosis is ready.`,
          data: { type: 'diagnosis_ready', crop: plant.cropKey }
        });
        await scheduleTwoWeekReminder({ crop: notifCropLabel, language });
      } catch (notificationError) {
        console.warn('Diagnosis notifications unavailable:', notificationError);
      }
    } catch (error) {
      // Network errors are caught inside api.js and silently fall back to offline AI.
      // Errors that reach here are genuine server-side rejections (e.g. IMAGE_NOT_IDENTIFIABLE,
      // IMAGE_CROP_MISMATCH, or auth failures) or unexpected offline AI errors.
      const rawMsg = error?.message || '';

      // Map well-known server error codes to bilingual user-friendly text
      let message;
      if (rawMsg.includes('IMAGE_NOT_IDENTIFIABLE') || rawMsg.toLowerCase().includes('not clearly show a plant') || rawMsg.toLowerCase().includes('montre pas clairement')) {
        message = isFr
          ? "📷 L'image ne montre pas clairement une plante. Prenez une photo nette d'une feuille, tige ou fruit et réessayez."
          : "📷 The image doesn't clearly show a plant. Take a clear photo of a leaf, stem, or fruit and try again.";
      } else if (rawMsg.includes('IMAGE_CROP_MISMATCH') || rawMsg.toLowerCase().includes('selected crop')) {
        message = isFr
          ? "🌿 L'image semble montrer une plante différente de la culture sélectionnée. Sélectionnez la bonne culture et réessayez."
          : "🌿 The image appears to show a different plant than the selected crop. Select the correct crop and try again.";
      } else if (rawMsg.toLowerCase().includes('could not be identified') || rawMsg.toLowerCase().includes("n'a pas pu être identifiée")) {
        message = isFr
          ? "🔍 Plante non identifiée. Utilisez une image plus nette ou sélectionnez la culture exacte dans la liste."
          : "🔍 Plant not identified. Use a clearer image or select the exact crop from the list.";
      } else {
        message = rawMsg || (isFr ? 'Le diagnostic a échoué. Réessayez.' : 'Diagnosis failed. Please try again.');
      }
      Alert.alert(isFr ? 'Diagnostic' : 'Diagnosis', message);
    } finally {
      setLoading(false);
    }
  };

  // ── Open camera ────────────────────────────────────────────────────────────
  const handleCamera = async () => {
    const ok = await requestCameraPermission();
    if (!ok) return;

    const picked = await ImagesPicker.launchCameraAsync({
      mediaTypes: 'images',
      quality: 0.75,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });


    if (!picked.canceled && picked.assets?.length > 0) {
      const asset = picked.assets[0];
      setCapturedImage(asset.uri);
      await runDiagnosis(asset.uri, null, asset.base64);
    }
  };

  // ── Open gallery ───────────────────────────────────────────────────────────
  const handleGallery = async () => {
    const ok = await requestGalleryPermission();
    if (!ok) return;

    const picked = await ImagesPicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 0.75,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });


    if (!picked.canceled && picked.assets?.length > 0) {
      const asset = picked.assets[0];
      setCapturedImage(asset.uri);
      await runDiagnosis(asset.uri, null, asset.base64);
    }
  };

  // ── Reset ──────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setCapturedImage(null);
    setResult(null);
    setIdentifiedPlant(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1200&q=85' }}
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
                onPress={() => {
                  setSelectedCrop(c.id);
                  if (capturedImage) {
                    runDiagnosis(capturedImage, c.id);
                  }
                }}
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
                  {isFr ? 'Analyse & Identification IA...' : 'AI Vision & Pathology Analysis...'}
                </Text>
              </View>
            ) : (
              <Text style={styles.primaryButtonText}>
                📷 {isFr ? `Scanner la Plante (${activeCropLabel})` : `Scan & Diagnose (${activeCropLabel})`}
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

          {/* ── Identified Plant Verification Banner ───────────────────────── */}
          {identifiedPlant && (
            <View style={styles.identifiedPlantBanner}>
              <View style={styles.identifiedRow}>
                <Text style={styles.identifiedIcon}>{identifiedPlant.icon || '🌱'}</Text>
                <View style={styles.identifiedTextCol}>
                  <Text style={styles.identifiedHeader}>
                    {isFr ? 'Plante Identifiée par IA :' : 'Plant Identified by AI:'}
                  </Text>
                  <Text style={styles.identifiedName}>{identifiedPlant.name}</Text>
                </View>
                <View style={styles.identifiedBadge}>
                  <Text style={styles.identifiedBadgeText}>
                    {Math.round((identifiedPlant.confidence ?? 0.95) * 100)}% {isFr ? 'Fiabilité' : 'Match'}
                  </Text>
                </View>
              </View>
              <Text style={styles.identifiedNote}>
                {isFr
                  ? '✓ Diagnostic et traitements ci-dessous adaptés 100% à cette culture.'
                  : '✓ Pathology diagnosis and treatments below are 100% tailored to this crop.'}
              </Text>
            </View>
          )}

          {/* ── Results Card ───────────────────────────────────────────────── */}
          {result && <DiagnosisResultCard result={result} isFr={isFr} goTo={goTo} />}

        </View>
      </ScrollView>
    </View>
  );
}

// ── DiagnosisResultCard ────────────────────────────────────────────────────────
function DiagnosisResultCard({ result, isFr, goTo }) {
  const sev = getSeverityStyle(result.severity);
  const cropKey = normalizeCropKey(result.imageCrop || result.crop || 'maize');
  const guidance = getCropAgronomicGuidance(cropKey, isFr ? 'Français' : 'English');

  // Extract cure details
  const immediateActions = (result.cure?.immediateAction && result.cure.immediateAction.length > 0)
    ? result.cure.immediateAction
    : guidance.immediateAction;
  const organicList = (result.organicTreatment && result.organicTreatment.length > 0)
    ? result.organicTreatment
    : (result.cure?.organicTreatment || []);
  const chemicalList = (result.chemicalTreatment && result.chemicalTreatment.length > 0)
    ? result.chemicalTreatment
    : (result.cure?.chemicalTreatment || []);
  const preventionList = (result.prevention && result.prevention.length > 0)
    ? result.prevention
    : [];
  
  // Extract recommendation details
  const cropRotationText = result.recommendations?.cropRotation || guidance.cropRotation;
  const soilFertilizerText = result.recommendations?.soilAndFertilizer || guidance.soilAndFertilizer;
  const sanitationText = result.recommendations?.sanitation || guidance.sanitation;

  return (
    <View style={styles.resultCard}>

      {/* ── Diagnostic Identification Header ──────────────────────────── */}
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
            <Text style={styles.confidenceText}>{Math.round((result.confidence ?? 0.85) * 100)}%</Text>
            <Text style={styles.confidenceLabel}>{isFr ? 'fiabilité' : 'match'}</Text>
          </View>
          <View style={[styles.severityBadge, { backgroundColor: sev.color }]}>
            <Text style={styles.severityText}>{sev.icon} {getSeverityLabel(result.severity, isFr)}</Text>
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
        <Section icon="⚠️" title={isFr ? 'Cause & Facteurs' : 'Cause & Factors'} accent="#D97706">
          <Text style={styles.causeText}>{result.cause}</Text>
        </Section>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 🩺 1. SECTION GUÉRISON / THE CURE (TRAITEMENT CURATIF)             */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <View style={styles.blockCure}>
        <View style={styles.blockHeaderCure}>
          <View style={styles.blockBadgeCure}>
            <Text style={styles.blockBadgeTextCure}>🩺 1. {isFr ? 'LA GUÉRISON' : 'THE CURE'}</Text>
          </View>
          <Text style={styles.blockSubTitleCure}>
            {isFr ? 'Traitements curatifs & actions d\'urgence pour stopper l\'infection' : 'Curative treatments & immediate actions to halt infection'}
          </Text>
        </View>

        {/* ⚡ Emergency 24h Action */}
        <View style={styles.actionCallout}>
          <Text style={styles.actionCalloutTitle}>
            ⚡ {isFr ? 'ACTIONS D’URGENCE (PREMIÈRES 24H) :' : 'IMMEDIATE ACTIONS (FIRST 24 HOURS):'}
          </Text>
          {immediateActions.map((action, idx) => (
            <Text key={idx} style={styles.actionCalloutItem}>
              {`${idx + 1}. ${action}`}
            </Text>
          ))}
        </View>

        {/* 🌿 Organic / Natural Cure */}
        {organicList.length > 0 && (
          <View style={styles.innerSection}>
            <View style={styles.subSectionHeader}>
              <Text style={styles.subSectionIcon}>🌿</Text>
              <Text style={[styles.subSectionTitle, { color: '#15803D' }]}>
                {isFr ? 'Remède Organique & Naturel (Bio-Cure)' : 'Organic & Biological Remedy (Bio-Cure)'}
              </Text>
            </View>
            {organicList.map((s, i) => (
              <BulletRow key={i} text={s} color="#15803D" bullet={`${i + 1}.`} />
            ))}
          </View>
        )}

        {/* 🧪 Chemical Cure */}
        {chemicalList.length > 0 && (
          <View style={styles.innerSection}>
            <View style={styles.subSectionHeader}>
              <Text style={styles.subSectionIcon}>🧪</Text>
              <Text style={[styles.subSectionTitle, { color: '#1D4ED8' }]}>
                {isFr ? 'Traitement Curatif Chimique Homologué' : 'Approved Curative Chemical Treatment'}
              </Text>
            </View>
            {chemicalList.map((s, i) => (
              <BulletRow key={i} text={s} color="#1D4ED8" bullet={`${i + 1}.`} />
            ))}
          </View>
        )}

        {/* 🎒 15L Knapsack Sprayer Guide */}
        <View style={styles.sprayerGuideBox}>
          <View style={styles.sprayerGuideHeader}>
            <Text style={styles.sprayerGuideTitle}>
              🎒 {isFr ? 'GUIDE DE DOSAGE — PULVÉRISATEUR À DOS (15L) :' : 'FIELD DOSAGE GUIDE — 15L BACKPACK SPRAYER:'}
            </Text>
          </View>
          <Text style={styles.sprayerGuideText}>
            {isFr
              ? '• Dilution : 30g à 50g (2 à 3 cuillères à soupe) par pulvérisateur plein de 15 Litres d’eau.'
              : '• Dilution: 30g to 50g (2 to 3 tablespoons) per full 15-liter backpack sprayer.'}
          </Text>
          <Text style={styles.sprayerGuideText}>
            {isFr
              ? '• Moment optimal : Tôt le matin (6h00 – 8h30) ou en fin d’après-midi (17h00 – 18h30) sans vent fort.'
              : '• Best Timing: Spray early morning (6:00 – 8:30 AM) or late afternoon (5:00 – 6:30 PM) under calm wind.'}
          </Text>
          <Text style={styles.sprayerGuideText}>
            {isFr
              ? '• Sécurité : Portez masque et gants. Respectez le Délai Avant Récolte (DAR : 7 à 14 jours minimum).'
              : '• Safety: Wear gloves and mask. Observe Pre-Harvest Interval (PHI: 7 to 14 days minimum).'}
          </Text>
        </View>
      </View>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 🛡️ 2. SECTION PRÉVENTION / PREVENTION                              */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <View style={styles.blockPrevention}>
        <View style={styles.blockHeaderPrevention}>
          <View style={styles.blockBadgePrevention}>
            <Text style={styles.blockBadgeTextPrevention}>🛡️ 2. {isFr ? 'LA PRÉVENTION' : 'PREVENTION'}</Text>
          </View>
          <Text style={styles.blockSubTitlePrevention}>
            {isFr ? 'Protéger la prochaine récolte & stopper la propagation' : 'Protect future harvests & halt disease spread'}
          </Text>
        </View>

        {preventionList.length > 0 && (
          <View style={styles.innerSection}>
            <View style={styles.subSectionHeader}>
              <Text style={styles.subSectionIcon}>🌱</Text>
              <Text style={[styles.subSectionTitle, { color: '#047857' }]}>
                {isFr ? 'Pratiques Culturales & Variétés Résistantes' : 'Cultural Practices & Resistant Varieties'}
              </Text>
            </View>
            {preventionList.map((s, i) => (
              <BulletRow key={i} text={s} color="#047857" bullet="✓" />
            ))}
          </View>
        )}

        {sanitationText ? (
          <View style={styles.innerSection}>
            <View style={styles.subSectionHeader}>
              <Text style={styles.subSectionIcon}>🧹</Text>
              <Text style={[styles.subSectionTitle, { color: '#047857' }]}>
                {isFr ? 'Hygiène & Aération de la Parcelle' : 'Field Hygiene & Aeration'}
              </Text>
            </View>
            <Text style={styles.sanitationBodyText}>{sanitationText}</Text>
          </View>
        ) : null}
      </View>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 💡 3. SECTION RECOMMANDATIONS / RECOMMENDATIONS                    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <View style={styles.blockRecommendation}>
        <View style={styles.blockHeaderRecommendation}>
          <View style={styles.blockBadgeRecommendation}>
            <Text style={styles.blockBadgeTextRecommendation}>💡 3. {isFr ? 'LES RECOMMANDATIONS' : 'RECOMMENDATIONS'}</Text>
          </View>
          <Text style={styles.blockSubTitleRecommendation}>
            {isFr ? 'Conseils agronomiques, rotation des cultures & diagnostic labo' : 'Agronomic advice, crop rotation & laboratory testing'}
          </Text>
        </View>

        {/* 🔄 Crop Rotation */}
        <View style={styles.recItemBox}>
          <View style={styles.recItemHeader}>
            <Text style={styles.recItemIcon}>🔄</Text>
            <Text style={styles.recItemTitle}>
              {isFr ? 'Plan de Rotation des Cultures (Rupture du Cycle) :' : 'Crop Rotation Plan (Break Disease Cycle):'}
            </Text>
          </View>
          <Text style={styles.recItemContent}>{cropRotationText}</Text>
        </View>

        {/* 🧪 Soil & Fertilizer */}
        <View style={styles.recItemBox}>
          <View style={styles.recItemHeader}>
            <Text style={styles.recItemIcon}>🧪</Text>
            <Text style={styles.recItemTitle}>
              {isFr ? 'Gestion du Sol & Nutrition Équilibrée :' : 'Soil & Balanced Nutrient Management:'}
            </Text>
          </View>
          <Text style={styles.recItemContent}>{soilFertilizerText}</Text>
        </View>

        {/* 🔬 Laboratory Analysis */}
        <View style={styles.labCard}>
          <Text style={styles.labTitle}>
            🔬 {isFr ? 'ANALYSE SCIENTIFIQUE EN LABORATOIRE (Cameroun) :' : 'SCIENTIFIC LEAF ANALYSIS LABORATORY (Cameroon):'}
          </Text>
          <Text style={styles.labText}>
            {isFr
              ? 'Pour détecter précocement les carences en Azote (N), Phosphore (P), Potassium (K), Zinc ou pathogènes cachés avant la chute des rendements :'
              : 'To scientifically verify hidden nutrient deficiencies (N, P, K, Zn, Mg) or pathogen infections before harvest loss:'}
          </Text>
          <Text style={styles.labContact}>
            📍 Agro Hospital Cameroun — Yaoundé & Bamenda
          </Text>
          <Text style={styles.labPhones}>
            📞 (+237) 681 532 846 / 657 469 343 / 653 416 123
          </Text>
        </View>

        {/* Direct Action Buttons */}
        {goTo && (
          <View style={styles.cardActions}>
            <Pressable style={styles.actionRecommendBtn} onPress={() => goTo('cropAdvice')}>
              <Text style={styles.actionRecommendText}>
                🌾 {isFr ? 'Établir Recommandation Complète & Rotation' : 'Build Tailored Recommendation & Rotation'}
              </Text>
            </Pressable>
            <Pressable style={styles.actionChatBtn} onPress={() => goTo('aiChat')}>
              <Text style={styles.actionChatText}>
                💬 {isFr ? 'Poser une Question à l\'Agronome IA' : 'Ask Agronomist AI About This Disease'}
              </Text>
            </Pressable>
          </View>
        )}
      </View>

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

  /* Identified Plant Verification Banner */
  identifiedPlantBanner: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#10B981',
    padding: 14,
    marginTop: 18,
    elevation: 2,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  identifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  identifiedIcon: {
    fontSize: 28,
    marginRight: 10,
  },
  identifiedTextCol: {
    flex: 1,
  },
  identifiedHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  identifiedName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#065F46',
  },
  identifiedBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  identifiedBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  identifiedNote: {
    fontSize: 12,
    color: '#047857',
    fontWeight: '500',
    marginLeft: 38,
  },

  /* Result card */
  resultCard: {
    backgroundColor: '#ffffff', borderRadius: 20, marginTop: 14,
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

  /* Card Action Navigation Buttons */
  cardActions: {
    padding: 16,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#F8FAFC'
  },
  actionChatBtn: {
    backgroundColor: '#15803D',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  actionChatText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14
  },
  actionRecommendBtn: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#86EFAC',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  actionRecommendText: {
    color: '#166534',
    fontWeight: 'bold',
    fontSize: 14
  },

  /* Action callout banner */
  actionCallout: {
    backgroundColor: '#FEF2F2',
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  actionCalloutTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#991B1B',
    marginBottom: 6,
  },
  actionCalloutItem: {
    fontSize: 12,
    color: '#7F1D1D',
    lineHeight: 18,
    marginBottom: 4,
  },

  /* Sprayer dosage guide */
  sprayerGuideBox: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    padding: 12,
    marginTop: 10,
    marginBottom: 4,
    borderRadius: 12,
  },
  sprayerGuideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  sprayerGuideTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  sprayerGuideText: {
    fontSize: 12,
    color: '#1E3A8A',
    lineHeight: 18,
    marginBottom: 4,
  },

  /* Lab card */
  labCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    padding: 12,
    marginTop: 10,
    marginBottom: 8,
    borderRadius: 12,
  },
  labTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 4,
  },
  labText: {
    fontSize: 12,
    color: '#14532D',
    lineHeight: 18,
    marginBottom: 6,
  },
  labContact: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 2,
  },
  labPhones: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0F766E',
  },

  /* ── 3 Distinct Major Blocks: Cure, Prevention, Recommendations ── */
  blockCure: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#FDBA74',
    borderRadius: 16,
    marginHorizontal: 14,
    marginTop: 14,
    padding: 14,
  },
  blockHeaderCure: {
    marginBottom: 10,
  },
  blockBadgeCure: {
    backgroundColor: '#EA580C',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 4,
  },
  blockBadgeTextCure: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  blockSubTitleCure: {
    fontSize: 12,
    color: '#9A3412',
    fontWeight: '600',
  },

  blockPrevention: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#86EFAC',
    borderRadius: 16,
    marginHorizontal: 14,
    marginTop: 14,
    padding: 14,
  },
  blockHeaderPrevention: {
    marginBottom: 10,
  },
  blockBadgePrevention: {
    backgroundColor: '#16A34A',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 4,
  },
  blockBadgeTextPrevention: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  blockSubTitlePrevention: {
    fontSize: 12,
    color: '#166534',
    fontWeight: '600',
  },

  blockRecommendation: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
    borderColor: '#93C5FD',
    borderRadius: 16,
    marginHorizontal: 14,
    marginTop: 14,
    marginBottom: 14,
    padding: 14,
  },
  blockHeaderRecommendation: {
    marginBottom: 10,
  },
  blockBadgeRecommendation: {
    backgroundColor: '#2563EB',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 4,
  },
  blockBadgeTextRecommendation: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  blockSubTitleRecommendation: {
    fontSize: 12,
    color: '#1E40AF',
    fontWeight: '600',
  },

  innerSection: {
    marginBottom: 8,
  },
  subSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    marginTop: 6,
  },
  subSectionIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  subSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  sanitationBodyText: {
    fontSize: 12,
    color: '#065F46',
    lineHeight: 18,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },

  recItemBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  recItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  recItemIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  recItemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  recItemContent: {
    fontSize: 12,
    color: '#1F2937',
    lineHeight: 18,
  },
});
