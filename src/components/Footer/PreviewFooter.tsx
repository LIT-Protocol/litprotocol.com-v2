import { Container } from '@mantine/core';
import LitLogo from '../LitLogo/LitLogo';
import { comparisons, comparisonHref } from '@/content/comparisons';
import {
  BRAND_LINK,
  CAREERS_LINK,
  CONTACT_FORM,
  DISCORD_LINK,
  DOCS_LINK,
  QUICKSTART_LINK,
  LINKEDIN_LINK,
  MICA_LINK,
  SPARK_LINK,
  TELEGRAM_LINK,
  TWITTER_LINK,
} from '@/utils/constants';
import styles from './previewFooter.module.css';

const groups = [
  {
    title: 'Documentation',
    links: [
      { label: 'Quickstart', href: QUICKSTART_LINK },
      {
        label: 'Security',
        href: `${DOCS_LINK}/architecture/verification/index`,
      },
      { label: 'Use cases', href: `${DOCS_LINK}/lit-actions/examples` },
      {
        label: 'Chain Secured',
        href: `${DOCS_LINK}/architecture/chain-secured`,
      },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', href: CONTACT_FORM },
      { label: 'Blog', href: SPARK_LINK },
      { label: 'Careers', href: CAREERS_LINK },
      { label: 'Brand kit', href: BRAND_LINK },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'X', href: TWITTER_LINK },
      { label: 'Discord', href: DISCORD_LINK },
      { label: 'Telegram', href: TELEGRAM_LINK },
      { label: 'LinkedIn', href: LINKEDIN_LINK },
    ],
  },
];

function FooterGroup({ group }: { group: (typeof groups)[number] }) {
  return (
    <nav
      aria-label={`Footer ${group.title.toLowerCase()}`}
      className={
        group.title === 'Documentation' ? styles.documentation : undefined
      }
    >
      <h2>{group.title}</h2>
      <ul>
        {group.links.map(link => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function PreviewFooter() {
  return (
    <footer id="footer" className={styles.footer}>
      <Container size="lg">
        <div className={styles.brandBar}>
          <a href="/" aria-label="Lit Protocol home" className={styles.brand}>
            <LitLogo className={styles.logo} />
          </a>
          <nav aria-label="Footer platform" className={styles.platformLinks}>
            <a href="/crypto">Programmable wallets</a>
            <a href="/ai">Confidential AI</a>
            <a href="/keychain">Agent Keychain app</a>
            <a href="/security">Security & verification</a>
          </nav>
        </div>
        <div className={styles.directory}>
          <FooterGroup group={groups[0]} />
          <section className={styles.compare} aria-label="Comparisons">
            <div className={styles.comparisonGroups}>
              {(['wallets', 'compute'] as const).map(category => (
                <nav
                  key={category}
                  aria-label={`Footer ${category} comparisons`}
                >
                  <h2>
                    <a href={`/compare#${category}`}>
                      {category === 'wallets'
                        ? 'Compare wallets'
                        : 'Compare private compute'}
                    </a>
                  </h2>
                  <ul>
                    {comparisons
                      .filter(item => item.category === category)
                      .map(item => (
                        <li key={item.slug}>
                          <a href={comparisonHref(item.slug)}>
                            Lit vs {item.provider}
                          </a>
                        </li>
                      ))}
                  </ul>
                </nav>
              ))}
            </div>
          </section>
          {groups.slice(1).map(group => (
            <FooterGroup key={group.title} group={group} />
          ))}
        </div>
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Lit Protocol</p>
          <nav aria-label="Legal" className={styles.legal}>
            <a href="/legal/privacy-policy">Privacy policy</a>
            <a href="/legal/terms-of-service">Terms of service</a>
            <a href={MICA_LINK}>MiCA whitepaper</a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
