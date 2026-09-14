/**
 * Products API Service
 *
 * Provides functions to interact with the Products API endpoints.
 * All functions use fetch() and return promises.
 */

import { getApiEndpoint, handleApiResponse, apiConfig } from './config.js';

/**
 * Fetch all products from the API
 * @returns {Promise<Array>} Array of product objects
 */
export async function getProducts() {
  const response = await fetch(getApiEndpoint('/products'), {
    method: 'GET',
    headers: apiConfig.headers,
  });
  const data = await handleApiResponse(response);
  return data.data || [];
}

/**
 * Fetch a single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export async function getProduct(id) {
  const response = await fetch(getApiEndpoint(`/products/${id}`), {
    method: 'GET',
    headers: apiConfig.headers,
  });
  const data = await handleApiResponse(response);
  return data.data;
}

/**
 * Create a new product
 * @param {Object} productData - Product data (name, type, sku, price, available, status, description)
 * @returns {Promise<Object>} Created product object
 */
export async function createProduct(productData) {
  const response = await fetch(getApiEndpoint('/products'), {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(productData),
  });
  const data = await handleApiResponse(response);
  return data.data;
}

/**
 * Update an existing product
 * @param {number} id - Product ID
 * @param {Object} productData - Partial product data to update
 * @returns {Promise<Object>} Updated product object
 */
export async function updateProduct(id, productData) {
  const response = await fetch(getApiEndpoint(`/products/${id}`), {
    method: 'PUT',
    headers: apiConfig.headers,
    body: JSON.stringify(productData),
  });
  const data = await handleApiResponse(response);
  return data.data;
}

/**
 * Delete a product
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Response message
 */
export async function deleteProduct(id) {
  const response = await fetch(getApiEndpoint(`/products/${id}`), {
    method: 'DELETE',
    headers: apiConfig.headers,
  });
  return handleApiResponse(response);
}
