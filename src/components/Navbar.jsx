import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowRight, Menu, User, X } from 'lucide-react'
import gsap from 'gsap'
import { NAV_LINKS } from '../data/content'
import Logo from './ui/Logo'
import Button from './ui/Button'
import AnimatedButton from './ui/AnimatedButton'

export default function Navbar({ variant = 'light' }) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const overlayRef = useRef(null)
  const panelRef = useRef(null)
  const tweenRef = useRef(null)
  const isDark = variant === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Keep menu in the DOM while open OR while closing animation plays
  useEffect(() => {
    if (open) setVisible(true)
  }, [open])

  useLayoutEffect(() => {
    if (!visible) return undefined

    const overlay = overlayRef.current
    const panel = panelRef.current
    if (!overlay || !panel) return undefined

    const items = panel.querySelectorAll('[data-nav-item]')
    tweenRef.current?.kill()

    if (open) {
      gsap.set(overlay, { autoAlpha: 0 })
      gsap.set(panel, { autoAlpha: 0, y: -20, scale: 0.94 })
      gsap.set(items, { autoAlpha: 0, y: 12 })

      tweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(overlay, { autoAlpha: 1, duration: 0.3 })
        .to(panel, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4 }, 0.05)
        .to(items, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.05 }, 0.15)

      return undefined
    }

    // Close animation — keep mounted until this finishes
    tweenRef.current = gsap
      .timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => setVisible(false),
      })
      .to(items, { autoAlpha: 0, y: -8, duration: 0.2, stagger: 0.03 })
      .to(
        panel,
        { autoAlpha: 0, y: -18, scale: 0.94, duration: 0.32 },
        0,
      )
      .to(overlay, { autoAlpha: 0, duration: 0.35 }, 0.05)

    return undefined
  }, [open, visible])

  useEffect(() => {
    return () => {
      tweenRef.current?.kill()
    }
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-2xl px-3 py-2.5 transition-all duration-300 sm:gap-4 sm:px-5 sm:py-3 ${
          scrolled || isDark
            ? isDark
              ? 'border border-white/15 bg-white/10 shadow-lg backdrop-blur-xl'
              : 'border border-brand-100/80 bg-white/90 shadow-lg shadow-brand-500/10 backdrop-blur-xl'
            : 'border border-transparent bg-white/40 backdrop-blur-md'
        }`}
      >
        <Logo light={isDark && !scrolled ? false : isDark} />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isDark
                    ? 'text-white/85 hover:bg-white/10 hover:text-white'
                    : 'text-ink-muted hover:bg-brand-50 hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <AnimatedButton>
            <Button to="/login" variant={isDark ? 'outlineLight' : 'outline'} size="sm">
              <User className="h-4 w-4" />
              Login
            </Button>
          </AnimatedButton>
          <AnimatedButton>
            <Button to="/signup" variant="primary" size="sm">
              Join now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </AnimatedButton>
        </div>

        <button
          type="button"
          className={`cursor-pointer rounded-lg p-2 transition-transform duration-200 active:scale-90 lg:hidden ${
            isDark ? 'text-white' : 'text-ink'
          }`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <Menu
              className={`absolute h-5 w-5 transition-all duration-300 ${
                open ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
            />
            <X
              className={`absolute h-5 w-5 transition-all duration-300 ${
                open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
              }`}
            />
          </span>
        </button>
      </nav>

      {visible && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
          style={{ opacity: 0, visibility: 'hidden' }}
          onClick={closeMenu}
        >
          <div
            ref={panelRef}
            className="absolute right-3 left-3 top-20 mx-auto w-auto max-w-sm origin-top rounded-2xl border border-brand-100 bg-white p-4 shadow-xl sm:right-4 sm:left-auto sm:origin-top-right sm:w-[min(100%-2rem,20rem)]"
            style={{ opacity: 0, visibility: 'hidden' }}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href} data-nav-item>
                  <a
                    href={link.href}
                    className="block cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brand-50"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div data-nav-item className="mt-4 flex flex-col gap-2 border-t border-brand-100 pt-4">
              <Button to="/login" variant="outline" className="w-full" onClick={closeMenu}>
                <User className="h-4 w-4" />
                Login
              </Button>
              <Button to="/signup" variant="primary" className="w-full" onClick={closeMenu}>
                Join now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
