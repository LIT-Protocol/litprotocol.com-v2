'use client';

import { Container } from '@mantine/core';
import { Button } from '../ui/Button';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { CONTACT_FORM, DOCS_LINK } from '@/utils/constants';

const Pillar = ({ label, sub }: { label: string; sub: string }) => (
  <div className="border border-white/10 rounded-xl p-5 bg-white/[0.02] text-left">
    <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
      {label}
    </div>
    <div className="mt-3 text-sm text-white/70">{sub}</div>
  </div>
);

const PillarCenter = () => (
  <div className="border-2 border-mint-500 rounded-xl p-5 bg-mint-500/10 text-center relative">
    <div className="font-mono text-xs uppercase tracking-[0.2em] text-mint-500">
      DECIDE
    </div>
    <div className="mt-3 text-sm text-white">
      Policy logic in a chain-secured TEE
    </div>
  </div>
);

const LandingHero = () => {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-blue-950 to-coal-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_var(--color-blue-950)_0%,_transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,_oklch(82.91%_0.133_174.96/0.18)_0%,_transparent_55%)] pointer-events-none" />
      <div className="absolute -left-[16rem] -top-[6rem] z-0 hidden md:block pointer-events-none w-[40rem] opacity-50">
        <img src="/textures/hero-left.png" alt="" className="w-full h-auto" />
      </div>
      <div className="absolute -right-[14rem] -top-[4rem] z-0 hidden md:block pointer-events-none w-[42rem] opacity-60">
        <img src="/textures/hero-right.png" alt="" className="w-full h-auto" />
      </div>
      <Container size="lg" className="relative z-10 !pt-28 !pb-32 text-center">
        <h1 className="text-[2.5rem]/[1.1] md:text-[4.5rem]/[1.05] font-medium tracking-tight max-w-4xl mx-auto text-balance">
          Enforce policy{' '}
          <br className="hidden md:inline" />
          <span className="text-mint-500">before every signature.</span>{' '}
          <br className="hidden md:inline" />
          Act across any chain or API.
        </h1>
        <p className="mt-8 max-w-xl mx-auto text-white/70 text-lg leading-relaxed">
          Lit lets teams run authorization logic, compliance checks, and asset
          controls inside a chain-secured TEE before any key signs. Build
          cross-chain apps and agent workflows without trusting a backend,
          custodian, or multisig.
        </p>
        <div className="mt-10 flex gap-3 justify-center flex-wrap">
          <Button
            href={DOCS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            rightIcon={<IconArrowNarrowRight stroke={2} />}
          >
            Start building
          </Button>
          <Button
            variant="outline"
            href={CONTACT_FORM}
            target="_blank"
            rel="noopener noreferrer"
          >
            Talk to an engineer
          </Button>
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 md:gap-4">
            <Pillar
              label="VERIFY"
              sub="On-chain state · APIs · identities · risk data"
            />
            <PillarCenter />
            <Pillar
              label="AUTHORIZE"
              sub="Signatures · decryptions · API actions"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LandingHero;
