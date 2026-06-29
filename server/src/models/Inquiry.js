import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    brand: { type: String, default: 'general', enum: ['interiors', 'automotive', 'both', 'general'] },
    inquiryType: {
      type: String,
      enum: ['project', 'product', 'quotation', 'custom-order', 'general'],
      default: 'general',
    },
    projectType: { type: String, default: '' },
    productInterest: { type: String, default: '' },
    budget: { type: String, default: '' },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'closed'],
      default: 'new',
      index: true,
    },
    source: { type: String, default: 'website', enum: ['website', 'whatsapp', 'instagram'] },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model('Inquiry', inquirySchema);
