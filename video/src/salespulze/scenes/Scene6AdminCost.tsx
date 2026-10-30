import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

export const Scene6AdminCost: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 142, 150], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Screen flip stages:
  // Stage 1 (0 to 25): 05-admin-dashboard
  // Stage 2 (25 to 50): 06-cost-insights
  // Stage 3 (50 to 150): 07-budget-alert (hold)

  const activeStage = frame < 25 ? 1 : frame < 50 ? 2 : 3;

  const holdScale = interpolate(frame, [50, 150], [1, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
          05 · ADMIN CONSOLE & GOVERNANCE
        </div>
        <div style={{ fontSize: 38, fontWeight: 500, letterSpacing: '-0.03em', marginTop: 6 }}>
          Complete operational autonomy.
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
        {activeStage === 1 && (
          <img
            src={staticFile('salespulze/screens/figma/05-admin-dashboard.webp')}
            alt="Admin Dashboard"
            style={{ width: '100%', display: 'block' }}
          />
        )}

        {activeStage === 2 && (
          <img
            src={staticFile('salespulze/screens/figma/06-cost-insights.webp')}
            alt="Cost Insights"
            style={{ width: '100%', display: 'block' }}
          />
        )}

        {activeStage === 3 && (
          <div
            style={{
              transform: `scale(${holdScale})`,
              transformOrigin: 'top center',
              width: '100%',
            }}
          >
            <img
              src={staticFile('salespulze/screens/figma/07-budget-alert.webp')}
              alt="Budget Alert"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        )}

        {/* Dynamic Badge indicating current view */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            right: 24,
            background: '#0C0D12',
            color: '#FFFFFF',
            fontFamily: THEME.monoFamily,
            fontSize: 13,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            padding: '8px 18px',
            borderRadius: 20,
            zIndex: 10,
          }}
        >
          {activeStage === 1
            ? '01 · System Overview'
            : activeStage === 2
            ? '02 · LLM Cost Analytics'
            : '03 · Real-Time Budget Guardrails'}
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
        Structure, people and cost, configured without developers.
      </div>
    </div>
  );
};
