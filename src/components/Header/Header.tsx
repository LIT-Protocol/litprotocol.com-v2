import { useEffect, useRef } from 'react';
import styles from './header.module.scss';
import {
  CONTACT_FORM,
  DISCORD_LINK,
  DOCS_LINK,
  MANIFESTO_LINK,
  SPARK_LINK,
  VINCENT_LINK,
} from '@/utils/constants';
import LitLogo from '../LitLogo/LitLogo';

const Header = ({
  menuOpen,
  toggleMenu,
}: {
  menuOpen: boolean;
  toggleMenu: () => void;
}) => {
  const watcherRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    // Update header styling on scroll
    if (watcherRef.current && headerRef.current) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              headerRef.current!.setAttribute('data-scroll', 'false');
            } else {
              headerRef.current!.setAttribute('data-scroll', 'true');
            }
          });
        },
        {
          root: null,
          threshold: 0,
        }
      );

      observer.observe(watcherRef.current);

      return () => {
        if (watcherRef.current) {
          observer.unobserve(watcherRef.current);
        }
      };
    }
  }, []);

  return (
    <>
      <div ref={watcherRef}></div>
      <header className={styles.header} data-scroll="false" ref={headerRef}>
        <div className={styles.header__background}></div>
        <div className={styles.header__wrapper}>
          <a href="/">
            <LitLogo className={styles.header__logo} />
          </a>
          <nav className={styles.header__nav}>
            {/* <a
              href={MANIFESTO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.header__link}
            >
              Our Mission
            </a> */}
            <a
              href={VINCENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.header__link}
            >
              Vincent
            </a>
            <a
              href={DOCS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.header__link}
            >
              Docs
            </a>
            <a
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.header__link}
            >
              Community
            </a>
            <a
              href={SPARK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.header__link}
            >
              Blog
            </a>
            <a
              href={CONTACT_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.header__link}
            >
              Contact
            </a>
          </nav>
          <div className={styles.header__btns}>
            <a
              href={DOCS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.header__cta}
            >
              Get started
            </a>
            <button onClick={toggleMenu} className={styles['menu-btn']}>
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 12H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 18H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
