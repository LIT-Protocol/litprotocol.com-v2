import {
  IconArrowNarrowRight,
  IconArrowUpRight,
  IconChevronDown,
} from '@tabler/icons-react';
import { Burger, Center, Container, Group, Menu } from '@mantine/core';
import Link from 'next/link';
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
import { Button } from '../ui/Button';

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
  const items = links.map(link => {
    const menuItems = link.links?.map(item =>
      item.external ? (
        <Menu.Item
          key={item.link}
          component="a"
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          rightSection={<IconArrowUpRight size={16} />}
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
          withArrow
          offset={16}
        >
          <Menu.Target>
            <a href={link.link}>
              <Center className="text-off-white font-medium px-[.75rem] py-[.375rem]">
                <span className="mr-[5px]">{link.label}</span>
                <IconChevronDown size={16} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <header className="relative top-0 left-0 h-[4.5rem] z-10 bg-coal-950">
      <Container size="md">
        <div className="flex h-[4.5rem] justify-between items-center">
          <Group gap={4}>
            <Burger
              opened={menuOpen}
              onClick={toggleMenu}
              size="sm"
              hiddenFrom="sm"
              color="white"
            />
            <LitLogo className="h-[1.5rem] text-lit-orange" />
          </Group>
          <Group gap={"1.25rem"} visibleFrom="sm">
            {items}
          </Group>
          {menuOpen ? (
            <Button className="hidden" />
          ) : (
            <Button
              target="_blank"
              href={DOCS_LINK}
              rightIcon={<IconArrowNarrowRight stroke={2} />}
            >
              Get started
            </Button>
          )}
        </div>
      </Container>
    </header>
  );
}
