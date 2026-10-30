import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 202, 210], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const tools = [
    { name: 'Huddle.AI', color: '#3B82F6', tag: 'Meeting Sync', bg: '#EFF6FF' },
    { name: 'Insights.AI', color: '#10B981', tag: 'Analytics', bg: '#ECFDF5' },
    { name: 'MAP.AI', color: '#8B5CF6', tag: 'Territory Plan', bg: '#F5F3FF' },
    { name: 'Pitch.AI', color: '#F59E0B', tag: 'Client Decks', bg: '#FFFBEB' },
  ];

  const callouts = ['Four tools', 'Four logins', 'Four ways of working'];

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
          01 · THE PROBLEM
        </div>
        <div style={{ fontSize: 38, fontWeight: 500, letterSpacing: '-0.03em', marginTop: 6 }}>
          Fragmented tools force reps to do the integration work.
        </div>
      </div>

      {/* Four Window Mockups side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 24 }}>
        {tools.map((t, idx) => {
          const start = 15 + idx * 16;
          const winOp = interpolate(frame, [start, start + 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const winY = interpolate(frame, [start, start + 12], [24, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={idx}
              style={{
                opacity: winOp,
                transform: `translateY(${winY}px)`,
                height: 380,
                background: '#FFFFFF',
                borderRadius: 12,
                border: `1px solid ${THEME.hairline}`,
                boxShadow: '0 12px 32px rgba(12, 13, 18, 0.06)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Window Header */}
              <div
                style={{
                  height: 36,
                  background: '#F4F4F2',
                  borderBottom: `1px solid ${THEME.hairline}`,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px',
                  gap: 6,
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E0E0DC' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E0E0DC' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E0E0DC' }} />
                <span
                  style={{
                    marginLeft: 10,
                    fontSize: 11,
                    fontFamily: THEME.monoFamily,
                    color: THEME.muted,
                  }}
                >
                  {t.name.toLowerCase()}
                </span>
              </div>

              {/* Window Content */}
              <div
                style={{
                  flex: 1,
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: t.bg,
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-block',
                      background: t.color,
                      color: '#FFFFFF',
                      fontSize: 11,
                      fontFamily: THEME.monoFamily,
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: 6,
                      textTransform: 'uppercase',
                    }}
                  >
                    {t.tag}
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 600, marginTop: 16, color: '#0C0D12' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: 13, color: '#53555B', marginTop: 8 }}>
                    Separate authentication, data schemas & navigation rules.
                  </div>
                </div>

                <div
                  style={{
                    borderTop: '1px dashed rgba(0,0,0,0.12)',
                    paddingTop: 12,
                    fontSize: 12,
                    fontFamily: THEME.monoFamily,
                    color: '#8B8D94',
                  }}
                >
                  STATUS: DISCONNECTED
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Three Callouts at bottom */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 24 }}>
        {callouts.map((text, i) => {
          const callStart = 90 + i * 20;
          const callOp = interpolate(frame, [callStart, callStart + 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const callY = interpolate(frame, [callStart, callStart + 12], [14, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                opacity: callOp,
                transform: `translateY(${callY}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: '#FFFFFF',
                border: `1px solid ${THEME.hairline}`,
                borderRadius: 24,
                padding: '12px 24px',
                boxShadow: '0 4px 16px rgba(12, 13, 18, 0.04)',
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 46, 136, 0.1)',
                  color: THEME.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                ✕
              </div>
              <div style={{ fontSize: 20, fontWeight: 500, color: THEME.fg }}>{text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
