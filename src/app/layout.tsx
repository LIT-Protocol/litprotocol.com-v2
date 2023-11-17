import '../styles/globals.scss';
import type { Metadata } from 'next';
import Script from 'next/script';

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
    <>
      <Script
        defer
        data-domain="litprotocol.com"
        src="https://plausible.io/js/script.js"
      ></Script>
      <html lang="en">
        <body>{children}</body>
      </html>
    </>
  );
}
