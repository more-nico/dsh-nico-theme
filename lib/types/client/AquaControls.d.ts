/**
 * Shared controls for the Aqua General-settings appearance row: the Knob
 * (stepless slider + number box), a two-option Segmented picker, and the
 * wallpaper file reader. Kept in one file so the row stays a single surface.
 */
import type { ReactNode } from 'react';
/** One slider + number box, wired to a single value. */
export interface KnobProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit: string;
    onChange: (value: number) => void;
}
/** Render one knob row. */
export declare function Knob({ label, value, min, max, step, unit, onChange }: KnobProps): import("react").JSX.Element;
/** One segment of a Segmented picker. */
export interface SegmentedOption<T extends string> {
    id: T;
    label: string;
    /** Decorative visual above the label (icon or thumbnail); text stays the accessible name. */
    visual?: ReactNode;
    /** Extra class hook for per-option visuals (e.g. the fluid gradient). */
    visualClass?: string;
}
export interface SegmentedProps<T extends string> {
    /** Accessible name for the button group. */
    label: string;
    value: T;
    options: readonly SegmentedOption<T>[];
    onSelect: (value: T) => void;
    /** `cards` renders the large two-column choice cards. */
    variant?: 'compact' | 'cards';
}
/** Render a two-button segmented picker (compact pills or large cards). */
export declare function Segmented<T extends string>({ label, value, options, onSelect, variant }: SegmentedProps<T>): import("react").JSX.Element;
export interface ToggleProps {
    /** Accessible name for the setting represented by the switch. */
    label: string;
    pressed: boolean;
    onChange: (pressed: boolean) => void;
}
/** Render the compact switch used by every boolean appearance setting. */
export declare function Toggle({ label, pressed, onChange }: ToggleProps): import("react").JSX.Element;
/** Read a file, downscale to ≤1920px, and return a compact JPEG data URL. */
export declare function fileToDataUrl(file: File): Promise<string>;
