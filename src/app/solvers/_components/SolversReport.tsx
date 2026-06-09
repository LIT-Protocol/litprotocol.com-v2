'use client';

import { Container } from '@mantine/core';
import { IconArrowNarrowRight, IconExternalLink } from '@tabler/icons-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

const SOLVER_VAULT_EXAMPLE =
  'https://github.com/LIT-Protocol/chipotle/tree/main/examples/lit-solver-vault';

const SOLVER_REVIEW_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSeZ16PjwV7YZIvEuTwJ-7ijVb039SsIwVqkJyI2ffPdwkn6DQ/viewform';

const Fn = ({ n }: { n: number }) => (
  <sup className="ml-px">
    <a href={`#ref-${n}`} className="font-mono text-[0.6em] text-lit-orange transition-colors hover:text-gold-500">
      [{n}]
    </a>
  </sup>
);

const SECTIONS = [
  { id: 'forcing-function', n: '1', title: 'The forcing function' },
  { id: 'loss-pattern', n: '2', title: 'The loss pattern' },
  { id: 'fault-lines', n: '3', title: 'Operational fault lines' },
  { id: 'verifiable-control', n: '4', title: 'Verifiable control' },
  { id: 'proof', n: '5', title: 'What a solver can prove' },
  { id: 'solver-role', n: '6', title: 'The solver role' },
  { id: 'execution-models', n: '7', title: 'Execution models' },
  { id: 'ecosystem', n: '8', title: 'The ecosystem' },
  { id: 'open-questions', n: '9', title: 'Questions worth asking' },
  { id: 'references', n: '10', title: 'References' },
];

const REFERENCES: { n: number; text: ReactNode; href: string }[] = [
  { n: 1, text: 'Across docs, “Crosschain Intents” and intent architecture.', href: 'https://docs.across.to/guides/concepts/crosschain-intents' },
  { n: 2, text: 'deBridge DLN documentation, protocol overview and order fulfillment flow.', href: 'https://docs.debridge.com/dln-details/overview/protocol-overview' },
  { n: 3, text: 'Wormhole Settlement overview.', href: 'https://wormhole.com/docs/products/settlement/overview/' },
  { n: 4, text: 'Squid Coral Intent Swaps and solver documentation.', href: 'https://docs.squidrouter.com/api-and-sdk-integration/coral-intent-swaps' },
  { n: 5, text: 'UniswapX developer docs, overview and auction types.', href: 'https://developers.uniswap.org/docs/liquidity/uniswapx/overview' },
  { n: 6, text: 'CoW Protocol docs, solvers and fair combinatorial auction.', href: 'https://docs.cow.fi/cow-protocol/concepts/introduction/solvers' },
  { n: 7, text: 'LI.FI architecture and quote API documentation.', href: 'https://docs.li.fi/introduction/lifi-architecture/system-overview' },
  { n: 8, text: 'Socket architecture and EIP-7683 documentation.', href: 'https://docs.socket.tech/eip7683/' },
  { n: 9, text: 'ERC-7683: Cross Chain Intents standard.', href: 'https://eips.ethereum.org/EIPS/eip-7683' },
  { n: 10, text: 'Chainalysis, “$2.2 Billion Stolen from Crypto Platforms in 2024” — 2024 stolen funds, centralized-service hacks, DMM Bitcoin and WazirX examples, and private-key compromise share.', href: 'https://www.chainalysis.com/blog/crypto-hacking-stolen-funds-2025/' },
  { n: 11, text: 'TRM Labs, “$2.2 billion was stolen in crypto-related hacks in 2024” — threat-vector breakdown and private-key / seed-phrase compromise share.', href: 'https://www.trmlabs.com/resources/blog/category-deep-dive-2-2-billion-was-stolen-in-crypto-related-hacks-in-2024' },
  { n: 12, text: 'TRM Labs, “Bybit Hack Update” — approximately $1.5B stolen and rapid laundering through DeFi and cross-chain services.', href: 'https://www.trmlabs.com/resources/blog/bybit-hack-update-north-korea-moves-to-next-stage-of-laundering' },
  { n: 13, text: 'Lit Protocol v3 (Chipotle): TEE-based execution, on-chain key orchestration, and hardware attestation.', href: 'https://spark.litprotocol.com/introducing-lit-protocol-v3-chipotle/' },
  { n: 14, text: 'Lit solver vault example in the Chipotle repository.', href: SOLVER_VAULT_EXAMPLE },
];

