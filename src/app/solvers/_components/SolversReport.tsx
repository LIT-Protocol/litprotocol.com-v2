'use client';

import { Container } from '@mantine/core';
import { IconArrowNarrowRight, IconExternalLink } from '@tabler/icons-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

const DEPLOYMENT_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLScQ8dU09fbdRa6Al70rP9Bb-iX_CngnGl1U6_YFh7s0UyKgkQ/viewform';
const SOLVER_VAULT_EXAMPLE =
  'https://github.com/LIT-Protocol/chipotle/tree/main/examples/lit-solver-vault';

const Fn = ({ n }: { n: number }) => (
  <sup className="ml-px">
    <a href={`#ref-${n}`} className="font-mono text-[0.6em] text-lit-orange transition-colors hover:text-gold-500">
      [{n}]
    </a>
  </sup>
);

const SECTIONS = [
  { id: 'market', n: '1', title: 'The market' },
  { id: 'taxonomy', n: '2', title: 'Solver taxonomy' },
  { id: 'techniques', n: '3', title: 'Execution patterns' },
  { id: 'risks', n: '4', title: 'Control surfaces' },
  { id: 'lit', n: '5', title: 'Where Lit fits' },
  { id: 'map', n: '6', title: 'Company map' },
  { id: 'outreach', n: '7', title: 'Outreach workflow' },
  { id: 'references', n: '8', title: 'References' },
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
  { n: 10, text: 'Lit Protocol v3 (Chipotle): TEE-based execution, on-chain key orchestration, and hardware attestation.', href: 'https://spark.litprotocol.com/introducing-lit-protocol-v3-chipotle/' },
  { n: 11, text: 'Lit solver vault example in the Chipotle repository.', href: SOLVER_VAULT_EXAMPLE },
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

const TECHNIQUES = [
  ['Order intake', 'User signs an intent, places an RFQ, deposits into escrow, or submits a bridgeable route.'],
  ['Solver selection', 'A resolver, filler, maker, or route executor wins by price, speed, exclusivity, reputation, or auction rules.'],
  ['Destination execution', 'The solver fronts funds, performs a swap, executes a call, or creates destination-side escrow.'],
  ['Claim and settlement', 'The solver proves the source order, unlocks funds, receives repayment, or nets obligations through a clearing layer.'],
  ['Rebalancing', 'Inventory is moved across chains, venues, or custody systems to prepare for the next fill.'],
];

const CONTROL_SURFACES = [
  ['Inventory custody', 'Funds often sit in EOAs, smart accounts, vault contracts, protocol balances, or venue accounts. The critical question is not only where funds sit, but what runtime conditions are required before they can move.'],
  ['Order reconstruction', 'Before a fill, claim, or rebalance, a solver must reconstruct source-chain events, bridge attestations, quote IDs, deadlines, recipients, token amounts, and replay constraints.'],
  ['Latency budget', 'A 100 ms quote path cannot carry the same checks as a settlement, withdrawal, or rebalance path. Controls have to be placed at the right phase of the lifecycle.'],
  ['Onboarding model', '“Solver” can mean permissionless filler, allowlisted resolver, private RFQ maker, bonded relayer, internal executor, or infrastructure node. Each carries different trust and sales motion.'],
  ['Standards compatibility', 'ERC-7683 is creating a shared cross-chain intent language, but production systems still use many protocol-specific order formats and API payloads.'],
];

const LIT_FITS = [
  ['Policy-gated inventory', 'Put solver inventory behind a vault or signing flow that releases funds only when a Lit Action verifies the order, route, amount, deadline, profitability, and risk limits.'],
  ['Attested execution', 'Run authorization logic inside TEEs and produce evidence that the exact policy approved or denied a fill, claim, withdrawal, or rebalance.'],
  ['Cross-chain source verification', 'Use Lit Actions to read source-chain state, bridge attestations, VAAs, CCTP messages, or settlement roots before signing a downstream action.'],
  ['Role separation', 'Separate quote generation, strategy, execution, withdrawal, and emergency permissions so no single bot or operator has unilateral inventory authority.'],
  ['Company-specific deployment', 'The right wedge differs by category: Across-style relayer fills, RFQ quote signing, CCTP rebalancing, and aggregator executor wallets need different policies.'],
];

const COMPANY_MAP = [
  ['P0', 'Across', 'Fast-fill relayer network', 'Relayer inventory custody, exclusive flows, fill authorization latency.'],
  ['P0', 'deBridge DLN', '0-TVL cross-chain order network', 'Taker/filler claim keys, order fulfillment flow, reserve custody.'],
  ['P0', 'Wormhole Settlement / Mayan', 'Settlement and solver ecosystem', 'Solver curation, VAA/CCTP verification, fast auction constraints.'],
  ['P0', '1inch Fusion+', 'Cross-chain Dutch-auction resolver network', 'Resolver keys, escrow flow, secret generation and reveal.'],
  ['P0', 'Squid Coral', 'Intent swaps over Axelar', 'Solver participation model, quote signing, inventory risk.'],
  ['P0', 'Relay.link', 'Managed fast bridging and execution API', 'Liquidity provider custody, signer modes, rebalancing paths.'],
  ['P1', 'UniswapX', 'Dutch-auction filler system', 'Cross-chain filler inventory, RFQ paths, reactor settlement.'],
  ['P1', 'CoW Protocol', 'Batch-auction solver network', 'Settlement signing, solver buffers, hooks, simulation.'],
  ['P1', 'LI.FI', 'Aggregator and intent router', 'Executor roles, solver access, route-safety policies.'],
  ['P1', 'Socket / Bungee', 'Chain-abstraction orchestration', 'Transmitters, EIP-7683 support, gas and refund control.'],
  ['P1', 'Hashflow / Bebop', 'RFQ market-maker networks', 'Quote-signing keys, stale quotes, PMM inventory controls.'],
  ['P2', 'Everclear', 'Clearing and netting layer', 'Solver rebalancing reduction, settlement responsibilities.'],
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
  const [active, setActive] = useState<string>('market');

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
          <div className="font-mono text-xs uppercase tracking-[0.28em] text-lit-orange">Industry report</div>
          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.5rem,6.5vw,5rem)] font-medium leading-[1.0] tracking-tight">
            Cross-Chain Solvers
          </h1>
          <p className="mt-5 max-w-[48ch] text-[clamp(1.1rem,2vw,1.4rem)] leading-snug text-white/70">
            Market map, taxonomy, and control architecture for intent-based execution.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-white/40">
            <span>Version 0.1 · June 2026</span>
            <span className="text-white/15">|</span>
            <span className="text-white/60">Fillers · RFQ makers · intent routers · settlement rails</span>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={DEPLOYMENT_FORM} target="_blank" rel="noopener noreferrer" rightIcon={<IconArrowNarrowRight stroke={2} />}>
              Discuss solver infrastructure
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
            <section id="sec-market" className="scroll-mt-24">
              <SectionHead n="1" id="market" title="The market" />
              <P>
                The cross-chain user experience is moving from “choose a bridge, choose a DEX, wait, then complete the trade” to <Lead>state the outcome and let a solver compete to deliver it</Lead>. The user signs an intent or creates an order; the solver decides whether the route is profitable and safe; the protocol enforces settlement.
              </P>
              <P>
                This compresses UX and gives applications chain abstraction, but it also moves risk into solver infrastructure. Solvers need hot inventory, fast signatures, API credentials, bridge attestations, and settlement permissions spread across many chains. Their competitive advantage depends on speed, but their downside comes from letting the wrong transaction move inventory.
              </P>
            </section>

            <section id="sec-taxonomy" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="2" id="taxonomy" title="Solver taxonomy" />
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

            <section id="sec-techniques" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="3" id="techniques" title="Execution patterns" />
              <P>
                Across Dutch auctions, RFQ, batch auctions, and fast-fill networks, the operational lifecycle repeats: take an order, select a solver, execute on the destination, claim on the source, then rebalance for the next trade.
              </P>
              <figure className="mt-7 rounded-2xl border border-dashed border-lit-orange/30 bg-[radial-gradient(120%_120%_at_50%_0,_oklch(53.51%_0.163_39.51/0.06),_transparent_60%)] px-5 pb-6 pt-9">
                <span className="-mt-12 mb-1 block font-mono text-[0.7rem] tracking-wide text-lit-orange">Intent lifecycle · solver-controlled phases</span>
                <div className="mt-3 grid gap-2.5">
                  {TECHNIQUES.map(([title, body], i) => (
                    <div key={title} className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
                      <span className="w-6 shrink-0 pt-0.5 font-mono text-xs font-semibold text-lit-orange">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <b className="block text-[0.95rem] font-medium">{title}</b>
                        <span className="text-sm text-white/55">{body}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </figure>
              <P>
                ERC-7683 is an important step toward standard cross-chain intent order formats, with Across and Socket among the teams pushing explicit support.<Fn n={1} /><Fn n={8} /><Fn n={9} /> But today, many production systems still use project-specific escrow formats, RFQ payloads, API routes, or settlement contracts.
              </P>
            </section>

            <section id="sec-risks" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="4" id="risks" title="Control surfaces" />
              <P>The industry report is not only a map of protocols. It is a map of operational control surfaces that appear again and again across solver designs.</P>
              <ul className="mt-4 space-y-4">
                {CONTROL_SURFACES.map(([h, b]) => (
                  <li key={h} className="relative pl-6 text-[1.02rem] leading-[1.7] text-white/70">
                    <span className="absolute left-0 top-[0.6rem] h-1.5 w-1.5 rounded-full bg-lit-orange" />
                    <Lead>{h}.</Lead> {b}
                  </li>
                ))}
              </ul>
            </section>

            <section id="sec-lit" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="5" id="lit" title="Where Lit fits" />
              <P>
                Lit is not a bridge, DEX, or router. The wedge is narrower and more fundamental: <Lead>programmable, attestable signing for solver inventory and execution authority</Lead>. A solver can keep its strategy fast while moving sensitive actions behind code-enforced policy.
              </P>
              <ul className="mt-4 space-y-4">
                {LIT_FITS.map(([h, b]) => (
                  <li key={h} className="relative pl-6 text-[1.02rem] leading-[1.7] text-white/70">
                    <span className="absolute left-0 top-[0.55rem] font-mono text-lit-orange">◆</span>
                    <Lead>{h}.</Lead> {b}
                  </li>
                ))}
              </ul>
              <P>
                The Chipotle repository already contains a solver vault example that demonstrates this shape: a vault releases inventory only when a Lit Action verifies the policy and authorizes the solver action.<Fn n={10} /><Fn n={11} />
              </P>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={DEPLOYMENT_FORM} target="_blank" rel="noopener noreferrer" rightIcon={<IconArrowNarrowRight stroke={2} />}>
                  Talk through a solver design
                </Button>
                <Button variant="outline" href={SOLVER_VAULT_EXAMPLE} target="_blank" rel="noopener noreferrer">
                  View example code
                </Button>
              </div>
            </section>

            <section id="sec-map" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="6" id="map" title="Company map" />
              <P>
                The first outreach list should focus on companies whose products already expose solver, filler, RFQ, or route-executor control surfaces. Each profile should verify the architecture before moving into a sales conversation.
              </P>
              <figure className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full border-collapse text-left align-top">
                  <thead>
                    <tr className="bg-white/[0.03] font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/40">
                      <th className="w-16 p-4 font-normal">Priority</th>
                      <th className="p-4 font-normal">Company / project</th>
                      <th className="p-4 font-normal">Category</th>
                      <th className="p-4 font-normal">Verify first</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPANY_MAP.map(([priority, company, category, verify]) => (
                      <tr key={company} className="border-t border-white/10 align-top">
                        <td className="p-4 font-mono text-xs text-lit-orange-700">{priority}</td>
                        <td className="p-4 text-[0.95rem] font-medium text-white">{company}</td>
                        <td className="p-4 text-[0.92rem] leading-relaxed text-white/65">{category}</td>
                        <td className="p-4 text-[0.92rem] leading-relaxed text-white/65">{verify}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
            </section>

            <section id="sec-outreach" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="7" id="outreach" title="Outreach workflow" />
              <P>
                The report should open doors as a credible industry artifact. The recommended motion is to ask each team to verify the technical section about them before pitching any Lit-specific integration.
              </P>
              <ol className="mt-4 space-y-3">
                {[
                  'Share the taxonomy and the company profile draft.',
                  'Ask the team to correct onboarding, solver responsibilities, custody, latency, and standards claims.',
                  'Incorporate corrections and mark which claims are verified versus inferred from public docs.',
                  'Only then discuss the company-specific Lit hypothesis: inventory vault, quote signer, settlement signer, withdrawal policy, or rebalancing control.',
                ].map((item, i) => (
                  <li key={item} className="flex gap-3 text-[1.02rem] leading-[1.7] text-white/70">
                    <span className="font-mono text-xs text-lit-orange-700">{i + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-lit-orange">Draft ask</div>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-white/65">
                  We are putting together an industry report on cross-chain solvers, fillers, RFQ makers, intent protocols, and solver-adjacent interoperability rails. We included a section on your team and want to make sure we describe your architecture accurately. Would someone technical be open to reviewing onboarding, custody, signer assumptions, latency constraints, order formats, and public/private docs boundaries?
                </p>
              </div>
            </section>

            <section id="sec-references" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="8" id="references" title="References" />
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
                Informational only. This report summarizes public materials and first-pass research current to June 2026. Company sections should be verified with the teams before publication or outreach. Lit-specific deployment ideas are hypotheses until validated against each protocol’s actual production architecture.
              </p>
            </section>
          </article>
        </div>
      </Container>
    </div>
  );
}
