'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createAnalytics } from '../lib/analytics';

const analytics = createAnalytics('marketing');
const destinations: Record<string, string> = {
  'dashboard.chipotle.litprotocol.com': 'dashboard',
  'keychain.litprotocol.com': 'keychain',
  'developer.litprotocol.com': 'docs',
};

export function ProductAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname && !pathname.startsWith('/preview')) analytics.page(pathname);
  }, [pathname]);

  useEffect(() => {
    const click = (event: MouseEvent) => {
      if (location.pathname.startsWith('/preview')) return;
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const destination = destinations[link.hostname];
      if (destination) analytics.capture('product_cta_clicked', { destination });
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);
  return null;
}
