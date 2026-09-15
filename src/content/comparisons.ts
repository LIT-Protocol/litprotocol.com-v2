export const REVIEWED_ON = 'September 15, 2026';
export const COMPARISON_BASE = '/compare';

export const sources = {
  litActions: {
    title: 'Lit: Action runtime and code-bound permissions',
    url: 'https://developer.litprotocol.com/lit-actions',
  },
  litWasm: {
    title: 'Lit: WebAssembly and threshold-signing examples',
    url: 'https://developer.litprotocol.com/lit-actions/wasm',
  },
  litChain: {
    title: 'Lit: Chain Secured',
    url: 'https://developer.litprotocol.com/architecture/chain-secured',
  },
  litArchitecture: {
    title: 'Lit: Architecture',
    url: 'https://developer.litprotocol.com/architecture/index',
  },
  litGroups: {
    title: 'Lit: Groups and action permissions',
    url: 'https://developer.litprotocol.com/architecture/groups',
  },
  litKms: {
    title: 'Lit: On-Chain KMS',
    url: 'https://developer.litprotocol.com/architecture/verification/onchain-kms',
  },
  litGovernance: {
    title: 'Lit: Upgrade governance',
    url: 'https://developer.litprotocol.com/architecture/verification/upgrade-governance',
  },
  litAttestation: {
    title: 'Lit: What is attestation?',
    url: 'https://developer.litprotocol.com/architecture/verification/attestation',
  },
  privyArchitecture: {
    title: 'Privy: Security architecture',
    url: 'https://docs.privy.io/security/wallet-infrastructure/architecture',
  },
  privyPolicies: {
    title: 'Privy: Wallet policies and controls',
    url: 'https://docs.privy.io/security/wallet-infrastructure/policy-and-controls',
  },
  turnkeyVerified: {
    title: 'Turnkey Verified',
    url: 'https://docs.turnkey.com/security/turnkey-verified',
  },
  turnkeyQuorum: {
    title: 'Turnkey: Quorum deployments',
    url: 'https://docs.turnkey.com/security/quorum-deployments',
  },
  turnkeyProofCode: {
    title: 'Turnkey TypeScript verifier: reviewed source snapshot',
    url: 'https://github.com/tkhq/sdk/blob/5cb85d7d99ec97ab61f6ae689a1c0335cfdf0a7a/packages/crypto/src/proof.ts',
  },
  turnkeyManifest: {
    title: 'Turnkey published signer manifest: release 2026.9.0',
    url: 'https://github.com/tkhq/core-enclaves/blob/065e567951ad16cf6bb0e60e91392e4e9448460d/releases/2026.9.0/signer/manifest.json',
  },
  turnkeyForwardCode: {
    title: 'QuorumOS key-forwarding validation: reviewed source snapshot',
    url: 'https://github.com/tkhq/qos/blob/e41ff8626651705363073d4369b2c60113fa5597/src/qos_core/src/protocol/services/key.rs',
  },
  turnkeyForwardDesign: {
    title: 'QuorumOS: key-forwarding design and revocation caveat',
    url: 'https://github.com/tkhq/qos/blob/e41ff8626651705363073d4369b2c60113fa5597/docs/key_forward.md',
  },
  turnkeyArchitecture: {
    title: 'Turnkey whitepaper: authorization, state freshness, and signing',
    url: 'https://whitepaper.turnkey.com/architecture',
  },
  turnkeyRecovery: {
    title: 'Turnkey: Disaster recovery',
    url: 'https://docs.turnkey.com/security/disaster-recovery',
  },
  turnkeyProofFlow: {
    title: 'Turnkey: Proofs and independent verification',
    url: 'https://docs.turnkey.com/features/verifiable-cloud/proofs-and-verification',
  },
  turnkeyCustomApps: {
    title: 'Turnkey Verifiable Cloud: Building custom applications',
    url: 'https://docs.turnkey.com/features/verifiable-cloud/onboarding',
  },
  fireblocksArchitecture: {
    title: 'Fireblocks: Architecture and security layers',
    url: 'https://developers.fireblocks.com/docs/what-is-fireblocks',
  },
  fireblocksRecovery: {
    title: 'Fireblocks: Backup and disaster recovery',
    url: 'https://developers.fireblocks.com/docs/perform-drs-process',
  },
  googlePolicy: {
    title: 'Google: Confidential Space resource policies',
    url: 'https://docs.cloud.google.com/confidential-computing/confidential-space/docs/create-grant-access-confidential-resources',
  },
  googleAssertions: {
    title: 'Google: Attestation assertions',
    url: 'https://docs.cloud.google.com/confidential-computing/confidential-space/docs/reference/attestation-assertions',
  },
  fortanixApprovals: {
    title: 'Fortanix: Domain and application build approval',
    url: 'https://support.fortanix.com/docs/fortanix-ccm-domain-and-application-build-approval',
  },
  fortanixArchitecture: {
    title: 'Fortanix: CCM architecture and definitions',
    url: 'https://support.fortanix.com/docs/fortanix-ccm-overview-and-definitions',
  },
  fortanixBuild: {
    title: 'Fortanix: Application measurements',
    url: 'https://support.fortanix.com/docs/fortanix-ccm-create-application-build',
  },
  tinfoilVerification: {
    title: 'Tinfoil: How verification works',
    url: 'https://docs.tinfoil.sh/verification/verification-in-tinfoil',
  },
  tinfoilArchitecture: {
    title: 'Tinfoil: Attestation architecture',
    url: 'https://docs.tinfoil.sh/verification/attestation-architecture',
  },
  tinfoilContainers: {
    title: 'Tinfoil: Private containers',
    url: 'https://docs.tinfoil.sh/containers/overview',
  },
  soc2: {
    title: 'AICPA: SOC 2 examinations of controls',
    url: 'https://www.aicpa-cima.com/cpe-learning/publication/soc-2-reporting-on-an-examination-of-controls-at-a-service-organization-relevant-to-security-availability-processing-integrity-confidentiality-or-privacy',
  },
} as const;

