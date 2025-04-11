import {
  BANNER_LINK,
} from '@/utils/constants';
import styles from './banner.module.scss';

const Banner = () => {
  return (
    <div className={styles.banner}>
      <p>
        Lit v1 is Coming Soon. Stay Up to Date {' '}
        <a href={BANNER_LINK} className={styles.banner__link}>
           here.
        </a>
      </p>
    </div>
  );
};

export default Banner;
