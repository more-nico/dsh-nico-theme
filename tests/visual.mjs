/**
 * Visual check for the isolated nico-theme-test profile.
 * Assumes `dsh --profile nico-theme-test --host 127.0.0.1 --port 18765 --no-open`
 * is already serving.
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'tests', 'screenshots')
const BASE = process.env.NICO_THEME_URL ?? 'http://127.0.0.1:18765'

function parseViewport() {
  const raw = process.env.NICO_THEME_VIEWPORT
  if (raw === undefined || raw === '') return { width: 1440, height: 900 }
  const match = /^(\d+)x(\d+)$/.exec(raw)
  if (match === null) throw new Error(`NICO_THEME_VIEWPORT must use WIDTHxHEIGHT, got ${raw}`)
  return { width: Number(match[1]), height: Number(match[2]) }
}

const VIEWPORT = parseViewport()

const errors = []

async function waitForShell(page) {
  await page.waitForFunction(() => {
    const html = document.documentElement
    return Boolean(html.querySelector('[class*="sidebarCol"], [data-dsh-frame], header'))
  }, { timeout: 30_000 })
}

async function setAqua(page, values) {
  await page.evaluate((next) => {
    const map = {
      enabled: 'dsh.ui-aqua.enabled',
      mode: 'dsh.ui-aqua.mode',
      refractOn: 'dsh.ui-aqua.refractOn',
      refract: 'dsh.ui-aqua.refract',
      scrim: 'dsh.ui-aqua.scrim',
      scrimBlur: 'dsh.ui-aqua.scrimBlur',
      frost: 'dsh.ui-aqua.frost',
    }
    for (const [key, storage] of Object.entries(map)) {
      if (next[key] !== undefined) localStorage.setItem(storage, String(next[key]))
    }
  }, values)
  await page.reload({ waitUntil: 'domcontentloaded' })
  await waitForShell(page)
  await page.waitForTimeout(800)
}

async function htmlFlags(page) {
  return page.evaluate(() => {
    const h = document.documentElement
    const fx = document.querySelector('[class*="sidebarCol"]')
    return {
      aqua: h.hasAttribute('data-dsh-aqua'),
      float: h.hasAttribute('data-dsh-float'),
      compat: h.hasAttribute('data-dsh-compat'),
      inkAuto: h.hasAttribute('data-lg-ink-auto') || document.body.hasAttribute('data-lg-ink-auto'),
      scrim: h.hasAttribute('data-dsh-nico-scrim'),
      refractSvg: Boolean(document.getElementById('dsh-nico-refract-root')),
      fx: fx instanceof HTMLElement ? (fx.style.getPropertyValue('--dsh-aqua-fx') || '') : '',
      pads: document.querySelectorAll('[data-dsh-nico-pad]').length,
    }
  })
}

async function openSettings(page) {
  const trigger = page.locator('button:has([data-slot="settings.trigger"])').first()
    .or(page.getByRole('button', { name: /设置|Settings/ }).first())
  if (await trigger.count()) {
    await trigger.click()
    await page.waitForTimeout(300)
  }
  if (await page.locator('[role="dialog"]').count() === 0) {
    await page.keyboard.press('Control+,')
    await page.waitForTimeout(300)
  }
  await page.waitForTimeout(600)
  if (await page.locator('[role="dialog"]').count() === 0) {
    throw new Error('Settings dialog did not open')
  }
}

/**
 * The Nico knobs live on their own left-nav settings page
 * (`settings.section`, id `nico`) since the General → Appearance row was
 * dropped; assert against that page.
 * @param page - Playwright page with the settings dialog open on the Nico section.
 */
async function assertNicoSettingsPage(page) {
  const section = page.locator('[data-dsh-nico-page]')
  if (await section.count() !== 1) throw new Error('Nico settings page is missing')
  if (await section.locator('input[type="range"]').count() < 4) {
    throw new Error('Nico settings page has too few range controls')
  }
  if (await section.locator('button[aria-pressed]').count() < 6) {
    throw new Error('Nico settings page has too few pressed controls')
  }
  if (await section.getByRole('button', { name: /^玻璃$|^Glass$/ }).count() !== 1) {
    throw new Error('Nico mode segmented control is missing')
  }
  if (await section.getByRole('button', { name: /流体|Fluid/ }).count() !== 1) {
    throw new Error('Nico backdrop segmented control is missing')
  }
  if (await section.locator('[role="group"][aria-label]').filter({ has: page.locator('button[aria-pressed="true"]') }).count() < 2) {
    throw new Error('Nico choice card groups are missing')
  }
  if (await section.locator('img, [class*="thumb"]').count() < 2) {
    throw new Error('Nico background thumbnails are missing')
  }

  const compat = section.getByRole('button', { name: /兼容|Compatibility/ })
  if (await compat.count() !== 1) throw new Error('Nico compatibility mode control is missing')
  await compat.click()
  if (await section.getByText(/玻璃模糊度|Glass blur/).count() !== 0) {
    throw new Error('Mica-only controls remain visible in compatibility mode')
  }
  await section.getByRole('button', { name: /^玻璃$|^Glass$/ }).click()

  const wallpaper = section.getByRole('button', { name: /壁纸|Wallpaper/ }).first()
  if (await wallpaper.count() !== 1) throw new Error('Nico wallpaper mode control is missing')
  await wallpaper.click()
  if (await section.locator('input[type="file"]').count() !== 2) {
    throw new Error('Nico wallpaper file controls are missing')
  }
  await section.getByRole('button', { name: /流体|Fluid/ }).click()
}

