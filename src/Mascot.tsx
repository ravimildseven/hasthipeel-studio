import React, {useId} from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {C} from './brand';

export type Expression = 'neutral' | 'happy' | 'joy' | 'surprised' | 'sad' | 'sleepy';

export type MascotProps = {
  /** Idle breathe, ear flap and auto-blink. */
  animate?: boolean;
  /** Trunk raise for a wave, 0 = hanging, 1 = fully raised. */
  wave?: number;
  expression?: Expression;
  /** 0..1. When above ~0.04 the mouth opens to this amount and overrides the expression's mouth (talking). */
  mouthOpen?: number;
  /** Leg cycle, body bob and sway. */
  walk?: boolean;
  /** Offsets the blink schedule so two characters never blink in unison. */
  blinkSeed?: number;
};

/**
 * Rigged vector HasthiPeel mascot, drawn to the locked description: small round
 * baby elephant, soft grey-blue skin with warm undertones, large expressive round
 * eyes, tiny tusks just starting to show, small floppy ears, chubby proportions.
 *
 * It is a puppet rather than an illustration. Every feature is a parameter, so a
 * whole narrated episode can be animated from a script plus a voice track, with
 * the character pixel-identical in every shot. That is the cut-out-rig approach
 * flat preschool animation uses, and it needs no GPU and no generation credits.
 *
 * Draw order matters: ears behind the head, mouth under the trunk so only its
 * corners show (the classic cartoon-elephant read), trunk in front of the body.
 * Every shape carries a soft tonal outline; without it the silhouette collapses
 * into one grey blob.
 */
