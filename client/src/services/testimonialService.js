import api from './api.js';
import { fallbackTestimonials } from './fallbackData.js';

export const testimonialService = {
  async list(params = {}) {
    try {
      const { data } = await api.get('/testimonials', { params });
      return data;
    } catch {
      let items = [...fallbackTestimonials];
      if (params.brand && params.brand !== 'all') {
        items = items.filter((t) => t.brand === params.brand || t.brand === 'both');
      }
      return { success: true, data: items, _fallback: true };
    }
  },

  // ── Admin ──
  adminList: () => api.get('/admin/testimonials').then((r) => r.data),
  create: (payload) => api.post('/admin/testimonials', payload).then((r) => r.data),
  update: (id, payload) => api.put(`/admin/testimonials/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/admin/testimonials/${id}`).then((r) => r.data),
};

export default testimonialService;
