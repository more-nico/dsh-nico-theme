/**
 * Liquid-glass refraction: rounded-rect SDF displacement maps fed into
 * SVG feDisplacementMap, then stacked with blur/saturate on --dsh-aqua-fx.
 * Ported from more-nico/dshLiquidTheme (no adaptive ink).
 */
export declare const REFRACT_FILTERS: {
    readonly sidebar: "dsh-nico-refract-sidebar";
    readonly header: "dsh-nico-refract-header";
    readonly composer: "dsh-nico-refract-composer";
    readonly trajectory: "dsh-nico-refract-trajectory";
    readonly dock: "dsh-nico-refract-dock";
    readonly dialog: "dsh-nico-refract-dialog";
    readonly todo: "dsh-nico-refract-todo";
    readonly goal: "dsh-nico-refract-goal";
    readonly question: "dsh-nico-refract-question";
    readonly planReview: "dsh-nico-refract-plan-review";
    readonly approval: "dsh-nico-refract-approval";
    readonly queue: "dsh-nico-refract-queue";
    readonly jobs: "dsh-nico-refract-jobs";
};
export declare function supportsRefract(): boolean;
export declare function reducedTransparency(): boolean;
export declare function frostStack(filterId: string | undefined, blurPx: number): string;
export declare function refractBlur(blur: number, strength: number): number;
export interface RefractPrefs {
    enabled: boolean;
    mica: boolean;
    blur: number;
    refract: number;
    refractOn: boolean;
    dispersion?: number;
    specular?: number;
}
export declare function syncRefraction(prefs: RefractPrefs): void;
/** Mount SVG filters and keep refraction maps in sync with layout. */
export declare function startRefraction(getPrefs: () => RefractPrefs): () => void;
