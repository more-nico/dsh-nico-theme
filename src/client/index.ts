/**
 * Aqua client plugin body: the toggleable glassmorphism skin. Owns the durable
 * enable flag (localStorage), applies/retracts the theme layer through
 * {@link AquaLayer}, and registers two settings surfaces:
 * - the master on/off card into the Plugins section (`settings.plugin.item`);
 * - a dedicated left-nav settings page (`settings.section`, id `nico`)
 *   that now owns every glass knob (the old General → 外观 row has been
 *   removed — native 浅色/深色 stays alone).
 * One click on the master switch returns the stock UI (every layer is an
 * effect, disposed on flip).
 */
// The client context is the plain cordis Context since DSH 0.1.2: the former
// @deepseek-ai/dsh-client-runtime package was split into dsh-client-store
// (store engine) and dsh-client-ui-renderer (SlotRegistry service).
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { BoundActions } from '@deepseek-ai/dsh-client-ui-slots'
// Type-only: pulls the `slots` service augmentation (`ctx.slots`) — the
// SlotRegistry moved from dsh-client-runtime to dsh-client-ui-renderer in
// DSH 0.1.2.
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
// Type-only: pulls the `settings.plugin.item` SlotMap merge.
import type {} from '@deepseek-ai/dsh-client-ui-settings-plugins/client'
// Type-only: pulls the settings SlotMap merge (`settings.section`).
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { AquaPluginCard, type AquaPluginCardInjected } from './AquaPluginCard.tsx'
import { NicoSettingsPage, type NicoSettingsPageInjected } from './NicoSettingsPage.tsx'
import { createAquaRowStore, type AquaSettingsPayload } from './settings-store.ts'
import { en, NS, zh } from './locales.ts'
import { AquaLayer } from './theme-layer.ts'
// Side-effect imports: the theme-layer stylesheet (unloaded with the plugin)
// and the self-hosted Space Grotesk @font-face (no shell dependency).
import './aqua.module.css'
import './fonts.module.css'

/** Required services: theme override stack plus the settings-card surfaces. */
export const inject = ['theme', 'slots', 'locale']

