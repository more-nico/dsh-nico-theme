/**
 * Local type completion for the `ctx.settings` service.
 *
 * `@deepseek-ai/dsh-settings` documents the user-settings seam as
 * `ctx.settings` but ships no cordis module augmentation for it, so a plugin
 * program cannot see the service without this declaration. Drop it once
 * upstream declares the augmentation itself.
 */
import type { SettingsProvider } from '@deepseek-ai/dsh-settings'

declare module '@deepseek-ai/cordis' {
  interface Context {
    /** User-settings registry/lookup service provided by the host. */
    settings: SettingsProvider
  }
}
