import './globals.css';
import '../styles/globals.scss';
import type { Metadata } from 'next';
import Script from 'next/script';

import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core';

export const metadata: Metadata = {
  title: 'Lit Protocol',
  description:
    'Lit is a key management network for decentralized signing and encryption. Create apps and wallets that use secrets without single points of failure.',
  openGraph: {
    title: 'Lit Protocol',
    description:
      'Lit is a key management network for decentralized signing and encryption. Create apps and wallets that use secrets without single points of failure.',
    url: 'https://litprotocol.com',
    siteName: 'Lit Protocol',
    images: {
      url: '/og-image.png',
      alt: 'Description of Lit Protocol over a blue and orange gradient background',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lit Protocol',
    description:
      'Lit is a key management network for decentralized signing and encryption. Create apps and wallets that use secrets without single points of failure.',
    creator: '@LitProtocol',
    images: {
      url: '/twitter-image.png',
      alt: 'Description of Lit Protocol over a blue and orange gradient background',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <Script
          defer
          data-domain="litprotocol.com"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
