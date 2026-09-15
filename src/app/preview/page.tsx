import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import LandingPage from '@/components/LandingPage/LandingPage';

export const metadata: Metadata = {
  title: 'Copy preview | Lit Protocol',
  robots: { index: false, follow: false },
};

export default function CopyPreview() {
  if (process.env.NODE_ENV !== 'development') notFound();

  return (
    <Layout preview>
      <LandingPage draft />
    </Layout>
  );
}
