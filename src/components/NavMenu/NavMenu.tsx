import * as Dialog from '@radix-ui/react-dialog';
import styles from './navmenu.module.scss';
import {
  CAREERS_LINK,
  COMMUNITY_LINK,
  CONTACT_FORM,
  DOCS_LINK,
  GITHUB_LINK,
  SPARK_LINK,
  VINCENT_LINK,
} from '@/utils/constants';
import { HeaderMenu } from '../Header/Header';

const NavMenu = ({
  menuOpen,
  toggleMenu,
}: {
  menuOpen: boolean;
  toggleMenu: () => void;
}) => {
  return (
    <Dialog.Root open={menuOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.modal}>
          <HeaderMenu toggleMenu={toggleMenu} menuOpen={menuOpen} />
          <nav className={styles.nav}>
            <div className={styles.nav__wrapper}>
              <div className={styles.nav__links}>
                <h6 className={styles.nav__category}>Vincent</h6>
                <a
                  href={VINCENT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.nav__link}
                >
                  
                </a>              </div>
              <div className={styles.nav__links}>
                <h6 className={styles.nav__category}>Developers</h6>
                <a
                  href={DOCS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.nav__link}
                >
                  Docs
                </a>
                <a
                  href={GITHUB_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.nav__link}
                >
                  Github
                </a>
              </div>
              <div className={styles.nav__links}>
                <h6 className={styles.nav__category}>Community</h6>
                <a
                  href={COMMUNITY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.nav__link}
                >
                  Resources
                </a>
              </div>
              <div className={styles.nav__links}>
                <h6 className={styles.nav__category}>Company</h6>
                <a
                  href={SPARK_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.nav__link}
                >
                  Blog
                </a>
                <a
                  href={CAREERS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.nav__link}
                >
                  Careers
                </a>
                <a
                  href={CONTACT_FORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.nav__link}
                >
                  Contact
                </a>
              </div>
            </div>
            <div className={styles.nav__btns}>
              <a
                href={DOCS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.nav__btn} ${styles['nav__btn--primary']}`}
              >
                Get started
              </a>
              <a
                href={CONTACT_FORM}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.nav__btn} ${styles['nav__btn--outline']}`}
              >
                Reach out
              </a>
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NavMenu;
