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
        label="Lit Agent Keychain"
        title="Let agents use your services without holding your API keys."
        action={<Action href={KEYCHAIN_LINK}>Open Keychain</Action>}
      >
        Choose which supported actions an agent can perform. Lit executes the
        request with your credentials inside confidential hardware and returns
        the result.
      </PageHero>
      <div className={`${s.container} ${k.heroDiagram}`}><KeychainVisual /></div>
      <section className={s.section} id="access">
        <div className={s.container}>
          <div className={s.sectionHeading}>
            <Eyebrow>Connected services</Eyebrow>
            <h2>Give each agent a specific job.</h2>
          </div>
          <div className={k.benefits}>
            <article>
              <h3>Keep keys out of the agent.</h3>
              <p>The action uses your credential inside Lit. Your agent receives the result, without a copy of the API key in its environment.</p>
            </article>
            <article>
              <h3>Limit access to an action.</h3>
              <p>A Stripe balance check or a GitHub file read. The selected action defines the operation the agent can request.</p>
            </article>
            <article>
              <h3>Enforce permission inside Lit.</h3>
              <p>Code running in confidential hardware checks the agent’s identity and your signed approval before making the request.</p>
            </article>
          </div>
          <TextLink href="https://github.com/LIT-Protocol/agent-keychain-library" external>Explore supported actions</TextLink>
        </div>
      </section>
      <section className={`${s.section} ${s.shade}`} id="setup">
        <div className={`${s.container} ${s.editorial}`}>
          <div>
            <Eyebrow>Works with your agents</Eyebrow>
            <h2>Set up access for your existing agents.</h2>
            <p className={s.intro}>Use the SDK, CLI, or MCP server with your existing tools.</p>
            <TextLink href={`${KEYCHAIN_LINK}/SKILL.md`} external>Agent setup guide</TextLink>
          </div>
          <ol className={k.steps}>
            <li><h3>Choose a service action.</h3><p>Add its API key in Keychain. Your browser encrypts the credential before it is stored.</p></li>
            <li><h3>Approve an agent.</h3><p>Approve the agent’s public key and set when its permission expires.</p></li>
            <li><h3>Let Lit check each request.</h3><p>Connect through the SDK, CLI, or MCP server. Lit checks each request and runs the approved action.</p></li>
          </ol>
        </div>
        <div className={s.container}>
          <aside className={k.stored}>
            <div><Eyebrow>Also available · Stored secrets</Eyebrow><h3>When your tool needs the key.</h3></div>
            <div>
              <p>Release a stored credential to an approved agent through the SDK, CLI, or MCP server. In this mode, the agent’s environment receives the decrypted key.</p>
              <TextLink href={`${KEYCHAIN_SOURCE_LINK}/sdk#readme`} external>Stored-secret integration guide</TextLink>
            </div>
          </aside>
        </div>
      </section>
      <section className={s.section} id="security">
        <div className={`${s.container} ${s.editorial}`}>
          <div><Eyebrow>Built on Lit</Eyebrow><h2>Permission checks you can inspect.</h2></div>
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
            <div><h2>Give your agent its first task.</h2><p className={k.pricing}>Free for 5 secrets. $10/month for up to 1,000.<br />Execution included under fair use. Provider charges are separate.</p></div>
            <Action href={KEYCHAIN_LINK}>Open Keychain</Action>
          </div>
        </div>
      </section>
    </div>
  );
}
