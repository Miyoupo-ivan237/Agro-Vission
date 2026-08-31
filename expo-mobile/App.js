import React, { useState, Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Pressable } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import FarmerDashboard from './screens/FarmerDashboard';
import DiagnosisScreen from './screens/DiagnosisScreen';
import CropAdviceScreen from './screens/CropAdviceScreen';
import AIAssistantScreen from './screens/AIAssistantScreen';
import SurveyScreen from './screens/SurveyScreen';
import AdminDashboard from './screens/AdminDashboard';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('App Error Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.errorContainer}>
          <Text style={styles.errorIcon}>🍃</Text>
          <Text style={styles.errorTitle}>PACNOVA Agro-Vission</Text>
          <Text style={styles.errorSub}>Loading agricultural environment...</Text>
          <Pressable
            style={styles.retryButton}
            onPress={() => {
              this.setState({ hasError: false, error: null });
              if (this.props.onReset) this.props.onReset();
            }}
          >
            <Text style={styles.retryButtonText}>Start Farmer App</Text>
          </Pressable>
        </SafeAreaView>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('welcome');
  const [userEmail, setUserEmail] = useState(null);
  const [language, setLanguage] = useState('English');

  const renderScreen = () => {
    switch (currentRoute) {
      case 'welcome':
        return <WelcomeScreen goTo={setCurrentRoute} setLanguage={setLanguage} currentLanguage={language} />;
      case 'login':
        return <LoginScreen goTo={setCurrentRoute} userEmail={userEmail} setUserEmail={setUserEmail} language={language} />;
      case 'register':
        return <RegisterScreen goTo={setCurrentRoute} setUserEmail={setUserEmail} language={language} />;
      case 'home':
        return <FarmerDashboard goTo={setCurrentRoute} language={language} />;
      case 'admin':
        return <AdminDashboard goTo={setCurrentRoute} language={language} />;
      case 'diagnosis':
        return <DiagnosisScreen goTo={setCurrentRoute} language={language} />;
      case 'cropAdvice':
        return <CropAdviceScreen goTo={setCurrentRoute} language={language} />;
      case 'aiChat':
        return <AIAssistantScreen goTo={setCurrentRoute} language={language} />;
      case 'survey':
        return <SurveyScreen goTo={setCurrentRoute} language={language} />;
      default:
        return <WelcomeScreen goTo={setCurrentRoute} setLanguage={setLanguage} currentLanguage={language} />;
    }
  };

  return (
    <ErrorBoundary onReset={() => setCurrentRoute('welcome')}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        {renderScreen()}
      </SafeAreaView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F1F8E9',
  },
  errorIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  errorSub: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    elevation: 3,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

