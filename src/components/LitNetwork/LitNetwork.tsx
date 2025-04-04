'use client';
import {
  Card,
  Container,
  Group,
  Image,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import React, { useState, useEffect } from 'react';
import styles from './lit-network.module.scss';
import {
  IconCurrencyRipple,
  IconPackages,
  IconPhoto,
  IconShieldHalf,
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

interface NetworkCardProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  detail: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

function NetworkCardMobile({
  icon: Icon,
  title,
  detail,
  isSelected,
  onClick,
}: NetworkCardProps) {
  return <div></div>;
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
    icon: IconShieldHalf,
    title: 'Defense in Depth',
    detail: 'Lorem ipsum',
    image: '/images/defense.jpg',
  },
  {
    icon: IconPackages,
    title: 'Scalability',
    detail: 'Lorem ipsum',
    image: '/images/scalability.jpg',
  },
  {
    icon: IconCurrencyRipple,
    title: 'Decentralized keys, orchestrated onchain',
    detail: 'Lorem ipsum',
    image: '/images/decentralized.jpg',
  },
];

const LitNetwork = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleCardClick = (index: number) => {
    if (index !== selectedIndex && !isAnimating) {
      setIsAnimating(true);
      setSelectedIndex(index);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setSelectedIndex(prevIndex => (prevIndex + 1) % data.length);
        setTimeout(() => setIsAnimating(false), 300);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className={styles.root}>
      <Container size="lg" className={styles.container}>
        <Group className={styles.cardGroup}>
          <Title order={3} className={styles.cardGroup__heading}>
            The Lit Network
          </Title>
          <Group className={styles.cardGroup__cards}>
            {data.map((card, index) =>
              isMobile ? (
                <NetworkCardMobile
                  key={index}
                  {...card}
                  isSelected={index === selectedIndex}
                  onClick={() => handleCardClick(index)}
                />
              ) : (
                <NetworkCardDesktop
                  key={index}
                  {...card}
                  isSelected={index === selectedIndex}
                  onClick={() => handleCardClick(index)}
                />
              )
            )}
          </Group>
        </Group>
        {data.image ? (
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
