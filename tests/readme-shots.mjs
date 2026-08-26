/**
 * Dark-mode fluid screenshots for README (assets/).
 * Uses the isolated nico-theme-test UI. Does not click Appearance,
 * so it never writes the daily ~/.dsh/settings.yaml.
 */
import { chromium } from 'playwright'
import { mkdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'assets')
const BASE = process.env.NICO_THEME_URL ?? 'http://127.0.0.1:18765'
const VIEWPORT = { width: 1440, height: 900 }

async function waitForShell(page) {
  await page.waitForFunction(() => {
    return Boolean(document.querySelector('[class*="sidebarCol"], [data-dsh-frame], header'))
  }, { timeout: 30_000 })
}

async function darkFluid(page) {
  await page.evaluate(() => {
    localStorage.setItem('dsh.ui-aqua.enabled', 'true')
    localStorage.setItem('dsh.ui-aqua.mode', 'mica')
    localStorage.setItem('dsh.ui-aqua.refractOn', 'true')
    localStorage.setItem('dsh.ui-aqua.refract', '15')
    localStorage.setItem('dsh.ui-aqua.frost', '25')
    localStorage.setItem('dsh.ui-aqua.background', 'fluid')
  })
  await page.reload({ waitUntil: 'domcontentloaded' })
  await waitForShell(page)
  await page.evaluate(() => {
    document.body?.setAttribute('data-ds-dark-theme', '')
  })
  await page.waitForTimeout(1600)
}

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: VIEWPORT })

try {
  await mkdir(OUT, { recursive: true })
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60_000 })
  await waitForShell(page)
  await darkFluid(page)

  await page.screenshot({ path: join(OUT, 'hero-dark.png'), fullPage: false })
  console.log('wrote assets/hero-dark.png')

  const session = page.getByText(/Hindsight|browser-skill|Todo/).first()
  if (await session.count()) {
    await session.click()
    await page.waitForTimeout(1600)
  }
  await page.mouse.move(900, 420)
  await page.evaluate(() => document.body?.setAttribute('data-ds-dark-theme', ''))
  await page.waitForTimeout(500)
  await page.screenshot({ path: join(OUT, 'chat-dark.png'), fullPage: false })
  console.log('wrote assets/chat-dark.png')

  const collapse = page.locator(
    'button[aria-label*="侧"], button[aria-label*="bar"], button[aria-label*="Collapse"], button[aria-label*="收起"]',
  ).first()
  if (await collapse.count()) {
    await collapse.click()
    await page.waitForTimeout(800)
  }
  await page.screenshot({ path: join(OUT, 'rail-dark.png'), fullPage: false })
  console.log('wrote assets/rail-dark.png')

  for (const stale of ['1.png', '2.png', '3.png', '4.png']) {
    await rm(join(OUT, stale), { force: true })
  }
} finally {
  await browser.close()
}
