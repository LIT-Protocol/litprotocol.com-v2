import Tria from './assets/tria.webp';
import Emblem from './assets/emblem.webp';
import Genius from './assets/genius.webp';
import Beacon from './assets/beacon.webp';

type ImageProp = string;
export interface QuoteProps {
  company: string;
  excerpt: string;
  image?: ImageProp;
  name: string;
  link: string;
  alt: string;
  quote: string;
}

export const quotes: QuoteProps[] = [
  {
    name: 'Shannon, Founder',
    company: 'Emblem Vault',
    excerpt:
      "Lit Protocol's revolutionary programmable encryption transforms Emblem Vault into a living ecosystem where AI agents like Hustle operate autonomously across chains.",
    link: 'https://x.com/EmblemVault',
    image: Emblem.src,
    quote:
      "Lit Protocol's revolutionary programmable encryption transforms Emblem Vault into a living ecosystem where AI agents like Hustle operate autonomously across chains. By embedding intelligence directly into vaults, we're creating self-sovereign digital entities that execute complex cross-chain operations with unprecedented security.",
    alt: 'Emblem Vault Logo',
  },
  {
    name: 'Phil, Founder',
    company: 'Beacon Protocol',
    excerpt:
      'Lit Protocol enables us to provide unprecedented levels of data sovereignty and interoperability by using programmable keys that run on rules established by our protocol.',
    link: 'https://x.com/BeaconProtocol',
    image: Beacon.src,
    quote:
      "Lit Protocol enables us to provide unprecedented levels of data sovereignty and interoperability by using programmable keys that run on rules established by our protocol. Beacon Protocol's private data layer makes private data accessible to AI models and agents available across multiple chains and doesn't require centralized keys or a single point of failure like other data projects.",
    alt: 'Beacon Protocol Logo',
  },
  {
    name: 'Parth, Co-founder',
    company: 'Tria',
    excerpt:
      'Lit is a cornerstone in our vision for frictionless, chain-abstracted payments.',
    link: 'https://x.com/useTria',
    image: Tria.src,
    quote:
      "Lit is a cornerstone in our vision for frictionless, chain-abstracted payments. At Tria, we're building intent-driven, wallet-agnostic primitives where users can transact across ecosystems without technical hassles like juggling wallets, gas fees, bridging etc. lit's programmable key management gives us the cryptographic trust layer to make that magic possible. Together, we're turning decentralized auth from a dev tool into a superpower for mainstream payments.",
    alt: 'Tria Logo',
  },
  {
    name: 'Brihu, Co-founder',
    company: 'Genius',
    excerpt:
      "With Genius Terminal, Lit's programmable encryption enables non-custodial multi-wallet management, DCAs, limit orders, and stop losses.",
    link: 'https://x.com/GeniusTerminal',
    image: Genius.src,
    quote:
      "Lit Protocol transformed our products through trustless multiparty compute. For Genius Bridge Protocol, Lit's encrypted runtime powers our universal solver - a decentralized agent using native DEX liquidity for faster, cheaper cross-VM intents without centralized relayers. With Genius Terminal, Lit's programmable encryption enables non-custodial multi-wallet management, DCAs, limit orders, and stop losses. Lit isn't just technology - it's the foundation for our next-gen DeFi solutions.",
    alt: 'Genius Logo',
  },
];
