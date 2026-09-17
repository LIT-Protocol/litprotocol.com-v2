import Layout from '@/components/Layout/Layout';
import KeychainPage from '@/components/Platform/KeychainPage';
import { productMetadata } from '@/components/Platform/metadata';

export const metadata = productMetadata(
  '/keychain',
  'Agent Keychain — credentials for AI agents',
  'Use your credentials across devices and agent sessions without hosting a credential server. Open-source, cryptographically verifiable, and built on confidential hardware.'
);

export default function Page() {
  return <Layout><KeychainPage /></Layout>;
}
