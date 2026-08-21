// Flake drawing kit: the icon, snowflake decoding and the sample people and servers every mockup shares.
// Runs as a classic script in pages and through import() in Node, so it only touches globalThis.
(function (g) {
  const paint = (id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1) =>
    `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</linearGradient>`;
  function tilePath(cx = 512, cy = 512, half = 448, n = 5) {
    const pts = [];
    for (let i = 0; i < 240; i++) { const t = (i / 240) * Math.PI * 2, c = Math.cos(t), s = Math.sin(t);
      pts.push(`${(cx + half * Math.sign(c) * Math.abs(c) ** (2 / n)).toFixed(1)} ${(cy + half * Math.sign(s) * Math.abs(s) ** (2 / n)).toFixed(1)}`); }
    return `M ${pts.join(' L ')} Z`;
  }
  // The mark: a snowflake made of dots, like bits. The yellow arm is the timestamp hiding in every ID.
  function bits(cx, cy, R, r, ink, hi, hiArm = 0) {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r * 1.25}" fill="${ink}"/>`;
    const dot = (x, y, rr, c) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="${c}"/>`;
    for (let a = 0; a < 6; a++) {
      const th = (-90 + a * 60) * Math.PI / 180, col = a === hiArm ? hi : ink;
      const at = (d, off = 0) => [cx + d * Math.cos(th + off), cy + d * Math.sin(th + off)];
      for (const [k, sz] of [[0.36, 1], [0.64, 0.92], [0.94, 0.8]]) { const [x, y] = at(R * k); s += dot(x, y, r * sz, col); }
      const [mx, my] = at(R * 0.64);
      for (const sd of [-1, 1]) { const b = th + sd * Math.PI / 3; s += dot(mx + R * 0.26 * Math.cos(b), my + R * 0.26 * Math.sin(b), r * 0.68, col); }
    }
    return s;
  }
  function iconSVG({ small = false, uid = 'i', size = 1024 } = {}) {
    const T = tilePath();
    const defs = `<defs>${paint(`${uid}tile`, [[0, '#2c2c2e'], [1, '#0a0a0b']])}${paint(`${uid}rim`, [[0, '#fff', 0.34], [0.4, '#fff', 0.06], [1, '#fff', 0.12]])}
      <filter id="${uid}sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000" flood-opacity=".3"/></filter></defs>`;
    const tile = `<g ${small ? '' : `filter="url(#${uid}sh)"`}><path d="${T}" fill="url(#${uid}tile)"/></g>`;
    const edge = small ? '' : `<path d="${T}" fill="none" stroke="url(#${uid}rim)" stroke-width="3"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="${size}" height="${size}">${defs}${tile}${bits(512, 512, small ? 330 : 312, small ? 50 : 40, '#f5f5f7', '#ffd60a', 0)}${edge}</svg>`;
  }
  const mark = (uid, size = 24) => iconSVG({ small: true, uid, size });

  // Snowflakes: the top 42 bits are milliseconds since 2015-01-01, so every ID carries its own birthday.
  const EPOCH = 1420070400000n;
  const NOW = Date.parse('2026-11-06T12:00:00Z');
  function decode(id) {
    const v = BigInt(id);
    return { ms: Number((v >> 22n) + EPOCH), worker: Number((v >> 17n) & 31n), process: Number((v >> 12n) & 31n), inc: Number(v & 4095n), bin: v.toString(2).padStart(64, '0') };
  }
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const pad = (n) => String(n).padStart(2, '0');
  const date = (ms, { sec = false } = {}) => { const d = new Date(ms); return `${MON[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}, ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}${sec ? ':' + pad(d.getUTCSeconds()) : ''} UTC`; };
  function age(ms) {
    const days = Math.floor((NOW - ms) / 86400000);
    if (days < 1) return 'today';
    if (days < 60) return `${days} ${days === 1 ? 'day' : 'days'} old`;
    const months = Math.floor(days / 30.44), y = Math.floor(months / 12), m = months % 12;
    return y ? `${y} ${y === 1 ? 'year' : 'years'}${m ? `, ${m} ${m === 1 ? 'month' : 'months'}` : ''} old` : `${months} months old`;
  }

  // Sample people and servers. Names are invented; avatars are credited photos of animals.
  const IMG = '../../assets/third-party/';
  const PEOPLE = {
    impostor: { id: '1567285774959902757', user: 'ash.tradez', name: 'Аsh | Middleman', avatar: IMG + 'avatar-fox.jpg', badges: [], tag: null },
    real: { id: '589122591592022025', user: 'ash.trades', name: 'Ash | Middleman', avatar: IMG + 'avatar-fox.jpg', badges: ['HypeSquad Balance'], tag: 'PXL', saved: true },
    mochi: { id: '802262603530240002', user: 'mochi.dev', name: 'Mochi', avatar: IMG + 'avatar-siamese.jpg', banner: IMG + 'banner-aurora.jpg', accent: '#3a7d5c',
      badges: ['HypeSquad Brilliance', 'Active Developer', 'Bug Hunter'], tag: 'PXL' },
  };
  const SERVERS = {
    pixel: { id: '1082986254943125508', name: 'Pixel Market', icon: IMG + 'icon-tabby.jpg', members: 12408, online: 2311, boosts: 14, level: 'Medium', vanity: 'pixelmarket' },
    clone: { id: '1567368116646838283', name: 'Pixel Market | Verify', icon: IMG + 'icon-tabby.jpg', members: 214, online: 9, boosts: 0, level: 'None', vanity: 'pixelmarket' },
  };

  const BRAND = {
    name: 'Flake',
    headline: 'Spot the flake.',
    sub: 'Paste any Discord ID. See when it was made, who it copies and where it leads.',
    ticker: ['Official API only', 'Your own bot token', 'No selfbot', 'No message scraping', 'Works offline for dates', 'Nothing leaves your PC', '$0'],
    gradientNote: '',
    swatches: [['#000000', 'Page', '#f5f5f7'], ['#1c1c1e', 'Surface', '#f5f5f7'], ['#2c2c2e', 'Quiet', '#f5f5f7'], ['#ffd60a', 'Highlighter', '#1d1d1f'], ['#ff6961', 'Warning', '#000000'], ['#30d158', 'Match', '#000000']],
  };

  g.Kit = { paint, tilePath, bits, iconSVG, mark, EPOCH, NOW, decode, date, age, PEOPLE, SERVERS, BRAND, SMALL_MAX: 64 };
})(globalThis);
