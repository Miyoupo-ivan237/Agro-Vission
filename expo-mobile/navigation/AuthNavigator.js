import React from 'react';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

export default function AuthNavigator({ route, setRoute, language, setLanguage, userEmail, setUserEmail }) {
  if (route === 'login') return <LoginScreen goTo={setRoute} userEmail={userEmail} setUserEmail={setUserEmail} language={language} />;
  if (route === 'register') return <RegisterScreen goTo={setRoute} setUserEmail={setUserEmail} language={language} />;
  return <WelcomeScreen goTo={setRoute} setLanguage={setLanguage} currentLanguage={language} />;
}
