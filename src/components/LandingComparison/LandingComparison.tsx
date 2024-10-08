import styles from './landing-comparison.module.scss';
import TraditionalImg from './assets/traditional.png';
import LitImg from './assets/lit.png';
import Image from 'next/image';

const traditional = [
  'Centralized controllers',
  'Single points of failure',
  'Service denials',
  'Data silos',
  'Vendor lock-in',
];

const lit = [
  'Decentralized network',
  'Fault-tolerant design',
  'Programmable',
  'Scalable',
  'Permissionless',
];

const LandingComparison = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badge__copy}>Our Approach</span>
          </div>
          <h2 className={styles.title}>
            Revolutionizing secret management{' '}
            <span className={styles.title__break}>with decentralization</span>
          </h2>
          <p className={styles.subtitle}>
            Lit combines applied cryptography with secure enclaves in a
            peer-to-peer network to ensure censorship-resistant key access and
            complete data privacy.
          </p>
        </div>
        <div className={styles.grid}>
          <div className={styles.comparison}>
            <h3 className={styles.comparison__title}>Traditional MPC</h3>
            <Image
              src={TraditionalImg}
              alt="Broken key management"
              className={styles.comparison__img}
            />
            <div className={styles.comparison__badges}>
              {traditional.map((item, index) => (
                <span className={styles.comparison__badge} key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={`${styles.comparison} ${styles['comparison--lit']}`}>
            <h3 className={styles.comparison__title}>Lit Protocol</h3>
            <Image
              src={LitImg}
              alt="Computer connected to Lit nodes"
              className={styles.comparison__img}
            />
            <div className={styles.comparison__badges}>
              {lit.map((item, index) => (
                <span className={styles.comparison__badge} key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingComparison;
