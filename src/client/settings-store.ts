/**
 * Aqua row slot store: a mirror of the layer's state (enable flag plus the
 * knobs and the backdrop source). The plugin's apply-world change listener is
 * the only writer; the row component reads via props.useStore.
 */
import { defineStore, type EngineStoreHandle } from '@deepseek-ai/dsh-client-store'

/** Store state mirrored from the Aqua settings scope. */
export interface AquaRowState {
  /** Persisted layer enable flag. */
  enabled: boolean
  /** Rendering mode: mica (kit panes) or stock layout with generic glass. */
  mode: 'mica' | 'compat'
  /** Kit optics blur radius, px. */
  blur: number
  /** Kit optics brightness multiplier, 0-2. */
  brightness: number
  /** Kit optics refraction strength, 0-100. */
  refraction: number
  /** Kit optics refraction band width, px. */
  depth: number
  /** Kit optics bevel curvature, 0-1. */
  curvature: number
  /** Kit optics chromatic dispersion, 0-100. */
  dispersion: number
  /** Rim-light strength, 0-2. */
  highlight: number
  /** Mouse elasticity master. */
  elasticity: boolean
  /** Mouse elasticity strength, 0-0.5. */
  elasticityStrength: number
  /** Fluid hue, degrees (0-360, continuous). */
  fluidHue: number
  /** Fluid depth, 0-100 (continuous). */
  fluidDepth: number
  /** Background brightness, 0-100. */
  bgBrightness: number
  /** Resolved palette is dark (brightness knob = darkening half). */
  dark: boolean
  /** Backdrop source: fluid board or custom wallpaper. */
  background: 'fluid' | 'wallpaper'
  /** Wallpaper image data URL. */
  wallpaper: string
  /** Wallpaper blur radius, px. */
  wallpaperBlur: number
  /** Wallpaper frost veil, 0-100. */
  wallpaperFrost: number
  /** Video wallpaper blur radius, px. */
  videoBlur: number
  /** Video wallpaper brightness, 0-100. */
  videoBrightness: number
  /** Conversation pad opacity 0-100. */
  scrim: number
  /** Conversation pad blur, px. */
  scrimBlur: number
  /** Monotonic revision; -1 until first sync so revision 0 lands as a change. */
  revision: number
}

/** The full payload the layer pushes into the row store on every change. */
export interface AquaSettingsPayload {
  enabled: boolean
  mode: 'mica' | 'compat'
  blur: number
  brightness: number
  refraction: number
  depth: number
  curvature: number
  dispersion: number
  highlight: number
  elasticity: boolean
  elasticityStrength: number
  fluidHue: number
  fluidDepth: number
  bgBrightness: number
  dark: boolean
  background: 'fluid' | 'wallpaper'
  wallpaper: string
  wallpaperBlur: number
  wallpaperFrost: number
  videoBlur: number
  videoBrightness: number
  scrim: number
  scrimBlur: number
}

/** Declared action shape giving the exported factory a stable return type. */
type AquaRowActions = {
  sync: (draft: AquaRowState, next: AquaSettingsPayload, revision: number) => void
}

/**
 * Declares the Aqua row state and write surface.
 * @returns the store handle.
 */
export function createAquaRowStore(): EngineStoreHandle<AquaRowState, AquaRowActions> {
  return defineStore({
    init: (): AquaRowState => ({
      enabled: true,
      mode: 'mica',
      blur: 3,
      brightness: 1.1,
      refraction: 100,
      depth: 8,
      curvature: 0.2,
      dispersion: 10,
      highlight: 1,
      elasticity: true,
      elasticityStrength: 0.2,
      fluidHue: 320,
      fluidDepth: 25,
      bgBrightness: 50,
      dark: false,
      background: 'fluid',
      wallpaper: '',
      wallpaperBlur: 0,
      wallpaperFrost: 0,
      videoBlur: 6,
      videoBrightness: 45,
      scrim: 25,
      scrimBlur: 5,
      revision: -1,
    }),
    actions: {
      sync: (d, next: AquaSettingsPayload, revision: number) => {
        if (revision <= d.revision) return
        d.enabled = next.enabled
        d.mode = next.mode
        d.blur = next.blur
        d.brightness = next.brightness
        d.refraction = next.refraction
        d.depth = next.depth
        d.curvature = next.curvature
        d.dispersion = next.dispersion
        d.highlight = next.highlight
        d.elasticity = next.elasticity
        d.elasticityStrength = next.elasticityStrength
        d.fluidHue = next.fluidHue
        d.fluidDepth = next.fluidDepth
        d.bgBrightness = next.bgBrightness
        d.dark = next.dark
        d.background = next.background
        d.wallpaper = next.wallpaper
        d.wallpaperBlur = next.wallpaperBlur
        d.wallpaperFrost = next.wallpaperFrost
        d.videoBlur = next.videoBlur
        d.videoBrightness = next.videoBrightness
        d.scrim = next.scrim
        d.scrimBlur = next.scrimBlur
        d.revision = revision
      },
    },
  })
}
