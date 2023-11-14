import {
  BRAND_LINK,
  CALENDAR_LINK,
  CAREERS_LINK,
  CONTACT_FORM,
  DISCORD_LINK,
  DOCS_LINK,
  GITHUB_LINK,
  LINKEDIN_LINK,
  MANIFESTO_LINK,
  SPARK_LINK,
  TWITTER_LINK,
} from '@/utils/constants';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__divider}></div>
      <nav className={styles.footer__nav}>
        <div className={styles.footer__company}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 225 225"
            fill="none"
            className={styles.footer__logo}
          >
            <path
              d="M75.6407 81.714C75.6407 81.714 75.4373 85.5731 67.9587 98.1613C59.2969 112.748 58.4834 129.823 67.3301 144.078C85.9803 174.129 136.597 173.561 155.363 144.096C162.619 132.699 164.699 119.622 162.222 106.336C162.222 106.336 156.218 78.5981 135.714 61.1076C136.038 61.3799 136.833 65.0913 136.985 66.6746C137.452 71.5401 136.994 76.6409 135.363 81.2709C134.166 84.673 132.506 87.618 129.701 89.8892C129.701 89.0952 129.502 87.6734 129.497 87.198C129.363 77.5087 125.61 68.535 119.495 61.0014C114.152 54.428 106.826 49.9412 99.1117 46.6406C99.3058 47.3053 99.6663 50.0612 99.7172 50.6059C100.115 55.1805 100.189 61.5877 99.5878 66.1576C98.9869 70.7276 97.9562 73.2157 96.5557 77.4995C94.4341 83.9944 91.5453 88.809 87.8846 94.5838C87.2098 95.6455 85.1946 98.5583 84.1176 100.031C84.1176 100.031 82.2641 88.3243 75.6453 81.714H75.6407Z"
              fill="white"
            />
            <path
              d="M107.812 5.68329C110.713 4.00861 114.287 4.00861 117.188 5.68329L202.662 55.0322C205.563 56.7068 207.35 59.8018 207.35 63.1511V161.849C207.35 165.198 205.563 168.293 202.662 169.968L117.188 219.317C114.287 220.991 110.713 220.991 107.812 219.317L22.3378 169.968C19.4371 168.293 17.6503 165.198 17.6503 161.849V63.1511C17.6503 59.8018 19.4371 56.7068 22.3378 55.0322L107.812 5.68329Z"
              stroke="white"
              strokeWidth="5.15625"
            />
          </svg>
          <a href="/" className={styles.footer__title}>
            Lit Protocol
          </a>
        </div>
        <div className={styles.footer__grid}>
          <div className={styles.footer__grid__item}>
            <h6 className={styles.footer__category}>Resources</h6>
            <a
              href={DOCS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__link}
            >
              Docs
            </a>
            <a
              href={GITHUB_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__link}
            >
              GitHub
            </a>
            <a
              href={SPARK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__link}
            >
              Blog
            </a>
            <a
              href={CALENDAR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__link}
            >
              Calendar
            </a>
            <a
              href={CONTACT_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__link}
            >
              Contact
            </a>
          </div>
          <div className={styles.footer__grid__item}>
            <h6 className={styles.footer__category}>Social</h6>
            <a
              href={TWITTER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__link}
            >
              Twitter
            </a>
            <a
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__link}
            >
              Discord
            </a>
            <a
              href={LINKEDIN_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__link}
            >
              LinkedIn
            </a>
          </div>
          <div className={styles.footer__grid__item}>
            <h6 className={styles.footer__category}>Company</h6>
            {/* <a
              href={MANIFESTO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__link}
            >
              Our Mission
            </a> */}
            <a
              href={CAREERS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__link}
            >
              Careers
            </a>
            <a
              href={BRAND_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__link}
            >
              Brand Kit
            </a>
          </div>
          <div className={styles.footer__grid__item}>
            <h6 className={styles.footer__category}>Legal</h6>
            <a href="/legal/privacy-policy" className={styles.footer__link}>
              Privacy Policy
            </a>
            <a href="/legal/terms-of-service" className={styles.footer__link}>
              Terms of Service
            </a>
          </div>
        </div>
      </nav>
      <div className={styles.footer__copyright}>
        <p>Lit Association. Copyright © {new Date().getFullYear()}.</p>
      </div>
    </footer>
  );
};

export default Footer;
