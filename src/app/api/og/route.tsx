import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background:
            'linear-gradient(135deg, #0b1018 0%, #15181c 45%, #0b1018 100%)',
          color: 'white',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            background:
              'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            left: -200,
            width: 600,
            height: 600,
            background:
              'radial-gradient(circle, rgba(255,66,5,0.16) 0%, transparent 65%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 24,
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: '0.2em',
            marginBottom: 36,
            fontFamily: 'monospace',
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: '#cb3f0a',
              display: 'flex',
            }}
          />
          LIT PROTOCOL
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 78,
            lineHeight: 1.05,
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          <div style={{ display: 'flex' }}>Confidential,</div>
          <div style={{ display: 'flex' }}>verifiable execution.</div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 56,
            color: 'rgba(255,255,255,0.55)',
            fontSize: 24,
            fontFamily: 'monospace',
            letterSpacing: '0',
          }}
        >
          <span>litprotocol.com</span>
          <span>Crypto · AI training · Inference</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
