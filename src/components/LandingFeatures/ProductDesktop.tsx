import { Card, Group, Text, Title } from '@mantine/core';
import { IconArrowRight, IconPhoto } from '@tabler/icons-react';
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
    features: FeatureItem[];
    link: string;
    image?: string;
    cta: string;
    imageRight: boolean;
  }[];
}

function ProductDesktop({ features }: ProductProps) {
  return (
    <>
      {features.map(feature => (
        <Card
          key={feature.value}
          shadow="sm"
          radius="md"
          style={{
            background: 'transparent',
            height: '37.875rem',
            margin: '5rem 0',
            justifyContent: 'center',
          }}
          className="h-[650px] w-full flex overflow-hidden !p-0 !text-white"
        >
          {/* Use flex order to control image position */}
          <div className="flex h-full gap-[5.5rem] w-full">
            {/* Image container - always 50% width regardless of position */}
            <div
              className={`w-1/2 h-full flex items-center justify-center ${
                feature.imageRight ? 'order-last' : 'order-first'
              }`}
              style={{
                backgroundColor: '#f1f3f5',
                borderRadius: '8px',
              }}
            >
              {feature.image ? (
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <IconPhoto size={48} color="#adb5bd" />
              )}
            </div>

            {/* Content container - always 50% width */}
            <div className="w-1/2 py-[1.75rem] gap-[2.5rem] max-w-[28.75rem] flex flex-col">
              <Group
                style={{
                  gap: '1.5rem',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Text style={{padding: '.28rem .5rem'}} className='bg-lit-orange rounded-sm'>{feature.title}</Text>
                <Title size="2rem">{feature.heading}</Title>
              </Group>
              <Text size="lg" className="mt-3 text-gray-300">{feature.paragraph}</Text>

              {/* Feature items list */}
              <ul className="mt-6 space-y-6">
                {feature.features.map(featureItem => (
                  <li key={featureItem.slug} className="flex items-start gap-3">
                    <featureItem.icon className="h-8 w-8 text-blue-400 flex-shrink-0" />
                    <span className="text-lg capitalize">
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
                className="mt-auto"
              >
                {feature.cta}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}

export default ProductDesktop;
