'use client';

import { Container } from '@mantine/core';
import { Button } from '../ui/Button';
import { IconArrowNarrowRight, IconArrowRight } from '@tabler/icons-react';
import { MonoBadge, PrototypeSwitcher } from './Shared';
import { CONTACT_FORM } from '@/utils/constants';
import { useState } from 'react';

const DOCS = 'https://developer.litprotocol.com/';

type Flow = {
  id: string;
  title: string;
  blurb: string;
  read: string;
  compute: string;
  write: string;
};

const flows: Flow[] = [
  {
    id: 'rebalance',
    title: 'Cross-chain rebalancer',
    blurb:
      'A vault on Base needs to keep parity with prices that move on Solana and Arbitrum.',
    read: 'Pyth feed + DEX state on 3 chains',
    compute: 'Compute target ratio; check drift > 0.5%',
    write: 'Sign `rebalance()` on Base from a key no one holds',
  },
  {
    id: 'agent',
    title: 'Autonomous trading agent',
    blurb:
      'An agent runs strategies the user approved — but the user is asleep.',
    read: 'Account positions + market data + user policy',
    compute: 'Evaluate strategy + user-signed permission grant',
    write: 'Submit signed order on Hyperliquid or Aerodrome',
  },
  {
    id: 'oracle',
    title: 'Custom oracle for any feed',
    blurb:
      'You need a price feed for an asset Chainlink doesn&apos;t cover, on a chain Pyth doesn&apos;t cover.',
    read: 'Aggregate 5+ CEX and DEX sources',
    compute: 'Median, outlier rejection, TWAP',
    write: 'Sign + push to your contract every N blocks',
  },
  {
    id: 'bridge',
    title: 'Off-chain event → on-chain action',
    blurb:
      'A Stripe webhook, a Plaid balance change, or a Shopify order should trigger an attested on-chain mint.',
    read: 'Verified webhook from any HTTPS source',
    compute: 'Validate signature + business rules',
    write: 'Mint NFT or transfer tokens, signed in the TEE',
  },
  {
    id: 'reverse',
    title: 'On-chain event → API action',
    blurb:
      'A user pays in your contract. You need to call OpenAI, Twilio, or your own backend in response.',
    read: 'Contract event on any chain',
    compute: 'Authorize and shape the API request',
    write: 'Verified HTTPS call to any service',
  },
  {
    id: 'compliance',
    title: 'Permissioned access to user data',
    blurb:
      'Decrypt user-owned data only when conditions are met — KYC, payment, on-chain proof.',
    read: 'On-chain or off-chain attestation',
    compute: 'Evaluate decryption policy',
    write: 'Release decryption share — only to the right caller',
  },
];

