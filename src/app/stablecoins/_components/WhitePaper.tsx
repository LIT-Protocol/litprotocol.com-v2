'use client';

import { Container } from '@mantine/core';
import { IconArrowNarrowRight, IconExternalLink } from '@tabler/icons-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import Countdown from './Countdown';
import { SRC } from './citations';

const DOCS_EXAMPLES = 'https://developer.litprotocol.com/lit-actions/examples';
const DEPLOYMENT_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLScQ8dU09fbdRa6Al70rP9Bb-iX_CngnGl1U6_YFh7s0UyKgkQ/viewform';

// Defined before the data tables below, which reference it (const is not hoisted — TDZ).
const Fn = ({ n }: { n: number }) => (
  <sup className="ml-px">
    <a href={`#ref-${n}`} className="font-mono text-[0.6em] text-lit-orange transition-colors hover:text-gold-500">
      [{n}]
    </a>
  </sup>
);

/* ---------------- structure ---------------- */

const SECTIONS = [
  { id: 'forcing-function', n: '1', title: 'The forcing function' },
  { id: 'problem', n: '2', title: 'Control by promise' },
  { id: 'shift', n: '3', title: 'Verifiable control' },
  { id: 'external', n: '4', title: 'External compliance' },
  { id: 'internal', n: '5', title: 'Internal compliance' },
  { id: 'architecture', n: '6', title: 'The architecture' },
  { id: 'proof', n: '7', title: 'What an issuer can prove' },
  { id: 'implementation', n: '8', title: 'Implementation' },
  { id: 'references', n: '9', title: 'References' },
];

const REFERENCES: { n: number; text: ReactNode; href: string }[] = [
  { n: 1, text: 'GENIUS Act, Pub. L. No. 119-27, 139 Stat. 419 (July 18, 2025), § 4(a)(5) (permitted payment stablecoin issuer treated as a financial institution under the Bank Secrecy Act; effective AML and economic-sanctions compliance program).', href: SRC.geniusText },
  { n: 2, text: 'GENIUS Act § 2(16) (definition of “lawful order”); § 4(a)(5) (technological capability to comply with a lawful order to seize, freeze, burn, or prevent the transfer of stablecoins).', href: SRC.geniusText },
  { n: 3, text: 'FinCEN & OFAC, Permitted Payment Stablecoin Issuer AML/CFT Program and Sanctions Compliance Program Requirements (Proposed Rule), 91 Fed. Reg. (Apr. 10, 2026), Doc. No. 2026-06963; public comment closes June 9, 2026.', href: SRC.npr },
  { n: 4, text: 'GENIUS Act § 20 (effective on the earlier of 18 months after enactment or 120 days after final implementing regulations).', href: SRC.geniusPDF },
  { n: 5, text: 'U.S. Department of the Treasury, proposed rule implementing the GENIUS Act’s illicit-finance requirements (Apr. 2026).', href: SRC.treasury },
  { n: 6, text: 'Lit Protocol, “Introducing Lit Protocol v3 (Chipotle)” — TEE-based execution, on-chain key orchestration, and hardware attestation.', href: SRC.chipotle },
  { n: 7, text: 'Lit Protocol developer documentation — architecture and security.', href: SRC.litDocs },
  { n: 8, text: '“Proof of Cloud: Data Center Execution Assurance for Confidential VMs,” arXiv:2510.12469; Flashbots, “Mind the Gap.”', href: SRC.pocPaper },
  { n: 9, text: 'CNBC, “PayPal’s crypto partner mints a whopping $300 trillion worth of stablecoins in ‘technical error’” (Oct. 16, 2025) — Paxos minted roughly $300 trillion in PYUSD via a 6-decimal error and burned it within about 20 minutes.', href: SRC.pyusd },
];

