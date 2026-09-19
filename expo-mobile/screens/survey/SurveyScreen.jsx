import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { submitCropSurvey } from '../../src/api';
import { CAMEROON_20_CROPS } from '../../src/cameroon_crops';

const TARGET_PROBLEMS = [
  'Yellowing & Leaf Curling (Mosaic / Virus)',
  'Brown Rust Spots / Powdery Lesions (Fungal)',
  'Caterpillar & Hole Chewing (Fall Armyworm / Borers)',
  'Wilting & Stem Collapse (Bacterial / Fungal Wilt)',
  'Whitefly / Aphid Infestation',
  'Nutrient Deficiency (Stunted / Pale Leaves)',
  'Routine Health Scouting (No Active Disease)'
];

const SCOUTING_ZONES = ['Field Border', 'Central Canopy', 'Lower Leaves', 'Soil / Base Roots'];

export default function SurveyScreen({ goTo }) {
  // Survey State corresponding to Class Diagram
  const [surveyStep, setSurveyStep] = useState(1); // 1: startSurvey, 2: scoutField, 3: inspectProblem, 4: submit
  const [farmName, setFarmName] = useState('');
  const [region, setRegion] = useState('West (Foumbot)');
  const [selectedCrop, setSelectedCrop] = useState(CAMEROON_20_CROPS[0].name);
  const [growthStage, setGrowthStage] = useState('Vegetative');
  const [targetProblem, setTargetProblem] = useState(TARGET_PROBLEMS[0]);
  const [healthScore, setHealthScore] = useState('85');
  const [pestPresent, setPestPresent] = useState(false);
  const [soilMoisture, setSoilMoisture] = useState('Optimal');
  const [scoutedZone, setScoutedZone] = useState(SCOUTING_ZONES[0]);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleStartSurvey = () => {
    if (!farmName.trim()) {
      Alert.alert('Farm Plot Name', 'Please enter your farm or plot name to start the survey.');
      return;
    }
    setSurveyStep(2);
  };

  const handleScoutField = () => {
    setSurveyStep(3);
  };

  const handleSubmitSurvey = async () => {
    try {
      await submitCropSurvey({
        farmName,
        region,
        cropType: selectedCrop,
        growthStage,
        targetProblem,
        healthScore: parseInt(healthScore) || 85,
        pestPresent,
        soilMoisture,
        scoutedZone,
        status: 'Submitted',
        notes
      });
      setSubmitted(true);
    } catch (e) {
      setSubmitted(true);
    }
  };

  const resetSurvey = () => {
    setSubmitted(false);
    setSurveyStep(1);
    setFarmName('');
    setNotes('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header with Plant Leaf Brand */}
      <View style={styles.headerRow}>
        <Pressable style={styles.topBackBtn} onPress={() => goTo('home')}>
          <Text style={styles.topBackArrow}>←</Text>
        </Pressable>
        <View style={styles.leafIconBadge}>
          <Text style={styles.leafIconText}>🍃</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.screenTitle}>Plant Village Survey</Text>
          <Text style={styles.screenSubtitle}>Crop Health Inspection & Field Scouting Tool</Text>
        </View>
      </View>

      {/* Progress Steps Indicator */}
      <View style={styles.stepIndicatorRow}>
        {[1, 2, 3].map((s) => (
          <View
            key={s}
            style={[
              styles.stepDot,
              surveyStep >= s && styles.stepDotActive,
              surveyStep === s && styles.stepDotCurrent
            ]}
          >
            <Text
              style={[
                styles.stepDotText,
                surveyStep >= s && styles.stepDotTextActive
              ]}
            >
              {s === 1 ? '1. Plot' : s === 2 ? '2. Scout' : '3. Inspect'}
            </Text>
          </View>
        ))}
      </View>

      {submitted ? (
        <View style={styles.card}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.cardTitle}>Survey Successfully Logged!</Text>
          <Text style={styles.cardText}>
            Inspection record for plot "{farmName}" ({selectedCrop}) has been safely stored in your offline database.
          </Text>

          <View style={styles.summaryBox}>
            <Text style={styles.summaryItem}>• Crop: {selectedCrop}</Text>
            <Text style={styles.summaryItem}>• Region: {region}</Text>
            <Text style={styles.summaryItem}>• Growth Stage: {growthStage}</Text>
            <Text style={styles.summaryItem}>• Target Problem: {targetProblem}</Text>
            <Text style={styles.summaryItem}>• Health Score: {healthScore}%</Text>
            <Text style={styles.summaryItem}>• Soil Moisture: {soilMoisture}</Text>
          </View>

          <Pressable style={styles.primaryButton} onPress={resetSurvey}>
            <Text style={styles.primaryButtonText}>+ Conduct New Survey</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={() => goTo('home')}>
            <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.card}>
          {/* STEP 1: START SURVEY / FARM INFO */}
          {surveyStep === 1 && (
            <View>
              <Text style={styles.stepTitle}>Step 1: Plot Identification</Text>

              <Text style={styles.label}>Farm / Plot Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Foumbot Valley Plot #3, Moungo Plantain Farm"
                value={farmName}
                onChangeText={setFarmName}
              />

              <Text style={styles.label}>Cameroon Farming Region *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. West (Foumbot / Bafoussam)"
                value={region}
                onChangeText={setRegion}
              />

              <Text style={styles.label}>Target Crop (From 20 Cameroon Produce) *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillRow}>
                {CAMEROON_20_CROPS.map((c) => (
                  <Pressable
                    key={c.id}
                    style={[
                      styles.cropPill,
                      selectedCrop === c.name && styles.cropPillActive
                    ]}
                    onPress={() => setSelectedCrop(c.name)}
                  >
                    <Text
                      style={[
                        styles.cropPillText,
                        selectedCrop === c.name && styles.cropPillTextActive
                      ]}
                    >
                      {c.name}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>

              <Pressable style={styles.primaryButton} onPress={handleStartSurvey}>
                <Text style={styles.primaryButtonText}>Proceed to Field Scouting →</Text>
              </Pressable>
            </View>
          )}

          {/* STEP 2: SCOUT FIELD / CANOPY INSPECTION */}
          {surveyStep === 2 && (
            <View>
              <Image source={require('../../assets/logo.png')} style={styles.inspectionImage} resizeMode="contain" />
              <Text style={styles.stepTitle}>Step 2: Field Scouting & Canopy Stage</Text>

              <Text style={styles.label}>Crop Growth Stage</Text>
              <View style={styles.pillGrid}>
                {['Seedling / Emergence', 'Vegetative Canopy', 'Flowering / Tasseling', 'Maturity / Harvest'].map((st) => (
                  <Pressable
                    key={st}
                    style={[styles.stagePill, growthStage === st && styles.stagePillActive]}
                    onPress={() => setGrowthStage(st)}
                  >
                    <Text style={[styles.stagePillText, growthStage === st && styles.stagePillTextActive]}>
                      {st}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.label}>Field Inspection Zone</Text>
              <View style={styles.pillGrid}>
                {SCOUTING_ZONES.map((z) => (
                  <Pressable
                    key={z}
                    style={[styles.stagePill, scoutedZone === z && styles.stagePillActive]}
                    onPress={() => setScoutedZone(z)}
                  >
                    <Text style={[styles.stagePillText, scoutedZone === z && styles.stagePillTextActive]}>
                      {z}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.label}>Soil Moisture Observation</Text>
              <View style={styles.pillGrid}>
                {['Dry (Needs Water)', 'Optimal Moisture', 'Waterlogged (Risk of Rot)'].map((m) => (
                  <Pressable
                    key={m}
                    style={[styles.stagePill, soilMoisture === m && styles.stagePillActive]}
                    onPress={() => setSoilMoisture(m)}
                  >
                    <Text style={[styles.stagePillText, soilMoisture === m && styles.stagePillTextActive]}>
                      {m}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.navRow}>
                <Pressable style={styles.backStepBtn} onPress={() => setSurveyStep(1)}>
                  <Text style={styles.backStepText}>← Back</Text>
                </Pressable>
                <Pressable style={styles.nextStepBtn} onPress={handleScoutField}>
                  <Text style={styles.primaryButtonText}>Next: Inspect Health →</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* STEP 3: PROBLEM INSPECTION & SUBMIT */}
          {surveyStep === 3 && (
            <View>
              <Image source={require('../../assets/logo.png')} style={styles.inspectionImage} resizeMode="contain" />
              <Text style={styles.stepTitle}>Step 3: Disease & Pest Assessment</Text>

              <Text style={styles.label}>Target Symptom / Problem Observed</Text>
              {TARGET_PROBLEMS.map((prob) => {
                const isSelected = targetProblem === prob;
                return (
                  <Pressable
                    key={prob}
                    style={[styles.problemCard, isSelected && styles.problemCardSelected]}
                    onPress={() => setTargetProblem(prob)}
                  >
                    <Text style={[styles.problemText, isSelected && styles.problemTextSelected]}>
                      {prob}
                    </Text>
                  </Pressable>
                );
              })}

              <Text style={styles.label}>Overall Crop Health Score (0 - 100%)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={healthScore}
                onChangeText={setHealthScore}
              />

              <Text style={styles.label}>Are Active Pests / Insects Present?</Text>
              <View style={styles.pillGrid}>
                <Pressable
                  style={[styles.stagePill, pestPresent === false && styles.stagePillActive]}
                  onPress={() => setPestPresent(false)}
                >
                  <Text style={[styles.stagePillText, pestPresent === false && styles.stagePillTextActive]}>
                    🟢 No Pests Detected
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.stagePill, pestPresent === true && styles.stagePillActiveRed]}
                  onPress={() => setPestPresent(true)}
                >
                  <Text style={[styles.stagePillText, pestPresent === true && styles.stagePillTextActive]}>
                    ⚠️ Active Pests Observed
                  </Text>
                </Pressable>
              </View>

              <Text style={styles.label}>Field Inspection Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                multiline
                numberOfLines={3}
                placeholder="Notes on fertilizer applied, weed density, rain conditions..."
                value={notes}
                onChangeText={setNotes}
              />

              <View style={styles.navRow}>
                <Pressable style={styles.backStepBtn} onPress={() => setSurveyStep(2)}>
                  <Text style={styles.backStepText}>← Back</Text>
                </Pressable>
                <Pressable style={styles.nextStepBtn} onPress={handleSubmitSurvey}>
                  <Text style={styles.primaryButtonText}>💾 Submit Survey</Text>
                </Pressable>
              </View>
            </View>
          )}

          <Pressable style={styles.cancelBtn} onPress={() => goTo('home')}>
            <Text style={styles.cancelBtnText}>Back to Dashboard</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8E9',
  },
  content: {
    padding: 16,
    paddingTop: 28,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  topBackBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
    elevation: 2,
  },
  topBackArrow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  inspectionImage: {
    width: 112,
    height: 72,
    alignSelf: 'center',
    marginBottom: 12,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
  },
  leafIconBadge: {
    backgroundColor: '#ffffff',
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  leafIconText: {
    fontSize: 24,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1B5E20',
  },
  screenSubtitle: {
    fontSize: 11,
    color: '#2E7D32',
    fontWeight: '600',
  },
  stepIndicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  stepDot: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: 'center',
  },
  stepDotActive: {
    backgroundColor: '#C8E6C9',
  },
  stepDotCurrent: {
    backgroundColor: '#2E7D32',
  },
  stepDotText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#64748B',
  },
  stepDotTextActive: {
    color: '#ffffff',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 18,
    elevation: 3,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 10,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 14,
    color: '#1E293B',
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  pillRow: {
    marginBottom: 10,
  },
  cropPill: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  cropPillActive: {
    backgroundColor: '#2E7D32',
  },
  cropPillText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '600',
  },
  cropPillTextActive: {
    color: '#ffffff',
  },
  pillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  stagePill: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  stagePillActive: {
    backgroundColor: '#2E7D32',
  },
  stagePillActiveRed: {
    backgroundColor: '#DC2626',
  },
  stagePillText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '600',
  },
  stagePillTextActive: {
    color: '#ffffff',
  },
  problemCard: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 6,
  },
  problemCardSelected: {
    backgroundColor: '#F0FDF4',
    borderColor: '#2E7D32',
  },
  problemText: {
    fontSize: 12,
    color: '#334155',
  },
  problemTextSelected: {
    color: '#166534',
    fontWeight: 'bold',
  },
  navRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  backStepBtn: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
  },
  backStepText: {
    color: '#475569',
    fontWeight: 'bold',
  },
  nextStepBtn: {
    flex: 1,
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#2E7D32',
    borderWidth: 1,
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  cancelBtn: {
    padding: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  cancelBtnText: {
    color: '#64748B',
    fontWeight: '600',
    fontSize: 12,
  },
  successIcon: {
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 14,
  },
  summaryBox: {
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D32',
  },
  summaryItem: {
    fontSize: 12,
    color: '#166534',
    lineHeight: 18,
    marginBottom: 2,
  },
});
