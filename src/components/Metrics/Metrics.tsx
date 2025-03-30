import { Container, Group, Text } from '@mantine/core';
import React from 'react';
import styles from './metrics.module.scss';

// need to connect to data dynamically

interface NumbersProps {
  number: string;
  subtext: string;
}

const data = [
  { number: '$50M+', subtext: 'Total Value Managed in Wallet Secured by Lit Protocol' },
  { number: '$154M+', subtext: 'Total Volume Transacted in Wallet Secured by Lit Protocol' },
  { number: '1M+', subtext: 'Data Points Decrypted by Lit Protocol' },
];
function NumberItem({ number, subtext }: NumbersProps) {
  return (
    <Group
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        alignItems: 'flex-start',
        width: '70%',
      }}
    >
      <Text className={styles.metric}>{number}</Text>
      <Text style={{ fontSize: '.875rem', textTransform: 'uppercase' }}>
        {subtext}
      </Text>
    </Group>
  );
}

const Metrics = () => {

  return (
    <Container className={styles.wrapper}>
      <Group className={styles.container}>
        <Text style={{ display: 'flex', alignItems: 'flex-start' }}>
          Securing the Decentralized World:
        </Text>
        <Group className={styles.groupedMetrics}>
          <NumberItem number={data[0].number} subtext={data[0].subtext} />
          <NumberItem number={data[1].number} subtext={data[1].subtext} />
          <NumberItem number={data[2].number} subtext={data[2].subtext} />
        </Group>
      </Group>
    </Container>
  );
};

export default Metrics;
