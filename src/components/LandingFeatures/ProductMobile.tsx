import { Box, Group, Tabs, Text, Title } from '@mantine/core';
import {
  IconArrowRight,
  IconCircleCheck,
  IconPhoto,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Button } from '../ui/Button';

interface ProductProps {
  features: {
    value: string;
    tab: string;
    heading: string;
    paragraph: string;
    features: string[];
    link: string;
    image?: string;
    cta: string;
  }[];
}
function ProductMobile({ features }: ProductProps) {
  const [activeTab, setActiveTab] = useState(features[0]?.value || '');

  const handleTabChange = (value: string | null) => {
    if (value) {
      setActiveTab(value);
    }
  };

  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      inverted
      classNames={{
        tab: 'z-1 data-[active]:!text-white data-[active]:!font-bold data-[active]:!bg-gradient-to-b  from-periwinkle-700 to-transparent data-[active]:!border-t-4 border-solid !rounded-none data-[active]:!border-periwinkle-500 hover:!bg-pewter-gray-500/50 !border-pewter-gray-500',
        list: 'inline-flex !flex-nowrap gap-8 w-max-content min-w-full p-0 m-0 min-w-[120%]',
        panel: 'h-full',
      }}
    >
      <div
        className="w-full overflow-x-auto overflow-y-hidden m-0 py-[1rem] px-0 flex"
        style={{
          maxWidth: '100%',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}
      >
        <Tabs.List>
          {features.map(feature => (
            <Box
              key={feature.value}
              style={{
                minWidth: '120px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Tabs.Tab
                value={feature.value}
                style={{
                  textAlign: 'center',
                  borderBottom: 'none',
                  width: '100%',
                  paddingBottom: '8px',
                }}
              >
                {feature.tab}
              </Tabs.Tab>
            </Box>
          ))}
        </Tabs.List>
      </div>

      {/* Tab panels */}
      {features.map(feature => (
        <Tabs.Panel key={feature.value} value={feature.value}>
          <Group style={{ height: '30rem', width: '100%' }}>
            <div style={{ marginBottom: '4rem', marginTop: '1rem' }}>
              <Title order={2} mb="lg" style={{ width: '70%' }}>
                {feature.heading}
              </Title>
              <Text mb="lg">{feature.paragraph}</Text>
              <Button
                style={{ display: 'flex', maxWidth: 'max-content' }}
                href={feature.link}
                target="_blank"
                rightIcon={<IconArrowRight size={16} />}
              >
                {feature.cta}
              </Button>
            </div>
            <Group gap="xs">
              <Text mb="xs">Features</Text>
              <ul
                style={{
                  marginBottom: 16,
                  display: 'flex',
                  gap: '.75rem',
                  padding: 0,
                  listStyle: 'none',
                }}
              >
                {feature.features.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '.25rem',
                      textWrap: 'nowrap',
                    }}
                  >
                    <IconCircleCheck
                      size={16}
                      className="text-periwinkle-500"
                    />
                    <Text size="xs">{item}</Text>
                  </li>
                ))}
              </ul>
            </Group>
          </Group>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {feature.image ? (
              <img
                src={feature.image}
                alt={`${feature.heading} illustration`}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  borderRadius: '8px',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '400px',
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
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

export default ProductMobile;
