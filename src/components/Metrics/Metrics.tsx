'use client';
import { Container, Group, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';

interface NumbersProps {
  number: string;
  subtext: string;
  className?: string;
}

// Default data (will be replaced with API data)
const defaultData = [
  {
    id: 'totalValue',
    number: '$0M+',
    subtext: 'Total Value Managed by Lit Protocol',
  },
  {
    id: 'totalVolume',
    number: '$0M+',
    subtext: 'Total Volume Processed by Lit Protocol',
  },
  {
    id: 'totalDataPoints',
    number: '0M+',
    subtext: 'Data Points Decrypted by Lit Protocol',
  },
];

function NumberItem({ number, subtext, className }: NumbersProps) {
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
      <Text className={`!text-[3rem] ${className}`}>{number}</Text>
      <Text size="sm" style={{ textTransform: 'uppercase' }}>
        {subtext}
      </Text>
    </Group>
  );
}

const Metrics = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dune-data');

        if (response.ok) {
          const metrics = await response.json();

          // Update data with fetched values
          setData([
            {
              id: 'totalValue',
              number: metrics.totalValue || '$0M+',
              subtext: 'Total Value Managed by Lit Protocol',
            },
            {
              id: 'totalVolume',
              number: metrics.totalVolume || '$0M+',
              subtext: 'Total Volume Processed by Lit Protocol',
            },
            {
              id: 'totalDataPoints',
              number: metrics.totalDataPoints || '0M+',
              subtext: 'Data Points Decrypted by Lit Protocol',
            },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
        // Keep using default data on error
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="py-[8rem] bg-coal-950 text-white">
      <Container size="lg">
        <Group className="flex !justify-start md:!justify-center !gap-[3rem] w-full md:!gap[6rem]">
          <Title
            order={2}
            style={{ display: 'flex', alignItems: 'flex-start' }}
          >
            Securing the Decentralized World
          </Title>
          <Group className="p-[1rem] flex !text-left items-start justify-center gap-[4rem] !flex-col">
            {data.map((item, index) => (
              <NumberItem
                key={item.id}
                className={`metric-${index + 1}`}
                number={loading ? '...' : item.number}
                subtext={item.subtext}
              />
            ))}
          </Group>
        </Group>
      </Container>
    </div>
  );
};

export default Metrics;
