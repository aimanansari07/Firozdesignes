import Inquiry from '../models/Inquiry.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendInquiryConfirmation, sendInquiryNotification } from '../utils/sendEmail.js';

/** POST /api/inquiries — public form submission. */
export const createInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.create({ ...req.body, source: req.body.source || 'website' });

  // Fire-and-forget emails so a slow/unconfigured SMTP never blocks the response.
  Promise.allSettled([
    sendInquiryConfirmation(inquiry),
    sendInquiryNotification(inquiry),
  ]).catch(() => {});

  res.status(201).json({
    success: true,
    message: "Thank you — we'll get back to you within 24–48 hours.",
    data: { id: inquiry._id },
  });
});

/* ───────────────────────── Admin ───────────────────────── */

/** GET /api/admin/inquiries — all, optional ?status= filter. */
export const adminGetInquiries = asyncHandler(async (req, res) => {
  const { status, brand } = req.query;
  const filter = {};
  if (status && status !== 'all') filter.status = status;
  if (brand && brand !== 'all') filter.brand = brand;
  const items = await Inquiry.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: items.length, data: items });
});

/** PATCH /api/admin/inquiries/:id/status */
export const updateInquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ['new', 'read', 'replied', 'closed'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }
  const item = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!item) return res.status(404).json({ success: false, message: 'Inquiry not found' });
  res.json({ success: true, data: item });
});
