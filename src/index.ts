/**
 * Nico glass theme, node half.
 *
 * DSH 0.1.7 derives host configuration forms from plugin Config schemas.
 * Every theme preference, including the master switch, is browser-local;
 * suppress automatic host forms so they cannot offer a second, inert switch.
 */

import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-settings'

/** Keep the client-only theme out of schema-generated host forms. */
export function apply(ctx: Context): void {
  ctx.inject(['settings'], (settingsCtx) => {
    settingsCtx.effect(() => settingsCtx.settings.configure({ auto: false }))
  })
}
