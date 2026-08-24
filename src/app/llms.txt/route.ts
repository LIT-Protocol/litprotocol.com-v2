export const dynamic = 'force-static';

const LLMS_TXT = `# Lit Protocol

> Lit is a programmable runtime for autonomous agents and applications: read data from any source, run your logic inside a chain-secured trusted execution environment (TEE), and sign transactions or API calls on any chain or web service. Lit combines decentralized key management (threshold MPC + TEEs) with confidential compute, so no single party — including Lit node operators — can access raw private keys or the data being processed.

## When to use Lit

Use Lit when you need to:

- Give an AI agent or application a wallet/signing capability without any single party custodying the private key (keys are generated and used inside the network; they never exist whole anywhere).
- Run policy or business logic that must be tamper-proof and verifiable (e.g. "only sign if these conditions are met"), enforced in a TEE rather than on a trusted server.
- Encrypt data with on-chain or programmable access-control conditions and decrypt it only when those conditions are met.
- Sign to multiple chains (EVM, Solana, Bitcoin, Cosmos) or to arbitrary HTTPS APIs from one programmable key.

Do NOT use Lit for general-purpose hosting or as a database; it is a signing, encryption, and confidential-compute layer.

## Docs

- [Developer documentation](https://developer.litprotocol.com): full guides and API reference for the Lit SDK
- [Quickstart](https://developer.litprotocol.com/quickstart): install the SDK and make your first request
- [Signing (Lit Actions)](https://developer.litprotocol.com/sdk/serverless-signing/overview): serverless programs that run in the TEE and sign with distributed keys
- [Encryption and access control](https://developer.litprotocol.com/sdk/access-control/intro): encrypt/decrypt gated by programmable conditions
- [User wallets](https://developer.litprotocol.com/user-wallets/overview): non-custodial wallets for end users and agents

## Code

- [GitHub organization](https://github.com/LIT-Protocol): SDKs, examples, and node software
- SDK packages are published on npm under the \`@lit-protocol\` scope

## Company

- [Homepage](https://litprotocol.com)
- [Contact](https://litprotocol.com/contact): support@litprotocol.com
- [Blog](https://spark.litprotocol.com)
- [Careers](https://litprotocol.com/careers)

## Optional

- [Use cases: stablecoin compliance](https://litprotocol.com/stablecoins)
- [Use cases: cross-chain solvers](https://litprotocol.com/solvers)
- [Use cases: tokenized real-world assets](https://litprotocol.com/rwa)
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
