import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

export const Scene5ToolsInside: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 202, 210], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const toolStages = [
    { name: 'Huddle.AI', file: 'sales-ai/screens/07-huddle.webp', sub: 'Pre-meeting preparation & talking points' },
    { name: 'Thermometer', file: 'sales-ai/screens/08-thermometer.webp', sub: 'Outlet performance & opportunity score' },
    { name: 'Market Action Plan (MAP.AI)', file: 'sales-ai/screens/09-market-action-plan.webp', sub: 'Dynamic territory execution plan' },
    { name: 'Pitch.AI', file: 'sales-ai/screens/10-pitch.webp', sub: 'AI-customised sales presentations' },
  ];

  // 4 stages, ~50 frames each
  // Stage 0: 0 - 52
  // Stage 1: 52 - 104
  // Stage 2: 104 - 156
  // Stage 3: 156 - 210
  const stageIndex = Math.min(3, Math.floor(frame / 52));
  const currentTool = toolStages[stageIndex];

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
          04 · INTEGRATED CAPABILITIES
        </div>
        <div style={{ fontSize: 38, fontWeight: 500, letterSpacing: '-0.03em', marginTop: 6 }}>
          Four AI modules, seamless navigation.
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
        <img
          key={currentTool.file}
          src={staticFile(currentTool.file)}
          alt={currentTool.name}
          style={{ width: '100%', display: 'block' }}
        />

        {/* Floating Tool Badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 24,
            background: 'rgba(12, 13, 18, 0.92)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: THEME.accent,
            }}
          />
          <div>
            <div
              style={{
                fontFamily: THEME.monoFamily,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {currentTool.name}
            </div>
            <div style={{ fontSize: 13, color: '#A0A2A8', marginTop: 2 }}>{currentTool.sub}</div>
          </div>
        </div>
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
        Context travels with the user across every tool.
      </div>
    </div>
  );
};
