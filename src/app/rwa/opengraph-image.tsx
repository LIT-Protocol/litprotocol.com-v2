import { ImageResponse } from 'next/server';

export const runtime = 'edge';
export const alt =
  'Provable Control — a Lit Protocol position paper on code-enforced authority for the privileged keys behind tokenized real-world assets.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Bespoke Open Graph / Twitter card for /rwa (Next wires it automatically).
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '84px',
          background: '#0b0806',
          color: 'white',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -160,
            width: 680,
            height: 680,
            display: 'flex',
            background:
              'radial-gradient(circle, rgba(255,91,41,0.22) 0%, transparent 62%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -220,
            left: -180,
            width: 620,
            height: 620,
            display: 'flex',
            background:
              'radial-gradient(circle, rgba(255,206,94,0.12) 0%, transparent 62%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 24,
            letterSpacing: '0.28em',
            color: '#ff8a3d',
            marginBottom: 30,
            fontFamily: 'monospace',
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: '#ff5b29',
              display: 'flex',
            }}
          />
          LIT PROTOCOL · POSITION PAPER
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 116,
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          Provable Control
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 34,
            color: 'rgba(246,237,226,0.72)',
            marginTop: 28,
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Code-enforced authority for the privileged keys behind tokenized real-world assets.
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 60,
            color: 'rgba(255,255,255,0.5)',
            fontSize: 24,
            fontFamily: 'monospace',
            letterSpacing: '0.12em',
          }}
        >
          <span style={{ display: 'flex' }}>litprotocol.com/rwa</span>
          <span style={{ display: 'flex' }}>MINT · BURN · FREEZE · SEIZE</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
