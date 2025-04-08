'use client';
import {
  ENCRYPTION_LINK,
  LIT_ACTIONS_LINK,
  LIT_WALLET_LINK,
} from '@/utils/constants';
import {
  Box,
  Button,
  Card,
  Container,
  Group,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconArrowRight,
  IconCircleCheck,
  IconPhoto,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import classes from './landing-features-2.module.scss';

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
  },
];

interface ProductProps {
  features: {
    value: string;
    tab: string;
    heading: string;
    paragraph: string;
    features: string[];
    link: string;
  }[];
}
function ProductMobile({ features }: ProductProps) {
  const [activeTab, setActiveTab] = useState(features[0]?.value || '');

  const handleTabChange = (value: string | null) => {
    if (value) {
      setActiveTab(value);
    }
  };

  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      inverted
      classNames={{
        tab: classes.tab,
        list: classes.tabsList,
        panel: classes.tabsPanel,
      }}
    >
      <div className={classes.tabsWrapper} style={{ maxWidth: '100%' }}>
        <Tabs.List>
          {features.map(feature => (
            <Box
              key={feature.value}
              style={{
                minWidth: '120px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Tabs.Tab
                value={feature.value}
                style={{
                  textAlign: 'center',
                  borderBottom: 'none',
                  width: '100%',
                  paddingBottom: '8px',
                }}
              >
                {feature.tab}
              </Tabs.Tab>
            </Box>
          ))}
        </Tabs.List>
      </div>

      {/* Tab panels */}
      {features.map(feature => (
        <Tabs.Panel key={feature.value} value={feature.value}>
          <Group style={{ height: '30rem', width: '100%' }}>
            <div style={{ marginBottom: '4rem', marginTop: '1rem' }}>
              <Title order={2} mb="lg" style={{ width: '70%' }}>
                {feature.heading}
              </Title>
              <Text mb="sm">{feature.paragraph}</Text>
              <Button
                component="a"
                href={feature.link}
                target="_blank"
                rightSection={<IconArrowRight size={16} />}
                variant="light"
                style={{ width: '10rem' }}
              >
                Learn More
              </Button>
            </div>
            <Text mb="xs">Features</Text>
            <ul
              style={{
                marginBottom: 16,
                display: 'flex',
                gap: '.75rem',
                padding: 0,
                listStyle: 'none',
              }}
            >
              {feature.features.map((item, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '.25rem',
                    textWrap: 'nowrap',
                  }}
                >
                  <IconCircleCheck size={16} />
                  <Text size="xs">{item}</Text>
                </li>
              ))}
            </ul>
          </Group>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {feature.image ? (
              <img
                src={feature.image}
                alt={`${feature.heading} illustration`}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  borderRadius: '8px',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '400px',
                  backgroundColor: '#f1f3f5',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconPhoto size={48} color="#adb5bd" />
              </div>
            )}
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

function ProductDesktop({ features }: ProductProps) {
  const [activeTab, setActiveTab] = useState<string>(features[0].tab);

  const currentFeature = features.find(f => f.tab === activeTab);

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      style={{
        height: '800px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // Ensures children don't overflow card borders
        padding: 0, // Remove default padding
      }}
    >
      {/* Content area with padding */}
      <div style={{ padding: '1rem', flex: 1 }}>
        {currentFeature && (
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              height: '100%',
            }}
          >
            {/* Left column: Content and features */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
              }}
            >
              {/* Top content */}
              <div style={{ marginBottom: 'auto', marginTop: '1rem' }}>
                <Title order={3} mb="lg">
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
              </div>

              {/* Bottom features with spacing */}
              <div style={{ marginTop: '2rem' }}>
                <Text mb="xs">Features</Text>
                <ul
                  style={{
                    marginBottom: 16,
                    display: 'flex',
                    gap: '.75rem',
                    padding: 0,
                    listStyle: 'none',
                  }}
                >
                  {currentFeature.features.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '.25rem',
                        textWrap: 'nowrap',
                      }}
                    >
                      <IconCircleCheck size={16} />
                      <Text size="xs">{item}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column: Image */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {currentFeature.image ? (
                <img
                  src={currentFeature.image}
                  alt={`${currentFeature.heading} illustration`}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f1f3f5',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconPhoto size={48} color="#adb5bd" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          width: '100%',
          borderTop: '1px solid #e9ecef',
          marginTop: '.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          {features.map(f => (
            <div
              key={f.tab}
              style={{
                flex: '1',
                textAlign: 'center',
                padding: '0.75rem 0',
                cursor: 'pointer',
                position: 'relative',
                borderTop:
                  f.tab === activeTab
                    ? '4px solid #228be6'
                    : '4px solid transparent',
                marginTop: '-1px', // Offset the parent border
                backgroundColor:
                  f.tab === activeTab ? '#e7f5ff' : 'transparent',
                borderRadius: '0 0 4px 4px',
                fontWeight: f.tab === activeTab ? 'bold' : 'normal',
              }}
              onClick={() => setActiveTab(f.tab)}
            >
              {f.tab}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

const LandingProduct2 = () => {
  const mobile = useMediaQuery(`(max-width: 48em)`);

  return (
    <div>
      <Container
        style={{
          padding: '8rem .5rem',
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
        >
          Lit Protocol fills a vital gap in the decentralized application stack,
          enabling developers to securely manage secrets, digital assets, and
          other sensitive data with programmable, decentralized signing and
          encryption.{' '}
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