const TABLE1: { ob: ReactNode; cap: ReactNode }[] = [
  { ob: <>Block or reject a prohibited transfer <em className="not-italic text-white">before</em> it executes<Fn n={1} /><Fn n={3} /></>, cap: 'A policy screens the counterparty against an OFAC/sanctions oracle and withholds the signature on a hit; enforcement happens at the moment of signing — and the screen runs inside the enclave, so balances, amounts, and the counterparty graph are never published on-chain.' },
  { ob: <>Comply with a lawful order to seize, freeze, or burn<Fn n={2} /></>, cap: 'Freeze and burn paths are condition-gated and governance-bound, executing only on a verified order.' },
  { ob: <>Enforce across every chain the asset touches<Fn n={3} /></>, cap: 'One enclave-held key signs across Bitcoin, EVM, Solana and Cosmos, and reorg-validates cross-chain mint and burn.' },
  { ob: <>Sanctions blocking that reaches secondary-market and smart-contract activity<Fn n={3} /></>, cap: 'A blocked person cannot transact the asset even where the issuer is not a direct party: authority is bound to the signing key and to scoped, revocable agent permissions, not to a single token contract. Sanctions blocking applies across primary and secondary markets, as the rule requires; the architecture does not impose — and the rule does not mandate — blanket secondary-market surveillance.' },
  { ob: <>Evidence the program and report blocked transactions<Fn n={3} /></>, cap: 'Policies are immutable and code-hash-verified; each decision is a cryptographically attested record.' },
];

const TABLE2: { who: string; claim: ReactNode }[] = [
  { who: 'Regulator', claim: <>Pre-execution sanctions screening and lawful-order seize/freeze across every chain, with evidence of each blocked attempt.<Fn n={1} /><Fn n={3} /></> },
  { who: 'Internal audit & SOC 2', claim: 'Segregation of duties, a complete tamper-evident trail, and control effectiveness demonstrated continuously — not sampled.' },
  { who: 'Board & risk committee', claim: 'No key-person or insider single point of failure; policy changeable only by governance; custodial and operational risk materially reduced.' },
  { who: 'Counterparties & customers', claim: 'A non-custodial guarantee that is cryptographically verifiable, rather than asserted.' },
];

const FLOW = [
  { n: '01', t: 'Authorize against the chain', s: 'The enclave reads the on-chain permission contracts: is the caller allowed, and is this policy bound to this key?' },
  { n: '02', t: 'Fetch the immutable policy', s: 'It loads the exact policy by content identifier — content-addressed, so the code cannot have been substituted.' },
  { n: '03', t: 'Enforce', s: 'The policy runs in a sandbox: sanctions screen, supply cap, jurisdiction, limits. If any check fails, no signature is produced.' },
  { n: '04', t: 'Sign, without exposing the key', s: 'Only on success does the enclave use the key. The key never leaves the hardware; the decision is attested.' },
];

/* ---------------- primitives ---------------- */

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

/* ---------------- document ---------------- */

