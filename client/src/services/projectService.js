import api from './api.js';
import { fallbackProjects } from './fallbackData.js';

const applyFilters = (items, params = {}) => {
  let list = [...items];
  if (params.category && params.category !== 'all') list = list.filter((p) => p.category === params.category);
  if (params.featured) list = list.filter((p) => p.featured);
  if (params.year) list = list.filter((p) => p.year === Number(params.year));
  if (params.location) list = list.filter((p) => p.location?.toLowerCase().includes(String(params.location).toLowerCase()));
  return list;
};

export const projectService = {
  async list(params = {}) {
    try {
      const { data } = await api.get('/projects', { params });
      return data;
    } catch {
      const items = applyFilters(fallbackProjects, params);
      return { success: true, data: items, total: items.length, pages: 1, page: 1, _fallback: true };
    }
  },

  async getBySlug(slug) {
    try {
      const { data } = await api.get(`/projects/${slug}`);
      return data;
    } catch {
      const project = fallbackProjects.find((p) => p.slug === slug);
      if (!project) throw new Error('Project not found');
      const related = fallbackProjects.filter((p) => p.category === project.category && p.slug !== slug).slice(0, 3);
      return { success: true, data: project, related, _fallback: true };
    }
  },

  // ── Admin ──
  adminList: (params = {}) => api.get('/admin/projects', { params }).then((r) => r.data),
  adminGet: (id) => api.get(`/admin/projects/${id}`).then((r) => r.data),
  create: (payload) => api.post('/admin/projects', payload).then((r) => r.data),
  update: (id, payload) => api.put(`/admin/projects/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/admin/projects/${id}`).then((r) => r.data),
  togglePublish: (id) => api.patch(`/admin/projects/${id}/publish`).then((r) => r.data),
  toggleFeatured: (id) => api.patch(`/admin/projects/${id}/featured`).then((r) => r.data),
};

export default projectService;
