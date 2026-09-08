/**
 * Continuous fluid palette: hue (0-360) and depth (0-100) sliders drive the
 * shader colors directly through HSL interpolation — stepless, no preset
 * steps. Depth 0 = the deep, saturated version of the hue (e.g. #8B0000 for
 * red), depth 100 = the pale, light version (e.g. #FFCCCB); the deep base
 * stop stays near-neutral so the colorless areas keep their true color.
 */
export interface FluidToneColors {
    /** Bright bloom stop. */
    color1: string;
    /** Mid wash stop. */
    color2: string;
    /** Deep base stop (near-neutral). */
    color3: string;
}
/** The slider's 0/360 lands on the blue base, sweeping clockwise around the
 *  wheel — 320 lands on the cyan-blue the old hue-rotate system produced. */
export declare const HUE_BASE = 217;
/**
 * Palette for the given hue (0-360) and depth (0-100), per scheme.
 * The depth ramp is piecewise: the lower half sweeps from the absolute
 * extreme — pure black in dark mode, the deep saturated shade (e.g. #8B0000
 * for red) in light mode — up to the shipped mid look; the upper half
 * sweeps from mid to pale (#FFCCCB for red). Stepless HSL interpolation.
 */
export declare function fluidToneColors(dark: boolean, hue: number, depth: number): FluidToneColors;
