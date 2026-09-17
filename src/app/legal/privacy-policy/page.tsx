import type { Metadata } from 'next';
import Layout from '@/components/Layout/Layout';
import Privacy from './privacy.mdx';

export const metadata: Metadata = {
  title: 'Privacy Policy | Lit Protocol',
  description: 'How Lit Association handles personal data across its website, hosted services, and Agent Keychain.',
  alternates: { canonical: '/legal/privacy-policy' },
};

export default function Home() {
  return (
    <Layout>
      <article className="legal prose">
        <Privacy />
      </article>
    </Layout>
  );
}
