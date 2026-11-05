import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {DemoScene} from './DemoScene';
import {MonsoonRain} from './Rain';
import {CornerBug, HookCaption, Signature} from './Overlays';

/**
 * Proof of the zero-credit graphics stack: procedural rain, a scripted camera
 * push-in, the animated vector mascot, and the full overlay set — all rendered
 * locally with no generation spend.
 */
export const GfxDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  // Scripted push-in, the move we were paying the video model to do.
  const scale = interpolate(frame, [0, durationInFrames - 1], [1.0, 1.1], {extrapolateRight: 'clamp'});
  // Trunk comes up for the closing wave over the last third.
  const wave = interpolate(frame, [durationInFrames * 0.6, durationInFrames * 0.85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: '#2A1A12'}}>
      <AbsoluteFill style={{transform: `scale(${scale})`}}>
        <DemoScene wave={wave} />
      </AbsoluteFill>
      <MonsoonRain />
      <CornerBug />
      <Sequence durationInFrames={75}>
        <HookCaption text="The first rain of the season" />
      </Sequence>
      <Sequence from={durationInFrames - 75}>
        <Signature />
      </Sequence>
    </AbsoluteFill>
  );
};
