'use client';

import { Container, Text } from '@mantine/core';
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-blue-950)_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute -left-[12rem] -top-[4rem] z-0 hidden md:block pointer-events-none w-[35rem] opacity-70">
          <img src="/textures/hero-left.png" alt="" className="w-full h-auto" />
        </div>
        <div className="absolute -right-[10rem] md:-right-[16rem] -top-[8rem] -rotate-40 md:rotate-0 md:-top-[2rem] z-0 pointer-events-none w-[30rem] md:w-[40rem] opacity-60">
          <img
            src="/textures/hero-right.png"
            alt=""
            className="w-full h-auto"
          />
        </div>
        <Container size="lg" className="relative z-10 !pt-24 !pb-28">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <MonoBadge>Lit Protocol · TEE-secured compute</MonoBadge>
              <h1 className="mt-6 text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight">
                Read anywhere.
                <br />
                <span className="text-mint-500">Compute</span> in a TEE.
                <br />
                Write to any chain or API.
              </h1>
              <p className="mt-6 max-w-xl text-white/70 text-lg">
                Lit is one programmable runtime that pulls data from any source,
                runs your logic inside a chain-secured trusted execution
                environment, and signs transactions or API calls on the other
                side — atomically, verifiably, and without a backend you have
                to trust.
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
                  Talk to an engineer
                </Button>
              </div>
              <div className="mt-10 flex gap-6 text-xs font-mono text-white/40 uppercase tracking-widest">
                <span>EVM</span>
                <span>Solana</span>
                <span>Bitcoin</span>
                <span>Cosmos</span>
                <span>HTTPS</span>
                <span>Webhooks</span>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-xl border border-white/10 bg-black/60 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/[0.02]">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  <span className="ml-3 text-xs font-mono text-white/40">
                    rebalance.action.ts
                  </span>
                </div>
                <pre className="text-xs leading-relaxed font-mono p-5 text-white/85 overflow-x-auto">
                  <code>{codeSample}</code>
                </pre>
              </div>
              <p className="mt-3 text-xs font-mono text-white/40">
                ↳ Deployed once. Runs across the network. Signs from a key no
                one holds.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* PRIMITIVE STRIP */}
      <section className="border-b border-white/5">
        <Container size="lg" className="!py-20">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: 'READ',
                title: 'Any source, attested',
                body: 'HTTPS APIs, RPC endpoints, oracle feeds, off-chain databases. The TEE attests to exactly what was fetched.',
              },
              {
                step: 'COMPUTE',
                title: 'Your logic, your rules',
                body: 'Arbitrary JavaScript runs inside the enclave. No external calls can tamper with the result before it signs.',
              },
              {
                step: 'WRITE',
                title: 'Any chain or API',
                body: 'Threshold ECDSA, Ed25519, Schnorr. The same action signs an Ethereum tx and a Stripe call in one shot.',
              },
            ].map((b, i) => (
              <div
                key={b.step}
                className="rounded-xl border border-white/10 p-6 bg-white/[0.02] hover:bg-white/[0.04] transition"
              >
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-mono text-xs text-mint-500 tracking-[0.2em]">
                    {b.step}
                  </span>
                  <span className="font-mono text-xs text-white/30">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-medium mb-2">{b.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WHY TEE */}
      <section className="border-b border-white/5">
        <Container size="lg" className="!py-24">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <MonoBadge>Why TEE, not consensus</MonoBadge>
              <h2 className="mt-5 text-4xl md:text-5xl font-medium leading-tight">
                Not a decentralized network. <br />
                A <span className="text-mint-500">chain-secured enclave</span>.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6 text-white/70">
              <p>
                Most cross-chain infra forces a tradeoff: trust a multisig, or
                wait for slow consensus on every read. Lit takes a different
                path. Code runs inside a TEE — an enclave the hardware itself
                cryptographically attests to. Keys never leave. Logs can't be
                rewritten.
              </p>
              <p>
                The TEE&apos;s identity, its allowed code, and its signing
                authority are all governed on-chain. You get the speed and
                expressiveness of a single trusted runtime, with the auditability
                and ungovernability of a smart contract.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="border-l-2 border-mint-500 pl-4">
                  <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">
                    Latency
                  </div>
                  <div className="text-lg">Sub-second signing</div>
                </div>
                <div className="border-l-2 border-mint-500 pl-4">
                  <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">
                    Auditability
                  </div>
                  <div className="text-lg">Code hash on-chain</div>
                </div>
                <div className="border-l-2 border-mint-500 pl-4">
                  <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">
                    Key custody
                  </div>
                  <div className="text-lg">No one holds them</div>
                </div>
                <div className="border-l-2 border-mint-500 pl-4">
                  <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">
                    Surface
                  </div>
                  <div className="text-lg">Any HTTP, any chain</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PATTERNS */}
      <section className="border-b border-white/5">
        <Container size="lg" className="!py-24">
          <div className="text-center mb-14">
            <MonoBadge>Patterns shipping today</MonoBadge>
            <h2 className="mt-5 text-4xl md:text-5xl font-medium">
              Things people are building right now.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
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
                className="rounded-xl border border-white/10 p-6 flex items-start gap-4 hover:border-mint-500/40 transition"
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
        <Container size="md" className="!py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-medium mb-4">
            Read. Compute. Write. <span className="text-mint-500">Anywhere.</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-8">
            One programmable runtime for everything that has to happen between
            an event and a signed action.
          </p>
          <div className="flex gap-3 justify-center">
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
