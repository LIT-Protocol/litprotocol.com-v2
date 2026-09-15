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
      'Compare wallet infrastructure and private compute by verification, authorization, governance, and recovery.',
  },
  description:
    'Compare wallet infrastructure and private compute: software verification, authorization, governance, and recovery.',
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
            <p className={styles.eyebrow}>Architecture comparisons</p>
            <h1>Where does authority live?</h1>
            <p className={styles.introduction}>
              Compare how providers protect execution, authorize software, and
              govern changes. Each provider has a separate analysis with primary
              sources.
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
            <h2 className="text-2xl font-medium text-white">
              Scope and method
            </h2>
            <p>
              Published by Lit Protocol. Sources reviewed {REVIEWED_ON}. These
              are architectural comparisons based on provider documentation and,
              where identified, public source code. The conclusions labeled “Lit
              assessment” express our interpretation of the cited mechanisms.
            </p>
            <p>
              All Lit wallet comparisons assume ChainSecured mode: a
              customer-controlled wallet owns the account, and contracts on Base
              govern permissions. Lit operates the TEE that executes those
              permissions.{' '}
              <a
                href={sources.litArchitecture.url}
                className="text-gold-500 underline underline-offset-4"
              >
                Lit architecture
              </a>
              .
            </p>
            <p>
              Account policy and runtime governance are distinct. Lit’s hosted
              upgrade documentation describes a 2-of-4 Safe with Lit-controlled
              signer keys and no timelock. That approval is publicly auditable;
              it is not a customer veto over every hosted upgrade. Configuration
              can change, so inspect the contracts linked in the{' '}
              <a
                href={sources.litGovernance.url}
                className="text-gold-500 underline underline-offset-4"
              >
                upgrade-governance documentation
              </a>
              .
            </p>
            <h3 className="text-xl font-medium text-white">
              Operational assurance and runtime evidence
            </h3>
            <p>
              SOC 2 examines a service organization’s controls. A report can
              inform due diligence, but does not itself demonstrate which binary
              is executing a request. Hardware attestation and code measurements
              provide a different kind of evidence. Providers can use both.{' '}
              <a
                href={sources.soc2.url}
                className="text-gold-500 underline underline-offset-4"
              >
                AICPA’s SOC 2 scope
              </a>
              ;{' '}
              <a
                href={sources.litAttestation.url}
                className="text-gold-500 underline underline-offset-4"
              >
                Lit’s attestation model
              </a>
              .
            </p>
            <p>
              The comparison criteria are software identity, authorization,
              upgrade control, and continuity. We have not benchmarked
              performance or reviewed private audit reports. A property absent
              from the cited documentation is not assumed absent from a
              provider’s product.
            </p>
            <p>
              For AI, Lit’s deployment fit is assessed with the team. Each
              workload needs defined code and model measurements, data handling,
              and output policies. Runtime attestation is not a proof of model
              correctness or a guarantee against every data leak.
            </p>
          </section>
        </Container>
      </article>
    </Layout>
  );
}
