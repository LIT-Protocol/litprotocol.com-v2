import Layout from '@/components/Layout/Layout';
import KeychainPage from '@/components/Platform/KeychainPage';
import { productMetadata } from '@/components/Platform/metadata';

export const metadata = productMetadata(
  '/keychain',
  'Agent Keychain — credentials for AI agents',
  'Agent Keychain is an open-source app built on Lit for credential access across devices and agent sessions. No credential server to host.'
);

export default function Page() {
  return <Layout><KeychainPage /></Layout>;
}
