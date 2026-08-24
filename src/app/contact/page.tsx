import type { Metadata } from 'next';
import Layout from '@/components/Layout/Layout';
import {
  CALENDAR_LINK,
  CONTACT_FORM,
  DISCORD_LINK,
  DOCS_LINK,
  GITHUB_LINK,
  LINKEDIN_LINK,
  TELEGRAM_LINK,
  TWITTER_LINK,
} from '@/utils/constants';

const DESCRIPTION =
  'Get in touch with the Lit Protocol team — sales, developer support, security disclosures, press, and community channels.';

export const metadata: Metadata = {
  title: 'Contact | Lit Protocol',
  description: DESCRIPTION,
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <Layout>
      <article className="legal prose">
        <h1>Contact Lit Protocol</h1>
        <p>
          Lit Protocol is built and maintained by the Lit Association and a
          distributed team of contributors. Whether you are evaluating Lit for
          a production deployment, integrating the SDK, reporting a security
          issue, or writing about the network, the channels below will get you
          to the right people.
        </p>
        <h2>Sales and partnerships</h2>
        <p>
          If you want to build on Lit or explore a partnership, the fastest
          path is our{' '}
          <a href={CONTACT_FORM} target="_blank" rel="noopener noreferrer">
            contact form
          </a>{' '}
          or booking time directly via our{' '}
          <a href={CALENDAR_LINK} target="_blank" rel="noopener noreferrer">
            calendar
          </a>
          . You can also email{' '}
          <a href="mailto:support@litprotocol.com">support@litprotocol.com</a>{' '}
          and we will route your message to the right team.
        </p>
        <h2>Developer support</h2>
        <p>
          Start with the{' '}
          <a href={DOCS_LINK} target="_blank" rel="noopener noreferrer">
            developer documentation
          </a>
          . For live help, our engineers and community are active on{' '}
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
            Discord
          </a>{' '}
          and{' '}
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
          . Bug reports and feature requests are welcome on{' '}
          <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
        <h2>Security disclosures</h2>
        <p>
          If you believe you have found a vulnerability in the Lit network or
          SDKs, please email{' '}
          <a href="mailto:support@litprotocol.com">support@litprotocol.com</a>{' '}
          with the subject line &ldquo;Security Disclosure&rdquo; rather than
          filing a public issue. We take reports seriously and will respond
          promptly.
        </p>
        <h2>Press and social</h2>
        <p>
          For press inquiries, email{' '}
          <a href="mailto:support@litprotocol.com">support@litprotocol.com</a>.
          Follow announcements on{' '}
          <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
            X (Twitter)
          </a>{' '}
          and{' '}
          <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          .
        </p>
      </article>
    </Layout>
  );
}
