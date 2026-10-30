import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';
import { THEME } from '../theme';

export const Scene5E2EFlow: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 202, 210], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Slow smooth scroll from top to bottom
  // Frame height is 1613px in 1x (3226 in 2x).
  // At scale ~0.85, total height is 1370px inside a 620px viewport.
  // Scroll travel: 0 to -780px.
  const scrollY = interpolate(frame, [15, 195], [0, -780], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Callout overlays appearing for ~40 frames as components pass
  const callouts = [
    { label: 'Question', start: 10, end: 50, y: 340, w: 800, h: 44 },
    { label: 'Decisions', start: 45, end: 85, y: 450, w: 800, h: 44 },
    { label: 'Plan', start: 80, end: 120, y: 560, w: 800, h: 44 },
    { label: 'Execution summary', start: 110, end: 150, y: 780, w: 800, h: 48 },
    { label: 'Permission', start: 140, end: 180, y: 960, w: 800, h: 44 },
    { label: 'KPI & Table', start: 165, end: 205, y: 1140, w: 800, h: 420 },
  ];

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: THEME.monoFamily, fontSize: 18, color: THEME.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>
            04 / One Conversation · End to End
          </div>
          <div style={{ fontSize: 36, fontWeight: 500 }}>
            Structured interaction replaces disjointed chat
          </div>
        </div>
      </div>

      {/* Centred scrolling container */}
      <div
        style={{
          width: '100%',
          height: 680,
          borderRadius: 20,
          border: `1.5px solid ${THEME.hairline}`,
          overflow: 'hidden',
          background: '#FFFFFF',
          position: 'relative',
          boxShadow: '0 12px 36px rgba(0,0,0,0.06)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 1440,
            position: 'absolute',
            top: scrollY,
            left: '50%',
            transform: 'translateX(-50%) scale(0.92)',
            transformOrigin: 'top center',
          }}
        >
          <img
            src={staticFile('figma/e2e-flow.png')}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

          {/* Accent rings and badges */}
          {callouts.map((c, i) => {
            const isVisible = frame >= c.start && frame <= c.end;
            const ringOp = interpolate(frame, [c.start, c.start + 6, c.end - 6, c.end], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            if (!isVisible) return null;

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: c.y,
                  left: 429,
                  width: c.w,
                  height: c.h,
                  border: `2px solid ${THEME.accent}`,
                  borderRadius: 12,
                  boxShadow: `0 0 20px rgba(255, 46, 136, 0.25)`,
                  opacity: ringOp,
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -16,
                    right: 16,
                    background: THEME.accent,
                    color: '#FFFFFF',
                    fontFamily: THEME.monoFamily,
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '4px 14px',
                    borderRadius: 9999,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  {c.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
