import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

export const Scene5Trust: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 172, 180], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Slow zoom & pan into the detail cards of 02-meeting-series
  const scale = interpolate(frame, [0, 180], [1.12, 1.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const panY = interpolate(frame, [0, 180], [-80, -180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4 accent rings with labels
  const rings = [
    { start: 15, end: 70, label: 'AI inferred', top: 120, left: 340 },
    { start: 55, end: 110, label: 'High confidence', top: 120, left: 520 },
    { start: 95, end: 150, label: 'Flag this series', top: 120, left: 740 },
    { start: 125, end: 175, label: 'Drivers behind the score', top: 380, left: 420 },
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
          04 · AI TRUST & REASONING
        </div>
        <div style={{ fontSize: 38, fontWeight: 500, letterSpacing: '-0.03em', marginTop: 6 }}>
          No black boxes. Every metric exposes its evidence.
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
            src={staticFile('salespulze/screens/figma/02-meeting-series.webp')}
            alt="Meeting Series Trust"
            style={{
              width: '100%',
              display: 'block',
            }}
          />
        </div>

        {/* Accent Rings and Callout Pills */}
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
        Every number shows its drivers and its confidence.
      </div>
    </div>
  );
};
