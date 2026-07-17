import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

/** Four-point sparkle from the EstimMate brand lockup */
function SparkleMark({ className = '' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 1C16.6 9.2 19.2 14.4 25.5 16C19.2 17.6 16.6 22.8 16 31C15.4 22.8 12.8 17.6 6.5 16C12.8 14.4 15.4 9.2 16 1Z" />
    </svg>
  )
}

export default function Logo({ className = '', light = false, to = '/' }) {
  const markRef = useRef(null)

  useLayoutEffect(() => {
    const el = markRef.current
    if (!el) return undefined

    const enter = () =>
      gsap.to(el, { rotate: 14, scale: 1.12, duration: 0.28, ease: 'back.out(1.6)' })
    const leave = () =>
      gsap.to(el, { rotate: 0, scale: 1, duration: 0.25, ease: 'power2.out' })

    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, [])

  const color = light
    ? 'text-white drop-shadow-[0_2px_8px_rgba(0,20,60,0.35)]'
    : 'text-navy-800'

  return (
    <Link
      to={to}
      aria-label="EstimMate home"
      className={`group inline-flex cursor-pointer items-center gap-2 ${className}`}
    >
      <span ref={markRef} className={`inline-flex will-change-transform ${color}`}>
        <SparkleMark className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>
      <span className={`text-lg font-extrabold tracking-tight sm:text-[1.35rem] ${color}`}>
        EstimMate
      </span>
    </Link>
  )
}
