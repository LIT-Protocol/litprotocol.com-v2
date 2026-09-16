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

const DESCRIPTION =
  'Confidential, verifiable execution for crypto transactions, AI training, and inference. Open-source infrastructure with on-chain permissions and verifiable software.';

export const metadata: Metadata = {
  metadataBase: new URL('https://litprotocol.com'),
  title: 'Lit Protocol',
  description: DESCRIPTION,
  // Relative canonical resolves against metadataBase per-route, so every page
  // gets a self-referencing canonical unless it overrides alternates itself.
  alternates: { canonical: './' },
  openGraph: {
    type: 'website',
    title: 'Lit Protocol',
    description: DESCRIPTION,
    url: 'https://litprotocol.com',
    siteName: 'Lit Protocol',
    images: {
      url: '/api/og',
      width: 1200,
      height: 630,
      alt: 'Lit Protocol — Confidential, verifiable execution.',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lit Protocol',
    description: DESCRIPTION,
    creator: '@LitProtocol',
    images: {
      url: '/api/og',
      width: 1200,
      height: 630,
      alt: 'Lit Protocol — Confidential, verifiable execution.',
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
      <body id="top">
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
