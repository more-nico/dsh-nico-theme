//#region src/index.ts
/** Keep the client-only theme out of schema-generated host forms. */
function apply(ctx) {
	ctx.inject(["settings"], (settingsCtx) => {
		settingsCtx.effect(() => settingsCtx.settings.configure({ auto: false }));
	});
}
//#endregion
export { apply };
