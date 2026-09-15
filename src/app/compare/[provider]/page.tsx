import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import ComparisonArticle from '@/components/Comparisons/ComparisonArticle';
import { getComparison } from '@/content/comparisons';

type Props = { params: { provider: string } };
export function generateMetadata({ params }: Props): Metadata {
  const comparison = getComparison(params.provider);
  if (!comparison) return { title: 'Comparison not found' };
  return {
    title: `Lit Protocol vs ${comparison.provider}`,
    description: comparison.introduction,
    alternates: { canonical: `/compare/${comparison.slug}` },
    openGraph: {
      type: 'website',
      siteName: 'Lit Protocol',
      images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Lit Protocol — Confidential, verifiable execution.' }],
      url: `/compare/${comparison.slug}`,
      title: `Lit Protocol vs ${comparison.provider}`,
      description: comparison.introduction,
    },
  };
}

export default function ProviderComparison({ params }: Props) {
  const comparison = getComparison(params.provider);
  if (!comparison) notFound();
  return (
    <Layout>
      <ComparisonArticle comparison={comparison} />
    </Layout>
  );
}
