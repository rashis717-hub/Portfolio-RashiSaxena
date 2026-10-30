import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

export const Scene3Idea: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 172, 180], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Four blocks converging together from x: -300, -100, +100, +300 to 0
  const converge = interpolate(frame, [15, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const layerScale = interpolate(frame, [65, 85], [0.96, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const tools = ['Huddle.AI', 'Insights.AI', 'MAP.AI', 'Pitch.AI'];

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
          02 · THE UNIFIED COCKPIT
        </div>
        <div style={{ fontSize: 38, fontWeight: 500, letterSpacing: '-0.03em', marginTop: 6 }}>
          One persona layer replaces multiple disjointed portals.
        </div>
      </div>

      {/* Center Diagram: Converging into One Unified Layer */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
        }}
      >
        {/* Converging Tool Chips */}
        <div style={{ display: 'flex', gap: (1 - converge) * 40 + 16 }}>
          {tools.map((t, idx) => {
            return (
              <div
                key={idx}
                style={{
                  padding: '12px 24px',
                  background: '#FFFFFF',
                  border: `1px solid ${THEME.hairline}`,
                  borderRadius: 8,
                  fontSize: 16,
                  fontFamily: THEME.monoFamily,
                  color: THEME.muted,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                }}
              >
                {t}
              </div>
            );
          })}
        </div>

        {/* Downward Arrow */}
        <div
          style={{
            fontSize: 28,
            color: THEME.accent,
            opacity: converge,
            transform: `translateY(${(1 - converge) * 10}px)`,
          }}
        >
          ↓
        </div>

        {/* The Unified Layer Bar */}
        <div
          style={{
            width: 1000,
            height: 140,
            background: '#FFFFFF',
            borderRadius: 16,
            border: `2px solid ${THEME.accent}`,
            boxShadow: '0 16px 40px rgba(255, 46, 136, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 48px',
            opacity: converge,
            transform: `scale(${layerScale})`,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: THEME.monoFamily,
                fontSize: 13,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: THEME.accent,
              }}
            >
              Unified Architecture
            </div>
            <div style={{ fontSize: 32, fontWeight: 600, color: THEME.fg, marginTop: 4 }}>
              Persona-Based Cockpit Layer
            </div>
          </div>

          <div
            style={{
              padding: '10px 20px',
              background: '#0C0D12',
              color: '#FFFFFF',
              borderRadius: 24,
              fontSize: 14,
              fontFamily: THEME.monoFamily,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Role: Area Sales Manager
          </div>
        </div>
      </div>

      {/* Caption at bottom */}
      <div
        style={{
          fontSize: 28,
          fontWeight: 400,
          color: THEME.muted,
          textAlign: 'center',
          marginBottom: 10,
        }}
      >
        Start from the person, not the tool.
      </div>
    </div>
  );
};
