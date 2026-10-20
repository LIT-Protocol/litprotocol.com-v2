'use client';

import { Container } from '@mantine/core';
import { IconArrowNarrowRight, IconExternalLink } from '@tabler/icons-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { DOCS_LINK, MICA_LINK } from '@/utils/constants';
import { BASE_ADDR, SRC, basescan } from './citations';

/* ---------------- references ---------------- */

// Reference text, keyed so footnotes can be cited by name. Numbers come from
// REF_ORDER below (order of first appearance in the rendered paper).
const REF = {
  docsHome: { href: SRC.docsHome, text: 'Lit Protocol developer documentation — overview: one programmable runtime that reads data from any source, runs JavaScript inside a chain-secured TEE, and signs on any chain or API.' },
  v3Live: { href: SRC.v3Live, text: 'Lit Protocol, “Lit V3 Is Live: Confidential Compute and Key Management in One API” (Apr. 1, 2026).' },
  aiDeployments: { href: SRC.aiDeployments, text: 'Lit Protocol, “Lit Protocol now supports confidential, verifiable AI deployments” (Sept. 16, 2026) — training, fine-tuning, and inference in the Chipotle runtime; states that the network secures over $50B in transactions.' },
  mpcWhitepaper: { href: SRC.mpcWhitepaper, text: 'Lit Protocol, “$LITKEY Whitepaper” — the threshold-MPC network: distributed key generation and threshold signing across TEE nodes, the Lit Chain (an Arbitrum Orbit rollup), staking and slashing, and the original token design.' },
  v3Intro: { href: SRC.v3Intro, text: 'Lit Protocol, “Introducing Lit Protocol v3 — Chipotle” (Feb. 26, 2026) — execution decoupled from the KMS, on-chain key orchestration, the move from threshold cryptography to verifiable TEE execution, and the initial roadmap.' },
  pressRelease: { href: SRC.pressRelease, text: 'Lit Protocol, “Lit Protocol Launches Chipotle: Programmable Key Management and Verifiable Compute in a Single API Call” (Mar. 31, 2026).' },
  nagaSunset: { href: SRC.nagaSunset, text: 'Lit Protocol, “Naga Network Sunset & Lit v3 Transition” (Mar. 5, 2026) — the network stops on Mar. 25 and Naga fully sunsets on Apr. 1, 2026; timelocks removed for delegated stakers.' },
  pricing: { href: SRC.pricing, text: 'Lit developer documentation — Pricing: credit-based billing, metered operations, credit packages, payment rails, and billing in ChainSecured mode.' },
  litkeyDocs: { href: SRC.litkeyDocs, text: 'Lit developer documentation — LITKEY: buying credits on Base at a 25% discount, the canonical Base token address, and bridging via Hyperlane Nexus.' },
  chainSecured: { href: SRC.chainSecured, text: 'Lit developer documentation — Chain Secured: a key’s authority is on-chain state on Base, enforced by an attested TEE that reads the chain.' },
  litActions: { href: SRC.litActions, text: 'Lit developer documentation — Lit Actions overview: immutable programs identified by CID, PKP and action identity keys, and in-sandbox permission checks.' },
  architecture: { href: SRC.architecture, text: 'Lit developer documentation — Architecture overview: the TEE enclave, on-chain permissions on Base, and Lit Actions; API mode and ChainSecured mode.' },
  attestation: { href: SRC.attestation, text: 'Lit developer documentation — What Is Attestation?: Intel TDX, measured-boot registers, attestation quotes, and the checks a client performs.' },
  upgradeGovernance: { href: SRC.upgradeGovernance, text: 'Lit developer documentation — Upgrade Governance: two independent actions per release, the 2-of-4 Safe, what signers verify, rollback, and self-hosted governance.' },
  verification: { href: SRC.verification, text: 'Lit developer documentation — Security & Verification: zero-trust TLS, attestation verification, and the chain of trust.' },
  selfHosting: { href: SRC.selfHosting, text: 'Lit developer documentation — Self-Hosting: open-source repositories, supported dstack platforms, tradeoffs, and governing upgrades yourself.' },
  chainOfTrust: { href: SRC.chainOfTrust, text: 'Lit developer documentation — Chain of Trust Reference: application, platform, network, and governance checks.' },
  imports: { href: SRC.imports, text: 'Lit developer documentation — Module Imports: pinned jsDelivr ES modules verified by SHA-384 before execution inside the Deno/V8 sandbox.' },
  limits: { href: SRC.limits, text: 'Lit developer documentation — Limits: default payload, execution-time, memory, network, and key-request limits for Lit Actions.' },
  onchainKms: { href: SRC.onchainKms, text: 'Lit developer documentation — On-Chain KMS: the DstackApp and Phala KMS contracts on Base, the four key-release checks, and how to confirm each with cast.' },
  phalaOnchainKms: { href: SRC.phalaOnchainKms, text: 'Phala Network documentation — Understanding On-Chain KMS.' },
  keyIssuance: { href: SRC.keyIssuance, text: 'LIT-Protocol/chipotle — “Key Issuance from DeRoT (Onchain KMS)”: the boot-time key-issuance sequence and deterministic key derivation.' },
  derot: { href: SRC.derot, text: 'Phala Network documentation — dstack design: Decentralized Root of Trust; applications obtain the same derived keys regardless of the TEE hardware they run on.' },
  eip2535: { href: SRC.eip2535, text: 'EIP-2535, “Diamonds, Multi-Facet Proxy” — the upgradeable contract pattern used by the Chipotle permissions contract.' },
  gatewayContract: { href: SRC.gatewayContract, text: 'LIT-Protocol/chipotle — LitkeyPaymentGateway.sol: an immutable, stateless contract that forwards LITKEY to the treasury and emits a Payment event.' },
  accountModes: { href: SRC.accountModes, text: 'Lit developer documentation — API Mode vs ChainSecured Mode: account ownership models and migration between them.' },
  authModel: { href: SRC.authModel, text: 'Lit developer documentation — Authentication Model: entities, the seven API-key scopes, and the permission matrix.' },
  groups: { href: SRC.groups, text: 'Lit developer documentation — Groups: binding wallets, permitted action CIDs, and usage keys.' },
  triggers: { href: SRC.triggers, text: 'Lit developer documentation — Lit Triggers: running actions on webhooks, schedules, and EVM chain events.' },
  quickVerify: { href: SRC.quickVerify, text: 'Lit developer documentation — Verify in 30 Seconds: the Phala Trust Center report for the live API.' },
  fullVerification: { href: SRC.fullVerification, text: 'Lit developer documentation — Full Verification Guide: replaying the RTMR3 event log and checking every layer.' },
  security: { href: SRC.security, text: 'Lit Protocol, “Security & verification” — software identity, wallet authority, runtime governance, and the limits of attestation.' },
  paymentsService: { href: SRC.paymentsService, text: 'LIT-Protocol/chipotle — lit-payments: the LITKEY quote, payment page, and receipt-verified, idempotent crediting.' },
  tokenomics: { href: SRC.tokenomics, text: 'Lit Protocol, “$LITKEY Tokenomics” (Oct. 23, 2025) — token parameters, distribution, and vesting.' },
  litkeyLive: { href: SRC.litkeyLive, text: 'Lit Protocol, “$LITKEY is Live” (Oct. 30, 2025) — launch on Aerodrome on Base, airdrop claiming and staking, and the staking contest to select the genesis validator set.' },
  association: { href: SRC.association, text: 'Lit Protocol, “Introducing the Lit Association and Onchain Governance” (Oct. 21, 2025) — the Lit Association, a Swiss non-profit association; the governance domains; and the Lit Improvement Proposal (LIP) process.' },
  repo: { href: SRC.repo, text: 'LIT-Protocol/chipotle — source for the API server, Lit Actions runtime, dashboard, contracts, examples, and local development tooling.' },
  dstack: { href: SRC.dstack, text: 'Dstack-TEE/dstack — the open-source TEE stack Chipotle deploys on, and its supported platforms.' },
} satisfies Record<string, { href: string; text: string }>;

