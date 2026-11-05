# HasthiPeel — "A Little Elephant's First Monsoon Rain"

**Slug:** `first-rain` · **Format:** 9:16 Shorts · **Wordless** · **Runtime:** ~31s cut + 3s tail hold ≈ **34s**
**Calendar tie-in:** northeast monsoon (Oct–Dec, Tamil Nadu) — a real, current seasonal hook for November.

---

## The cut (5 beats)

Beat 2 (approach-the-puddle) was **cut for budget** — beat 3 carries the discovery instead.
The arc still closes: burst out → first splash → full jump → walk home → wave.

| # | Beat | Spec | Source frame | Clip |
|---|------|------|--------------|------|
| 1 | **Hook** — bursts out the doorway into hammering rain | 1080p / 8s | [frame](https://edit.comfyonline.app/result/4521dd36-54c6-4431-85fa-06a24e4e175f.jpg) | https://edit.comfyonline.app/result/fad1031d-ae77-4bab-97ee-9579e5d9b5e8.mp4 |
| 3 | **Build** — first tentative splash, one foot in | 720p / 5s | [frame](https://edit.comfyonline.app/result/8e24bbd2-cad1-4894-8f82-1f448d308ef5.jpg) | https://edit.comfyonline.app/result/f1893e30-b9cf-4587-954a-e68884a15cc9.mp4 |
| 4 | **Climax** — full two-footed jump, water exploding | 1080p / 8s | [frame](https://edit.comfyonline.app/result/dee182fb-c6b3-416b-83e8-eb1a65eef729.jpg) | https://edit.comfyonline.app/result/5c8363db-c1f8-46fd-b7b4-07ce62612dd4.mp4 |
| 5 | **Falling** — trots home under a banana leaf | 720p / 5s | [frame](https://edit.comfyonline.app/result/3b80c09c-7598-44a4-b573-54ecaf249eec.jpg) | https://edit.comfyonline.app/result/11f3e256-006e-4f20-a1f0-588ba31e63e9.mp4 |
| 6 | **Signature** — turns to camera, trunk wave | 720p / 5s | [frame](https://edit.comfyonline.app/result/2d26335c-eeba-47a1-bdad-486bf63bfee4.jpg) | https://edit.comfyonline.app/result/815e97d6-de45-44b8-9bd5-65ede0108fe4.mp4 |

**Unused frame** (generated, not animated) — beat 2, the puddle approach:
https://edit.comfyonline.app/result/e40d675b-ecf4-4ed0-a224-d6ed38037e3d.jpg

### ▶ Composed cut (all 5 beats, 31s, no overlay/audio yet)
https://edit.comfyonline.app/composed_videos/composed_video_de12a88e21dc485eb6151694087e7e6d.mp4

---

## Real SJinn economics (measured, not estimated)

| Item | Unit cost |
|---|---|
| nano-banana-pro, 2K, 9:16 image | **450** |
| seedance2.5, **1080p / 8s** video | **6,800** |
| seedance2.5, **720p / 5s** video | **1,750** |

Note the 720p/5s clip is **~4× cheaper** than 1080p/8s for about 60% of the screen area and
60% of the runtime. On a 9:16 Short viewed on a phone, 720p upscaled to 1080 is barely
distinguishable — **720p should be the channel default**, with 1080p reserved for the single
climax beat.

Spend this episode: 2,700 (6 images) + 6,800 + 6,800 + 1,750 × 3 = **~21.5k credits**.

---

## Beat 2 — Flow prompt (free on your Google AI Pro)

To restore the 6-beat version at no SJinn cost, generate this in Flow from the unused frame above:

> Animate this illustration with restrained, natural motion, keeping the framing exactly as it is.
> The little elephant leans forward with curiosity and lowers his trunk to the puddle, the tip just
> dipping the surface; concentric ripples spread gently outward. Steady monsoon rain stipples the
> puddle with tiny rings throughout. His ears twitch and he blinks once. Keep the hand-painted
> Ghibli watercolour look and colour palette unchanged. Camera holds position with only a very slow
> slight push-in — do not pan, zoom out, pull back, reframe, or reveal anything outside the original
> image borders. No text, no lettering, no watermark.

Drop the result in as `public/clips/beat2.mp4` and add `2` back into the `BEATS` array in
`tools/assemble.sh`.

---

## Assembly

```bash
cd ~/bramble-hollow
# download the five clip URLs into public/clips/ as beat1,3,4,5,6.mp4
tools/assemble.sh first-rain [optional-ambient.m4a]
```

`tools/assemble.sh` normalises mixed 1080p/720p sources to a 1080×1920 canvas, concatenates them,
holds the final frame 3s, then renders the signature overlay over the top in Remotion and writes
`out/first-rain/first-rain.mp4` (faststart, AAC).

---

## Publishing metadata

**Title** (vidIQ score **93/100**):
```
🐘 A Little Elephant's First Monsoon Rain 🌧️ (Cozy Ghibli ASMR) #monsoon #rain
```
Runner-up, 92: `🐘 A Little Elephant Jumps in Monsoon Puddles 🌧️ (Cozy Ghibli ASMR) #monsoon #elephant`

The emotional framing ("First Monsoon Rain") beat the literal one ("Jumps in Puddles") — consistent
with the flood/grace episode being your best CTR performer at 8.08%.

**Description**
```
🌧️ The first real rain of the season, and one very small elephant who cannot resist a puddle.

He bursts out of the doorway the moment it starts, finds the biggest puddle on the red earth,
and jumps in with his whole heart — then trots home under a banana leaf to a warm lamp.

No dialogue — just rain on terracotta, splashing water, and a little elephant's pure delight.

Part of HasthiPeel — small cozy moments in the life of one little elephant.

Follow for more 🐘

#HasthiPeel #monsoon #ghibli #ghibliasmr #cozyanimation #babyelephant #rainsounds #slowliving #wordlessanimation #asmr
```

**Tags** (verified: no empty entries, no double commas)
```
hasthipeel, monsoon, northeast monsoon, rain, puddle, ghibli style, ghibli asmr, cozy animation, baby elephant, slow living, wordless animation, rain sounds, south india, village rain
```

---

## Audio
Wordless ASMR bed: rain on terracotta (constant), splash transients keyed to beats 3–4, distant
thunder low, room tone + lamp crackle for beat 6. Keep the bed under the splashes so the climax lands.
Not generated — SJinn credits ran out before the audio step.

## Signature overlay
Rendered locally in Remotion, never by the image/video model — `src/Episode.tsx`, held the last 3s,
Nunito 800 on a cream pill, clear of the Shorts safe-area. Verified render: `out/sig.png`.
