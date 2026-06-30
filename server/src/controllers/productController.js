import Product from '../models/Product.js';
import { isDBConnected } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/** GET /api/products — published, with optional filters + pagination. */
export const getProducts = asyncHandler(async (req, res) => {
  // Degraded dev mode (no DB): return an empty list so the client falls back cleanly.
  if (!isDBConnected()) {
    return res.json({ success: true, count: 0, total: 0, page: 1, pages: 0, data: [] });
  }

  const { category, featured, engineType, page = 1, limit = 100 } = req.query;
  const filter = { published: true };
  if (category && category !== 'all') filter.category = category;
  if (featured === 'true') filter.featured = true;
  if (engineType) filter.engineType = new RegExp(engineType, 'i');

  const pageNum = Math.max(1, Number(page));
  const perPage = Math.min(200, Math.max(1, Number(limit)));

  const [items, total] = await Promise.all([
    Product.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .skip((pageNum - 1) * perPage)
      .limit(perPage),
    Product.countDocuments(filter),
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

/** GET /api/products/:slug — single published product + related. */
export const getProductBySlug = asyncHandler(async (req, res) => {
  if (!isDBConnected()) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const product = await Product.findOne({ slug: req.params.slug, published: true });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  const related = await Product.find({
    published: true,
    category: product.category,
    _id: { $ne: product._id },
  })
    .sort({ order: 1, createdAt: -1 })
    .limit(3);

  res.json({ success: true, data: product, related });
});

/* ───────────────────────── Admin ───────────────────────── */

export const adminGetProducts = asyncHandler(async (req, res) => {
  const { category, published } = req.query;
  const filter = {};
  if (category && category !== 'all') filter.category = category;
  if (published === 'true' || published === 'false') filter.published = published === 'true';
  const items = await Product.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, count: items.length, data: items });
});

export const adminGetProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  Object.assign(product, req.body);
  await product.save();
  res.json({ success: true, data: product });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, message: 'Product deleted' });
});

export const togglePublishProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  product.published = !product.published;
  await product.save();
  res.json({ success: true, data: product });
});

export const toggleFeaturedProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  product.featured = !product.featured;
  await product.save();
  res.json({ success: true, data: product });
});
