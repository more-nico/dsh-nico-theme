import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots';
import type { createAquaRowStore } from './settings-store.ts';
/** Injected business face for the dedicated page (enable + every knob). */
export interface NicoSettingsPageInjected {
    setEnabled: (enabled: boolean) => void;
    setMode: (value: 'mica' | 'compat') => void;
    setBlur: (value: number) => void;
    setFrost: (value: number) => void;
    setFluidHue: (value: number) => void;
    setFluidDepth: (value: number) => void;
    setBgBrightness: (value: number) => void;
    setBackground: (value: 'fluid' | 'wallpaper') => void;
    setWallpaper: (value: string) => void;
    setWhale: (value: boolean) => void;
    setCritters: (value: boolean) => void;
    setMesh: (value: boolean) => void;
    setSpotlight: (value: boolean) => void;
    setPress: (value: boolean) => void;
    setWallpaperBlur: (value: number) => void;
    setWallpaperFrost: (value: number) => void;
    setVideoBlur: (value: number) => void;
    setVideoBrightness: (value: number) => void;
    authorizeVideo: () => void;
    setRefract: (value: number) => void;
    setRefractOn: (value: boolean) => void;
    setDispersion: (value: number) => void;
    setSpecular: (value: number) => void;
    setScrim: (value: number) => void;
    setScrimBlur: (value: number) => void;
    setRim: (value: boolean) => void;
}
/** Full component props: runtime share + store share + locale seat + injected face. */
export type NicoSettingsPageComponentProps = PropsRuntime<'settings.section'> & PropsStore<ReturnType<typeof createAquaRowStore>> & PropsLocale<'settings.nico'> & NicoSettingsPageInjected;
export declare function NicoSettingsPage(props: NicoSettingsPageComponentProps): import("react").JSX.Element;
