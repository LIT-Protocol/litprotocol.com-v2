'use client';

import { Container } from '@mantine/core';
import { Button } from '@/components/ui/Button';
import { AI_CONTACT_FORM, DASHBOARD_LINK } from '@/utils/constants';
import {
  type Comparison,
  type SourceId,
  sources,
  REVIEWED_ON,
  COMPARISON_BASE,
} from '@/content/comparisons';
import ComparisonLinks from './ComparisonLinks';
import styles from './comparisons.module.css';

export default function ComparisonArticle({ comparison }: { comparison: Comparison }) {
  const compute = comparison.category === 'compute';
  const litLabel = compute ? 'Lit · On-chain approvals' : 'Lit · ChainSecured';
  const governanceSources: SourceId[] = compute
    ? ['litAi', 'litGovernance', 'litKms']
    : ['litGovernance', 'litUpgradeCode', 'litVerification'];
  const ids = Array.from(new Set([
    ...comparison.assessment.sources,
    ...comparison.parity.sources,
    ...comparison.rows.flatMap(row => [...row.lit.sources, ...row.provider.sources]),
    ...comparison.custody.sources,
    ...(comparison.detail?.sources ?? []),
    ...governanceSources,
  ]));
  const references = (refs: SourceId[]) => refs.map(id => (
    <a key={id} href={sources[id].url} target="_blank" rel="noopener noreferrer"
      title={sources[id].title} aria-label={sources[id].title} className={styles.reference}>
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
            {comparison.category === 'wallets' ? 'Wallet infrastructure' : 'Private compute & AI'}
          </p>
          <h1>Lit Protocol vs {comparison.provider}</h1>
          <p className={styles.headline}>{comparison.headline}</p>
          <p className={styles.introduction}>{comparison.introduction}</p>
          <p className={styles.meta}>By Lit Protocol · Reviewed {REVIEWED_ON}</p>
        </header>
        <p className={styles.scope}><strong>Scope: </strong>{comparison.scope}</p>
        <div className={styles.decision}>
          <section>
            <p className={styles.eyebrow}>The Lit advantage</p>
            <h2>{compute
              ? 'On-chain rules govern runtime key access'
              : 'Your on-chain rules govern signing'}</h2>
            <p className={styles.assessment}>
              {comparison.assessment.text}{references(comparison.assessment.sources)}
            </p>
            <a href={compute ? sources.litAi.url : sources.litChain.url} className={styles.inlineLink}>
              {compute ? 'How confidential AI works' : 'How ChainSecured works'} <span aria-hidden="true">↗</span>
            </a>
          </section>
          <section>
            <p className={styles.eyebrow}>Shared protections</p>
            <h2>What both protect</h2>
            <p>{comparison.parity.text}{references(comparison.parity.sources)}</p>
          </section>
        </div>
        <section className={styles.section} aria-labelledby="authority-heading">
          <p className={styles.eyebrow}>Operator authority</p>
          <h2 id="authority-heading">Who can change the rules or stop access?</h2>
          <div className={styles.tableWrap}>
            <table>
              <caption className="sr-only">
                Operator authority: {compute ? 'Lit confidential containers' : 'Lit Chipotle ChainSecured'} compared with {comparison.provider}
              </caption>
              <thead><tr>
                <th scope="col">Control</th>
                <th scope="col">{litLabel}</th>
                <th scope="col">{comparison.provider}</th>
              </tr></thead>
              <tbody>{comparison.rows.map(row => (
                <tr key={row.dimension}>
                  <th scope="row">{row.dimension}</th>
                  <td>{row.lit.text}{references(row.lit.sources)}</td>
                  <td>{row.provider.text}{references(row.provider.sources)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className={styles.mobileComparison}>
            {comparison.rows.map(row => (
              <section key={row.dimension} className={styles.mobileRow}>
                <h3>{row.dimension}</h3>
                <dl>
                  <dt>{litLabel}</dt>
                  <dd>{row.lit.text}{references(row.lit.sources)}</dd>
                  <dt>{comparison.provider}</dt>
                  <dd>{row.provider.text}{references(row.provider.sources)}</dd>
                </dl>
              </section>
            ))}
          </div>
        </section>
        <section className={styles.section} aria-labelledby="custody-heading">
          <h2 id="custody-heading">
            {comparison.category === 'wallets' ? 'What custody means in practice' : 'What control means in practice'}
          </h2>
          <p className={styles.analysisIntro}>
            {comparison.custody.text}{references(comparison.custody.sources)}
          </p>
        </section>
        <aside className={styles.governance}>
          <h2>How upgrades are governed</h2>
          <p>
            {compute
              ? 'Runtime approvals and contract upgrades have separate rules. Check who can approve a new release and who can change the rules for approving it.'
              : 'Your account controls wallet permissions. Protocol governance controls which runtime releases receive keys. Check who can change each set of rules, including through contract upgrades.'}
            {references(governanceSources)}
          </p>
          <a href={`${COMPARISON_BASE}#methodology`} className={styles.inlineLink}>
            How we make these comparisons <span aria-hidden="true">→</span>
          </a>
        </aside>
        <div className={styles.findings}>
          {comparison.detail && (
            <details>
              <summary>{comparison.detail.title}<span aria-hidden="true" className={styles.disclosureMark}>+</span></summary>
              <p>{comparison.detail.text}{references(comparison.detail.sources)}</p>
            </details>
          )}
          <details className={styles.sources}>
            <summary>Sources and review scope<span aria-hidden="true" className={styles.disclosureMark}>+</span></summary>
            <p className={styles.reviewScope}>
              These comparisons use published documentation and the source code
              linked below. We have not audited or tested the providers’ live systems.
              Configurations vary, and source code alone does not establish who
              currently owns a deployed contract or how it is configured.
            </p>
            <ol>{ids.map(id => (
              <li key={id}><a href={sources[id].url} target="_blank" rel="noopener noreferrer">{sources[id].title}</a></li>
            ))}</ol>
          </details>
        </div>
        <div className={styles.actions}>
          <Button href={comparison.category === 'wallets' ? DASHBOARD_LINK : AI_CONTACT_FORM}
            target="_blank" style={{ padding: '0.7rem 1.1rem', borderRadius: '8px', background: '#181818' }}>
            {comparison.category === 'wallets' ? 'Get started with crypto' : 'Contact for Lit AI'}
          </Button>
          <a href="/security" className={styles.back}>Explore Lit’s security <span aria-hidden="true">→</span></a>
        </div>
        <ComparisonLinks category={comparison.category} />
      </Container>
    </article>
  );
}
