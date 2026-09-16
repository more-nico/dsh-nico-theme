/**
 * README GIFs (assets/*.gif).
 *
 * Requires a running test-profile server (see README), `ffmpeg` on PATH, and a
 * wallpaper image. Boot the server with the privacy patch from the README dev
 * notes: it relocates the session/workspace roots so the sidebar shows none of
 * the everyday workspace names or session history.
 *
 * The clips render a synthetic cursor arrow that follows the pointer, because
 * Playwright's video recorder does not capture the OS cursor.
 *
 * Env:
 *   NICO_THEME_URL   tokenized URL of the running server
 *   NICO_WALLPAPER   wallpaper image used by both clips
 *   NICO_ELASTICITY  kit elasticity strength for the hover clip (default 0.5)
 */
import { execFile } from 'node:child_process'
import { mkdir, readFile, rm, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { chromium } from 'playwright'

const run = promisify(execFile)
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'assets')
const VIDEO = join(tmpdir(), 'nico-readme-video')
const BASE = process.env.NICO_THEME_URL ?? 'http://127.0.0.1:18765'
const WALLPAPER = process.env.NICO_WALLPAPER ?? ''
const ELASTICITY = process.env.NICO_ELASTICITY ?? '0.5'
const VIEWPORT = { width: 1440, height: 900 }
const SCALE = 1440
const FPS = 15

const log = (...parts) => console.log(parts.join(' '))

/** Synthetic cursor: Playwright video has no OS cursor, so draw one in-page. */
async function installCursor(page) {
  await page.evaluate(() => {
    if (document.getElementById('nico-demo-cursor')) return
    const el = document.createElement('div')
    el.id = 'nico-demo-cursor'
    el.style.cssText = [
      'position:fixed',
      'left:0',
      'top:0',
      'width:22px',
      'height:22px',
      'pointer-events:none',
      'z-index:2147483647',
      'filter:drop-shadow(0 1px 2px rgba(0,0,0,0.85))',
    ].join(';')
    el.innerHTML =
      '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 2.2 L5 19.4 L9.5 15 L12.4 21.6 L15.2 20.3 L12.3 13.8 L18.4 13.3 Z" fill="#fdfdfd" stroke="#0b0b0b" stroke-width="1.3" stroke-linejoin="round"/></svg>'
    document.documentElement.appendChild(el)
    window.addEventListener(
      'pointermove',
      (event) => {
        el.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
      },
      true,
    )
  })
}

async function waitForShell(page) {
  await page.waitForFunction(() => Boolean(document.querySelector('[data-dsh-nico-pane]')), { timeout: 30_000 })
  await page.evaluate(() => document.body?.setAttribute('data-ds-dark-theme', ''))
  await page.waitForTimeout(1500)
  await installCursor(page)
}

async function applyTheme(page, wallpaperUrl) {
  await page.evaluate(
    ({ url, strength }) => {
      localStorage.setItem('dsh.ui-aqua.enabled', 'true')
      localStorage.setItem('dsh.ui-aqua.mode', 'mica')
      localStorage.setItem('dsh.ui-aqua.refractOn', 'true')
      localStorage.setItem('dsh.ui-aqua.refract', '15')
      localStorage.setItem('dsh.ui-aqua.frost', '25')
      localStorage.setItem('dsh.ui-aqua.background', 'wallpaper')
      localStorage.setItem('dsh.ui-aqua.wallpaper', url)
      localStorage.setItem('dsh.ui-aqua.wallpaperBlur', '0')
      localStorage.setItem('dsh.ui-aqua.wallpaperFrost', '0')
      localStorage.setItem('dsh.ui-nico.elasticity', 'true')
      localStorage.setItem('dsh.ui-nico.elasticityStrength', strength)
    },
    { url: wallpaperUrl, strength: ELASTICITY },
  )
  await page.reload({ waitUntil: 'domcontentloaded' })
  await waitForShell(page)
}

/** Brisk pointer travel: a few chunks, each several CDP moves, so a sweep reads fast. */
async function glide(page, from, to, { chunks = 7, chunkMs = 30 } = {}) {
  for (let i = 1; i <= chunks; i += 1) {
    const t = i / chunks
    await page.mouse.move(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t, { steps: 4 })
    await page.waitForTimeout(chunkMs)
  }
}

/** Fast small-range movement in a component's bottom-right corner. */
async function jiggleCorner(page, box, seconds = 1.3) {
  const cx = box.x + box.width * 0.93
  const cy = box.y + box.height * 0.85
  const until = Date.now() + seconds * 1000
  let i = 0
  while (Date.now() < until) {
    await page.mouse.move(cx + Math.cos(i * 1.15) * 36, cy + Math.sin(i * 1.73) * 24, { steps: 2 })
    await page.waitForTimeout(18)
    i += 1
  }
}

