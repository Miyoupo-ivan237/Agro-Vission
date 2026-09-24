// expo-mobile/src/api.js
// Client API Client with Automatic Seamless Offline AI Fallback for AGROVISSION

import Constants from 'expo-constants';
import { offlineDiagnoseCrop, offlineRecommendCrop, offlineChatAgronomist } from './offline_ai.js';

// Keep crop recommendations independent from the optional TensorFlow vision model.
// Recommendations use the local agronomy rules immediately, even while the model is unavailable.

function getApiBaseUrl() {
  if (process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL;
  // Automatically discover host from Expo Constants / Metro bundler
  const hostUri = Constants.expoConfig?.hostUri || Constants.manifest2?.extra?.expoGo?.debuggerHost || '';
  if (hostUri) {
    const hostIp = hostUri.split(':')[0];
    if (hostIp) {
      return `http://${hostIp}:5000`;
    }
  }
  return 'http://192.168.42.199:5000';
}

const BASE_URL = getApiBaseUrl();
let sessionToken = null;

/**
 * Returns true for pure network/connectivity failures that should silently
 * trigger the offline fallback.  Returns false for real HTTP errors returned
 * by the server (4xx / 5xx) which have err.info set and must propagate.
 */
function isNetworkError(err) {
  if (err && err.info) return false; // server replied with a structured error — not a network issue
  const msg = (err && (err.message || err.name || '')).toLowerCase();
  return (
    err && err.name === 'AbortError' ||
    msg.includes('fetch') ||
    msg.includes('network') ||
    msg.includes('noroutetohost') ||
    msg.includes('host unreachable') ||
    msg.includes('failed to fetch') ||
    msg.includes('networkrequesterror') ||
    msg.includes('econnrefused') ||
    msg.includes('enotfound') ||
    msg.includes('etimedout') ||
    msg.includes('econnreset') ||
    msg.includes('connection refused') ||
    msg.includes('unable to resolve')
  );
}

function getFarmerContext(context = {}) {
  return {
    name: offlineStorage.user?.name,
    location: offlineStorage.user?.location,
    preferredCrop: offlineStorage.user?.preferredCrop,
    farmSize: offlineStorage.user?.farmSize,
    ...context
  };
}

// Local offline memory stores
const offlineStorage = {
  user: { name: 'Demo Farmer', email: 'farmer@agrovission.cm', role: 'farmer', location: 'Cameroon' },
  accounts: [
    { email: 'farmer@agrovission.cm', password: 'farmer123', name: 'Demo Farmer', role: 'farmer', location: 'Cameroon' }
  ],
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
      message: 'AGROVISSION plant disease diagnosis and agronomy chat operate directly on your phone with zero internet required.',
      category: 'system',
      createdAt: new Date().toISOString()
    }
  ]
};

