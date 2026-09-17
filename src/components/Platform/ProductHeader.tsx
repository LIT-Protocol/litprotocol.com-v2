'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  IconArrowRight,
  IconArrowUpRight,
  IconChevronDown,
  IconMenu2,
  IconX,
  IconCode,
  IconCpu,
  IconKey,
  IconBrandGithub,
} from '@tabler/icons-react';
import LitLogo from '../LitLogo/LitLogo';
import {
  DASHBOARD_LINK,
  DOCS_LINK,
  QUICKSTART_LINK,
  GITHUB_LINK,
  SPARK_LINK,
  DISCORD_LINK,
} from '@/utils/constants';
import styles from './header.module.css';

const menus = {
  Developers: [
    { label: 'Documentation', href: DOCS_LINK },
    { label: 'Quickstart', href: QUICKSTART_LINK },
    { label: 'GitHub', href: GITHUB_LINK },
  ],
  Company: [
    { label: 'Blog', href: SPARK_LINK },
    { label: 'Careers', href: '/careers' },
    { label: 'Community', href: DISCORD_LINK },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function ProductHeader() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) {
        setOpen(null);
        setMobile(false);
      }
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, []);
  useEffect(() => {
    if (mobile) {
      root.current
        ?.querySelector<HTMLButtonElement>('[data-menu="Platform"]')
        ?.focus();
    }
  }, [mobile]);
  const close = () => {
    setOpen(null);
    setMobile(false);
  };
  return (
    <header
      className={styles.header}
      ref={root}
      onKeyDown={event => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          const target = event.target as HTMLElement;
          const menu = target.closest('[data-nav-group]');
          if (menu) {
            const links = Array.from(
              menu.querySelectorAll<HTMLAnchorElement>('[data-dropdown] a')
            );
            if (links.length) {
              event.preventDefault();
              const index = links.indexOf(target as HTMLAnchorElement);
              const next =
                index < 0
                  ? event.key === 'ArrowDown'
                    ? 0
                    : links.length - 1
                  : (index +
                      (event.key === 'ArrowDown' ? 1 : -1) +
                      links.length) %
                    links.length;
              links[next].focus();
            }
          }
        }
        if (event.key === 'Escape') {
          if (open)
            root.current
              ?.querySelector<HTMLButtonElement>(`[data-menu="${open}"]`)
              ?.focus();
          else toggle.current?.focus();
          setOpen(null);
          if (!open) setMobile(false);
        }
      }}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(null);
          setMobile(false);
        }
      }}
    >
      <a className={styles.skip} href="#main-content">
        Skip to content
      </a>
      <div className={styles.bar}>
        <Link
          href="/#top"
          className={styles.brand}
          aria-label="Lit Protocol home"
          onClick={event => {
            close();
            // Repeated clicks on the current URL do not trigger route scrolling.
            if (
              pathname === '/' &&
              event.button === 0 &&
              !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
            ) {
              window.scrollTo({ top: 0, left: 0 });
            }
          }}
        >
          <LitLogo className={styles.logo} />
        </Link>
        <nav
          aria-label="Main navigation"
          className={`${styles.nav} ${mobile ? styles.mobileOpen : ''}`}
          id="product-navigation"
        >
          <div className={styles.menu} data-nav-group>
            <button
              type="button"
              data-menu="Platform"
              aria-expanded={open === 'Platform'}
              aria-controls="platform-menu"
              onClick={() => setOpen(open === 'Platform' ? null : 'Platform')}
            >
              Platform <IconChevronDown size={13} />
            </button>
            {open === 'Platform' && (
              <div
                data-dropdown
                id="platform-menu"
                className={`${styles.dropdown} ${styles.platform}`}
              >
                <div className={styles.products}>
                  <span className={styles.menuLabel}>Build with Lit</span>
                  <Link href="/crypto" onClick={close}>
                    <IconCode size={23} stroke={1.5} />
                    <span>
                      <strong>Programmable wallets</strong>
                      <small>Hot wallets and vaults governed by code.</small>
                    </span>
                    <IconArrowRight size={17} />
                  </Link>
                  <Link href="/ai" onClick={close}>
                    <IconCpu size={23} stroke={1.5} />
                    <span>
                      <strong>Confidential AI</strong>
                      <small>Private training and inference.</small>
                    </span>
                    <IconArrowRight size={17} />
                  </Link>
                  <span className={`${styles.menuLabel} ${styles.appLabel}`}>Apps built on Lit</span>
                  <Link href="/keychain" onClick={close}>
                    <IconKey size={23} stroke={1.5} />
                    <span>
                      <strong>Agent Keychain</strong>
                      <small>Credentials across devices and agent sessions.</small>
                    </span>
                    <IconArrowRight size={17} />
                  </Link>
                </div>
                <div className={styles.explore}>
                  <span className={styles.menuLabel}>
                    Understand the platform
                  </span>
                  <Link href="/security#how-it-works" onClick={close}>
                    How Lit works <IconArrowRight size={15} />
                  </Link>
                  <Link href="/ai#connections" onClick={close}>
                    Connections & data controls <IconArrowRight size={15} />
                  </Link>
                  <Link href="/security#governance" onClick={close}>
                    Protocol governance <IconArrowRight size={15} />
                  </Link>
                  <a href={GITHUB_LINK}>
                    <IconBrandGithub size={17} /> Open-source{' '}
                    <IconArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/security"
            onClick={close}
            aria-current={pathname === '/security' ? 'page' : undefined}
          >
            Security
          </Link>
          {Object.entries(menus).map(([label, links]) => (
            <div className={styles.menu} data-nav-group key={label}>
              <button
                type="button"
                data-menu={label}
                aria-expanded={open === label}
                aria-controls={`menu-${label}`}
                onClick={() => setOpen(open === label ? null : label)}
              >
                {label} <IconChevronDown size={13} />
              </button>
              {open === label && (
                <div
                  data-dropdown
                  id={`menu-${label}`}
                  className={`${styles.dropdown} ${styles.smallMenu}`}
                >
                  {links.map(link => (
                    <Link key={link.label} href={link.href} onClick={close}>
                      {link.label}
                      {link.href.startsWith('http') ? (
                        <IconArrowUpRight size={15} />
                      ) : (
                        <IconArrowRight size={15} />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className={styles.actions}>
          <a className={styles.getStarted} href={DASHBOARD_LINK}>
            Get started <IconArrowRight size={16} />
          </a>
          <button
            className={styles.mobileToggle}
            ref={toggle}
            type="button"
            aria-controls="product-navigation"
            aria-expanded={mobile}
            aria-label={mobile ? 'Close navigation' : 'Open navigation'}
            onClick={() => {
              setMobile(!mobile);
              setOpen(null);
            }}
          >
            {mobile ? <IconX size={23} /> : <IconMenu2 size={23} />}
          </button>
        </div>
      </div>
    </header>
  );
}
