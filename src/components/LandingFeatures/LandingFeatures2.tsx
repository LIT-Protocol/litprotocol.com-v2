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
    tab: 'Universal Accounts',
    heading: 'Universal Wallets for People and Agents',
    paragraph:
      'Let users, agents, and smart devices access wallets across chains, secured by familiar authentication methods like social logins, passkeys, or any custom integrations.',
    features: [
      'Sessions for Automation',
      'Chain Abstraction',
      'Claimable Wallets',
    ],
    link: LIT_WALLET_LINK,
    cta: 'Build with Lit wallets',
  },
  {
    value: 'second',
    tab: 'Encryption and Access Control',
    heading: 'Flexible Encryption for Private Data Management',
    paragraph:
      'Set custom conditions to control access and perform blind compute over private data, no matter where it’s stored. The Lit network verifies your conditions, enabling decryption only when they are met—never exposing the data itself.',
    features: [
      'Universal Access Control',
      'Compute Over Secrets',
      'Bridge Web2 and Web3',
    ],
    link: ENCRYPTION_LINK,
    cta: 'Build with encryption'
  },
  {
    value: 'third',
    tab: 'Serverless Compute',
    heading: 'Orchestrate Anything with Lit Actions',
    paragraph:
      'Deploy private agents, evolve DeFi, and make private data functional across every part of the web. With Lit Actions, you can build scalable, interoperable products designed for the future of the internet.',
    features: [
      'Autonomous Agents',
      'Cross-Network Composability',
      'Build with Ease',
    ],
    link: LIT_ACTIONS_LINK,
    cta: 'Dive into Lit Actions'
  },
];

const LandingProduct2 = () => {
  const mobile = useMediaQuery(`(max-width: 48em)`);

  return (
    <div className='bg-pearl-500'>
      <Container
        size="lg"
        style={{
          padding: '8rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '8rem',
        }}
      >
        <Title
          order={3}
          style={{
            marginLeft: '4rem',
          }}
          className='w-[90%] py-0 px-[5.rem]'
        >
          Lit Protocol fills a vital gap in the decentralized application stack,
          enabling developers to securely manage secrets, digital assets, and
          other sensitive data with programmable, decentralized signing and
          encryption.
        </Title>
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