// Safe request wrapper that catches ALL network issues silently
async function request(path, body, token, timeoutMs = 2500, method = 'AUTO') {
  const headers = { 'Content-Type': 'application/json' };
  const activeToken = token || sessionToken;
  if (activeToken) headers['Authorization'] = `Bearer ${activeToken}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const requestMethod = method === 'AUTO' ? (body ? 'POST' : 'GET') : method;
    // DELETE and GET must never carry a request body (HTTP spec)
    const hasBody = !!body && requestMethod !== 'DELETE' && requestMethod !== 'GET';

    const res = await fetch(`${BASE_URL}${path}`, {
      method: requestMethod,
      headers,
      body: hasBody ? JSON.stringify(body) : undefined,
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
  const cleanEmail = email.trim().toLowerCase();
  try {
    const data = await request('/api/register', { name, email: cleanEmail, phone, password, location });
    offlineStorage.user = { name, email, phone, location };
    sessionToken = data.token || null;
    return data;
  } catch (err) {
    if (err.info) throw err;
    const account = { email: cleanEmail, password, name, phone, location: location || 'Cameroon', role: 'farmer' };
    offlineStorage.accounts = offlineStorage.accounts.filter((item) => item.email !== cleanEmail);
    offlineStorage.accounts.push(account);
    const dummyUser = { id: 999, name, email: cleanEmail, phone, location: location || 'Cameroon', role: 'farmer', token: 'offline-token' };
    offlineStorage.user = dummyUser;
    return dummyUser;
  }
}

export async function loginUser({ email, password }) {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const data = await request('/api/login', { email: cleanEmail, password });
    offlineStorage.user = data;
    sessionToken = data.token || null;
    return data;
  } catch (err) {
    if (err.info) throw err;

    const account = offlineStorage.accounts.find(
      (item) => item.email === cleanEmail && item.password === password
    );
    if (!account) throw new Error('Invalid email or password');

    const offlineUser = {
      id: 999,
      name: account.name,
      email: account.email,
      role: account.role || 'farmer',
      location: account.location || 'Cameroon',
      token: 'offline-session-token',
      isOffline: true
    };
    offlineStorage.user = offlineUser;
    return offlineUser;
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
export async function diagnosePlant({ crop, symptomsText, imageUri, imageBase64, additionalNotes, farmerContext, language = 'English' }) {
  try {
    // When an image is provided, vision analysis with Ollama/LLaVA can take 15-40s on local hardware.
    // Give it enough time (45s) to detect the real image, while keeping fast 10s timeout for pure text.
    const timeout = (imageBase64 && imageBase64.length > 100) ? 45000 : 10000;
    const data = await request(
      '/api/ai/diagnose',
      { crop, symptomsText, imageUri, imageBase64, additionalNotes, farmerContext: getFarmerContext({ ...farmerContext, crop }), language },
      sessionToken,
      timeout
    );
    if (data && data.success && data.diagnosis) {
      offlineStorage.diagnoses.unshift(data.diagnosis);
      return data;
    }
    // Server replied but without a valid diagnosis — fall through to offline
  } catch (err) {
    // Only re-throw genuine business validation rejections from the server
    // (e.g. HTTP 422 for IMAGE_NOT_IDENTIFIABLE or IMAGE_CROP_MISMATCH).
    // Network failures, 503 service unavailable, timeouts fall silently to on-device offline AI engine.
    if (err && err.info && err.status === 422) throw err;
    console.warn('[AgroVission] Backend vision unavailable/timeout, switching to offline AI:', err?.message || err);
  }

  // ── On-Device Offline Fallback ─────────────────────────────────────────────
  const offlineRes = offlineDiagnoseCrop({ crop, symptomsText, imageUri, language });
  if (offlineRes && offlineRes.diagnosis) {
    offlineStorage.diagnoses.unshift(offlineRes.diagnosis);
    return offlineRes;
  }
  return offlineRes;
}

// 3. AI Crop Recommendation
export async function getRecommendation({ location, season, soilCondition, landSize, priority, farmerContext, language = 'English' }) {
  try {
    const data = await request('/api/ai/recommend', { location, season, soilCondition, landSize, priority, farmerContext: getFarmerContext({ ...farmerContext, location, season, soilCondition, landSize, priority }), language }, sessionToken, 30000);
    if (data && data.success && data.recommendation) {
      offlineStorage.recommendations.unshift(data.recommendation);
      return data;
    }
  } catch (err) {
    // Silent on-device fallback
  }

  const offlineRec = offlineRecommendCrop({
    location,
    season,
    soilCondition,
    landSize,
    priority,
    farmerContext: getFarmerContext({ ...farmerContext, location, season, soilCondition, landSize, priority }),
    language
  });
  offlineStorage.recommendations.unshift(offlineRec.recommendation);
  return offlineRec;
}

// 4. AI Agronomist Chat
export async function sendAgronomistChat({ message, history, farmerContext, language = 'English' }) {
  try {
    const data = await request('/api/ai/chat', { message, history, farmerContext: getFarmerContext(farmerContext), language }, sessionToken, 180000);
    if (data && data.reply) {
      return data;
    }
  } catch (err) {
    // Silent on-device fallback
  }

  return offlineChatAgronomist(message, language);
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

export async function getChatHistory(token) {
  try {
    const data = await request('/api/history/chats', null, token);
    return data;
  } catch (err) {
    return [];
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
export async function getNotifications(token, unreadOnly = false) {
  try {
    const path = unreadOnly ? '/api/notifications?unreadOnly=true' : '/api/notifications';
    return await request(path, null, token);
  } catch (err) {
    return { 
      notifications: offlineStorage.notifications || [],
      unreadCount: 0,
      totalCount: 0
    };
  }
}

export async function markNotificationAsRead(notificationId, token) {
  try {
    return await request(`/api/notifications/${notificationId}/read`, {}, token, 2500, 'PUT');
  } catch (err) {
    return { success: false };
  }
}

export async function markAllNotificationsAsRead(token) {
  try {
    return await request('/api/notifications/read-all', {}, token, 2500, 'PUT');
  } catch (err) {
    return { success: false };
  }
}

export async function getUnreadNotificationCount(token) {
  try {
    return await request('/api/notifications/unread/count', null, token);
  } catch (err) {
    return { unreadCount: 0 };
  }
}

export async function trackAppUsage(language = 'English', token) {
  try {
    return await request('/api/users/track-usage', { language }, token);
  } catch (err) {
    return { success: false };
  }
}

export async function adminGetUsers(token) {
  try {
    return await request('/api/admin/users', null, token, 3500);
  } catch (err) {
    return { success: false, users: [] };
  }
}

export async function adminBlockUser(userId, token) {
  try {
    return await request(`/api/admin/users/${userId}/block`, {}, token, 3500, 'PUT');
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function adminUnblockUser(userId, token) {
  try {
    return await request(`/api/admin/users/${userId}/unblock`, {}, token, 3500, 'PUT');
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function adminDeleteUser(userId, token) {
  try {
    return await request(`/api/admin/users/${userId}`, null, token, 3500, 'DELETE');
  } catch (err) {
    return { success: false, error: err.message };
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
  getChatHistory,
  submitCropSurvey,
  getSurveys,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadNotificationCount,
  trackAppUsage,
  adminGetUsers,
  adminBlockUser,
  adminUnblockUser,
  adminDeleteUser
};
