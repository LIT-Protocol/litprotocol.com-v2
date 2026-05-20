'use client';

import { Container } from '@mantine/core';
import { Button } from '../ui/Button';
import { IconArrowNarrowRight, IconCheck, IconX } from '@tabler/icons-react';
import { MonoBadge, PrototypeSwitcher } from './Shared';
import { CONTACT_FORM } from '@/utils/constants';

const DOCS = 'https://developer.litprotocol.com/';

export default function Prototype2() {
  return (
    <div className="bg-coal-950 text-off-white min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-blue-950 to-coal-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_var(--color-blue-950)_0%,_transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,_oklch(43.99%_0.16_32.25/0.25)_0%,_transparent_50%)] pointer-events-none" />
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
          <MonoBadge>The chain-secured oracle</MonoBadge>
          <h1 className="mt-8 !text-[2.5rem] md:!text-[6rem]/[1] font-medium tracking-tight max-w-5xl mx-auto">
            The programmable oracle for{' '}
            <span className="text-lit-orange">everything off-chain</span>.
          </h1>
          <p className="mt-8 max-w-2xl mx-auto text-white/70 text-lg">
            Lit is a TEE-secured runtime governed by a blockchain. It reads
            real-world data, runs your logic, and signs on any chain or API —
            with cryptographic attestation, no custodian, and no human
            in&nbsp;the&nbsp;loop.
          </p>
          <div className="mt-10 flex gap-3 justify-center flex-wrap">
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

          {/* ATTESTATION VISUAL */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <Pillar label="OFF-CHAIN" sub="APIs · oracles · databases" />
              <PillarCenter />
              <Pillar label="ON-CHAIN" sub="EVM · SVM · BTC · Cosmos" />
            </div>
          </div>
        </Container>
      </section>

      {/* WHAT IS IT */}
      <section className="border-b border-white/5 bg-gradient-to-b from-blue-950/30 to-transparent">
        <Container size="lg" className="!py-28">
          <div className="max-w-3xl">
            <MonoBadge>What it is</MonoBadge>
            <h2 className="mt-6 !text-4xl md:!text-6xl font-medium leading-tight">
              A smart contract that can{' '}
              <span className="text-lit-orange">call the internet</span>.
            </h2>
            <p className="mt-8 text-white/70 text-lg leading-relaxed">
              Imagine a Solidity function that could `fetch()` an HTTPS endpoint,
              hold a private key, and sign messages for any chain — without
              trusting a relayer, an indexer, or a multisig. That&apos;s a Lit
              Action.
            </p>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">
              The code runs inside a hardware-attested TEE. The TEE&apos;s
              identity, allowed code, and signing authority are governed by a
              chain. You get the expressiveness of an off-chain backend with the
              immutability of a smart contract.
            </p>
          </div>
        </Container>
      </section>

      {/* COMPARISON */}
      <section className="border-b border-white/5">
        <Container size="lg" className="!py-24">
          <div className="text-center mb-14">
            <MonoBadge>Versus what you&apos;ve tried</MonoBadge>
            <h2 className="mt-5 !text-4xl md:!text-5xl font-medium">
              Where existing infra falls short.
            </h2>
          </div>

          <div className="grid md:grid-cols-4 border border-white/10 rounded-xl overflow-hidden">
            <ComparisonRow header label="" cells={['Traditional oracles', 'Bridge multisigs', 'Custom backend', 'Lit']} />
            <ComparisonRow
              label="Reads arbitrary HTTPS"
              cells={['—', '—', 'yes', 'yes']}
              ticks={[false, false, true, true]}
            />
            <ComparisonRow
              label="Runs custom logic"
              cells={['limited', '—', 'yes', 'yes']}
              ticks={[false, false, true, true]}
            />
            <ComparisonRow
              label="Signs across chains"
              cells={['—', 'yes', '—', 'yes']}
              ticks={[false, true, false, true]}
            />
            <ComparisonRow
              label="No human custodian"
              cells={['yes', '—', '—', 'yes']}
              ticks={[true, false, false, true]}
            />
            <ComparisonRow
              label="Sub-second latency"
              cells={['—', '—', 'yes', 'yes']}
              ticks={[false, false, true, true]}
            />
            <ComparisonRow
              label="Cryptographic attestation"
              cells={['—', '—', '—', 'yes']}
              ticks={[false, false, false, true]}
              last
            />
          </div>
        </Container>
      </section>

      {/* TRUST MODEL */}
      <section className="border-b border-white/5">
        <Container size="lg" className="!py-28">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <MonoBadge>Trust model</MonoBadge>
              <h2 className="mt-5 !text-4xl md:!text-5xl font-medium leading-tight">
                Decentralized where it matters. <br />
                <span className="text-lit-orange">Fast where it has to be.</span>
              </h2>
              <p className="mt-6 text-white/70 leading-relaxed">
                Lit isn&apos;t trying to be a generic L1. The actual computation
                happens inside a TEE — a single hardware-secured environment.
                What&apos;s decentralized is the part that needs to be: the
                governance of which code is allowed to run, and the keys it
                holds.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  k: 'Hardware attestation',
                  v: 'Every node proves its TEE is genuine and untampered before joining.',
                },
                {
                  k: 'On-chain governance',
                  v: 'Allowed code hashes, signing rules, and node membership all live in smart contracts.',
                },
                {
                  k: 'Threshold cryptography',
                  v: 'No single node ever holds a complete key. Signing requires consensus across attested nodes.',
                },
                {
                  k: 'Verifiable logs',
                  v: 'Every action emits an attestation you can verify on-chain or in your own backend.',
                },
              ].map((it) => (
                <div
                  key={it.k}
                  className="border border-white/10 rounded-xl p-5 hover:border-lit-orange/40 transition"
                >
                  <div className="font-medium text-lg">{it.k}</div>
                  <div className="text-white/60 text-sm mt-1">{it.v}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container size="md" className="!py-28 text-center">
          <h2 className="!text-4xl md:!text-6xl font-medium leading-tight">
            One runtime between <br />
            <span className="text-lit-orange">your code and the world</span>.
          </h2>
          <p className="mt-6 text-white/60 max-w-xl mx-auto">
            If your product needs to react to off-chain data with on-chain
            certainty — or vice versa — this is the layer you&apos;ve been
            stitching together yourself.
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
              Talk to us
            </Button>
          </div>
        </Container>
      </section>

      <PrototypeSwitcher current={2} />
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
    <div className="border-2 border-lit-orange rounded-xl p-5 bg-lit-orange/10 text-center relative">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-lit-orange">
        LIT TEE
      </div>
      <div className="mt-3 text-sm text-white">
        Read → Compute → Sign
      </div>
      <div className="mt-2 text-[10px] font-mono text-white/40">
        chain-secured
      </div>
    </div>
  );
}

function ComparisonRow({
  label,
  cells,
  ticks,
  header,
  last,
}: {
  label: string;
  cells: string[];
  ticks?: boolean[];
  header?: boolean;
  last?: boolean;
}) {
  return (
    <>
      <div
        className={`p-4 text-sm ${
          header
            ? 'bg-white/[0.04] font-mono text-xs uppercase tracking-widest text-white/50'
            : 'text-white/70 border-t border-white/5'
        } ${last ? '' : ''}`}
      >
        {label}
      </div>
      {cells.map((c, i) => (
        <div
          key={i}
          className={`p-4 text-sm text-center ${
            header
              ? 'bg-white/[0.04] font-mono text-xs uppercase tracking-widest text-white/50'
              : 'border-t border-white/5'
          } ${i === cells.length - 1 ? 'bg-lit-orange/[0.06]' : ''}`}
        >
          {header ? (
            c
          ) : ticks ? (
            ticks[i] ? (
              <IconCheck
                className={`inline ${
                  i === cells.length - 1 ? 'text-lit-orange' : 'text-mint-500'
                }`}
                size={18}
              />
            ) : (
              <IconX className="inline text-white/20" size={18} />
            )
          ) : (
            c
          )}
        </div>
      ))}
    </>
  );
}
