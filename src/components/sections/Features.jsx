import { useLayoutEffect, useMemo, useState } from 'react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Filter,
  Plus,
  Search,
  Share2,
} from 'lucide-react'
import gsap from 'gsap'
import { FEATURE_SLIDES, SCOPE_ROWS } from '../../data/content'
import { useSmoothSlider } from '../../hooks/useGsap'
import AnimatedButton from '../ui/AnimatedButton'
import AnimatedIcon from '../ui/AnimatedIcon'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

export default function Features() {
  const [slide, setSlide] = useState(0)
  const [expanded, setExpanded] = useState({ 1: true, 2: false })
  const { viewportRef, trackRef } = useSmoothSlider(slide)
  const current = FEATURE_SLIDES[slide]

  const totals = useMemo(() => {
    const optimistic = SCOPE_ROWS.reduce((s, r) => s + r.optimistic * 85, 0)
    const pessimistic = SCOPE_ROWS.reduce((s, r) => s + r.pessimistic * 85, 0)
    const sum = SCOPE_ROWS.reduce((s, r) => s + r.sum, 0)
    return { optimistic, pessimistic, sum }
  }, [])

  const goTo = (i) => setSlide(i)
  const prev = () => setSlide((s) => (s - 1 + FEATURE_SLIDES.length) % FEATURE_SLIDES.length)
  const next = () => setSlide((s) => (s + 1) % FEATURE_SLIDES.length)

  useLayoutEffect(() => {
    const title = document.querySelector('[data-feature-title]')
    const desc = document.querySelector('[data-feature-desc]')
    if (!title || !desc) return
    gsap.fromTo(
      [title, desc],
      { autoAlpha: 0.4, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out', overwrite: 'auto' },
    )
  }, [slide])

  return (
    <section id="features" className="relative overflow-hidden bg-section-navy py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 data-feature-title className="text-center text-3xl font-extrabold sm:text-4xl">
            {current.title}
          </h2>
          <p data-feature-desc className="mx-auto mt-4 max-w-2xl text-center text-white/85">
            {current.description}
          </p>
        </Reveal>

        <div className="relative mt-12">
          <button
            type="button"
            onClick={prev}
            className="absolute -left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-brand-600 shadow-lg sm:-left-4"
            aria-label="Previous slide"
          >
            <AnimatedIcon>
              <ChevronLeft className="h-5 w-5" />
            </AnimatedIcon>
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute -right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-brand-600 shadow-lg sm:-right-4"
            aria-label="Next slide"
          >
            <AnimatedIcon>
              <ChevronRight className="h-5 w-5" />
            </AnimatedIcon>
          </button>

          <div ref={viewportRef} className="overflow-hidden rounded-2xl bg-white text-ink shadow-2xl">
            <div ref={trackRef} className="flex will-change-transform">
              {FEATURE_SLIDES.map((s, i) => (
                <div key={s.id} className="w-full shrink-0 grow-0 basis-full">
                  <SlideChrome
                    slideIndex={i}
                    active={slide === i}
                    totals={totals}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    onTab={(t) => {
                      if (t === 'Dashboard') goTo(1)
                      else if (t === 'Team') goTo(2)
                      else goTo(0)
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {FEATURE_SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to ${s.label}`}
                onClick={() => goTo(i)}
                className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                  i === slide ? 'w-8 bg-gold-400' : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <AnimatedButton>
              <Button to="/signup" variant="white">
                Try for free
              </Button>
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  )
}

function SlideChrome({ slideIndex, active, totals, expanded, setExpanded, onTab }) {
  const tabs = ['Project Scope', 'Materials', 'Team', 'Rates', 'Context', 'Dashboard']
  const activeTab =
    slideIndex === 0 ? 'Project Scope' : slideIndex === 1 ? 'Dashboard' : 'Team'

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-bold">EMP</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600">
            V2 <ChevronDown className="h-3 w-3" />
          </span>
        </div>
        <div className="relative hidden min-w-48 flex-1 sm:block sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            className="field-input h-9 w-full rounded-full border bg-brand-50/40 pl-9 pr-3 text-sm outline-none"
            placeholder="Search"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-ink-muted">
            <AnimatedIcon>
              <Cloud className="h-4 w-4" />
            </AnimatedIcon>{' '}
            Save
          </Button>
          <Button variant="primary" size="sm">
            <AnimatedIcon>
              <Share2 className="h-4 w-4" />
            </AnimatedIcon>{' '}
            Share
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-b border-brand-50 px-4 py-3">
        <MetricChip label="Optimistic" value={`$${totals.optimistic.toLocaleString()}`} tone="text-emerald-600" />
        <MetricChip label="Pessimistic" value={`$${totals.pessimistic.toLocaleString()}`} tone="text-rose-500" />
        <MetricChip label="SUM" value={`$${totals.sum.toLocaleString()}`} tone="text-brand-600" />
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-brand-50 px-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onTab(t)}
            className={`cursor-pointer whitespace-nowrap px-3 py-3 text-sm font-medium transition ${
              activeTab === t
                ? 'border-b-2 border-brand-500 text-brand-600'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-4">
        {slideIndex === 1 ? (
          <DashboardPreview active={active} />
        ) : slideIndex === 2 ? (
          <TeamPreview active={active} />
        ) : (
          <ScopeTable expanded={expanded} setExpanded={setExpanded} />
        )}
      </div>
    </div>
  )
}

function MetricChip({ label, value, tone }) {
  return (
    <div className="rounded-xl bg-brand-50 px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
      <p className={`text-sm font-bold ${tone}`}>{value}</p>
    </div>
  )
}

function ScopeTable({ expanded, setExpanded }) {
  return (
    <>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-brand-100 px-3 py-1.5 text-xs font-semibold text-ink-muted"
          >
            <Filter className="h-3.5 w-3.5" /> All roles
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-full border border-brand-100 px-3 py-1.5 text-xs font-semibold text-ink-muted"
          >
            Bulk edit
          </button>
        </div>
        <Button variant="primary" size="sm">
          <AnimatedIcon>
            <Plus className="h-4 w-4" />
          </AnimatedIcon>{' '}
          Add
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-ink-muted">
              <th className="pb-2 font-semibold">Item</th>
              <th className="pb-2 font-semibold">Role</th>
              <th className="pb-2 font-semibold">Optimistic</th>
              <th className="pb-2 font-semibold">Pessimistic</th>
              <th className="pb-2 text-right font-semibold">SUM</th>
            </tr>
          </thead>
          <tbody>
            {SCOPE_ROWS.map((row) => (
              <ScopeGroup
                key={row.id}
                row={row}
                open={!!expanded[row.id]}
                onToggle={() => setExpanded((e) => ({ ...e, [row.id]: !e[row.id] }))}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function ScopeGroup({ row, open, onToggle }) {
  return (
    <>
      <tr className="border-t border-brand-50 hover:bg-brand-50/40">
        <td className="py-3">
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex cursor-pointer items-center gap-2 font-semibold"
          >
            <ChevronRight className={`h-4 w-4 transition duration-300 ${open ? 'rotate-90' : ''}`} />
            {row.id}. {row.name}
          </button>
        </td>
        <td>
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600">
            {row.role}
          </span>
        </td>
        <td>{row.optimistic}h</td>
        <td>{row.pessimistic}h</td>
        <td className="text-right font-semibold">${row.sum.toLocaleString()}</td>
      </tr>
      {open &&
        row.children.map((child) => (
          <tr
            key={child.id}
            className="border-t border-brand-50/70 bg-brand-50/20 text-ink-muted hover:bg-brand-50/50"
          >
            <td className="py-2.5 pl-10">
              {child.id} {child.name}
            </td>
            <td>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold">{child.role}</span>
            </td>
            <td>{child.optimistic}h</td>
            <td>{child.pessimistic}h</td>
            <td className="text-right">${child.sum.toLocaleString()}</td>
          </tr>
        ))}
    </>
  )
}

function DashboardPreview({ active }) {
  const work = [
    { label: 'Auth & Access', value: 28400, color: 'bg-brand-500' },
    { label: 'Marketplace', value: 35200, color: 'bg-navy-500' },
    { label: 'Payments', value: 17360, color: 'bg-gold-500' },
  ]
  const roles = [
    { label: 'DevOps Engineer', value: 12600, color: 'bg-cyan-500' },
    { label: 'QA Engineer', value: 9800, color: 'bg-sky-500' },
    { label: 'Frontend Engineer', value: 21400, color: 'bg-teal-500' },
  ]
  const max = Math.max(...work.map((w) => w.value), ...roles.map((r) => r.value))

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <BarGroup title="Work" items={work} max={max} active={active} />
      <BarGroup title="Roles" items={roles} max={max} active={active} />
    </div>
  )
}

function BarGroup({ title, items, max, active }) {
  useLayoutEffect(() => {
    if (!active) return undefined
    const bars = document.querySelectorAll(`[data-bar-group="${title}"] [data-bar]`)
    gsap.fromTo(
      bars,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', overwrite: 'auto' },
    )
  }, [active, title])

  return (
    <div data-bar-group={title}>
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-bold">{title}</h4>
        <span className="rounded-lg bg-brand-600 px-3 py-1 text-xs font-bold text-white">
          SUM ${items.reduce((s, i) => s + i.value, 0).toLocaleString()}
        </span>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <div className="mb-1 flex justify-between text-xs text-ink-muted">
              <span>{item.label}</span>
              <span className="font-semibold text-ink">${item.value.toLocaleString()}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-brand-50">
              <div
                data-bar
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TeamPreview({ active }) {
  const team = [
    { role: 'Frontend Engineer', rate: 85, hours: 220, cost: 18700 },
    { role: 'Backend Engineer', rate: 95, hours: 260, cost: 24700 },
    { role: 'QA Engineer', rate: 70, hours: 140, cost: 9800 },
    { role: 'DevOps Engineer', rate: 100, hours: 126, cost: 12600 },
  ]

  useLayoutEffect(() => {
    if (!active) return undefined
    const rows = document.querySelectorAll('[data-team-row]')
    gsap.fromTo(
      rows,
      { autoAlpha: 0, x: 24 },
      { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out', overwrite: 'auto' },
    )
  }, [active])

  return (
    <ul className="divide-y divide-brand-50">
      {team.map((m) => (
        <li key={m.role} data-team-row className="flex flex-wrap items-center justify-between gap-2 py-3">
          <div>
            <p className="font-semibold">{m.role}</p>
            <p className="text-sm text-ink-muted">
              ${m.rate}/h · {m.hours}h
            </p>
          </div>
          <p className="font-bold text-brand-600">${m.cost.toLocaleString()}</p>
        </li>
      ))}
    </ul>
  )
}
