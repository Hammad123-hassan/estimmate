import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, .cursor-pointer, [data-cursor]'

export default function InteractiveCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !reduce)
  }, [])

  useLayoutEffect(() => {
    if (!enabled) return undefined

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return undefined

    document.documentElement.classList.add('has-interactive-cursor')

    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      force3D: true,
    })

    // quickTo avoids tween stacking and keeps motion smooth
    const moveDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' })
    const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' })
    const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power3.out' })
    const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power3.out' })

    let hovering = false

    const onMove = (e) => {
      moveDotX(e.clientX)
      moveDotY(e.clientY)
      moveRingX(e.clientX)
      moveRingY(e.clientY)
    }

    const grow = () => {
      if (hovering) return
      hovering = true
      gsap.to(ring, {
        scale: 1.7,
        borderColor: 'rgba(45, 122, 90, 0.9)',
        duration: 0.2,
        overwrite: 'auto',
      })
      gsap.to(dot, {
        scale: 0.5,
        backgroundColor: '#c4a35a',
        duration: 0.2,
        overwrite: 'auto',
      })
    }

    const shrink = () => {
      if (!hovering) return
      hovering = false
      gsap.to(ring, {
        scale: 1,
        borderColor: 'rgba(27, 58, 95, 0.55)',
        duration: 0.2,
        overwrite: 'auto',
      })
      gsap.to(dot, {
        scale: 1,
        backgroundColor: '#2d7a5a',
        duration: 0.2,
        overwrite: 'auto',
      })
    }

    const onOver = (e) => {
      if (e.target.closest?.(HOVER_SELECTOR)) grow()
    }
    const onOut = (e) => {
      const related = e.relatedTarget
      if (related?.closest?.(HOVER_SELECTOR)) return
      if (e.target.closest?.(HOVER_SELECTOR)) shrink()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)

    return () => {
      document.documentElement.classList.remove('has-interactive-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      gsap.killTweensOf([dot, ring])
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-9999" aria-hidden>
      <div
        ref={ringRef}
        className="absolute top-0 left-0 h-9 w-9 rounded-full border-2 border-navy-700/50 will-change-transform"
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-2 w-2 rounded-full bg-brand-500 will-change-transform"
      />
    </div>
  )
}
