'use client';

import { Container } from '@mantine/core';
import styles from './landingHero.module.css';
import { Button } from '../ui/Button';
import {
  IconArrowNarrowRight,
  IconBrandGithub,
  IconBrandGithubFilled,
} from '@tabler/icons-react';
import {
  CONTACT_FORM,
  QUICKSTART_LINK,
  GITHUB_LINK,
  DASHBOARD_LINK,
} from '@/utils/constants';

const CHAIN_SECURED =
  'https://developer.litprotocol.com/architecture/chain-secured';

const ONCHAIN_KMS =
  'https://developer.litprotocol.com/architecture/verification/onchain-kms';

const Pillar = ({ label, sub }: { label: string; sub: string }) => (
  <div className="border border-white/10 rounded-xl p-5 bg-white/[0.02] text-left">
    <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">
      {label}
    </div>
    <div className="mt-3 text-sm text-white/70">{sub}</div>
  </div>
);

const PillarCenter = ({ label, sub }: { label: string; sub: string }) => (
  <div className="border-2 border-lit-orange rounded-xl p-5 bg-lit-orange/10 text-left relative">
    <div className="font-mono text-xs uppercase tracking-[0.18em] text-lit-orange">
      {label}
    </div>
    <div className="mt-3 text-sm text-white">{sub}</div>
  </div>
);

const Metric = ({
  value,
  label,
  draft = false,
}: {
  value: string;
  label: string;
  draft?: boolean;
}) => (
  <span>
    <b
      className={`font-semibold ${draft ? 'text-off-white' : 'text-lit-orange'}`}
    >
      {value}
    </b>{' '}
    {label}
  </span>
);

const LandingHero = ({ draft = false }: { draft?: boolean }) => {
  return (
    <section
      className={`relative overflow-hidden border-b border-white/5 ${draft ? styles.draft : 'bg-gradient-to-b from-blue-950 to-coal-950'}`}
    >
      {!draft && (
        <>
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_-5%,_oklch(53.51%_0.163_39.51/0.16)_0%,_transparent_55%)]" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_82%_78%,_oklch(24.69%_0.075_260.78/0.5)_0%,_transparent_55%)]" />
        </>
      )}
      <div
        className={`absolute -left-[16rem] -top-[6rem] z-0 hidden md:block pointer-events-none w-[40rem] ${draft ? 'opacity-15 grayscale' : 'opacity-50'}`}
      >
        <img src="/textures/hero-left.png" alt="" className="w-full h-auto" />
      </div>
      <div
        className={`absolute -right-[14rem] -top-[4rem] z-0 hidden md:block pointer-events-none w-[42rem] ${draft ? 'opacity-20 grayscale' : 'opacity-60'}`}
      >
        <img src="/textures/hero-right.png" alt="" className="w-full h-auto" />
      </div>
      <Container
        size="lg"
        className={`relative z-10 !pt-28 text-center ${draft ? '!pb-20' : '!pb-32'}`}
      >
        <h1
          className={`mx-auto max-w-5xl font-medium tracking-tight text-balance ${draft ? 'text-[clamp(2.35rem,4.8vw,4rem)] leading-[1.08]' : 'text-[2.1rem]/[1.16] md:text-[3.2rem]/[1.12]'}`}
        >
          {draft ? (
            <span className="text-off-white">
              Confidential, verifiable execution.
            </span>
          ) : (
            <>
              The <span className="text-lit-orange">verifiable</span>{' '}
              integration layer for finance.
            </>
          )}
        </h1>
        <p className="mt-7 max-w-2xl mx-auto text-white/70 text-lg leading-relaxed text-balance">
          {draft
            ? 'Lit runs your code in confidential hardware. You can verify the software, connect to any data source, and control what the code can do and send. Use it for crypto transactions, or for AI training and inference.'
            : 'Deploy software verifiably to compute and sign across DeFi, centralized exchanges, and more.'}
        </p>
        <div className="mt-9 flex gap-3 justify-center flex-wrap">
          <Button
            href={draft ? DASHBOARD_LINK : QUICKSTART_LINK}
            target="_blank"
            rel="noopener noreferrer"
            rightIcon={<IconArrowNarrowRight stroke={2} />}
            style={
              draft
                ? { padding: '0.7rem 1.1rem', borderRadius: '10px' }
                : undefined
            }
          >
            {draft ? 'Get started' : 'Start building'}
          </Button>
          <Button
            variant="outline"
            style={
              draft
                ? {
                    padding: '0.7rem 1.1rem',
                    borderRadius: '10px',
                    boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 25%)',
                  }
                : undefined
            }
            href={CONTACT_FORM}
            target="_blank"
            rel="noopener noreferrer"
          >
            {draft ? 'Contact us for AI' : 'Talk to an engineer'}
          </Button>
        </div>

        <div className="mx-auto mt-9 flex max-w-2xl flex-wrap items-baseline justify-center gap-x-5 gap-y-2 border-t border-white/5 pt-6 font-mono text-[clamp(0.95rem,1.6vw,1.15rem)] text-white/65">
          <Metric value="$50B+" label="secured" draft={draft} />
        </div>
        <div
          className={`mt-4 flex items-center justify-center gap-x-3 ${draft ? 'mx-auto max-w-4xl flex-col gap-y-3 text-sm text-white/70 md:flex-row md:flex-wrap' : 'font-mono text-xs uppercase flex-wrap gap-y-1 tracking-[0.16em] text-white/55'}`}
        >
          <a
            href={GITHUB_LINK}
            aria-label={draft ? 'Open source on GitHub' : undefined}
            title={draft ? 'GitHub' : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 transition ${draft ? styles.proofLink : 'hover:text-gold-500'}`}
          >
            {draft ? (
              <>
                <IconBrandGithubFilled size={24} aria-hidden="true" />
                Open source
              </>
            ) : (
              <>
                <IconBrandGithub size={14} stroke={1.8} /> Open source
              </>
            )}
          </a>
          <span
            aria-hidden="true"
            className={
              draft ? 'hidden text-white/30 md:inline' : 'text-white/25'
            }
          >
            {draft ? '+' : '·'}
          </span>
          <a
            href={ONCHAIN_KMS}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition ${draft ? styles.proofLink : 'hover:text-gold-500'}`}
          >
            Cryptographically verifiable
          </a>
          {draft && (
            <>
              <span
                aria-hidden="true"
                className="hidden text-white/30 md:inline"
              >
                +
              </span>
              <a
                href={CHAIN_SECURED}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.proofLink}
              >
                User-controlled execution
              </a>
            </>
          )}
        </div>

        {!draft && (
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              <Pillar
                label="READ"
                sub="Any source. APIs, oracles, any chain."
              />
              <PillarCenter
                label="DECIDE & SIGN"
                sub="Your policy runs in confidential hardware. Keys sign only what it allows."
              />
              <Pillar
                label="SETTLE"
                sub="Any chain. EVM, Solana, Bitcoin, Cosmos."
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default LandingHero;
