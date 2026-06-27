'use client';

import { Carousel } from '@mantine/carousel';
import { Image, Card, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Button } from '../ui/Button';
import {
  IconArrowNarrowRight,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import Tria from './assets/tria.webp';
import Emblem from './assets/emblem.webp';
import Genius from './assets/genius.webp';
import Beacon from './assets/beacon.webp';

type ImageProp = string;
interface QuoteProps {
  image?: ImageProp;
  name: string;
  link: string;
  alt: string;
  quote: string;
}

const quotes: QuoteProps[] = [
  {
    name: 'Shannon, Founder',
    link: 'https://x.com/EmblemVault',
    image: Emblem.src,
    quote:
      "Lit Protocol's revolutionary programmable encryption transforms Emblem Vault into a living ecosystem where AI agents like Hustle operate autonomously across chains. By embedding intelligence directly into vaults, we're creating self-sovereign digital entities that execute complex cross-chain operations with unprecedented security.",
    alt: 'Emblem Vault Logo',
  },
  {
    name: 'Phil, Founder',
    link: 'https://x.com/BeaconProtocol',
    image: Beacon.src,
    quote:
      "Lit Protocol enables us to provide unprecedented levels of data sovereignty and interoperability by using programmable keys that run on rules established by our protocol. Beacon Protocol's private data layer makes private data accessible to AI models and agents available across multiple chains and doesn't require centralized keys or a single point of failure like other data projects.",
    alt: 'Beacon Protocol Logo',
  },
  {
    name: 'Parth, Co-founder',
    link: 'https://x.com/useTria',
    image: Tria.src,
    quote:
      "Lit is a cornerstone in our vision for frictionless, chain-abstracted payments. At Tria, we're building intent-driven, wallet-agnostic primitives where users can transact across ecosystems without technical hassles like juggling wallets, gas fees, bridging etc. lit's programmable key management gives us the cryptographic trust layer to make that magic possible. Together, we're turning decentralized auth from a dev tool into a superpower for mainstream payments.",
    alt: 'Tria Logo',
  },
  {
    name: 'Brihu, Co-founder',
    link: 'https://x.com/GeniusTerminal',
    image: Genius.src,
    quote:
      "Lit Protocol transformed our products through trustless multiparty compute. For Genius Bridge Protocol, Lit's encrypted runtime powers our universal solver - a decentralized agent using native DEX liquidity for faster, cheaper cross-VM intents without centralized relayers. With Genius Terminal, Lit's programmable encryption enables non-custodial multi-wallet management, DCAs, limit orders, and stop losses. Lit isn't just technology - it's the foundation for our next-gen DeFi solutions.",
    alt: 'Genius Logo',
  },
];

function Quote({ image, name, link, alt, quote }: QuoteProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Card
      radius="lg"
      className={`relative w-full m-auto h-full overflow-hidden ${
        isMobile ? 'min-h-[30rem]' : 'h-[22rem]'
      } border border-white/10 !bg-white/[0.02] flex-1 !py-[2.25rem] !px-[2.5rem] !rounded-2xl !z-10`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-7 top-3 select-none font-serif text-[5.5rem] leading-none text-lit-orange/15"
      >
        ”
      </span>
      <div className="relative flex flex-col justify-between h-full text-white">
        <Text
          ta="left"
          className="text-white/90 !text-[1.1rem]/[1.6rem] sm:!text-[1.2rem]/[1.7rem] text-pretty"
        >
          {quote}
        </Text>
        {/* Attribution */}
        <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
          <Image
            src={image}
            alt={alt}
            height={26}
            style={{ maxHeight: '26px', width: 'auto', objectFit: 'contain' }}
          />
          <span className="text-[0.95rem] text-white/55">{name}</span>
        </div>
      </div>
    </Card>
  );
}

export function QuoteCarousel() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Carousel
      withIndicators
      height={isMobile ? 550 : 360}
      dragFree={false}
      loop
      slideSize="100%"
      align="center"
      slidesToScroll={1}
      withControls
      nextControlIcon={<IconChevronRight size={48} stroke={1.5} />}
      previousControlIcon={<IconChevronLeft size={48} stroke={1.5} />}
      style={{ zIndex: 10 }}
      classNames={{
        root: 'relative w-[90%] mx-auto pb-12 !md:pb-[5.6rem] mb-[4rem] bg-transparent',
        controls:
          'absolute w-full md:w-[118%] md:transform md:-translate-x-[7.6%] -translate-y-2/3 flex justify-between z-10 pointer-events-none',
        control:
          '!text-slate-gray-500 hover:!text-off-white pointer-events-auto !bg-transparent !shadow-none !border-none flex',
        indicators: 'flex justify-center !gap-6',
        indicator:
          '!w-[0.35rem] !h-[0.35rem] !bg-pewter-gray-500 transition-colors hover:!bg-off-white data-[active]:!bg-off-white block',
      }}
    >
      {quotes.map(quote => (
        <Carousel.Slide key={quote.link}>
          <Quote {...quote} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
