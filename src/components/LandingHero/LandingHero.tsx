'use client';

import { Container, Group, Text, Title } from '@mantine/core';
import { CONTACT_FORM, DOCS_LINK } from '@/utils/constants';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import LandingPartners from '../LandingPartners/LandingPartners';
import { BlogCarousel } from '../BlogCarousel/BlogCarousel';
import { Button } from '../ui/Button';
import { useEffect, useState } from 'react';

const LandingHero = () => {
  const heroList = ['Wallets.', 'User Data.', 'Agents.', 'Bridges.', 'Vaults.'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(
    (currentIndex + 1) % heroList.length
  );
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start animation
      setIsAnimating(true);

      // Calculate next index
      const next = (currentIndex + 1) % heroList.length;
      setNextIndex(next);

      // After animation completes, update current index and reset animation state
      setTimeout(() => {
        setCurrentIndex(next);
        setIsAnimating(false);
        setNextIndex((next + 1) % heroList.length);
      }, 500); // Match animation duration
    }, 3000); // Change item every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="py-[5rem] bg-gradient-to-b from-blue-950 to-coal-950">
      <Container size="md">
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center text-center p-4 md:p-0">
            <div className="text-center">
              <Text className="!text-white md:!text-[4.5rem]">
                Unlock Autonomy for{' '}
              </Text>

              {/* Animated Text Container */}
              <div
                className="inline-block relative overflow-hidden md:h-28 h-24 align-bottom mx-2"
                style={{
                  minWidth: '320px',
                  verticalAlign: 'bottom',
                }}
              >
                {/* Current Item */}
                <Text
                  component="div"
                  className="absolute top-0 left-0 right-0 !text-white md:!text-[4.5rem]"
                  style={{
                    transition: 'transform 0.5s ease-out',
                    transform: isAnimating
                      ? 'translateY(-100%)'
                      : 'translateY(0)',
                  }}
                >
                  {heroList[currentIndex]}
                </Text>

                {/* Next Item */}
                {/* <Text
                  component="div"
                  className="absolute left-0 right-0 !text-white md:!text-[4.5rem]"
                  style={{
                    transition: 'transform 0.5s ease-out',
                    transform: isAnimating
                      ? 'translateY(-200%)'
                      : 'translateY(0)',
                    top: '100%',
                  }}
                >
                  {heroList[nextIndex]}
                </Text> */}
              </div>
            </div>
            <Text className="!text-off-white max-w-[600px] text-center" mt={30}>
              Lit Protocol is the decentralized network for managing keys and
              secrets. Join the builders using programmable signing and
              encryption to power AI agents, blockchain interoperability, crypto
              wallets, and user-owned data.
            </Text>

            <Group className="mt-8 justify-center">
              <Button
                href={DOCS_LINK}
                target="_blank"
                rightIcon={<IconArrowNarrowRight stroke={2} />}
              >
                Read the Docs
              </Button>
              <Button variant="outline" href={CONTACT_FORM} target="_blank">
                Get In Touch
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
