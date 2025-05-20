import { Carousel } from '@mantine/carousel';
import { Group, Image, Card, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Button } from '../ui/Button';
import {
  IconArrowNarrowRight,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import Tria from './assets/tria.webp';
import Emblem from './assets/emblem-vault.webp';
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
    alt: 'Morse code',
  },
  {
    name: 'Phil, Founder',
    link: 'https://x.com/BeaconProtocol',
    image: Beacon.src,
    quote:
      "Lit Protocol enables us to provide unprecedented levels of data sovereignty and interoperability by using programmable keys that run on rules established by our protocol. Beacon Protocol's private data layer makes private data accessible to AI models and agents available across multiple chains and doesn't require centralized keys or a single point of failure like other data projects.",
    alt: 'Hexagons',
  },
  {
    name: 'Parth, Co-founder',
    link: 'https://x.com/useTria',
    image: Tria.src,
    quote:
      "Lit is a cornerstone in our vision for frictionless, chain-abstracted payments. At Tria, we're building intent-driven, wallet-agnostic primitives where users can transact across ecosystems without technical hassles like juggling wallets, gas fees, bridging etc. lit's programmable key management gives us the cryptographic trust layer to make that magic possible. Together, we're turning decentralized auth from a dev tool into a superpower for mainstream payments.",
    alt: 'Futuristic',
  },
  {
    name: 'Brihu, Co-founder',
    link: 'https://x.com/GeniusTerminal',
    image: Genius.src,
    quote:
      "Lit Protocol transformed our products through trustless multiparty compute. For Genius Bridge Protocol, Lit's encrypted runtime powers our universal solver - a decentralized agent using native DEX liquidity for faster, cheaper cross-VM intents without centralized relayers. With Genius Terminal, Lit's programmable encryption enables non-custodial multi-wallet management, DCAs, limit orders, and stop losses. Lit isn't just technology - it's the foundation for our next-gen DeFi solutions.",
    alt: 'Splattered paint',
  },
];

function Quote({ image, name, link, alt, quote }: QuoteProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Card
      radius="md"
      className={`w-full m-auto ${
        isMobile ? 'h-[30rem]' : 'h-[22rem]'
      } !bg-transparent !bg-gradient-to-bl !from-slate-blue-500/20 !via-slate-gray-500/40 !to-slate-blue-500/20 flex-1 !py-[2.5rem] !px-[2.5rem] !rounded-md`}
    >
      {/* Mobile-first layout - flex column by default, row on larger screens */}
      <div className="flex flex-col sm:flex-row w-full h-full sm:gap-10">
        <div className="flex-shrink-0 h-18 w-18 sm:w-28 sm:h-28 self-start mb-8 sm:mb-0">
          <Image
            src={image}
            alt={alt}
            radius="sm"
            fit="contain"
            width={32}
            height={32}
          />
        </div>
        <div className="flex flex-1 flex-col text-white !justify-between h-full">
          <Text
            ta="left"
            className="!text-[1.05rem]/[1.5rem] sm:!text-[1.25rem]/[1.625rem]"
            mb="md"
          >
            {quote}
          </Text>
          <Text
            ta="right"
            className="!text-[1.25rem] sm:!text-[1.5rem] md:!text-[1.25rem] w-full"
            m="sm"
          >
            &mdash; {name}
          </Text>
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
      height={isMobile ? 500 : 360} // Increased height for mobile
      dragFree
      loop
      slideSize="100%"
      align="center"
      slidesToScroll={1}
      withControls
      nextControlIcon={<IconChevronRight size={48} stroke={1.5} />}
      previousControlIcon={<IconChevronLeft size={48} stroke={1.5} />}
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