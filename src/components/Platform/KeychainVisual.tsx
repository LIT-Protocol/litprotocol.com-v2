import { IconArrowRight, IconDeviceLaptop, IconDeviceDesktop, IconTerminal2, IconKey, IconShieldCheck } from '@tabler/icons-react';
import k from './keychain.module.css';
import McpMark from './McpMark';

// Product concept, not live account state or automatic device synchronization.
export default function KeychainVisual() {
  return (
    <figure className={k.diagram}>
      <div className={k.diagramLabel}>
        <span>One keychain. Access from the agents you approve.</span>
        <span className={k.mcpBrand}><McpMark /> MCP</span>
      </div>
      <div className={k.flow}>
        <div className={k.devices}>
          <div><IconDeviceLaptop size={22} stroke={1.3} aria-hidden="true" /><span>Laptop<small>Approved agent</small></span></div>
          <div><IconDeviceDesktop size={22} stroke={1.3} aria-hidden="true" /><span>Workstation<small>Approved agent</small></span></div>
          <div><IconTerminal2 size={22} stroke={1.3} aria-hidden="true" /><span>New session<small>Same agent setup</small></span></div>
        </div>
        <IconArrowRight className={k.flowArrow} size={24} stroke={1.2} aria-hidden="true" />
        <div className={k.runtime}>
          <span className={k.nodeLabel}>Lit Agent Keychain</span>
          <strong>Your encrypted credentials</strong>
          <div><IconKey size={18} stroke={1.4} aria-hidden="true" /> Access you approve</div>
          <div><IconShieldCheck size={18} stroke={1.4} aria-hidden="true" /> Permission checked inside Lit</div>
        </div>
      </div>
      <figcaption>No credential server to host. Set up each device once; reuse its agent configuration across sessions.</figcaption>
    </figure>
  );
}
