import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';
import { THEME } from '../theme';

export const Scene7Control: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 112, 120], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const zoomScale = interpolate(frame, [0, 120], [1.1, 1.22], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Four rows highlight in turn
  const rows = [
    { label: 'What', start: 12, y: 70 },
    { label: 'System', start: 34, y: 115 },
    { label: "Who's affected", start: 56, y: 160 },
    { label: 'Reversible: No', start: 78, y: 205, isCritical: true },
  ];

  const captionOp = interpolate(frame, [20, 36], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: 1600,
        height: 900,
        background: THEME.bg,
        color: THEME.fg,
        fontFamily: THEME.fontFamily,
        padding: '70px 96px',
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
            06 / Human in the Loop · Consequence First
          </div>
          <div style={{ fontSize: 36, fontWeight: 500, color: THEME.fg, opacity: captionOp }}>
            A person decides before anything irreversible.
          </div>
        </div>
      </div>

      {/* Zoomed Card View */}
      <div
        style={{
          width: '100%',
          height: 620,
          borderRadius: 20,
          border: `1.5px solid ${THEME.hairline}`,
          background: '#FFFFFF',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 12px 36px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 1440,
            position: 'absolute',
            top: -640,
            left: -320,
            transform: `scale(${zoomScale})`,
            transformOrigin: '55% 58%',
          }}
        >
          <img
            src={staticFile('figma/permission-destructive.png')}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

          {/* Highlights for the 4 consequence rows */}
          {rows.map((r, i) => {
            const isHighlight = frame >= r.start;
            const hlOp = interpolate(frame, [r.start, r.start + 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            if (!isHighlight) return null;

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: 670 + (i * 38),
                  left: 450,
                  width: 750,
                  height: 36,
                  border: r.isCritical ? `2px solid ${THEME.accent}` : `1.5px solid rgba(12, 13, 18, 0.4)`,
                  background: r.isCritical ? 'rgba(255, 46, 136, 0.08)' : 'rgba(12, 13, 18, 0.04)',
                  borderRadius: 8,
                  opacity: hlOp,
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: 12,
                }}
              >
                {r.isCritical && (
                  <span
                    style={{
                      fontFamily: THEME.monoFamily,
                      fontSize: 12,
                      fontWeight: 600,
                      background: THEME.accent,
                      color: '#FFFFFF',
                      padding: '2px 8px',
                      borderRadius: 4,
                      textTransform: 'uppercase',
                    }}
                  >
                    Irreversible
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
