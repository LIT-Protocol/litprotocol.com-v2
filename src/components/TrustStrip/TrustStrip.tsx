'use client';

import { Container } from '@mantine/core';
import Emblem from '../QuoteCarousel/assets/emblem.webp';
import Beacon from '../QuoteCarousel/assets/beacon.webp';
import Tria from '../QuoteCarousel/assets/tria.webp';
import Genius from '../QuoteCarousel/assets/genius.webp';
import Gvnr from '../QuoteCarousel/assets/gvnr.png';

const LOGOS = [
  { src: Emblem.src, alt: 'Emblem Vault' },
  { src: Beacon.src, alt: 'Beacon Protocol' },
  { src: Tria.src, alt: 'Tria' },
  { src: Genius.src, alt: 'Genius' },
  { src: Gvnr.src, alt: 'GVNR' },
];

const TrustStrip = () => (
  <section className="bg-coal-950 border-b border-white/5">
    <Container size="lg" className="!py-12 text-center">
      <div className="flex flex-wrap items-baseline justify-center gap-x-5 gap-y-3 font-mono text-[clamp(1rem,1.8vw,1.3rem)] text-white/65">
        <span>
          <b className="font-semibold text-lit-orange">$400M+</b> managed
        </span>
        <span className="text-white/25">·</span>
        <span>
          <b className="font-semibold text-lit-orange">1.6M+</b> wallets
        </span>
        <span className="text-white/25">·</span>
        <span>
          <b className="font-semibold text-lit-orange">$135M+</b> volume
        </span>
      </div>
      <div className="mt-9 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/35">
        Building on Lit
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
        {LOGOS.map((l) => (
          <img
            key={l.alt}
            src={l.src}
            alt={l.alt}
            className="h-6 w-auto opacity-70 grayscale brightness-150 transition hover:opacity-100 hover:grayscale-0 hover:brightness-100"
          />
        ))}
      </div>
    </Container>
  </section>
);

export default TrustStrip;
