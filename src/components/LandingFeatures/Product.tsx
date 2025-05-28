import { Card, Group, Text, Title } from '@mantine/core';
import { IconArrowRight, IconPhoto } from '@tabler/icons-react';
import { Button } from '../ui/Button';
import dynamic from 'next/dynamic';

const LottieWrapper = dynamic(() => import('./LottieWrapper'), {
  ssr: false,
});

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
    features: FeatureItem[];
    link: string;
    image?: object;
    cta: string;
    imageRight: boolean;
  }[];
}

function Product({ features }: ProductProps) {
  return (
    <>
      {features.map(feature => (
        <Card
          key={feature.value}
          shadow="sm"
          radius="md"
          style={{
            background: 'transparent',
            justifyContent: 'center',
          }}
          className="w-full !h-full flex overflow-x-hidden !m-[1rem_0] md:!m-[5rem_0] !p-0 !text-white md:h-[650px]"
        >
          {/* Main container with responsive flex direction */}
          <div
            className={`flex w-full flex-col md:flex-row md:gap-[5.5rem] ${
              feature.imageRight ? '' : 'md:flex-row-reverse'
            }`}
          >
            {/* Content container - always first on mobile */}
            <div className="w-full py-4 md:py-[1.75rem] md:w-1/2 gap-4 md:gap-[2.5rem] flex flex-col md:max-w-[28.75rem] order-first">
              <Group
                style={{
                  gap: '1.5rem',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Text
                  style={{ padding: '.28rem .5rem' }}
                  className="bg-lit-orange rounded-sm"
                >
                  {feature.title}
                </Text>
                <Title className="!text-[1.25rem] md:!text-[2rem]">
                  {feature.heading}
                </Title>
              </Group>
              <Text className="md:!text-[1.15rem] mt-3 text-gray-300">
                {feature.paragraph}
              </Text>

              {/* Feature items list */}
              <ul className="mt-4 md:mt-6 space-y-4 md:space-y-6">
                {feature.features.map(featureItem => (
                  <li key={featureItem.slug} className="flex items-start gap-3">
                    <featureItem.icon className="h-6 w-6 md:h-8 md:w-8 text-blue-400 fill-blue-400 flex-shrink-0" />
                    <span className="text-base md:text-lg capitalize">
                      {featureItem.slug}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                style={{ display: 'flex', maxWidth: 'max-content' }}
                target="_blank"
                rightIcon={<IconArrowRight stroke={2} />}
                variant="outline"
                href={feature.link}
                className="mt-4 md:mt-auto"
              >
                {feature.cta}
              </Button>
            </div>

            {/* Image container - always below on mobile */}
            <div className="w-[80%] m-auto md:min-h-[31.125rem] md:max-h-[37.875rem] flex items-center justify-center mt-2 md:mt-0 md:w-auto order-last md:m-0">
              {feature.image ? (
                <LottieWrapper animationData={feature.image} />
              ) : (
                <IconPhoto size={48} color="#adb5bd" />
              )}
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}

export default Product;
