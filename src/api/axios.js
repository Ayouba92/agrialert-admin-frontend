import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.1.10:8000/api', 
  baseURL: 'http://127.0.0.1:8000/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Ajoute le token automatiquement s'il existe dans le localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;