// services/authService.js
// Authentication & User Management Service with Role-Based Access Control
// Supports online API authentication and seamless local offline registry

import {
  loginUser as apiLoginUser,
  registerUser as apiRegisterUser,
  adminGetUsers,
  adminBlockUser,
  adminUnblockUser,
  adminDeleteUser
} from '../src/api';

// Preloaded local user registry (includes Super Admin and Demo Farmer)
let _users = [
  {
    id: '1',
    name: 'Ivan Miyoupo',
    email: 'ivanmiyoupo@gmail.com',
    phone: '+237 670 000 001',
    password: 'miyoupo10', // Alphanumeric
    role: 'admin',
    isBlocked: false,
    location: 'Yaoundé, Centre Region',
    registeredAt: '2026-01-15T08:00:00.000Z'
  },
  {
    id: '2',
    name: 'Jean-Paul Kamga',
    email: 'farmer@agrovission.cm',
    phone: '+237 677 123 456',
    password: 'farmer123', // Alphanumeric
    role: 'farmer',
    isBlocked: false,
    location: 'Bafoussam, West Region',
    registeredAt: '2026-02-10T10:30:00.000Z'
  },
  {
    id: '3',
    name: 'Amina Bello',
    email: 'amina.bello@agrovission.cm',
    phone: '+237 699 876 543',
    password: 'bello2026', // Alphanumeric
    role: 'farmer',
    isBlocked: false,
    location: 'Garoua, North Region',
    registeredAt: '2026-03-01T14:15:00.000Z'
  }
];

let _currentUser = null;

// ── Validation Helpers ────────────────────────────────────────────────────────

export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  // Standard RFC 5322 compliant regex for email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

export function validatePassword(password) {
  if (!password || typeof password !== 'string') return false;
  // Must be at least 6 characters and contain at least one letter and at least one number
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const minLength = password.length >= 6;
  return minLength && hasLetter && hasNumber;
}

export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const digitsOnly = phone.replace(/[^0-9]/g, '');
  return digitsOnly.length >= 8;
}

// ── Authentication Actions ────────────────────────────────────────────────────

export async function loginUser({ email, password }) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  // Format validation
  if (!validateEmail(cleanEmail)) {
    throw new Error('Please enter a valid email address (e.g. farmer@domain.com)');
  }
  if (!validatePassword(cleanPass)) {
    throw new Error('Password must be at least 6 characters and contain both letters and numbers');
  }

  // 1. Try online API authentication first
  try {
    const apiRes = await apiLoginUser({ email: cleanEmail, password: cleanPass });
    if (apiRes && (apiRes.token || apiRes.user || apiRes.role)) {
      const userObj = apiRes.user || apiRes;
      // Guarantee role detection: Ivan or role === 'admin'
      const role = (cleanEmail === 'ivanmiyoupo@gmail.com' || userObj.role === 'admin') ? 'admin' : 'farmer';
      _currentUser = { ...userObj, email: cleanEmail, role };
      return _currentUser;
    }
  } catch (err) {
    // Fall through to local offline registry validation
  }

  if (!matchedUser) {
    throw new Error('No account found with this email. Please create a farmer account.');
  }

  if (matchedUser.isBlocked) {
    throw new Error('Your account has been blocked by the administrator. Please contact support.');
  }

  if (matchedUser.password !== cleanPass) {
    throw new Error('Incorrect password. Please verify your credentials.');
  }

  _currentUser = { ...matchedUser };
  return _currentUser;
}

export async function registerUser({ name, email, phone, password, location, role = 'farmer' }) {
  const cleanName = (name || '').trim();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPhone = (phone || '').trim();
  const cleanPass = (password || '').trim();
  const cleanLocation = (location || '').trim();

  // Validate all required fields
  if (!cleanName || cleanName.length < 2) {
    throw new Error('Full name is required (minimum 2 characters)');
  }
  if (!validateEmail(cleanEmail)) {
    throw new Error('Please enter a valid email address (e.g. farmer@domain.com)');
  }
  if (!validatePhone(cleanPhone)) {
    throw new Error('Please enter a valid phone number (minimum 8-9 digits)');
  }
  if (!cleanLocation) {
    throw new Error('Farm location / region is required');
  }
  if (!validatePassword(cleanPass)) {
    throw new Error('Password must be at least 6 characters and contain both letters and numbers');
  }

  // Check if email already registered locally
  const existing = _users.find(u => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    throw new Error('An account with this email already exists. Please log in.');
  }

  // Determine role: ivan is always admin, others are farmer unless specified
  const assignedRole = cleanEmail === 'ivanmiyoupo@gmail.com' ? 'admin' : role;

  const newUser = {
    id: String(_users.length + 1),
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    password: cleanPass,
    location: cleanLocation,
    role: assignedRole,
    registeredAt: new Date().toISOString()
  };

  // 1. Try registering with backend
  try {
    await apiRegisterUser({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      password: cleanPass,
      location: cleanLocation
    });
  } catch (err) {
    // Offline mode: proceed with local registry
  }

  // 2. Save into local store
  _users = [newUser, ..._users];
  _currentUser = { ...newUser };
  return newUser;
}

export function getCurrentUser() {
  return _currentUser;
}

export function getAllUsers() {
  return [..._users];
}

export function logout() {
  _currentUser = null;
}

export async function blockUser(userId) {
  const user = _users.find(u => u.id === userId || u.email === userId);
  if (user) {
    if (user.role === 'admin' || user.email === 'ivanmiyoupo@gmail.com') {
      throw new Error('Super Administrator accounts cannot be blocked.');
    }
    user.isBlocked = true;
  }
  try {
    await adminBlockUser(userId);
  } catch (_) {}
  return [..._users];
}

export async function unblockUser(userId) {
  const user = _users.find(u => u.id === userId || u.email === userId);
  if (user) {
    user.isBlocked = false;
  }
  try {
    await adminUnblockUser(userId);
  } catch (_) {}
  return [..._users];
}

export async function deleteUser(userId) {
  const user = _users.find(u => u.id === userId || u.email === userId);
  if (user && (user.role === 'admin' || user.email === 'ivanmiyoupo@gmail.com')) {
    throw new Error('Super Administrator accounts cannot be deleted.');
  }
  _users = _users.filter(u => u.id !== userId && u.email !== userId);
  if (_currentUser && (_currentUser.id === userId || _currentUser.email === userId)) {
    _currentUser = null;
  }
  try {
    await adminDeleteUser(userId);
  } catch (_) {}
  return [..._users];
}

export async function fetchRemoteUsers() {
  try {
    const res = await adminGetUsers();
    if (res && res.success && Array.isArray(res.users) && res.users.length > 0) {
      const remoteMap = new Map();
      res.users.forEach(u => remoteMap.set(u.email.toLowerCase(), u));
      _users.forEach(u => {
        if (!remoteMap.has(u.email.toLowerCase())) {
          remoteMap.set(u.email.toLowerCase(), u);
        }
      });
      _users = Array.from(remoteMap.values());
    }
  } catch (_) {}
  return [..._users];
}

