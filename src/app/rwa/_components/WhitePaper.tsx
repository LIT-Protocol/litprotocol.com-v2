'use client';

import { Container } from '@mantine/core';
import { IconArrowNarrowRight, IconExternalLink } from '@tabler/icons-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
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
  { id: 'single-point', n: '1', title: 'The single point of failure' },
  { id: 'problem', n: '2', title: 'Control by promise' },
  { id: 'shift', n: '3', title: 'Verifiable control' },
  { id: 'powers', n: '4', title: 'Privileged power, enforced at signing' },
  { id: 'proof', n: '5', title: 'What an issuer can prove' },
  { id: 'architecture', n: '6', title: 'The architecture' },
  { id: 'scope', n: '7', title: 'Honest scope' },
  { id: 'implementation', n: '8', title: 'Implementation' },
  { id: 'references', n: '9', title: 'References' },
];

const REFERENCES: { n: number; text: ReactNode; href: string }[] = [
  { n: 1, text: 'Halborn, “Explained: The Paxos PYUSD Incident (October 2025)” — on Oct. 15, 2025 a typo turned an intended $300M transfer into roughly $300 trillion in PYUSD, burned about 22 minutes later; per Halborn, supply was controlled by a single externally owned account with unlimited mint privileges and no multi-signature wallet or built-in controls. See also CNBC (Oct. 16, 2025).', href: SRC.pyusdHalborn },
  { n: 2, text: 'BlockSec, “Drift Protocol Incident” — on Apr. 1, 2026 (UTC) attackers phished two of five signers on a 2-of-5, zero-timelock governance multisig and exploited Solana “durable nonces” to drain approximately $285.3 million.', href: SRC.drift },
  { n: 3, text: 'CoinDesk, “Tether Accidentally Minted $5 Billion of Its Stablecoins, Then Deleted Them” (July 16, 2019) — a token-decimal error during a chain swap created $5B USDT, subsequently burned to the intended value.', href: SRC.tether },
  { n: 4, text: 'PAID Network attack postmortem (attack Mar. 5, 2021; postmortem published Mar. 7, 2021) — a compromised deployer key with authority over the contract’s upgrade function let an attacker replace the token and mint at will.', href: SRC.paid },
  { n: 5, text: 'The Block, “Court-ordered Circle freeze traps $12.6 million in Zama cUSDC contract” (May 2026) — pursuant to a temporary restraining order, Circle blacklisted a shared pooled “confidential USDC” contract (~12,606,386 USDC), locking every depositor including uninvolved users; a court lifted the freeze on June 1, 2026 as unwarranted.', href: SRC.zama },
  { n: 6, text: 'ERC-3643 (T-REX) standard, EIP-3643 — Owner (ERC-173) and Agent roles hold mint, forced-transfer, and recovery powers; the standard recommends but does not require those roles to be a multisig or contract, permitting ordinary externally owned accounts.', href: SRC.erc3643 },
  { n: 7, text: 'QuillAudits, “ERC-3643 Explained” — flags the centralization risk: “if these agent keys are compromised or misused, assets can be arbitrarily moved, frozen, or reassigned,” and that limiting agent roles via multisig or contract-based access control “is a necessity.”', href: SRC.erc3643Audit },
  { n: 8, text: 'Securitize DSToken (securitize-io/dstoken) — exposes a role-gated seize(address,address,uint256,string) that forcibly transfers tokens to a designated issuer wallet, deployed behind an upgradeable OpenZeppelin ERC-1967 proxy whose implementation an administrator can replace.', href: SRC.dstoken },
  { n: 9, text: 'SEC staff statement on tokenized securities (Jan. 28, 2026), Divisions of Corporation Finance, Investment Management, and Trading & Markets — federal securities laws apply regardless of whether a security is tokenized; the statement grants no relief and creates no new framework.', href: SRC.secTokenized },
  { n: 10, text: 'Commissioner Hester M. Peirce, “Enchanting, but Not Magical: A Statement on the Tokenization of Securities” (July 9, 2025) — tokenization does not transform the nature of the underlying asset; tokenized securities remain securities subject to the federal securities laws.', href: SRC.peirce },
  { n: 11, text: 'AICPA, “Updates Criteria for Stablecoin Reporting to Address Controls Over Stablecoin Operations” (Jan. 12, 2026) — a framework for controls over issuance, redemption, asset custody, and vendor management; the nearest published analog for controls over token operations.', href: SRC.aicpa },
  { n: 12, text: 'GENIUS Act, Pub. L. No. 119-27 (2025), § 17 — amends the federal securities and commodities laws so that a payment stablecoin issued by a permitted issuer is not a “security” or “commodity”; the Act regulates payment stablecoins, not securities, so tokenized securities have no GENIUS-equivalent mandate.', href: SRC.geniusText },
  { n: 13, text: 'Regulation (EU) 2023/1114 (MiCA), Art. 2 — does not apply to crypto-assets that qualify as financial instruments under MiFID II; tokenized securities remain under the existing EU financial-services regime, not MiCA.', href: SRC.mica },
  { n: 14, text: 'Lit Protocol, “Introducing Lit Protocol v3 (Chipotle)” — TEE-based execution, on-chain key orchestration, and hardware attestation.', href: SRC.chipotle },
  { n: 15, text: 'Lit Protocol developer documentation — on-chain permissions on Base and the On-Chain KMS: root-key release is gated by smart contracts on Base, with every configuration change a public, auditable transaction on Basescan.', href: SRC.onchainKms },
  { n: 16, text: '“Proof of Cloud: Data Center Execution Assurance for Confidential VMs,” arXiv:2510.12469 — extends hardware attestation to prove an enclave runs in vetted infrastructure.', href: SRC.pocPaper },
];