async function paneBoxes(page) {
  return page.evaluate(() =>
    Object.fromEntries(
      [...document.querySelectorAll('[data-dsh-nico-pane]')].map((el) => {
        const r = el.getBoundingClientRect()
        return [el.getAttribute('data-dsh-nico-pane'), { x: r.x, y: r.y, width: r.width, height: r.height }]
      }),
    ),
  )
}

/** Peak |translateX| reached by the kit surface, as evidence the clip shows motion. */
async function peakOffset(page) {
  return page.evaluate(() => {
    let best = 0
    for (const el of document.querySelectorAll('[data-dsh-nico-pane] .ngs-surface')) {
      const nums = (String(getComputedStyle(el).translate).match(/-?[\d.]+/g) ?? []).map(Number)
      if (nums.length) best = Math.max(best, Math.abs(nums[0]))
    }
    return Number(best.toFixed(2))
  })
}

async function record(name, speed, body) {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({ viewport: VIEWPORT, recordVideo: { dir: VIDEO, size: VIEWPORT } })
  const page = await ctx.newPage()
  const started = Date.now()
  let firstMove = started
  const mark = () => {
    if (firstMove === started) firstMove = Date.now()
  }
  try {
    await body(page, mark)
  } finally {
    await ctx.close()
    await browser.close()
  }
  const video = await page.video().path()
  const trim = Math.max(0, (firstMove - started) / 1000 - 0.2)
  await encode(video, join(OUT, `${name}.gif`), trim, speed)
}

async function encode(video, gif, trim, speed) {
  const filter = [
    // The page renders slowly under the recorder, so a lot of the capture is
    // stalled frames; squeeze the timestamps to keep the clip watchable.
    `setpts=PTS*${speed}`,
    `fps=${FPS}`,
    `scale=${SCALE}:-1:flags=lanczos`,
    `split[s0][s1]`,
    `[s0]palettegen=max_colors=256:stats_mode=full[p]`,
    `[s1][p]paletteuse=dither=none:diff_mode=rectangle`,
  ].join(',')
  await run('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-ss', trim.toFixed(2),
    '-i', video,
    '-vf', filter,
    '-gifflags', '+transdiff',
    '-loop', '0',
    gif,
  ])
  const { size } = await stat(gif)
  const { stdout } = await run('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-count_frames',
    '-show_entries', 'stream=nb_read_frames',
    '-show_entries', 'format=duration',
    '-of', 'default=nw=1:nk=1',
    gif,
  ])
  log(`wrote assets/${gif.split(/[\\/]/).pop()}`, `${(size / 1024 / 1024).toFixed(2)}MB`, `trim ${trim.toFixed(1)}s`, stdout.trim().replace(/\s+/g, ' / frames '))
}

await rm(VIDEO, { recursive: true, force: true })
await mkdir(VIDEO, { recursive: true })
await mkdir(OUT, { recursive: true })

if (!WALLPAPER) throw new Error('set NICO_WALLPAPER to the wallpaper image used by both clips')
const wallpaperUrl = `data:image/jpeg;base64,${(await readFile(WALLPAPER)).toString('base64')}`

/** Record only the named clip (`node tests/readme-gifs.mjs settings-material`). */
const only = process.argv[2] ?? process.env.NICO_GIF ?? 'all'
const wanted = (name) => only === 'all' || only === name

let elasticPeak = 0

if (wanted('elastic-hover'))
  await record('elastic-hover', 1, async (page, mark) => {
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60_000 })
    await applyTheme(page, wallpaperUrl)
    await page.waitForTimeout(700)

    const boxes = await paneBoxes(page)
    const composer = boxes.composer
    const sidebar = boxes.sidebar
    const composerMid = { x: composer.x + composer.width / 2, y: composer.y + composer.height / 2 }

    mark()
    await glide(page, { x: composer.x + composer.width * 0.06, y: composerMid.y }, { x: composer.x + composer.width * 0.94, y: composerMid.y })
    await glide(page, { x: composer.x + composer.width * 0.94, y: composerMid.y }, { x: composer.x + composer.width * 0.06, y: composerMid.y })
    elasticPeak = Math.max(elasticPeak, await peakOffset(page))
    await jiggleCorner(page, composer, 1.2)
    elasticPeak = Math.max(elasticPeak, await peakOffset(page))

    await glide(page, composerMid, { x: sidebar.x + sidebar.width * 0.5, y: sidebar.y + sidebar.height * 0.16 })
    await glide(
      page,
      { x: sidebar.x + sidebar.width * 0.5, y: sidebar.y + sidebar.height * 0.16 },
      { x: sidebar.x + sidebar.width * 0.5, y: sidebar.y + sidebar.height * 0.82 },
    )
    await jiggleCorner(page, sidebar, 1.0)
    elasticPeak = Math.max(elasticPeak, await peakOffset(page))

    await glide(page, { x: sidebar.x + sidebar.width * 0.5, y: sidebar.y + sidebar.height * 0.82 }, composerMid)
    await jiggleCorner(page, boxes['new-session'], 0.7)
    elasticPeak = Math.max(elasticPeak, await peakOffset(page))
    await page.waitForTimeout(250)
  })
