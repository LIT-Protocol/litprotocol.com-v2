import type { Metadata } from 'next';
import PaperLayout from './_components/PaperLayout';
import WhitePaper from './_components/WhitePaper';

const URL = 'https://litprotocol.com/rwa';
const DESCRIPTION =
  'Tokenized real-world assets are controlled by privileged keys — mint, burn, freeze, seize. How issuers and transfer agents make that authority impossible to misuse outside policy, and provable to a regulator or auditor.';

export const metadata: Metadata = {
  title: 'Provable Control: Privileged Keys for Tokenized RWAs | Lit Protocol',
  description: DESCRIPTION,
  alternates: { canonical: '/rwa' },
  openGraph: {
    type: 'article',
    title: 'Provable Control — Code-Enforced Authority for Tokenized RWAs',
    description: DESCRIPTION,
    url: URL,
    siteName: 'Lit Protocol',
    publishedTime: '2026-06-09T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Provable Control — Lit Protocol',
    description: DESCRIPTION,
    creator: '@LitProtocol',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Provable Control',
  alternativeHeadline:
    'Code-enforced authority for the privileged keys behind tokenized real-world assets',
  description: DESCRIPTION,
  inLanguage: 'en',
  datePublished: '2026-06-09',
  dateModified: '2026-06-09',
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
    'real-world assets',
    'tokenized securities',
    'privileged key management',
    'transfer agent controls',
  ],
};

export default function RwaPage() {
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
