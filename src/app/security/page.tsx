import Layout from '@/components/Layout/Layout';
import SecurityPage from '@/components/Platform/SecurityPage';
import { productMetadata } from '@/components/Platform/metadata';
export const metadata = productMetadata(
  '/security',
  'Security & Verification',
  'Inspect Lit’s source, verify the running software, and understand on-chain wallet permissions, hosted protocol-update governance, and the security boundaries.'
);
export default function Page() {
  return (
    <Layout>
      <SecurityPage />
    </Layout>
  );
}
