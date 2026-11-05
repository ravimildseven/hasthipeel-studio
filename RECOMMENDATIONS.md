# HasthiPeel — production stack after SJinn

## 1. What this episode actually cost

| Item | Qty | Unit | Total |
|---|---|---|---|
| nano-banana-pro 2K 9:16 still | 6 | 450 | 2,700 |
| seedance2.5 **1080p / 8s** | 2 | 6,800 | 13,600 |
| seedance2.5 **720p / 5s** | 3 | 1,750 | 5,250 |
| compose | 1 | ~10 | 10 |
| | | | **≈ 21,560 for 31 seconds** |

**Video generation was 88% of the spend.** Stills were almost free by comparison. That ratio is
the whole problem, and it is fixable without losing quality.

---

## 2. The structural fix: generate less, composite more

Writing the five animation prompts exposed something. Three of the five beats were, in plain
terms, *"hold the framing, push in slowly, and make it rain."* That is a CSS transform and a
particle layer. It is not generation. We paid roughly 10,300 credits for motion that Remotion
produces for free, deterministically, in about 90 seconds of render.

**What genuinely needs a video model:** the splash, the jump, water physics, cloth, fire, smoke —
anything where matter deforms.

**What does not:** push-ins, pans, parallax, rain, snow, dust, lamp flicker, steam drift, ear
flaps, idle breathing, every overlay, every title, every thumbnail.

Rebuilt on that split, this same episode becomes:

| | Old | New |
|---|---|---|
| Generated stills | 6 | 6 |
| Generated video beats | 5 | **2** (splash + jump only) |
| Remotion beats | 0 | **3** (Ken Burns + procedural rain) |

That is a **~60% cut in generation spend** with no visible quality loss, because the three
converted beats were near-static anyway.

---

## 3. Where to generate after SJinn — ranked for your situation

**① Flow, on the Google AI Pro you already pay for.** Zero marginal cost. Use it for the one or
two beats per episode that genuinely need physics. Limitation: it is UI-driven, so I cannot drive
it from a session — you run those by hand and drop the files in.

**② Gemini API (Veo 3.1) — the one I would actually build on.** It is programmable, so this
session can generate, poll, and assemble end to end again. Reported per-second rates:

| Model | 720p | 1080p |
|---|---|---|
| Veo 3.1 Lite | $0.05/s | $0.08/s |
| Veo 3.1 Fast | $0.10/s | $0.12/s |
| Veo 3.1 Standard | $0.40/s | $0.40/s |

At Fast/720p, a 5s beat is **$0.50** and a full 40s episode generated end to end is **~$4**. Under
the hybrid split in §2, two generated beats per episode is **~$1.60**. Verify current rates at
https://ai.google.dev/gemini-api/docs/pricing before budgeting — video pricing moves without notice,
and one reseller page quotes figures far above these.

**③ Keep nano-banana / Gemini image for stills.** Stills are cents, not dollars, and the
image-first QA step is what keeps the expensive step from being wasted. Do not stop doing it.

**④ Keep vidIQ for the YouTube side.** 150 credits/month covers title scoring (5), keyword
research (5), and the occasional thumbnail (22). Title scoring in particular is worth it — it
picked the emotional framing over the literal one on this episode.

**⑤ Drop OpenArt** unless you want another subscription. It sits at 0 credits on Free and adds
nothing the above does not cover.

**To let me drive generation directly again**, add a Gemini API key to this environment's settings
(cloud environment menu in the title bar → Edit → Network secrets, or as an environment variable).
I will read it as `GEMINI_API_KEY`. A new session picks it up. Don't paste the key into chat.

---

## 4. Build an asset library, stop paying per episode

Right now every episode regenerates its world from scratch. It should not.

Generate **once**, reuse for a year:
- **Mascot turnaround** — 8 angles/poses as transparent PNGs
- **Location backplates** — village exterior, interior, path, temple, market, riverbank
- **Weather plates** — monsoon, dusk, night, harsh noon

Then each new episode is mostly *composition* of owned assets plus one or two generated beats.
Episode 1 pays for the library; episodes 2–20 are nearly free. This is also the single best
answer to the saturation problem in your niche notes — a consistent owned world is exactly what
the generic cooking channels cannot copy.

---

## 5. You now own a vector mascot

`src/Mascot.tsx` is the mascot as code: correct to the locked description, with a trunk-wave
parameter and idle breathe/ear-flap. It is **pixel-identical every render**, which the generated
frames can never be — your skill notes say character consistency comes only from re-describing
traits every time and hoping. For thumbnails, end cards, the corner bug, and any simple beat,
this removes drift entirely and costs nothing.

It is deliberately flat-vector, not Ghibli-painterly, so it complements the generated frames
rather than pretending to be one. Use it in overlay and brand positions, not as a scene character.

---

## 6. What is in the repo now

