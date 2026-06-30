import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import WhatsAppButton from './components/ui/WhatsAppButton.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import ProtectedRoute from './admin/ProtectedRoute.jsx';

// ── Lazy-loaded pages (code splitting) ─────────────────────
const Home = lazy(() => import('./pages/Home.jsx'));
const InteriorsHome = lazy(() => import('./pages/interiors/InteriorsHome.jsx'));
const Projects = lazy(() => import('./pages/interiors/Projects.jsx'));
const ProjectDetail = lazy(() => import('./pages/interiors/ProjectDetail.jsx'));
const AboutInteriors = lazy(() => import('./pages/interiors/AboutInteriors.jsx'));
const AutomotiveHome = lazy(() => import('./pages/automotive/AutomotiveHome.jsx'));
const Collection = lazy(() => import('./pages/automotive/Collection.jsx'));
const ProductDetail = lazy(() => import('./pages/automotive/ProductDetail.jsx'));
const AboutAutomotive = lazy(() => import('./pages/automotive/AboutAutomotive.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// ── Admin (lazy) ───────────────────────────────────────────
const AdminLogin = lazy(() => import('./admin/AdminLogin.jsx'));
const ForgotPassword = lazy(() => import('./admin/ForgotPassword.jsx'));
const ResetPassword = lazy(() => import('./admin/ResetPassword.jsx'));
const AdminLayout = lazy(() => import('./admin/AdminLayout.jsx'));
const Dashboard = lazy(() => import('./admin/Dashboard.jsx'));
const ProjectsManager = lazy(() => import('./admin/projects/ProjectsManager.jsx'));
const ProjectForm = lazy(() => import('./admin/projects/ProjectForm.jsx'));
const ProductsManager = lazy(() => import('./admin/products/ProductsManager.jsx'));
const ProductForm = lazy(() => import('./admin/products/ProductForm.jsx'));
const TestimonialsList = lazy(() => import('./admin/testimonials/TestimonialsList.jsx'));
const InquiriesList = lazy(() => import('./admin/inquiries/InquiriesList.jsx'));
const ChangePassword = lazy(() => import('./admin/ChangePassword.jsx'));
const SiteSettings = lazy(() => import('./admin/SiteSettings.jsx'));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-px animate-line-grow origin-top bg-gold" />
        <span className="data text-caption uppercase tracking-widest text-muted">Loading</span>
      </div>
    </div>
  );
}

/** Public site shell: nav + animated page outlet + footer + floating WhatsApp. */
function PublicLayout() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col bg-bg bg-grain">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route index element={<Home />} />
              <Route path="interiors" element={<InteriorsHome />} />
              <Route path="interiors/projects" element={<Projects />} />
              <Route path="interiors/projects/:slug" element={<ProjectDetail />} />
              <Route path="interiors/about" element={<AboutInteriors />} />
              <Route path="automotive" element={<AutomotiveHome />} />
              <Route path="automotive/collection" element={<Collection />} />
              <Route path="automotive/collection/:slug" element={<ProductDetail />} />
              <Route path="automotive/about" element={<AboutAutomotive />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Admin routes — isolated from the public shell */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/:id/edit" element={<ProjectForm />} />
            <Route path="products" element={<ProductsManager />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
            <Route path="testimonials" element={<TestimonialsList />} />
            <Route path="inquiries" element={<InquiriesList />} />
            <Route path="settings/password" element={<ChangePassword />} />
            <Route path="settings/site" element={<SiteSettings />} />
          </Route>

          {/* Everything else → public site */}
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </Suspense>
    </>
  );
}

// Re-exported for potential nested admin outlets.
export { Outlet };
