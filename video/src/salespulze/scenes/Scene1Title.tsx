import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

export const Scene1Title: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 12, 112, 120], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const labelOpacity = interpolate(frame, [5, 18], [0, 1], { extrapolateRight: 'clamp' });
  const labelY = interpolate(frame, [5, 18], [12, 0], { extrapolateRight: 'clamp' });

  const line1Words = ['Meeting', 'intelligence'];
  const line2Words = ['every', 'level', 'can', 'trust.'];

  const line1StartFrame = 16;
  const line2StartFrame = line1StartFrame + line1Words.length * 4 + 6;

  const ruleStartFrame = line2StartFrame + line2Words.length * 4 + 4;
  const ruleWidth = interpolate(frame, [ruleStartFrame, ruleStartFrame + 24], [0, 520], {
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
        padding: THEME.safeMargin,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity,
        boxSizing: 'border-box',
      }}
    >
      {/* Mono Label */}
      <div
        style={{
          fontFamily: THEME.monoFamily,
          fontSize: 18,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: THEME.accent,
          marginBottom: 24,
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
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
        SALESPULZE · MEETING INTELLIGENCE
      </div>

      {/* Main Headline */}
      <div style={{ fontSize: 92, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.04em' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          {line1Words.map((word, i) => {
            const wordFrame = line1StartFrame + i * 4;
            const wordOp = interpolate(frame, [wordFrame, wordFrame + 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const wordY = interpolate(frame, [wordFrame, wordFrame + 10], [14, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <span
                key={i}
                style={{
                  opacity: wordOp,
                  transform: `translateY(${wordY}px)`,
                  display: 'inline-block',
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 12 }}>
          {line2Words.map((word, i) => {
            const wordFrame = line2StartFrame + i * 4;
            const wordOp = interpolate(frame, [wordFrame, wordFrame + 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const wordY = interpolate(frame, [wordFrame, wordFrame + 10], [14, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <span
                key={i}
                style={{
                  opacity: wordOp,
                  transform: `translateY(${wordY}px)`,
                  display: 'inline-block',
                  color: word === 'trust.' ? THEME.accent : THEME.fg,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>

      {/* Accent rule drawing left to right */}
      <div
        style={{
          width: ruleWidth,
          height: 3,
          backgroundColor: THEME.accent,
          marginTop: 48,
          borderRadius: 2,
        }}
      />
    </div>
  );
};
