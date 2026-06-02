// Authoritative source links for the /stablecoins pages. Keep citations exact.

export const SRC = {
  // GENIUS Act — Pub. L. No. 119-27, 139 Stat. 419 (July 18, 2025)
  geniusText: 'https://www.congress.gov/bill/119th-congress/senate-bill/1582/text',
  geniusPDF: 'https://www.congress.gov/119/plaws/publ27/PLAW-119publ27.pdf',
  // FinCEN/OFAC Proposed Rule — 91 Fed. Reg. (Apr. 10, 2026), Doc. 2026-06963
  npr: 'https://www.federalregister.gov/documents/2026/04/10/2026-06963/permitted-payment-stablecoin-issuer-anti-money-launderingcountering-the-financing-of-terrorism',
  treasury: 'https://home.treasury.gov/news/press-releases/sb0435',
  fincen:
    'https://www.fincen.gov/resources/statutes-regulations/federal-register-notices/permitted-payment-stablecoin-issuer-anti',
  // Lit architecture
  chipotle: 'https://spark.litprotocol.com/introducing-lit-protocol-v3-chipotle/',
  litDocs: 'https://developer.litprotocol.com',
  // Proof of Cloud
  pocSite: 'https://proofofcloud.org/',
  pocPaper: 'https://arxiv.org/abs/2510.12469',
  pocFlashbots: 'https://writings.flashbots.net/mind-the-gap-tee-poc',
};

export type SourceItem = { label: string; note?: string; href: string };
