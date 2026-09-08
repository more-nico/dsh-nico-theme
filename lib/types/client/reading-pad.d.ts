/**
 * Conversation reading pads: frost plates on user bubbles and assistant
 * prose only. Think/tool cards stay clear until expanded. Hero has none.
 * Ported from more-nico/dshLiquidTheme markReadingPads (no adaptive ink).
 */
export declare const PAD_ATTR = "data-dsh-nico-pad";
export declare function markReadingPads(): void;
export declare function clearReadingPads(): void;
export declare function startReadingPads(active: () => boolean): () => void;
