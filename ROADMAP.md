# HasthiPeel: storytelling pivot roadmap

**Where you are:** 32 videos, 7 subscribers, a recognisable mascot, a working production stack.
**Where you're going:** a narrated story series kids ask for by name, which can later become a brand.
**Why now:** at 7 subscribers a pivot costs almost nothing. At 7,000 it would cost a lot more.

---

## 1. The format decisions

### Long-form 16:9 is the master. Shorts are cut-downs, not crops.

| | Long-form episode | Short |
|---|---|---|
| Aspect | 16:9 | 9:16 |
| Length | **4–6 min** per episode | **30–50 s** |
| Job | watch time, bingeing, TV and tablet viewing | discovery: one funny or sweet moment |
| Content | the whole story | **one beat** from it: the gag, the reveal, the wave |
| Made how | rendered from the scene rules | **same scene, same frame, re-laid-out** for the vertical canvas |

Why not crop: a 9:16 centre crop keeps only **32% of a 16:9 frame's width**. Story framing puts the
subject on a third, so the crop cuts it in half (`out/reframe-compare.png`). Because our scenes are
built from layers and layout rules rather than flat video, the vertical version is recomposed, not
cropped. It costs one extra render and no extra artwork.

The one exception is **AI-generated video shots** (Flow etc.), which *are* flat pixels. For those,
either keep the action inside the centre third when you generate them, or make a separate vertical
version from the same still.

### Why 4–6 minutes
Preschool story shows run in this range (Peppa episodes are about 5 minutes, Bluey about 7): one
small problem, three attempts, a warm resolution. It's also short enough for one person to make
weekly. Once you have 4–6 episodes, **bundle them into 20–30 minute compilations**. Young children
mostly watch on TVs and tablets with autoplay, and long compilations are where that watch time
lands. Compilations of your *own* original episodes are standard practice. The monetisation problem
is reused content from other people, and mass-produced filler.

### Voice: one narrator, and the elephant stays non-verbal
The recommended path, because it keeps what you already have:

- **A narrator tells the story.** One warm, consistent voice. This is the voice the channel has
  been missing.
- **The elephant doesn't speak words.** He giggles, trumpets, gasps, hums. His face and trunk do
  the acting. That keeps the character you built, keeps him readable in any language, and the rig's
  mouth still animates to his sounds.
- **Only one track to translate.** Dub the narrator into Hindi (then Kannada, Tamil…) and upload
  them as extra audio-language tracks on the same video. You never re-animate anything.
- Supporting characters can talk later, once you've proven the format.

### Look: painted world, vector star
- **Backgrounds** stay painterly (your Ghibli warmth), generated as reusable *location plates* in
  Flow or Nano Banana: home exterior, kitchen, path, temple courtyard, market, riverbank.
- **The mascot is the rigged vector character** (`src/Mascot.tsx`). A 5-minute episode is roughly
  60 shots. Generating 60 consistent painterly shots of an acting character isn't realistic.
  Animating a rig is, and it never drifts off-model.
- This is a deliberate change from the AI-painted mascot your current viewers know. Add a soft
  paper/watercolour texture to the rig later if you want to close the gap.

---

## 2. Episode template (about 5 min)

| Time | Beat | Notes |
|---|---|---|
| 0:00–0:10 | **Cold open** | Movement immediately (your retention data says so). Something funny or curious. |
| 0:10–0:15 | **Title sting** | Name + a 3-second jingle. The same every episode. It becomes the brand sound. |
| 0:15–0:45 | **Setup** | Where we are, what he wants. |
| 0:45–3:30 | **Three tries** | Each attempt fails a little funnier. One elephant-specific gag (trunk tangles, too big for the swing, sneeze-blasts). |
| 3:30–4:30 | **Turn + resolution** | A helper, an idea, or a feeling understood. Gentle, never preachy. |
| 4:30–5:00 | **Closing ritual** | Turns to camera, **trunk wave**, narrator's sign-off line, end screen. |

Story sources that fit the channel: **monsoon and weather**, **Indian festivals** (your Janmashtami
episode already spiked on the day), **firsts** (school, train ride, haircut), **feelings** (scared of
thunder, sharing, waiting), **small chores** (cooking with Grandma, keeping your apron).

**Cast to add, slowly:** one family figure (Amma or Ajji/Grandma) and one best friend of a
*different* species. Peppa-like formats lean on that family-and-friends shape.

---

## 3. Phases

### Phase 0 (weeks 1–2): set up
- [ ] Name the elephant. Kids attach to a name, not a channel handle.
- [ ] Rewrite the channel banner, description and trailer for "gentle stories of a little elephant."
- [ ] Pick the narrator voice (AI for the pilot, plan a human voice actor with a recording buyout later).
- [ ] Generate 4 location plates in Flow/Nano Banana (wide **and** tall versions of each).
- [ ] Commission or write a 3-second title jingle.
- [ ] Set **Made for Kids** on every story episode. It's mandatory, not optional.

### Phase 1 (weeks 3–8): pilot season, 6 episodes
- 1 episode a week, 16:9.
- 2–3 Shorts a week, each one re-laid-out moment from that week's episode.
- Keep a **playlist** per season so autoplay chains episodes.
- Watch: **average % viewed**, **returning viewers**, **subscribers per 1,000 views**. Subscriber
  conversion is the weak spot your own data flagged, so it's the number that matters.
- Give the format the full 6 episodes before judging it, as your skill notes advise for any new format.

### Phase 2 (months 3–4): grow
- First **20–30 minute compilation** once 4–6 episodes exist, then one a month.
- **Hindi narration dubs** on the best-performing episodes.
- Festival tie-ins planned a month ahead (Diwali, Holi, Onam, Ganesh Chaturthi).
- Introduce the best friend character.

### Phase 3 (months 5–12): brand foundations
- Human designer finalises the model sheet (copyright needs human authorship).
- Trademark search and filing on the name.
- A longer theme song (it becomes the brand's most recognisable asset).
- Merch or books **only after** the audience asks for them.

---

## 4. Weekly pipeline: who does what

| Step | You | Me (this repo) |
|---|---|---|
| Story idea | pick from the list | pitch 3 options, score titles with vidIQ |
| Script + shot list | approve | write the narration, timings, expressions and poses per shot |
| Narration | record or generate | n/a |
| Backgrounds | generate new plates in Flow if needed | reuse existing plates |
| Animation | n/a | rig animation in Remotion, lip-sync to sounds, rain/weather, camera moves |
| Masters | review | render the 16:9 episode **and** the 9:16 Shorts from the same scenes, plus thumbnails |
| Publish | upload, set Made for Kids | titles, descriptions, tags in your house formula |

Cost per episode: about **zero** in generation, plus voice. The only hard dependency on you is the
narration track.

---

## 5. Risks, stated plainly
- **Look change.** Current viewers know the painted mascot. Mitigation: painted backgrounds, a
  texture pass on the rig, and a "new series" announcement Short.
- **Made-for-Kids economics.** No personalised ads, so revenue per view drops. YouTube is the funnel
  here; the brand is the business.
- **AI-content scrutiny.** YouTube's monetisation rules target mass-produced, "inauthentic" content.
  Recurring characters, real stories and a consistent human-directed voice are what protect you.
- **Your time.** One episode a week is the ceiling for one person. Hold that cadence rather than
  burning out at three.
