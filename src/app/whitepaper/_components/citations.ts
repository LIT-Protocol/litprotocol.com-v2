// Authoritative source links for the Chipotle (Lit Protocol V3) whitepaper.
// Keep citations exact: every figure, address, and parameter on the page should
// trace to one of these sources or to a live on-chain read.

const DOCS = 'https://developer.litprotocol.com';
const SPARK = 'https://spark.litprotocol.com';
const REPO = 'https://github.com/LIT-Protocol/chipotle';

export const SRC = {
  // --- Lit developer documentation ---
  docsHome: DOCS,
  architecture: `${DOCS}/architecture/index`,
  chainSecured: `${DOCS}/architecture/chain-secured`,
  authModel: `${DOCS}/architecture/authModel`,
  groups: `${DOCS}/architecture/groups`,
  accountModes: `${DOCS}/management/account_modes`,
  litActions: `${DOCS}/lit-actions/index`,
  imports: `${DOCS}/lit-actions/imports`,
  limits: `${DOCS}/lit-actions/limits`,
  triggers: `${DOCS}/lit-triggers/index`,
  verification: `${DOCS}/architecture/verification/index`,
  attestation: `${DOCS}/architecture/verification/attestation`,
  onchainKms: `${DOCS}/architecture/verification/onchain-kms`,
  upgradeGovernance: `${DOCS}/architecture/verification/upgrade-governance`,
  chainOfTrust: `${DOCS}/architecture/verification/chain-of-trust`,
  quickVerify: `${DOCS}/architecture/verification/quick-verify`,
  fullVerification: `${DOCS}/architecture/verification/full-verification`,
  selfHosting: `${DOCS}/architecture/self-hosting`,
  pricing: `${DOCS}/management/pricing`,
  litkeyDocs: `${DOCS}/management/litkey`,
  pressRelease: `${DOCS}/press_releases/2026-03-30`,

  // --- Source code (LIT-Protocol/chipotle) ---
  repo: REPO,
  keyIssuance: `${REPO}/blob/main/architectureDocs/deployment/derot-key-issuance.md`,
  gatewayContract: `${REPO}/blob/main/lit-payments/contracts/contracts/LitkeyPaymentGateway.sol`,
  paymentsService: `${REPO}/blob/main/lit-payments/README.md`,

  // --- Lit announcements (Spark) ---
  v3Intro: `${SPARK}/introducing-lit-protocol-v3-chipotle/`,
  v3Live: `${SPARK}/lit-v3-is-live-confidential-compute-and-key-management-in-one-api/`,
  nagaSunset: `${SPARK}/naga-network-sunset/`,
  aiDeployments: `${SPARK}/lit-protocol-now-supports-confidential-verifiable-ai-deployments/`,
  tokenomics: `${SPARK}/litkey-tokenomics/`,
  litkeyLive: `${SPARK}/litkey-is-live/`,
  association: `${SPARK}/introducing-the-lit-association-and-onchain-governance/`,
  // The MPC-network ($LITKEY) whitepaper this paper succeeds.
  mpcWhitepaper:
    'https://docs.google.com/document/d/1zhBEllDDhAeig37xqY6_YGJC3keWZuSSM6PekGFVBww/edit',

  // --- Lit site ---
  security: 'https://litprotocol.com/security',

  // --- Third-party references ---
  phalaOnchainKms:
    'https://docs.phala.com/phala-cloud/key-management/understanding-onchain-kms',
  derot:
    'https://docs.phala.com/dstack/design-documents/decentralized-root-of-trust',
  dstack: 'https://github.com/Dstack-TEE/dstack',
  eip2535: 'https://eips.ethereum.org/EIPS/eip-2535',
} as const;

// Contracts and multisigs on Base mainnet referenced by the paper. Owners and
// thresholds were read on-chain (Base mainnet block 52,868,711, October 20,
// 2026) and should be re-verified before each revision of this page.
export const BASE_ADDR = {
  dstackApp: '0x3F91Deaf16FF7C823eE65081d6bAFA1cEea05FfC',
  phalaKms: '0x2f83172A49584C017F2B256F0FB2Dca14126Ba9C',
  phalaSafe: '0x3926658a072F82BAEa5e5a15e1Fed8a776F4a663',
  litSafe: '0xF688411c0FFc300cAb33EB1dA651DBb3E6891098',
  accountConfig: '0xaaaaa9120fe271f653cfdb6bf400db93d2dea7aa',
  gateway: '0xa2d54cd1D1dF1735718A857aC49CaF9ECaB0093b',
  treasury: '0x4a49b859C481a300aC7C732F7d64edd61392DC8E',
  litkey: '0xf732a566121fa6362e9e0fbdd6d66e5c8c925e49',
} as const;

export const basescan = (address: string) =>
  `https://basescan.org/address/${address}`;
