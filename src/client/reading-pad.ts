/**
 * Conversation reading pads: frost plates on user bubbles and assistant
 * prose only. Think/tool cards stay clear until expanded. Hero has none.
 * Ported from more-nico/dshLiquidTheme markReadingPads (no adaptive ink).
 */

export const PAD_ATTR = 'data-dsh-nico-pad'

function isDisclosureOpen(root: Element): boolean {
  return root.getAttribute('aria-expanded') === 'true'
    || root.querySelector('[aria-expanded="true"]') !== null
}

function firstExpandedSurface(root: Element | null): Element | null {
  if (root === null) return null
  return root.querySelector('[class*="thinkBody"]')
    ?? root.querySelector('[data-terminal]')
    ?? root.querySelector('[class*="ioCard"]')
    ?? root.querySelector('[class*="terminalBody"]')
    ?? root.querySelector('[class*="diffBody"]')
    ?? root.querySelector('[class*="readBody"]')
    ?? root.querySelector('[class*="searchBody"]')
    ?? root.querySelector('[class*="webBody"]')
    ?? root.querySelector('[class*="codeBody"]')
    ?? root.querySelector('pre')
}

function findExpandedPad(card: Element): Element | undefined {
  const host = card.hasAttribute('data-sample') && card.parentElement !== null
    ? card.parentElement
    : card
  const hit = firstExpandedSurface(host) ?? firstExpandedSurface(card.nextElementSibling)
  if (hit !== null) return hit
  return [...host.children].find((el) => (
    el.getAttribute('aria-expanded') !== 'true'
    && el.querySelector('[aria-expanded]') === null
  ))
}

function isHero(): boolean {
  return document.querySelector('[data-slot="conversation.hero.workspace"]') !== null
    || document.querySelector('[data-phase="hero"]') !== null
}

export function markReadingPads(): void {
  for (const node of document.querySelectorAll(`[${PAD_ATTR}]`)) {
    node.removeAttribute(PAD_ATTR)
  }
  if (isHero()) {
    document.documentElement.setAttribute('data-dsh-nico-home', '')
    return
  }
  document.documentElement.removeAttribute('data-dsh-nico-home')

  for (const row of document.querySelectorAll(
    '[data-chat-flow-kind="user"], [data-chat-flow-kind="steering"]',
  )) {
    const bubble = row.querySelector('[class*="bubble"]')
    if (bubble !== null) bubble.setAttribute(PAD_ATTR, 'user')
  }

  for (const step of document.querySelectorAll('[data-chat-flow-kind="assistant-step"]')) {
    let host: Element = step
    while (host.children.length === 1) {
      const only = host.firstElementChild
      if (only === null || only.hasAttribute('data-variant')) break
      if (host.querySelector(':scope > [data-variant]') !== null) break
      host = only
    }
    const kids = [...host.children]
    if (kids.some((child) => child.hasAttribute('data-variant'))) {
      for (const child of kids) {
        if (!child.hasAttribute('data-variant')) child.setAttribute(PAD_ATTR, 'assistant')
      }
    } else if (host !== step) {
      host.setAttribute(PAD_ATTR, 'assistant')
    }
  }

  for (const card of document.querySelectorAll('[data-variant]')) {
    if (!isDisclosureOpen(card)) continue
    const expanded = findExpandedPad(card)
    if (expanded !== undefined && expanded !== card) expanded.setAttribute(PAD_ATTR, 'expand')
  }
}

export function clearReadingPads(): void {
  for (const node of document.querySelectorAll(`[${PAD_ATTR}]`)) {
    node.removeAttribute(PAD_ATTR)
  }
  document.documentElement.removeAttribute('data-dsh-nico-home')
  document.documentElement.removeAttribute('data-dsh-nico-scrim')
}

export function startReadingPads(active: () => boolean): () => void {
  let timer = 0
  const pulse = (): void => {
    if (timer !== 0) window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      timer = 0
      if (!active()) {
        clearReadingPads()
        return
      }
      document.documentElement.setAttribute('data-dsh-nico-scrim', '')
      markReadingPads()
    }, 48)
  }
  const root = document.getElementById('root')
  const observer = new MutationObserver(pulse)
  if (root !== null) observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-expanded', 'data-phase'] })
  pulse()
  return () => {
    if (timer !== 0) window.clearTimeout(timer)
    observer.disconnect()
    clearReadingPads()
  }
}
