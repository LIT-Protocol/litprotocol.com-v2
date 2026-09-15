'use client';

import { HeaderMenu } from '../Header/Header';
import Footer from '../Footer/Footer';
import { NavMenu2 } from '../NavMenu/NavMenu2';
import { useState } from 'react';

const Layout = ({
  children,
  preview = true,
}: {
  children: React.ReactNode;
  preview?: boolean;
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  function toggleMenu(): void {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <HeaderMenu
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        preview={preview}
      />
      <main className="relative w-full h-full min-h-[100vh]">{children}</main>
      <Footer preview={preview} />
      <NavMenu2 menuOpen={menuOpen} toggleMenu={toggleMenu} preview={preview} />
    </>
  );
};

export default Layout;