export default function WhitePaper() {
  const [active, setActive] = useState<string>('forcing-function');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
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
      {/* MASTHEAD */}
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[min(1000px,140vw)] -translate-x-1/2 -translate-y-1/3 blur-[10px] bg-[radial-gradient(ellipse_at_center,_oklch(53.51%_0.163_39.51/0.20)_0%,_transparent_64%)]" />
        <Container size="lg" className="relative !pt-20 !pb-16 md:!pt-28">
          <div className="font-mono text-xs uppercase tracking-[0.28em] text-lit-orange">Position paper</div>
          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.5rem,6.5vw,5rem)] font-medium leading-[1.0] tracking-tight">
            Verifiable Compliance
          </h1>
          <p className="mt-5 max-w-[46ch] text-[clamp(1.1rem,2vw,1.4rem)] leading-snug text-white/70">
            Code-enforced control for regulated stablecoins.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-white/40">
            <span className="text-white/60">
              GENIUS Act takes effect in <Countdown compact /> — January 18, 2027
            </span>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={DEPLOYMENT_FORM} target="_blank" rel="noopener noreferrer" rightIcon={<IconArrowNarrowRight stroke={2} />}>
              Book a deployment review
            </Button>
            <Button variant="outline" href={DOCS_EXAMPLES} target="_blank" rel="noopener noreferrer">
              See the Lit Actions examples
            </Button>
          </div>
          <div className="mt-5">
            <a href="/rwa" className="font-mono text-xs text-white/55 underline-offset-4 transition hover:text-gold-500 hover:underline">
              Tokenizing securities, funds, or other real-world assets? See /rwa →
            </a>
          </div>
        </Container>
      </header>

      <Container size="lg" className="!py-16 md:!py-20">
        {/* ABSTRACT */}
        <div className="mx-auto max-w-[44rem] rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-lit-orange">Abstract</div>
          <p className="text-[1.05rem] leading-[1.75] text-white/80">
            On January 18, 2027, the GENIUS Act makes every permitted U.S. payment-stablecoin issuer a financial institution that must demonstrate the technical capability to block, freeze, and seize transfers — before they execute, across every chain, and prove it to an examiner.<Fn n={1} /><Fn n={3} /> An issuer that meets this bar with a privileged administrative key and a written procedure satisfies neither the regulator nor its own internal controls: both rest on trust in people and processes, and both detect failure only after it has settled. This paper sets out a different control architecture. When an asset’s signing authority is generated and used only inside sealed hardware, and governed by code whose permissions are recorded on-chain, the control cannot be circumvented by an operator, an intruder, or an error — and every action it takes leaves a verifiable record. Compliance becomes something an issuer can <Lead>prove</Lead> rather than promise: to its regulator, its auditor, its board, and its counterparties.
          </p>
        </div>

        {/* GRID: TOC + body */}
        <div className="wp-grid mt-16 lg:grid lg:grid-cols-[200px_minmax(0,44rem)] lg:justify-center lg:gap-16">
          {/* TOC */}
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

          {/* BODY */}
          <article className="wp-doc max-w-[44rem]">
            {/* 1 */}
            <section id="sec-forcing-function" className="scroll-mt-24">
              <SectionHead n="1" id="forcing-function" title="The forcing function" />
              <P>
                The GENIUS Act (Public Law 119-27) brings U.S. payment stablecoins inside the federal perimeter. A permitted issuer is treated as a financial institution under the Bank Secrecy Act and must maintain an effective anti-money-laundering and economic-sanctions compliance program.<Fn n={1} /> It must also hold the technological capability to comply with a lawful order to “seize, freeze, burn, or prevent the transfer” of the stablecoins it issues.<Fn n={2} />
              </P>
              <P>
                The rule proposed by FinCEN and OFAC in April 2026 makes the engineering requirement explicit: issuers need the “policies, procedures, and the technical capability to block, freeze, and reject” specific transactions, and the agencies stress preventing a prohibited transfer rather than unwinding it afterward.<Fn n={3} /> Public comment closes June 9, 2026; the Act takes effect on the earlier of eighteen months after enactment or 120 days after final rules — January 18, 2027.<Fn n={4} />
              </P>
              <P>This is the deadline. The capability it requires also serves the issuer’s own internal controls, as the following sections set out.</P>
            </section>

            {/* 2 */}
            <section id="sec-problem" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="2" id="problem" title="Control by promise" />
              <P>
                Most issuers will meet a control obligation the way the industry always has: a privileged key on the token contract, held by a custodian or an internal team, plus a written policy describing how that key will be used. The regulator — and the issuer’s own control framework — are then asked to trust three things: that the key is held securely, that it is used only as the policy says, and that misuse would be detected. Each is verified after the fact, by sampling logs.
              </P>
              <P>This model is <Lead>promissory and post-hoc</Lead>, and it is weak by the standard of any serious control framework:</P>
              <ul className="mt-4 space-y-3">
                {[
                  ['It acts too late.', 'A freeze unwinds a transfer that has already settled; the rule asks issuers to prevent it.'],
                  ['It does not travel.', 'A control on one chain does not reach the same asset bridged to another.'],
                  ['It does not reach far enough.', 'A contract-level blacklist cannot stop a smart contract, a self-custodied wallet, or an autonomous agent from initiating a non-compliant transfer.'],
                  ['It depends on a person.', 'A key one administrator can use is a key one administrator can misuse, be compelled to use, or use by mistake — and a single point of compromise.'],
                ].map(([h, b]) => (
                  <li key={h} className="relative pl-6 text-[1.02rem] leading-[1.7] text-white/70">
                    <span className="absolute left-0 top-[0.6rem] h-1.5 w-1.5 rounded-full bg-lit-orange-700" />
                    <Lead>{h}</Lead> {b}
                  </li>
                ))}
              </ul>
              <P>
                The regulator and the internal auditor share the same concern. A control that a single party can circumvent, that produces no tamper-evident record, and whose effectiveness can only be sampled is weak under COSO, SOC 2, and SOX alike.
              </P>
            </section>

            {/* 3 */}
            <section id="sec-shift" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="3" id="shift" title="Verifiable control" />
              <P>The alternative is to verify the system rather than trust the operator. Four properties make that possible:</P>
              <ul className="mt-4 space-y-3">
                {[
                  ['Blind.', 'The signing key is generated and used only inside a sealed trusted execution environment (TEE). No operator, host, or vendor — Lit included — can see or extract it.'],
                  ['Bound.', 'The key’s authority is not an administrative setting but on-chain state: it signs only what an immutable, content-addressed policy permits.'],
                  ['Verifiable.', 'Every decision the key makes, and every transfer it refuses, is an attested record that anyone entitled to it can verify.'],
                  ['Confidential.', 'The same enclave that holds the key sees the transaction in the clear only to screen it — the counterparty, the amount, the balances never touch the public chain. An issuer satisfies the sanctions mandate without publishing its customers’ activity to the world. Privacy is not traded away for compliance; it is a property of how the control runs.'],
                ].map(([h, b]) => (
                  <li key={h} className="relative pl-6 text-[1.02rem] leading-[1.7] text-white/80">
                    <span className="absolute left-0 top-[0.55rem] font-mono text-lit-orange">◆</span>
                    <Lead>{h}</Lead> {b}
                  </li>
                ))}
              </ul>
              <P>
                Together they close the gap between policy and enforcement: the key leaves human hands, no privileged actor can sign around the control, and the screen runs without putting customer activity on the public chain. That is what <Lead>impossible to misuse</Lead> means here; §6 makes it precise. These are also the properties an internal control framework requires, which §5 takes up.
              </P>
            </section>

            {/* 4 */}
            <section id="sec-external" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="4" id="external" title="External compliance" />
              <P>Each obligation the GENIUS Act and the proposed rule impose maps to a capability enforced at the moment of signing, rather than asserted in a policy.</P>
              <figure className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full border-collapse text-left align-top">
                  <thead>
                    <tr className="bg-white/[0.03] font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/40">
                      <th className="w-2/5 p-4 font-normal">Obligation</th>
                      <th className="p-4 font-normal">Enforced capability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE1.map((r, i) => (
                      <tr key={i} className="border-t border-white/10 align-top">
                        <td className="p-4 text-[0.95rem] font-medium text-white">{r.ob}</td>
                        <td className="p-4 text-[0.92rem] leading-relaxed text-white/65">{r.cap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
              <figcaption className="mt-3 font-mono text-[0.72rem] text-white/35">Table 1 — Statutory and regulatory obligations mapped to capabilities enforced at signing.</figcaption>
            </section>

            {/* 5 */}
            <section id="sec-internal" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="5" id="internal" title="Internal compliance" />
              <P>The same architecture answers the questions an internal audit, a SOC 2 assessor, and a board risk committee ask — often more cleanly than a conventional stack.</P>
              <ul className="mt-4 space-y-4">
                {[
                  ['Segregation of duties, enforced cryptographically.', 'No single person can mint, move, or freeze; authority is split across the network and bound to policy. Segregation of duties stops being an administrative arrangement that can be quietly undone and becomes a property of the system.'],
                  ['A complete, tamper-evident audit trail.', 'Every action — and every blocked attempt — is an attested, immutable record. An issuer can evidence that a control operated, continuously, not merely that it was designed; that distinction is what external auditors actually test.'],
                  ['Change management by construction.', 'The policy is code: versioned, content-addressed, and alterable only through on-chain governance. There is no out-of-band configuration change to reconcile.'],
                  ['A smaller risk surface.', <>There is no custodial key to steal, subpoena, or fat-finger; the insider, coercion, and operational-error paths are removed rather than monitored. The October 2025 PYUSD incident — in which Paxos accidentally minted roughly $300 trillion before burning it within minutes — is precisely the class of error a supply-cap invariant in code prevents.<Fn n={9} /></>],
                  ['Continuous assurance.', 'The control operates and is evidenced in real time, not attested once a quarter.'],
                ].map(([h, b], i) => (
                  <li key={i} className="relative pl-6 text-[1.02rem] leading-[1.7] text-white/70">
                    <span className="absolute left-0 top-[0.6rem] h-1.5 w-1.5 rounded-full bg-lit-orange" />
                    <Lead>{h}</Lead> {b}
                  </li>
                ))}
              </ul>
              <P>None of this is a separate product. It is the same enforcement described in §4 and §6, assessed against internal-control standards rather than the statute.</P>
            </section>

            {/* 6 */}
            <section id="sec-architecture" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="6" id="architecture" title="The architecture" />
              <P>Three layers implement the three properties. Each is independently inspectable.</P>
              <P>
                <Lead>Blind execution.</Lead> Lit Actions — the policies — run inside trusted execution environments, where the signing key is derived and used. The network connection terminates inside the enclave, so there is no point at which key material is exposed; nothing that touches it leaves.<Fn n={6} /><Fn n={7} />
              </P>
              <P>
                <Lead>Bound to the chain.</Lead> A key’s authority is on-chain state on Base: permission contracts bind each key to the exact, content-addressed policies it may run. Changing what a key can do means changing on-chain state under the issuer’s own governance — not flipping an administrative switch.<Fn n={6} />
              </P>
              <P>
                <Lead>Verifiable hardware.</Lead> Each enclave emits a hardware attestation: a signed, deterministic measurement of the exact code running inside. The Proof of Cloud approach extends that attestation to prove the machine runs in vetted infrastructure rather than on an attacker’s bench — binding the chip’s identity to a second root of trust and closing the physical side-channel gap.<Fn n={8} />
              </P>
              <figure className="mt-7 rounded-2xl border border-dashed border-lit-orange/30 bg-[radial-gradient(120%_120%_at_50%_0,_oklch(53.51%_0.163_39.51/0.06),_transparent_60%)] px-5 pb-6 pt-9">
                <span className="-mt-12 mb-1 block font-mono text-[0.7rem] tracking-wide text-lit-orange">Sealed enclave · operators are blind</span>
                <div className="mt-3 grid gap-2.5">
                  {FLOW.map((f) => (
                    <div key={f.n} className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
                      <span className="w-6 shrink-0 pt-0.5 font-mono text-xs font-semibold text-lit-orange">{f.n}</span>
                      <div>
                        <b className="block text-[0.95rem] font-medium">{f.t}</b>
                        <span className="text-sm text-white/55">{f.s}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </figure>
              <figcaption className="mt-3 font-mono text-[0.72rem] text-white/35">Figure 1 — The lifecycle of a single signing request inside the enclave.</figcaption>
              <P>
                <Lead>A note on trust.</Lead> No system eliminates trust; it relocates trust to assumptions that can be independently verified. Here those assumptions are the silicon vendor’s hardware root of trust and the on-chain governance that sets policy — both externally attestable, the former hardened by Proof of Cloud. There is no trusted operator.
              </P>
            </section>

            {/* 7 */}
            <section id="sec-proof" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="7" id="proof" title="What an issuer can prove" />
              <P>The result is one architecture whose guarantees can be demonstrated to four different audiences.</P>
              <figure className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full border-collapse text-left align-top">
                  <thead>
                    <tr className="bg-white/[0.03] font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/40">
                      <th className="w-1/4 p-4 font-normal">Audience</th>
                      <th className="p-4 font-normal">What an issuer can prove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE2.map((r, i) => (
                      <tr key={i} className="border-t border-white/10 align-top">
                        <td className="whitespace-nowrap p-4 text-[0.95rem] font-medium text-white">{r.who}</td>
                        <td className="p-4 text-[0.92rem] leading-relaxed text-white/65">{r.claim}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
              <figcaption className="mt-3 font-mono text-[0.72rem] text-white/35">Table 2 — Guarantees demonstrable to each audience.</figcaption>
            </section>

            {/* 8 */}
            <section id="sec-implementation" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="8" id="implementation" title="Implementation" />
              <P>
                Demonstrable capability is reached fastest by starting narrow. A reference implementation can enforce sanctions-screened, supply-capped minting on a single asset and a single chain, prove it end-to-end against the proposed rule’s requirements, then extend across the other chains the asset touches. The architecture is cross-chain by design; starting on one chain proves the control end-to-end — not a retreat from the cross-chain enforcement of §4. The goal before January 18, 2027 is a control an examiner and an auditor can verify — not a finished platform.
              </P>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={DEPLOYMENT_FORM} target="_blank" rel="noopener noreferrer" rightIcon={<IconArrowNarrowRight stroke={2} />}>
                  Book a deployment review
                </Button>
                <Button variant="outline" href={DOCS_EXAMPLES} target="_blank" rel="noopener noreferrer">
                  See the Lit Actions examples
                </Button>
              </div>
            </section>

            {/* 9 */}
            <section id="sec-references" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="9" id="references" title="References" />
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
                Informational only — not legal advice. Summarizes the GENIUS Act of 2025 (Pub. L. No. 119-27) and the FinCEN/OFAC proposed rule (91 Fed. Reg., Apr. 10, 2026; Doc. 2026-06963), which is not final and may change; comments close June 9, 2026. Architecture described is current to Lit Protocol v3 and subject to change. Consult qualified counsel before relying on any statement here.
              </p>
            </section>
          </article>
        </div>
      </Container>
    </div>
  );
}
