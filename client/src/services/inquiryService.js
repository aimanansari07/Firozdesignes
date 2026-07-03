import api from './api.js';

export const inquiryService = {
  submit: (payload) => api.post('/inquiries', payload).then((r) => r.data),

  // ── Admin ──
  adminList: (params = {}) => api.get('/admin/inquiries', { params }).then((r) => r.data),
  updateStatus: (id, status) =>
    api.patch(`/admin/inquiries/${id}/status`, { status }).then((r) => r.data),
  remove: (id) => api.delete(`/admin/inquiries/${id}`).then((r) => r.data),
};

export default inquiryService;
