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
      <script>var script=document.createElement('script');script.src="https://tag.safary.club/stag-0.1.8.js";script.async=true;script.setAttribute('data-name','safary-sdk');script.setAttribute('data-product-id','prd_dNLbLtl5Df');script.integrity="sha256-z7Q6yDsMizDd8yey+3sZkFVx8BjF98GQA6z7I3BcCJc=";script.crossOrigin="anonymous";var target=document.head||document.body;target.appendChild(script);</script>
      <html lang="en">
        <body>{children}</body>
      </html>
    </>
  );
}
