import React from 'react';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import FarmerDashboard from '../screens/farmer/FarmerDashboard';
import DiagnosisScreen from '../screens/diagnosis/DiagnosisScreen';
import CropAdviceScreen from '../screens/recommendation/CropAdviceScreen';
import AIAssistantScreen from '../screens/assistant/AIAssistantScreen';
import SurveyScreen from '../screens/survey/SurveyScreen';
import AdminDashboard from '../screens/AdminDashboard';
import NotificationCenterScreen from '../screens/notifications/NotificationCenterScreen';

export default function AppNavigator({ route, setRoute, language, setLanguage, userEmail, setUserEmail }) {
  const goTo = setRoute;

  switch (route) {
    case 'welcome':
      return <WelcomeScreen goTo={goTo} setLanguage={setLanguage} currentLanguage={language} />;
    case 'login':
      return <LoginScreen goTo={goTo} userEmail={userEmail} setUserEmail={setUserEmail} language={language} />;
    case 'register':
      return <RegisterScreen goTo={goTo} setUserEmail={setUserEmail} language={language} />;
    case 'home':
      return <FarmerDashboard goTo={goTo} language={language} />;
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
    default:
      return <WelcomeScreen goTo={goTo} setLanguage={setLanguage} currentLanguage={language} />;
  }
}
