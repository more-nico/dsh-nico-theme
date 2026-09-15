/**
 * Ambient backdrop scene: the markup the layer injects behind the app frame.
 * The deepseek.com-style fluid board is the scene — one WebGL canvas filling
 * the viewport, with the wallpaper media in its own fixed layer (videos fail
 * to composite inside the ambient's animated opacity group).
 */

/**
 * The complete ambient scene markup: one fixed, click-transparent container
 * the layer prepends to <body> while enabled and removes on disable.
 */
export const AMBIENT_SCENE = '<canvas data-dsh-aqua-fluid-canvas></canvas>'

/** Build the ambient container element (or reuse an existing one). */
export function ensureAmbientScene(): HTMLElement {
  const existing = document.querySelector<HTMLElement>('[data-dsh-aqua-ambient]')
  if (existing !== null) return existing
  const holder = document.createElement('div')
  holder.innerHTML = `<div data-dsh-aqua-ambient aria-hidden="true">${AMBIENT_SCENE}</div>`
  const node = holder.firstElementChild
  if (!(node instanceof HTMLElement)) throw new Error('ui-aqua: ambient scene markup failed to parse')
  document.body.prepend(node)
  // The wallpaper media lives in its OWN fixed layer: videos fail to
  // composite inside the ambient's animated opacity group (the breathe
  // animation), so the wallpaper must not be a descendant of it.
  if (document.querySelector('[data-dsh-aqua-wallpaper-layer]') === null) {
    const wallpaper = document.createElement('div')
    wallpaper.setAttribute('data-dsh-aqua-wallpaper', '')
    wallpaper.setAttribute('data-dsh-aqua-wallpaper-layer', '')
    wallpaper.setAttribute('aria-hidden', 'true')
    wallpaper.innerHTML =
      '<img data-dsh-aqua-wallpaper-img alt="">' +
      '<video data-dsh-aqua-wallpaper-video loop playsinline preload="auto"></video>'
    document.body.prepend(wallpaper)
  }
  return node
}

/** Remove the ambient container wherever it lives. */
export function removeAmbientScene(): void {
  for (const node of document.querySelectorAll('[data-dsh-aqua-ambient]')) node.remove()
  for (const node of document.querySelectorAll('[data-dsh-aqua-wallpaper-layer]')) node.remove()
}

/** Add the page edge-fade bands (5px gradient blur over the chat content). */
export function ensurePageFades(): void {
  if (document.querySelector('[data-dsh-aqua-fade]') !== null) return
  const top = document.createElement('div')
  top.setAttribute('data-dsh-aqua-fade', 'top')
  top.setAttribute('aria-hidden', 'true')
  const bottom = document.createElement('div')
  bottom.setAttribute('data-dsh-aqua-fade', 'bottom')
  bottom.setAttribute('aria-hidden', 'true')
  const host = document.getElementById('root') ?? document.body
  host.appendChild(top)
  host.appendChild(bottom)
}

/** Remove the edge-fade bands. */
export function removePageFades(): void {
  for (const el of document.querySelectorAll('[data-dsh-aqua-fade]')) el.remove()
}
