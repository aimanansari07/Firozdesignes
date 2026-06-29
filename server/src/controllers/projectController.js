import Project from '../models/Project.js';
import { isDBConnected } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/** GET /api/projects — published, with optional filters + pagination. */
export const getProjects = asyncHandler(async (req, res) => {
  // Degraded dev mode (no DB): return an empty list so the client falls back cleanly.
  if (!isDBConnected()) {
    return res.json({ success: true, count: 0, total: 0, page: 1, pages: 0, data: [] });
  }

  const { category, featured, location, year, page = 1, limit = 100 } = req.query;
  const filter = { published: true };
  if (category && category !== 'all') filter.category = category;
  if (featured === 'true') filter.featured = true;
  if (location) filter.location = new RegExp(location, 'i');
  if (year) filter.year = Number(year);

  const pageNum = Math.max(1, Number(page));
  const perPage = Math.min(48, Math.max(1, Number(limit)));

  const [items, total] = await Promise.all([
    Project.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .skip((pageNum - 1) * perPage)
      .limit(perPage),
    Project.countDocuments(filter),
  ]);

  res.json({
    success: true,
    count: items.length,
    total,
    page: pageNum,
    pages: Math.ceil(total / perPage),
    data: items,
  });
});

/** GET /api/projects/:slug — single published project. */
export const getProjectBySlug = asyncHandler(async (req, res) => {
  if (!isDBConnected()) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  const project = await Project.findOne({ slug: req.params.slug, published: true });
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

  // Related: same category, exclude self.
  const related = await Project.find({
    published: true,
    category: project.category,
    _id: { $ne: project._id },
  })
    .sort({ order: 1, createdAt: -1 })
    .limit(3);

  res.json({ success: true, data: project, related });
});

/* ───────────────────────── Admin ───────────────────────── */

/** GET /api/admin/projects — all projects (any status). */
export const adminGetProjects = asyncHandler(async (req, res) => {
  const { category, published } = req.query;
  const filter = {};
  if (category && category !== 'all') filter.category = category;
  if (published === 'true' || published === 'false') filter.published = published === 'true';
  const items = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, count: items.length, data: items });
});

export const adminGetProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  res.json({ success: true, data: project });
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, data: project });
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  Object.assign(project, req.body);
  await project.save(); // triggers slug regen if title changed
  res.json({ success: true, data: project });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  res.json({ success: true, message: 'Project deleted' });
});

export const togglePublishProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  project.published = !project.published;
  await project.save();
  res.json({ success: true, data: project });
});
