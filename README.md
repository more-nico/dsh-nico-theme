# dsh-nico-theme

[![npm version](https://img.shields.io/npm/v/dsh-nico-theme?style=flat-square&color=cb3837)](https://www.npmjs.com/package/dsh-nico-theme) [![license: MIT](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)](LICENSE) [![dsh >= 0.1.7-rc.2](https://img.shields.io/badge/dsh-%3E%3D0.1.7--rc.2-61DAFB?style=flat-square)](https://www.npmjs.com/package/@deepseek-ai/dsh) [![glass by nico-glass-kit](https://img.shields.io/badge/glass-nico--glass--kit-cb3837?style=flat-square)](https://github.com/more-nico/nico-glass-kit)

English | [中文](README.zh.md) · [Changelog](CHANGELOG.md)

A switchable **liquid-glass** theme for the [DeepSeek Harness](https://github.com/deepseek-ai/DeepSeek-Harness) web UI. Header, sidebar, composer, docks, and conversation pads become frosted panes over a living fluid backdrop (image or video wallpaper is optional). Turning the plugin off restores the stock UI — no DSH source changes.

<p>
  <img src="assets/elastic-hover.gif" alt="Panels leaning together with the pointer under hover elasticity" width="100%">
</p>

*Hover elasticity, recorded at maximum strength (0.5); the default is 0.2.*

---

## Contents

- [What it is](#what-it-is)
- [Highlights](#highlights)
- [Gallery](#gallery)
- [Origins](#origins)
- [Requirements](#requirements)
- [Install](#install)
- [Develop](#develop)
- [License](#license)

## What it is

A DSH client plugin. The panel glass is rendered by [nico-glass-kit](https://github.com/more-nico/nico-glass-kit): every pane portals a `GlassSurface`, whose backdrop runs an SVG displacement filter, so the glass bends the picture along its rounded corners instead of only blurring it. The fluid backdrop, wallpaper layers and reading pads are this repo's own CSS/canvas work. Not affiliated with DeepSeek.

## Highlights

- **Mica** floating glass panels (32px main-panel corners, 18px popup corners, nico-glass-kit material), or **compat** mode (stock layout, frosted material)
- Panes cover the header, sidebar, composer, docks, dialogs, menus, model lists, background-task popover and new-session capsule, including multiple transient panels of the same kind
- Popups start with configured frosting before refraction becomes ready; panes share the material settings, with a stronger neutral tint on the right sidebar for file previews. Selected rows, header tabs and small buttons use rounded outlines and subtle highlights
- Fluid backdrop with hue / depth knobs; optional image or video wallpaper with its own blur slider
- Material knobs on the kit scale: blur, brightness, refraction, depth, curvature, dispersion, rim highlight
- Hover **elasticity**: the glass, icons and panel content lean together using the shared setting; the settings window stays stationary, and `prefers-reduced-motion` turns motion off
- Reading pads for user bubbles, assistant prose, reply actions and the trajectory
- No adaptive text color

## Gallery

**Mock conversation** — a successful, synthetic art-history exchange over the dark glass UI.

<p>
  <img src="assets/hero-dark.png" alt="Dark-mode mock conversation about Monet's Cliff Walk at Pourville" width="100%">
</p>

**Theme settings and rail** — glass controls and the collapsed sidebar over Monet's *Cliff Walk at Pourville*.

<p>
  <img src="assets/chat-dark.png" alt="Nico Theme settings over Cliff Walk at Pourville" width="49%">
  <img src="assets/rail-dark.png" alt="Collapsed sidebar rail over Cliff Walk at Pourville" width="49%">
</p>

**Settings** — the Nico Theme page carries every material knob; the clip drags the wallpaper blur to 3px.

<p>
  <img src="assets/settings-material.gif" alt="Nico Theme settings page: material knobs and the wallpaper blur slider dragged to 3px" width="100%">
</p>

## Origins

This repository is a **fork** of [WYH66666666/DSH-Transparent-UI-Plugin](https://github.com/WYH66666666/DSH-Transparent-UI-Plugin) (MIT, © 2026 John Wu), adapted for **DSH 0.2.0-rc.2**.

The panel glass — refraction, bevel, tint, rim light, and elasticity — is rendered by [nico-glass-kit](https://github.com/more-nico/nico-glass-kit) (`0.3.2`, MIT). The fluid backdrop, wallpaper layers, and reading pads are this repository's own CSS/canvas work.

## Requirements

- `@deepseek-ai/dsh@0.2.0-rc.2` (tested version)
- Node.js 22+
- The refraction pass wants a Chromium browser; Firefox and Safari fall back to the kit's plain CSS frost on their own

## Install

DSH plugins live on a **profile**, not in the global `dsh` install. `dsh plugin add` runs pnpm inside that profile and, because this package declares `dsh.bundle`, **appends it to `dsh.profile.bundles` automatically**. Then restart the profile.

### Daily Web UI

```sh
dsh plugin --profile web add dsh-nico-theme@latest
```

Then restart `dsh web`. Enable **Nico glass theme** in Settings → Built-in Plugins → Nico Theme. Every knob lives on the dedicated **Nico Theme** page in the settings left nav.

### Throwaway profile (does not touch `web`)

```sh
dsh plugin --profile nico-theme-test add dsh-nico-theme@latest
dsh --profile nico-theme-test --host 127.0.0.1 --port 18765 --no-open
```

Update later with the same command (`@latest`) or `dsh plugin --profile web update`. Remove with `dsh plugin --profile web remove dsh-nico-theme`.

### From a local checkout (development)

```sh
pnpm install && pnpm bundle
dsh plugin --profile nico-theme-test add .
```

## Develop

```sh
pnpm install
pnpm bundle          # tsdown + lib/types/*.d.ts
pnpm typecheck       # tsc --noEmit against the installed DSH client packages
pnpm visual          # Playwright checks against the test profile
pnpm readme-shots    # refresh dark-mode images (set NICO_WALLPAPER; optional NICO_THEME_DEMO_TITLE selects one named local demo session)
pnpm readme-gifs     # record assets/*.gif (needs NICO_THEME_URL; settings clip also needs NICO_WALLPAPER)
```

The material itself lives in [nico-glass-kit](https://github.com/more-nico/nico-glass-kit); this repo mounts it onto DSH's panels and wires the knobs to its settings page.

Maintainers: `npm login`, then `git tag v0.1.0 && git push origin v0.1.0`. GitHub Actions publishes the tarball (needs repo secret `NPM_TOKEN`). Or `pnpm publish` locally after `pnpm bundle`.

## License

[MIT](LICENSE)

- Fork of [DSH-Transparent-UI-Plugin](https://github.com/WYH66666666/DSH-Transparent-UI-Plugin) (MIT)
- Glass material from [nico-glass-kit](https://github.com/more-nico/nico-glass-kit) (MIT)

The still PNG screenshots in `assets/` were captured in dark mode on an isolated local test profile over Claude Monet's *Cliff Walk at Pourville* (1882). The Art Institute rights record is listed as CC0 by [Open Museum](https://open-museum.art/art/aic:14620); this [Wikimedia Commons reproduction](https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Cliff_Walk_at_Pourville_-_Google_Art_Project.jpg) is marked Public Domain. The conversation screenshot uses a canned response from a local-only mock endpoint; it contains no real account or conversation data.
