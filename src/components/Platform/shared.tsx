import Link from 'next/link';
import { ReactNode } from 'react';
import {
  IconArrowRight,
  IconArrowUpRight,
  IconBrandGithubFilled,
} from '@tabler/icons-react';
import {
  AI_CONTACT_FORM,
  DASHBOARD_LINK,
  GITHUB_LINK,
  DOCS_LINK,
} from '@/utils/constants';
import s from './platform.module.css';

export const evidence = {
  chain: `${DOCS_LINK}/architecture/chain-secured`,
  actions: `${DOCS_LINK}/lit-actions`,
  attestation: `${DOCS_LINK}/architecture/verification/attestation`,
  verification: `${DOCS_LINK}/architecture/verification/index`,
  governance: `${DOCS_LINK}/architecture/verification/upgrade-governance`,
  kms: `${DOCS_LINK}/architecture/verification/onchain-kms`,
  hosting: `${DOCS_LINK}/architecture/self-hosting`,
  secrets: `${DOCS_LINK}/lit-actions/secrets`,
};

export function Action({
  href,
  children,
  secondary = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  external?: boolean;
}) {
  return (
    <a
      className={`${s.button} ${secondary ? s.secondary : ''}`}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {external ? (
        <IconArrowUpRight size={17} aria-hidden="true" />
      ) : (
        <IconArrowRight size={18} aria-hidden="true" />
      )}
    </a>
  );
}
export function TextLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <Link className={s.textLink} href={href}>
      {children}
      {external ? (
        <IconArrowUpRight size={16} aria-hidden="true" />
      ) : (
        <IconArrowRight size={18} aria-hidden="true" />
      )}
    </Link>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className={s.eyebrow}>{children}</p>;
}
export function Actions({ aiOnly = false }: { aiOnly?: boolean }) {
  return (
    <div className={s.actions}>
      {!aiOnly && (
        <Action href={DASHBOARD_LINK}>Get started with crypto</Action>
      )}
      <Action href={AI_CONTACT_FORM} secondary={!aiOnly} external>
        Contact for Lit AI
      </Action>
    </div>
  );
}
export function Closing({ ai = false }: { ai?: boolean }) {
  return (
    <section className={`${s.dark} ${s.closing}`}>
      <div className={s.container}>
        <Eyebrow>Build with Lit</Eyebrow>
        <div className={s.closingRow}>
          <h2>
            {ai
              ? 'Bring your AI workload to Lit.'
              : 'Build on a foundation\nyou can verify.'}
          </h2>
          <Actions aiOnly={ai} />
        </div>
      </div>
    </section>
  );
}
export function TrustLinks() {
  return (
    <nav className={s.trustLinks} aria-label="Platform principles">
      <a href={GITHUB_LINK}>
        <IconBrandGithubFilled size={16} aria-hidden="true" />
        Open-source
      </a>
      <Link href="/security">Cryptographically verifiable</Link>
      <a href={evidence.chain}>User-controlled execution</a>
    </nav>
  );
}
export function PageHero({
  label,
  title,
  children,
  action,
  index,
}: {
  label: string;
  title: ReactNode;
  children: ReactNode;
  action: ReactNode;
  index: string;
}) {
  return (
    <section className={s.pageHero}>
      <div className={s.container}>
        <div className={s.pageOverline}>
          <Eyebrow>{label}</Eyebrow>
          <span className={s.pageIndex}>LIT / {index}</span>
        </div>
        <h1>{title}</h1>
        <div className={s.pageHeroBottom}>
          <p className={s.intro}>{children}</p>
          <div className={s.actions}>{action}</div>
        </div>
      </div>
    </section>
  );
}
export function ComparisonRow({ compute = false }: { compute?: boolean }) {
  const links = compute
    ? [
        ['google-cloud', 'Google Confidential Cloud'],
        ['fortanix', 'Fortanix'],
        ['tinfoil', 'Tinfoil'],
      ]
    : [
        ['privy', 'Privy'],
        ['turnkey', 'Turnkey'],
        ['fireblocks', 'Fireblocks'],
      ];
  return (
    <section className={s.comparisons}>
      <div className={s.container}>
        <p>
          {compute
            ? 'Compare private compute'
            : 'Compare wallet infrastructure'}
        </p>
        <nav
          className={s.inlineLinks}
          aria-label={compute ? 'Compare private compute' : 'Compare wallets'}
        >
          {links.map(([slug, name]) => (
            <TextLink key={slug} href={`/compare/${slug}`}>
              Lit vs {name}
            </TextLink>
          ))}
        </nav>
      </div>
    </section>
  );
}
export function FAQ({
  items,
}: {
  items: { question: string; answer: ReactNode }[];
}) {
  return (
    <section className={s.faqSection}>
      <div className={`${s.container} ${s.faqLayout}`}>
        <h2>Common questions.</h2>
        <div className={s.faqs}>
          {items.map(item => (
            <details key={item.question}>
              <summary>
                {item.question}
                <span aria-hidden="true">+</span>
              </summary>
              <div>{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
