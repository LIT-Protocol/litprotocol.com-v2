import LandingPage from '@/components/LandingPage/LandingPage';
import Layout from '@/components/Layout/Layout';
import {
  DOCS_LINK,
  GITHUB_LINK,
  LINKEDIN_LINK,
  SPARK_LINK,
  TWITTER_LINK,
} from '@/utils/constants';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://litprotocol.com/#organization',
      name: 'Lit Protocol',
      legalName: 'Lit Association',
      url: 'https://litprotocol.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://litprotocol.com/lit-logo.png',
      },
      description:
        'Lit is a programmable runtime that pulls data from any source, runs your logic in a chain-secured TEE, and signs on any chain or API.',
      email: 'support@litprotocol.com',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'support@litprotocol.com',
          url: 'https://litprotocol.com/contact',
          availableLanguage: 'English',
        },
      ],
      sameAs: [TWITTER_LINK, LINKEDIN_LINK, GITHUB_LINK, SPARK_LINK],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://litprotocol.com/#website',
      url: 'https://litprotocol.com',
      name: 'Lit Protocol',
      inLanguage: 'en',
      publisher: { '@id': 'https://litprotocol.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://litprotocol.com/#software',
      name: 'Lit Protocol',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      url: 'https://litprotocol.com',
      softwareHelp: { '@type': 'CreativeWork', url: DOCS_LINK },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': 'https://litprotocol.com/#organization' },
    },
  ],
};

export default function Home() {
  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage />
    </Layout>
  );
}
