import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, F} from './brand';
import {DemoScene} from './DemoScene';
import {MonsoonRain} from './Rain';

/**
 * Branded thumbnail. Deterministic, so the series look never drifts, and free —
 * a vidIQ generated thumbnail costs 22 credits per attempt.
 * In production, swap <DemoScene/> for an <Img/> of the chosen episode frame.
 */
export const Thumbnail: React.FC<{title?: string}> = ({title = 'First Rain'}) => (
  <AbsoluteFill>
    <DemoScene wave={0.35} />
    <MonsoonRain intensity={0.8} />
    {/* bottom scrim so the wordmark always reads */}
    <AbsoluteFill
      style={{background: 'linear-gradient(180deg, rgba(42,26,18,0) 55%, rgba(42,26,18,0.72) 100%)'}}
    />
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 150}}>
      <div
        style={{
          fontFamily: F,
          fontWeight: 800,
          fontSize: 104,
          lineHeight: 1.05,
          letterSpacing: -2,
          textAlign: 'center',
          color: C.cream,
          textShadow: '0 6px 26px rgba(0,0,0,0.6)',
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 26,
          fontFamily: F,
          fontWeight: 800,
          fontSize: 40,
          color: C.ink,
          background: C.cream,
          padding: '14px 34px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span style={{fontSize: 38, lineHeight: 1}}>🐘</span> HasthiPeel
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
