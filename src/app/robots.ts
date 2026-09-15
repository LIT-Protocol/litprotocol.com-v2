import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/preview' },
    sitemap: 'https://litprotocol.com/sitemap.xml',
    host: 'https://litprotocol.com',
  };
}
