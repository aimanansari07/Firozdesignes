import { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';
import SectionLabel from '../ui/SectionLabel.jsx';
import Button from '../ui/Button.jsx';
import { INSTAGRAM } from '../../utils/constants.js';

const INTERIORS_FEED_ID = import.meta.env.VITE_BEHOLD_FEED_ID || 'O7WEXSmDRzWkuXZB9eZq';
const AUTOMOTIVE_FEED_ID = import.meta.env.VITE_BEHOLD_AUTOMOTIVE_FEED_ID || 'XOqsRrev044tIjacbHlg';
const PER_ACCOUNT = 4;

async function fetchPosts(feedId) {
  const res = await fetch(`https://feeds.behold.so/${feedId}`);
  const data = await res.json();
  const list = Array.isArray(data) ? data : (data.posts || data.feed || data.data || []);
  return list.slice(0, PER_ACCOUNT);
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([fetchPosts(INTERIORS_FEED_ID), fetchPosts(AUTOMOTIVE_FEED_ID)])
      .then(([interiors, automotive]) => {
        const combined = [
          ...(interiors.status === 'fulfilled' ? interiors.value : []),
          ...(automotive.status === 'fulfilled' ? automotive.value : []),
        ];
        setPosts(combined);
      })
      .finally(() => setLoading(false));
  }, []);

  const showFallback = !loading && posts.length === 0;
  const totalTiles = PER_ACCOUNT * 2;

  return (
    <section className="bg-bg py-14 md:py-24">
      <div className="container-feroze">
        <div className="mb-12 text-center">
          <div className="flex justify-center">
            <SectionLabel>Follow the Journey</SectionLabel>
          </div>
          <p className="mt-4 font-body text-small uppercase tracking-wider text-muted">
            @{INSTAGRAM.interiors.handle} · @{INSTAGRAM.automotive.handle}
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: totalTiles }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse bg-surface border border-border" />
            ))}
          </div>
        )}

        {!loading && !showFallback && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden border border-border transition-colors hover:border-gold"
                aria-label={post.caption?.slice(0, 60) || 'Instagram post'}
              >
                <img
                  src={(post.mediaType === 'VIDEO' || post.media_type === 'VIDEO')
                    ? (post.thumbnailUrl || post.thumbnail_url)
                    : (post.mediaUrl || post.media_url)}
                  alt={post.caption?.slice(0, 60) || 'Feroze Designs'}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-bg/0 opacity-0 transition-all duration-300 group-hover:bg-bg/40 group-hover:opacity-100">
                  <Instagram className="text-gold" size={24} />
                </span>
              </a>
            ))}
          </div>
        )}

        {showFallback && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: totalTiles }).map((_, i) => (
              <div key={i} className="aspect-square border border-border bg-surface flex items-center justify-center">
                <Instagram className="text-muted/30" size={28} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button href={INSTAGRAM.interiors.url} variant="ghost" size="md">
            <Instagram size={16} /> @{INSTAGRAM.interiors.handle}
          </Button>
          <Button href={INSTAGRAM.automotive.url} variant="ghost" size="md">
            <Instagram size={16} /> @{INSTAGRAM.automotive.handle}
          </Button>
        </div>
      </div>
    </section>
  );
}
