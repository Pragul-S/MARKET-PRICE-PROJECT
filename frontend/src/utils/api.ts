import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
};

// Price API
export const priceAPI = {
  getMarketPrices: (params?: any) => api.get('/prices/market', { params }),
  getPriceTrend: (params?: any) => api.get('/prices/trend', { params }),
  addPrice: (data: any) => api.post('/prices/add', data),
  getPredictions: (params?: any) => api.get('/prices/predictions', { params }),
  requestPrediction: (data: any) => api.post('/prices/predict', data),
};

// Vegetable API
export const vegetableAPI = {
  getAllVegetables: () => api.get('/vegetables'),
  getVegetableById: (id: string) => api.get(`/vegetables/${id}`),
  searchVegetables: (query: string) => api.get('/vegetables/search', { params: { query } }),
};
