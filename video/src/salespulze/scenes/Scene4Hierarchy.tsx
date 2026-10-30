import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

export const Scene4Hierarchy: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 172, 180], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const levels = [
    { title: 'MD and President', sub: 'Macro health & aggregate pulse' },
    { title: 'Segment manager', sub: 'Category performance & margins' },
    { title: 'Regional and zonal', sub: 'Area comparison & team coaching' },
    { title: 'Branch', sub: 'Daily pipeline & meeting compliance' },
    { title: 'Field', sub: 'Account action items & escalations' },
  ];

  // Crossfade between 03-nsm-dashboard-a and 04-nsm-dashboard-b around frame 90
  const crossfadeOp = interpolate(frame, [85, 100], [0, 1], {
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
      {/* Top Header */}
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
          03 · ROLE-BASED ARCHITECTURE
        </div>
        <div style={{ fontSize: 38, fontWeight: 500, letterSpacing: '-0.03em', marginTop: 6 }}>
          The hierarchy decides the view.
        </div>
      </div>

      {/* Main Split Layout */}
      <div style={{ display: 'flex', gap: 48, alignItems: 'center', flex: 1, marginTop: 24 }}>
        {/* Left Vertical Ladder */}
        <div
          style={{
            width: 440,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            position: 'relative',
          }}
        >
          {levels.map((lvl, idx) => {
            const stepStart = 10 + idx * 24;
            const isLit = frame >= stepStart;
            const stepOp = interpolate(frame, [stepStart, stepStart + 10], [0.35, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const lineX = interpolate(frame, [stepStart, stepStart + 10], [-8, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={idx}
                style={{
                  opacity: stepOp,
                  transform: `translateX(${lineX}px)`,
                  padding: '14px 20px',
                  borderRadius: 10,
                  background: isLit ? '#FFFFFF' : 'transparent',
                  border: `1px solid ${isLit ? THEME.accent : THEME.hairline}`,
                  boxShadow: isLit ? '0 4px 16px rgba(255, 46, 136, 0.08)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  transition: 'background 0.2s',
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: isLit ? THEME.accent : '#E8E8E4',
                    color: isLit ? '#FFFFFF' : THEME.muted,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: THEME.monoFamily,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  0{idx + 1}
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: isLit ? THEME.fg : THEME.muted }}>
                    {lvl.title}
                  </div>
                  <div style={{ fontSize: 13, color: THEME.muted, marginTop: 2 }}>{lvl.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Dashboard Screen Views */}
        <div
          style={{
            flex: 1,
            height: 570,
            background: '#FFFFFF',
            borderRadius: 12,
            border: `1px solid ${THEME.hairline}`,
            boxShadow: '0 16px 40px rgba(12, 13, 18, 0.08)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Base Image 03-nsm-dashboard-a */}
          <img
            src={staticFile('salespulze/screens/figma/03-nsm-dashboard-a.webp')}
            alt="National Sales Manager A"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              display: 'block',
            }}
          />

          {/* Crossfade Image 04-nsm-dashboard-b */}
          <img
            src={staticFile('salespulze/screens/figma/04-nsm-dashboard-b.webp')}
            alt="National Sales Manager B"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              opacity: crossfadeOp,
              display: 'block',
            }}
          />

          {/* Role badge */}
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              background: '#0C0D12',
              color: '#FFFFFF',
              fontFamily: THEME.monoFamily,
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '6px 14px',
              borderRadius: 16,
              zIndex: 10,
            }}
          >
            {frame < 90 ? 'View: National Sales Manager · Overview' : 'View: National Sales Manager · Execution'}
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
        Every leader sees only what they have authority to act upon.
      </div>
    </div>
  );
};
