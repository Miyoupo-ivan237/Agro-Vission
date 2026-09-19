import React, { useState, useEffect, Component } from 'react';
import { Text, StyleSheet, StatusBar, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { setupNotificationChannel, addNotificationTapListener } from './services/localNotificationService';

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
          <Text style={styles.errorTitle}>AGROVISSION</Text>
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
  const [currentRoute, setCurrentRoute] = useState('language');
  const [userEmail, setUserEmail] = useState(null);
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    // Set up local notification channel (Android) — NO push tokens
    setupNotificationChannel();
    // Listen for notification taps (e.g. to navigate)
    const sub = addNotificationTapListener((notification) => {
      const type = notification.request?.content?.data?.type;
      if (type === 'two_week_follow_up') setCurrentRoute('home');
    });
    return () => sub.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <ErrorBoundary onReset={() => setCurrentRoute('welcome')}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
          <AppNavigator
            route={currentRoute}
            setRoute={setCurrentRoute}
            language={language}
            setLanguage={setLanguage}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
          />
        </SafeAreaView>
      </ErrorBoundary>
    </SafeAreaProvider>
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

