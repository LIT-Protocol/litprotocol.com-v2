'use client';
import {
  ENCRYPTION_LINK,
  LIT_ACTIONS_LINK,
  LIT_WALLET_LINK,
} from '@/utils/constants';
import { Container, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import ProductMobile from './ProductMobile';
import ProductDesktop from './ProductDesktop';

const features = [
  {
    value: 'first',
    tab: 'Agent Wallets',
    heading: 'Universal Accounts For User Controlled Automation',
    paragraph:
      'Unlock true agent autonomy without sacrificing user control. Lit Protocol enables Agent Wallets using decentralized Programmable Key Pairs (PKPs), giving your agents secure signing capabilities. Define exactly what agents can do through user-delegated permissions and policies enforced by Lit Actions. This creates universal accounts designed for robust, user-controlled automation across multiple chains and platforms.',
    features: [
      'Sessions for Automation',
      'Chain Abstraction',
      'Claimable Wallets',
    ],
    link: LIT_WALLET_LINK,
    cta: 'Create Agent Wallets',
  },
  {
    value: 'second',
    tab: 'Interoperability',
    heading: 'Program Private Keys',
    paragraph:
      'Break down blockchain silos with programmable private keys for seamless interoperability. Lit Actions allow you to embed immutable signing logic and condition checks directly into on and off chain apps. Automate cross-chain liquidity strategies, create universal signers for diverse protocols, or build secure, programmable vaults that manage assets across ecosystems based on verifiable rules. Unify disparate Web3 and Web2 systems under a single, cryptographic control layer powered by Lit Actions.',
    features: [
      'Universal Access Control',
      'Compute Over Secrets',
      'Bridge Web2 and Web3',
    ],
    link: ENCRYPTION_LINK,
    cta: 'Build with Lit Actions',
  },
  {
    value: 'third',
    tab: 'User Owned Data',
    heading: 'Private Data On The Open Web',
    paragraph:
      'Bring privacy to public infrastructure. With Lit Protocol\'s threshold encryption, build applications where private data lives on the open web but remains verifiably under user control. Define exactly who can decrypt sensitive information based on dynamic conditions like blockchain state, token ownership, or even custom logic run by Lit Actions. Users, not centralized platforms, have the authority over their encrypted data, regardless of where it\'s stored.',
    features: [
      'Autonomous Agents',
      'Cross-Network Composability',
      'Build with Ease',
    ],
    link: LIT_ACTIONS_LINK,
    cta: 'Build with Encryption',
  },
];

const LandingProduct2 = () => {
  const mobile = useMediaQuery(`(max-width: 48em)`);

  return (
    <div className="bg-coal-950 text-off-white">
      <Container
        size="lg"
        style={{
          padding: '8rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '8rem',
        }}
      >
        {mobile ? (
          <ProductMobile features={features} />
        ) : (
          <ProductDesktop features={features} />
        )}
      </Container>
    </div>
  );
};

export default LandingProduct2;
