import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import gsap from 'gsap'
import { TESTIMONIALS } from '../../data/content'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

const AUTOPLAY_MS = 4200
const SLIDE_DURATION = 0.8

export default function Testimonials() {
  const slides = TESTIMONIALS
  const n = slides.length

  const looped = useMemo(() => [...slides, ...slides, ...slides], [slides])
  const [index, setIndex] = useState(n)
  const [openCase, setOpenCase] = useState(false)
  const [paused, setPaused] = useState(false)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const jumpRef = useRef(false)

  const real = ((index % n) + n) % n

  const prev = () => setIndex((i) => i - 1)
  const next = () => setIndex((i) => i + 1)
  const goToReal = (target) => setIndex(n + target)

  const styleCards = (immediate = false) => {
    const track = trackRef.current
    if (!track) return

    const duration = immediate ? 0 : SLIDE_DURATION
    const ease = 'power3.inOut'

    Array.from(track.children).forEach((wrap, i) => {
      const card = wrap.querySelector('[data-t-card]')
      const glow = wrap.querySelector('[data-t-glow]')
      const ring = wrap.querySelector('[data-t-ring]')
      const cta = wrap.querySelector('[data-t-cta]')
      if (!card) return

      const on = i === index

      gsap.to(card, {
        scale: on ? 1 : 0.92,
        autoAlpha: on ? 1 : 0.42,
        duration,
        ease,
        overwrite: 'auto',
      })
      if (glow) {
        gsap.to(glow, { autoAlpha: on ? 1 : 0, duration, ease, overwrite: 'auto' })
      }
      if (ring) {
        gsap.to(ring, { autoAlpha: on ? 1 : 0, duration, ease, overwrite: 'auto' })
      }
      if (cta) {
        gsap.to(cta, {
          autoAlpha: on ? 1 : 0,
          y: on ? 0 : 8,
          duration,
          ease,
          overwrite: 'auto',
          pointerEvents: on ? 'auto' : 'none',
        })
      }
    })
  }

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return undefined

    const card = track.children[index]
    if (!card) return undefined

    const x = viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2)
    const immediate = jumpRef.current
    jumpRef.current = false

    styleCards(immediate)

    if (immediate) {
      gsap.set(track, { x })
      return undefined
    }

    const tween = gsap.to(track, {
      x,
      duration: SLIDE_DURATION,
      ease: 'power3.inOut',
      overwrite: 'auto',
      onComplete: () => {
        if (index < n || index >= n * 2) {
          jumpRef.current = true
          setIndex(real + n)
        }
      },
    })

    const onResize = () => {
      const c = track.children[index]
      if (!c) return
      gsap.set(track, {
        x: viewport.clientWidth / 2 - (c.offsetLeft + c.offsetWidth / 2),
      })
      styleCards(true)
    }
    window.addEventListener('resize', onResize)

    return () => {
      tween.kill()
      window.removeEventListener('resize', onResize)
    }
  }, [index, n, real])

  useEffect(() => {
    if (paused || openCase) return undefined
    const id = window.setTimeout(() => next(), AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [index, paused, openCase])

  return (
    <section id="cases" className="relative overflow-hidden bg-section-navy py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-25" />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center text-3xl font-extrabold sm:text-4xl">Clients feedback</h2>
        </Reveal>

        <div
          className="relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
          }}
        >
          <button
            type="button"
            onClick={prev}
            className="absolute left-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-navy-900/90 text-gold-400 shadow-lg backdrop-blur-sm transition hover:border-gold-400/50 hover:bg-navy-800 sm:left-2"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-navy-900/90 text-gold-400 shadow-lg backdrop-blur-sm transition hover:border-gold-400/50 hover:bg-navy-800 sm:right-2"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={viewportRef}
            className="slider-edge-fade overflow-hidden py-4"
          >
            <div ref={trackRef} className="flex items-stretch gap-5 will-change-transform">
              {looped.map((item, i) => (
                <div
                  key={`${item.name || item.cta || 'h'}-${i}`}
                  className="w-[72%] shrink-0 grow-0 basis-[72%] sm:w-[42%] sm:basis-[42%] lg:w-[36%] lg:basis-[36%]"
                >
                  <TestimonialCard
                    item={item}
                    onCase={() => setOpenCase(true)}
                    onSelect={() => goToReal(((i % n) + n) % n)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {slides.map((item, i) => (
              <button
                key={item.name || item.cta || `dot-${i}`}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goToReal(i)}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                  i === real ? 'w-7 bg-gold-400' : 'w-1.5 bg-white/25 hover:bg-white/45'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {openCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/60 p-4 backdrop-blur-sm"
          onClick={() => setOpenCase(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 text-ink shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-extrabold">Case study preview</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              An agency cut proposal turnaround from 3 days to under 1 hour, improved win rate by 22%, and
              standardized estimation across pre-sales and delivery.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <Stat label="Time saved" value="85%" />
              <Stat label="Win rate" value="+22%" />
              <Stat label="Margin lift" value="+9%" />
            </div>
            <Button variant="primary" className="mt-6 w-full" onClick={() => setOpenCase(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}

function TestimonialCard({ item, onCase, onSelect }) {
  if (item.highlight) {
    return (
      <article
        data-t-card
        data-cursor
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onSelect()
        }}
        className="relative flex h-full min-h-72 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl bg-white/8 p-7 text-center ring-1 ring-white/10"
      >
        <div data-t-glow className="pointer-events-none absolute inset-0 bg-brand-gradient opacity-0" />
        <div
          data-t-ring
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-gold-400/45"
        />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
          <Quote className="mb-3 h-7 w-7 text-gold-400" />
          <p className="text-lg font-extrabold leading-snug text-white">{item.quote}</p>
          <div data-t-cta className="mt-5 opacity-0">
            <Button
              variant="white"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onCase()
              }}
            >
              {item.cta} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      data-t-card
      data-cursor
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect()
      }}
      className="relative flex h-full min-h-72 cursor-pointer flex-col overflow-hidden rounded-3xl bg-white/8 p-7 ring-1 ring-white/10"
    >
      <div data-t-glow className="pointer-events-none absolute inset-0 bg-brand-gradient opacity-0" />
      <div
        data-t-ring
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-gold-400/40"
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-start justify-between gap-3">
          <Quote className="h-8 w-8 text-gold-400/90" />
          <div className="flex gap-0.5 text-gold-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-white sm:text-[15px]">“{item.quote}”</p>

        <div className="mt-6 border-t border-white/15 pt-4 text-left">
          <h3 className="font-extrabold text-white">{item.name}</h3>
          <p className="mt-0.5 text-sm text-white/75">{item.role}</p>
        </div>
      </div>
    </article>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-brand-50 px-2 py-3">
      <p className="text-lg font-extrabold text-brand-700">{value}</p>
      <p className="text-[11px] text-ink-muted">{label}</p>
    </div>
  )
}
