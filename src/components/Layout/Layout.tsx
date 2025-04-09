'use client';

import styles from './layout.module.scss';
import { HeaderMenu } from '../Header/Header';
import Footer from '../Footer/Footer';
import NavMenu from '../NavMenu/NavMenu';
import { useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  function toggleMenu(): void {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <HeaderMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <main className={styles.main}>{children}</main>
      <Footer />
      <NavMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default Layout;
