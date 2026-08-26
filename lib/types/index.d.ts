/**
 * Aqua theme-layer plugin, node half.
 *
 * rc.7 upgrade: the Plugins settings section now dispatches its
 * `settings.plugin.item` card slot by the settings namespace each card edits
 * (keyed slot). So this node half serves the `aqua` settings namespace, and
 * the browser half registers its master-switch card under the same key — the
 * section pairs the two without learning what the namespace means.
 *
 * The visual layer state itself stays a browser-local preference (localStorage),
 * owned by the client half; the settings document below is the durable
 * master-switch record that also validates stored values. The browser half
 * ships via exports["./client"], discovered through the package.json
 * dsh.client declaration.
 */
import type { Context } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
/** Settings namespace the aqua card claims in the configurable-plugins tab. */
export declare const AQUA_SETTINGS_NAMESPACE = "aqua";
/** Durable host-side document backing the aqua master switch. */
export interface AquaSettings {
    /** Master on/off flag; the browser layer keeps the operating copy in localStorage. */
    enabled: boolean;
}
/** Host settings schema for the `aqua` namespace. */
export declare const AquaSettingsSchema: z<AquaSettings>;
/** Host plugin body: serve the `aqua` settings namespace for the card slot. */
export declare function apply(ctx: Context): void;
//# sourceMappingURL=index.d.ts.map