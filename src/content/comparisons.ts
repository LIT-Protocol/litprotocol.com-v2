export const REVIEWED_ON = 'September 16, 2026';
export const COMPARISON_BASE = '/compare';

export const sources = {
  litAi: {
    title: 'Lit: Confidential AI containers and egress controls',
    url: 'https://developer.litprotocol.com/ai/overview',
  },
  litAccountCode: {
    title: 'Chipotle: account mutation authorization (reviewed source)',
    url: 'https://github.com/LIT-Protocol/chipotle/blob/b7ce97fbc106d161e1378e8d97b65870429a070a/lit-api-server/blockchain/lit_node_express/contracts/AccountConfigFacets/AppStorage.sol',
  },
  litUpgradeCode: {
    title: 'Chipotle: contract owner upgrade authority (reviewed source)',
    url: 'https://github.com/LIT-Protocol/chipotle/blob/b7ce97fbc106d161e1378e8d97b65870429a070a/lit-api-server/blockchain/lit_node_express/libraries/diamond/DiamondCutFacet.sol',
  },
  litVerification: {
    title: 'Lit: verification and contract administration',
    url: 'https://developer.litprotocol.com/architecture/verification/full-verification',
  },
  litActions: {
    title: 'Lit: Action runtime and code-bound permissions',
    url: 'https://developer.litprotocol.com/lit-actions',
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
  turnkeyArchitecture: {
    title: 'Turnkey whitepaper: authorization, state freshness, and signing',
    url: 'https://whitepaper.turnkey.com/architecture',
  },
  turnkeyRecovery: {
    title: 'Turnkey: Disaster recovery',
    url: 'https://docs.turnkey.com/security/disaster-recovery',
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
  fortanixBuild: {
    title: 'Fortanix: Application measurements',
    url: 'https://support.fortanix.com/docs/fortanix-ccm-create-application-build',
  },
  tinfoilVerification: {
    title: 'Tinfoil: How verification works',
    url: 'https://docs.tinfoil.sh/verification/verification-in-tinfoil',
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
  assessment: Claim;
  parity: Claim;
  rows: { dimension: string; lit: Claim; provider: Claim }[];
  custody: Claim;
  detail?: { title: string; text: string; sources: SourceId[] };
};

// Shared claims describe Chipotle ChainSecured, never the legacy MPC network.
const accountAuthority: Claim = {
  text: 'Your account wallet approves permission changes on Base. A usage API key can run authorized Actions but cannot change those permissions.',
  sources: ['litAccountCode', 'litChain'],
};
const containerApproval: Claim = {
  text: 'Approvers designated by the deployment’s on-chain governance authorize changes to container code or network policy. Each change creates a new measured release.',
  sources: ['litAi', 'litKms'],
};
const runtimeAuthority: Claim = {
  text: 'The approvers authorized by the governance contracts can approve runtime releases. The key-management system checks on-chain approval and hardware attestation before releasing keys. Deploying new code is not enough.',
  sources: ['litKms', 'litGovernance'],
};
const computeAvailability: Claim = {
  text: 'The runtime host can stop execution. Key release also depends on the key-management service. On-chain approval does not guarantee continued service or recovery.',
  sources: ['litAi', 'litKms'],
};
const serviceDependency: Claim = {
  text: 'The API operator or runtime host can interrupt normal signing. On-chain permissions remain inspectable, but execution still needs the runtime and key-management system. Recovery requires a separate plan.',
  sources: ['litArchitecture', 'litKms'],
};

export const comparisons: Comparison[] = [
  {
    slug: 'turnkey',
    provider: 'Turnkey',
    category: 'wallets',
    scope: 'Lit Chipotle in ChainSecured mode and Turnkey’s hosted wallet infrastructure on AWS Nitro.',
    headline: 'Your wallet rules, secured on-chain.',
    introduction: 'A wallet’s security depends on who can change its rules, approve its software, and keep it available. Lit enforces permissions and runtime approval through public contracts.',
    assessment: {
      text: 'Your account decides which Actions can use each wallet key. Each Action is identified by its code hash, and the runtime checks your on-chain permissions. The runtime itself must have on-chain approval to receive its keys.',
      sources: ['litGroups', 'litKms'],
    },
    parity: {
      text: 'Both use hardware isolation and software verification. Turnkey’s signed requests and authenticated policy state protect against ordinary host or database tampering. AWS account access alone is not signing authority.',
      sources: ['turnkeyArchitecture', 'turnkeyVerified', 'litAttestation'],
    },
    rows: [
      {
        dimension: 'Who can change the permissions?',
        lit: accountAuthority,
        provider: {
          text: 'Customer authorization governs policy changes within Turnkey’s enclave system. Its integrity depends on the approved enclave applications and the operator quorums that authorize them.',
          sources: ['turnkeyArchitecture', 'turnkeyQuorum'],
        },
      },
      {
        dimension: 'Who can approve replacement code?',
        lit: runtimeAuthority,
        provider: {
          text: 'Turnkey’s operator quorums authorize enclave software and service-secret provisioning. AWS supplies the Nitro attestation root; the operator approval process determines which code is trusted with secrets.',
          sources: ['turnkeyQuorum'],
        },
      },
      {
        dimension: 'Who can stop access?',
        lit: serviceDependency,
        provider: {
          text: 'Signing and normal key export require Turnkey’s service. Its disaster-recovery documentation describes provider restoration; that is distinct from a customer’s independently tested exit path.',
          sources: ['turnkeyArchitecture', 'turnkeyRecovery'],
        },
      },
    ],
    custody: {
      text: 'Custody involves more than who can read a private key. Ask who can sign, alter authorization, approve replacement software, and restore access without the provider. Lit makes account authority and runtime approvals inspectable on-chain. You still need to check who can approve upgrades and how you would regain access if service stops.',
      sources: ['litChain', 'litGovernance', 'turnkeyArchitecture'],
    },
    detail: {
      title: 'The operator is part of the threat model',
      text: 'Turnkey’s security depends on its enclave code and the operator quorums that approve it. Attestation can establish that approved code is running; it cannot establish that the people approving it made a safe choice. Lit records and enforces runtime approval through public contracts. The approval process remains part of the security model.',
      sources: ['turnkeyArchitecture', 'turnkeyQuorum', 'litGovernance'],
    },
  },
  {
    slug: 'privy',
    provider: 'Privy',
    category: 'wallets',
    scope: 'Lit Chipotle in ChainSecured mode and Privy’s TEE wallet infrastructure.',
    headline: 'See who controls your wallet’s permissions.',
    introduction: 'Compare who can change a wallet’s permissions and who can replace the software that enforces them.',
    assessment: {
      text: 'Lit records account permissions and authorized code on-chain. Users and applications can check the same rules directly, without relying on the wallet provider’s API.',
      sources: ['litChain', 'litGroups'],
    },
    parity: {
      text: 'Both protect key operations inside confidential hardware. Privy also verifies authorization signatures and enforces wallet policies in its enclave.',
      sources: ['privyArchitecture', 'privyPolicies', 'litAttestation'],
    },
    rows: [
      { dimension: 'Who can change the permissions?', lit: accountAuthority, provider: {
        text: 'Owners and authorization-key quorums control wallet actions through Privy’s API. Those rules are enforced by its enclave; they are not customer permissions recorded in Lit’s public contract system.',
        sources: ['privyPolicies'],
      } },
      { dimension: 'Who can approve replacement code?', lit: runtimeAuthority, provider: {
        text: 'Privy documents multiple reviewers, protected builds, hardware keys, and staged deployments. These constrain release operators; the cited architecture does not establish a public, on-chain runtime approval gate.',
        sources: ['privyArchitecture'],
      } },
      { dimension: 'Who can stop access?', lit: serviceDependency, provider: {
        text: 'Wallet actions, including normal key export, go through Privy’s authorization and enclave path. Evaluate the actual recovery setup separately from the wallet’s ownership label.',
        sources: ['privyPolicies'],
      } },
    ],
    custody: {
      text: 'A user-held authorization key is meaningful control. The next question is who can change the system that recognizes it. Lit makes account permissions and runtime approvals visible on-chain, while keeping their separate upgrade authorities explicit.',
      sources: ['privyPolicies', 'litVerification'],
    },
  },
  {
    slug: 'fireblocks',
    provider: 'Fireblocks',
    category: 'wallets',
    scope: 'Lit Chipotle in ChainSecured mode and Fireblocks Vault infrastructure. Fireblocks deployments and recovery arrangements vary.',
    headline: 'Control the permission to sign.',
    introduction: 'Look beyond the key shares. Compare who controls signing policy, approves software, and can withhold a signature.',
    assessment: {
      text: 'Use Lit to power hot wallets and vaults with signing rules expressed as code and governed on-chain. A permitted Action can evaluate external information before using a wallet. Authority follows the account’s contract permissions, rather than participation in an MPC signing threshold.',
      sources: ['litActions', 'litGroups', 'litArchitecture'],
    },
    parity: {
      text: 'Both combine key protection with transaction authorization. Fireblocks uses MPC and hardware-protected components. Chipotle uses keys inside an attested runtime; it is not an MPC wallet network.',
      sources: ['fireblocksArchitecture', 'litArchitecture'],
    },
    rows: [
      { dimension: 'Who can change the permissions?', lit: accountAuthority, provider: {
        text: 'Workspace policy and approval roles govern transactions alongside the signing threshold. Assess who administers those roles and co-signers, not just how many key shares exist.',
        sources: ['fireblocksArchitecture'],
      } },
      { dimension: 'Who can approve replacement code?', lit: runtimeAuthority, provider: {
        text: 'Software control depends on the deployed Fireblocks components and co-signers. The cited overview does not identify every authority that can approve replacement code; verify that authority for your deployment.',
        sources: ['fireblocksArchitecture'],
      } },
      { dimension: 'Who can stop access?', lit: serviceDependency, provider: {
        text: 'Normal signing needs enough participating shares. Fireblocks documents recovery for lost signing devices or suspended operations. Confirm the required backups and recovery materials are in place.',
        sources: ['fireblocksRecovery'],
      } },
    ],
    custody: {
      text: 'A party can lack enough shares to steal funds yet still be necessary for everyday access. Fireblocks’ documented recovery path matters here. Lit records on-chain which signing code your account authorizes. That does not by itself give it a stronger recovery path without a provider.',
      sources: ['fireblocksRecovery', 'litChain'],
    },
  },
  {
    slug: 'google-cloud',
    provider: 'Google Confidential Cloud',
    category: 'compute',
    scope: 'Lit’s on-chain approval method for confidential containers and Google Confidential Space, rather than every Google Cloud confidential-computing product. Contact Lit to plan an AI deployment.',
    headline: 'Approve private compute through on-chain rules.',
    introduction: 'Confidential hardware protects execution. The next question is who can authorize the workload, grant it data, and change those decisions.',
    assessment: {
      text: 'Lit requires on-chain approval for container releases and checks it before releasing runtime keys. Teams can inspect which releases were approved.',
      sources: ['litAi', 'litKms'],
    },
    parity: {
      text: 'Both use attestation to identify software. Google Confidential Space can restrict data access to specific workload image digests, so a workload operator cannot simply substitute arbitrary code and retain that access.',
      sources: ['googlePolicy', 'googleAssertions', 'litAttestation'],
    },
    rows: [
      { dimension: 'Who can change the permissions?', lit: containerApproval, provider: {
        text: 'Data collaborators set attestation conditions and resource permissions. In the standard Google IAM setup, the relevant policy administrators—not merely the workload operator—can change these grants.',
        sources: ['googlePolicy'],
      } },
      { dimension: 'Who can approve replacement code?', lit: runtimeAuthority, provider: {
        text: 'The administrators who can change resource grants and attestation conditions decide which replacement images gain access. Digest-based grants can reject code that has not been approved.',
        sources: ['googlePolicy'],
      } },
      { dimension: 'Who can stop access?', lit: computeAvailability, provider: {
        text: 'In the standard IAM setup, access depends on the collaborator’s resource grants and cloud services. Administrators who can change those grants can withdraw access; attestation does not guarantee availability.',
        sources: ['googlePolicy'],
      } },
    ],
    custody: {
      text: 'For private compute, control means deciding which code can use data and what it may release. Lit binds container code and network policy to releases approved on-chain. Google can separate data owners from workload operators too; the distinction is where authorization lives and who can revise it.',
      sources: ['litAi', 'googlePolicy'],
    },
  },
  {
    slug: 'fortanix',
    provider: 'Fortanix',
    category: 'compute',
    scope: 'Lit’s on-chain approval method for confidential containers and Fortanix Confidential Computing Manager (CCM). Contact Lit to plan an AI deployment.',
    headline: 'See who can approve the next release.',
    introduction: 'Check which software is running and who can approve its replacement.',
    assessment: {
      text: 'Lit uses public contracts to determine which software can receive runtime keys. Teams can inspect approved code hashes and approval history without access to a private management console.',
      sources: ['litKms', 'litAi'],
    },
    parity: {
      text: 'Both identify confidential workloads through attestation and measurements. Fortanix CCM uses approved builds and domains when issuing application certificates.',
      sources: ['fortanixBuild', 'fortanixApprovals', 'litAttestation'],
    },
    rows: [
      { dimension: 'Who can change the permissions?', lit: containerApproval, provider: {
        text: 'CCM’s role and domain administration govern which applications receive certificates. Inspect who can grant those roles and approve domains in the organization’s actual deployment.',
        sources: ['fortanixApprovals'],
      } },
      { dimension: 'Who can approve replacement code?', lit: runtimeAuthority, provider: {
        text: 'CCM Administrator or Editor roles can approve a build. Certificate issuance depends on approval. Those role holders are therefore part of the application’s trust boundary.',
        sources: ['fortanixApprovals'],
      } },
      { dimension: 'Who can stop access?', lit: computeAvailability, provider: {
        text: 'CCM can deny certificate issuance when required build or domain approval is absent. Applications that rely on those certificates depend on the approval administrators and CCM service.',
        sources: ['fortanixApprovals'],
      } },
    ],
    custody: {
      text: 'An approved certificate or valid attestation does not remove the authority of whoever approves the next build. Lit makes that authority and its decisions publicly inspectable. The rules for changing those approvals remain part of the security model.',
      sources: ['fortanixApprovals', 'litGovernance'],
    },
  },
  {
    slug: 'tinfoil',
    provider: 'Tinfoil',
    category: 'compute',
    scope: 'Lit’s on-chain approval method for confidential containers, Tinfoil hosted inference, and Tinfoil Containers. Contact Lit to plan training or inference.',
    headline: 'Verify the runtime. Govern what it can do.',
    introduction: 'Private inference needs protection from the host. Applications that also use credentials, tools, or wallets need a clear authority model for those actions.',
    assessment: {
      text: 'Lit requires on-chain approval for changes to container code and network policy. The attested runtime must match an approved release before receiving its keys.',
      sources: ['litAi', 'litKms'],
    },
    parity: {
      text: 'Both provide software verification and hardware isolation. Tinfoil’s SDK checks attested software against published build evidence and encrypts requests to the enclave.',
      sources: ['tinfoilVerification', 'litAttestation'],
    },
    rows: [
      { dimension: 'Who can change the permissions?', lit: containerApproval, provider: {
        text: 'Tinfoil controls the hosted inference application. With Containers, customers define their application’s permissions through its code and configuration. Review who can publish changes to that configuration.',
        sources: ['tinfoilContainers', 'tinfoilVerification'],
      } },
      { dimension: 'Who can approve replacement code?', lit: runtimeAuthority, provider: {
        text: 'Tinfoil publishes the hosted inference releases; Container customers publish their application configuration. The SDK checks the running software against published build evidence. Review who can approve changes to both the application and its underlying runtime.',
        sources: ['tinfoilContainers', 'tinfoilVerification'],
      } },
      { dimension: 'Who can stop access?', lit: computeAvailability, provider: {
        text: 'Hosted inference and Containers depend on Tinfoil’s running service. Verification can identify the software serving a request; it cannot require the provider to keep serving requests. Evaluate data persistence and recovery separately.',
        sources: ['tinfoilContainers', 'tinfoilVerification'],
      } },
    ],
    custody: {
      text: 'For AI, assess control over data, credentials, releases, and outputs separately. Tinfoil offers a direct private-inference product. Lit uses on-chain approval to authorize container releases and their network policies. The team confirms model support, hardware capacity, and what you can verify for each deployment.',
      sources: ['tinfoilContainers', 'litAi'],
    },
  },
];

export function comparisonHref(slug: string) {
  return `${COMPARISON_BASE}/${slug}`;
}
export function getComparison(slug: string) {
  return comparisons.find(item => item.slug === slug);
}
