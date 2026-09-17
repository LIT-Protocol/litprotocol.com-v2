import { IconBrandGithub } from '@tabler/icons-react';
import { KEYCHAIN_LINK, KEYCHAIN_SOURCE_LINK } from '@/utils/constants';
import { Action, Eyebrow, FAQ, PageHero, TextLink } from './shared';
import KeychainVisual from './KeychainVisual';
import s from './platform.module.css';
import k from './keychain.module.css';

export default function KeychainPage() {
  return (
    <div className={s.site}>
      <PageHero
        label="Lit Agent Keychain"
        title={<>Connect your agents.<br />Control their access.</>}
        action={<Action href={KEYCHAIN_LINK}>Open Keychain</Action>}
      >
        Give agents access to API keys with permissions you approve.
        For supported services, agents receive the result while Lit handles the key.
      </PageHero>
      <div className={`${s.container} ${k.heroDiagram}`}><KeychainVisual /></div>
      <section className={s.section} id="access">
        <div className={s.container}>
          <div className={s.sectionHeading}>
            <Eyebrow>Two ways to connect</Eyebrow>
            <h2>Choose what the agent receives.</h2>
          </div>
          <div className={k.modes}>
            <article>
              <Eyebrow>Connected services</Eyebrow>
              <h3>Give it the result.</h3>
              <p>Let an approved agent check a Stripe balance, read a GitHub file, or call a model. Lit uses the credential inside confidential hardware to run a supported action.</p>
              <div className={k.receives}><span>Agent receives</span><strong>The action’s result</strong></div>
              <TextLink href="https://github.com/LIT-Protocol/agent-keychain-library" external>Explore supported actions</TextLink>
            </article>
            <article>
              <Eyebrow>Stored secrets</Eyebrow>
              <h3>Give it the credential.</h3>
              <p>For tools that need the API key locally, release it to an approved agent through the SDK, CLI, or MCP server. The agent’s environment then has access to the key.</p>
              <div className={k.receives}><span>Agent receives</span><strong>The decrypted credential</strong></div>
              <TextLink href={`${KEYCHAIN_SOURCE_LINK}/sdk#readme`} external>Read the integration guide</TextLink>
            </article>
          </div>
        </div>
      </section>
      <section className={`${s.section} ${s.shade}`} id="setup">
        <div className={`${s.container} ${s.editorial}`}>
          <div>
            <Eyebrow>Works with your agents</Eyebrow>
            <h2>Connect once.<br />Approve each agent.</h2>
            <p className={s.intro}>Use the SDK, CLI, or MCP server with your existing tools.</p>
            <TextLink href={`${KEYCHAIN_LINK}/SKILL.md`} external>Agent setup guide</TextLink>
          </div>
          <ol className={k.steps}>
            <li><h3>Add a credential.</h3><p>Sign in with Google, a passkey, or a wallet. Your browser encrypts the credential before it is stored.</p></li>
            <li><h3>Approve an agent.</h3><p>Choose the agent’s public key, the credential it can use, and when its permission expires.</p></li>
            <li><h3>Let Lit check each request.</h3><p>The agent proves its identity. Lit verifies your signed permission before using or releasing the credential.</p></li>
          </ol>
        </div>
      </section>
      <section className={s.section} id="security">
        <div className={`${s.container} ${s.editorial}`}>
          <div><Eyebrow>Built on Lit</Eyebrow><h2>Your permission.<br />Checked in code.</h2></div>
          <div className={k.security}>
            <p>Each credential is bound to an immutable Lit Action. The action checks your signed approval inside confidential hardware. The storage service cannot create a new permission on your behalf.</p>
            <p>Keychain still relies on that service to supply the latest permission record. An operator could replay an older valid approval until it expires. For suspected compromise, revoke the credential with its provider too.</p>
            <nav className={k.links} aria-label="Keychain security resources">
              <TextLink href={`${KEYCHAIN_LINK}/SECURITY.md`} external>Read the security model</TextLink>
              <TextLink href={KEYCHAIN_SOURCE_LINK} external><IconBrandGithub size={17} /> Open-source</TextLink>
            </nav>
          </div>
        </div>
      </section>
      <FAQ items={[
        { question: 'Does my agent run inside Lit?', answer: <p>Your agent runs wherever you choose. For connected services, the credential-handling action runs inside Lit. With stored secrets, the credential is delivered to the agent’s environment.</p> },
        { question: 'Are Keychain permissions stored on-chain?', answer: <p>Keychain stores owner-signed permission records and verifies them inside Lit. These are separate from the on-chain wallet permissions in ChainSecured. The underlying Lit runtime follows its own on-chain approval process.</p> },
        { question: 'What happens when I revoke access?', answer: <p>With the current permission record, revocation blocks subsequent requests. An operator can replay an older valid record until it expires. Revocation cannot recall a key already delivered to an agent or undo a completed action. Rotate or revoke the key at its provider when needed.</p> },
        { question: 'How do I recover access?', answer: <p>Add and test a second owner credential, and keep an encrypted backup. Connected-service credentials cannot be exported, so retain the original keys separately. <a href={`${KEYCHAIN_LINK}/README.md#owner-setup-and-recovery`}>Read the recovery guide ↗</a></p> },
      ]} />
      <section className={`${s.dark} ${s.closing}`}>
        <div className={s.container}>
          <Eyebrow>Lit Agent Keychain</Eyebrow>
          <div className={s.closingRow}>
            <div><h2>Start with one credential.</h2><p className={k.pricing}>Free for 5 secrets. $10/month for up to 1,000.<br />Execution included under fair use. Provider charges are separate.</p></div>
            <Action href={KEYCHAIN_LINK}>Open Keychain</Action>
          </div>
        </div>
      </section>
    </div>
  );
}
