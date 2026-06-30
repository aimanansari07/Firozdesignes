import { useRef, useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import toast from 'react-hot-toast';
import authService from '../services/authService.js';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX = 10 * 1024 * 1024;

/**
 * Single-image uploader for Cloudinary.
 * @param {string} value - current image URL
 * @param {Function} onChange - called with new URL string (or '' on remove)
 * @param {string} label - shown inside the drop zone
 */
export default function SingleImageUploader({ value = '', onChange, label = 'Upload Photo' }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    if (!ALLOWED.includes(file.type)) {
      toast.error('Only JPEG, PNG or WebP allowed');
      return;
    }
    if (file.size > MAX) {
      toast.error('File exceeds 10 MB');
      return;
    }
    setUploading(true);
    try {
      const res = await authService.uploadImage(file);
      onChange(res.data?.url || '');
      toast.success('Photo uploaded');
    } catch (err) {
      toast.error(err.friendlyMessage || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  if (value) {
    return (
      <div className="relative inline-block">
        <img
          src={value}
          alt="Founder"
          className="h-32 w-32 border border-border object-cover"
        />
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-1 top-1 flex items-center justify-center bg-automotive/90 p-1 text-white transition hover:bg-automotive"
          title="Remove photo"
        >
          <X size={14} />
        </button>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-2 block font-body text-caption text-muted underline hover:text-gold"
        >
          Replace photo
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files?.[0]);
      }}
      onClick={() => inputRef.current?.click()}
      className="flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-border bg-bg py-8 text-center transition hover:border-gold"
    >
      <UploadCloud size={24} className="text-gold" />
      <p className="mt-2 font-body text-small text-white">
        {uploading ? 'Uploading...' : label}
      </p>
      <p className="mt-1 font-body text-caption text-muted">JPEG, PNG, WebP - max 10 MB</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
