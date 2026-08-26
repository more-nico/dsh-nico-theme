/**
 * Shared controls for the Aqua General-settings appearance row: the Knob
 * (stepless slider + number box), a two-option Segmented picker, and the
 * wallpaper file reader. Kept in one file so the row stays a single surface.
 */
import type { CSSProperties, ReactNode } from 'react'
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
  const progress = max > min ? ((safeValue - min) / (max - min)) * 100 : 0
  const sliderStyle = { '--nico-progress': `${progress}%` } as CSSProperties
  return (
    <label className={css.knob}>
      <span className={css.knobLabel}>{label}</span>
      <input
        type="range"
        className={css.slider}
        min={min}
        max={max}
        step={step}
        value={safeValue}
        style={sliderStyle}
        onChange={(e) => { onChange(clamp(Number(e.target.value))) }}
      />
      <span className={css.numberWrap}>
        <input
          type="number"
          className={css.number}
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

/** Render a two-button segmented picker (compact pills or large cards). */
export function Segmented<T extends string>({ label, value, options, onSelect, variant = 'compact' }: SegmentedProps<T>) {
  const groupClass = variant === 'cards' ? css.segmentedCards : css.segmented
  return (
    <div className={groupClass} role="group" aria-label={label}>
      {options.map(option => {
        const active = option.id === value
        const buttonClass = variant === 'cards'
          ? (active ? css.cardActive : css.card)
          : (active ? css.segActive : css.seg)
        return (
          <button
            key={option.id}
            type="button"
            className={buttonClass}
            aria-pressed={active}
            onClick={() => { onSelect(option.id) }}
          >
            {option.visual !== undefined && (
              <span className={option.visualClass ?? css.cardVisual} aria-hidden="true">{option.visual}</span>
            )}
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
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
    <button
      type="button"
      className={pressed ? css.toggleOn : css.toggle}
      aria-label={label}
      aria-pressed={pressed}
      onClick={() => { onChange(!pressed) }}
    >
      <span className={css.toggleTrack} aria-hidden="true">
        <span className={css.toggleThumb} />
      </span>
    </button>
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
