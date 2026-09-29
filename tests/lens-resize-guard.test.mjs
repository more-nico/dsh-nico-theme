import assert from 'node:assert/strict'
import { test } from 'node:test'
import { guardLensResize } from '../src/client/lens-resize-guard.ts'

// Minimal browser boundary: exercise the real guard with independently
// controlled layout, kit commits and animation-frame delivery.
function fixture(t) {
  const frames = new Map()
  const flags = new Set()
  let nextFrame = 0
  let resize
  let mutation
  let disconnected = 0
  const effect = { style: { backdropFilter: 'url("#lens")' } }
  const surface = { offsetWidth: 280, offsetHeight: 800, querySelector: () => effect }
  const mapSize = { width: 280, height: 800 }
  let mapPresent = true
  const underlay = {
    querySelector: () => surface,
    hasAttribute: name => flags.has(name),
    toggleAttribute: (name, on) => on ? flags.add(name) : flags.delete(name),
    removeAttribute: name => flags.delete(name),
  }
  const install = (key, value) => {
    const previous = Object.getOwnPropertyDescriptor(globalThis, key)
    Object.defineProperty(globalThis, key, { value, configurable: true, writable: true })
    t.after(() => previous ? Object.defineProperty(globalThis, key, previous) : delete globalThis[key])
  }
  install('window', {
    requestAnimationFrame: fn => { frames.set(++nextFrame, fn); return nextFrame },
    cancelAnimationFrame: id => frames.delete(id),
  })
  install('document', {
    getElementById: () => mapPresent ? { querySelector: () => ({ getAttribute: name => String(mapSize[name]) }) } : null,
  })
  install('ResizeObserver', class {
    constructor(fn) { resize = fn }
    observe() {}
    disconnect() { disconnected++ }
  })
  install('MutationObserver', class {
    constructor(fn) { mutation = fn }
    observe() {}
    disconnect() { disconnected++ }
  })
  const dispose = guardLensResize(underlay)
  return {
    surface, mapSize, effect, dispose,
    resize: () => resize(),
    commit: () => mutation([{ type: 'childList' }]),
    setMapPresent: value => { mapPresent = value },
    pending: () => flags.has('data-dsh-nico-lens-pending'),
    frameCount: () => frames.size,
    disconnected: () => disconnected,
    tick: () => { const jobs = [...frames.values()]; frames.clear(); jobs.forEach(fn => fn()) },
  }
}

test('rapid widening and shrinking never restore an out-of-date lens', t => {
  const f = fixture(t)
  assert.equal(f.pending(), false)
  f.surface.offsetWidth = 440
  f.resize()
  assert.equal(f.pending(), true)
  f.surface.offsetWidth = 320
  f.resize()
  assert.equal(f.frameCount(), 1)
  f.mapSize.width = 440 // An intermediate kit commit is still stale.
  f.commit()
  f.tick()
  assert.equal(f.pending(), true)
  f.mapSize.width = 320
  f.tick()
  assert.equal(f.pending(), false)
  assert.equal(f.frameCount(), 0)
  f.dispose()
})

test('waits through separate registry commits and height changes', t => {
  const f = fixture(t)
  f.surface.offsetHeight = 900
  f.resize()
  f.setMapPresent(false)
  f.commit()
  assert.equal(f.pending(), true)
  f.mapSize.height = 900
  f.setMapPresent(true)
  f.tick()
  assert.equal(f.pending(), false)
  f.dispose()
})

test('low tier needs no polling; disabling the theme cancels pending work', t => {
  const f = fixture(t)
  f.effect.style.backdropFilter = 'blur(3px) brightness(1.1)'
  f.surface.offsetWidth = 360
  f.resize()
  assert.equal(f.pending(), false)
  assert.equal(f.frameCount(), 0)
  f.effect.style.backdropFilter = 'url(#lens)'
  f.commit()
  assert.equal(f.pending(), true)
  f.dispose()
  assert.equal(f.pending(), false)
  assert.equal(f.frameCount(), 0)
  assert.equal(f.disconnected(), 2)
})
