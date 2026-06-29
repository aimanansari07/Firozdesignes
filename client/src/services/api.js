import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Shared Axios instance.
 * - withCredentials so the httpOnly auth cookie is sent on admin requests.
 * - Response interceptor normalises errors and surfaces a friendly message.
 */
const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
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
