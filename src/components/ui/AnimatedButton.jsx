import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

/** Wraps a CTA so GSAP can animate hover scale/lift */
export default function AnimatedButton({ children, className = '' }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const target = el.firstElementChild || el

    const enter = () => {
      gsap.to(target, {
        scale: 1.05,
        y: -3,
        duration: 0.28,
        ease: 'power2.out',
      })
    }
    const leave = () => {
      gsap.to(target, {
        scale: 1,
        y: 0,
        duration: 0.28,
        ease: 'power2.out',
      })
    }

    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)

    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
      gsap.killTweensOf(target)
    }
  }, [])

  return (
    <div ref={ref} className={`inline-flex cursor-pointer ${className}`}>
      {children}
    </div>
  )
}
