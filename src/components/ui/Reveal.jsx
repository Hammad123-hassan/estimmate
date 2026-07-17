import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SCROLL_IO } from '../../hooks/useGsap'

gsap.registerPlugin(ScrollTrigger)

export default function Reveal({ children, className = '', delay = 0, y = 28 }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const ctx = gsap.context(() => {
      gsap.set(el, { autoAlpha: 0, y })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: SCROLL_IO.start,
            end: SCROLL_IO.end,
            scrub: SCROLL_IO.scrub,
            invalidateOnRefresh: true,
          },
        })
        .to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          // delay doesn't work well with scrub; use timeline position instead
        }, delay / 1000)
    }, el)

    return () => ctx.revert()
  }, [delay, y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
