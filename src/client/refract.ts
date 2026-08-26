/**
 * Liquid-glass refraction: rounded-rect SDF displacement maps fed into
 * SVG feDisplacementMap, then stacked with blur/saturate on --dsh-aqua-fx.
 * Ported from more-nico/dshLiquidTheme (no adaptive ink).
 */

const SVG_ID = 'dsh-nico-refract-root'

export const REFRACT_FILTERS = {
  sidebar: 'dsh-nico-refract-sidebar',
  header: 'dsh-nico-refract-header',
  composer: 'dsh-nico-refract-composer',
  trajectory: 'dsh-nico-refract-trajectory',
  dock: 'dsh-nico-refract-dock',
  dialog: 'dsh-nico-refract-dialog',
  todo: 'dsh-nico-refract-todo',
  goal: 'dsh-nico-refract-goal',
  question: 'dsh-nico-refract-question',
  planReview: 'dsh-nico-refract-plan-review',
  approval: 'dsh-nico-refract-approval',
  queue: 'dsh-nico-refract-queue',
  jobs: 'dsh-nico-refract-jobs',
} as const

type FilterId = (typeof REFRACT_FILTERS)[keyof typeof REFRACT_FILTERS]

const STRENGTH: Record<keyof typeof REFRACT_FILTERS, number> = {
  sidebar: 0.42,
  header: 0.55,
  composer: 0.62,
  trajectory: 0.28,
  dock: 0.62,
  dialog: 0.5,
  todo: 0.62,
  goal: 0.5,
  question: 0.58,
  planReview: 0.58,
  approval: 0.58,
  queue: 0.5,
  jobs: 0.5,
}

function smoothStep(a: number, b: number, t: number): number {
  const x = Math.max(0, Math.min(1, (t - a) / (b - a)))
  return x * x * (3 - 2 * x)
}

function roundedRectSDF(x: number, y: number, halfW: number, halfH: number, radius: number): number {
  const qx = Math.abs(x) - halfW + radius
  const qy = Math.abs(y) - halfH + radius
  return Math.min(Math.max(qx, qy), 0)
    + Math.hypot(Math.max(qx, 0), Math.max(qy, 0))
    - radius
}

function quantizeSize(n: number): number {
  return Math.max(8, Math.round(n / 16) * 16)
}

function readRadius(el: Element, fallback: number): number {
  const n = parseFloat(getComputedStyle(el).borderTopLeftRadius)
  return Number.isFinite(n) ? n : fallback
}

export function supportsRefract(): boolean {
  try {
    return typeof CSS !== 'undefined'
      && CSS.supports('backdrop-filter', `url(#${REFRACT_FILTERS.sidebar}) blur(1px)`)
  } catch {
    return false
  }
}

export function reducedTransparency(): boolean {
  return typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-transparency: reduce)').matches
}

export function frostStack(filterId: string | undefined, blurPx: number): string {
  const blur = Math.max(0, blurPx)
  const url = filterId ? `url(#${filterId}) ` : ''
  return `${url}blur(${blur}px) saturate(100%) contrast(1) brightness(1.08)`
}

export function refractBlur(blur: number, strength: number): number {
  if (strength <= 0) return blur
  return Math.max(0.35, blur * (1 - strength) ** 1.6 + 1.4 * strength)
}

function mountSvg(): SVGSVGElement {
  const existing = document.getElementById(SVG_ID)
  if (existing instanceof SVGSVGElement) return existing
  const ns = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(ns, 'svg')
  svg.id = SVG_ID
  svg.setAttribute('xmlns', ns)
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.setAttribute('aria-hidden', 'true')
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden'
  const defs = document.createElementNS(ns, 'defs')
  for (const id of Object.values(REFRACT_FILTERS)) {
    const filter = document.createElementNS(ns, 'filter')
    filter.id = id
    filter.setAttribute('filterUnits', 'objectBoundingBox')
    filter.setAttribute('primitiveUnits', 'userSpaceOnUse')
    filter.setAttribute('color-interpolation-filters', 'sRGB')
    filter.setAttribute('x', '0')
    filter.setAttribute('y', '0')
    filter.setAttribute('width', '1')
    filter.setAttribute('height', '1')
    const image = document.createElementNS(ns, 'feImage')
    image.setAttribute('result', 'map')
    image.setAttribute('x', '0')
    image.setAttribute('y', '0')
    image.setAttribute('width', '1')
    image.setAttribute('height', '1')
    image.setAttribute('preserveAspectRatio', 'none')
    const map = document.createElementNS(ns, 'feDisplacementMap')
    map.setAttribute('in', 'SourceGraphic')
    map.setAttribute('in2', 'map')
    map.setAttribute('scale', '0')
    map.setAttribute('xChannelSelector', 'R')
    map.setAttribute('yChannelSelector', 'G')
    filter.append(image, map)
    defs.append(filter)
  }
  svg.append(defs)
  document.body.prepend(svg)
  return svg
}