export default function Prototype3() {
  const [active, setActive] = useState<string>(flows[0].id);
  const current = flows.find((f) => f.id === active)!;

  return (
    <div className="bg-coal-950 text-off-white min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 to-coal-950">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-blue-950)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -left-[12rem] -top-[4rem] z-0 hidden md:block pointer-events-none w-[35rem] opacity-60">
          <img src="/textures/hero-left.png" alt="" className="w-full h-auto" />
        </div>
        <div className="absolute -right-[12rem] -top-[6rem] z-0 hidden md:block pointer-events-none w-[38rem] opacity-50">
          <img
            src="/textures/hero-right.png"
            alt=""
            className="w-full h-auto"
          />
        </div>
        <Container size="lg" className="relative z-10 !pt-24 !pb-20">
          <MonoBadge>Cross-chain · Cross-API · TEE-secured</MonoBadge>
          <h1 className="mt-6 text-5xl md:text-7xl font-medium leading-[1.05] max-w-4xl">
            Connect <span className="text-mint-500">any chain</span> to{' '}
            <span className="text-lit-orange">any API</span> — with one
            programmable runtime.
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 text-lg">
            Lit is the layer where off-chain meets on-chain. Read from anywhere,
            run your logic inside a chain-secured TEE, and sign on any
            blockchain or call any API on the other side. No backend to trust,
            no multisig to babysit.
          </p>
          <div className="mt-8 flex gap-3 flex-wrap">
            <Button
              href={DOCS}
              target="_blank"
              rightIcon={<IconArrowNarrowRight stroke={2} />}
            >
              Start building
            </Button>
            <Button variant="outline" href={CONTACT_FORM} target="_blank">
              Talk to us
            </Button>
          </div>
        </Container>
      </section>

      {/* INTERACTIVE USE CASES */}
      <section className="border-t border-white/5 bg-gradient-to-b from-blue-950/20 to-transparent">
        <Container size="lg" className="!py-20">
          <div className="text-center mb-10">
            <MonoBadge>What people are shipping</MonoBadge>
            <h2 className="mt-5 text-3xl md:text-5xl font-medium">
              Pick a flow. See exactly how it runs.
            </h2>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            {/* USE CASE LIST */}
            <div className="md:col-span-5 space-y-2">
              {flows.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActive(f.id)}
                  className={`w-full text-left p-4 rounded-lg border transition ${
                    active === f.id
                      ? 'border-mint-500/60 bg-mint-500/[0.04]'
                      : 'border-white/10 hover:border-white/30 bg-white/[0.02]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{f.title}</span>
                    <IconArrowRight
                      size={16}
                      className={
                        active === f.id ? 'text-mint-500' : 'text-white/30'
                      }
                    />
                  </div>
                  <div className="text-xs text-white/50 mt-1">{f.blurb}</div>
                </button>
              ))}
            </div>

            {/* FLOW VIEWER */}
            <div className="md:col-span-7">
              <div className="sticky top-6 rounded-xl border border-white/10 bg-black/40 overflow-hidden">
                <div className="px-5 py-3 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
                  <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                    Flow · {current.id}
                  </span>
                  <span className="font-mono text-xs text-mint-500">
                    runs in TEE
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <FlowStep
                    label="READ"
                    color="text-mint-500"
                    body={current.read}
                  />
                  <Connector />
                  <FlowStep
                    label="COMPUTE"
                    color="text-lit-orange"
                    body={current.compute}
                    highlight
                  />
                  <Connector />
                  <FlowStep
                    label="WRITE"
                    color="text-electric-blue-500"
                    body={current.write}
                  />
                </div>
                <div className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-xs text-white/40 font-mono">
                  ↳ One signed action. No backend. No relayer. No human in the
                  loop.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* HOW */}
      <section className="border-t border-white/5">
        <Container size="lg" className="!py-24">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <MonoBadge>How it works</MonoBadge>
              <h2 className="mt-5 text-4xl md:text-5xl font-medium leading-tight">
                A smart contract that <br />
                <span className="text-mint-500">can call the internet</span>.
              </h2>
              <p className="mt-6 text-white/70 leading-relaxed">
                Your code runs inside a hardware-attested TEE. The keys it signs
                with don&apos;t belong to any person or server — they&apos;re
                governed on-chain. So you get a single, fast, programmable layer
                between any data source and any chain or API.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Stat k="Chains supported" v="EVM · SVM · BTC · Cosmos" />
              <Stat k="Data sources" v="Any HTTPS endpoint" />
              <Stat k="Custody" v="No one holds the keys" />
              <Stat k="Attestation" v="Verifiable on-chain" />
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5">
        <Container size="md" className="!py-24 text-center">
          <h2 className="text-4xl md:text-6xl font-medium leading-tight">
            Stop stitching backends. <br />
            <span className="text-mint-500">Start signing</span>{' '}
            <span className="text-lit-orange">anywhere</span>.
          </h2>
          <p className="mt-6 text-white/60 max-w-xl mx-auto">
            See the docs for end-to-end examples, or talk to us about your flow
            and we&apos;ll point you at the closest reference.
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

      <PrototypeSwitcher current={3} />
    </div>
  );
}

function FlowStep({
  label,
  color,
  body,
  highlight,
}: {
  label: string;
  color: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-4 rounded-lg border ${
        highlight
          ? 'border-white/20 bg-white/[0.04]'
          : 'border-white/10 bg-white/[0.02]'
      }`}
    >
      <div className={`font-mono text-xs tracking-[0.2em] ${color}`}>
        {label}
      </div>
      <div className="mt-1 text-white/85">{body}</div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center">
      <div className="w-px h-4 bg-white/20" />
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border border-white/10 rounded-lg p-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        {k}
      </div>
      <div className="mt-2 text-sm">{v}</div>
    </div>
  );
}
