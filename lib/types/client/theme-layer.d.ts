/**
 * Aqua theme layer: one toggleable visual skin over the whole Web surface.
 * Everything this layer owns is an effect — token overrides ride the theme
 * service's override stack, the CSS hooks ride a `data-dsh-aqua` attribute on
 * <html> (the stylesheet only applies under it), the ambient scene and page
 * fades are mounted/removed with the layer — so switching the flag off (or
 * unloading the plugin) restores the stock UI exactly: no residue, no reload.
 *
 * The enable flag persists in localStorage: a client-only visual preference
 * (like the selected-session key), written and read by this plugin alone.
 */
import type { Context } from '@deepseek-ai/cordis';
import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client';
/** html attribute selecting the Aqua layer: CSS hooks and ambient effects. */
export declare const AQUA_ATTRIBUTE = "data-dsh-aqua";
/** localStorage key carrying the layer enable flag. */
export declare const AQUA_ENABLED_KEY = "dsh.ui-aqua.enabled";
/** Default state when nothing is stored yet: on. */
export declare const DEFAULT_ENABLED = true;
/**
 * Alias-token override layer: the deep-sea palette. Every value is a
 * `{ light, dark }` pair so the layer stays legible when the user switches
 * the Appearance preference — dark is deep-sea navy, light is cool white-blue.
 */
export declare const AQUA_TOKEN_OVERRIDES: ThemeTokenOverrides;
/** Tunable layer knobs, persisted independently of the enable flag. */
export interface AquaSettings {
    /** Rendering mode: mica (frosted floating cards) or the stock layout with a generic glass material. */
    mode: 'mica' | 'compat';
    /** Glass backdrop blur radius, px. */
    blur: number;
    /** Glass fill opacity, 0-100 (50 = the shipped look; drives the frost multiplier). */
    frost: number;
    /** Fluid hue, degrees (0-360, continuous). */
    fluidHue: number;
    /** Fluid depth, 0-100 (0 = deep saturated, 100 = pale light, continuous). */
    fluidDepth: number;
    /** Background brightness, 0-100 (0 = pure black, 50 = transparent, 100 = pure white). */
    bgBrightness: number;
    /** Backdrop source: the living fluid board or a custom wallpaper. */
    background: 'fluid' | 'wallpaper';
    /** Wallpaper image data URL (empty until one is picked). */
    wallpaper: string;
    /** Particle whale in the chat area center (the harness hero fish). */
    whale: boolean;
    /** Ambient marine life (fish / bubbles / plankton). */
    critters: boolean;
    /** Interactive mesh (the site's dot-grid with pointer repel). */
    mesh: boolean;
    /** Cursor spotlight glow that follows the pointer over the glass panes. */
    spotlight: boolean;
    /** Hover press-down: the pane under the cursor sinks a touch (tactile depth). */
    press: boolean;
    /** Wallpaper blur radius, px. */
    wallpaperBlur: number;
    /** Wallpaper frost veil, 0-100. */
    wallpaperFrost: number;
    /** Video wallpaper blur radius, px (0 = crisp, 40 = heavy acrylic). */
    videoBlur: number;
    /** Video wallpaper brightness, 0-100 (100 = fully lit, 0 = deepest dim). */
    videoBrightness: number;
    /** Liquid-glass edge refraction 0-100. */
    refract: number;
    /** Master for edge refraction (value is kept when off). */
    refractOn: boolean;
    /** Chromatic dispersion 0-100. */
    dispersion: number;
    /** Specular bevel sheen 0-100. */
    specular: number;
    /** Conversation reading-pad opacity 0-100. */
    scrim: number;
    /** Conversation reading-pad blur, px. */
    scrimBlur: number;
    /** Pointer-centered 1px rim on mica panes. */
    rim: boolean;
}
/**
 * Owns the Aqua layer lifecycle: reads the durable enable flag, and applies /
 * retracts every layer on change. Cross-tab flips arrive through the storage
 * event; every subscription and mounted effect are released when the plugin
 * fiber is disposed.
 */
