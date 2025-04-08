'use client';
import { Box, Container, Group, Image, Tabs, Title } from '@mantine/core';
import React, { useState, useEffect, useRef } from 'react';
import styles from './lit-network.module.scss';
import {
  IconCurrencyRipple,
  IconPackages,
  IconPhoto,
  IconShieldHalf,
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import NetworkCardMobile from './NetworkCardMobile';
import NetworkCardDesktop from './NetworkCardDesktop';

const data = [
  {
    value: 'first',
    icon: IconShieldHalf,
    title: 'Defense in Depth',
    detail: 'Lorem ipsum',
    // image: '/images/defense.jpg',
  },
  {
    value: 'second',
    icon: IconPackages,
    title: 'Scalability',
    detail: 'Dolor set',
    // image: '/images/scalability.jpg',
  },
  {
    value: 'third',
    icon: IconCurrencyRipple,
    title: 'Decentralized keys, orchestrated onchain',
    detail: 'Blah blah blah',
    // image: '/images/decentralized.jpg',
  },
];

const LitNetwork = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(data[0].value);
  const [progress, setProgress] = useState(0);
  // Reversed the media query to check for desktop instead of mobile
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const tabsRef = useRef(null);

  const handleCardClick = (index: number) => {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
      setActiveTab(data[index].value);
      setProgress(0); // Reset progress on tab switch
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
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(switchTimeout);
    };
  }, [selectedIndex]);

  return (
    <div className={styles.root}>
      <Container size="lg" className={styles.container}>
        <Group className={styles.cardGroup}>
          <Title order={2} className={styles.cardGroup__heading}>
            The Lit Network
          </Title>
          <Group>
            {!isDesktop ? (
              // Mobile view (default)
              <div style={{ width: '100%' }}>
                <Tabs
                  value={activeTab}
                  onChange={val => val && setActiveTab(val)}
                  classNames={{
                    list: styles.tabsList,
                    root: styles.tabsRoot,
                  }}
                >
                  <div
                    className={styles.tabsWrapper}
                    style={{ maxWidth: '100%' }}
                  >
                    <Tabs.List className={styles.tabsList}>
                      {data.map(tab => (
                        <NetworkCardMobile
                          key={tab.value}
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
                          }}
                          progress={activeTab === tab.value ? progress : 0}
                          tabsRef={tabsRef}
                        />
                      ))}
                    </Tabs.List>
                  </div>

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
              </div>
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

        {data[selectedIndex]?.image ? (
          <div className={styles.imageContainer}>
            <Image
              src={data[selectedIndex].image}
              alt={data[selectedIndex].title}
              className={styles.fullImage}
            />
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              height: '600px',
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
      </Container>
    </div>
  );
};

export default LitNetwork;
