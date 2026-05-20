import Layout from '@/components/Layout/Layout';
import Link from 'next/link';
import { Container } from '@mantine/core';

const options = [
  {
    id: 1,
    label: 'Read. Compute. Write.',
    angle: 'Developer-forward',
    pitch:
      'Leads with the primitive: read anywhere, compute in a TEE, write to any chain or API. Hero is a real code snippet. For people who want to understand what it actually is in 30 seconds.',
    accent: 'text-mint-500',
  },
  {
    id: 2,
    label: 'The Programmable Oracle',
    angle: 'Infrastructure positioning',
    pitch:
      'Positions Lit against traditional oracles, bridges, and "trust me" backends. Leans hard on the chain-secured TEE story. For people evaluating infra and comparing options.',
    accent: 'text-lit-orange',
  },
  {
    id: 3,
    label: 'Cross-Chain, Cross-API',
    angle: 'Use-case forward',
    pitch:
      'Opens with the outcome: connect any chain to any API. Interactive flow viewer lets visitors click through 6 concrete patterns (rebalancer, agent, oracle, webhook bridges). For people who want to see "is this for me?".',
    accent: 'text-electric-blue-500',
  },
];

export default function PrototypesIndex() {
  return (
    <Layout>
      <div className="bg-coal-950 text-off-white min-h-screen">
        <Container size="md" className="!py-24">
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Landing page prototypes · for review
            </span>
            <h1 className="mt-4 !text-4xl md:!text-6xl font-medium leading-tight">
              Reorienting the site around{' '}
              <span className="text-mint-500">read · compute · write</span>.
            </h1>
            <p className="mt-6 text-white/70 max-w-2xl">
              Three different ways to frame Lit as the TEE-secured runtime for
              cross-chain and cross-API workflows. Each is a full landing page
              you can scroll. Switcher at the bottom of each lets you flip
              between them.
            </p>
          </div>

          <div className="space-y-4">
            {options.map((o) => (
              <Link
                key={o.id}
                href={`/prototypes/${o.id}`}
                className="block border border-white/10 rounded-xl p-6 hover:border-white/30 hover:bg-white/[0.02] transition group"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-white/40">
                      0{o.id}
                    </span>
                    <span
                      className={`font-mono text-xs uppercase tracking-widest ${o.accent}`}
                    >
                      {o.angle}
                    </span>
                  </div>
                  <span className="text-white/30 group-hover:text-white transition">
                    →
                  </span>
                </div>
                <div className="text-3xl font-medium mb-2">{o.label}</div>
                <div className="text-white/60 text-sm max-w-2xl">{o.pitch}</div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-white/40 text-sm">
            ↳ Once you pick a direction (or a remix), the existing{' '}
            <Link href="/" className="underline hover:text-white">
              homepage
            </Link>{' '}
            sections can be replaced wholesale.
          </div>
        </Container>
      </div>
    </Layout>
  );
}
