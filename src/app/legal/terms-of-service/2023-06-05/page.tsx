import type { Metadata } from 'next';
import Layout from '@/components/Layout/Layout';
import Terms from './terms.mdx';

export const metadata: Metadata = {
  title: 'Terms of Service — June 5, 2023 | Lit Protocol',
  robots: { index: false, follow: true },
  alternates: { canonical: '/legal/terms-of-service/2023-06-05' },
};

export default function ArchivedPolicyPage() {
  return (
    <Layout>
      <article className="legal prose">
        <p><strong>Archived version.</strong> <a href="/legal/terms-of-service">Read the current Terms of Service.</a></p>
        <Terms />
      </article>
    </Layout>
  );
}
