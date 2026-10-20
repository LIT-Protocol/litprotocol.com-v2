import type { Metadata } from 'next';
import PaperLayout from '../rwa/_components/PaperLayout';
import WhitePaper from './_components/WhitePaper';

const URL = 'https://litprotocol.com/whitepaper';
const DESCRIPTION =
  'The Lit Protocol V3 whitepaper: how the Chipotle network keeps key authority on-chain on Base, holds keys in attested hardware, governs releases in public, prices usage, and uses the LITKEY token.';

export const metadata: Metadata = {
  title: 'Whitepaper: The Chipotle Network (Lit Protocol V3) | Lit Protocol',
  description: DESCRIPTION,
  alternates: { canonical: '/whitepaper' },
  openGraph: {
    type: 'article',
    title: 'The Chipotle Network — Lit Protocol V3 Whitepaper',
    description: DESCRIPTION,
    url: URL,
    siteName: 'Lit Protocol',
    publishedTime: '2026-10-20T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Chipotle Network — Lit Protocol V3 Whitepaper',
    description: DESCRIPTION,
    creator: '@LitProtocol',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'The Chipotle Network',
  alternativeHeadline: 'Lit Protocol V3 whitepaper',
  description: DESCRIPTION,
  inLanguage: 'en',
  datePublished: '2026-10-20',
  dateModified: '2026-10-20',
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
    'Lit Protocol',
    'Chipotle network',
    'trusted execution environments',
    'programmable key management',
    'LITKEY',
  ],
};

export default function WhitepaperPage() {
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
