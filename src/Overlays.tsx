import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, F, SAFE} from './brand';

/**
 * The episode's one line of text. House rule: never let the image or video
 * model render lettering — it garbles. It is composited here instead.
 *
 * `frozen` skips the entry spring so a Still (which renders frame 0, where the
 * spring is still at opacity 0) shows the finished state.
 */
export const Signature: React.FC<{frozen?: boolean; label?: string}> = ({
  frozen = false,
  label = 'Follow for more',
}) => {
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
          fontFamily: F,
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
        {label}
        <span style={{fontSize: 64, lineHeight: 1}}>🐘</span>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Small persistent channel mark. Sits top-left, inside the safe frame, low
 * opacity so it never competes with the scene.
 */
export const CornerBug: React.FC<{frozen?: boolean}> = ({frozen = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const inOp = frozen ? 1 : spring({frame, fps, config: {damping: 200}});

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          top: SAFE.top,
          opacity: inOp * 0.92,
          fontFamily: F,
          fontWeight: 800,
          fontSize: 34,
          letterSpacing: 0.5,
          color: C.cream,
          background: 'rgba(42,26,18,0.42)',
          padding: '12px 24px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          backdropFilter: 'blur(6px)',
        }}
      >
        <span style={{fontSize: 32, lineHeight: 1}}>🐘</span>
        HasthiPeel
      </div>
    </AbsoluteFill>
  );
};

/**
 * Optional one-line hook caption for the opening seconds. Use sparingly — the
 * series is wordless by design — but a single line in the first beat is the
 * cheapest retention lever available when the feed is cold.
 */
export const HookCaption: React.FC<{text: string; frozen?: boolean}> = ({text, frozen = false}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const enter = frozen ? 1 : spring({frame, fps, config: {damping: 200, mass: 0.5}});
  const exit = frozen
    ? 0
    : interpolate(frame, [durationInFrames - 12, durationInFrames], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
  const opacity = enter * (1 - exit);

  return (
    <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: SAFE.top + 140}}>
      <div
        style={{
          opacity,
          transform: `translateY(${interpolate(enter, [0, 1], [-28, 0])}px)`,
          fontFamily: F,
          fontWeight: 800,
          fontSize: 60,
          lineHeight: 1.18,
          textAlign: 'center',
          color: C.cream,
          textShadow: '0 4px 18px rgba(0,0,0,0.55)',
          maxWidth: 1080 - SAFE.left - SAFE.right,
          padding: '0 12px',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
