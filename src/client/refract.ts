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

/**
 * Exact rounded-rect signed distance function (SDF) from Kyant0/AndroidLiquidGlass.
 */
function sdRoundedRect(coordX: number, coordY: number, halfW: number, halfH: number, radius: number): number {
  const cornerX = Math.abs(coordX) - (halfW - radius)
  const cornerY = Math.abs(coordY) - (halfH - radius)
  const outside = Math.hypot(Math.max(cornerX, 0), Math.max(cornerY, 0)) - radius
  const inside = Math.min(Math.max(cornerX, cornerY), 0)
  return outside + inside
}

/**
 * Analytical rounded-rect gradient (surface normal vector) from Kyant0/AndroidLiquidGlass.
 */
function gradSdRoundedRect(coordX: number, coordY: number, halfW: number, halfH: number, radius: number): [number, number] {
  const cornerX = Math.abs(coordX) - (halfW - radius)
  const cornerY = Math.abs(coordY) - (halfH - radius)
  const sx = coordX >= 0 ? 1 : -1
  const sy = coordY >= 0 ? 1 : -1
  if (cornerX >= 0 || cornerY >= 0) {
    const mx = Math.max(cornerX, 0)
    const my = Math.max(cornerY, 0)
    const len = Math.hypot(mx, my) || 1
    return [sx * (mx / len), sy * (my / len)]
  } else {
    const gradX = cornerY <= cornerX ? 1 : 0
    return [sx * gradX, sy * (1 - gradX)]
  }
}

/**
 * Spherical/toric lens curvature mapping function from Kyant0/AndroidLiquidGlass.
 */
