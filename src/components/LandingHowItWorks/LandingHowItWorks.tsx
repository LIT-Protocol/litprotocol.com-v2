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

const codeSample = `// Inside a Lit Action — policy enforcement in a chain-secured TEE

// Verify off-chain risk and compliance signals
const sanctions = await fetch(SANCTIONS_API + "/" + recipient).then(r => r.json());
const risk = await fetch(RISK_API + "/" + recipient).then(r => r.json());

// Verify on-chain state
const provider = new ethers.providers.JsonRpcProvider(BASE_RPC);
const vault = new ethers.Contract(vaultAddress, vaultAbi, provider);
const role = await vault.roles(sender);
const dailySpent = await vault.dailySpent(sender);

// Decide, then sign only if policy passes
if (!sanctions.blocked && risk.score < threshold && role.canTransfer) {
  if (dailySpent.add(amount).gt(role.dailyLimit)) throw new Error("over limit");

  const pk = await Lit.Actions.getLitActionPrivateKey();
  const wallet = new ethers.Wallet(pk, provider);
  const tx = await vault.connect(wallet).transfer(recipient, amount);
  Lit.Actions.setResponse({ response: tx.hash });
} else {
  Lit.Actions.setResponse({ response: "policy_denied" });
}`;

const EXAMPLES_BASE =
  'https://github.com/LIT-Protocol/chipotle/tree/main/examples';

const patterns = [
  {
    k: 'Solver vaults',
    v: 'Keep inventory behind a policy-gated signer so bots can fill orders, but compromised boxes cannot drain funds.',
    href: `${EXAMPLES_BASE}/lit-solver-vault`,
  },
  {
    k: 'Policy-gated bridging',
    v: 'Verify source-chain events, limits, and risk signals before signing destination-chain mints or releases.',
    href: `${EXAMPLES_BASE}/cross-chain-token`,
  },
  {
    k: 'Tamper-resistant oracle policies',
    v: 'Aggregate external and on-chain data inside a TEE, then sign only when freshness, quorum, and deviation rules pass.',
    href: `${EXAMPLES_BASE}/multi-source-price-oracle`,
  },
  {
    k: 'Verifiable AI decisioning',
    v: 'Run model or resolver logic in a TEE, attest the code path, and sign outcomes according to transparent rules.',
    href: `${EXAMPLES_BASE}/prediction-market-oracle`,
  },
  {
    k: 'Compliance-gated transfers',
    v: 'Screen wallets, enforce jurisdictional or protocol policies, and deny signatures for blocked recipients before assets move.',
    href: `${EXAMPLES_BASE}/compliance-transfer-gate`,
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
              One policy file. Checks, decides, signs.
            </h2>
            <p className="mt-6 text-white/70 text-lg">
              A Lit Action is JavaScript that runs inside the network&apos;s
              TEE. Use it to verify conditions, enforce policy, and produce
              signatures only when your rules pass. Deploy once, bind signing
              authority to code, and govern upgrades on-chain.
            </p>
          </div>

          <div className="max-w-3xl mx-auto rounded-xl border border-white/10 bg-black/60 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
              <span className="ml-3 text-xs font-mono text-white/40">
                policy-gated-transfer.action.ts
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
              Backend speed. Verifiable controls.
              <br />
              <span className="text-mint-500">Enclave-secured execution</span>.
            </h2>
            <p className="mt-8 text-white/70 text-lg leading-relaxed">
              Most automation forces a tradeoff: trust a backend operator,
              rely on a multisig, or wait for slow consensus on every decision.
              Lit takes a different path. Policy code runs inside a TEE — an
              enclave the hardware itself cryptographically attests to. Keys
              never leave. Operators can&apos;t inspect secrets.
            </p>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">
              The TEE&apos;s identity, its allowed code, and its signing
              authority are all governed on-chain. Teams can enforce security,
              compliance, and governance rules at runtime while keeping the
              latency and flexibility of programmable infrastructure.
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
                Policy before every signature. <br />
                <span className="text-mint-500">Fast enough for production.</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Stat k="Policy" v="Custom checks before signing" />
              <Stat k="Attestation" v="TEE identity and code hash verifiable" />
              <Stat k="Key safety" v="Keys never leave the network" />
              <Stat k="Surface" v="Any HTTP, any chain, any API" />
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
              Security and policy patterns shipping today.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {patterns.map((p) => (
              <a
                key={p.k}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/10 p-6 flex items-start gap-4 hover:border-mint-500/40 transition bg-white/[0.02] no-underline text-inherit"
              >
                <div className="font-mono text-mint-500 text-sm mt-1">→</div>
                <div>
                  <div className="font-medium text-lg">{p.k}</div>
                  <div className="text-white/60 text-sm mt-1">{p.v}</div>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container size="md" className="!py-28 text-center">
          <h2 className="text-4xl md:text-6xl font-medium leading-tight">
            Check. Enforce. Sign. <br />
            <span className="text-mint-500">Anywhere.</span>
          </h2>
          <p className="mt-6 text-white/60 max-w-xl mx-auto">
            One programmable policy layer for everything that must happen before
            a key signs.
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