let refractCanvas: HTMLCanvasElement | null = null
const refractCache = new Map<string, string>()

function getRefractCanvas(w: number, h: number): HTMLCanvasElement {
  if (refractCanvas === null) refractCanvas = document.createElement('canvas')
  if (refractCanvas.width !== w) refractCanvas.width = w
  if (refractCanvas.height !== h) refractCanvas.height = h
  return refractCanvas
}

function buildDisplacementMap(width: number, height: number, radiusPx: number): {
  href: string
  scale: number
} {
  const maxDim = 192
  const ratio = Math.min(1, maxDim / Math.max(width, height))
  const cw = Math.max(16, Math.round(width * ratio))
  const ch = Math.max(16, Math.round(height * ratio))
  const radius = Math.max(1, radiusPx * ratio)
  const rim = Math.max(18, Math.min(34, Math.min(width, height) * 0.11)) * ratio
  const innerW = Math.max(cw / 2 - rim, cw * 0.22)
  const innerH = Math.max(ch / 2 - rim, ch * 0.22)
  const data = new Uint8ClampedArray(cw * ch * 4)
  const raw: number[] = []
  let maxScale = 0

  for (let y = 0; y < ch; y += 1) {
    for (let x = 0; x < cw; x += 1) {
      const fx = x + 0.5
      const fy = y + 0.5
      const ix = fx / cw - 0.5
      const iy = fy / ch - 0.5
      const d = roundedRectSDF(fx - cw / 2, fy - ch / 2, innerW, innerH, Math.min(radius, innerW, innerH))
      const displacement = smoothStep(0.8, 0, d / rim - 0.15)
      const scaled = smoothStep(0, 1, displacement)
      const dx = (ix * scaled + 0.5) * cw - fx
      const dy = (iy * scaled + 0.5) * ch - fy
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy))
      raw.push(dx, dy)
    }
  }

  maxScale = Math.max(maxScale, 0.0001) * 0.5
  let index = 0
  for (let i = 0; i < data.length; i += 4) {
    data[i] = (raw[index++] / maxScale + 0.5) * 255
    data[i + 1] = (raw[index++] / maxScale + 0.5) * 255
    data[i + 2] = 0
    data[i + 3] = 255
  }

  const canvas = getRefractCanvas(cw, ch)
  const ctx = canvas.getContext('2d')
  if (ctx === null) return { href: '', scale: 0 }
  ctx.putImageData(new ImageData(data, cw, ch), 0, 0)
  return { href: canvas.toDataURL('image/png'), scale: maxScale / ratio }
}

function findFilterParts(id: string): {
  image: SVGFEImageElement
  map: SVGFEDisplacementMapElement
} | null {
  const filter = document.getElementById(id)
  if (filter === null) return null
  const image = filter.querySelector('feImage')
  const map = filter.querySelector('feDisplacementMap')
  if (!(image instanceof SVGFEImageElement) || !(map instanceof SVGFEDisplacementMapElement)) return null
  return { image, map }
}

function paintFilter(id: FilterId, width: number, height: number, radiusPx: number, strength: number): boolean {
  const parts = findFilterParts(id)
  if (parts === null) return false
  const w = Math.max(8, Math.round(width))
  const h = Math.max(8, Math.round(height))
  const r = Math.max(1, radiusPx)
  parts.image.setAttribute('x', '0')
  parts.image.setAttribute('y', '0')
  parts.image.setAttribute('width', String(w))
  parts.image.setAttribute('height', String(h))

  const qw = quantizeSize(w)
  const qh = quantizeSize(h)
  const key = `${qw}x${qh}r${Math.round(r)}s${Math.round(strength * 100)}`
  if (refractCache.get(id) === key) return true

  const built = buildDisplacementMap(qw, qh, r)
  if (built.href === '') return false
  parts.image.setAttribute('href', built.href)
  parts.image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', built.href)
  parts.map.setAttribute('scale', String(Math.min(48, built.scale * strength)))
  refractCache.set(id, key)
  return true
}

const EFFECT_ATTR = 'data-dsh-nico-effect'

function mountEffect(el: HTMLElement): HTMLElement {
  const existing = el.querySelector(`:scope > [${EFFECT_ATTR}]`)
  if (existing instanceof HTMLElement) return existing
  const layer = document.createElement('div')
  layer.setAttribute(EFFECT_ATTR, '')
  layer.setAttribute('aria-hidden', 'true')
  el.insertBefore(layer, el.firstChild)
  return layer
}

