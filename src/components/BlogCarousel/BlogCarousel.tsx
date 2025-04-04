import { Carousel } from '@mantine/carousel';
import { Group, Image, Card, Text, Button, Title } from '@mantine/core';
import classes from './blog-carousel.module.scss';
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
import { useMediaQuery } from '@mantine/hooks';

type ImageProp = string | StaticImageData;
interface ArticleProps {
  image: ImageProp;
  title: React.ReactNode;
  slug: string;
  alt: string;
}

function Article({ image, title, slug, alt }: ArticleProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Card className={classes.card}>
      <Group wrap="nowrap" gap={0} style={{ width: '100%', height: '100%' }}>
        {!isMobile && (
          <div style={{ display: 'block', maxWidth: '25rem' }}>
            <Image src={image} alt={alt} height={160} />
          </div>
        )}
        <div className={classes.body}>
          <Title order={3} className={classes.carouselTitle} mt="xs" mb="md">
            {title}
          </Title>
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
      controlsOffset="xl"
      withControls={true}
      nextControlIcon={<IconChevronRight size={48} />}
      previousControlIcon={<IconChevronLeft size={48} />}
      classNames={{
        root: classes.carouselRoot,
        controls: classes.carouselControls,
        control: classes.carouselControl,
        indicators: classes.carouselIndicators,
        indicator: classes.carouselIndicator,
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
