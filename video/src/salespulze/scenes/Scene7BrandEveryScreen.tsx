import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

export const Scene7BrandEveryScreen: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 112, 120], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Crossfade between login (12) and branded dashboard (13)
  const crossfadeOp = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Desktop shifts left when tablet & mobile arrive
  const desktopWidth = interpolate(frame, [45, 65], [1408, 860], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tablet slides in from right
  const tabletX = interpolate(frame, [48, 68], [300, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tabletOp = interpolate(frame, [48, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Mobile slides in from right
  const mobileX = interpolate(frame, [54, 74], [250, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const mobileOp = interpolate(frame, [54, 70], [0, 1], {
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
          06 · WHITE-LABEL & MULTI-DEVICE
        </div>
        <div style={{ fontSize: 38, fontWeight: 500, letterSpacing: '-0.03em', marginTop: 6 }}>
          Their brand. Every screen size.
        </div>
      </div>

      {/* Device Stage */}
      <div
        style={{
          display: 'flex',
          gap: 28,
          alignItems: 'flex-start',
          flex: 1,
          marginTop: 18,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Desktop Container */}
        <div
          style={{
            width: desktopWidth,
            height: 560,
            background: '#FFFFFF',
            borderRadius: 12,
            border: `1px solid ${THEME.hairline}`,
            boxShadow: '0 16px 40px rgba(12, 13, 18, 0.08)',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
            transition: 'width 0.2s',
          }}
        >
          {/* 12-login */}
          <img
            src={staticFile('salespulze/screens/figma/12-login.webp')}
            alt="Login"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', display: 'block' }}
          />

          {/* 13-branded-dashboard */}
          <img
            src={staticFile('salespulze/screens/figma/13-branded-dashboard.webp')}
            alt="Branded Dashboard"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              opacity: crossfadeOp,
              display: 'block',
            }}
          />
        </div>

        {/* Tablet Container */}
        <div
          style={{
            width: 310,
            height: 560,
            background: '#FFFFFF',
            borderRadius: 14,
            border: `1px solid ${THEME.hairline}`,
            boxShadow: '0 16px 36px rgba(12, 13, 18, 0.08)',
            overflow: 'hidden',
            position: 'relative',
            opacity: tabletOp,
            transform: `translateX(${tabletX}px)`,
            flexShrink: 0,
          }}
        >
          <img
            src={staticFile('salespulze/screens/figma/16-tablet-intel-hub.webp')}
            alt="Tablet View"
            style={{ width: '100%', display: 'block' }}
          />
        </div>

        {/* Mobile Container */}
        <div
          style={{
            width: 180,
            height: 560,
            background: '#FFFFFF',
            borderRadius: 18,
            border: `1px solid ${THEME.hairline}`,
            boxShadow: '0 16px 36px rgba(12, 13, 18, 0.08)',
            overflow: 'hidden',
            position: 'relative',
            opacity: mobileOp,
            transform: `translateX(${mobileX}px)`,
            flexShrink: 0,
          }}
        >
          <img
            src={staticFile('salespulze/screens/figma/14-mobile-intel-hub.webp')}
            alt="Mobile View"
            style={{ width: '100%', display: 'block' }}
          />
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
        A white-label system built to match each enterprise&apos;s identity.
      </div>
    </div>
  );
};
