import { useEffect, useRef, useState } from 'react';
import { Carousel, Embla } from '@mantine/carousel';
import { Group, Image, Card, Title, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Button } from '../ui/Button';
import {
  IconArrowNarrowRight,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import { SPARK_LINK } from '@/utils/constants';
import SignDecryptImg from './assets/signAndDecrypt.png';
import BtcImg from './assets/btc.png';
import DatilImg from './assets/datil.png';
import GlobalImg from './assets/globalComp.png';
import IndexImg from './assets/index.png';
import Autoplay from 'embla-carousel-autoplay';

type ImageProp = string;
interface ArticleProps {
  image: ImageProp;
  title: string;
  slug: string;
  alt: string;
  subtext: string;
}

const fallbackPosts: ArticleProps[] = [
  {
    title: 'Programming Bitcoin',
    slug: 'programming-bitcoin',
    image: BtcImg.src,
    subtext: 'Learn how to use Lit to trigger transactions on Bitcoin.',
    alt: 'Morse code',
  },
  {
    title: 'Introducing the Lit Mainnet Beta: Datil',
    slug: 'datil-mainnet-is-live',
    image: DatilImg.src,
    subtext: 'The latest version of Lit is now live.',
    alt: 'Hexagons',
  },
  {
    title: 'Building the Global Computer',
    slug: 'the-global-computer-and-evolution-of-key-management',
    image: GlobalImg.src,
    subtext:
      "For thousands of years in free societies, it's been understood that our world is molded by the infrastructure we create. The resulting conversations have largely centered around the policy decisions and acts of authorities.",
    alt: 'Futuristic',
  },
  {
    title: 'Enabling Decentralized Discovery with Index Network and Lit',
    slug: 'decentralized-content-discovery-with-lit-and-index',
    image: IndexImg.src,
    subtext:
      'Index Network is a creator tool to make composable discovery engines. Our partnership with Lit Protocol enables zero-knowledge creator roles for indexes, and brings new creator groups into the discovery ecosystem.',
    alt: 'Splattered paint',
  },
  {
    title: 'Sign and Decrypt in Lit Actions',
    slug: 'unlocking-new-possibilities-with-lit-actions',
    image: SignDecryptImg.src,
    subtext:
      'Lit introduces two powerful new primitives for Lit Actions that provide the ability to compute over private data and send transactions directly from Lit.',
    alt: 'Solid blue',
  },
];

function Article({ image, title, slug, alt, subtext }: ArticleProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Card
      radius="md"
      className="w-full m-auto h-full md:h-[22rem] !bg-slate-blue-500/50 flex-1 !py-[3rem] !px-[3rem] !rounded-md"
    >
      <Group
        wrap="nowrap"
        justify="space-between"
        gap="1.5rem"
        className="w-full h-full"
      >
        {!isMobile && (
          <div className="max-w-[24rem] h-[14rem] block !border-[.05rem] overflow-hidden">
            <Image
              src={image}
              alt={alt}
              radius="sm"
              fit="cover"
              w="100%"
              h="100%"
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col text-center text-white !justify-between w-[25rem] md:h-[13.5rem] h-[14rem] items-center !md:w-full py-1 px-12 md:px-2">
          <Title
            lineClamp={2}
            order={3}
            className="!text-[1.5rem] md:!text-[1.25rem] w-full"
            m="sm"
          >
            {title}
          </Title>
          <Text lineClamp={3} mb="md">
            {subtext}
          </Text>
          <Button
            href={`${SPARK_LINK}/${slug}`}
            target="_blank"
            rightIcon={<IconArrowNarrowRight stroke={2} />}
          >
            Read More
          </Button>
        </div>
      </Group>
    </Card>
  );
}

export function BlogCarousel() {
  const [posts, setPosts] = useState<ArticleProps[]>(fallbackPosts);
  const autoplayPlugin = Autoplay({
    delay: 2000,
    stopOnInteraction: false,
  }) as any;

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/api/blog');
        const data: ArticleProps[] = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(
          'Failed to fetch articles from /api/blog, using fallback.',
          error
        );
      }
    }

    fetchArticles();
  }, []);

  return (
    <Carousel
      withIndicators
      height={360}
      dragFree
      loop
      slideSize="100%"
      align="center"
      slidesToScroll={1}
      withControls
      nextControlIcon={<IconChevronRight size={48} stroke={1.5} />}
      previousControlIcon={<IconChevronLeft size={48} stroke={1.5} />}
      classNames={{
        root: 'relative w-[90%] mx-auto pb-12 !md:pb-[5.6rem] mb-[4rem]',
        controls:
          'absolute w-full md:w-[118%] md:transform md:-translate-x-[7.6%] -translate-y-2/3 flex justify-between z-10 pointer-events-none',
        control:
          '!text-slate-gray-500 hover:!text-off-white pointer-events-auto !bg-transparent !shadow-none !border-none flex',
        indicators: 'flex justify-center !gap-6',
        indicator:
          '!w-[0.35rem] !h-[0.35rem] !bg-pewter-gray-500 transition-colors hover:!bg-off-white data-[active]:!bg-off-white block',
      }}
    >
      {posts.map(post => (
        <Carousel.Slide key={post.slug}>
          <Article {...post} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
