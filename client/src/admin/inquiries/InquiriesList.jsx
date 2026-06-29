import { useState, useMemo } from 'react';
import { Download, X } from 'lucide-react';
import toast from 'react-hot-toast';
import useApi from '../../hooks/useApi.js';
import inquiryService from '../../services/inquiryService.js';
import { formatDateTime } from '../../utils/formatters.js';

const STATUSES = ['all', 'new', 'read', 'replied', 'closed'];

const StatusBadge = ({ status }) => {
  const styles = {
    new: 'bg-gold/15 text-gold border-gold/40',
    read: 'bg-surface-2 text-muted border-border',
    replied: 'bg-green-500/10 text-green-400 border-green-500/30',
    closed: 'bg-automotive/15 text-automotive border-automotive/40',
  };
  return <span className={`inline-block border px-2.5 py-0.5 font-mono text-caption uppercase ${styles[status] || styles.read}`}>{status}</span>;
};

function toCSV(rows) {
  const headers = ['Name', 'Email', 'Phone', 'Brand', 'Type', 'Project', 'Product', 'Budget', 'Message', 'Status', 'Source', 'Date'];
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [r.name, r.email, r.phone, r.brand, r.inquiryType, r.projectType, r.productInterest, r.budget, r.message, r.status, r.source, formatDateTime(r.createdAt)]
      .map(esc)
      .join(',')
  );
  return [headers.join(','), ...lines].join('\n');
}

export default function InquiriesList() {
  const { data, loading, error, refetch } = useApi(() => inquiryService.adminList(), []);
  const all = data?.data || [];
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);

  const rows = useMemo(() => (filter === 'all' ? all : all.filter((q) => q.status === filter)), [all, filter]);

  const updateStatus = async (q, status) => {
    try {
      await inquiryService.updateStatus(q._id, status);
      toast.success(`Marked ${status}`);
      setActive((a) => (a && a._id === q._id ? { ...a, status } : a));
      refetch();
    } catch (err) {
      toast.error(err.friendlyMessage || 'Failed');
    }
  };

  const exportCSV = () => {
    if (!rows.length) return toast.error('Nothing to export');
    const blob = new Blob([toCSV(rows)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feroze-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-light text-white">Inquiries</h1>
        <button onClick={exportCSV} className="flex items-center gap-2 border border-border px-4 py-2 font-body text-small text-muted transition hover:border-gold hover:text-gold">
          <Download size={15} /> Export CSV
        </button>
      </div>

      {/* Status filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`border px-4 py-1.5 font-body text-caption uppercase tracking-wider transition ${
              filter === s ? 'border-gold bg-gold text-bg' : 'border-border text-muted hover:border-gold'
            }`}
          >
            {s}
            {s !== 'all' && <span className="ml-1.5 opacity-70">{all.filter((q) => q.status === s).length}</span>}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="h-40 animate-pulse border border-border bg-surface" />
      ) : error ? (
        <p className="border border-automotive/40 bg-automotive/10 px-4 py-3 font-body text-small text-automotive">Could not load inquiries. {error}</p>
      ) : (
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-border bg-surface text-left">
                {['Name', 'Contact', 'Brand', 'Type', 'Status', 'Date', ''].map((h) => (
                  <th key={h} className="px-4 py-3 font-body text-caption uppercase tracking-wider text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center font-body text-small text-muted">No inquiries.</td></tr>
              ) : (
                rows.map((q) => (
                  <tr key={q._id} className="cursor-pointer border-b border-border last:border-0 hover:bg-surface" onClick={() => setActive(q)}>
                    <td className="px-4 py-3 font-body text-small text-white">{q.name}</td>
                    <td className="px-4 py-3 font-body text-caption text-muted">{q.email}<br />{q.phone}</td>
                    <td className="px-4 py-3 font-body text-small capitalize text-muted">{q.brand}</td>
                    <td className="px-4 py-3 font-body text-small capitalize text-muted">{q.inquiryType}</td>
                    <td className="px-4 py-3"><StatusBadge status={q.status} /></td>
                    <td className="px-4 py-3 font-mono text-caption text-muted">{formatDateTime(q.createdAt)}</td>
                    <td className="px-4 py-3 font-body text-caption text-gold">View</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail modal */}
      {active && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4" onClick={() => setActive(null)}>
          <div className="w-full max-w-lg border border-border bg-surface p-8" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="font-display text-2xl font-light text-white">{active.name}</h3>
                <p className="mt-1 font-mono text-caption text-muted">{formatDateTime(active.createdAt)}</p>
              </div>
              <button onClick={() => setActive(null)} className="text-muted hover:text-gold" aria-label="Close"><X size={22} /></button>
            </div>

            <dl className="space-y-3 font-body text-small">
              <Row label="Email" value={<a href={`mailto:${active.email}`} className="text-gold">{active.email}</a>} />
              <Row label="Phone" value={<a href={`tel:${active.phone}`} className="text-gold">{active.phone}</a>} />
              <Row label="Brand" value={active.brand} />
              <Row label="Inquiry Type" value={active.inquiryType} />
              {active.projectType && <Row label="Project Type" value={active.projectType} />}
              {active.productInterest && <Row label="Product Interest" value={active.productInterest} />}
              {active.budget && <Row label="Budget" value={active.budget} />}
              <Row label="Source" value={active.source} />
              <div>
                <dt className="font-body text-caption uppercase tracking-wider text-muted">Message</dt>
                <dd className="mt-1 whitespace-pre-line text-white/90">{active.message}</dd>
              </div>
            </dl>

            <div className="mt-6 border-t border-border pt-5">
              <span className="mb-2 block font-body text-caption uppercase tracking-wider text-muted">Update Status</span>
              <div className="flex flex-wrap gap-2">
                {['new', 'read', 'replied', 'closed'].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(active, s)}
                    className={`border px-3 py-1.5 font-body text-caption uppercase tracking-wider transition ${
                      active.status === s ? 'border-gold bg-gold text-bg' : 'border-border text-muted hover:border-gold'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border pb-2">
      <dt className="font-body text-caption uppercase tracking-wider text-muted">{label}</dt>
      <dd className="text-right font-body text-small capitalize text-white">{value}</dd>
    </div>
  );
}
