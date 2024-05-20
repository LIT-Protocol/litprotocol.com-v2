import Head from 'next/head';
import { Provider } from 'next-auth/client';
import { appWithTranslation } from 'next-i18next';
import { createClient } from 'urql';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Head from 'next/head';

const client = createClient({
  url: 'https://api.litprotocol.com/v1/graphql',
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <script
          async
          src="https://tag.safary.club/stag-0.1.8.js"
          data-name="safary-sdk"
          data-product-id="prd_dNLbLtl5Df"
          integrity="sha256-z7Q6yDsMizDd8yey+3sZkFVx8BjF98GQA6z7I3BcCJc="
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default appWithTranslation(MyApp);