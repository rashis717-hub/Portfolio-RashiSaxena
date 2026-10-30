import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 172, 180], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const headerOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const gridGray = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });
  const gridOpacity = interpolate(frame, [20, 50], [0.85, 0.18], { extrapolateRight: 'clamp' });

  const callouts = [
    'Meetings held and forgotten',
    'One report for everyone',
    'AI with no source',
    'Actions in separate places',
  ];

  const dummyMeetings = [
    { title: 'Regional Review Q3', time: '10:00 AM · 8 attendees', tag: 'Strategy' },
    { title: 'Zonal Territory Sync', time: '11:30 AM · 12 attendees', tag: 'Field' },
    { title: 'Distributor Dispute Align', time: '1:00 PM · 5 attendees', tag: 'Dispute' },
    { title: 'Weekly Pipeline Catchup', time: '2:15 PM · 14 attendees', tag: 'Pipeline' },
    { title: 'New Product Induction', time: '3:30 PM · 22 attendees', tag: 'Training' },
    { title: 'Branch Performance Deep Dive', time: '4:45 PM · 7 attendees', tag: 'Review' },
    { title: 'Key Accounts Escalation', time: '5:15 PM · 6 attendees', tag: 'Accounts' },
    { title: 'Area Target Setting', time: '6:00 PM · 9 attendees', tag: 'Targets' },
  ];

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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Header */}
      <div style={{ opacity: headerOpacity, zIndex: 2 }}>
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
        <div style={{ fontSize: 44, fontWeight: 500, letterSpacing: '-0.03em', marginTop: 8 }}>
          Thousands of meetings. Zero institutional memory.
        </div>
      </div>

      {/* Grid of meeting tiles in background */}
      <div
        style={{
          position: 'absolute',
          top: 190,
          left: THEME.safeMargin,
          right: THEME.safeMargin,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          filter: `grayscale(${gridGray * 100}%)`,
          opacity: gridOpacity,
          zIndex: 1,
        }}
      >
        {dummyMeetings.map((m, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              border: `1px solid ${THEME.hairline}`,
              borderRadius: 10,
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontFamily: THEME.monoFamily,
                color: THEME.muted,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {m.tag}
            </div>
            <div style={{ fontSize: 16, fontWeight: 500, color: THEME.fg }}>{m.title}</div>
            <div style={{ fontSize: 13, color: THEME.muted }}>{m.time}</div>
          </div>
        ))}
      </div>

      {/* Four Callouts with accent tick */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
          zIndex: 3,
          marginBottom: 30,
        }}
      >
        {callouts.map((text, i) => {
          const start = 40 + i * 20;
          const cardOpacity = interpolate(frame, [start, start + 14], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const cardY = interpolate(frame, [start, start + 14], [16, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
                background: '#FFFFFF',
                border: `1px solid ${THEME.hairline}`,
                borderRadius: 12,
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                boxShadow: '0 8px 24px rgba(12, 13, 18, 0.04)',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 46, 136, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: THEME.accent,
                  fontSize: 18,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ✕
              </div>
              <div style={{ fontSize: 26, fontWeight: 500, color: THEME.fg }}>{text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
