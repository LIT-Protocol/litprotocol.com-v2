'use client';

import { Container } from '@mantine/core';
import {
  IconArrowNarrowRight,
  IconBrandAws,
  IconBrandGoogle,
  IconServer2,
} from '@tabler/icons-react';
import { Button } from '../ui/Button';
import { QUICKSTART_LINK, DOCS_LINK } from '@/utils/constants';

const TARGETS = [
  { Icon: IconBrandAws, label: 'AWS' },
  { Icon: IconBrandGoogle, label: 'Google Cloud' },
  { Icon: IconServer2, label: 'On-prem' },
];

const RunAnywhere = () => (
  <section className="bg-coal-950 border-b border-white/5">
    <Container size="lg" className="!py-24 text-center">
      <div className="font-mono text-xs uppercase tracking-[0.22em] text-gold-500">
        Managed, not locked in
      </div>
      <h2 className="mt-4 text-[clamp(1.7rem,3.2vw,2.4rem)] font-medium leading-tight tracking-tight">
        We run the infrastructure. You{' '}
        <span className="text-lit-orange">just start</span>.
      </h2>
      <p className="mt-5 max-w-[56ch] mx-auto text-white/65 text-lg leading-relaxed">
        Lit operates the network, so you call the API and go — nothing to deploy,
        nothing to babysit. Need full control? Self-host in your own cloud or
        on-prem and own your governance, with the same attested guarantees.
      </p>
      <div className="mt-9 flex justify-center">
        <Button
          href={QUICKSTART_LINK}
          target="_blank"
          rel="noopener noreferrer"
          rightIcon={<IconArrowNarrowRight stroke={2} />}
        >
          Start building
        </Button>
      </div>

      <div className="mt-14 border-t border-white/5 pt-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
          Prefer to run it yourself?
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {TARGETS.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 text-white/55 transition hover:text-white"
            >
              <Icon size={26} stroke={1.5} />
              <span className="text-base font-medium tracking-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-7">
          <a
            href={DOCS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-white/55 underline-offset-4 transition hover:text-lit-orange hover:underline"
          >
            Self-hosting docs →
          </a>
        </div>
      </div>
    </Container>
  </section>
);

export default RunAnywhere;
