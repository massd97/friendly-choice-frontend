import { Site, Transaction } from '@/types';

/**
 * Base URL for the FastAPI backend
 * In development, this should point to your local FastAPI server
 * In production, it should point to your deployed backend URL
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * API client functions for different endpoints
 */
export const api = {
  // Sites
  getSites: () => fetchApi<Site[]>('/sites'),
  createSite: (data: Omit<Site, 'id'>) => 
    fetchApi<Site>('/sites', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Transactions
  getTransactions: () => fetchApi<Transaction[]>('/transactions'),
  createTransaction: (data: Omit<Transaction, 'id' | 'date' | 'status'>) =>
    fetchApi<Transaction>('/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};