function stackFor(
  el: HTMLElement,
  filterId: FilterId,
  strength: number,
  blurPx: number,
  radiusFallback: number,
): string {
  const box = el.getBoundingClientRect()
  if (strength <= 0 || box.width < 8 || box.height < 8 || !supportsRefract() || reducedTransparency()) {
    return frostStack(undefined, blurPx)
  }
  if (!paintFilter(filterId, box.width, box.height, readRadius(el, radiusFallback), strength)) {
    return frostStack(undefined, blurPx)
  }
  return frostStack(filterId, blurPx)
}

/** Frost on an empty child so SDF displacement never filters the pane's content. */
function applyFxLayer(
  el: HTMLElement | null,
  filterId: FilterId,
  strength: number,
  blurPx: number,
  radiusFallback: number,
): void {
  if (el === null) return
  const layer = mountEffect(el)
  const stack = stackFor(el, filterId, strength, blurPx, radiusFallback)
  // Same url(#id) string after a width change still points at a rewritten
  // feImage; Chromium keeps the old backdrop snapshot unless the property
  // actually changes. Drop and restore so the map retargets the new box.
  if (layer.style.backdropFilter === stack) layer.style.backdropFilter = 'none'
  layer.style.backdropFilter = stack
  el.style.removeProperty('--dsh-aqua-fx')
}

/** Host-variable frost for panes that already consume --dsh-aqua-fx in CSS. */
function applyFxHost(
  el: HTMLElement | null,
  filterId: FilterId,
  strength: number,
  blurPx: number,
  radiusFallback: number,
): void {
  if (el === null) return
  const stack = stackFor(el, filterId, strength, blurPx, radiusFallback)
  // Same url(#id) after a size change still points at a rewritten feImage;
  // drop and restore so Chromium picks up the new map (todo expand, etc.).
  if (el.style.getPropertyValue('--dsh-aqua-fx') === stack) el.style.setProperty('--dsh-aqua-fx', 'none')
  el.style.setProperty('--dsh-aqua-fx', stack)
}

function first(selector: string): HTMLElement | null {
  const el = document.querySelector(selector)
  return el instanceof HTMLElement ? el : null
}

function sessionHeader(): HTMLElement | null {
  return first('[data-phase="active"] header')
    ?? first('[data-dsh-float] header:not([class*="headerHidden"])')
    ?? first('[data-dsh-float] header, header')
}

function todoPanel(): HTMLElement | null {
  return first('[data-testid="todo-panel"]')
}

function goalBar(): HTMLElement | null {
  return first('[data-goal-bar] > *')
}

function questionCard(): HTMLElement | null {
  return first('[data-question-key] > section')
}

function planReviewCard(): HTMLElement | null {
  return first('[data-plan-review-key] > section')
}

function approvalCard(): HTMLElement | null {
  return first('[data-approval-key] > *')
}

function queuePanel(): HTMLElement | null {
  return first('[data-queue-dock] > *')
}

function jobsMenu(): HTMLElement | null {
  return first('[data-dsh-jobs]')
}

export interface RefractPrefs {
  enabled: boolean
  mica: boolean
  blur: number
  refract: number
  refractOn: boolean
}

export function syncRefraction(prefs: RefractPrefs): void {
  const body = document.body
  if (body === null) return
  const on = prefs.enabled && prefs.mica && prefs.refractOn && prefs.refract > 0
    && !reducedTransparency()
  body.toggleAttribute('data-dsh-nico-refract', on)
  const strength = on ? Math.max(0, Math.min(1, prefs.refract / 100)) : 0
  const frost = refractBlur(prefs.blur, strength)

  applyFxLayer(first('[class*="sidebarCol"]'), REFRACT_FILTERS.sidebar, strength * STRENGTH.sidebar, frost, 20)
  applyFxLayer(sessionHeader(), REFRACT_FILTERS.header, strength * STRENGTH.header, frost, 18)
  const inputbar = first('[data-dsh-inputbar]:has([data-dsh-stats])') ?? first('[data-composer-card]')
  applyFxHost(inputbar, REFRACT_FILTERS.composer, strength * STRENGTH.composer, frost, 24)
  applyFxHost(first('[data-dsh-trajectory]'), REFRACT_FILTERS.trajectory, strength * STRENGTH.trajectory, frost, 18)
  const dock = first('[data-dsh-stats]')
  if (dock !== null && dock !== inputbar) {
    applyFxHost(dock, REFRACT_FILTERS.dock, strength * STRENGTH.dock, frost, 999)
  }
  applyFxHost(first('[role="dialog"]'), REFRACT_FILTERS.dialog, strength * STRENGTH.dialog, frost, 16)
  applyFxHost(todoPanel(), REFRACT_FILTERS.todo, strength * STRENGTH.todo, frost, 12)
  applyFxHost(goalBar(), REFRACT_FILTERS.goal, strength * STRENGTH.goal, frost, 12)
  applyFxHost(questionCard(), REFRACT_FILTERS.question, strength * STRENGTH.question, frost, 20)
  applyFxHost(planReviewCard(), REFRACT_FILTERS.planReview, strength * STRENGTH.planReview, frost, 20)
  applyFxHost(approvalCard(), REFRACT_FILTERS.approval, strength * STRENGTH.approval, frost, 20)
  applyFxHost(queuePanel(), REFRACT_FILTERS.queue, strength * STRENGTH.queue, frost, 12)
  applyFxHost(jobsMenu(), REFRACT_FILTERS.jobs, strength * STRENGTH.jobs, frost, 12)
}

