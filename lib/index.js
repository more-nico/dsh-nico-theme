import z from "@deepseek-ai/schemastery";
//#region src/index.ts
/** Settings namespace the Nico card claims in the configurable-plugins tab. */
const NICO_SETTINGS_NAMESPACE = "nico";
/** Host settings schema for the `nico` namespace. */
const NicoSettingsSchema = z.object({ enabled: z.boolean().default(true) });
/** Host plugin body: serve the `nico` settings namespace for the card slot. */
function apply(ctx) {
	ctx.inject(["settings"], (settingsCtx) => {
		settingsCtx.settings.register(NICO_SETTINGS_NAMESPACE, NicoSettingsSchema);
	});
}
//#endregion
export { NICO_SETTINGS_NAMESPACE, NicoSettingsSchema, apply };
