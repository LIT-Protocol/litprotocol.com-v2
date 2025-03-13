import {
  BANNER_LINK,
} from '@/utils/constants';
import styles from './banner.module.scss';

const Banner = () => {
  return (
    <div className={styles.banner}>
      <p>
        $LITKEY Community Sale starting 3/23. Learn more {' '}
        <a href={BANNER_LINK} className={styles.banner__link}>
           here.
        </a>
      </p>
    </div>
  );
};

export default Banner;
