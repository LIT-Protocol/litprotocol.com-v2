'use client';

import { ReactNode, useEffect, useRef } from 'react';
import s from './home-motion.module.css';

export default function HomeMotion({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;

    const configure = () => {
      observer?.disconnect();
      element.removeAttribute('data-motion');
      if (preference.matches) return;
      const targets = element.querySelectorAll<HTMLElement>('[data-reveal]');
      // Above-the-fold content, hash destinations, and restored scroll positions
      // are visible immediately. Only approaching illustrations animate.
      targets.forEach(target => {
        if (target.getBoundingClientRect().top < window.innerHeight) {
          target.dataset.visible = 'true';
        }
      });
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            (entry.target as HTMLElement).dataset.visible = 'true';
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -35px 0px' }
      );
      targets.forEach(target => {
        if (target.dataset.visible !== 'true') observer?.observe(target);
      });
      element.dataset.motion = 'ready';
    };

    configure();
    preference.addEventListener('change', configure);
    return () => {
      observer?.disconnect();
      preference.removeEventListener('change', configure);
    };
  }, []);

  return (
    <div ref={root} className={`${className} ${s.root}`}>
      {children}
    </div>
  );
}
