'use client';
import { DISCORD_LINK, DOCS_LINK, SPARK_LINK } from '@/utils/constants';
import { Card, Container, Group, Text, Title } from '@mantine/core';
import React from 'react';
import Newsletter from '../Newsletter/Newsletter';
import DocsIcon from './assets/DocsIcon';
import BlogIcon from './assets/BlogIcon';
import DiscordIcon from '../icons/DiscordIcon';

interface CtaLinkProps {
  icon: React.FC<any>;
  name: React.ReactNode;
  context: React.ReactNode;
  onClick: () => void;
}

const ctas = [
  {
    icon: DocsIcon,
    name: 'Docs',
    context:
      'Go from 0 to 1 with our developer docs and ready-to-use examples.',
    link: DOCS_LINK,
  },
  {
    icon: BlogIcon,
    name: 'Blog',
    context: 'Read the latest news.',
    link: SPARK_LINK,
  },
  {
    icon: DiscordIcon,
    name: 'Discord',
    context: 'Connect with other builders, and help shape the future of Lit.',
    link: DISCORD_LINK,
  },
];
function CtaLink({ icon: Icon, name, context, onClick }: CtaLinkProps) {
  return (
    <Card
      onClick={onClick}
      radius="md"
      style={{ cursor: 'pointer', color: 'white', padding: '1.5rem' }}
      className="btn-hover-effect flex justify-start w-full !bg-slate-blue-500/75 xs:h-full md:h-[11.6rem] lg:h-[9.68rem] items-start !gap-[.5rem] md:w-[calc(100%/3)]"
    >
      <div className="h-[2rem] flex items-center justify-center">
        <Icon className="!h-full max-w-[2rem] w-full" stroke={2} />
      </div>
      <Text size="lg" fw={700}>
        {name}
      </Text>
      <Text size="sm">{context}</Text>
    </Card>
  );
}

const LandingCta = () => {
  const handleClick = (url: string) => {
    window.open(url, '_blank');
  };
  const ctaLinks = ctas.map((cta, index) => (
    <CtaLink key={index} {...cta} onClick={() => handleClick(cta.link)} />
  ));

  return (
    <div className="pt-[1rem] md:pt-[4rem] mb-[6rem] md:pb-[10rem]">
      <Container size="lg">
        <Group
          style={{ gap: '1.5rem' }}
          className="text-white flex flex-col text-left items-start mb-[2rem] w-[80%] md:w-[60%]"
        >
          <Title className="!text-[1.25rem] md:!text-[2rem] w-full md:w-full">
            Learn, connect, & collaborate.
          </Title>
          <Text>
            Lit and ecosystem partners are building the next generation of
            identity and machine intelligence protocols and applications, all
            running on the open web.
          </Text>
        </Group>
        <Group
          style={{ gap: '1.5rem' }}
          className="flex flex-wrap mb-[1.875rem] md:!flex-nowrap"
        >
          {ctaLinks}
        </Group>
        <Newsletter />
      </Container>
    </div>
  );
};

export default LandingCta;
