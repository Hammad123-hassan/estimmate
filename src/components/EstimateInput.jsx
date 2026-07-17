import { useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown, Loader2, Plus, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import Button from './ui/Button'

const LEVEL_OPTIONS = ['1-level', '2-level', '3-level']
const METHOD_OPTIONS = ['one-point', 'range-based', 'PERT']

export default function EstimateInput({ onBuild }) {
  const [brief, setBrief] = useState(
    'A mobile application that connects pet owners with local groomers and walkers.',
  )
  const [method, setMethod] = useState('one-point')
  const [level, setLevel] = useState('1-level')
  const [openMenu, setOpenMenu] = useState(null)
  const [building, setBuilding] = useState(false)
  const [result, setResult] = useState(null)
  const metricsRef = useRef(null)

  const handleBuild = async () => {
    if (!brief.trim() || building) return
    setBuilding(true)
    setResult(null)
    await new Promise((r) => setTimeout(r, 1400))
    const estimate = {
      title: brief.trim().slice(0, 64) + (brief.length > 64 ? '…' : ''),
      method,
      level,
      optimistic: 54782,
      pessimistic: 88494,
      sum: 71638,
      hours: level === '3-level' ? 920 : level === '2-level' ? 640 : 420,
    }
    setResult(estimate)
    setBuilding(false)
    onBuild?.(estimate)
  }

  useLayoutEffect(() => {
    if (!result || !metricsRef.current) return undefined
    const items = metricsRef.current.querySelectorAll('[data-stagger]')
    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 18, scale: 0.92 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.12,
        ease: 'power3.out',
        overwrite: 'auto',
      },
    )
  }, [result])

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-[28px] border border-brand-200/80 bg-white p-4 shadow-[0_20px_60px_-20px_rgba(91,110,242,0.35)] sm:p-5">
        <textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          rows={3}
          className="estimate-textarea w-full resize-none border-0 bg-transparent text-base leading-relaxed text-ink outline-none"
          placeholder="Describe your project…"
          aria-label="Project brief"
        />

        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-brand-50 pt-3">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-600 transition hover:bg-brand-200"
            aria-label="Add attachment"
            onClick={() =>
              setBrief((v) =>
                v.trim()
                  ? `${v}\n\nAdditional module: payments & notifications`
                  : 'Additional module: payments & notifications',
              )
            }
          >
            <Plus className="h-4 w-4" />
          </button>

          <SelectPill
            label={method}
            open={openMenu === 'method'}
            onToggle={() => setOpenMenu(openMenu === 'method' ? null : 'method')}
            options={METHOD_OPTIONS}
            onSelect={(v) => {
              setMethod(v)
              setOpenMenu(null)
            }}
            accent
          />

          <SelectPill
            label={level}
            open={openMenu === 'level'}
            onToggle={() => setOpenMenu(openMenu === 'level' ? null : 'level')}
            options={LEVEL_OPTIONS}
            onSelect={(v) => {
              setLevel(v)
              setOpenMenu(null)
            }}
          />

          <div className="ml-auto">
            <Button
              variant="primary"
              size="md"
              onClick={handleBuild}
              disabled={building || !brief.trim()}
              className="min-w-30"
            >
              {building ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Building
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Build
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-4 animate-[fadeUp_0.4s_ease] rounded-2xl border border-brand-200 bg-white/90 p-4 shadow-lg shadow-brand-500/10 backdrop-blur">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">Estimate ready</p>
              <p className="mt-1 font-semibold text-ink">{result.title}</p>
              <p className="mt-1 text-sm text-ink-muted">
                {result.method} · {result.level} · ~{result.hours}h
              </p>
            </div>
            <a
              href="#how-it-works"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              View flow →
            </a>
          </div>
          <div ref={metricsRef} className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            <Metric label="Optimistic" value={`$${result.optimistic.toLocaleString()}`} tone="text-emerald-600" />
            <Metric label="Pessimistic" value={`$${result.pessimistic.toLocaleString()}`} tone="text-rose-500" />
            <Metric label="SUM" value={`$${result.sum.toLocaleString()}`} tone="text-brand-600" />
          </div>
        </div>
      )}

      <p className="mt-4 text-center text-xs text-ink-muted/80">AI can make mistakes. Check important info</p>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

function Metric({ label, value, tone }) {
  return (
    <div data-stagger className="rounded-xl bg-brand-50/80 px-3 py-2.5 text-center">
      <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">{label}</p>
      <p className={`mt-0.5 text-sm font-bold sm:text-base ${tone}`}>{value}</p>
    </div>
  )
}

function SelectPill({ label, open, onToggle, options, onSelect, accent }) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50/60 px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-brand-100"
      >
        {accent && (
          <span className="mr-0.5 flex flex-col gap-0.5" aria-hidden>
            <span className="h-0.5 w-3 rounded-full bg-gold-500" />
            <span className="h-0.5 w-3 rounded-full bg-brand-500" />
          </span>
        )}
        {label}
        <ChevronDown className={`h-3.5 w-3.5 text-ink-muted transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="absolute left-0 top-full z-20 mt-1 min-w-36 overflow-hidden rounded-xl border border-brand-100 bg-white py-1 shadow-xl">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                className={`w-full px-3 py-2 text-left text-sm hover:bg-brand-50 ${
                  opt === label ? 'font-semibold text-brand-600' : 'text-ink'
                }`}
                onClick={() => onSelect(opt)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
