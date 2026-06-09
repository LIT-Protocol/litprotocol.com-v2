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
  <div className="border-2 border-lit-orange rounded-xl p-5 bg-lit-orange/10 text-left relative">
    <div className="font-mono text-xs uppercase tracking-[0.18em] text-lit-orange">
      COMPUTE · SIGN · ENFORCE
    </div>
    <div className="mt-3 text-sm text-white">Your logic, signing &amp; policy — in the TEE</div>
  </div>
);

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-white/45">
    <span className="text-gold-500">◇</span> {children}
  </span>
);

const LandingHero = () => {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-blue-950 to-coal-950">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_-5%,_oklch(53.51%_0.163_39.51/0.16)_0%,_transparent_55%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_82%_78%,_oklch(24.69%_0.075_260.78/0.5)_0%,_transparent_55%)]" />
      <div className="absolute -left-[16rem] -top-[6rem] z-0 hidden md:block pointer-events-none w-[40rem] opacity-50">
        <img src="/textures/hero-left.png" alt="" className="w-full h-auto" />
      </div>
      <div className="absolute -right-[14rem] -top-[4rem] z-0 hidden md:block pointer-events-none w-[42rem] opacity-60">
        <img src="/textures/hero-right.png" alt="" className="w-full h-auto" />
      </div>
      <Container size="lg" className="relative z-10 !pt-28 !pb-32 text-center">
        <h1 className="mx-auto max-w-5xl text-[2.3rem]/[1.14] md:text-[3.6rem]/[1.1] font-medium tracking-tight text-balance">
          Read anywhere.{' '}
          <br className="hidden md:inline" />
          <span className="text-lit-orange">Compute, sign &amp; enforce in a TEE.</span>{' '}
          <br className="hidden md:inline" />
          Write to any chain.
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-white/70 text-lg leading-relaxed">
          Chain-secured, open-source programmable runtime — so no one, including
          us, can see or extract your keys.
        </p>
        <div className="mt-9 flex gap-3 justify-center flex-wrap">
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
        <div className="mx-auto mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-x-7 gap-y-2 border-t border-white/5 pt-6">
          <Chip>Open source</Chip>
          <Chip>No trusted operator</Chip>
          <Chip>Hardware-attested</Chip>
        </div>

        <div className="mt-14 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <Pillar label="READ" sub="APIs · RPCs · feeds · prices" />
            <PillarCenter />
            <Pillar label="WRITE" sub="EVM · SVM · BTC · Cosmos · HTTPS" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LandingHero;
