const BASE_URL = 'http://10.0.2.2:5000'; // Use this in Expo for Android physical devices or replace with your PC IP

async function request(path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method: body ? 'POST' : 'GET',
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = data.error || data.message || 'Request failed';
    const e = new Error(err);
    e.info = data;
    throw e;
  }
  return data;
}

export async function registerUser({ name, email, phone, password }) {
  return request('/api/register', { name, email, phone, password });
}

export async function loginUser({ email, password }) {
  return request('/api/login', { email, password });
}

export async function getMe(token) {
  return request('/api/me', null, token);
}

export default { registerUser, loginUser };
