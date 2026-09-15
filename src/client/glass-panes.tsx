/**
 * Glass pane layer: nico-glass-kit owns the material of every DSH panel.
 *
 * DSH keeps owning its React tree, layout and interactions; this layer only
 * injects an underlay as the host's first child and portals a `GlassSurface`
 * into it. The host loses its own paint (background / border / shadow /
 * backdrop-filter) through the stylesheet, so the kit surface is the single
 * owner of the material.
 *
 * The provider lives in a hidden 0×0 root (rendered, never `display: none` —
 * the kit's SVG filter registry renders inside it). Elasticity is the kit's
 * own spring: it only translates `.ngs-motion`, so the pointer feed comes
 * from the host and the same offset is mirrored onto the host's content boxes
 * to make the panel lean as one piece. Panes whose host clips its own
 * overflow stay rigid (a leaning surface would be cut off by the host).
 */
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { GlassProvider, GlassSurface } from 'nico-glass-kit'
import 'nico-glass-kit/style.css'

/** Marker attribute on a pane host. */
const PANE_ATTRIBUTE = 'data-dsh-nico-pane'
/** Marker attribute on the injected underlay. */
const SURFACE_ATTRIBUTE = 'data-dsh-nico-pane-surface'
/** Marker on a host content element carrying a mirrored lean offset. */
const LEAN_ATTRIBUTE = 'data-dsh-nico-lean'
/** Marker on the hidden provider root. */
const HOST_ATTRIBUTE = 'data-dsh-nico-glass-host'

/** Uniform pane corner radius (the playground default). */
const PANE_RADIUS = 32
/** Kit lens-map raster scale: the kit default, kept explicit for the budget. */
const LENS_MAP_RASTER_SCALE = 0.2
/** Frames of extra sync after the last DOM/layout kick (mount animations). */
const SETTLE_FRAMES = 6

/** Optics subset the settings page exposes (kit scale: refraction/dispersion 0-1). */
export interface GlassPaneOptics {
  blur: number
  brightness: number
  refraction: number
  depth: number
  curvature: number
  dispersion: number
}

/** Operating parameters of the pane layer, derived from the layer settings. */
export interface GlassPaneParams {
  /** mica: kit panes exist. compat: token-level glass only, no panes at all. */
  mica: boolean
  /** Pinned light/dark adaptation — kit's 'auto' cannot sample the WebGL canvas. */
  overLight: boolean
  optics: GlassPaneOptics
  /** Mouse elasticity 0-0.5; 0 also stops the pointer feed. */
  strength: number
  /** Rim-light strength 0-2. */
  highlight: number
}

/** One pane: what to cover, and where to find it. */
interface PaneDef {
  readonly key: string
  readonly select: () => HTMLElement | null
}

/** One resolved pane instance (host element resolved at sync time). */
interface PaneInstance {
  readonly key: string
  readonly host: HTMLElement
  /** Stable per-element id: host swaps must change the render signature. */
  readonly id: number
  /** Host clips its own overflow: the surface must not lean. */
  readonly clips: boolean
}

function first(selector: string): HTMLElement | null {
  const el = document.querySelector(selector)
  return el instanceof HTMLElement ? el : null
}

function sessionHeader(): HTMLElement | null {
  return first('[data-phase="active"] header')
    ?? first('[data-dsh-float] header:not([class*="headerHidden"])')
    ?? first('[data-dsh-float] header')
    ?? first('header')
}

/** The 14 panes, in the same coverage the hand-drawn glass used to have. */
const PANE_DEFS: readonly PaneDef[] = [
  { key: 'sidebar', select: () => first('[class*="sidebarCol"]') },
  { key: 'new-session', select: () => first('[data-dsh-surface]') },
  { key: 'header', select: sessionHeader },
  {
    key: 'composer',
    select: () => first('[data-dsh-inputbar]:has([data-dsh-stats])') ?? first('[data-composer-card]'),
  },
  { key: 'trajectory', select: () => first('[data-dsh-trajectory]') },
  {
    key: 'dock',
    // Fused state: the whole inputbar is the composer pane, so the stats band
    // must not get a second surface inside it.
    select: () => {
      const dock = first('[data-dsh-stats]')
      return dock !== null && dock.closest('[data-dsh-inputbar]') === null ? dock : null
    },
  },
  { key: 'dialog', select: () => first('[role="dialog"]') },
  { key: 'todo', select: () => first('[data-testid="todo-panel"]') },
  { key: 'goal', select: () => first('[data-goal-bar] > *') },
  { key: 'question', select: () => first('[data-question-key] > section') },
  { key: 'plan-review', select: () => first('[data-plan-review-key] > section') },
  { key: 'approval', select: () => first('[data-approval-key] > *') },
  { key: 'queue', select: () => first('[data-queue-dock] > *') },
  { key: 'jobs', select: () => first('[data-dsh-jobs]') },
]

