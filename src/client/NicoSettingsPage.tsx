/**
 * Dedicated settings page for the settings panel's left nav
 * (`settings.section`, id `nico`). Full-page edition of the General →
 * Appearance row: the same 20+ glass knobs, backdrop picker, and ambient
 * toggles, now in a page shell with its own header and a disabled-state
 * empty view. All writes go through the same {@link AquaLayer} paths, so
 * the three surfaces (Plugins card / General row / this page) stay in sync.
 */
import { useRef } from 'react'
import { IconCodeOutline16, IconEnhanceOutline16 } from '@deepseek-ai/dsh-client-ui-primitives'
import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
// Type-only: pulls the `settings.section` SlotMap merge.
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { fileToDataUrl, Knob, Segmented, Toggle } from './AquaControls.tsx'
import { loadVideoHandle, saveVideoBlob, saveVideoHandle } from './wallpaper-store.ts'
import type { createAquaRowStore } from './settings-store.ts'
import css from './NicoSettingsPage.module.css'
import rowCss from './AquaAppearanceRow.module.css'

/** Injected business face for the dedicated page (enable + every knob). */
export interface NicoSettingsPageInjected {
  setEnabled: (enabled: boolean) => void
  setMode: (value: 'mica' | 'compat') => void
  setBlur: (value: number) => void
  setFrost: (value: number) => void
  setFluidHue: (value: number) => void
  setFluidDepth: (value: number) => void
  setBgBrightness: (value: number) => void
  setBackground: (value: 'fluid' | 'wallpaper') => void
  setWallpaper: (value: string) => void
  setWhale: (value: boolean) => void
  setCritters: (value: boolean) => void
  setMesh: (value: boolean) => void
  setSpotlight: (value: boolean) => void
  setPress: (value: boolean) => void
  setWallpaperBlur: (value: number) => void
  setWallpaperFrost: (value: number) => void
  setVideoBlur: (value: number) => void
  setVideoBrightness: (value: number) => void
  authorizeVideo: () => void
  setRefract: (value: number) => void
  setRefractOn: (value: boolean) => void
  setDispersion: (value: number) => void
  setSpecular: (value: number) => void
  setScrim: (value: number) => void
  setScrimBlur: (value: number) => void
  setRim: (value: boolean) => void
}

/** Full component props: runtime share + store share + locale seat + injected face. */
export type NicoSettingsPageComponentProps =
  PropsRuntime<'settings.section'> & PropsStore<ReturnType<typeof createAquaRowStore>>
  & PropsLocale<'settings.nico'> & NicoSettingsPageInjected

