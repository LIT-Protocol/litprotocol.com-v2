'use client';
import { Box, Container, Group, Title, Tabs } from '@mantine/core';
import Image from 'next/image'; // Changed to Next.js Image
import React, { useState, useEffect, useRef } from 'react';
import { IconPhoto } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import NetworkCardMobile from './NetworkCardMobile';
import NetworkCardDesktop from './NetworkCardDesktop';
import ShieldIcon from './assets/ShieldIcon';
import BuildIcon from './assets/BuildIcon';
import HandKeyIcon from './assets/HandKeyIcon';

const data = [
  {
    value: 'first',
    icon: ShieldIcon,
    title: 'Defense in Depth',
    detail:
      'Lit Protocol combines Threshold Multi-Party Computation (MPC) and Trusted Execution Environments (TEE) to secure keys with multiple layers of cryptographic protection. Secrets stay resilient—even if nodes or hardware are compromised.',
    image: '/images/litnetwork1.png',
  },
  {
    value: 'second',
    icon: BuildIcon,
    title: 'Scalability',
    detail:
      'Deploy applications confidently on a globally distributed network. Lit Protocol\'s infrastructure scales horizontally, automatically meeting demand spikes without sacrificing security or performance.',
    image: '/images/litnetwork2.png',
  },
  {
    value: 'third',
    icon: HandKeyIcon,
    title: 'Orchestrate Any Secret',
    detail:
      'Manage any private key, credential, or sensitive data across Web3, AI, cloud, and beyond. Lit Protocol\'s programmable signing and encryption let you securely automate interactions across every environment.',
    image: '/images/litnetwork3.png',
  },
];

const LitNetwork = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(data[0].value);
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
  // Reversed the media query to check for desktop instead of mobile
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const tabsRef = useRef(null);

  const handleCardClick = (index: number) => {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
      setActiveTab(data[index].value);
      setProgress(0); // Reset progress on tab switch
      setImageError(false); // Reset error state when switching tabs
    }
  };

  // Make sure desktop and mobile states are synchronized
  useEffect(() => {
    // Find the index of the current activeTab
    const activeIndex = data.findIndex(item => item.value === activeTab);
    if (activeIndex !== -1 && activeIndex !== selectedIndex) {
      setSelectedIndex(activeIndex);
    }
  }, [activeTab, selectedIndex]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 100 / (5 * 20); // 5s, 20fps
        return next >= 100 ? 100 : next;
      });
    }, 50);

    const switchTimeout = setTimeout(() => {
      const nextIndex = (selectedIndex + 1) % data.length;
      setSelectedIndex(nextIndex);
      setActiveTab(data[nextIndex].value);
      setProgress(0); // Reset progress on auto switch
      setImageError(false); // Reset error state when auto-switching
    }, 10000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(switchTimeout);
    };
  }, [selectedIndex]);

  return (
    <div className="bg-coal-950 text-white py-24 px-1">
      <Container
        size="lg"
        className="flex flex-col overflow-x-hidden md:flex-row !px-[2rem] gap-[3rem]"
      >
        <Group className="flex-col !items-start !gap-24 justify-center mb-8">
          <Title
            style={{ fontSize: '2rem' }}
            className="w-full flex justify-center mb-8 md:justify-start"
          >
            The Lit Network
          </Title>
          <Group>
            {!isDesktop ? (
              // Mobile view (default)
              <Tabs
                value={activeTab}
                onChange={val => val && setActiveTab(val)}
                classNames={{
                  list: 'flex w-full p-0 m-1 before:!hidden',
                  root: 'w-full overflow-visible',
                  tab: '!text-pearl-500 data-[active]:!text-periwinkle-500 hover:!bg-pewter-gray-500/50 !rounded-none',
                }}
              >
                <Tabs.List className="flex w-full p-0 m-0">
                  {data.map((tab, index) => (
                    <div
                      key={tab.value}
                      className="flex-1"
                      style={{
                        width: `${100 / data.length}%`,
                        maxWidth: `${100 / data.length}%`,
                        padding: '0 4px',
                      }}
                    >
                      <NetworkCardMobile
                        {...tab}
                        activeTab={activeTab}
                        setActiveTab={val => {
                          setActiveTab(val);
                          const index = data.findIndex(
                            item => item.value === val
                          );
                          if (index !== -1) {
                            setSelectedIndex(index);
                          }
                          setProgress(0);
                          setImageError(false);
                        }}
                        progress={activeTab === tab.value ? progress : 0}
                        tabsRef={tabsRef}
                      />
                    </div>
                  ))}
                </Tabs.List>
                {data.map(tab => (
                  <Tabs.Panel key={tab.value} value={tab.value}>
                    <Box
                      style={{
                        minHeight: '200px',
                      }}
                    >
                      {tab.detail}
                    </Box>
                  </Tabs.Panel>
                ))}
              </Tabs>
            ) : (
              // Desktop view (only for larger screens)
              data.map((card, index) => (
                <NetworkCardDesktop
                  key={card.value}
                  {...card}
                  isSelected={index === selectedIndex}
                  onClick={() => handleCardClick(index)}
                />
              ))
            )}
          </Group>
        </Group>
        {data[selectedIndex]?.image && !imageError ? (
          <div className="flex-1 flex justify-center items-center max-w-[600px] py-[6.25rem]">
            <div className="relative w-[550px] h-[550px]">
              <Image
                src={data[selectedIndex].image}
                alt={data[selectedIndex].title}
                fill
                className="rounded-md object-contain"
                priority
                onError={() => setImageError(true)}
              />
            </div>
          </div>
        ) : (
          <div
            className="flex-1 flex justify-center items-center rounded-md bg-gray-200 w-full max-w-[600px] h-[600px]"
          >
            <IconPhoto size={48} color="#adb5bd" />
            {imageError && (
              <p className="text-gray-500 absolute">Failed to load image</p>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default LitNetwork;