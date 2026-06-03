import type { MetadataRoute } from 'next';

const BASE = 'https://litprotocol.com';

// Public routes. Redirect-only paths (e.g. /stablecoins/how-it-works) are excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = '2026-06-01';
  return [
    { url: `${BASE}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/stablecoins`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/solvers`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/careers`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/legal/privacy-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/terms-of-service`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
