import { IconBrandGithub } from '@tabler/icons-react';
import { KEYCHAIN_LINK, KEYCHAIN_SOURCE_LINK } from '@/utils/constants';
import { Action, Eyebrow, FAQ, PageHero, TextLink } from './shared';
import KeychainVisual from './KeychainVisual';
import McpMark from './McpMark';
import s from './platform.module.css';
import k from './keychain.module.css';

export default function KeychainPage() {
  return (
    <div className={`${s.site} ${k.page}`}>
      <PageHero
        label="Agent Keychain"
        title="Use your credentials across devices and agent sessions."
        action={
          <>
            <Action href={KEYCHAIN_LINK}>Open Keychain</Action>
            <TextLink href="#setup"><McpMark /> Connect with MCP</TextLink>
          </>
        }
      >
        Store API keys, approve your agent, and connect through MCP. Keychain
        runs on Lit, so you can work across devices and sessions without
        deploying or maintaining a secrets server.
      </PageHero>
      <div className={`${s.container} ${k.heroDiagram}`}>
        <nav className={k.principles} aria-label="Keychain principles">
          <a href={KEYCHAIN_SOURCE_LINK}><IconBrandGithub size={16} /> Open-source</a>
          <a href="#verification">Cryptographically verifiable</a>
          <a href="#confidential">Confidential</a>
        </nav>
        <KeychainVisual />
      </div>
      <section className={s.section} id="setup">
        <div className={`${s.container} ${s.editorial}`}>
          <div>
            <Eyebrow>Get started with MCP</Eyebrow>
            <h2>Sign in and connect your agent.</h2>
            <p className={s.intro}>Give your agent the setup guide. You approve access; Keychain handles credential storage and delivery through Lit.</p>
            <TextLink href={`${KEYCHAIN_LINK}/SKILL.md`} external><McpMark /> Agent setup guide</TextLink>
          </div>
          <ol className={k.steps}>
            <li>
              <h3>Store your credentials.</h3>
              <p>Sign in with Google, a passkey, or a wallet. Your browser encrypts credentials before they are stored in Keychain.</p>
            </li>
            <li>
              <h3>Approve your agent.</h3>
              <p>Your agent creates an identity on its device. In Keychain, choose which credentials it can use and when access expires.</p>
            </li>
            <li>
              <h3>Connect through MCP.</h3>
              <p>Download the agent configuration and add Keychain to your MCP client. Reuse that setup across sessions while your approval remains valid.</p>
            </li>
          </ol>
        </div>
      </section>
      <section className={`${s.section} ${s.shade}`} id="tools">
        <div className={`${s.container} ${s.editorial}`}>
          <div>
            <Eyebrow>Works with your tools</Eyebrow>
            <h2>Use Keychain from your agent.</h2>
            <p className={s.intro}>Connect through MCP in Claude Code, Cursor, or another compatible client. The SDK and CLI are there for your own integrations.</p>
          </div>
          <div className={s.detailRows}>
            <div>
              <h3>Fetch it for a local tool.</h3>
              <p>Deliver a stored secret to an approved agent or command when it needs it. The credential is decrypted in that environment.</p>
              <TextLink href={`${KEYCHAIN_LINK}/sdk/README.md`} external>SDK, CLI & MCP guide</TextLink>
            </div>
            <div>
              <h3>Use it inside Lit.</h3>
              <p>For supported services, Lit can use the key and return the result. An agent can check a Stripe balance, for example, without receiving the Stripe key.</p>
              <TextLink href={KEYCHAIN_SOURCE_LINK} external>Explore supported actions</TextLink>
            </div>
          </div>
        </div>
      </section>
      <section className={s.section} id="security">
        <div className={s.container}>
          <div className={s.sectionHeading}>
            <Eyebrow>How Lit powers Keychain</Eyebrow>
            <h2>Convenient to use. Open to inspection.</h2>
          </div>
          <div className={k.benefits}>
            <article>
              <h3>Open-source.</h3>
              <p>Inspect the credential-handling actions in Keychain’s public library, including the operations and destinations each action allows.</p>
              <TextLink href={KEYCHAIN_SOURCE_LINK} external><IconBrandGithub size={16} /> Read the source</TextLink>
            </article>
            <article id="verification">
              <h3>Cryptographically verifiable.</h3>
              <p>The client checks hardware attestation and approved runtime measurements. Lit verifies your signed permission on each request.</p>
              <TextLink href={`${KEYCHAIN_LINK}/sdk/README.md#endpoint-attestation`} external>How verification works</TextLink>
            </article>
            <article id="confidential">
              <h3>Confidential.</h3>
              <p>Credentials are stored encrypted. Lit checks access inside confidential hardware, then uses the credential or encrypts it for delivery to the approved agent.</p>
              <TextLink href={`${KEYCHAIN_LINK}/SECURITY.md`} external>Read the security model</TextLink>
            </article>
          </div>
        </div>
      </section>
      <FAQ items={[
        {
          question: 'What does Keychain cost?',
          answer: <p>Keychain is an app built on Lit. Its credential operations run in Lit’s confidential runtime, so you don’t need to host a credential server. Keychain is free for 5 secrets, or $10/month for up to 1,000.</p>,
        },
        {
          question: 'What carries across devices and sessions?',
          answer: <p>Your stored credentials and approved access. Each device needs a configured client and an approved agent identity. Later sessions can reuse that setup while permission remains valid. Keychain does not sync conversations, agent memory, or private identity files.</p>,
        },
        {
          question: 'Do I need to run a server?',
          answer: <p>You don’t need to host a credential server or database. Install the Keychain client on the machine running your tools. For MCP, the local connector runs alongside your agent and connects to the hosted Keychain and Lit services.</p>,
        },
        {
          question: 'What do I still trust?',
          answer: <p>Your client, sign-in provider, and Lit runtime remain part of the security model. Keychain’s storage service supplies the current signed permission record; an operator can replay an older valid approval until it expires. These records are separate from ChainSecured wallet permissions. Revoke the provider key too if compromise is suspected. <a href={`${KEYCHAIN_LINK}/SECURITY.md`}>Full security model ↗</a></p>,
        },
        {
          question: 'How do I recover access?',
          answer: <p>Add and test a second owner credential, and keep an encrypted backup. Connected-service credentials cannot be exported, so retain the original keys separately. <a href={`${KEYCHAIN_LINK}/README.md#owner-setup-and-recovery`}>Read the recovery guide ↗</a></p>,
        },
      ]} />
      <section className={`${s.dark} ${s.closing}`}>
        <div className={s.container}>
          <Eyebrow>Lit Agent Keychain</Eyebrow>
          <div className={s.closingRow}>
            <h2>Set up your keychain.</h2>
            <Action href={KEYCHAIN_LINK}>Open Keychain</Action>
          </div>
        </div>
      </section>
    </div>
  );
}
