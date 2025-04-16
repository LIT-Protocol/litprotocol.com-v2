import {
  BANNER_LINK,
} from '@/utils/constants';
import styles from './banner.module.scss';

const Banner = () => {
  return (
    <div className={styles.banner}>
      <p>
        Vincent is now live. {' '}
        <a href={BANNER_LINK} className={styles.banner__link}>
           Learn more.
        </a>
      </p>
    </div>
  );
};

export default Banner;
