import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../theme';

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 172, 180], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // User chat bubble
  const userBubbleOp = interpolate(frame, [6, 18], [0, 1], { extrapolateRight: 'clamp' });
  const userBubbleY = interpolate(frame, [6, 18], [16, 0], { extrapolateRight: 'clamp' });

  // Agent response typing in
  const agentBubbleOp = interpolate(frame, [24, 36], [0, 1], { extrapolateRight: 'clamp' });
  const agentBubbleY = interpolate(frame, [24, 36], [16, 0], { extrapolateRight: 'clamp' });

  const rawParagraph =
    "To prepare the Q4 PTO liability report across India and US, I will first need to know which employee classes to include. Do you want full-time only, or contractors as well? Also, should we convert the India liability at the fixed treasury rate of 84.00 INR/USD or current spot rate? I've assumed fixed rate for now. Once that's confirmed, I'll email the draft report to Finance. Please confirm if you allow me to send this email. Results: India liability is ₹48,632,150 ($578,954) and US is $1,284,560 across 1,240 employees total.";

  // Type in character by character
  const charCount = Math.floor(interpolate(frame, [30, 95], [0, rawParagraph.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));
  const typedParagraph = rawParagraph.slice(0, charCount);

  // Callouts staggered
  const callouts = [
    { text: 'Questions buried in paragraphs', frameStart: 90 },
    { text: 'Judgement calls made silently', frameStart: 106 },
    { text: 'Permission asked in one sentence', frameStart: 122 },
    { text: 'Results as pasted text', frameStart: 138 },
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
        justifyContent: 'center',
        opacity,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div style={{ fontFamily: THEME.monoFamily, fontSize: 18, color: THEME.muted, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          01 / The Problem · Text-Only Conversation
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '840px 1fr', gap: 64, alignItems: 'center' }}>
        {/* Chat Conversation Mockup */}
        <div
          style={{
            background: THEME.cardBg,
            border: `1.5px solid ${THEME.hairline}`,
            borderRadius: 20,
            padding: 36,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            minHeight: 460,
          }}
        >
          {/* User Bubble (Right Aligned) */}
          <div
            style={{
              alignSelf: 'flex-end',
              background: '#EAEAE7',
              borderRadius: '18px 18px 4px 18px',
              padding: '16px 24px',
              maxWidth: 580,
              fontSize: 20,
              lineHeight: 1.4,
              opacity: userBubbleOp,
              transform: `translateY(${userBubbleY}px)`,
            }}
          >
            Prepare a Q4 PTO liability report for Finance across India and US.
          </div>

          {/* Agent Reply (Dense Grey Paragraph) */}
          <div
            style={{
              alignSelf: 'flex-start',
              background: '#F5F5F2',
              border: `1px solid ${THEME.hairline}`,
              borderRadius: '18px 18px 18px 4px',
              padding: '20px 26px',
              maxWidth: 720,
              fontSize: 18,
              lineHeight: 1.55,
              color: THEME.muted,
              opacity: agentBubbleOp,
              transform: `translateY(${agentBubbleY}px)`,
            }}
          >
            {typedParagraph}
            {charCount < rawParagraph.length && (
              <span style={{ display: 'inline-block', width: 2, height: 16, background: THEME.accent, marginLeft: 4 }} />
            )}
          </div>
        </div>

        {/* Four Callouts with Accent Ticks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {callouts.map((c, i) => {
            const cOp = interpolate(frame, [c.frameStart, c.frameStart + 12], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const cX = interpolate(frame, [c.frameStart, c.frameStart + 12], [16, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  background: THEME.cardBg,
                  border: `1.5px solid ${THEME.hairline}`,
                  borderRadius: 14,
                  padding: '18px 24px',
                  opacity: cOp,
                  transform: `translateX(${cX}px)`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#FFF0F5',
                    border: `1.5px solid ${THEME.accent}`,
                    color: THEME.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  ✕
                </div>
                <div style={{ fontSize: 22, fontWeight: 500, color: THEME.fg }}>
                  {c.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
