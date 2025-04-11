import {
  BANNER_LINK,
} from '@/utils/constants';
import styles from './banner.module.scss';

const Banner = () => {
  return (
    <div className={styles.banner}>
      <p>
        Lit v1 is coming soon. {' '}
        <a href={BANNER_LINK} className={styles.banner__link}>
           Keep updated.
        </a>
      </p>
    </div>
  );
};

export default Banner;