type RefKey = keyof typeof REF;

// Order of first appearance in the rendered document. Footnote numbers derive
// from this list; keep it in reading order when editing the paper.
const REF_ORDER: RefKey[] = [
  'docsHome',
  'v3Live',
  'aiDeployments',
  'mpcWhitepaper',
  'v3Intro',
  'pressRelease',
  'nagaSunset',
  'pricing',
  'litkeyDocs',
  'chainSecured',
  'litActions',
  'architecture',
  'upgradeGovernance',
  'verification',
  'selfHosting',
  'attestation',
  'chainOfTrust',
  'imports',
  'limits',
  'onchainKms',
  'phalaOnchainKms',
  'keyIssuance',
  'derot',
  'eip2535',
  'gatewayContract',
  'accountModes',
  'authModel',
  'groups',
  'triggers',
  'quickVerify',
  'fullVerification',
  'security',
  'paymentsService',
  'tokenomics',
  'litkeyLive',
  'association',
  'repo',
  'dstack',
];

const refNo = (k: RefKey) => REF_ORDER.indexOf(k) + 1;

// Defined before the data tables below, which reference it (const is not hoisted — TDZ).
const Fn = ({ k }: { k: RefKey }) => (
  <sup className="ml-px">
    <a href={`#ref-${refNo(k)}`} className="font-mono text-[0.6em] text-lit-orange transition-colors hover:text-gold-500">
      [{refNo(k)}]
    </a>
  </sup>
);

const Code = ({ children }: { children: ReactNode }) => (
  <code className="rounded bg-white/[0.06] px-1 py-0.5 font-mono text-[0.85em] text-white/85">{children}</code>
);

const short = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;

const Addr = ({ a }: { a: string }) => (
  <a
    href={basescan(a)}
    target="_blank"
    rel="noopener noreferrer"
    title={a}
    className="whitespace-nowrap font-mono text-[0.85em] text-lit-orange transition-colors hover:text-gold-500"
  >
    {short(a)}
  </a>
);

/* ---------------- structure ---------------- */

const SECTIONS = [
  { id: 'background', n: '1', title: 'Background' },
  { id: 'principles', n: '2', title: 'Design: Chain Secured' },
  { id: 'architecture', n: '3', title: 'Architecture' },
  { id: 'security', n: '4', title: 'Security model' },
  { id: 'economics', n: '5', title: 'Pricing and payments' },
  { id: 'litkey', n: '6', title: 'The LITKEY token' },
  { id: 'governance', n: '7', title: 'Governance' },
  { id: 'deployment', n: '8', title: 'Deployment and self-hosting' },
  { id: 'roadmap', n: '9', title: 'Roadmap' },
  { id: 'references', n: '10', title: 'References' },
];

/* ---------------- data ---------------- */

const COMPARE: { row: string; mpc: ReactNode; v3: ReactNode }[] = [
  { row: 'Key custody', mpc: 'Key shares split across nodes; two-thirds of the network must cooperate to sign or decrypt', v3: 'Root key held inside attested TEEs and released by an on-chain KMS only to approved software' },
  { row: 'Execution', mpc: 'Coordinated across TEE nodes for every operation', v3: 'One enclave per request; execution decoupled from key management' },
  { row: 'Coordination layer', mpc: 'The Lit Chain, an Arbitrum Orbit rollup', v3: 'Smart contracts on Base' },
  { row: 'Client', mpc: 'JavaScript SDK with client-side cryptography and node-coordination logic', v3: 'REST API authenticated with an API key; a JS SDK, or a client generated from the OpenAPI spec, is optional' },
  { row: 'Permissions', mpc: 'Keys and their permissions registered on the Lit Chain', v3: 'Contracts on Base: groups binding wallets to permitted action CIDs, plus scoped API keys' },
  { row: 'Economic security', mpc: 'Node operators stake LITKEY; slashing deters misconduct', v3: 'No staked operator set; attestation-gated key release and public, multisig release approval' },
  { row: 'Pricing', mpc: 'Signing, encryption, and compute paid for in LITKEY', v3: <>USD credits at $0.01 per second; LITKEY accepted at a 25% discount<Fn k="pricing" /><Fn k="litkeyDocs" /></> },
];

const FLOW = [
  { n: '01', t: 'Identify the code', s: 'The server hashes the submitted source to its CID. The CID, not a name or a version label, is what permissions refer to.' },
  { n: '02', t: 'Authorize against the chain', s: 'The enclave reads Base: does this API key hold execute scope on a group that contains this CID? If not, the code does not run.' },
  { n: '03', t: 'Run the policy', s: 'The action runs in the sandbox, fetching data, checking conditions, and deciding. Every key, encrypt, and decrypt call is checked again: the named wallet must share a group with the running CID.' },
  { n: '04', t: 'Sign or refuse', s: 'The enclave derives the key and signs only if every check passes. What leaves the enclave is the action’s result, such as a signature.' },
];

const CONTRACTS: { name: string; addr: string; owner: ReactNode; role: ReactNode }[] = [
  { name: 'DstackApp (Lit Chipotle)', addr: BASE_ADDR.dstackApp, owner: <>Lit Safe <Addr a={BASE_ADDR.litSafe} />, 2-of-4</>, role: <>Whitelists the application releases (compose hashes) and hardware devices allowed to receive keys<Fn k="onchainKms" /><Fn k="upgradeGovernance" /></> },
  { name: 'Phala KMS', addr: BASE_ADDR.phalaKms, owner: <>Phala Safe <Addr a={BASE_ADDR.phalaSafe} />, 2-of-3</>, role: <>Whitelists dstack OS images and KMS instances; shared across dstack applications<Fn k="onchainKms" /></> },
  { name: 'AccountConfig', addr: BASE_ADDR.accountConfig, owner: <>Lit Safe <Addr a={BASE_ADDR.litSafe} />, 2-of-4</>, role: <>Accounts, API-key scopes, wallet (PKP) registry, and groups; an upgradeable EIP-2535 diamond<Fn k="chainOfTrust" /><Fn k="eip2535" /></> },
  { name: 'LitkeyPaymentGateway', addr: BASE_ADDR.gateway, owner: 'None — immutable', role: <>Forwards LITKEY paid for services to the treasury and emits a Payment event<Fn k="gatewayContract" /></> },
  { name: 'Treasury', addr: BASE_ADDR.treasury, owner: 'Safe, 2-of-3', role: 'Receives LITKEY paid through the gateway' },
];

