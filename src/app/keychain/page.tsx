import Layout from '@/components/Layout/Layout';
import KeychainPage from '@/components/Platform/KeychainPage';
import { productMetadata } from '@/components/Platform/metadata';

export const metadata = productMetadata(
  '/keychain',
  'Agent Keychain — credentials for AI agents',
  'Let agents use your services without holding your API keys. Choose supported actions that run with your credentials inside confidential hardware.'
);

export default function Page() {
  return <Layout><KeychainPage /></Layout>;
}