export type SourceId = keyof typeof sources;
export type Category = 'wallets' | 'compute';
export type Claim = { text: string; sources: SourceId[] };
export type Comparison = {
  slug: string;
  provider: string;
  category: Category;
  scope: string;
  headline: string;
  introduction: string;
  rows: { dimension: string; provider: Claim; lit: Claim }[];
  assessment: string;
  assessmentSources: SourceId[];
  tradeoff: string;
  tradeoffSources?: SourceId[];
  extra?: { title: string; text: string; sources: SourceId[] };
  securityReview?: {
    conclusion: string;
    scope: string;
    findings: {
      title: string;
      status: string;
      text: string;
      sources: SourceId[];
    }[];
  };
};

export const comparisons: Comparison[] = [
  {
    slug: 'privy',
    provider: 'Privy',
    category: 'wallets',
    scope: 'Privy TEE wallet infrastructure and Lit in ChainSecured mode.',
    headline: 'Wallet permissions your counterparties can verify.',
    introduction:
      'Compare enclave wallet policies with permissions recorded in customer-controlled smart contracts.',
    rows: [
      {
        dimension: 'Key protection',
        provider: {
          text: 'Two Shamir key shares are combined temporarily inside an AWS Nitro enclave.',
          sources: ['privyArchitecture'],
        },
        lit: {
          text: 'Keys are derived and used inside the TEE. The runtime reads smart contracts on Base to authorize execution.',
          sources: ['litArchitecture'],
        },
      },
      {
        dimension: 'Wallet policy',
        provider: {
          text: 'Authorization signatures and wallet policies restrict requests. Most policy enforcement runs in the enclave; Privy documents some API-level checks outside it.',
          sources: ['privyPolicies'],
        },
        lit: {
          text: 'A customer-controlled on-chain account governs permissions. Groups associate wallets with permitted, content-addressed Lit Actions.',
          sources: ['litChain', 'litGroups'],
        },
      },
      {
        dimension: 'Runtime changes',
        provider: {
          text: 'Code deployments use multiple reviewers, hardware security keys, protected builds, testing, and staged approvals.',
          sources: ['privyArchitecture'],
        },
        lit: {
          text: 'Runtime upgrades require an on-chain hash approval and a separate deployment. The approval history is publicly inspectable.',
          sources: ['litGovernance'],
        },
      },
    ],
    assessment:
      'With Lit, your on-chain account governs which code can use a wallet. A counterparty can inspect those permissions directly and identify the exact Lit Action they authorize. Choose Lit when wallet control must be reviewable across organizations, with custom signing logic and a shared record of permission changes.',
    assessmentSources: ['litChain', 'litGroups', 'litActions'],
    tradeoff:
      'Privy already has cryptographic authorization and enclave protection. Lit’s distinction here is the location and visibility of authority. Customer wallet governance and Lit hosted runtime governance remain separate responsibilities.',
  },
  {
    slug: 'turnkey',
    provider: 'Turnkey',
    category: 'wallets',
    scope:
      'Turnkey enclave wallet infrastructure and Lit in ChainSecured mode.',
    headline: 'Write your signing policy in code and govern permissions on-chain.',
    introduction:
      'Compare how verified wallet infrastructure connects custom policy, customer authority, and release approval.',
    rows: [
      {
        dimension: 'Runtime verification',
        provider: {
          text: 'As documented in September 2026, Turnkey Verified exposes Boot Proofs for enclave software and App Proofs for supported operations, including policy outcomes.',
          sources: ['turnkeyVerified'],
        },
        lit: {
          text: 'Attestation lets a verifier compare the running environment’s measurements with expected software and on-chain approvals.',
          sources: ['litAttestation'],
        },
      },
      {
        dimension: 'Runtime authorization',
        provider: {
          text: 'QuorumOS operators verify enclave measurements and provision shares of a service secret. Initial provisioning requires a share threshold; approved enclaves can also receive the secret through key forwarding.',
          sources: ['turnkeyQuorum', 'turnkeyForwardDesign'],
        },
        lit: {
          text: 'Smart-contract whitelists govern which measured deployments receive runtime keys. The hosted approval authority is documented as a Lit-controlled 2-of-4 Safe without a timelock.',
          sources: ['litKms', 'litGovernance'],
        },
      },
      {
        dimension: 'Wallet permissions',
        provider: {
          text: 'The enclave policy engine evaluates organization policies; policy-outcome proofs can verify those decisions.',
          sources: ['turnkeyVerified'],
        },
        lit: {
          text: 'Customer-owned contract state associates usage credentials, wallets, and immutable action identifiers. Permission changes are on-chain transactions.',
          sources: ['litGroups', 'litChain'],
        },
      },
    ],
    assessment:
      'Lit brings custom signing logic and customer-owned, on-chain permissions into one execution model. Read an API or chain state inside a Lit Action, then sign only when your conditions hold. Choose Lit when counterparties need to verify which code is authorized for a wallet from shared contract state.',
    assessmentSources: ['litActions', 'litChain', 'litGroups'],
    tradeoff:
      'Turnkey provides hardware-backed verification and publishes release manifests and approvals. Its Verifiable Cloud also supports custom workloads. Its service-initialization shares are distinct from per-wallet MPC signing shares. Lit’s published hosted configuration also entrusts runtime approvals to a Lit-controlled 2-of-4 Safe without a timelock. Public approval records make that authority inspectable; they do not make either system immune to a compromised release quorum.',
    tradeoffSources: ['turnkeyCustomApps', 'turnkeyManifest', 'litGovernance'],
    securityReview: {
      conclusion:
        'Turnkey has substantive cryptographic protections. Those protections do not remove trust in release authorities or make every integration’s “verified” result a code-identity check. The evidence below identifies concrete boundaries; it does not establish a live compromise.',
      scope:
        'Read-only review of public documentation, pinned SDK and QuorumOS source, and a published signer manifest. We did not audit the full signing application, reproduce production binaries, or test the live service. The manifest’s patch-set mechanism was not analyzed. Source snapshots and a release manifest do not establish what every production instance runs.',
      findings: [
        {
          title: 'Basic verification does not establish trusted code identity',
          status: 'Confirmed in SDK source',
          text: 'The reviewed TypeScript verify() checks signatures and proof linkage, but does not check expected enclave measurements or a trusted manifest. Its own warning says another AWS account’s enclave can pass. verifyWithQosPolicy() adds measurement and manifest allowlists. An integration using only the basic helper has a narrower guarantee; this is not evidence that Turnkey’s production signing authorization can be bypassed.',
          sources: ['turnkeyProofCode'],
        },
        {
          title:
            'Release approval and secret sharing have different thresholds',
          status: 'Published configuration + architectural inference',
          text: 'The published 2026.9.0 signer manifest specifies 2-of-11 manifest approvers and 3-of-10 secret-share holders. These are separate controls, not a single wallet-signing quorum. Key forwarding validates release approvals and an attested destination instead of collecting fresh operator shares. Consequently, assess compromise of the release-approval threshold together with access to the permitted AWS environment; counting secret shares alone overstates the upgrade barrier.',
          sources: ['turnkeyManifest', 'turnkeyForwardCode'],
        },
        {
          title: 'Revoking approvers requires retiring old enclaves',
          status: 'Documented failure condition',
          text: 'QuorumOS explicitly records a rotation hazard: an old enclave still trusting compromised manifest approvers can provision another enclave they approve. Forwarding also enforces namespace, version, attestation, and AWS-role checks. The missing guarantee is automatic fleet-wide revocation: containment depends on retiring old instances. We have not established that this condition exists in Turnkey’s live deployment.',
          sources: ['turnkeyForwardDesign', 'turnkeyForwardCode'],
        },
        {
          title: 'Fresh state needs more than a valid signature',
          status: 'Unresolved production parameter',
          text: 'The whitepaper describes timestamped notarizations and Merkle proofs to reject stale organization data. It does not specify the production freshness window there. To establish revocation speed, request that bound and evidence that previously valid state cannot authorize a request after a credential or policy change. The published design alone does not establish immediate revocation or prove an exploitable rollback.',
          sources: ['turnkeyArchitecture'],
        },
        {
          title: 'A proof must be tied to the decision being relied on',
          status: 'Integration responsibility',
          text: 'An App Proof attests to a typed claim from measured code. The consuming application must check its meaning: the intended organization, request, state, and result. It must also choose trusted measurements independently. A valid proof is not proof that every operation was disclosed, that the code is correct, or that an operator-approved upgrade was acceptable to the customer.',
          sources: ['turnkeyProofFlow'],
        },
        {
          title: 'Provider recovery and customer exit are different',
          status: 'Documented dependency',
          text: 'Turnkey documents replicated data and offline backups for its service secrets. Its export design involves the Signer enclave. Those are useful mechanisms, but the cited recovery page does not establish a customer-operated exit during a prolonged provider outage. Confirm an independently usable recovery arrangement if provider-independent availability is required.',
          sources: ['turnkeyRecovery', 'turnkeyArchitecture'],
        },
      ],
    },
  },
  {
    slug: 'fireblocks',
    provider: 'Fireblocks',
    category: 'wallets',
    scope:
      'Fireblocks Vault/direct-custody infrastructure and Lit in ChainSecured mode. Embedded-wallet variants may use different thresholds.',
    headline: 'Make the decision to sign part of your application.',
    introduction:
      'Compare distributed signing and transaction policies with wallet-bound code that reads data, evaluates rules, and signs.',
    rows: [
      {
        dimension: 'Signing method',
        provider: {
          text: 'MPC-CMP produces signatures from distributed shares without assembling the complete private key during ordinary signing.',
          sources: ['fireblocksArchitecture'],
        },
        lit: {
          text: 'The TEE derives keys and executes permitted Lit Actions. On-chain permissions determine the allowed wallet/action combinations.',
          sources: ['litArchitecture', 'litGroups'],
        },
      },
      {
        dimension: 'Policy authority',
        provider: {
          text: 'An enclave-protected policy engine applies transaction rules and administrative approval quorums. MPC and enclave controls work together.',
          sources: ['fireblocksArchitecture'],
        },
        lit: {
          text: 'The account owner governs policy on Base. The runtime reads that public state when authorizing a request.',
          sources: ['litChain'],
        },
      },
      {
        dimension: 'Continuity',
        provider: {
          text: 'Normal signing requires the configured share participation. Fireblocks documents recovery tools for loss of signing devices or suspension of its operations.',
          sources: ['fireblocksRecovery'],
        },
        lit: {
          text: 'Contract authority does not guarantee service availability. Execution still needs the runtime, chain reads, and supporting infrastructure.',
          sources: ['litArchitecture', 'litChain'],
        },
      },
    ],
    assessment:
      'With Lit, a signing rule can be a program: fetch a price, read a vault ratio, and authorize a transaction only when your conditions hold. Bind that program to a wallet through on-chain permissions. Choose Lit when custom pre-signing logic is central to the application. Where needed, Lit Actions can also participate in an MPC protocol.',
    assessmentSources: ['litActions', 'litGroups', 'litWasm'],
    tradeoff:
      'Fireblocks signing depends on the configured share participation, with documented recovery paths for device loss and service suspension. Lit depends on its runtime and supporting infrastructure. For either model, evaluate the recovery arrangement your application would actually use during an outage.',
    extra: {
      title: 'MPC and confidential execution can be combined',
      text: 'Lit Actions can run WebAssembly, including documented threshold ECDSA and FROST signing examples. This allows a Lit workload to participate in an MPC protocol while enforcing its own signing logic. Using an existing co-signer requires compatible code and an integration assessment.',
      sources: ['litWasm'],
    },
  },
  {
    slug: 'google-cloud',
    provider: 'Google Confidential Cloud',
    category: 'compute',
    scope:
      'Google Cloud Confidential Space, rather than every Google confidential-computing product; Lit Protocol using the ChainSecured method.',
    headline: 'Private compute with programmable key control.',
    introduction:
      'Compare Confidential Space’s workload identity and IAM policies with Lit’s contract-governed runtime and programmable keys.',
    rows: [
      {
        dimension: 'Workload identity',
        provider: {
          text: 'Confidential Space exposes workload image digests and other attestation claims. Data owners can restrict access to an expected image.',
          sources: ['googleAssertions'],
        },
        lit: {
          text: 'Hardware measurements identify the running environment. Approved deployment hashes are recorded in on-chain KMS contracts.',
          sources: ['litAttestation', 'litKms'],
        },
      },
      {
        dimension: 'Authorization',
        provider: {
          text: 'Data collaborators configure workload identity and IAM policies. Custom-audience attestation tokens also support resources outside Google Cloud.',
          sources: ['googlePolicy'],
        },
        lit: {
          text: 'Lit runs the confidential infrastructure. Contract-governed runtime key release makes deployment authorization publicly inspectable.',
          sources: ['litKms'],
        },
      },
      {
        dimension: 'Change control',
        provider: {
          text: 'Image conditions and role bindings are configured through the collaborator’s cloud resource policies.',
          sources: ['googlePolicy'],
        },
        lit: {
          text: 'An approved hash change is an on-chain transaction; deployment is a separate operational step.',
          sources: ['litGovernance'],
        },
      },
    ],
    assessment:
      'Lit combines confidential execution with programmable keys and on-chain permissions. A Lit Action can read external data, decrypt a secret, or sign a transaction; collaborators can inspect the runtime’s release approvals on Base. Choose Lit when private computation and authorized actions belong in one application. AI deployments are scoped with our team.',
    assessmentSources: ['litActions', 'litKms', 'litChain'],
    tradeoff:
      'Both require trusted hardware, correct application code, and sound policy. For AI on Lit, scope the model, compute requirements, data boundary, and egress with the team. This comparison does not establish equivalent GPU support, training capacity, or latency.',
  },
  {
    slug: 'fortanix',
    provider: 'Fortanix',
    category: 'compute',
    scope:
      'Fortanix Confidential Computing Manager (CCM), with platform-specific attestation; Lit Protocol using the ChainSecured method.',
    headline: 'Review workload approvals without control-plane access.',
    introduction:
      'Compare CCM’s role-managed build approvals with runtime authorization recorded on a public chain.',
    rows: [
      {
        dimension: 'Software identity',
        provider: {
          text: 'CCM registers application measurements and validates enclave attestations. Measurements depend on the hardware platform and application build.',
          sources: ['fortanixArchitecture', 'fortanixBuild'],
        },
        lit: {
          text: 'A verifier can compare the attested environment with the expected, image-pinned application configuration.',
          sources: ['litAttestation'],
        },
      },
      {
        dimension: 'Approvals',
        provider: {
          text: 'CCM’s documented workflow lets Administrator or Editor roles approve domains and builds; approved applications can obtain CCM-issued TLS certificates.',
          sources: ['fortanixApprovals'],
        },
        lit: {
          text: 'The KMS checks runtime measurements against contract whitelists. Those approval records are available on Base.',
          sources: ['litKms'],
        },
      },
      {
        dimension: 'Governance',
        provider: {
          text: 'Application approvals, node enrollment, certificate issuance, and audit events are managed through the CCM control plane.',
          sources: ['fortanixArchitecture'],
        },
        lit: {
          text: 'Hosted release approvals use a documented Lit-controlled 2-of-4 Safe without a timelock. Approvals are public and separate from deployment.',
          sources: ['litGovernance'],
        },
      },
    ],
    assessment:
      'Give partners and auditors a direct view of approved runtime versions, without provisioning them into Lit’s management tools. Lit records deployment approvals on Base, where another party can inspect the governing contract and its transactions. Choose Lit when release authorization must be independently reviewable by organizations outside the team operating the workload.',
    assessmentSources: ['litKms', 'litGovernance'],
    tradeoff:
      'Fortanix already checks code identity and supports confidential workloads. Lit’s case is public governance of the runtime, not exclusive use of attestation. AI deployment still requires a workload-specific assessment of hardware, model handling, and outputs.',
  },
  {
    slug: 'tinfoil',
    provider: 'Tinfoil',
    category: 'compute',
    scope:
      'Tinfoil private AI and containers; Lit Protocol using the ChainSecured method.',
    headline: 'Connect private computation to authorized actions.',
    introduction:
      'Compare attested AI and containers with an execution model that integrates programmable keys and on-chain permissions.',
    rows: [
      {
        dimension: 'Verification',
        provider: {
          text: 'SDKs check hardware attestation against build measurements linked to source through transparency logs. A mismatch stops the connection.',
          sources: ['tinfoilVerification'],
        },
        lit: {
          text: 'Attestation identifies the environment; a verifier can inspect its approved software measurements and the governing contract state.',
          sources: ['litAttestation', 'litKms'],
        },
      },
      {
        dimension: 'Release authority',
        provider: {
          text: 'Published configuration and build measurements link source releases to enclave identities. Model commitments can also be checked at runtime.',
          sources: ['tinfoilArchitecture'],
        },
        lit: {
          text: 'Runtime key release is conditioned on contract-approved measurements. Hosted approvals use a documented Lit-controlled 2-of-4 Safe without a timelock.',
          sources: ['litKms', 'litGovernance'],
        },
      },
      {
        dimension: 'Workload scope',
        provider: {
          text: 'Tinfoil offers private AI and attested custom containers, with automatic verification through its SDKs.',
          sources: ['tinfoilContainers'],
        },
        lit: {
          text: 'Lit Actions execute custom JavaScript and WebAssembly in confidential hardware. For AI training and inference, our team scopes the deployment requirements with you.',
          sources: ['litActions', 'litWasm'],
        },
      },
    ],
    assessment:
      'Choose Lit when a private-compute application also needs to use credentials, sign transactions, or operate wallets under on-chain permissions. Lit Actions combine external data access, secret handling, and signing in the confidential runtime. That makes programmable authority part of the application’s design. Training and inference deployments are scoped with our team.',
    assessmentSources: ['litActions', 'litChain'],
    tradeoff:
      'Tinfoil offers automatic SDK verification, model-identity protections, and custom attested containers. A Lit deployment should specify which code, configuration, model assets, and output paths its verification covers. Attestation alone establishes neither model quality nor freedom from data leakage through permitted outputs.',
  },
];

export function comparisonHref(slug: string) {
  return `${COMPARISON_BASE}/${slug}`;
}
export function getComparison(slug: string) {
  return comparisons.find(item => item.slug === slug);
}
