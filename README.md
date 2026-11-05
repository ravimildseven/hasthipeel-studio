# HasthiPeel Studio

Animation studio for **HasthiPeel**, a little elephant's stories. Built with
[Remotion](https://www.remotion.dev/): scenes are React code, renders are plain MP4/PNG.
Everything runs on your own computer, on the CPU. No GPU, no cloud service, no credits.

## One-time setup

You need:
- **Node.js 20 or newer**: https://nodejs.org (the LTS installer)
- **Git**: https://git-scm.com

Then, in a terminal:

```bash
git clone https://github.com/ravimildseven/hasthipeel-studio.git
```

```bash
cd hasthipeel-studio
```

```bash
npm install
```

The first render downloads a small headless Chrome automatically (about 100 MB, once).

## Everyday use

**Live preview in your browser.** Scrub the timeline, try props, see every composition:

```bash
npm run studio
```

**Render the character model sheet** to `out/character-sheet.png`:

```bash
npm run sheet
```

**Render the talking demo** to `out/talk-demo.mp4`:

```bash
npm run demo
```

**Render any composition** (IDs are listed in the Studio sidebar):

```bash
npm run render -- Thumbnail out/thumbnail.png
```

## Where things live

| Path | What |
|---|---|
| `src/Mascot.tsx` | the rigged HasthiPeel character: expressions, blink, walk, wave, mouth |
| `src/LipSync.tsx` | drives the mouth from a voice/sound track |
| `src/Stage.tsx` | one scene laid out for 16:9 *and* 9:16 |
| `src/Rain.tsx`, `src/KenBurns.tsx`, `src/Overlays.tsx` | weather, camera moves, on-screen text |
| `episodes/ep01-paper-boat/SCRIPT.md` | the pilot script |
| `ROADMAP.md`, `RECOMMENDATIONS.md` | the plan |
| `public/` | audio and images the scenes load (put narration and background plates here) |
| `out/` | renders (not committed; regenerate any time) |

## Render times
Previews and stills take seconds. A full 5-minute 1080p episode is thousands of frames rendered on
your CPU, so expect a coffee-break-to-lunch wait depending on the machine. Shorts take a minute or two.

## `tools/assemble.sh`
Optional, for stitching downloaded AI video clips. Needs `bash`, `ffmpeg` and `python3`
(on Windows use WSL or Git Bash).