const DEFENSE: [string, ReactNode][] = [
  ['Hardware isolation.', <>Memory inside the TEE is encrypted by the CPU, and secrets generated there, such as the TLS private key, have no API through which they can be extracted.<Fn k="attestation" /></>],
  ['Remote attestation.', <>A hardware-signed quote records the firmware, operating system, and application that booted. Anyone can recompute the expected values from public source.<Fn k="attestation" /><Fn k="chainOfTrust" /></>],
  ['On-chain key release.', <>The KMS releases keys only to software whose measurements are whitelisted in contracts on Base. No whitelist, no keys.<Fn k="onchainKms" /></>],
  ['Multisig release governance.', <>Whitelisting a release takes a 2-of-4 Safe transaction, and deploying it is a separate step. Neither alone changes what runs.<Fn k="upgradeGovernance" /></>],
  ['On-chain authorization.', <>Permissions are contract state that only the account owner, or a key the owner has scoped, can change, and the enclave enforces them on every request.<Fn k="chainSecured" /><Fn k="authModel" /></>],
  ['Supply-chain provenance.', <>Images are pinned by digest and signed with Sigstore cosign in GitHub Actions, with signatures in the public Rekor transparency log. Imported modules are pinned by SHA-384.<Fn k="chainOfTrust" /><Fn k="imports" /></>],
  ['Zero-trust TLS.', <>The TLS key is generated inside the enclave and bound to its attestation evidence, and CAA DNS records restrict certificate issuance to the enclave-controlled ACME account.<Fn k="chainOfTrust" /></>],
];

const TRUST_LAYERS: { layer: string; checked: string; proves: string }[] = [
  { layer: 'Application', checked: 'Compose hash recorded in RTMR3; @sha256 image digests; Sigstore signatures; RTMR3 event-log replay', proves: 'The enclave runs the declared configuration, built by GitHub Actions from the public repository' },
  { layer: 'Platform', checked: 'Intel’s signature on the TDX quote; MRTD and RTMR0–2 against a known dstack release; the KMS identity in RTMR3', proves: 'Genuine TDX hardware booted a whitelisted OS and is bound to the trusted KMS' },
  { layer: 'Network', checked: 'Evidence files whose checksum is embedded in the quote; the live TLS certificate’s fingerprint; CAA DNS records', proves: 'The TLS session terminates inside the attested enclave' },
  { layer: 'Governance', checked: 'DstackApp compose-hash whitelist; Phala KMS OS-image and KMS whitelists; Safe ownership of each contract', proves: 'The running release was approved on-chain by the expected multisig' },
];

const RELEASE = [
  { t: 'Build', where: 'GitHub Actions', s: 'A reviewed pull request merges to main. CI builds the image, pins it by digest, signs it with Sigstore cosign, and computes the compose hash.' },
  { t: 'Govern', where: 'Safe on Base', s: 'CI proposes addComposeHash. At least two of four signers check provenance, recompute the hash, and review the diff before approving; the transaction then executes on-chain.' },
  { t: 'Deploy', where: 'Confidential VM', s: 'The new CVM boots and requests keys. The KMS issues them only if the compose hash is already whitelisted; otherwise the CVM cannot serve.' },
];

const ASSUMPTIONS: { a: string; covers: ReactNode; check: ReactNode }[] = [
  { a: 'Hardware root of trust', covers: 'Intel TDX and its firmware protect memory and sign attestation quotes. TEEs have known classes of side-channel research.', check: <>Check the quote’s TCB status; self-host on another dstack platform, including AMD SEV-SNP.<Fn k="attestation" /><Fn k="selfHosting" /></> },
  { a: 'Platform governance', covers: 'Phala’s 2-of-3 Safe decides which OS images and KMS instances are whitelisted.', check: <>Read <Code>allowedOsImages</Code> and <Code>kmsAllowedAggregatedMrs</Code> on Base.<Fn k="onchainKms" /></> },
  { a: 'Release governance', covers: 'Lit’s 2-of-4 Safe approves which Chipotle releases receive keys. There is no timelock.', check: <>Audit the <Code>addComposeHash</Code> history on Basescan; self-host with your own Safe or timelock as owner.<Fn k="upgradeGovernance" /></> },
  { a: 'Contract upgrades', covers: 'The AccountConfig permissions contract is an EIP-2535 diamond administered by Lit’s Safe, so that Safe can upgrade its logic.', check: <>Review owner changes and DiamondCut events on Basescan alongside release approvals.<Fn k="chainOfTrust" /><Fn k="eip2535" /></> },
  { a: 'Account ownership', covers: 'In API mode, a Lit-managed credential owns the account and relays its writes.', check: <>Use ChainSecured mode with your own EOA or Safe as owner.<Fn k="accountModes" /></> },
  { a: 'Application correctness', covers: 'Attestation identifies software. It does not prove that an action’s logic, its external data, or a model’s responses are correct, and code can return or send anything its permissions allow.', check: <>Review the action source, its data sources, and its permitted requests, responses, and logs.<Fn k="security" /></> },
  { a: 'Availability', covers: 'Lit operates the hosted service. Verification does not guarantee availability.', check: <>Self-host for independently managed uptime.<Fn k="selfHosting" /><Fn k="security" /></> },
];

const PRICES: { op: string; cost: string }[] = [
  { op: 'Read-only calls (groups, wallets, actions, keys, balance)', cost: 'Free' },
  { op: 'Management call (create or change a group, wallet, action, or usage key)', cost: '$0.01 per second; effectively one second per call' },
  { op: 'Lit Action execution', cost: '$0.01 per second' },
  { op: 'Standard ECDSA signature (typically under a second)', cost: 'Effectively $0.01' },
  { op: 'Credit packages', cost: '$5, $10, $25, or $50; no expiry' },
];

const SETTLE = [
  { n: '01', t: 'Quote', s: 'The payment page prices LITKEY from a public market feed and applies the discount. The quote refreshes every 30 seconds and is frozen once the payer approves an exact amount. Crediting pauses if the price is missing or stale.' },
  { n: '02', t: 'Pay', s: 'The payer calls pay(amount, wallet). In one transaction the gateway moves the approved LITKEY from the payer to the treasury and emits Payment(wallet, payer, amount).' },
  { n: '03', t: 'Credit', s: 'The payments service fetches that transaction’s receipt, verifies the gateway emitted the expected event for the named account wallet, and applies the credit idempotently.' },
];

const TOKEN: [string, ReactNode][] = [
  ['Ticker', 'LITKEY'],
  ['Standard', 'ERC-20, 18 decimals'],
  ['Fixed supply', '1,000,000,000'],
  ['Initial circulating supply', '22%'],
  ['Launch', 'October 30, 2025, on Aerodrome (Base)'],
  ['Primary chain', <>Base — <Addr a={BASE_ADDR.litkey} /></>],
  ['Other chains', 'Live on several chains; bridge to Base via Hyperlane Nexus'],
];

