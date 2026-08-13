import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';

export default function AIAssistantScreen({ goTo }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('Ask about crop disease, pests, irrigation, or fertilizer use.');

  const handleSend = () => {
    const lower = question.toLowerCase();
    if (!question.trim()) {
      setAnswer('Please type a question about your crop or pest problem.');
      return;
    }

    if (lower.includes('cassava')) {
      setAnswer('Cassava may need resistant stems and good field hygiene. Remove infected plants early and avoid replanting from diseased shoots.');
    } else if (lower.includes('maize')) {
      setAnswer('Maize rust and blight respond well to crop rotation, balanced fertilization, and prompt removal of infected leaves.');
    } else if (lower.includes('tomato')) {
      setAnswer('Tomatoes do best with regular watering at the roots, strong staking, and protection from leaf diseases through good airflow.');
    } else {
      setAnswer('This is a prototype assistant. Use local crop examples like cassava, maize, or tomato for specific advice.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AI Assistant</Text>
      <Text style={styles.subtitle}>Ask a farming question and get practical guidance.</Text>
      <View style={styles.chatCard}>
        <Text style={styles.chatLabel}>Chat response</Text>
        <Text style={styles.chatText}>{answer}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="How do I protect cassava from mosaic virus?"
        value={question}
        onChangeText={setQuestion}
        multiline
      />
      <Pressable style={styles.primaryButton} onPress={handleSend}>
        <Text style={styles.primaryButtonText}>Send</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={() => goTo('home')}>
        <Text style={styles.secondaryButtonText}>Back to dashboard</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
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
  chatCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  chatLabel: {
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  chatText: {
    color: '#424242',
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    marginBottom: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
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
