/**
 * Aqua row slot store: a mirror of the layer's state (enable flag plus the
 * knobs and the backdrop source). The plugin's apply-world change listener is
 * the only writer; the row component reads via props.useStore.
 */
import { type EngineStoreHandle } from '@deepseek-ai/dsh-client-store';
/** Store state mirrored from the Aqua settings scope. */
export interface AquaRowState {
    /** Persisted layer enable flag. */
    enabled: boolean;
    /** Rendering mode: mica (kit panes) or stock layout with generic glass. */
    mode: 'mica' | 'compat';
    /** Kit optics blur radius, px. */
    blur: number;
    /** Kit optics brightness multiplier, 0-2. */
    brightness: number;
    /** Kit optics refraction strength, 0-100. */
    refraction: number;
    /** Kit optics refraction band width, px. */
    depth: number;
    /** Kit optics bevel curvature, 0-1. */
    curvature: number;
    /** Kit optics chromatic dispersion, 0-100. */
    dispersion: number;
    /** Rim-light strength, 0-2. */
    highlight: number;
    /** Mouse elasticity master. */
    elasticity: boolean;
    /** Mouse elasticity strength, 0-0.5. */
    elasticityStrength: number;
    /** Fluid hue, degrees (0-360, continuous). */
    fluidHue: number;
    /** Fluid depth, 0-100 (continuous). */
    fluidDepth: number;
    /** Background brightness, 0-100. */
    bgBrightness: number;
    /** Resolved palette is dark (brightness knob = darkening half). */
    dark: boolean;
    /** Backdrop source: fluid board or custom wallpaper. */
    background: 'fluid' | 'wallpaper';
    /** Wallpaper image data URL. */
    wallpaper: string;
    /** Wallpaper blur radius, px. */
    wallpaperBlur: number;
    /** Wallpaper frost veil, 0-100. */
    wallpaperFrost: number;
    /** Video wallpaper blur radius, px. */
    videoBlur: number;
    /** Video wallpaper brightness, 0-100. */
    videoBrightness: number;
    /** Conversation pad opacity 0-100. */
    scrim: number;
    /** Conversation pad blur, px. */
    scrimBlur: number;
    /** Monotonic revision; -1 until first sync so revision 0 lands as a change. */
    revision: number;
}
/** The full payload the layer pushes into the row store on every change. */
export interface AquaSettingsPayload {
    enabled: boolean;
    mode: 'mica' | 'compat';
    blur: number;
    brightness: number;
    refraction: number;
    depth: number;
    curvature: number;
    dispersion: number;
    highlight: number;
    elasticity: boolean;
    elasticityStrength: number;
    fluidHue: number;
    fluidDepth: number;
    bgBrightness: number;
    dark: boolean;
    background: 'fluid' | 'wallpaper';
    wallpaper: string;
    wallpaperBlur: number;
    wallpaperFrost: number;
    videoBlur: number;
    videoBrightness: number;
    scrim: number;
    scrimBlur: number;
}
/** Declared action shape giving the exported factory a stable return type. */
type AquaRowActions = {
    sync: (draft: AquaRowState, next: AquaSettingsPayload, revision: number) => void;
};
/**
 * Declares the Aqua row state and write surface.
 * @returns the store handle.
 */
export declare function createAquaRowStore(): EngineStoreHandle<AquaRowState, AquaRowActions>;
export {};
