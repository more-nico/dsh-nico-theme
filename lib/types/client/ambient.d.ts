/**
 * Ambient backdrop scene: the markup the layer injects behind the app frame.
 * The deepseek.com-style fluid board is the scene — one WebGL canvas filling
 * the viewport, with the wallpaper media in its own fixed layer (videos fail
 * to composite inside the ambient's animated opacity group).
 */
/**
 * The complete ambient scene markup: one fixed, click-transparent container
 * the layer prepends to <body> while enabled and removes on disable.
 */
export declare const AMBIENT_SCENE = "<canvas data-dsh-aqua-fluid-canvas></canvas>";
/** Build the ambient container element (or reuse an existing one). */
export declare function ensureAmbientScene(): HTMLElement;
/** Remove the ambient container wherever it lives. */
export declare function removeAmbientScene(): void;
/** Add the page edge-fade bands (5px gradient blur over the chat content). */
export declare function ensurePageFades(): void;
/** Remove the edge-fade bands. */
export declare function removePageFades(): void;
