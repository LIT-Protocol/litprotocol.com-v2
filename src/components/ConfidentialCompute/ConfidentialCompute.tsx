'use client';

import { Container } from '@mantine/core';
import { Button } from '../ui/Button';
import {
  IconArrowNarrowRight,
  IconLock,
  IconCpu,
  IconEyeOff,
  IconCertificate,
} from '@tabler/icons-react';
import { CONTACT_FORM } from '@/utils/constants';

const COMPUTE_DOCS = 'https://developer.litprotocol.com/architecture/index';

const POINTS = [
  { Icon: IconCpu, t: 'Any workload, not just signing' },
  { Icon: IconEyeOff, t: 'Private from every operator, including us' },
  { Icon: IconCertificate, t: 'Hardware-attested: prove what ran' },
];

const ConfidentialCompute = () => (
  <section className="relative overflow-hidden bg-coal-950 border-b border-white/5">
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_100%,_oklch(53.51%_0.163_39.51/0.06)_0%,_transparent_55%)]" />
    <Container size="lg" className="relative !py-28">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
        {/* Left: copy */}
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-gold-500">
            Confidential compute
          </div>
          <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-tight tracking-tight text-balance">
            Run any workload{' '}
            <span className="text-lit-orange whitespace-nowrap">no one can see in</span>.
          </h2>
          <p className="mt-5 max-w-[52ch] text-white/65 text-lg leading-relaxed text-pretty">
            Signing is just the start. Spin up a confidential microVM and run
            any code inside the same attested hardware that guards the keys.
            Your logic and data stay private from every operator — and every run
            leaves hardware-backed proof of exactly what ran.
          </p>
          <ul className="mt-7 space-y-3">
            {POINTS.map(({ Icon, t }) => (
              <li key={t} className="flex items-center gap-3 text-white/75">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lit-orange/[0.12] text-lit-orange">
                  <Icon size={18} stroke={1.7} />
                </span>
                <span className="text-[0.97rem]">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              href={CONTACT_FORM}
              target="_blank"
              rel="noopener noreferrer"
              rightIcon={<IconArrowNarrowRight stroke={2} />}
            >
              Talk to us
            </Button>
            <Button
              variant="outline"
              href={COMPUTE_DOCS}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the docs
            </Button>
          </div>
          <p className="mt-4 font-mono text-xs text-white/45">
            Live with design partners — onboarding is hands-on for now.
          </p>
        </div>

        {/* Right: sealed microVM visual */}
        <div className="rounded-2xl border border-white/10 bg-black/50 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
            <span className="font-mono text-xs text-white/55">
              confidential microVM
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-lit-orange">
              <IconLock size={13} stroke={1.8} /> sealed
            </span>
          </div>
          <div className="p-6 font-mono text-[13px] leading-relaxed">
            <div className="text-white/45">$ run ./settlement-engine</div>
            <div className="mt-3 space-y-1.5 text-white/70">
              <div>
                <span className="text-lit-orange">●</span> booting Intel TDX
                enclave
              </div>
              <div>
                <span className="text-lit-orange">●</span> loading code · hash
                measured on-chain
              </div>
              <div>
                <span className="text-lit-orange">●</span> inputs sealed · no
                operator can read
              </div>
              <div>
                <span className="text-lit-orange">●</span> running your workload
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-lit-orange/20 bg-lit-orange/[0.06] px-3 py-2 text-white/80">
              ✓ attested · proof of exactly what ran
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default ConfidentialCompute;
