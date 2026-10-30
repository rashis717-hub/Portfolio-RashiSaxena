import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../theme';

export const Scene8Close: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 54, 60], [0, 1, 1, 0.95], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const line1Op = interpolate(frame, [4, 16], [0, 1], { extrapolateRight: 'clamp' });
  const line1Y = interpolate(frame, [4, 16], [12, 0], { extrapolateRight: 'clamp' });

  const line2Op = interpolate(frame, [14, 26], [0, 1], { extrapolateRight: 'clamp' });
  const line2Y = interpolate(frame, [14, 26], [12, 0], { extrapolateRight: 'clamp' });

  const creditOp = interpolate(frame, [24, 36], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: 1600,
        height: 900,
        background: THEME.bg,
        color: THEME.fg,
        fontFamily: THEME.fontFamily,
        padding: THEME.safeMargin,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        opacity,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: 1100 }}>
        <div
          style={{
            fontSize: 58,
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            marginBottom: 16,
            opacity: line1Op,
            transform: `translateY(${line1Y}px)`,
          }}
        >
          The agent describes the interface.
        </div>

        <div
          style={{
            fontSize: 44,
            fontWeight: 450,
            lineHeight: 1.25,
            color: THEME.muted,
            letterSpacing: '-0.02em',
            opacity: line2Op,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          The platform decides how it looks and behaves.
        </div>
      </div>

      {/* Credit */}
      <div
        style={{
          marginTop: 64,
          fontFamily: THEME.monoFamily,
          fontSize: 18,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: THEME.fg,
          opacity: creditOp,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: THEME.accent }} />
        Rashi Saxena
      </div>
    </div>
  );
};
