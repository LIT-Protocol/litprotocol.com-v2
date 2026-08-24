import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: false,
  },
  // The homepage is served as HTML or markdown depending on the Accept header
  // (see src/middleware.ts), so caches must key on Accept.
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Vary',
            value: 'RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url, Accept-Encoding, Accept',
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        { keepBackground: false, grid: false, theme: 'slack-dark' },
      ],
    ],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});
export default withMDX(nextConfig);
