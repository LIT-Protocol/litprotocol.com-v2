'use client';

import { Button, Container, Group, Text, Title } from '@mantine/core';
import styles from './landing-hero.module.scss';
import { CONTACT_FORM, DOCS_LINK } from '@/utils/constants';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import LandingPartners from '../LandingPartners/LandingPartners';
import { BlogCarousel } from '../BlogCarousel/BlogCarousel';

const LandingHero = () => {
  return (
    <div className={styles.root}>
      <Container size="lg">
        <div className={styles.inner}>
          <div className={styles.content}>
            <Title className={styles.title}>
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                Universal Control
              </Text>{' '}
              For Web3 Builders
            </Title>

            <Text className={styles.description} mt={30}>
              Lit Protocol’s decentralized signing & encryption network powers
              interoperability, data sovereignty & autonomous systems.
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
                Start building
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
        <BlogCarousel />
      </Container>
    </div>
  );
};

export default LandingHero;
