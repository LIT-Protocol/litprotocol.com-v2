// Authoritative source links for the /rwa position paper. Keep citations exact.
// Every figure/date below was independently fact-checked before publication.

export const SRC = {
  // --- Incidents (the realized risk) ---
  // PYUSD ~$300T accidental mint — Oct 15, 2025. Mechanism attributed to Halborn.
  pyusdHalborn:
    'https://www.halborn.com/blog/post/explained-the-paxos-pyusd-incident-october-2025',
  pyusdCnbc:
    'https://www.cnbc.com/2025/10/16/paypals-crypto-partner-mints-300-trillion-stablecoins-in-technical-error.html',
  // Drift ~$285M — Apr 1, 2026 (UTC). 2-of-5 multisig phished; durable-nonce exploit.
  drift:
    'https://blocksec.com/blog/drift-protocol-incident-multisig-governance-compromise-via-durable-nonce-exploitation',
  // Tether $5B over-mint — July 2019 (decimal error), reversed.
  tether:
    'https://www.coindesk.com/markets/2019/07/16/tether-accidentally-minted-5-billion-of-its-stablecoins-then-deleted-them',
  // PAID Network — attack Mar 5, 2021; compromised deployer key with upgrade authority.
  paid:
    'https://paidnetwork.medium.com/paid-network-attack-postmortem-march-7-2021-9e4c0fef0e07',
  // Zama/Circle court-ordered freeze of pooled cUSDC (~$12.6M) — May 30, 2026; reversed June 1, 2026.
  zama:
    'https://www.theblock.co/post/403091/court-ordered-circle-freeze-traps-12-6-million-in-zama-cusdc-contract-amid-overnight-finance-suit',

  // --- Standards & contracts (control by promise) ---
  erc3643: 'https://eips.ethereum.org/EIPS/eip-3643',
  erc3643Audit: 'https://www.quillaudits.com/blog/rwa/erc-3643-explained',
  dstoken: 'https://github.com/securitize-io/dstoken',

  // --- Regulatory context (no dated mandate for securities) ---
  // SEC staff statement on tokenized securities (Jan 28, 2026) — Corp Fin, Inv. Mgmt, Trading & Markets.
  secTokenized:
    'https://www.sec.gov/newsroom/speeches-statements/corp-fin-statement-tokenized-securities-012826-statement-tokenized-securities',
  // Commissioner Peirce, "Enchanting, but Not Magical" (July 9, 2025).
  peirce:
    'https://www.sec.gov/newsroom/speeches-statements/peirce-statement-tokenized-securities-070925',
  // AICPA — controls over stablecoin operations (Jan 12, 2026).
  aicpa:
    'https://www.aicpa-cima.com/news/article/aicpa-updates-criteria-for-stablecoin-reporting-to-address-controls-over',
  // GENIUS Act §17 — payment stablecoins are not securities (so securities have no GENIUS mandate).
  geniusText:
    'https://www.congress.gov/bill/119th-congress/senate-bill/1582/text',
  // MiCA Art. 2 — excludes financial instruments (tokenized securities sit outside MiCA).
  mica: 'https://eur-lex.europa.eu/eli/reg/2023/1114/oj',

  // --- Lit architecture ---
  chipotle: 'https://spark.litprotocol.com/introducing-lit-protocol-v3-chipotle/',
  litDocs: 'https://developer.litprotocol.com',
  // On-Chain KMS — Base smart contracts gate key release; audit trail on Basescan.
  onchainKms:
    'https://developer.litprotocol.com/architecture/verification/onchain-kms',
  pocSite: 'https://proofofcloud.org/',
  pocPaper: 'https://arxiv.org/abs/2510.12469',
};

export type SourceItem = { label: string; note?: string; href: string };
