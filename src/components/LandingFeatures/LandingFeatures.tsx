'use client';
import {
  ENCRYPTION_LINK,
  LIT_ACTIONS_LINK,
  LIT_WALLET_LINK,
} from '@/utils/constants';
import { Container } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import Product from './Product';
import GearIcon from './assets/GearIcon';
import ToolsIcon from './assets/ToolsIcon';
import ApproveIcon from './assets/ApproveIcon';
import UnifyIcon from './assets/UnifyIcon';
import BuildIcon from '../icons/BuildIcon';
import LockIcon from './assets/LockIcon';
import VaultIcon from './assets/VaultIcon';
import HandKeyIcon from '../icons/HandKeyIcon';
import UniversalIcon from './assets/UniversalIcon';
import agentWalletAnim from '@/animations/agent-wallet.json';
import interoperabilityAnim from '@/animations/interoperability.json';
import userDataAnim from '@/animations/user-data.json';

// need to add images

const features = [
  {
    value: 'first',
    title: 'Agent Wallets',
    heading: 'Universal Accounts For User Controlled Automation ',
    paragraph:
      'Unlock true agent autonomy without sacrificing user control. Define exactly what agents can do through user-delegated permissions and policies enforced by Lit Actions.',
    features: [
      {
        icon: UniversalIcon,
        slug: 'universal accounts for every chain and platform',
      },
      { icon: ApproveIcon, slug: 'user authorization' },
      { icon: ToolsIcon, slug: 'On-chain, open source tools' },
    ],
    image: agentWalletAnim,
    link: LIT_WALLET_LINK,
    cta: 'Create Agent Wallets',
    imageRight: true,
  },
  {
    value: 'second',
    title: 'Interoperability',
    heading: 'Program Private Keys',
    paragraph:
      'Break down blockchain silos with programmable private keys for seamless interoperability. Lit Actions allow you to embed immutable signing logic and condition checks directly into on and off chain apps.',
    features: [
      { icon: GearIcon, slug: 'Automate cross-chain liquidity' },
      { icon: VaultIcon, slug: 'Build secure, programmable vaults' },
      {
        icon: UnifyIcon,
        slug: 'Unify disparate Web3 and Web2 systems under a single, cryptographic control layer',
      },
    ],
    image: interoperabilityAnim,
    link: ENCRYPTION_LINK,
    cta: 'Build with Lit Actions',
    imageRight: false,
  },
  {
    value: 'third',
    title: 'User Owned Data',
    heading: 'Private Data On The Open Web',
    paragraph:
      'Build applications where private data lives on the open web but remains verifiably under user control.',
    features: [
      {
        icon: LockIcon,
        slug: 'Define exactly who can decrypt based on dynamic conditions',
      },
      { icon: BuildIcon, slug: 'Build user owned data and data marketplaces' },
      { icon: HandKeyIcon, slug: 'Put users in control' },
    ],
    image: userDataAnim,
    link: LIT_ACTIONS_LINK,
    cta: 'Build with Encryption',
    imageRight: true,
  },
];

const LandingProduct2 = () => {
  const mobile = useMediaQuery(`(max-width: 48em)`);

  return (
    <div className="bg-coal-950 text-off-white relative overflow-x-hidden">
      <div className="absolute -left-[2rem] top-[50rem] md:top-[15rem] z-0 pointer-events-none w-[220%] md:w-[115%] opacity-70">
        <img src="/textures/product.png" alt="" className="w-full h-auto" />
      </div>
      <Container
        size="lg"
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 10,
        }}
        className='!my-[4rem] md:!my-0'
      >
        <Product features={features} />
      </Container>
    </div>
  );
};

export default LandingProduct2;
