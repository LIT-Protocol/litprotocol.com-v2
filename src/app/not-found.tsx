import Layout from '@/components/Layout/Layout';
import Link from 'next/link';
import { DOCS_LINK } from '@/utils/constants';

export default function NotFound() {
  return (
    <Layout>
      <article className="legal prose">
        <h1>Page not found</h1>
        <p>
          It seems like the page you&apos;re looking for has moved or
          doesn&apos;t exist.
        </p>
        <p>Here&apos;s where to find what you need:</p>
        <ul>
          <li>
            <Link href="/">Homepage</Link> — what Lit Protocol is and how it
            works
          </li>
          <li>
            <a href="/sitemap.xml">Sitemap</a> — every page on this site
          </li>
          <li>
            <a href="/llms.txt">llms.txt</a> — a machine-readable overview of
            Lit Protocol for AI agents
          </li>
          <li>
            <a href={DOCS_LINK}>Developer docs</a> — SDK guides and API
            reference at developer.litprotocol.com
          </li>
          <li>
            <Link href="/contact">Contact</Link> — get in touch with the team
          </li>
        </ul>
      </article>
    </Layout>
  );
}
