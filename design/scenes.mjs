// What this project renders. Paths are relative to the repo root.
export const WORD = 'Flake';
const still = (page, out, extra = {}) => ({ page, w: 1120, h: 700, scale: 1.5, out, ...extra });
export const STILLS = [
  still('lookup', 'assets/mockups/lookup.png'),
  still('invite', 'assets/mockups/invite.png'),
  still('timeline', 'assets/mockups/timeline.png'),
  { page: 'board', w: 1600, h: 760, scale: 1.5, out: 'assets/brand/brand-board.png' },
  { page: 'social', w: 1280, h: 640, scale: 1, out: 'assets/brand/social-preview.png' },
];
export const GIFS = [
  { page: 'hero', start: 7.0, w: 1200, h: 600, fps: 18, dur: 9, out: 'assets/readme/hero.gif', lossy: 20 },
  { page: 'ticker', w: 960, h: 60, fps: 25, dur: 4, out: 'assets/readme/ticker.gif', lossy: 20 },
];
