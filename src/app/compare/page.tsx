import type { Metadata } from 'next';
import { Container } from '@mantine/core';
import styles from '@/components/Comparisons/comparisons.module.css';
import Layout from '@/components/Layout/Layout';
import {
  comparisons,
  comparisonHref,
  sources,
  REVIEWED_ON,
} from '@/content/comparisons';

export const metadata: Metadata = {
  title: 'Compare infrastructure | Lit Protocol',
  alternates: { canonical: '/compare' },
  openGraph: {
      type: 'website',
      siteName: 'Lit Protocol',
      images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Lit Protocol — Confidential, verifiable execution.' }],
    title: 'Compare infrastructure | Lit Protocol',
    url: '/compare',
    description:
      'Compare operator authority, custody, and attack surfaces across wallet and confidential-compute providers.',
  },
  description:
    'Compare Lit Chipotle ChainSecured with wallet and confidential-compute providers: permissions, software approvals, and access.',
};

export default function Comparisons() {
  return (
    <Layout>
      <article className={styles.article}>
        <Container size="lg" className={styles.container}>
          <a href="/" className={styles.back}>
            <span aria-hidden="true">← </span>Lit Protocol
          </a>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Compare control</p>
            <h1>Who can change the rules?</h1>
            <p className={styles.introduction}>
              Hardware protects execution. Control depends on who can change
              permissions, approve software, and stop access. See how Lit and
              other providers handle each decision.
            </p>
          </header>
          {(['wallets', 'compute'] as const).map(category => (
            <section key={category} id={category} className={styles.indexGroup}>
              <h2 className="text-2xl font-medium">
                {category === 'wallets'
                  ? 'Wallet infrastructure'
                  : 'Private compute & AI'}
              </h2>
              <div className={styles.indexGrid}>
                {comparisons
                  .filter(item => item.category === category)
                  .map(item => (
                    <a href={comparisonHref(item.slug)} key={item.slug}>
                      <h3>
                        Lit vs {item.provider} <span aria-hidden="true">→</span>
                      </h3>
                      <p>{item.headline}</p>
                    </a>
                  ))}
              </div>
            </section>
          ))}
          <section id="methodology" className={styles.methodology}>
            <h2>How we make these comparisons</h2>
            <p>
              Published by Lit Protocol. Reviewed {REVIEWED_ON}. We compare operator
              powers using primary documentation and identified source snapshots.
              Our conclusions are architectural assessments, not security audits,
              exploit findings, or legal classifications of custody.
            </p>
            <h3>Chipotle, in ChainSecured mode</h3>
            <p>
              These pages describe Chipotle, not Lit’s legacy MPC network or managed
              API-mode accounts. A customer-controlled wallet administers account
              permissions on Base. The attested runtime enforces them.{' '}
              <a href={sources.litAccountCode.url}>Inspect the permission check</a>.
              Account ownership, runtime approval, and contract upgrades are
              different authorities.
            </p>
            <h3>On-chain governance</h3>
            <p>
              Lit separates deployment from approval. The key-management system
              checks attested measurements against contract rules before releasing
              runtime keys. An operator cannot authorize new code simply by
              deploying it. Previously approved releases remain allowed until
              revoked.{' '}
              <a href={sources.litGovernance.url}>Runtime governance</a>.
            </p>
            <p>
              Account permissions and protocol upgrades have separate authorization
              rules. Chipotle’s account contracts support upgrades, so a review
              should examine both the permission checks and how those checks can
              change. These comparisons describe the method; deployment-specific
              approval policies are evaluated separately.{' '}
              <a href={sources.litUpgradeCode.url}>Upgrade source</a>;{' '}
              <a href={sources.litVerification.url}>verification guide</a>.
            </p>
            <h3>Evidence and limits</h3>
            <p>
              We distinguish hardware protection from release authority, and
              permission to sign from the ability to recover without a provider.
              All deployments retain dependencies on software correctness, hardware
              trust roots, and availability. Lit also depends on chain state and
              key infrastructure. An omitted feature in a document is not proof
              that a product lacks it.
            </p>
            <p>
              A SOC 2 report evaluates organizational controls; attestation provides
              evidence of a measured runtime. Neither alone establishes that approved
              code is safe.{' '}
              <a href={sources.soc2.url}>SOC 2 scope</a>;{' '}
              <a href={sources.litAttestation.url}>attestation</a>.
            </p>
            <p>
              Contact Lit to confirm model and hardware support for your application.
              These comparisons do not benchmark throughput or latency. Each AI
              deployment needs its own rules for code, credentials, and outputs.
            </p>
          </section>
        </Container>
      </article>
    </Layout>
  );
}
