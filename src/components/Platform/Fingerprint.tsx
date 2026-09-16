'use client';

import { useState } from 'react';
import { IconArrowUpRight, IconArrowRight } from '@tabler/icons-react';
import { fingerprintExamples } from './fingerprint-example';
import s from './fingerprint.module.css';

export default function Fingerprint() {
  const [version, setVersion] = useState(0);
  const [hash, setHash] = useState<string>(fingerprintExamples[0].hash);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const changeCode = async () => {
    setBusy(true);
    setError(false);
    try {
      const next = version === 0 ? 1 : 0;
      const result = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(fingerprintExamples[next].source)
      );
      setHash(
        Array.from(new Uint8Array(result), byte =>
          byte.toString(16).padStart(2, '0')
        ).join('')
      );
      setVersion(next);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };
  return (
    <figure
      className={s.figure}
      aria-label="Interactive illustration of code identity. Change one character to calculate a different SHA-256 fingerprint."
    >
      <div className={s.workbench}>
        <div className={s.source}>
          <div className={s.panelLabel}>
            <span>Example code</span>
            <span>JavaScript</span>
          </div>
          <pre aria-label="Illustrative source code">
            <code>
              <span className={s.codeMuted}>function</span> maySign(amount){' '}
              {'{'}
              {'\n'}
              {'  '}
              <span className={s.codeMuted}>return</span> amount {'<='}{' '}
              <span className={s.codeValue}>
                {version === 0 ? '1000' : '1001'}
              </span>
              ;{'\n'}
              {'}'}
            </code>
          </pre>
          <button
            type="button"
            onClick={changeCode}
            disabled={busy}
            className={s.change}
            aria-label={
              version === 0
                ? 'Change one character in the example code'
                : 'Restore the original example code'
            }
          >
            {busy
              ? 'Calculating…'
              : version === 0
                ? 'Change one character'
                : 'Restore original code'}
            <IconArrowUpRight size={17} aria-hidden="true" />
          </button>
        </div>
        <div className={s.print}>
          <div className={s.panelLabel}>
            <span>Code identity</span>
            <span>SHA-256</span>
          </div>
          <output
            className={`${s.hash} ${version ? s.changedHash : ''}`}
            aria-label="SHA-256 of the displayed source code"
          >
            {hash}
          </output>
          <div className={s.result} role="status" aria-live="polite">
            <span className={version ? s.changedDot : s.dot} />
            {error
              ? 'Try this example over a secure connection.'
              : version
                ? 'One character changed. A different fingerprint.'
                : 'A fingerprint of this exact code.'}
          </div>
        </div>
      </div>
      <figcaption>
        Illustrative code. SHA-256 calculated in your browser.{' '}
        <a href="/security#how-it-works">
          How runtime verification works{' '}
          <IconArrowRight size={14} aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}