const TAXONOMY = [
  {
    category: 'Fast-fill solver networks',
    examples: 'Across, deBridge DLN, Wormhole Settlement, Squid Coral, Relay.link',
    technique: 'A filler fronts destination-chain value and later claims, unlocks, or settles against source-chain value.',
    question: 'Where is destination inventory held, and which keys can move it before repayment is final?',
  },
  {
    category: 'Dutch-auction resolvers',
    examples: 'UniswapX, 1inch Fusion+',
    technique: 'A signed order decays in price; resolvers choose when to fill and compete on timing, price, and inventory.',
    question: 'Which checks happen before quoting, before filling, and before escrow settlement?',
  },
  {
    category: 'Batch-auction solvers',
    examples: 'CoW Protocol',
    technique: 'Solvers compete to produce the best aggregate settlement for a batch of intents.',
    question: 'Who constructs settlement calldata, who signs it, and how are hooks or external venues constrained?',
  },
  {
    category: 'RFQ market makers',
    examples: 'Hashflow, Bebop, 0x-style professional maker flows',
    technique: 'Professional makers issue firm, short-lived quotes against private inventory.',
    question: 'How are quote-signing keys, inventory thresholds, and stale-price failures controlled?',
  },
  {
    category: 'Aggregators and chain-abstraction routers',
    examples: 'LI.FI, Socket/Bungee, Squid, Enso',
    technique: 'The product selects routes across bridges, DEXs, intent protocols, and executors.',
    question: 'Does the system only return calldata, or does it operate relayers, executors, gas sponsors, or refund paths?',
  },
  {
    category: 'Settlement and messaging rails',
    examples: 'LayerZero, Axelar, Wormhole, Hyperlane, Chainlink CCIP, Circle CCTP, Stargate',
    technique: 'Infrastructure that solvers use for messages, canonical transfers, attestations, and rebalancing.',
    question: 'Which relayers, executors, attestations, or finality assumptions gate downstream solver actions?',
  },
];

const LIFECYCLE = [
  { n: '01', title: 'Order intake', chain: 'Source chain', body: 'User signs an intent, places an RFQ, deposits into escrow, or submits a bridgeable route.', gated: false },
  { n: '02', title: 'Solver selection', chain: 'Off-chain', body: 'A resolver, filler, maker, or route executor wins on price, speed, exclusivity, or auction rules.', gated: false },
  { n: '03', title: 'Destination execution', chain: 'Destination', body: 'The solver fronts funds, swaps, or executes a call — its first inventory-moving signature.', gated: true },
  { n: '04', title: 'Claim & settlement', chain: 'Source chain', body: 'The solver proves the source order and unlocks, claims, or nets repayment.', gated: true },
  { n: '05', title: 'Rebalancing', chain: 'Cross-chain', body: 'Inventory is moved across chains and venues to prepare for the next fill.', gated: true },
];

const LOSS_STATS = [
  {
    value: '$2.2B',
    label: 'stolen in 2024',
    body: 'Chainalysis estimated $2.2B stolen from crypto platforms in 2024 across 303 incidents; TRM’s independent 2024 hack deep dive reports the same headline total.',
    refs: [10, 11],
  },
  {
    value: '44–70%',
    label: 'tied to private keys',
    body: 'Chainalysis attributed 43.8% of stolen 2024 value to private-key compromises; TRM attributed nearly 70% to infrastructure attacks, primarily private-key and seed-phrase compromises.',
    refs: [10, 11],
  },
  {
    value: '~$1.0–1.5B',
    label: '2024 private-key loss range',
    body: 'Applied to the $2.2B 2024 total, those two estimates imply roughly $964M to $1.54B of 2024 losses from private-key / seed-phrase style compromise.',
    refs: [10, 11],
  },
  {
    value: '$1.5B',
    label: 'Bybit 2025 exploit',
    body: 'TRM describes the February 2025 Bybit theft as approximately $1.5B in ETH tokens, with at least $160M moved through illicit channels within 48 hours and over $400M moved by February 26.',
    refs: [12],
  },
];

