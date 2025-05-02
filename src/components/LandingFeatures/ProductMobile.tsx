import { Box, Group, Tabs, Text, Title } from '@mantine/core';
import {
  IconArrowRight,
  IconCircleCheck,
  IconPhoto,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Button } from '../ui/Button';

interface FeatureItem {
  slug: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface ProductProps {
  features: {
    value: string;
    title: string;
    heading: string;
    paragraph: string;
    features: FeatureItem[]; // Changed from string[] to FeatureItem[]
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
        tab: 'z-1 data-[active]:!text-white data-[active]:!font-bold data-[active]:!bg-gradient-to-b from-periwinkle-700 to-transparent data-[active]:!border-t-4 border-solid !rounded-none data-[active]:!border-periwinkle-500 hover:!bg-pewter-gray-500/50 !border-pewter-gray-500',
        list: 'inline-flex !flex-nowrap w-full p-0 m-0',
        panel: 'h-full',
      }}
    >
      <Tabs.List className="flex w-full">
        {features.map(feature => (
          <Box
            key={feature.value}
            style={{
              flex: '1 1 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '33.333%', // For exactly 3 tabs
            }}
          >
            <Tabs.Tab
              value={feature.value}
              style={{
                textAlign: 'center',
                borderBottom: 'none',
                width: '100%',
                paddingBottom: '8px',
                whiteSpace: 'normal',
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                hyphens: 'auto',
                lineHeight: '1.5', // Increased line height for better readability
                letterSpacing: '0.01em', // Improved kerning/letter spacing
                padding: '8px 4px', // Added horizontal padding to give text more breathing room
              }}
            >
              {feature.tab}
            </Tabs.Tab>
          </Box>
        ))}
      </Tabs.List>

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
            <Group gap="xs" className="w-full">
              <Text mb="xs" tt="uppercase" fw={700}>
                Features
              </Text>

              <div className="flex w-full pb-2">
                {feature.features.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-1 gap-1"
                    style={{
                      width: `${100 / feature.features.length}%`, // Equal width based on number of items
                    }}
                  >
                    <IconCircleCheck
                      size={16}
                      className="text-periwinkle-500 flex-shrink-0 mt-1" // Added mt-1 to align with top of text
                    />
                    <Text
                      size="xs"
                      className="text-wrap"
                      style={{
                        lineHeight: '1.5',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                      }}
                    >
                      {item}
                    </Text>
                  </div>
                ))}
              </div>
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
