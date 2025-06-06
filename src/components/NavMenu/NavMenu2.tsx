import {
  CAREERS_LINK,
  COMMUNITY_LINK,
  CONTACT_FORM,
  DOCS_LINK,
  GITHUB_LINK,
  SPARK_LINK,
  VINCENT_LINK,
  WHITEPAPER_LINK,
} from '@/utils/constants';
import { HeaderMenu } from '../Header/Header';
import { Group, Modal } from '@mantine/core';
import { Accordion } from '@mantine/core';
import { Button } from '../ui/Button';
import { IconArrowNarrowRight } from '@tabler/icons-react';

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
    external: true,
  },
  {
    link: '#dev',
    label: 'Developers',
    links: [
      { link: DOCS_LINK, label: 'Documentation', external: true },
      { link: GITHUB_LINK, label: 'Github', external: true },
      { link: WHITEPAPER_LINK, label: 'Whitepaper', external: true },
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
      { link: CAREERS_LINK, label: 'Careers', external: true },
      { link: CONTACT_FORM, label: 'Contact', external: true },
    ],
  },
];

export const NavMenu2 = ({
  menuOpen,
  toggleMenu,
}: {
  menuOpen: boolean;
  toggleMenu: () => void;
}) => {
  const items = links.map(item => {
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
        opened={menuOpen}
        onClose={() => {}}
        fullScreen
        radius={0}
        withCloseButton={false}
        padding={0}
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
          <HeaderMenu toggleMenu={toggleMenu} menuOpen={menuOpen} />

          <Accordion
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
          gap={'1rem'}
          style={{ justifyContent: 'center', marginBottom: '1.25rem' }}
        >
          <Button
            className="w-[12rem] flex items-center justify-center"
            rel="noopener noreferrer"
            href={DOCS_LINK}
            rightIcon={<IconArrowNarrowRight stroke={2} />}
          >
            Get started
          </Button>

          <Button
            className="w-[12rem] flex items-center justify-center hover:bg-pearl-500"
            style={{
              background: 'white',
              boxShadow: 'inset 0 0 0 1px black',
              color: 'black',
            }}
            variant="outline"
            href={CONTACT_FORM}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get In Touch
          </Button>
        </Group>
      </Modal>
    </>
  );
};
