// Window chrome, icons and timeline helpers shared by the mockup pages.
// Start loading the ID face now, so it is ready before the first frame is captured.
if (globalThis.document && document.fonts) document.fonts.load('500 16px "Geist Mono"');
(function (g) {
  const ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    timeline: '<path d="M3 12h18"/><circle cx="7" cy="12" r="2"/><circle cx="14" cy="12" r="2"/><circle cx="18" cy="12" r="2"/>',
    case: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/>',
    alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    out: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
    key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
    tag: '<path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r="1"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    terminal: '<path d="m4 17 6-6-6-6M12 19h8"/>',
    diff: '<path d="M12 3v14M5 10h14M5 21h14"/>',
    wifioff: '<path d="M2 2l20 20M8.5 16.4a5 5 0 0 1 7 0M5 12.9a10 10 0 0 1 5.2-2.6M19 12.9a10 10 0 0 0-2.2-1.6M12 20h.01"/>',
  };
  const icon = (name, size = 16, sw = 1.75) => `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;

  const NAV = { Look: [['Lookup', 'search'], ['Invites', 'link'], ['Timeline', 'timeline']], Keep: [['Cases', 'case', '4'], ['Saved IDs', 'star', '12']] };
  // The Discord symbol is used as Discord's guidelines allow: unchanged, in black, to say where the data comes from.
  const discord = (size = 14) => `<img class="dsym" src="discord-symbol.svg" width="${size}" height="${size}" alt="Discord">`;
  const sidebar = (active) => `<aside class="side">
      <div class="lights"><i></i><i></i><i></i></div>
      ${Object.entries(NAV).map(([grp, items]) => `<h4>${grp}</h4>${items.map(([label, ic, n]) => `<div class="nav ${label === active ? 'on' : ''}">${icon(ic)}<span>${label}</span>${n ? `<em>${n}</em>` : ''}</div>`).join('')}`).join('')}
      <div class="bot"><b>${discord(15)}Official Discord API</b><span>${icon('key', 13)}Your bot token, kept in Windows Credential Manager</span></div>
    </aside>`;
  // Highlighter: what Flake worked out. Warnings and matches always carry words.
  const hl = (text) => `<mark>${text}</mark>`;
  const warn = (text) => `<span class="flag warn">${icon('alert', 13, 2.2)}${text}</span>`;
  const match = (text) => `<span class="flag match">${icon('check', 13, 2.4)}${text}</span>`;
  const idText = (id, { hi = false } = {}) => {
    // The timestamp sits in the leading digits, roughly; highlight the first 10 as a reading aid.
    return `<span class="id">${hi ? `<mark>${id.slice(0, id.length - 9)}</mark>${id.slice(id.length - 9)}` : id}</span>`;
  };

  const cursorSVG = `<svg class="cursor" id="cursor" width="22" height="28" viewBox="0 0 22 28"><path d="M2 1.8 V22.6 L7.4 17.6 L11 26 L14.6 24.4 L11 16.2 H18.4 Z" fill="#000" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
  const ease = (v) => { const t = Math.max(0, Math.min(1, v)); return 1 - (1 - t) ** 3; };
  const easeIO = (v) => { const t = Math.max(0, Math.min(1, v)); return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2; };
  const span = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));

  g.UI = { icon, sidebar, discord, hl, warn, match, idText, cursorSVG, ease, easeIO, span };
})(globalThis);