| File | Purpose |
|---|---|
| `src/brand.ts` | palette, type, Shorts safe-area |
| `src/Mascot.tsx` | vector mascot, `wave` 0→1, idle animation |
| `src/Rain.tsx` | `Rain` + `MonsoonRain`, seeded parallax rain |
| `src/KenBurns.tsx` | scripted push-in/pan over a still, never exposes frame edges |
| `src/Overlays.tsx` | `Signature`, `CornerBug`, `HookCaption` |
| `src/Thumbnail.tsx` | branded thumbnail still |
| `src/GfxDemo.tsx` | the whole stack running together |
| `tools/assemble.sh` | normalise → concat → tail hold → overlay → faststart |

Render anything with:

```bash
npx remotion still src/index.ts Thumbnail out/thumbnail.png
```

```bash
npx remotion render src/index.ts GfxDemo out/gfx-demo.mp4 --codec=h264
```

---

## 7. Next three moves

1. **Add the Gemini key** so generation is programmable again.
2. **Re-cut this episode** with beats 1, 5, 6 converted to Ken Burns + `MonsoonRain` over their
   existing stills, keeping only the splash and jump as generated video. Same episode, ~60% less.
3. **Generate the mascot turnaround and four backplates** as the start of the asset library.

---

# Update: kids-brand direction (Peppa-*like* format, fully original IP)

This supersedes parts of §3 and §5 above.

## The look: commit to the flat vector character
For a brand kids recognise and you can license, the **flat vector mascot beats the Ghibli-painted
frames**. Long-running preschool brands work this way for good reasons: one simple, high-contrast
silhouette that reads at thumbnail size, survives being printed on a sticker, a plush tag or a
lunchbox, and never drifts off-model between episodes. Painterly diffusion frames can't promise any
of those.

Keep the Ghibli-ASMR Shorts as their own thing if you like. Don't make them the brand.

## The engine: a rig, not a video model
Flat preschool animation is puppet/cut-out work: a character built from parts, moved by
parameters. That's what `src/Mascot.tsx` now is:

- 6 expressions (`happy`, `joy`, `surprised`, `sad`, `sleepy`, `neutral`) + trunk wave
- auto-blink, idle breathing, ear flaps, trot walk cycle
- **mouth driven by a voice track** (`src/LipSync.tsx`), verified frame by frame against the audio

It runs on this CPU-only container in seconds, at zero cost per episode. Diffusion video models stay
useful for occasional establishing shots, but they're no longer the engine.

## Local video models: not here, and not the right tool anyway
- This container has **no GPU**, so open video models (Wan, LTX-Video, HunyuanVideo family) can't
  run here.
- On your own machine they generally want a recent NVIDIA card with roughly 12–24 GB+ VRAM. Apple
  Silicon runs some of them, slowly.
- Even with the hardware they're the wrong tool for this format: diffusion re-imagines the character
  every shot, which is exactly what a brand can't afford.

## Subscriptions: keep Google AI Pro, add nothing for video
| Spend | Verdict |
|---|---|
| **Google AI Pro** (Flow + Nano Banana) | **Keep.** Backgrounds, establishing shots, concept exploration. |
| Gemini API pay-as-you-go | Only if you want me generating backgrounds unattended. |
| Another video-gen subscription | **No.** The rig replaces most of what it would do. |
| **Voice** | **The new essential.** A Peppa-like format is narrated, with character dialogue. |
| **Human character designer** (one-off) | **Strongly recommended** before you treat this as a brand. See below. |

**Voice.** Pick one consistent narrator voice and keep it forever; it becomes part of the brand.
An AI voice service (ElevenLabs is the usual choice) is fine for prototyping. For the long-term
brand voice, a real voice actor under a written buyout agreement means you own the recordings
outright.

## Owning the brand (talk to an IP lawyer before investing heavily)
- **Copyright needs human authorship.** The US Copyright Office's position is that purely
  AI-generated material isn't copyrightable without sufficient human creative contribution. That
  includes the generated frames and, arguably, a character designed entirely by an AI. For a
  character you plan to license, have a human designer produce or substantially refine the
  canonical model sheet, with a written assignment of rights to you.
- **Trademark the name and logo** in the classes you'll actually use (entertainment, toys,
  apparel). Run a clearance search on "HasthiPeel" first.

## YouTube rules that apply the moment this is "for kids"
- **Made for Kids is mandatory** for content directed at children (COPPA). It switches off comments,
  personalised ads and some features, so ad revenue per view drops. Plan for the brand (merch,
  licensing, books) to be the business, with YouTube as the funnel.
- **YouTube's monetisation policy targets "inauthentic", mass-produced content**, and AI-generated
  kids' content is under particular scrutiny. Recurring characters, real stories with a beginning,
  middle and end, a consistent voice and visible human creative direction are what keep a channel
  monetisable. Templated slop isn't.
- **Separate the audiences.** Your current HasthiPeel audience is adults watching cozy ASMR. Mixing
  Made-for-Kids episodes into that channel muddles both. A dedicated kids channel, or a deliberate
  full pivot, is cleaner. That's your call.

## Revised next moves
1. Decide: new kids channel, or pivot HasthiPeel.
2. Write a 2–3 minute pilot episode script (simple problem, gentle lesson, a running gag).
3. Record or generate a narrator voice for it. The rig lip-syncs to it with no other change.
4. Commission a designer to finalise the model sheet from `out/character-sheet.png` as a brief.
5. Trademark search on the name.
