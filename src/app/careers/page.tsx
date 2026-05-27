import Layout from '@/components/Layout/Layout';
import Link from 'next/link';

export default function Careers() {
  return (
    <Layout>
      <article className="legal prose">
        <h1>Careers</h1>
        <p>
          There are no open positions at this time. Check back later for new
          opportunities.
        </p>
        <Link href="/">Return home &#8594;</Link>
      </article>
    </Layout>
  );
}
