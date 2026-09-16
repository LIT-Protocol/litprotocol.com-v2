import { GITHUB_LINK } from '@/utils/constants';
import Fingerprint from './Fingerprint';
import {
  Action,
  Closing,
  Eyebrow,
  PageHero,
  TextLink,
  evidence,
} from './shared';
import s from './platform.module.css';

export default function SecurityPage() {
  return (
    <div className={s.site}>
      <PageHero
        label="Security & verification"
        index="03"
        title={
          <>
            Verify what runs.
            <br />
            See who controls it.
          </>
        }
        action={
          <Action href={evidence.verification} external>
            Start verifying
          </Action>
        }
      >
        Inspect the source, check the running software, and see who can approve
        a change.
      </PageHero>
      <nav className={s.pageNav} aria-label="On this page">
        <div className={s.container}>
          <a href="#how-it-works">Verification</a>
          <a href="#permissions">Wallet permissions</a>
          <a href="#governance">Protocol updates</a>
          <a href="#boundaries">Trust & boundaries</a>
        </div>
      </nav>
      <section id="how-it-works" className={`${s.section} ${s.shade}`}>
        <div className={s.container}>
          <div className={s.proofHeading}>
            <div>
              <Eyebrow>Software has an identity</Eyebrow>
              <h2>
                Change the code.
                <br />The hash changes.
              </h2>
            </div>
            <p>
              A hash identifies an exact version of code. Hardware attestation
              lets you check which version is running. Verify that your
              connection reaches that runtime before sending private data.
            </p>
          </div>
          <Fingerprint />
          <div className={s.sourceLinks}>
            <TextLink href={GITHUB_LINK} external>
              Inspect the source
            </TextLink>
            <TextLink href={evidence.attestation} external>
              Understand attestation
            </TextLink>
            <TextLink href={evidence.verification} external>
              Verify the runtime
            </TextLink>
          </div>
        </div>
      </section>
      <section id="permissions" className={s.section}>
        <div className={`${s.container} ${s.editorial}`}>
          <div>
            <Eyebrow>Wallet permissions</Eyebrow>
            <h2>
              You decide which code
              <br />
              can use your wallet.
            </h2>
          </div>
          <div>
            <p className={s.intro}>
              In ChainSecured mode, your wallet owns the account. You use
              on-chain groups to specify which Actions can use each key.
              The runtime checks those permissions on every request.
            </p>
            <TextLink href={evidence.chain} external>
              Inspect Chain Secured
            </TextLink>
          </div>
        </div>
      </section>
      <section id="governance" className={`${s.section} ${s.shade}`}>
        <div className={`${s.container} ${s.editorial}`}>
          <div>
            <Eyebrow>Protocol governance</Eyebrow>
            <h2>
              Follow software
              <br />
              approvals on-chain.
            </h2>
            <p className={s.intro}>
              Deploying new software does not give it access to runtime keys.
              The key-management system checks hardware attestation and
              on-chain approval before releasing them.
            </p>
            <p className={s.note}>
              Runtime approvals are separate from your wallet permissions.
            </p>
            <div className={s.sourceLinks}>
              <TextLink href={evidence.governance} external>
                Upgrade governance
              </TextLink>
              <TextLink href={evidence.kms} external>
                On-chain KMS
              </TextLink>
            </div>
          </div>
          <div>
            <dl className={s.governanceTable}>
              <div>
                <dt>Software identity</dt>
                <dd>Measured by hardware attestation</dd>
              </div>
              <div>
                <dt>Release approval</dt>
                <dd>Code hashes authorized on-chain</dd>
              </div>
              <div>
                <dt>Key release</dt>
                <dd>Requires attestation and on-chain approval</dd>
              </div>
            </dl>
            <p className={s.note}>
              Inspect the approved software versions, approval rules, and upgrade
              process in the governance guide.
            </p>
          </div>
        </div>
      </section>
      <section id="boundaries" className={s.section}>
        <div className={`${s.container} ${s.editorial}`}>
          <div>
            <Eyebrow>Trust & boundaries</Eyebrow>
            <h2>
              Understand what
              <br />
              verification tells you.
            </h2>
          </div>
          <div className={s.detailRows}>
            <div>
              <h3>Isolation relies on hardware.</h3>
              <p>
                Confidential hardware protects runtime memory from the host.
                That protection depends on the security of the hardware and firmware.
              </p>
            </div>
            <div>
              <h3>Check who can approve changes.</h3>
              <p>
                Account permissions and protocol approvals have separate rules.
                Review how each can change when verifying a deployment.
              </p>
            </div>
            <div>
              <h3>Verified code can still have bugs.</h3>
              <p>
                Attestation identifies software. It does not prove application
                logic, external data, or model responses are correct.
              </p>
            </div>
            <div>
              <h3>Outputs still need controls.</h3>
              <p>
                Review permitted requests, responses, and logs. Verification
                does not prevent every data leak or guarantee availability.
              </p>
            </div>
          </div>
        </div>
        <div className={`${s.container} ${s.onPrem}`}>
          <span>Run Lit Protocol on-premises</span>
          <TextLink href={evidence.hosting} external>
            Read the self-hosting guide
          </TextLink>
        </div>
      </section>
      <Closing />
    </div>
  );
}
