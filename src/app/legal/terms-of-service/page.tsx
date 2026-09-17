import type { Metadata } from 'next';
import Layout from '@/components/Layout/Layout';
import Terms from './terms.mdx';

export const metadata: Metadata = {
  title: 'Terms of Service | Lit Protocol',
  description: 'Terms for Lit Association’s hosted crypto infrastructure, confidential compute, and Agent Keychain services.',
  alternates: { canonical: '/legal/terms-of-service' },
};

export default function Home() {
  return (
    <Layout>
      <article className="legal prose">
        <Terms />
      </article>
    </Layout>
  );
}
