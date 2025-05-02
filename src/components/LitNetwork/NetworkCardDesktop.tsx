import { Card, Flex, Group, Text } from '@mantine/core';
import { useEffect, useState, useRef } from 'react';

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
  const detailRef = useRef(null);

  useEffect(() => {
    if (isSelected !== wasSelected) {
      setWasSelected(isSelected);
    }
  }, [isSelected]);

  console.log('Icon prop:', Icon);

  return (
    <Card
      radius="md"
      className="w-[500px] h-full !text-pearl-500 transition-all duration-700 ease-in-out"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        background: isSelected ? '#131A26' : 'transparent',
        padding: isSelected ? '2.5rem' : '1.25rem 2.5rem',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isSelected ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <Flex className="gap-[2.5rem]">
        <Icon
          className={`h-[2.25rem] w-[2.25rem] transition-transform duration-300 flex-none ${
            isSelected ? '!fill-electric-blue-500' : '!fill-white'
          }`}
        />

        {/* Text section */}
        <Flex className="flex-col gap-[.75rem]">
          <Text
            size="xl"
            fw={700}
            tt="capitalize"
            className="transition-all duration-700 ease-in-out"
            style={{
              transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            {title}
          </Text>
          <div
            ref={detailRef}
            className="transition-all duration-700 ease-in-out overflow-hidden"
            style={{
              maxHeight: isSelected ? '200px' : '0',
              opacity: isSelected ? 1 : 0,
              transitionProperty: 'max-height, opacity',
            }}
          >
            <Text style={{ lineHeight: '1.68rem' }}>
              {detail}
            </Text>
          </div>
        </Flex>
      </Flex>
    </Card>
  );
}

export default NetworkCardDesktop;
