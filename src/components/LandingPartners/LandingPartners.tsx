import styles from './landing-partners.module.scss';
import burnt from './assets/burnt.svg';
import collabland from './assets/collabland.svg';
import consensys from './assets/consensys.svg';
import dimo from './assets/dimo.svg';
import edgenode from './assets/edgenode.svg';
import ethglobal from './assets/ethglobal.svg';
import gitcoin from './assets/gitcoin.svg';
import indexnetwork from './assets/indexnetwork.svg';
import krebit from './assets/krebit.svg';
import lens from './assets/lens.svg';
import livepeer from './assets/livepeer.svg';
import streamr from './assets/streamr.svg';
import Image from 'next/image';
import { Container } from '@mantine/core';

const logos = [
  {
    src: burnt,
    alt: 'Burnt',
  },
  {
    src: collabland,
    alt: 'Collabland',
  },
  {
    src: consensys,
    alt: 'Consensys',
  },
  {
    src: dimo,
    alt: 'Dimo',
  },
  {
    src: edgenode,
    alt: 'Edge and Node',
  },
  {
    src: ethglobal,
    alt: 'EthGlobal',
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
    src: krebit,
    alt: 'Krebit',
  },
  {
    src: lens,
    alt: 'Lens Protocol',
  },
  {
    src: livepeer,
    alt: 'Livepeer',
  },
  {
    src: streamr,
    alt: 'Streamr',
  },
];

const LandingPartners = () => {
  return (
    <Container className={styles.section}>
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
