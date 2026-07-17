import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { CheckCircle2, Rocket, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { AUTH_FEATURES } from '../../data/auth'
import Logo from '../ui/Logo'

const ICONS = {
  sparkles: Sparkles,
  rocket: Rocket,
  check: CheckCircle2,
}

const ROWS = [
  { name: 'UI/UX Design', opt: 40, like: 55, pes: 70, price: 8400, bars: [55, 70, 40] },
  { name: 'User Management', opt: 80, like: 110, pes: 140, price: 18700, bars: [70, 85, 55] },
  { name: 'Marketplace Flow', opt: 100, like: 140, pes: 190, price: 24200, bars: [80, 95, 60] },
]

export default function AuthMarketing() {
  const rootRef = useRef(null)
  const barsRef = useRef(null)
  const featurePanelRef = useRef(null)
  const featureProgressRef = useRef(null)
  const [activeRow, setActiveRow] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)

  const total = useMemo(() => ROWS.reduce((s, r) => s + r.price, 0), [])
  const selected = ROWS[activeRow]
  const feature = AUTH_FEATURES[activeFeature]
  const FeatureIcon = ICONS[feature.icon]

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll('[data-auth-intro]'),
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
      )
      gsap.fromTo(
        root.querySelector('[data-auth-card]'),
        { autoAlpha: 0, y: 36, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, delay: 0.2, ease: 'power3.out' },
      )
      gsap.fromTo(
        root.querySelectorAll('[data-auth-row]'),
        { autoAlpha: 0, x: -20 },
        { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.1, delay: 0.45, ease: 'power2.out' },
      )
      gsap.fromTo(
        root.querySelector('[data-auth-features]'),
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.65, delay: 0.7, ease: 'power3.out' },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    const bars = barsRef.current?.querySelectorAll('[data-bar-fill]')
    if (!bars?.length) return
    // Set bars to full width without auto-animating; click handlers animate them
    gsap.set(bars, { scaleX: 1, transformOrigin: 'left center' })
  }, [activeRow])

  useLayoutEffect(() => {
    const panel = featurePanelRef.current
    const progress = featureProgressRef.current
    if (!panel) return

    gsap.fromTo(
      panel,
      { autoAlpha: 0.55, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' },
    )

    const icon = panel.querySelector('[data-feature-icon]')
    if (icon) {
      gsap.fromTo(
        icon,
        { scale: 0.7, rotate: -12 },
        { scale: 1, rotate: 0, duration: 0.4, ease: 'back.out(1.8)', overwrite: 'auto' },
      )
    }

    // Confidence bar fills only when tab changes (triggered by click)
    if (progress) {
      gsap.fromTo(
        progress,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.65, ease: 'power3.out', overwrite: 'auto' },
      )
    }
  }, [activeFeature])

  const playBar = (index) => {
    const el = barsRef.current?.querySelectorAll('[data-bar-fill]')[index]
    if (!el) return
    gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.55, ease: 'power3.out', overwrite: 'auto' },
    )
  }

  const playConfidence = () => {
    const el = featureProgressRef.current
    if (!el) return
    gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.65, ease: 'power3.out', overwrite: 'auto' },
    )
  }

  const selectRow = (i) => {
    setActiveRow(i)
    // animate all bars for that row on click
    requestAnimationFrame(() => {
      const bars = barsRef.current?.querySelectorAll('[data-bar-fill]')
      bars?.forEach((bar, idx) => {
        gsap.fromTo(
          bar,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.5,
            delay: idx * 0.07,
            ease: 'power3.out',
            overwrite: 'auto',
          },
        )
      })
    })
  }

  const selectFeature = (i) => {
    setActiveFeature(i)
  }
  return (
    <aside
      ref={rootRef}
      className="relative hidden overflow-hidden bg-section-navy p-8 text-white lg:flex lg:flex-col lg:justify-between xl:p-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="pointer-events-none absolute -right-16 top-20 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-10 h-56 w-56 rounded-full bg-gold-500/15 blur-3xl" />

      <div className="relative">
        <div data-auth-intro className="mb-1">
          <Logo light className="pointer-events-none" />
        </div>
        <h2 data-auth-intro className="mt-4 max-w-xl text-2xl font-extrabold leading-snug xl:text-3xl">
          Forget endless Excel spreadsheets. EstimMate gives you instant timelines, team setup, costs, and a
          ready-to-go business proposal.
        </h2>
      </div>

      <div
        data-auth-card
        className="relative my-7 overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-white/70">Project estimate</span>
          <span className="rounded-lg bg-navy-900/60 px-2.5 py-1 text-xs font-bold text-gold-400">
            SUM ${total.toLocaleString()}
          </span>
        </div>

        <div className="mb-2 grid grid-cols-[1.4fr_0.6fr_0.6fr_0.6fr_0.8fr] gap-2 px-3 text-[10px] font-semibold uppercase tracking-wide text-white/45">
          <span>Item</span>
          <span>Opt</span>
          <span>Likely</span>
          <span>Pes</span>
          <span className="text-right">Price</span>
        </div>

        <div className="space-y-2">
          {ROWS.map((row, i) => (
            <button
              key={row.name}
              type="button"
              data-auth-row
              data-cursor
              onClick={() => selectRow(i)}
              className={`grid w-full cursor-pointer grid-cols-[1.4fr_0.6fr_0.6fr_0.6fr_0.8fr] gap-2 rounded-xl px-3 py-2.5 text-left text-[11px] transition duration-300 ${
                activeRow === i
                  ? 'bg-white/20 shadow-lg shadow-black/20 ring-1 ring-gold-400/60'
                  : 'bg-white/10 hover:bg-white/15'
              }`}
            >
              <span className="truncate font-semibold">{row.name}</span>
              <span className="text-white/70">{row.opt}h</span>
              <span className="text-white/70">{row.like}h</span>
              <span className="text-white/70">{row.pes}h</span>
              <span className="text-right font-bold">${row.price.toLocaleString()}</span>
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-white/60">
          <span>
            Selected: <span className="font-semibold text-white">{selected.name}</span>
          </span>
          <span className="font-bold text-gold-400">${selected.price.toLocaleString()}</span>
        </div>

        <div ref={barsRef} className="mt-4 grid grid-cols-3 gap-2">
          {selected.bars.map((w, i) => (
            <button
              key={`${activeRow}-${i}`}
              type="button"
              data-cursor
              className="group cursor-pointer"
              onClick={() => playBar(i)}
              aria-label={`Play progress ${i + 1}`}
            >
              <div className="h-2.5 overflow-hidden rounded-full bg-white/10 transition group-hover:bg-white/20">
                <div
                  data-bar-fill
                  className="h-full rounded-full bg-linear-to-r from-brand-400 to-gold-400"
                  style={{ width: `${w}%` }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div data-auth-features className="relative">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">Why teams switch</p>
          <div className="flex gap-1.5">
            {AUTH_FEATURES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to benefit ${i + 1}`}
                onClick={() => selectFeature(i)}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                  i === activeFeature ? 'w-6 bg-gold-400' : 'w-1.5 bg-white/25 hover:bg-white/45'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mb-3 grid grid-cols-3 gap-2">
          {AUTH_FEATURES.map((item, i) => {
            const Icon = ICONS[item.icon]
            const active = i === activeFeature
            return (
              <button
                key={item.id}
                type="button"
                data-cursor
                onClick={() => selectFeature(i)}
                className={`group cursor-pointer rounded-xl px-2.5 py-2.5 text-left transition duration-300 ${
                  active
                    ? 'bg-gold-400 text-navy-900 shadow-lg shadow-gold-500/20'
                    : 'bg-white/8 text-white/75 ring-1 ring-white/10 hover:bg-white/12 hover:text-white'
                }`}
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <span
                    className={`text-[10px] font-extrabold tracking-wide ${
                      active ? 'text-navy-800/70' : 'text-gold-400'
                    }`}
                  >
                    {item.step}
                  </span>
                  <Icon className={`h-3.5 w-3.5 ${active ? 'text-navy-900' : 'text-gold-400'}`} />
                </div>
                <p className={`text-[11px] font-bold leading-tight ${active ? 'text-navy-900' : 'text-white/90'}`}>
                  {item.short}
                </p>
              </button>
            )
          })}
        </div>

        <div
          ref={featurePanelRef}
          className="relative overflow-hidden rounded-2xl border border-white/15 bg-linear-to-br from-white/14 to-white/5 p-4 shadow-xl backdrop-blur-sm"
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold-400/15 blur-2xl" />

          <div className="relative flex gap-3">
            <span
              data-feature-icon
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-400/15 ring-1 ring-gold-400/40"
            >
              <FeatureIcon className="h-5 w-5 text-gold-400" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-extrabold leading-snug">{feature.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/75">{feature.description}</p>
            </div>
          </div>

          <div className="relative mt-4 flex items-end justify-between gap-3 border-t border-white/10 pt-3">
            <div>
              <p className="text-2xl font-extrabold text-gold-400">{feature.stat}</p>
              <p className="text-[11px] text-white/55">{feature.statLabel}</p>
            </div>
            <button
              type="button"
              data-cursor
              onClick={playConfidence}
              className="min-w-[40%] flex-1 cursor-pointer text-left"
              aria-label="Replay confidence progress"
            >
              <div className="mb-1 flex justify-between text-[10px] text-white/45">
                <span>Confidence</span>
                <span>{feature.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  ref={featureProgressRef}
                  className="h-full rounded-full bg-linear-to-r from-brand-400 to-gold-400"
                  style={{ width: `${feature.progress}%` }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
