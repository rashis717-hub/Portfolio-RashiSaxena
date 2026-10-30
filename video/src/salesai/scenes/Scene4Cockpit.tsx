import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

export const Scene4Cockpit: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 232, 240], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Slow push-in scale & pan
  const scale = interpolate(frame, [0, 240], [1.02, 1.14], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const panY = interpolate(frame, [0, 240], [0, -40], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rings = [
    { start: 20, end: 80, label: 'Route & visits', top: 140, left: 280 },
    { start: 70, end: 130, label: 'AI action priorities', top: 280, left: 450 },
    { start: 120, end: 180, label: 'Performance pulse', top: 320, left: 820 },
    { start: 170, end: 230, label: 'Direct tool launches', top: 140, left: 960 },
  ];

  return (
    <div
      style={{
        width: 1600,
        height: 900,
        background: THEME.bg,
        color: THEME.fg,
        fontFamily: THEME.fontFamily,
        padding: '54px 96px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div>
        <div
          style={{
            fontFamily: THEME.monoFamily,
            fontSize: 16,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: THEME.accent,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: THEME.accent,
              display: 'inline-block',
            }}
          />
          03 · THE PERSONA COCKPIT
        </div>
        <div style={{ fontSize: 38, fontWeight: 500, letterSpacing: '-0.03em', marginTop: 6 }}>
          Built around the Area Sales Manager.
        </div>
      </div>

      {/* Main Viewport Container */}
      <div
        style={{
          width: 1408,
          height: 560,
          background: '#FFFFFF',
          borderRadius: 12,
          border: `1px solid ${THEME.hairline}`,
          boxShadow: '0 16px 40px rgba(12, 13, 18, 0.08)',
          overflow: 'hidden',
          position: 'relative',
          marginTop: 18,
        }}
      >
        <div
          style={{
            transform: `scale(${scale}) translateY(${panY}px)`,
            transformOrigin: 'top center',
            width: '100%',
          }}
        >
          <img
            src={staticFile('sales-ai/screens/01-asm-home.webp')}
            alt="ASM Home"
            style={{ width: '100%', display: 'block' }}
          />
        </div>

        {/* Accent rings */}
        {rings.map((r, idx) => {
          const ringOp = interpolate(frame, [r.start, r.start + 10, r.end - 10, r.end], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const ringScale = interpolate(frame, [r.start, r.start + 10], [0.85, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                top: r.top,
                left: r.left,
                opacity: ringOp,
                transform: `scale(${ringScale})`,
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: `3px solid ${THEME.accent}`,
                  backgroundColor: 'rgba(255, 46, 136, 0.2)',
                  boxShadow: '0 0 16px rgba(255, 46, 136, 0.5)',
                }}
              />
              <div
                style={{
                  background: '#0C0D12',
                  color: '#FFFFFF',
                  fontFamily: THEME.monoFamily,
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '6px 16px',
                  borderRadius: 20,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                }}
              >
                {r.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Caption at bottom */}
      <div
        style={{
          fontSize: 28,
          fontWeight: 400,
          color: THEME.muted,
          marginTop: 18,
          textAlign: 'center',
        }}
      >
        Everything needed for today&apos;s market visits in a single scan.
      </div>
    </div>
  );
};
