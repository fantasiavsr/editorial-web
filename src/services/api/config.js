/**
 * API Configuration
 *
 * Determines which API URL to use based on environment variables.
 * In development/demo mode, the API might not be available, so we handle gracefully.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const apiConfig = {
  baseUrl: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

/**
 * Helper to construct full API endpoint URLs
 */
export function getApiEndpoint(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${apiConfig.baseUrl}${cleanPath}`;
}

/**
 * Helper to handle API responses and errors
 */
export async function handleApiResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `HTTP ${response.status}: ${response.statusText}`,
    }));
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
}
