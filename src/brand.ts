import {loadFont} from '@remotion/google-fonts/Nunito';

const {fontFamily} = loadFont('normal', {weights: ['700', '800'], subsets: ['latin']});
export const F = fontFamily;

export const W = 1080;
export const H = 1920;
export const FPS = 30;

/** Shorts-safe frame: right rail (buttons) and bottom (title/description) stay clear. */
export const SAFE = {left: 64, right: 150, top: 150, bottom: 430} as const;

/**
 * HasthiPeel palette, sampled from the monsoon episode so overlays sit inside
 * the house look instead of fighting it.
 */
export const C = {
  cream: '#FFF6E6',   // overlay pills, sticker faces
  ink: '#2A1A12',     // all text, outlines, hard shadows
  amber: '#FFB562',   // lamplight / warm accent
  rain: '#8FB8CC',    // cool monsoon blue-grey
  leaf: '#4E7A52',    // wet foliage
  earth: '#A8563C',   // red laterite
  mascot: '#9FB3C0',  // the little elephant's grey-blue
} as const;
