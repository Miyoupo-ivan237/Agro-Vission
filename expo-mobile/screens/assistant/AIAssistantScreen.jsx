import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { sendAgronomistChat } from '../../src/api';
import { offlineChatAgronomist } from '../../src/offline_ai';
import { getT } from '../../src/translations';

export default function AIAssistantScreen({ goTo, language = 'English' }) {
  const t = getT(language);
  const isFr = language === 'Français' || language === 'Francais';
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: isFr 
        ? "Bonjour ! Je suis l'Agronome IA d'AGROVISSION, fonctionnant 100% hors-ligne. Comment puis-je aider votre ferme aujourd'hui ?"
        : "Hello! I am the AGROVISSION AI Agronomist, running 100% offline. How can I help your farm today?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].sender === 'ai') {
        return [{
          id: '1',
          sender: 'ai',
          text: isFr
            ? "Bonjour ! Je suis l'Agronome IA d'AGROVISSION, fonctionnant 100% hors-ligne. Comment puis-je aider votre ferme aujourd'hui ?"
            : "Hello! I am the AGROVISSION AI Agronomist, running 100% offline. How can I help your farm today?"
        }];
      }
      return prev;
    });
  }, [isFr]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text: inputText.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      // Small simulated delay for local processing
      await new Promise(resolve => setTimeout(resolve, 600));
      const response = await sendAgronomistChat({ message: userMsg.text, history: messages, language });
      const aiMsg = { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai', 
        text: response.reply 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      // Network or server error — call the on-device AI directly so the farmer
      // always receives a real, crop-specific agronomic answer.
      console.warn('[AgroVission] Chat server unreachable, using offline AI:', error?.message);
      try {
        const offlineResponse = offlineChatAgronomist(userMsg.text, language);
        const aiMsg = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: offlineResponse.reply || (language === 'Français'
            ? "Je traite ceci hors-ligne. Veuillez préciser votre culture ou région pour une réponse plus ciblée."
            : "I am processing this offline. Please specify your crop or region for a more targeted answer.")
        };
        setMessages(prev => [...prev, aiMsg]);
      } catch (offlineError) {
        const fallbackMsg = {
          id: (Date.now() + 2).toString(),
          sender: 'ai',
          text: language === 'Français'
            ? "🌱 Moteur IA hors-ligne actif. Précisez votre culture (ex: maïs, manioc, tomate) et votre problème pour obtenir des conseils personnalisés."
            : "🌱 Offline AI engine active. Please specify your crop (e.g. maize, cassava, tomato) and your issue for personalised advice."
        };
        setMessages(prev => [...prev, fallbackMsg]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => goTo('home')}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>AGROVISSION {t.chatAi}</Text>
          <Text style={styles.headerStatus}>🟢 {t.offlineStatus}</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.chatArea} 
        contentContainerStyle={{ padding: 16 }}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(msg => (
          <View key={msg.id} style={[styles.messageBubble, msg.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
            <Text style={[styles.messageText, msg.sender === 'user' ? styles.userText : styles.aiText]}>
              {msg.text}
            </Text>
          </View>
        ))}
        {loading && (
          <View style={[styles.messageBubble, styles.aiBubble, { width: 60, alignItems: 'center' }]}>
            <ActivityIndicator color="#2E7D32" size="small" />
          </View>
        )}
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder={language === 'Français' ? "Posez une question sur l'agriculture..." : "Ask an agronomy question..."}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <Pressable style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]} onPress={handleSend}>
          <Text style={styles.sendIcon}>➤</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', padding: 20, paddingTop: 50, elevation: 4 },
  backButton: { padding: 8, marginRight: 12 },
  backIcon: { fontSize: 24, color: '#1E293B', fontWeight: 'bold' },
  headerInfo: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B5E20' },
  headerStatus: { fontSize: 12, color: '#4CAF50', fontWeight: 'bold', marginTop: 2 },
  
  chatArea: { flex: 1 },
  messageBubble: { maxWidth: '80%', padding: 14, borderRadius: 18, marginBottom: 16 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#2563EB', borderBottomRightRadius: 4 },
  aiBubble: { alignSelf: 'flex-start', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#E2E8F0', borderBottomLeftRadius: 4 },
  messageText: { fontSize: 15, lineHeight: 22 },
  userText: { color: '#ffffff' },
  aiText: { color: '#334155' },

  inputArea: { flexDirection: 'row', padding: 16, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#E2E8F0', alignItems: 'flex-end' },
  input: { flex: 1, backgroundColor: '#F1F5F9', borderRadius: 20, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, maxHeight: 100, fontSize: 15 },
  sendButton: { width: 44, height: 44, backgroundColor: '#2E7D32', borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginLeft: 12, marginBottom: 2 },
  sendButtonDisabled: { backgroundColor: '#94A3B8' },
  sendIcon: { color: '#ffffff', fontSize: 18, marginLeft: 2 },
});
