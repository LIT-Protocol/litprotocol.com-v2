import { Button, Card, Text, Title } from "@mantine/core";
import { IconArrowRight, IconCircleCheck, IconPhoto } from "@tabler/icons-react";
import { useState } from "react";

interface ProductProps {
    features: {
      value: string;
      tab: string;
      heading: string;
      paragraph: string;
      features: string[];
      link: string;
      image?: string;
    }[];
  }
  
  function ProductDesktop({ features }: ProductProps) {
    const [activeTab, setActiveTab] = useState<string>(features[0].tab);
  
    const currentFeature = features.find(f => f.tab === activeTab);
  
    return (
      <Card
        shadow="sm"
        radius="md"
        withBorder
        style={{
          height: '800px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden', // Ensures children don't overflow card borders
          padding: 0, // Remove default padding
        }}
      >
        {/* Content area with padding */}
        <div style={{ padding: '1rem', flex: 1 }}>
          {currentFeature && (
            <div
              style={{
                display: 'flex',
                gap: '2rem',
                height: '100%',
              }}
            >
              {/* Left column: Content and features */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1,
                }}
              >
                {/* Top content */}
                <div style={{ marginBottom: 'auto', marginTop: '1rem' }}>
                  <Title order={3} mb="lg">
                    {currentFeature.heading}
                  </Title>
                  <Text mb="sm">{currentFeature.paragraph}</Text>
                  <Button
                    component="a"
                    href={currentFeature.link}
                    target="_blank"
                    rightSection={<IconArrowRight size={16} />}
                    variant="light"
                    style={{ width: '10rem' }}
                  >
                    Learn More
                  </Button>
                </div>
  
                {/* Bottom features with spacing */}
                <div style={{ marginTop: '2rem' }}>
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
                    {currentFeature.features.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: '.25rem',
                          textWrap: 'nowrap',
                        }}
                      >
                        <IconCircleCheck size={16} />
                        <Text size="xs">{item}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
  
              {/* Right column: Image */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {currentFeature.image ? (
                  <img
                    src={currentFeature.image}
                    alt={`${currentFeature.heading} illustration`}
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
                )}
              </div>
            </div>
          )}
        </div>
  
        <div
          style={{
            width: '100%',
            borderTop: '1px solid #e9ecef',
            marginTop: '.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
            }}
          >
            {features.map(f => (
              <div
                key={f.tab}
                style={{
                  flex: '1',
                  textAlign: 'center',
                  padding: '0.75rem 0',
                  cursor: 'pointer',
                  position: 'relative',
                  borderTop:
                    f.tab === activeTab
                      ? '4px solid #228be6'
                      : '4px solid transparent',
                  marginTop: '-1px', // Offset the parent border
                  backgroundColor:
                    f.tab === activeTab ? '#e7f5ff' : 'transparent',
                  borderRadius: '0 0 4px 4px',
                  fontWeight: f.tab === activeTab ? 'bold' : 'normal',
                }}
                onClick={() => setActiveTab(f.tab)}
              >
                {f.tab}
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  export default ProductDesktop;