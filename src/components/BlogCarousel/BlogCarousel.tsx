import { useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import {
  IconChevronLeft,
  IconChevronRight,
  IconArrowNarrowRight,
} from '@tabler/icons-react';
import { Group, Image, Card, Title, Text } from '@mantine/core';
import { Button } from '../ui/Button';
import { SPARK_LINK } from '@/utils/constants';
import Autoplay from 'embla-carousel-autoplay';

// Types
interface ArticleProps {
  image: string;
  title: string;
  slug: string;
  alt: string;
  subtext: string;
}

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
            rel="noopener noreferrer"
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
  const [posts, setPosts] = useState<ArticleProps[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchArticles() {
      try {
        const res = await fetch('/api/blog');
        if (res.ok) {
          const data: ArticleProps[] = await res.json();
          if (!cancelled) setPosts(data);
        } else {
          throw new Error('Fetch failed');
        }
      } catch (err) {
        console.error('Blog fetch failed, using fallback');
        if (!cancelled) {
          // Optional: replace with static fallback or just skip rendering
          setError(true);
          setPosts([]); // or set to fallbackPosts
        }
      }
    }

    fetchArticles();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!posts) {
    return (
      <div className="text-center text-white mt-8">
        <p>Loading articles...</p>
      </div>
    );
  }

  if (error || posts.length === 0) {
    return (
      <div className="text-center text-white mt-8">
        <p>Articles unavailable right now.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Carousel
        withIndicators
        height="auto"
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
          slide: 'flex-[0_0_100%] min-w-0',
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
    </div>
  );
}
