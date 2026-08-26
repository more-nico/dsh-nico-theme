/**
 * Pointer-centered 1px glass rim. Distinct from the in-pane spotlight glow.
 * Sidebar column is skipped so the settings overlay is never filtered.
 */

const RIM_CLASS = 'dsh-nico-rim'
const ATTR = 'data-dsh-nico-rim'

function rimTargets(): HTMLElement[] {
  const out: HTMLElement[] = []
  const push = (el: Element | null): void => {
    if (el instanceof HTMLElement) out.push(el)
  }
  push(document.querySelector('header'))
  push(document.querySelector('[data-dsh-inputbar]:has([data-dsh-stats])') ?? document.querySelector('[data-composer-card]'))
  push(document.querySelector('[data-dsh-stats]'))
  push(document.querySelector('[data-dsh-trajectory]'))
  push(document.querySelector('[role="dialog"]'))
  push(document.querySelector('[data-testid="todo-panel"]'))
  push(document.querySelector('[data-goal-bar] > *'))
  push(document.querySelector('[data-question-key] > section'))
  push(document.querySelector('[data-plan-review-key] > section'))
  push(document.querySelector('[data-approval-key] > *'))
  push(document.querySelector('[data-queue-dock] > *'))
  push(document.querySelector('[data-dsh-jobs]'))
  for (const el of document.querySelectorAll('[role="menu"], [role="listbox"]')) push(el)
  return out
}

function ensureRim(el: HTMLElement): void {
  if (el.querySelector(`:scope > .${RIM_CLASS}`) !== null) return
  if (getComputedStyle(el).position === 'static') el.style.position = 'relative'
  const rim = document.createElement('div')
  rim.className = RIM_CLASS
  rim.setAttribute('aria-hidden', 'true')
  el.appendChild(rim)
}

function stripRims(): void {
  for (const node of document.querySelectorAll(`.${RIM_CLASS}`)) node.remove()
  document.documentElement.removeAttribute(ATTR)
}

/** Follow the pointer with a 1px radial rim on mica glass panes. */
export function startRim(active: () => boolean): () => void {
  let pointerX = 0
  let pointerY = 0
  let glowRaf = 0
  let timer = 0

  const paint = (): void => {
    glowRaf = 0
    if (!active()) return
    for (const el of rimTargets()) {
      const box = el.getBoundingClientRect()
      el.style.setProperty('--dsh-nico-mx', `${pointerX - box.left}px`)
      el.style.setProperty('--dsh-nico-my', `${pointerY - box.top}px`)
    }
  }

  const decorate = (): void => {
    if (!active()) {
      stripRims()
      return
    }
    document.documentElement.setAttribute(ATTR, '')
    const size = Math.round(Math.hypot(window.innerWidth || 1, window.innerHeight || 1) * 0.4)
    document.documentElement.style.setProperty('--dsh-nico-rim-size', `${Math.max(80, size)}px`)
    for (const el of rimTargets()) ensureRim(el)
  }

  const schedule = (): void => {
    if (timer !== 0) window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      timer = 0
      decorate()
    }, 48)
  }

  const onPointer = (event: PointerEvent): void => {
    pointerX = event.clientX
    pointerY = event.clientY
    if (glowRaf === 0) glowRaf = window.requestAnimationFrame(paint)
  }

  const root = document.getElementById('root')
  const observer = new MutationObserver(schedule)
  if (root !== null) observer.observe(root, { childList: true, subtree: true })
  window.addEventListener('pointermove', onPointer, { passive: true })
  window.addEventListener('resize', schedule)
  decorate()

  return () => {
    if (timer !== 0) window.clearTimeout(timer)
    if (glowRaf !== 0) window.cancelAnimationFrame(glowRaf)
    observer.disconnect()
    window.removeEventListener('pointermove', onPointer)
    window.removeEventListener('resize', schedule)
    stripRims()
  }
}
