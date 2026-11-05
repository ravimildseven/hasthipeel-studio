import {useMemo} from 'react';
import {useAudioData} from '@remotion/media-utils';
import {useCurrentFrame, useVideoConfig} from 'remotion';

/**
 * Mouth openness 0..1 for the current frame, read from a voice track.
 *
 * Uses windowed RMS loudness normalised against the loudest window in the file,
 * so the same settings work for a quiet narrator and a shouty one. Feed the
 * result straight into <Mascot mouthOpen={...} />.
 *
 * @param src      staticFile() / URL of the voice track
 * @param startFrom frame at which the track starts playing (match the <Sequence from>)
 */
export const useMouthFromAudio = (src: string, {startFrom = 0, floor = 0.12, range = 0.6} = {}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const audio = useAudioData(src);

  const samples = audio?.channelWaveforms[0];
  const rate = audio?.sampleRate ?? 44100;
  const win = Math.round(rate * 0.035); // ~one syllable attack

  // Loudest window in the whole track, computed once.
  const peak = useMemo(() => {
    if (!samples) return 1;
    let max = 1e-6;
    for (let i = 0; i + win < samples.length; i += win) {
      let s = 0;
      for (let j = i; j < i + win; j++) s += samples[j] * samples[j];
      max = Math.max(max, Math.sqrt(s / win));
    }
    return max;
  }, [samples, win]);

  if (!samples) return 0;
  const t = (frame - startFrom) / fps;
  if (t < 0) return 0;

  const centre = Math.round(t * rate);
  const a = Math.max(0, centre - win);
  const b = Math.min(samples.length, centre + win);
  if (b <= a) return 0;
  let s = 0;
  for (let i = a; i < b; i++) s += samples[i] * samples[i];
  const rms = Math.sqrt(s / (b - a)) / peak;

  return Math.min(1, Math.max(0, (rms - floor) / range));
};
