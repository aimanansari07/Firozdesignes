import api from './api.js';
import { STATS, BRANDS } from '../utils/constants.js';

const FALLBACK = {
  interiors: {
    founderName: BRANDS.interiors.founder,
    founderImage: '',
    since: '1996',
    description:
      'Founded by Feroz Shaikh, Feroze Interiors is a Mumbai-based interior & architecture studio with nearly three decades of craft — delivering over 5,00,000 sq ft across hospitality, commercial and residential spaces in India and the Middle East.',
  },
  automotive: {
    founderName: BRANDS.automotive.founder,
    founderImage: '',
    tagline: BRANDS.automotive.tagline,
    description:
      "Founded by Ayan Shaikh, Feroze Automotive Decor transforms real car parts — V6 to V12 engine blocks, pistons and more — into bespoke statement furniture. India's 1st automotive-inspired furniture brand.",
  },
  stats: STATS,
};

export const siteSettingsService = {
  async get() {
    try {
      const { data } = await api.get('/settings');
      return data;
    } catch {
      return { success: true, data: FALLBACK, _fallback: true };
    }
  },

  update: (payload) => api.put('/admin/settings', payload).then((r) => r.data),
};

export default siteSettingsService;
