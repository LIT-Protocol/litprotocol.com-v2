import { Container, Group, Text, Title } from '@mantine/core';
import React from 'react';
import styles from './metrics.module.scss';

// need to connect to data dynamically

interface NumbersProps {
  number: string;
  subtext: string;
}

const data = [
  { number: '$50M+', subtext: 'Total Value Managed by Lit Protocol' },
  { number: '$154M+', subtext: 'Total Volume Processed by Lit Protocol' },
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
        width: '100%',
      }}
    >
      <Text className={styles.metric}>{number}</Text>
      <Text size="sm" style={{ textTransform: 'uppercase' }}>
        {subtext}
      </Text>
    </Group>
  );
}

const Metrics = () => {

  return (
    <Container size="lg" className={styles.wrapper}>
      <Group className={styles.container}>
        <Title order={2} style={{ display: 'flex', alignItems: 'flex-start' }}>
          Securing the Decentralized World:
        </Title>
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
