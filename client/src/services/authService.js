import api from './api.js';

export const authService = {
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const body = res.data;
    if (body.token) localStorage.setItem('admin_token', body.token);
    return body;
  },
  logout: async () => {
    localStorage.removeItem('admin_token');
    return api.post('/auth/logout').then((r) => r.data);
  },
  me: () => api.get('/auth/me').then((r) => r.data),
  dashboard: () => api.get('/admin/dashboard').then((r) => r.data),

  forgotPassword: (email) => api.post('/auth/forgot-password', { email }).then((r) => r.data),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }).then((r) => r.data),
  changePassword: (currentPassword, newPassword) => api.post('/auth/change-password', { currentPassword, newPassword }).then((r) => r.data),

  uploadImage: (file) => {
    const form = new FormData();
    form.append('image', file);
    return api
      .post('/upload/image', form, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((r) => r.data);
  },
  uploadImages: (files) => {
    const form = new FormData();
    Array.from(files).forEach((f) => form.append('images', f));
    return api
      .post('/upload/images', form, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((r) => r.data);
  },
};

export default authService;
