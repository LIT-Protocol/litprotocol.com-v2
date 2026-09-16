import type { MetadataRoute } from 'next';
import { comparisons } from '@/content/comparisons';

const BASE = 'https://litprotocol.com';

// Public routes. Redirect-only paths (e.g. /stablecoins/how-it-works) are excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = '2026-06-01';
  return [
    ...['/crypto', '/ai', '/security'].map(path => ({
      url: `${BASE}${path}`,
      lastModified: '2026-09-16',
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    {
      url: `${BASE}/compare`,
      lastModified: '2026-09-16',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...comparisons.map(item => ({
      url: `${BASE}/compare/${item.slug}`,
      lastModified: '2026-09-16',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${BASE}/rwa`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/`,
      lastModified: '2026-09-16',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE}/stablecoins`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/solvers`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/careers`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE}/contact`,
      lastModified: '2026-08-24',
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE}/legal/privacy-policy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE}/legal/terms-of-service`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
