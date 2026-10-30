import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

export const Scene6Partnership: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 142, 150], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const line1Op = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });
  const line1Y = interpolate(frame, [10, 24], [16, 0], { extrapolateRight: 'clamp' });

  const line2Op = interpolate(frame, [40, 54], [0, 1], { extrapolateRight: 'clamp' });
  const line2Y = interpolate(frame, [40, 54], [16, 0], { extrapolateRight: 'clamp' });

  const line3Op = interpolate(frame, [70, 84], [0, 1], { extrapolateRight: 'clamp' });
  const line3Y = interpolate(frame, [70, 84], [16, 0], { extrapolateRight: 'clamp' });

  const subOp = interpolate(frame, [95, 110], [0, 1], { extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [95, 110], [12, 0], { extrapolateRight: 'clamp' });

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
        opacity,
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      {/* Label */}
      <div
        style={{
          fontFamily: THEME.monoFamily,
          fontSize: 16,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: THEME.accent,
          marginBottom: 36,
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
        PARTNERSHIP & DESIGN SYSTEM
      </div>

      {/* Three Statements */}
      <div style={{ fontSize: 64, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1.25 }}>
        <div style={{ opacity: line1Op, transform: `translateY(${line1Y}px)` }}>
          Two tools by BCG.
        </div>
        <div style={{ opacity: line2Op, transform: `translateY(${line2Y}px)`, marginTop: 8 }}>
          Two by Covasant.
        </div>
        <div
          style={{
            opacity: line3Op,
            transform: `translateY(${line3Y}px)`,
            color: THEME.accent,
            marginTop: 8,
          }}
        >
          One experience.
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: THEME.monoFamily,
          fontSize: 18,
          color: THEME.muted,
          marginTop: 48,
          opacity: subOp,
          transform: `translateY(${subY}px)`,
          letterSpacing: '0.04em',
        }}
      >
        Built on Untitled UI and the Covasant Design System.
      </div>
    </div>
  );
};
