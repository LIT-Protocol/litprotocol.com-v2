'use client';
import {
  Box,
  Card,
  Container,
  Group,
  Image,
  Progress,
  Tabs,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import React, { useState, useEffect, useRef } from 'react';
import styles from './lit-network.module.scss';
import {
  IconCurrencyRipple,
  IconPackages,
  IconPhoto,
  IconShieldHalf,
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

interface NetworkCardProps {
  value: string;
  icon?: React.FC<any>;
  title: React.ReactNode;
  detail: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

interface NetworkCardMobileProps {
  title: string;
  detail: string;
  value: string;
  activeTab: string;
  setActiveTab: (val: string) => void;
  progress: number;
  tabsRef: React.RefObject<HTMLDivElement>;
}

function NetworkCardMobile({
  title,
  value,
  activeTab,
  progress,
}: NetworkCardMobileProps) {
  return (
    <Box
      style={{
        minWidth: '120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <Tabs.Tab
        value={value}
        style={{
          textAlign: 'center',
          borderBottom: 'none',
          paddingBottom: '8px',
          width: '100%',
        }}
      >
        {title}
      </Tabs.Tab>

      {/* Progress "underline" */}
      <Box
        style={{
          height: '4px',
          width: '100%',
          backgroundColor: '#e0e0e0',
          position: 'relative',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        {/* Only show the progress bar for the active tab */}
        {value === activeTab && (
          <Box
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progress}%`,
              backgroundColor: 'var(--mantine-color-blue-6)',
              transition: 'width 0.1s ease-out',
            }}
          />
        )}
      </Box>
    </Box>
  );
}

function NetworkCardDesktop({
  icon: Icon,
  title,
  detail,
  isSelected,
  onClick,
}: NetworkCardProps) {
  const [wasSelected, setWasSelected] = useState(isSelected);

  useEffect(() => {
    if (isSelected !== wasSelected) {
      setWasSelected(isSelected);
    }
  }, [isSelected]);

  const cardClass = `${isSelected ? styles.selected : styles.unselected} ${
    isSelected && !wasSelected ? styles.fadeIn : ''
  } ${!isSelected && wasSelected ? styles.fadeOut : ''}`;

  return (
    <Card
      radius="md"
      className={cardClass}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {isSelected ? (
        <>
          <Group className={styles.selected__title}>
            <ThemeIcon className={styles.iconOutline}>
              <Icon size={20} stroke={1.5} />
            </ThemeIcon>
            <Text>{title}</Text>
          </Group>
          <Text>{detail}</Text>
        </>
      ) : (
        <div className={styles.unselected__inner}>
          <Group className={styles.unselected__title}>
            <ThemeIcon className={styles.iconOutline}>
              <Icon size={20} stroke={1.5} />
            </ThemeIcon>
            <Text>{title}</Text>
          </Group>
          <Text>{detail}</Text>
        </div>
      )}
    </Card>
  );
}

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

// Inside LitNetwork.tsx or equivalent

const LitNetwork = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(data[0].value);
  const [progress, setProgress] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const tabsRef = useRef(null);

  const handleCardClick = (index: number) => {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
      setActiveTab(data[index].value);
      setProgress(0); // Reset progress on tab switch
    }
  };

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
          <Title order={3} className={styles.cardGroup__heading}>
            The Lit Network
          </Title>
          <Group className={styles.cardGroup__cards}>
            {isMobile ? (
              <div
                style={{ width: '100%' }}
              >
                <Tabs
                  value={activeTab}
                  onChange={val => val && setActiveTab(val)}
                  classNames={{
                    list: styles.tabsList,
                    root: styles.tabsRoot,
                  }}
                  style={{ width: '100%' }}
                >
                  <div
                    style={{
                      width: '100%',
                      position: 'relative',
                    }}
                  >
                    <Tabs.List
                      ref={tabsRef}
                      style={{
                        overflowX: 'scroll', // Change from 'auto' to 'scroll' to force scrollbars
                        display: 'flex',
                        flexWrap: 'nowrap',
                        whiteSpace: 'nowrap',
                        gap: '12px',
                        paddingBottom: '8px',
                        paddingLeft: '8px',
                        paddingRight: '8px',
                        WebkitOverflowScrolling: 'touch',
                        touchAction: 'pan-x', // Add this to explicitly enable horizontal touch scrolling
                        width: 'max-content', // Change from 'auto' to 'max-content'
                        minWidth: '100%',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                      }}
                    >
                      {data.map(tab => (
                        <NetworkCardMobile
                          key={tab.value}
                          {...tab}
                          activeTab={activeTab}
                          setActiveTab={setActiveTab}
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
          <div className={styles.placeholder}>
            <IconPhoto size={48} color="#adb5bd" />
          </div>
        )}
      </Container>
    </div>
  );
};

export default LitNetwork;
