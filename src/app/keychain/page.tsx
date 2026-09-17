import Layout from '@/components/Layout/Layout';
import KeychainPage from '@/components/Platform/KeychainPage';
import { productMetadata } from '@/components/Platform/metadata';

export const metadata = productMetadata(
  '/keychain',
  'Agent Keychain — credentials for AI agents',
  'Give agents access to API keys with permissions you approve. Use supported services inside Lit or deliver stored secrets through the SDK, CLI, and MCP server.'
);

export default function Page() {
  return <Layout><KeychainPage /></Layout>;
}
