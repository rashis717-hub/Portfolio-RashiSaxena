import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

export const Scene8Close: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 54, 60], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textY = interpolate(frame, [0, 12], [14, 0], { extrapolateRight: 'clamp' });
  const textOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  const subOp = interpolate(frame, [14, 26], [0, 1], { extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [14, 26], [10, 0], { extrapolateRight: 'clamp' });

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
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: 68,
          fontWeight: 500,
          letterSpacing: '-0.04em',
          opacity: textOp,
          transform: `translateY(${textY}px)`,
        }}
      >
        100+ sales teams at MYK.
      </div>

      <div
        style={{
          fontFamily: THEME.monoFamily,
          fontSize: 18,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: THEME.muted,
          marginTop: 28,
          opacity: subOp,
          transform: `translateY(${subY}px)`,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
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
        Rashi Saxena · UX Lead
      </div>
    </div>
  );
};