const CONTROL_SURFACES = [
  ['Inventory custody', 'Funds often sit in EOAs, smart accounts, vault contracts, protocol balances, or venue accounts. The critical question is not only where funds sit, but what runtime conditions are required before they can move.'],
  ['Order reconstruction', 'Before a fill, claim, or rebalance, a solver must reconstruct source-chain events, bridge attestations, quote IDs, deadlines, recipients, token amounts, and replay constraints.'],
  ['Latency budget', 'A 100 ms quote path cannot carry the same checks as a settlement, withdrawal, or rebalance path. Controls have to be placed at the right phase of the lifecycle.'],
  ['Participation model', '“Solver” can mean permissionless filler, allowlisted resolver, private RFQ maker, bonded relayer, internal executor, or infrastructure node. Each carries different trust and operational assumptions.'],
  ['Standards compatibility', 'ERC-7683 is creating a shared cross-chain intent language, but production systems still use many protocol-specific order formats and API payloads.'],
];

const VERIFIABLE_CONTROLS = [
  ['Policy-gated inventory', 'Solver inventory can sit behind a vault or signing flow that releases funds only when code verifies the order, route, amount, deadline, profitability, and risk limits.'],
  ['Attested execution', 'Authorization logic can run inside TEEs and produce evidence that a specific policy approved or denied a fill, claim, withdrawal, or rebalance.'],
  ['Cross-chain source verification', 'Source-chain state, bridge attestations, VAAs, CCTP messages, or settlement roots can be checked before a downstream action is signed.'],
  ['Role separation', 'Quote generation, strategy, execution, withdrawal, and emergency permissions can be separated so no single bot or operator has unilateral inventory authority.'],
  ['Phase-aware controls', 'The controls used for quoting, filling, claiming, and rebalancing can differ according to each phase’s latency budget and risk profile.'],
];

const LIT_HELP = [
  ['Auditability', 'The solver can show which code path authorized or denied a movement of funds, turning key management from an operational promise into a verifiable control.'],
  ['Hot-wallet drain prevention', 'A solver vault can require a Lit Action policy before inventory moves. If a bot server, API key, or ordinary operator credential is compromised, the attacker still cannot drain funds unless the order, route, limits, and chain facts satisfy policy.'],
  ['Blast-radius limits', 'Policies can enforce per-token, per-chain, per-counterparty, per-route, and time-window limits so a single failure cannot become an unlimited cross-chain inventory drain.'],
  ['Source-of-truth checks', 'Before signing a fill, claim, withdrawal, or rebalance, a Lit Action can reconstruct source-chain deposits, bridge attestations, CCTP messages, VAAs, deadlines, recipients, and replay state.'],
  ['Phase-specific controls', 'Low-latency quote paths can stay fast, while higher-risk phases — destination release, claim, withdrawal, and rebalance — use stricter checks and attested approvals.'],
  ['Emergency response', 'A policy can include kill switches, circuit breakers, allowlist changes, or governance-gated upgrades without handing a single hot key the power to move every asset.'],
];

const PROOF_POINTS = [
  ['Inventory moved under policy', 'A fill, claim, withdrawal, or rebalance was authorized only after the required order, route, limit, and risk checks passed.'],
  ['A denial was real', 'A risky or invalid request failed because the policy refused to sign, not because an operator happened to notice it.'],
  ['The signer was constrained', 'The key could not be exported or used outside the allowed policy path, reducing hot-wallet and insider risk.'],
  ['The execution path is auditable', 'The decision can be tied to code identity, chain state, and the specific cross-chain facts that were observed at signing time.'],
];

