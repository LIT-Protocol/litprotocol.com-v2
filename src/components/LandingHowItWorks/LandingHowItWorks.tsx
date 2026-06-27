'use client';

import { Container } from '@mantine/core';
import { Button } from '../ui/Button';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { CONTACT_FORM, QUICKSTART_LINK } from '@/utils/constants';

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-xs uppercase tracking-[0.22em] text-gold-500">
    {children}
  </span>
);

const Stat = ({ k, v, href }: { k: string; v: string; href?: string }) => {
  const body = (
    <>
      <div className="font-mono text-[11px] uppercase tracking-widest text-white/55">
        {k}
      </div>
      <div className="mt-2 text-sm">{v}</div>
    </>
  );
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-white/10 rounded-lg p-4 bg-white/[0.02] block no-underline text-inherit hover:border-lit-orange/40 transition"
    >
      {body}
    </a>
  ) : (
    <div className="border border-white/10 rounded-lg p-4 bg-white/[0.02]">
      {body}
    </div>
  );
};

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

const PRICING_DOCS = 'https://developer.litprotocol.com/management/pricing';

const LandingHowItWorks = () => {
  return (
    <div className="bg-coal-950 text-off-white">
      {/* WHAT IT LOOKS LIKE */}
      <section className="border-b border-white/5 bg-gradient-to-b from-blue-950/30 to-transparent">
        <Container size="lg" className="!py-28">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge>What it looks like</Badge>
            <h2 className="mt-6 text-3xl md:text-[2.6rem] font-medium leading-tight text-balance">
              One file. Reads, computes, signs across chains.
            </h2>
            <p className="mt-6 text-white/70 text-lg">
              A Lit Action is JavaScript that runs inside the network’s
              TEE. Deploy it once. Sign with a wallet bound to the action code
              itself, or with one you control through your own on-chain
              governance.
            </p>
          </div>

          <div className="max-w-3xl mx-auto rounded-xl border border-white/10 bg-black/60 overflow-hidden shadow-2xl">
            <div className="flex items-center px-4 py-2 border-b border-white/10 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/55">
                rebalance.action.ts
              </span>
            </div>
            <pre className="text-xs md:text-sm leading-relaxed font-mono p-5 md:p-7 text-white/85 overflow-x-auto">
              <code>{codeSample}</code>
            </pre>
          </div>
        </Container>
      </section>

      {/* WHY A TEE + PROPERTIES (combined) */}
      <section className="border-b border-white/5">
        <Container size="lg" className="!py-28">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <Badge>Encrypted hardware, governed on-chain</Badge>
              <h2 className="mt-6 text-3xl md:text-[2.6rem] font-medium leading-tight text-balance">
                Speed of a backend, trust of a{' '}
                <span className="text-lit-orange">contract</span>.
              </h2>
              <p className="mt-6 text-white/70 text-lg leading-relaxed">
                Your code runs in hardware, so it moves at backend speed. Its
                authority lives on-chain: smart contracts on Base decide which
                keys it can use and which code is allowed to run, with every
                change auditable on Basescan and impossible for any one party to
                push alone.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Stat k="Latency" v="Sub-second signing" />
              <Stat k="Auditability" v="Code hash on-chain" />
              <Stat k="Pricing" v="$0.01/sec, less on annual plans" href={PRICING_DOCS} />
              <Stat k="Surface" v="Any HTTP, any chain" />
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container size="md" className="!py-28 text-center">
          <h2 className="text-3xl md:text-[2.6rem] font-medium leading-tight">
            Read. Compute. Write. <br />
            <span className="text-lit-orange">Anywhere.</span>
          </h2>
          <p className="mt-6 text-white/60 max-w-xl mx-auto text-pretty">
            One programmable runtime for everything that has to happen between
            an event and a signed action.
          </p>
          <div className="mt-10 flex gap-3 justify-center">
            <Button
              href={QUICKSTART_LINK}
              target="_blank"
              rel="noopener noreferrer"
              rightIcon={<IconArrowNarrowRight stroke={2} />}
            >
              Start building
            </Button>
            <Button
              variant="outline"
              href={CONTACT_FORM}
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk to an engineer
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LandingHowItWorks;
