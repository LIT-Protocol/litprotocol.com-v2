import { Carousel } from '@mantine/carousel';
import { Group, Image, Card, Text, Title } from '@mantine/core';
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
import { Button } from '../ui/Button';

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
    <Card className="w-full h-[300px] !bg-slate-blue-500 flex-1 rounded-md ">
      <Group wrap="nowrap" gap={0} className="w-full h-full">
        {!isMobile && (
          <div className="max-w-[25rem] block border-2 border-gold-500 border-solid">
            <Image src={image} alt={alt} height={160} />
          </div>
        )}
        <div className="flex flex-1 flex-col justify-center items-center w-1/2 md:w-full p-4">
          <Title
            order={3}
            className="w-full text-center text-white mt-[2rem]"
            mt="xs"
            mb="md"
          >
            {title}
          </Title>
          <Button
            href={`${SPARK_LINK}/${slug}`}
            rightIcon={<IconArrowNarrowRight stroke={2} />}
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
      height={320}
      dragFree
      loop
      slideSize="100%"
      slideGap="sm"
      align="center"
      slidesToScroll={1}
      withControls={true}
      nextControlIcon={<IconChevronRight size={48} stroke={1.5} />}
      previousControlIcon={<IconChevronLeft size={48} stroke={1.5} />}
      classNames={{
        root: 'relative w-[90%] pb-12 md:pb-8',
        controls:
          'absolute w-full md:w-[120%] md:transform md:-translate-x-[8.25%] -translate-y-2/3 flex justify-between z-10 pointer-events-none',
        control:
          '!text-slate-gray-500 hover:!text-off-white pointer-events-auto !bg-transparent !shadow-none !border-none flex',
        indicators: 'flex justify-center !gap-6',
        indicator:
          '!w-[0.35rem] !h-[0.35rem] !bg-pewter-gray-500 transition-colors hover:!bg-off-white data-[active]:!bg-off-white block',
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