const ECOSYSTEM = [
  ['Across', 'Fast-fill relayer network', 'Relayers fill users on the destination chain and are repaid through optimistic settlement bundles.'],
  ['deBridge DLN', '0-TVL cross-chain order network', 'Takers fulfill destination orders and later claim or unlock source-side value.'],
  ['Wormhole Settlement / Mayan', 'Settlement and solver ecosystem', 'Solvers compete around Wormhole attestations, CCTP, and fast auction flows.'],
  ['1inch Fusion+', 'Cross-chain Dutch-auction resolver network', 'Resolvers coordinate source and destination escrows using hashlock and timelock-style mechanics.'],
  ['Squid Coral', 'Intent swaps over Axelar', 'Solvers quote and fill intent swaps while Axelar provides cross-chain transport.'],
  ['Relay.link', 'Managed fast bridging and execution API', 'Relay and liquidity providers deliver fast destination execution and rebalance behind the API.'],
  ['UniswapX', 'Dutch-auction filler system', 'Fillers compete to execute signed orders through reactor contracts; cross-chain variants extend the model.'],
  ['CoW Protocol', 'Batch-auction solver network', 'Solvers compete to produce aggregate settlements across user intents and liquidity venues.'],
  ['LI.FI', 'Aggregator and intent router', 'Routes across bridges, DEX aggregators, intent protocols, and status/execution APIs.'],
  ['Socket / Bungee', 'Chain-abstraction orchestration', 'Coordinates route execution, transmitters, and EIP-7683-compatible order surfaces.'],
  ['Hashflow / Bebop', 'RFQ market-maker networks', 'Professional makers quote firm prices against private inventory across supported chains.'],
  ['Everclear', 'Clearing and netting layer', 'Nets cross-chain obligations to reduce solver rebalancing cost and settlement friction.'],
];

const OPEN_QUESTIONS = [
  'If a bot server or API key is compromised, can it still move inventory — or does code gate every transfer first?',
  'Can you prove a risky or invalid fill was denied, not just that nothing bad happened to occur?',
  'Is inventory-moving authority separated from strategy and quoting, or does one hot key do everything?',
  'Before a claim, withdrawal, or rebalance, what reconstructs source-chain truth — and what happens if it is wrong?',
  'Could you show an auditor, a partner, or a user exactly which code path authorized a movement of funds?',
];

const P = ({ children }: { children: ReactNode }) => (
  <p className="mt-4 text-[1.02rem] leading-[1.72] text-white/70">{children}</p>
);

const Lead = ({ children }: { children: ReactNode }) => <strong className="font-medium text-white">{children}</strong>;

function SectionHead({ n, id, title }: { n: string; id: string; title: string }) {
  return (
    <div className="mb-2 flex items-baseline gap-3">
      <span className="font-mono text-sm text-lit-orange-700">{n}</span>
      <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-tight tracking-tight" id={id}>
        {title}
      </h2>
    </div>
  );
}

