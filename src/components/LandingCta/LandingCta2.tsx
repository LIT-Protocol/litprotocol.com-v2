import {
  DISCORD_LINK,
  DOCS_LINK,
  SPARK_LINK,
} from '@/utils/constants';
import { Card, Container, Group, Text, Title } from '@mantine/core';
import {
  IconBrandDiscord,
  IconCodeCircle,
  IconNotebook,
} from '@tabler/icons-react';
import React from 'react';
import Newsletter from '../Newsletter/Newsletter';

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

const LandingCta2 = () => {
  const handleClick = (url: string) => {
    window.open(url, '_blank');
  };
  const ctaLinks = ctas.map((cta, index) => (
    <CtaLink key={index} {...cta} onClick={() => handleClick(cta.link)} />
  ));

  return (
    <div className="pt-[4rem] pb-[10rem]">
      <Container size="lg">
        <Group className="text-white flex flex-col text-left items-start mb-[2rem] w-[80%] md:w-[60%]">
          <Title order={2} className="w-[70%] md:w-full">
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
