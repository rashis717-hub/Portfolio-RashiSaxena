import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';
import { THEME } from '../theme';

export const Scene4Catalogue: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 172, 180], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Counter counts up to 60+
  const count = Math.min(60, Math.floor(interpolate(frame, [20, 110], [0, 60], { extrapolateRight: 'clamp' })));

  const columns = [
    {
      title: 'Ask',
      items: [
        { name: 'Question', img: 'question-multiselect.png', cropY: 420 },
        { name: 'Form', img: 'form.png', cropY: 340 },
      ],
    },
    {
      title: 'Decide',
      items: [
        { name: 'Decisions', img: 'decisions-review.png', cropY: 340 },
        { name: 'Permission', img: 'permission-destructive.png', cropY: 560 },
      ],
    },
    {
      title: 'Plan & run',
      items: [
        { name: 'Plan', img: 'plan-modify.png', cropY: 360 },
        { name: 'Loading', img: 'loading-l1.png', cropY: 260 },
      ],
    },
    {
      title: 'Show',
      items: [
        { name: 'KPI Cards', img: 'kpi.png', cropY: 400 },
        { name: 'Table', img: 'table-view.png', cropY: 420 },
        { name: 'Bar Chart', img: 'bar-chart.png', cropY: 420 },
      ],
    },
    {
      title: 'Status',
      items: [
        { name: 'Error', img: 'error.png', cropY: 360 },
        { name: 'Success', img: 'success.png', cropY: 360 },
        { name: 'Empty', img: 'empty-state.png', cropY: 360 },
      ],
    },
    {
      title: 'Navigate',
      items: [
        { name: 'Menu', img: 'menu.png', cropY: 140 },
      ],
    },
  ];

  return (
    <div
      style={{
        width: 1600,
        height: 900,
        background: THEME.bg,
        color: THEME.fg,
        fontFamily: THEME.fontFamily,
        padding: '70px 96px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity,
        boxSizing: 'border-box',
      }}
    >
      {/* Header bar with counter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: THEME.monoFamily, fontSize: 18, color: THEME.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>
            03 / Component Catalogue · Six Families
          </div>
          <div style={{ fontSize: 38, fontWeight: 500, letterSpacing: '-0.02em' }}>
            Pre-approved components for conversation
          </div>
        </div>

        {/* Counter Badge */}
        <div
          style={{
            background: THEME.cardBg,
            border: `1.5px solid ${THEME.accent}`,
            borderRadius: 9999,
            padding: '12px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: '0 4px 16px rgba(255, 46, 136, 0.1)',
          }}
        >
          <span style={{ fontSize: 32, fontWeight: 600, color: THEME.accent, fontFamily: THEME.monoFamily }}>
            {count}+
          </span>
          <span style={{ fontSize: 18, fontWeight: 500, color: THEME.fg, fontFamily: THEME.monoFamily, textTransform: 'uppercase' }}>
            Frames Designed
          </span>
        </div>
      </div>

      {/* Six Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 18, height: 620, alignItems: 'stretch' }}>
        {columns.map((col, colIdx) => {
          const colHeaderOp = interpolate(frame, [10 + colIdx * 5, 20 + colIdx * 5], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={colIdx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                opacity: colHeaderOp,
              }}
            >
              <div
                style={{
                  fontFamily: THEME.monoFamily,
                  fontSize: 16,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: THEME.fg,
                  borderBottom: `1.5px solid ${THEME.hairline}`,
                  paddingBottom: 8,
                }}
              >
                {col.title}
              </div>

              {/* Items in column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                {col.items.map((item, itemIdx) => {
                  const itemDelay = 25 + colIdx * 6 + itemIdx * 8;
                  const itemOp = interpolate(frame, [itemDelay, itemDelay + 10], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  });
                  const itemY = interpolate(frame, [itemDelay, itemDelay + 10], [12, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  });

                  return (
                    <div
                      key={itemIdx}
                      style={{
                        background: '#FFFFFF',
                        border: `1px solid ${THEME.hairline}`,
                        borderRadius: 12,
                        padding: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        opacity: itemOp,
                        transform: `translateY(${itemY}px)`,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                        flex: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 500, color: THEME.muted, fontFamily: THEME.monoFamily }}>
                        {item.name}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          borderRadius: 8,
                          overflow: 'hidden',
                          border: `1px solid rgba(0,0,0,0.06)`,
                          position: 'relative',
                          background: '#F9F9F8',
                        }}
                      >
                        <div
                          style={{
                            width: 1440,
                            position: 'absolute',
                            top: -item.cropY * 0.45,
                            left: -190,
                            transformOrigin: 'top left',
                            transform: 'scale(0.42)',
                          }}
                        >
                          <img
                            src={staticFile(`figma/${item.img}`)}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
