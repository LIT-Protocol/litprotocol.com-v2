'use client';

import { Container } from '@mantine/core';
import { Button } from '../ui/Button';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { MonoBadge, PrototypeSwitcher } from './Shared';
import { CONTACT_FORM } from '@/utils/constants';

const DOCS = 'https://developer.litprotocol.com/';

const codeSample = `// Inside a Lit Action — runs in a chain-secured TEE
const price = await fetch(
  "https://api.coinbase.com/v2/prices/ETH-USD/spot"
).then(r => r.json());

const onChain = await Lit.Actions.callContract({
  chain: "base",
  to: vaultAddress,
  abi: vaultAbi,
  functionName: "currentRatio",
});

if (price.amount * onChain < threshold) {
  await Lit.Actions.signAndSendTransaction({
    chain: "arbitrum",
    to: hookAddress,
    data: rebalance.encode(),
  });
}`;

export default function Prototype1() {
  return (
    <div className="bg-coal-950 text-off-white min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-blue-950 to-coal-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_var(--color-blue-950)_0%,_transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,_oklch(82.91%_0.133_174.96/0.18)_0%,_transparent_55%)] pointer-events-none" />
        <div className="absolute -left-[16rem] -top-[6rem] z-0 hidden md:block pointer-events-none w-[40rem] opacity-50">
          <img src="/textures/hero-left.png" alt="" className="w-full h-auto" />
        </div>
        <div className="absolute -right-[14rem] -top-[4rem] z-0 hidden md:block pointer-events-none w-[42rem] opacity-60">
          <img
            src="/textures/hero-right.png"
            alt=""
            className="w-full h-auto"
          />
        </div>
        <Container size="lg" className="relative z-10 !pt-28 !pb-32 text-center">
          <MonoBadge>Lit Protocol · TEE-secured compute</MonoBadge>
          <h1 className="mt-8 !text-[2.5rem] md:!text-[4.5rem]/[1.05] font-medium tracking-tight max-w-4xl !mx-auto">
            Read anywhere.
            <br />
            <span className="text-mint-500">Compute</span> in a TEE.
            <br />
            Write to any chain or API.
          </h1>
          <p className="mt-8 max-w-xl !mx-auto text-white/70 text-lg leading-relaxed">
            One programmable runtime. Pulls data from any source, runs your
            logic inside a chain-secured TEE, signs on any chain or API — with
            no backend to trust.
          </p>
          <div className="mt-10 flex gap-3 justify-center flex-wrap">
            <Button
              href={DOCS}
              target="_blank"
              rightIcon={<IconArrowNarrowRight stroke={2} />}
            >
              Start building
            </Button>
            <Button variant="outline" href={CONTACT_FORM} target="_blank">
              Talk to an engineer
            </Button>
          </div>

          {/* READ → COMPUTE → WRITE PILLAR VISUAL */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <Pillar
                label="READ"
                sub="APIs · RPCs · feeds · webhooks"
              />
              <PillarCenter />
              <Pillar
                label="WRITE"
                sub="EVM · SVM · BTC · Cosmos · HTTPS"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* WHAT IT LOOKS LIKE (code snippet) */}
      <section className="border-b border-white/5 bg-gradient-to-b from-blue-950/30 to-transparent">
        <Container size="lg" className="!py-28">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <MonoBadge>What it looks like</MonoBadge>
            <h2 className="mt-6 !text-4xl md:!text-6xl font-medium leading-tight">
              One file. Reads, computes, signs across chains.
            </h2>
            <p className="mt-6 mx-auto text-white/70 text-lg">
              A Lit Action is JavaScript that runs inside the network&apos;s TEE.
              Deploy it once. The keys it signs with don&apos;t belong to anyone
              — they&apos;re governed on-chain.
            </p>
          </div>

          <div className="max-w-3xl mx-auto rounded-xl border border-white/10 bg-black/60 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
              <span className="ml-3 text-xs font-mono text-white/40">
                rebalance.action.ts
              </span>
            </div>
            <pre className="text-xs md:text-sm leading-relaxed font-mono p-5 md:p-7 text-white/85 overflow-x-auto">
              <code>{codeSample}</code>
            </pre>
          </div>
        </Container>
      </section>

      {/* WHY TEE */}
      <section className="border-b border-white/5">
        <Container size="lg" className="!py-28">
          <div className="max-w-3xl">
            <MonoBadge>Why TEE, not consensus</MonoBadge>
            <h2 className="mt-6 !text-4xl md:!text-6xl font-medium leading-tight">
              Not a decentralized network. A{' '}
              <span className="text-mint-500">chain-secured enclave</span>.
            </h2>
            <p className="mt-8 text-white/70 text-lg leading-relaxed">
              Most cross-chain infra forces a tradeoff: trust a multisig, or
              wait for slow consensus on every read. Lit takes a different path.
              Code runs inside a TEE — an enclave the hardware itself
              cryptographically attests to. Keys never leave. Logs can&apos;t be
              rewritten.
            </p>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">
              The TEE&apos;s identity, its allowed code, and its signing
              authority are all governed by a chain. You get the speed and
              expressiveness of a single trusted runtime, with the auditability
              and ungovernability of a smart contract.
            </p>
          </div>
        </Container>
      </section>

      {/* STATS */}
      <section className="border-b border-white/5">
        <Container size="lg" className="!py-24">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <MonoBadge>The properties</MonoBadge>
              <h2 className="mt-5 !text-4xl md:!text-5xl font-medium leading-tight">
                Decentralized where it matters. <br />
                <span className="text-mint-500">Fast where it has to be.</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Stat k="Latency" v="Sub-second signing" />
              <Stat k="Auditability" v="Code hash on-chain" />
              <Stat k="Key custody" v="No one holds them" />
              <Stat k="Surface" v="Any HTTP, any chain" />
            </div>
          </div>
        </Container>
      </section>

      {/* PATTERNS */}
      <section className="border-b border-white/5">
        <Container size="lg" className="!py-28">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <MonoBadge>Patterns shipping today</MonoBadge>
            <h2 className="mt-5 !text-4xl md:!text-5xl font-medium">
              Things people are building right now.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {[
              {
                k: 'Custom price oracle',
                v: 'Aggregate any combination of CEX + DEX feeds, sign once, deliver to multiple chains.',
              },
              {
                k: 'Cross-chain agent',
                v: 'Read positions on Arbitrum, decide on Base, settle on Solana — one signed action.',
              },
              {
                k: 'Off-chain → on-chain bridge',
                v: 'Webhook from Stripe or Plaid triggers an attested on-chain mint or transfer.',
              },
              {
                k: 'On-chain → API bridge',
                v: 'Smart contract event triggers a verified call to Twilio, OpenAI, or your own API.',
              },
            ].map((p) => (
              <div
                key={p.k}
                className="rounded-xl border border-white/10 p-6 flex items-start gap-4 hover:border-mint-500/40 transition bg-white/[0.02]"
              >
                <div className="font-mono text-mint-500 text-sm mt-1">→</div>
                <div>
                  <div className="font-medium text-lg">{p.k}</div>
                  <div className="text-white/60 text-sm mt-1">{p.v}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container size="md" className="!py-28 text-center">
          <h2 className="!text-4xl md:!text-6xl font-medium leading-tight">
            Read. Compute. Write. <br />
            <span className="text-mint-500">Anywhere.</span>
          </h2>
          <p className="mt-6 text-white/60 max-w-xl !mx-auto">
            One programmable runtime for everything that has to happen between
            an event and a signed action.
          </p>
          <div className="mt-10 flex gap-3 justify-center">
            <Button
              href={DOCS}
              target="_blank"
              rightIcon={<IconArrowNarrowRight stroke={2} />}
            >
              Read the docs
            </Button>
            <Button variant="outline" href={CONTACT_FORM} target="_blank">
              Get in touch
            </Button>
          </div>
        </Container>
      </section>

      <PrototypeSwitcher current={1} />
    </div>
  );
}

function Pillar({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="border border-white/10 rounded-xl p-5 bg-white/[0.02] text-left">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
        {label}
      </div>
      <div className="mt-3 text-sm text-white/70">{sub}</div>
    </div>
  );
}

function PillarCenter() {
  return (
    <div className="border-2 border-mint-500 rounded-xl p-5 bg-mint-500/10 text-center relative">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-mint-500">
        COMPUTE
      </div>
      <div className="mt-3 text-sm text-white">In the Lit TEE</div>
      <div className="mt-2 text-[10px] font-mono text-white/40">
        chain-secured
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border border-white/10 rounded-lg p-4 bg-white/[0.02]">
      <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        {k}
      </div>
      <div className="mt-2 text-sm">{v}</div>
    </div>
  );
}
