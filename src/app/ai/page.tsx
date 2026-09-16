import Layout from '@/components/Layout/Layout';
import AIPage from '@/components/Platform/AIPage';
import { productMetadata } from '@/components/Platform/metadata';
export const metadata = productMetadata(
  '/ai',
  'Confidential AI training & inference',
  'Run AI workloads in confidential hardware. Bring a Docker container, control outbound connections, and verify software approved on-chain. Work with Lit to get started.'
);
export default function Page() {
  return (
    <Layout>
      <AIPage />
    </Layout>
  );
}
