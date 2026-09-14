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

// Determine which data source to use
const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE || 'mock';
const ENABLE_API_FALLBACK = true; // If API fails, fallback to mock data

console.log(`📦 Data source: ${DATA_SOURCE.toUpperCase()}`);
console.log(`⚠️  API Fallback: ${ENABLE_API_FALLBACK ? 'ENABLED' : 'DISABLED'}`);

/**
 * Helper to fetch from API with fallback to mock on error
 */
async function fetchFromApiWithFallback(apiCall, fallbackData, fallbackError = null) {
  if (DATA_SOURCE !== 'api') {
    // Not in API mode, use mock immediately
    return fallbackData();
  }

  try {
    return await apiCall();
  } catch (error) {
    if (ENABLE_API_FALLBACK) {
      console.warn('⚠️  API request failed, falling back to mock data:', error.message);
      return fallbackData();
    } else {
      // No fallback, re-throw the error
      throw error;
    }
  }
}

/**
 * Products Data Source
 *
 * Provides a consistent interface regardless of the underlying source.
 * All functions return promises that resolve to the same shape.
 */
export const productDataSource = {
  /**
   * Get all products
   * @returns {Promise<Array>} Array of product objects
   */
  async getAll() {
    return fetchFromApiWithFallback(
      () => productsApi.getProducts(),
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              MockProducts.map((product, index) => ({
                id: index + 1,
                ...product,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              }))
            );
          }, 0);
        })
    );
  },

  /**
   * Get a single product by ID
   * @param {number} id - Product ID
   * @returns {Promise<Object>} Product object
   */
  async getById(id) {
    return fetchFromApiWithFallback(
      () => productsApi.getProduct(id),
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            const mockIndex = id - 1;
            if (mockIndex >= 0 && mockIndex < MockProducts.length) {
              resolve({
                id,
                ...MockProducts[mockIndex],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              });
            } else {
              reject(new Error(`Product ${id} not found`));
            }
          }, 0);
        })
    );
  },

  /**
   * Create a new product
   * @param {Object} productData - Product data
   * @returns {Promise<Object>} Created product object
   */
  async create(productData) {
    return fetchFromApiWithFallback(
      () => productsApi.createProduct(productData),
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            const newProduct = {
              id: MockProducts.length + 1,
              ...productData,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };
            MockProducts.push(newProduct);
            resolve(newProduct);
          }, 500);
        })
    );
  },

  /**
   * Update an existing product
   * @param {number} id - Product ID
   * @param {Object} productData - Partial product data to update
   * @returns {Promise<Object>} Updated product object
   */
  async update(id, productData) {
    return fetchFromApiWithFallback(
      () => productsApi.updateProduct(id, productData),
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            const mockIndex = id - 1;
            if (mockIndex >= 0 && mockIndex < MockProducts.length) {
              const updated = {
                id,
                ...MockProducts[mockIndex],
                ...productData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              };
              MockProducts[mockIndex] = { ...updated };
              resolve(updated);
            } else {
              reject(new Error(`Product ${id} not found`));
            }
          }, 500);
        })
    );
  },

  /**
   * Delete a product
   * @param {number} id - Product ID
   * @returns {Promise<Object>} Response message
   */
  async delete(id) {
    return fetchFromApiWithFallback(
      () => productsApi.deleteProduct(id),
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            const mockIndex = id - 1;
            if (mockIndex >= 0 && mockIndex < MockProducts.length) {
              MockProducts.splice(mockIndex, 1);
              resolve({ message: 'Product deleted successfully' });
            } else {
              reject(new Error(`Product ${id} not found`));
            }
          }, 500);
        })
    );
  },
};

/**
 * Services Data Source (placeholder for future phases)
 */
export const serviceDataSource = {
  async getAll() {
    if (DATA_SOURCE === 'api') {
      // To be implemented in Phase 5
      throw new Error('Services API not yet implemented');
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          MockServices.map((service, index) => ({
            id: index + 1,
            ...service,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }))
        );
      }, 0);
    });
  },
};

/**
 * Pricing Data Source (placeholder for future phases)
 */
export const pricingDataSource = {
  async getAll() {
    if (DATA_SOURCE === 'api') {
      // To be implemented in Phase 5
      throw new Error('Pricing API not yet implemented');
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          MockPricing.map((pricing, index) => ({
            id: index + 1,
            ...pricing,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }))
        );
      }, 0);
    });
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
