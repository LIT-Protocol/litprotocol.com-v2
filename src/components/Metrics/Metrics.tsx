import { Container, Group, Text, Title } from '@mantine/core';
import React from 'react';

// need to connect to data dynamically

interface NumbersProps {
  number: string;
  subtext: string;
  className?: string;
}

const data = [
  { number: '$50M+', subtext: 'Total Value Managed by Lit Protocol' },
  { number: '$154M+', subtext: 'Total Volume Processed by Lit Protocol' },
  { number: '1M+', subtext: 'Data Points Decrypted by Lit Protocol' },
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
            <NumberItem
              className="metric-1"
              number={data[0].number}
              subtext={data[0].subtext}
            />
            <NumberItem
              className="metric-2"
              number={data[1].number}
              subtext={data[1].subtext}
            />
            <NumberItem
              className="metric-3"
              number={data[2].number}
              subtext={data[2].subtext}
            />
          </Group>
        </Group>
      </Container>
    </div>
  );
};

export default Metrics;
