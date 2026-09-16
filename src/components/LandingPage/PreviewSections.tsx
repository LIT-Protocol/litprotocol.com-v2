'use client';

import { Container } from '@mantine/core';
import { Button } from '../ui/Button';
import ComparisonLinks from '../Comparisons/ComparisonLinks';
import { AI_CONTACT_FORM, GITHUB_LINK, DASHBOARD_LINK } from '@/utils/constants';
import { IconBrandGithubFilled } from '@tabler/icons-react';
import styles from './preview.module.css';

const ATTESTATION =
  'https://developer.litprotocol.com/architecture/verification/attestation';
const GOVERNANCE =
  'https://developer.litprotocol.com/architecture/verification/upgrade-governance';
const SELF_HOSTING =
  'https://developer.litprotocol.com/architecture/self-hosting';
const buttonStyle = { padding: '0.7rem 1.1rem', borderRadius: '10px' };
const outlineStyle = {
  ...buttonStyle,
  boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 25%)',
};

const walletProperties = [
  {
    title: 'Keep keys private and verify what runs.',
    text: 'Lit derives and uses keys inside confidential hardware, isolated from the host. You can check the runtime’s code hash against an approved release.',
  },
  {
    title: 'Set permissions you can inspect.',
    text: 'Choose which code can use a wallet. Your account controls those permissions through contract state that anyone can inspect.',
  },
];

const walletUseCases = [
  {
    title: 'Stablecoins',
    href: '/stablecoins',
  },
  {
    title: 'Cross-chain solvers',
    href: '/solvers',
  },
  {
    title: 'Tokenized assets',
    href: '/rwa',
  },
];

export function PreviewWallets() {
  return (
    <section
      id="wallets"
      className={styles.section}
      aria-labelledby="wallet-heading"
    >
      <Container size="lg" className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Wallet infrastructure</p>
          <h2 id="wallet-heading" className={styles.heading}>
            You decide what your wallets can sign.
          </h2>
          <p className={styles.intro}>
            Write code that reads from APIs or blockchains and decides when a
            wallet can sign. Your on-chain account controls which code is
            authorized, and Lit runs it inside confidential hardware.
          </p>
          <div className={styles.actions}>
            <Button href={DASHBOARD_LINK} target="_blank" style={buttonStyle}>
              Get started with crypto
            </Button>
          </div>
        </header>
        <div className={styles.properties}>
          {walletProperties.map(item => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
          <nav aria-label="Wallet use cases">
            <h3>Use cases</h3>
            <div className={styles.useCaseLinks}>
              {walletUseCases.map(item => (
                <a key={item.href} href={item.href}>
                  {item.title}
                  <span aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
        <ComparisonLinks category="wallets" />
      </Container>
    </section>
  );
}

export function PreviewCompute() {
  return (
    <section
      id="ai"
      className={`${styles.section} ${styles.compute}`}
      aria-labelledby="ai-heading"
    >
      <Container size="lg" className={styles.container}>
        <div className={styles.split}>
          <header>
            <p className={styles.eyebrow}>AI training & inference</p>
            <h2 id="ai-heading" className={styles.heading}>
              Keep AI workloads private and verifiable.
            </h2>
            <p className={styles.intro}>
              Tell us what you want to train or run and what data it needs.
              We’ll work with you to define the private environment, verify its
              software, and set rules for data access and outputs.
            </p>
            <div className={styles.actions}>
              <Button href={AI_CONTACT_FORM} target="_blank" style={buttonStyle}>
                Contact for Lit AI
              </Button>
            </div>
          </header>
          <div className={styles.workloads}>
            <div>
              <h3>Training</h3>
              <p>Plan how to train or fine-tune models with sensitive data.</p>
            </div>
            <div>
              <h3>Inference</h3>
              <p>
                Work with us to protect prompts, context, and responses while
                your model runs.
              </p>
            </div>
            <div>
              <h3>Data control</h3>
              <p>
                Connect private datasets and external services, then define what
                the workload can read, send, or return.
              </p>
            </div>
          </div>
        </div>
        <ComparisonLinks category="compute" />
      </Container>
    </section>
  );
}

export function PreviewInfrastructure() {
  return (
    <section
      id="infrastructure"
      className={styles.section}
      aria-labelledby="infrastructure-heading"
    >
      <Container size="lg" className={styles.container}>
        <div className={styles.editorial}>
          <header>
            <p className={styles.eyebrow}>Infrastructure</p>
            <h2 id="infrastructure-heading" className={styles.heading}>
              We make open, verifiable infrastructure easy to use.
            </h2>
          </header>
          <div className={styles.editorialBody}>
            <p className={styles.intro}>
              We manage the hosted system, abiding by the on-chain process for
              approving protocol updates. You can inspect the source, see which
              releases are approved, and verify the software running. Connect
              through the API to get started.
            </p>
            <p className={styles.governance}>
              Wallet policy and runtime approvals are separate.
            </p>
            <nav
              className={styles.infrastructureLinks}
              aria-label="Infrastructure details"
            >
              <a
                href={GITHUB_LINK}
                aria-label="Open-source on GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandGithubFilled size={18} aria-hidden="true" />
                Open-source
              </a>
              <a href={ATTESTATION} target="_blank" rel="noopener noreferrer">
                How attestation works
              </a>
              <a href={GOVERNANCE} target="_blank" rel="noopener noreferrer">
                Runtime governance
              </a>
              <a href={SELF_HOSTING} target="_blank" rel="noopener noreferrer">
                Run Lit Protocol on-premises
              </a>
            </nav>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PreviewClosing() {
  return (
    <section
      className={`${styles.section} ${styles.closing}`}
      aria-labelledby="closing-heading"
    >
      <Container size="lg" className={styles.container}>
        <div className={styles.centered}>
          <h2 id="closing-heading" className={styles.heading}>
            Build on a foundation you can verify.
          </h2>
          <p className={styles.intro}>
            Start with the API for crypto, or work with our team on confidential
            AI training and inference.
          </p>
          <div className={styles.actions}>
            <Button href={DASHBOARD_LINK} target="_blank" style={buttonStyle}>
              Get started with crypto
            </Button>
            <Button
              variant="outline"
              href={AI_CONTACT_FORM}
              target="_blank"
              style={outlineStyle}
            >
              Contact for Lit AI
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
