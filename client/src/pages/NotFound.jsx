import Seo from '../components/ui/Seo.jsx';
import PageTransition from '../components/layout/PageTransition.jsx';
import Button from '../components/ui/Button.jsx';

export default function NotFound() {
  return (
    <PageTransition>
      <Seo title="Page Not Found" path="/404" />
      <section className="flex min-h-screen flex-col items-center justify-center bg-bg bg-grain text-center">
        <div className="container-feroze">
          <span className="data text-caption uppercase tracking-widest text-gold">Error 404</span>
          <h1 className="mt-6 font-display font-light text-white" style={{ fontSize: 'var(--text-hero)', lineHeight: 1 }}>
            404
          </h1>
          <span className="mx-auto mt-6 block h-px w-32 bg-gold" />
          <p className="mt-6 font-body text-body text-muted">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button to="/" variant="gold">Back to Home</Button>
            <Button to="/contact" variant="ghost">Contact Us</Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
