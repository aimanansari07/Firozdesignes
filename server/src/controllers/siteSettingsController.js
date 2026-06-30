import SiteSettings from '../models/SiteSettings.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/** GET /api/settings — public, returns the singleton settings document. */
export const getSettings = asyncHandler(async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = await SiteSettings.create({});
  res.json({ success: true, data: settings });
});

/** PUT /api/admin/settings — protected, upserts the singleton. */
export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.findOneAndUpdate(
    {},
    { $set: req.body },
    { new: true, upsert: true, runValidators: true }
  );
  res.json({ success: true, data: settings });
});
