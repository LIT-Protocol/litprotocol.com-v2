import {
  CAREERS_LINK,
  COMMUNITY_LINK,
  CONTACT_FORM,
  AI_CONTACT_FORM,
  DOCS_LINK,
  DASHBOARD_LINK,
  GITHUB_LINK,
  SPARK_LINK,
} from '@/utils/constants';
import { HeaderMenu } from '../Header/Header';
import { Group, Modal } from '@mantine/core';
import { Accordion } from '@mantine/core';
import { Button } from '../ui/Button';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import styles from './navMenu.module.css';

interface LinkItem {
  link: string;
  label: string;
  external?: boolean;
  links?: LinkItem[];
}

const links: LinkItem[] = [
  {
    link: '#use-cases',
    label: 'Use cases',
    links: [
      { link: '/stablecoins', label: 'Stablecoins', external: false },
      { link: '/solvers', label: 'Solvers', external: false },
      { link: '/rwa', label: 'RWAs', external: false },
    ],
  },
  {
    link: '#dev',
    label: 'Developers',
    links: [
      { link: DOCS_LINK, label: 'Documentation', external: true },
      { link: GITHUB_LINK, label: 'Github', external: true },
    ],
  },
  {
    link: '#community',
    label: 'Community',
    links: [{ link: COMMUNITY_LINK, label: 'Resources', external: true }],
  },
  {
    link: '#company',
    label: 'Company',
    links: [
      { link: SPARK_LINK, label: 'Blog', external: true },
      { link: CAREERS_LINK, label: 'Careers', external: false },
      { link: CONTACT_FORM, label: 'Contact', external: true },
    ],
  },
];

export const NavMenu2 = ({
  menuOpen,
  toggleMenu,
  preview = false,
}: {
  menuOpen: boolean;
  toggleMenu: () => void;
  preview?: boolean;
}) => {
  const navigationLinks = links.filter(
    item => !preview || item.label !== 'Use cases'
  );
  const items = navigationLinks.map(item => {
    const isExternal = item.external === true;

    // Direct link item
    if (!item.links) {
      return (
        <div key={item.link} className="p-4 border-b border-gray-200 w-full">
          <a
            href={item.link}
            {...(isExternal && {
              target: '_blank',
              rel: 'noreferrer noopener',
            })}
            className="text-[1.15rem] font-medium block"
          >
            {item.label}
          </a>
        </div>
      );
    }

    // Accordion item with sub-links
    return (
      <Accordion.Item key={item.link} value={item.link}>
        <Accordion.Control>{item.label}</Accordion.Control>
        <Accordion.Panel>
          <ul>
            {item.links.map(sub => {
              const isSubExternal = sub.external === true;
              return (
                <li key={sub.link} className="mb-[1rem]">
                  <a
                    href={sub.link}
                    {...(isSubExternal && {
                      target: '_blank',
                      rel: 'noreferrer noopener',
                    })}
                  >
                    {sub.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </Accordion.Panel>
      </Accordion.Item>
    );
  });

  return (
    <>
      <Modal
        aria-label="Main navigation"
        opened={menuOpen}
        onClose={toggleMenu}
        fullScreen
        radius={0}
        withCloseButton={false}
        padding={0}
        classNames={preview ? { content: styles.content } : undefined}
        styles={{
          body: {
            padding: '0',
            display: 'flex',
            height: '100%',
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'column',
          },
        }}
      >
        <Group gap={0} style={{ flexDirection: 'column', width: '100%' }}>
          <HeaderMenu
            toggleMenu={toggleMenu}
            menuOpen={menuOpen}
            preview={preview}
          />

          <Accordion
            classNames={preview ? {
              item: styles.item,
              control: styles.control,
              chevron: styles.chevron,
              content: styles.links,
            } : undefined}
            styles={{
              panel: { paddingLeft: '1rem' },
              content: {
                fontWeight: '500',
                fontSize: '1.15rem',
              },
              label: { fontSize: '1.15rem', fontWeight: '500' },
              control: { padding: '.875rem 1rem' },
            }}
            style={{ width: '100%' }}
            multiple
            defaultValue={[]}
          >
            {items}
          </Accordion>
        </Group>
        <Group
          className={preview ? styles.actions : undefined}
          gap={preview ? '0.75rem' : '1rem'}
          style={{ justifyContent: 'center', marginBottom: '1.25rem' }}
        >
          <Button
            className="min-w-[12rem] flex items-center justify-center"
            style={preview ? { padding: '0.7rem 1.1rem', borderRadius: '10px' } : undefined}
            rel="noopener noreferrer"
            href={preview ? DASHBOARD_LINK : DOCS_LINK}
            rightIcon={<IconArrowNarrowRight stroke={2} />}
          >
            {preview ? 'Get started with crypto' : 'Get started'}
          </Button>

          <Button
            className={preview ? 'flex items-center justify-center' : 'w-[12rem] flex items-center justify-center hover:bg-pearl-500'}
            style={preview ? {
              padding: '0.7rem 1.1rem',
              borderRadius: '10px',
              boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 25%)',
            } : {
              background: 'white',
              boxShadow: 'inset 0 0 0 1px black',
              color: 'black',
            }}
            variant="outline"
            href={preview ? AI_CONTACT_FORM : CONTACT_FORM}
            target="_blank"
            rel="noopener noreferrer"
          >
            {preview ? 'Contact for Lit AI' : 'Get In Touch'}
          </Button>
        </Group>
      </Modal>
    </>
  );
};
