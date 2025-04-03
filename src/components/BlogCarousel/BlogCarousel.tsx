import { Carousel } from '@mantine/carousel';
import { Group, Image, Card, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './blog-carousel.module.css';

// You can add these if you have them
// import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

interface ArticleProps {
  image: string;
  title: string;
  category: string;
}

function Article({ image, title, category }: ArticleProps) {
  return (
    <Card className={classes.card}>
      <Group wrap="nowrap" gap={0} style={{ width: '100%', height: '100%' }}>
        <Image 
          src={image} 
          height={160} 
          style={{ maxWidth: '40%', objectFit: 'cover', flexShrink: 0 }} 
        />
        <div className={classes.body}>
          <Text tt="uppercase" c="dimmed" fw={700} size="xs">
            {category}
          </Text>
          <Text className={classes.carouselTitle} mt="xs" mb="md">
            {title}
          </Text>
        </div>
      </Group>
    </Card>
  );
}

// Keep your existing data object
const data = [
  {
    image:
      'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Best forests to visit in North America',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Hawaii beaches review: better than you think',
    category: 'beach',
  },
  {
    image:
      'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Mountains at night: 12 best locations to enjoy the view',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Aurora in Norway: when to visit for best experience',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Best places to visit this winter',
    category: 'tourism',
  },
  {
    image:
      'https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Active volcanos reviews: travel at your own risk',
    category: 'nature',
  },
];

export function BlogCarousel() {

  const slides = data.map(item => (
    <Carousel.Slide key={item.title} className={classes.slide}>
      <Article {...item} />
    </Carousel.Slide>
  ));

  return (
    <div className={classes.carouselWrapper}>
      <Carousel
        withControls
        loop
        slideSize="100%" // Show only one slide at a time
        slideGap={0} // No gap needed since only one slide is visible
        align="center"
        slidesToScroll={1}
        draggable={false} // Optional: disable dragging to ensure clean transitions
        styles={{
          root: { 
            width: '100%',
            overflow: 'hidden'
          },
          viewport: { 
            overflow: 'hidden' // Hide overflow to ensure only current slide is visible
          },
          container: { 
            display: 'flex',
            alignItems: 'stretch'
          },
          slide: { 
            display: 'flex',
            flex: '0 0 100%', // Take full width, don't shrink
            width: '100%',
            maxWidth: '100%',
            margin: '0 auto',
            height: 'auto',
            minHeight: '300px'
          },
          controls: {
            position: 'absolute', 
            width: '105%', // Make it slightly wider than container
            display: 'flex',
            justifyContent: 'space-between',
            top: '50%', 
            transform: 'translateY(-50%)',
            left: '-2.5%', // Center it by offsetting the extra width
            zIndex: 2 // Ensure controls are above content
          },
          control: {
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }
          }
        }}
      >
        {slides}
      </Carousel>
    </div>
  );
}