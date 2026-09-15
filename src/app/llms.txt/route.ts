export const dynamic = 'force-static';

const LLMS_TXT = `# Lit Protocol

> Confidential, verifiable execution for crypto transactions, AI training, and inference. Lit runs code in confidential hardware. Applications can read external data, verify the software running, and define permitted actions and outputs.

## Get started

- [Lit dashboard](https://dashboard.chipotle.litprotocol.com/dapps/dashboard/): create an account and start using the API for crypto workloads
- [Contact us for AI](https://forms.gle/n4WKtsyxaduEz8dDA): discuss confidential AI training and inference with the Lit team
- [Quickstart](https://developer.litprotocol.com/quickstart): run your first Lit Action through the dashboard or REST API

## Wallet infrastructure

Write code that reads from APIs or blockchains and decides when a wallet can sign. In ChainSecured mode, a customer-controlled wallet owns the account, and contracts on Base govern permissions. Lit executes authorized code inside confidential hardware. Check the runtime's code hash against an approved release.

- [Stablecoins](https://litprotocol.com/stablecoins)
- [Cross-chain solvers](https://litprotocol.com/solvers)
- [Tokenized assets](https://litprotocol.com/rwa)
- [Lit Actions](https://developer.litprotocol.com/lit-actions): immutable JavaScript programs with data access, encryption, and signing
- [Chain Secured](https://developer.litprotocol.com/architecture/chain-secured): customer-controlled permissions

## Private compute and AI

Work with the Lit team to define the model, compute requirements, private execution environment, software verification, data access, and output policies. Training and inference deployments are scoped with the team; this page does not establish specific GPU availability, model support, capacity, or latency.

## Verification and governance

Lit manages the hosted system, following the on-chain process for approving protocol updates. Source code, approved release records, and hardware attestation let users inspect the software and its authorization. Wallet policy and hosted runtime approvals are separate. The published hosted upgrade configuration uses a Lit-controlled 2-of-4 Safe without a timelock; inspect current contracts and governance documentation. Attestation establishes software identity, not application correctness or freedom from leakage through permitted outputs.

- [Open source](https://github.com/LIT-Protocol)
- [Security and verification](https://developer.litprotocol.com/architecture/verification/index)
- [How attestation works](https://developer.litprotocol.com/architecture/verification/attestation)
- [Runtime governance](https://developer.litprotocol.com/architecture/verification/upgrade-governance)
- [Self-hosting](https://developer.litprotocol.com/architecture/self-hosting)
- [Developer documentation](https://developer.litprotocol.com)

## Comparisons

These comparisons use provider documentation and identified public source code, distinguish Lit's interpretation from evidence, and disclose tradeoffs.

- [Comparison methodology](https://litprotocol.com/compare#methodology)
- [Lit vs Privy](https://litprotocol.com/compare/privy)
- [Lit vs Turnkey](https://litprotocol.com/compare/turnkey)
- [Lit vs Fireblocks](https://litprotocol.com/compare/fireblocks)
- [Lit vs Google Confidential Cloud](https://litprotocol.com/compare/google-cloud): scoped to Google Confidential Space
- [Lit vs Fortanix](https://litprotocol.com/compare/fortanix): scoped to Confidential Computing Manager
- [Lit vs Tinfoil](https://litprotocol.com/compare/tinfoil)

## Company

- [Homepage](https://litprotocol.com)
- [Contact](https://litprotocol.com/contact): support@litprotocol.com
- [Blog](https://spark.litprotocol.com)
- [Careers](https://litprotocol.com/careers)
- [Privacy policy](https://litprotocol.com/legal/privacy-policy)
- [Terms of service](https://litprotocol.com/legal/terms-of-service)
`;

export function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      // The homepage rewrites here for Accept: text/markdown (src/middleware.ts),
      // so caches must key on Accept.
      Vary: 'Accept',
    },
  });
}