export const Mascot: React.FC<MascotProps> = ({
  animate = true,
  wave = 0,
  expression = 'happy',
  mouthOpen = 0,
  walk = false,
  blinkSeed = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const uid = useId().replace(/:/g, '');

  const skin = C.mascot;
  const shade = '#8AA0AE';
  const line = '#6E8494';
  const ink = C.ink;
  const mouthDark = '#5B2B2E';
  const tongue = '#E58A8A';

  // ---- idle + walk ---------------------------------------------------------
  const breathe = animate ? 1 + Math.sin(t * 2.1) * 0.014 : 1;
  const stride = walk ? t * 7.5 : 0;
  const bob = walk ? -Math.abs(Math.sin(stride)) * 9 : 0;
  const sway = walk ? Math.sin(stride) * 2.2 : 0;
  const earFlap = animate ? Math.sin(t * (walk ? 7.5 : 2.6)) * (walk ? 9 : 6) : 0;
  // Diagonal pairs lift together, like a real quadruped trot.
  const liftA = walk ? Math.max(0, Math.sin(stride)) * 14 : 0;
  const liftB = walk ? Math.max(0, Math.sin(stride + Math.PI)) * 14 : 0;

  // ---- blink ---------------------------------------------------------------
  const period = 3.4;
  const phase = (t + blinkSeed * 1.37) % period;
  const blinking = animate && phase > period - 0.14;

  // ---- trunk ---------------------------------------------------------------
  const wiggle = animate ? Math.sin(t * 5.2) * 5 * wave : 0;
  const lerp = (a: number, b: number) => interpolate(wave, [0, 1], [a, b]);
  const c1x = lerp(203, 245);
  const c1y = lerp(296, 285);
  const c2x = lerp(195, 318);
  const c2y = lerp(326, 200) + wiggle;
  const ex = lerp(210, 302) + wiggle;
  const ey = lerp(348, 82) + wiggle;
  const trunkPath = `M200 240 C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`;

  // ---- face ----------------------------------------------------------------
  const closedEyes = expression === 'joy' || expression === 'sleepy';
  const eyeR = expression === 'surprised' ? 20 : expression === 'sad' ? 15 : 17;

  const exprOpen: Record<Expression, number> = {
    neutral: 0,
    happy: 0,
    joy: 0.75,
    surprised: 0.5,
    sad: 0,
    sleepy: 0,
  };
  const open = mouthOpen > 0.04 ? Math.min(1, mouthOpen) : exprOpen[expression];

  const Eye: React.FC<{cx: number}> = ({cx}) => {
    if (closedEyes && expression === 'joy') {
      // happy "^" arcs
      return <path d={`M${cx - 15} 162 Q${cx} 140 ${cx + 15} 162`} stroke={ink} strokeWidth="6" strokeLinecap="round" fill="none" />;
    }
    if (closedEyes || blinking) {
      // gentle closed lid, curving down
      return <path d={`M${cx - 15} 156 Q${cx} 165 ${cx + 15} 156`} stroke={ink} strokeWidth="6" strokeLinecap="round" fill="none" />;
    }
    return (
      <>
        <circle cx={cx} cy={156} r={eyeR} fill={ink} />
        <circle cx={cx + 6} cy={149} r={expression === 'surprised' ? 7 : 6} fill="#FFFFFF" />
        <circle cx={cx - 5} cy={162} r={2.5} fill="#FFFFFF" opacity="0.8" />
      </>
    );
  };

  const Brows: React.FC = () => {
    if (expression === 'surprised') {
      return (
        <>
          <path d="M150 124 Q166 112 182 122" stroke={line} strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M218 122 Q234 112 250 124" stroke={line} strokeWidth="5" strokeLinecap="round" fill="none" />
        </>
      );
    }
    if (expression === 'sad') {
      // inner ends raised = worried
      return (
        <>
          <path d="M150 134 Q166 130 182 122" stroke={line} strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M218 122 Q234 130 250 134" stroke={line} strokeWidth="5" strokeLinecap="round" fill="none" />
        </>
      );
    }
    return null;
  };

  const Mouth: React.FC = () => {
    if (open > 0.04) {
      // Wide and high on the face, so a clear lobe shows either side of the trunk.
      const bottom = 256 + 50 * open;
      const d = `M146 220 Q200 236 254 220 Q200 ${bottom} 146 220 Z`;
      return (
        <>
          <defs>
            <clipPath id={`m-${uid}`}>
              <path d={d} />
            </clipPath>
          </defs>
          <path d={d} fill={mouthDark} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
          <g clipPath={`url(#m-${uid})`}>
            <ellipse cx="200" cy={bottom - 14} rx="58" ry={10 + 12 * open} fill={tongue} />
          </g>
        </>
      );
    }
    const shapes: Record<Expression, string> = {
      happy: 'M146 220 Q200 266 254 220',
      joy: 'M146 220 Q200 266 254 220',
      neutral: 'M152 232 Q200 250 248 232',
      surprised: 'M152 232 Q200 250 248 232',
      sad: 'M152 244 Q200 218 248 244',
      sleepy: 'M154 234 Q200 248 246 234',
    };
    return <path d={shapes[expression]} stroke={ink} strokeWidth="5" strokeLinecap="round" fill="none" />;
  };

  return (
    <svg viewBox="0 0 400 400" style={{width: '100%', height: '100%', overflow: 'visible'}}>
      {/* ground shadow stays planted while the body bobs */}
      <ellipse cx="200" cy="352" rx={104 + bob * 0.6} ry="18" fill="#000000" opacity="0.13" />

      <g transform={`translate(0 ${bob}) rotate(${sway} 200 330) translate(200 240) scale(${breathe}) translate(-200 -240)`}>
        {/* ears behind the head, wide enough to break its silhouette */}
        <g transform={`rotate(${-earFlap} 132 168)`}>
          <ellipse cx="104" cy="176" rx="52" ry="58" fill={shade} stroke={line} strokeWidth="3" />
          <ellipse cx="108" cy="180" rx="30" ry="36" fill="#E9B8AE" opacity="0.35" />
        </g>
        <g transform={`rotate(${earFlap} 268 168)`}>
          <ellipse cx="296" cy="176" rx="52" ry="58" fill={shade} stroke={line} strokeWidth="3" />
          <ellipse cx="292" cy="180" rx="30" ry="36" fill="#E9B8AE" opacity="0.35" />
        </g>

        {/* back legs */}
        <rect x="138" y={286 - liftB} width="48" height="66" rx="24" fill={shade} stroke={line} strokeWidth="3" />
        <rect x="214" y={286 - liftA} width="48" height="66" rx="24" fill={shade} stroke={line} strokeWidth="3" />

        {/* body */}
        <ellipse cx="200" cy="264" rx="94" ry="74" fill={skin} stroke={line} strokeWidth="3" />
        <ellipse cx="200" cy="284" rx="56" ry="38" fill="#B4C4CE" opacity="0.5" />

        {/* front legs */}
        <rect x="150" y={300 - liftA} width="50" height="56" rx="25" fill={skin} stroke={line} strokeWidth="3" />
        <rect x="200" y={300 - liftB} width="50" height="56" rx="25" fill={skin} stroke={line} strokeWidth="3" />

        {/* tail */}
        <path d={`M292 254 q26 ${16 + sway * 2} 20 44`} stroke={line} strokeWidth="8" strokeLinecap="round" fill="none" />

        {/* head */}
        <circle cx="200" cy="170" r="86" fill={skin} stroke={line} strokeWidth="3" />

        {/* mouth sits under the trunk, so only its corners read */}
        <Mouth />

        {/* trunk, in front of everything on the body */}
        <path d={trunkPath} stroke={line} strokeWidth="40" strokeLinecap="round" fill="none" />
        <path d={trunkPath} stroke={skin} strokeWidth="34" strokeLinecap="round" fill="none" />

        {/* tiny tusks, in front of the trunk so the raised pose can't hide one */}
        <path d="M170 256 q-10 20 -2 32" stroke="#FFF8EC" strokeWidth="13" strokeLinecap="round" fill="none" />
        <path d="M230 256 q10 20 2 32" stroke="#FFF8EC" strokeWidth="13" strokeLinecap="round" fill="none" />

        {/* eyes + brows */}
        <Eye cx={166} />
        <Eye cx={234} />
        <Brows />

        {/* cheeks, warmer when happy */}
        <ellipse cx="138" cy="196" rx="17" ry="11" fill="#E8A99B" opacity={expression === 'joy' || expression === 'happy' ? 0.7 : 0.45} />
        <ellipse cx="262" cy="196" rx="17" ry="11" fill="#E8A99B" opacity={expression === 'joy' || expression === 'happy' ? 0.7 : 0.45} />
      </g>
    </svg>
  );
};