const DISTRIBUTION: { name: string; pct: number; note: string }[] = [
  { name: 'Founding contributors', pct: 28, note: 'Contributors who spent five years building Lit Protocol' },
  { name: 'veLITKEY builder reward pool', pct: 28, note: 'Builder incentives directed by veLITKEY holders; emissions variable and tied to network revenue' },
  { name: 'Early investors + community sale', pct: 19, note: 'Early investors in Workgraph, Inc. and participants in the Legion community sale' },
  { name: 'Lit Association', pct: 11, note: 'Operations, ecosystem growth, and progressive decentralization' },
  { name: 'Lit Protocol airdrop', pct: 10, note: 'The airdrop and other launch activities; distributed from launch to builders, node operators, and other ecosystem participants' },
  { name: 'Aerodrome incentives', pct: 4, note: 'Voter incentives on Aerodrome, including 1% for the first LITKEY/WETH epoch' },
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

function SubHead({ n, children }: { n: string; children: ReactNode }) {
  return (
    <h3 className="mt-10 flex items-baseline gap-2.5 text-[1.15rem] font-medium leading-snug tracking-tight text-white">
      <span className="font-mono text-xs text-lit-orange-700">{n}</span>
      {children}
    </h3>
  );
}

function Bullets({ items, marker = 'dot' }: { items: [ReactNode, ReactNode][]; marker?: 'dot' | 'diamond' | 'number' }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map(([h, b], i) => (
        <li key={i} className="relative pl-7 text-[1.02rem] leading-[1.7] text-white/75">
          {marker === 'diamond' ? (
            <span className="absolute left-0 top-[0.05rem] font-mono text-lit-orange">◆</span>
          ) : marker === 'number' ? (
            <span className="absolute left-0 top-[0.2rem] font-mono text-xs text-lit-orange">{String(i + 1).padStart(2, '0')}</span>
          ) : (
            <span className="absolute left-1 top-[0.6rem] h-1.5 w-1.5 rounded-full bg-lit-orange-700" />
          )}
          <Lead>{h}</Lead> {b}
        </li>
      ))}
    </ul>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-3 font-mono text-[0.72rem] leading-relaxed text-white/35">{children}</figcaption>;
}

const TH = 'p-4 font-normal';
const THEAD_ROW = 'bg-white/[0.03] font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/40';
const TD_HEAD = 'p-4 text-[0.95rem] font-medium text-white';
const TD = 'p-4 text-[0.92rem] leading-relaxed text-white/65';

