import { apiConfig, getApiEndpoint, handleApiResponse } from './config.js';

async function request(path, method, payload) {
  const response = await fetch(getApiEndpoint(path), {
    method,
    headers: apiConfig.headers,
    body: payload ? JSON.stringify(payload) : undefined,
  });
  return handleApiResponse(response);
}

export async function register(data) {
  return request('/register', 'POST', data);
}
