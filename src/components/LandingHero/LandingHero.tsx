'use client';

import { Button, Container, Group, Text, Title } from '@mantine/core';
import styles from './landing-hero.module.scss';
import { CONTACT_FORM, DOCS_LINK } from '@/utils/constants';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import LandingPartners from '../LandingPartners/LandingPartners';
import { BlogCarousel } from '../BlogCarousel/BlogCarousel';

const LandingHero = () => {
  return (
    <div className={styles.hero}>
      <Container size="md">
        <div className={styles.inner}>
          <div className={styles.content}>
            <Title className={styles.title}>
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                Universal Accounts
              </Text>{' '}
              and{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                Access Control Network
              </Text>{' '}
              for the Autonomous Web
            </Title>

            <Text className={styles.description} mt={30}>
            Join the builders using Lit Protocol’s decentralized signing and encryption to power AI agents, blockchain interoperability, crypto wallets, and user-owned data.
            </Text>

            <Group>
              <Button
                variant="gradient"
                size="sm"
                className={styles.control}
                mt={40}
                component="a"
                href={DOCS_LINK}
                target="_blank"
                rightSection={<IconArrowNarrowRight stroke={2} />}
              >
                Read the Docs
              </Button>
              <Button
                variant="outline"
                size="sm"
                component="a"
                href={CONTACT_FORM}
                target="_blank"
                className={styles.control}
                mt={40}
              >
                Contact us
              </Button>
            </Group>
          </div>
        </div>
        <LandingPartners />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 0'
          }}
        >
          {' '}
          <BlogCarousel />
        </div>
      </Container>
    </div>
  );
};

export default LandingHero;
