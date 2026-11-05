import {Config} from '@remotion/cli/config';
import {existsSync} from 'node:fs';

// Cloud sessions ship a Chromium at this path. On your own computer it isn't
// there, and Remotion downloads its own headless Chrome on first render.
const CLOUD_CHROMIUM = '/opt/pw-browsers/chromium';
if (existsSync(CLOUD_CHROMIUM)) {
  Config.setBrowserExecutable(CLOUD_CHROMIUM);
}

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
