import type { Metadata } from 'next';
import PaperLayout from '../stablecoins/_components/PaperLayout';
import SolversReport from './_components/SolversReport';

const URL = 'https://litprotocol.com/solvers';
const DESCRIPTION =
  'An industry report on cross-chain solvers: fillers, RFQ makers, intent routers, settlement rails, operational risk, and where programmable policy can improve solver infrastructure.';

export const metadata: Metadata = {
  title: 'Cross-Chain Solvers: Industry Report | Lit Protocol',
  description: DESCRIPTION,
  alternates: { canonical: '/solvers' },
  openGraph: {
    type: 'article',
    title: 'Cross-Chain Solvers — Industry Report',
    description: DESCRIPTION,
    url: URL,
    siteName: 'Lit Protocol',
    publishedTime: '2026-06-02T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cross-Chain Solvers — Lit Protocol',
    description: DESCRIPTION,
    creator: '@LitProtocol',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Cross-Chain Solvers',
  alternativeHeadline: 'Industry Market Map and Taxonomy',
  description: DESCRIPTION,
  inLanguage: 'en',
  datePublished: '2026-06-02',
  dateModified: '2026-06-02',
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
  image: 'https://litprotocol.com/solvers/opengraph-image',
  about: [
    'cross-chain solvers',
    'intents',
    'cross-chain swaps',
    'chain abstraction',
    'solver infrastructure',
  ],
};

export default function SolversPage() {
  return (
    <PaperLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SolversReport />
    </PaperLayout>
  );
}
