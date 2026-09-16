import type { Metadata } from 'next';

export function productMetadata(
  path: string,
  title: string,
  description: string
): Metadata {
  const url = `https://litprotocol.com${path}`;
  return {
    title: `${title} | Lit Protocol`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: `${title} | Lit Protocol`,
      description,
      url,
      siteName: 'Lit Protocol',
      images: [
        {
          url: '/api/og',
          width: 1200,
          height: 630,
          alt: 'Lit Protocol — Confidential, verifiable execution.',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Lit Protocol`,
      description,
      images: ['/api/og'],
    },
  };
}
