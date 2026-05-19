'use client';

import { Container } from '@mantine/core';
import { Button } from '../ui/Button';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { CONTACT_FORM, DOCS_LINK } from '@/utils/constants';

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white/60 border border-white/15 rounded-full px-3 py-1">
    <span className="w-1.5 h-1.5 rounded-full bg-mint-500" />
    {children}
  </span>
);

const Stat = ({ k, v }: { k: string; v: string }) => (
  <div className="border border-white/10 rounded-lg p-4 bg-white/[0.02]">
    <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
      {k}
    </div>
    <div className="mt-2 text-sm">{v}</div>
  </div>
);

const codeSample = `// Inside a Lit Action — runs in a chain-secured TEE

// Read off-chain
const price = await fetch(
  "https://api.coinbase.com/v2/prices/ETH-USD/spot"
).then(r => r.json());

// Read on-chain (Base)
const base = new ethers.providers.JsonRpcProvider(BASE_RPC);
const vault = new ethers.Contract(vaultAddress, vaultAbi, base);
const ratio = await vault.currentRatio();

// Decide, then sign + broadcast on Arbitrum
if (Number(price.data.amount) * Number(ratio) < threshold) {
  const pk = await Lit.Actions.getLitActionPrivateKey();
  const arb = new ethers.providers.JsonRpcProvider(ARB_RPC);
  const wallet = new ethers.Wallet(pk, arb);
  const hook = new ethers.Contract(hookAddress, hookAbi, wallet);
  const tx = await hook.rebalance();
  Lit.Actions.setResponse({ response: tx.hash });
}`;

const patterns = [
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
];

const LandingHowItWorks = () => {
  return (
    <div className="bg-coal-950 text-off-white">
      {/* WHAT IT LOOKS LIKE */}
      <section className="border-b border-white/5 bg-gradient-to-b from-blue-950/30 to-transparent">
        <Container size="lg" className="!py-28">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge>What it looks like</Badge>
            <h2 className="mt-6 text-4xl md:text-6xl font-medium leading-tight">
              One file. Reads, computes, signs across chains.
            </h2>
            <p className="mt-6 text-white/70 text-lg">
              A Lit Action is JavaScript that runs inside the network&apos;s
              TEE. Deploy it once. The keys it signs with don&apos;t belong to
              anyone — they&apos;re governed on-chain.
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
            <Badge>Why TEE, not consensus</Badge>
            <h2 className="mt-6 text-4xl md:text-6xl font-medium leading-tight">
              Speed of a backend, trust of a contract. A{' '}
              <span className="text-mint-500">chain-secured enclave</span>.
            </h2>
            <p className="mt-8 text-white/70 text-lg leading-relaxed">
              Most cross-chain infra forces a tradeoff: trust a multisig, or
              wait for slow consensus on every read. Lit takes a different
              path. Code runs inside a TEE — an enclave the hardware itself
              cryptographically attests to. Keys never leave. Logs can&apos;t
              be rewritten.
            </p>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">
              The TEE&apos;s identity, its allowed code, and its signing
              authority are all governed on-chain. You get the speed and
              expressiveness of a single trusted runtime, with the
              auditability and on-chain governability of a smart contract.
            </p>
          </div>
        </Container>
      </section>

      {/* PROPERTIES */}
      <section className="border-b border-white/5">
        <Container size="lg" className="!py-24">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <Badge>The properties</Badge>
              <h2 className="mt-5 text-4xl md:text-5xl font-medium leading-tight">
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
            <Badge>Patterns shipping today</Badge>
            <h2 className="mt-5 text-4xl md:text-5xl font-medium">
              Things people are building right now.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {patterns.map((p) => (
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
          <h2 className="text-4xl md:text-6xl font-medium leading-tight">
            Read. Compute. Write. <br />
            <span className="text-mint-500">Anywhere.</span>
          </h2>
          <p className="mt-6 text-white/60 max-w-xl mx-auto">
            One programmable runtime for everything that has to happen between
            an event and a signed action.
          </p>
          <div className="mt-10 flex gap-3 justify-center">
            <Button
              href={DOCS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              rightIcon={<IconArrowNarrowRight stroke={2} />}
            >
              Read the docs
            </Button>
            <Button
              variant="outline"
              href={CONTACT_FORM}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get in touch
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LandingHowItWorks;
