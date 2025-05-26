import { useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { Group, Image, Card, Title, Text } from '@mantine/core';
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
  return (
    <Card
      radius="md"
      className="!w-full justify-center !max-w-[30rem] md:!max-w-none mx-auto h-[22rem] md:max-h-[25rem] !bg-slate-blue-500/50 sm:!py-[3rem] sm:!px-[3rem] !rounded-md"
    >
      <Group
        wrap="nowrap"
        gap="1.5rem"
        align="center"
        justify="center"
        className="h-full w-full"
      >
        {/* Image (Desktop only) */}
        <div className="hidden md:block h-full flex-[1.4] overflow-hidden rounded-md">
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

        {/* Text Group */}
        <div className="flex flex-col text-center text-white h-full flex-[1] items-center justify-between gap-1 px-2 py-8 md:py-4 md:px-2">
          <Title
            order={3}
            m={0}
            className="sm:!text-[1.15rem] md:!text-[1.25rem] w-full"
          >
            {title}
          </Title>
          <Text
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {subtext}
          </Text>
          <Button
            href={`${SPARK_LINK}/${slug}`}
            target="_blank"
            rightIcon={<IconArrowNarrowRight stroke={2} />}
            className="mt-2"
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
  const [loading, setLoading] = useState(false);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const autoplayPlugin = Autoplay({
    delay: 4000, // Increased delay to give users more time to read
    stopOnInteraction: true, // Stop autoplay when user interacts
  }) as any;

  useEffect(() => {
    async function fetchArticles() {
      if (hasAttemptedFetch) return; // Prevent multiple fetch attempts

      setLoading(true);
      setHasAttemptedFetch(true);

      try {
        const res = await fetch('/api/blog');
        if (res.ok) {
          const data: ArticleProps[] = await res.json();
          if (data && data.length > 0) {
            setPosts(data);
          }
        }
      } catch (error) {
        console.error(
          'Failed to fetch articles from /api/blog, using fallback.',
          error
        );
        // Keep using fallback posts
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [hasAttemptedFetch]);

  return (
    <div className="w-full">
      <Carousel
        withIndicators
        height="auto" // Changed from fixed height
        loop
        slideSize="100%"
        align="center"
        slidesToScroll={1}
        withControls
        nextControlIcon={<IconChevronRight size={48} stroke={1.5} />}
        previousControlIcon={<IconChevronLeft size={48} stroke={1.5} />}
        classNames={{
          root: 'relative w-full mx-auto pb-12 mb-[4rem]',
          viewport: 'overflow-hidden',
          container: 'flex',
          slide: 'flex-[0_0_100%] min-w-0', // Ensure slides take full width and don't shrink
          controls:
            'absolute w-full md:w-[118%] md:transform md:-translate-x-[7.6%] top-1/2 -translate-y-1/2 flex justify-between z-10 pointer-events-none',
          control:
            '!text-slate-gray-500 hover:!text-off-white pointer-events-auto !bg-transparent !shadow-none !border-none flex',
          indicators: 'flex justify-center !gap-6 mt-4',
          indicator:
            '!w-[0.35rem] !h-[0.35rem] !bg-pewter-gray-500 transition-colors hover:!bg-off-white data-[active]:!bg-off-white block',
        }}
        styles={{
          slide: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
          },
        }}
      >
        {posts.map((post, index) => (
          <Carousel.Slide key={`${post.slug}-${index}`}>
            <Article {...post} />
          </Carousel.Slide>
        ))}
      </Carousel>

      {loading && (
        <div className="text-center text-white mt-4">Loading articles...</div>
      )}
    </div>
  );
}
