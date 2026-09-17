import { IconBrandGithub } from '@tabler/icons-react';
import { KEYCHAIN_LINK, KEYCHAIN_SOURCE_LINK } from '@/utils/constants';
import { Action, Eyebrow, FAQ, PageHero, TextLink } from './shared';
import KeychainVisual from './KeychainVisual';
import s from './platform.module.css';
import k from './keychain.module.css';

export default function KeychainPage() {
  return (
    <div className={`${s.site} ${k.page}`}>
      <PageHero
        label="Agent Keychain · An app built on Lit"
        title="Use your credentials across devices and agent sessions."
        action={<Action href={KEYCHAIN_LINK}>Open Keychain</Action>}
      >
        Agent Keychain uses Lit to give approved agents access to your encrypted
        credentials. Store API keys once and keep working across sessions,
        with no credential server to host.
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
            <Eyebrow>Across your workflow</Eyebrow>
            <h2>A new session shouldn’t mean setting up your keys again.</h2>
            <TextLink href={`${KEYCHAIN_LINK}/SKILL.md`} external>Agent setup guide</TextLink>
          </div>
          <ol className={k.steps}>
            <li>
              <h3>Store your credentials.</h3>
              <p>Sign in with Google, a passkey, or a wallet. Your browser encrypts credentials before they are stored in Keychain.</p>
            </li>
            <li>
              <h3>Connect each device.</h3>
              <p>Set up the client, approve its agent identity, and save its configuration. Choose which credentials it can use and when access expires.</p>
            </li>
            <li>
              <h3>Reuse the setup in later sessions.</h3>
              <p>The same agent identity and configuration work across sessions while permission remains valid. Use the SDK, CLI, or local MCP integration.</p>
            </li>
          </ol>
        </div>
      </section>
      <section className={`${s.section} ${s.shade}`} id="tools">
        <div className={`${s.container} ${s.editorial}`}>
          <div>
            <Eyebrow>Works with your tools</Eyebrow>
            <h2>Use a credential where the work happens.</h2>
            <p className={s.intro}>Connect your existing agents and command-line tools. There’s no credential service for you to deploy or maintain.</p>
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
            <div>
              <h2>Set up your keychain.</h2>
              <p className={k.pricing}>Free for 5 secrets. $10/month for up to 1,000.</p>
            </div>
            <Action href={KEYCHAIN_LINK}>Open Keychain</Action>
          </div>
        </div>
      </section>
    </div>
  );
}
