'use client';
import { Box, Container, Group, Title, Tabs } from '@mantine/core';
import Image from 'next/image'; // Changed to Next.js Image
import React, { useState, useEffect, useRef } from 'react';
import { IconPhoto } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import NetworkCardMobile from './NetworkCardMobile';
import NetworkCardDesktop from './NetworkCardDesktop';
import ShieldIcon from './assets/ShieldIcon';
import BuildIcon from '../icons/BuildIcon';
import HandKeyIcon from '../icons/HandKeyIcon';

const data = [
  {
    value: 'first',
    icon: ShieldIcon,
    title: 'Defense in Depth',
    detail:
      'Lit Protocol combines Threshold Multi-Party Computation (MPC) and Trusted Execution Environments (TEE) to secure keys with multiple layers of cryptographic protection. Secrets stay resilient—even if nodes or hardware are compromised.',
    image: '/images/network1.svg',
  },
  {
    value: 'second',
    icon: BuildIcon,
    title: 'Scalability',
    detail:
      "Deploy applications confidently on a globally distributed network. Lit Protocol's infrastructure scales horizontally, automatically meeting demand spikes without sacrificing security or performance.",
    image: '/images/network2.svg',
  },
  {
    value: 'third',
    icon: HandKeyIcon,
    title: 'Orchestrate Any Secret',
    detail:
      "Manage any private key, credential, or sensitive data across Web3, AI, cloud, and beyond. Lit Protocol's programmable signing and encryption let you securely automate interactions across every environment.",
    image: '/images/network3.svg',
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
        className="flex flex-wrap gap-[3rem] !px-[2rem] [@media(min-width:1150px)]:flex-nowrap overflow-x-hidden max-h-[82rem] md:max-h-none overflow-y-auto"
      >
        <Group className="flex-col !items-start !gap-24 justify-center mb-8">
          <Title
            style={{ fontSize: '2rem' }}
            className="w-full flex justify-start mb-8"
          >
            The Lit Network
          </Title>
          <div className="flex flex-wrap gap-6 min-w-[300px] max-w-full">
            {data.map((card, index) => (
              <NetworkCardDesktop
                key={card.value}
                {...card}
                isSelected={index === selectedIndex}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        </Group>
        {data[selectedIndex]?.image && !imageError ? (
          <div className="w-full flex justify-center items-center [@media(min-width:1150px)]:w-auto [@media(min-width:1150px)]:flex-1 [@media(min-width:1150px)]:py-[6.25rem]">
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
          <div className="flex-1 flex justify-center items-center rounded-md bg-gray-200 w-full max-w-[600px] h-[600px]">
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
