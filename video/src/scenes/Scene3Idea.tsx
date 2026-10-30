import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';
import { THEME } from '../theme';

export const Scene3Idea: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 172, 180], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Code typing
  const codeSnippet = `{
  "action": "createSurface",
  "catalogId": "cams-standard-v1",
  "component": {
    "type": "Question",
    "props": {
      "title": "What should the plan include?",
      "mode": "multi-select",
      "options": [
        "Eligibility & balance check",
        "Week-by-week timeline",
        "Handover checklist",
        "Other"
      ]
    }
  }
}`;

  const typedLength = Math.floor(interpolate(frame, [10, 65], [0, codeSnippet.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));
  const currentCode = codeSnippet.slice(0, typedLength);

  // Panel slides left
  const slideProgress = interpolate(frame, [65, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const codePanelWidth = interpolate(slideProgress, [0, 1], [900, 640]);

  // UI Crop fades in on the right
  const uiOp = interpolate(frame, [80, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const uiY = interpolate(frame, [80, 95], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Captions
  const cap1Op = interpolate(frame, [25, 40], [0, 1], { extrapolateRight: 'clamp' });
  const cap2Op = interpolate(frame, [95, 110], [0, 1], { extrapolateRight: 'clamp' });

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div style={{ fontFamily: THEME.monoFamily, fontSize: 18, color: THEME.muted, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          02 / The Idea · Declarative Interface Description
        </div>
        <div style={{ fontSize: 26, fontWeight: 500, color: THEME.accent, opacity: cap1Op }}>
          Describe, don’t execute.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 48, alignItems: 'center', height: 580 }}>
        {/* Code Panel */}
        <div
          style={{
            width: codePanelWidth,
            height: '100%',
            background: THEME.codeBg,
            border: `1.5px solid ${THEME.codeBorder}`,
            borderRadius: 18,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 12px 36px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontFamily: THEME.monoFamily, fontSize: 15, color: '#9CA3AF', marginLeft: 12 }}>
              agent_payload.json
            </span>
          </div>

          <pre
            style={{
              fontFamily: THEME.monoFamily,
              fontSize: 18,
              lineHeight: 1.6,
              color: THEME.codeText,
              whiteSpace: 'pre-wrap',
              margin: 0,
            }}
          >
            {currentCode}
            {typedLength < codeSnippet.length && (
              <span style={{ display: 'inline-block', width: 2, height: 18, background: THEME.accent, marginLeft: 4 }} />
            )}
          </pre>
        </div>

        {/* UI Result Crop */}
        <div
          style={{
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            opacity: uiOp,
            transform: `translateY(${uiY}px)`,
          }}
        >
          <div
            style={{
              width: '100%',
              height: 480,
              borderRadius: 18,
              border: `1.5px solid ${THEME.hairline}`,
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(0,0,0,0.06)',
              background: '#FFFFFF',
              position: 'relative',
            }}
          >
            {/* Cropped question-multiselect image */}
            <div
              style={{
                width: 1440,
                height: 1028,
                position: 'absolute',
                top: -330,
                left: -430,
                transformOrigin: 'top left',
                transform: 'scale(0.92)',
              }}
            >
              <img
                src={staticFile('figma/question-multiselect.png')}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>

          <div
            style={{
              fontSize: 22,
              color: THEME.muted,
              opacity: cap2Op,
              fontFamily: THEME.fontFamily,
              fontWeight: 450,
            }}
          >
            Rendered from a catalogue of pre-approved components.
          </div>
        </div>
      </div>
    </div>
  );
};
