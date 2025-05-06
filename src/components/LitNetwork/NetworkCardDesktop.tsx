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

  return (
    <Card
      radius="md"
      className="w-[500px] relative transition-all duration-300 ease-in-out"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        background: isSelected ? '#131A26' : 'transparent',
        boxShadow: isSelected ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      {/* Card content wrapper with fixed padding to prevent jumping */}
      <div className="px-10 py-5">
        <Flex className="gap-10 items-start">
          <div className="flex-none transition-transform duration-300 ease-in-out"
            style={{
              transform: isSelected ? 'scale(1.05)' : 'scale(1)',
            }}>
            <Icon
              className={`h-9 w-9 transition-all duration-300 ${
                isSelected ? '!fill-electric-blue-500' : '!fill-white'
              }`}
            />
          </div>

          {/* Text section with fixed positioning */}
          <Flex className="flex-col gap-3 flex-1 text-pearl-500">
            <Text
              size="xl"
              fw={700}
              tt="capitalize"
              className="transition-all duration-300 ease-in-out"
              style={{
                transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              {title}
            </Text>
            
            {/* Always render the detail, but control its visibility */}
            <div
              ref={detailRef}
              className="transition-all duration-300 ease-in-out overflow-hidden"
              style={{
                maxHeight: isSelected ? '200px' : '0',
                opacity: isSelected ? 1 : 0,
                marginTop: isSelected ? '0.75rem' : '0',
              }}
            >
              <Text style={{ lineHeight: '1.68rem' }}>
                {detail}
              </Text>
            </div>
          </Flex>
        </Flex>
      </div>
      
      {/* Scaling overlay that doesn't affect layout */}
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

export default NetworkCardDesktop;