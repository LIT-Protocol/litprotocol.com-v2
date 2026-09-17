import { IconArrowRight, IconKey, IconShieldCheck } from '@tabler/icons-react';
import k from './keychain.module.css';

export default function KeychainVisual() {
  return (
    <figure className={k.diagram} aria-label="Connected service example: an approved agent requests a Stripe balance. Lit checks permission and uses the credential inside its confidential runtime. Stripe receives the API key; the agent receives the result.">
      <div className={k.diagramLabel}>Check your Stripe balance without giving the agent your Stripe key.</div>
      <div className={k.flow} aria-hidden="true">
        <div className={k.endpoint}>
          <span className={k.nodeLabel}>Your agent</span>
          <strong>Get balance</strong>
          <span>Signed request</span>
        </div>
        <IconArrowRight className={k.flowArrow} size={20} stroke={1.2} />
        <div className={k.runtime}>
          <span className={k.nodeLabel}>Lit confidential runtime</span>
          <div><IconShieldCheck size={18} stroke={1.4} /> Check your permission</div>
          <div><IconKey size={18} stroke={1.4} /> Use the stored API key</div>
        </div>
        <IconArrowRight className={k.flowArrow} size={20} stroke={1.2} />
        <div className={k.endpoint}>
          <span className={k.nodeLabel}>Stripe API</span>
          <strong>Return balance</strong>
          <span>Authenticated request</span>
        </div>
      </div>
      <figcaption>The agent receives the balance. The API key is used inside Lit and sent only to Stripe.</figcaption>
    </figure>
  );
}
