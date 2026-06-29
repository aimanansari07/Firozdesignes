import Testimonial from '../models/Testimonial.js';
import { isDBConnected } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/** GET /api/testimonials — published, optional ?brand= filter. */
export const getTestimonials = asyncHandler(async (req, res) => {
  // Degraded dev mode (no DB): return an empty list so the client falls back cleanly.
  if (!isDBConnected()) {
    return res.json({ success: true, count: 0, data: [] });
  }

  const { brand } = req.query;
  const filter = { published: true };
  if (brand && brand !== 'all') filter.brand = { $in: [brand, 'both'] };
  const items = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, count: items.length, data: items });
});

/* ───────────────────────── Admin ───────────────────────── */

export const adminGetTestimonials = asyncHandler(async (_req, res) => {
  const items = await Testimonial.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, count: items.length, data: items });
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.create(req.body);
  res.status(201).json({ success: true, data: item });
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) return res.status(404).json({ success: false, message: 'Testimonial not found' });
  res.json({ success: true, data: item });
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Testimonial not found' });
  res.json({ success: true, message: 'Testimonial deleted' });
});
