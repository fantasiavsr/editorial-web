/**
 * Data Source Abstraction Layer
 *
 * Provides a unified interface for fetching data from either mock or API sources.
 * Components use this layer without knowing which source is active.
 *
 * Configuration:
 * - VITE_DATA_SOURCE=mock  → uses local mock data
 * - VITE_DATA_SOURCE=api   → uses Laravel API (with fallback to mock if API fails)
 *
 * IMPORTANT: Environment variable precedence in Vite:
 * .env.local > .env
 *
 * So if both files exist:
 * - .env.local takes precedence (used for local development)
 * - .env is used as fallback (used for production/Vercel)
 *
 * To switch modes:
 * 1. Delete or rename .env.local to use .env (mock mode for Vercel)
 * 2. Keep .env.local to use API mode (local development with real backend)
 */

import { MockProducts, MockServices, MockPricing } from '../data/exampleData.js';
import * as productsApi from './api/products.js';
import * as servicesApi from './api/services.js';
import * as pricingApi from './api/pricing.js';

// Determine which data source to use
const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE || 'mock';
const ENABLE_API_FALLBACK = true; // If API fails, fallback to mock data
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT, 10) || 5000; // Default: 5 seconds

console.log(`📦 Data source: ${DATA_SOURCE.toUpperCase()}`);
console.log(`⚠️  API Fallback: ${ENABLE_API_FALLBACK ? 'ENABLED' : 'DISABLED'}`);
console.log(`⏱️  API Timeout: ${API_TIMEOUT}ms`);

/**
 * Helper to fetch from API with timeout and fallback to mock on error
 * @param {Function} apiCall - (signal) => Promise
 * @param {Function} fallbackData - () => fallback value
 * @param {AbortSignal} [externalSignal] - Optional external abort signal (e.g. from useEntityCrud)
 */
async function fetchFromApiWithFallback(apiCall, fallbackData, externalSignal) {
  if (DATA_SOURCE !== 'api') {
    return fallbackData();
  }

  // Use external signal when provided; otherwise create our own for timeout
  const controller = externalSignal ? null : new AbortController();
  const signal = externalSignal || controller.signal;
  const timeoutId = setTimeout(() => controller?.abort(), API_TIMEOUT);

  try {
    const result = await apiCall(signal);
    return result;
  } catch (error) {
    if (error.name === 'AbortError') {
      // Only log timeout warning when the abort came from our internal timeout,
      // not from an external signal (component unmount / tab switch)
      if (!externalSignal || !externalSignal.aborted) {
        console.warn(`⏱️  API request timed out after ${API_TIMEOUT}ms, falling back to mock data`);
      }
    } else {
      console.warn(`⚠️  API request failed, falling back to mock data:`, error.message);
    }
    if (ENABLE_API_FALLBACK) {
      return fallbackData();
    } else {
      throw error;
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Services Data Source (placeholder for future phases)
 */
function mockRecordList(records) {
  return records.map((record, index) => ({
    id: record.id || index + 1,
    ...record,
    created_at: record.created_at || new Date().toISOString(),
    updated_at: record.updated_at || new Date().toISOString(),
  }));
}

function mockCreate(records, data) {
  const record = {
    id: records.length ? Math.max(...records.map((item) => item.id || 0)) + 1 : 1,
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  records.push(record);
  return record;
}

function mockUpdate(records, id, data, label) {
  const index = records.findIndex((item) => item.id === id);
  if (index < 0) throw new Error(`${label} ${id} not found`);
  records[index] = { ...records[index], ...data, updated_at: new Date().toISOString() };
  return records[index];
}

function mockDelete(records, id, label) {
  const index = records.findIndex((item) => item.id === id);
  if (index < 0) throw new Error(`${label} ${id} not found`);
  records.splice(index, 1);
  return { message: `${label} deleted successfully` };
}

/**
 * Products Data Source
 *
 * Provides a consistent interface regardless of the underlying source.
 * All functions return promises that resolve to the same shape.
 */
export const productDataSource = {
  async getAll(signal) {
    return fetchFromApiWithFallback(
      (sig) => productsApi.getProducts(sig),
      () => Promise.resolve(mockRecordList(MockProducts)),
      signal
    );
  },
  async create(data, signal) {
    return fetchFromApiWithFallback(
      (sig) => productsApi.createProduct(data, sig),
      () => Promise.resolve(mockCreate(MockProducts, data)),
      signal
    );
  },
  async update(id, data, signal) {
    return fetchFromApiWithFallback(
      (sig) => productsApi.updateProduct(id, data, sig),
      () => Promise.resolve(mockUpdate(MockProducts, id, data, 'Product')),
      signal
    );
  },
  async delete(id, signal) {
    return fetchFromApiWithFallback(
      (sig) => productsApi.deleteProduct(id, sig),
      () => Promise.resolve(mockDelete(MockProducts, id, 'Product')),
      signal
    );
  },
};

/**
 * Services Data Source
 *
 * Provides a consistent interface regardless of the underlying source.
 * All functions return promises that resolve to the same shape.
 */
export const serviceDataSource = {
  async getAll(signal) {
    return fetchFromApiWithFallback(
      (sig) => servicesApi.getServices(sig),
      () => Promise.resolve(mockRecordList(MockServices)),
      signal
    );
  },
  async create(data, signal) {
    return fetchFromApiWithFallback(
      (sig) => servicesApi.createService(data, sig),
      () => Promise.resolve(mockCreate(MockServices, data)),
      signal
    );
  },
  async update(id, data, signal) {
    return fetchFromApiWithFallback(
      (sig) => servicesApi.updateService(id, data, sig),
      () => Promise.resolve(mockUpdate(MockServices, id, data, 'Service')),
      signal
    );
  },
  async delete(id, signal) {
    return fetchFromApiWithFallback(
      (sig) => servicesApi.deleteService(id, sig),
      () => Promise.resolve(mockDelete(MockServices, id, 'Service')),
      signal
    );
  },
};

/**
 * Pricing plans data source.
 */
export const pricingDataSource = {
  async getAll(signal) {
    return fetchFromApiWithFallback(
      (sig) => pricingApi.getPricingPlans(sig),
      () => Promise.resolve(mockRecordList(MockPricing)),
      signal
    );
  },
  async create(data, signal) {
    return fetchFromApiWithFallback(
      (sig) => pricingApi.createPricingPlan(data, sig),
      () => Promise.resolve(mockCreate(MockPricing, data)),
      signal
    );
  },
  async update(id, data, signal) {
    return fetchFromApiWithFallback(
      (sig) => pricingApi.updatePricingPlan(id, data, sig),
      () => Promise.resolve(mockUpdate(MockPricing, id, data, 'Pricing plan')),
      signal
    );
  },
  async delete(id, signal) {
    return fetchFromApiWithFallback(
      (sig) => pricingApi.deletePricingPlan(id, sig),
      () => Promise.resolve(mockDelete(MockPricing, id, 'Pricing plan')),
      signal
    );
  },
};

/**
 * Get the current data source mode
 */
export function getDataSourceMode() {
  return DATA_SOURCE;
}

/**
 * Check if using mock data
 */
export function isUsingMockData() {
  return DATA_SOURCE === 'mock';
}
