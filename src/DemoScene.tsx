import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from './brand';
import {Mascot} from './Mascot';

/**
 * Stand-in monsoon backdrop so the overlay/rain/camera stack can be proved
 * without the generated frames (the asset host is blocked from this container).
 * Swap this for <KenBurns src={...} /> over a real frame in production.
 */
export const DemoScene: React.FC<{wave?: number}> = ({wave = 0}) => (
  <AbsoluteFill style={{background: `linear-gradient(180deg, #7E97A6 0%, #9DB3BE 42%, ${C.rain} 62%)`}}>
    {/* far hills */}
    <svg viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}>
      <path d="M0 1120 q180 -120 380 -40 q200 80 340 -20 q180 -130 360 10 V1920 H0 Z" fill="#6E8A74" opacity="0.55" />
      <path d="M0 1240 q240 -100 460 -10 q220 90 620 -40 V1920 H0 Z" fill={C.leaf} opacity="0.8" />
      {/* house */}
      <rect x="690" y="1050" width="330" height="240" fill="#C98B5E" />
      <path d="M660 1056 L855 950 L1050 1056 Z" fill="#9C4A2F" />
      <rect x="790" y="1140" width="92" height="150" rx="6" fill={C.amber} opacity="0.92" />
      {/* wet red earth */}
      <path d="M0 1430 h1080 V1920 H0 Z" fill={C.earth} />
      {/* the puddle */}
      <ellipse cx="540" cy="1660" rx="400" ry="108" fill="#6E8DA0" opacity="0.92" />
      <ellipse cx="540" cy="1646" rx="330" ry="80" fill="#88A6B6" opacity="0.6" />
    </svg>

    {/* the mascot, standing at the puddle edge */}
    <div style={{position: 'absolute', left: '50%', top: 1010, width: 620, height: 620, transform: 'translateX(-50%)'}}>
      <Mascot wave={wave} />
    </div>
  </AbsoluteFill>
);
