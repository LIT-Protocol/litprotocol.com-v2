import Image from 'next/image';
import CustomerProof from '../TrustStrip/CustomerProof';
import { GITHUB_LINK } from '@/utils/constants';
import HomeMotion from './HomeMotion';
import ProductVisual from './ProductVisual';
import KeychainVisual from './KeychainVisual';
import k from './keychain.module.css';
import {
  IconBrandGithub,
  IconCpu,
  IconGitBranch,
  IconArrowUpRight,
} from '@tabler/icons-react';
import {
  Actions,
  Closing,
  Eyebrow,
  TextLink,
  TrustLinks,
  evidence,
} from './shared';
import s from './platform.module.css';

export default function ProductHome() {
  return (
    <HomeMotion className={s.site}>
      <section className={s.hero}>
        <div className={s.heroMaterial} aria-hidden="true">
          <Image
            src="/images/platform/abstract-light-v1.png"
            alt=""
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className={s.container}>
          <h1>
            <span>Confidential,</span> <span>verifiable execution.</span>
          </h1>
          <div className={s.heroBody}>
            <div>
              <p className={s.heroLead}>
                Get real control of what your application does and who it shares
                data with.
              </p>
              <p className={s.heroSupport}>
                Run crypto automations and AI workloads in confidential
                hardware, connected to your accounts, tools, and blockchains.
              </p>
            </div>
            <Actions />
          </div>
          <div className={s.heroBottom}>
            <div className={s.metric}>
              <strong>$50B+</strong>
              <span>secured</span>
            </div>
            <TrustLinks />
          </div>
        </div>
      </section>
      <CustomerProof />
      <section className={s.products} aria-label="Build with Lit">
        <div className={s.container}>
          <div className={s.productColumns}>
            <article id="wallets" className={s.productEntry}>
              <Eyebrow>Crypto infrastructure</Eyebrow>
              <ProductVisual kind="crypto" />
              <h2>
                A programmable wallet
                <br />
                for your crypto system.
              </h2>
              <p>
                Power hot wallets, vaults, and agents with immutable code and
                on-chain permissions you can update.
              </p>
              <TextLink href="/crypto">Explore programmable wallets</TextLink>
              <nav className={s.productFoot} aria-label="Crypto use cases">
                <a href="/crypto#agent-wallets">Agent wallets</a>
                <a href="/stablecoins">Stablecoins</a>
                <a href="/solvers">Cross-chain solvers</a>
                <a href="/rwa">Tokenized assets</a>
              </nav>
            </article>
            <article id="ai" className={s.productEntry}>
              <Eyebrow>Confidential AI</Eyebrow>
              <ProductVisual kind="ai" />
              <h2>
                Train and run AI.
                <br />
                Keep your data private.
              </h2>
              <p>Protect data and models during training and inference.</p>
              <TextLink href="/ai">Explore confidential AI</TextLink>
              <p className={s.productFoot}>Your workloads or a vendor’s. No operator access to runtime memory.</p>
            </article>
          </div>
          <article id="keychain" className={k.homeEntry}>
            <div>
              <Eyebrow>Agent Keychain</Eyebrow>
              <h2>Use your credentials across devices and agent sessions.</h2>
              <p>Store API keys once and connect the agents you approve. Open-source, cryptographically verifiable, and confidential. No credential server to host.</p>
              <TextLink href="/keychain">Explore Agent Keychain</TextLink>
            </div>
            <KeychainVisual />
          </article>
        </div>
      </section>
      <section className={s.proof} id="infrastructure">
        <div className={s.container}>
          <div className={s.homeProofHeading}>
            <div>
              <Eyebrow>Open to inspection</Eyebrow>
              <h2>Know what you’re running.</h2>
            </div>
            <p>
              Software updates to Lit happen in public and on-chain. Only
              approved code can access runtime keys.
            </p>
          </div>
          <nav
            className={s.proofLinks}
            aria-label="Infrastructure details"
            data-reveal
          >
            <a href={GITHUB_LINK}>
              <span className={s.proofIcon} data-piece aria-hidden="true">
                <IconBrandGithub size={28} stroke={1.3} />
              </span>
              <span>Open-source</span>
              <IconArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="/security#how-it-works">
              <span className={s.proofIcon} data-piece aria-hidden="true">
                <IconCpu size={28} stroke={1.3} />
              </span>
              <span>Verify the runtime</span>
              <IconArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="/security#governance">
              <span className={s.proofIcon} data-piece aria-hidden="true">
                <IconGitBranch size={28} stroke={1.3} />
              </span>
              <span>Follow protocol updates</span>
              <IconArrowUpRight size={17} aria-hidden="true" />
            </a>
          </nav>
          <div className={s.homeOnPrem}>
            <TextLink href={evidence.hosting}>
              Run Lit Protocol on-premises
            </TextLink>
          </div>
        </div>
      </section>
      <Closing />
    </HomeMotion>
  );
}
