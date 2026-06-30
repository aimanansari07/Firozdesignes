import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  LayoutDashboard,
  FolderKanban,
  Package,
  Quote,
  Inbox,
  LogOut,
  Menu,
  X,
  ExternalLink,
  KeyRound,
  Settings,
} from 'lucide-react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth.js';

const nav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Quote },
  { to: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
  { to: '/admin/settings/site', label: 'Site Settings', icon: Settings },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-bg text-white">
      <Helmet>
        <title>Admin | Feroze Designs</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-surface transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-border px-6">
          <NavLink to="/admin/dashboard" className="font-display text-2xl tracking-[0.25em] text-white">
            FEROZE
          </NavLink>
          <button className="text-muted lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 font-body text-small transition ${
                  isActive ? 'bg-gold text-bg' : 'text-muted hover:bg-surface-2 hover:text-white'
                }`
              }
            >
              <n.icon size={18} /> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute inset-x-0 bottom-0 border-t border-border p-4">
          <a href="/" target="_blank" rel="noopener noreferrer" className="mb-1 flex items-center gap-2 px-4 py-2 font-body text-caption text-muted hover:text-gold">
            <ExternalLink size={15} /> View Site
          </a>
          <NavLink to="/admin/settings/password" onClick={() => setOpen(false)} className={({ isActive }) => `mb-1 flex items-center gap-2 px-4 py-2 font-body text-caption transition ${isActive ? 'text-gold' : 'text-muted hover:text-white'}`}>
            <KeyRound size={15} /> Change Password
          </NavLink>
          <button onClick={onLogout} className="flex w-full items-center gap-2 px-4 py-2 font-body text-caption text-muted hover:text-automotive">
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-4 lg:px-8">
          <button className="text-white lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <span className="font-body text-small text-muted">Signed in as</span>
            <span className="font-body text-small text-gold">{admin?.username || admin?.email}</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
