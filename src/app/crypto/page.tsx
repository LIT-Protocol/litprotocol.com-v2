import Layout from '@/components/Layout/Layout';
import CryptoPage from '@/components/Platform/CryptoPage';
import { productMetadata } from '@/components/Platform/metadata';
export const metadata = productMetadata(
  '/crypto',
  'Programmable Wallets',
  'Power hot wallets, vaults, and agent wallets with immutable code and updatable on-chain permissions. Evolve your signing rules while keeping the same wallet address.'
);
export default function Page() {
  return (
    <Layout>
      <CryptoPage />
    </Layout>
  );
}
