import type { Metadata } from 'next';
import Layout from '@/components/Layout/Layout';
import Privacy from './privacy.mdx';

export const metadata: Metadata = {
  title: 'Privacy Policy — June 5, 2023 | Lit Protocol',
  robots: { index: false, follow: true },
  alternates: { canonical: '/legal/privacy-policy/2023-06-05' },
};

export default function ArchivedPolicyPage() {
  return (
    <Layout>
      <article className="legal prose">
        <p><strong>Archived version.</strong> <a href="/legal/privacy-policy">Read the current Privacy Policy.</a></p>
        <Privacy />
      </article>
    </Layout>
  );
}
