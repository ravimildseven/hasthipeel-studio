import React from 'react';
import {AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig, staticFile} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Nunito';
import {C, SAFE} from './theme';

const {fontFamily} = loadFont('normal', {weights: ['700', '800'], subsets: ['latin']});

export type EpisodeProps = {
  /** Stitched, muted picture track living in public/. */
  videoFile: string;
  /** Ambient bed living in public/, or null for picture-only. */
  audioFile: string | null;
  /** Frames of signature overlay held at the tail. */
  signatureFrames: number;
};

/**
 * The one piece of text in the episode. House rule: never let the image or
 * video model render lettering — it garbles. It gets composited here instead.
 *
 * `frozen` skips the entry spring so a Still (which always renders frame 0,
 * where the spring is still at opacity 0) shows the finished state.
 */
export const Signature: React.FC<{frozen?: boolean}> = ({frozen = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const rise = frozen ? 1 : spring({frame, fps, config: {damping: 200, mass: 0.6}});
  const y = interpolate(rise, [0, 1], [48, 0]);
  const opacity = interpolate(rise, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: SAFE.bottom}}>
      <div
        style={{
          transform: `translateY(${y}px)`,
          opacity,
          fontFamily,
          fontWeight: 800,
          fontSize: 68,
          letterSpacing: -1,
          color: C.ink,
          background: C.cream,
          padding: '26px 56px',
          borderRadius: 999,
          boxShadow: '0 10px 0 rgba(42,26,18,0.18)',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          whiteSpace: 'nowrap',
        }}
      >
        Follow for more
        <span style={{fontSize: 64, lineHeight: 1}}>🐘</span>
      </div>
    </AbsoluteFill>
  );
};

export const Episode: React.FC<EpisodeProps> = ({videoFile, audioFile, signatureFrames}) => {
  const {durationInFrames} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: C.ink}}>
      <OffthreadVideo src={staticFile(videoFile)} muted />
      {audioFile ? <Audio src={staticFile(audioFile)} /> : null}
      <Sequence from={Math.max(0, durationInFrames - signatureFrames)}>
        <Signature />
      </Sequence>
    </AbsoluteFill>
  );
};
