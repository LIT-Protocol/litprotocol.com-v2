import styles from './landing-partners.module.scss';
import gitcoin from './assets/gitcoin.svg';
import indexnetwork from './assets/indexnetwork.svg';
import lens from './assets/lens.svg';
import terminal3 from './assets/terminal3.svg';
import creativelabs from './assets/creativelabs.png';
import emblem from './assets/emblem.png';
import humanity from './assets/humanity.png';
import eco from './assets/eco.png';
import genius from './assets/genius.svg';
import streamr from './assets/streamr.svg';
import tria from './assets/tria.svg';

import Image from 'next/image';
import { Container, Text } from '@mantine/core';

const logos = [
  {
    src: tria,
    alt: 'Tria',
  },
  {
    src: terminal3,
    alt: 'Terminal3',
  },
  {
    src: creativelabs,
    alt: 'Blockchain Creative Labs',
  },
  {
    src: genius,
    alt: 'Genius',
  },
  {
    src: emblem,
    alt: 'Emblem Vault',
  },
  {
    src: humanity,
    alt: 'Humanity Protocol',
  },
  {
    src: gitcoin,
    alt: 'Gitcoin',
  },
  {
    src: indexnetwork,
    alt: 'Index Network',
  },
  {
    src: eco,
    alt: 'Eco',
  },
  {
    src: lens,
    alt: 'Lens Protocol',
  },
  {
    src: streamr,
    alt: 'Streamr',
  },
];

const LandingPartners = () => {
  return (
    <Container
      size="lg"
      className="relative bg-transparent py-[5rem] mt-[1.25rem]"
    >
      <Text
        size="md"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2.5rem',
          textTransform: 'uppercase',
          color: '#f5f5f5',
        }}
      >
        Integrated with
      </Text>
      <div className={styles.marquee}>
        <div className={styles.marquee__group}>
          {Object.values(logos).map((logo, i) => (
            <div className={styles.logo} key={`first_${i}`}>
              <Image src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
        <div className={styles.marquee__group}>
          {Object.values(logos).map((logo, i) => (
            <div className={styles.logo} key={`second_${i}`}>
              <Image src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default LandingPartners;
