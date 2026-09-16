import type { CSSProperties } from 'react';
import s from './product-visual.module.css';

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties;

// Illustrations of the product concepts, not live application status.
export default function ProductVisual({ kind }: { kind: 'crypto' | 'ai' }) {
  return (
    <div
      className={s.visual}
      data-reveal
      role="img"
      aria-label={kind === 'crypto'
        ? 'A JavaScript Lit Action signing a transaction inside a confidential runtime.'
        : 'Private data and a model inside a confidential runtime.'}
    >
      <svg viewBox="0 0 440 200" focusable="false" aria-hidden="true">
        <defs>
          <linearGradient id={`lit-surface-${kind}`} x2="0.8" y2="1">
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#ecece5" />
          </linearGradient>
        </defs>
        <path
          className={s.boundary}
          d="M15 60V28h32m346 0h32v32M15 140v32h32m346 0h32v-32"
        />
        {kind === 'crypto' ? (
          <>
            <path className={s.track} d="M162 101H280" />
            <path
              className={s.signal}
              d="M162 101H280"
              pathLength="1"
              data-draw
            />
            <g data-piece>
              <rect
                className={s.back}
                x="29"
                y="62"
                width="140"
                height="94"
                rx="4"
              />
              <rect
                className={s.plate}
                x="38"
                y="49"
                width="140"
                height="94"
                rx="4"
                fill="url(#lit-surface-crypto)"
              />
              <text x="56" y="79">
                Lit Action
              </text>
              <text className={s.language} x="56" y="98">
                JavaScript
              </text>
              <path className={s.detail} d="M56 111H117" />
              <path className={s.accent} d="M157 64V77M150.5 70.5H163.5" />
            </g>
            <g data-piece style={delay(120)}>
              <rect
                className={s.code}
                x="201"
                y="80"
                width="40"
                height="40"
                rx="4"
              />
              <path
                className={s.codeGlyph}
                d="m214 94-6 6 6 6m14-12 6 6-6 6m-5-15-5 18"
              />
            </g>
            <g data-piece style={delay(240)}>
              <rect
                className={s.back}
                x="279"
                y="62"
                width="140"
                height="94"
                rx="4"
              />
              <rect
                className={s.plate}
                x="270"
                y="49"
                width="140"
                height="94"
                rx="4"
                fill="url(#lit-surface-crypto)"
              />
              <text x="289" y="79">
                Sign txn
              </text>
              <path className={s.detail} d="M289 111H348" />
              <path className={s.accent} d="M381 64h11v11m-11 0 11-11" />
            </g>
          </>
        ) : (
          <>
            <g data-piece>
              <rect
                className={s.back}
                x="94"
                y="55"
                width="226"
                height="65"
                rx="4"
              />
              <rect
                className={s.plate}
                x="104"
                y="44"
                width="226"
                height="65"
                rx="4"
                fill="url(#lit-surface-ai)"
              />
              <text x="125" y="75">
                Private data
              </text>
              <path className={s.detail} d="M125 90H197" />
              <path className={s.accent} d="M304 62v12m-6-6h12" />
            </g>
            <g data-piece style={delay(160)}>
              <rect
                className={s.back}
                x="125"
                y="97"
                width="226"
                height="65"
                rx="4"
              />
              <rect
                className={s.plate}
                x="115"
                y="86"
                width="226"
                height="65"
                rx="4"
                fill="url(#lit-surface-ai)"
              />
              <text x="136" y="117">
                Your model
              </text>
              <path className={s.detail} d="M136 133H208" />
              <path
                className={s.accent}
                d="m308 106 8 5v10l-8 5-8-5v-10Zm0 10v10m-8-15 8 5 8-5"
              />
            </g>
          </>
        )}
        <path
          className={s.signal}
          d="M145 172H295"
          pathLength="1"
          data-draw
        />
        <text className={s.caption} x="220" y="194" textAnchor="middle">
          Confidential runtime
        </text>
      </svg>
    </div>
  );
}
