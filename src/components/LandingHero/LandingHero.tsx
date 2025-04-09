'use client';

import { Container, Group, Text, Title } from '@mantine/core';
import { CONTACT_FORM, DOCS_LINK } from '@/utils/constants';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import LandingPartners from '../LandingPartners/LandingPartners';
import { BlogCarousel } from '../BlogCarousel/BlogCarousel';
import { Button } from '../ui/Button';

const LandingHero = () => {
  return (
    <div className="py-[5rem] bg-gradient-to-bl from-blue-950 to-coal-950">
      <Container size="md">
        <div className="flex justify-between md:flex-col">
          <div className="p-[.5rem] md:p-0 md:mr-0">
            <Title className="text-white max-w-[500px] md:!text-[2.5rem]">
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: '#7C83DB', to: '#50E3C2' }}
              >
                Universal Accounts
              </Text>{' '}
              and{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: '#7C83DB', to: '#50E3C2' }}
              >
                Access Control Network
              </Text>{' '}
              for the Autonomous Web
            </Title>

            <Text className="!text-off-white max-w-[500px]" mt={30}>
              Join the builders using Lit Protocol’s decentralized signing and
              encryption to power AI agents, blockchain interoperability, crypto
              wallets, and user-owned data.
            </Text>

            <Group className="mt-8">
              <Button
                href={DOCS_LINK}
                target="_blank"
                rightIcon={<IconArrowNarrowRight stroke={2} />}
              >
                Read the Docs
              </Button>
              <Button variant="outline" href={CONTACT_FORM} target="_blank">
                Contact Us
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
            padding: '2rem 0',
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
