import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';
import { THEME } from '../theme';

export const Scene6Schema: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 142, 150], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const enterOp = interpolate(frame, [6, 20], [0, 1], { extrapolateRight: 'clamp' });
  const enterY = interpolate(frame, [6, 20], [16, 0], { extrapolateRight: 'clamp' });

  const jsonSnippet = `{
  "component": "Permission",
  "adapt": {
    "cams-chat": "Card with an outcomes table and confirm button",
    "external": "Text summary with two basic buttons"
  }
}`;

  return (
    <div
      style={{
        width: 1600,
        height: 900,
        background: THEME.bg,
        color: THEME.fg,
        fontFamily: THEME.fontFamily,
        padding: '60px 96px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity,
        boxSizing: 'border-box',
      }}
    >
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: THEME.monoFamily, fontSize: 18, color: THEME.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>
            05 / Behaviour Schema · Adaptation
          </div>
          <div style={{ fontSize: 36, fontWeight: 500 }}>
            Same message. Different surface.
          </div>
        </div>
      </div>

      {/* Split Comparison */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          opacity: enterOp,
          transform: `translateY(${enterY}px)`,
        }}
      >
        {/* Left: Inside CAMS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: THEME.accent }} />
            <span style={{ fontFamily: THEME.monoFamily, fontSize: 16, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: THEME.fg }}>
              Inside CAMS (Custom Catalogue)
            </span>
          </div>

          <div
            style={{
              height: 380,
              borderRadius: 16,
              border: `1.5px solid ${THEME.hairline}`,
              background: '#FFFFFF',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
            }}
          >
            {/* Crop of permission-destructive */}
            <div
              style={{
                width: 1440,
                position: 'absolute',
                top: -550,
                left: -420,
                transform: 'scale(0.88)',
                transformOrigin: 'top left',
              }}
            >
              <img
                src={staticFile('figma/permission-destructive.png')}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </div>

        {/* Right: From Outside */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: THEME.muted }} />
            <span style={{ fontFamily: THEME.monoFamily, fontSize: 16, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: THEME.muted }}>
              From Outside (Basic Primitives)
            </span>
          </div>

          <div
            style={{
              height: 380,
              borderRadius: 16,
              border: `1.5px dashed ${THEME.hairline}`,
              background: '#F8F8F6',
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 20,
              boxShadow: '0 8px 24px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 500, color: THEME.fg }}>
              Withdraw approved request LR-19877?
            </div>
            <div style={{ fontSize: 18, color: THEME.muted, lineHeight: 1.5 }}>
              This cancels your approved sick leave (12–13 Oct 2026, 2 days). Priya Raman will be notified. This cannot be undone.
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              <div
                style={{
                  padding: '12px 24px',
                  borderRadius: 8,
                  border: `1.5px solid ${THEME.hairline}`,
                  background: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: 500,
                  color: THEME.fg,
                }}
              >
                Cancel
              </div>
              <div
                style={{
                  padding: '12px 24px',
                  borderRadius: 8,
                  background: '#EF4444',
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Confirm Withdrawal
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JSON schema fragment at bottom */}
      <div
        style={{
          background: THEME.codeBg,
          border: `1.5px solid ${THEME.codeBorder}`,
          borderRadius: 14,
          padding: '18px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <pre
          style={{
            fontFamily: THEME.monoFamily,
            fontSize: 17,
            color: THEME.codeText,
            margin: 0,
            whiteSpace: 'pre-wrap',
          }}
        >
          {jsonSnippet}
        </pre>
        <div style={{ fontFamily: THEME.monoFamily, fontSize: 16, color: THEME.accent, fontWeight: 500, paddingRight: 12 }}>
          Schema-driven client rendering
        </div>
      </div>
    </div>
  );
};
