import { AI_CONTACT_FORM, GITHUB_LINK } from '@/utils/constants';

export const dynamic = 'force-static';

const LLMS_TXT = `# Lit Protocol

> Confidential, verifiable execution for crypto transactions, AI training, and inference. Lit runs code in confidential hardware. Applications can read external data, verify the software running, and define permitted actions and outputs.

## Get started

- [Get started with crypto](https://dashboard.chipotle.litprotocol.com/dapps/dashboard/): create an account and start using the API for crypto workloads
- [Contact for Lit AI](${AI_CONTACT_FORM}): discuss confidential AI training and inference with the Lit team
- [Quickstart](https://developer.litprotocol.com/quickstart): run your first Lit Action through the dashboard or REST API

## Explore the platform

- [Programmable wallets](https://litprotocol.com/crypto): hot wallets, vaults, and agent wallets with immutable code and updatable on-chain permissions
- [Confidential AI](https://litprotocol.com/ai): Docker workloads, private training and inference, measured egress policy, and on-chain release approval
- [Agent Keychain](https://litprotocol.com/keychain): owner-approved access to API credentials through connected services or stored secrets
- [Security & verification](https://litprotocol.com/security): software identity, wallet authority, runtime governance, and trust boundaries

## Wallet infrastructure

Build a programmable wallet for your crypto system: hot wallets, vaults, and agent wallets whose signing rules run as code. Agents can transact within code-defined limits, with wallet access updated or revoked through on-chain permissions. Each Action version is immutable. Account permissions can authorize new versions and revoke old ones while the wallet retains its address. Write code that reads from APIs or blockchains and decides when the wallet can sign. In ChainSecured mode, a customer-controlled wallet owns the account, and contracts on Base govern permissions. Lit executes authorized code inside confidential hardware. Check the runtime's code hash against an approved release.

- [Agent wallets](https://litprotocol.com/crypto#agent-wallets)
- [Stablecoins](https://litprotocol.com/stablecoins)
- [Cross-chain solvers](https://litprotocol.com/solvers)
- [Tokenized assets](https://litprotocol.com/rwa)
- [Lit Actions](https://developer.litprotocol.com/lit-actions): immutable JavaScript programs with data access, encryption, and signing
- [Chain Secured](https://developer.litprotocol.com/architecture/chain-secured): customer-controlled permissions

## Private compute and AI

Bring your own or a vendor’s Docker container to a confidential virtual machine. The pinned image and outbound connection policy form a measured release approved on-chain. Application egress passes through a proxy enforcing an approved hostname allowlist; application code controls what is sent. An allowed external model provider receives the inputs sent to it and remains outside the confidential runtime. Work with Lit to assess hardware, model artifacts, credentials, outputs, and verification. Hardware support and performance depend on the agreed workload.

## Agent Keychain

[Open Keychain](https://keychain.litprotocol.com). Credentials are encrypted in the browser. Owners approve agent identities and expiry; Lit Actions check signed permissions. Connected-service actions use credentials inside Lit and return results; stored-secret operations deliver credentials to the agent host. Keychain permission records are not ChainSecured wallet permissions: the storage operator supplies the current record and can replay older valid approvals until expiry. Review the [security model](https://keychain.litprotocol.com/SECURITY.md) and [agent setup guide](https://keychain.litprotocol.com/SKILL.md).

## Verification and governance

Protocol updates follow an on-chain approval process. Source code, approved release records, and hardware attestation let users inspect the software and its authorization. Wallet permissions and runtime approvals are separate. Deployment alone does not authorize new code to receive runtime keys; the key-management system checks attestation against contract rules. Review both permission checks and upgrade rules for a deployment. Attestation establishes software identity, not application correctness or freedom from leakage through permitted outputs.

- [Open-source](${GITHUB_LINK})
- [Security and verification](https://developer.litprotocol.com/architecture/verification/index)
- [How attestation works](https://developer.litprotocol.com/architecture/verification/attestation)
- [Runtime governance](https://developer.litprotocol.com/architecture/verification/upgrade-governance)
- [Self-hosting](https://developer.litprotocol.com/architecture/self-hosting)
- [Developer documentation](https://developer.litprotocol.com)

## Comparisons

These comparisons examine operator authority: who can change permissions, approve software, withhold service, and recover access. Wallet comparisons cover Chipotle ChainSecured, not the legacy MPC network. Compute comparisons cover confidential containers whose code and network policies require on-chain release approval. Shared TEE protections are distinguished from on-chain authorization. Wallet permissions, runtime approvals, and contract upgrade rules are separate. Deployment-specific approval policies are evaluated separately.

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
