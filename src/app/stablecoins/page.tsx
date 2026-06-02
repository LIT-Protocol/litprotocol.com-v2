import type { Metadata } from 'next';
import PaperLayout from './_components/PaperLayout';
import WhitePaper from './_components/WhitePaper';

const URL = 'https://litprotocol.com/stablecoins';
const DESCRIPTION =
  'The GENIUS Act takes effect Jan 18, 2027. How stablecoin and tokenized-asset issuers enforce block, freeze, and seize controls in code — and prove it.';

export const metadata: Metadata = {
  title: 'Provable Compliance: Stablecoins & the GENIUS Act | Lit Protocol',
  description: DESCRIPTION,
  alternates: { canonical: '/stablecoins' },
  openGraph: {
    type: 'article',
    title: 'Provable Compliance — Code-Enforced Control for Regulated Assets',
    description: DESCRIPTION,
    url: URL,
    siteName: 'Lit Protocol',
    publishedTime: '2026-06-01T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Provable Compliance — Lit Protocol',
    description: DESCRIPTION,
    creator: '@LitProtocol',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Provable Compliance',
  alternativeHeadline:
    'Code-enforced control for regulated stablecoins and tokenized assets',
  description: DESCRIPTION,
  inLanguage: 'en',
  datePublished: '2026-06-01',
  dateModified: '2026-06-01',
  author: {
    '@type': 'Organization',
    name: 'Lit Protocol',
    url: 'https://litprotocol.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Lit Protocol',
    logo: {
      '@type': 'ImageObject',
      url: 'https://litprotocol.com/lit-logo.png',
    },
  },
  mainEntityOfPage: URL,
  image: 'https://litprotocol.com/api/og',
  about: [
    'GENIUS Act',
    'stablecoin compliance',
    'tokenized assets',
    'sanctions screening',
  ],
};

export default function StablecoinsPage() {
  return (
    <PaperLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WhitePaper />
    </PaperLayout>
  );
}
