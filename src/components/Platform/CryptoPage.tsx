import { DASHBOARD_LINK, DOCS_LINK, QUICKSTART_LINK } from '@/utils/constants';
import {
  Action,
  Closing,
  ComparisonRow,
  Eyebrow,
  FAQ,
  PageHero,
  TextLink,
  evidence,
} from './shared';
import s from './platform.module.css';

export default function CryptoPage() {
  return (
    <div className={s.site}>
      <PageHero
        label="Crypto infrastructure"
        index="01"
        title={
          <>
            A programmable wallet
            <br />
            for your crypto system.
          </>
        }
        action={<Action href={DASHBOARD_LINK}>Get started with crypto</Action>}
      >
        Power hot wallets, vaults, and agent wallets with code that runs
        in confidential hardware. Each code version is immutable. Your on-chain permissions
        determine which versions can use the wallet.
      </PageHero>
      <nav className={s.pageNav} aria-label="On this page">
        <div className={s.container}>
          <a href="#control">Control</a>
          <a href="#workflow">How it works</a>
          <a href="#applications">Applications</a>
        </div>
      </nav>
      <section id="control" className={s.section}>
        <div className={`${s.container} ${s.editorial}`}>
          <div>
            <Eyebrow>The authority stays with you</Eyebrow>
            <h2>
              Update the rules.
              <br />
              Keep the wallet.
            </h2>
          </div>
          <div className={s.detailRows}>
            <div>
              <h3>Authorize the exact code.</h3>
              <p>
                Each Lit Action is identified by its code hash. Changing the code
                creates a new version with a different hash.
              </p>
              <TextLink href={evidence.actions} external>
                Lit Actions
              </TextLink>
            </div>
            <div>
              <h3>Update permissions on-chain.</h3>
              <p>
                Authorize a new Action and revoke the old one through your account’s
                on-chain permissions. The wallet keeps its address.
              </p>
              <TextLink href={evidence.chain} external>
                Chain Secured
              </TextLink>
            </div>
            <div>
              <h3>Sign inside confidential hardware.</h3>
              <p>
                Request a permitted action without storing the signing key on
                your application server.
              </p>
              <TextLink href="/security">Security & verification</TextLink>
            </div>
          </div>
        </div>
      </section>
      <section id="workflow" className={`${s.section} ${s.shade}`}>
        <div className={s.container}>
          <div className={s.sectionHeading}>
            <Eyebrow>From input to signature</Eyebrow>
            <h2>Read the data. Check your rules. Act.</h2>
          </div>
          <ol className={s.workflow}>
            <li>
              <span>01</span>
              <h3>Connect.</h3>
              <p>Read data from APIs, private accounts, and blockchains.</p>
              <TextLink href={evidence.secrets} external>
                Using private credentials
              </TextLink>
            </li>
            <li>
              <span>02</span>
              <h3>Decide.</h3>
              <p>
                Your code checks the conditions: amount, recipient, timing, or
                other rules.
              </p>
              <TextLink href={`${DOCS_LINK}/architecture/groups`} external>
                Authorizing actions
              </TextLink>
            </li>
            <li>
              <span>03</span>
              <h3>Sign.</h3>
              <p>The authorized action signs when its conditions pass.</p>
              <TextLink href={QUICKSTART_LINK} external>
                Run your first action
              </TextLink>
            </li>
          </ol>
        </div>
      </section>
      <section id="applications" className={s.applications}>
        <div className={s.container}>
          <div className={s.editorial}>
            <div>
              <Eyebrow>Wallet infrastructure</Eyebrow>
              <h2>Built for your crypto system.</h2>
            </div>
            <div className={s.detailRows}>
              <div>
                <h3>Hot wallets</h3>
                <p>
                  Automate payments and transactions. Let code check recipients,
                  amounts, and live data before the wallet signs.
                </p>
              </div>
              <div>
                <h3>Vaults</h3>
                <p>
                  Define withdrawal conditions and approval checks in code.
                  Approve changes to those rules on-chain.
                </p>
              </div>
              <div id="agent-wallets">
                <h3>Agent wallets</h3>
                <p>
                  Let agents transact within limits you define in code. Update
                  or revoke their wallet access through on-chain permissions.
                </p>
              </div>
            </div>
          </div>
          <p className={s.eyebrow} style={{ marginTop: 48 }}>Explore the applications</p>

          <nav aria-label="Crypto applications">
            <a href="/stablecoins">
              <span>Stablecoin payments</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href="/solvers">
              <span>Cross-chain solvers</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href="/rwa">
              <span>Tokenized assets</span>
              <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </section>
      <FAQ
        items={[
          {
            question: 'How can immutable code support an updatable wallet?',
            answer: (
              <>
                Each Action’s code is fixed. An update creates a new Action with a
                different hash. Your account authorizes that version to use the
                existing wallet and can revoke earlier versions. The wallet’s
                address stays the same.{' '}
                <a href={evidence.actions}>How Actions and wallet keys work.</a>
              </>
            ),
          },
          {
            question: 'Do signatures require an on-chain transaction?',
            answer: (
              <>
                You change permissions through an on-chain transaction. Lit Actions
                read those permissions when they run, so each signature does not
                require a separate permission transaction.{' '}
                <a href={evidence.chain}>Chain Secured architecture.</a>
              </>
            ),
          },
          {
            question: 'How are runtime updates approved?',
            answer: (
              <>
                Protocol releases follow an on-chain approval process, separate
                from account permissions. The runtime must satisfy the contract’s
                approval rules to receive its keys.{' '}
                <a href="/security#governance">Inspect runtime governance.</a>
              </>
            ),
          },
        ]}
      />
      <ComparisonRow />
      <Closing />
    </div>
  );
}
