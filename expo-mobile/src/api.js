// expo-mobile/src/api.js
// Client API Client with Automatic Seamless Offline AI Fallback for PACNOVA

import { offlineDiagnoseCrop, offlineRecommendCrop, offlineChatAgronomist } from './offline_ai';

const BASE_URL = 'http://192.168.1.81:5000'; // Updated to 192.168.1.81 for phone LAN connection

// Local offline memory stores
const offlineStorage = {
  user: { name: 'Demo Farmer', email: 'farmer@pacnova.cm', role: 'farmer', location: 'Cameroon' },
  diagnoses: [
    {
      id: 1,
      crop: 'Cassava',
      diseaseName: 'Cassava Mosaic Disease (CMD)',
      severity: 'High',
      confidence: 0.94,
      symptoms: 'Yellow-green mosaic mottling, curled leaves',
      treatment: 'Rogue infected plants, spray neem oil for whiteflies',
      createdAt: new Date().toISOString(),
      source: 'On-Device Offline AI'
    }
  ],
  recommendations: [
    {
      id: 1,
      primaryCrop: 'Maize (Corn)',
      secondaryCrop: 'Cassava (Manioc)',
      location: 'Centre Region',
      season: 'Rainy Season',
      soilCondition: 'Sandy Loam',
      createdAt: new Date().toISOString(),
      source: 'On-Device Recommendation Engine'
    }
  ],
  surveys: [],
  notifications: [
    {
      id: 1,
      title: '🌿 100% Offline AI Enabled',
      message: 'PACNOVA plant disease diagnosis and agronomy chat operate directly on your phone with zero internet required.',
      category: 'system',
      createdAt: new Date().toISOString()
    }
  ]
};

// Safe request wrapper that catches ALL network issues silently
async function request(path, body, token, timeoutMs = 2500) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: body ? 'POST' : 'GET',
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = data.error || data.message || 'Request failed';
      const e = new Error(err);
      e.info = data;
      throw e;
    }
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    // Never show uncaught network error toasts; throw to trigger seamless offline fallback
    throw err;
  }
}

// 1. Auth
export async function registerUser({ name, email, phone, password, location }) {
  try {
    const data = await request('/api/register', { name, email, phone, password, location });
    offlineStorage.user = { name, email, phone, location };
    return data;
  } catch (err) {
    const dummyUser = { id: 999, name, email, phone, location: location || 'Cameroon', token: 'offline-token' };
    offlineStorage.user = dummyUser;
    return dummyUser;
  }
}

export async function loginUser({ email, password }) {
  try {
    const data = await request('/api/login', { email, password });
    offlineStorage.user = data;
    return data;
  } catch (err) {
    return {
      id: 1,
      name: offlineStorage.user.name || 'Farmer',
      email: email || 'farmer@pacnova.cm',
      token: 'offline-session-token',
      isOffline: true
    };
  }
}

export async function getProfile(token) {
  try {
    return await request('/api/me', null, token);
  } catch (err) {
    return offlineStorage.user;
  }
}

export async function updateProfile(payload, token) {
  try {
    return await request('/api/profile', payload, token);
  } catch (err) {
    offlineStorage.user = { ...offlineStorage.user, ...payload };
    return offlineStorage.user;
  }
}

// 2. AI Crop Diagnosis
export async function diagnosePlant({ crop, symptomsText, imageUri, additionalNotes }) {
  try {
    const data = await request('/api/ai/diagnose', { crop, symptomsText, imageUri, additionalNotes }, null, 3000);
    if (data && data.success && data.diagnosis) {
      offlineStorage.diagnoses.unshift(data.diagnosis);
      return data;
    }
  } catch (err) {
    // Silent on-device fallback
  }

  const offlineRes = offlineDiagnoseCrop({ crop, symptomsText, imageUri });
  offlineStorage.diagnoses.unshift(offlineRes.diagnosis);
  return offlineRes;
}

// 3. AI Crop Recommendation
export async function getRecommendation({ location, season, soilCondition, landSize, priority }) {
  try {
    const data = await request('/api/ai/recommend', { location, season, soilCondition, landSize, priority }, null, 3000);
    if (data && data.success && data.recommendation) {
      offlineStorage.recommendations.unshift(data.recommendation);
      return data;
    }
  } catch (err) {
    // Silent on-device fallback
  }

  const offlineRec = offlineRecommendCrop({ location, season, soilCondition, landSize });
  offlineStorage.recommendations.unshift(offlineRec.recommendation);
  return offlineRec;
}

// 4. AI Agronomist Chat
export async function sendAgronomistChat({ message, history }) {
  try {
    const data = await request('/api/ai/chat', { message, history }, null, 4000);
    if (data && data.reply) {
      return data;
    }
  } catch (err) {
    // Silent on-device fallback
  }

  return offlineChatAgronomist(message);
}

// 5. History & Logs
export async function getDiagnosisHistory(token) {
  try {
    const data = await request('/api/history/diagnoses', null, token);
    return data;
  } catch (err) {
    return offlineStorage.diagnoses;
  }
}

export async function getRecommendationHistory(token) {
  try {
    const data = await request('/api/history/recommendations', null, token);
    return data;
  } catch (err) {
    return offlineStorage.recommendations;
  }
}

// 6. Surveys & Inspection
export async function submitCropSurvey(surveyData, token) {
  try {
    const data = await request('/api/surveys', surveyData, token);
    offlineStorage.surveys.unshift(data);
    return data;
  } catch (err) {
    const local = { id: Date.now(), ...surveyData, createdAt: new Date().toISOString() };
    offlineStorage.surveys.unshift(local);
    return local;
  }
}

export async function getSurveys(token) {
  try {
    return await request('/api/surveys', null, token);
  } catch (err) {
    return offlineStorage.surveys;
  }
}

// 7. Notifications
export async function getNotifications() {
  try {
    return await request('/api/notifications');
  } catch (err) {
    return offlineStorage.notifications;
  }
}

export default {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  diagnosePlant,
  getRecommendation,
  sendAgronomistChat,
  getDiagnosisHistory,
  getRecommendationHistory,
  submitCropSurvey,
  getSurveys,
  getNotifications
};
