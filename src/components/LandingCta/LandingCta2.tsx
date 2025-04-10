import { DISCORD_LINK, DOCS_LINK, SPARK_LINK } from '@/utils/constants';
import { Card, Container, Group, Text, TextInput, Title } from '@mantine/core';
import {
  IconArrowNarrowRight,
  IconBrandDiscord,
  IconCodeCircle,
  IconNotebook,
} from '@tabler/icons-react';
import React from 'react';
import styles from './landing-cta-2.module.scss';
import { Button } from '../ui/Button';

interface CtaLinkProps {
  icon: React.FC<any>;
  name: React.ReactNode;
  context: React.ReactNode;
  onClick: () => void;
}

const ctas = [
  {
    icon: IconCodeCircle,
    name: 'Docs',
    context:
      'Go from 0 to 1 with our developer docs and ready-to-use examples.',
    link: DOCS_LINK,
  },
  {
    icon: IconNotebook,
    name: 'Blog',
    context: 'Read the latest news',
    link: SPARK_LINK,
  },
  {
    icon: IconBrandDiscord,
    name: 'Discord',
    context: 'Connect with other builders, and help shape the future of Lit.',
    link: DISCORD_LINK,
  },
];
function CtaLink({ icon: Icon, name, context, onClick }: CtaLinkProps) {
  return (
    <Card
      onClick={onClick}
      style={{ cursor: 'pointer', color: 'white' }}
      className="btn-hover-effect flex justify-between w-full !bg-slate-blue-500/75 h-[7.5rem] p-[1rem] items-start !gap-[.25rem] md:w-[calc(100%/3)]"
    >
      <Icon size={25} stroke={1} />
      <Text fw={700}>{name}</Text>
      <Text size="sm">{context}</Text>
    </Card>
  );
}
function Newsletter() {
  return (
    <Card
      style={{ color: 'white', width: '100%', padding: '0' }}
      className="!bg-slate-blue-500/75 flex w-full p-0"
    >
      <Text
        size="2rem"
        className="text-center w-full relative !p-[1rem] !border-b !border-pewter-gray-500 bg-gradient-to-t from-coal-950/50 to-transparent"
      >
        Be the first to know
      </Text>
      <Group className="!flex !flex-wrap !gap-0">
        <Text className="!py-[1rem] !px-[4rem] text-center">
          Sign up for our newsletter for updates on all things Lit.
        </Text>
        <Group className='border-l border-pewter-gray-500/50 w-[50%] flex flex-col items-center justify-center relative py-[1.75rem] px-[1.5rem] gap-[0.25rem]'>
          <Group gap="xs">
            <TextInput
              classNames={{
                root: styles.inputRoot,
                wrapper: styles.inputWrapper,
                input: styles.input,
                label: styles.label,
              }}
              placeholder="Enter your email"
            />
            <Button rightIcon={<IconArrowNarrowRight stroke={2} />}>
              Sign Up
            </Button>
          </Group>
          <Text className={styles.signup__disclaimer}>
            By subscribing you agree to our <a>Privacy Policy</a>
          </Text>
        </Group>
      </Group>
    </Card>
  );
}

const LandingCta2 = () => {
  const handleClick = (url: string) => {
    window.open(url, '_blank');
  };
  const ctaLinks = ctas.map((cta, index) => (
    <CtaLink key={index} {...cta} onClick={() => handleClick(cta.link)} />
  ));

  return (
    <div className={styles.root}>
      <Container size="lg">
        <Group className={styles.ctaText}>
          <Title order={2} className={styles.ctaText__title}>
            Learn, connect, & collaborate.
          </Title>
          <Text>
            Lit and ecosystem partners are building the next generation of
            identity and machine intelligence protocols and applications, all
            running on the open web.
          </Text>
        </Group>
        <Group className="flex flex-wrap !gap-[0.5rem] mb-[0.75rem] md:!flex-nowrap">
          {ctaLinks}
        </Group>
        <Newsletter />
      </Container>
    </div>
  );
};

export default LandingCta2;
