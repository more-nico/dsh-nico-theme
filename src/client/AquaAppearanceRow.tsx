/**
 * Aqua row registered into the General settings section
 * (`settings.general.item`, right under Appearance): every glass knob — mode
 * (mica / compatibility), blur/frost (mica mode only), fluid color,
 * background brightness, the backdrop source picker, and the wallpaper
 * picker with its two knobs. Every
 * write goes straight through to the layer, so the skin moves live. The
 * controls follow the Appearance cubes directly (no row title of their own),
 * and the whole row renders nothing while the master switch in the Plugins
 * section is off.
 */
import { useRef } from 'react'
import { IconCodeOutline16, IconEnhanceOutline16 } from '@deepseek-ai/dsh-client-ui-primitives'
import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
// Type-only: pulls the `settings.general.item` SlotMap merge.
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { fileToDataUrl, Knob, Segmented, Toggle } from './AquaControls.tsx'
import { loadVideoHandle, saveVideoBlob, saveVideoHandle } from './wallpaper-store.ts'
import type { createAquaRowStore } from './settings-store.ts'
import css from './AquaAppearanceRow.module.css'

/** Injected business face: every knob write except the master switch. */
export interface AquaAppearanceRowInjected {
  /** Set the rendering mode. */
  setMode: (value: 'mica' | 'compat') => void
  /** Set the glass blur radius, px. */
  setBlur: (value: number) => void
  /** Set the glass frost amount, 0-100. */
  setFrost: (value: number) => void
  /** Set the fluid hue, degrees (0-360, continuous). */
  setFluidHue: (value: number) => void
  /** Set the fluid depth, 0-100 (continuous). */
  setFluidDepth: (value: number) => void
  /** Set the background brightness, 0-100 (0 = black, 50 = transparent, 100 = white). */
  setBgBrightness: (value: number) => void
  /** Set the backdrop source. */
  setBackground: (value: 'fluid' | 'wallpaper') => void
  /** Set the wallpaper image (a data URL). */
  setWallpaper: (value: string) => void
  /** Set the particle-whale flag. */
  setWhale: (value: boolean) => void
  /** Set the ambient marine-life flag. */
  setCritters: (value: boolean) => void
  /** Set the interactive-mesh flag. */
  setMesh: (value: boolean) => void
  /** Set the cursor-spotlight flag. */
  setSpotlight: (value: boolean) => void
  /** Set the hover-press flag. */
  setPress: (value: boolean) => void
  /** Set the wallpaper blur radius, px. */
  setWallpaperBlur: (value: number) => void
  /** Set the wallpaper frost veil, 0-100. */
  setWallpaperFrost: (value: number) => void
  /** Set the video wallpaper blur radius, px. */
  setVideoBlur: (value: number) => void
  /** Set the video wallpaper brightness, 0-100. */
  setVideoBrightness: (value: number) => void
  /** Re-read the fsa: video after the user re-granted file access. */
  authorizeVideo: () => void
  setRefract: (value: number) => void
  setRefractOn: (value: boolean) => void
  setScrim: (value: number) => void
  setScrimBlur: (value: number) => void
  setRim: (value: boolean) => void
}

/** Full component props: runtime share + store share + locale seat + injected face. */
export type AquaAppearanceRowComponentProps =
  PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createAquaRowStore>>
  & PropsLocale<'settings.nico'> & AquaAppearanceRowInjected

/**
 * Render the Aqua appearance row.
 * @param props - composed slot props.
 * @returns the General section row.
 */
