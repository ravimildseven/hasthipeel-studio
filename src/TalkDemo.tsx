import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C} from './brand';
import {Mascot} from './Mascot';
import {useMouthFromAudio} from './LipSync';

const VO = staticFile('vo-placeholder.wav');
const VO_START = 54; // frames: speaking starts once the walk-in lands

/**
 * Proves the narrated-episode loop locally: walk in, talk to an audio track
 * (mouth driven by its loudness), blink, then wave goodbye. Swap VO for a real
 * narrator or character voice and the mouth follows it with no other change.
 */
export const TalkDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, width} = useVideoConfig();
  const mouth = useMouthFromAudio(VO, {startFrom: VO_START});

  const walking = frame < VO_START;
  const x = interpolate(frame, [0, VO_START], [-width * 0.75, 0], {extrapolateRight: 'clamp'});
  const wave = interpolate(frame, [durationInFrames - 36, durationInFrames - 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #FCE9C8 0%, #F6D7A7 62%, #D9A877 62%, #C89564 100%)'}}>
      {/* simple warm room so the character is the subject */}
      <div style={{position: 'absolute', left: 120, top: 360, width: 300, height: 380, borderRadius: 24, background: '#9FC3D6', border: `10px solid #8C5A3C`}} />
      <div style={{position: 'absolute', right: 140, top: 640, width: 70, height: 110, borderRadius: '50% 50% 40% 40%', background: C.amber, boxShadow: `0 0 120px 40px ${C.amber}88`}} />

      <div style={{position: 'absolute', left: '50%', top: 640, width: 820, height: 820, transform: `translateX(calc(-50% + ${x}px))`}}>
        <Mascot walk={walking} expression={frame > durationInFrames - 36 ? 'joy' : 'happy'} mouthOpen={mouth} wave={wave} />
      </div>

      <Sequence from={VO_START}>
        <Audio src={VO} volume={0.35} />
      </Sequence>
    </AbsoluteFill>
  );
};