const elementIds = new WeakMap<Element, number>()
let nextElementId = 1

function identityOf(el: Element): number {
  const known = elementIds.get(el)
  if (known !== undefined) return known
  const id = nextElementId
  nextElementId += 1
  elementIds.set(el, id)
  return id
}

/**
 * Whether the host clips its own overflow. `overflow` is static for these
 * hosts, so the value is cached per element instead of read every sync
 * (getComputedStyle forces a style flush). The cache is dropped on the
 * layout/transition kicks that can flip it (the sidebar's collapse swaps
 * `overflow` between the expanded and the rail state).
 */
let clipsCache = new WeakMap<Element, boolean>()

function invalidateClips(entries?: readonly ResizeObserverEntry[]): void {
  if (entries === undefined) {
    clipsCache = new WeakMap()
    return
  }
  for (const entry of entries) clipsCache.delete(entry.target)
}

function clipsOverflow(el: HTMLElement): boolean {
  const cached = clipsCache.get(el)
  if (cached !== undefined) return cached
  const style = getComputedStyle(el)
  const value = style.overflowX !== 'visible' || style.overflowY !== 'visible'
  clipsCache.set(el, value)
  return value
}

const TRANSLATE_PATTERN = /translate3d\(\s*(-?[\d.]+)px,\s*(-?[\d.]+)px/
const DIALOG_SELECTOR = '[role="dialog"]'
const CONTENTS = 'contents'

/** Elements we may write a mirrored lean offset onto. */
function leanTargets(host: HTMLElement, underlay: HTMLElement, containers: Set<Element>): HTMLElement[] {
  const out: HTMLElement[] = []
  const walk = (parent: Element): void => {
    for (const child of parent.children) {
      if (child === underlay || !(child instanceof HTMLElement)) continue
      // A leaning ancestor would become the containing block of the settings
      // overlay (position: fixed inside the sidebar subtree) and trap it in
      // the column — skip it, and let the stylesheet veto stale offsets.
      if (child.querySelector(DIALOG_SELECTOR) !== null) continue
      if (getComputedStyle(child).display === CONTENTS) {
        containers.add(child)
        walk(child)
        continue
      }
      out.push(child)
    }
  }
  walk(host)
  return out
}

interface NicoGlassPaneProps {
  readonly instance: PaneInstance
  readonly params: GlassPaneParams
}

/** One glass pane: host underlay, kit surface portal, pointer feed, lean mirror. */
function NicoGlassPane({ instance, params }: NicoGlassPaneProps) {
  const { host, clips, key } = instance
  const strength = clips ? 0 : params.strength
  const [underlay, setUnderlay] = useState<HTMLDivElement | null>(null)

  // Effect A — inject the underlay as the host's first child and take the
  // host's paint hooks. Every write is reverted on unmount.
  useEffect(() => {
    const el = document.createElement('div')
    el.setAttribute(SURFACE_ATTRIBUTE, '')
    el.setAttribute('aria-hidden', 'true')
    host.insertBefore(el, host.firstChild)
    host.setAttribute(PANE_ATTRIBUTE, key)
    host.style.setProperty('--dsh-nico-pane-radius', `${PANE_RADIUS}px`)
    const wasPositioned = getComputedStyle(host).position !== 'static'
    if (!wasPositioned) host.style.position = 'relative'
    // React may reconcile the host's children while we are mounted; the
    // underlay must stay the first child (the surface paints at z-index -1).
    const keeper = new MutationObserver(() => {
      if (el.parentElement !== host || host.firstElementChild !== el) host.insertBefore(el, host.firstChild)
    })
    keeper.observe(host, { childList: true })
    setUnderlay(el)
    return () => {
      keeper.disconnect()
      setUnderlay(null)
      el.remove()
      if (!wasPositioned && host.style.position === 'relative') host.style.removeProperty('position')
      host.removeAttribute(PANE_ATTRIBUTE)
      host.style.removeProperty('--dsh-nico-pane-radius')
    }
  }, [host, key])

  // Effect B — pointer feed: the underlay is click-transparent, so the host
  // receives the events; the kit's spring listens on the surface container.
  useEffect(() => {
    if (underlay === null || strength <= 0) return
    const forward = (event: PointerEvent): void => {
      const surface = underlay.firstElementChild
      if (surface === null) return
      surface.dispatchEvent(new PointerEvent(event.type, {
        bubbles: false,
        cancelable: false,
        composed: false,
        pointerId: event.pointerId,
        pointerType: event.pointerType,
        isPrimary: event.isPrimary,
        clientX: event.clientX,
        clientY: event.clientY,
      }))
    }
    host.addEventListener('pointermove', forward)
    host.addEventListener('pointerleave', forward)
    host.addEventListener('pointercancel', forward)
    return () => {
      host.removeEventListener('pointermove', forward)
      host.removeEventListener('pointerleave', forward)
      host.removeEventListener('pointercancel', forward)
    }
  }, [host, underlay, strength])

  // Effect C — lean mirror: the kit's spring only translates its own motion
  // layer, so the same offset is written onto the host's content boxes.
  useEffect(() => {
    if (underlay === null || strength <= 0) return
    let targets: HTMLElement[] | null = null
    const containers = new Set<Element>()
    let lastX = 0
    let lastY = 0

    const collect = (): HTMLElement[] => {
      const next = leanTargets(host, underlay, containers)
      targets = next
      return next
    }

    const write = (x: number, y: number): void => {
      const list = targets ?? collect()
      for (const el of list) {
        if (x === 0 && y === 0) {
          el.style.removeProperty('translate')
          el.removeAttribute(LEAN_ATTRIBUTE)
        } else {
          el.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`
          el.setAttribute(LEAN_ATTRIBUTE, '')
        }
      }
    }

    const observers = new Set<Element>()
    const structure = new MutationObserver(() => { targets = null })
    structure.observe(host, { childList: true })

    const motion = new MutationObserver((records) => {
      for (const record of records) {
        const el = record.target
        if (!(el instanceof HTMLElement) || !el.classList.contains('ngs-motion')) continue
        const match = TRANSLATE_PATTERN.exec(el.style.transform)
        const x = match === null ? 0 : Number(match[1])
        const y = match === null ? 0 : Number(match[2])
        // The kit's spring stops within 0.01px of its target; anything under
        // that is "at rest" and must clear the host offset instead of leaving
        // an invisible translate (a live translate is a containing block for
        // the settings overlay).
        const settled = Math.abs(x) < 0.02 && Math.abs(y) < 0.02
        const next = settled ? [0, 0] : [x, y]
        if (next[0] === lastX && next[1] === lastY && targets !== null) continue
        lastX = next[0]
        lastY = next[1]
        write(next[0], next[1])
        // display: contents wrappers are discovered during collection; watch
        // them so their children are re-collected when the app swaps them.
        for (const container of containers) {
          if (observers.has(container)) continue
          observers.add(container)
          structure.observe(container, { childList: true })
        }
      }
    })
    motion.observe(underlay, { subtree: true, attributes: true, attributeFilter: ['style'] })

    return () => {
      structure.disconnect()
      motion.disconnect()
      for (const el of targets ?? []) {
        el.style.removeProperty('translate')
        el.removeAttribute(LEAN_ATTRIBUTE)
      }
    }
  }, [host, underlay, strength])

  if (underlay === null) return null
  return createPortal(
    <GlassSurface
      cornerRadius={PANE_RADIUS}
      optics={params.optics}
      elasticity={strength}
      highlightIntensity={params.highlight}
    />,
    underlay,
  )
}

/** Push the current params into the live pane layer (no-op while unmounted). */
let pushParams: ((params: GlassPaneParams) => void) | null = null

/**
 * Hand fresh knobs to the pane layer.
 * @param params - pane parameters derived from the layer settings.
 */
export function syncGlassPanes(params: GlassPaneParams): void {
  pushParams?.(params)
}

/**
 * Mount the pane layer: a hidden provider root plus a keeper that keeps the
 * pane set in sync with the app's DOM.
 * @param getParams - reads the current pane parameters.
 * @returns a disposer that removes every underlay and host hook.
 */
export function startGlassPanes(getParams: () => GlassPaneParams): () => void {
  const hostEl = document.createElement('div')
  hostEl.setAttribute(HOST_ATTRIBUTE, '')
  hostEl.setAttribute('aria-hidden', 'true')
  hostEl.style.position = 'fixed'
  hostEl.style.top = '0'
  hostEl.style.left = '0'
  hostEl.style.width = '0'
  hostEl.style.height = '0'
  hostEl.style.overflow = 'hidden'
  hostEl.style.pointerEvents = 'none'
  document.body.appendChild(hostEl)
  const reactRoot = createRoot(hostEl)

  let disposed = false
  let params = getParams()
  let paramsKey = ''
  let signature = ''
  let instances: PaneInstance[] = []
  let frame = 0
  let settle = 0
  const observed = new Set<Element>()
  const resizeObserver = typeof ResizeObserver === 'function'
    ? new ResizeObserver((entries) => { invalidateClips(entries); schedule() })
    : null

  const keyOf = (value: GlassPaneParams): string => {
    const o = value.optics
    return `${value.mica ? 1 : 0}/${value.overLight ? 1 : 0}/${value.strength}/${value.highlight}`
      + `/${o.blur}/${o.brightness}/${o.refraction}/${o.depth}/${o.curvature}/${o.dispersion}`
  }

  const render = (): void => {
    reactRoot.render(
      <GlassProvider quality="high" overLight={params.overLight} lensMapRasterScale={LENS_MAP_RASTER_SCALE}>
        {instances.map(instance => (
          <NicoGlassPane key={instance.key} instance={instance} params={params} />
        ))}
      </GlassProvider>,
    )
  }

  const resolve = (): PaneInstance[] => {
    const out: PaneInstance[] = []
    const seen = new Set<HTMLElement>()
    for (const def of PANE_DEFS) {
      const host = def.select()
      if (host === null || seen.has(host)) continue
      seen.add(host)
      out.push({ key: def.key, host, id: identityOf(host), clips: clipsOverflow(host) })
    }
    return out
  }

  const sync = (): void => {
    if (disposed) return
    const nextParams = getParams()
    if (nextParams !== params) {
      params = nextParams
      paramsKey = keyOf(nextParams)
    }
    const next = params.mica ? resolve() : []
    const nextSignature = next.map(i => `${i.key}:${i.id}:${i.clips ? 1 : 0}`).join('|') + `#${paramsKey}`
    if (nextSignature === signature) return
    signature = nextSignature
    instances = next
    render()
  }

  const watch = (): void => {
    if (resizeObserver === null) return
    const sidebar = first('[class*="sidebarCol"]')
    const targets: Array<Element | null> = [
      sidebar,
      sidebar?.parentElement ?? null,
      first('[data-dsh-frame]'),
      first('[data-phase="active"]'),
      first('[data-composer-seat]'),
      document.getElementById('root'),
      ...instances.map(instance => instance.host),
    ]
    for (const el of targets) {
      if (el === null || observed.has(el)) continue
      observed.add(el)
      resizeObserver.observe(el)
    }
  }

  function tick(): void {
    if (disposed) return
    sync()
    watch()
    settle -= 1
    frame = settle > 0 ? window.requestAnimationFrame(tick) : 0
  }

  function schedule(): void {
    if (disposed) return
    settle = SETTLE_FRAMES
    if (frame !== 0) return
    frame = window.requestAnimationFrame(tick)
  }

  const rootNode = document.getElementById('root')
  const mutations = new MutationObserver(() => { schedule() })
  if (rootNode !== null) mutations.observe(rootNode, { childList: true, subtree: true })
  const onResize = (): void => { invalidateClips(); schedule() }
  const onTransitionEnd = (): void => { invalidateClips(); schedule() }
  window.addEventListener('resize', onResize)
  document.addEventListener('transitionend', onTransitionEnd, true)

  pushParams = (next) => {
    if (disposed) return
    params = next
    paramsKey = keyOf(next)
    schedule()
  }
  schedule()

  return () => {
    disposed = true
    pushParams = null
    if (frame !== 0) window.cancelAnimationFrame(frame)
    mutations.disconnect()
    resizeObserver?.disconnect()
    window.removeEventListener('resize', onResize)
    document.removeEventListener('transitionend', onTransitionEnd, true)
    reactRoot.unmount()
    hostEl.remove()
    sweepPaneResidue()
  }
}

/** Remove every pane hook the layer may have left on app-owned nodes. */
function sweepPaneResidue(): void {
  for (const el of document.querySelectorAll(`[${PANE_ATTRIBUTE}]`)) {
    el.removeAttribute(PANE_ATTRIBUTE)
    if (el instanceof HTMLElement) el.style.removeProperty('--dsh-nico-pane-radius')
  }
  for (const el of document.querySelectorAll(`[${SURFACE_ATTRIBUTE}]`)) el.remove()
  for (const el of document.querySelectorAll(`[${LEAN_ATTRIBUTE}]`)) {
    el.removeAttribute(LEAN_ATTRIBUTE)
    if (el instanceof HTMLElement) el.style.removeProperty('translate')
  }
}
