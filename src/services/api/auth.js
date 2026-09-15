import { apiConfig, getApiEndpoint, handleApiResponse } from './config.js';

async function request(path, method, payload, includeAuth = false) {
  const headers = { ...apiConfig.headers };

  if (includeAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(getApiEndpoint(path), {
    method,
    headers,
    body: payload ? JSON.stringify(payload) : undefined,
  });
  return handleApiResponse(response);
}

export async function register(data) {
  return request('/register', 'POST', data);
}

export async function login(data) {
  return request('/login', 'POST', data);
}

export async function getUser() {
  return request('/user', 'GET', null, true);
}

export async function logout() {
  return request('/logout', 'POST', null, true);
}