function Steps({ steps, label }: { steps: { n: string; t: string; s: string }[]; label: string }) {
  return (
    <figure className="mt-7 rounded-2xl border border-dashed border-lit-orange/30 bg-[radial-gradient(120%_120%_at_50%_0,_oklch(53.51%_0.163_39.51/0.06),_transparent_60%)] px-5 pb-6 pt-9">
      <span className="-mt-12 mb-1 block font-mono text-[0.7rem] tracking-wide text-lit-orange">{label}</span>
      <div className="mt-3 grid gap-2.5">
        {steps.map((f) => (
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
  );
}

/* ---------------- document ---------------- */

export default function WhitePaper() {
  const [active, setActive] = useState<string>('background');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id.replace(/^sec-/, ''));
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
          <div className="font-mono text-xs uppercase tracking-[0.28em] text-lit-orange">Whitepaper · Lit Protocol V3</div>
          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.5rem,6.5vw,5rem)] font-medium leading-[1.0] tracking-tight">
            The Chipotle Network
          </h1>
          <p className="mt-5 max-w-[46ch] text-[clamp(1.1rem,2vw,1.4rem)] leading-snug text-white/70">
            Programmable keys and confidential compute, with authority on-chain and execution in attested hardware.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-white/55">
            <span>Version 1.0 · October 2026</span>
            <span>Succeeds the $LITKEY whitepaper for Lit’s threshold-MPC network</span>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="#sec-architecture" rightIcon={<IconArrowNarrowRight stroke={2} />}>
              Read the architecture
            </Button>
            <Button variant="outline" href={SRC.quickVerify} target="_blank" rel="noopener noreferrer">
              Verify the live network
            </Button>
          </div>
          <div className="mt-5">
            <a href={DOCS_LINK} className="font-mono text-xs text-white/55 underline-offset-4 transition hover:text-gold-500 hover:underline">
              Building on Lit? Start with the developer documentation →
            </a>
          </div>
        </Container>
      </header>

      <Container size="lg" className="!py-16 md:!py-20">
        {/* ABSTRACT */}
        <div id="abstract" className="mx-auto max-w-[44rem] scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-lit-orange">Abstract</div>
          <p className="text-[1.05rem] leading-[1.75] text-white/80">
            Lit Protocol is a key management and confidential compute network. Developers and AI agents use it to hold keys they never see, run code that decides when those keys may sign or decrypt, and prove to anyone which code made the decision. Chipotle, Lit Protocol V3, rebuilds the network around one idea: <Lead>a key’s authority is on-chain state, and an attested trusted execution environment (TEE) enforces that authority by reading the chain.</Lead>
          </p>
          <p className="mt-4 text-[1.05rem] leading-[1.75] text-white/80">
            Keys are derived and used inside hardware-isolated confidential virtual machines, from secrets that an on-chain key-management system (KMS) releases only to enclaves whose measured software matches a release that a multisig has approved, in public, on Base. Permissions — the account owner, scoped API keys, wallets, and the immutable, content-addressed programs called Lit Actions that may use them — are smart-contract state that a customer can own from their own wallet or Safe. Because enforcement is a read rather than a consensus round, each request runs in a single enclave instead of coordinating a threshold of nodes, and the network is reached through an ordinary REST API.
          </p>
          <p className="mt-4 text-[1.05rem] leading-[1.75] text-white/80">
            This paper describes Chipotle’s architecture, its security and trust model, how releases are governed and verified, how usage is priced and paid for, and the role of the LITKEY token. It succeeds the earlier LITKEY whitepaper, which described Lit’s threshold-MPC network. Where the design rests on assumptions — the hardware root of trust and the parties that approve releases — the paper names them and shows how to check them.
          </p>
        </div>

        {/* GRID: TOC + body */}
        <div className="wp-grid mt-16 lg:grid lg:grid-cols-[200px_minmax(0,44rem)] lg:justify-center lg:gap-16">
          {/* TOC */}
          <nav className="mb-10 hidden lg:block" aria-label="Contents">
            <div className="sticky top-24">
              <div className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/40">Contents</div>
              <ul className="space-y-2.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#sec-${s.id}`}
                      className={`flex gap-2.5 text-sm transition-colors ${active === s.id ? 'text-lit-orange' : 'text-white/45 hover:text-white/80'}`}
                    >
                      <span className="w-4 shrink-0 font-mono text-xs opacity-60">{s.n}</span>
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
            <section id="sec-background" className="scroll-mt-24">
              <SectionHead n="1" id="background" title="Background" />
              <SubHead n="1.1">What Lit Protocol is</SubHead>
              <P>
                Lit is one programmable runtime for everything between an event and a signed action. It reads data from any source, runs JavaScript inside a chain-secured TEE, and signs on any chain or API, with no backend to trust.<Fn k="docsHome" /> It gives developers programmable signing, encryption, and compute: keys that sign only when code allows it, secrets that only authorized code can decrypt, and results that can be attributed to the exact program that produced them.<Fn k="v3Live" /><Fn k="docsHome" />
              </P>
              <P>
                Developers use it for verifiable data feeds and custom oracles, conditional signing, cross-chain actions, encrypted secrets, and agent wallets that hold and use keys under programmatic control.<Fn k="docsHome" /><Fn k="v3Live" /> Since September 2026 the same confidential runtime also hosts AI training, fine-tuning, and inference. Lit reports that the network secures more than $50 billion in transactions.<Fn k="aiDeployments" />
              </P>

              <SubHead n="1.2">From threshold MPC to Chipotle</SubHead>
              <P>
                Lit’s earlier mainnets, Datil and Naga, split control of each key across independent node operators. Nodes ran distributed key generation and threshold signing inside TEEs, so two-thirds of the network had to cooperate to sign or decrypt. The Lit Chain, an Arbitrum Orbit rollup, registered keys and permissions, and operators staked LITKEY to take part.<Fn k="mpcWhitepaper" />
              </P>
              <P>
                Threshold cryptography gives strong decentralization guarantees, but every operation needs multi-node coordination, which brings higher latency, higher infrastructure cost, and scaling complexity inherent to the architecture.<Fn k="v3Intro" /> Chipotle keeps what made Lit useful — programmable key usage, immutable Lit Actions, the same hardened JavaScript sandbox — and changes where trust comes from. Each request runs inside one attested TEE rather than across many nodes, the Lit Actions engine is decoupled from key management, and key orchestration moves on-chain through a TEE root of trust.<Fn k="v3Intro" />
              </P>
              <P>
                Chipotle became generally available on March 31, 2026.<Fn k="pressRelease" /> The Naga network stopped on March 25, 2026 and was fully sunset on April 1. Timelocks were removed so delegated stakers could withdraw, and node operators could unstake during the final week.<Fn k="nagaSunset" /> Table 1 compares the two designs.
              </P>
              <figure className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full min-w-[34rem] border-collapse text-left align-top">
                  <thead>
                    <tr className={THEAD_ROW}>
                      <th className={`w-[22%] ${TH}`}>&nbsp;</th>
                      <th className={TH}>MPC network (Datil, Naga)</th>
                      <th className={TH}>Chipotle (V3)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE.map((r) => (
                      <tr key={r.row} className="border-t border-white/10 align-top">
                        <td className={TD_HEAD}>{r.row}</td>
                        <td className={TD}>{r.mpc}</td>
                        <td className={`${TD} text-white/80`}>{r.v3}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
              <Caption>
                Table 1 — Lit’s MPC network and Chipotle compared.<Fn k="mpcWhitepaper" /><Fn k="v3Intro" />
              </Caption>
            </section>

            {/* 2 */}
            <section id="sec-principles" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="2" id="principles" title="Design: Chain Secured" />
              <P>
                Chipotle’s core guarantee is short: <Lead>a key’s authority is on-chain state.</Lead><Fn k="chainSecured" /> What a key may sign, which code may use it, and who can change those rules live in smart contracts on Base. Nothing off-chain — no server, API key, or operator, Lit included — can make a key sign outside the rules currently on the chain. Lit calls this property Chain Secured. The on-chain parties that approve the software and contracts enforcing those rules are covered in §4. Six design principles follow.
              </P>
              <Bullets
                marker="diamond"
                items={[
                  ['Authority lives on-chain.', <>Accounts, API-key scopes, wallets, and groups are contract state, not rows in an operator’s database. Changing a rule is a public transaction authorized by the account owner.<Fn k="chainSecured" /></>],
                  ['Enforcement is a read.', <>Setting or changing a rule is a write, made only when someone configures or governs. Using a rule is a read: the enclave checks current on-chain state and signs, with no per-operation transaction, gas, or block confirmation. Authority stays on-chain while signing runs at the speed of an API call.<Fn k="chainSecured" /></>],
                  ['Code is content-addressed.', <>A Lit Action is identified by the IPFS CID of its source. Change one byte and it is a different action with different permissions.<Fn k="litActions" /></>],
                  ['Keys stay in hardware.', <>Key material is derived and used inside the TEE and never leaves the enclave through the service. Only code an owner has permitted can use a key.<Fn k="architecture" /><Fn k="litActions" /></>],
                  ['Releases are approved in public.', <>New enclave software cannot obtain keys until a multisig whitelists its measurement on Base, so no single party can push code to the production enclave on its own.<Fn k="upgradeGovernance" /></>],
                  ['Anyone can verify.', <>Attestation quotes, release whitelists, and permissions can all be checked by a third party with public tools, and the whole stack can be self-hosted and governed by its users.<Fn k="verification" /><Fn k="selfHosting" /></>],
                ]}
              />
            </section>

            {/* 3 */}
            <section id="sec-architecture" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="3" id="architecture" title="Architecture" />
              <P>
                Chipotle is built from three composable layers, each with a distinct job: a TEE enclave that holds keys and runs code, smart contracts on Base that hold authorization state, and Lit Actions that define what code may do.<Fn k="architecture" />
              </P>

              <SubHead n="3.1">Confidential execution</SubHead>
              <P>
                The hosted network runs as a confidential virtual machine (CVM) on Intel TDX, deployed with dstack on Phala Cloud.<Fn k="architecture" /><Fn k="attestation" /> Inside the CVM, memory is encrypted by the CPU, so even someone with root on the host, physical access to the RAM, or control of the hypervisor cannot read the plaintext. The boot chain is measured: the firmware, the kernel, and the application’s digest-pinned Docker Compose configuration are hashed into hardware registers (MRTD and RTMR0–3) that appear in a hardware-signed attestation quote.<Fn k="attestation" /><Fn k="chainOfTrust" />
              </P>
              <P>
                The enclave holds the root key and performs every sensitive operation: key derivation, authorization checks, and sandboxed Lit Action execution.<Fn k="architecture" /> HTTPS terminates inside the enclave. Its TLS private key is generated there and bound to the attestation quote, so a client can confirm that its connection ends in the attested software and not at a proxy in front of it.<Fn k="v3Intro" /><Fn k="attestation" />
              </P>

              <SubHead n="3.2">On-chain permissions</SubHead>
              <P>
                All authorization state lives in contracts on Base: an account record that registers the owner, a registry that maps API-key addresses to scopes, a registry of wallet (PKP) derivation identifiers, and groups that bind wallets to the action CIDs permitted to use them.<Fn k="architecture" /> Every privileged operation reduces to one check: the caller is the account owner, or holds an API key with the required scope for the group in question.<Fn k="chainSecured" />
              </P>
              <pre className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03] p-4 font-mono text-[0.82rem] leading-relaxed text-white/75">
                <code>{`require(
  msg.sender == accountOwner ||
  isAPIKeyWithScope(msg.sender, requiredScope, groupId)
);`}</code>
              </pre>
              <P>
                The enclave reads these contracts on every request. Owners update them either through the API, which relays the transaction, or by submitting transactions directly from an externally owned account (EOA) or a multisig.<Fn k="architecture" />
              </P>

              <SubHead n="3.3">Lit Actions</SubHead>
              <P>
                A Lit Action is an immutable JavaScript program identified by its IPFS CID; the CID is both the action’s address and a commitment to its code. Developers submit source and the server derives the CID, so no IPFS upload is required, and publishing the source lets anyone check it against the CID.<Fn k="litActions" /><Fn k="pressRelease" /> Inside the enclave an action can sign, encrypt and decrypt, make HTTP requests to APIs and blockchains, and return a value.<Fn k="litActions" />
              </P>
              <P>
                An action can reach two kinds of key. A <Lead>PKP</Lead> is a wallet the account mints and adds to a group. Any action whose CID is in the same group can use it, and it keeps its address as new versions of the code are approved. An <Lead>action identity key</Lead> is bound to the action’s own CID. Only that code can use it, and a new version of the code gets a new key.<Fn k="litActions" /> Because the code is immutable and the key stays in the TEE, a signed output is evidence that this exact code produced this exact result. The converse also holds: a permitted action can read and use a key inside the sandbox, so the code an owner permits is part of that key’s security boundary.
              </P>
              <P>
                Actions run in a hardened Deno-based sandbox, a V8 isolate without Node.js built-ins such as the filesystem, in which native code cannot execute.<Fn k="v3Intro" /><Fn k="imports" /> They can import pinned ES modules from npm through jsDelivr. Each module is checked against a SHA-384 integrity hash before it runs, and redirects are refused.<Fn k="imports" /> Default limits keep the shared runtime predictable: 15 minutes of execution, 64 MB of memory, 50 outbound HTTP requests, a 1 MB response, and 10 key or signature requests per execution.<Fn k="limits" />
              </P>

              <SubHead n="3.4">The life of a request</SubHead>
              <P>
                Authorization is checked twice: once against the chain before any code runs, and again inside the sandbox each time the code asks for a key or a decryption (Figure 1).<Fn k="chainSecured" /><Fn k="litActions" />
              </P>
              <Steps steps={FLOW} label="Inside the attested enclave" />
              <Caption>Figure 1 — One request, from API call to signature.</Caption>

              <SubHead n="3.5">Key release and the on-chain KMS</SubHead>
              <P>
                In most cloud key-management services, the provider decides which machines receive keys. Chipotle instead uses dstack’s on-chain KMS, which releases application keys only to CVMs whose attestation matches what smart contracts on Base allow.<Fn k="onchainKms" /><Fn k="phalaOnchainKms" />
              </P>
              <P>
                On every boot, the CVM presents a TDX attestation quote. The KMS verifies the quote against Intel’s root certificates and then reads four whitelists on Base: the OS image and the KMS’s own measurement must be approved in Phala’s KMS contract, and the application’s compose hash and the hardware device must be approved in Lit’s DstackApp contract. Only if all four checks pass does the KMS release keys.<Fn k="onchainKms" /> A deployment that skips governance boots, but it cannot obtain keys, so it cannot serve traffic. The KMS that holds the root secret runs in a TEE of its own, and the CVM’s measurements record which KMS it is bound to, so a substituted KMS would fail verification.<Fn k="chainOfTrust" />
              </P>
              <P>
                The KMS derives application keys deterministically from its root secret, so a CVM that passes these checks obtains the same keys whichever approved machine it is scheduled on.<Fn k="keyIssuance" /><Fn k="derot" /> Table 2 lists the contracts involved and who controls each.
              </P>
              <figure className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full min-w-[36rem] border-collapse text-left align-top">
                  <thead>
                    <tr className={THEAD_ROW}>
                      <th className={`w-[26%] ${TH}`}>Contract</th>
                      <th className={`w-[30%] ${TH}`}>Controlled by</th>
                      <th className={TH}>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CONTRACTS.map((c) => (
                      <tr key={c.name} className="border-t border-white/10 align-top">
                        <td className={TD_HEAD}>
                          {c.name}
                          <div className="mt-1 font-normal">
                            <Addr a={c.addr} />
                          </div>
                        </td>
                        <td className={TD}>{c.owner}</td>
                        <td className={TD}>{c.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
              <Caption>Table 2 — Contracts on Base mainnet. Owners and thresholds were read on-chain in October 2026; confirm them before relying on them.</Caption>

              <SubHead n="3.6">Accounts, keys, and groups</SubHead>
              <P>
                Who owns an account is a configuration choice, not a fork in the code. In <Lead>API mode</Lead>, a Lit-managed credential owns the account and relays administrative writes, which is the fastest way to start. In <Lead>ChainSecured mode</Lead>, a wallet the customer controls, either an EOA or a Safe, owns the account on-chain and signs every change itself, leaving an on-chain audit trail. Both modes execute Lit Actions through the same API; they differ in who owns the account and how administrative writes reach the chain.<Fn k="accountModes" /><Fn k="architecture" />
              </P>
              <P>
                API keys carry scopes granted by the owner. There are seven, and four of them — execute, manage a group’s actions, add wallets to a group, and remove wallets from a group — apply per group, so a key can be confined to exactly the groups it needs. Adding or revoking keys, changing scopes, and transferring ownership are reserved to the owner.<Fn k="authModel" /> A group answers the question “can this action use this key?”, and a key’s scopes answer “can this caller use this group?”<Fn k="authModel" /><Fn k="groups" />
              </P>
              <P>
                The result is least privilege enforced by the chain. A leaked execute-only key can invoke the actions it was already permitted to run, and nothing else: it cannot add itself to new groups, swap in new code, or move funds outside policy. Changing the rules takes an owner transaction, and with a Safe as owner, a multisig vote.<Fn k="chainSecured" />
              </P>

              <SubHead n="3.7">Event-driven execution</SubHead>
              <P>
                Lit Triggers runs an action when something happens: an inbound webhook, a cron schedule, or an EVM log that matches a chain, contract, and event signature.<Fn k="triggers" /> A trigger turns a Lit Action into an autonomous, event-driven agent that can fetch data, sign, and transact with a key no human holds.<Fn k="triggers" />
              </P>

              <SubHead n="3.8">Confidential AI workloads</SubHead>
              <P>
                The environment that authorizes and signs transactions also runs AI training, fine-tuning, and inference. Each deployment is hardware-attested against release hashes recorded on Base, and runtime keys are released only to deployments that match. Permitted data sources, outputs, and outbound requests are set at deployment and enforced during execution, rather than promised by an operator. AI deployments are onboarded with the Lit team, starting with a workload assessment.<Fn k="aiDeployments" />
              </P>
            </section>

            {/* 4 */}
            <section id="sec-security" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="4" id="security" title="Security model" />

              <SubHead n="4.1">Defense in depth</SubHead>
              <P>
                The MPC network layered three defenses: threshold cryptography, TEEs, and cryptoeconomic security from staked, slashable operators.<Fn k="mpcWhitepaper" /> Chipotle replaces the threshold and staking layers with mechanisms that a third party can check directly. The layers below fail independently, so an attacker has to defeat several at once.
              </P>
              <Bullets marker="number" items={DEFENSE} />

              <SubHead n="4.2">Verifying the network</SubHead>
              <P>
                Attestation lets a remote machine prove what it is running, so the guarantee becomes “trust the silicon and the math” instead of “trust the operator.”<Fn k="attestation" /> Verification for Chipotle spans four layers (Table 3). A one-click report for the live API is published through the Phala Trust Center, and the full procedure — replaying the RTMR3 event log, checking image signatures, and reading the on-chain whitelists — is documented step by step.<Fn k="quickVerify" /><Fn k="fullVerification" />
              </P>
              <figure className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full min-w-[36rem] border-collapse text-left align-top">
                  <thead>
                    <tr className={THEAD_ROW}>
                      <th className={`w-[18%] ${TH}`}>Layer</th>
                      <th className={TH}>What is checked</th>
                      <th className={TH}>What it proves</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRUST_LAYERS.map((r) => (
                      <tr key={r.layer} className="border-t border-white/10 align-top">
                        <td className={TD_HEAD}>{r.layer}</td>
                        <td className={TD}>{r.checked}</td>
                        <td className={`${TD} text-white/80`}>{r.proves}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
              <Caption>
                Table 3 — The chain of trust, by layer.<Fn k="chainOfTrust" />
              </Caption>
              <P>
                Production verification belongs in the integrating client. The documentation and Phala’s chain-of-trust checklist describe the checks, but each application has to run and enforce them on its own connection path, including any proxies in front of the enclave.<Fn k="attestation" />
              </P>

              <SubHead n="4.3">Release governance</SubHead>
              <P>
                Attestation proves what an enclave runs; release governance decides what it is allowed to run. Because the KMS releases keys only to whitelisted compose hashes, shipping a new version takes two independent actions: a governance transaction that adds the release’s compose hash to the DstackApp whitelist, and a deployment that builds the image and restarts the CVM. A deployment without the whitelist entry boots but cannot get keys. A whitelist entry without a deployment changes nothing.<Fn k="upgradeGovernance" />
              </P>
              <figure className="mt-7 grid gap-2.5 md:grid-cols-3">
                {RELEASE.map((r, i) => (
                  <div key={r.t} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <b className="text-[0.95rem] font-medium">
                        <span className="mr-2 font-mono text-xs text-lit-orange">{String(i + 1).padStart(2, '0')}</span>
                        {r.t}
                      </b>
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-white/35">{r.where}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{r.s}</p>
                  </div>
                ))}
              </figure>
              <Caption>Figure 2 — Every release needs a public governance approval and a separate deployment.</Caption>
              <P>
                Before approving, each signer confirms provenance (the image was built by GitHub Actions from a reviewed commit on LIT-Protocol/chipotle, as recorded in Rekor), reproducibility (the compose hash recomputes locally from the digest-pinned configuration), and the diff against the currently whitelisted release.<Fn k="upgradeGovernance" /> Rolling back means redeploying a release that is still whitelisted. Forbidding a vulnerable release takes another 2-of-4 transaction that removes its hash. There is currently no timelock on top of the multisig, so an approved change takes effect as soon as the quorum executes it.
              </P>

              <SubHead n="4.4">Trust assumptions and limits</SubHead>
              <P>
                No system eliminates trust. Chipotle moves it to assumptions that can be stated and checked, listed in Table 4.
              </P>
              <figure className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full min-w-[36rem] border-collapse text-left align-top">
                  <thead>
                    <tr className={THEAD_ROW}>
                      <th className={`w-[22%] ${TH}`}>Assumption</th>
                      <th className={TH}>What it covers</th>
                      <th className={TH}>How to check or reduce it</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ASSUMPTIONS.map((r) => (
                      <tr key={r.a} className="border-t border-white/10 align-top">
                        <td className={TD_HEAD}>{r.a}</td>
                        <td className={TD}>{r.covers}</td>
                        <td className={TD}>{r.check}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
              <Caption>Table 4 — What Chipotle’s guarantees rest on, and how to verify or reduce each dependency.</Caption>
            </section>

            {/* 5 */}
            <section id="sec-economics" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="5" id="economics" title="Pricing and payments" />
              <P>
                Chipotle prices usage in US dollars through prepaid credits, with no subscriptions, no per-seat fees, and no charge for read-only operations. Credits are drawn down as metered calls run. When a balance is exhausted, the API returns <Code>402 Payment Required</Code> until the account is topped up.<Fn k="pricing" />
              </P>
              <figure className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full border-collapse text-left align-top">
                  <thead>
                    <tr className={THEAD_ROW}>
                      <th className={TH}>Operation</th>
                      <th className={`w-[38%] ${TH}`}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRICES.map((r) => (
                      <tr key={r.op} className="border-t border-white/10 align-top">
                        <td className={TD}>{r.op}</td>
                        <td className={`${TD} text-white/85`}>{r.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
              <Caption>
                Table 5 — Published pricing, October 2026.<Fn k="pricing" />
              </Caption>
              <P>
                Credits can be bought by card through Stripe, with ETH, USDC, SOL, and other tokens through Stripe’s crypto integration, or with LITKEY directly on Base at a 25% discount to the card price. Enterprise terms are available for higher volumes.<Fn k="pricing" /> Billing also follows the account mode. In ChainSecured mode, administrative writes are signed by the owner’s wallet and paid for in Base gas, so they never reach the metered endpoint, while Lit Action execution is metered the same way in both modes.<Fn k="pricing" />
              </P>
              <P>
                In the MPC network’s design, signing, encryption, and compute were paid for in LITKEY.<Fn k="mpcWhitepaper" /> Chipotle prices usage in dollars, and LITKEY remains the native payment token for Lit services.<Fn k="litkeyDocs" />
              </P>

              <SubHead n="5.1">How LITKEY payments settle</SubHead>
              <P>
                LITKEY payments go through LitkeyPaymentGateway, a deliberately minimal contract on Base. It holds no state and no funds, and it is intentionally immutable: changing its behavior means deploying a new contract.<Fn k="gatewayContract" /> Settlement takes three steps (Figure 3).
              </P>
              <Steps steps={SETTLE} label="LITKEY → credits, on Base" />
              <Caption>
                Figure 3 — Paying for network services with LITKEY.<Fn k="gatewayContract" /><Fn k="paymentsService" />
              </Caption>
              <P>
                The payer and the credited account are separate fields, so a user can pay from any wallet. Every payment, and the treasury that receives it, is visible on Basescan.
              </P>
            </section>

            {/* 6 */}
            <section id="sec-litkey" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="6" id="litkey" title="The LITKEY token" />
              <P>
                LITKEY is the network token of Lit Protocol. It launched on Aerodrome on Base on October 30, 2025, with a fixed supply of one billion tokens.<Fn k="tokenomics" /><Fn k="litkeyLive" />
              </P>
              <figure className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full border-collapse text-left align-top">
                  <tbody>
                    {TOKEN.map(([k, v]) => (
                      <tr key={k} className="border-t border-white/10 align-top first:border-t-0">
                        <td className={`w-[40%] ${TD_HEAD}`}>{k}</td>
                        <td className={`${TD} text-white/80`}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
              <Caption>
                Table 6 — Token parameters.<Fn k="tokenomics" /><Fn k="litkeyDocs" />
              </Caption>

              <SubHead n="6.1">Role in Chipotle</SubHead>
              <P>
                In the MPC network, LITKEY had three jobs: a work token that node operators staked and could lose to slashing, a payment and gas token for the Lit Chain and its services, and a governance token.<Fn k="mpcWhitepaper" /> Chipotle’s architecture changes the first two.
              </P>
              <Bullets
                items={[
                  ['Payment.', <>LITKEY is the native payment token for Lit services. Paying in LITKEY buys credits at a 25% discount to card pricing, settled on Base with no card or fiat conversion.<Fn k="litkeyDocs" /></>],
                  ['No staked operator set.', <>Chipotle does not coordinate a threshold of independent nodes, so it has no operator staking, slashing, or node rewards. Attestation-gated key release and public release governance (§4.3) take the place of the security that staking provided. When Naga was sunset, timelocks were removed so delegated stakers could withdraw, and node operators could unstake.<Fn k="v3Intro" /><Fn k="nagaSunset" /></>],
                  ['No Lit Chain gas.', <>Chipotle’s coordination contracts live on Base, and on-chain writes pay Base gas in ETH.<Fn k="architecture" /><Fn k="pricing" /></>],
                  ['Governance.', <>The Lit Association stewards protocol governance in collaboration with the core development company, node operators, integration partners, and token holders. Anyone can take part through the public governance forum and the Lit Improvement Proposal (LIP) process (§7).<Fn k="association" /></>],
                ]}
              />

              <SubHead n="6.2">Distribution</SubHead>
              <P>The allocation below is as published at launch.<Fn k="tokenomics" /></P>
              <figure className="mt-6 rounded-xl border border-white/10 p-5">
                <div className="grid gap-4">
                  {DISTRIBUTION.map((d) => (
                    <div key={d.name}>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-[0.95rem] font-medium text-white">{d.name}</span>
                        <span className="font-mono text-sm text-lit-orange">{d.pct}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/[0.06]">
                        <div className="h-full rounded-full bg-gradient-to-r from-lit-orange to-lit-orange-700" style={{ width: `${(d.pct / 28) * 100}%` }} />
                      </div>
                      <div className="mt-1.5 text-sm leading-snug text-white/50">{d.note}</div>
                    </div>
                  ))}
                </div>
              </figure>
              <Caption>
                Figure 4 — LITKEY allocation as published at launch (October 2025). Bars are scaled to the largest allocation.<Fn k="tokenomics" />
              </Caption>
              <P>
                Team and venture-investor allocations were locked for one year after launch, followed by 24 months of linear vesting. Investor allocations include the Legion community sale, split into 0.17% of total supply liquid at launch, 0.14% vesting linearly over 12 months, and 0.51% locked for one year. Emissions from the builder reward pool are variable and tied directly to network revenue.<Fn k="tokenomics" />
              </P>
            </section>

            {/* 7 */}
            <section id="sec-governance" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="7" id="governance" title="Governance" />
              <P>
                Authority over Chipotle is split into separate domains with separate rules, and verifying a deployment means checking how each one can change.<Fn k="security" /> There are three.
              </P>
              <Bullets
                items={[
                  ['Account governance: your rules.', <>The account owner decides which keys, wallets, and actions exist and how they combine. In ChainSecured mode the owner is the customer’s own EOA or Safe, and every change is an on-chain transaction it signs.<Fn k="chainSecured" /><Fn k="accountModes" /></>],
                  ['Release governance: which software may hold keys.', <>Lit’s 2-of-4 Safe approves Chipotle releases through the DstackApp whitelist, using the propose, approve, and execute workflow in §4.3. Phala’s 2-of-3 Safe governs the OS-image and KMS whitelists.<Fn k="upgradeGovernance" /><Fn k="onchainKms" /></>],
                  ['Protocol governance: policy and direction.', <>The Lit Association, a Swiss non-profit association, stewards protocol upgrades, policy, and resource allocation. As set out at its launch in October 2025, proposed upgrades are posted in the public governance forum for review and, in the initial phase, ratified by the Association through a multisig. Governance is being rolled out in phases, and changes to governance itself are proposed through the LIP process.<Fn k="association" /></>],
                ]}
              />
              <P>
                Self-hosting moves release governance to the operator. A self-hosted deployment has its own DstackApp contract, owned by its own Safe, wallet, timelock, or DAO, so a new Lit release takes effect there only when that owner whitelists it — on its own timeline, and with whatever quorum or review delay its compliance posture requires.<Fn k="selfHosting" /><Fn k="upgradeGovernance" />
              </P>
            </section>

            {/* 8 */}
            <section id="sec-deployment" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="8" id="deployment" title="Deployment and self-hosting" />
              <P>
                Chipotle is open source. The API server, Lit Actions runtime, dashboard, contracts, examples, and local development tooling are public in the LIT-Protocol/chipotle repository.<Fn k="repo" /><Fn k="selfHosting" /> It runs anywhere dstack runs. Because dstack is native to Docker Compose, the images and compose files the hosted service uses deploy unchanged on bare-metal Intel TDX, bare-metal AMD SEV-SNP, Phala Cloud, GCP Confidential VMs, and AWS Nitro Enclaves, and dstack also supports NVIDIA confidential-computing GPUs.<Fn k="selfHosting" /><Fn k="dstack" />
              </P>
              <P>
                The hosted service is the fastest path for most teams, because Lit operates the TEE infrastructure, deployment pipeline, monitoring, billing integration, and upgrades. Self-hosting suits teams that need infrastructure ownership, private deployment controls, custom compliance boundaries, or a deployment their users can verify independently. The operator then owns upgrades, monitoring, incident response, and the verification evidence it publishes to its users.<Fn k="selfHosting" />
              </P>
            </section>

            {/* 9 */}
            <section id="sec-roadmap" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="9" id="roadmap" title="Roadmap" />
              <P>
                The initial Chipotle release delivered Lit Actions, signing and decryption gating, the REST API and dashboard, Phala TEE execution, on-chain KMS integration, and LITKEY payments.<Fn k="v3Intro" /> Since launch, the network has added module imports for Lit Actions, event-driven execution through Lit Triggers, and confidential AI deployments.<Fn k="imports" /><Fn k="triggers" /><Fn k="aiDeployments" />
              </P>
              <P>
                Announced areas of future work are additional programmable-cryptography primitives, multi-region scaling, expanded payment options, and more advanced policy frameworks.<Fn k="v3Intro" /> These are forward-looking: scope and timing may change, and this paper will be revised as they ship.
              </P>
            </section>

            {/* 10 */}
            <section id="sec-references" className="mt-14 scroll-mt-24 border-t border-white/10 pt-14">
              <SectionHead n="10" id="references" title="References" />
              <ol className="mt-4 space-y-3">
                {REF_ORDER.map((k, i) => (
                  <li key={k} id={`ref-${i + 1}`} className="flex scroll-mt-24 gap-3 text-[0.9rem] leading-relaxed text-white/60">
                    <span className="font-mono text-xs text-lit-orange-700">[{i + 1}]</span>
                    <span>
                      {REF[k].text}{' '}
                      <a href={REF[k].href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 whitespace-nowrap text-lit-orange transition-colors hover:text-gold-500">
                        link <IconExternalLink size={11} stroke={2} className="opacity-70" />
                      </a>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-10 border-t border-white/10 pt-5 font-mono text-[0.7rem] leading-relaxed text-white/30">
                This whitepaper is a technical description of Lit Protocol V3 (Chipotle) as of October 2026. It is not the LITKEY crypto-asset white paper prepared under the EU Markets in Crypto-Assets Regulation (MiCA), which is{' '}
                <a href={MICA_LINK} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors hover:text-gold-500">
                  published separately
                </a>
                . On-chain parameters such as owners, thresholds, and whitelists were read from Base in October 2026 and can change through the governance processes described here; verify them on-chain. Some functions described for the network and for LITKEY are forward-looking and may change, be delayed, or never be released. LITKEY is intended to provide access to and coordination within the network; it does not represent equity, ownership, or a right to revenue, assets, dividends, or profits. Nothing here is an offer or solicitation to buy or sell any token or other instrument, or investment, legal, or tax advice.
              </p>
            </section>
          </article>
        </div>
      </Container>
    </div>
  );
}
