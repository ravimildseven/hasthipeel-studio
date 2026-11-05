import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {C} from './brand';
import {Mascot, Expression} from './Mascot';
import {MonsoonRain} from './Rain';

/**
 * One scene, laid out for whatever canvas it is rendered on.
 *
 * Nothing here is a fixed pixel position. The layer rules are written once
 * ("ground at ~72% of height", "subject on the left third in landscape, centred
 * in portrait") and the same frame number produces a composed 16:9 master and a
 * composed 9:16 Short. Nothing gets cropped away, because the layout is redone
 * for each canvas.
 */
export const Stage: React.FC<{expression?: Expression; wave?: number}> = ({expression = 'happy', wave = 0}) => {
  const {width, height} = useVideoConfig();
  const landscape = width > height;

  const groundY = height * (landscape ? 0.7 : 0.58);
  const floorDepth = height - groundY;
  const charSize = Math.min(width, height) * (landscape ? 0.6 : 0.76);
  // Rule of thirds in landscape (room for the house), centred in portrait.
  const focusX = width * (landscape ? 0.34 : 0.5);
  // Portrait: keep feet above the Shorts bottom UI band (title/caption cover ~the last 430px).
  const feetY = groundY + floorDepth * (landscape ? 0.5 : 0.32);

  const houseH = height * (landscape ? 0.34 : 0.17);
  const houseW = houseH * 1.35;
  const houseX = landscape ? width * 0.64 : width * 0.64;

  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #7E97A6 0%, #9DB3BE ${landscape ? 55 : 40}%, ${C.rain} 100%)`, overflow: 'hidden'}}>
      {/* hills stretch to any width, anchored to the horizon */}
      <svg viewBox="0 0 1000 200" preserveAspectRatio="none"
        style={{position: 'absolute', left: 0, top: groundY - height * 0.2, width, height: height * 0.22}}>
        <path d="M0 120 Q160 40 360 100 T720 80 T1000 90 V200 H0 Z" fill="#6E8A74" opacity="0.55" />
        <path d="M0 160 Q220 100 460 150 T1000 130 V200 H0 Z" fill={C.leaf} opacity="0.85" />
      </svg>

      {/* house, anchored to the ground line */}
      <div style={{position: 'absolute', left: houseX, top: groundY - houseH, width: houseW, height: houseH}}>
        <svg viewBox="0 0 135 100" style={{width: '100%', height: '100%', overflow: 'visible'}}>
          <path d="M-8 34 L67.5 -6 L143 34 Z" fill="#9C4A2F" />
          <rect x="4" y="32" width="127" height="68" fill="#C98B5E" />
          <rect x="54" y="52" width="28" height="48" rx="3" fill={C.amber} />
        </svg>
      </div>

      {/* wet red earth */}
      <div style={{position: 'absolute', left: 0, top: groundY, width, height: floorDepth, background: C.earth}} />

      {/* puddle under the subject */}
      <div style={{
        position: 'absolute', left: focusX - charSize * 0.62, top: feetY - charSize * 0.06,
        width: charSize * 1.24, height: charSize * 0.2, borderRadius: '50%', background: '#7895A6', opacity: 0.9,
      }} />

      {/* subject: feet planted on the puddle line */}
      <div style={{position: 'absolute', left: focusX - charSize / 2, top: feetY - charSize * 0.88, width: charSize, height: charSize}}>
        <Mascot expression={expression} wave={wave} />
      </div>

      <MonsoonRain />
    </AbsoluteFill>
  );
};
