# Flake design source

Everything in `assets/brand`, `assets/mockups` and `assets/readme` renders from this folder.

```bash
npm install
npx playwright install chromium
node render.mjs all
```

`node render.mjs icon`, `stills` or `gifs` renders one group, and `node render.mjs gifs hero` renders one file. GIFs also need `ffmpeg` and `gifsicle` on your `PATH`, and the icon step needs Python with Pillow.

## Direction

- **The ID is the hero.** Snowflakes are set in a monospace face, and the hero splits one into its 64 bits.
- **Yellow is a highlighter.** It marks what Flake worked out: a decoded date, a lead, a burst. Text on it is always ink.
- **Red is a warning and green is a match** with an ID you saved. Both always come with words.
- **Discord's own look stays Discord's.** No blurple, no Discord badge art or status icons. The Discord symbol appears unchanged, in white, only to say where data comes from.
- **Type:** SF Pro on Apple devices, Inter everywhere else, SF Mono or Geist Mono for IDs.

`src/kit.js` decodes snowflakes and holds the sample people and servers; their IDs are real snowflakes for the dates shown. Each scene is one HTML file in `src/`, and animated scenes expose `window.seek(t)`.
