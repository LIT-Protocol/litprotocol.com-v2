import { useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel';
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
import AIImg from './assets/ai.png';

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
      'For thousands of years in free societies, it’s been understood that our world is molded by the infrastructure we create. The resulting conversations have largely centered around the policy decisions and acts of authorities.',
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
      className="w-full my-auto h-full md:h-[24.5rem] !bg-slate-blue-500 flex-1 !py-[3rem] !px-[3rem] rounded-md"
    >
      <Group wrap="nowrap" gap={0} className="w-full h-full">
        {!isMobile && (
          <div className="max-w-[25rem] h-full block !border-[.05rem] !border-gold-500 overflow-hidden">
            <Image
              src={image}
              alt={alt}
              fit="cover"
              w="100%"
              h="100%"
              className="object-cover w-full h-full object-[20%_center]"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col text-center text-white justify-center w-[25rem] h-full items-center md:w-full px-4 py-6">
          <Title order={3} className="w-full mt-[2rem]">
            {title}
          </Title>
          <Text className="w-full mb-[2rem]">{subtext}</Text>
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

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('https://spark.litprotocol.com/');
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const articles = Array.from(doc.querySelectorAll('article')).slice(
          0,
          5
        );

        const dynamicPosts: ArticleProps[] = articles.map(article => {
          const titleEl = article.querySelector('h2, h3, h1');
          const linkEl = article.querySelector('a[href]');
          const imageDiv = article.querySelector(
            '.post-card-image'
          ) as HTMLElement;
          const subtextEl = article.querySelector('.post-card-excerpt');

          // Extract the background-image URL from the style attribute
          let imageUrl = '/fallback.jpg';
          if (imageDiv && imageDiv.style.backgroundImage) {
            const match = imageDiv.style.backgroundImage.match(
              /url\(["']?(.*?)["']?\)/
            );
            if (match && match[1]) {
              imageUrl = match[1];
            }
          }

          return {
            title: titleEl?.textContent?.trim() ?? 'Untitled',
            slug: linkEl?.getAttribute('href')?.replace(/^\/+/, '') ?? '',
            image: imageUrl,
            alt: titleEl?.textContent?.trim() ?? 'Article image',
            subtext: subtextEl?.textContent?.trim() ?? '',
          };
        });
      } catch (error) {
        console.error('Failed to fetch Spark articles, using fallback.', error);
      }
    }

    fetchArticles();
  }, []);

  return (
    <Carousel
      withIndicators
      height={390}
      dragFree
      loop
      slideSize="100%"
      slideGap="sm"
      align="center"
      slidesToScroll={1}
      withControls
      nextControlIcon={<IconChevronRight size={48} stroke={1.5} />}
      previousControlIcon={<IconChevronLeft size={48} stroke={1.5} />}
      classNames={{
        root: 'relative w-[90%] pb-12 !md:pb-[5.6rem] mb-[4rem]',
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
