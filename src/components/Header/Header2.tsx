import { IconArrowNarrowRight, IconChevronDown } from '@tabler/icons-react';
import { Burger, Button, Center, Container, Group, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import styles from './header.module.scss';
import LitLogo from '../LitLogo/LitLogo';

import {
  CAREERS_LINK,
  COMMUNITY_LINK,
  CONTACT_FORM,
  DOCS_LINK,
  GITHUB_LINK,
  SPARK_LINK,
  WHITEPAPER_LINK,
} from '@/utils/constants';

interface LinkItem {
  link: string;
  label: string;
  external?: boolean;
  links?: LinkItem[];
}

const links: LinkItem[] = [
  { link: '/', label: 'Vincent', links: [{ link: '', label: 'Coming soon!' }] },
  {
    link: '#1',
    label: 'Developers',
    links: [
      { link: DOCS_LINK, label: 'Documentation', external: true },
      { link: GITHUB_LINK, label: 'Github', external: true },
      { link: WHITEPAPER_LINK, label: 'Whitepaper', external: true },
    ],
  },
  {
    link: '#2',
    label: 'Community',
    links: [{ link: COMMUNITY_LINK, label: 'Resources' }],
  },
  {
    link: '#3',
    label: 'Company',
    links: [
      { link: SPARK_LINK, label: 'Blog', external: true },
      { link: CAREERS_LINK, label: 'Careers', external: true },
      { link: CONTACT_FORM, label: 'Contact', external: true },
    ],
  },
];

export function HeaderMenu({
    menuOpen,
    toggleMenu,
  }: {
    menuOpen: boolean;
    toggleMenu: () => void;
  }) {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map(link => {
    const menuItems = link.links?.map(item =>
      item.external ? (
        <Menu.Item
          key={item.link}
          component="a"
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.label}
        </Menu.Item>
      ) : (
        <Menu.Item key={item.link} component={Link} href={item.link}>
          {item.label}
        </Menu.Item>
      )
    );

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a href={link.link} className={styles.link}>
              <Center>
                <span className={styles.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link} className={styles.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <header className={styles.header}>
      <Container size="md">
        <div className={styles.inner}>
          <Group gap={4}>
            <Burger
              opened={menuOpen}
              onClick={toggleMenu}
              size="sm"
              hiddenFrom="sm"
            />
            <LitLogo className={styles.header__logo} />
          </Group>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Button
            component="a"
            href={DOCS_LINK}
            target="_blank"
            rightSection={<IconArrowNarrowRight stroke={2} />}
          >
            Get Started
          </Button>
        </div>

        {menuOpen && (
          <div className={styles['menu-btn']}>
            {items}
          </div>
        )}
      </Container>
    </header>
  );
}
