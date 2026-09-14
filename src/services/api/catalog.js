/**
 * Read-only catalog API services for dashboard pages.
 */

import { apiConfig, getApiEndpoint, handleApiResponse } from './config.js';

async function getCollection(path) {
  const response = await fetch(getApiEndpoint(path), {
    method: 'GET',
    headers: apiConfig.headers,
  });
  const data = await handleApiResponse(response);
  return data.data || [];
}

export function getServices() {
  return getCollection('/services');
}

export function getPricingPlans() {
  return getCollection('/pricing');
}
