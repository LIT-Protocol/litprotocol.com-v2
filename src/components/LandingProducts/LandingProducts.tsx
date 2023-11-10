import Product from '../Product/Product';
import AuthImg from './assets/auth.png';
import AccessImg from './assets/access.png';
import ActionImg from './assets/action.png';
import styles from './landing-products.module.scss';

const LandingProducts = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>Sign. Encrypt. Compute.</h2>
          <p className={styles.subtitle}>
            Keys managed on Lit are distributed and fault tolerant, so no
            centralized authority can ever withhold access. Use Lit to build
            digital ownership experiences with greater privacy, flexibility, and
            control.
          </p>
        </div>
        <Product
          badge={'Distributed Wallets'}
          title={'Streamline user experience with distributed wallets'}
          description={
            'Empower your users with wallets secured by their existing authentication like social logins and passkeys. Deliver seamless onboarding, easy recovery, and user-centric security features—all without worrying about managing private keys.'
          }
          cta={{
            link: 'https://developer.litprotocol.com/v3/sdk/wallets/intro',
            text: 'Build with Lit wallets',
          }}
          features={[
            {
              title: 'Claimable wallets',
              description:
                'Effortlessly provision wallets that are pre-generated from human-readable identities, such as emails or phone numbers.',
              link: 'https://developer.litprotocol.com/v3/concepts/claimable-keys',
            },
            {
              title: 'Session keys',
              description:
                'Create temporary, permissioned session keys, enabling users to interact with your platform in a frictionless, secure way.',
              link: 'https://developer.litprotocol.com/v3/sdk/authentication/session-sigs/intro',
            },
            {
              title: 'Popular integrations',
              description:
                "Use Lit's ready-made integrations with ethers.js and WalletConnect to quickly build signing and dapp interactions.",
              link: 'https://developer.litprotocol.com/v3/sdk/wallets/walletconnect',
            },
          ]}
          imgSrc={AuthImg}
          altText={'Sign in modal with multiple authentication options'}
        />
        <hr className={styles.divider}></hr>
        <Product
          badge={'Decentralized Encryption'}
          title={
            'Store private data on the open web with flexible access control'
          }
          description={
            'Define conditional rules to control access to private data, stored anywhere. The Lit network will validate your rules and grant decryption capabilities only when your defined conditions are met, without ever accessing the private data.'
          }
          cta={{
            link: 'https://developer.litprotocol.com/v3/sdk/access-control/intro',
            text: 'Integrate access control',
          }}
          features={[
            {
              title: 'Identity-based encryption',
              description:
                'Safeguard private data with client-side encryption, and grant decryption keys only when defined conditions are met.',
              link: 'https://developer.litprotocol.com/v3/sdk/access-control/encryption',
            },
            {
              title: 'Access control conditions',
              description:
                'Easily mix and match conditions on-chain or off-chain data with boolean logic to define flexible access control rules.',
              link: 'https://developer.litprotocol.com/v3/sdk/access-control/condition-types/unified-access-control-conditions',
            },
            {
              title: 'JWT signing',
              description:
                'Define access control conditions to sign JWTs that can be used to load dynamic content from a server.',
              link: 'https://developer.litprotocol.com/v3/sdk/access-control/jwt-auth',
            },
          ]}
          imgSrc={AccessImg}
          altText={'Access control modal with option to add rules'}
          reverse={true}
        />
        <hr className={styles.divider}></hr>
        <Product
          badge={'Serverless Functions'}
          title={'Power your apps with serverless signing automations'}
          description={
            'Create immutable serverless functions for event-based signing, encryption, and identity management. Add advanced functionality to your apps and iterate faster, all without the burden of scaling key infrastructure.'
          }
          cta={{
            link: 'https://developer.litprotocol.com/v3/sdk/wallets/conditional-signing',
            text: 'Dive into Lit Actions',
          }}
          features={[
            {
              title: 'Conditional signing',
              description:
                'Write immutable JavaScript logic to generate signatures when your specified on-chain or off-chain conditions are met.',
              link: 'https://developer.litprotocol.com/v3/sdk/wallets/conditional-signing',
            },
            {
              title: 'Fetch off-chain data',
              description:
                'Lit Actions natively support fetching off-chain data, eliminating the need to integrate a trusted third party oracle.',
              link: 'https://developer.litprotocol.com/v2/LitActions/workingWithActions/usingFetch',
            },
            {
              title: 'Secure infrastructure',
              description:
                'Lit leverages a secure JavaScript runtime and advanced hardware protection to ensure that your code is tamper-proof.',
              link: 'https://developer.litprotocol.com/v3/resources/how-it-works',
            },
          ]}
          imgSrc={ActionImg}
          altText={
            'Lit Actions modal for setting up a new action and its signing conditions'
          }
        />
      </div>
    </section>
  );
};

export default LandingProducts;
