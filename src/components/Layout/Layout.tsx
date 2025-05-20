'use client';

import { HeaderMenu } from '../Header/Header';
import Footer from '../Footer/Footer';
import { NavMenu2 } from '../NavMenu/NavMenu2';
import { useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  function toggleMenu(): void {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <HeaderMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <main className="relative w-full h-full min-h-[100vh]">{children}</main>
      <Footer />
      <NavMenu2 menuOpen={menuOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default Layout;
