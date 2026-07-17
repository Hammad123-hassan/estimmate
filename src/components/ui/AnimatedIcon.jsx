import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

/** Wraps Lucide / SVG icons with entrance + hover animation */
export default function AnimatedIcon({ children, className = '', delay = 0 }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const svg = el.querySelector('svg') || el

    const ctx = gsap.context(() => {
      gsap.fromTo(
        svg,
        { autoAlpha: 0, scale: 0.5, rotate: -20 },
        {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 0.5,
          delay,
          ease: 'back.out(1.8)',
        },
      )
    }, el)

    const enter = () =>
      gsap.to(svg, { scale: 1.18, rotate: 10, duration: 0.25, ease: 'power2.out', transformOrigin: '50% 50%' })
    const leave = () =>
      gsap.to(svg, { scale: 1, rotate: 0, duration: 0.25, ease: 'power2.out', transformOrigin: '50% 50%' })

    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)

    return () => {
      ctx.revert()
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, [delay])

  return (
    <span ref={ref} className={`inline-flex ${className}`}>
      {children}
    </span>
  )
}
