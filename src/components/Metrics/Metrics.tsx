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
    number: '$50M+',
    subtext: 'Total Value Managed by Lit Protocol',
  },
  {
    id: 'totalVolume',
    number: '$154M+',
    subtext: 'Total Volume Processed by Lit Protocol',
  },
  {
    id: 'totalDataPoints',
    number: '1M+',
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
      <Text
        className={`!text-[6rem]/[5.8rem] h-[6.5rem] mb-[.5rem] 
 ${className}`}
      >
        {number}
      </Text>
      <Text
        className="!text-cool-gray-500 !mb-[1rem]"
        style={{ textTransform: 'uppercase' }}
      >
        {subtext}
      </Text>
    </Group>
  );
}

const Metrics = () => {
  const [metrics, setMetrics] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dune-data');

        console.log(response);

        if (response.ok) {
          const metrics = await response.json();

          // Update data with fetched values
          setMetrics([
            {
              id: 'totalValue',
              number: metrics.totalValue ?? '$0M+',
              subtext: 'Total Value Managed by Lit Protocol',
            },
            {
              id: 'totalVolume',
              number: metrics.totalVolume ?? '$0M+',
              subtext: 'Total Volume Processed by Lit Protocol',
            },
            {
              id: 'totalDataPoints',
              number: metrics.totalDataPoints ?? '0M+',
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
    <div className="pt-[7.5rem] pb-[5rem] bg-coal-950 text-white relative overflow-hidden">
      <Container size="lg" style={{ zIndex: 10, position: 'relative', height: '100%' }}>
        <Group className="flex !items-start !justify-start md:!justify-between w-full md:!gap[6rem]">
          <Title
            style={{
              fontSize: '2rem',
              width: '22.8rem',
            }}
          >
            Securing the Decentralized World
          </Title>
          <Group className="flex !text-left mt-16 items-start justify-center md:w-1/2 !gap-[4rem] !flex-col">
            {(loading ? defaultData : metrics).map((item, index) => (
              <NumberItem
                key={item.id}
                className={`metric-${index + 1}`}
                number={item.number}
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