if (wanted('elastic-hover')) log('elastic peak translateX:', elasticPeak, 'px')

if (wanted('settings-material'))
  await record('settings-material', 0.55, async (page, mark) => {
    const click = (locator) => locator.click({ force: true, timeout: 8000 })

    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60_000 })
    await applyTheme(page, wallpaperUrl)

    mark()
    await click(page.getByRole('button', { name: '设置', exact: true }).first())
    await page.waitForTimeout(900)
    await click(page.getByText('Nico 主题', { exact: true }).first())
    await page.waitForTimeout(1000)

    const dialog = await page.evaluate(() => {
      const r = document.querySelector('[role="dialog"]').getBoundingClientRect()
      return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) }
    })

    // 2. pointer into the middle of the panel
    await page.mouse.move(dialog.x + dialog.width / 2, dialog.y + dialog.height / 2)
    await page.waitForTimeout(200)

    // 3. scroll down to the wallpaper blur row
    for (let i = 0; i < 3; i += 1) {
      await page.mouse.wheel(0, 170)
      await page.waitForTimeout(200)
    }
    await page.waitForTimeout(300)

    const slider = await page.evaluate(() => {
      const input = [...document.querySelectorAll('[role="dialog"] input[type="range"]')].find((el) =>
        el.closest('label')?.textContent?.includes('壁纸模糊度'),
      )
      if (!input) return null
      const r = input.getBoundingClientRect()
      return { min: Number(input.min), max: Number(input.max), value: Number(input.value), x: r.x, y: r.y, width: r.width, height: r.height }
    })
    if (!slider) throw new Error('wallpaper blur slider not found')

    const ratio = (v) => (v - slider.min) / (slider.max - slider.min)
    const y = slider.y + slider.height / 2
    const at = (r) => ({ x: slider.x + 10 + (slider.width - 20) * r, y })

    // 4. drag the knob to 3px, one px per step, 100ms apart
    const knobValue = () =>
      page.evaluate(() => {
        const input = [...document.querySelectorAll('[role="dialog"] input[type="range"]')].find((el) =>
          el.closest('label')?.textContent?.includes('壁纸模糊度'),
        )
        return Number(input?.value ?? 0)
      })
    await page.mouse.move(at(ratio(slider.value)).x, y)
    await page.waitForTimeout(200)
    await page.mouse.down()
    for (let v = 1; v <= 3; v += 1) {
      await page.mouse.move(at(ratio(v)).x, y)
      await page.waitForTimeout(100)
    }
    // the kit track is inset, so the last step can land just under the target
    for (let i = 0; i < 3 && (await knobValue()) < 3; i += 1) {
      await page.mouse.move(at(ratio(3)).x + 1.2 * (i + 1), y)
      await page.waitForTimeout(100)
    }
    await page.waitForTimeout(300)
    await page.mouse.up()
    log('wallpaperBlur now', await page.evaluate(() => localStorage.getItem('dsh.ui-aqua.wallpaperBlur')))

    // 5. pointer to the close button (top right), close the panel
    const closeBox = await page.getByRole('button', { name: '关闭', exact: true }).first().boundingBox()
    if (closeBox) {
      await glide(
        page,
        at(ratio(3)),
        { x: closeBox.x + closeBox.width / 2, y: closeBox.y + closeBox.height / 2 },
        { chunks: 2, chunkMs: 120 },
      )
    }
    await click(page.getByRole('button', { name: '关闭', exact: true }).first())
    await page.waitForTimeout(700)

    // 6. pointer to the composer's bottom-right corner, small-range jiggle
    const boxes = await paneBoxes(page)
    const composer = boxes.composer
    await glide(
      page,
      { x: dialog.x + dialog.width - 60, y: dialog.y + 16 },
      { x: composer.x + composer.width * 0.93, y: composer.y + composer.height * 0.85 },
      { chunks: 3, chunkMs: 120 },
    )
    await jiggleCorner(page, composer, 1.5)
    await page.waitForTimeout(200)
  })

log('done')
