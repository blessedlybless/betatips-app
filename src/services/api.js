import axios from 'axios';

// Change this to your actual PHP backend URL
const API_URL = import.meta.env.VITE_API_URL || 'https://api.betatips.com.ng';


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add admin token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public API calls
export const getPublicTips = async (category) => {
  const response = await api.get(`/tips/public/${category}`);
  return response.data;
};

export const getVIPTips = async (category) => {
  const vipCode = localStorage.getItem('vipCode');
  const response = await api.get(`/tips/vip/${category}`, {
    headers: { 'X-VIP-Code': vipCode }
  });
  return response.data;
};

export const verifyVIPCode = async (code) => {
  const response = await api.post('/vip/verify', { code });
  return response.data;
};

// Admin API calls
export const adminLogin = async (username, password) => {
  const response = await api.post('/admin/login', { username, password });
  return response.data;
};

export const addGame = async (gameData) => {
  const response = await api.post('/admin/games', gameData);
  return response.data;
};

export const updateGame = async (id, gameData) => {
  const response = await api.put(`/admin/games/${id}`, gameData);
  return response.data;
};

export const deleteGame = async (id) => {
  const response = await api.delete(`/admin/games/${id}`);
  return response.data;
};

export const getAllGames = async () => {
  const response = await api.get('/admin/games');
  return response.data;
};

export const generateVIPCode = async () => {
  const response = await api.post('/admin/vip-codes/generate');
  return response.data;
};

export default api;
