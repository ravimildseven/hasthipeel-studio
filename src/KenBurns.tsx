import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export type Move = {scale: number; x: number; y: number};

export type KenBurnsProps = {
  src: string;
  from?: Move;
  to?: Move;
  children?: React.ReactNode;
};

const DEFAULT_FROM: Move = {scale: 1.0, x: 0, y: 0};
const DEFAULT_TO: Move = {scale: 1.08, x: 0, y: 0};

/**
 * Slow camera move over a still frame.
 *
 * This replaces the single most expensive thing we were buying from the video
 * model: three of the five monsoon beats were just "hold the framing and push
 * in slowly", which is a transform, not a generation. Always start at scale >= 1
 * so the edges never pull away and expose the canvas — the same "never reveal
 * beyond the frame" rule the house style enforces on the video model.
 */
export const KenBurns: React.FC<KenBurnsProps> = ({src, from = DEFAULT_FROM, to = DEFAULT_TO, children}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const p = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });

  const scale = interpolate(p, [0, 1], [Math.max(1, from.scale), Math.max(1, to.scale)]);
  const x = interpolate(p, [0, 1], [from.x, to.x]);
  const y = interpolate(p, [0, 1], [from.y, to.y]);

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${scale}) translate(${x}%, ${y}%)`}}>
        <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      {children}
    </AbsoluteFill>
  );
};