export declare class AquaLayer {
    private enabled;
    private settings;
    /** Resolved palette scheme: dark = the brightness knob darkens, light = it brightens. */
    private dark;
    private tokenDisposer;
    private mainFluid;
    private interactionDisposer;
    private themeListener;
    private seamDisposer;
    private spotlightDisposer;
    private refractDisposer;
    private padDisposer;
    private rimDisposer;
    private whaleHandle;
    private meshHandle;
    /** Object URL of the current large-video wallpaper (revoked on replace). */
    private videoObjectUrl;
    /** IndexedDB id backing the current object URL (guards against reloads). */
    private videoBlobId;
    private readonly ctx;
    /**
     * @param ctx - owning client context.
     */
    constructor(ctx: Context);
    /** Current enable state (the settings row mirrors this). */
    getEnabled(): boolean;
    /** Current knob values (the settings row mirrors these). */
    getSettings(): AquaSettings;
    /** Whether the resolved palette is dark (the brightness knob darkens). */
    getDark(): boolean;
    /** Resolved scheme from the theme service (falls back to the body attribute). */
    private resolveScheme;
    /** Re-read every knob from localStorage into memory. */
    private reloadSettings;
    /** Flip the layer: persist, then apply or retract every owned effect. */
    setEnabled(value: boolean): void;
    /** Set the rendering mode ('mica' or 'compat'). */
    setMode(value: 'mica' | 'compat'): void;
    /** Set the glass blur radius (px). */
    setBlur(value: number): void;
    /** Set the glass frost amount (0-100). */
    setFrost(value: number): void;
    /** Set the fluid hue (degrees, continuous). */
    setFluidHue(value: number): void;
    /** Set the fluid depth (0-100, continuous: deep ↔ pale). */
    setFluidDepth(value: number): void;
    /** Set the background brightness (0-100: 0 = pure black, 50 = transparent, 100 = pure white). */
    setBgBrightness(value: number): void;
    /** Set the backdrop source (fluid board or custom wallpaper). */
    setBackground(value: 'fluid' | 'wallpaper'): void;
    /** Set the wallpaper image (a data URL; empty clears it) or a large video
     *  (`idb:<id>` marker whose blob lives in IndexedDB). */
    setWallpaper(value: string): void;
    /** Set the particle-whale flag (chat-area center decoration). */
    setWhale(value: boolean): void;
    /** Set the ambient marine-life flag (fish / bubbles / plankton). */
    setCritters(value: boolean): void;
    /** Set the interactive-mesh flag (dot-grid decoration). */
    setMesh(value: boolean): void;
    /** Set the cursor-spotlight flag (pointer-tracking glass glow). */
    setSpotlight(value: boolean): void;
    /** Set the hover-press flag (pane sinks a touch under the cursor). */
    setPress(value: boolean): void;
    /** Set the wallpaper blur radius (px). */
    setWallpaperBlur(value: number): void;
    /** Set the wallpaper frost veil (0-100). */
    setWallpaperFrost(value: number): void;
    /** Set the video wallpaper blur radius (px). */
    setVideoBlur(value: number): void;
    /** Set the video wallpaper brightness (0-100, 100 = fully lit). */
    setVideoBrightness(value: number): void;
    setRefract(value: number): void;
    setRefractOn(value: boolean): void;
    setDispersion(value: number): void;
    setSpecular(value: number): void;
    setScrim(value: number): void;
    setScrimBlur(value: number): void;
    setRim(value: boolean): void;
    /** After the user re-grants file access (选择视频 click on an fsa: video),
     *  drop the mount guard and re-apply so the file is re-read and played. */
    authorizeVideo(): void;
    private sync;
    /** Write the knob-driven CSS variables and mode attributes onto <html>. */
    private applySettings;
    /** The wallpaper plays as a plain <video> element (the browser's own
     *  decoder, no player chrome at all): looping on, cover fill via CSS, and
     *  autoplay with a muted fallback where policy requires it. A direct
     *  element (not an iframe) keeps backdrop-filter working over it, so the
     *  glass panels stay frosted above the video. */
    private configureWallpaperVideo;
    /** Apply the mode's token layer (floating palette, or translucent compat). */
    private applyTokens;
    private mount;
    /** Mount or drop the particle whale to match enabled + the whale flag. */
    private syncWhale;
    /** Mount or drop the interactive mesh to match enabled + the mesh flag. */
    private syncMesh;
    private unmount;
    /** Attach the fluid shader and the interaction feeds. */
    private mountFluid;
    private teardownFluid;
    private fluidParams;
    private applyFluidPalettes;
    /** Stamp the data-* seams the stylesheet keys off (self-contained mode). */
    private startSeamStamper;
    /** Attach the cursor-spotlight pointer feeds (idempotent per mount). */
    private startSpotlightFeed;
}
