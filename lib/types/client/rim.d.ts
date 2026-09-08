/**
 * Pointer-centered 1px glass rim. Distinct from the in-pane spotlight glow.
 * Sidebar column is skipped so the settings overlay is never filtered.
 */
/** Follow the pointer with a 1px radial rim on mica glass panes. */
export declare function startRim(active: () => boolean): () => void;
