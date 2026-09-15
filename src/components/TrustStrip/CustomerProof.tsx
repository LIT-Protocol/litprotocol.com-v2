'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import { quotes as customerQuotes } from '../QuoteCarousel/quotes';
import Relay from '../QuoteCarousel/assets/relay.svg';
import Gvnr from '../QuoteCarousel/assets/gvnr.png';
import styles from './customerProof.module.css';

const quotes = [
  customerQuotes[2],
  customerQuotes[0],
  customerQuotes[1],
  customerQuotes[3],
];

export default function CustomerProof() {
  const [active, setActive] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    const updateVisibility = () => setVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () =>
      document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (reduceMotion || hovered || focused || !visible) return;
    const timer = window.setInterval(() => {
      const element = rail.current;
      if (!element) return;
      const current = Math.round(element.scrollLeft / element.clientWidth);
      element.scrollTo({
        left: ((current + 1) % quotes.length) * element.clientWidth,
        behavior: 'smooth',
      });
    }, 10000);
    return () => window.clearInterval(timer);
  }, [reduceMotion, hovered, focused, visible]);

  const selectQuote = (index: number) => {
    const element = rail.current;
    element?.scrollTo({
      left: ((index + quotes.length) % quotes.length) * element.clientWidth,
      behavior: reduceMotion ? 'instant' : 'smooth',
    });
  };

  return (
    <section
      className={styles.section}
      aria-labelledby="customer-proof-heading"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <Container size="lg">
        <h2 id="customer-proof-heading" className={styles.heading}>
          Building with Lit
        </h2>
        <div className={styles.logos} aria-label="Teams building with Lit">
          <div className={styles.staticLogo}>
            <Image
              src={Relay.src}
              alt="Relay"
              width={100}
              height={28}
              unoptimized
            />
          </div>
          {quotes.map((item, index) => (
            <button
              key={item.company}
              type="button"
              className={styles.logoButton}
              aria-label={`Read ${item.company} quote`}
              aria-pressed={active === index}
              aria-controls="customer-quote"
              onClick={() => selectQuote(index)}
            >
              <Image
                src={item.image!}
                alt={item.company}
                width={120}
                height={28}
              />
            </button>
          ))}
          <div className={styles.staticLogo}>
            <Image src={Gvnr} alt="GVNR" width={100} height={28} />
          </div>
        </div>
        <div
          id="customer-quote"
          ref={rail}
          className={styles.quoteRail}
          role="region"
          aria-label="Customer quotes"
          tabIndex={0}
          onScroll={event => {
            const element = event.currentTarget;
            setActive(Math.round(element.scrollLeft / element.clientWidth));
          }}
          onKeyDown={event => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault();
              const element = event.currentTarget;
              const current = Math.round(
                element.scrollLeft / element.clientWidth
              );
              selectQuote(current + (event.key === 'ArrowRight' ? 1 : -1));
            }
          }}
        >
          {quotes.map(quote => (
            <figure key={quote.company} className={styles.quote}>
              <blockquote>“{quote.excerpt}”</blockquote>
              <figcaption>
                <span>{quote.name}</span>
                <span aria-hidden="true"> · </span>
                <a href={quote.link} target="_blank" rel="noopener noreferrer">
                  {quote.company}
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
