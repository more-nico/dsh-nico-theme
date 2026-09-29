/**
 * Dark-mode screenshots for README (assets/).
 * Uses an isolated DSH profile. NICO_THEME_DEMO_TITLE may select a known-safe
 * local demo session; without it, the script captures a fresh empty session.
 */
import { chromium } from 'playwright'
import { mkdir, readFile, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'assets')
const BASE = process.env.NICO_THEME_URL ?? 'http://127.0.0.1:18765'
const VIEWPORT = { width: 1440, height: 900 }
const WALLPAPER = process.env.NICO_WALLPAPER ?? ''
const DEMO_TITLE = process.env.NICO_THEME_DEMO_TITLE ?? ''
if (!WALLPAPER) throw new Error('set NICO_WALLPAPER to the wallpaper image used by the README shots')
if (DEMO_TITLE) {
  const host = new URL(BASE).hostname
  if (!['127.0.0.1', 'localhost', '[::1]'].includes(host) || !DEMO_TITLE.startsWith('《悬崖漫步》')) {
    throw new Error('NICO_THEME_DEMO_TITLE only permits the Cliff Walk demo on a local DSH server')
  }
}
const wallpaperUrl = `data:image/jpeg;base64,${(await readFile(WALLPAPER)).toString('base64')}`

async function waitForShell(page) {
  await page.waitForFunction(() => {
    return Boolean(document.querySelector('[class*="sidebarCol"], [data-dsh-frame], header'))
  }, { timeout: 30_000 })
}

async function darkFluid(page) {
  await page.evaluate((url) => {
    localStorage.setItem('dsh.ui-aqua.enabled', 'true')
    localStorage.setItem('dsh.ui-aqua.mode', 'mica')
    localStorage.setItem('dsh.ui-aqua.refractOn', 'true')
    localStorage.setItem('dsh.ui-aqua.refract', '15')
    localStorage.setItem('dsh.ui-aqua.frost', '25')
    localStorage.setItem('dsh.ui-aqua.background', 'wallpaper')
    localStorage.setItem('dsh.ui-aqua.wallpaper', url)
    localStorage.setItem('dsh.ui-aqua.wallpaperBlur', '0')
    localStorage.setItem('dsh.ui-aqua.wallpaperFrost', '0')
  }, wallpaperUrl)
  await page.reload({ waitUntil: 'domcontentloaded' })
  await waitForShell(page)
  await page.evaluate(() => {
    document.body?.setAttribute('data-ds-dark-theme', '')
  })
  await page.waitForTimeout(1600)
}

/* The backdrop ignores clicks, so the sidebar tree is expanded here by hand. */
async function openWorkspace(page) {
  const rows = page.locator('[role="treeitem"]')
  if ((await rows.count()) < 2) {
    await rows.first().click()
    await page.waitForTimeout(900)
  }
}

async function dismissFirstRun(page) {
  // Fresh profiles can show the beta notice and API-key setup dialog.
  // Continue without configuring credentials so screenshots stay private.
  for (let i = 0; i < 6; i += 1) {
    const dialog = page.locator('[role="dialog"]').filter({ visible: true }).first()
    if (!(await dialog.count())) return
    const continueButton = dialog.getByRole('button', { name: /^(继续|稍后配置|跳过)$/ }).first()
    if (!(await continueButton.count())) return
    await continueButton.click()
    await page.waitForTimeout(500)
  }
}

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: VIEWPORT, colorScheme: 'dark' })

try {
  await mkdir(OUT, { recursive: true })
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60_000 })
  await waitForShell(page)
  await darkFluid(page)
  await dismissFirstRun(page)
  await openWorkspace(page)

  if (DEMO_TITLE) {
    const demoSession = page.locator('[role="treeitem"]').filter({ hasText: DEMO_TITLE })
    const matches = await demoSession.count()
    if (matches !== 1) throw new Error(`expected one local demo session matching ${JSON.stringify(DEMO_TITLE)}, found ${matches}`)
    await demoSession.click()
    const workspace = page.locator('[role="treeitem"]').filter({ hasText: /^默认工作区$/ })
    if (await workspace.getAttribute('aria-expanded') === 'true') await workspace.click()
  } else {
    await page.getByRole('button', { name: '新建会话' }).first().click()
  }
  await page.waitForTimeout(1200)
  await page.mouse.move(1120, 560)
  await page.waitForTimeout(700)
  await page.screenshot({ path: join(OUT, 'hero-dark.png'), fullPage: false })
  console.log('wrote assets/hero-dark.png')

  // Keep the second shot on the theme settings view. A selected demo session
  // is opt-in and must be named explicitly by the caller.
  await page.getByRole('button', { name: '设置' }).click()
  await page.getByText('Nico 主题', { exact: true }).click()
  await page.waitForTimeout(1200)
  await page.mouse.move(900, 420)
  await page.evaluate(() => document.body?.setAttribute('data-ds-dark-theme', ''))
  await page.waitForTimeout(700)
  await page.screenshot({ path: join(OUT, 'chat-dark.png'), fullPage: false })
  console.log('wrote assets/chat-dark.png (Nico theme settings)')

  await page.keyboard.press('Escape')
  await page.waitForTimeout(500)
  const collapse = page.locator(
    'button[aria-label*="侧"], button[aria-label*="栏"], button[aria-label*="bar"], button[aria-label*="Collapse"], button[aria-label*="收起"]',
  ).first()
  if (await collapse.count()) {
    await collapse.click()
    await page.waitForTimeout(1200)
  } else {
    console.log('warning: sidebar collapse button not found')
  }
  await page.mouse.move(900, 420)
  await page.waitForTimeout(500)
  await page.screenshot({ path: join(OUT, 'rail-dark.png'), fullPage: false })
  console.log('wrote assets/rail-dark.png')

  for (const stale of ['1.png', '2.png', '3.png', '4.png']) {
    await rm(join(OUT, stale), { force: true })
  }
} finally {
  await browser.close()
}
