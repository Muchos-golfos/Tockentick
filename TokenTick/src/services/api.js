import axios from 'axios';

// Cambiar por la URL real de tu backend
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor: Inyectar token JWT si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tokentick_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: Manejar errores globales (ej: 401 si expira token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('tokentick_token');
      localStorage.removeItem('tokentick_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;