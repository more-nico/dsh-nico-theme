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
 * to make the panel lean as one piece. Only moves that land on the pane's own
 * box are fed — floating overlays are fixed DOM descendants of a host (the
 * settings dialog lives inside the sidebar column) and their moves would
 * otherwise drag the glass toward a pointer that is nowhere near it. Panes
 * share the same material settings. The settings window stays stationary:
 * its clipped scroll area contains independently animated glass controls.
 */
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { createPortal, flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { GlassProvider, GlassSurface } from 'nico-glass-kit'
import 'nico-glass-kit/style.css'
import { guardLensResize } from './lens-resize-guard'

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
  readonly select: () => HTMLElement | readonly HTMLElement[] | null
}

/** One resolved pane instance (host element resolved at sync time). */
interface PaneInstance {
  readonly key: string
  readonly host: HTMLElement
  /** Stable per-element id: host swaps must change the render signature. */
  readonly id: number
  readonly compact: boolean
}

function first(selector: string): HTMLElement | null {
  const el = document.querySelector(selector)
  return el instanceof HTMLElement ? el : null
}

function all(selector: string): HTMLElement[] {
  return [...document.querySelectorAll(selector)].filter((el): el is HTMLElement => el instanceof HTMLElement)
}

function sessionHeader(): HTMLElement | null {
  return first('[data-phase="active"] header')
    ?? first('[data-dsh-float] header:not([class*="headerHidden"])')
    ?? first('[data-dsh-float] header')
    ?? first('header')
}

