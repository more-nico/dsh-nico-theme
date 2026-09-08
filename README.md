# dsh-nico-theme

English | [中文](README.zh.md)

A switchable **liquid-glass** theme for the [DeepSeek Harness](https://github.com/deepseek-ai/DeepSeek-Harness) web UI. Header, sidebar, composer, docks, and conversation pads become frosted panes over a living fluid backdrop (image or video wallpaper is optional). Turning the plugin off restores the stock UI — no DSH source changes.

Not affiliated with DeepSeek.

<p>
  <img src="assets/hero-dark.png" alt="Home screen in dark mode, fluid backdrop and glass composer" width="100%">
</p>

<p>
  <img src="assets/chat-dark.png" alt="Conversation in dark mode, glass header, todo dock, and reading pads" width="49%">
  <img src="assets/rail-dark.png" alt="Collapsed sidebar rail over the dark fluid backdrop" width="49%">
</p>

## Origins

This repository is a **fork** of [WYH66666666/DSH-Transparent-UI-Plugin](https://github.com/WYH66666666/DSH-Transparent-UI-Plugin) (MIT, © 2026 John Wu), adapted for **DSH 0.1.2-rc.1**.

The edge refraction — rounded-rect SDF displacement maps fed into SVG `feDisplacementMap`, then stacked with `backdrop-filter` blur — follows the copy-paste liquid-glass shader in [shuding/liquid-glass](https://github.com/shuding/liquid-glass) (MIT, © Shu Ding).

## Features

- **Mica** floating glass cards, or **compat** mode (stock layout, frosted material)
- Fluid backdrop with hue / depth knobs; optional image or video wallpaper
- Liquid-glass refraction on header, sidebar, composer, docks, takeovers, jobs popover
- Conversation reading pads (user bubbles and assistant prose only)
- Cursor spotlight, hover tilt, and a 1px pointer rim (each toggleable)
- No adaptive text color

## Requirements

- `@deepseek-ai/dsh@0.1.2-rc.1` (or newer in the 0.1.2 line)
- Node.js 22+

## Install

DSH plugins live on a **profile**, not in the global `dsh` install. `dsh plugin add` runs pnpm inside that profile and, because this package declares `dsh.bundle`, **appends it to `dsh.profile.bundles` automatically**. Then restart the profile.

Daily Web UI:

```sh
dsh plugin --profile web add dsh-nico-theme@latest
```

Then restart `dsh web`. Enable **Nico glass theme** in Settings → Plugins. Every knob lives on the dedicated **Nico Theme** page in the settings left nav.

A throwaway profile (does not touch `web`):

```sh
dsh plugin --profile nico-theme-test add dsh-nico-theme@latest
dsh --profile nico-theme-test --host 127.0.0.1 --port 18765 --no-open
```

Update later with the same command (`@latest`) or `dsh plugin --profile web update`. Remove with `dsh plugin --profile web remove dsh-nico-theme`.

From a local checkout (development):

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
pnpm readme-shots    # refresh the dark-fluid images in assets/
```

Maintainers: `npm login`, then `git tag v0.1.0 && git push origin v0.1.0`. GitHub Actions publishes the tarball (needs repo secret `NPM_TOKEN`). Or `pnpm publish` locally after `pnpm bundle`.

## License

[MIT](LICENSE)

- Fork of [DSH-Transparent-UI-Plugin](https://github.com/WYH66666666/DSH-Transparent-UI-Plugin) (MIT)
- Liquid-glass refraction technique from [shuding/liquid-glass](https://github.com/shuding/liquid-glass) (MIT)