/**
 * Client plugin body.
 * @param ctx - client cordis context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-nico: settings dictionaries')

  // The layer owns its lifecycle: enable flag, token stack, and CSS attribute
  // are all effects released on disable/dispose.
  const layer = new AquaLayer(ctx)

  // Two store mirrors of the same layer state: Plugins card (master switch)
  // and the dedicated settings page (full-page edition of every knob).
  const pluginStore = createAquaRowStore()
  const pageStore = createAquaRowStore()
  let pluginBound: BoundActions<typeof pluginStore> | undefined
  let pageBound: BoundActions<typeof pageStore> | undefined
  let revision = 0
  const payload = (): AquaSettingsPayload => {
    const s = layer.getSettings()
    return {
      enabled: layer.getEnabled(),
      mode: s.mode,
      blur: s.blur,
      frost: s.frost,
      fluidHue: s.fluidHue,
      fluidDepth: s.fluidDepth,
      bgBrightness: s.bgBrightness,
      dark: layer.getDark(),
      background: s.background,
      wallpaper: s.wallpaper,
      whale: s.whale,
      critters: s.critters,
      mesh: s.mesh,
      spotlight: s.spotlight,
      press: s.press,
      wallpaperBlur: s.wallpaperBlur,
      wallpaperFrost: s.wallpaperFrost,
      videoBlur: s.videoBlur,
      videoBrightness: s.videoBrightness,
      refract: s.refract,
      refractOn: s.refractOn,
      dispersion: s.dispersion,
      specular: s.specular,
      scrim: s.scrim,
      scrimBlur: s.scrimBlur,
      rim: s.rim,
    }
  }
  const sync = (): void => {
    const next = payload()
    pluginBound?.sync(next, revision)
    pageBound?.sync(next, revision)
    revision += 1
  }
  // The Appearance switch flips the brightness knob's half-range; re-sync
  // both stores so the row re-renders with the new range.
  ctx.effect(() => ctx.on('theme/change', () => { sync() }), 'ui-nico: appearance scheme sync')

  const createInjected = (): Omit<NicoSettingsPageInjected, 'setEnabled'> & Pick<NicoSettingsPageInjected, 'setEnabled'> => ({
    setEnabled: (enabled) => {
      layer.setEnabled(enabled)
      sync()
    },
    setMode: (mode) => {
      layer.setMode(mode)
      sync()
    },
    setBlur: (blur) => {
      layer.setBlur(blur)
      sync()
    },
    setFrost: (frost) => {
      layer.setFrost(frost)
      sync()
    },
    setFluidHue: (fluidHue) => {
      layer.setFluidHue(fluidHue)
      sync()
    },
    setFluidDepth: (fluidDepth) => {
      layer.setFluidDepth(fluidDepth)
      sync()
    },
    setBgBrightness: (bgBrightness) => {
      layer.setBgBrightness(bgBrightness)
      sync()
    },
    setBackground: (background) => {
      layer.setBackground(background)
      sync()
    },
    setWallpaper: (wallpaper) => {
      layer.setWallpaper(wallpaper)
      sync()
    },
    setWhale: (whale) => {
      layer.setWhale(whale)
      sync()
    },
    setCritters: (critters) => {
      layer.setCritters(critters)
      sync()
    },
    setMesh: (mesh) => {
      layer.setMesh(mesh)
      sync()
    },
    setSpotlight: (spotlight) => {
      layer.setSpotlight(spotlight)
      sync()
    },
    setPress: (press) => {
      layer.setPress(press)
      sync()
    },
    setWallpaperBlur: (wallpaperBlur) => {
      layer.setWallpaperBlur(wallpaperBlur)
      sync()
    },
    setWallpaperFrost: (wallpaperFrost) => {
      layer.setWallpaperFrost(wallpaperFrost)
      sync()
    },
    setVideoBlur: (videoBlur) => {
      layer.setVideoBlur(videoBlur)
      sync()
    },
    setVideoBrightness: (videoBrightness) => {
      layer.setVideoBrightness(videoBrightness)
      sync()
    },
    authorizeVideo: () => {
      layer.authorizeVideo()
    },
    setRefract: (refract) => {
      layer.setRefract(refract)
      sync()
    },
    setRefractOn: (refractOn) => {
      layer.setRefractOn(refractOn)
      sync()
    },
    setDispersion: (dispersion) => {
      layer.setDispersion(dispersion)
      sync()
    },
    setSpecular: (specular) => {
      layer.setSpecular(specular)
      sync()
    },
    setScrim: (scrim) => {
      layer.setScrim(scrim)
      sync()
    },
    setScrimBlur: (scrimBlur) => {
      layer.setScrimBlur(scrimBlur)
      sync()
    },
    setRim: (rim) => {
      layer.setRim(rim)
      sync()
    },
  })

  const pluginInjected = (actions: BoundActions<typeof pluginStore>): AquaPluginCardInjected => {
    pluginBound = actions
    sync()
    const full = createInjected()
    return { setEnabled: full.setEnabled }
  }
  const pageInjected = (actions: BoundActions<typeof pageStore>): NicoSettingsPageInjected => {
    pageBound = actions
    sync()
    return createInjected()
  }

  // Master switch card in the Plugins configurable tab. The slot is keyed
  // by the settings namespace a card edits, so the key must equal the
  // 'nico' namespace the node half registers (see src/index.ts).
  ctx.slots.inject('settings.plugin.item', () => ctx.slots.register({
    name: 'settings.plugin.item',
    key: 'nico',
    store: pluginStore,
    locale: NS,
    inject: pluginInjected,
  }, AquaPluginCard))

  // Dedicated left-nav settings page. All Nico controls now live here —
  // the old General → 外观 (`settings.general.item`) injection has been
  // dropped so native 浅色/深色/跟随系统 stays clean (see screenshot).
  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section',
    id: 'nico',
    order: 90,
    label: () => ctx.locale.bind(NS)('aqua.pageTitle'),
    store: pageStore,
    locale: NS,
    inject: pageInjected,
  }, NicoSettingsPage))
}
