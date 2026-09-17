import { AI_CONTACT_FORM, AI_DOCS_LINK } from '@/utils/constants';
import {
  Action,
  Closing,
  ComparisonRow,
  Eyebrow,
  FAQ,
  PageHero,
  TextLink,
} from './shared';
import s from './platform.module.css';
import { ContainerVisual } from './ArchitectureVisual';

export default function AIPage() {
  return (
    <div className={s.site}>
      <PageHero
        label="Confidential AI"
        title={
          <>
            Train and run AI.
            <br />
            Keep your data private.
          </>
        }
        action={
          <Action href={AI_CONTACT_FORM} external>
            Contact for Lit AI
          </Action>
        }
      >
        Run training and inference in confidential hardware that protects your
        data and models while they’re in use. Verify the software and control
        what it can share.
      </PageHero>
      <nav className={s.pageNav} aria-label="On this page">
        <div className={s.container}>
          <a href="#method">How it works</a>
          <a href="#workloads">Workloads</a>
          <a href="#connections">Data controls</a>
          <a href="#engagement">Working with Lit</a>
        </div>
      </nav>
      <section id="method" className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHeading}>
            <Eyebrow>Docker deployments</Eyebrow>
            <h2>Run your container in confidential hardware.</h2>
            <p>
              Use your own application or a vendor’s Docker container. Verify
              the code and control which services it can connect to.
            </p>
          </div>
          <ContainerVisual />
          <ol className={s.workflow}>
            <li>
              <span>01</span>
              <h3>Choose your software.</h3>
              <p>Select an exact Docker image version, the data it needs, and the services it can reach.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Approve changes on-chain.</h3>
              <p>Changing the code or permitted connections requires a new release and on-chain approval.</p>
            </li>
            <li>
              <span>03</span>
              <h3>Check before connecting.</h3>
              <p>Use hardware attestation to confirm that the running software matches an approved release.</p>
            </li>
          </ol>
          <div className={s.sourceLinks}>
            <TextLink href={AI_DOCS_LINK} external>Read the AI developer guide</TextLink>
          </div>
        </div>
      </section>
      <section id="workloads" className={s.section}>
        <div className={`${s.container} ${s.editorial}`}>
          <div>
            <Eyebrow>Training & inference</Eyebrow>
            <h2>
              Keep data private
              <br />
              while models use it.
            </h2>
          </div>
          <div className={s.detailRows}>
            <div>
              <h3>Training & fine-tuning</h3>
              <p>
                Keep datasets and model weights inside the confidential runtime
                during training. Decide who can receive the trained model.
              </p>
            </div>
            <div>
              <h3>Inference</h3>
              <p>
                Process prompts and private context inside confidential
                hardware. Control where responses go and what gets retained.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="connections" className={`${s.section} ${s.dark}`}>
        <div className={s.container}>
          <div className={s.sectionHeading}>
            <Eyebrow>Connections & data controls</Eyebrow>
            <h2>
              Decide what gets in.
              <br />
              And what gets out.
            </h2>
            <p>
              Connect to accounts, tools, and services without giving the
              application unrestricted network access.
            </p>
          </div>
          <div className={s.controlList}>
            <div>
              <span>01</span>
              <h3>Accounts & credentials</h3>
              <p>
                Connect private databases, business accounts, and MCP tools
                using credentials stored in the confidential runtime.
              </p>
            </div>
            <div>
              <span>02</span>
              <h3>Shared network controls</h3>
              <p>
                Your organization and software provider can jointly approve
                where the application connects. We can help you set up a proxy
                operated by Lit or an independent party to enforce those rules.
              </p>
            </div>
            <div>
              <span>03</span>
              <h3>Responses & logs</h3>
              <p>
                Your code determines what the application sends or saves.
                Review it alongside the network rules.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="engagement" className={s.section}>
        <div className={`${s.container} ${s.editorial}`}>
          <div>
            <Eyebrow>Working with Lit</Eyebrow>
            <h2>
              Tell us what
              <br />
              you want to run.
            </h2>
          </div>
          <div>
            <p className={s.intro}>
              Share your model, the data it needs, and your performance goals.
              We’ll help you choose suitable hardware and plan the deployment.
            </p>
            <TextLink href={AI_CONTACT_FORM} external>
              Contact for Lit AI
            </TextLink>
          </div>
        </div>
      </section>
      <FAQ
        items={[
          {
            question: 'What if my application calls an external model?',
            answer:
              'The provider can see the data your application sends to it. To protect the model’s execution with confidential hardware, the model itself must run inside that hardware.',
          },
          {
            question: 'What can I verify?',
            answer:
              'You can check which software is running and whether it has on-chain approval. This does not prove that a model’s answers are correct. Model weights downloaded separately also need to be checked against the version you expect.',
          },
          {
            question: 'Which models and hardware are supported?',
            answer:
              'Contact us with your model and performance requirements. We’ll confirm hardware compatibility and availability before planning a deployment.',
          },
          {
            question: 'Can I start from the crypto dashboard?',
            answer:
              'Contact the Lit team to set up AI training or inference. The self-serve dashboard is for crypto automation.',
          },
        ]}
      />
      <ComparisonRow compute />
      <Closing ai />
    </div>
  );
}
