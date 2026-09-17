import { IconCode, IconCube, IconRoute, IconWallet, IconWorld } from '@tabler/icons-react';
import s from './architecture-visual.module.css';

export function WalletUpdateVisual() {
  return (
    <figure className={s.wallet} aria-label="Example wallet update: revoke the old Action and approve a new one on-chain. The wallet address stays the same.">
      <div className={s.versions}>
        <div className={`${s.card} ${s.previous}`}>
          <IconCode size={24} stroke={1.3} aria-hidden="true" />
          <strong>Lit Action v1</strong>
          <span>Revoked on-chain</span>
        </div>
        <div className={`${s.card} ${s.approved}`}>
          <IconCode size={24} stroke={1.3} aria-hidden="true" />
          <strong>Lit Action v2</strong>
          <span>Approved on-chain</span>
        </div>
      </div>
      <div className={s.walletConnection} aria-hidden="true" />
      <div className={s.walletRuntime}>
        <span className={s.label}>Confidential runtime</span>
        <div className={s.walletIdentity}>
          <IconWallet size={28} stroke={1.2} aria-hidden="true" />
          <div><strong>Same wallet.</strong><span>Same address.</span></div>
        </div>
      </div>
      <figcaption>Each code version is fixed. You choose which one can sign.</figcaption>
    </figure>
  );
}

export function ContainerVisual() {
  return (
    <figure className={s.compute} aria-label="Outbound connections: the Docker application and network proxy run inside the same confidential virtual machine. The proxy allows connections only to permitted external services.">
      <div className={s.computeFlow}>
        <div className={s.computeRuntime}>
          <span className={s.label}>Confidential virtual machine</span>
          <div className={s.runtimeFlow}>
            <div className={s.card}>
              <IconCube size={28} stroke={1.2} aria-hidden="true" />
              <strong>Your application</strong>
              <span>Docker container</span>
            </div>
            <div className={s.connection} aria-hidden="true" />
            <div className={`${s.card} ${s.approved}`}>
              <IconRoute size={28} stroke={1.2} aria-hidden="true" />
              <strong>Network proxy</strong>
              <span>Checks allowed destinations</span>
            </div>
          </div>
        </div>
        <div className={s.connection} aria-hidden="true" />
        <div className={`${s.card} ${s.services}`}>
          <IconWorld size={28} stroke={1.2} aria-hidden="true" />
          <strong>Permitted services</strong>
          <span>Accounts, tools & APIs</span>
          <small>Outside the confidential runtime</small>
        </div>
      </div>
      <figcaption>The application and network policy are part of the same measured release.</figcaption>
    </figure>
  );
}
