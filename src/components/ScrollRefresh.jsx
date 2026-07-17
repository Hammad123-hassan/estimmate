import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Keeps ScrollTrigger positions accurate after route / layout changes */
export default function ScrollRefresh() {
  const { pathname } = useLocation()

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    refresh()
    const t = window.setTimeout(refresh, 200)
    window.addEventListener('load', refresh)
    window.addEventListener('resize', refresh)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('load', refresh)
      window.removeEventListener('resize', refresh)
    }
  }, [pathname])

  return null
}
