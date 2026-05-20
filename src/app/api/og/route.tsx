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
            'linear-gradient(135deg, #0a1226 0%, #1a2347 45%, #0e1a2e 100%)',
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
              'radial-gradient(circle, rgba(167,243,208,0.18) 0%, transparent 65%)',
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
              background: '#a7f3d0',
              display: 'flex',
            }}
          />
          LIT PROTOCOL · TEE-SECURED COMPUTE
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 80,
            lineHeight: 1.05,
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          <div style={{ display: 'flex' }}>Read anywhere.</div>
          <div style={{ display: 'flex' }}>
            <span style={{ color: '#a7f3d0' }}>Compute</span>
            <span style={{ marginLeft: '0.3em' }}>in a TEE.</span>
          </div>
          <div style={{ display: 'flex' }}>Write to any chain or API.</div>
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
            letterSpacing: '0.15em',
          }}
        >
          <span>litprotocol.com</span>
          <span>READ · COMPUTE · WRITE</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
