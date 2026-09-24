import React from 'react';
import LanguageSelectionScreen from '../screens/auth/LanguageSelectionScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import FarmerDashboard from '../screens/farmer/FarmerDashboard';
import DiagnosisScreen from '../screens/diagnosis/DiagnosisScreen';
import CropAdviceScreen from '../screens/recommendation/CropAdviceScreen';
import AIAssistantScreen from '../screens/assistant/AIAssistantScreen';
import SurveyScreen from '../screens/survey/SurveyScreen';
import AdminDashboard from '../screens/auth/AdminDashboard';
import NotificationCenterScreen from '../screens/notifications/NotificationCenterScreen';
import HistoryScreen from '../screens/farmer/HistoryScreen';
import AccountScreen from '../screens/farmer/AccountScreen';

export default function AppNavigator({ route, setRoute, language, setLanguage, userEmail, setUserEmail }) {
  const goTo = setRoute;

  // Protected features require user account creation / login first
  const isProtected = ['home', 'account', 'admin', 'diagnosis', 'cropAdvice', 'aiChat', 'survey', 'notifications', 'history'].includes(route);
  if (isProtected && !userEmail) {
    return <WelcomeScreen goTo={goTo} currentLanguage={language} setLanguage={setLanguage} userEmail={userEmail} setUserEmail={setUserEmail} />;
  }

  switch (route) {
    case 'language':
      return <LanguageSelectionScreen language={language} setLanguage={setLanguage} goTo={goTo} />;
    case 'welcome':
      return <WelcomeScreen goTo={goTo} currentLanguage={language} setLanguage={setLanguage} userEmail={userEmail} setUserEmail={setUserEmail} />;
    case 'login':
      return <LoginScreen goTo={goTo} userEmail={userEmail} setUserEmail={setUserEmail} language={language} />;
    case 'register':
      return <RegisterScreen goTo={goTo} setUserEmail={setUserEmail} language={language} />;
    case 'home':
      return <FarmerDashboard goTo={goTo} language={language} userEmail={userEmail} setUserEmail={setUserEmail} />;
    case 'account':
      return <AccountScreen goTo={goTo} language={language} userEmail={userEmail} setUserEmail={setUserEmail} />;
    case 'admin':
      return <AdminDashboard goTo={goTo} language={language} />;
    case 'diagnosis':
      return <DiagnosisScreen goTo={goTo} language={language} />;
    case 'cropAdvice':
      return <CropAdviceScreen goTo={goTo} language={language} />;
    case 'aiChat':
      return <AIAssistantScreen goTo={goTo} language={language} />;
    case 'survey':
      return <SurveyScreen goTo={goTo} language={language} />;
    case 'notifications':
      return <NotificationCenterScreen goTo={goTo} language={language} />;
    case 'history':
      return <HistoryScreen goTo={goTo} language={language} />;
    default:
      return <WelcomeScreen goTo={goTo} currentLanguage={language} setLanguage={setLanguage} userEmail={userEmail} setUserEmail={setUserEmail} />;
  }
}