function circleMap(x: number): number {
  const clamped = Math.max(0, Math.min(1, x))
  return 1.0 - Math.sqrt(Math.max(0, 1.0 - clamped * clamped))
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
  
  const halfW = cw * 0.5
  const halfH = ch * 0.5
  const minDim = Math.min(halfW, halfH)
  const r = Math.min(radius, minDim)
  
  // Physical lens parameters inspired by Kyant0/AndroidLiquidGlass
  const refractionHeight = Math.max(10, Math.min(32, minDim * 0.42))
  const refractionAmount = refractionHeight * 1.15
  const depthEffect = 0.32
  
  const data = new Uint8ClampedArray(cw * ch * 4)
  const raw: number[] = []
  let maxScale = 0

  for (let y = 0; y < ch; y += 1) {
    for (let x = 0; x < cw; x += 1) {
      const fx = x + 0.5
      const fy = y + 0.5
      const centeredX = fx - halfW
      const centeredY = fy - halfH
      
      const sd = sdRoundedRect(centeredX, centeredY, halfW, halfH, r)
      let dx = 0
      let dy = 0
      
      if (-sd < refractionHeight) {
        const clampedSd = Math.min(sd, 0)
        const d = circleMap(1.0 - -clampedSd / refractionHeight) * refractionAmount
        const gradRadius = Math.min(r * 1.5, minDim)
        const [gx, gy] = gradSdRoundedRect(centeredX, centeredY, halfW, halfH, gradRadius)
        
        const centerLen = Math.hypot(centeredX, centeredY) || 1
        const cnx = centeredX / centerLen
        const cny = centeredY / centerLen
        
        let vx = gx + depthEffect * cnx
        let vy = gy + depthEffect * cny
        const vLen = Math.hypot(vx, vy) || 1
        vx /= vLen
        vy /= vLen
        
        dx = d * vx
        dy = d * vy
      }
      
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

function updateFilterNodes(filter: SVGElement, baseScale: number, dispersion: number): void {
  const ns = 'http://www.w3.org/2000/svg'
  const image = filter.querySelector('feImage')
  if (!image) return

  while (filter.lastChild && filter.lastChild !== image) {
    filter.removeChild(filter.lastChild)
  }

  if (dispersion <= 0 || baseScale <= 0) {
    const map = document.createElementNS(ns, 'feDisplacementMap')
    map.setAttribute('in', 'SourceGraphic')
    map.setAttribute('in2', 'map')
    map.setAttribute('scale', String(baseScale))
    map.setAttribute('xChannelSelector', 'R')
    map.setAttribute('yChannelSelector', 'G')
    filter.appendChild(map)
  } else {
    // Optical dispersion: separate RGB channels with refractive index offsets
    const dispFrac = (dispersion / 100) * 0.32
    const scaleR = String(Math.min(54, baseScale * (1 + dispFrac)))
    const scaleG = String(baseScale)
    const scaleB = String(Math.max(0, baseScale * (1 - dispFrac)))

    const matR = document.createElementNS(ns, 'feColorMatrix')
    matR.setAttribute('in', 'SourceGraphic')
    matR.setAttribute('type', 'matrix')
    matR.setAttribute('values', '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0')
    matR.setAttribute('result', 'c_r')
    
    const mapR = document.createElementNS(ns, 'feDisplacementMap')
    mapR.setAttribute('in', 'c_r')
    mapR.setAttribute('in2', 'map')
    mapR.setAttribute('scale', scaleR)
    mapR.setAttribute('xChannelSelector', 'R')
    mapR.setAttribute('yChannelSelector', 'G')
    mapR.setAttribute('result', 'd_r')

    const matG = document.createElementNS(ns, 'feColorMatrix')
    matG.setAttribute('in', 'SourceGraphic')
    matG.setAttribute('type', 'matrix')
    matG.setAttribute('values', '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0')
    matG.setAttribute('result', 'c_g')
    
    const mapG = document.createElementNS(ns, 'feDisplacementMap')
    mapG.setAttribute('in', 'c_g')
    mapG.setAttribute('in2', 'map')
    mapG.setAttribute('scale', scaleG)
    mapG.setAttribute('xChannelSelector', 'R')
    mapG.setAttribute('yChannelSelector', 'G')
    mapG.setAttribute('result', 'd_g')

    const matB = document.createElementNS(ns, 'feColorMatrix')
    matB.setAttribute('in', 'SourceGraphic')
    matB.setAttribute('type', 'matrix')
    matB.setAttribute('values', '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0')
    matB.setAttribute('result', 'c_b')
    
    const mapB = document.createElementNS(ns, 'feDisplacementMap')
    mapB.setAttribute('in', 'c_b')
    mapB.setAttribute('in2', 'map')
    mapB.setAttribute('scale', scaleB)
    mapB.setAttribute('xChannelSelector', 'R')
    mapB.setAttribute('yChannelSelector', 'G')
    mapB.setAttribute('result', 'd_b')

    const blendRG = document.createElementNS(ns, 'feComposite')
    blendRG.setAttribute('in', 'd_r')
    blendRG.setAttribute('in2', 'd_g')
    blendRG.setAttribute('operator', 'arithmetic')
    blendRG.setAttribute('k1', '0')
    blendRG.setAttribute('k2', '1')
    blendRG.setAttribute('k3', '1')
    blendRG.setAttribute('k4', '0')
    blendRG.setAttribute('result', 'd_rg')

    const blendRGB = document.createElementNS(ns, 'feComposite')
    blendRGB.setAttribute('in', 'd_rg')
    blendRGB.setAttribute('in2', 'd_b')
    blendRGB.setAttribute('operator', 'arithmetic')
    blendRGB.setAttribute('k1', '0')
    blendRGB.setAttribute('k2', '1')
    blendRGB.setAttribute('k3', '1')
    blendRGB.setAttribute('k4', '0')

    filter.append(matR, mapR, matG, mapG, matB, mapB, blendRG, blendRGB)
  }
}

function paintFilter(
  id: FilterId,
  width: number,
  height: number,
  radiusPx: number,
  strength: number,
  dispersion: number = 0,
): boolean {
  const filter = document.getElementById(id)
  if (!(filter instanceof SVGElement)) return false
  const image = filter.querySelector('feImage')
  if (!(image instanceof SVGFEImageElement)) return false

  const w = Math.max(8, Math.round(width))
  const h = Math.max(8, Math.round(height))
  const r = Math.max(1, radiusPx)
  image.setAttribute('x', '0')
  image.setAttribute('y', '0')
  image.setAttribute('width', String(w))
  image.setAttribute('height', String(h))

  const qw = quantizeSize(w)
  const qh = quantizeSize(h)
  const key = `${qw}x${qh}r${Math.round(r)}s${Math.round(strength * 100)}d${Math.round(dispersion)}`
  if (refractCache.get(id) === key) return true

  const built = buildDisplacementMap(qw, qh, r)
  if (built.href === '') return false
  image.setAttribute('href', built.href)
  image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', built.href)
  
  const baseScale = Math.min(48, built.scale * strength)
  updateFilterNodes(filter, baseScale, dispersion)
  
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
  dispersion: number = 0,
): string {
  const box = el.getBoundingClientRect()
  if (strength <= 0 || box.width < 8 || box.height < 8 || !supportsRefract() || reducedTransparency()) {
    return frostStack(undefined, blurPx)
  }
  if (!paintFilter(filterId, box.width, box.height, readRadius(el, radiusFallback), strength, dispersion)) {
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
  dispersion: number = 0,
): void {
  if (el === null) return
  const layer = mountEffect(el)
  const stack = stackFor(el, filterId, strength, blurPx, radiusFallback, dispersion)
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
  dispersion: number = 0,
): void {
  if (el === null) return
  const stack = stackFor(el, filterId, strength, blurPx, radiusFallback, dispersion)
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
  dispersion?: number
  specular?: number
}

export function syncRefraction(prefs: RefractPrefs): void {
  const body = document.body
  if (body === null) return
  const on = prefs.enabled && prefs.mica && prefs.refractOn && prefs.refract > 0
    && !reducedTransparency()
  body.toggleAttribute('data-dsh-nico-refract', on)
  const strength = on ? Math.max(0, Math.min(1, prefs.refract / 100)) : 0
  const dispersion = on ? Math.max(0, Math.min(100, prefs.dispersion ?? 25)) : 0
  const frost = refractBlur(prefs.blur, strength)

  applyFxLayer(first('[class*="sidebarCol"]'), REFRACT_FILTERS.sidebar, strength * STRENGTH.sidebar, frost, 20, dispersion)
  applyFxLayer(sessionHeader(), REFRACT_FILTERS.header, strength * STRENGTH.header, frost, 18, dispersion)
  const inputbar = first('[data-dsh-inputbar]:has([data-dsh-stats])') ?? first('[data-composer-card]')
  applyFxHost(inputbar, REFRACT_FILTERS.composer, strength * STRENGTH.composer, frost, 24, dispersion)
  applyFxHost(first('[data-dsh-trajectory]'), REFRACT_FILTERS.trajectory, strength * STRENGTH.trajectory, frost, 18, dispersion)
  const dock = first('[data-dsh-stats]')
  if (dock !== null && dock !== inputbar) {
    applyFxHost(dock, REFRACT_FILTERS.dock, strength * STRENGTH.dock, frost, 999, dispersion)
  }
  applyFxHost(first('[role="dialog"]'), REFRACT_FILTERS.dialog, strength * STRENGTH.dialog, frost, 16, dispersion)
  applyFxHost(todoPanel(), REFRACT_FILTERS.todo, strength * STRENGTH.todo, frost, 12, dispersion)
  applyFxHost(goalBar(), REFRACT_FILTERS.goal, strength * STRENGTH.goal, frost, 12, dispersion)
  applyFxHost(questionCard(), REFRACT_FILTERS.question, strength * STRENGTH.question, frost, 20, dispersion)
  applyFxHost(planReviewCard(), REFRACT_FILTERS.planReview, strength * STRENGTH.planReview, frost, 20, dispersion)
  applyFxHost(approvalCard(), REFRACT_FILTERS.approval, strength * STRENGTH.approval, frost, 20, dispersion)
  applyFxHost(queuePanel(), REFRACT_FILTERS.queue, strength * STRENGTH.queue, frost, 12, dispersion)
  applyFxHost(jobsMenu(), REFRACT_FILTERS.jobs, strength * STRENGTH.jobs, frost, 12, dispersion)
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