export function AquaAppearanceRow(props: AquaAppearanceRowComponentProps) {
  const {
    t, setMode, setBlur, setFrost, setFluidHue, setFluidDepth, setBgBrightness,
    setBackground, setWallpaper, setWhale, setCritters, setMesh, setSpotlight, setPress,
    setWallpaperBlur, setWallpaperFrost, setVideoBlur, setVideoBrightness, authorizeVideo,
    setRefract, setRefractOn, setScrim, setScrimBlur, setRim, useStore,
  } = props
  const enabled = useStore(s => s.enabled)
  const mode = useStore(s => s.mode)
  const blur = useStore(s => s.blur)
  const frost = useStore(s => s.frost)
  const fluidHue = useStore(s => s.fluidHue)
  const fluidDepth = useStore(s => s.fluidDepth)
  const bgBrightness = useStore(s => s.bgBrightness)
  const dark = useStore(s => s.dark)
  const background = useStore(s => s.background)
  const whale = useStore(s => s.whale)
  const critters = useStore(s => s.critters)
  const mesh = useStore(s => s.mesh)
  const spotlight = useStore(s => s.spotlight)
  const press = useStore(s => s.press)
  const wallpaper = useStore(s => s.wallpaper)
  const wallpaperBlur = useStore(s => s.wallpaperBlur)
  const wallpaperFrost = useStore(s => s.wallpaperFrost)
  const videoBlur = useStore(s => s.videoBlur)
  const videoBrightness = useStore(s => s.videoBrightness)
  const refract = useStore(s => s.refract)
  const refractOn = useStore(s => s.refractOn)
  const scrim = useStore(s => s.scrim)
  const scrimBlur = useStore(s => s.scrimBlur)
  const rim = useStore(s => s.rim)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const videoRef = useRef<HTMLInputElement | null>(null)

  // Videos are `idb:` blobs, `fsa:` remembered-file handles, or legacy
  // `data:video/` URLs.
  const isVideoWallpaper = wallpaper.startsWith('data:video/') || wallpaper.startsWith('idb:') || wallpaper.startsWith('fsa:')

  /** Pick a video. Chromium: File System Access — the browser remembers the
   *  file authorization, so later visits re-read the ORIGINAL file with no
   *  storage copy. Other browsers fall back to the plain file input. */
  const pickVideo = (): void => {
    if (window.showOpenFilePicker !== undefined) {
      void (async () => {
        try {
          const [handle] = await window.showOpenFilePicker({
            multiple: false,
            types: [{ description: 'Video', accept: { 'video/*': ['.mp4', '.webm', '.ogg', '.mov', '.m4v', '.mkv'] } }],
          })
          if (handle === undefined) return
          setBackground('wallpaper')
          if (await saveVideoHandle(handle)) {
            setWallpaper(`fsa:${handle.name}`)
          } else {
            // idb unavailable — degrade to the blob store / data URL path.
            const file = await handle.getFile()
            void saveVideoBlob(file).then((id) => {
              if (id !== '') setWallpaper(id)
              else void fileToDataUrl(file).then(setWallpaper)
            })
          }
        } catch {
          /* picker cancelled — keep current state */
        }
      })()
    } else {
      videoRef.current?.click()
    }
  }

  /** 选择视频 click: an fsa: video with stale permission re-authorizes in
   *  one click (no picker); anything else opens the picker. */
  const onChooseVideo = (): void => {
    if (wallpaper.startsWith('fsa:')) {
      void (async () => {
        const handle = await loadVideoHandle()
        if (handle !== null) {
          try {
            const permission = await handle.queryPermission({ mode: 'read' })
            if (permission === 'granted') {
              authorizeVideo()
              return
            }
            if (permission === 'prompt') {
              const next = await handle.requestPermission({ mode: 'read' })
              if (next === 'granted') {
                authorizeVideo()
                return
              }
            }
          } catch {
            /* fall through to re-pick */
          }
        }
        pickVideo()
      })()
    } else {
      pickVideo()
    }
  }

  // The brightness knob only ever offers the half that makes sense for the
  // resolved scheme: dark mode darkens (0-50), light mode brightens (50-100).
  // The stored 0-100 value is clamped for display; writing always stays in
  // the offered range, so a value picked in one scheme is inert in the other.
  const bgMin = dark ? 0 : 50
  const bgMax = dark ? 50 : 100
  const bgDisplay = Math.min(bgMax, Math.max(bgMin, bgBrightness))

  // Off = the Plugins master switch is off: leave no trace in General.
  if (!enabled) return null

  return (
    <div className={css.group} data-dsh-nico-appearance>
      {/* 模式 */}
      <div className={css.subGroup}>
        <div className={css.subTitle}>{t('aqua.mode')}</div>
        <div className={css.controls}>
          <div className={css.rowStandalone}>
            <div className={css.rowControl}>
              <Segmented
                label={t('aqua.mode')}
                value={mode}
                variant="cards"
                options={[
                  { id: 'mica', label: t('aqua.modeMica'), visual: <IconEnhanceOutline16 />, visualClass: css.cardVisual },
                  { id: 'compat', label: t('aqua.modeCompat'), visual: <IconCodeOutline16 />, visualClass: css.cardVisual },
                ]}
                onSelect={setMode}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 玻璃材质：仅云母模式 */}
      {mode === 'mica' && (
        <div className={css.subGroup}>
          <div className={css.subTitle}>{t('aqua.materialGroup')}</div>
          <div className={css.controls}>
            <Knob label={t('aqua.blur')} value={blur} min={0} max={40} step={0.5} unit="px" onChange={setBlur} />
            <Knob label={t('aqua.frost')} value={frost} min={0} max={100} step={1} unit="%" onChange={setFrost} />
            <div className={css.row}>
              <span className={css.rowLabel}>{t('aqua.refractOn')}</span>
              <div className={css.rowControl}>
                <Toggle label={t('aqua.refractOn')} pressed={refractOn} onChange={setRefractOn} />
              </div>
            </div>
            {refractOn && (
              <Knob label={t('aqua.refract')} value={refract} min={0} max={100} step={1} unit="%" onChange={setRefract} />
            )}
          </div>
        </div>
      )}

      {/* 背景 */}
      <div className={css.subGroup}>
        <div className={css.subTitle}>{t('aqua.background')}</div>
        <div className={css.controls}>
          <div className={css.rowStandalone}>
            <div className={css.rowControl}>
              <Segmented
                label={t('aqua.background')}
                value={background}
                variant="cards"
                options={[
                  {
                    id: 'fluid',
                    label: t('aqua.backgroundFluid'),
                    visual: <span className={css.thumbFluid} />,
                    visualClass: css.cardVisual,
                  },
                  {
                    id: 'wallpaper',
                    label: t('aqua.backgroundWallpaper'),
                    visual: wallpaper.startsWith('data:image/')
                      ? <img className={css.thumbImage} src={wallpaper} alt="" />
                      : <span className={css.thumbPlaceholder} />,
                    visualClass: css.cardVisual,
                  },
                ]}
                onSelect={setBackground}
              />
            </div>
          </div>

          {background === 'fluid' && (
            <>
              <Knob label={t('aqua.fluidHue')} value={fluidHue} min={0} max={360} step={1} unit="°" onChange={setFluidHue} />
              <Knob label={t('aqua.fluidDepth')} value={fluidDepth} min={0} max={100} step={1} unit="%" onChange={setFluidDepth} />
            </>
          )}

          {background === 'wallpaper' && (
            <>
              <div className={css.row}>
                <span className={css.rowLabel}>{t('aqua.wallpaper')}</span>
                <div className={css.rowControl}>
                  <div className={css.wallpaperPick}>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className={css.fileInput}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file !== undefined) {
                          setBackground('wallpaper')
                          void fileToDataUrl(file).then(setWallpaper)
                        }
                        e.target.value = ''
                      }}
                    />
                    <input
                      ref={videoRef}
                      type="file"
                      accept="video/mp4,video/webm,video/ogg,video/quicktime"
                      className={css.fileInput}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file !== undefined) {
                          // Picking a backdrop switches the source to wallpaper
                          // automatically, so the media shows right away. The
                          // video plays through the browser's native decoder as
                          // the background (no controls, no progress bar).
                          setBackground('wallpaper')
                          // ALWAYS persist videos in IndexedDB: even a small
                          // video's data URL can blow the localStorage quota
                          // (base64 inflates 33%), which would silently lose
                          // the wallpaper on the next reload. Only when idb is
                          // unavailable do we fall back to the data-URL path.
                          void saveVideoBlob(file).then((id) => {
                            if (id !== '') {
                              setWallpaper(id)
                            } else {
                              void fileToDataUrl(file).then(setWallpaper)
                            }
                          })
                        }
                        e.target.value = ''
                      }}
                    />
                    <button type="button" className={css.pickButton} onClick={() => { fileRef.current?.click() }}>
                      {t('aqua.chooseImage')}
                    </button>
                    <button type="button" className={css.pickButton} onClick={onChooseVideo}>
                      {t('aqua.chooseVideo')}
                    </button>
                    {wallpaper !== '' && (
                      <button type="button" className={css.deleteButton} onClick={() => { setWallpaper('') }}>
                        {t('aqua.deleteWallpaper')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className={css.knobHint}>{t('aqua.wallpaperHint')}</div>
              {/* 视频壁纸不支持模糊/磨砂调节（视频直接清晰播放） */}
              {!isVideoWallpaper && (
                <>
                  <Knob label={t('aqua.wallpaperBlur')} value={wallpaperBlur} min={0} max={40} step={0.5} unit="px" onChange={setWallpaperBlur} />
                  <Knob label={t('aqua.wallpaperFrost')} value={wallpaperFrost} min={0} max={100} step={1} unit="%" onChange={setWallpaperFrost} />
                </>
              )}
              {/* 视频壁纸：模糊度 + 亮度，配上提醒 */}
              {isVideoWallpaper && (
                <>
                  <Knob label={t('aqua.videoBlur')} value={videoBlur} min={0} max={40} step={0.5} unit="px" onChange={setVideoBlur} />
                  <Knob label={t('aqua.videoBrightness')} value={videoBrightness} min={0} max={100} step={1} unit="%" onChange={setVideoBrightness} />
                  <div className={css.knobHint}>{t('aqua.videoHint')}</div>
                </>
              )}
            </>
          )}

          <Knob label={t('aqua.bgBrightness')} value={bgDisplay} min={bgMin} max={bgMax} step={1} unit="%" onChange={setBgBrightness} />
          <div className={css.knobHint}>
            {t(dark ? 'aqua.bgBrightnessHintDark' : 'aqua.bgBrightnessHintLight')}
          </div>
        </div>
      </div>

      {/* 装饰：环境装饰 */}
      <div className={css.subGroup}>
        <div className={css.subTitle}>{t('aqua.decorAmbient')}</div>
        <div className={css.controls}>
          <div className={css.switchGrid}>
            <div className={css.switchCell}>
              <span className={css.switchLabel}>{t('aqua.whale')}</span>
              <Toggle label={t('aqua.whale')} pressed={whale} onChange={setWhale} />
            </div>
            <div className={css.switchCell}>
              <span className={css.switchLabel}>{t('aqua.critters')}</span>
              <Toggle label={t('aqua.critters')} pressed={critters} onChange={setCritters} />
            </div>
            <div className={css.switchCell}>
              <span className={css.switchLabel}>{t('aqua.mesh')}</span>
              <Toggle label={t('aqua.mesh')} pressed={mesh} onChange={setMesh} />
            </div>
          </div>
        </div>
      </div>

      {/* 装饰：悬停效果（仅云母模式的漂浮玻璃） */}
      {mode === 'mica' && (
        <div className={css.subGroup}>
          <div className={css.subTitle}>{t('aqua.decorHover')}</div>
          <div className={css.controls}>
            <div className={css.switchGrid}>
              <div className={css.switchCell}>
                <span className={css.switchLabel}>{t('aqua.spotlight')}</span>
                <Toggle label={t('aqua.spotlight')} pressed={spotlight} onChange={setSpotlight} />
              </div>
              <div className={css.switchCell}>
                <span className={css.switchLabel}>{t('aqua.rim')}</span>
                <Toggle label={t('aqua.rim')} pressed={rim} onChange={setRim} />
              </div>
              <div className={css.switchCell}>
                <span className={css.switchLabel}>{t('aqua.press')}</span>
                <Toggle label={t('aqua.press')} pressed={press} onChange={setPress} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={css.subGroup}>
        <div className={css.subTitle}>{t('aqua.scrimGroup')}</div>
        <div className={css.controls}>
          <Knob label={t('aqua.scrim')} value={scrim} min={0} max={100} step={1} unit="%" onChange={setScrim} />
          <Knob label={t('aqua.scrimBlur')} value={scrimBlur} min={0} max={40} step={0.5} unit="px" onChange={setScrimBlur} />
        </div>
      </div>
    </div>
  )
}