export default function SolversReport() {
  const [active, setActive] = useState<string>('forcing-function');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id.replace('sec-', ''));
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(`sec-${s.id}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-coal-950 text-white">
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[min(1000px,140vw)] -translate-x-1/2 -translate-y-1/3 blur-[10px] bg-[radial-gradient(ellipse_at_center,_oklch(53.51%_0.163_39.51/0.22)_0%,_transparent_64%)]" />
        <Container size="lg" className="relative !pt-20 !pb-16 md:!pt-28">
          <div className="font-mono text-xs uppercase tracking-[0.28em] text-lit-orange">Position paper</div>
          <h1 className="mt-5 max-w-[20ch] text-[clamp(2.2rem,5.2vw,3.9rem)] font-medium leading-[1.05] tracking-tight">
            Cross-chain signing you can prove, not just trust.
          </h1>
          <p className="mt-6 max-w-[54ch] text-[clamp(1.05rem,1.9vw,1.3rem)] leading-relaxed text-white/70">
            Cross-chain solvers move inventory through hot keys, where a single compromised signer can drain the vault. Lit signs those moves inside a sealed, attested TEE under on-chain policy you set: the speed of a bot, with a proof instead of a promise.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-white/40">
            <span className="text-white/60">Fillers · RFQ makers · intent routers · settlement rails</span>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={SOLVER_REVIEW_FORM} target="_blank" rel="noopener noreferrer" rightIcon={<IconArrowNarrowRight stroke={2} />}>
              Book a solver security review
            </Button>
            <Button variant="outline" href={SOLVER_VAULT_EXAMPLE} target="_blank" rel="noopener noreferrer">
              See the solver vault example
            </Button>
          </div>
        </Container>
      </header>

      <Container size="lg" className="!py-16 md:!py-20">
        <div className="mx-auto max-w-[44rem] rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-lit-orange">Abstract</div>
          <p className="text-[1.05rem] leading-[1.75] text-white/80">
            Cross-chain solvers are the operators behind intent-based execution. They accept a user order on one domain and make the desired outcome happen on another by fronting destination-chain liquidity, performing swaps or calls, and later reclaiming value through a bridge, escrow, message layer, canonical asset rail, or clearing system. The market is converging around a small number of repeatable patterns, but each pattern exposes a hard operational problem: <Lead>who can move solver inventory, under what conditions, and how can that decision be verified?</Lead>
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-[44rem]">
          <p className="text-center text-sm text-white/50">
            Both sign at bot speed. Only one lets you prove the rules held.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white/40">
                Custodial single-cloud signer
              </div>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-white/65">
                Signing runs inside one company’s cloud. You trust the operator’s word that keys stay safe and rules are followed, with no way to check either yourself.
              </p>
            </div>
            <div className="rounded-2xl border border-lit-orange/30 bg-[radial-gradient(120%_120%_at_50%_0,_oklch(53.51%_0.163_39.51/0.08),_transparent_60%)] p-6">
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-lit-orange">
                Lit
              </div>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-white/80">
                Signing runs in sealed hardware whose exact code you can attest, gated by on-chain policy on Base. Keys can’t be seen or extracted, funds move only when code approves, and no single party (including Lit) changes the rules unilaterally.
              </p>
            </div>
          </div>
        </div>

        <div className="wp-grid mt-16 lg:grid lg:grid-cols-[200px_minmax(0,44rem)] lg:justify-center lg:gap-16">
          <nav className="mb-10 hidden lg:block">
            <div className="sticky top-24">
              <div className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/40">Contents</div>
              <ul className="space-y-2.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#sec-${s.id}`}
                      className={`flex gap-2.5 text-sm transition-colors ${active === s.id ? 'text-lit-orange' : 'text-white/45 hover:text-white/80'}`}
                    >
                      <span className="font-mono text-xs opacity-60">{s.n}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <article className="wp-doc max-w-[44rem]">
            <section id="sec-forcing-function" className="scroll-mt-24">
              <SectionHead n="1" id="forcing-function" title="The forcing function" />
              <P>
                The cross-chain user experience is moving from “choose a bridge, choose a DEX, wait, then complete the trade” to <Lead>state the outcome and let a solver compete to deliver it</Lead>. The user signs an intent or creates an order; the solver decides whether the route is profitable and safe; the protocol enforces settlement.
              </P>
              <P>
                This compresses UX and gives applications chain abstraction, but it also moves risk into solver infrastructure. Solvers need hot inventory, fast signatures, API credentials, bridge attestations, and settlement permissions spread across many chains. Their competitive advantage depends on speed, but their downside comes from letting the wrong transaction move inventory.
              </P>
            </section>

            <section id="sec-loss-pattern" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="2" id="loss-pattern" title="The loss pattern" />
              <P>
                The main risk for production solvers is not abstract bridge risk. It is inventory controlled by keys that must stay online enough to quote, fill, claim, withdraw, and rebalance. The broader crypto market shows how expensive that key-management layer can become when it fails.
              </P>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {LOSS_STATS.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-none tracking-tight text-lit-orange">{stat.value}</div>
                    <div className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white/40">{stat.label}</div>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-white/65">
                      {stat.body}{stat.refs.map((n) => <Fn key={n} n={n} />)}
                    </p>
                  </div>
                ))}
              </div>
              <P>
                A solver is not an exchange, but the failure mode rhymes: once a hot key can move valuable inventory, compromise turns directly into loss. For solver networks, the practical question is whether inventory-moving authority can be online enough to compete while still being constrained enough that a compromised bot cannot empty the vault.
              </P>
            </section>

            <section id="sec-fault-lines" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="3" id="fault-lines" title="Operational fault lines" />
              <P>The state of solvers is defined as much by operational constraints as by protocol design. The same fault lines appear across otherwise different systems.</P>
              <ul className="mt-4 space-y-4">
                {CONTROL_SURFACES.map(([h, b]) => (
                  <li key={h} className="relative pl-6 text-[1.02rem] leading-[1.7] text-white/70">
                    <span className="absolute left-0 top-[0.6rem] h-1.5 w-1.5 rounded-full bg-lit-orange" />
                    <Lead>{h}.</Lead> {b}
                  </li>
                ))}
              </ul>
            </section>

            <section id="sec-verifiable-control" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="4" id="verifiable-control" title="Verifiable control" />
              <P>
                The control problem is not unique to any one protocol. A solver needs a way to move quickly without turning every hot wallet, executor, or quote signer into an unconstrained source of loss. The emerging answer is <Lead>programmable, attestable signing for solver inventory and execution authority</Lead>: sensitive actions can move behind code-enforced policy while strategy remains fast.
              </P>
              <ul className="mt-4 space-y-4">
                {VERIFIABLE_CONTROLS.map(([h, b]) => (
                  <li key={h} className="relative pl-6 text-[1.02rem] leading-[1.7] text-white/70">
                    <span className="absolute left-0 top-[0.55rem] font-mono text-lit-orange">◆</span>
                    <Lead>{h}.</Lead> {b}
                  </li>
                ))}
              </ul>
              <P>
                Lit is one implementation of this pattern. A Lit Action can run the policy check; Lit’s TEE-backed signing path can authorize the transaction only if the policy passes; and the solver can keep a record of what code and context approved the action.<Fn n={13} /><Fn n={14} />
              </P>
              <figure className="mt-7">
                <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1.3fr_auto_1fr]">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/40">Fast path</div>
                    <b className="mt-2 block text-[0.95rem] font-medium">Solver strategy &amp; bots</b>
                    <span className="mt-1 block text-xs leading-relaxed text-white/55">Hot keys, API credentials, quote signers — competing on speed.</span>
                  </div>
                  <span className="hidden items-center justify-center font-mono text-lit-orange-700 md:flex">→</span>
                  <div className="rounded-xl border border-dashed border-lit-orange/40 bg-[radial-gradient(120%_120%_at_50%_0,_oklch(53.51%_0.163_39.51/0.08),_transparent_60%)] p-5">
                    <div className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-lit-orange">Policy gate · Lit Action in a TEE</div>
                    <span className="mt-2 block text-xs text-white/70">Before any inventory move, verify:</span>
                    <ul className="mt-2 space-y-1 text-xs text-white/60">
                      <li>◆ order, route, amount, deadline</li>
                      <li>◆ per-token / per-chain / per-window limits</li>
                      <li>◆ source of truth — deposits, VAAs, CCTP, replay state</li>
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-2 font-mono text-[0.62rem]">
                      <span className="rounded bg-lit-orange/15 px-2 py-1 text-lit-orange">pass → sign</span>
                      <span className="rounded bg-white/5 px-2 py-1 text-white/40">fail → no signature</span>
                    </div>
                  </div>
                  <span className="hidden items-center justify-center font-mono text-lit-orange-700 md:flex">→</span>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/40">Protected</div>
                    <b className="mt-2 block text-[0.95rem] font-medium">Solver inventory</b>
                    <span className="mt-1 block text-xs leading-relaxed text-white/55">Vaults &amp; balances across chains — move only on a verified signature.</span>
                  </div>
                </div>
              </figure>
              <figcaption className="mt-3 font-mono text-[0.72rem] text-white/35">Figure 1 — A policy gate in front of inventory-moving signatures. Strategy stays fast; the signature is withheld unless code verifies the order, route, limits, and chain facts.</figcaption>
              <ul className="mt-6 space-y-4">
                {LIT_HELP.map(([h, b]) => (
                  <li key={h} className="relative pl-6 text-[1.02rem] leading-[1.7] text-white/70">
                    <span className="absolute left-0 top-[0.6rem] h-1.5 w-1.5 rounded-full bg-lit-orange" />
                    <Lead>{h}.</Lead> {b}
                  </li>
                ))}
              </ul>
            </section>

            <section id="sec-proof" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="5" id="proof" title="What a solver can prove" />
              <P>
                A mature solver stack should be able to show more than a transaction hash after the fact. It should be able to show why an action was allowed, why a risky action was denied, and which code path held authority over inventory.
              </P>
              <figure className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full border-collapse text-left align-top">
                  <thead>
                    <tr className="bg-white/[0.03] font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/40">
                      <th className="w-1/3 p-4 font-normal">Claim</th>
                      <th className="p-4 font-normal">Evidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROOF_POINTS.map(([claim, evidence]) => (
                      <tr key={claim} className="border-t border-white/10 align-top">
                        <td className="p-4 text-[0.95rem] font-medium text-white">{claim}</td>
                        <td className="p-4 text-[0.92rem] leading-relaxed text-white/65">{evidence}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
            </section>

            <section id="sec-solver-role" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="6" id="solver-role" title="The solver role" />
              <P>The same word, “solver,” covers several different business and technical roles. A useful taxonomy starts with how the actor gets selected and how it is repaid.</P>
              <figure className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full border-collapse text-left align-top">
                  <thead>
                    <tr className="bg-white/[0.03] font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/40">
                      <th className="w-1/4 p-4 font-normal">Category</th>
                      <th className="p-4 font-normal">Technique</th>
                      <th className="p-4 font-normal">Control question</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TAXONOMY.map((r) => (
                      <tr key={r.category} className="border-t border-white/10 align-top">
                        <td className="p-4 text-[0.95rem] font-medium text-white">
                          {r.category}
                          <span className="mt-1 block text-xs font-normal leading-relaxed text-white/35">{r.examples}</span>
                        </td>
                        <td className="p-4 text-[0.92rem] leading-relaxed text-white/65">{r.technique}</td>
                        <td className="p-4 text-[0.92rem] leading-relaxed text-white/65">{r.question}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
            </section>

            <section id="sec-execution-models" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="7" id="execution-models" title="Execution models" />
              <P>
                Across Dutch auctions, RFQ, batch auctions, and fast-fill networks, the operational lifecycle repeats: take an order, select a solver, execute on the destination, claim on the source, then rebalance for the next trade.
              </P>
              <figure className="mt-7">
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  {LIFECYCLE.map((p, i) => (
                    <div
                      key={p.n}
                      className={`flex items-start gap-4 p-4 md:gap-5 md:p-5 ${i > 0 ? 'border-t border-white/10' : ''} ${p.gated ? 'bg-lit-orange/[0.05]' : 'bg-white/[0.02]'}`}
                    >
                      <span className="w-8 shrink-0 pt-0.5 font-mono text-sm font-semibold text-lit-orange">{p.n}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                          <b className="text-[0.95rem] font-medium">{p.title}</b>
                          <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/40">{p.chain}</span>
                          {p.gated && (
                            <span className="rounded bg-lit-orange/15 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-lit-orange">◆ solver signs</span>
                          )}
                        </div>
                        <span className="mt-1.5 block text-sm leading-relaxed text-white/55">{p.body}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </figure>
              <figcaption className="mt-3 font-mono text-[0.72rem] text-white/35">Figure 2 — The cross-chain intent lifecycle. Phases 3–5 are where a solver’s keys move inventory — and where a compromised signer turns into a loss.</figcaption>
              <P>
                ERC-7683 is an important step toward standard cross-chain intent order formats, with Across and Socket among the teams pushing explicit support.<Fn n={1} /><Fn n={8} /><Fn n={9} /> But today, many production systems still use project-specific escrow formats, RFQ payloads, API routes, or settlement contracts.
              </P>
            </section>

            <section id="sec-ecosystem" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="8" id="ecosystem" title="The ecosystem" />
              <P>
                The solver ecosystem is not a single market. It is a stack of relayers, resolvers, RFQ makers, routers, settlement systems, canonical transfer rails, and clearing layers. Some teams operate inventory directly; others coordinate execution or reduce settlement friction.
              </P>
              <figure className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full border-collapse text-left align-top">
                  <thead>
                    <tr className="bg-white/[0.03] font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/40">
                      <th className="p-4 font-normal">Project</th>
                      <th className="p-4 font-normal">Category</th>
                      <th className="p-4 font-normal">Role in the solver stack</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ECOSYSTEM.map(([project, category, role]) => (
                      <tr key={project} className="border-t border-white/10 align-top">
                        <td className="p-4 text-[0.95rem] font-medium text-white">{project}</td>
                        <td className="p-4 text-[0.92rem] leading-relaxed text-white/65">{category}</td>
                        <td className="p-4 text-[0.92rem] leading-relaxed text-white/65">{role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
            </section>

            <section id="sec-open-questions" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="9" id="open-questions" title="Questions worth asking" />
              <P>
                Whether you run solver inventory or depend on one, these are the questions that separate a controlled stack from a hopeful one — and the ones a policy-gated signing layer is built to answer.
              </P>
              <ul className="mt-4 space-y-3">
                {OPEN_QUESTIONS.map((item) => (
                  <li key={item} className="relative pl-6 text-[1.02rem] leading-[1.7] text-white/70">
                    <span className="absolute left-0 top-[0.6rem] h-1.5 w-1.5 rounded-full bg-lit-orange-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <div className="rounded-2xl border border-lit-orange/25 bg-[radial-gradient(120%_120%_at_50%_0,_oklch(53.51%_0.163_39.51/0.10),_transparent_65%)] p-8 text-center md:p-12">
                <h2 className="mx-auto max-w-[22ch] text-[clamp(1.6rem,3.4vw,2.4rem)] font-medium leading-tight tracking-tight">
                  Keep the speed. Prove the rules held.
                </h2>
                <p className="mx-auto mt-4 max-w-[50ch] text-[1.02rem] leading-relaxed text-white/65">
                  If you operate solver inventory across chains, we’ll walk your team through policy-gated signing — and a working vault you can fork today.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Button href={SOLVER_REVIEW_FORM} target="_blank" rel="noopener noreferrer" rightIcon={<IconArrowNarrowRight stroke={2} />}>
                    Book a solver security review
                  </Button>
                  <Button variant="outline" href={SOLVER_VAULT_EXAMPLE} target="_blank" rel="noopener noreferrer">
                    See the solver vault example
                  </Button>
                </div>
              </div>
            </section>

            <section id="sec-references" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="10" id="references" title="References" />
              <ol className="mt-4 space-y-3">
                {REFERENCES.map((r) => (
                  <li key={r.n} id={`ref-${r.n}`} className="scroll-mt-24 flex gap-3 text-[0.9rem] leading-relaxed text-white/60">
                    <span className="font-mono text-xs text-lit-orange-700">[{r.n}]</span>
                    <span>
                      {r.text}{' '}
                      <a href={r.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 whitespace-nowrap text-lit-orange transition-colors hover:text-gold-500">
                        link <IconExternalLink size={11} stroke={2} className="opacity-70" />
                      </a>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-10 border-t border-white/10 pt-5 font-mono text-[0.7rem] leading-relaxed text-white/30">
                Informational only. This report summarizes public materials and first-pass research current to June 2026. Loss estimates vary by source and attribution method; the figures above are directional and should be read as evidence of the magnitude of key-management risk, not as a legal or forensic conclusion. The solver market is changing quickly; production details such as solver participation, custody, latency budgets, and standards support should be treated as implementation-specific and subject to change.
              </p>
            </section>
          </article>
        </div>
      </Container>
    </div>
  );
}
