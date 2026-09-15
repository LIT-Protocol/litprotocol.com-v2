'use client';

import { Container } from '@mantine/core';
import { Button } from '@/components/ui/Button';
import { CONTACT_FORM, DASHBOARD_LINK } from '@/utils/constants';
import {
  type Comparison,
  type SourceId,
  sources,
  REVIEWED_ON,
  COMPARISON_BASE,
} from '@/content/comparisons';
import ComparisonLinks from './ComparisonLinks';
import styles from './comparisons.module.css';

export default function ComparisonArticle({
  comparison,
}: {
  comparison: Comparison;
}) {
  const ids = Array.from(
    new Set(
      comparison.assessmentSources.concat(
        comparison.tradeoffSources ?? [],
        comparison.rows.flatMap(row => [
          ...row.provider.sources,
          ...row.lit.sources,
        ]),
        comparison.extra?.sources ?? [],
        comparison.securityReview?.findings.flatMap(
          finding => finding.sources
        ) ?? []
      )
    )
  );
  const references = (refs: SourceId[]) =>
    refs.map(id => (
      <a
        key={id}
        href={sources[id].url}
        target="_blank"
        rel="noopener noreferrer"
        title={sources[id].title}
        aria-label={sources[id].title}
        className={styles.reference}
      >
        [{ids.indexOf(id) + 1}]
      </a>
    ));
  return (
    <article className={styles.article}>
      <Container size="lg" className={styles.container}>
        <a href={COMPARISON_BASE} className={styles.back}>
          <span aria-hidden="true">← </span>All comparisons
        </a>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            {comparison.category === 'wallets'
              ? 'Wallet infrastructure'
              : 'Private compute & AI'}
          </p>
          <h1>Lit Protocol vs {comparison.provider}</h1>
          <p className={styles.headline}>{comparison.headline}</p>
          <p className={styles.introduction}>{comparison.introduction}</p>
          <p className={styles.meta}>
            By Lit Protocol · Sources reviewed {REVIEWED_ON}
          </p>
        </header>
        <p className={styles.scope}>
          <strong>Scope: </strong>
          {comparison.scope}
        </p>
        <div className={styles.decision}>
          <section>
            <p className={styles.eyebrow}>Lit assessment</p>
            <h2>Why choose Lit</h2>
            <p className={styles.assessment}>
              {comparison.assessment}
              {references(comparison.assessmentSources)}
            </p>
          </section>
          <section>
            <h2>Tradeoffs to weigh</h2>
            <p>
              {comparison.tradeoff}
              {references(comparison.tradeoffSources ?? [])}
            </p>
          </section>
        </div>
        <section
          className={styles.section}
          aria-labelledby="architecture-heading"
        >
          <h2 id="architecture-heading">Architecture, side by side</h2>
          <div className={styles.tableWrap}>
            <table>
              <caption className="sr-only">
                Architecture of {comparison.provider} compared with Lit Protocol
                in ChainSecured mode
              </caption>
              <thead>
                <tr>
                  <th scope="col">Dimension</th>
                  <th scope="col">{comparison.provider}</th>
                  <th scope="col">Lit (ChainSecured mode)</th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map(row => (
                  <tr key={row.dimension}>
                    <th scope="row">{row.dimension}</th>
                    <td>
                      {row.provider.text}
                      {references(row.provider.sources)}
                    </td>
                    <td>
                      {row.lit.text}
                      {references(row.lit.sources)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.mobileComparison}>
            {comparison.rows.map(row => (
              <section key={row.dimension} className={styles.mobileRow}>
                <h3>{row.dimension}</h3>
                <dl>
                  <dt>{comparison.provider}</dt>
                  <dd>
                    {row.provider.text}
                    {references(row.provider.sources)}
                  </dd>
                  <dt>Lit (ChainSecured mode)</dt>
                  <dd>
                    {row.lit.text}
                    {references(row.lit.sources)}
                  </dd>
                </dl>
              </section>
            ))}
          </div>
        </section>
        {comparison.securityReview && (
          <section
            className={styles.section}
            aria-labelledby="security-review-heading"
          >
            <p className={styles.eyebrow}>Security analysis</p>
            <h2 id="security-review-heading">What the guarantees depend on</h2>
            <p className={styles.analysisIntro}>
              {comparison.securityReview.conclusion}
            </p>
            <div className={styles.findings}>
              {comparison.securityReview.findings.map(finding => (
                <details key={finding.title}>
                  <summary>
                    {finding.title}
                    <span aria-hidden="true" className={styles.disclosureMark}>
                      +
                    </span>
                  </summary>
                  <p className={styles.status}>{finding.status}</p>
                  <p>
                    {finding.text}
                    {references(finding.sources)}
                  </p>
                </details>
              ))}
            </div>
            <p className={styles.reviewScope}>
              {comparison.securityReview.scope}
            </p>
          </section>
        )}
        {comparison.extra && (
          <section className={styles.section}>
            <h2>{comparison.extra.title}</h2>
            <p className={styles.analysisIntro}>
              {comparison.extra.text}
              {references(comparison.extra.sources)}
            </p>
          </section>
        )}
        <aside className={styles.governance}>
          <h2>Lit’s governance boundary</h2>
          <p>
            Customer-owned wallet policy and hosted runtime approvals are
            separate. Runtime governance remains a trust dependency.{' '}
            <a
              href={sources.litGovernance.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Inspect its quorum and upgrade rules
            </a>
            , or read our{' '}
            <a href={`${COMPARISON_BASE}#methodology`}>
              comparison methodology
            </a>
            .
          </p>
        </aside>
        <section className={styles.sources} aria-labelledby="sources-heading">
          <h2 id="sources-heading">Primary sources</h2>
          <ol>
            {ids.map(id => (
              <li key={id}>
                <a
                  href={sources[id].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {sources[id].title}
                </a>
              </li>
            ))}
          </ol>
        </section>
        <div className={styles.actions}>
          <Button
            href={
              comparison.category === 'wallets' ? DASHBOARD_LINK : CONTACT_FORM
            }
            target="_blank"
            style={{ padding: '0.7rem 1.1rem', borderRadius: '10px' }}
          >
            {comparison.category === 'wallets'
              ? 'Get started'
              : 'Discuss an AI workload'}
          </Button>
          <a href="/" className={styles.back}>
            Explore Lit Protocol <span aria-hidden="true">→</span>
          </a>
        </div>
        <ComparisonLinks category={comparison.category} />
      </Container>
    </article>
  );
}
