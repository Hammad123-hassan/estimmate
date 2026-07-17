import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import gsap from 'gsap'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const btnRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    const el = btnRef.current
    if (!el) return undefined

    if (visible) {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 24, scale: 0.85 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.6)' },
      )
    } else {
      gsap.to(el, { autoAlpha: 0, y: 16, scale: 0.9, duration: 0.2, ease: 'power2.in' })
    }
  }, [visible])

  useLayoutEffect(() => {
    const el = btnRef.current
    if (!el) return undefined

    const enter = () => gsap.to(el, { scale: 1.08, y: -3, duration: 0.22, ease: 'power2.out' })
    const leave = () => gsap.to(el, { scale: 1, y: 0, duration: 0.22, ease: 'power2.out' })

    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, [])

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={scrollUp}
      aria-label="Scroll to top"
      data-cursor
      className="fixed right-5 bottom-5 z-90 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg shadow-brand-500/30 ring-2 ring-white/70 sm:right-7 sm:bottom-7"
      style={{ visibility: 'hidden' }}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
    </button>
  )
}
