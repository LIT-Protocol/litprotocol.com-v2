import { Carousel } from '@mantine/carousel';
import { Group, Image, Card, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './blog-carousel.module.css';

interface ArticleProps {
  image: string;
  title: string;
}

function Article({ image, title }: ArticleProps) {
  return (
    <Card className={classes.card}>
      <Group wrap="nowrap" gap={0}>
        <Image
          src={image}
          height={160}
        />
        <div className={classes.body}>
          <Text tt="uppercase" c="dimmed" fw={700} size="xs">
            {title}
          </Text>
          <Text className={classes.title} mt="xs" mb="md">
            The best laptop for Frontend engineers in 2022
          </Text>
        </div>
      </Group>
    </Card>
  );
}

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
  const theme = useMantineTheme();
  const mobile = useMediaQuery((`max-width: 20rem`));
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Article {...item} />
    </Carousel.Slide>
  ));

  return (
  <Carousel
    slideSize={mobile ? '100%' : '50%'}
    slideGap={mobile ? 2 : 'xl'}
    align="start"
    slidesToScroll={mobile ? 1 : 2}
    styles={{ root: { maxWidth: '800px', margin: '0 auto' } }}
  >
    {slides}
  </Carousel>
  );
}