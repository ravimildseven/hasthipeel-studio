import React, {useMemo} from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';

export type RainProps = {
  /** Drops in this layer. */
  count?: number;
  /** Changes the pattern without changing the look. */
  seed?: string;
  /** Degrees off vertical; positive leans right. */
  slant?: number;
  /** Screen-heights fallen per second. */
  speed?: number;
  opacity?: number;
  /** Streak length in vh. */
  length?: number;
  width?: number;
  color?: string;
};

/**
 * Procedural rain. Deterministic for a given seed, so every render is identical
 * and it costs nothing — the thing a video model charges 1,750 credits to fake.
 * Stack two or three at different speeds/opacities for parallax depth.
 */
export const Rain: React.FC<RainProps> = ({
  count = 120,
  seed = 'rain',
  slant = 12,
  speed = 1.1,
  opacity = 0.5,
  length = 9,
  width = 2,
  color = '#FFFFFF',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const drops = useMemo(
    () =>
      new Array(count).fill(0).map((_, i) => ({
        x: random(`${seed}-x-${i}`) * 118 - 9,
        phase: random(`${seed}-p-${i}`),
        // Vary per-drop speed and length so the field doesn't read as a grid.
        rate: speed * (0.75 + random(`${seed}-r-${i}`) * 0.5),
        len: length * (0.7 + random(`${seed}-l-${i}`) * 0.6),
      })),
    [count, seed, speed, length],
  );

  return (
    <AbsoluteFill style={{overflow: 'hidden', pointerEvents: 'none'}}>
      {drops.map((d, i) => {
        // Wrap into [0,1) then map across the frame plus a streak of headroom.
        const travel = (d.phase + t * d.rate) % 1;
        const y = travel * (100 + d.len) - d.len;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${d.x}%`,
              top: `${y}%`,
              width,
              height: `${d.len}%`,
              background: `linear-gradient(to bottom, transparent, ${color})`,
              opacity,
              transform: `rotate(${slant}deg)`,
              transformOrigin: 'top center',
              borderRadius: width,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Full monsoon downpour: three parallax layers plus a cool haze. */
export const MonsoonRain: React.FC<{intensity?: number}> = ({intensity = 1}) => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(143,184,204,0.22), rgba(143,184,204,0.05))'}} />
    <Rain seed="far" count={Math.round(90 * intensity)} speed={0.7} opacity={0.22} length={6} width={1.5} slant={10} />
    <Rain seed="mid" count={Math.round(70 * intensity)} speed={1.1} opacity={0.38} length={9} width={2} slant={12} />
    <Rain seed="near" count={Math.round(28 * intensity)} speed={1.7} opacity={0.5} length={14} width={3} slant={14} />
  </AbsoluteFill>
);
