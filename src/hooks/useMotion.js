import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options.once !== false) observer.disconnect()
        } else if (options.once === false) {
          setInView(false)
        }
      },
      { threshold: options.threshold ?? 0.2, rootMargin: options.rootMargin ?? '0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [options.once, options.threshold, options.rootMargin])

  return { ref, inView }
}

export function useCountUp(target, active, duration = 1200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return undefined
    let start = null
    let frame

    const tick = (ts) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target, duration])

  return value
}
