import Link from 'next/link';
import { Container } from '@mantine/core';

const DOCS_EXAMPLES =
  'https://developer.litprotocol.com/lit-actions/examples';

const USE_CASES = [
  {
    tag: 'Stablecoins',
    k: 'Verifiable compliance for stablecoins',
    v: 'Code-enforced, on-chain key control built for the GENIUS Act, verifiable by your own auditors.',
    href: '/stablecoins',
  },
  {
    tag: 'Solvers',
    k: 'Cross-chain solvers',
    v: 'A policy gate in a TEE that signs only the inventory moves your rules allow.',
    href: '/solvers',
  },
];

const UseCases = () => (
  <section className="bg-coal-950 border-b border-white/5">
    <Container size="lg" className="!py-28">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <div className="font-mono text-xs uppercase tracking-[0.22em] text-gold-500">
          Use cases
        </div>
        <h2 className="mt-4 text-3xl md:text-[2.6rem] font-medium leading-tight tracking-tight">
          Where this matters most.
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {USE_CASES.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-7 no-underline text-inherit transition hover:border-lit-orange/40 hover:bg-white/[0.04]"
          >
            <div className="font-mono text-[11px] uppercase tracking-widest text-white/55">
              {d.tag}
            </div>
            <div className="mt-3 text-lg font-medium">{d.k}</div>
            <p className="mt-2.5 text-[0.97rem] leading-relaxed text-white/60">
              {d.v}
            </p>
            <div className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-lit-orange">
              Read the paper
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a
          href={DOCS_EXAMPLES}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-white/55 underline-offset-4 transition hover:text-lit-orange hover:underline"
        >
          More patterns developers are shipping →
        </a>
      </div>
    </Container>
  </section>
);

export default UseCases;
