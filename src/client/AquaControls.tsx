/**
 * Shared controls for the Nico settings page, built on nico-glass-kit: the
 * Knob (glass slider + number field), a segmented picker, the switch, and the
 * wallpaper/action capsule buttons. Kept in one file so the page stays a
 * single surface.
 */
import type { ReactNode } from 'react'
import { GlassButton, GlassInput, GlassSegmentedControl, GlassSlider, GlassSwitch } from 'nico-glass-kit'
import css from './AquaAppearanceRow.module.css'

/** One slider + number box, wired to a single value. */
export interface KnobProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (value: number) => void
}

/** Render one knob row. */
export function Knob({ label, value, min, max, step, unit, onChange }: KnobProps) {
  const clamp = (n: number) => Math.min(max, Math.max(min, Number.isFinite(n) ? n : min))
  const safeValue = clamp(value)
  return (
    <label className={css.knob}>
      <span className={css.knobLabel}>{label}</span>
      <GlassSlider
        className={css.slider}
        min={min}
        max={max}
        step={step}
        value={safeValue}
        onChange={(next) => { onChange(clamp(next)) }}
      />
      <span className={css.numberWrap}>
        <GlassInput
          className={css.number}
          type="number"
          size="sm"
          min={min}
          max={max}
          step={step}
          value={safeValue}
          onChange={(e) => { onChange(clamp(Number(e.target.value))) }}
        />
        <span className={css.unit}>{unit}</span>
      </span>
    </label>
  )
}

/** One segment of a Segmented picker. */
export interface SegmentedOption<T extends string> {
  id: T
  label: string
  /** Decorative visual above the label (icon or thumbnail); text stays the accessible name. */
  visual?: ReactNode
  /** Extra class hook for per-option visuals (e.g. the fluid gradient). */
  visualClass?: string
}

export interface SegmentedProps<T extends string> {
  /** Accessible name for the button group. */
  label: string
  value: T
  options: readonly SegmentedOption<T>[]
  onSelect: (value: T) => void
  /** `cards` renders the large two-column choice cards. */
  variant?: 'compact' | 'cards'
}

/** Render a two-option segmented picker (compact pills or large cards). */
export function Segmented<T extends string>({ label, value, options, onSelect, variant = 'compact' }: SegmentedProps<T>) {
  return (
    <GlassSegmentedControl
      className={variant === 'cards' ? css.segmentedCards : css.segmented}
      aria-label={label}
      items={options.map(option => ({
        key: option.id,
        label: option.label,
        icon: option.visual !== undefined && (
          <span className={option.visualClass ?? css.cardVisual}>{option.visual}</span>
        ),
      }))}
      value={value}
      onChange={(key) => { onSelect(key as T) }}
    />
  )
}

export interface ToggleProps {
  /** Accessible name for the setting represented by the switch. */
  label: string
  pressed: boolean
  onChange: (pressed: boolean) => void
}

/** Render the compact switch used by every boolean appearance setting. */
export function Toggle({ label, pressed, onChange }: ToggleProps) {
  return (
    <GlassSwitch
      className={css.toggle}
      aria-label={label}
      checked={pressed}
      onChange={onChange}
    />
  )
}

export interface PickButtonProps {
  children: ReactNode
  onClick: () => void
  /** Destructive action (delete wallpaper). */
  danger?: boolean
}

/** Capsule action button (choose image / choose video / delete / enable). */
export function PickButton({ children, onClick, danger = false }: PickButtonProps) {
  return (
    <GlassButton
      className={danger ? `${css.pickButton} ${css.deleteButton}` : css.pickButton}
      size="sm"
      onClick={onClick}
    >
      {children}
    </GlassButton>
  )
}

/** Read a file, downscale to ≤1920px, and return a compact JPEG data URL. */
export async function fileToDataUrl(file: File): Promise<string> {
  const raw = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => { resolve(String(reader.result)) }
    reader.onerror = () => { reject(reader.error) }
    reader.readAsDataURL(file)
  })
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const im = new Image()
    im.onload = () => { resolve(im) }
    im.onerror = () => { reject(new Error('image load failed')) }
    im.src = raw
  })
  const scale = Math.min(1, 1920 / Math.max(image.width, image.height))
  const w = Math.max(1, Math.round(image.width * scale))
  const h = Math.max(1, Math.round(image.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (ctx === null) return raw
  ctx.drawImage(image, 0, 0, w, h)
  return canvas.toDataURL('image/jpeg', 0.82)
}
