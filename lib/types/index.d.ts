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
import type { Context } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
/** Settings namespace the Nico card claims in the configurable-plugins tab. */
export declare const NICO_SETTINGS_NAMESPACE = "nico";
/** Durable host-side document backing the master switch. */
export interface NicoSettings {
    /** Master on/off flag; the browser layer keeps the operating copy in localStorage. */
    enabled: boolean;
}
/** Host settings schema for the `nico` namespace. */
export declare const NicoSettingsSchema: z<NicoSettings>;
/** Host plugin body: serve the `nico` settings namespace for the card slot. */
export declare function apply(ctx: Context): void;
