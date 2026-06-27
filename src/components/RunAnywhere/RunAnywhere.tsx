'use client';

import { Container } from '@mantine/core';
import { IconBrandAws, IconBrandGoogle, IconServer2 } from '@tabler/icons-react';
import { DOCS_LINK } from '@/utils/constants';

const TARGETS = [
  { Icon: IconBrandAws, label: 'AWS' },
  { Icon: IconBrandGoogle, label: 'Google Cloud' },
  { Icon: IconServer2, label: 'On-prem' },
];

const RunAnywhere = () => (
  <section className="bg-coal-950 border-b border-white/5">
    <Container size="lg" className="!py-24 text-center">
      <div className="font-mono text-xs uppercase tracking-[0.22em] text-gold-500">
        No lock-in
      </div>
      <h2 className="mt-4 text-[clamp(1.7rem,3.2vw,2.4rem)] font-medium leading-tight tracking-tight">
        Run it on your cloud, or your own hardware.
      </h2>
      <p className="mt-5 max-w-[56ch] mx-auto text-white/65 text-lg leading-relaxed">
        No managed sandbox to lock you in. Deploy in your own cloud or
        on-premise — your infrastructure, your keys, your governance — with the
        same attested guarantees wherever it runs.
      </p>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
        {TARGETS.map(({ Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 text-white/55 transition hover:text-white"
          >
            <Icon size={30} stroke={1.5} />
            <span className="text-lg font-medium tracking-tight">{label}</span>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <a
          href={DOCS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-white/55 underline-offset-4 transition hover:text-lit-orange hover:underline"
        >
          See deployment options →
        </a>
      </div>
    </Container>
  </section>
);

export default RunAnywhere;
