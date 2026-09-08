/**
 * Nico glass theme, node half.
 *
 * The Plugins settings section dispatches `settings.plugin.item` by the
 * settings namespace each card edits (keyed slot). This half serves the
 * `nico` namespace; the browser half registers its master-switch card under
 * the same key.
 *
 * Visual layer state stays a browser-local preference (localStorage).
 */

import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'

/** Settings namespace the Nico card claims in the configurable-plugins tab. */
export const NICO_SETTINGS_NAMESPACE = 'nico'

/** Durable host-side document backing the master switch. */
export interface NicoSettings {
  /** Master on/off flag; the browser layer keeps the operating copy in localStorage. */
  enabled: boolean
}

/** Host settings schema for the `nico` namespace. */
export const NicoSettingsSchema: z<NicoSettings> = z.object({
  enabled: z.boolean().default(true),
})

/** Host plugin body: serve the `nico` settings namespace for the card slot. */
export function apply(ctx: Context): void {
  // DSH 0.1.2 dropped the `settingsNamespace()` brander: `register` now takes
  // the namespace string itself and validates it against the branded shape.
  ctx.inject(['settings'], (settingsCtx) => {
    settingsCtx.settings.register(NICO_SETTINGS_NAMESPACE, NicoSettingsSchema)
  })
}
