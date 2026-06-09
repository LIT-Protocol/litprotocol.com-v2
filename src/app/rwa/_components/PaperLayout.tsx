'use client';

import { useState } from 'react';
import { HeaderMenu } from '@/components/Header/Header';
import { NavMenu2 } from '@/components/NavMenu/NavMenu2';

// Same chrome as the site Layout (header + slide-out nav) but without the global
// newsletter Footer — the position paper ends with its own References and disclaimer.
export default function PaperLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <>
      <HeaderMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <main className="relative h-full min-h-[100vh] w-full">{children}</main>
      <NavMenu2 menuOpen={menuOpen} toggleMenu={toggleMenu} />
    </>
  );
}
