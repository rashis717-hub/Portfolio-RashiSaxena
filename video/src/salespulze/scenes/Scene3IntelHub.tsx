import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

export const Scene3IntelHub: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 202, 210], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Slow smooth scroll of 01-intel-hub
  const scrollY = interpolate(frame, [15, 195], [0, -780], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Highlight pill rings
  const highlights = [
    { start: 20, end: 65, text: 'Key numbers', top: 180, left: 240 },
    { start: 65, end: 115, text: 'AI insights, with confidence', top: 350, left: 320 },
    { start: 115, end: 165, text: 'Field health map', top: 480, left: 360 },
    { start: 165, end: 205, text: 'Performance over time', top: 620, left: 400 },
  ];

  return (
    <div
      style={{
        width: 1600,
        height: 900,
        background: THEME.bg,
        color: THEME.fg,
        fontFamily: THEME.fontFamily,
        padding: '48px 96px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity,
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 10 }}>
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
            02 · THE INTEL HUB
          </div>
          <div style={{ fontSize: 38, fontWeight: 500, letterSpacing: '-0.03em', marginTop: 6 }}>
            Every meeting synthesised into real-time health signals.
          </div>
        </div>
      </div>

      {/* Frame Container for Scrolling Screen */}
      <div
        style={{
          width: 1408,
          height: 680,
          background: '#FFFFFF',
          borderRadius: 12,
          border: `1px solid ${THEME.hairline}`,
          boxShadow: '0 20px 48px rgba(12, 13, 18, 0.08)',
          overflow: 'hidden',
          position: 'relative',
          marginTop: 18,
        }}
      >
        {/* Browser Top Bar */}
        <div
          style={{
            height: 38,
            background: '#F4F4F2',
            borderBottom: `1px solid ${THEME.hairline}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: 8,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 5,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#E0E0DC' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#E0E0DC' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#E0E0DC' }} />
          <div
            style={{
              marginLeft: 20,
              height: 22,
              background: '#FFFFFF',
              borderRadius: 6,
              border: `1px solid ${THEME.hairline}`,
              width: 320,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 10,
              fontSize: 11,
              fontFamily: THEME.monoFamily,
              color: THEME.muted,
            }}
          >
            app.salespulze.com/intel-hub
          </div>
        </div>

        {/* Scrolling Image */}
        <div
          style={{
            transform: `translateY(${scrollY}px)`,
            width: '100%',
            paddingTop: 38,
          }}
        >
          <img
            src={staticFile('salespulze/screens/figma/01-intel-hub.webp')}
            alt="Intel Hub"
            style={{
              width: '100%',
              display: 'block',
            }}
          />
        </div>

        {/* Overlay Accent Rings / Badges */}
        {highlights.map((h, i) => {
          const pillOp = interpolate(frame, [h.start, h.start + 10, h.end - 10, h.end], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const scale = interpolate(frame, [h.start, h.start + 10], [0.92, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: h.top,
                left: h.left,
                opacity: pillOp,
                transform: `scale(${scale})`,
                zIndex: 8,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  border: `3px solid ${THEME.accent}`,
                  backgroundColor: 'rgba(255, 46, 136, 0.15)',
                  boxShadow: '0 0 16px rgba(255, 46, 136, 0.4)',
                }}
              />
              <div
                style={{
                  background: '#0C0D12',
                  color: '#FFFFFF',
                  fontFamily: THEME.monoFamily,
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '8px 16px',
                  borderRadius: 20,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                }}
              >
                {h.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
