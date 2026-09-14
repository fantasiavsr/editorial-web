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

async function sendCollectionRequest(path, method, payload) {
  const response = await fetch(getApiEndpoint(path), {
    method,
    headers: apiConfig.headers,
    body: payload ? JSON.stringify(payload) : undefined,
  });
  const data = await handleApiResponse(response);
  return data.data || data;
}

export function createService(data) {
  return sendCollectionRequest('/services', 'POST', data);
}

export function updateService(id, data) {
  return sendCollectionRequest(`/services/${id}`, 'PUT', data);
}

export function deleteService(id) {
  return sendCollectionRequest(`/services/${id}`, 'DELETE');
}

export function createPricingPlan(data) {
  return sendCollectionRequest('/pricing', 'POST', data);
}

export function updatePricingPlan(id, data) {
  return sendCollectionRequest(`/pricing/${id}`, 'PUT', data);
}

export function deletePricingPlan(id) {
  return sendCollectionRequest(`/pricing/${id}`, 'DELETE');
}