function clearFx(): void {
  for (const el of document.querySelectorAll('[style*="--dsh-aqua-fx"]')) {
    if (el instanceof HTMLElement) el.style.removeProperty('--dsh-aqua-fx')
  }
  for (const el of document.querySelectorAll(`[${EFFECT_ATTR}]`)) el.remove()
  document.body?.removeAttribute('data-dsh-nico-refract')
  refractCache.clear()
}

/** Mount SVG filters and keep refraction maps in sync with layout. */
export function startRefraction(getPrefs: () => RefractPrefs): () => void {
  mountSvg()
  let raf = 0
  let stable = 0
  let lastSig = ''
  const watched = new Set<Element>()

  const sizeSig = (): string => {
    const nodes = [
      first('[class*="sidebarCol"]'),
      first('[data-phase="active"]'),
      sessionHeader(),
      first('[data-dsh-inputbar]:has([data-dsh-stats])') ?? first('[data-composer-card]'),
      first('[data-dsh-trajectory]'),
      todoPanel(),
      goalBar(),
      questionCard(),
      planReviewCard(),
      approvalCard(),
      queuePanel(),
      jobsMenu(),
    ]
    return nodes.map((el) => {
      if (el === null) return '0'
      const box = el.getBoundingClientRect()
      return `${Math.round(box.width)}x${Math.round(box.height)}`
    }).join('|')
  }

  // Sidebar grid is 300ms; keep painting until width is quiet for ~24 frames
  // so the SDF map is not left at the pre-collapse pixel size (vertical seam
  // on the sidebar OR the header, which grows when the rail shrinks).
  const pulse = (): void => {
    stable = 0
    if (raf !== 0) return
    const step = (): void => {
      const sig = sizeSig()
      if (sig !== lastSig) {
        lastSig = sig
        stable = 0
        syncRefraction(getPrefs())
      } else {
        stable += 1
      }
      raf = stable < 24 ? window.requestAnimationFrame(step) : 0
    }
    raf = window.requestAnimationFrame(step)
  }

  const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(pulse) : null

  const attachWatches = (): void => {
    if (ro === null) return
    const sidebar = first('[class*="sidebarCol"]')
    const targets: Array<Element | null> = [
      sidebar,
      sidebar?.parentElement ?? null,
      first('[data-dsh-frame]'),
      first('[data-phase="active"]'),
      sessionHeader(),
      first('[data-dsh-inputbar]:has([data-dsh-stats])') ?? first('[data-composer-card]'),
      first('[data-dsh-trajectory]'),
      first('[data-composer-seat]'),
      todoPanel(),
      goalBar(),
      questionCard(),
      planReviewCard(),
      approvalCard(),
      queuePanel(),
      jobsMenu(),
      document.getElementById('root'),
    ]
    for (const el of targets) {
      if (el === null || watched.has(el)) continue
      watched.add(el)
      ro.observe(el)
    }
  }

  const schedule = (records?: MutationRecord[]): void => {
    const collapsed = records?.some((rec) => rec.type === 'attributes' && rec.attributeName === 'data-sidebar-collapsed')
    if (collapsed) lastSig = ''
    pulse()
    attachWatches()
  }

  const root = document.getElementById('root')
  const observer = new MutationObserver(schedule)
  if (root !== null) {
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-sidebar-collapsed'],
    })
  }
  const kick = (): void => {
    lastSig = ''
    pulse()
  }
  window.addEventListener('resize', kick)
  document.addEventListener('transitionrun', kick, true)
  document.addEventListener('transitionstart', kick, true)
  document.addEventListener('transitionend', kick, true)
  attachWatches()
  pulse()
  return () => {
    if (raf !== 0) window.cancelAnimationFrame(raf)
    observer.disconnect()
    ro?.disconnect()
    window.removeEventListener('resize', kick)
    document.removeEventListener('transitionrun', kick, true)
    document.removeEventListener('transitionstart', kick, true)
    document.removeEventListener('transitionend', kick, true)
    clearFx()
    document.getElementById(SVG_ID)?.remove()
  }
}
