import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scrub range: appear while moving toward viewport center,
 * reverse/remove as soon as it goes back below center.
 */
export const SCROLL_IO = {
  start: 'top 90%',
  end: 'center center',
  scrub: 0.85,
  invalidateOnRefresh: true,
}

/** Staggered entrance for hero / page headers */
export function useHeroIntro(enabled = true) {
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    if (!enabled) return undefined
    const root = containerRef.current
    if (!root) return undefined

    const ctx = gsap.context(() => {
      const items = root.querySelectorAll('[data-hero]')
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
        },
      )
    }, root)

    return () => ctx.revert()
  }, [enabled])

  return containerRef
}

/**
 * Grid columns tied to scroll:
 * - scroll down toward center → first → last show (full at center)
 * - scroll up / section goes below center → last → first remove
 */
export function useStaggerIn(selector = '[data-stagger]', options = {}) {
  const ref = useRef(null)
  const stagger = options.stagger ?? 0.12
  const y = options.y ?? 48
  const duration = options.duration ?? 0.45
  const start = options.start ?? SCROLL_IO.start
  const end = options.end ?? SCROLL_IO.end
  const scrub = options.scrub ?? SCROLL_IO.scrub
  const scale = options.scale ?? 0.94
  const x = options.x ?? 24

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return undefined

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(root.querySelectorAll(selector))
      if (!items.length) return

      gsap.set(items, {
        autoAlpha: 0,
        y,
        x,
        scale,
        force3D: true,
      })

      items.forEach((item) => {
        const svg = item.querySelector('svg')
        if (svg) {
          gsap.set(svg, {
            rotate: -12,
            scale: 0.55,
            autoAlpha: 0,
            transformOrigin: '50% 50%',
          })
        }
      })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start,
          end,
          scrub,
          invalidateOnRefresh: true,
        },
      })

      items.forEach((item, i) => {
        const at = i * stagger

        tl.to(
          item,
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration,
          },
          at,
        )

        const svg = item.querySelector('svg')
        if (svg) {
          tl.to(
            svg,
            {
              rotate: 0,
              scale: 1,
              autoAlpha: 1,
              duration: duration * 0.7,
            },
            at + 0.05,
          )
        }
      })
    }, root)

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 100)

    return () => {
      window.clearTimeout(refreshId)
      ctx.revert()
    }
  }, [selector, stagger, y, duration, start, end, scrub, scale, x])

  return ref
}

export function useStaggerCards(selector = '[data-card]') {
  return useStaggerIn(selector, { stagger: 0.12, y: 48, x: 24 })
}

/** Modal / contact card pop-in */
export function usePopIn() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 28, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.4)' },
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}

/** Smooth horizontal slider — uses xPercent for buttery resize-safe motion */
export function useSmoothSlider(index) {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    gsap.to(track, {
      xPercent: -100 * index,
      duration: 0.8,
      ease: 'power3.inOut',
      overwrite: 'auto',
    })
  }, [index])

  return { viewportRef, trackRef }
}
