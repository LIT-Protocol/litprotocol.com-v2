import { DISCORD_LINK, DOCS_LINK, SPARK_LINK } from '@/utils/constants';
import {
  Button,
  Card,
  Container,
  Group,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconArrowNarrowRight,
  IconBrandDiscord,
  IconCodeCircle,
  IconNotebook,
} from '@tabler/icons-react';
import React from 'react';
import styles from './landing-cta-2.module.scss';

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
    context: 'Start building',
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
    context: 'Connect with our community',
    link: DISCORD_LINK,
  },
];
function CtaLink({ icon: Icon, name, context, onClick }: CtaLinkProps) {
  return (
    <Card
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className={styles.ctas}
    >
      <Icon size={25} stroke={1} className={styles.ctas__icon} />
      <Text className={styles.ctas__name}>{name}</Text>
      <Text className={styles.ctas__context}>{context}</Text>
    </Card>
  );
}
function Newsletter() {
  return (
    <Card className={styles.newsletter}>
      <Text className={styles.newsletter__cta}>Be the first to know</Text>
      <Group className={styles.newsletter__group}>
        <Text className={styles.newsletter__text}>
          Lorem ipsum enim elementum nibh elementum augue sit neque est lacus.
        </Text>
        <Group className={styles.signup}>
          <Group>
            <TextInput
              classNames={{
                root: styles.inputRoot,
                wrapper: styles.inputWrapper,
                input: styles.input,
                label: styles.label,
              }}
              placeholder="Enter your email"
            />
            <Button
              type="submit"
              rightSection={<IconArrowNarrowRight stroke={2} />}
            >
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
          <Title order={3}>Learn, connect, & collaborate.</Title>
          <Text>
            Lorem ipsum enim elementum nibh elementum augue sit neque est lacus.
          </Text>
        </Group>
        <Group className={styles.linksGroup}>{ctaLinks}</Group>
        <Newsletter />
      </Container>
    </div>
  );
};

export default LandingCta2;
