import { Link } from 'react-router-dom';
import { FolderKanban, Package, Inbox, Quote, Plus } from 'lucide-react';
import useApi from '../hooks/useApi.js';
import authService from '../services/authService.js';
import { formatDateTime } from '../utils/formatters.js';

const StatusBadge = ({ status }) => {
  const styles = {
    new: 'bg-gold/15 text-gold border-gold/40',
    read: 'bg-surface-2 text-muted border-border',
    replied: 'bg-green-500/10 text-green-400 border-green-500/30',
    closed: 'bg-automotive/15 text-automotive border-automotive/40',
  };
  return (
    <span className={`inline-block border px-2.5 py-0.5 font-mono text-caption uppercase ${styles[status] || styles.read}`}>
      {status}
    </span>
  );
};

export default function Dashboard() {
  const { data, loading, error } = useApi(() => authService.dashboard(), []);
  const stats = data?.data?.stats;
  const recent = data?.data?.recentInquiries || [];

  const cards = [
    { label: 'Projects', value: stats?.totalProjects, sub: `${stats?.publishedProjects ?? 0} published`, icon: FolderKanban, to: '/admin/projects' },
    { label: 'Products', value: stats?.totalProducts, sub: `${stats?.publishedProducts ?? 0} published`, icon: Package, to: '/admin/products' },
    { label: 'New Inquiries', value: stats?.newInquiries, sub: `${stats?.totalInquiries ?? 0} total`, icon: Inbox, to: '/admin/inquiries' },
    { label: 'Testimonials', value: stats?.totalTestimonials, sub: 'total', icon: Quote, to: '/admin/testimonials' },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-light text-white">Dashboard</h1>
        <div className="flex gap-3">
          <Link to="/admin/projects/new" className="flex items-center gap-2 border border-border px-4 py-2 font-body text-small text-muted transition hover:border-gold hover:text-gold">
            <Plus size={15} /> Project
          </Link>
          <Link to="/admin/products/new" className="flex items-center gap-2 bg-gold px-4 py-2 font-body text-small text-bg transition hover:bg-gold-light">
            <Plus size={15} /> Product
          </Link>
        </div>
      </div>

      {error && !data && (
        <p className="mb-6 border border-automotive/40 bg-automotive/10 px-4 py-3 font-body text-small text-automotive">
          Could not load dashboard data. Is the API running and seeded?
        </p>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="group border border-border bg-surface p-6 transition hover:border-gold">
            <div className="flex items-center justify-between">
              <c.icon size={22} className="text-gold" />
            </div>
            <div className="data mt-4 text-3xl text-white">{loading ? '—' : c.value ?? 0}</div>
            <div className="mt-1 font-body text-small text-muted">{c.label}</div>
            <div className="mt-0.5 font-body text-caption text-muted/70">{c.sub}</div>
          </Link>
        ))}
      </div>

      {/* Recent inquiries */}
      <div className="mt-10">
        <h2 className="mb-4 font-display text-heading font-light text-white">Recent Inquiries</h2>
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-border bg-surface text-left">
                {['Name', 'Brand', 'Type', 'Status', 'Date'].map((h) => (
                  <th key={h} className="px-4 py-3 font-body text-caption uppercase tracking-wider text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center font-body text-small text-muted">No inquiries yet.</td>
                </tr>
              ) : (
                recent.map((q) => (
                  <tr key={q._id} className="border-b border-border last:border-0 hover:bg-surface">
                    <td className="px-4 py-3 font-body text-small text-white">{q.name}</td>
                    <td className="px-4 py-3 font-body text-small capitalize text-muted">{q.brand}</td>
                    <td className="px-4 py-3 font-body text-small capitalize text-muted">{q.inquiryType}</td>
                    <td className="px-4 py-3"><StatusBadge status={q.status} /></td>
                    <td className="px-4 py-3 font-mono text-caption text-muted">{formatDateTime(q.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Link to="/admin/inquiries" className="mt-4 inline-block font-body text-small text-gold hover:text-gold-light">
          View all inquiries →
        </Link>
      </div>
    </div>
  );
}
