import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import LanguageSelectionScreen from './screens/LanguageSelectionScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import FarmerDashboard from './screens/FarmerDashboard';
import DiagnosisScreen from './screens/DiagnosisScreen';
import CropAdviceScreen from './screens/CropAdviceScreen';
import HistoryScreen from './screens/HistoryScreen';

export default function App() {
  const [route, setRoute] = useState('language');
  const [language, setLanguage] = useState('English');
  const [userEmail, setUserEmail] = useState('');

  const goTo = (name) => setRoute(name);

  const renderRoute = () => {
    switch (route) {
      case 'language':
        return <LanguageSelectionScreen language={language} setLanguage={setLanguage} goTo={goTo} />;
      case 'welcome':
        return <WelcomeScreen goTo={goTo} />;
      case 'register':
        return <RegisterScreen goTo={goTo} setUserEmail={setUserEmail} />;
      case 'login':
        return <LoginScreen goTo={goTo} userEmail={userEmail} setUserEmail={setUserEmail} />;
      case 'home':
        return <FarmerDashboard goTo={goTo} userEmail={userEmail} />;
      case 'diagnosis':
        return <DiagnosisScreen goTo={goTo} />;
      case 'cropAdvice':
        return <CropAdviceScreen goTo={goTo} />;
      case 'history':
        return <HistoryScreen goTo={goTo} />;
      default:
        return <LanguageSelectionScreen language={language} setLanguage={setLanguage} goTo={goTo} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>{renderRoute()}</ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8E9',
  },
  content: {
    flexGrow: 1,
  },
});
