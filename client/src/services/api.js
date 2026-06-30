import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach stored token as Bearer on every request.
// This bypasses cross-site cookie restrictions when the frontend and backend
// are on different domains (e.g. Vercel + Render).
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      (error.code === 'ERR_NETWORK' ? 'Network error — please check your connection.' : error.message);
    return Promise.reject(Object.assign(error, { friendlyMessage: message }));
  }
);

export default api;
