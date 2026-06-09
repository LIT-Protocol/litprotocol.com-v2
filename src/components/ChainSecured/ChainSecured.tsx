'use client';

import { Container } from '@mantine/core';
import { Button } from '../ui/Button';
import {
  IconEyeOff,
  IconLink,
  IconShieldCheck,
  IconArrowNarrowRight,
} from '@tabler/icons-react';
import { DOCS_LINK, GITHUB_LINK } from '@/utils/constants';

const PROOF_OF_CLOUD = 'https://proofofcloud.org/';

const PROPS = [
  {
    Icon: IconEyeOff,
    t: 'Blind',
    b: 'Keys are generated and used only inside sealed TEEs. No operator — including Lit — can see or extract them.',
  },
  {
    Icon: IconLink,
    t: 'Bound',
    b: 'A key’s authority is on-chain state on Base. It signs only what an immutable, content-addressed policy permits — code, not an admin switch.',
  },
  {
    Icon: IconShieldCheck,
    t: 'Verifiable',
    b: 'Every signature is a hardware-attested record, hardened by Proof of Cloud. Confirm the exact code running in the enclave.',
  },
];

const ChainSecured = () => (
  <section className="relative overflow-hidden bg-coal-950 border-b border-white/5">
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,_oklch(53.51%_0.163_39.51/0.07)_0%,_transparent_55%)]" />
    <Container size="lg" className="relative !py-28 text-center">
      <div className="font-mono text-xs uppercase tracking-[0.22em] text-gold-500">
        Don’t trust. Verify.
      </div>
      <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-tight tracking-tight">
        Control you can prove, not promise.
      </h2>
      <p className="mt-5 max-w-[54ch] mx-auto text-white/65 text-lg leading-relaxed">
        We operate the network — but operating it grants no access. Here’s how:
      </p>
      <div className="mt-12 grid gap-5 md:grid-cols-3 text-left max-w-5xl mx-auto">
        {PROPS.map(({ Icon, t, b }) => (
          <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-lit-orange/[0.12] text-lit-orange">
              <Icon size={24} stroke={1.6} />
            </div>
            <div className="text-lg font-medium">{t}</div>
            <p className="mt-2.5 text-[0.97rem] leading-relaxed text-white/60">{b}</p>
          </div>
        ))}
      </div>
      <p className="mt-9 max-w-[60ch] mx-auto text-[1.05rem] leading-relaxed text-white/80">
        There is <strong className="font-medium text-lit-orange">no trusted operator</strong>.
        We run the network; on-chain rules and sealed hardware enforce it — in the
        open, where you can check.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          href={GITHUB_LINK}
          target="_blank"
          rel="noopener noreferrer"
          rightIcon={<IconArrowNarrowRight stroke={2} />}
        >
          Read the code
        </Button>
        <Button variant="outline" href={PROOF_OF_CLOUD} target="_blank" rel="noopener noreferrer">
          How attestation works
        </Button>
      </div>
      <div className="mt-5">
        <a
          href={DOCS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-white/45 underline-offset-4 transition hover:text-gold-500 hover:underline"
        >
          Prefer to run it yourself? Self-host the open-source network →
        </a>
      </div>
    </Container>
  </section>
);

export default ChainSecured;