const TABLE1: { ob: ReactNode; cap: ReactNode }[] = [
  { ob: <>Mint<Fn n={1} /></>, cap: <>A supply cap and sanity-bound invariants live in code; no signature is produced if a mint would exceed the on-chain cap. The PYUSD ~$300-trillion class becomes impossible, not monitored.</> },
  { ob: <>Burn / redeem</>, cap: 'Condition-gated and governance-bound; each burn is an attested record.' },
  { ob: <>Freeze / block</>, cap: 'A sanctions and eligibility screen runs inside the enclave; the signature is withheld on a hit, and the block is itself an attested record — without publishing the holder or amount on-chain.' },
  { ob: <>Seize</>, cap: 'Executes only on a verified, governance-bound lawful order; attested, with no discretionary operator path.' },
  { ob: <>Reissue / recover</>, cap: 'Bound to verified loss or order conditions; attested; cannot be triggered outside policy.' },
];

const TABLE2: { who: string; claim: ReactNode }[] = [
  { who: 'Securities regulator / examiner', claim: <>Privileged operations occur only within policy, across every chain the asset touches, with evidence of each action and each refusal — even though no statute yet mandates the mechanism.<Fn n={9} /></> },
  { who: 'Internal audit & SOC 2', claim: <>Segregation of duties enforced cryptographically; a complete, tamper-evident trail; control effectiveness demonstrated continuously, not sampled — against COSO and SOC 2, with the AICPA’s 2026 controls-over-stablecoin-operations criteria as the nearest published analog.<Fn n={11} /></> },
  { who: 'Board & risk committee', claim: 'No key-person or operator single point of failure; policy changeable only by governance; the PYUSD and Drift failure class is removed, not monitored.' },
  { who: 'Counterparties, LPs & investors', claim: 'A non-custodial guarantee that is cryptographically verifiable, rather than asserted.' },
];