function assertDialogFitsViewport(box, label) {
  if (box === null) throw new Error(`${label} settings dialog has no layout box`)
  if (box.width > VIEWPORT.width || box.x < 0 || box.x + box.width > VIEWPORT.width) {
    throw new Error(`${label} settings dialog overflows viewport: ${JSON.stringify(box)}`)
  }
  if (VIEWPORT.width >= 480 && box.width < 480) {
    throw new Error(`${label} settings dialog trapped at ${Math.round(box.width)}px`)
  }
}

async function shot(page, name) {
  await page.screenshot({ path: join(OUT, name), fullPage: false })
  console.log('wrote', name, await htmlFlags(page))
}

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: VIEWPORT })
page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`)
})

try {
  await mkdir(OUT, { recursive: true })
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60_000 })
  await waitForShell(page)
  await page.waitForTimeout(1200)

  await setAqua(page, { enabled: true, mode: 'mica' })
  await shot(page, '01-hero-mica.png')
  const mica = await htmlFlags(page)
  if (!mica.aqua || !mica.float) throw new Error(`expected mica flags, got ${JSON.stringify(mica)}`)

  await openSettings(page)
  const pluginsNav = page.getByText(/^插件$|^Plugins$/).first()
  if (await pluginsNav.count()) await pluginsNav.click()
  await page.waitForTimeout(500)
  await shot(page, '02-settings-plugins-card.png')
  const nico = page.getByText(/Nico 玻璃主题|Nico glass theme/).first()
  if (await nico.count() === 0) throw new Error('Nico plugin card not visible in Settings → Plugins')

  const nicoNav = page.getByText(/^Nico 主题$|^Nico Theme$/).first()
  if (await nicoNav.count() !== 1) throw new Error('Nico settings page entry is missing from the left nav')
  await nicoNav.click()
  await page.waitForTimeout(400)
  await shot(page, '03-settings-nico-page.png')
  await assertNicoSettingsPage(page)

  await page.keyboard.press('Escape')
  await page.waitForTimeout(300)

  await setAqua(page, { enabled: false })
  await shot(page, '04-theme-off.png')
  const off = await htmlFlags(page)
  if (off.aqua || off.float || off.compat) throw new Error(`expected theme off, got ${JSON.stringify(off)}`)

  await setAqua(page, { enabled: true, mode: 'compat' })
  await shot(page, '05-compat.png')
  const compat = await htmlFlags(page)
  if (!compat.aqua || !compat.compat) throw new Error(`expected compat flags, got ${JSON.stringify(compat)}`)

  // Do not click Appearance 浅色/深色 — that writes ~/.dsh/settings.yaml
  // and would change the user's daily DSH theme. Capture mica as-is.
  await setAqua(page, { enabled: true, mode: 'mica' })
  await shot(page, '06-mica.png')

  await setAqua(page, { enabled: true, mode: 'mica', frost: '70' })
  await shot(page, '20-frost-high.png')
  await setAqua(page, { enabled: true, mode: 'mica', frost: '7' })

  const collapse = page.locator('button[aria-label*="侧"], button[aria-label*="bar"], button[aria-label*="Collapse"], button[aria-label*="收起"]').first()
  if (await collapse.count()) {
    await collapse.click()
    await page.waitForTimeout(500)
  } else {
    await page.locator('[class*="sidebarCol"]').hover()
    const fold = page.locator('button').filter({ hasText: /«|‹|折叠/ }).first()
    if (await fold.count()) await fold.click()
    await page.waitForTimeout(500)
  }
  await shot(page, '07-sidebar-collapsed.png')

  // Expand again without reload: the SDF map must retarget the new width
  // or the frost stays a collapsed-width strip (sidebar_dynamic_error).
  if (await collapse.count()) {
    await collapse.click()
    await page.waitForTimeout(700)
  } else {
    await page.locator('[class*="sidebarCol"]').hover()
    const unfold = page.locator('button').filter({ hasText: /»|›|展开/ }).first()
    if (await unfold.count()) await unfold.click()
    await page.waitForTimeout(700)
  }
  await shot(page, '15-sidebar-after-expand.png')

  await setAqua(page, { enabled: true, mode: 'mica', refractOn: true, refract: '40' })
  const withRefract = await htmlFlags(page)
  if (withRefract.inkAuto) throw new Error('adaptive ink leaked onto the document')
  if (!withRefract.refractSvg) throw new Error('refract SVG missing')
  await shot(page, '08-refract-on.png')

  await setAqua(page, { enabled: true, mode: 'mica', refractOn: false })
  await shot(page, '09-refract-off.png')

  await setAqua(page, { enabled: true, mode: 'mica', refractOn: true, scrim: '25', scrimBlur: '5' })
  const session = page.getByText(/Hindsight|browser-skill/).first()
  if (await session.count()) {
    await session.click()
    await page.waitForTimeout(1500)
  }
  const chat = await htmlFlags(page)
  await shot(page, '10-chat-pad.png')
  if (chat.inkAuto) throw new Error('adaptive ink leaked on chat')

  // Collapse from a session in dark (matches all_error.png): header must
  // stay in the main column, bubbles must not be displaced.
  await page.evaluate(() => document.body?.setAttribute('data-ds-dark-theme', ''))
  const collapseInChat = page.locator('button[aria-label*="侧"], button[aria-label*="bar"], button[aria-label*="Collapse"], button[aria-label*="收起"]').first()
  if (await collapseInChat.count()) {
    await collapseInChat.click()
    await page.waitForTimeout(700)
  }
  await shot(page, '16-header-after-collapse.png')
  if (await collapseInChat.count()) {
    await collapseInChat.click()
    await page.waitForTimeout(500)
  }
  await page.evaluate(() => document.body?.removeAttribute('data-ds-dark-theme'))

  await openSettings(page)
  const nicoAgain = page.getByText(/^Nico 主题$|^Nico Theme$/).first()
  if (await nicoAgain.count()) await nicoAgain.click()
  await page.waitForTimeout(400)
  await shot(page, '11-settings-refract-scrim.png')
  const dialog = page.locator('[role="dialog"]').first()
  const box = await dialog.boundingBox()
  assertDialogFitsViewport(box, 'refract/scrim')

  await page.keyboard.press('Escape')
  await page.waitForTimeout(300)

  await setAqua(page, { enabled: true, mode: 'mica', refractOn: true, refract: '15' })
  await shot(page, '12-hero-sidebar.png')

  const sessionAgain = page.getByText(/Hindsight|browser-skill/).first()
  if (await sessionAgain.count()) {
    await sessionAgain.click()
    await page.waitForTimeout(1500)
  }
  await page.evaluate(() => {
    const sc = document.querySelector('[data-conversation-scroll]')
    if (sc instanceof HTMLElement) {
      sc.scrollTop = Math.min(280, Math.max(140, Math.floor(sc.scrollHeight * 0.22)))
    }
  })
  await page.waitForTimeout(400)
  await shot(page, '13-chat-layers.png')

  // Dock glass: inject todo + goal fixtures above the composer when the
  // test profile has no live list, then assert frost (not opaque tip fill).
  await page.evaluate(() => {
    if (document.querySelector('[data-testid="todo-panel"]')) return
    const stack = document.querySelector('[class*="composerStack"]')
      ?? document.querySelector('[data-composer-seat]')
    if (!(stack instanceof HTMLElement)) return
    const todo = document.createElement('section')
    todo.setAttribute('data-testid', 'todo-panel')
    todo.style.cssText = 'box-sizing:border-box;width:calc(100% - 64px);max-width:748px;margin:0 auto 8px;border-radius:12px;padding:10px 12px'
    todo.textContent = '任务 6 待处理'
    const goal = document.createElement('div')
    goal.setAttribute('data-goal-bar', '')
    goal.style.cssText = 'width:calc(100% - 64px);max-width:748px;margin:0 auto 8px'
    const bar = document.createElement('div')
    bar.style.cssText = 'height:36px;border-radius:12px;display:flex;align-items:center;padding:0 12px'
    bar.textContent = '目标'
    goal.append(bar)
    stack.prepend(todo, goal)
  })
  await page.waitForTimeout(400)
  const dockGlass = await page.evaluate(() => {
    const todo = document.querySelector('[data-testid="todo-panel"]')
    const bar = document.querySelector('[data-goal-bar] > *')
    const read = (el) => {
      if (!(el instanceof HTMLElement)) return { bg: '', frost: '' }
      const cs = getComputedStyle(el)
      return {
        bg: cs.backgroundColor,
        frost: cs.backdropFilter || cs.webkitBackdropFilter || '',
      }
    }
    return { todo: read(todo), goal: read(bar) }
  })
  await shot(page, '17-dock-glass.png')
  if (!dockGlass.todo.frost || dockGlass.todo.frost === 'none') {
    throw new Error(`todo panel has no frost (${JSON.stringify(dockGlass)})`)
  }
  if (!dockGlass.goal.frost || dockGlass.goal.frost === 'none') {
    throw new Error(`goal bar has no frost (${JSON.stringify(dockGlass)})`)
  }

  const dockPress = await page.evaluate(() => {
    const todo = document.querySelector('[data-testid="todo-panel"]')
    const bar = document.querySelector('[data-goal-bar] > *')
    return {
      todoSpot: todo instanceof HTMLElement && todo.hasAttribute('data-dsh-aqua-spot'),
      goalSpot: bar instanceof HTMLElement && bar.hasAttribute('data-dsh-aqua-spot'),
      press: document.documentElement.hasAttribute('data-dsh-aqua-press'),
    }
  })
  if (!dockPress.todoSpot || !dockPress.goalSpot) {
    throw new Error(`dock panes missing press spot (${JSON.stringify(dockPress)})`)
  }
  await page.locator('[data-testid="todo-panel"]').hover()
  await page.waitForTimeout(200)
  await shot(page, '18-dock-press.png')

  const jobsLive = page.locator('button[aria-label*="后台任务"], button[aria-label*="background jobs" i]').first()
  if (await jobsLive.count()) {
    await jobsLive.click()
    await page.waitForTimeout(400)
  } else {
    await page.evaluate(() => {
      if (document.querySelector('ul[aria-label="后台任务"], ul[aria-label="Background jobs"], [data-dsh-jobs]')) return
      const header = document.querySelector('header')
      if (!(header instanceof HTMLElement)) return
      const ul = document.createElement('ul')
      ul.setAttribute('aria-label', '后台任务')
      ul.style.cssText = 'position:absolute;z-index:100;top:calc(100% + 5px);right:16px;width:336px;border-radius:12px;padding:4px;margin:0;list-style:none'
      for (const label of ['pwsh  1..5 | ForEach-Object {…}', 'pwsh  Start-Sleep -Seconds…']) {
        const li = document.createElement('li')
        li.style.cssText = 'padding:6px 8px;border-radius:8px;font-size:13px'
        li.textContent = label
        ul.append(li)
      }
      header.append(ul)
    })
    await page.waitForTimeout(400)
  }
  const jobsGlass = await page.evaluate(() => {
    const menu = document.querySelector('[data-dsh-jobs]')
    if (!(menu instanceof HTMLElement)) return { stamped: false, frost: '', spot: false }
    const cs = getComputedStyle(menu)
    return {
      stamped: true,
      frost: cs.backdropFilter || cs.webkitBackdropFilter || '',
      spot: menu.hasAttribute('data-dsh-aqua-spot'),
      position: cs.position,
    }
  })
  await shot(page, '19-jobs-glass.png')
  if (!jobsGlass.stamped) throw new Error('jobs popover was not stamped')
  if (!jobsGlass.frost || jobsGlass.frost === 'none') {
    throw new Error(`jobs popover has no frost (${JSON.stringify(jobsGlass)})`)
  }
  if (!jobsGlass.spot) throw new Error(`jobs popover missing press spot (${JSON.stringify(jobsGlass)})`)
  if (jobsGlass.position !== 'absolute') {
    throw new Error(`jobs popover lost absolute positioning (${JSON.stringify(jobsGlass)})`)
  }

  await openSettings(page)
  await page.waitForTimeout(500)
  await shot(page, '14-settings-layers.png')
  const dialog2 = page.locator('[role="dialog"]').first()
  const box2 = await dialog2.boundingBox()
  assertDialogFitsViewport(box2, 'layer')

  const hard = errors.filter((line) => !/favicon|net::ERR/.test(line))
  if (hard.length) {
    console.error('page errors:')
    for (const line of hard) console.error(' ', line)
    process.exitCode = 1
  } else {
    console.log('visual ok, no page errors')
  }
} finally {
  await browser.close()
}
