'use client';
import {
  ENCRYPTION_LINK,
  LIT_ACTIONS_LINK,
  LIT_WALLET_LINK,
} from '@/utils/constants';
import {
  Button,
  Card,
  Container,
  Group,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowRight, IconCircleCheck } from '@tabler/icons-react';
import React, { useState } from 'react';

const features = [
  {
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
  },
  {
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
  },
  {
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
  },
];

interface ProductProps {
  features: {
    tab: string;
    heading: string;
    paragraph: string;
    features: string[];
    link: string;
  }[];
}
function ProductMobile({ features }: ProductProps) {
  return <Card></Card>;
}

function ProductDesktop({ features }: ProductProps) {
  const [activeTab, setActiveTab] = useState<string>(features[0].tab);

  const currentFeature = features.find(f => f.tab === activeTab);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ height: '500px', display: 'flex', justifyContent: 'space-between' }}
    >
      {currentFeature && (
        <>
          <Title order={3} mb="xs">
            {currentFeature.heading}
          </Title>
          <Text mb="sm">{currentFeature.paragraph}</Text>
          <Button
            component="a"
            href={currentFeature.link}
            target="_blank"
            rightSection={<IconArrowRight size={16} />}
            variant="light"
            style={{ width: '10rem' }}
          >
            Learn More
          </Button>
          <Group
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0',
            }}
          >
            <Text>Features</Text>
            <ul style={{ marginBottom: 16, display: 'flex', gap: '.75rem' }}>
              {currentFeature.features.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '.25rem' }}>
                  <IconCircleCheck size={16} />
                  <Text>{item}</Text>
                </li>
              ))}
            </ul>
          </Group>
        </>
      )}

      <Tabs
        value={activeTab}
        onChange={value => value && setActiveTab(value)}
        mt="lg"
        variant="pills"
      >
        <Tabs.List grow>
          {features.map(f => (
            <Tabs.Tab key={f.tab} value={f.tab}>
              {f.tab}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </Card>
  );
}

const LandingProduct2 = () => {
  const mobile = useMediaQuery(`(max-width: 48em)`);

  return (
    <div>
      <Container
        style={{
          padding: '8rem 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '8rem',
        }}
      >
        <Text
          style={{
            fontSize: '1.35rem',
            fontWeight: 'bold',
            marginLeft: '4rem',
          }}
        >
          Lit Protocol fills a vital gap in the decentralized application stack,
          enabling developers to securely manage secrets, digital assets, and
          other sensitive data with programmable, decentralized signing and
          encryption.{' '}
        </Text>
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
