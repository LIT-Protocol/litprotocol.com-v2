import { Card, Flex, Text } from '@mantine/core';
import { useEffect, useState, useRef } from 'react';

interface NetworkCardProps {
  value: string;
  icon: React.FC<any>;
  title: React.ReactNode;
  detail: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

function NetworkCard({
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

  return (
    <Card
      radius="md"
      className="w-full [@media(min-width:1150px)]:w-[500px] h-full relative transition-all duration-300 ease-in-out !p-1 md:!p-4"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        background: isSelected ? '#131A26' : 'transparent',
        boxShadow: isSelected ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
        maxHeight: isSelected ? '300px' : '160px',
      }}
    >
      {/* Card content wrapper with responsive padding */}
      <div className="px-6 py-4 lg:px-10 lg:py-5">
        <Flex className="gap-4 md:gap-10 items-start">
          <div
            className="flex-none transition-transform duration-300 ease-in-out"
            style={{
              transform: isSelected ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <Icon
              className={`h-8 w-8 md:h-9 md:w-9 transition-all duration-300 ${
                isSelected ? '!fill-electric-blue-500' : '!fill-white'
              }`}
            />
          </div>

          {/* Text section */}
          <Flex className="flex-col gap-1 sm:gap-2 md:gap-3 flex-1 text-pearl-500">
            <Text
              size="lg"
              fw={700}
              tt="capitalize"
              className="transition-all duration-300 ease-in-out md:text-xl"
              style={{
                transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
                transformOrigin: 'top center',
              }}
            >
              {title}
            </Text>

            {/* Detail text with responsive sizing */}
            <div
              ref={detailRef}
              className="ease-out overflow-hidden text-sm md:text-base"
              style={{
                maxHeight: isSelected ? '100%' : '0',
                opacity: isSelected ? 1 : 0,
              }}
            >
              <Text className="!leading-[1.5rem] md:!leading-[1.68rem]">
                {detail}
              </Text>
            </div>
          </Flex>
        </Flex>
      </div>

      {/* Scaling overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-in-out"
        style={{
          transform: isSelected ? 'scale(1.02)' : 'scale(1)',
          borderRadius: 'inherit',
          zIndex: -1,
        }}
      />
    </Card>
  );
}

export default NetworkCard;
