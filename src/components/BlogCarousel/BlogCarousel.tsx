import { Carousel } from '@mantine/carousel';
import { Group, Image, Card, Text, Button } from '@mantine/core';
import classes from './blog-carousel.module.css';
import SignDecryptImg from './assets/signAndDecrypt.png';
import BtcImg from './assets/btc.png';
import DatilImg from './assets/datil.png';
import GlobalImg from './assets/globalComp.png';
import IndexImg from './assets/index.png';
import AIImg from './assets/ai.png';
import { StaticImageData } from 'next/image';
import { SPARK_LINK } from '@/utils/constants';
import {
  IconArrowNarrowRight,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';

// You can add these if you have them
// import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

type ImageProp = string | StaticImageData;
interface ArticleProps {
  image: ImageProp;
  title: React.ReactNode;
  slug: string;
  alt: string;
}

function Article({ image, title, slug, alt }: ArticleProps) {
  return (
    <Card className={classes.card}>
      <Group wrap="nowrap" gap={0} style={{ width: '100%', height: '100%' }}>
        <Image
          src={image}
          alt={alt}
          height={160}
          style={{ maxWidth: '40%', objectFit: 'cover', flexShrink: 0 }}
        />
        <div className={classes.body}>
          <Text className={classes.carouselTitle} mt="xs" mb="md">
            {title}
          </Text>
          <Button
            component="a"
            href={`${SPARK_LINK}/${slug}`}
            rightSection={<IconArrowNarrowRight stroke={2} />}
            style={{ width: '10rem' }}
          >
            Read More
          </Button>
        </div>
      </Group>
    </Card>
  );
}

const posts = [
  {
    title: 'Programming Bitcoin',
    slug: 'programming-bitcoin',
    image: BtcImg.src,
    alt: 'Morse code',
  },
  {
    title: 'Introducing the Lit Mainnet Beta: Datil',
    slug: 'datil-mainnet-is-live',
    image: DatilImg.src,
    alt: 'Hexagons',
  },
  {
    title: 'Building the Global Computer',
    slug: 'the-global-computer-and-evolution-of-key-management',
    image: GlobalImg.src,
    alt: 'Futuristic',
  },
  {
    title: 'Enabling Decentralized Discovery with Index Network and Lit',
    slug: 'decentralized-content-discovery-with-lit-and-index',
    image: IndexImg.src,
    alt: 'Splattered paint',
  },
  {
    title: 'Sign and Decrypt in Lit Actions',
    slug: 'unlocking-new-possibilities-with-lit-actions',
    image: SignDecryptImg.src,
    alt: 'Solid blue',
  },
  {
    title: 'Authenticity in the AI Era',
    slug: 'authenticity-matters',
    image: AIImg,
    alt: 'Yellow light streaks',
  },
];

export function BlogCarousel() {
  return (
    <Carousel
      withIndicators
      height={300}
      dragFree
      loop
      slideSize="100%"
      slideGap="sm"
      align="center"
      slidesToScroll={1}
      controlsOffset="xs"
      // classNames={{
      //   slide: classes.slide,
      // }}
      withControls={true} // Make sure this is true to show arrows
      // For custom arrows (if needed):
      nextControlIcon={<IconChevronRight size={48} />}
      previousControlIcon={<IconChevronLeft size={48} />}
      style={{
        slide: { width: '300px' },
        indicators: { color: '#fff' },
        controls: { width: '200%' },
      }}
    >
      {posts.map(post => (
        <Carousel.Slide key={post.title}>
          <Article {...post} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
