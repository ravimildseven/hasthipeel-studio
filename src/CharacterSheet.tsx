import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, F} from './brand';
import {Expression, Mascot} from './Mascot';

const CELLS: {label: string; expression: Expression; wave?: number}[] = [
  {label: 'happy', expression: 'happy'},
  {label: 'joy', expression: 'joy'},
  {label: 'surprised', expression: 'surprised'},
  {label: 'sad', expression: 'sad'},
  {label: 'sleepy', expression: 'sleepy'},
  {label: 'wave', expression: 'happy', wave: 1},
];

/** Model sheet: the canonical reference for every expression, kept in the repo. */
export const CharacterSheet: React.FC = () => (
  <AbsoluteFill style={{background: C.cream, fontFamily: F, padding: '90px 40px 40px'}}>
    <div style={{fontWeight: 800, fontSize: 64, color: C.ink, textAlign: 'center', letterSpacing: -1}}>
      HasthiPeel · model sheet
    </div>
    <div style={{fontWeight: 700, fontSize: 30, color: '#7A6A5E', textAlign: 'center', marginTop: 8}}>
      expressions v2 · vector rig
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px 24px',
        marginTop: 50,
      }}
    >
      {CELLS.map((c) => (
        <div key={c.label} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{width: 430, height: 430, background: '#EAF1F4', borderRadius: 36}}>
            <Mascot animate={false} expression={c.expression} wave={c.wave ?? 0} />
          </div>
          <div style={{fontWeight: 800, fontSize: 34, color: C.ink, marginTop: 10}}>{c.label}</div>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);
