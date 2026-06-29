import api from './api.js';
import { fallbackProducts } from './fallbackData.js';

const applyFilters = (items, params = {}) => {
  let list = [...items];
  if (params.category && params.category !== 'all') list = list.filter((p) => p.category === params.category);
  if (params.featured) list = list.filter((p) => p.featured);
  if (params.engineType) list = list.filter((p) => p.engineType?.toLowerCase().includes(String(params.engineType).toLowerCase()));
  return list;
};

export const productService = {
  async list(params = {}) {
    try {
      const { data } = await api.get('/products', { params });
      return data;
    } catch {
      const items = applyFilters(fallbackProducts, params);
      return { success: true, data: items, total: items.length, pages: 1, page: 1, _fallback: true };
    }
  },

  async getBySlug(slug) {
    try {
      const { data } = await api.get(`/products/${slug}`);
      return data;
    } catch {
      const product = fallbackProducts.find((p) => p.slug === slug);
      if (!product) throw new Error('Product not found');
      const related = fallbackProducts.filter((p) => p.category === product.category && p.slug !== slug).slice(0, 3);
      return { success: true, data: product, related, _fallback: true };
    }
  },

  // ── Admin ──
  adminList: (params = {}) => api.get('/admin/products', { params }).then((r) => r.data),
  adminGet: (id) => api.get(`/admin/products/${id}`).then((r) => r.data),
  create: (payload) => api.post('/admin/products', payload).then((r) => r.data),
  update: (id, payload) => api.put(`/admin/products/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/admin/products/${id}`).then((r) => r.data),
  togglePublish: (id) => api.patch(`/admin/products/${id}/publish`).then((r) => r.data),
};

export default productService;
