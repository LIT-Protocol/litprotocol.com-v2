// Deliberately illustrative code, not a complete Lit Action or a live attestation.
export const fingerprintExamples = [
  {
    source: 'function maySign(amount) {\n  return amount <= 1000;\n}',
    hash: 'b3ae869f9903afefceefbf7ef3a46b812eeda7715b03737c3f5713645ba7c8da',
  },
  {
    source: 'function maySign(amount) {\n  return amount <= 1001;\n}',
    hash: 'f2a674cf910e7b720fc4eec14e3f4e11821c6d611ac652ade31952cd86769f2b',
  },
] as const;