const FLOW = [
  { n: '01', t: 'Authorize against the chain', s: 'The enclave reads the on-chain permission contracts: is the caller allowed, and is this policy bound to this key?' },
  { n: '02', t: 'Fetch the immutable policy', s: 'It loads the exact policy by content identifier — content-addressed, so the code cannot have been substituted.' },
  { n: '03', t: 'Enforce', s: 'The policy runs in a sandbox: sanctions and eligibility screen, supply cap, lawful-order check, limits. If any check fails, no signature is produced.' },
  { n: '04', t: 'Sign, without exposing the key', s: 'Only on success does the enclave use the key. The key never leaves the hardware; the decision — and any refusal — is attested.' },
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
  const [active, setActive] = useState<string>('single-point');

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
            Provable Control
          </h1>
          <p className="mt-5 max-w-[46ch] text-[clamp(1.1rem,2vw,1.4rem)] leading-snug text-white/70">
            Code-enforced authority for the privileged keys behind tokenized real-world assets.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-white/55">
            <span>Mint · burn · freeze · seize — those keys are the single point of failure.</span>
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
            <a href="/stablecoins" className="font-mono text-xs text-white/55 underline-offset-4 transition hover:text-gold-500 hover:underline">
              Issuing a payment stablecoin under the GENIUS Act? See /stablecoins →
            </a>
          </div>
        </Container>
      </header>

      <Container size="lg" className="!py-16 md:!py-20">
        {/* ABSTRACT */}
        <div className="mx-auto max-w-[44rem] rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-lit-orange">Abstract</div>
          <p className="text-[1.05rem] leading-[1.75] text-white/80">
            Tokenized real-world assets — treasuries, funds, private credit, securities — are controlled by privileged keys: the authority to mint, burn, freeze, seize, and reissue. Today that authority sits in an administrative account, a multisig, or a custodial operator’s mutable policy — a single point of failure that a person can misuse, be coerced into using, be subpoenaed against, or trigger by accident, and whose failures surface only after they settle. The roughly $300 trillion that Paxos accidentally minted in October 2025,<Fn n={1} /> and the ~$285 million drained from Drift through a phished multisig in April 2026,<Fn n={2} /> are not edge cases; they are the failure mode. Unlike payment stablecoins, no statute mandates a remedy for tokenized securities<Fn n={12} /><Fn n={13} /> — the forcing function is risk, not a deadline. This paper sets out a control architecture in which privileged-key authority is generated and used only inside sealed hardware, bound to immutable on-chain policy, and attested on every action and every refusal. The authority cannot be exercised outside its policy — by an operator, an intruder, or an error — and every use, and every refusal, leaves a verifiable record. Control becomes something an issuer or transfer agent can <Lead>prove</Lead> rather than promise.
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
            <section id="sec-single-point" className="scroll-mt-24">
              <SectionHead n="1" id="single-point" title="The single point of failure" />
              <P>
                Every tokenized asset depends on privileged keys. Someone must be able to mint new units against new backing, burn on redemption, freeze a sanctioned holder, and — under a lawful order — seize or reissue. Those powers are legitimate and necessary. The open question is who, or what, holds them, and what constrains their use.
              </P>
              <P>
                Today the answer is an ordinary administrative key, and the failures are on the record. On October 15, 2025, Paxos — the regulated issuer of PayPal’s PYUSD — accidentally minted roughly $300 trillion in PYUSD when a typo turned an intended $300 million transfer into $300 trillion; the excess was burned about 22 minutes later. According to security firm Halborn, PYUSD’s supply was controlled by a single externally owned account with unlimited mint privileges, without a multi-signature wallet or built-in controls.<Fn n={1} />
              </P>
              <P>
                It is not an isolated error. In April 2026, attackers phished two of five signers on Drift’s governance multisig — a 2-of-5, zero-timelock configuration — and exploited Solana “durable nonces” to drain roughly $285 million.<Fn n={2} /> In 2019, Tether accidentally minted $5 billion in USDT through a token-decimal error before reversing it.<Fn n={3} /> In March 2021, a compromised deployer key with authority over PAID Network’s contract upgrade let an attacker replace the token and mint at will.<Fn n={4} /> Different assets, different mechanisms, one root cause: a privileged key that a single party holds, and that the contract simply trusts.
              </P>
              <P>
                Payment stablecoins now have a dated mandate to address this — the GENIUS Act. Tokenized securities do not: GENIUS regulates payment stablecoins, not securities,<Fn n={12} /> and the EU’s MiCA excludes financial instruments.<Fn n={13} /> No statute prescribes the mechanism. But securities laws apply regardless of an asset’s format — the SEC’s staff has been explicit that tokenization changes the plumbing, not the regulatory perimeter<Fn n={9} /> — and the operational risk above is realized, repeatedly. The forcing function is risk, and the standard a board and an auditor already apply.
              </P>
            </section>

            {/* 2 */}
            <section id="sec-problem" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="2" id="problem" title="Control by promise" />
              <P>
                Most tokenized-asset programs meet a control requirement the way the industry always has: a privileged role on the token contract, held by an issuer, transfer agent, or custodian, plus a written policy describing how it will be used. The asset’s holders, the issuer’s board, and any examiner are then asked to trust that the key is held securely, used only as the policy says, and that misuse would be caught — each verified after the fact, by sampling logs.
              </P>
              <P>
                The dominant tokenization standard builds this in. ERC-3643 (T-REX) vests privileged Owner and Agent roles with the power to mint, force transfers, and recover wallets; the standard recommends, but does not require, that those roles be decentralized — they may be ordinary accounts or multisigs the contract trusts.<Fn n={6} /> Its own reviewers flag the risk: if the agent keys “are compromised or misused, assets can be arbitrarily moved, frozen, or reassigned.”<Fn n={7} /> Securitize’s widely deployed DSToken exposes a discretionary, role-gated <code className="rounded bg-white/[0.06] px-1 py-0.5 font-mono text-[0.85em]">seize()</code> — a forced transfer to a designated issuer wallet — behind an upgradeable proxy whose implementation an administrator can replace.<Fn n={8} /> Custodial policy engines add a further layer of trust: they enforce rules a workspace owner can edit, and you trust the operator that the enclave runs the code it claims.
              </P>
              <P>This model is <Lead>promissory and post-hoc</Lead>, and weak by the standard of any serious control framework:</P>
              <ul className="mt-4 space-y-3">
                {[
                  ['It depends on a person.', 'A key one administrator can use is a key one administrator can misuse, be compelled to use, or use by mistake — and a single point of compromise.'],
                  ['It does not travel.', 'A control on one chain does not reach the same asset bridged to another.'],
                  ['It does not reach far enough.', 'A contract-level role cannot stop a self-custodied wallet, a smart contract, or an autonomous agent from initiating a non-compliant transfer.'],
                  ['It can fail onto innocents.', <>In May 2026, a court-ordered freeze forced Circle to blacklist a shared pooled USDC contract, locking roughly $12.6 million belonging to every depositor — including users with no connection to the dispute; a court reversed it days later as unwarranted.<Fn n={5} /> The operator complied correctly. Innocent parties still lost access.</>],
                ].map(([h, b], i) => (
                  <li key={i} className="relative pl-6 text-[1.02rem] leading-[1.7] text-white/70">
                    <span className="absolute left-0 top-[0.6rem] h-1.5 w-1.5 rounded-full bg-lit-orange-700" />
                    <Lead>{h}</Lead> {b}
                  </li>
                ))}
              </ul>
              <P>
                A securities regulator and an internal auditor share the same concern. A control a single party can circumvent, that produces no tamper-evident record, and whose effectiveness can only be sampled is weak under COSO, SOC 2, and SOX alike.
              </P>
            </section>

            {/* 3 */}
            <section id="sec-shift" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="3" id="shift" title="Verifiable control" />
              <P>The alternative is to verify the system rather than trust the holder. Four properties make a privileged key impossible to exercise outside its policy:</P>
              <ul className="mt-4 space-y-3">
                {[
                  ['Blind.', <>The privileged signing key is generated and used only inside a sealed trusted execution environment (TEE). No operator, host, or vendor — Lit included — can see or extract it.<Fn n={14} /><Fn n={15} /></>],
                  ['Bound.', <>The key’s authority is not an administrative setting but on-chain state on Base: it signs only what an immutable, content-addressed policy permits. Changing what it can do is an on-chain governance action, not an admin switch.<Fn n={15} /></>],
                  ['Verifiable.', <>Every action the key takes, and every transfer it refuses, is a hardware-attested record — provable to a regulator or auditor, asserted by no single operator.<Fn n={16} /></>],
                  ['Confidential.', 'The same enclave screens the holder and amount in the clear only to enforce policy; investor identities, balances, and the counterparty graph never touch the public chain. An issuer screens against sanctions and eligibility without publishing its book to the world.'],
                ].map(([h, b], i) => (
                  <li key={i} className="relative pl-6 text-[1.02rem] leading-[1.7] text-white/80">
                    <span className="absolute left-0 top-[0.55rem] font-mono text-lit-orange">◆</span>
                    <Lead>{h}</Lead> {b}
                  </li>
                ))}
              </ul>
              <P>
                Together they relocate the privileged key out of human hands: no administrator, intruder, or error can sign around the control, and the screen runs without putting investor activity on-chain. That is what <Lead>impossible to misuse outside its policy</Lead> means here; §6 makes it precise.
              </P>
            </section>

            {/* 4 */}
            <section id="sec-powers" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="4" id="powers" title="Privileged power, enforced at signing" />
              <P>Each privileged power becomes a capability enforced at the moment of signing, rather than a discretion asserted in a policy.</P>
              <figure className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full border-collapse text-left align-top">
                  <thead>
                    <tr className="bg-white/[0.03] font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/40">
                      <th className="w-1/4 p-4 font-normal">Privileged power</th>
                      <th className="p-4 font-normal">Enforced at signing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE1.map((r, i) => (
                      <tr key={i} className="border-t border-white/10 align-top">
                        <td className="whitespace-nowrap p-4 text-[0.95rem] font-medium text-white">{r.ob}</td>
                        <td className="p-4 text-[0.92rem] leading-relaxed text-white/65">{r.cap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
              <figcaption className="mt-3 font-mono text-[0.72rem] text-white/35">Table 1 — Privileged powers mapped to controls enforced at signing.</figcaption>
            </section>

            {/* 5 */}
            <section id="sec-proof" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="5" id="proof" title="What an issuer can prove" />
              <P>One architecture, demonstrable to four different audiences.</P>
              <figure className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full border-collapse text-left align-top">
                  <thead>
                    <tr className="bg-white/[0.03] font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/40">
                      <th className="w-1/3 p-4 font-normal">Audience</th>
                      <th className="p-4 font-normal">What an issuer or transfer agent can prove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE2.map((r, i) => (
                      <tr key={i} className="border-t border-white/10 align-top">
                        <td className="p-4 text-[0.95rem] font-medium text-white">{r.who}</td>
                        <td className="p-4 text-[0.92rem] leading-relaxed text-white/65">{r.claim}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
              <figcaption className="mt-3 font-mono text-[0.72rem] text-white/35">Table 2 — Guarantees demonstrable to each audience.</figcaption>
            </section>

            {/* 6 */}
            <section id="sec-architecture" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="6" id="architecture" title="The architecture" />
              <P>Three layers implement the properties. Each is independently inspectable.</P>
              <P>
                <Lead>Blind execution.</Lead> Lit Actions — the policies — run inside trusted execution environments, where the signing key is derived and used. The network connection terminates inside the enclave, so there is no point at which key material is exposed; nothing that touches it leaves.<Fn n={14} /><Fn n={15} />
              </P>
              <P>
                <Lead>Bound to the chain.</Lead> A key’s authority is on-chain state on Base: permission contracts bind each key to the exact, content-addressed policies it may run. Changing what a key can do means changing on-chain state under the issuer’s own governance — recorded, and auditable on Basescan — not flipping an administrative switch.<Fn n={15} />
              </P>
              <P>
                <Lead>Verifiable hardware.</Lead> Each enclave emits a hardware attestation: a signed, deterministic measurement of the exact code running inside. The Proof of Cloud approach extends that attestation to prove the machine runs in vetted infrastructure rather than on an attacker’s bench — closing the physical side-channel gap.<Fn n={16} />
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
              <figcaption className="mt-3 font-mono text-[0.72rem] text-white/35">Figure 1 — The lifecycle of a single privileged signing request inside the enclave.</figcaption>
              <P>
                <Lead>A note on trust.</Lead> No system eliminates trust; it relocates trust to assumptions that can be independently verified. Here those are the silicon vendor’s hardware root of trust and the on-chain governance that sets policy — both externally attestable, the former hardened by Proof of Cloud, the latter auditable on Basescan.<Fn n={15} /> There is no trusted operator.
              </P>
            </section>

            {/* 7 */}
            <section id="sec-scope" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="7" id="scope" title="Honest scope" />
              <P>
                The defensible claim is a pair of properties in combination, and it is worth stating plainly what this does and does not do. The moat is privileged-key authority <Lead>bound to immutable, content-addressed policy</Lead> — not a mutable configuration — and <Lead>externally provable</Lead> through attestation of every action and every refusal, with no operator to trust. Policy-in-a-TEE, non-custodial signing, and hardware attestation each exist elsewhere; the combination — immutable on-chain policy plus decentralized, externally verifiable attestation — is what removes the privileged-key single point of failure rather than relocating it.
              </P>
              <P>
                What this is <Lead>not</Lead>: a regulatory mandate. No statute requires this mechanism for tokenized securities. Securities laws apply regardless of an asset’s format — a tokenized security is still a security, and tokenization changes the plumbing, not the regulatory perimeter<Fn n={9} /><Fn n={10} /> — but the driver here is operational risk and internal-control rigor, not a deadline. This architecture is a control; it is not legal advice and creates no legal obligation.
              </P>
            </section>

            {/* 8 */}
            <section id="sec-implementation" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="8" id="implementation" title="Implementation" />
              <P>
                Demonstrable capability is reached fastest by starting narrow. A reference implementation can enforce sanctions-screened, supply-capped minting plus a governance-bound seize and freeze on a single asset and a single chain, prove it end-to-end, then extend across the other chains the asset touches. The architecture is cross-chain by design; starting on one chain proves the control, not a retreat from it. The goal is a control an examiner and an auditor can verify — not a finished platform.
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
                Informational only — not legal advice. Tokenized securities remain subject to existing securities laws regardless of format; see the SEC staff statement on tokenized securities (Jan. 28, 2026). No statement here creates a legal obligation or describes a regulatory mandate. Incident figures are drawn from the cited third-party reports and reflect those sources. Architecture described is current to Lit Protocol v3 and subject to change. Consult qualified counsel before relying on any statement here.
              </p>
            </section>
          </article>
        </div>
      </Container>
    </div>
  );
}
