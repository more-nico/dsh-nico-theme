/** Keep a stale, size-dependent kit lens out of the compositor during resize. */
export function guardLensResize(underlay: HTMLElement): () => void {
  let frame = 0
  let disposed = false
  const surface = underlay.querySelector<HTMLElement>('.ngs-surface')
  if (surface === null || typeof ResizeObserver === 'undefined') return () => {}

  const check = (): void => {
    frame = 0
    if (disposed) return
    const effect = surface.querySelector<HTMLElement>('.ngs-effect')
    // Read the kit's inline value: computed style may already be our fallback.
    const filterId = /url\(["']?#([^"')]+)["']?\)/.exec(effect?.style.backdropFilter ?? '')?.[1]
    const map = filterId === undefined ? null : document.getElementById(filterId)?.querySelector('feImage')
    const pending = filterId !== undefined && (map == null
      || Number(map.getAttribute('width')) !== surface.offsetWidth
      || Number(map.getAttribute('height')) !== surface.offsetHeight)
    if (underlay.hasAttribute('data-dsh-nico-lens-pending') !== pending) {
      underlay.toggleAttribute('data-dsh-nico-lens-pending', pending)
    }
    // The registry and surface commit separately. Restore only once the actual
    // map matches, rather than guessing a timeout after the last pointer move.
    if (pending) frame = window.requestAnimationFrame(check)
  }
  const refresh = (): void => {
    if (frame !== 0) window.cancelAnimationFrame(frame)
    check()
  }
  const resize = new ResizeObserver(refresh)
  resize.observe(surface)
  const material = new MutationObserver(records => {
    if (records.some(record => record.type === 'childList'
      || (record.target instanceof Element && record.target.classList.contains('ngs-effect')))) refresh()
  })
  material.observe(surface, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] })
  check()
  return () => {
    disposed = true
    if (frame !== 0) window.cancelAnimationFrame(frame)
    resize.disconnect()
    material.disconnect()
    underlay.removeAttribute('data-dsh-nico-lens-pending')
  }
}