export function NicoSettingsPage(props: NicoSettingsPageComponentProps) {
  const {
    t, useStore,
    setEnabled, setMode, setBlur, setFrost, setFluidHue, setFluidDepth, setBgBrightness,
    setBackground, setWallpaper, setWhale, setCritters, setMesh, setSpotlight, setPress,
    setWallpaperBlur, setWallpaperFrost, setVideoBlur, setVideoBrightness, authorizeVideo,
    setRefract, setRefractOn, setDispersion, setSpecular, setScrim, setScrimBlur, setRim,
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
  const dispersion = useStore(s => s.dispersion)
  const specular = useStore(s => s.specular)
  const scrim = useStore(s => s.scrim)
  const scrimBlur = useStore(s => s.scrimBlur)
  const rim = useStore(s => s.rim)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const videoRef = useRef<HTMLInputElement | null>(null)

  const isVideoWallpaper = wallpaper.startsWith('data:video/') || wallpaper.startsWith('idb:') || wallpaper.startsWith('fsa:')

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

  const bgMin = dark ? 0 : 50
  const bgMax = dark ? 50 : 100
  const bgDisplay = Math.min(bgMax, Math.max(bgMin, bgBrightness))

  return (
    <div className={css.page} data-dsh-nico-page>
      <div className={css.header}>
        <div className={css.headerText}>
          <h2 className={css.title}>{t('aqua.pageTitle')}</h2>
          <p className={css.subtitle}>{t('aqua.pageSubtitle')}</p>
        </div>
        <div className={css.headerActions}>
          <span className={css.headerToggleLabel}>{enabled ? t('aqua.disableTheme') : t('aqua.enableTheme')}</span>
          <Toggle label={t('aqua.title')} pressed={enabled} onChange={setEnabled} />
        </div>
      </div>

      {!enabled && (
        <div className={css.notice} role="status">
          <span className={css.noticeText}>{t('aqua.disabledNotice')}</span>
          <button type="button" className={css.enableButton} onClick={() => { setEnabled(true) }}>
            {t('aqua.enableTheme')}
          </button>
        </div>
      )}

      <div className={`${css.content} ${!enabled ? css.contentDisabled : ''}`} aria-hidden={!enabled}>
        {/* 模式 */}
        <div className={rowCss.subGroup}>
          <div className={rowCss.subTitle}>{t('aqua.mode')}</div>
          <div className={rowCss.controls}>
            <div className={rowCss.rowStandalone}>
              <div className={rowCss.rowControl}>
                <Segmented
                  label={t('aqua.mode')}
                  value={mode}
                  variant="cards"
                  options={[
                    { id: 'mica', label: t('aqua.modeMica'), visual: <IconEnhanceOutline16 />, visualClass: rowCss.cardVisual },
                    { id: 'compat', label: t('aqua.modeCompat'), visual: <IconCodeOutline16 />, visualClass: rowCss.cardVisual },
                  ]}
                  onSelect={setMode}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 玻璃材质：仅云母模式 */}
        {mode === 'mica' && (
          <div className={rowCss.subGroup}>
            <div className={rowCss.subTitle}>{t('aqua.materialGroup')}</div>
            <div className={rowCss.controls}>
              <Knob label={t('aqua.blur')} value={blur} min={0} max={40} step={0.5} unit="px" onChange={setBlur} />
              <Knob label={t('aqua.frost')} value={frost} min={0} max={100} step={1} unit="%" onChange={setFrost} />
              <Knob label={t('aqua.specular')} value={specular} min={0} max={100} step={1} unit="%" onChange={setSpecular} />
              <div className={rowCss.row}>
                <span className={rowCss.rowLabel}>{t('aqua.refractOn')}</span>
                <div className={rowCss.rowControl}>
                  <Toggle label={t('aqua.refractOn')} pressed={refractOn} onChange={setRefractOn} />
                </div>
              </div>
              {refractOn && (
                <>
                  <Knob label={t('aqua.refract')} value={refract} min={0} max={100} step={1} unit="%" onChange={setRefract} />
                  <Knob label={t('aqua.dispersion')} value={dispersion} min={0} max={100} step={1} unit="%" onChange={setDispersion} />
                </>
              )}
            </div>
          </div>
        )}

        {/* 背景 */}
        <div className={rowCss.subGroup}>
          <div className={rowCss.subTitle}>{t('aqua.background')}</div>
          <div className={rowCss.controls}>
            <div className={rowCss.rowStandalone}>
              <div className={rowCss.rowControl}>
                <Segmented
                  label={t('aqua.background')}
                  value={background}
                  variant="cards"
                  options={[
                    {
                      id: 'fluid',
                      label: t('aqua.backgroundFluid'),
                      visual: <span className={rowCss.thumbFluid} />,
                      visualClass: rowCss.cardVisual,
                    },
                    {
                      id: 'wallpaper',
                      label: t('aqua.backgroundWallpaper'),
                      visual: wallpaper.startsWith('data:image/')
                        ? <img className={rowCss.thumbImage} src={wallpaper} alt="" />
                        : <span className={rowCss.thumbPlaceholder} />,
                      visualClass: rowCss.cardVisual,
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
                <div className={rowCss.row}>
                  <span className={rowCss.rowLabel}>{t('aqua.wallpaper')}</span>
                  <div className={rowCss.rowControl}>
                    <div className={rowCss.wallpaperPick}>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className={rowCss.fileInput}
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
                        className={rowCss.fileInput}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file !== undefined) {
                            setBackground('wallpaper')
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
                      <button type="button" className={rowCss.pickButton} onClick={() => { fileRef.current?.click() }}>
                        {t('aqua.chooseImage')}
                      </button>
                      <button type="button" className={rowCss.pickButton} onClick={onChooseVideo}>
                        {t('aqua.chooseVideo')}
                      </button>
                      {wallpaper !== '' && (
                        <button type="button" className={rowCss.deleteButton} onClick={() => { setWallpaper('') }}>
                          {t('aqua.deleteWallpaper')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className={rowCss.knobHint}>{t('aqua.wallpaperHint')}</div>
                {!isVideoWallpaper && (
                  <>
                    <Knob label={t('aqua.wallpaperBlur')} value={wallpaperBlur} min={0} max={40} step={0.5} unit="px" onChange={setWallpaperBlur} />
                    <Knob label={t('aqua.wallpaperFrost')} value={wallpaperFrost} min={0} max={100} step={1} unit="%" onChange={setWallpaperFrost} />
                  </>
                )}
                {isVideoWallpaper && (
                  <>
                    <Knob label={t('aqua.videoBlur')} value={videoBlur} min={0} max={40} step={0.5} unit="px" onChange={setVideoBlur} />
                    <Knob label={t('aqua.videoBrightness')} value={videoBrightness} min={0} max={100} step={1} unit="%" onChange={setVideoBrightness} />
                    <div className={rowCss.knobHint}>{t('aqua.videoHint')}</div>
                  </>
                )}
              </>
            )}

            <Knob label={t('aqua.bgBrightness')} value={bgDisplay} min={bgMin} max={bgMax} step={1} unit="%" onChange={setBgBrightness} />
            <div className={rowCss.knobHint}>
              {t(dark ? 'aqua.bgBrightnessHintDark' : 'aqua.bgBrightnessHintLight')}
            </div>
          </div>
        </div>

        {/* 装饰：环境装饰 */}
        <div className={rowCss.subGroup}>
          <div className={rowCss.subTitle}>{t('aqua.decorAmbient')}</div>
          <div className={rowCss.controls}>
            <div className={rowCss.switchGrid}>
              <div className={rowCss.switchCell}>
                <span className={rowCss.switchLabel}>{t('aqua.whale')}</span>
                <Toggle label={t('aqua.whale')} pressed={whale} onChange={setWhale} />
              </div>
              <div className={rowCss.switchCell}>
                <span className={rowCss.switchLabel}>{t('aqua.critters')}</span>
                <Toggle label={t('aqua.critters')} pressed={critters} onChange={setCritters} />
              </div>
              <div className={rowCss.switchCell}>
                <span className={rowCss.switchLabel}>{t('aqua.mesh')}</span>
                <Toggle label={t('aqua.mesh')} pressed={mesh} onChange={setMesh} />
              </div>
            </div>
          </div>
        </div>

        {/* 装饰：悬停效果（仅云母模式） */}
        {mode === 'mica' && (
          <div className={rowCss.subGroup}>
            <div className={rowCss.subTitle}>{t('aqua.decorHover')}</div>
            <div className={rowCss.controls}>
              <div className={rowCss.switchGrid}>
                <div className={rowCss.switchCell}>
                  <span className={rowCss.switchLabel}>{t('aqua.spotlight')}</span>
                  <Toggle label={t('aqua.spotlight')} pressed={spotlight} onChange={setSpotlight} />
                </div>
                <div className={rowCss.switchCell}>
                  <span className={rowCss.switchLabel}>{t('aqua.rim')}</span>
                  <Toggle label={t('aqua.rim')} pressed={rim} onChange={setRim} />
                </div>
                <div className={rowCss.switchCell}>
                  <span className={rowCss.switchLabel}>{t('aqua.press')}</span>
                  <Toggle label={t('aqua.press')} pressed={press} onChange={setPress} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={rowCss.subGroup}>
          <div className={rowCss.subTitle}>{t('aqua.scrimGroup')}</div>
          <div className={rowCss.controls}>
            <Knob label={t('aqua.scrim')} value={scrim} min={0} max={100} step={1} unit="%" onChange={setScrim} />
            <Knob label={t('aqua.scrimBlur')} value={scrimBlur} min={0} max={40} step={0.5} unit="px" onChange={setScrimBlur} />
          </div>
        </div>
      </div>
    </div>
  )
}
