/**
 * Runtime seam stamper.
 *
 * The Aqua stylesheet keys off stable data-* hooks (`data-dsh-frame`,
 * `data-dsh-sidebar-root`, `data-hero-headline`, …). In the monorepo those
 * hooks are authored into the base packages' source; for a self-contained
 * distribution (installed against a stock DSH) this module stamps them onto
 * the matching elements at runtime, so the stylesheet works with zero base
 * edits. Each selector uses only stable attributes already present in the
 * stock UI (`data-composer-card`, `data-conversation-composer-overlay`,
 * ARIA roles) or lightningcss-preserved class-name substrings.
 *
 * Stamps are idempotent and inert without the `data-dsh-aqua` root attribute
 * (the whole stylesheet is gated on it), so they are simply left in place when
 * the layer flips off — "off" still renders the exact stock UI.
 */

interface Seam {
  /** Attribute to stamp (bare name; value is always ''). */
  readonly attribute: string
  /** CSS selector for the element(s) to stamp. */
  readonly selector: string
  /** Stamp only the first (topmost) match, not every descendant match. */
  readonly first?: boolean
}

const SEAMS: readonly Seam[] = [
  // The layout frame: the sidebar column's direct parent.
  { attribute: 'data-dsh-frame', selector: ':has(> [class*="sidebarCol"])' },
  // The sidebar content root (topmost `root` under the column — settings
  // internals also carry a `root` class but sit deeper, so first match wins).
  { attribute: 'data-dsh-sidebar-root', selector: '[class*="sidebarCol"] [class*="root"]', first: true },
  // New-session button (the raised-surface seam).
  { attribute: 'data-dsh-surface', selector: 'button[class*="newSession"]' },
  // Trajectory view (the only composer-overlay view today).
  { attribute: 'data-dsh-trajectory', selector: '[data-conversation-composer-overlay]' },
  { attribute: 'data-dsh-nico-trajectory-ledger', selector: '[data-dsh-trajectory] > [class*="ledger"] > [class*="split"]' },
  { attribute: 'data-dsh-nico-trajectory-plot', selector: '[data-dsh-trajectory] > section > [class*="plot"]' },
  // Details panel (topmost `root` under the details column).
  { attribute: 'data-dsh-details', selector: '[data-sidebar-right-panel]' },
  { attribute: 'data-dsh-nico-rightbar-layout', selector: '[data-sidebar-right-panel] [class*="panelBody"], [data-sidebar-right-panel] [class*="tabHostBody"], [data-sidebar-right-tab], [data-sidebar-right-guide]' },
  // Composer bar root: the composer card's direct parent.
  { attribute: 'data-dsh-inputbar', selector: ':has(> [data-composer-card])' },
  // Composer attach "+" button.
  { attribute: 'data-dsh-add', selector: '[data-composer-card] [class*="add"]' },
  // Session stats line under the composer (composer.dock slot).
  { attribute: 'data-dsh-stats', selector: '[data-slot="conversation.composer.dock"] [class*="root"]' },
  // Session-header background-jobs popover (a <ul>, not role=menu).
  { attribute: 'data-dsh-jobs', selector: 'ul[aria-label="后台任务"], ul[aria-label="Background jobs"]' },
  // Native menu underlays must yield to the kit instead of hiding its lens.
  { attribute: 'data-dsh-nico-native-material', selector: '[role="menu"] > [class*="material"], [role="listbox"] > [class*="material"], [data-trigger-menu] > [class*="material"], [role="dialog"] > [class*="material"]' },
  { attribute: 'data-dsh-nico-option-check', selector: '[role="menuitem"] > svg[class*="check"]' },
  { attribute: 'data-dsh-nico-header-action', selector: '[data-dsh-nico-pane="header"] button:not([role="tab"]):not([aria-haspopup="tree"])' },
  { attribute: 'data-dsh-nico-row-title', selector: '[data-row-key] > [class*="title"]' },
  { attribute: 'data-dsh-nico-row-meta', selector: '[data-row-key] > [class*="time"]' },
  { attribute: 'data-dsh-nico-row-leading', selector: '[data-row-key^="session:"] > [class*="slot"]' },
  { attribute: 'data-dsh-nico-sidebar-action', selector: '[data-dsh-sidebar-root] button[class*="iconButton"], [data-dsh-sidebar-root] button[class*="searchButton"]' },
  // Use existing layout owners as the kit's long capsule; never reparent DSH
  // controls, so search expansion, menus and keyboard focus stay app-owned.
  { attribute: 'data-dsh-nico-control-group', selector: '[data-dsh-sidebar-root] [class*="sectionHeader"], [data-conversation-tabs], header [class*="headerUtilities"]:has(button), [data-dsh-inputbar] > [class*="dock"], [data-dockkit-strip], [data-conversation-scroll] [class*="actions"]:has(> button ~ button):not([data-conversation-composer-overlay] *)' },
  { attribute: 'data-dsh-nico-icon-control', selector: '[data-dsh-sidebar-root] [class*="logoRow"] button[class*="toggle"], [data-conversation-header-corner] button, [data-dockkit-split-button], [data-composer-card] button[class*="primary"], [data-composer-card] [data-dsh-add]' },
  { attribute: 'data-dsh-nico-select-control', selector: '[data-composer-card] [data-slot="conversation.input.permission"] button[class*="trigger"]' },
]

function stamp(seam: Seam): void {
  if (seam.first) {
    const el = document.querySelector(seam.selector)
    if (el !== null && !el.hasAttribute(seam.attribute)) el.setAttribute(seam.attribute, '')
    return
  }
  for (const el of document.querySelectorAll(seam.selector)) {
    if (!el.hasAttribute(seam.attribute)) el.setAttribute(seam.attribute, '')
  }
}

function stampAll(): void {
  for (const seam of SEAMS) stamp(seam)
}

/**
 * Stamp the seams once, then keep them stamped as React remounts nodes.
 * @returns a disposer that disconnects the observer.
 */
export function startSeamStamper(): () => void {
  stampAll()
  const observer = new MutationObserver(() => { stampAll() })
  observer.observe(document.documentElement, { childList: true, subtree: true })
  return () => { observer.disconnect() }
}
