import React from 'react';
import {AbsoluteFill, Composition, Still} from 'remotion';
import {Episode} from './Episode';
import {GfxDemo} from './GfxDemo';
import {Thumbnail} from './Thumbnail';
import {CornerBug, HookCaption, Signature} from './Overlays';
import {DemoScene} from './DemoScene';
import {Mascot} from './Mascot';
import {CharacterSheet} from './CharacterSheet';
import {TalkDemo} from './TalkDemo';
import {Stage} from './Stage';
import {MonsoonRain} from './Rain';
import {META} from './active/meta';
import {W, H, FPS} from './brand';

/** Mid-grey stand-in so the cream pill is legible in the check still. */
const SignatureCheck: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#6B7A82'}}>
    <Signature frozen />
    <CornerBug frozen />
  </AbsoluteFill>
);

const MascotCheck: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#CFE0E8', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center'}}>
      <div style={{width: 620, height: 620}}>
        <Mascot animate={false} wave={0} />
      </div>
      <div style={{width: 620, height: 620}}>
        <Mascot animate={false} wave={1} />
      </div>
    </div>
  </AbsoluteFill>
);

const OverlayCheck: React.FC = () => (
  <AbsoluteFill>
    <DemoScene wave={0.8} />
    <MonsoonRain />
    <CornerBug frozen />
    <HookCaption text="The first rain of the season" frozen />
    <Signature frozen />
  </AbsoluteFill>
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Episode"
      component={Episode}
      durationInFrames={META.durationInFrames}
      fps={META.fps}
      width={W}
      height={H}
      defaultProps={{
        videoFile: META.videoFile as string,
        audioFile: META.audioFile as string | null,
        signatureFrames: META.signatureFrames as number,
      }}
    />
    <Composition id="GfxDemo" component={GfxDemo} durationInFrames={180} fps={FPS} width={W} height={H} />
    <Still id="Thumbnail" component={Thumbnail} width={W} height={H} />
    <Still id="SignatureCheck" component={SignatureCheck} width={W} height={H} />
    <Still id="OverlayCheck" component={OverlayCheck} width={W} height={H} />
    <Still id="MascotCheck" component={MascotCheck} width={W} height={H} />
    <Still id="CharacterSheet" component={CharacterSheet} width={W} height={H} />
    <Still id="StageWide" component={Stage} width={1920} height={1080} defaultProps={{expression: 'joy' as const, wave: 0}} />
    <Still id="StageTall" component={Stage} width={1080} height={1920} defaultProps={{expression: 'joy' as const, wave: 0}} />
    <Composition id="TalkDemo" component={TalkDemo} durationInFrames={240} fps={FPS} width={W} height={H} />
  </>
);
