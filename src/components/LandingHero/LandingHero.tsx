'use client';

import { Container } from '@mantine/core';
import { Button } from '../ui/Button';
import { IconArrowNarrowRight, IconBrandGithub } from '@tabler/icons-react';
import { CONTACT_FORM, QUICKSTART_LINK, GITHUB_LINK } from '@/utils/constants';

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

const Metric = ({ value, label }: { value: string; label: string }) => (
  <span>
    <b className="font-semibold text-lit-orange">{value}</b> {label}
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
        <h1 className="mx-auto max-w-5xl text-[2.1rem]/[1.16] md:text-[3.2rem]/[1.12] font-medium tracking-tight text-balance">
          Sign on any chain, only by your rules.{' '}
          <br className="hidden md:inline" />
          <span className="text-lit-orange">
            Keys no operator can extract. Not even us.
          </span>
        </h1>
        <p className="mt-7 max-w-2xl mx-auto text-white/70 text-lg leading-relaxed">
          Deploy your code once and the Lit Protocol runs it in a sealed TEE,
          secured by the chain. No servers for you to run, no operator to trust.
        </p>
        <div className="mt-9 flex gap-3 justify-center flex-wrap">
          <Button
            href={QUICKSTART_LINK}
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

        <div className="mx-auto mt-9 flex max-w-2xl flex-wrap items-baseline justify-center gap-x-5 gap-y-2 border-t border-white/5 pt-6 font-mono text-[clamp(0.95rem,1.6vw,1.15rem)] text-white/65">
          <Metric value="$400M+" label="secured" />
          <span className="text-white/20">·</span>
          <Metric value="1.6M+" label="wallets" />
          <span className="text-white/20">·</span>
          <Metric value="$135M+" label="volume" />
        </div>
        <div className="mt-4">
          <a
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/55 transition hover:text-gold-500"
          >
            <IconBrandGithub size={15} stroke={1.8} /> Open source
          </a>
        </div>

        <div className="mt-14 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <Pillar label="READ" sub="Any API, any chain." />
            <PillarCenter
              label="DECIDE & SIGN"
              sub="Your policy runs in the TEE. Keys sign only what it allows."
            />
            <Pillar label="WRITE" sub="Any EVM chain, Solana, Bitcoin, Cosmos." />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LandingHero;
