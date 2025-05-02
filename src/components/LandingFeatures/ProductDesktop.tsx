import { Card, Text, Title } from '@mantine/core';
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

function ProductDesktop({ features }: ProductProps) {
  return (
    <>
      {features.map(feature => (
        <Card
          shadow="sm"
          radius="md"
          style={{ background: 'transparent' }}
          className="h-[650px] flex flex-row overflow-hidden !p-0 !text-white"
        >
          <div key={feature.value} className="p-6 flex flex-col">
            <Text className="text-sm font-medium text-blue-400">
              {feature.title}
            </Text>
            <Title className="text-xl font-bold mt-2">{feature.heading}</Title>
            <Text className="mt-3 text-gray-300">{feature.paragraph}</Text>

            {/* Feature items list */}
            <ul className="mt-6 space-y-4">
              {feature.features.map(featureItem => (
                <li key={featureItem.slug} className="flex items-start gap-3">
                  {/* Render the icon component */}
                  <featureItem.icon className="h-5 w-5 text-blue-400 flex-shrink-0" />

                  {/* Display the feature slug text */}
                  <span className="text-sm capitalize">{featureItem.slug}</span>
                </li>
              ))}
            </ul>

            <Button
              style={{ display: 'flex', maxWidth: 'max-content' }}
              target="_blank"
              rightIcon={<IconArrowRight stroke={2} />}
              variant="outline"
              href={feature.link}
              className="flex"
            >{feature.cta}</Button>
          </div>
          <div
            style={{
              width: '50%',
              height: '100%',
              backgroundColor: '#f1f3f5',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconPhoto size={48} color="#adb5bd" />
          </div>
        </Card>
      ))}
    </>
  );
}

export default ProductDesktop;
