import 'nico-glass-kit/style.css';
/** Optics subset the settings page exposes (kit scale: refraction/dispersion 0-1). */
export interface GlassPaneOptics {
    blur: number;
    brightness: number;
    refraction: number;
    depth: number;
    curvature: number;
    dispersion: number;
}
/** Operating parameters of the pane layer, derived from the layer settings. */
export interface GlassPaneParams {
    /** mica: kit panes exist. compat: token-level glass only, no panes at all. */
    mica: boolean;
    /** Pinned light/dark adaptation — kit's 'auto' cannot sample the WebGL canvas. */
    overLight: boolean;
    optics: GlassPaneOptics;
    /** Mouse elasticity 0-0.5; 0 also stops the pointer feed. */
    strength: number;
    /** Rim-light strength 0-2. */
    highlight: number;
}
/**
 * Hand fresh knobs to the pane layer.
 * @param params - pane parameters derived from the layer settings.
 */
export declare function syncGlassPanes(params: GlassPaneParams): void;
/**
 * Mount the pane layer: a hidden provider root plus a keeper that keeps the
 * pane set in sync with the app's DOM.
 * @param getParams - reads the current pane parameters.
 * @returns a disposer that removes every underlay and host hook.
 */
export declare function startGlassPanes(getParams: () => GlassPaneParams): () => void;
