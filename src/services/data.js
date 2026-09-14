/**
 * Data Source Abstraction Layer
 *
 * Provides a unified interface for fetching data from either mock or API sources.
 * Components use this layer without knowing which source is active.
 *
 * Configuration:
 * - VITE_DATA_SOURCE=mock  → uses local mock data
 * - VITE_DATA_SOURCE=api   → uses Laravel API
 */

import { MockProducts, MockServices, MockPricing } from '../data/exampleData.js';
import * as productsApi from './api/products.js';

// Determine which data source to use
const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE || 'mock';

console.log(`📦 Data source: ${DATA_SOURCE.toUpperCase()}`);

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
    if (DATA_SOURCE === 'api') {
      try {
        return await productsApi.getProducts();
      } catch (error) {
        console.error('Failed to fetch products from API:', error);
        throw error;
      }
    }

    // Mock mode: simulate async API call
    return new Promise((resolve) => {
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
    });
  },

  /**
   * Get a single product by ID
   * @param {number} id - Product ID
   * @returns {Promise<Object>} Product object
   */
  async getById(id) {
    if (DATA_SOURCE === 'api') {
      try {
        return await productsApi.getProduct(id);
      } catch (error) {
        console.error(`Failed to fetch product ${id} from API:`, error);
        throw error;
      }
    }

    // Mock mode
    return new Promise((resolve, reject) => {
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
    });
  },

  /**
   * Create a new product
   * @param {Object} productData - Product data
   * @returns {Promise<Object>} Created product object
   */
  async create(productData) {
    if (DATA_SOURCE === 'api') {
      try {
        return await productsApi.createProduct(productData);
      } catch (error) {
        console.error('Failed to create product via API:', error);
        throw error;
      }
    }

    // Mock mode: simulate API response
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct = {
          id: MockProducts.length + 1,
          ...productData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        MockProducts.push(newProduct);
        resolve(newProduct);
      }, 500); // Simulate network delay
    });
  },

  /**
   * Update an existing product
   * @param {number} id - Product ID
   * @param {Object} productData - Partial product data to update
   * @returns {Promise<Object>} Updated product object
   */
  async update(id, productData) {
    if (DATA_SOURCE === 'api') {
      try {
        return await productsApi.updateProduct(id, productData);
      } catch (error) {
        console.error(`Failed to update product ${id} via API:`, error);
        throw error;
      }
    }

    // Mock mode
    return new Promise((resolve, reject) => {
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
      }, 500); // Simulate network delay
    });
  },

  /**
   * Delete a product
   * @param {number} id - Product ID
   * @returns {Promise<Object>} Response message
   */
  async delete(id) {
    if (DATA_SOURCE === 'api') {
      try {
        return await productsApi.deleteProduct(id);
      } catch (error) {
        console.error(`Failed to delete product ${id} via API:`, error);
        throw error;
      }
    }

    // Mock mode
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockIndex = id - 1;
        if (mockIndex >= 0 && mockIndex < MockProducts.length) {
          MockProducts.splice(mockIndex, 1);
          resolve({ message: 'Product deleted successfully' });
        } else {
          reject(new Error(`Product ${id} not found`));
        }
      }, 500); // Simulate network delay
    });
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
