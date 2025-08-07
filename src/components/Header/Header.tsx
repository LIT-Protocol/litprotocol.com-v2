'use client';
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
  VINCENT_LINK,
  WHITEPAPER_LINK,
  DEVELOPER_CONSTANT_LINK,
  COMMUNITY_CONSTANT_LINK,
  COMPANY_CONSTANT_LINK,
} from '@/utils/constants';
import { Button } from '../ui/Button';
import SparkleIcon from './assets/SparkleIcon';
import { useState } from 'react';
import SparkleIconFilled from './assets/SparkleIconFilled';

interface LinkItem {
  link: string;
  label: string;
  external?: boolean;
  links?: LinkItem[];
}

const links: LinkItem[] = [
  {
    link: VINCENT_LINK,
    label: 'Vincent',
    external: false,
  },
  {
    link: DEVELOPER_CONSTANT_LINK,
    label: 'Developers',
    links: [
      { link: DOCS_LINK, label: 'Documentation', external: true },
      { link: GITHUB_LINK, label: 'Github', external: true },
      { link: WHITEPAPER_LINK, label: 'Whitepaper', external: true },
    ],
  },
  {
    link: COMMUNITY_CONSTANT_LINK,
    label: 'Community',
    links: [{ link: COMMUNITY_LINK, label: 'Resources', external: true }],
  },
  {
    link: COMPANY_CONSTANT_LINK,
    label: 'Company',
    links: [
      { link: SPARK_LINK, label: 'Blog', external: true },
      { link: CAREERS_LINK, label: 'Careers', external: true },
      { link: CONTACT_FORM, label: 'Contact', external: true },
    ],
  },
];

const VincentIcon = ({ hovered }: { hovered: boolean }) => {
  return hovered ? (
    <SparkleIconFilled size={16} className="transition-all fill-white" />
  ) : (
    <SparkleIcon size={16} className="transition-all" />
  );
};

// Individual link component with its own hover state
const NavLink = ({ link }: { link: LinkItem }) => {
  const [hovered, setHovered] = useState(false);
  const isExternal = link.external === true;
  const hasSubLinks = !!link.links?.length;

  if (hasSubLinks) {
    const menuItems = (link.links ?? []).map(item =>
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
            <Center
              className="group text-off-white font-medium px-[.75rem] py-[.375rem]"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span className="mr-[5px]">{link.label}</span>
              {link.label === 'Vincent' ? (
                <VincentIcon hovered={hovered} />
              ) : (
                <IconChevronDown size={16} stroke={1.5} />
              )}
            </Center>
          </a>
        </Menu.Target>
        <Menu.Dropdown>{menuItems}</Menu.Dropdown>
      </Menu>
    );
  }

  return isExternal ? (
    <a
      key={link.link}
      href={link.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Center 
        className="group text-off-white font-medium px-[.75rem] py-[.375rem]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="mr-[5px]">{link.label}</span>
        {link.label === 'Vincent' && <VincentIcon hovered={hovered} />}
      </Center>
    </a>
  ) : (
    <Link key={link.link} href={link.link}>
      <Center 
        className="group text-off-white font-medium px-[.75rem] py-[.375rem]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="mr-[5px]">{link.label}</span>
        {link.label === 'Vincent' && <VincentIcon hovered={hovered} />}
      </Center>
    </Link>
  );
};

export function HeaderMenu({
  menuOpen,
  toggleMenu,
}: {
  menuOpen: boolean;
  toggleMenu: () => void;
}) {
  const items = links.map(link => <NavLink key={link.label} link={link} />);

  return (
    <header className="relative w-full top-0 left-0 h-[4.5rem] z-10 bg-coal-950">
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
          <Group gap={'1.25rem'} visibleFrom="sm">
            {items}
          </Group>
          {menuOpen ? (
            <Button className="hidden" />
          ) : (
            <Button
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
