import { Card, Group, Text, ThemeIcon } from '@mantine/core';
import { useEffect, useState } from 'react';
import styles from './lit-network.module.scss';

interface NetworkCardProps {
  value: string;
  icon: React.FC<any>;
  title: React.ReactNode;
  detail: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
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

  const cardClass = `${isSelected && !wasSelected ? 'animate-fade-in' : ''} ${
    !isSelected && wasSelected ? 'animate-fade-out' : ''
  }`;

  return (
    <Card
      radius="md"
      className={`${cardClass} w-[500px] h-[6rem] !text-pearl-500 duration-300 ease-in-out`}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        background: isSelected
          ? 'linear-gradient(to right, rgba(124, 131, 219, 0.25), #0A0F19)'
          : 'rgba(107, 114, 128, 0.2)',
        border: isSelected ? '1px solid #7C83DB' : 'none',
      }}
    >
      {isSelected ? (
        <>
          <Group className="uppercase">
            <Text fw={700}>{title}</Text>
          </Group>
          <Text size="sm">{detail}</Text>
        </>
      ) : (
        <>
          <Group className="uppercase">
            <Text fw={700}>{title}</Text>
          </Group>
          <Text size="sm">{detail}</Text>
        </>
      )}
    </Card>
  );
}

export default NetworkCardDesktop;