/** Persistent panes and every live instance of transient panels. */
const PANE_DEFS: readonly PaneDef[] = [
  { key: 'sidebar', select: () => first('[class*="sidebarCol"]') },
  { key: 'rightbar', select: () => all('[data-sidebar-right-panel][data-sidebar-right-open="true"]') },
  { key: 'rail-button', select: () => all('[data-sidebar-collapsed] [data-dsh-sidebar-root] :is(button[class*="toggle"], button[class*="newSession"], button[class*="panelRow"], button[class*="iconButton"], button[class*="searchButton"], button[class*="trigger"][class*="rail"]):not([role="dialog"] *):not([role="menu"] *)') },
  { key: 'new-session', select: () => first('[data-dsh-surface]') },
  { key: 'header', select: sessionHeader },
  { key: 'composer', select: () => first('[data-composer-card]') },
  { key: 'dialog', select: () => all('[role="dialog"]') },
  { key: 'menu', select: () => all('[role="menu"]:not([data-dsh-nico-model-menu] *), [data-dsh-nico-model-menu]') },
  { key: 'agent-menu', select: () => all('[class*="menu"]:has(> [role="tree"][class*="menuBody"])') },
  { key: 'tooltip', select: () => all('[role="tooltip"]') },
  // Reply actions keep the shared capsule layout but use the reading pad.
  // Their usage dialog is portaled separately and still resolves above.
  { key: 'control-group', select: () => all('[data-dsh-nico-control-group]:not([data-clock="end"]):not([data-dsh-inputbar] > [class*="dock"]):not([data-sidebar-collapsed] [data-dsh-sidebar-root] *)') },
  { key: 'icon-control', select: () => all('[data-dsh-nico-icon-control]:not([data-dsh-nico-control-group] *)') },
  { key: 'select-trigger', select: () => all('button[aria-haspopup]:not([aria-haspopup="tree"]):not([data-dsh-surface]):not([data-dsh-nico-control-group] *):not([data-dsh-nico-icon-control]), [data-dsh-nico-select-control], [data-dsh-inputbar] > [class*="dock"] button[aria-haspopup]') },
  // A trigger menu's listbox is its scroll viewport, not a second panel.
  { key: 'listbox', select: () => all('[role="listbox"]:not(.ngs-surface):not([data-trigger-menu] *)') },
  { key: 'trigger', select: () => all('[data-trigger-menu]') },
  { key: 'todo', select: () => all('[data-testid="todo-panel"]') },
  { key: 'goal', select: () => all('[data-goal-bar] > *') },
  { key: 'question', select: () => all('[data-question-key] > section') },
  { key: 'plan-review', select: () => all('[data-plan-review-key] > section') },
  { key: 'approval', select: () => all('[data-approval-key] > *') },
  { key: 'queue', select: () => all('[data-queue-dock] > *') },
  { key: 'jobs', select: () => all('[data-dsh-jobs]') },
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

const TRANSLATE_PATTERN = /translate3d\(\s*(-?[\d.]+)px,\s*(-?[\d.]+)px/
const DIALOG_SELECTOR = '[role="dialog"]'
const CONTENTS = 'contents'

/** Elements we may write a mirrored lean offset onto. */
function leanTargets(host: HTMLElement, underlay: HTMLElement, containers: Set<Element>): (HTMLElement | SVGElement)[] {
  const out: (HTMLElement | SVGElement)[] = []
  const walk = (parent: Element): void => {
    for (const child of parent.children) {
      // Icons can be direct SVG children of a button; mirror their offset too.
      if (child === underlay || !(child instanceof HTMLElement || child instanceof SVGElement)) continue
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
  const { host, key, compact } = instance
  const collapsedSidebar = key === 'sidebar' && host.closest('[data-sidebar-collapsed]') !== null
  // Moving both the underlay and the settings content creates separate
  // compositor layers inside a clipped dialog, including nested SVG-backed
  // glass controls. Keep the window's geometry fixed; its controls still
  // receive the configured elasticity through ControlMaterialContext.
  const strength = host.matches('[data-shortcut-modal="settings"]')
    || (collapsedSidebar && host.querySelector(DIALOG_SELECTOR) !== null) ? 0 : params.strength
  const radius = ['select-trigger', 'control-group', 'icon-control', 'rail-button', 'new-session'].includes(key) ? 999 : compact ? 18 : PANE_RADIUS
  // File previews need a little more separation from the wallpaper. Keep the
  // kit's scheme-adaptive neutral tint; only strengthen the rightbar material.
  const optics = useMemo(() => key === 'rightbar'
    ? { ...params.optics, tintStrength: 0.35 }
    : params.optics, [key, params.optics.blur, params.optics.brightness,
    params.optics.refraction, params.optics.depth, params.optics.curvature, params.optics.dispersion])
  const [underlay, setUnderlay] = useState<HTMLDivElement | null>(null)

  // Effect A — inject the underlay as the host's first child and take the
  // host's paint hooks. Every write is reverted on unmount.
  useLayoutEffect(() => {
    const el = document.createElement('div')
    el.setAttribute(SURFACE_ATTRIBUTE, '')
    el.setAttribute('aria-hidden', 'true')
    host.insertBefore(el, host.firstChild)
    host.setAttribute(PANE_ATTRIBUTE, key)
    host.style.setProperty('--dsh-nico-pane-radius', `${radius}px`)
    host.toggleAttribute('data-dsh-nico-compact', compact)
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
      host.removeAttribute('data-dsh-nico-compact')
      host.style.removeProperty('--dsh-nico-pane-radius')
    }
  }, [host, key, radius, compact])

  useLayoutEffect(() => {
    if (underlay === null) return
    return guardLensResize(underlay)
  }, [underlay])

  // DSH owns the option rows outside the portal. Mirror the kit's actual
  // selection palette so those rows match GlassSelect without a second tint.
  useLayoutEffect(() => {
    if (underlay === null) return
    const surface = underlay.firstElementChild
    if (!(surface instanceof HTMLElement)) return
    const palette = {
      '--dsh-nico-selection': '--ngs-active-bg',
      '--dsh-nico-hover': '--ngs-tint-hover',
      '--dsh-nico-control-text': '--ngs-text',
      '--dsh-nico-control-muted': '--ngs-text-dim',
      '--dsh-nico-control-rim': '--ngs-rim-top-soft',
    }
    const copy = (): void => {
      const style = getComputedStyle(surface)
      for (const [target, source] of Object.entries(palette)) host.style.setProperty(target, style.getPropertyValue(source))
    }
    copy()
    const observer = new MutationObserver(copy)
    observer.observe(surface, { attributes: true, attributeFilter: ['data-ngs-light'] })
    return () => {
      observer.disconnect()
      for (const target of Object.keys(palette)) host.style.removeProperty(target)
    }
  }, [host, underlay, params.overLight])

  // Effect B — pointer feed: the underlay is click-transparent, so the host
  // receives the events; the kit's spring listens on the surface container.
  // Moves are only fed while the pointer is on the pane's own box: a floating
  // overlay is a fixed DOM descendant of the host (the settings dialog renders
  // inside the sidebar column), so its moves bubble through the host from a
  // point far outside the panel, and the kit maps the raw pointer position onto
  // the surface without clamping — the glass would glide along with a cursor
  // sitting on the other side of the screen. Off-pane moves are fed as a
  // `pointerleave` instead, which parks the spring back at rest.
  useEffect(() => {
    if (underlay === null || strength <= 0) return
    const forward = (event: PointerEvent): void => {
      const surface = underlay.firstElementChild
      if (surface === null) return
      const rect = host.getBoundingClientRect()
      const onBox = event.clientX >= rect.left && event.clientX <= rect.right
        && event.clientY >= rect.top && event.clientY <= rect.bottom
      // A dialog that contains the host is the pane's own overlay (the dialog
      // pane itself); a dialog inside the host is a floating descendant.
      const dialog = event.target instanceof Element ? event.target.closest(DIALOG_SELECTOR) : null
      const onPane = onBox && event.buttons === 0 && (dialog === null || dialog.contains(host))
      surface.dispatchEvent(new PointerEvent(onPane ? event.type : 'pointerleave', {
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
  // layer (cancelled in the stylesheet), so the offset is re-applied on the
  // pane's shell and mirrored onto the host's content boxes.
  useEffect(() => {
    if (underlay === null || strength <= 0) return
    let targets: (HTMLElement | SVGElement)[] | null = null
    const containers = new Set<Element>()
    let lastX = 0
    let lastY = 0

    const collect = (): (HTMLElement | SVGElement)[] => {
      const next = leanTargets(host, underlay, containers)
      targets = next
      return next
    }

    // The shell owns the pane's drop shadow: if only the inner kit layer moves,
    // the shadow keeps outlining the resting box, so a shadow arc and an
    // unfrosted strip stay visible at the edge the glass left behind. Resolved
    // per call — the portal commits after this effect runs.
    const applyToShell = (x: number, y: number): void => {
      const shell = underlay.firstElementChild
      if (!(shell instanceof HTMLElement)) return
      if (x === 0 && y === 0) shell.style.removeProperty('translate')
      else shell.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`
    }

    const write = (x: number, y: number): void => {
      // The collapsed rail clips its outgoing expanded content. Move that
      // clip with the glass instead of sliding the surface inside a fixed mask.
      // Dialogs disable this motion above so fixed overlays keep their viewport.
      if (collapsedSidebar) {
        if (x === 0 && y === 0) host.style.removeProperty('translate')
        else host.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`
        return
      }
      applyToShell(x, y)
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
      if (collapsedSidebar) host.style.removeProperty('translate')
      applyToShell(0, 0)
      for (const el of targets ?? []) {
        el.style.removeProperty('translate')
        el.removeAttribute(LEAN_ATTRIBUTE)
      }
    }
  }, [host, underlay, strength, collapsedSidebar])

  if (underlay === null) return null
  return createPortal(
    <GlassSurface
      cornerRadius={radius}
      optics={optics}
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
    ? new ResizeObserver(schedule)
    : null

  const keyOf = (value: GlassPaneParams): string => {
    const o = value.optics
    return `${value.mica ? 1 : 0}/${value.overLight ? 1 : 0}/${value.strength}/${value.highlight}`
      + `/${o.blur}/${o.brightness}/${o.refraction}/${o.depth}/${o.curvature}/${o.dispersion}`
  }

  const render = (): void => {
    // Commit discovery and underlay insertion in this frame, before paint;
    // passive effects used to add another bare frame to short-lived popups.
    flushSync(() => reactRoot.render(
      <GlassProvider quality="high" overLight={params.overLight} lensMapRasterScale={LENS_MAP_RASTER_SCALE}>
        {instances.map(instance => (
          <NicoGlassPane key={`${instance.key}:${instance.id}`} instance={instance} params={params} />
        ))}
      </GlassProvider>,
    ))
  }

  const resolve = (): PaneInstance[] => {
    const out: PaneInstance[] = []
    const seen = new Set<HTMLElement>()
    for (const def of PANE_DEFS) {
      const selected = def.select()
      const hosts = selected === null ? [] : selected instanceof HTMLElement ? [selected] : selected
      for (const host of hosts) {
        if (seen.has(host) || host.closest(`[${HOST_ATTRIBUTE}], [${SURFACE_ATTRIBUTE}]`) !== null) continue
        seen.add(host)
        const compact = ['menu', 'agent-menu', 'listbox', 'trigger', 'jobs', 'tooltip', 'select-trigger', 'control-group', 'icon-control', 'rail-button'].includes(def.key)
          || (def.key === 'dialog' && host.getAttribute('aria-modal') !== 'true')
        out.push({ key: def.key, host, id: identityOf(host), compact })
      }
    }
    return out
  }

  const sync = (): void => {
    if (disposed) return
    const nextParams = getParams()
    const nextParamsKey = keyOf(nextParams)
    if (nextParamsKey !== paramsKey) {
      params = nextParams
      paramsKey = nextParamsKey
    }
    const next = params.mica ? resolve() : []
    const nextSignature = next.map(i => `${i.key}:${i.id}:${i.compact ? 1 : 0}`).join('|') + `#${paramsKey}`
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
    for (const el of observed) {
      if (el.isConnected) continue
      resizeObserver.unobserve(el)
      observed.delete(el)
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

  // DSH 0.1.7 portals settings and other overlays beside #root. Watch the
  // body so those panes are discovered too, excluding kit-owned subtrees:
  // filter-registry and surface updates cannot change the host pane set.
  const mutations = new MutationObserver((records) => {
    if (records.some(record => !(record.target instanceof Element)
      || record.target.closest(`[${HOST_ATTRIBUTE}], [${SURFACE_ATTRIBUTE}]`) === null)) schedule()
  })
  mutations.observe(document.body, { childList: true, subtree: true })
  const onResize = (): void => { schedule() }
  const onTransitionEnd = (): void => { schedule() }
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
    el.removeAttribute('data-dsh-nico-compact')
    if (el instanceof HTMLElement) el.style.removeProperty('--dsh-nico-pane-radius')
  }
  for (const el of document.querySelectorAll(`[${SURFACE_ATTRIBUTE}]`)) el.remove()
  for (const el of document.querySelectorAll(`[${LEAN_ATTRIBUTE}]`)) {
    el.removeAttribute(LEAN_ATTRIBUTE)
    if (el instanceof HTMLElement || el instanceof SVGElement) el.style.removeProperty('translate')
  }
}
