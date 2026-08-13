const API_BASE_URL = 'http://localhost:4000';

async function safeFetch(url, options) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const responseBody = await response.json().catch(() => null);
  if (!response.ok) {
    const error = responseBody?.error || 'Server error';
    throw new Error(error);
  }

  return responseBody;
}

export async function registerUser(payload) {
  return safeFetch(`${API_BASE_URL}/api/register`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload) {
  return safeFetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export default {
  registerUser,
  loginUser,
};
